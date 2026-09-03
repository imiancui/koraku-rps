// tests/simulation/networkProtocolVerification.test.js
// Authoritative Server & Network Protocol Simulation Tests for Koraku RPS
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { Commands, Events, ConnectionStates, ErrorCodes, CONFIG_VERSION, createCommandEnvelope } from "../../src/js/kernel/protocol.js";
import { GameSession } from "../../server/core/GameSession.js";
import { Validator } from "../../server/core/Validator.js";
import { JsonStorage } from "../../server/storage/JsonStorage.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { RemoteGameClient } from "../../src/js/net/RemoteGameClient.js";
import { EventBus } from "../../src/js/core/EventBus.js";
import { AppView } from "../../src/js/ui/AppView.js";
import { EQUIPMENT_ITEMS } from "../../src/js/config/gameConfig.js";

test("1. 回合倒數事件轉發：GameSession forwardEvents 包含 battle:countdown-beat 且能完整廣播至客戶端", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-sim-countdown-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_sim_countdown";
  const receivedEvents = [];
  const session = new GameSession({
    accountId,
    storage,
    emitFn: (event, payload) => {
      if (event === "battle:countdown-beat") {
        receivedEvents.push(payload);
      }
    }
  });
  await session.load();

  // 1.1 啟動戰鬥使 session.battle 初始化
  const startRes = await session.executeCommand({
    cmdId: "cmd_start_1",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.equal(startRes.ack, true, "戰鬥啟動應成功");
  assert.ok(session.battle, "session.battle 必須存在");

  // 1.2 模擬 BattleSystem 發出 battle:countdown-beat 事件
  const mockPayload = { count: 3, key: "janken.scissors" };
  session.battle.bus.emit("battle:countdown-beat", mockPayload);

  // 1.3 驗證 GameSession 完整捕獲並廣播
  assert.equal(receivedEvents.length, 1, "GameSession 應轉發 1 次 battle:countdown-beat");
  assert.deepEqual(receivedEvents[0], mockPayload, "轉發的 payload 內容必須完全吻合");

  // 1.4 模擬 2 秒與 1 秒倒數
  session.battle.bus.emit("battle:countdown-beat", { count: 2, key: "janken.rock" });
  session.battle.bus.emit("battle:countdown-beat", { count: 1, key: "janken.paper" });
  assert.equal(receivedEvents.length, 3, "應收到全部 3 次倒數節拍事件");
  assert.equal(receivedEvents[1].count, 2);
  assert.equal(receivedEvents[2].count, 1);

  if (session.battle) session.battle.stopClocks();
});

test("2. 秘密承諾與變拳時間戳：BattleSystem +150ms 寬限容忍度與 GameSession 變拳時間戳傳遞", async () => {
  const bus = new EventBus();
  let fakeNow = 10000;
  const mockStore = new Proxy({
    snapshot: () => ({
      profile: { level: 1, xp: 0, skills: {}, allocations: {} },
      playerStats: { maxHp: 100, maxMp: 50, damage: 10 },
      equipment: {},
      inventory: {}
    })
  }, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return () => {};
    }
  });
  const battle = new BattleSystem(bus, mockStore, Math.random, () => fakeNow);

  try {
    // 2.1 測試 countdown 階段出拳之 +150ms 容忍度
    battle.start(1);
    assert.equal(battle.state.phase, "countdown");
    const countdownDeadline = battle.countdownDeadline;
    assert.ok(countdownDeadline > 0, "countdownDeadline 必須大於 0");

    // A. 在截止時間前出拳 -> 成功
    fakeNow = countdownDeadline - 100;
    let res = battle.selectHand("rock");
    assert.equal(res.ok, true, "截止時間前提交出拳應成功");

    // B. 在截止時間後 +100ms 抵達（< 150ms 寬限）-> 成功
    fakeNow = countdownDeadline + 100;
    res = battle.selectHand("paper");
    assert.equal(res.ok, true, "150ms 寬限期內提交出拳應成功");

    // C. 在截止時間後 +151ms 抵達（> 150ms 寬限）-> 拒絕
    fakeNow = countdownDeadline + 151;
    res = battle.selectHand("scissors");
    assert.equal(res.ok, false, "超過 150ms 寬限期提交出拳應被拒絕");
    assert.equal(res.reason, "late_commitment", "失敗原因應為 late_commitment");

    // 2.2 測試 reaction 階段變拳窗口之 +150ms 寬限容忍度
    fakeNow = countdownDeadline; // 重置時鐘以觸發 reveal
    battle.revealHands();
    assert.equal(battle.state.phase, "reaction");
    battle.state.playerMp = 50;

    // 發動變拳
    fakeNow = battle.reactionDeadline - 50;
    const morphRes = battle.useMorph(fakeNow);
    assert.equal(morphRes.ok, true, "在反應時間內發動變拳應成功");
    assert.equal(battle.state.morphActive, true);

    const morphDeadline = battle.reactionDeadline;
    // A. 在變拳截止時間 +151ms 出拳 -> 拒絕
    fakeNow = morphDeadline + 151;
    res = battle.selectHand("paper");
    assert.equal(res.ok, false, "超過變拳窗口 150ms 寬限應被拒絕");
    assert.equal(res.reason, "morph_expired", "失敗原因應為 morph_expired");

    // B. 在變拳截止時間 +100ms 內出拳 -> 成功
    fakeNow = morphDeadline + 100;
    res = battle.selectHand("rock");
    assert.equal(res.ok, true, "變拳窗口 150ms 寬限內提交手勢應成功");
  } finally {
    battle.stopClocks();
  }

  // 2.3 測試 GameSession._handleBattleUseMorph 是否傳遞 declaredAt/clientTime
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-sim-morph-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const session = new GameSession({ accountId: "acc_sim_morph", storage });
  await session.load();
  await session.executeCommand({
    cmdId: "start_for_morph",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });

  try {
    // 推進至 reaction phase
    session.battle.revealHands();
    session.battle.state.playerMp = 50;

    let passedDeclaredAt = null;
    const originalUseMorph = session.battle.useMorph.bind(session.battle);
    session.battle.useMorph = (declaredAt) => {
      passedDeclaredAt = declaredAt;
      return originalUseMorph(declaredAt);
    };

    const clientDeclaredTime = 999999;
    const morphEnvelope = {
      cmdId: "cmd_morph_1",
      command: Commands.BATTLE_USE_MORPH,
      payload: {},
      clientTime: clientDeclaredTime
    };

    await session.executeCommand(morphEnvelope);
    assert.equal(passedDeclaredAt, clientDeclaredTime, "GameSession 應將 envelope.clientTime 傳遞給 BattleSystem.useMorph");
  } finally {
    if (session.battle) session.battle.stopClocks();
  }
});

