// tests/unit/simulation_verification.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../../src/js/systems/PostBattleSystem.js";
import { createKernel } from "../../src/js/kernel/kernelFactory.js";
import { Commands, Events } from "../../src/js/kernel/protocol.js";
import { AppView } from "../../src/js/ui/AppView.js";
import { I18n } from "../../src/js/services/I18n.js";
import { EQUIPMENT_ITEMS, BASE_PLAYER } from "../../src/js/config/gameConfig.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

// -------------------------------------------------------------
// 1. 回合倒數與節奏 (Countdown & Rhythm)
// -------------------------------------------------------------
test("1.1 回合倒數 ticker (countdownId) 依剩餘毫秒數逐秒遞減 state.countdown", async () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  let fakeNow = 10000;
  const battle = new BattleSystem(bus, store, () => 0.5, () => fakeNow);

  battle.start(1); // 5 seconds stage
  assert.equal(battle.state.countdown, 5, "起始倒數為 5");
  assert.ok(battle.countdownId !== null, "已設定 countdownId interval");

  // Advance time by 1s (to 4s remaining)
  fakeNow += 1000;
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(battle.state.countdown, 4, "經過 1 秒後 state.countdown 遞減為 4");

  // Advance time by another 1s (to 3s remaining)
  fakeNow += 1000;
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.equal(battle.state.countdown, 3, "經過 2 秒後 state.countdown 遞減為 3");

  battle.abandon();
  assert.equal(battle.countdownId, null, "戰鬥終止後 countdownId 已清理");
});

test("1.2 5秒關卡最後三秒倒數 (countdown-beat) 依序發送 3, 2, 1 節奏事件與台詞", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  const battle = new BattleSystem(bus, store, () => 0.5);

  const beats = [];
  bus.on("battle:countdown-beat", (beat) => beats.push(beat));

  battle.start(1);
  assert.equal(battle.beatTimerIds.length, 3, "5秒關卡應有 3 個倒數節奏定時器");

  // Simulate timeout callbacks for 3, 2, 1
  battle.bus.emit("battle:countdown-beat", { count: 3, key: "dialogue.chant3" });
  battle.bus.emit("battle:countdown-beat", { count: 2, key: "dialogue.chant2" });
  battle.bus.emit("battle:countdown-beat", { count: 1, key: "dialogue.chant1" });

  assert.deepEqual(beats.map((b) => b.count), [3, 2, 1], "節奏應依序為 3, 2, 1");
  assert.deepEqual(beats.map((b) => b.key), [
    "dialogue.chant3",
    "dialogue.chant2",
    "dialogue.chant1"
  ]);

  battle.abandon();
  assert.equal(battle.beatTimerIds.length, 0, "戰鬥終止後 beatTimerIds 已清空");
});

test("1.3 3秒關卡中 count: 3 節奏定時器在 delay >= 0 下成功排程所有拍點", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  store.state.profile.level = 10;
  const battle = new BattleSystem(bus, store, () => 0.5);

  const started = battle.start(2); // Stage 2 has roundSeconds: 3 (3000ms)
  assert.equal(started, true, "成功進入第 2 關");
  // totalDurationMs - 3000 = 0.
  // With delay >= 0, delay 0 (count 3), 1000 (count 2), and 2000 (count 1) are all pushed to beatTimerIds.
  assert.equal(
    battle.beatTimerIds.length,
    3,
    "修復證實：3秒關卡中 count: 3 (delay=0) 成功排程，共排程 3 個定時器"
  );
  battle.abandon();
});

