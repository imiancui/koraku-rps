// tests/antiCheat.test.js
// Anti-cheat test suite: verifies server authority invariants, rejection of unauthorized/tampered
// commands, replay attack defense, phase pause limits, 10s disconnect settlement, and secret commitments.

import test from "node:test";
import assert from "node:assert/strict";
import {
  Commands,
  Events,
  ErrorCodes,
  createCommandEnvelope
} from "../src/js/kernel/protocol.js";
import {
  AuthoritativeKernelServer,
  MemoryPersistence,
  TestRemoteGameClient
} from "./helpers/testHarness.js";

test("反作弊 1：偽造未授權指令與竄改 payload 結構防護", async () => {
  const server = new AuthoritativeKernelServer({ devTokens: ["admin_token"] });
  const guestClient = new TestRemoteGameClient(server, { token: "unauthorized_guest" });
  await guestClient.init();

  // 1. 空封包 / 非物件封包
  const emptyRes = server.executeCommand(null);
  assert.equal(emptyRes.ok, false);
  assert.equal(emptyRes.code, ErrorCodes.INVALID_SCHEMA);

  // 2. 缺少必要 cmdId 或 command 欄位
  const missingCmdId = server.executeCommand({ command: Commands.BUY_ITEM, payload: {} });
  assert.equal(missingCmdId.ok, false);
  assert.equal(missingCmdId.code, ErrorCodes.INVALID_SCHEMA);

  // 3. 未知或偽造之非法指令名稱
  const fakeCommand = server.executeCommand(createCommandEnvelope("arbitrary.hackServer", { giveGodMode: true }));
  assert.equal(fakeCommand.ok, false);
  assert.equal(fakeCommand.code, ErrorCodes.INVALID_SCHEMA);

  // 4. 竄改 payload 包含負數金幣
  const negativeCoins = await guestClient.send(Commands.CHEAT_ADD_COINS, { amount: -50000 });
  assert.equal(negativeCoins.ok, false);

  // 5. 購買不存在之道具
  const invalidItem = await guestClient.send(Commands.BUY_ITEM, { itemKey: "super_nuke_potion" });
  assert.equal(invalidItem.ok, false);
  assert.equal(invalidItem.code, ErrorCodes.INVALID_SCHEMA);

  guestClient.destroy();
});

test("反作弊 2：重放攻擊（Replay attack）與重複購買防護", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  // 給予剛好購買 1 件太刀（價格 350 星砂）的金幣
  server.store.state.coins = 350;

  // 構造一個固定 cmdId 的信封
  const fixedCmdId = "cmd_replay_attack_test_001";
  const envelope = createCommandEnvelope(Commands.BUY_EQUIPMENT, { equipId: "sword_flame" }, { cmdId: fixedCmdId });

  // 第一次發送：成功扣款 350 並獲得裝備
  const firstRes = server.executeCommand(envelope);
  assert.equal(firstRes.ok, true);
  assert.equal(server.store.state.coins, 0);
  assert.equal(server.store.state.inventoryEquipment.length, 1);

  // 第二次重放完全相同 cmdId 之封包：伺服器識別為重放攻擊/冪等請求，不重複扣款或發放裝備
  const replayRes = server.executeCommand(envelope);
  assert.equal(replayRes.ok, true);
  assert.equal(replayRes.replayed, true, "應標記為重放指令");
  assert.equal(server.store.state.coins, 0, "金幣不應被重複扣除");
  assert.equal(server.store.state.inventoryEquipment.length, 1, "裝備不應被重複發送");

  // 測試連點重複購買（新 cmdId 但餘額不足）：
  const secondBuyEnvelope = createCommandEnvelope(Commands.BUY_EQUIPMENT, { equipId: "sword_flame" });
  const secondBuyRes = server.executeCommand(secondBuyEnvelope);
  assert.equal(secondBuyRes.ok, false, "餘額不足時二次購買應失敗");
  assert.equal(server.store.state.inventoryEquipment.length, 1);

  client.destroy();
});

test("反作弊 3：本地竄改還原無效性（客戶端僅表達意圖，伺服器權威判定結果）", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  // 伺服器初始玩家血量為 100
  await client.send(Commands.BATTLE_START, { stageId: 1 });
  assert.equal(server.activeBattle.playerHp, 100);

  // 客戶端試圖透過本地 storage 或直寫請求宣稱「小樂血量歸零，我已獲勝」
  // 伺服器不提供由客戶端宣告獲勝的指令
  const fakeWinEnvelope = createCommandEnvelope("battle.claimVictory", { reason: "hacked_hp_zero" });
  const fakeWinRes = server.executeCommand(fakeWinEnvelope);
  assert.equal(fakeWinRes.ok, false);
  assert.equal(fakeWinRes.code, ErrorCodes.INVALID_SCHEMA);

  // 伺服器端活躍戰鬥狀態完好，敵方血量不受影響
  assert.equal(server.activeBattle.active, true);
  assert.equal(server.activeBattle.enemyHp > 0, true);

  client.destroy();
});

