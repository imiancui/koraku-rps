import test from "node:test";
import assert from "node:assert/strict";
import { GALLERY_ITEMS } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { PostBattleSystem } from "../src/js/systems/PostBattleSystem.js";
import { AppView } from "../src/js/ui/AppView.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("圖鑑設定：包含小樂預設、2P色、清涼泳裝（含切西瓜差分）共3種主造型", () => {
  assert.equal(GALLERY_ITEMS.length, 3);
  assert.equal(GALLERY_ITEMS[0].id, "koraku_default");
  assert.equal(GALLERY_ITEMS[0].src, "./koraku/小樂-預設.webp");
  assert.equal(GALLERY_ITEMS[1].id, "koraku_2p");
  assert.equal(GALLERY_ITEMS[1].src, "./koraku/小樂-2P色.webp");
  assert.equal(GALLERY_ITEMS[2].id, "swimsuit_default");
  assert.equal(GALLERY_ITEMS[2].src, "./koraku/泳裝小樂.webp");
  assert.ok(Array.isArray(GALLERY_ITEMS[2].diffVariants));
  assert.equal(GALLERY_ITEMS[2].diffVariants.length, 2);
  assert.equal(GALLERY_ITEMS[2].diffVariants[0].id, "default");
  assert.equal(GALLERY_ITEMS[2].diffVariants[1].id, "watermelon");
  assert.equal(GALLERY_ITEMS[2].diffVariants[1].src, "./koraku/泳裝小樂_西瓜.webp");
});

test("圖鑑解鎖條件：預設小樂直接解鎖、2P色需通關第4關、泳裝需通關或觸發事件", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const isUnlocked = AppView.prototype.isGalleryItemUnlocked;

  // 1. 初始狀態：預設小樂解鎖，其餘鎖定
  assert.equal(isUnlocked(GALLERY_ITEMS[0], store.snapshot()), true, "預設小樂應直接解鎖");
  assert.equal(isUnlocked(GALLERY_ITEMS[1], store.snapshot()), false, "2P色小樂初始應鎖定");
  assert.equal(isUnlocked(GALLERY_ITEMS[2], store.snapshot()), false, "泳裝小樂初始應鎖定");

  // 2. 通關第一關：解鎖泳裝
  store.recordBattle(true, { id: 1, name: "初逢・朱鳥居", winCoins: 100, xpWin: 150 });
  assert.equal(isUnlocked(GALLERY_ITEMS[0], store.snapshot()), true, "預設小樂依然解鎖");
  assert.equal(isUnlocked(GALLERY_ITEMS[1], store.snapshot()), false, "通關第1關時2P色仍鎖定");
  assert.equal(isUnlocked(GALLERY_ITEMS[2], store.snapshot()), true, "通關第1關後泳裝解鎖");

  // 3. 通關第四關：解鎖 2P 色小樂
  store.recordBattle(true, { id: 4, name: "鏡界・白金小樂", winCoins: 800, xpWin: 1200 });
  assert.equal(isUnlocked(GALLERY_ITEMS[1], store.snapshot()), true, "通關第4關後2P色小樂解鎖");

  // 4. 一鍵作弊全解鎖圖鑑
  const freshStore = new GameStore(bus, new MemoryPersistence());
  freshStore.cheatUnlockGallery();
  for (const item of GALLERY_ITEMS) {
    assert.equal(isUnlocked(item, freshStore.snapshot()), true, `作弊全解鎖後 ${item.id} 應為解鎖狀態`);
  }
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

