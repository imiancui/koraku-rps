import { ASSETS, BATTLE_RULES, HANDS, ITEMS, SKILLS, STAGES, EQUIPMENT_ITEMS } from "../config/gameConfig.js";
import { I18n } from "../services/I18n.js";
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
  constructor(bus, store, random = Math.random) {
    this.bus = bus;
    this.store = store;
    this.random = random;
    this.timers = new TimerRegistry();
    this.qte = new QTESystem(bus, this.timers, random);
    this.dualQte = new DualQTESystem(bus, this.timers, random);
    this.state = null;
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
    this.autoRestartTimerId = null;
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
    const stage = STAGES.find((item) => item.id === Number(stageId));
    const profile = this.store.snapshot();
    if (!stage || profile.profile.level < stage.requiredLevel) {
      this.bus.emit("toast", { message: "等級尚未達到這一章的挑戰條件。", tone: "danger" });
      return false;
    }

    if (options.autoBattle) {
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
    this.battleStartTime = Date.now();
    this.battleDamageDealt = 0;
    this.battleDamageTaken = 0;
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
      isEnemyFrozen: false,
      frozenEnemyHand: null,
      isPaused: false,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(
      stage.final ? I18n.t("dialogue.introFinal") : I18n.t("dialogue.introNormal"),
      I18n.t("dialogue.speakerKohaku")
    );
    this.scheduleRound();
    return true;
  }

  startAutoBattle(stageId, rounds = 10) {
    return this.start(stageId, { autoBattle: true, autoBattleRounds: rounds });
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

    if (this.state?.active) {
      if (this.state.phase === "countdown") {
        this.runAutoBattleCountdown();
      } else if (this.state.phase === "qte") {
        this.runAutoQte();
      }
    } else if (this.autoBattle.remainingRounds > 0) {
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
    if (!this.state?.active || this.state.phase === "ended" || this.state.isPaused) return;
    this.state.isPaused = true;
    if (this.state.phase === "countdown") {
      this.countdownRemainingMs = Math.max(0, (this.countdownDeadline || 0) - performance.now());
      if (this.countdownId !== null) {
        this.timers.clearInterval(this.countdownId);
        this.countdownId = null;
      }
    } else if (this.state.phase === "reaction") {
      this.reactionRemainingMs = Math.max(0, (this.reactionDeadline || 0) - performance.now());
      this.clearReactionClocks();
    } else if (this.state.phase === "qte") {
      if (this.state.isDualQte) {
        this.dualQte.pause();
      } else {
        this.qte.pause();
      }
    }
    this.emitState();
  }

  resume() {
    if (!this.state?.active || this.state.phase === "ended" || !this.state.isPaused) return;
    this.state.isPaused = false;
    if (this.state.phase === "countdown") {
      const remainingMs = this.countdownRemainingMs ?? 1000;
      this.countdownDeadline = performance.now() + remainingMs;
      this.countdownId = this.timers.interval(() => {
        const remaining = Math.max(0, this.countdownDeadline - performance.now());
        const currentCount = Math.ceil(remaining / 1000);
        this.state.countdown = currentCount;

        if (currentCount === 3 && this.state.lastChant !== 3) {
          this.state.lastChant = 3;
          const chant = I18n.t("dialogue.chant3");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 3, word: chant });
        } else if (currentCount === 2 && this.state.lastChant !== 2) {
          this.state.lastChant = 2;
          const chant = I18n.t("dialogue.chant2");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 2, word: chant });
        } else if (currentCount === 1 && this.state.lastChant !== 1) {
          this.state.lastChant = 1;
          const chant = I18n.t("dialogue.chant1");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 1, word: chant });
        }

        this.emitState();
        if (remaining <= 0) this.revealHands();
      }, 80);
    } else if (this.state.phase === "reaction") {
      const remainingMs = this.reactionRemainingMs ?? 500;
      this.reactionDeadline = performance.now() + remainingMs;
      this.reactionTickId = this.timers.interval(() => {
        this.state.reactionRemaining = Math.max(0, (this.reactionDeadline - performance.now()) / 1000);
        this.emitState();
      }, 40);
      this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), remainingMs);
    } else if (this.state.phase === "qte") {
      if (this.state.isDualQte) {
        this.dualQte.resume();
      } else {
        this.qte.resume();
      }
    }
    this.emitState();
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
    return this.state
      ? {
          ...structuredClone(this.state),
          autoBattle: { ...this.autoBattle }
        }
      : null;
  }

  emitState() {
    this.bus.emit("battle:state", this.snapshot());
  }

  say(text, speaker = null) {
    this.bus.emit("dialogue", { speaker: speaker || I18n.t("dialogue.speakerKohaku"), text });
  }

  scheduleRound() {
    if (!this.state?.active) return;
    const roundSeconds = this.state.stage.roundSeconds || BATTLE_RULES.roundSeconds;
    this.state.round += 1;
    this.state.phase = "countdown";
    this.state.opponentHand = null;
    this.state.enemyWinningEmoji = null;
    this.state.countdown = roundSeconds;
    this.state.reactionRemaining = 0;
    this.state.morphUsed = false;
    this.state.lastChant = null;
    this.state.isPaused = false;
    this.countdownDeadline = performance.now() + roundSeconds * 1000;
    this.emitState();

    if (this.autoBattle.active) {
      this.runAutoBattleCountdown();
    }

    this.countdownId = this.timers.interval(() => {
      const remaining = Math.max(0, this.countdownDeadline - performance.now());
      const currentCount = Math.ceil(remaining / 1000);
      this.state.countdown = currentCount;

      if (currentCount === 3 && this.state.lastChant !== 3) {
        this.state.lastChant = 3;
        const chant = I18n.t("dialogue.chant3");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 3, word: chant });
      } else if (currentCount === 2 && this.state.lastChant !== 2) {
        this.state.lastChant = 2;
        const chant = I18n.t("dialogue.chant2");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 2, word: chant });
      } else if (currentCount === 1 && this.state.lastChant !== 1) {
        this.state.lastChant = 1;
        const chant = I18n.t("dialogue.chant1");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 1, word: chant });
      }

      this.emitState();
      if (remaining <= 0) this.revealHands();
    }, 80);
  }

  runAutoBattleCountdown() {
    if (!this.state?.active || !this.autoBattle.active || this.autoBattle.isPaused || this.state.phase !== "countdown") return;
    this.timers.timeout(() => {
      if (!this.state?.active || !this.autoBattle.active || this.autoBattle.isPaused || this.state.phase !== "countdown") return;

      const frozen = this.state.frozenEnemyHand;
      const hands = ["rock", "paper", "scissors"];
      let leftHand = "rock";
      let rightHand = "scissors";

      if (frozen === "scissors") {
        leftHand = "paper";
        rightHand = "rock";
      } else if (frozen === "rock") {
        leftHand = "scissors";
        rightHand = "paper";
      } else if (frozen === "paper") {
        leftHand = "rock";
        rightHand = "scissors";
      } else {
        leftHand = hands[Math.floor(this.random() * hands.length)];
        rightHand = hands[(hands.indexOf(leftHand) + 1) % 3];
      }

      if (this.state.hasDualHandSkill) {
        this.selectHand(leftHand, "left");
        this.selectHand(rightHand, "right");
      } else {
        this.selectHand(leftHand);
      }
    }, 200);
  }

  selectHand(handId, slot = null) {
    if (!this.state?.active || this.state.phase !== "countdown" || !HANDS[handId]) return;
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
  }

  revealHands() {
    if (!this.state?.active || this.state.phase !== "countdown") return;
    if (this.countdownId !== null) {
      this.timers.clearInterval(this.countdownId);
      this.countdownId = null;
    }
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

    this.reactionDeadline = performance.now() + reactionWindowMs;
    this.emitState();
    this.bus.emit("sound", { name: "reveal" });

    if (this.autoBattle.active && this.state.enemyWinningEmoji && this.state.playerMp >= 25) {
      this.timers.timeout(() => {
        if (this.state?.phase === "reaction") this.useMorph();
      }, 100);
    }

    this.reactionTickId = this.timers.interval(() => {
      this.state.reactionRemaining = Math.max(0, (this.reactionDeadline - performance.now()) / 1000);
      this.emitState();
    }, 40);
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), reactionWindowMs);
  }

  useMorph() {
    if (!this.state?.active || this.state.phase !== "reaction") {
      return { ok: false, message: "變拳只能在看見小樂出拳後的反應時間內使用。" };
    }
    const totalDiscount = this.getAllEquipEffects("morph_discount").reduce((sum, eff) => sum + (eff.morphDiscount || 0), 0);
    const morphCost = Math.max(5, BATTLE_RULES.morphCost - totalDiscount);

    if (this.state.playerMp < morphCost) {
      return { ok: false, message: "MP 不足，無法使用變拳。" };
    }
    this.clearReactionClocks();
    this.state.playerMp -= morphCost;

    if (this.state.opponentHands?.left && this.state.opponentHands?.right) {
      if (this.state.hasDualHandSkill) {
        this.state.selectedHands.left = getCounterHand(this.state.opponentHands.left);
        this.state.selectedHands.right = getCounterHand(this.state.opponentHands.right);
        this.state.selectedHand = this.state.selectedHands.left;
      } else {
        const targetEnemy = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive);
        const targetOpponentHand = targetEnemy?.id === "right" ? this.state.opponentHands.right : this.state.opponentHands.left;
        this.state.selectedHand = getCounterHand(targetOpponentHand);
        this.state.selectedHands.left = this.state.selectedHand;
        this.state.selectedHands.right = this.state.selectedHand;
      }
    } else {
      const counter = getCounterHand(this.state.opponentHand);
      this.state.selectedHand = counter;
      this.state.selectedHands.left = counter;
      this.state.selectedHands.right = counter;
    }

    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.reactionRemaining = 0;
    this.store.recordMorphUse();
    this.emitState();
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say(I18n.t("dialogue.morphReaction"), I18n.t("dialogue.speakerKohaku"));
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), 320);
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
          const suffix = this.state.morphUsed ? "雙手變拳齊出，完美破除雙生合擊！" : "雙手同時獲勝，漂亮破除雙生合擊！";
          this.finishRound("win", suffix);
          return;
        }

        if (singleWin) {
          const winEnemyId = leftResult === "win" ? "left" : "right";
          this.state.targetEnemyId = winEnemyId;
          const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
          if (target) this.applyDamageToEnemy(target, null, false);
          const suffix = this.state.morphUsed ? "變拳擊破一手，成功壓制！" : "單手獲勝，成功壓制一手！";
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
        const suffix = this.state.morphUsed ? "變拳齊出，一併壓制雙生小樂！" : "雙拳齊勝，完美克制雙生小樂！";
        this.finishRound("win", suffix);
        return;
      }

      if (singleWin) {
        const winEnemyId = leftResult === "win" ? "left" : "right";
        this.state.targetEnemyId = winEnemyId;
        const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
        if (target) this.applyDamageToEnemy(target, null, false);
        const suffix = this.state.morphUsed ? "變拳奏效，成功壓制一手！" : "單手壓制，削弱了雙生陣勢！";
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
        const suffix = this.state.morphUsed ? "雙手變拳齊出，造成雙倍壓制傷害！" : "雙手同時獲勝，造成雙倍壓制傷害！";
        this.damageEnemy(suffix, false, doubleDamage);
        return;
      }

      if (singleWin) {
        const suffix = this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！";
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
      const suffix = this.state.morphUsed ? "變拳奏效，這一手由你拿下！" : "漂亮地壓過了小樂的手勢！";
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
        const aliveEnemies = this.state.enemies.filter((e) => e.alive);
        if (aliveEnemies.length > 0) {
          const target = aliveEnemies[Math.floor(this.random() * aliveEnemies.length)];
          const dodgeRate = this.state.stage?.momoDodgeRate || 0;
          const isDodged = this.random() < dodgeRate;
          if (isDodged) {
            this.bus.emit("battle:effect", {
              type: "enemy-dodge",
              targetId: target.id,
              skill: "momo"
            });
            this.bus.emit("sound", { name: "danger" });
            this.finishRound("draw", "平手！你試圖偷摸" + target.name + "，但被她敏捷地閃開了！");
            return;
          }

          const shadowBonus = this.getAllEquipEffects("shadow").reduce((sum, eff) => sum + (eff.momoDamageBonus || 0), 0);
          const momoDamage = SKILLS.momo.damage + shadowBonus;
          target.hp = Math.max(0, target.hp - momoDamage);
          if (target.hp === 0) target.alive = false;
          this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
          this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
          this.bus.emit("battle:effect", {
            type: "enemy-hit",
            amount: momoDamage,
            targetId: target.id,
            skill: "momo"
          });
          this.bus.emit("sound", { name: "counterRub" });
          this.finishRound("draw", "平手！但你偷摸了" + target.name + "一下，造成 " + momoDamage + " 點傷害！");
          return;
        }
      }
    }

    this.finishRound("draw", "同樣的手勢在空中碰上了——平手。");
  }

  startQte(targetEnemyId = null) {
    this.state.phase = "qte";
    this.state.isDualQte = false;
    if (targetEnemyId) {
      this.state.targetEnemyId = targetEnemyId;
    }
    this.emitState();
    this.say(I18n.t("dialogue.qteSingleBreak"), I18n.t("dialogue.speakerKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
    this.qte.start({
      length: this.state.stage.qteLength || BATTLE_RULES.qteLength,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? Infinity
    });

    if (this.autoBattle.active) {
      this.runAutoQte();
    }
  }

  startDualQte() {
    this.state.phase = "qte";
    this.state.isDualQte = true;
    this.state.dualQteResolved = { left: false, right: false };
    this.emitState();
    this.say(I18n.t("dialogue.qteDualBreak"), I18n.t("dialogue.speakerPlatinumKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1.5 * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? 1
    });

    if (this.autoBattle.active) {
      this.runAutoQte();
    }
  }

  runAutoQte() {
    if (!this.state?.active || !this.autoBattle.active || this.autoBattle.isPaused || this.state.phase !== "qte") return;
    this.timers.timeout(() => {
      if (!this.state?.active || !this.autoBattle.active || this.autoBattle.isPaused || this.state.phase !== "qte") return;
      if (this.state.isDualQte) {
        this.dualQte.finish();
      } else {
        this.qte.finish(true);
      }
    }, 250);
  }

  inputQte(directionId, slot = null) {
    if (this.state?.phase !== "qte") return false;
    if (this.state.isDualQte) {
      return this.dualQte.input(directionId, slot);
    }
    return this.qte.input(directionId);
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
    this.say(`化解了${targetEnemy.name}的單側攻勢！`, "你");
    this.emitState();
  }

  resolveQte(result) {
    if (!this.state?.active || this.state.phase !== "qte") return;
    if (result.mode === "dual") {
      const leftSuccess = result.left?.success;
      const rightSuccess = result.right?.success;

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
        this.damagePlayerForDual(failedCount, "未能防住全部攻勢，受到反擊！");
      } else {
        const counter = getQteCounterNarration(this.state.selectedHand);
        this.state.selectedHand = counter.changedHand;
        this.finishRound("win", "雙重反制成功！完美化解了雙生攻勢！");
      }
      return;
    }

    if (result.success) {
      this.store.recordQteAttempt(this.state?.stage?.id, true);
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.damageEnemy(counter.text, true);
    } else {
      this.store.recordQteAttempt(this.state?.stage?.id, false);
      this.damagePlayer("節奏慢了一拍，小樂的攻勢命中了你。");
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
        this.bus.emit("battle:effect", {
          type: "freeze",
          frozenHand,
          handLabel: HANDS[frozenHand].label,
          handGlyph: HANDS[frozenHand].glyph
        });
        this.say(`❄️ 霜月冰結！小樂的手掌被凍結，下一回合無法出【${HANDS[frozenHand].label}】！`, "小樂");
      }
    }

    this.bus.emit("battle:effect", {
      type: "enemy-hit",
      amount,
      targetId: target.id,
      countered
    });
    this.bus.emit("sound", { name: countered ? "counterRub" : "hit" });
  }

  dealEnemyDamage(amount) {
    this.damageEnemy("受到傷害", false, amount);
  }

  damageEnemy(message, countered = false, damageAmount = null) {
    const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);

    if (target) {
      this.applyDamageToEnemy(target, damageAmount, countered);
    }
    this.finishRound("win", message);
  }

  damagePlayer(message) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", "殘影閃避！你藉由幻影羽織化解了攻勢！");
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const totalDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
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
      }
    }

    this.finishRound("loss", message);
  }

  damagePlayerForDual(count, message) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", "殘影閃避！你藉由幻影羽織化解了雙生攻勢！");
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const singleDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);
    const totalDamage = singleDamage * count;

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
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
      }
    }

    this.finishRound("loss", message);
  }

  finishRound(result, message) {
    this.state.phase = "result";
    this.state.lastResult = result;

    // MP Regen effect check
    const totalMpRegen = this.getAllEquipEffects("mp_regen").reduce((sum, eff) => sum + (eff.mpRegen || 0), 0);
    if (totalMpRegen > 0) {
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + totalMpRegen);
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
    }

    this.emitState();
    this.say(message, result === "loss" ? I18n.t("dialogue.speakerKohaku") : I18n.t("dialogue.speakerNarrator"));

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

  useItem(itemId) {
    if (!this.state?.active || this.state.phase === "ended") {
      return { ok: false, message: "目前不在戰鬥中。" };
    }
    const item = ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這個道具。" };

    const valueKey = item.resource === "hp" ? "playerHp" : "playerMp";
    const maxKey = item.resource === "hp" ? "playerMaxHp" : "playerMaxMp";
    if (this.state[valueKey] >= this.state[maxKey]) {
      return { ok: false, message: item.resource.toUpperCase() + " 已經是滿的。" };
    }
    if (!this.store.consumeItem(itemId)) {
      return { ok: false, message: item.shortName + "已用完。" };
    }
    this.store.recordPotionUse(item.resource === "hp" ? "hpPotion" : "mpPotion");

    const potionBoost = this.getAllEquipEffects("potion_boost").reduce((sum, eff) => sum + (eff.potionBoost || 0), 0);
    const restoreAmount = item.restore + potionBoost;

    const before = this.state[valueKey];
    this.state[valueKey] = Math.min(this.state[maxKey], before + restoreAmount);
    const restored = this.state[valueKey] - before;
    this.emitState();
    this.bus.emit("battle:effect", { type: "item", resource: item.resource, amount: restored });
    this.bus.emit("sound", { name: "heal" });
    const locItem = I18n.getLocalizedItem(item);
    this.say(
      I18n.t("dialogue.itemUsed", {
        name: locItem.name,
        restored,
        resource: item.resource.toUpperCase()
      }),
      I18n.t("dialogue.speakerNarrator")
    );
    return { ok: true };
  }

  end(won) {
    if (!this.state?.active) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "ended";
    this.state.won = won;
    const durationSec = Math.max(1, Math.round((Date.now() - (this.battleStartTime || Date.now())) / 1000));
    const reward = this.store.recordBattle(won, this.state.stage, {
      isAuto: Boolean(this.autoBattle?.active),
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec
    });
    this.emitState();
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      combatDps: reward.dps,
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
      battle: this.snapshot(),
      autoBattle: { ...this.autoBattle }
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
    this.timers.clearAll();
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
  }
}