test("反作弊 4：戰鬥中暫停限制（僅 countdown 階段可用且限 3 次；reaction/QTE 階段被拒）", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  await client.send(Commands.BATTLE_START, { stageId: 1 });
  assert.equal(server.activeBattle.phase, "countdown");

  // 1. countdown 階段：第 1 次暫停成功
  const p1 = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(p1.ok, true);
  assert.equal(p1.pauseCount, 1);
  await client.send(Commands.BATTLE_RESUME);

  // 2. countdown 階段：第 2 次暫停成功
  const p2 = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(p2.ok, true);
  assert.equal(p2.pauseCount, 2);
  await client.send(Commands.BATTLE_RESUME);

  // 3. countdown 階段：第 3 次暫停成功
  const p3 = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(p3.ok, true);
  assert.equal(p3.pauseCount, 3);
  await client.send(Commands.BATTLE_RESUME);

  // 4. countdown 階段：第 4 次暫停被拒絕（超過 3 次上限）
  const p4 = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(p4.ok, false);
  assert.equal(p4.code, ErrorCodes.PAUSE_LIMIT_REACHED);

  // 5. 切換為 reaction 階段：發送暫停應嚴格被拒
  server.activeBattle.phase = "reaction";
  server.activeBattle.pauseCount = 0; // 重設次數以專門測試 phase 限制
  const pauseReaction = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(pauseReaction.ok, false);
  assert.equal(pauseReaction.code, ErrorCodes.INVALID_PHASE_PAUSE, "reaction 階段暫停應被拒絕");

  // 6. 切換為 QTE 階段：發送暫停應嚴格被拒
  server.activeBattle.phase = "qte";
  const pauseQte = await client.send(Commands.BATTLE_PAUSE);
  assert.equal(pauseQte.ok, false);
  assert.equal(pauseQte.code, ErrorCodes.INVALID_PHASE_PAUSE, "QTE 階段暫停應被拒絕");

  client.destroy();
});

test("反作弊 5：斷線 10 秒自動結算與 10 秒內重連恢復", async () => {
  let virtualTime = 1000000;
  const server = new AuthoritativeKernelServer({ now: () => virtualTime });
  const token = "player_disconnect_test_token";

  // 開啟戰鬥
  const startEnvelope = createCommandEnvelope(Commands.BATTLE_START, { stageId: 1 }, { token });
  server.executeCommand(startEnvelope);
  assert.equal(server.activeBattle.active, true);

  // 情境 A：斷線後 5 秒內重新連線（成功恢復）
  server.handlePlayerDisconnect(token);
  virtualTime += 5000; // 經過 5 秒
  const reconnectRes = server.handlePlayerReconnect(token);
  assert.equal(reconnectRes.ok, true, "10秒內重連應成功恢復戰鬥");
  assert.equal(reconnectRes.battle.active, true);

  // 情境 B：再次斷線，經過 11 秒未重連（逾時自動結算）
  server.handlePlayerDisconnect(token);
  virtualTime += 11000; // 經過 11 秒
  server.tickDisconnectGrace(virtualTime);

  assert.equal(server.activeBattle.active, false, "超過10秒未重連應自動結束戰鬥");
  const failedReconnect = server.handlePlayerReconnect(token);
  assert.equal(failedReconnect.ok, false, "逾時結算後重連應失效");
});

test("反作弊 6：遲到出拳手勢被忽略（秘密類操作 Reveal Deadline 前抵達原則）", async () => {
  let virtualTime = 500000;
  const server = new AuthoritativeKernelServer({ now: () => virtualTime });
  const client = new TestRemoteGameClient(server);
  await client.init();

  // 開始戰鬥：第一關 5 秒出拳倒數，revealDeadline = virtualTime + 5000
  await client.send(Commands.BATTLE_START, { stageId: 1 });
  const deadline = server.activeBattle.revealDeadline;
  assert.equal(deadline, virtualTime + 5000);

  // 1. 於 deadline 之前（第 3 秒）發送手勢：有效提交
  virtualTime += 3000;
  const onTimeRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "rock" });
  assert.equal(onTimeRes.ok, true);
  assert.equal(server.activeBattle.committedHand, "rock");

  // 2. 逾時之後（第 6 秒，已超過 5 秒 deadline）發送手勢：被判定為過期並拒絕
  virtualTime += 3000; // 現在 virtualTime 為 virtualTime_0 + 6000 > deadline
  const lateRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "scissors" });
  assert.equal(lateRes.ok, false);
  assert.equal(lateRes.code, ErrorCodes.SECRET_COMMITMENT_EXPIRED);
  assert.equal(server.activeBattle.committedHand, "rock", "已過期之手勢不得覆蓋原承諾手勢");

  client.destroy();
});

