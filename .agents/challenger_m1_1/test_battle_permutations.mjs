// .agents/challenger_m1_1/test_battle_permutations.mjs
// Adversarial Stress Suite 2: 5,000 Battle Permutations, 10,000 Watermelon & QTE Strikes, NaN / Arithmetic Scanner

import assert from "node:assert/strict";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../../src/js/systems/PostBattleSystem.js";
import { QTESystem, DualQTESystem } from "../../src/js/systems/QTESystem.js";
import { TimerRegistry } from "../../src/js/core/TimerRegistry.js";
import { STAGES, ITEMS, EQUIPMENT_ITEMS } from "../../src/js/config/gameConfig.js";
import { MemoryPersistence, createSeededRandom } from "../../tests/helpers/testHarness.js";

console.log("=== STARTING STRESS SUITE 2: BATTLE PERMUTATIONS & ARITHMETIC SCANNER ===");

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

function scanForNaN(obj, path = "root") {
  if (obj === null || obj === undefined) return;
  if (typeof obj === "number") {
    if (Number.isNaN(obj)) {
      throw new Error(`Found NaN at ${path}`);
    }
    // Allow Infinity ONLY for maxErrors
    if (!Number.isFinite(obj) && !path.endsWith("maxErrors")) {
      throw new Error(`Found non-finite number (${obj}) at ${path}`);
    }
    return;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      scanForNaN(obj[i], `${path}[${i}]`);
    }
    return;
  }
  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      scanForNaN(value, `${path}.${key}`);
    }
  }
}

// 1. 5,000 Permutations of Full Simulated Battles across all stages & gear combos
recordTest("5,000 Simulated Battle Permutations with Equipment & Skill Interactions", () => {
  const rng = createSeededRandom(99991);
  let nowMs = 1500000000;
  const clock = () => nowMs;

  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: clock });
  const battle = new BattleSystem(bus, store, rng, clock);

  // Setup rich profile
  store.cheatSetValues({
    coins: 999999,
    profile: {
      level: 10,
      xp: 0,
      skillPoints: 50,
      allocations: { hp: 10, mp: 10, damage: 10 },
      skills: { momo: 5, dualHand: 1 }
    },
    inventory: { hpPotion: 100, mpPotion: 100 },
    equipment: {
      head: "head_ribbon",
      mainHand: "sword_flame",
      chest: "chest_samurai",
      badge: "badge_bond"
    }
  });

  const stagesToTest = [1, 2, 3, 4];
  let totalRounds = 0;

  for (let i = 0; i < 5000; i++) {
    const stageId = stagesToTest[i % stagesToTest.length];
    const seed = Math.floor(rng() * 100000000);
    
    // Simulate instantaneous battle
    const sim = battle.simulateBattle(stageId, { seed });
    totalRounds += sim.round;

    assert.ok(typeof sim.won === "boolean");
    assert.ok(sim.round >= 1 && sim.round <= 50, `Round count should be bounded, got ${sim.round}`);
    assert.ok(sim.playerHp >= 0, `Player HP should not be negative, got ${sim.playerHp}`);
    assert.ok(sim.enemyHp >= 0, `Enemy HP should not be negative, got ${sim.enemyHp}`);

    // Advance clock
    nowMs += Math.floor(rng() * 60000) + 1000;

    // Record battle
    const stage = STAGES.find(s => s.id === stageId);
    store.recordBattle(sim.won, stage, {
      isAuto: i % 3 === 0,
      damageDealt: sim.damageDealt,
      damageTaken: sim.damageTaken,
      durationSec: Math.max(1, Math.round(sim.round * 3.5)),
      momoAttempts: sim.won ? 2 : 1,
      momoSuccesses: sim.won ? 1 : 0,
      momoDamage: sim.won ? 25 : 0
    });

    // Run NaN scanner on store snapshot periodically (every 500 iterations)
    if (i % 500 === 0) {
      scanForNaN(store.snapshot(), `store_snapshot_iter_${i}`);
    }
  }

  // Final comprehensive NaN scan
  const finalSnap = store.snapshot();
  scanForNaN(finalSnap, "final_store_snapshot");
  assert.equal(finalSnap.records.totalBattles, 5000);
  assert.ok(finalSnap.records.totalCoinsEarned > 0);
  assert.ok(finalSnap.records.totalXpEarned > 0);
  assert.ok(finalSnap.playerStats.maxHp > 0);
  assert.ok(finalSnap.playerStats.damage > 0);
  assert.ok(Number.isFinite(store.getTheoreticalDPS()));
});

