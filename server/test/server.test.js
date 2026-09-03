// server/test/server.test.js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { AuthManager } from "../core/Auth.js";
import { JsonStorage } from "../storage/JsonStorage.js";
import { TransferManager } from "../core/TransferManager.js";
import { CommandQueue } from "../core/CommandQueue.js";
import { Validator } from "../core/Validator.js";
import { RateLimiter } from "../core/RateLimiter.js";
import { EntitlementManager } from "../core/Entitlements.js";
import { ConnectionManager } from "../core/ConnectionManager.js";
import { GameSession } from "../core/GameSession.js";
import { KorakuServer, createKorakuServer } from "../server.js";
import { createBackup, verifyBackupIntegrity, restoreBackup } from "../scripts/backup.js";
import {
  Commands,
  Events,
  ErrorCodes,
  ConnectionStates,
  CONFIG_VERSION
} from "../config.js";

test("AuthManager: 匿名裝置 Token 簽發與 HMAC-SHA256 驗證", () => {
  const auth = new AuthManager({ secret: "test-secret-key-123" });

  // Issue anonymous token
  const issued = auth.issueAnonymousToken("device_alpha");
  assert.ok(issued.token, "應簽發 token");
  assert.ok(issued.accountId.startsWith("acc_"), "accountId 應有前綴");
  assert.equal(issued.deviceId, "device_alpha");
  assert.equal(issued.devEntitlement, false);

  // Verify authentic token
  const verified = auth.verifyToken(issued.token);
  assert.equal(verified.valid, true);
  assert.equal(verified.payload.accountId, issued.accountId);
  assert.equal(verified.payload.deviceId, "device_alpha");
  assert.equal(verified.payload.devEntitlement, false);

  // Tampered signature should fail
  const tamperedToken = issued.token.slice(0, -4) + "XXXX";
  const tamperedResult = auth.verifyToken(tamperedToken);
  assert.equal(tamperedResult.valid, false);
  assert.equal(tamperedResult.error, "INVALID_SIGNATURE");

  // Expired token should fail
  const expiredToken = auth.issueToken({
    accountId: "acc_expired",
    deviceId: "dev_exp",
    ttlMs: -1000 // Expired 1 second ago
  });
  const expiredResult = auth.verifyToken(expiredToken);
  assert.equal(expiredResult.valid, false);
  assert.equal(expiredResult.error, "TOKEN_EXPIRED");
});

