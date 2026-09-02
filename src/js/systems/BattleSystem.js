import { ASSETS, BATTLE_RULES, HANDS, ITEMS, SKILLS, STAGES, EQUIPMENT_ITEMS } from "../config/gameConfig.js";
import { TimerRegistry } from "../core/TimerRegistry.js";
import { QTESystem, DualQTESystem } from "./QTESystem.js";
import {
  compareHands,
  evaluateDualRps,
  getCounterHand,
  getQteCounterNarration,
  getRandomHand
} from "./rpsRules.js";

export class BattleSystem {
  constructor(bus, store, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.store = store;
    const resolvedRandom = typeof random === "function"
      ? random
      : (typeof random === "object" && random !== null && typeof random.random === "function"
        ? random.random
        : Math.random);
    const resolvedNow = (typeof random === "object" && random !== null && typeof random.now === "function")
      ? random.now
      : (typeof now === "function" ? now : () => Date.now());
    this.random = resolvedRandom;
    this.now = resolvedNow;
    this.timers = new TimerRegistry();
    this.qte = new QTESystem(bus, this.timers, resolvedRandom, resolvedNow);
    this.dualQte = new DualQTESystem(bus, this.timers, resolvedRandom, resolvedNow);
    this.state = null;
    this.countdownTimeoutId = null;
    this.countdownId = null;
    this.beatTimerIds = [];
    this.reactionTimeoutId = null;
    this.reactionTickId = null;
    this.disconnectTimeoutId = null;
    this.autoRestartTimerId = null;
    this.pauseCount = 0;
    this.maxPauses = 3;
    this.commandBuffer = [];
    this.commandLog = [];
    this.battleSeed = 0;
    this.autoBattle = {
      active: false,
      isPaused: false,
      stageId: null,
      totalRounds: 0,
      remainingRounds: 0,
      wins: 0,
      losses: 0
    };
    this.bus.on("qte:finished", (result) => this.resolveQte(result));
    this.bus.on("qte:slot-success", ({ slot, enemyId }) => {
      if (this.state?.active && this.state.phase === "qte" && this.state.isDualQte) {
        this.handleDualQteSlotSuccess(enemyId || slot);
      }
    });
  }

  // --- Online Authority Policies & Assumptions ---

  // ASSUMPTION: Equipment mutations and stat allocations are locked during an active battle session.
  isBattleActive() {
    return Boolean(this.state?.active && this.state.phase !== "ended" && this.state.phase !== "abandoned");
  }

  canEquip() {
    // ASSUMPTION: Equipment mutations locked during active battle session
    return !this.isBattleActive();
  }

  canAllocate() {
    // ASSUMPTION: Stat allocations locked during active battle session
    return !this.isBattleActive();
  }

  enqueueCommand(cmd) {
    const arrival = cmd.arrivedAt || this.now();
    const declared = cmd.declaredAt || arrival;
    const boundedDeclared = Math.min(declared, arrival + 150);
    const entry = {
      ...cmd,
      arrivedAt: arrival,
      declaredAt: declared,
      boundedDeclaredAt: boundedDeclared
    };
    this.commandBuffer.push(entry);
    this.commandBuffer.sort((a, b) => a.boundedDeclaredAt - b.boundedDeclaredAt);
    return this.flushCommands();
  }

  flushCommands() {
    const results = [];
    while (this.commandBuffer.length > 0) {
      const nextCmd = this.commandBuffer.shift();
      results.push(this.dispatchCommand(nextCmd));
    }
    return results;
  }

  processCommand(cmd) {
    return this.dispatchCommand({
      ...cmd,
      arrivedAt: cmd.arrivedAt || this.now(),
      declaredAt: cmd.declaredAt || this.now()
    });
  }

  dispatchCommand(cmd) {
    const { type, payload, declaredAt, cmdId } = cmd;

    // Check lock assumption
    if ((type === "equip" || type === "unequip" || type === "allocate") && this.isBattleActive()) {
      return {
        ok: false,
        cmdId,
        reason: "locked_during_battle",
        error: "ASSUMPTION: Equipment and stat allocations are locked during active battle"
      };
    }

    let result = { ok: false, cmdId };
    switch (type) {
      case "select_hand":
        result = this.selectHand(payload?.handId, payload?.slot, declaredAt);
        break;
      case "use_morph":
        result = this.useMorph(declaredAt);
        break;
      case "use_item":
        result = this.useItem(payload?.itemId, declaredAt);
        break;
      case "input_qte":
        result = { ok: Boolean(this.inputQte(payload?.directionId, payload?.slot, declaredAt)) };
        break;
      case "report_qte_batch":
        result = this.state?.isDualQte
          ? this.dualQte.auditInputs(payload?.inputs)
          : this.qte.auditInputs(payload?.inputs);
        break;
      case "pause":
        result = this.pause();
        break;
      case "resume":
        result = this.resume();
        break;
      case "abandon":
        this.abandon();
        result = { ok: true };
        break;
      default:
        result = { ok: false, reason: "unknown_command" };
    }

    this.commandLog.push({
      ...cmd,
      executedAt: this.now(),
      result
    });
    return result;
  }

  getAllEquipEffects(effectType) {
    const snapshot = this.store.snapshot();
    const equipment = snapshot.equipment || {};
    const effects = [];
    for (const itemId of Object.values(equipment)) {
      if (!itemId) continue;
      const item = EQUIPMENT_ITEMS[itemId];
      if (item?.effect?.type === effectType) {
        effects.push(item.effect);
      }
    }
    return effects;
  }

  hasEquipEffect(effectType) {
    const effects = this.getAllEquipEffects(effectType);
    return effects.length > 0 ? effects[0] : null;
  }

