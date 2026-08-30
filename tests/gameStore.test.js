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

test("音樂與音效開關獨立切換與持久化儲存", () => {
  const persistence = new MemoryPersistence();
  const store = new GameStore(new EventBus(), persistence);
  
  assert.equal(store.snapshot().settings.musicMuted, false);
  assert.equal(store.snapshot().settings.sfxMuted, false);

  const musicMuted = store.toggleMusicMuted();
  assert.equal(musicMuted, true);
  assert.equal(store.snapshot().settings.musicMuted, true);
  assert.equal(store.snapshot().settings.sfxMuted, false);

  const sfxMuted = store.toggleSfxMuted();
  assert.equal(sfxMuted, true);
  assert.equal(store.snapshot().settings.musicMuted, true);
  assert.equal(store.snapshot().settings.sfxMuted, true);

  // 重新載入時狀態正確復原
  const reloadedStore = new GameStore(new EventBus(), persistence);
  assert.equal(reloadedStore.snapshot().settings.musicMuted, true);
  assert.equal(reloadedStore.snapshot().settings.sfxMuted, true);
});