test("JsonStorage: 帳號儲存、經濟帳本(Ledger)追加、GDPR導出與徹底刪除", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-storage-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_test_storage_1";
  const testData = {
    version: 1,
    coins: 500,
    profile: { level: 2, xp: 100 }
  };

  // Save & Load
  await storage.saveAccount(accountId, testData);
  const loaded = await storage.getAccount(accountId);
  assert.deepEqual(loaded, testData, "讀取帳號資料應與儲存一致");

  // Append Ledger
  await storage.appendLedger(accountId, {
    source: "questReward",
    delta: { coins: 100 },
    serverTime: Date.now()
  });
  await storage.appendLedger(accountId, {
    source: "buyItem",
    delta: { coins: -50, items: { hpPotion: 1 } },
    serverTime: Date.now()
  });

  const ledger = await storage.getLedger(accountId);
  assert.equal(ledger.length, 2, "帳本應有 2 筆記錄");
  assert.equal(ledger[0].source, "questReward");
  assert.equal(ledger[1].source, "buyItem");

  // GDPR Export
  const exported = await storage.exportAllAccountData(accountId);
  assert.ok(exported.exportMetadata, "應包含導出元數據");
  assert.equal(exported.exportMetadata.accountId, accountId);
  assert.deepEqual(exported.accountData, testData);
  assert.equal(exported.economicLedger.length, 2);

  // Delete Account
  const deleted = await storage.deleteAccount(accountId);
  assert.equal(deleted, true);
  const afterDelete = await storage.getAccount(accountId);
  assert.equal(afterDelete, null, "刪除後應無法取得帳號");
  const ledgerAfterDelete = await storage.getLedger(accountId);
  assert.equal(ledgerAfterDelete.length, 0, "刪除後帳本應清空");

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("TransferManager: 一次性轉移碼簽發與跨裝置兌換", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-transfer-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage, ttlMs: 60000 });

  const accountId = "acc_transfer_target_1";
  const issueResult = await transferManager.issueTransferCode(accountId);
  assert.ok(issueResult.transferCode.startsWith("KORAKU-"), "轉移碼格式應正確");
  assert.ok(issueResult.expiresAt > Date.now());

  // Claim transfer code from another device
  const claimResult = await transferManager.claimTransferCode(issueResult.transferCode, "device_beta");
  assert.equal(claimResult.success, true);
  assert.equal(claimResult.accountId, accountId);

  // Second claim attempt should fail (single-use)
  const secondClaim = await transferManager.claimTransferCode(issueResult.transferCode, "device_gamma");
  assert.equal(secondClaim.success, false);
  assert.equal(secondClaim.error, ErrorCodes.INVALID_TRANSFER_CODE);

  // Non-existent code claim should fail
  const invalidClaim = await transferManager.claimTransferCode("KORAKU-XXXX-YYYY", "device_beta");
  assert.equal(invalidClaim.success, false);
  assert.equal(invalidClaim.error, ErrorCodes.INVALID_TRANSFER_CODE);

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Validator: 來源 (Origin) 檢查、指令信封 Schema 驗證與版本檢查", () => {
  const validator = new Validator({
    allowedOrigins: ["http://localhost:4173", "https://koraku.app"],
    configVersion: CONFIG_VERSION
  });

  // Origin check
  assert.equal(validator.validateOrigin("http://localhost:4173"), true);
  assert.equal(validator.validateOrigin("https://koraku.app"), true);
  assert.equal(validator.validateOrigin("http://malicious-site.com"), false);

  // Valid envelope
  const validEnvelope = {
    cmdId: "cmd_001",
    command: Commands.BUY_ITEM,
    payload: { itemId: "hpPotion" },
    clientTime: Date.now(),
    configVersion: CONFIG_VERSION
  };
  const validRes = validator.validateEnvelope(validEnvelope);
  assert.equal(validRes.valid, true);

  // Whitelist violation (extra unexpected field)
  const injectedEnvelope = {
    ...validEnvelope,
    hackedField: "drop database"
  };
  const injectedRes = validator.validateEnvelope(injectedEnvelope);
  assert.equal(injectedRes.valid, false);
  assert.equal(injectedRes.code, ErrorCodes.INVALID_SCHEMA);

  // Config version mismatch
  const mismatchEnvelope = {
    ...validEnvelope,
    configVersion: "1999.01.01"
  };
  const mismatchRes = validator.validateEnvelope(mismatchEnvelope);
  assert.equal(mismatchRes.valid, false);
  assert.equal(mismatchRes.code, ErrorCodes.VERSION_MISMATCH);

  // Size cap validation
  const hugeString = JSON.stringify({
    cmdId: "cmd_huge",
    command: Commands.BUY_ITEM,
    payload: { blob: "x".repeat(70000) }
  });
  const hugeRes = validator.validateRawMessage(hugeString);
  assert.equal(hugeRes.valid, false);
  assert.equal(hugeRes.code, ErrorCodes.INVALID_SCHEMA);
});

test("RateLimiter: 流量限制與突發請求保護", () => {
  const limiter = new RateLimiter({
    windowMs: 1000,
    maxRequestsPerWindow: 5,
    burstLimit: 5
  });

  const ip = "192.168.1.100";
  for (let i = 0; i < 5; i++) {
    const res = limiter.check(ip);
    assert.equal(res.allowed, true, `第 ${i + 1} 次應允許`);
  }

  // 6th request should be rejected
  const rejected = limiter.check(ip);
  assert.equal(rejected.allowed, false, "超過上限應拒絕");
  assert.ok(rejected.retryAfterMs > 0);

  limiter.destroy();
});

test("EntitlementManager: 作弊指令需 Dev Entitlement 權限檢驗與審計日誌", () => {
  const warnings = [];
  const fakeLogger = {
    warn: (msg) => warnings.push(msg)
  };
  const entitlements = new EntitlementManager({ logger: fakeLogger });

  // Normal command without entitlement: allowed
  const normalCheck = entitlements.checkEntitlement({
    command: Commands.BUY_ITEM,
    accountId: "acc_user",
    devEntitlement: false
  });
  assert.equal(normalCheck.allowed, true);

  // Cheat command without entitlement: rejected + logged
  const unauthorizedCheat = entitlements.checkEntitlement({
    command: Commands.CHEAT_ADD_COINS,
    accountId: "acc_hacker",
    devEntitlement: false,
    ip: "10.0.0.1"
  });
  assert.equal(unauthorizedCheat.allowed, false);
  assert.equal(unauthorizedCheat.error, ErrorCodes.UNAUTHORIZED_CHEAT);
  assert.equal(warnings.length, 1, "應記錄未授權作弊安全日誌");
  assert.ok(warnings[0].includes("[SECURITY AUDIT]"));

  // Cheat command WITH entitlement: allowed
  const authorizedCheat = entitlements.checkEntitlement({
    command: Commands.CHEAT_ADD_COINS,
    accountId: "acc_dev",
    devEntitlement: true
  });
  assert.equal(authorizedCheat.allowed, true);
});

