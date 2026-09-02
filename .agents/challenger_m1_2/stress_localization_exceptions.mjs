// .agents/challenger_m1_2/stress_localization_exceptions.mjs
// Localization Completeness and Exception Safety Verification Suite

import assert from "node:assert/strict";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { QTESystem, DualQTESystem } from "../../src/js/systems/QTESystem.js";
import { I18n, I18nService, LOCALES, LOCALE_ORDER } from "../../src/js/services/I18n.js";
import { STAGES, HANDS, ITEMS, EQUIPMENT_ITEMS } from "../../src/js/config/gameConfig.js";
import { createSeededRandom, MemoryPersistence } from "../../tests/helpers/testHarness.js";

function verifyKeyAcrossAllLocales(i18n, key) {
  if (!key) return { ok: false, error: "Empty key" };
  for (const locale of LOCALE_ORDER) {
    i18n.setLocale(locale);
    const translated = i18n.t(key);
    if (!translated || translated === key) {
      return { ok: false, error: `Key '${key}' missing or untranslated in locale '${locale}'` };
    }
  }
  return { ok: true };
}

async function testLocalizationIntegrity() {
  console.log("==================================================================");
  console.log("TESTING LOCALIZATION INTEGRITY FOR BATTLESYSTEM & QTESYSTEM");
  console.log("==================================================================");

  const i18n = new I18nService();
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 25;
  store.state.records.clearedStages = [1, 2, 3, 4];
  store.state.profile.skills.momo = 5;
  store.state.profile.skills.dualHand = 1;
  store.state.inventory = { hpPotion: 5, mpPotion: 5 };
  store.state.equipment = {
    weapon: "flame_katana",
    shield: "suzaku_shield",
    head: "mirror_armor",
    accessory1: "feather_charm"
  };
  store.commit("setup");

  const emittedKeys = new Set();
  const emittedEvents = [];
  const unlocalizedPayloads = [];

  bus.on("dialogue", (payload) => {
    emittedEvents.push({ type: "dialogue", payload });
    if (payload.key) emittedKeys.add(payload.key);
    if (payload.speakerKey) emittedKeys.add(payload.speakerKey);
    if (!payload.key && !payload.speakerKey) {
      unlocalizedPayloads.push({ type: "dialogue", payload });
    }
  });

  bus.on("toast", (payload) => {
    emittedEvents.push({ type: "toast", payload });
    if (payload.key) emittedKeys.add(payload.key);
    else unlocalizedPayloads.push({ type: "toast", payload });
  });

  bus.on("battle:damage-logged", (payload) => {
    emittedEvents.push({ type: "damage-logged", payload });
    if (payload.targetNameKey) emittedKeys.add(payload.targetNameKey);
  });

  bus.on("battle:countdown-beat", (payload) => {
    emittedEvents.push({ type: "countdown-beat", payload });
    if (payload.key) emittedKeys.add(payload.key);
  });

  // Run battles through all 4 stages and exercise all paths (win, loss, draw, momo, morph, items, QTEs, dojo)
  for (let stageId = 1; stageId <= 4; stageId++) {
    const rng = createSeededRandom(`loc_test_stage_${stageId}`);
    const battle = new BattleSystem(bus, store, rng);
    battle.start(stageId);

    for (let r = 1; r <= 8; r++) {
      if (!battle.state?.active) break;
      battle.useItem("hpPotion");
      battle.useItem("mpPotion");
      battle.selectHand(r % 2 === 0 ? "rock" : "paper", "left");
      battle.selectHand(r % 3 === 0 ? "scissors" : "rock", "right");
      battle.revealHands();
      if (battle.state.phase === "reaction") {
        if (r % 2 === 0 && battle.state.playerMp >= 25) {
          battle.useMorph();
          battle.selectHand("scissors");
        } else {
          battle.resolveRound();
        }
      }
      if (battle.state.phase === "qte") {
        if (battle.state.isDualQte) {
          for (const d of battle.dualQte.left.sequence) battle.inputQte(d, "left");
          for (const d of battle.dualQte.right.sequence) battle.inputQte(d, "right");
        } else {
          for (const d of battle.qte.sequence) battle.inputQte(d);
        }
      }
      if (battle.state.phase === "result") battle.scheduleRound();
    }
    battle.stopClocks();
  }

  // Also test Dojo stages
  const dojoBattle = new BattleSystem(bus, store, createSeededRandom(12345));
  dojoBattle.start(991, { isDojo: true, isDual: false, customHp: 1000, customDamage: 50 });
  dojoBattle.revealHands();
  dojoBattle.resolveRound();
  dojoBattle.stopClocks();

  const dojoDualBattle = new BattleSystem(bus, store, createSeededRandom(54321));
  dojoDualBattle.start(992, { isDojo: true, isDual: true, customHp: 1000, customDamage: 50 });
  dojoDualBattle.revealHands();
  dojoDualBattle.resolveRound();
  dojoDualBattle.stopClocks();

  // Also verify all static combat keys used across systems
  const combatKeys = [
    "dialogue.speakerKohaku",
    "dialogue.speakerPlatinumKohaku",
    "dialogue.speakerPlayer",
    "dialogue.speakerNarrator",
    "dialogue.introNormal",
    "dialogue.introFinal",
    "dialogue.chant1",
    "dialogue.chant2",
    "dialogue.chant3",
    "dialogue.morphReaction",
    "dialogue.winSingleNormal",
    "dialogue.winSingleMorph",
    "dialogue.winDualBoth",
    "dialogue.winDualMorphBoth",
    "dialogue.winDualSingle",
    "dialogue.winDualMorphSingle",
    "dialogue.winDualDoubleDmg",
    "dialogue.winDualMorphDoubleDmg",
    "dialogue.drawNormal",
    "dialogue.drawMomoHit",
    "dialogue.drawMomoDodge",
    "dialogue.qteSingleBreak",
    "dialogue.qteDualBreak",
    "dialogue.qteMiss",
    "dialogue.dualQteMiss",
    "dialogue.dualQteSuccess",
    "dialogue.deflectedSingleAttack",
    "dialogue.freezeNarration",
    "dialogue.dodgeDodge",
    "dialogue.dodgeDodgeDual",
    "dialogue.itemUsed",
    "dialogue.postBattleWin",
    "dialogue.postBattleLoss",
    "narration.qteCounterPaper",
    "narration.qteCounterScissors",
    "narration.qteCounterRock",
    "combat.notInBattle",
    "combat.itemNotFound",
    "combat.resourceFull",
    "combat.itemDepleted",
    "combat.morphWindowOnly",
    "combat.morphWindowExpired",
    "combat.insufficientMp",
    "toast.levelRequirementNotMet",
    "ui.mustClearOnceForAuto"
  ];
  combatKeys.forEach((k) => emittedKeys.add(k));

  console.log(`Collected ${emittedKeys.size} unique translation keys across emitted events & systems.`);
  console.log(`Emitted event count: ${emittedEvents.length}`);

  let missingKeyErrors = 0;
  for (const key of emittedKeys) {
    const res = verifyKeyAcrossAllLocales(i18n, key);
    if (!res.ok) {
      console.error(`[LOCALIZATION ERROR] ${res.error}`);
      missingKeyErrors++;
    }
  }

  if (unlocalizedPayloads.length > 0) {
    console.error(`[UNLOCALIZED EMISSION] Found ${unlocalizedPayloads.length} payloads without key:`, unlocalizedPayloads);
  }

  assert.equal(missingKeyErrors, 0, `Found ${missingKeyErrors} missing localization keys across the 4 locales.`);
  assert.equal(unlocalizedPayloads.length, 0, `Found ${unlocalizedPayloads.length} unlocalized payloads emitted without a translation key.`);

  console.log("[PASS] Localization integrity verified across zh-Hant, zh-Hans, en, ja (0 missing keys, 0 unlocalized text)!");
  return { emittedKeysCount: emittedKeys.size, missingKeyErrors, unlocalizedPayloadsCount: unlocalizedPayloads.length };
}

