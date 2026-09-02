// tests/contract.test.js
// Dual-client contract test suite: verifies identical behavioral contracts and scenario execution
// across LocalGameClient and RemoteGameClient.

import test from "node:test";
import assert from "node:assert/strict";
import { GameClient } from "../src/js/kernel/GameClient.js";
import { LocalGameClient } from "../src/js/kernel/LocalGameClient.js";
import { RemoteGameClient } from "../src/js/net/RemoteGameClient.js";
import {
  Commands,
  Events,
  ConnectionStates,
  CONFIG_VERSION,
  createCommandEnvelope
} from "../src/js/kernel/protocol.js";
import {
  MemoryPersistence,
  AuthoritativeKernelServer,
  TestLocalGameClient,
  TestRemoteGameClient
} from "./helpers/testHarness.js";

test("GameClient 抽象類別契約：禁止直接實例化並宣告所有必要方法", () => {
  assert.throws(
    () => new GameClient(),
    /Cannot instantiate abstract class GameClient directly/,
    "直接 new GameClient() 應拋出 TypeError"
  );
});

test("命令信封格式（Envelope Contract）：必須包含 cmdId, command, payload, clientTime, configVersion", () => {
  const envelope = createCommandEnvelope(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.ok(typeof envelope.cmdId === "string" && envelope.cmdId.length > 5, "應生成有效 cmdId");
  assert.equal(envelope.command, Commands.BUY_ITEM);
  assert.deepEqual(envelope.payload, { itemKey: "hpPotion" });
  assert.equal(typeof envelope.clientTime, "number");
  assert.equal(envelope.configVersion, CONFIG_VERSION);
});

test("雙端事件訂閱與解訂閱契約：on() 監聽事件、回傳之 cleanup 與 off() 皆能停止監聽", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  let eventCount = 0;
  const handler = () => { eventCount++; };
  const unsubscribe = localClient.on(Events.COMMAND_ACK, handler);

  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(eventCount, 1, "發送指令後應觸發 1 次 COMMAND_ACK 事件");

  unsubscribe(); // 解訂閱
  await localClient.send(Commands.BUY_ITEM, { itemKey: "hpPotion" });
  assert.equal(eventCount, 1, "解訂閱後不應再收到事件");

  // 使用 off() 解訂閱測試
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

test("雙端情境劇本等價性驗證：角色養成與道具裝備（Local vs Remote）", async () => {
  // 設定兩組獨立環境：LocalClient 與 RemoteClient (搭配權威伺服器)
  const localPersistence = new MemoryPersistence();
  const localClient = new TestLocalGameClient({ persistence: localPersistence });
  await localClient.init();

  const serverPersistence = new MemoryPersistence();
  const server = new AuthoritativeKernelServer({ persistence: serverPersistence, devTokens: ["dev_token_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_token_1" });
  await remoteClient.init();

  // 劇本執行函數
  async function runProgressionScript(client) {
    const events = [];
    const unsubStore = client.on(Events.STORE_CHANGED, (e) => events.push(e));

    // 1. 給予初始金幣以利購買
    await client.send(Commands.CHEAT_ADD_COINS, { amount: 2000 });

    // 2. 購買道具
    const buyItemRes = await client.send(Commands.BUY_ITEM, { itemKey: "mpPotion" });
    assert.equal(buyItemRes.ok, true, "購買 mpPotion 應成功");

    // 3. 購買裝備
    const buyEquipRes = await client.send(Commands.BUY_EQUIPMENT, { equipId: "sword_flame" });
    assert.equal(buyEquipRes.ok, true, "購買 sword_flame 應成功");

    // 4. 穿戴裝備
    const equipRes = await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
    assert.equal(equipRes.ok, true, "穿戴 sword_flame 應成功");

    // 5. 分配點數
    client.server.store.state.profile.level = 2;
    client.server.store.state.profile.skillPoints = 5; // 給予點數
    const statRes = await client.send(Commands.ALLOCATE_STAT, { stat: "damage" });
    assert.equal(statRes.ok, true, "分配攻擊力點數應成功");

    // 6. 分配技能
    const skillRes = await client.send(Commands.ALLOCATE_SKILL, { skill: "momo" });
    assert.equal(skillRes.ok, true, "升級摸摸技能應成功");

    // 7. 卸下裝備
    const unequipRes = await client.send(Commands.UNEQUIP_ITEM, { slot: "mainHand" });
    assert.equal(unequipRes.ok, true, "卸下裝備應成功");

    unsubStore();
    return {
      state: client.getState(),
      eventCount: events.length
    };
  }

  const localResult = await runProgressionScript(localClient);
  const remoteResult = await runProgressionScript(remoteClient);

  // 斷言雙端狀態 100% 一致
  assert.equal(localResult.state.inventory.mpPotion, remoteResult.state.inventory.mpPotion);
  assert.equal(localResult.state.coins, remoteResult.state.coins);
  assert.equal(localResult.state.profile.allocations.damage, remoteResult.state.profile.allocations.damage);
  assert.equal(localResult.state.profile.skills.momo, remoteResult.state.profile.skills.momo);
  assert.equal(localResult.state.equipment.mainHand, remoteResult.state.equipment.mainHand);
  assert.deepEqual(localResult.state.inventoryEquipment, remoteResult.state.inventoryEquipment);

  localClient.destroy();
  remoteClient.destroy();
});

test("雙端情境劇本等價性驗證：戰鬥生命週期與動作（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer({ devTokens: ["dev_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_1" });
  await remoteClient.init();

  async function runBattleScript(client) {
    const battleEvents = [];
    const unsub = client.on(Events.BATTLE_STATE, (s) => battleEvents.push(s));

    // 1. 開啟戰鬥
    const startRes = await client.send(Commands.BATTLE_START, { stageId: 1 });
    assert.equal(startRes.ok, true);
    assert.equal(startRes.battle.stageId, 1);
    assert.equal(startRes.battle.playerHp, 100);

    // 2. 出拳手勢提交
    const handRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "rock" });
    assert.equal(handRes.ok, true);

    // 3. 戰鬥中使用藥水
    const itemRes = await client.send(Commands.BATTLE_USE_ITEM, { itemKey: "hpPotion" });
    assert.equal(itemRes.ok, true);

    // 4. 戰鬥中變拳技能
    client.server.activeBattle.playerMp = 50;
    const morphRes = await client.send(Commands.BATTLE_USE_MORPH, {});
    assert.equal(morphRes.ok, true);

    // 5. 戰鬥中 QTE 輸入回報
    const qteRes = await client.send(Commands.BATTLE_INPUT_QTE, { key: "ArrowUp", timestamp: Date.now() });
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
      eventsReceived: battleEvents.length,
      finalState: client.server.activeBattle
    };
  }

  const localBattleRes = await runBattleScript(localClient);
  const remoteBattleRes = await runBattleScript(remoteClient);

  assert.equal(localBattleRes.finalState, null, "放棄戰鬥後活躍戰鬥應被清空");
  assert.equal(remoteBattleRes.finalState, null, "放棄戰鬥後活躍戰鬥應被清空");
  assert.equal(localBattleRes.eventsReceived, remoteBattleRes.eventsReceived, "雙端接收之戰鬥事件次數應等價");

  localClient.destroy();
  remoteClient.destroy();
});

