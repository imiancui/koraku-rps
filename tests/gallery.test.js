import test from "node:test";
import assert from "node:assert/strict";
import { GALLERY_ITEMS } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { PostBattleSystem } from "../src/js/systems/PostBattleSystem.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("圖鑑設定：包含泳裝小樂預設與切西瓜差分", () => {
  assert.equal(GALLERY_ITEMS.length, 2);
  assert.equal(GALLERY_ITEMS[0].id, "swimsuit_default");
  assert.equal(GALLERY_ITEMS[0].src, "./koraku/泳裝小樂.png");
  assert.equal(GALLERY_ITEMS[1].id, "swimsuit_watermelon");
  assert.equal(GALLERY_ITEMS[1].src, "./koraku/泳裝小樂_西瓜.png");
});

test("圖鑑解鎖與泳裝事件結算：初次獲勝或觸發泳裝事件時解鎖圖鑑", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  assert.equal(store.state.records.unlockedSwimsuit, false, "初始泳裝立繪未解鎖");

  const postBattle = new PostBattleSystem(bus, store);
  postBattle.open({ stage: { id: 1, name: "初逢・朱鳥居" }, won: true, reward: { coins: 100, xp: 150, levelsGained: 0 } });
  postBattle.requestSwimsuit();

  assert.equal(store.state.records.unlockedSwimsuit, true, "請求小樂穿泳裝後應解鎖圖鑑立繪");
});
