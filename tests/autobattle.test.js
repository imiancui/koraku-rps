import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { STAGES } from "../src/js/config/gameConfig.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("通關關卡記錄：獲勝時自動將關卡加入 clearedStages", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  assert.deepEqual(store.state.records.clearedStages, []);

  store.recordBattle(true, STAGES[0]);
  assert.deepEqual(store.state.records.clearedStages, [1]);

  store.recordBattle(true, STAGES[1]);
  assert.deepEqual(store.state.records.clearedStages, [1, 2]);

  // Duplicate win does not duplicate array entry
  store.recordBattle(true, STAGES[0]);
  assert.deepEqual(store.state.records.clearedStages, [1, 2]);
});

test("自動刷關系統：啟動後自動推進出拳與 QTE，勝利連續重開與更新次數", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // Level 10 and max damage so player wins easily
  store.state.profile.level = 10;
  store.state.coins = 0;

  const battle = new BattleSystem(bus, store);

  // Before clearing stage 1, startAutoBattle should be rejected
  assert.equal(battle.startAutoBattle(1, 3), false, "未手動通關前無法開啟自動刷關");

  // Mark stage 1 as cleared
  store.state.records.clearedStages = [1];

  // Start auto-battle for stage 1 with 3 rounds
  assert.equal(battle.startAutoBattle(1, 3), true);
  assert.equal(battle.autoBattle.active, true);
  assert.equal(battle.autoBattle.totalRounds, 3);
  assert.equal(battle.autoBattle.remainingRounds, 3);

  // End round 1 with victory
  battle.end(true);
  assert.equal(battle.autoBattle.wins, 1);
  assert.equal(battle.autoBattle.remainingRounds, 2);
  assert.equal(battle.autoBattle.active, true);

  // Start & End round 2 with victory
  battle.start(1, { autoBattle: true });
  battle.end(true);
  assert.equal(battle.autoBattle.wins, 2);
  assert.equal(battle.autoBattle.remainingRounds, 1);
  assert.equal(battle.autoBattle.active, true);

  // Start & End round 3 with defeat
  battle.start(1, { autoBattle: true });
  battle.end(false);
  assert.equal(battle.autoBattle.losses, 1);
  assert.equal(battle.autoBattle.remainingRounds, 0);
  assert.equal(battle.autoBattle.active, false, "次數歸零後自動刷關結束");
});

test("自動刷關暫停與繼續：支援 pauseAutoBattle / resumeAutoBattle / toggleAutoBattle 與圖示狀態切換", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.records.clearedStages = [1];

  const battle = new BattleSystem(bus, store);
  assert.equal(battle.startAutoBattle(1, 10), true);
  assert.equal(battle.autoBattle.active, true);
  assert.equal(battle.autoBattle.isPaused, false);

  // 1. Pause
  battle.pauseAutoBattle();
  assert.equal(battle.autoBattle.active, true);
  assert.equal(battle.autoBattle.isPaused, true);
  assert.equal(battle.state.autoBattle.isPaused, true);

  // 2. Resume
  battle.resumeAutoBattle();
  assert.equal(battle.autoBattle.active, true);
  assert.equal(battle.autoBattle.isPaused, false);
  assert.equal(battle.state.autoBattle.isPaused, false);

  // 3. Toggle
  battle.toggleAutoBattle();
  assert.equal(battle.autoBattle.isPaused, true);
  battle.toggleAutoBattle();
  assert.equal(battle.autoBattle.isPaused, false);

  battle.abandon();
});

test("自動刷關僅為連續挑戰：不自動猜拳變拳，保留玩家選擇與數值挑戰", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.records.clearedStages = [1];
  store.state.profile.level = 5;

  const battle = new BattleSystem(bus, store);
  assert.equal(battle.startAutoBattle(1, 5), true);
  battle.selectHand("rock");
  assert.equal(battle.state.selectedHand, "rock");

  // Advance to reveal: player's hand remains rock
  battle.revealHands();
  assert.equal(battle.state.selectedHand, "rock");
  assert.equal(battle.state.morphUsed, false);

  battle.abandon();
});


