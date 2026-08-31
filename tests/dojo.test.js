import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { QTESystem, DualQTESystem } from "../src/js/systems/QTESystem.js";
import { TimerRegistry } from "../src/js/core/TimerRegistry.js";
import { DOJO_CONFIG } from "../src/js/config/gameConfig.js";

const createMockPersistence = () => ({ load: () => null, save: () => {}, clear: () => {} });

test("Dojo Config: verify default values and mode constants", () => {
  assert.equal(DOJO_CONFIG.defaultHp, 10000);
  assert.equal(DOJO_CONFIG.defaultDamage, 0);
  assert.equal(DOJO_CONFIG.minHp, 1);
});

test("BattleSystem Dojo Sandbox (Single Dummy): custom 15000 HP and 0 damage received", () => {
  const bus = new EventBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, () => 0.5);

  const ok = battle.start(null, {
    isDojo: true,
    customHp: 15000,
    customDamage: 0,
    isDual: false,
    isSilhouette: true
  });

  assert.equal(ok, true);
  const state = battle.state;
  assert.equal(state.stage.id, 991);
  assert.equal(state.stage.isDojo, true);
  assert.equal(state.stage.isSilhouette, true);
  assert.equal(state.enemyHp, 15000);
  assert.equal(state.enemyMaxHp, 15000);
  assert.equal(state.stage.customDamage, 0);

  // When player takes damage, it should be 0 because customDamage is 0
  const initialPlayerHp = state.playerHp;
  battle.damagePlayer("測試受擊");
  assert.equal(battle.state.playerHp, initialPlayerHp);
  battle.abandon();
});

test("BattleSystem Dojo Sandbox (Dual Dummy): custom 20000 HP and dual targets", () => {
  const bus = new EventBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, () => 0.5);

  const ok = battle.start(null, {
    isDojo: true,
    customHp: 10000,
    customDamage: 25,
    isDual: true,
    isSilhouette: true
  });

  assert.equal(ok, true);
  const state = battle.state;
  assert.equal(state.stage.id, 992);
  assert.equal(state.stage.isDojo, true);
  assert.equal(state.stage.dualEnemy, true);
  assert.equal(state.enemies.length, 2);
  assert.equal(state.enemies[0].hp, 10000);
  assert.equal(state.enemies[1].hp, 10000);
  assert.equal(state.enemyHp, 20000);

  // When player takes custom damage 25
  const initialPlayerHp = state.playerHp;
  battle.damagePlayerForDual(1, "測試雙小樂受擊");
  assert.equal(battle.state.playerHp, initialPlayerHp - 25);
  battle.abandon();
});

test("BattleSystem: emits battle:damage-logged event when damage is dealt", () => {
  const bus = new EventBus();
  const persistence = createMockPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, () => 0.5);

  const loggedEvents = [];
  bus.on("battle:damage-logged", (data) => loggedEvents.push(data));

  battle.start(1);
  battle.damageEnemy("獲勝出拳", false, 100);

  assert.equal(loggedEvents.length, 1);
  assert.equal(loggedEvents[0].target, "enemy");
  assert.equal(loggedEvents[0].amount, 100);

  battle.damagePlayer("小樂攻擊");
  assert.equal(loggedEvents.length, 2);
  assert.equal(loggedEvents[1].target, "player");
  assert.ok(loggedEvents[1].amount > 0);
  battle.abandon();
});

test("QTESystem Mode 1: generates sequence and finishes on completion", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const qte = new QTESystem(bus, timers, () => 0.1);

  let finishResult = null;
  bus.on("qte:finished", (result) => {
    finishResult = result;
  });

  qte.start({ length: 3, durationMs: 5000, maxErrors: 1 });
  assert.equal(qte.active, true);
  assert.equal(qte.sequence.length, 3);

  // Input the correct sequence
  for (const dir of qte.sequence) {
    qte.input(dir);
  }

  assert.equal(qte.active, false);
  assert.ok(finishResult);
  assert.equal(finishResult.success, true);
  timers.clearAll();
});

test("DualQTESystem Mode 1: manages dual tracks independently", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const dualQte = new DualQTESystem(bus, timers, () => 0.1);

  dualQte.start({ length: 2, durationMs: 5000, maxErrors: 1 });
  assert.equal(dualQte.active, true);
  assert.equal(dualQte.left.sequence.length, 2);
  assert.equal(dualQte.right.sequence.length, 2);

  dualQte.input(dualQte.left.sequence[0], "left");
  assert.equal(dualQte.left.index, 1);

  dualQte.input(dualQte.right.sequence[0], "right");
  assert.equal(dualQte.right.index, 1);

  dualQte.stop(false);
  timers.clearAll();
});