test("3. 切西瓜時鐘與正模數：getMarkerPosition 正模數防護、getAutoMarkerPosition 三角波計算與快取", async () => {
  const client = new RemoteGameClient({
    url: "ws://127.0.0.1:9999",
    autoReconnect: false
  });

  let mockServerTime = 10000;
  client.getServerTime = () => mockServerTime;

  // 3.1 測試 getMarkerPosition 正模數防護
  client._postBattleState = {
    scene: "watermelonAim",
    strikeStartedAt: 10000,
    strikeDuration: 1800
  };

  // A. 正向時間流逝
  mockServerTime = 10000 + 450; // elapsed = 450, progress = 0.25
  let pos = client.postBattle.getMarkerPosition();
  assert.ok(Math.abs(pos - 0.5) < 1e-6, `progress 0.25 時 marker 應為 0.5，實際為 ${pos}`);

  mockServerTime = 10000 + 900; // elapsed = 900, progress = 0.5
  pos = client.postBattle.getMarkerPosition();
  assert.ok(Math.abs(pos - 1.0) < 1e-6, `progress 0.5 時 marker 應為 1.0，實際為 ${pos}`);

  mockServerTime = 10000 + 1350; // elapsed = 1350, progress = 0.75
  pos = client.postBattle.getMarkerPosition();
  assert.ok(Math.abs(pos - 0.5) < 1e-6, `progress 0.75 時 marker 應為 0.5，實際為 ${pos}`);

  // B. 時鐘回撥 / 負差防護 (例如 now < start)
  mockServerTime = 10000 - 450; // now - start = -450. ((-450 % 1800) + 1800) % 1800 = 1350
  pos = client.postBattle.getMarkerPosition();
  assert.ok(pos >= 0 && pos <= 1, `時鐘回撥時 marker position 應介於 [0, 1]，實際為 ${pos}`);
  assert.ok(Math.abs(pos - 0.5) < 1e-6, `負450ms 正模數後應等同 1350ms (0.5)，實際為 ${pos}`);

  // 3.2 測試 getAutoMarkerPosition 具備三角波計算而不是硬編碼 0.5
  // A. 非 watermelonAim 狀態回傳預設 0.5
  client._autoWatermelonState = null;
  client._postBattleState = { scene: "dialogue" };
  assert.equal(client.postBattle.getAutoMarkerPosition(), 0.5, "非 watermelonAim 應回傳預設 0.5");

  // B. watermelonAim 狀態下三角波震盪
  client._autoWatermelonState = {
    scene: "watermelonAim",
    strikeStartedAt: 10000,
    strikeDuration: 1800
  };

  mockServerTime = 10000;
  assert.equal(client.postBattle.getAutoMarkerPosition(), 0, "起點應為 0");

  mockServerTime = 10000 + 900;
  assert.equal(client.postBattle.getAutoMarkerPosition(), 1, "半週期應為 1");

  mockServerTime = 10000 + 1800;
  assert.equal(client.postBattle.getAutoMarkerPosition(), 0, "全週期應回到 0");

  // 3.3 測試 RemoteGameClient 快取 POSTBATTLE_AUTO_WATERMELON 事件
  client._autoWatermelonState = null;
  const autoWatermelonPayload = {
    scene: "watermelonAim",
    strikeStartedAt: 20000,
    strikeDuration: 1800,
    stock: 3
  };

  client._handleServerEvent({
    event: Events.POSTBATTLE_AUTO_WATERMELON,
    payload: autoWatermelonPayload
  });

  assert.deepEqual(client._autoWatermelonState, autoWatermelonPayload, "POSTBATTLE_AUTO_WATERMELON 事件應被完整快取至 _autoWatermelonState");

  client.destroy();
});