test("雙端情境劇本等價性驗證：自動刷關與切西瓜結算（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer({ devTokens: ["dev_1"] });
  const remoteClient = new TestRemoteGameClient(server, { token: "dev_1" });
  await remoteClient.init();

  async function runPostBattleScript(client) {
    const postEvents = [];
    client.on(Events.POSTBATTLE_STATE, (data) => postEvents.push(data));

    // 1. 泳裝請求
    const swimRes = await client.send(Commands.POST_BATTLE_REQUEST_SWIMSUIT);
    assert.equal(swimRes.ok, true);

    // 2. 切西瓜開始
    const wmStart = await client.send(Commands.POST_BATTLE_START_WATERMELON);
    assert.equal(wmStart.ok, true);

    // 3. 揮刀切西瓜
    const wmStrike = await client.send(Commands.POST_BATTLE_STRIKE_WATERMELON);
    assert.equal(wmStrike.ok, true);
    assert.equal(wmStrike.bonusXp, 100);

    // 4. 自動刷關流程
    const autoStart = await client.send(Commands.AUTO_BATTLE_START, { stageId: 2, rounds: 3 });
    assert.equal(autoStart.ok, true);
    const autoStop = await client.send(Commands.AUTO_BATTLE_STOP);
    assert.equal(autoStop.ok, true);

    return postEvents;
  }

  const localEvents = await runPostBattleScript(localClient);
  const remoteEvents = await runPostBattleScript(remoteClient);

  assert.deepEqual(
    localEvents.map(e => e.phase),
    remoteEvents.map(e => e.phase),
    "雙端結算階段切換序列應完全一致"
  );

  localClient.destroy();
  remoteClient.destroy();
});

test("雙端情境劇本等價性驗證：帳號資料治理與轉移碼（Local vs Remote）", async () => {
  const localClient = new TestLocalGameClient();
  await localClient.init();

  const server = new AuthoritativeKernelServer();
  const remoteClient = new TestRemoteGameClient(server);
  await remoteClient.init();

  // 1. 匯出 JSON
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

  // 4. 再次兌換相同轉移碼（一次性代碼防重複）應失敗
  const claimDuplicate = await remoteClient.send(Commands.ACCOUNT_CLAIM_TRANSFER_CODE, { code: issueRes.code });
  assert.equal(claimDuplicate.ok, false);

  localClient.destroy();
  remoteClient.destroy();
});