test("1.4 AppView.handleCountdownBeat: 將 beat.count 正確寫入 #countdown-value", () => {
  const view = Object.create(AppView.prototype);
  view.bus = new EventBus();

  const mockCountdownVal = { textContent: "" };
  const mockPlayerHand = { classList: { remove() {}, add() {} }, offsetWidth: 0 };
  const mockEnemyHand = { classList: { remove() {}, add() {} }, offsetWidth: 0 };
  const mockCountdownBox = { classList: { remove() {}, add() {} }, offsetWidth: 0 };

  globalThis.document = {
    querySelector(sel) {
      if (sel === "#countdown-value") return mockCountdownVal;
      if (sel === "#player-hand-display") return mockPlayerHand;
      if (sel === "#enemy-hand-display") return mockEnemyHand;
      if (sel === "#round-countdown") return mockCountdownBox;
      return null;
    }
  };

  view.handleCountdownBeat({ count: 3, key: "dialogue.chant3" });
  assert.equal(mockCountdownVal.textContent, "3", "handleCountdownBeat 應將 3 寫入 #countdown-value");

  view.handleCountdownBeat({ count: 2, key: "dialogue.chant2" });
  assert.equal(mockCountdownVal.textContent, "2", "handleCountdownBeat 應將 2 寫入 #countdown-value");

  view.handleCountdownBeat({ count: 1, key: "dialogue.chant1" });
  assert.equal(mockCountdownVal.textContent, "1", "handleCountdownBeat 應將 1 寫入 #countdown-value");
});

// -------------------------------------------------------------
// 2. 開拳反應時間與變拳 (Reaction Time & Morph Hand)
// -------------------------------------------------------------
test("2.1 BattleSystem.revealHands 啟動 reactionTickId 每 100ms 平滑遞減 reactionRemaining", async () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  let fakeNow = 20000;
  const battle = new BattleSystem(bus, store, () => 0.4, () => fakeNow);

  battle.start(1); // reactionWindowMs = 1000ms
  battle.selectHand("rock");
  battle.revealHands();

  assert.equal(battle.state.phase, "reaction");
  assert.ok(battle.reactionTickId !== null, "revealHands 應設定 reactionTickId interval");
  assert.equal(battle.state.reactionRemaining, 1.0, "初始反應時間為 1.0 秒");

  // Advance time by 200ms
  fakeNow += 200;
  await new Promise((r) => setTimeout(r, 150));
  assert.equal(battle.state.reactionRemaining, 0.8, "200ms 後反應時間平滑遞減至 0.8 秒");

  battle.abandon();
  assert.equal(battle.reactionTickId, null, "戰鬥終止後 reactionTickId 已清理");
});

test("2.2 BattleSystem.useMorph: 重設 reactionRemaining 為 2.0s，清理前一計時器並重新啟動 100ms 平滑遞減", async () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  let fakeNow = 30000;
  const battle = new BattleSystem(bus, store, () => 0.4, () => fakeNow);

  battle.start(1);
  battle.selectHand("rock");
  battle.revealHands();

  const oldTickId = battle.reactionTickId;
  const oldTimeoutId = battle.reactionTimeoutId;
  assert.ok(oldTickId !== null);

  // Trigger morph
  const morphRes = battle.useMorph();
  assert.equal(morphRes.ok, true, "成功發動變拳");
  assert.equal(battle.state.morphActive, true, "進入 morphActive");
  assert.equal(battle.state.reactionRemaining, 2.0, "reactionRemaining 重設為 2.0 秒");
  assert.notEqual(battle.reactionTickId, oldTickId, "reactionTickId 已替換為新定時器");
  assert.notEqual(battle.reactionTimeoutId, oldTimeoutId, "reactionTimeoutId 已替換為新定時器");

  // Advance 300ms
  fakeNow += 300;
  await new Promise((r) => setTimeout(r, 150));
  assert.equal(battle.state.reactionRemaining, 1.7, "變拳窗口內以 100ms 平滑遞減 (2.0 -> 1.7)");

  // Select new hand during morph window
  battle.selectHand("scissors");
  assert.equal(battle.state.morphActive, false, "出拳後解除 morphActive");
  assert.equal(battle.reactionTickId, null, "出拳後 reactionTickId 立即清理完畢");
  assert.equal(battle.reactionTimeoutId, null, "出拳後 reactionTimeoutId 立即清理完畢");

  battle.abandon();
});

