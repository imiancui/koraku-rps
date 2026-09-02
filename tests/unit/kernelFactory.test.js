// tests/unit/kernelFactory.test.js
// Unit tests for kernelFactory, constructor parameter resolution, and defensive option unpacking.

import test from "node:test";
import assert from "node:assert/strict";
import { createKernel } from "../../src/js/kernel/kernelFactory.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../../src/js/systems/PostBattleSystem.js";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { MemoryPersistence } from "../helpers/testHarness.js";
import { Commands } from "../../src/js/kernel/protocol.js";

test("kernelFactory: createKernel with injected random and now options", () => {
  let clockTime = 1700000000000;
  const customNow = () => clockTime;
  const customRandom = () => 0.42;

  const kernel = createKernel({ now: customNow, random: customRandom });

  assert.equal(typeof kernel.battle.random, "function", "battle.random must be a function");
  assert.equal(kernel.battle.random(), 0.42, "battle.random must return injected random value");
  assert.equal(typeof kernel.battle.now, "function", "battle.now must be a function");
  assert.equal(kernel.battle.now(), clockTime, "battle.now must return injected clock time");

  assert.equal(typeof kernel.postBattle.random, "function", "postBattle.random must be a function");
  assert.equal(kernel.postBattle.random(), 0.42, "postBattle.random must return injected random value");
  assert.equal(typeof kernel.postBattle.now, "function", "postBattle.now must be a function");
  assert.equal(kernel.postBattle.now(), clockTime, "postBattle.now must return injected clock time");

  kernel.destroy();
});

test("BattleSystem constructor: supports both positional args and options object defensively", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());

  // Positional
  const customNow1 = () => 1000;
  const customRandom1 = () => 0.1;
  const battle1 = new BattleSystem(bus, store, customRandom1, customNow1);
  assert.equal(typeof battle1.random, "function");
  assert.equal(battle1.random(), 0.1);
  assert.equal(battle1.now(), 1000);
  battle1.stopClocks?.();

  // Options object as 3rd parameter
  const customNow2 = () => 2000;
  const customRandom2 = () => 0.2;
  const battle2 = new BattleSystem(bus, store, { random: customRandom2, now: customNow2 });
  assert.equal(typeof battle2.random, "function");
  assert.equal(battle2.random(), 0.2);
  assert.equal(battle2.now(), 2000);
  battle2.stopClocks?.();

  // Defaults
  const battle3 = new BattleSystem(bus, store);
  assert.equal(typeof battle3.random, "function");
  assert.equal(typeof battle3.now, "function");
  battle3.stopClocks?.();
});

test("PostBattleSystem constructor: supports both positional args and options object defensively", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());

  // Positional
  const customNow1 = () => 3000;
  const customRandom1 = () => 0.3;
  const post1 = new PostBattleSystem(bus, store, customRandom1, customNow1);
  assert.equal(typeof post1.random, "function");
  assert.equal(post1.random(), 0.3);
  assert.equal(post1.now(), 3000);
  post1.destroy?.();

  // Options object as 3rd parameter
  const customNow2 = () => 4000;
  const customRandom2 = () => 0.4;
  const post2 = new PostBattleSystem(bus, store, { random: customRandom2, now: customNow2 });
  assert.equal(typeof post2.random, "function");
  assert.equal(post2.random(), 0.4);
  assert.equal(post2.now(), 4000);
  post2.destroy?.();

  // Defaults
  const post3 = new PostBattleSystem(bus, store);
  assert.equal(typeof post3.random, "function");
  assert.equal(typeof post3.now, "function");
  post3.destroy?.();
});

test("kernelFactory: executing battle commands on kernel instance", () => {
  let time = 100000;
  const kernel = createKernel({ now: () => time, random: () => 0.5 });

  const startRes = kernel.executeCommand({
    cmdId: "cmd_start_1",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.ok(startRes.ack, "Battle start command should succeed");
  assert.ok(kernel.battle.state?.active, "Battle should be active");

  kernel.battle.stopClocks();
  kernel.destroy();
});
