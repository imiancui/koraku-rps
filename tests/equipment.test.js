import test from "node:test";
import assert from "node:assert/strict";
import { EQUIPMENT_ITEMS } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("裝備購買與背包存放：扣除星砂並存入裝備背包", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  store.state.coins = 500;
  const flameSword = EQUIPMENT_ITEMS.sword_flame;

  const result = store.buyEquipment("sword_flame");
  assert.equal(result.ok, true);
  assert.equal(store.state.coins, 500 - flameSword.price);
  assert.deepEqual(store.state.inventoryEquipment, ["sword_flame"]);

  // Insufficient coins
  store.state.coins = 10;
  const failRes = store.buyEquipment("sword_great_nine");
  assert.equal(failRes.ok, false);
  assert.equal(store.state.coins, 10);
});

test("裝備穿戴與卸下：屬性即時加成與卸下放回背包", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  const baseStats = store.snapshot().playerStats;
  store.state.inventoryEquipment = ["helm_fox", "shoulders_crimson"];

  // Equip Fox Helm
  const equipRes = store.equipItem("helm_fox");
  assert.equal(equipRes.ok, true);
  assert.equal(store.state.equipment.head, "helm_fox");
  assert.deepEqual(store.state.inventoryEquipment, ["shoulders_crimson"]);

  const helmStats = store.snapshot().playerStats;
  assert.equal(helmStats.maxHp, baseStats.maxHp + EQUIPMENT_ITEMS.helm_fox.stats.hp);
  assert.equal(helmStats.maxMp, baseStats.maxMp + EQUIPMENT_ITEMS.helm_fox.stats.mp);
  assert.equal(helmStats.damage, baseStats.damage + EQUIPMENT_ITEMS.helm_fox.stats.damage);

  // Unequip Fox Helm
  const unequipRes = store.unequipItem("head");
  assert.equal(unequipRes.ok, true);
  assert.equal(store.state.equipment.head, null);
  assert.deepEqual(store.state.inventoryEquipment, ["shoulders_crimson", "helm_fox"]);
  assert.equal(store.snapshot().playerStats.maxHp, baseStats.maxHp);
});

test("雙手巨劍互斥邏輯：穿戴雙手武器自動卸下副手，穿戴副手自動卸下雙手巨劍", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  store.state.inventoryEquipment = ["sword_great_nine", "shield_suzaku", "sword_flame"];

  // Equip flame sword to mainHand and shield to offHand
  store.equipItem("sword_flame", "mainHand");
  store.equipItem("shield_suzaku", "offHand");
  assert.equal(store.state.equipment.mainHand, "sword_flame");
  assert.equal(store.state.equipment.offHand, "shield_suzaku");
  assert.deepEqual(store.state.inventoryEquipment, ["sword_great_nine"]);

  // Equip two-handed greatsword -> offHand shield is unequipped to bag
  const twoHandRes = store.equipItem("sword_great_nine");
  assert.equal(twoHandRes.ok, true);
  assert.equal(store.state.equipment.mainHand, "sword_great_nine");
  assert.equal(store.state.equipment.offHand, null, "穿戴雙手巨劍後副手必須為空");
  assert.ok(store.state.inventoryEquipment.includes("shield_suzaku"));
  assert.ok(store.state.inventoryEquipment.includes("sword_flame"));

  // Equip shield to offHand -> two-handed greatsword is unequipped to bag
  const shieldRes = store.equipItem("shield_suzaku", "offHand");
  assert.equal(shieldRes.ok, true);
  assert.equal(store.state.equipment.offHand, "shield_suzaku");
  assert.equal(store.state.equipment.mainHand, null, "副手穿戴盾牌後原雙手大劍自動卸下");
  assert.ok(store.state.inventoryEquipment.includes("sword_great_nine"));
});
