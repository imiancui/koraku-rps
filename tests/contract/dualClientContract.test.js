// tests/contract/dualClientContract.test.js
// Dual-client contract test suite (Tiers 1-4)
// Verifies 100% behavioral parity across LocalGameClient (in-process sandbox)
// and RemoteGameClient (authoritative server connection).

import test from "node:test";
import assert from "node:assert/strict";
import { GameClient } from "../../src/js/kernel/GameClient.js";
import { LocalGameClient } from "../../src/js/kernel/LocalGameClient.js";
import { RemoteGameClient } from "../../src/js/net/RemoteGameClient.js";
import {
  Commands,
  Events,
  ConnectionStates,
  ErrorCodes,
  CONFIG_VERSION,
  createCommandEnvelope
} from "../../src/js/kernel/protocol.js";
import {
  MemoryPersistence,
  AuthoritativeKernelServer,
  TestLocalGameClient,
  TestRemoteGameClient
} from "../helpers/testHarness.js";

test("Tier 1 - F1: GameClient 抽象基類契約（禁止直接實例化並宣告所有必要介面）", () => {
  assert.throws(
    () => new GameClient(),
    /Cannot instantiate abstract class GameClient directly/,
    "直接 new GameClient() 應拋出 TypeError"
  );

  class IncompleteClient extends GameClient {}
  const incomplete = new IncompleteClient();

  assert.rejects(async () => await incomplete.init(), /Abstract method init\(\) must be implemented/);
  assert.rejects(async () => await incomplete.send("test"), /Abstract method send\(\) must be implemented/);
  assert.throws(() => incomplete.getState(), /Abstract method getState\(\) must be implemented/);
  assert.equal(incomplete.connectionState, ConnectionStates.OFFLINE);
  assert.equal(incomplete.hasDevEntitlement(), false);
});

test("Tier 1 - F1: 命令信封格式（Envelope Contract）標準結構驗證", () => {
  const envelope = createCommandEnvelope(Commands.BUY_ITEM, { itemKey: "hpPotion" }, { token: "user_jwt_token" });
  assert.ok(typeof envelope.cmdId === "string" && envelope.cmdId.length >= 8, "應生成有效 cmdId");
  assert.equal(envelope.command, Commands.BUY_ITEM);
  assert.deepEqual(envelope.payload, { itemKey: "hpPotion" });
  assert.equal(typeof envelope.clientTime, "number");
  assert.equal(envelope.configVersion, CONFIG_VERSION);
  assert.equal(envelope.token, "user_jwt_token");
});

test("Tier 1 - F1: 雙端事件訂閱與解訂閱契約（on, off, cleanup function）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  let ackCount = 0;
  const ackHandler = () => { ackCount++; };
  const unsubscribe = localClient.on(Events.COMMAND_ACK, ackHandler);

  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(ackCount, 1, "發送指令後應觸發 1 次 COMMAND_ACK");

  unsubscribe(); // 解訂閱
  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(ackCount, 1, "解訂閱後不應再收到事件");

  // 使用 off() 解訂閱
  let offCount = 0;
  const handler2 = () => { offCount++; };
  localClient.on(Events.COMMAND_ACK, handler2);
  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(offCount, 1);
  localClient.off(Events.COMMAND_ACK, handler2);
  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(offCount, 1, "經由 off() 解除後不應再收到事件");

  localClient.destroy();
});

