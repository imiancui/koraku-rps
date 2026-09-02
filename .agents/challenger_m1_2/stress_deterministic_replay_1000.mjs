// .agents/challenger_m1_2/stress_deterministic_replay_1000.mjs
// Adversarial 1,000-Battle Deterministic Replay & Seed Reproducibility Stress Test

import assert from "node:assert/strict";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { QTESystem, DualQTESystem } from "../../src/js/systems/QTESystem.js";
import { getRandomHand, compareHands } from "../../src/js/systems/rpsRules.js";
import { STAGES, HANDS } from "../../src/js/config/gameConfig.js";
import { createSeededRandom, MemoryPersistence } from "../../tests/helpers/testHarness.js";

// Helper: Run a single battle and capture full trajectory
function runBattle(seed, stageId, config, recordedCommands = null) {
  const battleRng = createSeededRandom(seed);
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // Setup initial player stats, level, unlocked stages, and skills
  store.state.profile.level = 25;
  store.state.records.clearedStages = [1, 2, 3, 4];
  if (config.skills) {
    if (config.skills.momo !== undefined) store.state.profile.skills.momo = config.skills.momo;
    if (config.skills.dualHand !== undefined) store.state.profile.skills.dualHand = config.skills.dualHand;
  }
  if (config.equipment) {
    store.state.equipment = { ...config.equipment };
  }
  if (config.inventory) {
    store.state.inventory = { ...config.inventory };
  }
  store.commit("setup-test-battle");

  // Create BattleSystem with seeded RNG
  const battle = new BattleSystem(bus, store, battleRng);

  const eventLog = [];
  const damageLog = [];
  const stateTrajectory = [];
  const commandLog = [];

  bus.on("battle:damage-logged", (entry) => damageLog.push(structuredClone(entry)));
  bus.on("battle:effect", (eff) => eventLog.push({ type: "effect", ...structuredClone(eff) }));
  bus.on("dialogue", (dlg) => eventLog.push({ type: "dialogue", ...structuredClone(dlg) }));
  bus.on("toast", (tst) => eventLog.push({ type: "toast", ...structuredClone(tst) }));

  // Start battle
  const started = battle.start(stageId, { seed });
  if (!started) {
    throw new Error(`Failed to start battle for stage ${stageId}`);
  }

  let roundIndex = 0;
  const isReplay = Boolean(recordedCommands);
  const playerRng = isReplay ? null : createSeededRandom(`player_decision_${seed}`);

  while (battle.state && battle.state.active && roundIndex < 60) {
    roundIndex++;
    let cmd = null;

    if (isReplay) {
      cmd = recordedCommands[roundIndex - 1];
      if (!cmd) break;
    } else {
      const hands = ["rock", "paper", "scissors"];
      const playerHand = hands[Math.floor(playerRng() * hands.length)];
      const playerHandRight = hands[Math.floor(playerRng() * hands.length)];
      const shouldPotion = (battle.state.playerHp < battle.state.playerMaxHp * 0.5) && (store.state.inventory.hpPotion > 0);
      const targetEnemy = battle.state.enemies.find((e) => e.alive)?.id || "main";

      cmd = {
        round: roundIndex,
        targetEnemy,
        usePotion: shouldPotion ? "hpPotion" : null,
        playerHand,
        playerHandRight,
        morphOnLoss: playerRng() < 0.4,
        morphTargetHand: hands[Math.floor(playerRng() * hands.length)],
        qteSuccessRate: playerRng() // float in [0, 1)
      };
      commandLog.push(structuredClone(cmd));
    }

    // Step 1: Target selection if stage 4
    if (cmd.targetEnemy && battle.state.enemies.length > 1) {
      battle.selectTarget(cmd.targetEnemy);
    }

    // Step 2: Use potion if planned
    if (cmd.usePotion && store.state.inventory[cmd.usePotion] > 0) {
      battle.useItem(cmd.usePotion);
    }

    // Step 3: Select Hand
    if (battle.state.hasDualHandSkill) {
      battle.selectHand(cmd.playerHand, "left");
      battle.selectHand(cmd.playerHandRight, "right");
    } else {
      battle.selectHand(cmd.playerHand);
    }

    // Step 4: Reveal hands (BattleSystem advances using its own PRNG)
    battle.revealHands();

    // Step 5: Reaction phase (Morph or Resolve)
    if (battle.state.phase === "reaction") {
      let morphed = false;
      const isLoss = (battle.state.enemyWinningEmoji !== null);
      if (isLoss && cmd.morphOnLoss && battle.state.playerMp >= 25) {
        const morphRes = battle.useMorph();
        if (morphRes.ok) {
          battle.selectHand(cmd.morphTargetHand);
          morphed = true;
        }
      }
      if (!morphed && battle.state.phase === "reaction") {
        battle.resolveRound();
      }
    }

    // Step 6: Handle QTE if entered
    if (battle.state.phase === "qte") {
      if (battle.state.isDualQte) {
        const leftSeq = [...battle.dualQte.left.sequence];
        const rightSeq = [...battle.dualQte.right.sequence];
        for (const dir of leftSeq) {
          if (cmd.qteSuccessRate > 0.2) battle.inputQte(dir, "left");
          else battle.inputQte("invalid_wrong_dir", "left");
        }
        for (const dir of rightSeq) {
          if (cmd.qteSuccessRate > 0.2) battle.inputQte(dir, "right");
          else battle.inputQte("invalid_wrong_dir", "right");
        }
      } else {
        const seq = [...battle.qte.sequence];
        for (const dir of seq) {
          if (cmd.qteSuccessRate > 0.25) battle.inputQte(dir);
          else battle.inputQte("invalid_wrong_dir");
        }
      }
    }

    // Capture state snapshot after round resolution
    stateTrajectory.push({
      round: roundIndex,
      phase: battle.state.phase,
      playerHp: battle.state.playerHp,
      playerMp: battle.state.playerMp,
      enemyHp: battle.state.enemyHp,
      opponentHand: battle.state.opponentHand,
      opponentHands: battle.state.opponentHands ? { ...battle.state.opponentHands } : null,
      enemies: battle.state.enemies.map(e => ({ id: e.id, hp: e.hp, alive: e.alive })),
      inventory: structuredClone(store.state.inventory),
      damageDealt: battle.battleDamageDealt,
      damageTaken: battle.battleDamageTaken
    });

    // Check if battle ended
    if (battle.state.enemyHp <= 0) {
      battle.end(true);
      break;
    } else if (battle.state.playerHp <= 0) {
      battle.end(false);
      break;
    } else if (battle.state.phase === "result" || battle.state.phase === "reaction") {
      battle.scheduleRound();
    }
  }

  const outcome = {
    won: battle.state ? Boolean(battle.state.won) : false,
    finalRound: roundIndex,
    playerHp: battle.state?.playerHp ?? 0,
    enemyHp: battle.state?.enemyHp ?? 0,
    damageDealt: battle.battleDamageDealt,
    damageTaken: battle.battleDamageTaken,
    momoAttempts: battle.battleMomoAttempts,
    momoSuccesses: battle.battleMomoSuccesses,
    morphCount: battle.battleMorphCount,
    qteHits: battle.battleQteHits,
    qteTotal: battle.battleQteTotal
  };

  battle.stopClocks();

  return {
    commandLog,
    damageLog,
    eventLog,
    stateTrajectory,
    outcome
  };
}

