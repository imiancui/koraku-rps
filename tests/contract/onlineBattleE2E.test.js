// tests/contract/onlineBattleE2E.test.js
// End-to-end and proxy contract tests for RemoteGameClient and PostBattle proxy.
// Real WebSocket integration test against authoritative KorakuServer.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { RemoteGameClient } from "../../src/js/net/RemoteGameClient.js";
import { Commands, Events, ConnectionStates, ErrorCodes, CONFIG_VERSION } from "../../src/js/kernel/protocol.js";
import { EventBus } from "../../src/js/core/EventBus.js";
import { KorakuServer } from "../../server/server.js";

test("RemoteGameClient: store proxy this 引用與 getTheoreticalDPS 正確運作", async () => {
  const client = new RemoteGameClient({
    url: "ws://127.0.0.1:9999",
    autoReconnect: false
  });

  // Verify proxy existence
  assert.ok(client.store, "client.store proxy 必須存在");
  assert.equal(typeof client.store.snapshot, "function");
  assert.equal(typeof client.store.getTheoreticalDPS, "function");
  assert.equal(typeof client.store.toggleMusicMuted, "function");
  assert.equal(typeof client.store.toggleSfxMuted, "function");

  // Calling getTheoreticalDPS must not throw 'cannot read snapshot of undefined'
  let dps = 0;
  assert.doesNotThrow(() => {
    dps = client.store.getTheoreticalDPS();
  }, "呼叫 client.store.getTheoreticalDPS() 不得拋出異常");
  assert.ok(typeof dps === "number" && dps > 0, "DPS 必須為正數數值");

  // Test settings toggle
  const music = client.store.toggleMusicMuted();
  assert.equal(typeof music, "boolean");
  const sfx = client.store.toggleSfxMuted();
  assert.equal(typeof sfx, "boolean");

  client.destroy();
});

test("RemoteGameClient: postBattle proxy 具備全部 8 個方法且 open(result) 不崩潰", async () => {
  const client = new RemoteGameClient({
    url: "ws://127.0.0.1:9999",
    autoReconnect: false
  });

  // Verify proxy existence
  assert.ok(client.postBattle, "client.postBattle proxy 必須存在");

  // Verify all 8 methods exist
  assert.equal(typeof client.postBattle.getWatermelonStock, "function");
  assert.equal(typeof client.postBattle.closeAutoWatermelon, "function");
  assert.equal(typeof client.postBattle.emitAutoWatermelon, "function");
  assert.equal(typeof client.postBattle.open, "function");
  assert.equal(typeof client.postBattle.snapshot, "function");
  assert.equal(typeof client.postBattle.requestSwimsuit, "function");
  assert.equal(typeof client.postBattle.startWatermelon, "function");
  assert.equal(typeof client.postBattle.strike, "function");

  // Test client.postBattle.open(result)
  const battleResult = {
    won: true,
    stage: { id: 1, name: "測試關卡" },
    reward: { coins: 100, xp: 50 },
    combatDps: 120,
    damageDealt: 300,
    damageTaken: 50
  };

  let eventEmitted = null;
  client.on(Events.POSTBATTLE_STATE, (data) => {
    eventEmitted = data;
  });

  // Calling open() must not throw
  assert.doesNotThrow(() => {
    client.postBattle.open(battleResult);
  }, "呼叫 client.postBattle.open() 不得拋出異常");

  // Verify snapshot returns current state
  const snap = client.postBattle.snapshot();
  assert.ok(snap, "postBattle snapshot 必須有值");
  assert.equal(snap.won, true);
  assert.equal(snap.stage.id, 1);

  // Test closeAutoWatermelon and emitAutoWatermelon
  assert.doesNotThrow(() => {
    client.postBattle.closeAutoWatermelon();
    client.postBattle.emitAutoWatermelon();
  });

  client.destroy();
});