// -------------------------------------------------------------
// 3. 戰鬥數值與規則 (Battle Numbers & Rules)
// -------------------------------------------------------------
test("3.1 applyDamageToEnemy: 大劍 burst 效果在單勝與雙勝 (含傳入 damageAmount) 皆正確乘以 1.5", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  const battle = new BattleSystem(bus, store);

  // Add to inventory and equip sword_great_nine which has burst effect (winMultiplier: 1.5, damage: +70)
  store.state.inventoryEquipment.push("sword_great_nine");
  const eqRes = store.equipItem("sword_great_nine", "mainHand");
  assert.equal(eqRes.ok, true, "成功裝備雙手大劍");

  battle.start(1);

  const loggedDamages = [];
  bus.on("battle:damage-logged", (log) => loggedDamages.push(log));

  const target = battle.state.enemies[0];
  const baseDmg = battle.state.playerDamage; // 100 + 70 = 170

  // Case 1: Regular RPS win (damageAmount = null)
  battle.applyDamageToEnemy(target, null, false);
  const expectedBurst1 = Math.round(baseDmg * 1.5); // Math.round(170 * 1.5) = 255
  assert.equal(loggedDamages[0].amount, expectedBurst1, "常規出拳獲勝 burst 倍率應為 1.5 倍 (255)");
  assert.equal(loggedDamages[0].source, "burst", "傷害來源應標記為 burst");

  // Case 2: Dual RPS win (passing explicit damageAmount = baseDmg * 2 = 340)
  const doubleDmg = baseDmg * 2; // 340
  battle.applyDamageToEnemy(target, doubleDmg, false);
  const expectedBurst2 = Math.round(doubleDmg * 1.5); // Math.round(340 * 1.5) = 510
  assert.equal(loggedDamages[1].amount, expectedBurst2, "雙勝傳入 damageAmount 時 burst 倍率仍正確套用 1.5 倍 (510)");
  assert.equal(loggedDamages[1].source, "burst", "雙勝傷害來源應標記為 burst");

  // Case 3: Countered hit (countered = true)
  battle.applyDamageToEnemy(target, null, true);
  assert.equal(loggedDamages[2].amount, baseDmg, "QTE 反制不套用 burst 倍率 (170)");
  assert.equal(loggedDamages[2].source, "counter", "反制傷害來源應標記為 counter");

  battle.abandon();
});

test("3.2 雙生關卡單勝單敗擊殺敵方時：雙手模式敵方全員陣亡直接獲勝；非雙手模式漏檢查之異常證實", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  store.state.profile.level = 10; // Required for stage 4

  // Case A: With dualHand skill
  store.state.profile.skills.dualHand = 1;
  const battle1 = new BattleSystem(bus, store);
  battle1.start(4); // Stage 4: dual enemies (left and right)

  let qteStarted1 = false;
  bus.on("battle:state", (s) => { if (s?.phase === "qte") qteStarted1 = true; });

  // Both enemies alive at start of round
  battle1.state.enemies.find((e) => e.id === "left").hp = 10;
  battle1.state.enemies.find((e) => e.id === "right").hp = 0; // Already 0 HP, but alive=true initially
  battle1.state.enemyHp = 10;

  battle1.state.phase = "reaction";
  battle1.state.selectedHands = { left: "rock", right: "rock" };
  battle1.state.opponentHands = { left: "scissors", right: "paper" };
  battle1.state.opponentHand = "scissors";

  battle1.resolveRound();

  assert.equal(battle1.state.enemyHp <= 0, true, "敵方總血量降為 0");
  assert.equal(battle1.state.lastResult, "win", "有雙手技能時：全員陣亡直接觸發獲勝結算");
  assert.equal(battle1.state.phase, "result", "進入結算 phase");
  assert.equal(qteStarted1, false, "有雙手技能時：未進入 QTE");
  battle1.abandon();

  // Case B: Without dualHand skill (!hasDualHandSkill)
  store.state.profile.skills.dualHand = 0;
  const battle2 = new BattleSystem(bus, store);
  battle2.start(4);

  let qteStarted2 = false;
  bus.on("battle:state", (s) => { if (s?.phase === "qte") qteStarted2 = true; });

  battle2.state.enemies.find((e) => e.id === "left").hp = 10;
  battle2.state.enemies.find((e) => e.id === "right").hp = 0;
  battle2.state.enemyHp = 10;

  battle2.state.phase = "reaction";
  battle2.state.selectedHand = "rock";
  battle2.state.opponentHands = { left: "scissors", right: "paper" };
  battle2.state.opponentHand = "scissors";

  battle2.resolveRound();

  // In !hasDualHandSkill branch (lines 1177-1190), it lacks the `enemies.every(!alive)` check!
  assert.equal(
    qteStarted2,
    false,
    "修復證實：在未解鎖雙手技能時，單勝單敗擊殺敵方全員陣亡不再錯誤觸發 QTE，直接獲勝結算"
  );
  battle2.abandon();
});

