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
    this.bus.on("qte:finished", (result) => this.resolveQte(result));
    this.bus.on("qte:slot-success", ({ slot, enemyId }) => {
      if (this.state?.active && this.state.phase === "qte" && this.state.isDualQte) {
        this.handleDualQteSlotSuccess(enemyId || slot);
      }
    });
  }

  hasEquipEffect(effectType) {
    const snapshot = this.store.snapshot();
    const equipment = snapshot.equipment || {};
    for (const itemId of Object.values(equipment)) {
      if (!itemId) continue;
      const item = EQUIPMENT_ITEMS[itemId];
      if (item?.effect?.type === effectType) {
        return item.effect;
      }
    }
    return null;
  }

  start(stageId) {
    const stage = STAGES.find((item) => item.id === Number(stageId));
    const profile = this.store.snapshot();
    if (!stage || profile.profile.level < stage.requiredLevel) {
      this.bus.emit("toast", { message: "等級尚未達到這一章的挑戰條件。", tone: "danger" });
      return false;
    }

    this.stopClocks();
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
    return this.state ? structuredClone(this.state) : null;
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

    if (isDualStage && aliveEnemies.length >= 2) {
      const leftHand = getRandomHand(this.random);
      const rightHand = getRandomHand(this.random);
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
      const hand = getRandomHand(this.random);
      this.state.opponentHand = hand;
      this.state.opponentHands = { main: hand };
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, hand);
        const rightResult = compareHands(this.state.selectedHands.right, hand);
        // Only if BOTH hands lose does Kohaku win and show winning emoji
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

    let reactionWindowMs = this.state.stage?.reactionWindowMs ?? BATTLE_RULES.reactionWindowMs;
    if (this.state.isEnemyFrozen) {
      reactionWindowMs += 500;
      this.state.isEnemyFrozen = false;
    }
    this.state.reactionRemaining = reactionWindowMs / 1000;

    this.reactionDeadline = performance.now() + reactionWindowMs;
    this.emitState();
    this.bus.emit("sound", { name: "reveal" });

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
    const morphDiscount = this.hasEquipEffect("morph_discount")?.morphDiscount || 0;
    const morphCost = Math.max(10, BATTLE_RULES.morphCost - morphDiscount);

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

        if (leftResult === "loss") {
          if (rightResult === "win") {
            const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
            if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
          }
          this.state.targetEnemyId = "left";
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte("left");
          return;
        }

        if (rightResult === "loss") {
          if (leftResult === "win") {
            const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
            if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
          }
          this.state.targetEnemyId = "right";
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte("right");
          return;
        }

        // No losses on either side
        let anyWin = false;
        if (leftResult === "win") {
          const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
          if (leftEnemy) {
            anyWin = true;
            this.applyDamageToEnemy(leftEnemy, null, false);
          }
        }
        if (rightResult === "win") {
          const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
          if (rightEnemy) {
            anyWin = true;
            this.applyDamageToEnemy(rightEnemy, null, false);
          }
        }

        if (anyWin) {
          this.finishRound("win", this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！");
          return;
        }

        this.resolveMomoDraw();
        return;
      }

      // Single hand vs dual enemy
      const evalResult = evaluateDualRps(
        this.state.selectedHand,
        this.state.opponentHands.left,
        this.state.opponentHands.right
      );

      if (evalResult.isDualLoss) {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startDualQte();
        return;
      }

      if (evalResult.isSingleLoss) {
        const lostEnemyId = evalResult.losses[0];
        const wonEnemyId = evalResult.wins[0];
        if (wonEnemyId) {
          const wonEnemy = this.state.enemies.find((e) => e.id === wonEnemyId && e.alive);
          if (wonEnemy) {
            this.applyDamageToEnemy(wonEnemy, null, false);
          }
        }
        this.state.targetEnemyId = lostEnemyId;
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte(lostEnemyId);
        return;
      }

      // No losses: check wins
      let anyWin = false;
      evalResult.wins.forEach((wonEnemyId) => {
        const wonEnemy = this.state.enemies.find((e) => e.id === wonEnemyId && e.alive);
        if (wonEnemy) {
          anyWin = true;
          this.applyDamageToEnemy(wonEnemy, null, false);
        }
      });

      if (anyWin) {
        this.finishRound("win", this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！");
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

          const shadowBonus = this.hasEquipEffect("shadow")?.momoDamageBonus || 0;
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
    const extraQte = this.hasEquipEffect("qte_time")?.extraQteSeconds || 0;
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
    this.say(I18n.t("dialogue.qteDualBreak"), I18n.t("dialogue.speakerPlatinumKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.hasEquipEffect("qte_time")?.extraQteSeconds || 0;
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1.5 * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? 1
    });
  }

  inputQte(directionId, slot = null) {
    if (this.state?.phase !== "qte") return false;
    if (this.state.isDualQte) {
      if (slot === "left") return this.dualQte.inputLeft(directionId);
      if (slot === "right") return this.dualQte.inputRight(directionId);
      if (this.dualQte.left.completed) return this.dualQte.inputRight(directionId);
      return this.dualQte.inputLeft(directionId);
    }
    return this.qte.input(directionId);
  }

  handleDualQteSlotSuccess(enemyId) {
    if (!this.state?.active || !this.state.isDualQte) return;
    if (this.state.dualQteResolved?.[enemyId]) return;
    this.state.dualQteResolved[enemyId] = true;

    const target = this.state.enemies.find((e) => e.id === enemyId && e.alive);
    if (target) {
      this.applyDamageToEnemy(target, null, true);
    }
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
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.damageEnemy(counter.text, true);
    } else {
      this.damagePlayer("節奏慢了一拍，小樂的攻勢命中了你。");
    }
  }

  applyDamageToEnemy(target, damageAmount = null, countered = false) {
    if (!target || !target.alive) return;
    let amount = damageAmount ?? this.state.playerDamage;
    if (countered) {
      amount += (this.hasEquipEffect("thunder")?.qteBonusDamage || 0);
    } else if (!damageAmount && this.hasEquipEffect("burst")) {
      amount = Math.round(amount * (this.hasEquipEffect("burst")?.winMultiplier || 1.5));
    }

    target.hp = Math.max(0, target.hp - amount);
    if (target.hp === 0) target.alive = false;
    this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
    this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;

    const freeze = this.hasEquipEffect("freeze");
    if (freeze && this.random() < (freeze.freezeChance || 0.3)) {
      this.state.isEnemyFrozen = true;
      this.bus.emit("battle:effect", { type: "freeze" });
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
    const shield = this.hasEquipEffect("shield");
    const armor = this.hasEquipEffect("armor_reduction");
    const reduction = (shield ? (shield.damageReduction || 0) : 0) + (armor ? (armor.damageReduction || 0) : 0);
    const totalDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflect = this.hasEquipEffect("reflect");
    if (reflect && reflect.reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflect.reflectDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflect.reflectDamage,
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
    const shield = this.hasEquipEffect("shield");
    const armor = this.hasEquipEffect("armor_reduction");
    const reduction = (shield ? (shield.damageReduction || 0) : 0) + (armor ? (armor.damageReduction || 0) : 0);
    const singleDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);
    const totalDamage = singleDamage * count;

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflect = this.hasEquipEffect("reflect");
    if (reflect && reflect.reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflect.reflectDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflect.reflectDamage,
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
    const mpRegen = this.hasEquipEffect("mp_regen")?.mpRegen || 0;
    if (mpRegen > 0) {
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + mpRegen);
    }

    // Burn effect check
    const burn = this.hasEquipEffect("burn");
    if (burn && this.state.enemyHp > 0) {
      const burnDamage = burn.burnDamage || 30;
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - burnDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
      }
      this.bus.emit("battle:effect", { type: "burn", amount: burnDamage, targetId: target?.id });
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

    const potionBoost = this.hasEquipEffect("potion_boost")?.potionBoost || 0;
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
    const reward = this.store.recordBattle(won, this.state.stage);
    this.emitState();
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      battle: this.snapshot()
    });
    this.bus.emit("sound", { name: won ? "victory" : "defeat" });
  }

  abandon() {
    if (!this.state) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "abandoned";
    this.emitState();
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
    this.timers.clearAll();
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
  }
}