  start(stageId, options = {}) {
    let stage = null;
    const profile = this.store.snapshot();

    if (options.isDojo) {
      const customHp = Math.max(1, Number(options.customHp || 10000));
      const customDamage = Math.max(0, Number(options.customDamage ?? 0));
      if (options.isDual) {
        stage = {
          id: 992,
          chapter: "修練場",
          chapterKey: "dojo.chapterName",
          name: "影小樂・雙生木樁",
          nameKey: "dojo.mode2Style2",
          subtitle: "第四關雙手雙軌模擬",
          subtitleKey: "dojo.mode2Style2Desc",
          enemyHp: customHp * 2,
          requiredLevel: 1,
          rewardMultiplier: 0,
          xpWin: 0,
          xpLoss: 0,
          winCoins: 0,
          lossCoins: 0,
          roundSeconds: 3,
          reactionWindowMs: 750,
          momoDodgeRate: 0,
          qteDirections: "all",
          qteLength: 7,
          maxErrors: 1,
          enemyDamageMultiplier: 1,
          customDamage,
          dualEnemy: true,
          isDojo: true,
          isSilhouette: true,
          enemies: [
            { id: "left", name: "影・小樂（左）", nameKey: "dojo.dummySilhouetteLeft", hp: customHp, maxHp: customHp, alive: true },
            { id: "right", name: "影・小樂（右）", nameKey: "dojo.dummySilhouetteRight", hp: customHp, maxHp: customHp, alive: true }
          ],
          final: false
        };
      } else {
        stage = {
          id: 991,
          chapter: "修練場",
          chapterKey: "dojo.chapterName",
          name: "影小樂・單體木樁",
          nameKey: "dojo.mode2Style1",
          subtitle: "無壓實戰與 DPS 測試",
          subtitleKey: "dojo.mode2Style1Desc",
          enemyHp: customHp,
          requiredLevel: 1,
          rewardMultiplier: 0,
          xpWin: 0,
          xpLoss: 0,
          winCoins: 0,
          lossCoins: 0,
          roundSeconds: 3,
          reactionWindowMs: 750,
          momoDodgeRate: 0,
          qteDirections: "all",
          qteLength: 5,
          maxErrors: 2,
          enemyDamageMultiplier: 1,
          customDamage,
          isDojo: true,
          isSilhouette: true,
          enemies: [{ id: "main", name: "影・小樂", nameKey: "dojo.dummySilhouette", hp: customHp, maxHp: customHp, alive: true }],
          final: false
        };
      }
    } else {
      stage = STAGES.find((item) => item.id === Number(stageId));
      const isStageUnlocked = (profile.records?.clearedStages || []).includes(Number(stageId)) || profile.profile.level >= stage?.requiredLevel;
      if (!stage || !isStageUnlocked) {
        this.bus.emit("toast", {
          key: "toast.levelRequirementNotMet",
          message: "等級尚未達到這一章的挑戰條件。",
          tone: "danger"
        });
        return false;
      }
    }

    if (options.autoBattle) {
      const cleared = (profile.records?.clearedStages || []).includes(Number(stageId));
      if (!cleared) {
        this.bus.emit("toast", {
          key: "ui.mustClearOnceForAuto",
          tone: "danger"
        });
        return false;
      }
      if (!this.autoBattle.active) {
        this.autoBattle = {
          active: true,
          isPaused: false,
          stageId: Number(stageId),
          totalRounds: options.autoBattleRounds || 10,
          remainingRounds: options.autoBattleRounds || 10,
          wins: 0,
          losses: 0
        };
      } else {
        this.autoBattle.isPaused = false;
      }
    } else {
      this.autoBattle.active = false;
      this.autoBattle.isPaused = false;
      this.autoBattle.remainingRounds = 0;
    }

    this.stopClocks();
    this.pauseCount = 0;
    this.battleSeed = options.seed ?? Math.floor(Math.random() * 1000000000);
    this.commandLog = [];
    this.battleStartTime = this.now();
    this.battleDamageDealt = 0;
    this.battleDamageTaken = 0;
    this.battleHpPotionUsed = 0;
    this.battleMpPotionUsed = 0;
    this.battleHpRestored = 0;
    this.battleMpRestored = 0;
    this.battleMomoAttempts = 0;
    this.battleMomoSuccesses = 0;
    this.battleMomoDamage = 0;
    this.battleMorphCount = 0;
    this.battleMorphDamage = 0;
    this.battleQteHits = 0;
    this.battleQteTotal = 0;
    const stats = profile.playerStats;
    const hasDualHandSkill = Boolean(profile.profile?.skills?.dualHand > 0);

    const enemies = stage.enemies
      ? stage.enemies.map((e) => ({ id: e.id, name: e.name, hp: e.hp, maxHp: e.maxHp, alive: true }))
      : [{ id: "main", name: stage.final ? "白金小樂" : "小樂", hp: stage.enemyHp, maxHp: stage.enemyHp, alive: true }];

    const totalEnemyHp = enemies.reduce((sum, e) => sum + e.hp, 0);
    const totalEnemyMaxHp = enemies.reduce((sum, e) => sum + e.maxHp, 0);

    this.state = {
      active: true,
      stage,
      phase: "countdown",
      round: 0,
      playerHp: stats.maxHp,
      playerMaxHp: stats.maxHp,
      playerMp: stats.maxMp,
      playerMaxMp: stats.maxMp,
      playerDamage: stats.damage,
      hasDualHandSkill,
      enemies,
      targetEnemyId: enemies[0].id,
      enemyHp: totalEnemyHp,
      enemyMaxHp: totalEnemyMaxHp,
      selectedHand: "rock",
      selectedHands: { left: "rock", right: "rock" },
      opponentHand: null,
      enemyWinningEmoji: null,
      countdown: stage.roundSeconds || BATTLE_RULES.roundSeconds,
      reactionRemaining: 0,
      morphUsed: false,
      morphActive: false,
      isEnemyFrozen: false,
      frozenEnemyHand: null,
      isPaused: false,
      pauseCount: 0,
      maxPauses: 3,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(
      stage.final
        ? { key: "dialogue.introFinal" }
        : { key: "dialogue.introNormal" },
      { key: "dialogue.speakerKohaku" }
    );
    this.scheduleRound();
    return true;
  }

  startAutoBattle(stageId, rounds = 10) {
    return this.start(stageId, { autoBattle: true, autoBattleRounds: rounds });
  }

  // --- Instantaneous Auto-Battle Simulation (Task 5.7) ---

  simulateBattle(stageId, options = {}) {
    const profile = this.store.snapshot();
    const stage = STAGES.find((item) => item.id === Number(stageId)) || STAGES[0];
    const stats = profile.playerStats;
    const hasDualHand = Boolean(profile.profile?.skills?.dualHand > 0);
    const momoLvl = profile.profile?.skills?.momo || 0;
    const seed = options.seed || Math.floor(this.random() * 1000000000);

    let playerHp = stats.maxHp;
    let playerMp = stats.maxMp;
    let enemyHp = stage.dualEnemy ? (stage.enemyHp || 10000) : stage.enemyHp;
    let round = 0;
    let damageDealt = 0;
    let damageTaken = 0;
    const frames = [];

    while (playerHp > 0 && enemyHp > 0 && round < 50) {
      round += 1;
      const playerHand = "rock";
      const hands = ["rock", "paper", "scissors"];
      const enemyHand = hands[Math.floor(this.random() * hands.length)];
      const cmp = compareHands(playerHand, enemyHand);

      if (cmp === "win") {
        const dmg = stats.damage;
        enemyHp = Math.max(0, enemyHp - dmg);
        damageDealt += dmg;
        frames.push({ round, result: "win", damageDealt: dmg, playerHp, enemyHp });
      } else if (cmp === "loss") {
        // Player QTE attempt
        const qteSuccess = this.random() > 0.3;
        if (qteSuccess) {
          const dmg = stats.damage;
          enemyHp = Math.max(0, enemyHp - dmg);
          damageDealt += dmg;
          frames.push({ round, result: "qte_counter", damageDealt: dmg, playerHp, enemyHp });
        } else {
          const dmg = (BATTLE_RULES.enemyDamage || 100) * (stage.enemyDamageMultiplier || 1);
          playerHp = Math.max(0, playerHp - dmg);
          damageTaken += dmg;
          frames.push({ round, result: "qte_fail", damageTaken: dmg, playerHp, enemyHp });
        }
      } else {
        // Draw + Momo proc
        if (momoLvl > 0 && this.random() < (momoLvl * 0.10)) {
          const momoDmg = SKILLS.momo.damage;
          enemyHp = Math.max(0, enemyHp - momoDmg);
          damageDealt += momoDmg;
          frames.push({ round, result: "draw_momo", damageDealt: momoDmg, playerHp, enemyHp });
        } else {
          frames.push({ round, result: "draw", playerHp, enemyHp });
        }
      }
    }

    const won = enemyHp <= 0;
    return {
      won,
      stage,
      seed,
      round,
      damageDealt,
      damageTaken,
      playerHp,
      enemyHp,
      frames
    };
  }

  simulateAutoBattle(stageId, totalRounds = 10, options = {}) {
    const results = [];
    let wins = 0;
    let losses = 0;
    let totalDmgDealt = 0;
    let totalDmgTaken = 0;

    for (let r = 0; r < totalRounds; r++) {
      const sim = this.simulateBattle(stageId, options);
      if (sim.won) wins += 1;
      else losses += 1;
      totalDmgDealt += sim.damageDealt;
      totalDmgTaken += sim.damageTaken;
      results.push(sim);

      const chunk = {
        roundIndex: r + 1,
        totalRounds,
        won: sim.won,
        wins,
        losses,
        battle: sim
      };
      this.bus.emit("auto-battle:stream-chunk", chunk);
    }

    const finalReport = {
      stageId: Number(stageId),
      totalRounds,
      wins,
      losses,
      totalDamageDealt: totalDmgDealt,
      totalDamageTaken: totalDmgTaken,
      simulations: results
    };
    this.bus.emit("auto-battle:simulated", finalReport);
    return finalReport;
  }

  restore(savedState) {
    if (!savedState) return false;
    const profile = this.store.snapshot();
    const stageId = savedState.stage?.id || savedState.stageId || 1;
    let stage = savedState.stage;
    if (!stage || !stage.name) {
      stage = STAGES.find((item) => item.id === Number(stageId)) || STAGES[0];
    }

    this.stopClocks();

    if (savedState.autoBattle?.active) {
      this.autoBattle = {
        active: true,
        isPaused: Boolean(savedState.autoBattle.isPaused),
        stageId: Number(savedState.autoBattle.stageId || stageId),
        totalRounds: Number(savedState.autoBattle.totalRounds || 10),
        remainingRounds: Number(savedState.autoBattle.remainingRounds || 10),
        wins: Number(savedState.autoBattle.wins || 0),
        losses: Number(savedState.autoBattle.losses || 0)
      };
    } else {
      this.autoBattle.active = false;
      this.autoBattle.isPaused = false;
      this.autoBattle.remainingRounds = 0;
    }

    this.battleStartTime = savedState.battleStartTime || this.now();
    this.battleDamageDealt = savedState.battleDamageDealt || 0;
    this.battleDamageTaken = savedState.battleDamageTaken || 0;
    this.battleHpPotionUsed = savedState.battleHpPotionUsed || 0;
    this.battleMpPotionUsed = savedState.battleMpPotionUsed || 0;
    this.battleHpRestored = savedState.battleHpRestored || 0;
    this.battleMpRestored = savedState.battleMpRestored || 0;
    this.battleMomoAttempts = savedState.battleMomoAttempts || 0;
    this.battleMomoSuccesses = savedState.battleMomoSuccesses || 0;
    this.battleMomoDamage = savedState.battleMomoDamage || 0;
    this.battleMorphCount = savedState.battleMorphCount || 0;
    this.battleMorphDamage = savedState.battleMorphDamage || 0;
    this.battleQteHits = savedState.battleQteHits || 0;
    this.battleQteTotal = savedState.battleQteTotal || 0;
    this.pauseCount = savedState.pauseCount || 0;

    const stats = profile.playerStats;
    const hasDualHandSkill = Boolean(profile.profile?.skills?.dualHand > 0);

    const enemies = savedState.enemies && savedState.enemies.length > 0
      ? savedState.enemies.map((e) => ({
          id: e.id,
          name: e.name,
          hp: Math.max(0, Number(e.hp ?? (stage.final ? 5000 : stage.enemyHp))),
          maxHp: Number(e.maxHp ?? (stage.final ? 5000 : stage.enemyHp)),
          alive: Number(e.hp ?? (stage.final ? 5000 : stage.enemyHp)) > 0
        }))
      : [{
          id: "main",
          name: stage.final ? "白金小樂" : "小樂",
          hp: Math.max(0, Number(savedState.enemyHp ?? stage.enemyHp)),
          maxHp: stage.enemyHp,
          alive: Math.max(0, Number(savedState.enemyHp ?? stage.enemyHp)) > 0
        }];

    const totalEnemyHp = enemies.reduce((sum, e) => sum + (e.alive ? e.hp : 0), 0);
    const totalEnemyMaxHp = enemies.reduce((sum, e) => sum + e.maxHp, 0);

    const roundNumber = Math.max(1, Number(savedState.round || 1));
    const currentRound = Math.max(0, roundNumber - 1);

    let remainingCountdownMs = null;
    if (savedState.roundExpiresAt) {
      remainingCountdownMs = Math.max(200, savedState.roundExpiresAt - this.now());
    } else if (typeof savedState.countdownRemainingMs === "number" && savedState.countdownRemainingMs > 0) {
      remainingCountdownMs = Math.max(200, savedState.countdownRemainingMs);
    } else if (typeof savedState.countdown === "number" && savedState.countdown > 0) {
      remainingCountdownMs = Math.max(200, savedState.countdown * 1000);
    }

    this.state = {
      active: true,
      stage,
      phase: "countdown",
      round: remainingCountdownMs ? roundNumber : currentRound,
      playerHp: Math.min(stats.maxHp, Math.max(1, Number(savedState.playerHp ?? stats.maxHp))),
      playerMaxHp: stats.maxHp,
      playerMp: Math.min(stats.maxMp, Math.max(0, Number(savedState.playerMp ?? stats.maxMp))),
      playerMaxMp: stats.maxMp,
      playerDamage: stats.damage,
      hasDualHandSkill,
      enemies,
      targetEnemyId: savedState.targetEnemyId || enemies.find((e) => e.alive)?.id || enemies[0]?.id || "main",
      enemyHp: Math.max(1, totalEnemyHp),
      enemyMaxHp: totalEnemyMaxHp,
      selectedHand: savedState.selectedHand || "rock",
      selectedHands: savedState.selectedHands || { left: "rock", right: "rock" },
      opponentHand: null,
      enemyWinningEmoji: null,
      countdown: remainingCountdownMs ? Math.ceil(remainingCountdownMs / 1000) : (stage.roundSeconds || BATTLE_RULES.roundSeconds),
      reactionRemaining: 0,
      morphUsed: false,
      morphActive: false,
      isEnemyFrozen: Boolean(savedState.isEnemyFrozen),
      frozenEnemyHand: savedState.frozenEnemyHand || null,
      isPaused: Boolean(this.autoBattle.isPaused),
      pauseCount: this.pauseCount,
      maxPauses: 3,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };

    this.emitState();
    this.scheduleRound(remainingCountdownMs);
    return true;
  }

  pauseAutoBattle() {
    if (!this.autoBattle.active || this.autoBattle.isPaused) return;
    this.autoBattle.isPaused = true;
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
    this.bus.emit("auto-battle:paused", { ...this.autoBattle });
  }

  resumeAutoBattle() {
    if (!this.autoBattle.active || !this.autoBattle.isPaused) return;
    this.autoBattle.isPaused = false;
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
    this.bus.emit("auto-battle:resumed", { ...this.autoBattle });

    if (!this.state?.active && this.autoBattle.remainingRounds > 0) {
      this.start(this.autoBattle.stageId, { autoBattle: true });
    }
  }

  toggleAutoBattle() {
    if (!this.autoBattle.active) return;
    if (this.autoBattle.isPaused) {
      this.resumeAutoBattle();
    } else {
      this.pauseAutoBattle();
    }
  }

  togglePause() {
    if (!this.state?.active || this.state.phase === "ended") return;
    if (this.state.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  pause() {
    if (!this.state?.active || this.state.phase === "ended" || this.state.isPaused) {
      return { ok: false, reason: "invalid_state" };
    }
    // Only countdown phase allowed for pause
    if (this.state.phase !== "countdown") {
      return { ok: false, reason: "pause_only_in_countdown" };
    }
    // Limit to 3 times per battle
    if (this.pauseCount >= this.maxPauses) {
      return { ok: false, reason: "pause_limit_reached" };
    }
    this.pauseCount += 1;
    this.state.isPaused = true;
    this.state.pauseCount = this.pauseCount;
    this.state.maxPauses = this.maxPauses;
    this.countdownRemainingMs = Math.max(0, (this.countdownDeadline || 0) - this.now());
    this.clearCountdownClocks();
    this.emitState();
    return { ok: true, pauseCount: this.pauseCount, remainingMs: this.countdownRemainingMs };
  }

  resume() {
    if (!this.state?.active || this.state.phase === "ended" || !this.state.isPaused) {
      return { ok: false, reason: "not_paused" };
    }
    this.state.isPaused = false;
    if (this.state.phase === "countdown") {
      const remainingMs = this.countdownRemainingMs ?? 1000;
      this.scheduleRound(remainingMs);
    }
    this.emitState();
    return { ok: true };
  }

  handleDisconnect() {
    if (!this.state?.active || this.state.phase === "ended") return;
    this.state.disconnected = true;
    this.state.disconnectDeadline = this.now() + 10000;
    this.emitState();
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
    }
    this.disconnectTimeoutId = this.timers.timeout(() => {
      this.settleDisconnect();
    }, 10000);
  }

  handleReconnect() {
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
      this.disconnectTimeoutId = null;
    }
    if (this.state) {
      this.state.disconnected = false;
      this.state.disconnectDeadline = null;
      this.emitState();
    }
  }

  settleDisconnect() {
    if (!this.state?.active || this.state.phase === "ended") return;
    // Settle battle upon 10s disconnect expiration
    this.end(false);
  }

  selectTarget(enemyId) {
    if (!this.state?.active) return false;
    const target = this.state.enemies.find((e) => e.id === enemyId && e.alive);
    if (!target) return false;
    this.state.targetEnemyId = target.id;
    this.emitState();
    this.bus.emit("sound", { name: "select" });
    return true;
  }

  snapshot() {
    if (!this.state) return null;
    const snap = structuredClone(this.state);
    snap.autoBattle = { ...this.autoBattle };
    snap.commandLog = [...this.commandLog];
    snap.seed = this.battleSeed;

    if (this.state.phase === "countdown" && this.countdownDeadline) {
      const rem = Math.max(0, this.countdownDeadline - this.now());
      snap.countdown = Math.ceil(rem / 1000);
      snap.countdownRemainingMs = rem;
    } else if (this.state.phase === "reaction" && this.reactionDeadline) {
      const rem = Math.max(0, this.reactionDeadline - this.now());
      snap.reactionRemaining = rem / 1000;
      snap.reactionRemainingMs = rem;
    }
    return snap;
  }

  emitState() {
    this.bus.emit("battle:state", this.snapshot());
  }

  say(messageOrPayload, speaker = null) {
    let key = null;
    let params = {};
    let text = "";
    let speakerKey = "dialogue.speakerKohaku";
    let speakerName = "";

    if (typeof messageOrPayload === "object" && messageOrPayload !== null) {
      key = messageOrPayload.key || null;
      params = messageOrPayload.params || {};
      text = messageOrPayload.text || "";
    } else {
      text = String(messageOrPayload || "");
    }

    if (typeof speaker === "object" && speaker !== null) {
      speakerKey = speaker.key || speakerKey;
      speakerName = speaker.text || "";
    } else if (speaker) {
      speakerName = String(speaker);
    }

    this.bus.emit("dialogue", {
      key,
      params,
      speakerKey,
      speaker: speakerName || "小樂",
      text
    });
  }

  scheduleRound(customMs = null) {
    if (!this.state?.active) return;
    this.clearCountdownClocks();
    const defaultRoundSeconds = this.state.stage.roundSeconds || BATTLE_RULES.roundSeconds;
    const totalDurationMs = customMs ? customMs : defaultRoundSeconds * 1000;
    const roundSeconds = Math.ceil(totalDurationMs / 1000);
    if (!customMs) {
      this.state.round += 1;
    }
    this.state.phase = "countdown";
    this.state.opponentHand = null;
    this.state.enemyWinningEmoji = null;
    this.state.countdown = roundSeconds;
    this.state.reactionRemaining = 0;
    this.state.morphUsed = false;
    this.state.morphActive = false;
    this.state.lastChant = null;
    this.state.isPaused = false;
    this.countdownDeadline = this.now() + totalDurationMs;
    this.state.deadline = this.countdownDeadline;
    this.state.roundExpiresAt = this.countdownDeadline;
    this.emitState(); // Push state ONCE on phase transition!

    // Schedule countdown chant beats
    const beatTimes = [
      { count: 3, delay: totalDurationMs - 3000, key: "dialogue.chant3" },
      { count: 2, delay: totalDurationMs - 2000, key: "dialogue.chant2" },
      { count: 1, delay: totalDurationMs - 1000, key: "dialogue.chant1" }
    ];

    beatTimes.forEach(({ count, delay, key }) => {
      if (delay > 0) {
        const timerId = this.timers.timeout(() => {
          if (this.state?.active && this.state.phase === "countdown" && !this.state.isPaused) {
            this.state.lastChant = count;
            this.say(
              { key },
              { key: "dialogue.speakerKohaku" }
            );
            this.bus.emit("battle:countdown-beat", { count, key });
          }
        }, delay);
        this.beatTimerIds.push(timerId);
      }
    });

    this.countdownTimeoutId = this.timers.timeout(() => {
      this.countdownTimeoutId = null;
      if (this.state?.active && this.state.phase === "countdown" && !this.state.isPaused) {
        this.revealHands();
      }
    }, totalDurationMs);
  }

  selectHand(handId, slot = null, declaredAt = null) {
    if (!this.state?.active || !HANDS[handId]) return false;
    const arrival = this.now();

    if (this.state.phase === "countdown") {
      // Secret commitment sealed before reveal
      if (arrival > this.countdownDeadline) {
        return { ok: false, reason: "late_commitment" };
      }
      if (slot === "left") {
        this.state.selectedHands.left = handId;
        this.state.selectedHand = handId;
      } else if (slot === "right") {
        this.state.selectedHands.right = handId;
      } else {
        this.state.selectedHand = handId;
        this.state.selectedHands.left = handId;
        if (!this.state.hasDualHandSkill) {
          this.state.selectedHands.right = handId;
        }
      }
      this.emitState();
      this.bus.emit("sound", { name: "select" });
      return { ok: true, handId, slot };
    } else if (this.state.phase === "reaction" && this.state.morphActive) {
      // 150ms grace check on morph reaction window
      if (arrival > this.reactionDeadline + 150) {
        return { ok: false, reason: "morph_expired" };
      }
      if (slot === "left") {
        this.state.selectedHands.left = handId;
        this.state.selectedHand = handId;
      } else if (slot === "right") {
        this.state.selectedHands.right = handId;
      } else {
        this.state.selectedHand = handId;
        this.state.selectedHands.left = handId;
        if (!this.state.hasDualHandSkill) {
          this.state.selectedHands.right = handId;
        }
      }
      this.state.morphActive = false;
      this.clearReactionClocks();
      this.emitState();
      this.bus.emit("sound", { name: "select" });
      this.resolveRound();
      return { ok: true, handId, slot };
    }
    return false;
  }

  revealHands() {
    if (!this.state?.active || this.state.phase !== "countdown") return;
    this.clearCountdownClocks();
    this.state.phase = "reaction";

    const isDualStage = Boolean(this.state.stage?.dualEnemy && this.state.enemies?.length > 1);
    const aliveEnemies = this.state.enemies.filter((e) => e.alive);
    const frozenHand = this.state.frozenEnemyHand;

    const getFilteredHand = () => {
      const allHands = ["rock", "paper", "scissors"];
      const pool = frozenHand ? allHands.filter((h) => h !== frozenHand) : allHands;
      return pool[Math.floor(this.random() * pool.length)];
    };

    if (isDualStage && aliveEnemies.length >= 2) {
      const leftHand = getFilteredHand();
      const rightHand = getFilteredHand();
      this.state.opponentHands = { left: leftHand, right: rightHand };
      this.state.opponentHand = leftHand;

      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, leftHand);
        const rightResult = compareHands(this.state.selectedHands.right, rightHand);
        if (leftResult === "loss" || rightResult === "loss") {
          this.state.enemyWinningEmoji = leftResult === "loss" ? HANDS[leftHand].glyph : HANDS[rightHand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      } else {
        const leftResult = compareHands(this.state.selectedHand, leftHand);
        const rightResult = compareHands(this.state.selectedHand, rightHand);
        if (leftResult === "loss" || rightResult === "loss") {
          this.state.enemyWinningEmoji = leftResult === "loss" ? HANDS[leftHand].glyph : HANDS[rightHand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      }
    } else {
      const hand = getFilteredHand();
      this.state.opponentHand = hand;
      this.state.opponentHands = { main: hand };
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, hand);
        const rightResult = compareHands(this.state.selectedHands.right, hand);
        if (leftResult === "loss" && rightResult === "loss") {
          this.state.enemyWinningEmoji = HANDS[hand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      } else {
        const rpsResult = compareHands(this.state.selectedHand, hand);
        this.state.enemyWinningEmoji = rpsResult === "loss" ? HANDS[hand].glyph : null;
      }
    }

    // Clear frozen hand after rolling
    this.state.frozenEnemyHand = null;

    let reactionWindowMs = this.state.stage?.reactionWindowMs ?? BATTLE_RULES.reactionWindowMs;
    this.state.reactionRemaining = reactionWindowMs / 1000;
    this.reactionDeadline = this.now() + reactionWindowMs;
    this.state.deadline = this.reactionDeadline;
    this.state.reactionExpiresAt = this.reactionDeadline;

    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("sound", { name: "reveal" });

    this.reactionTimeoutId = this.timers.timeout(() => {
      this.reactionTimeoutId = null;
      this.resolveRound();
    }, reactionWindowMs);
  }

  useMorph(declaredAt = null) {
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    if (!this.state?.active || this.state.phase !== "reaction" || this.state.morphActive) {
      return {
        ok: false,
        key: "combat.morphWindowOnly",
        message: "變拳只能在看見小樂出拳後的反應時間內使用。"
      };
    }
    // 150ms grace check on reaction window
    if (timestamp > this.reactionDeadline + 150) {
      return {
        ok: false,
        key: "combat.morphWindowExpired",
        message: "反應時間已過。"
      };
    }

    const totalDiscount = this.getAllEquipEffects("morph_discount").reduce((sum, eff) => sum + (eff.morphDiscount || 0), 0);
    const morphCost = Math.max(5, BATTLE_RULES.morphCost - totalDiscount);

    if (this.state.playerMp < morphCost) {
      return {
        ok: false,
        key: "combat.insufficientMp",
        message: "MP 不足，無法使用變拳。"
      };
    }
    this.clearReactionClocks();
    this.state.playerMp -= morphCost;

    this.battleMorphCount = (this.battleMorphCount || 0) + 1;
    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.morphActive = true;

    const morphWindowMs = 2000;
    this.state.reactionRemaining = morphWindowMs / 1000;
    this.reactionDeadline = this.now() + morphWindowMs;
    this.state.deadline = this.reactionDeadline;
    this.state.reactionExpiresAt = this.reactionDeadline;

    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say(
      { key: "dialogue.morphReaction" },
      { key: "dialogue.speakerKohaku" }
    );

    this.reactionTimeoutId = this.timers.timeout(() => {
      this.reactionTimeoutId = null;
      this.state.morphActive = false;
      this.resolveRound();
    }, morphWindowMs);
    return { ok: true };
  }

  resolveDraw() {
    if (!this.state?.active) return;
    this.state.phase = "reaction";
    this.state.selectedHand = "rock";
    this.state.selectedHands = { left: "rock", right: "rock" };
    this.state.opponentHand = "rock";
    this.resolveRound();
  }

  resolveRound() {
    if (!this.state?.active || this.state.phase !== "reaction") return;
    this.clearReactionClocks();
    this.state.morphActive = false;

    const isDualStage = Boolean(this.state.stage?.dualEnemy && this.state.enemies?.length > 1);
    const aliveEnemies = this.state.enemies.filter((e) => e.alive);

    if (isDualStage && aliveEnemies.length >= 2) {
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, this.state.opponentHands.left);
        const rightResult = compareHands(this.state.selectedHands.right, this.state.opponentHands.right);

        if (leftResult === "loss" && rightResult === "loss") {
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startDualQte();
          return;
        }

        const singleLoss = (leftResult === "loss" && rightResult !== "loss") || (rightResult === "loss" && leftResult !== "loss");
        if (singleLoss) {
          const losingToEnemyId = leftResult === "loss" ? "left" : "right";
          const winningOverEnemyId = leftResult === "win" ? "left" : (rightResult === "win" ? "right" : null);
          if (winningOverEnemyId) {
            const wonEnemy = this.state.enemies.find((e) => e.id === winningOverEnemyId && e.alive);
            if (wonEnemy) this.applyDamageToEnemy(wonEnemy, null, false);
          }
          this.state.targetEnemyId = losingToEnemyId;
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte(losingToEnemyId);
          return;
        }

        const bothWin = leftResult === "win" && rightResult === "win";
        const singleWin = (leftResult === "win" && rightResult !== "win") || (rightResult === "win" && leftResult !== "win");

        if (bothWin) {
          const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
          const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
          if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
          if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
          const suffix = this.state.morphUsed
            ? { key: "dialogue.winDualMorphBoth" }
            : { key: "dialogue.winDualBoth" };
          this.finishRound("win", suffix);
          return;
        }

        if (singleWin) {
          const winEnemyId = leftResult === "win" ? "left" : "right";
          this.state.targetEnemyId = winEnemyId;
          const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
          if (target) this.applyDamageToEnemy(target, null, false);
          const suffix = this.state.morphUsed
            ? { key: "dialogue.winDualMorphSingle" }
            : { key: "dialogue.winDualSingle" };
          this.finishRound("win", suffix);
          return;
        }

        this.resolveMomoDraw();
        return;
      }

      const leftResult = compareHands(this.state.selectedHand, this.state.opponentHands.left);
      const rightResult = compareHands(this.state.selectedHand, this.state.opponentHands.right);

      if (leftResult === "loss" && rightResult === "loss") {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startDualQte();
        return;
      }

      const singleLoss = (leftResult === "loss" && rightResult !== "loss") || (rightResult === "loss" && leftResult !== "loss");
      if (singleLoss) {
        const losingToEnemyId = leftResult === "loss" ? "left" : "right";
        const winningOverEnemyId = leftResult === "win" ? "left" : (rightResult === "win" ? "right" : null);
        if (winningOverEnemyId) {
          const wonEnemy = this.state.enemies.find((e) => e.id === winningOverEnemyId && e.alive);
          if (wonEnemy) this.applyDamageToEnemy(wonEnemy, null, false);
        }
        this.state.targetEnemyId = losingToEnemyId;
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte(losingToEnemyId);
        return;
      }

      const bothWin = leftResult === "win" && rightResult === "win";
      const singleWin = (leftResult === "win" && rightResult !== "win") || (rightResult === "win" && leftResult !== "win");

      if (bothWin) {
        const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
        const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
        if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
        if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphBoth" }
          : { key: "dialogue.winDualBoth" };
        this.finishRound("win", suffix);
        return;
      }

      if (singleWin) {
        const winEnemyId = leftResult === "win" ? "left" : "right";
        this.state.targetEnemyId = winEnemyId;
        const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
        if (target) this.applyDamageToEnemy(target, null, false);
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphSingle" }
          : { key: "dialogue.winDualSingle" };
        this.finishRound("win", suffix);
        return;
      }

      this.resolveMomoDraw();
      return;
    }

    if (this.state.hasDualHandSkill) {
      const leftResult = compareHands(this.state.selectedHands.left, this.state.opponentHand);
      const rightResult = compareHands(this.state.selectedHands.right, this.state.opponentHand);

      if (leftResult === "loss" && rightResult === "loss") {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte();
        return;
      }

      const bothWin = leftResult === "win" && rightResult === "win";
      const singleWin = leftResult === "win" || rightResult === "win";

      if (bothWin) {
        const doubleDamage = this.state.playerDamage * 2;
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphDoubleDmg" }
          : { key: "dialogue.winDualDoubleDmg" };
        this.damageEnemy(suffix, false, doubleDamage);
        return;
      }

      if (singleWin) {
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winSingleMorph" }
          : { key: "dialogue.winSingleNormal" };
        this.damageEnemy(suffix, false);
        return;
      }

      this.resolveMomoDraw();
      return;
    }

    const result = compareHands(this.state.selectedHand, this.state.opponentHand);
    if (result === "loss") {
      this.bus.emit("battle:effect", { type: "player-rps-loss" });
      this.bus.emit("sound", { name: "punch" });
      this.startQte();
      return;
    }
    if (result === "win") {
      const suffix = this.state.morphUsed
        ? { key: "dialogue.winSingleMorph" }
        : { key: "dialogue.winSingleNormal" };
      this.damageEnemy(suffix);
      return;
    }

    this.resolveMomoDraw();
  }

  resolveMomoDraw() {
    const profile = this.store.snapshot().profile;
    const momoLvl = profile.skills?.momo || 0;
    if (momoLvl > 0) {
      const procChance = momoLvl * 0.10;
      if (this.random() < procChance) {
        this.battleMomoAttempts = (this.battleMomoAttempts || 0) + 1;
        const aliveEnemies = this.state.enemies.filter((e) => e.alive);
        if (aliveEnemies.length > 0) {
          const target = aliveEnemies[Math.floor(this.random() * aliveEnemies.length)];
          const dodgeRate = this.state.stage?.momoDodgeRate || 0;
          const isDodged = this.random() < dodgeRate;
          const targetName = target.name || "小樂";

          if (isDodged) {
            this.store.recordMomoProc({ success: false, damage: 0 });
            this.bus.emit("battle:effect", {
              type: "enemy-dodge",
              targetId: target.id,
              skill: "momo"
            });
            this.bus.emit("sound", { name: "danger" });
            this.finishRound("draw", {
              key: "dialogue.drawMomoDodge",
              params: { target: targetName, targetId: target.id }
            });
            return;
          }

          const shadowBonus = this.getAllEquipEffects("shadow").reduce((sum, eff) => sum + (eff.momoDamageBonus || 0), 0);
          const momoDamage = SKILLS.momo.damage + shadowBonus;
          target.hp = Math.max(0, target.hp - momoDamage);
          if (target.hp === 0) target.alive = false;
          this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
          this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
          this.battleMomoSuccesses = (this.battleMomoSuccesses || 0) + 1;
          this.battleMomoDamage = (this.battleMomoDamage || 0) + momoDamage;
          this.battleDamageDealt = (this.battleDamageDealt || 0) + momoDamage;
          this.store.recordMomoProc({ success: true, damage: momoDamage });
          this.bus.emit("battle:effect", {
            type: "enemy-hit",
            amount: momoDamage,
            targetId: target.id,
            skill: "momo"
          });
          this.bus.emit("battle:damage-logged", {
            target: "enemy",
            targetId: target.id,
            targetName: target.name,
            amount: momoDamage,
            source: "momo",
            round: this.state?.round || 1,
            actionType: "attack"
          });
          this.bus.emit("sound", { name: "counterRub" });
          this.finishRound("draw", {
            key: "dialogue.drawMomoHit",
            params: { target: targetName, targetId: target.id, damage: momoDamage }
          });
          return;
        }
      }
    }

    this.finishRound("draw", {
      key: "dialogue.drawNormal"
    });
  }

  startQte(targetEnemyId = null) {
    this.state.phase = "qte";
    this.state.isDualQte = false;
    if (targetEnemyId) {
      this.state.targetEnemyId = targetEnemyId;
    }
    this.emitState();
    this.say(
      { key: "dialogue.qteSingleBreak" },
      { key: "dialogue.speakerKohaku" }
    );
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
    this.qte.start({
      length: this.state.stage.qteLength || BATTLE_RULES.qteLength,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? Infinity
    });
  }

  startDualQte() {
    this.state.phase = "qte";
    this.state.isDualQte = true;
    this.state.dualQteResolved = { left: false, right: false };
    this.emitState();
    this.say(
      { key: "dialogue.qteDualBreak" },
      { key: "dialogue.speakerPlatinumKohaku" }
    );
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1.5 * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? 1
    });
  }

  inputQte(directionId, slot = null, declaredAt = null) {
    if (this.state?.phase !== "qte") return false;
    if (this.state.isDualQte) {
      return this.dualQte.input(directionId, slot, declaredAt);
    }
    return this.qte.input(directionId, declaredAt);
  }

  handleDualQteSlotSuccess(slotOrEnemyId) {
    const enemyId = slotOrEnemyId === "left" ? "left" : "right";
    const slot = slotOrEnemyId === "left" ? "left" : "right";
    if (this.state.dualQteResolved && this.state.dualQteResolved[slot]) return;
    if (this.state.dualQteResolved) this.state.dualQteResolved[slot] = true;

    const targetEnemy = this.state.enemies.find((e) => e.id === enemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);
    if (!targetEnemy) return;

    this.applyDamageToEnemy(targetEnemy, null, true);
    this.say(
      {
        key: "dialogue.deflectedSingleAttack",
        params: { target: targetEnemy.name, targetId: targetEnemy.id }
      },
      { key: "dialogue.speakerPlayer" }
    );
    this.emitState();
  }

  resolveQte(result) {
    if (!this.state?.active || this.state.phase !== "qte") return;
    if (result.mode === "dual") {
      const leftSuccess = result.left?.success;
      const rightSuccess = result.right?.success;
      this.battleQteTotal = (this.battleQteTotal || 0) + 2;
      if (leftSuccess) this.battleQteHits = (this.battleQteHits || 0) + 1;
      if (rightSuccess) this.battleQteHits = (this.battleQteHits || 0) + 1;

      if (leftSuccess && !this.state.dualQteResolved?.left) {
        this.handleDualQteSlotSuccess("left");
      }
      if (rightSuccess && !this.state.dualQteResolved?.right) {
        this.handleDualQteSlotSuccess("right");
      }

      let failedCount = 0;
      if (!leftSuccess) failedCount += 1;
      if (!rightSuccess) failedCount += 1;

      if (failedCount > 0) {
        this.damagePlayerForDual(failedCount, {
          key: "dialogue.dualQteMiss"
        });
      } else {
        const counter = getQteCounterNarration(this.state.selectedHand);
        this.state.selectedHand = counter.changedHand;
        this.timers.timeout(() => {
          if (this.state?.active && this.state.phase === "qte") {
            this.finishRound("win", {
              key: "dialogue.dualQteSuccess"
            });
          }
        }, 500);
      }
      return;
    }

    this.battleQteTotal = (this.battleQteTotal || 0) + 1;
    if (result.success) {
      this.battleQteHits = (this.battleQteHits || 0) + 1;
      this.store.recordQteAttempt(this.state?.stage?.id, true);
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.timers.timeout(() => {
        if (this.state?.active && this.state.phase === "qte") {
          this.damageEnemy(counter, true);
        }
      }, 500);
    } else {
      this.store.recordQteAttempt(this.state?.stage?.id, false);
      this.damagePlayer({
        key: "dialogue.qteMiss"
      });
    }
  }

  applyDamageToEnemy(target, damageAmount = null, countered = false) {
    if (!target || !target.alive) return;
    let amount = damageAmount ?? this.state.playerDamage;
    if (countered) {
      amount += this.getAllEquipEffects("thunder").reduce((sum, eff) => sum + (eff.qteBonusDamage || 0), 0);
    } else if (!damageAmount && this.hasEquipEffect("burst")) {
      amount = Math.round(amount * (this.hasEquipEffect("burst")?.winMultiplier || 1.5));
    }

    target.hp = Math.max(0, target.hp - amount);
    this.battleDamageDealt = (this.battleDamageDealt || 0) + amount;
    if (this.state.morphUsed) {
      this.battleMorphDamage = (this.battleMorphDamage || 0) + amount;
      this.store.recordMorphUse({ success: true, damage: amount });
    }
    if (target.hp === 0) target.alive = false;
    this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
    this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;

    const freezeEffects = this.getAllEquipEffects("freeze");
    if (freezeEffects.length > 0) {
      const didFreeze = freezeEffects.some((eff) => this.random() < (eff.freezeChance || 0.3));
      if (didFreeze) {
        const hands = ["rock", "paper", "scissors"];
        const frozenHand = hands[Math.floor(this.random() * hands.length)];
        this.state.frozenEnemyHand = frozenHand;
        this.state.isEnemyFrozen = true;
        const handLabel = HANDS[frozenHand]?.label || "";
        this.bus.emit("battle:effect", {
          type: "freeze",
          frozenHand,
          handLabel,
          handGlyph: HANDS[frozenHand].glyph
        });
        this.say(
          {
            key: "dialogue.freezeNarration",
            params: { hand: handLabel }
          },
          { key: "dialogue.speakerKohaku" }
        );
      }
    }

    this.bus.emit("battle:effect", {
      type: "enemy-hit",
      amount,
      targetId: target.id,
      countered
    });
    let logSource = "rps_win";
    if (countered) logSource = "counter";
    else if (this.state.morphUsed) logSource = "morph";
    else if (!damageAmount && this.hasEquipEffect("burst")) logSource = "burst";

    this.bus.emit("battle:damage-logged", {
      target: "enemy",
      targetId: target.id,
      targetName: target.name,
      amount,
      source: logSource,
      round: this.state?.round || 1,
      actionType: "attack"
    });
    this.bus.emit("sound", { name: countered ? "counterRub" : "hit" });
  }

  dealEnemyDamage(amount) {
    this.damageEnemy({ key: "combat.tookDamage", text: "受到傷害" }, false, amount);
  }

  damageEnemy(messageOrPayload, countered = false, damageAmount = null) {
    const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);

    if (target) {
      this.applyDamageToEnemy(target, damageAmount, countered);
    }
    this.finishRound("win", messageOrPayload);
  }

  damagePlayer(messageOrPayload) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", {
        key: "dialogue.dodgeDodge"
      });
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const isDojo = Boolean(this.state.stage?.isDojo);
    const baseDamage = isDojo
      ? Number(this.state.stage.customDamage ?? 0)
      : (BATTLE_RULES.enemyDamage * multiplier);

    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const totalDamage = baseDamage === 0 ? 0 : Math.max(0, baseDamage - reduction);

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: totalDamage,
      source: "enemy_attack",
      round: this.state?.round || 1,
      actionType: "damaged"
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflectDamage = this.getAllEquipEffects("reflect").reduce((sum, eff) => sum + (eff.reflectDamage || 0), 0);
    if (reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflectDamage);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + reflectDamage;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflectDamage,
          targetId: target.id
        });
        this.bus.emit("battle:damage-logged", {
          target: "enemy",
          targetId: target.id,
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect",
          round: this.state?.round || 1,
          actionType: "reflect"
        });
      }
    }

    this.finishRound("loss", messageOrPayload);
  }

  damagePlayerForDual(count, messageOrPayload) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", {
        key: "dialogue.dodgeDodgeDual"
      });
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const isDojo = Boolean(this.state.stage?.isDojo);
    const baseDamage = isDojo
      ? Number(this.state.stage.customDamage ?? 0)
      : (BATTLE_RULES.enemyDamage * multiplier);

    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const singleDamage = baseDamage === 0 ? 0 : Math.max(0, baseDamage - reduction);
    const totalDamage = singleDamage * count;

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: totalDamage,
      source: "enemy_attack",
      round: this.state?.round || 1,
      actionType: "damaged"
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflectDamage = this.getAllEquipEffects("reflect").reduce((sum, eff) => sum + (eff.reflectDamage || 0), 0);
    if (reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflectDamage);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + reflectDamage;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflectDamage,
          targetId: target.id
        });
        this.bus.emit("battle:damage-logged", {
          target: "enemy",
          targetId: target.id,
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect",
          round: this.state?.round || 1,
          actionType: "reflect"
        });
      }
    }

    this.finishRound("loss", messageOrPayload);
  }

  finishRound(result, messageOrPayload) {
    this.state.phase = "result";
    this.state.lastResult = result;

    // MP Regen effect check
    const totalMpRegen = this.getAllEquipEffects("mp_regen").reduce((sum, eff) => sum + (eff.mpRegen || 0), 0);
    if (totalMpRegen > 0) {
      const before = this.state.playerMp;
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + totalMpRegen);
      const restored = this.state.playerMp - before;
      if (restored > 0) {
        this.bus.emit("battle:damage-logged", {
          target: "player",
          targetNameKey: "dialogue.speakerPlayer",
          targetName: "旅人",
          amount: restored,
          source: "regen_mp",
          round: this.state?.round || 1,
          actionType: "mana",
          resource: "mp"
        });
      }
    }

    // Burn effect check
    const totalBurn = this.getAllEquipEffects("burn").reduce((sum, eff) => sum + (eff.burnDamage || 0), 0);
    if (totalBurn > 0 && this.state.enemyHp > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - totalBurn);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + totalBurn;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
      }
      this.bus.emit("battle:effect", { type: "burn", amount: totalBurn, targetId: target?.id });
      this.bus.emit("battle:damage-logged", {
        target: "enemy",
        targetId: target?.id,
        targetName: target?.name || "小樂",
        amount: totalBurn,
        source: "burn",
        round: this.state?.round || 1,
        actionType: "burn"
      });
    }

    this.emitState(); // Push state ONCE on phase transition!
    const speakerKey = result === "loss" ? "dialogue.speakerKohaku" : "dialogue.speakerNarrator";
    this.say(messageOrPayload, { key: speakerKey });

    if (this.state.enemyHp <= 0) {
      this.timers.timeout(() => this.end(true), 1300);
      return;
    }
    if (this.state.playerHp <= 0) {
      this.timers.timeout(() => this.end(false), 1300);
      return;
    }
    this.timers.timeout(() => this.scheduleRound(), 1550);
  }

  useItem(itemId, declaredAt = null) {
    if (!this.state?.active || this.state.phase === "ended") {
      return {
        ok: false,
        key: "combat.notInBattle",
        message: "目前不在戰鬥中。"
      };
    }
    const item = ITEMS[itemId];
    if (!item) {
      return {
        ok: false,
        key: "combat.itemNotFound",
        message: "找不到這個道具。"
      };
    }

    const valueKey = item.resource === "hp" ? "playerHp" : "playerMp";
    const maxKey = item.resource === "hp" ? "playerMaxHp" : "playerMaxMp";
    if (this.state[valueKey] >= this.state[maxKey]) {
      return {
        ok: false,
        key: "combat.resourceFull",
        params: { resource: item.resource.toUpperCase() },
        message: item.resource.toUpperCase() + " 已經是滿的。"
      };
    }
    if (!this.store.consumeItem(itemId)) {
      return {
        ok: false,
        key: "combat.itemDepleted",
        params: { name: item.shortName },
        message: item.shortName + "已用完。"
      };
    }

    const potionBoost = this.getAllEquipEffects("potion_boost").reduce((sum, eff) => sum + (eff.potionBoost || 0), 0);
    const restoreAmount = item.restore + potionBoost;

    const before = this.state[valueKey];
    this.state[valueKey] = Math.min(this.state[maxKey], before + restoreAmount);
    const restored = this.state[valueKey] - before;

    if (item.resource === "hp") {
      this.battleHpPotionUsed = (this.battleHpPotionUsed || 0) + 1;
      this.battleHpRestored = (this.battleHpRestored || 0) + restored;
    } else {
      this.battleMpPotionUsed = (this.battleMpPotionUsed || 0) + 1;
      this.battleMpRestored = (this.battleMpRestored || 0) + restored;
    }
    this.store.recordPotionUse(item.resource === "hp" ? "hpPotion" : "mpPotion", { restored });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: restored,
      source: item.resource === "hp" ? "heal_hp" : "heal_mp",
      round: this.state?.round || 1,
      actionType: item.resource === "hp" ? "heal" : "mana",
      resource: item.resource
    });
    this.emitState();
    this.bus.emit("battle:effect", { type: "item", resource: item.resource, amount: restored });
    this.bus.emit("sound", { name: "heal" });
    this.say(
      {
        key: "dialogue.itemUsed",
        params: {
          name: item.name || itemId,
          itemId: item.id || itemId,
          restored,
          resource: item.resource.toUpperCase()
        }
      },
      { key: "dialogue.speakerNarrator" }
    );
    return { ok: true, restored, resource: item.resource };
  }

  end(won) {
    if (!this.state?.active) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "ended";
    this.state.won = won;
    const durationSec = Math.max(1, Math.round((this.now() - (this.battleStartTime || this.now())) / 1000));
    const reward = this.store.recordBattle(won, this.state.stage, {
      isAuto: Boolean(this.autoBattle?.active),
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
      hpPotionUsed: this.battleHpPotionUsed || 0,
      mpPotionUsed: this.battleMpPotionUsed || 0,
      hpRestored: this.battleHpRestored || 0,
      mpRestored: this.battleMpRestored || 0,
      momoAttempts: this.battleMomoAttempts || 0,
      momoSuccesses: this.battleMomoSuccesses || 0,
      momoDamage: this.battleMomoDamage || 0,
      morphCount: this.battleMorphCount || 0,
      morphDamage: this.battleMorphDamage || 0,
      qteHits: this.battleQteHits || null,
      qteTotal: this.battleQteTotal || null
    });
    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      combatDps: reward.dps,
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
      seed: this.battleSeed,
      commandLog: [...this.commandLog],
      battle: this.snapshot(),
      autoBattle: { ...this.autoBattle },
      isAuto: Boolean(this.autoBattle?.active)
    });
    this.bus.emit("sound", { name: won ? "victory" : "defeat" });

    if (this.autoBattle.active) {
      this.autoBattle.remainingRounds -= 1;
      if (won) {
        this.autoBattle.wins += 1;
      } else {
        this.autoBattle.losses += 1;
      }
      this.bus.emit("auto-battle:update", { ...this.autoBattle, won });

      if (this.autoBattle.active && this.autoBattle.remainingRounds > 0) {
        if (!this.autoBattle.isPaused) {
          if (this.autoRestartTimerId !== null) {
            this.timers.clearTimeout(this.autoRestartTimerId);
          }
          this.autoRestartTimerId = this.timers.timeout(() => {
            this.autoRestartTimerId = null;
            if (this.autoBattle.active && !this.autoBattle.isPaused && this.autoBattle.remainingRounds > 0) {
              this.start(this.autoBattle.stageId, { autoBattle: true });
            }
          }, 800);
        }
      } else {
        this.autoBattle.active = false;
        this.autoBattle.isPaused = false;
        this.autoBattle.remainingRounds = 0;
        this.bus.emit("auto-battle:finished", { ...this.autoBattle });
      }
    }
  }

  stopAutoBattle() {
    this.autoBattle.active = false;
    this.autoBattle.isPaused = false;
    this.autoBattle.remainingRounds = 0;
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
  }

  abandon() {
    this.stopAutoBattle();
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    if (this.state) {
      this.state.active = false;
      this.state.phase = "abandoned";
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
  }

  clearCountdownClocks() {
    if (this.countdownTimeoutId !== null) {
      this.timers.clearTimeout(this.countdownTimeoutId);
      this.countdownTimeoutId = null;
    }
    if (this.countdownId !== null) {
      this.timers.clearInterval(this.countdownId);
      this.countdownId = null;
    }
    this.beatTimerIds.forEach((id) => this.timers.clearTimeout(id));
    this.beatTimerIds = [];
  }

  clearReactionClocks() {
    if (this.reactionTickId !== null) {
      this.timers.clearInterval(this.reactionTickId);
      this.reactionTickId = null;
    }
    if (this.reactionTimeoutId !== null) {
      this.timers.clearTimeout(this.reactionTimeoutId);
      this.reactionTimeoutId = null;
    }
  }

  stopClocks() {
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
      this.disconnectTimeoutId = null;
    }
    this.clearCountdownClocks();
    this.clearReactionClocks();
    this.timers.clearAll();
  }
}