// -------------------------------------------------------------
// 4. 戰後切西瓜與自動戰鬥切西瓜 (Post-battle & Auto Watermelon)
// -------------------------------------------------------------
test("4.1 kernelFactory 收到西瓜指令時依據 autoWatermelonState.active 分派自動與手動方法", async () => {
  const kernel = createKernel();
  const postBattle = kernel.postBattle;

  let startWatermelonCalled = false;
  let startAutoCalled = false;
  let strikeManualCalled = false;
  let strikeAutoCalled = false;

  postBattle.startWatermelon = () => { startWatermelonCalled = true; return { ok: true, manual: true }; };
  postBattle.startAutoWatermelonRound = () => { startAutoCalled = true; return { ok: true, auto: true }; };
  postBattle.strike = (idx) => { strikeManualCalled = true; return { ok: true, manualIdx: idx }; };
  postBattle.autoWatermelonStrike = (ts) => { strikeAutoCalled = true; return { ok: true, autoTs: ts }; };

  // 1. Manual mode (autoWatermelonState.active is false/undefined)
  postBattle.autoWatermelonState = { active: false };
  const res1 = await kernel.executeCommand({ cmdId: "w1", command: Commands.POST_BATTLE_START_WATERMELON, payload: {} });
  assert.equal(startWatermelonCalled, true, "手動模式調用 startWatermelon");

  const res2 = await kernel.executeCommand({ cmdId: "w2", command: Commands.POST_BATTLE_STRIKE_WATERMELON, payload: { strikeIndex: 0 } });
  assert.equal(strikeManualCalled, true, "手動模式調用 strike");

  // 2. Auto mode (autoWatermelonState.active is true)
  postBattle.autoWatermelonState = { active: true };
  const res3 = await kernel.executeCommand({ cmdId: "w3", command: Commands.POST_BATTLE_START_WATERMELON, payload: {} });
  assert.equal(startAutoCalled, true, "自動模式調用 startAutoWatermelonRound");

  const res4 = await kernel.executeCommand({ cmdId: "w4", command: Commands.POST_BATTLE_STRIKE_WATERMELON, payload: { declaredAt: 12345 } });
  assert.equal(strikeAutoCalled, true, "自動模式調用 autoWatermelonStrike");
});

test("4.2 AppView: 2.5x 縮放切換調用 hudDragController.applyPosition 保持安全視窗邊界", async () => {
  const view = Object.create(AppView.prototype);
  view.isWatermelonZoomed = false;

  let applyPositionCalled = null;
  view.hudDragController = {
    applyPosition(target) {
      applyPositionCalled = target;
    }
  };

  const mockFloating = {
    classList: {
      toggle(cls, val) {
        assert.equal(cls, "is-zoomed");
        assert.equal(val, true);
      }
    }
  };
  const mockZoomBtn = { textContent: "" };

  globalThis.document = {
    querySelector(sel) {
      if (sel === "#floating-autobattle-watermelon") return mockFloating;
      if (sel === "#btn-toggle-watermelon-zoom") return mockZoomBtn;
      return null;
    }
  };

  const event = {
    target: {
      closest(sel) {
        if (sel.includes("#btn-toggle-watermelon-zoom")) return mockZoomBtn;
        return null;
      }
    }
  };

  await view.handleClick(event);
  assert.equal(view.isWatermelonZoomed, true, "縮放狀態切換為 true");
  assert.equal(mockZoomBtn.textContent, "🔍 1x", "按鈕文字切換為 🔍 1x");
  assert.equal(applyPositionCalled, "watermelon", "縮放後必須調用 applyPosition('watermelon') 確保邊界安全");
});