async function testExceptionSafetyAndAdversarialInputs() {
  console.log("==================================================================");
  console.log("TESTING EXCEPTION SAFETY & ADVERSARIAL INPUT ROBUSTNESS");
  console.log("==================================================================");

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, Math.random);
  const qte = new QTESystem(bus, battle.timers, Math.random);
  const dualQte = new DualQTESystem(bus, battle.timers, Math.random);

  let unhandledExceptions = 0;

  function safeRun(desc, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[CRASH] ${desc} threw unhandled exception:`, err);
      unhandledExceptions++;
    }
  }

  // Test 1: Malformed / Invalid hands in selectHand
  const invalidHands = [null, undefined, "", "invalid_hand", 123, {}, [], NaN, Infinity, -1];
  for (const h of invalidHands) {
    safeRun(`selectHand with hand=${h}`, () => {
      battle.selectHand(h);
      battle.selectHand(h, "left");
      battle.selectHand(h, "right");
      battle.selectHand(h, "unknown_slot");
    });
  }

  // Test 2: Malformed / Invalid item IDs
  const invalidItems = [null, undefined, "", "ghost_item", 999, {}, []];
  for (const item of invalidItems) {
    safeRun(`useItem with itemId=${item}`, () => {
      const res = battle.useItem(item);
      assert.ok(typeof res === "object" && res !== null);
      assert.equal(res.ok, false);
    });
  }

  // Test 3: Calling methods out of phase / when inactive
  safeRun("revealHands when inactive", () => battle.revealHands());
  safeRun("useMorph when inactive", () => battle.useMorph());
  safeRun("resolveRound when inactive", () => battle.resolveRound());
  safeRun("resolveDraw when inactive", () => battle.resolveDraw());
  safeRun("pause when inactive", () => {
    const res = battle.pause();
    assert.equal(res.ok, false);
  });
  safeRun("resume when inactive", () => {
    const res = battle.resume();
    assert.equal(res.ok, false);
  });
  safeRun("handleDisconnect / handleReconnect when inactive", () => {
    battle.handleDisconnect();
    battle.handleReconnect();
    battle.settleDisconnect();
  });
  safeRun("abandon when inactive", () => battle.abandon());
  safeRun("end when inactive", () => battle.end(true));

  // Test 4: Corrupted / Malformed state in restore()
  const malformedStates = [
    null,
    undefined,
    {},
    { stage: null },
    { stage: { id: 9999 } },
    { enemies: null },
    { enemies: [{ id: "test", hp: "corrupted_nan" }] },
    { countdownRemainingMs: -500 },
    { roundExpiresAt: "invalid_date" }
  ];
  for (const s of malformedStates) {
    safeRun(`restore with malformed state=${JSON.stringify(s)}`, () => {
      battle.restore(s);
    });
  }

  // Test 5: QTESystem with adversarial inputs
  const invalidDirections = [null, undefined, "", "INVALID_DIR", 123, {}, [], NaN, -100];
  safeRun("QTESystem start with negative length/duration", () => {
    qte.start(-5, -1000);
    qte.input("up");
    qte.pause();
    qte.resume();
    qte.auditInputs([null, undefined, {}, { timestamp: -10000 }]);
    qte.stop();
  });

  for (const dir of invalidDirections) {
    safeRun(`QTESystem input with dir=${dir}`, () => {
      qte.input(dir);
      qte.input(dir, -5000);
      qte.input(dir, Date.now() + 1000000);
    });
  }

  // Test 6: DualQTESystem with adversarial inputs
  safeRun("DualQTESystem start with malformed options", () => {
    dualQte.start({ length: -10, durationMs: -5000, maxErrors: -1 });
    dualQte.inputSlot("left", "up");
    dualQte.inputSlot("right", "down");
    dualQte.inputSlot("unknown_slot", "up");
    dualQte.auditInputs([{ slot: "invalid", directionId: null, timestamp: 0 }]);
    dualQte.pause();
    dualQte.resume();
    dualQte.stop();
  });

  for (const dir of invalidDirections) {
    safeRun(`DualQTESystem input with dir=${dir}`, () => {
      dualQte.input(dir);
      dualQte.input(dir, "left");
      dualQte.input("left", dir);
      dualQte.input(dir, "right");
      dualQte.input(dir, "invalid");
    });
  }

  // Test 7: Rapid command dispatch burst through processCommand / enqueueCommand
  safeRun("Command queue bursts with unknown / malformed commands", () => {
    battle.start(1);
    battle.enqueueCommand({ type: "unknown_1", payload: {}, arrivedAt: Date.now() });
    battle.enqueueCommand({ type: "select_hand", payload: { handId: "invalid" } });
    battle.enqueueCommand({ type: "equip", payload: { itemId: "sword" } }); // should reject with lock
    battle.enqueueCommand({ type: "allocate", payload: { stat: "str" } }); // should reject with lock
    battle.enqueueCommand({ type: "pause" });
    battle.enqueueCommand({ type: "resume" });
    battle.enqueueCommand({ type: "abandon" });
    battle.stopClocks();
  });

  console.log("==================================================================");
  console.log(`RESULTS: ${unhandledExceptions} UNHANDLED EXCEPTIONS OCCURRED`);
  console.log("==================================================================");

  assert.equal(unhandledExceptions, 0, `Encountered ${unhandledExceptions} unhandled exceptions during adversarial fuzzing!`);
  console.log("[PASS] BattleSystem & QTESystem exception safety verified (0 unhandled exceptions)!");
  return { unhandledExceptions };
}

async function runAll() {
  const locRes = await testLocalizationIntegrity();
  const excRes = await testExceptionSafetyAndAdversarialInputs();
  console.log("==================================================================");
  console.log("ALL LOCALIZATION & EXCEPTION SAFETY TESTS PASSED SUCCESSFULLY.");
  console.log("==================================================================");
}

runAll().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