test("反作弊 7：未授權作弊指令被拒絕（線上環境 Dev Entitlement 權限檢驗）", async () => {
  const server = new AuthoritativeKernelServer({ devTokens: ["secret_admin_token"] });

  // 1. 未授權之普通玩家客戶端
  const normalClient = new TestRemoteGameClient(server, { token: "regular_user_123" });
  await normalClient.init();

  const cheatStatsRes = await normalClient.send(Commands.CHEAT_SET_STATS, { level: 99, coins: 999999 });
  assert.equal(cheatStatsRes.ok, false);
  assert.equal(cheatStatsRes.code, ErrorCodes.UNAUTHORIZED_CHEAT);
  assert.equal(normalClient.getState().profile.level, 1, "未授權時等級不得被作弊修改");

  const cheatUnlockRes = await normalClient.send(Commands.CHEAT_UNLOCK_ALL);
  assert.equal(cheatUnlockRes.ok, false);
  assert.equal(cheatUnlockRes.code, ErrorCodes.UNAUTHORIZED_CHEAT);

  const cheatCoinRes = await normalClient.send(Commands.CHEAT_ADD_COINS, { amount: 50000 });
  assert.equal(cheatCoinRes.ok, false);
  assert.equal(cheatCoinRes.code, ErrorCodes.UNAUTHORIZED_CHEAT);
  assert.equal(normalClient.getState().coins, 0, "未授權時金幣不得被作弊增加");

  // 2. 擁有 Dev Entitlement 之開發者客戶端
  const devClient = new TestRemoteGameClient(server, { token: "secret_admin_token" });
  await devClient.init();

  const validCheatRes = await devClient.send(Commands.CHEAT_SET_STATS, { level: 50, coins: 88888 });
  assert.equal(validCheatRes.ok, true);
  assert.equal(devClient.getState().profile.level, 50, "擁有 Dev 權限時應可執行調試設定");
  assert.equal(devClient.getState().coins, 88888);

  normalClient.destroy();
  devClient.destroy();
});

test("反作弊 8：戰鬥進行中鎖定換裝與配點指令（Battle in-progress lock）", async () => {
  const server = new AuthoritativeKernelServer();
  const client = new TestRemoteGameClient(server);
  await client.init();

  // 給予裝備與技能點
  server.store.state.inventoryEquipment = ["sword_flame"];
  server.store.state.profile.skillPoints = 10;

  // 開始戰鬥
  await client.send(Commands.BATTLE_START, { stageId: 1 });
  assert.equal(server.activeBattle.active, true);

  // 1. 戰鬥中嘗試穿戴裝備 -> 應被拒絕
  const equipRes = await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  assert.equal(equipRes.ok, false);
  assert.equal(equipRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(server.store.state.equipment.mainHand, null);

  // 2. 戰鬥中嘗試卸下裝備 -> 應被拒絕
  const unequipRes = await client.send(Commands.UNEQUIP_ITEM, { slot: "mainHand" });
  assert.equal(unequipRes.ok, false);
  assert.equal(unequipRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 3. 戰鬥中嘗試分配屬性點 -> 應被拒絕
  const statRes = await client.send(Commands.ALLOCATE_STAT, { stat: "hp" });
  assert.equal(statRes.ok, false);
  assert.equal(statRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 4. 戰鬥中嘗試升級技能 -> 應被拒絕
  const skillRes = await client.send(Commands.ALLOCATE_SKILL, { skill: "momo" });
  assert.equal(skillRes.ok, false);
  assert.equal(skillRes.code, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);

  // 放棄戰鬥回到非戰鬥狀態
  await client.send(Commands.BATTLE_ABANDON);
  assert.equal(server.activeBattle, null);

  // 5. 戰鬥結束後，換裝與配點應恢復正常可用
  const postEquipRes = await client.send(Commands.EQUIP_ITEM, { itemId: "sword_flame", slot: "mainHand" });
  assert.equal(postEquipRes.ok, true);
  assert.equal(server.store.state.equipment.mainHand, "sword_flame");

  const postStatRes = await client.send(Commands.ALLOCATE_STAT, { stat: "hp" });
  assert.equal(postStatRes.ok, true);
  assert.equal(server.store.state.profile.allocations.hp, 1);

  client.destroy();
});