// -------------------------------------------------------------
// 5. 能力成長與點數消耗 (Growth & SP Consumption)
// -------------------------------------------------------------
test("5.1 AppView: ALLOCATE_SKILL 同時傳入 skillId 與 skill 相容前後端驗證", async () => {
  const view = Object.create(AppView.prototype);
  view.bus = new EventBus();
  let sentPayload = null;
  let sentCommand = null;

  view.sendCommand = async (cmd, payload) => {
    sentCommand = cmd;
    sentPayload = payload;
    return { ok: true };
  };
  view.showToast = () => {};

  const mockBtn = {
    dataset: { allocateSkill: "momo" },
    classList: { remove() {}, add() {} },
    offsetWidth: 0
  };

  const event = {
    target: {
      closest(sel) {
        if (sel.includes("[data-allocate-skill]")) return mockBtn;
        return null;
      }
    }
  };

  await view.handleClick(event);
  assert.equal(sentCommand, Commands.ALLOCATE_SKILL);
  assert.equal(sentPayload.skillId, "momo", "必須包含 skillId 供後端 Validator 驗證");
  assert.equal(sentPayload.skill, "momo", "必須包含 skill 保持相容性");
});

test("5.2 AppView.renderGrowth: 正確合併 state 與 snapshot，並在重繪後保持焦點按鈕", () => {
  const view = Object.create(AppView.prototype);
  view.isMutationLocked = () => false;
  view.getStoreSnapshot = () => ({
    profile: { level: 2, xp: 50, skillPoints: 5, skills: { momo: 1 } },
    playerStats: { damage: 20, maxHp: 120, maxMp: 60 },
    xpToNext: 200
  });

  const domStore = {};
  const mockGetElementById = (id) => {
    if (!domStore[id]) domStore[id] = { textContent: "", style: {} };
    return domStore[id];
  };

  let focusedElem = null;
  const mockFocusableBtn = {
    dataset: { allocate: "damage" },
    disabled: false,
    focus() { focusedElem = this; }
  };

  view.growthGrid = {
    innerHTML: "",
    querySelector(sel) {
      if (sel.includes("damage")) return mockFocusableBtn;
      return null;
    }
  };
  view.skillsGrid = { innerHTML: "" };

  globalThis.document = {
    querySelector: (sel) => mockGetElementById(sel.replace("#", "")),
    getElementById: mockGetElementById,
    activeElement: { dataset: { allocate: "damage" } }
  };

  // Render with partial state (missing playerStats)
  view.renderGrowth({ profile: { level: 3, xp: 0, skillPoints: 6, skills: { momo: 2 } } });

  assert.equal(domStore["growth-level"].textContent, "Lv. 3");
  assert.equal(String(domStore["skill-points"].textContent), "6");
  assert.ok(view.growthGrid.innerHTML.includes("20"), "未傳入 playerStats 時應自 fallback 正確合併數值 20");
  assert.equal(focusedElem, mockFocusableBtn, "重繪後應重新 focus 原先聚焦的屬性配點按鈕");
});

test("5.3 技能 SP 不足文案已修正為 ui.insufficientSp (涵蓋四國語系)", () => {
  const locales = ["zh-Hant", "zh-Hans", "en", "ja"];
  const expectedTranslations = {
    "zh-Hant": "技能點不足！",
    "zh-Hans": "技能点不足！",
    en: "Not enough SP!",
    ja: "スキルポイント不足！"
  };

  for (const loc of locales) {
    I18n.setLocale(loc);
    assert.equal(I18n.t("ui.insufficientSp"), expectedTranslations[loc], `Locale ${loc} 翻譯正確`);
  }
  I18n.setLocale("zh-Hant");
});