test("CommandQueue: 每帳號序列化佇列與 cmdId 冪等性防重複執行", async () => {
  const queue = new CommandQueue();
  const accountId = "acc_queue_test";

  let executionCounter = 0;
  const executionOrder = [];

  const handler = async (envelope) => {
    executionCounter += 1;
    executionOrder.push(envelope.seq);
    return { ack: true, seq: envelope.seq, counter: executionCounter };
  };

  // Enqueue 3 sequential commands
  const p1 = queue.enqueue(accountId, { cmdId: "cmd_1", seq: 1 }, handler);
  const p2 = queue.enqueue(accountId, { cmdId: "cmd_2", seq: 2 }, handler);
  const p3 = queue.enqueue(accountId, { cmdId: "cmd_3", seq: 3 }, handler);

  const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
  assert.deepEqual(executionOrder, [1, 2, 3], "應依序執行");
  assert.equal(executionCounter, 3);

  // Resending duplicate cmd_1 (idempotency check)
  const duplicateP = await queue.enqueue(accountId, { cmdId: "cmd_1", seq: 1 }, handler);
  assert.deepEqual(duplicateP, r1, "重複 cmdId 應回傳快取結果");
  assert.equal(executionCounter, 3, "重複 cmdId 不應重複執行 handler");

  queue.destroy();
});