async function run1000BattlesStress() {
  console.log("==================================================================");
  console.log("STARTING 1,000-BATTLE DETERMINISTIC REPLAY ADVERSARIAL STRESS TEST");
  console.log("==================================================================");

  const startTime = Date.now();
  let totalBattles = 1000;
  let passedReplays = 0;
  let failedReplays = 0;
  let bitwiseIdenticalDamageLogs = 0;
  let bitwiseIdenticalTrajectories = 0;
  let bitwiseIdenticalOutcomes = 0;
  let adversarialDivergencesConfirmed = 0;

  const equipmentSets = [
    {}, // naked
    { weapon: "flame_katana" },
    { weapon: "thunder_katana", head: "mirror_armor" },
    { weapon: "frost_blade", shield: "suzaku_shield" },
    { accessory1: "feather_charm", weapon: "flame_katana", shield: "suzaku_shield" }
  ];

  for (let i = 1; i <= totalBattles; i++) {
    const seed = `koraku_stress_seed_${i.toString().padStart(4, "0")}`;
    const stageId = (i % 4) + 1; // Stages 1, 2, 3, 4 evenly distributed (250 battles each)
    const config = {
      skills: {
        momo: (i % 5) * 2, // 0, 2, 4, 6, 8
        dualHand: (i % 2 === 0) ? 1 : 0
      },
      equipment: equipmentSets[i % equipmentSets.length],
      inventory: {
        hpPotion: (i % 3) + 1,
        mpPotion: (i % 3)
      }
    };

    // Run 1: Primary run with recorded commands
    const run1 = runBattle(seed, stageId, config);

    // Run 2: Deterministic replay with exact same seed and command log
    const run2 = runBattle(seed, stageId, config, run1.commandLog);

    // Verify 1: Outcome equality
    try {
      assert.deepEqual(run1.outcome, run2.outcome, `Battle #${i} outcome mismatch`);
      bitwiseIdenticalOutcomes++;
    } catch (err) {
      console.error(`[FAIL] Outcome mismatch in Battle #${i}:`, err.message);
      failedReplays++;
      continue;
    }

    // Verify 2: State trajectory equality
    try {
      assert.deepEqual(run1.stateTrajectory, run2.stateTrajectory, `Battle #${i} state trajectory mismatch`);
      bitwiseIdenticalTrajectories++;
    } catch (err) {
      console.error(`[FAIL] State trajectory mismatch in Battle #${i}:`, err.message);
      failedReplays++;
      continue;
    }

    // Verify 3: Damage log equality
    try {
      assert.deepEqual(run1.damageLog, run2.damageLog, `Battle #${i} damage log mismatch`);
      bitwiseIdenticalDamageLogs++;
    } catch (err) {
      console.error(`[FAIL] Damage log mismatch in Battle #${i}:`, err.message);
      failedReplays++;
      continue;
    }

    // Verify 4: Event log equality
    try {
      assert.deepEqual(run1.eventLog, run2.eventLog, `Battle #${i} event log mismatch`);
    } catch (err) {
      console.error(`[FAIL] Event log mismatch in Battle #${i}:`, err.message);
      failedReplays++;
      continue;
    }

    // Adversarial Check: Perturb command log in every 50 battles and verify divergence
    if (i % 50 === 0 && run1.commandLog.length > 0) {
      const alteredCommands = structuredClone(run1.commandLog);
      // Invert all player hands throughout the battle
      for (const cmd of alteredCommands) {
        cmd.playerHand = cmd.playerHand === "rock" ? "paper" : (cmd.playerHand === "paper" ? "scissors" : "rock");
        cmd.playerHandRight = cmd.playerHand;
        cmd.morphOnLoss = false; // disable morph to prevent normalizing hand
      }
      const runPerturbed = runBattle(seed, stageId, config, alteredCommands);
      assert.notDeepEqual(
        run1.eventLog,
        runPerturbed.eventLog,
        `Battle #${i} perturbed command did not cause event log divergence!`
      );
      adversarialDivergencesConfirmed++;
    }

    passedReplays++;

    if (i % 200 === 0) {
      console.log(`[Progress] Tested ${i}/${totalBattles} battles. Replay parity: 100%.`);
    }
  }

  const durationMs = Date.now() - startTime;
  console.log("==================================================================");
  console.log(`RESULTS: ${passedReplays}/${totalBattles} BATTLES 100% DETERMINISTIC`);
  console.log(`- Bitwise Identical Outcomes: ${bitwiseIdenticalOutcomes}/${totalBattles}`);
  console.log(`- Bitwise Identical State Trajectories: ${bitwiseIdenticalTrajectories}/${totalBattles}`);
  console.log(`- Bitwise Identical Damage Logs: ${bitwiseIdenticalDamageLogs}/${totalBattles}`);
  console.log(`- Adversarial Divergences Verified: ${adversarialDivergencesConfirmed}/20`);
  console.log(`- Execution Duration: ${durationMs} ms (${(durationMs / 1000).toFixed(2)}s)`);
  console.log("==================================================================");

  return {
    totalBattles,
    passedReplays,
    failedReplays,
    bitwiseIdenticalOutcomes,
    bitwiseIdenticalTrajectories,
    bitwiseIdenticalDamageLogs,
    adversarialDivergencesConfirmed,
    durationMs
  };
}

run1000BattlesStress().then((res) => {
  if (res.failedReplays > 0) process.exit(1);
}).catch((e) => {
  console.error("STRESS RUN FAILED:", e);
  process.exit(1);
});
