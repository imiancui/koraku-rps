// tests/security/antiCheat.test.js
// Anti-cheat, Security & Authority Invariants test suite (Tiers 1-4)
// Covers: Timing claims (150ms grace, IKI >= 40ms, watermelon triangular wave),
// secret commitments expiration, battle equipment/stat locking (BATTLE_IN_PROGRESS_LOCKED),
// dev entitlements for cheats, 4KB payload limits, rate limiting, and disconnect grace.

import test from "node:test";
import assert from "node:assert/strict";
import {
  Commands,
  Events,
  ErrorCodes,
  CONFIG_VERSION,
  createCommandEnvelope
} from "../../src/js/kernel/protocol.js";
import {
  AuthoritativeKernelServer,
  MemoryPersistence,
  TestRemoteGameClient
} from "../helpers/testHarness.js";
import { Validator } from "../../server/core/Validator.js";
import { RateLimiter } from "../../server/core/RateLimiter.js";
import { EntitlementManager } from "../../server/core/Entitlements.js";

test("Tier 1 - F7: 偽造封包、非法欄位注入與 4KB 封包大小上限防護 (Validator)", () => {
  const validator = new Validator({
    allowedOrigins: ["http://localhost:4173", "https://koraku.app"],
    configVersion: CONFIG_VERSION,
    maxEnvelopeSizeBytes: 4096 // 4KB
  });

  // 1. 空封包與非物件
  assert.equal(validator.validateEnvelope(null).valid, false);
  assert.equal(validator.validateEnvelope([]).valid, false);
  assert.equal(validator.validateEnvelope("string").valid, false);

  // 2. 缺少必要 cmdId 或 command
  assert.equal(validator.validateEnvelope({ command: Commands.BUY_ITEM }).valid, false);
  assert.equal(validator.validateEnvelope({ cmdId: "cmd_01" }).valid, false);

  // 3. 非法/注入欄位（Whitelist violation）
  const injected = {
    cmdId: "cmd_injected_1",
    command: Commands.BUY_ITEM,
    payload: { itemId: "hpPotion" },
    maliciousSql: "DROP TABLE users;",
    configVersion: CONFIG_VERSION
  };
  const injRes = validator.validateEnvelope(injected);
  assert.equal(injRes.valid, false);
  assert.equal(injRes.code, ErrorCodes.INVALID_SCHEMA);

  // 4. 超過 4KB (4096 bytes) 大小限制之封包拒絕
  const oversizedPayload = JSON.stringify({
    cmdId: "cmd_huge",
    command: Commands.BUY_ITEM,
    payload: { blob: "A".repeat(4500) }
  });
  const sizeRes = validator.validateRawMessage(oversizedPayload);
  assert.equal(sizeRes.valid, false);
  assert.equal(sizeRes.code, ErrorCodes.INVALID_SCHEMA);
  assert.ok(sizeRes.error.includes("exceeds limit"));

  // 5. 版本不匹配 (VERSION_MISMATCH)
  const mismatch = {
    cmdId: "cmd_mismatch",
    command: Commands.BUY_ITEM,
    payload: { itemId: "hpPotion" },
    configVersion: "0.0.1"
  };
  const verRes = validator.validateEnvelope(mismatch);
  assert.equal(verRes.valid, false);
  assert.equal(verRes.code, ErrorCodes.VERSION_MISMATCH);
});

test("Tier 2 - F7: 來源 (Origin) 檢查與 CSRF 跨站攻擊防禦", () => {
  const validator = new Validator({
    allowedOrigins: ["http://localhost:4173", "https://koraku.app", "http://127.0.0.1:4173"]
  });

  assert.equal(validator.validateOrigin("http://localhost:4173"), true);
  assert.equal(validator.validateOrigin("https://koraku.app"), true);
  assert.equal(validator.validateOrigin("http://127.0.0.1:4173"), true);
  assert.equal(validator.validateOrigin(null), true, "非瀏覽器直連（如原生 App/測試）應允許");
  assert.equal(validator.validateOrigin("http://evil-attacker.com"), false);
  assert.equal(validator.validateOrigin("https://phishing-koraku.com"), false);
});

