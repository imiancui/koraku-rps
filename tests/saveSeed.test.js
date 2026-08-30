import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { encodeSaveData, decodeSaveData } from "../src/js/services/Persistence.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("存檔種子碼編碼與解碼：支援 UTF-8 特殊字元、KORAKU1_ 前綴與資料完整還原", () => {
  const sampleData = {
    version: 1,
    profile: {
      level: 10,
      xp: 450,
      skillPoints: 12,
      allocations: { hp: 5, mp: 5, damage: 2 },
      skills: { momo: 5, dualHand: 1 }
    },
    coins: 3880,
    inventory: { hpPotion: 8, mpPotion: 4 },
    equipment: {
      head: "helm_fox",
      shoulders: "shoulders_crimson",
      chest: "chest_samurai",
      belt: "belt_shimenawa",
      boots: "boots_gale",
      mainHand: "sword_flame",
      offHand: "shield_suzaku",
      ring1: "ring_ruby",
      ring2: "ring_sapphire",
      earring1: "earring_magatama",
      earring2: null,
      badge: "badge_bond"
    },
    inventoryEquipment: ["sword_frost", "dagger_shadow"],
    records: {
      wins: 25,
      losses: 3,
      bestStage: 3,
      clearedStages: [1, 2, 3],
      unlockedSwimsuit: true
    },
    settings: {
      muted: false,
      musicMuted: false,
      sfxMuted: false
    }
  };

  const seedCode = encodeSaveData(sampleData);
  assert.ok(seedCode.startsWith("KORAKU1_"), "種子碼應具有 KORAKU1_ 前綴");

  const restored = decodeSaveData(seedCode);
  assert.deepEqual(restored, sampleData, "解碼後之存檔物件應與原存檔 100% 相同");
});

test("GameStore 存檔導出與匯入：跨裝置種子碼繼承與狀態覆蓋更新", () => {
  const bus = new EventBus();
  const persistenceA = new MemoryPersistence();
  const storeA = new GameStore(bus, persistenceA);

  // 模擬裝置 A 的遊戲進度
  storeA.cheatSetValues({
    level: 8,
    xp: 120,
    skillPoints: 15,
    coins: 5200,
    hpPotion: 5,
    mpPotion: 5,
    allocations: { hp: 3, mp: 2, damage: 5 },
    skills: { momo: 3, dualHand: 0 }
  });
  storeA.buyEquipment("sword_flame");
  storeA.equipItem("sword_flame");

  const seedCodeFromA = storeA.exportSaveCode();
  assert.ok(typeof seedCodeFromA === "string" && seedCodeFromA.length > 20);

  // 模擬裝置 B 初始狀態
  const persistenceB = new MemoryPersistence();
  const storeB = new GameStore(bus, persistenceB);
  assert.equal(storeB.state.profile.level, 1);
  assert.equal(storeB.state.coins, 0);

  // 裝置 B 匯入裝置 A 的種子碼
  let storeChangedEventFired = false;
  bus.on("store:changed", (event) => {
    if (event.reason === "import-save") {
      storeChangedEventFired = true;
    }
  });

  const importResult = storeB.importSaveCode(seedCodeFromA);
  assert.equal(importResult.ok, true, "匯入有效種子碼應成功");
  assert.equal(storeChangedEventFired, true, "應觸發 store:changed 事件");

  // 驗證裝置 B 資料已完整繼承裝置 A
  assert.equal(storeB.state.profile.level, 8);
  assert.equal(storeB.state.coins, 5200 - 350); // 扣除購買太刀價格
  assert.equal(storeB.state.profile.allocations.damage, 5);
  assert.equal(storeB.state.profile.skills.momo, 3);
  assert.equal(storeB.state.equipment.mainHand, "sword_flame");

  // 驗證持久化 localStorage 已寫入新進度
  assert.equal(persistenceB.load().profile.level, 8);
});

test("種子碼異常防護：空白、無效 Base64 或損毀字串輸入時應安全攔截", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // 空字串或空白
  assert.equal(store.importSaveCode("").ok, false);
  assert.equal(store.importSaveCode("   ").ok, false);
  assert.equal(store.importSaveCode(null).ok, false);

  // 隨機亂碼
  assert.equal(store.importSaveCode("not_a_valid_seed_code!!!").ok, false);
  assert.equal(store.importSaveCode("KORAKU1_invalidbase64^^^").ok, false);

  // 非物件 JSON
  assert.equal(store.importSaveCode("KORAKU1_MTIz").ok, false); // base64 of "123"

  // 存檔狀態應保持原樣不變
  assert.equal(store.state.profile.level, 1);
});

test("存檔管理重置功能：清空所有進度並重設為初始狀態", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  store.cheatSetValues({ level: 20, coins: 9999 });
  assert.equal(store.state.profile.level, 20);

  store.reset();
  assert.equal(store.state.profile.level, 1);
  assert.equal(store.state.coins, 0);
  assert.equal(store.state.profile.skillPoints, 0);
  assert.equal(persistence.load().profile.level, 1);
  assert.equal(persistence.load().coins, 0);
});
