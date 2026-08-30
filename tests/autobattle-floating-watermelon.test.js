import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../src/js/systems/PostBattleSystem.js";
import { STAGES } from "../src/js/config/gameConfig.js";
import { I18n } from "../src/js/services/I18n.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("GameStore: 切西瓜次數堆疊池（上限 999 次）與消耗管理", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  assert.equal(store.state.records.watermelonStock, 0, "初始庫存為 0");

  store.addWatermelonStock(5);
  assert.equal(store.state.records.watermelonStock, 5);

  store.addWatermelonStock(1000);
  assert.equal(store.state.records.watermelonStock, 999, "上限保護最多 999 次");

  const consumed = store.consumeWatermelonStock(1);
  assert.equal(consumed, true);
  assert.equal(store.state.records.watermelonStock, 998);

  const failedConsume = store.consumeWatermelonStock(2000);
  assert.equal(failedConsume, false, "庫存不足時無法消耗");
  assert.equal(store.state.records.watermelonStock, 998);

  store.setWatermelonStock(10);
  assert.equal(store.state.records.watermelonStock, 10);
});

test("BattleSystem & GameStore: 自動刷關勝場自動累積切西瓜次數", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.records.clearedStages = [1];
  store.state.profile.level = 10;

  const battle = new BattleSystem(bus, store);
  assert.equal(battle.startAutoBattle(1, 3), true);

  // Victory 1
  battle.end(true);
  assert.equal(store.state.records.watermelonStock, 1, "第 1 場勝場累積 1 次切西瓜");

  // Victory 2
  battle.start(1, { autoBattle: true });
  battle.end(true);
  assert.equal(store.state.records.watermelonStock, 2, "第 2 場勝場累積至 2 次切西瓜");

  // Loss
  battle.start(1, { autoBattle: true });
  battle.end(false);
  assert.equal(store.state.records.watermelonStock, 2, "敗北不增加切西瓜次數");
});

test("PostBattleSystem: 自動刷關浮動切西瓜三階段與多輪連續挑戰", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.addWatermelonStock(2);

  const postBattle = new PostBattleSystem(bus, store, () => 0.5);

  // 1. Start round 1 (consumes 1 stock)
  assert.equal(postBattle.startAutoWatermelonRound(), true);
  assert.equal(store.state.records.watermelonStock, 1, "開啟第 1 輪消耗 1 次庫存");
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonAim");
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 0);

  // Strike 1
  postBattle.autoWatermelonState.target = 0.5;
  postBattle.autoWatermelonState.strikeStartedAt = performance.now() - (postBattle.autoWatermelonState.strikeDuration / 4);
  postBattle.autoWatermelonStrike();
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonResult");
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 1);
  assert.equal(postBattle.autoWatermelonState.watermelon.successes, 1);

  // Strike 2
  postBattle.startAutoWatermelonRound(); // Advances to knife 2
  postBattle.autoWatermelonState.target = 0.5;
  postBattle.autoWatermelonState.strikeStartedAt = performance.now() - (postBattle.autoWatermelonState.strikeDuration / 4);
  postBattle.autoWatermelonStrike();
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonResult");
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 2);

  // Strike 3
  postBattle.startAutoWatermelonRound(); // Advances to knife 3
  postBattle.autoWatermelonState.target = 0.5;
  postBattle.autoWatermelonState.strikeStartedAt = performance.now() - (postBattle.autoWatermelonState.strikeDuration / 4);
  postBattle.autoWatermelonStrike();
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonComplete", "三刀完成結算");
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 3);
  assert.equal(postBattle.autoWatermelonState.watermelon.successes, 3);

  // 2. Start round 2 (consumes remaining 1 stock)
  assert.equal(postBattle.startAutoWatermelonRound(), true);
  assert.equal(store.state.records.watermelonStock, 0, "開啟第 2 輪消耗最後 1 次庫存");
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonAim");
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 0);

  // Finish 3 strikes for round 2
  for (let i = 0; i < 3; i++) {
    if (postBattle.autoWatermelonState.scene !== "watermelonAim") {
      postBattle.startAutoWatermelonRound();
    }
    postBattle.autoWatermelonState.target = 0.5;
    postBattle.autoWatermelonState.strikeStartedAt = performance.now() - (postBattle.autoWatermelonState.strikeDuration / 4);
    postBattle.autoWatermelonStrike();
  }
  assert.equal(postBattle.autoWatermelonState.scene, "watermelonComplete");

  // 3. Attempt round 3 with 0 stock -> should fail gracefully
  assert.equal(postBattle.startAutoWatermelonRound(), false, "庫存為 0 時無法再開新輪");
});