test("4. 狀態同步與指令校驗：ALLOCATE_SKILL / EQUIP_ITEM 檢驗與 STORE_CHANGED 金幣防清空", async () => {
  const validator = new Validator();
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-sim-sync-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_sim_sync";
  let emittedStoreChanged = null;
  const session = new GameSession({
    accountId,
    storage,
    emitFn: (event, payload) => {
      if (event === Events.STORE_CHANGED) {
        emittedStoreChanged = payload;
      }
    }
  });
  await session.load();

  // 4.1 驗證 ALLOCATE_SKILL
  // AppView 發出的 payload 同時包含 { skillId, skill }
  const skillPayload = { skillId: "momo", skill: "momo" };
  const skillValidation = validator.validatePayload(Commands.ALLOCATE_SKILL, skillPayload);
  assert.equal(skillValidation.valid, true, "ALLOCATE_SKILL 應通過 Validator 檢驗");

  // 設定等級與技能點數以供分配
  session.state.profile.level = 5;
  session.state.profile.skillPoints = 5;
  const initialSkillLevel = session.state.profile.skills?.momo || 0;

  const skillRes = await session.executeCommand({
    cmdId: "cmd_skill_1",
    command: Commands.ALLOCATE_SKILL,
    payload: skillPayload
  });
  assert.equal(skillRes.ack, true, "GameSession._handleAllocateSkill 應成功接收並分配技能");
  assert.equal(session.state.profile.skills.momo, initialSkillLevel + 1);

  // 4.2 驗證 EQUIP_ITEM 檢驗與漏洞檢測
  // A. Validator 檢驗 slot 為必填字串
  const validEquipPayload = { slot: "mainHand", itemId: "sword_flame" };
  const valRes = validator.validatePayload(Commands.EQUIP_ITEM, validEquipPayload);
  assert.equal(valRes.valid, true, "包含 slot 的 EQUIP_ITEM 應通過驗證");

  const missingSlotPayload = { itemId: "sword_flame" };
  const invalidSlotVal = validator.validatePayload(Commands.EQUIP_ITEM, missingSlotPayload);
  assert.equal(invalidSlotVal.valid, false, "缺少 slot 的 EQUIP_ITEM 應被 Validator 攔截");

  // B. 容錯檢測：即使傳送 { uid: typeId, typeId, slot }，GameSession._handleEquipItem 亦能相容 typeId 成功穿戴
  session.state.inventoryEquipment.push("sword_flame");
  const buggyBagPayload = { uid: "sword_flame", typeId: "sword_flame", slot: "mainHand" };
  const buggyEquipRes = await session.executeCommand({
    cmdId: "cmd_buggy_equip",
    command: Commands.EQUIP_ITEM,
    payload: buggyBagPayload
  });

  assert.equal(buggyEquipRes.ack, true, "容錯驗證：提供 typeId 時，GameSession 成功容錯並解構穿戴");
  assert.equal(session.state.equipment.mainHand, "sword_flame");

  // C. 當修正為提供 itemId 時亦能成功穿戴
  const fixedBagPayload = { itemId: "sword_great_nine", slot: "mainHand" };
  session.state.inventoryEquipment.push("sword_great_nine");
  const fixedEquipRes = await session.executeCommand({
    cmdId: "cmd_fixed_equip",
    command: Commands.EQUIP_ITEM,
    payload: fixedBagPayload
  });
  assert.equal(fixedEquipRes.ack, true, "提供 itemId 時穿戴應成功");
  assert.equal(session.state.equipment.mainHand, "sword_great_nine");

  // 4.3 驗證 STORE_CHANGED 是否包含 coins 與 playerStats
  // A. ALLOCATE_STAT
  emittedStoreChanged = null;
  session.state.profile.skillPoints = 5;
  await session.executeCommand({
    cmdId: "cmd_stat_1",
    command: Commands.ALLOCATE_STAT,
    payload: { stat: "hp", points: 1 }
  });
  assert.ok(emittedStoreChanged, "ALLOCATE_STAT 應發出 STORE_CHANGED");
  assert.ok("coins" in emittedStoreChanged, "STORE_CHANGED 必須包含 coins 欄位");
  assert.ok("playerStats" in emittedStoreChanged, "STORE_CHANGED 必須包含 playerStats 欄位");

  // B. ALLOCATE_SKILL
  emittedStoreChanged = null;
  await session.executeCommand({
    cmdId: "cmd_skill_2",
    command: Commands.ALLOCATE_SKILL,
    payload: { skillId: "momo" }
  });
  assert.ok(emittedStoreChanged, "ALLOCATE_SKILL 應發出 STORE_CHANGED");
  assert.ok("coins" in emittedStoreChanged, "STORE_CHANGED 必須包含 coins 欄位");
  assert.ok("playerStats" in emittedStoreChanged, "STORE_CHANGED 必須包含 playerStats 欄位");

  // 4.4 驗證 RemoteGameClient 與 AppView 合併機制防止金幣被清空
  const client = new RemoteGameClient({ url: "ws://127.0.0.1:9999", autoReconnect: false });
  client._state = {
    profile: { level: 1, xp: 0 },
    coins: 5000,
    equipment: {},
    inventory: { hpPotion: 1, mpPotion: 1 }
  };

  // 模擬伺服器推播局部更新（例如裝備變更事件只帶 equipment）
  client._handleServerEvent({
    event: Events.STORE_CHANGED,
    payload: { equipment: { mainHand: "sword_flame" } }
  });

  // 驗證 client._state.coins 未被抹除
  assert.equal(client._state.coins, 5000, "局部 STORE_CHANGED 不得將 _state.coins 覆蓋或清空");
  assert.equal(client._state.equipment.mainHand, "sword_flame");

  // 驗證 AppView.renderStore 合併安全機制
  let capturedCoinsText = null;
  globalThis.document = {
    querySelector: (sel) => {
      if (sel === "#header-coins") {
        return {
          set textContent(val) {
            capturedCoinsText = val;
          }
        };
      }
      return {
        textContent: "",
        style: {},
        classList: { toggle: () => {} },
        setAttribute: () => {}
      };
    }
  };

  const appView = Object.create(AppView.prototype);
  appView.getStoreSnapshot = () => client.getState();
  appView.sound = null;
  appView.renderHomeRecords = () => {};
  appView.renderStages = () => {};
  appView.renderShop = () => {};
  appView.renderGrowth = () => {};
  appView.renderGallery = () => {};
  appView.renderGuideBoss = () => {};
  appView.renderEquipment = () => {};
  appView.renderInventory = () => {};

  // 傳入局部 rawState（無 coins）
  appView.renderStore({ equipment: { mainHand: "sword_flame" } });
  assert.equal(capturedCoinsText, (5000).toLocaleString("zh-TW"), "renderStore 安全合併 fallback snapshot，金幣不會被清空為 0");

  client.destroy();
});
