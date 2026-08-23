import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { STAGES } from "../src/js/config/gameConfig.js";

class MemoryPersistence {
  constructor(data = null) {
    this.data = data;
  }

  load() {
    return this.data;
  }

  save(data) {
    this.data = structuredClone(data);
  }

  clear() {
    this.data = null;
  }
}

test("初始玩家帶一瓶 HP 藥水與 100/50 基礎資源", () => {
  const store = new GameStore(new EventBus(), new MemoryPersistence());
  const state = store.snapshot();
  assert.equal(state.inventory.hpPotion, 1);
  assert.equal(state.inventory.mpPotion, 0);
  assert.equal(state.playerStats.maxHp, 100);
  assert.equal(state.playerStats.maxMp, 50);
});

test("勝敗分別給予 100 與 50 星砂", () => {
  const store = new GameStore(new EventBus(), new MemoryPersistence());
  const win = store.recordBattle(true, STAGES[0]);
  const loss = store.recordBattle(false, STAGES[0]);
  assert.equal(win.coins, 100);
  assert.equal(loss.coins, 50);
  assert.equal(store.snapshot().coins, 150);
});

test("商店扣除 100 星砂並增加指定藥水", () => {
  const store = new GameStore(new EventBus(), new MemoryPersistence());
  store.state.coins = 100;
  const purchase = store.buyItem("mpPotion");
  assert.equal(purchase.ok, true);
  assert.equal(store.snapshot().coins, 0);
  assert.equal(store.snapshot().inventory.mpPotion, 1);
});