// 2. 10,000 Watermelon Strikes under Extreme Timestamps & Bounds
recordTest("10,000 Watermelon Strikes (Normal, Skewed, Boundary, Auto-Watermelon)", () => {
  const rng = createSeededRandom(88882);
  let nowMs = 2000000000;
  const clock = () => nowMs;

  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: clock });
  const postBattle = new PostBattleSystem(bus, store, rng, clock);

  store.setWatermelonStock(5000);

  for (let cycle = 0; cycle < 2000; cycle++) {
    // Mode A: Normal Post-Battle Watermelon
    postBattle.open({ won: true, stage: STAGES[cycle % 4] });
    postBattle.requestSwimsuit();

    while (postBattle.state?.scene === "swimsuit" || postBattle.state?.scene === "watermelonResult") {
      if (postBattle.state.watermelon.attempts >= 3) break;
      postBattle.startWatermelon();
      
      // Jitter clock by random ms
      const delta = (rng() - 0.5) * 4000; // [-2000ms, +2000ms]
      nowMs += Math.max(1, Math.floor(rng() * 1800));
      postBattle.strike(nowMs + delta);
    }

    // Mode B: Auto-Battle Floating Watermelon
    const started = postBattle.startAutoWatermelonRound();
    if (started) {
      while (postBattle.autoWatermelonState?.scene === "watermelonAim") {
        const delta = (rng() - 0.5) * 4000;
        nowMs += Math.max(1, Math.floor(rng() * 1800));
        postBattle.autoWatermelonStrike(nowMs + delta);
        if (postBattle.autoWatermelonState?.scene === "watermelonResult") {
          if (postBattle.autoWatermelonState.watermelon.attempts >= 3) {
            postBattle.settleAutoWatermelon();
            break;
          }
          postBattle.startAutoWatermelonRound();
        }
      }
    }

    if (cycle % 200 === 0) {
      scanForNaN(postBattle.state, `postBattle_state_cycle_${cycle}`);
      scanForNaN(postBattle.autoWatermelonState, `postBattle_autoState_cycle_${cycle}`);
      scanForNaN(store.snapshot(), `store_cycle_${cycle}`);
    }
  }

  const snap = store.snapshot();
  scanForNaN(snap, "watermelon_final_snapshot");
  assert.ok(snap.records.watermelonSlices > 0, "Should have recorded watermelon slices");
  assert.ok(snap.records.watermelonStageStats[1].attempts > 0);
  assert.ok(snap.records.watermelonStageStats[2].attempts > 0);
  assert.ok(snap.records.watermelonStageStats[3].attempts > 0);
});

