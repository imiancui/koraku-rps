import test from "node:test";
import assert from "node:assert/strict";
import { GameStore } from "../src/js/core/GameStore.js";
import { I18n } from "../src/js/services/I18n.js";
import { STAGES } from "../src/js/config/gameConfig.js";

function createMockBus() {
  const listeners = new Map();
  return {
    on(event, fn) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(fn);
    },
    emit(event, payload) {
      const set = listeners.get(event);
      if (set) {
        set.forEach((fn) => fn(payload));
      }
    }
  };
}

function createMockPersistence(initialData = null) {
  let data = initialData;
  return {
    load() {
      return data;
    },
    save(next) {
      data = structuredClone(next);
    },
    clear() {
      data = null;
    }
  };
}

test("GameStore: Theoretical DPS computes expected damage output", () => {
  const bus = createMockBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);

  // Initial Level 1 player theoretical DPS
  const initialDps = store.getTheoreticalDPS();
  assert.ok(initialDps > 0, "Initial DPS should be positive");
  assert.equal(typeof initialDps, "number");

  // Upgrade damage allocation
  store.cheatSetValues({
    allocations: { damage: 10 }
  });
  const upgradedDps = store.getTheoreticalDPS();
  assert.ok(upgradedDps > initialDps, "Upgraded damage should increase theoretical DPS");

  // Equip Flame Katana (burn DOT)
  store.state.equipment.mainHand = "sword_flame";
  const flameDps = store.getTheoreticalDPS();
  assert.ok(flameDps > upgradedDps, "Flame Katana burn DOT should increase theoretical DPS");
});

test("GameStore: records battle details, damage dealt/taken, duration, combat DPS and caps recentBattles at 100", () => {
  const bus = createMockBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);

  const stage = STAGES[0]; // Stage 1
  const reward = store.recordBattle(true, stage, {
    isAuto: false,
    damageDealt: 120,
    damageTaken: 30,
    durationSec: 4
  });

  assert.equal(reward.dps, 30.0);
  assert.equal(reward.damageDealt, 120);
  assert.equal(reward.damageTaken, 30);
  assert.equal(store.state.records.damageDealt.total, 120);
  assert.equal(store.state.records.damageDealt.byStage[1], 120);
  assert.equal(store.state.records.damageTaken.total, 30);
  assert.equal(store.state.records.damageTaken.byStage[1], 30);
  assert.equal(store.state.records.recentBattles.length, 1);
  assert.equal(store.state.records.recentBattles[0].dps, 30.0);
  assert.equal(store.state.records.recentBattles[0].rewardCoins, reward.coins);
  assert.equal(store.state.records.recentBattles[0].rewardXp, reward.xp);

  // Test 100 battle cap
  for (let i = 0; i < 110; i++) {
    store.recordBattle(i % 2 === 0, STAGES[i % STAGES.length], {
      isAuto: true,
      damageDealt: 100,
      damageTaken: 20,
      durationSec: 5
    });
  }

  assert.equal(store.state.records.recentBattles.length, 100, "recentBattles should be capped at 100 entries");
});

test("GameStore: tracks consumables used, morph successes, 3-stage watermelon slicing, and per-stage QTE stats", () => {
  const bus = createMockBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);

  // Consumables
  store.recordPotionUse("hpPotion");
  store.recordPotionUse("hpPotion");
  store.recordPotionUse("mpPotion");
  assert.equal(store.state.records.consumablesUsed.hpPotion, 2);
  assert.equal(store.state.records.consumablesUsed.mpPotion, 1);

  // Morph uses
  store.recordMorphUse();
  store.recordMorphUse();
  assert.equal(store.state.records.morphUses, 2);

  // Watermelon 3 stages
  store.recordWatermelonStageCut(1, true);
  store.recordWatermelonStageCut(2, false);
  store.recordWatermelonStageCut(3, true);
  assert.equal(store.state.records.watermelonStageStats[1].attempts, 1);
  assert.equal(store.state.records.watermelonStageStats[1].successes, 1);
  assert.equal(store.state.records.watermelonStageStats[2].attempts, 1);
  assert.equal(store.state.records.watermelonStageStats[2].successes, 0);
  assert.equal(store.state.records.watermelonStageStats[3].attempts, 1);
  assert.equal(store.state.records.watermelonStageStats[3].successes, 1);

  // QTE Stats per stage
  store.recordQteAttempt(1, true);
  store.recordQteAttempt(1, false);
  store.recordQteAttempt(2, true);
  assert.equal(store.state.records.qteStats.totalAttempts, 3);
  assert.equal(store.state.records.qteStats.totalSuccesses, 2);
  assert.equal(store.state.records.qteStats.byStage[1].attempts, 2);
  assert.equal(store.state.records.qteStats.byStage[1].successes, 1);
  assert.equal(store.state.records.qteStats.byStage[2].attempts, 1);
  assert.equal(store.state.records.qteStats.byStage[2].successes, 1);
});

test("I18n: all 4 languages contain complete Journey Records, DPS, and QTE dictionary keys", () => {
  const languages = ["zh-Hant", "zh-Hans", "en", "ja"];
  const requiredKeys = [
    "menuRecords",
    "homeRecordsTitle",
    "homeRecordsDesc",
    "theoreticalDps",
    "combatDps",
    "currentEquipment",
    "currentLevelXp",
    "consumablesUsed",
    "morphSuccesses",
    "watermelonCutAnalysis",
    "strikeStage",
    "strikeTotal",
    "qteSuccessRate",
    "recentBattlesTitle"
  ];

  for (const lang of languages) {
    I18n.setLocale(lang);
    for (const key of requiredKeys) {
      const text = I18n.t(`ui.${key}`);
      assert.ok(text && !text.startsWith("ui."), `Language ${lang} must have translation for ui.${key}`);
    }
  }
});