test("Tier 2 - F1 & F3: 雙端狀態等價性 — 經濟、背包與裝備穿脫（Local vs Remote）", async () => {
  const localPersistence = new MemoryPersistence();
  const localClient = new TestLocalGameClient({ persistence: localPersistence });
  await localClient.init();

  const serverPersistence = new MemoryPersistence();
  const server = new AuthoritativeKernelServer({ persistence: serverPersistence, devTokens: ["dev_token_contract"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_token_contract" });
  await remoteClient.init();

  async function runProgressionScript(client) {
    const storeEvents = [];
    const unsubStore = client.on(Events.STORE_CHANGED, (e) => storeEvents.push(e));

    // 1. 加幣
    await client.send(Commands.CHEAT_ADD_COINS, { amount: 5000 });

    // 2. 購買多種藥水
    await client.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
    await client.send(Commands.BUY_ITEM, { itemKey: "mpPotion" });

    // 3. 購買裝備
    await client.send(Commands.BUY_EQUIPMENT, { equipId: "sword_flame" });
    await client.send(Commands.BUY_EQUIPMENT, { equipId: "chest_samurai" });

    // 4. 穿戴裝備
    await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
    await client.send(Commands.EQUIP_ITEM, { itemId: "chest_samurai", slot: "chest" });

    // 5. 分配點數與技能
    client.server.store.state.profile.level = 3;
    client.server.store.state.profile.skillPoints = 10;
    await client.send(Commands.ALLOCATE_STAT, { stat: "damage" });
    await client.send(Commands.ALLOCATE_STAT, { stat: "hp" });
    await client.send(Commands.ALLOCATE_SKILL, { skill: "momo" });

    // 6. 卸下裝備
    await client.send(Commands.UNEQUIP_ITEM, { slot: "mainHand" });

    unsubStore();
    return {
      state: client.getState(),
      storeEventsCount: storeEvents.length
    };
  }

  const localRes = await runProgressionScript(localClient);
  const remoteRes = await runProgressionScript(remoteClient);

  // 斷言雙端最終狀態完全等價
  assert.equal(localRes.state.coins, remoteRes.state.coins);
  assert.equal(localRes.state.inventory.hpPotion, remoteRes.state.inventory.hpPotion);
  assert.equal(localRes.state.inventory.mpPotion, remoteRes.state.inventory.mpPotion);
  assert.equal(localRes.state.equipment.chest, remoteRes.state.equipment.chest);
  assert.equal(localRes.state.equipment.mainHand, remoteRes.state.equipment.mainHand);
  assert.equal(localRes.state.profile.allocations.damage, remoteRes.state.profile.allocations.damage);
  assert.equal(localRes.state.profile.allocations.hp, remoteRes.state.profile.allocations.hp);
  assert.equal(localRes.state.profile.skills.momo, remoteRes.state.profile.skills.momo);
  assert.deepEqual(localRes.state.inventoryEquipment, remoteRes.state.inventoryEquipment);

  localClient.destroy();
  remoteClient.destroy();
});

test("Tier 3 - F1 & F2: 雙端狀態等價性 — 戰鬥生命週期與動作互動（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer({ devTokens: ["dev_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_1" });
  await remoteClient.init();

  async function runBattleScript(client) {
    const battleEvents = [];
    const unsub = client.on(Events.BATTLE_STATE, (s) => battleEvents.push(s));

    // 1. 開啟第 1 關戰鬥
    const startRes = await client.send(Commands.BATTLE_START, { stageId: 1 });
    assert.equal(startRes.ok, true);

    // 2. 出拳手勢提交
    const handRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "scissors" });
    assert.equal(handRes.ok, true);

    // 3. 戰鬥中使用 MP 藥水
    client.server.store.state.inventory.mpPotion = 2;
    const itemRes = await client.send(Commands.BATTLE_USE_ITEM, { itemKey: "mpPotion" });
    assert.equal(itemRes.ok, true);

    // 4. 觸發變拳技能
    const morphRes = await client.send(Commands.BATTLE_USE_MORPH, {});
    assert.equal(morphRes.ok, true);

    // 5. QTE 輸入回報
    const qteRes = await client.send(Commands.BATTLE_INPUT_QTE, { key: "ArrowDown", timestamp: Date.now() });
    assert.equal(qteRes.ok, true);

    // 6. 暫停與繼續
    const pauseRes = await client.send(Commands.BATTLE_PAUSE, {});
    assert.equal(pauseRes.ok, true);
    const resumeRes = await client.send(Commands.BATTLE_RESUME, {});
    assert.equal(resumeRes.ok, true);

    // 7. 放棄戰鬥
    const abandonRes = await client.send(Commands.BATTLE_ABANDON, {});
    assert.equal(abandonRes.ok, true);

    unsub();
    return {
      eventsCount: battleEvents.length,
      finalActive: client.server.activeBattle
    };
  }

  const localBattle = await runBattleScript(localClient);
  const remoteBattle = await runBattleScript(remoteClient);

  assert.equal(localBattle.finalActive, null);
  assert.equal(remoteBattle.finalActive, null);
  assert.equal(localBattle.eventsCount, remoteBattle.eventsCount);

  localClient.destroy();
  remoteClient.destroy();
});