test("Tier 2 - F7: 流量限制 (RateLimiter) 與突發防護 (Burst Protection)", () => {
  const limiter = new RateLimiter({
    windowMs: 1000,
    maxRequestsPerWindow: 5,
    burstLimit: 5
  });

  const ip = "10.0.0.42";
  for (let i = 0; i < 5; i++) {
    const res = limiter.check(ip);
    assert.equal(res.allowed, true, `第 ${i + 1} 次應通過`);
  }

  // 第 6 次超過突發上限應被拒絕
  const rejected = limiter.check(ip);
  assert.equal(rejected.allowed, false, "超過 5 次突發請求應被阻擋");
  assert.ok(rejected.retryAfterMs > 0);

  // 另一個獨立 IP 不受影響
  const otherIp = "10.0.0.99";
  assert.equal(limiter.check(otherIp).allowed, true);

  limiter.destroy();
});

test("Tier 2 - F7: 線上環境作弊指令需 Dev Entitlement 權限檢驗與審計日誌", () => {
  const loggedWarnings = [];
  const fakeLogger = {
    warn: (msg) => loggedWarnings.push(msg)
  };
  const entitlements = new EntitlementManager({ logger: fakeLogger });

  // 一般玩家無 Dev 權限 -> 阻擋作弊指令並寫入審計日誌
  const unauthorizedCheck = entitlements.checkEntitlement({
    command: Commands.CHEAT_SET_STATS,
    accountId: "acc_guest_1",
    devEntitlement: false,
    ip: "192.168.1.50"
  });
  assert.equal(unauthorizedCheck.allowed, false);
  assert.equal(unauthorizedCheck.error, ErrorCodes.UNAUTHORIZED_CHEAT);
  assert.equal(loggedWarnings.length, 1);
  assert.ok(loggedWarnings[0].includes("[SECURITY AUDIT]"));

  // 擁有 Dev 權限之管理員 -> 允許執行
  const authorizedCheck = entitlements.checkEntitlement({
    command: Commands.CHEAT_SET_STATS,
    accountId: "acc_admin",
    devEntitlement: true
  });
  assert.equal(authorizedCheck.allowed, true);
});

test("Tier 2 - F7 & F2: Class 1 時序判定 — 150ms Grace 容許值與超時延遲審計", async () => {
  let virtualTime = 1000000;
  const server = new AuthoritativeKernelServer({ now: () => virtualTime });
  const client = new TestRemoteGameClient(server);
  await client.init();

  await client.send(Commands.BATTLE_START, { stageId: 1 });

  // 1. 在 150ms 容許範圍內之 QTE 輸入 -> 成功
  virtualTime += 100;
  const inGraceQte = await client.send(Commands.BATTLE_INPUT_QTE, {
    key: "ArrowUp",
    timestamp: virtualTime - 50 // 延遲 50ms (<= 150ms grace)
  });
  assert.equal(inGraceQte.ok, true);

  // 2. 偽造未來時間或過度延遲之時鐘漂移 (> 5000ms) -> 觸發時序審計失敗
  const spoofedQte = await client.send(Commands.BATTLE_INPUT_QTE, {
    key: "ArrowUp",
    timestamp: virtualTime - 999999 // 漂移巨大
  });
  assert.equal(spoofedQte.ok, false);
  assert.equal(spoofedQte.code, ErrorCodes.TIMING_AUDIT_FAILED);

  client.destroy();
});