test("ConnectionManager: 單一帳號連線管理（新連線踢出舊連線）與閒置 Session 釋放", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-conn-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage });
  const connManager = new ConnectionManager({ storage, transferManager, idleTimeoutMs: 50 });

  const accountId = "acc_single_login_test";

  const closedSockets = [];
  const sentMessages = [];

  const fakeSocket1 = {
    readyState: 1,
    send: (msg) => sentMessages.push({ socket: 1, msg: JSON.parse(msg) }),
    close: (code, reason) => closedSockets.push({ socket: 1, code, reason })
  };

  const fakeSocket2 = {
    readyState: 1,
    send: (msg) => sentMessages.push({ socket: 2, msg: JSON.parse(msg) }),
    close: (code, reason) => closedSockets.push({ socket: 2, code, reason })
  };

  // Register Connection 1
  connManager.registerConnection(accountId, fakeSocket1, "conn_1");
  assert.equal(connManager.isOnline(accountId), true);

  // Register Connection 2 for same account -> socket 1 kicked
  connManager.registerConnection(accountId, fakeSocket2, "conn_2");
  assert.equal(closedSockets.length, 1);
  assert.equal(closedSockets[0].socket, 1);
  assert.equal(closedSockets[0].reason, "NEW_CONNECTION_ESTABLISHED");

  // Idle session unloader
  connManager.handleDisconnect(fakeSocket2);
  assert.equal(connManager.isOnline(accountId), false);

  // Wait for idle sweep (timeout set to 50ms in constructor)
  await new Promise((r) => setTimeout(r, 80));
  await connManager._sweepIdleSessions();
  assert.equal(connManager.sessions.has(accountId), false, "閒置 Session 應從記憶體卸載落盤");

  connManager.destroy();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("GameSession: 權威戰鬥生命週期、暫停限制(最多3次/倒數階段)、裝備鎖定與經濟突變", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-session-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage });

  const session = new GameSession({
    accountId: "acc_session_authority",
    storage,
    transferManager
  });
  await session.load();

  // 1. Initial State has 0 coins, buyItem should fail with INSUFFICIENT_COINS
  const buyItemFail = await session.executeCommand({
    cmdId: "cmd_buy_1",
    command: Commands.BUY_ITEM,
    payload: { itemId: "hpPotion" }
  });
  assert.equal(buyItemFail.ack, false);
  assert.equal(buyItemFail.error, "INSUFFICIENT_COINS");

  // 2. Add coins via cheat / initial setup
  await session.executeCommand({
    cmdId: "cmd_cheat_coins",
    command: Commands.CHEAT_ADD_COINS,
    payload: { amount: 1000 }
  });
  assert.equal(session.state.coins, 1000);

  // 3. Buy Item and Equipment
  const buyItemSuccess = await session.executeCommand({
    cmdId: "cmd_buy_2",
    command: Commands.BUY_ITEM,
    payload: { itemId: "hpPotion" }
  });
  assert.equal(buyItemSuccess.ack, true);
  assert.equal(session.state.coins, 900);
  assert.equal(session.state.inventory.hpPotion, 2);

  const buyEqSuccess = await session.executeCommand({
    cmdId: "cmd_buy_eq",
    command: Commands.BUY_EQUIPMENT,
    payload: { itemId: "chest_samurai" }
  });
  assert.equal(buyEqSuccess.ack, true);
  assert.equal(session.state.coins, 580); // 900 - 320

  // 4. Equip Item
  const equipRes = await session.executeCommand({
    cmdId: "cmd_equip_1",
    command: Commands.EQUIP_ITEM,
    payload: { slot: "chest", itemId: "chest_samurai" }
  });
  assert.equal(equipRes.ack, true);
  assert.equal(session.state.equipment.chest, "chest_samurai");

  // 5. Start Battle
  const battleStart = await session.executeCommand({
    cmdId: "cmd_bat_start",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.equal(battleStart.ack, true);
  assert.ok(session.activeBattle, "應建立活躍戰鬥");

  // 6. Policy: Equipment & Stat Allocation Locked during Battle
  const equipDuringBattle = await session.executeCommand({
    cmdId: "cmd_equip_battle",
    command: Commands.UNEQUIP_ITEM,
    payload: { slot: "chest" }
  });
  assert.equal(equipDuringBattle.ack, false);
  assert.equal(equipDuringBattle.error, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(equipDuringBattle.key, "battle.lockedDuringBattle");

  // 7. Battle Pause (Max 3 times during countdown)
  const pause1 = await session.executeCommand({ cmdId: "p1", command: Commands.BATTLE_PAUSE });
  assert.equal(pause1.ack, true);
  assert.equal(pause1.pauseCount, 1);

  await session.executeCommand({ cmdId: "res1", command: Commands.BATTLE_RESUME });

  const pause2 = await session.executeCommand({ cmdId: "p2", command: Commands.BATTLE_PAUSE });
  assert.equal(pause2.pauseCount, 2);
  await session.executeCommand({ cmdId: "res2", command: Commands.BATTLE_RESUME });

  const pause3 = await session.executeCommand({ cmdId: "p3", command: Commands.BATTLE_PAUSE });
  assert.equal(pause3.pauseCount, 3);
  await session.executeCommand({ cmdId: "res3", command: Commands.BATTLE_RESUME });

  // 4th Pause attempt should fail
  const pause4 = await session.executeCommand({ cmdId: "p4", command: Commands.BATTLE_PAUSE });
  assert.equal(pause4.ack, false);
  assert.equal(pause4.error, ErrorCodes.PAUSE_LIMIT_REACHED);

  // 8. Battle Abandon
  const abandon = await session.executeCommand({ cmdId: "cmd_aban", command: Commands.BATTLE_ABANDON });
  assert.equal(abandon.ack, true);
  assert.equal(session.activeBattle, null);

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("backup.js: 建立資料目錄備份、SHA-256 雜湊 Manifest 驗證與還原", async () => {
  const tmpDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-data-"));
  const tmpBackupDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-backup-"));
  const tmpRestoreDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-restore-"));

  // Create sample account and ledger files
  await fs.mkdir(path.join(tmpDataDir, "accounts"), { recursive: true });
  await fs.mkdir(path.join(tmpDataDir, "ledgers"), { recursive: true });
  await fs.writeFile(path.join(tmpDataDir, "accounts", "acc_1.json"), JSON.stringify({ coins: 500 }), "utf8");
  await fs.writeFile(path.join(tmpDataDir, "ledgers", "acc_1.jsonl"), JSON.stringify({ source: "init" }) + "\n", "utf8");

  // Create backup
  const backupRes = await createBackup({ dataDir: tmpDataDir, backupDir: tmpBackupDir });
  assert.ok(backupRes.fileCount >= 2, "備份檔案數應 >= 2");

  // Verify backup integrity
  const verification = await verifyBackupIntegrity(backupRes.backupPath);
  assert.equal(verification.valid, true, "備份雜湊比對應 100% 通過");

  // Restore to new directory
  const restoreRes = await restoreBackup(backupRes.backupPath, tmpRestoreDir);
  assert.equal(restoreRes.restoredFiles, backupRes.fileCount);

  // Verify restored file content
  const restoredAccount = await fs.readFile(path.join(tmpRestoreDir, "accounts", "acc_1.json"), "utf8");
  assert.deepEqual(JSON.parse(restoredAccount), { coins: 500 });

  await fs.rm(tmpDataDir, { recursive: true, force: true });
  await fs.rm(tmpBackupDir, { recursive: true, force: true });
  await fs.rm(tmpRestoreDir, { recursive: true, force: true });
});

test("KorakuServer: HTTP /health 端點與伺服器主程式啟動/關閉生命週期", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-server-"));
  const server = createKorakuServer({
    port: 0, // Port 0 chooses a free OS port
    dataDir: tmpDir
  });

  await server.start();
  const port = server.actualPort;
  assert.ok(port > 0, "伺服器應綁定可用 Port");

  // Query /health
  const response = await fetch(`http://127.0.0.1:${port}/health`);
  assert.equal(response.status, 200);
  const health = await response.json();
  assert.equal(health.status, "ok");
  assert.equal(health.configVersion, CONFIG_VERSION);

  // Query /auth/anonymous
  const authResponse = await fetch(`http://127.0.0.1:${port}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "device_test_fetch" })
  });
  assert.equal(authResponse.status, 200);
  const authData = await authResponse.json();
  assert.ok(authData.token);
  assert.equal(authData.deviceId, "device_test_fetch");

  await server.close();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Phase 3.5: 轉移碼併發兌換原子互斥保證 (Race Condition Prevention)", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-transfer-lock-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const tm = new TransferManager({ storage, codeTtlMs: 60000 });
  const issued = await tm.issueTransferCode("acc_donor");
  assert.ok(issued.transferCode);

  // Concurrently claim the same code using Promise.all from 3 devices
  const results = await Promise.all([
    tm.claimTransferCode(issued.transferCode, "dev_target_1"),
    tm.claimTransferCode(issued.transferCode, "dev_target_2"),
    tm.claimTransferCode(issued.transferCode, "dev_target_3")
  ]);

  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  assert.equal(successes.length, 1, "同一轉移碼在高度併發下應恰好只有 1 筆成功兌換");
  assert.equal(failures.length, 2, "其餘併發兌換必須全部失敗");
  assert.equal(failures[0].error, ErrorCodes.INVALID_TRANSFER_CODE);
  assert.equal(failures[0].key, "save.transferCodeAlreadyClaimed");

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Phase 3.5: RateLimiter 200ms 短視窗突發限制 (Burst Limiting)", () => {
  const rl = new RateLimiter({
    windowMs: 1000,
    maxRequests: 50,
    burstWindowMs: 200,
    burstLimit: 5
  });

  const ip = "192.168.1.100";
  // 5 requests within burst window should pass
  for (let i = 0; i < 5; i++) {
    const res = rl.check(ip);
    assert.equal(res.allowed, true, "突發請求應被允許");
  }

  // 6th request within 200ms burst window should be blocked
  const burstBlock = rl.check(ip);
  assert.equal(burstBlock.allowed, false, "第 6 筆突發請求應觸發 200ms 短視窗速率限制");
  assert.equal(burstBlock.isBurst, true);
});

test("Phase 3.5: Validator 嚴格 Origin 檢查與新增指令 Schema 檢驗", () => {
  const v = new Validator({
    allowedOrigins: ["https://koraku.app", "http://localhost:4173"],
    allowEmptyOrigin: false
  });

  // WebSocket upgrade with empty origin should be rejected when allowEmptyOrigin is false
  const emptyWsOrigin = v.validateOrigin(null, { isWsUpgrade: true });
  assert.equal(emptyWsOrigin, false, "WS 握手無 Origin 且未開啟 allowEmptyOrigin 應被拒絕");

  // Allowed origin
  assert.equal(v.validateOrigin("https://koraku.app", { isWsUpgrade: true }), true);

  // slicePercent out of range or NaN
  const badSlice1 = v.validatePayload(Commands.POST_BATTLE_STRIKE_WATERMELON, { slicePercent: 1.5 });
  assert.equal(badSlice1.valid, false, "slicePercent > 1 應被拒絕");

  const badSlice2 = v.validatePayload(Commands.POST_BATTLE_STRIKE_WATERMELON, { slicePercent: -0.1 });
  assert.equal(badSlice2.valid, false, "slicePercent < 0 應被拒絕");

  const goodSlice = v.validatePayload(Commands.POST_BATTLE_STRIKE_WATERMELON, { slicePercent: 0.85 });
  assert.equal(goodSlice.valid, true, "有效 slicePercent 應驗證通過");

  // autoBattle start rounds upper bound
  const bigRounds = v.validatePayload(Commands.AUTO_BATTLE_START, { stageId: 1, rounds: 200 });
  assert.equal(bigRounds.valid, false, "rounds > 100 應被拒絕");

  // cheat.unlockAll schema
  const cheatValid = v.validatePayload(Commands.CHEAT_UNLOCK_ALL, {});
  assert.equal(cheatValid.valid, true);
});

test("Phase 3.5: 雙手出拳線上裁決與戰鬥 Replay 保存", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-replay-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_dual_replay";
  await storage.saveAccount(accountId, {
    version: 1,
    coins: 1000,
    profile: { level: 10, xp: 500, skills: { dualHand: 1 } },
    inventory: {}
  });

  const session = new GameSession({
    accountId,
    deviceId: "dev_dual",
    storage
  });
  await session.load();

  // Start Stage 4 (Dual Boss)
  await session.executeCommand({
    cmdId: "start_s4",
    command: Commands.BATTLE_START,
    payload: { stageId: 4 }
  });
  assert.ok(session.activeBattle);
  const battleId = session.activeBattle.battleId;

  // Dual hand punch: hand + hand2
  const punchRes = await session.executeCommand({
    cmdId: "dual_punch_1",
    command: Commands.BATTLE_SELECT_HAND,
    payload: { hand: "rock", hand2: "paper" }
  });
  assert.equal(punchRes.ack, true);
  assert.equal(session.activeBattle?.selectedHands?.left, "rock", "伺服器應將 hand 映射為 left slot");
  assert.equal(session.activeBattle?.selectedHands?.right, "paper", "伺服器應將 hand2 映射為 right slot");
  assert.equal(punchRes.battleState?.selectedHands?.left, "rock");
  assert.equal(punchRes.battleState?.selectedHands?.right, "paper");

  // Abandon battle to trigger BATTLE_ENDED & replay saving
  await session.executeCommand({
    cmdId: "aban_s4",
    command: Commands.BATTLE_ABANDON
  });

  // Replay should have been saved to disk
  const replay = await storage.getBattleReplay(accountId, battleId);
  assert.ok(replay, "戰鬥結束後應在 storage 保存 Replay");
  assert.equal(replay.battleId, battleId);
  assert.equal(replay.stageId, 4);
  assert.ok(Array.isArray(replay.commandLog), "Replay 應包含 commandLog");
  assert.ok(typeof replay.seed === "number" || typeof replay.seed === "string", "Replay 應記錄 seed");

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Phase 4 - Step D: battleLockPolicy 非法值伺服器啟動時即拒絕 (Fail-fast validation)", () => {
  assert.throws(
    () => new KorakuServer({ battleLockPolicy: "invalid_mode" }),
    /Invalid battleLockPolicy 'invalid_mode'/
  );
  assert.throws(
    () => new KorakuServer({ battleLockPolicy: "sometimes" }),
    /Invalid battleLockPolicy 'sometimes'/
  );

  assert.doesNotThrow(() => new KorakuServer({ battleLockPolicy: "always" }));
  assert.doesNotThrow(() => new KorakuServer({ battleLockPolicy: "countdown" }));
  assert.doesNotThrow(() => new KorakuServer({ battleLockPolicy: "never" }));
});

test("Phase 4 - Step D: GameSession battleLockPolicy 三種策略 (always / countdown / never) 覆蓋四種突變在各 phase 之判定", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-lock-policy-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage });

  async function createTestSession(policy) {
    const session = new GameSession({
      accountId: "acc_policy_" + policy + "_" + Date.now(),
      storage,
      transferManager,
      battleLockPolicy: policy
    });
    await session.load();
    session.state.profile.skillPoints = 10;
    session.state.inventoryEquipment = ["sword_flame", "chest_samurai"];
    return session;
  }

  // 1. 策略 'always': 倒數階段與出拳判定階段皆全面鎖定四種突變
  {
    const sessionAlways = await createTestSession("always");
    await sessionAlways.executeCommand({ cmdId: "s1", command: Commands.BATTLE_START, payload: { stageId: 1 } });
    assert.equal(sessionAlways.activeBattle.phase, "countdown");

    // 四種突變在 countdown 階段皆被拒絕
    const eq = await sessionAlways.executeCommand({ cmdId: "e1", command: Commands.EQUIP_ITEM, payload: { slot: "weapon", itemId: "sword_flame" } });
    assert.equal(eq.ack, false);
    assert.equal(eq.error, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
    assert.equal(eq.key, "battle.lockedDuringBattle");

    const uneq = await sessionAlways.executeCommand({ cmdId: "ue1", command: Commands.UNEQUIP_ITEM, payload: { slot: "weapon" } });
    assert.equal(uneq.ack, false);
    assert.equal(uneq.error, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
    assert.equal(uneq.key, "battle.lockedDuringBattle");

    const stat = await sessionAlways.executeCommand({ cmdId: "st1", command: Commands.ALLOCATE_STAT, payload: { stat: "damage", points: 1 } });
    assert.equal(stat.ack, false);
    assert.equal(stat.error, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
    assert.equal(stat.key, "battle.lockedDuringBattle");

    const skill = await sessionAlways.executeCommand({ cmdId: "sk1", command: Commands.ALLOCATE_SKILL, payload: { skillId: "momo" } });
    assert.equal(skill.ack, false);
    assert.equal(skill.error, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
    assert.equal(skill.key, "battle.lockedDuringBattle");

    // 推進至 reaction phase: 同樣被拒絕
    sessionAlways.battle.state.phase = "reaction";
    const eqReact = await sessionAlways.executeCommand({ cmdId: "e2", command: Commands.EQUIP_ITEM, payload: { slot: "weapon", itemId: "sword_flame" } });
    assert.equal(eqReact.ack, false);
    assert.equal(eqReact.key, "battle.lockedDuringBattle");

    await sessionAlways.executeCommand({ cmdId: "ab1", command: Commands.BATTLE_ABANDON });
  }

  // 2. 策略 'countdown': 倒數與結算階段允許操作，reaction / qte 階段嚴格鎖定
  {
    const sessionCd = await createTestSession("countdown");
    await sessionCd.executeCommand({ cmdId: "s2", command: Commands.BATTLE_START, payload: { stageId: 1 } });
    assert.equal(sessionCd.activeBattle.phase, "countdown");

    // 在 countdown 階段允許突變
    assert.equal(sessionCd.isMutationLocked(), false);
    const eqCd = await sessionCd.executeCommand({ cmdId: "e_cd", command: Commands.EQUIP_ITEM, payload: { slot: "weapon", itemId: "sword_flame" } });
    assert.equal(eqCd.ack, true);

    const statCd = await sessionCd.executeCommand({ cmdId: "st_cd", command: Commands.ALLOCATE_STAT, payload: { stat: "damage", points: 1 } });
    assert.equal(statCd.ack, true);

    // 切換至 reaction 階段：鎖定
    sessionCd.battle.state.phase = "reaction";
    assert.equal(sessionCd.isMutationLocked(), true);
    const eqReact = await sessionCd.executeCommand({ cmdId: "e_react", command: Commands.UNEQUIP_ITEM, payload: { slot: "weapon" } });
    assert.equal(eqReact.ack, false);
    assert.equal(eqReact.key, "battle.lockedDuringBattle");

    // 切換至 qte 階段：鎖定
    sessionCd.battle.state.phase = "qte";
    assert.equal(sessionCd.isMutationLocked(), true);
    const skillQte = await sessionCd.executeCommand({ cmdId: "sk_qte", command: Commands.ALLOCATE_SKILL, payload: { skillId: "momo" } });
    assert.equal(skillQte.ack, false);
    assert.equal(skillQte.key, "battle.lockedDuringBattle");

    // 切換至 result 階段：允許
    sessionCd.battle.state.phase = "result";
    assert.equal(sessionCd.isMutationLocked(), false);

    await sessionCd.executeCommand({ cmdId: "ab2", command: Commands.BATTLE_ABANDON });
  }

  // 3. 策略 'never': 全階段均不鎖定
  {
    const sessionNever = await createTestSession("never");
    await sessionNever.executeCommand({ cmdId: "s3", command: Commands.BATTLE_START, payload: { stageId: 1 } });

    sessionNever.battle.state.phase = "countdown";
    assert.equal(sessionNever.isMutationLocked(), false);

    sessionNever.battle.state.phase = "reaction";
    assert.equal(sessionNever.isMutationLocked(), false);

    sessionNever.battle.state.phase = "qte";
    assert.equal(sessionNever.isMutationLocked(), false);

    const statNever = await sessionNever.executeCommand({ cmdId: "st_never", command: Commands.ALLOCATE_STAT, payload: { stat: "damage", points: 1 } });
    assert.equal(statNever.ack, true);

    await sessionNever.executeCommand({ cmdId: "ab3", command: Commands.BATTLE_ABANDON });
  }

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Part C - C1: GameSession 剝除 seed 與 commandLog 防止種子外洩", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-seed-strip-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage });

  const emittedBattleEvents = [];
  const session = new GameSession({
    accountId: "acc_seed_strip_test",
    storage,
    transferManager,
    emitFn: (event, payload) => {
      if (event === Events.BATTLE_STATE || event === Events.BATTLE_ENDED) {
        emittedBattleEvents.push({ event, payload });
      }
    }
  });
  await session.load();

  // 啟動戰鬥
  const startRes = await session.executeCommand({
    cmdId: "start_seed_test",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.equal(startRes.ack, true);

  // 1. activeBattle getter 斷言無 seed / commandLog
  const snap = session.activeBattle;
  assert.ok(snap, "應有活躍戰鬥快照");
  assert.equal(snap.seed, undefined, "activeBattle 不得洩漏 seed");
  assert.equal(snap.commandLog, undefined, "activeBattle 不得洩漏 commandLog");

  // 2. 指令回傳之 battleState 斷言無 seed / commandLog
  assert.equal(startRes.battleState.seed, undefined, "BATTLE_START ACK 不得洩漏 seed");
  assert.equal(startRes.battleState.commandLog, undefined, "BATTLE_START ACK 不得洩漏 commandLog");

  // 3. 事件推送之 battle:state 斷言無 seed / commandLog
  const stateEvts = emittedBattleEvents.filter(e => e.event === Events.BATTLE_STATE);
  assert.ok(stateEvts.length > 0, "應有推送 battle:state 事件");
  for (const evt of stateEvts) {
    assert.equal(evt.payload.seed, undefined, "推送的 battle:state 不得包含 seed");
    assert.equal(evt.payload.commandLog, undefined, "推送的 battle:state 不得包含 commandLog");
  }

  // 4. 戰鬥結束時，內部 replay 仍完整記錄 seed 與 commandLog，但客戶端推送剝除
  const battleId = session._currentBattleId;
  await session.executeCommand({ cmdId: "ab_seed", command: Commands.BATTLE_ABANDON });
  if (session._battleEndedPromise) await session._battleEndedPromise;
  const replay = await storage.getBattleReplay("acc_seed_strip_test", battleId);
  assert.ok(replay, "伺服器內部 replay 應已儲存");
  assert.ok(replay.seed !== undefined, "伺服器 replay 應保留 seed");
  assert.ok(Array.isArray(replay.commandLog), "伺服器 replay 應保留 commandLog");

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Part C - C2: ConnectionManager 斷線後經 GameSession 觸發 10 秒寬限期與自動結算完整生命週期", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-disconnect-grace-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage });
  const connManager = new ConnectionManager({ storage, transferManager });

  const accountId = "acc_disconnect_grace_flow";
  const fakeSocket = {
    readyState: 1,
    send: () => {},
    close: () => {}
  };

  connManager.registerConnection(accountId, fakeSocket, "conn_dc_1");
  const session = await connManager.getOrCreateSession(accountId);

  // 啟動戰鬥
  await session.executeCommand({
    cmdId: "cmd_start_dc_test",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.ok(session.battle?.isBattleActive(), "戰鬥應處於活躍狀態");
  assert.equal(session.battle.state.disconnected, undefined);

  // 1. 斷線觸發 (經 ConnectionManager.handleDisconnect)
  connManager.handleDisconnect(fakeSocket);
  assert.equal(session.battle.state.disconnected, true, "經 ConnectionManager 斷線後 battle.state.disconnected 應為 true");
  assert.ok(session.battle.disconnectTimeoutId !== null, "應啟動 10 秒寬限定時器");

  // 2. 測試重連恢復 (經 ConnectionManager.registerConnection)
  const fakeSocketReconn = {
    readyState: 1,
    send: () => {},
    close: () => {}
  };
  connManager.registerConnection(accountId, fakeSocketReconn, "conn_dc_2");
  assert.equal(session.battle.state.disconnected, false, "重新連線後 battle.state.disconnected 應恢復為 false");
  assert.equal(session.battle.disconnectTimeoutId, null, "寬限定時器應已清除");

  // 3. 再次斷線，模擬 10 秒超時結算
  connManager.handleDisconnect(fakeSocketReconn);
  assert.equal(session.battle.state.disconnected, true);
  // 直接觸發定時器回呼函式 settleDisconnect
  session.battle.settleDisconnect();
  assert.equal(session.battle.state.active, false, "10 秒逾時後戰鬥應已自動結算終止");

  if (session._battleEndedPromise) await session._battleEndedPromise;
  connManager.destroy();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Part C - C3: 伺服器端拒絕非法指令日誌審計記錄", async () => {
  const originalWarn = console.warn;
  const warnings = [];
  console.warn = (...args) => warnings.push(args.join(" "));

  try {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-reject-log-"));
    const server = new KorakuServer({
      port: 0,
      host: "127.0.0.1",
      dataDir: tmpDir,
      env: "development"
    });

    const sent = [];
    const fakeSocket = {
      readyState: 1,
      send: (data) => sent.push(JSON.parse(data)),
      on: () => {},
      close: () => {}
    };

    // 1. 發送非法 Schema 訊息（缺少 cmdId）
    await server._handleSocketMessage(fakeSocket, "acc_test_log", false, "127.0.0.1", JSON.stringify({
      command: Commands.BUY_ITEM
    }));

    assert.ok(warnings.some(w => w.includes("[KorakuServer] Command rejected (INVALID_SCHEMA)")), "伺服器應記錄 INVALID_SCHEMA 拒絕日誌");

    // 2. 發送未授權的作弊指令
    await server._handleSocketMessage(fakeSocket, "acc_test_log", false, "127.0.0.1", JSON.stringify({
      cmdId: "cmd_unauth_cheat",
      command: Commands.CHEAT_ADD_COINS,
      payload: { amount: 1000 },
      configVersion: CONFIG_VERSION
    }));

    assert.ok(warnings.some(w => w.includes("[KorakuServer] Command rejected (UNAUTHORIZED_CHEAT)")), "伺服器應記錄 UNAUTHORIZED_CHEAT 拒絕日誌");

    await fs.rm(tmpDir, { recursive: true, force: true });
  } finally {
    console.warn = originalWarn;
  }
});
