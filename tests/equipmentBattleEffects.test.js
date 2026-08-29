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

test("火焰太刀戰鬥特效：回合結束結算 30 點燃燒傷害", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.equipment.mainHand = "sword_flame";

  const burnEvents = [];
  bus.on("battle:effect", (e) => {
    if (e.type === "burn") burnEvents.push(e);
  });

  const battle = new BattleSystem(bus, store);
  battle.start(1);
  const hpBefore = battle.state.enemyHp;

  // Resolve a draw
  battle.resolveDraw();

  assert.equal(battle.state.enemyHp, hpBefore - 30, "回合結算應觸發 30 點燃燒傷害");
  assert.equal(burnEvents.length, 1);
  assert.equal(burnEvents[0].amount, 30);
  battle.abandon();
});

test("朱雀盾戰鬥特效：受擊時減免 30 點傷害", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.equipment.offHand = "shield_suzaku";

  const battle = new BattleSystem(bus, store);
  battle.start(1);
  const hpBefore = battle.state.playerHp;

  // Player gets hit
  battle.damagePlayer("受擊測試");

  assert.equal(battle.state.playerHp, hpBefore - (100 - 30), "受擊傷害應由 100 減免 30 為 70");
  battle.abandon();
});

test("破滅九尾雙手巨劍特效：常規出拳獲勝傷害乘 1.5 倍", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.equipment.mainHand = "sword_great_nine";

  const battle = new BattleSystem(bus, store);
  battle.start(1);
  const hpBefore = battle.state.enemyHp;
  const expectedDmg = Math.round(battle.state.playerDamage * 1.5);

  battle.damageEnemy("雙手劍普通獲勝", false);

  assert.equal(battle.state.enemyHp, hpBefore - expectedDmg, "雙手劍常規獲勝應造成 1.5 倍傷害");
  battle.abandon();
});

test("絆之守護胸章特效：戰勝獲得 +20% 星砂加成", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.equipment.badge = "badge_bond";

  const reward = store.recordBattle(true, STAGES[0]);
  assert.equal(reward.coins, Math.round(100 * 1.2), "戰勝獎勵應獲得 +20% 星砂 (120)");
});