test("RemoteGameClient: battle proxy 閉包與 end 方法驗證", async () => {
  const client = new RemoteGameClient({
    url: "ws://127.0.0.1:9999",
    autoReconnect: false
  });

  assert.ok(client.battle, "client.battle proxy 必須存在");
  assert.equal(typeof client.battle.end, "function", "client.battle.end 方法必須存在");
  assert.equal(typeof client.battle.start, "function");
  assert.equal(typeof client.battle.selectHand, "function");
  assert.equal(typeof client.battle.abandon, "function");
  assert.equal(typeof client.battle.pause, "function");
  assert.equal(typeof client.battle.resume, "function");
  assert.equal(typeof client.battle.useItem, "function");

  // Calling end() safely cleans up without throwing
  assert.doesNotThrow(() => {
    client.battle.end();
  });

  // State getter returns valid snapshot or null
  assert.equal(client.battle.state, null);

  client.destroy();
});

test("RemoteGameClient: 雙手出拳 payload 格式與指令轉發", async () => {
  const client = new RemoteGameClient({
    url: "ws://127.0.0.1:9999",
    autoReconnect: false
  });

  const sentPayloads = [];
  // Mock client.send
  client.send = async (cmd, payload) => {
    sentPayloads.push({ cmd, payload });
    return { ack: true };
  };

  // 1. Single hand
  await client.battle.selectHand("rock");
  assert.equal(sentPayloads.length, 1);
  assert.equal(sentPayloads[0].cmd, Commands.BATTLE_SELECT_HAND);
  assert.equal(sentPayloads[0].payload.hand, "rock");
  assert.equal(sentPayloads[0].payload.slot, null);

  // 2. Dual hand (slot + hand)
  await client.battle.selectHand("scissors", "left");
  assert.equal(sentPayloads.length, 2);
  assert.equal(sentPayloads[1].payload.hand, "scissors");
  assert.equal(sentPayloads[1].payload.slot, "left");

  // 3. Dual punch simultaneously (left and right)
  await client.send(Commands.BATTLE_SELECT_HAND, { hand: "paper", hand2: "rock" });
  assert.equal(sentPayloads.length, 3);
  assert.equal(sentPayloads[2].payload.hand, "paper");
  assert.equal(sentPayloads[2].payload.hand2, "rock");

  client.destroy();
});