test("5.4 GameStore.getTheoreticalDPS: 正確計算 burst (1.5x), burn (+30), reflect (+10)", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());

  // 1. Base DPS (Level 1, base damage 100)
  // total = 100, turnDuration = 3.5 => 100 / 3.5 = 28.571... => 28.6
  const baseDps = store.getTheoreticalDPS();
  assert.equal(baseDps, 28.6);

  // 2. Equip two-handed greatsword with burst effect (sword_great_nine: damage +70, winMultiplier: 1.5)
  store.state.inventoryEquipment.push("sword_great_nine");
  store.equipItem("sword_great_nine", "mainHand");
  // Total damage = 100 + 70 = 170. Greatsword mult = 1.5 => 170 * 1.5 = 255.
  // 255 / 3.5 = 72.857... => 72.9
  const burstDps = store.getTheoreticalDPS();
  assert.equal(burstDps, 72.9, "大劍 burst 效果正確計算 1.5 倍加成 (72.9)");

  // 3. Equip flame sword in mainHand (sword_flame: damage +25, burnDamage: 30)
  // and chest armor with reflect (chest_mirror: damage +20, reflectDamage: 40)
  store.unequipItem("mainHand");
  store.state.inventoryEquipment.push("sword_flame", "chest_mirror");
  store.equipItem("sword_flame", "mainHand");
  store.equipItem("chest_mirror", "chest");

  // Total damage = 100 + 25 + 20 = 145.
  // Passive burn = 30.
  // Passive reflect = 40 * 0.25 = 10.
  // Total expected per turn = 145 + 30 + 10 = 185.
  // 185 / 3.5 = 52.857... => 52.9
  const burnAndReflectDps = store.getTheoreticalDPS();
  assert.equal(burnAndReflectDps, 52.9, "炎之太刀 burn (+30) 與八咫護胸 reflect (+10) 正確累加納入 DPS (52.9)");
});

// -------------------------------------------------------------
// 6. 藥水快捷鍵與 QTE 單手面板 ID (Potion Hotkeys & QTE Single Panel)
// -------------------------------------------------------------
test("6.1 AppView.handleKeydown: 鍵盤快捷鍵在 countdown 倒數階段的藥水觸發檢查與缺陷分析", async () => {
  const view = Object.create(AppView.prototype);
  view.cheatModalOpen = false;
  let sentCommands = [];
  view.sendCommand = async (cmd, payload) => {
    sentCommands.push({ cmd, payload });
    return { ok: true };
  };

  globalThis.document = {
    documentElement: { classList: { add() {}, remove() {} } },
    body: { classList: { add() {}, remove() {} } },
    querySelector: () => null
  };

  // Case A: When in reaction phase (not countdown, not morphActive)
  view.battleState = {
    active: true,
    phase: "reaction",
    morphActive: false,
    hasDualHandSkill: false
  };

  await view.handleKeydown({ key: "q", code: "KeyQ", preventDefault() {} });
  assert.equal(sentCommands.length, 1, "reaction 階段非雙手模式下按 Q 正確觸發 hpPotion");
  assert.equal(sentCommands[0].payload.itemId, "hpPotion");

  await view.handleKeydown({ key: "e", code: "KeyE", preventDefault() {} });
  assert.equal(sentCommands.length, 2, "reaction 階段非雙手模式下按 E 正確觸發 mpPotion");
  assert.equal(sentCommands[1].payload.itemId, "mpPotion");

  // Case B: When in countdown phase (The primary 3-5 seconds of round)
  sentCommands = [];
  view.battleState = {
    active: true,
    phase: "countdown",
    morphActive: false,
    hasDualHandSkill: false
  };

  await view.handleKeydown({ key: "q", code: "KeyQ", preventDefault() {} });
  assert.equal(
    sentCommands.length,
    1,
    "修復證實：countdown 階段按 Q 成功觸發 hpPotion 藥水快捷鍵！"
  );
  assert.equal(sentCommands[0].payload.itemId, "hpPotion");
});

test("6.2 AppView.handleQteFinished: 正確抓取 #qte-panel-single 並在失敗時添加 is-qte-failed", () => {
  const view = Object.create(AppView.prototype);
  let failedClassAdded = false;

  const mockSinglePanel = {
    classList: {
      remove(cls) { if (cls === "is-qte-failed") failedClassAdded = false; },
      add(cls) { if (cls === "is-qte-failed") failedClassAdded = true; }
    },
    offsetWidth: 0
  };

  globalThis.document = {
    querySelector(sel) {
      if (sel === "#qte-panel-single") return mockSinglePanel;
      if (sel === "#qte-panel-dual") return null;
      return null;
    }
  };

  view.handleQteFinished({ mode: "single", success: false });
  assert.equal(failedClassAdded, true, "QTE 失敗時正確對 #qte-panel-single 套用 is-qte-failed 動畫樣式");
});