test("Tier 2 - F7 & F2: Class 1 時序判定 — QTE 按鍵間隔 (IKI >= 40ms) 防外掛連點檢驗", () => {
  // 檢驗鍵盤連續輸入間隔 (Inter-Keystroke Interval, IKI)
  // 人類極限單指快速連點通常在 60~100ms，任何低於 40ms 之連續不同方向輸入視為機器人/巨集作弊
  function auditKeystrokeIntervals(keystrokes) {
    for (let i = 1; i < keystrokes.length; i++) {
      const interval = keystrokes[i].timestamp - keystrokes[i - 1].timestamp;
      if (interval < 40) {
        return { valid: false, error: "IKI_BELOW_MINIMUM_THRESHOLD", interval };
      }
    }
    return { valid: true };
  }

  // 正常人類輸入 (間隔 85ms, 110ms, 95ms)
  const humanKeystrokes = [
    { key: "ArrowUp", timestamp: 1000 },
    { key: "ArrowRight", timestamp: 1085 },
    { key: "ArrowDown", timestamp: 1195 },
    { key: "ArrowLeft", timestamp: 1290 }
  ];
  assert.equal(auditKeystrokeIntervals(humanKeystrokes).valid, true);

  // 外掛超人類瞬發輸入 (間隔 2ms, 5ms)
  const botKeystrokes = [
    { key: "ArrowUp", timestamp: 1000 },
    { key: "ArrowRight", timestamp: 1002 },
    { key: "ArrowDown", timestamp: 1007 }
  ];
  const botAudit = auditKeystrokeIntervals(botKeystrokes);
  assert.equal(botAudit.valid, false);
  assert.equal(botAudit.error, "IKI_BELOW_MINIMUM_THRESHOLD");
  assert.ok(botAudit.interval < 40);
});

test("Tier 2 - F7 & F2: Class 1 時序判定 — 切西瓜三角波震盪 (Watermelon Triangular Wave) 物理審計", () => {
  // 切西瓜指標為三角波週期震盪（指針在 0.0 ~ 1.0 ~ 0.0 間往復運動）
  // 伺服器根據 minigame 開始時間與當前伺服器時間，計算出期望指針位置並進行容差比對
  function computeTriangularWavePosition(elapsedMs, periodMs = 2000) {
    const cycle = (elapsedMs % periodMs) / periodMs; // 0.0 ~ 1.0
    if (cycle <= 0.5) {
      return cycle * 2; // 0 -> 1
    } else {
      return (1.0 - cycle) * 2; // 1 -> 0
    }
  }

  function auditWatermelonStrike(startTime, strikeTime, claimedSlicePercent, periodMs = 2000, tolerance = 0.15) {
    const elapsed = Math.max(0, strikeTime - startTime);
    const expectedPosition = computeTriangularWavePosition(elapsed, periodMs);
    const diff = Math.abs(expectedPosition - claimedSlicePercent);
    if (diff > tolerance) {
      return { valid: false, expectedPosition, claimedSlicePercent, diff };
    }
    return { valid: true, expectedPosition, claimedSlicePercent };
  }

  const startTime = 100000;
  // 500ms 時期望指針位於 0.5
  const t1 = startTime + 500;
  assert.equal(auditWatermelonStrike(startTime, t1, 0.50).valid, true);
  assert.equal(auditWatermelonStrike(startTime, t1, 0.55).valid, true, "容許 15% 網路抖動誤差");

  // 偽造必中宣稱（在指針位於 0.1 時宣稱自己在 0.95 綠色區切中）
  const t2 = startTime + 100; // 期望位置約 0.10
  const fraudStrike = auditWatermelonStrike(startTime, t2, 0.95);
  assert.equal(fraudStrike.valid, false, "偏離實際物理震盪位置時應判定作弊");
});

test("Tier 2 - F7 & F2: Class 2 秘密承諾 — 出拳手勢過期拒絕 (Secret Commitment Expiration)", async () => {
  let virtualTime = 500000;
  const server = new AuthoritativeKernelServer({ now: () => virtualTime });
  const client = new TestRemoteGameClient(server);
  await client.init();

  // 第 1 關 5 秒倒數 -> revealDeadline = virtualTime + 5000
  await client.send(Commands.BATTLE_START, { stageId: 1 });
  const deadline = server.activeBattle.revealDeadline;
  assert.equal(deadline, virtualTime + 5000);

  // 1. 於 deadline 前（第 2 秒）提交出拳 -> 有效
  virtualTime += 2000;
  const onTimeRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "rock" });
  assert.equal(onTimeRes.ok, true);
  assert.equal(server.activeBattle.committedHand, "rock");

  // 2. 逾時之後（第 6 秒，已過 deadline）再次提交 -> 拒絕且不覆蓋
  virtualTime += 4000; // 現在 virtualTime = 506000 > deadline (505000)
  const lateRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "paper" });
  assert.equal(lateRes.ok, false);
  assert.equal(lateRes.code, ErrorCodes.SECRET_COMMITMENT_EXPIRED);
  assert.equal(server.activeBattle.committedHand, "rock", "過期手勢不得覆蓋原承諾");

  client.destroy();
});