// 3. 10,000 QTE & Dual-QTE Permutations under Extreme Input Spams
recordTest("10,000 QTE & Dual-QTE Input Permutations (Cardinal, Diagonal, Burst, Error Thresholds)", () => {
  const rng = createSeededRandom(77773);
  let nowMs = 3000000000;
  const clock = () => nowMs;

  const bus = new EventBus();
  const timers = new TimerRegistry();
  const qte = new QTESystem(bus, timers, rng, clock);
  const dualQte = new DualQTESystem(bus, timers, rng, clock);

  const directions = ["up", "down", "left", "right", "up-left", "up-right", "down-left", "down-right", "invalid_dir"];

  for (let i = 0; i < 2500; i++) {
    // Test Single QTE
    const mode = ["cardinal", "all", "random", "mixed"][i % 4];
    const len = (i % 7) + 3; // 3 to 9
    const maxErr = (i % 3) + 1; // 1 to 3
    qte.start({ length: len, durationMs: 3000, directionMode: mode, maxErrors: maxErr });
    
    // Send random inputs
    for (let step = 0; step < len + 5; step++) {
      if (!qte.active) break;
      const pick = rng() < 0.7 && qte.sequence[qte.index] ? qte.sequence[qte.index] : directions[Math.floor(rng() * directions.length)];
      nowMs += Math.floor(rng() * 200) + 10;
      qte.input(pick, nowMs);
    }

    // Test Dual QTE
    dualQte.start({ length: len, durationMs: 3000, maxErrors: maxErr });
    for (let step = 0; step < len + 5; step++) {
      if (!dualQte.active) break;
      const leftPick = rng() < 0.7 && dualQte.left?.sequence?.[dualQte.left?.index] ? dualQte.left.sequence[dualQte.left.index] : directions[Math.floor(rng() * directions.length)];
      const rightPick = rng() < 0.7 && dualQte.right?.sequence?.[dualQte.right?.index] ? dualQte.right.sequence[dualQte.right.index] : directions[Math.floor(rng() * directions.length)];
      nowMs += Math.floor(rng() * 200) + 10;
      dualQte.input(leftPick, "left", nowMs);
      dualQte.input(rightPick, "right", nowMs);
    }
  }

  timers.clearAll();
  assert.equal(qte.active, false);
  assert.equal(dualQte.active, false);
});

// 4. Dojo Stage (Single & Dual Dummy) Infinite Damage / Extreme HP Stress
recordTest("Dojo Stage (Single & Dual) Stress with Extreme HP & Damage Scaling", () => {
  const rng = createSeededRandom(66664);
  let nowMs = 4000000000;
  const clock = () => nowMs;

  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence(), { now: clock });
  const battle = new BattleSystem(bus, store, rng, clock);

  // Single Dummy with 1,000,000 HP
  const startedSingle = battle.start(null, { isDojo: true, isDual: false, customHp: 1000000, customDamage: 50 });
  assert.equal(startedSingle, true);
  assert.equal(battle.state.enemyHp, 1000000);
  assert.equal(battle.state.stage.isDojo, true);
  
  // Deal massive damage
  battle.dealEnemyDamage(500000);
  assert.equal(battle.state.enemies[0].hp, 500000);
  assert.equal(battle.state.enemyHp, 500000);
  
  battle.abandon();
  assert.equal(battle.state.active, false);

  // Dual Dummy with 2,000,000 HP
  const startedDual = battle.start(null, { isDojo: true, isDual: true, customHp: 1000000, customDamage: 100 });
  assert.equal(startedDual, true);
  assert.equal(battle.state.enemyHp, 2000000);
  assert.equal(battle.state.enemies.length, 2);
  assert.equal(battle.state.enemies[0].hp, 1000000);
  assert.equal(battle.state.enemies[1].hp, 1000000);

  battle.selectTarget("right");
  assert.equal(battle.state.targetEnemyId, "right");
  battle.dealEnemyDamage(1000000);
  assert.equal(battle.state.enemies.find(e => e.id === "right").alive, false);
  assert.equal(battle.state.enemyHp, 1000000);

  battle.abandon();
  scanForNaN(battle.state, "dojo_dual_abandoned_state");
});

console.log("\n==================================================");
console.log(`SUITE 2 RESULTS: ${passedTests}/${totalTests} PASSED, ${failedTests.length} FAILED`);
if (failedTests.length > 0) {
  console.log("FAILURES:");
  for (const f of failedTests) {
    console.log(`- ${f.name}: ${f.error}`);
  }
}
console.log("==================================================");

process.exit(failedTests.length > 0 ? 1 : 0);