test("Tier 3 - F1 & F9: 雙端狀態等價性 — 結算、切西瓜與自動刷關流程（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer();
  const remoteClient = new TestRemoteGameClient(server);
  await remoteClient.init();

  async function runMinigameScript(client) {
    const postEvents = [];
    client.on(Events.POSTBATTLE_STATE, (data) => postEvents.push(data));

    // 泳裝請求
    const swimRes = await client.send(Commands.POST_BATTLE_REQUEST_SWIMSUIT);
    assert.equal(swimRes.ok, true);

    // 切西瓜開始與揮刀
    const wmStart = await client.send(Commands.POST_BATTLE_START_WATERMELON);
    assert.equal(wmStart.ok, true);
    const wmStrike = await client.send(Commands.POST_BATTLE_STRIKE_WATERMELON, { slicePercent: 0.88 });
    assert.equal(wmStrike.ok, true);
    assert.equal(wmStrike.bonusXp, 100);

    // 自動刷關啟動與停止
    const autoStart = await client.send(Commands.AUTO_BATTLE_START, { stageId: 3, rounds: 5 });
    assert.equal(autoStart.ok, true);
    const autoStop = await client.send(Commands.AUTO_BATTLE_STOP);
    assert.equal(autoStop.ok, true);

    return postEvents;
  }

  const localPost = await runMinigameScript(localClient);
  const remotePost = await runMinigameScript(remoteClient);

  assert.deepEqual(
    localPost.map(e => e.phase),
    remotePost.map(e => e.phase),
    "雙端切西瓜與結算切換階段應完全一致"
  );

  localClient.destroy();
  remoteClient.destroy();
});

test("Tier 4 - F1 & F8: 雙端狀態等價性 — 帳號資料治理與轉移碼流程（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer();
  const remoteClient = new TestRemoteGameClient(server);
  await remoteClient.init();

  // 1. 匯出 JSON 資料
  const localExport = await localClient.send(Commands.ACCOUNT_EXPORT_JSON);
  const remoteExport = await remoteClient.send(Commands.ACCOUNT_EXPORT_JSON);
  assert.equal(localExport.ok, true);
  assert.equal(remoteExport.ok, true);
  assert.equal(localExport.data.version, remoteExport.data.version);

  // 2. 簽發轉移碼
  const issueRes = await remoteClient.send(Commands.ACCOUNT_ISSUE_TRANSFER_CODE);
  assert.equal(issueRes.ok, true);
  assert.ok(issueRes.code.startsWith("TR_"));

  // 3. 兌換轉移碼
  const claimRes = await remoteClient.send(Commands.ACCOUNT_CLAIM_TRANSFER_CODE, { code: issueRes.code });
  assert.equal(claimRes.ok, true);

  // 4. 重複兌換應被拒
  const claimDup = await remoteClient.send(Commands.ACCOUNT_CLAIM_TRANSFER_CODE, { code: issueRes.code });
  assert.equal(claimDup.ok, false);
  assert.equal(claimDup.code, ErrorCodes.INVALID_TRANSFER_CODE);

  // 5. 刪除帳號 (GDPR Account Delete)
  const delRes = await remoteClient.send(Commands.ACCOUNT_DELETE);
  assert.equal(delRes.ok, true);
  assert.equal(remoteClient.getState().coins, 0);

  localClient.destroy();
  remoteClient.destroy();
});