test("RemoteGameClient & KorakuServer E2E: 真實 WebSocket 連線打完一場戰鬥並結算入帳", async () => {
  // 1. 隔離環境：建立臨時資料目錄與隨機 port
  const tmpDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-e2e-"));
  const server = new KorakuServer({
    dataDir: tmpDataDir,
    port: 0,
    host: "127.0.0.1",
    allowedOrigins: ["*"],
    allowEmptyOrigin: true
  });

  await server.start(0, "127.0.0.1");
  const port = server.actualPort;
  assert.ok(port > 0, "伺服器必須成功監聽隨機 Port");

  let client = null;
  try {
    // 2. 啟動真實 RemoteGameClient 注入 ws 模組走 WebSocket
    client = new RemoteGameClient({
      url: `ws://127.0.0.1:${port}`,
      WebSocketClass: WebSocket,
      autoReconnect: false
    });

    let battleEndedReceived = false;
    let postBattleStateReceived = false;
    let endedResult = null;

    client.on(Events.BATTLE_ENDED, (data) => {
      battleEndedReceived = true;
      endedResult = data;
    });

    client.on(Events.POSTBATTLE_STATE, () => {
      postBattleStateReceived = true;
    });

    await client.init();
    assert.equal(client.connectionState, ConnectionStates.ONLINE, "客戶端連線狀態必須為 ONLINE");
    assert.ok(client.getToken(), "客戶端在握手後必須持有匿名 Token");

    // 3. 發起戰鬥 (Stage 1)
    const startRes = await client.battle.start(1);
    assert.equal(startRes.ack, true, "發起戰鬥必須回傳 ack: true");
    assert.ok(client.battle.isBattleActive(), "battle proxy 必須識別為活躍戰鬥");

    // 4. 出拳承諾
    const punchRes = await client.battle.selectHand("rock");
    assert.equal(punchRes.ack, true, "出拳必須成功被伺服器承諾");

    // 5. 結束戰鬥（透過放棄結算）觸發完整的 battle:ended -> postBattle -> 帳本追加流程
    const abandonRes = await client.battle.abandon();
    assert.equal(abandonRes.ack, true);

    // 等待事件轉發與後端非同步儲存
    await new Promise((r) => setTimeout(r, 150));

    // 6. 驗證戰鬥結束與 postBattle
    assert.ok(battleEndedReceived, "客戶端必須接收到 BATTLE_ENDED 事件");
    assert.ok(postBattleStateReceived, "客戶端必須接收到 POSTBATTLE_STATE 事件");
    const postSnap = client.postBattle.snapshot();
    assert.ok(postSnap, "postBattle.snapshot() 必須回傳戰後結算物件");
    assert.equal(postSnap.scene, "defeat", "放棄戰鬥結算場景應為 defeat");

    // 7. 驗證伺服器經濟帳本紀錄已寫入磁碟
    const token = client.getToken();
    const tokenData = server.auth.verifyToken(token);
    assert.ok(tokenData && tokenData.valid && tokenData.payload?.accountId, "Token 必須可被伺服器驗證解密出 accountId");

    const ledger = await server.storage.getLedger(tokenData.payload.accountId);
    assert.ok(Array.isArray(ledger) && ledger.length > 0, "帳本中必須有至少一筆記錄");
    const lastEntry = ledger[ledger.length - 1];
    assert.equal(lastEntry.source, "battleDefeat", "帳本記錄 source 必須為 battleDefeat");
    assert.equal(lastEntry.delta.stageId, 1, "帳本記錄關卡 ID 必須為 1");
  } finally {
    // 8. 嚴格資源清理
    if (client) {
      client.destroy();
    }
    await server.stop();
    await fs.rm(tmpDataDir, { recursive: true, force: true });
  }
});

test("RemoteGameClient: 收到伺服器版本不相容 (VERSION_MISMATCH) 觸發 Toast 提示刷新、中斷連線與停止重連", async () => {
  const tmpDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-mismatch-test-"));
  const server = new KorakuServer({
    dataDir: tmpDataDir,
    port: 0,
    host: "127.0.0.1",
    allowedOrigins: ["*"],
    allowEmptyOrigin: true,
    configVersion: "9999.99.99" // 故意設定不相容版本觸發客戶端檢查
  });

  await server.start(0, "127.0.0.1");

  const testBus = new EventBus();
  let toastReceived = null;
  testBus.on(Events.TOAST, (payload) => {
    toastReceived = payload;
  });

  const client = new RemoteGameClient({
    url: `ws://127.0.0.1:${server.actualPort}`,
    eventBus: testBus,
    autoReconnect: true, // 發生 VERSION_MISMATCH 時必須停止重連，不可進入風暴
    handshakeTimeout: 3000
  });

  try {
    let initError = null;
    try {
      await client.init();
    } catch (err) {
      initError = err;
    }

    assert.ok(initError, "client.init() 必須因版本不相容而拋出例外");
    assert.equal(initError.code, ErrorCodes.VERSION_MISMATCH);

    // 驗證 Toast 提示與參數
    assert.ok(toastReceived, "EventBus 必須收到 Events.TOAST 事件");
    assert.equal(toastReceived.key, "connection.version_mismatch");
    assert.equal(toastReceived.params?.serverConfig, "9999.99.99");
    assert.equal(toastReceived.params?.clientConfig, CONFIG_VERSION);

    // 驗證連線狀態與連線關閉
    assert.equal(client.connectionState, ConnectionStates.DISCONNECTED);
    assert.equal(client._isExplicitlyClosed, true, "必須設定 _isExplicitlyClosed = true 防止重連風暴");
  } finally {
    client.destroy();
    await server.stop();
    await fs.rm(tmpDataDir, { recursive: true, force: true });
  }
});