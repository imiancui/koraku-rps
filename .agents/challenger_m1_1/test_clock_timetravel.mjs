// .agents/challenger_m1_1/test_clock_timetravel.mjs
// Adversarial Stress Suite 1: Injected Clocks, Time Travel & Non-Monotonic Clocks

import assert from "node:assert/strict";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../../src/js/systems/PostBattleSystem.js";
import { QTESystem, DualQTESystem } from "../../src/js/systems/QTESystem.js";
import { TimerRegistry } from "../../src/js/core/TimerRegistry.js";
import { STAGES } from "../../src/js/config/gameConfig.js";
import { MemoryPersistence, createSeededRandom } from "../../tests/helpers/testHarness.js";
import { createKernel } from "../../src/js/kernel/kernelFactory.js";

console.log("=== STARTING STRESS SUITE 1: CLOCK & TIME TRAVEL ===");

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

function recordTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`✔ [PASS] ${name}`);
  } catch (err) {
    failedTests.push({ name, error: err.message, stack: err.stack });
    console.error(`✖ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. Injected Clock Factory Constructor Compatibility
recordTest("Kernel & BattleSystem options object constructor compatibility", () => {
  const customNow = () => 1700000000000;
  const customRandom = createSeededRandom(42);
  
  // Test direct BattleSystem instantiation with positional arguments
  const bus1 = new EventBus();
  const store1 = new GameStore(bus1, new MemoryPersistence(), { now: customNow });
  const battle1 = new BattleSystem(bus1, store1, customRandom, customNow);
  assert.equal(battle1.now(), 1700000000000, "BattleSystem with positional clock should return custom time");
  
  // Test createKernel options handling
  const kernel = createKernel({ now: customNow, random: customRandom });
  assert.equal(typeof kernel.battle.random, "function", "kernel.battle.random must be a function");
  assert.equal(kernel.battle.now(), 1700000000000, "kernel.battle.now() must return injected time");
  assert.equal(typeof kernel.postBattle.random, "function", "kernel.postBattle.random must be a function");
  assert.equal(kernel.postBattle.now(), 1700000000000, "kernel.postBattle.now() must return injected time");
});

// 2. Non-Monotonic / Jittering Clock on BattleSystem & PostBattleSystem
recordTest("Non-monotonic clock (backward jumps & negative dt) in BattleSystem.end and DPS", () => {
  let currentTime = 100000;
  const injectedNow = () => currentTime;
  const rng = createSeededRandom(101);
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: injectedNow });
  const battle = new BattleSystem(bus, store, rng, injectedNow);

  // Start battle at t = 100000
  battle.start(1);
  
  // Clock jumps BACKWARD in time to t = 50000 (negative elapsed time)
  currentTime = 50000;
  
  // End battle
  battle.end(true);

  const snapshot = store.snapshot();
  const lastBattle = snapshot.records.recentBattles[0];
  assert.ok(lastBattle, "recentBattle record exists");
  assert.ok(Number.isFinite(lastBattle.durationSec), `durationSec must be finite, got ${lastBattle.durationSec}`);
  assert.ok(lastBattle.durationSec >= 1, `durationSec must be at least 1, got ${lastBattle.durationSec}`);
  assert.ok(Number.isFinite(lastBattle.dps), `dps must be finite (no NaN), got ${lastBattle.dps}`);
  assert.equal(Number.isNaN(lastBattle.dps), false, "dps must not be NaN");
});

// 3. PostBattleSystem Watermelon Marker Calculation under Non-Monotonic Clocks
recordTest("PostBattleSystem watermelon marker calculation under negative/skewed clock", () => {
  let currentTime = 10000;
  const injectedNow = () => currentTime;
  const rng = createSeededRandom(202);
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: injectedNow });
  const postBattle = new PostBattleSystem(bus, store, rng, injectedNow);

  postBattle.open({ won: true, stage: STAGES[0] });
  postBattle.requestSwimsuit();
  postBattle.startWatermelon();

  // Test normal forward marker
  currentTime = 10500;
  let pos = postBattle.getMarkerPosition(currentTime);
  assert.ok(Number.isFinite(pos) && pos >= 0 && pos <= 1, `Marker position must be between 0 and 1, got ${pos}`);

  // Test negative time relative to strikeStartedAt (clock stepped backward)
  currentTime = 5000;
  pos = postBattle.getMarkerPosition(currentTime);
  assert.ok(Number.isFinite(pos), `Marker position must be finite on backward clock, got ${pos}`);
  assert.equal(Number.isNaN(pos), false, "Marker position must not be NaN");

  // Test strike with backward timestamp
  postBattle.strike(currentTime);
  assert.equal(postBattle.state.watermelon.attempts, 1, "Strike should register without throwing");

  // Test auto-watermelon with extreme future timestamp
  store.addWatermelonStock(5);
  postBattle.startAutoWatermelonRound();
  currentTime = 999999999999;
  const autoPos = postBattle.getAutoMarkerPosition(currentTime);
  assert.ok(Number.isFinite(autoPos), `Auto marker position must be finite, got ${autoPos}`);
  assert.equal(Number.isNaN(autoPos), false, "Auto marker position must not be NaN");
  postBattle.autoWatermelonStrike(currentTime);
  assert.equal(postBattle.autoWatermelonState.watermelon.attempts, 1);
});

// 4. QTESystem Input Auditing under Non-Monotonic & Skewed Clocks
recordTest("QTESystem auditInputs under fast-forward and out-of-bounds timestamps", () => {
  let currentTime = 200000;
  const injectedNow = () => currentTime;
  const rng = createSeededRandom(303);
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const qte = new QTESystem(bus, timers, rng, injectedNow);

  qte.start({ length: 5, durationMs: 3000, maxErrors: 2 });
  assert.equal(qte.active, true);
  assert.equal(qte.startTime, 200000);
  assert.equal(qte.deadline, 203000);

  const seq = [...qte.sequence];

  // Batch with inputs arriving before startTime - 150 (too early)
  const batch1 = [
    { directionId: seq[0], timestamp: 199800 } // 200ms before start -> out of bounds
  ];
  const res1 = qte.auditInputs(batch1);
  assert.equal(res1.results[0].valid, false);
  assert.equal(res1.results[0].reason, "timestamp_out_of_bounds");

  // Batch with valid timestamp
  const batch2 = [
    { directionId: seq[0], timestamp: 200500 },
    { directionId: seq[1], timestamp: 200600 }
  ];
  const res2 = qte.auditInputs(batch2);
  assert.equal(res2.results[0].valid, true);
  assert.equal(res2.results[1].valid, true);

  // Batch with timestamp after deadline + 150 (expired)
  const batch3 = [
    { directionId: seq[2], timestamp: 203200 } // > 203150
  ];
  const res3 = qte.auditInputs(batch3);
  assert.equal(res3.results[0].valid, false);

  timers.clearAll();
});

// 5. Fast-Forwarded Simulation of 1,000 Complete Battles with Custom Clock Steps
recordTest("1,000 Complete Battle Simulations with fast-forwarded clock steps", () => {
  const rng = createSeededRandom(777);
  let virtualTime = 1000000;
  const injectedNow = () => virtualTime;
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: injectedNow });
  const battle = new BattleSystem(bus, store, rng, injectedNow);

  // Add initial coins & potions
  store.cheatSetValues({ coins: 50000, inventory: { hpPotion: 50, mpPotion: 50 } });

  for (let i = 0; i < 1000; i++) {
    const stageId = (i % 4) + 1;
    // Advance virtual clock by randomized delta between 10ms and 5000ms
    virtualTime += Math.floor(rng() * 5000) + 10;
    
    // Simulate instantaneous battle
    const sim = battle.simulateBattle(stageId, { seed: Math.floor(rng() * 1000000) });
    assert.ok(typeof sim.won === "boolean", "sim.won must be boolean");
    assert.ok(Number.isFinite(sim.damageDealt), "damageDealt must be finite");
    assert.ok(Number.isFinite(sim.damageTaken), "damageTaken must be finite");
    assert.ok(Number.isFinite(sim.playerHp), "playerHp must be finite");
    assert.ok(Number.isFinite(sim.enemyHp), "enemyHp must be finite");

    // Advance clock for end recording
    virtualTime += Math.floor(rng() * 10000) + 1000;
    const stage = STAGES.find(s => s.id === stageId);
    store.recordBattle(sim.won, stage, {
      damageDealt: sim.damageDealt,
      damageTaken: sim.damageTaken,
      durationSec: Math.max(1, Math.round((sim.round * 3.5))),
      isAuto: i % 2 === 0
    });
  }

  const snap = store.snapshot();
  assert.equal(snap.records.totalBattles, 1000, "Should have recorded exactly 1000 battles");
  assert.ok(snap.records.recentBattles.length <= 100, "recentBattles capped at 100");
  
  // Verify all recent battles have non-NaN DPS
  for (const b of snap.records.recentBattles) {
    assert.ok(Number.isFinite(b.dps), `DPS must be finite, got ${b.dps}`);
    assert.equal(Number.isNaN(b.dps), false, "DPS must not be NaN");
  }
});

console.log("\n==================================================");
console.log(`SUITE 1 RESULTS: ${passedTests}/${totalTests} PASSED, ${failedTests.length} FAILED`);
if (failedTests.length > 0) {
  console.log("FAILURES:");
  for (const f of failedTests) {
    console.log(`- ${f.name}: ${f.error}`);
  }
}
console.log("==================================================");

process.exit(failedTests.length > 0 ? 1 : 0);