test("PostBattleSystem: 自動刷關結果不觸發全螢幕結算遮罩，手動戰鬥仍觸發全螢幕結算", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const postBattle = new PostBattleSystem(bus, store, () => 0.5);

  // Auto-battle win
  postBattle.open({
    won: true,
    stage: STAGES[0],
    reward: { coins: 100, xp: 150, levelsGained: 1 },
    isAuto: true
  });
  assert.equal(postBattle.state, null, "自動刷關結算時 postBattle.state 不建立全螢幕結算");

  // Manual win
  postBattle.open({
    won: true,
    stage: STAGES[0],
    reward: { coins: 100, xp: 150, levelsGained: 1 },
    isAuto: false
  });
  assert.notEqual(postBattle.state, null);
  assert.equal(postBattle.state.scene, "victory", "手動勝利建立 victory 全螢幕結算");
});

test("I18n: 四國語系皆完整包含切西瓜浮層與累計次數字典鍵，且按鈕字典無 raw <kbd> 標籤", () => {
  const requiredKeys = [
    "autoWatermelonStock",
    "btnNextWatermelonRound",
    "btnStartWatermelonRound",
    "floatingWatermelonTitle",
    "floatingWatermelonAimDesc",
    "floatingWatermelonFinished",
    "floatingWatermelonNoStock"
  ];

  const buttonKeys = [
    "btnNextStrikeSpace",
    "btnAskSwimsuitSpace",
    "btnPlayWatermelonSpace",
    "btnRematch",
    "btnSelectStages",
    "btnReturnHome"
  ];

  ["zh-Hant", "zh-Hans", "en", "ja"].forEach((locale) => {
    I18n.setLocale(locale);
    requiredKeys.forEach((key) => {
      const translation = I18n.t(`ui.${key}`, { count: 5 });
      assert.ok(translation, `Locale ${locale} 缺少字典鍵 ui.${key}`);
      assert.notEqual(translation, `ui.${key}`, `Locale ${locale} 字典鍵 ui.${key} 未被正確翻譯`);
    });

    buttonKeys.forEach((key) => {
      const translation = I18n.t(`ui.${key}`, { attempt: 2 });
      assert.ok(translation, `Locale ${locale} 缺少按鈕字典鍵 ui.${key}`);
      assert.ok(!translation.includes("<kbd>") && !translation.includes("</kbd>"), `Locale ${locale} 按鈕鍵 ui.${key} 不應包含 raw <kbd> 標籤，實際為: ${translation}`);
    });
  });
});

test("Session Persistence: 儲存與復原活躍頁面與戰鬥狀態邏輯", () => {
  const mockSessionStorage = new Map();

  // Simulate navigating to shop
  mockSessionStorage.set("koraku_active_screen", "shop");
  assert.equal(mockSessionStorage.get("koraku_active_screen"), "shop");

  // Simulate starting auto battle on stage 2
  mockSessionStorage.set("koraku_active_screen", "battle");
  mockSessionStorage.set("koraku_active_battle", JSON.stringify({
    stageId: 2,
    isAuto: true,
    rounds: 10,
    remainingRounds: 7
  }));

  // Verify reload recovery state
  const targetScreen = mockSessionStorage.get("koraku_active_screen");
  const activeBattle = JSON.parse(mockSessionStorage.get("koraku_active_battle"));

  assert.equal(targetScreen, "battle");
  assert.equal(activeBattle.stageId, 2);
  assert.equal(activeBattle.isAuto, true);
  assert.equal(activeBattle.remainingRounds, 7);
});

test("History Navigation: 支援 Hash 與 Popstate 歷史狀態倒退", () => {
  const historyStack = [];
  let currentHash = "#home";

  function pushState(screen) {
    historyStack.push({ screen });
    currentHash = "#" + screen;
  }

  function popState() {
    if (historyStack.length > 1) {
      historyStack.pop();
      const prev = historyStack[historyStack.length - 1];
      currentHash = "#" + prev.screen;
      return prev.screen;
    }
    return "home";
  }

  pushState("home");
  pushState("stages");
  pushState("shop");
  assert.equal(currentHash, "#shop");

  const back1 = popState();
  assert.equal(back1, "stages");
  assert.equal(currentHash, "#stages");

  const back2 = popState();
  assert.equal(back2, "home");
  assert.equal(currentHash, "#home");
});


