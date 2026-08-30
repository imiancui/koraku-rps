import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("戰績與統計紀錄系統：累計獲得星砂、EXP、總場次、手動與自動勝敗區分", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  assert.equal(store.state.records.totalCoinsEarned, 0);
  assert.equal(store.state.records.totalXpEarned, 0);
  assert.equal(store.state.records.totalBattles, 0);
  assert.equal(store.state.records.manualWins, 0);
  assert.equal(store.state.records.manualLosses, 0);
  assert.equal(store.state.records.autoWins, 0);
  assert.equal(store.state.records.autoLosses, 0);
  assert.equal(store.state.records.watermelonSlices, 0);

  // Manual Win Stage 1 (+100 coins, +120 xp)
  store.recordBattle(true, { id: 1, winCoins: 100, xpWin: 120 }, { isAuto: false });
  assert.equal(store.state.records.totalBattles, 1);
  assert.equal(store.state.records.wins, 1);
  assert.equal(store.state.records.manualWins, 1);
  assert.equal(store.state.records.autoWins, 0);
  assert.equal(store.state.records.totalCoinsEarned, 100);
  assert.equal(store.state.records.totalXpEarned, 120);
  assert.deepEqual(store.state.records.stageStats[1], {
    totalAttempts: 1,
    manualWins: 1,
    manualLosses: 0,
    autoWins: 0,
    autoLosses: 0
  });

  // Manual Loss Stage 1 (with 250 damage on 1000 HP -> 10% reward: +5 coins, +4 xp)
  store.recordBattle(false, { id: 1, lossCoins: 50, xpLoss: 40, enemyHp: 1000 }, { isAuto: false, damageDealt: 250 });
  assert.equal(store.state.records.totalBattles, 2);
  assert.equal(store.state.records.losses, 1);
  assert.equal(store.state.records.manualLosses, 1);
  assert.equal(store.state.records.autoLosses, 0);
  assert.equal(store.state.records.totalCoinsEarned, 105);
  assert.equal(store.state.records.totalXpEarned, 124);
  assert.deepEqual(store.state.records.stageStats[1], {
    totalAttempts: 2,
    manualWins: 1,
    manualLosses: 1,
    autoWins: 0,
    autoLosses: 0
  });

  // Auto Battle 3 Wins on Stage 2
  store.recordBattle(true, { id: 2, winCoins: 150, xpWin: 200 }, { isAuto: true });
  store.recordBattle(true, { id: 2, winCoins: 150, xpWin: 200 }, { isAuto: true });
  store.recordBattle(true, { id: 2, winCoins: 150, xpWin: 200 }, { isAuto: true });
  assert.equal(store.state.records.totalBattles, 5);
  assert.equal(store.state.records.autoWins, 3);
  assert.equal(store.state.records.manualWins, 1);
  assert.deepEqual(store.state.records.stageStats[2], {
    totalAttempts: 3,
    manualWins: 0,
    manualLosses: 0,
    autoWins: 3,
    autoLosses: 0
  });

  // Watermelon slice recording
  store.recordWatermelonSlice();
  store.recordWatermelonSlice();
  assert.equal(store.state.records.watermelonSlices, 2);
});