test("Tier 2 - F7 & F2: 戰鬥進行中裝備與屬性配點鎖定 (BATTLE_IN_PROGRESS_LOCKED)", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  server.store.state.inventoryEquipment = ["sword_flame"];
  server.store.state.profile.skillPoints = 5;

  await client.send(Commands.BATTLE_START, { stageId: 1 });
  assert.equal(server.activeBattle.active, true);

  // 1. 戰鬥中嘗試換裝 -> 拒絕
  const equipRes = await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  assert.equal(equipRes.ok, false);
  assert.equal(equipRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 2. 戰鬥中嘗試卸下裝備 -> 拒絕
  const unequipRes = await client.send(Commands.UNEQUIP_ITEM, { slot: "mainHand" });
  assert.equal(unequipRes.ok, false);
  assert.equal(unequipRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 3. 戰鬥中嘗試分配屬性點 -> 拒絕
  const statRes = await client.send(Commands.ALLOCATE_STAT, { stat: "damage" });
  assert.equal(statRes.ok, false);
  assert.equal(statRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 4. 戰鬥中嘗試升級技能 -> 拒絕
  const skillRes = await client.send(Commands.ALLOCATE_SKILL, { skill: "momo" });
  assert.equal(skillRes.ok, false);
  assert.equal(skillRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 結束戰鬥後解鎖
  await client.send(Commands.BATTLE_ABANDON);
  assert.equal(server.activeBattle, null);

  const postEquip = await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  assert.equal(postEquip.ok, true);
  assert.equal(server.store.state.equipment.mainHand, "sword_flame");

  client.destroy();
});

test("Tier 3 - F7 & F2: 戰鬥暫停限制（僅 countdown 階段可用且每場限 3 次）", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  await client.send(Commands.BATTLE_START, { stageId: 1 });

  // 3 次 countdown 暫停成功
  for (let i = 1; i <= 3; i++) {
    const pauseRes = await client.send(Commands.BATTLE_PAUSE);
    assert.equal(pauseRes.ok, true);
    assert.equal(pauseRes.pauseCount, i);
    await client.send(Commands.BATTLE_RESUME);
  }

  // 第 4 次暫停被拒
  const fourthPause = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(fourthPause.ok, false);
  assert.equal(fourthPause.code, ErrorCodes.PAUSE_LIMIT_REACHED);

  // 非 countdown 階段（如 reaction/QTE）嚴格拒絕暫停
  server.activeBattle.phase = "reaction";
  server.activeBattle.pauseCount = 0;
  const reactionPause = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(reactionPause.ok, false);
  assert.equal(reactionPause.code, ErrorCodes.INVALID_PHASE_PAUSE);

  client.destroy();
});

test("Tier 3 - F7 & F2: 斷線 10 秒寬限期與自動結算 (10s Disconnect Auto-Settlement)", () => {
  let virtualTime = 2000000;
  const server = new AuthoritativeKernelServer({ now: () => virtualTime });
  const token = "disconnect_player_token";

  server.executeCommand(createCommandEnvelope(Commands.BATTLE_START, { stageId: 1 }, { token }));
  assert.equal(server.activeBattle.active, true);

  // 斷線觸發
  server.handlePlayerDisconnect(token);

  // 5 秒內重連 -> 成功恢復
  virtualTime += 5000;
  const reconn1 = server.handlePlayerReconnect(token);
  assert.equal(reconn1.ok, true);
  assert.equal(reconn1.battle.active, true);

  // 再次斷線，超過 10 秒未重連 (11 秒) -> 觸發自動結算為戰敗
  server.handlePlayerDisconnect(token);
  virtualTime += 11000;
  server.tickDisconnectGrace(virtualTime);

  assert.equal(server.activeBattle.active, false);
  const reconnFail = server.handlePlayerReconnect(token);
  assert.equal(reconnFail.ok, false);
});
