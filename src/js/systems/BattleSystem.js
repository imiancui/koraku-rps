import { ASSETS, BATTLE_RULES, HANDS, ITEMS, STAGES } from "../config/gameConfig.js";
import { TimerRegistry } from "../core/TimerRegistry.js";
import { QTESystem } from "./QTESystem.js";
import {
  compareHands,
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
    this.state = null;
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
    this.bus.on("qte:finished", (result) => this.resolveQte(result));
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
      enemyHp: stage.enemyHp,
      enemyMaxHp: stage.enemyHp,
      selectedHand: "rock",
      opponentHand: null,
      countdown: BATTLE_RULES.roundSeconds,
      reactionRemaining: 0,
      morphUsed: false,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(stage.final ? "鏡中的我，可不會手下留情。" : "五秒一決。讓我看看你的決心吧。");
    this.scheduleRound();
    return true;
  }

  snapshot() {
    return this.state ? structuredClone(this.state) : null;
  }

  emitState() {
    this.bus.emit("battle:state", this.snapshot());
  }

  say(text, speaker = "小樂") {
    this.bus.emit("dialogue", { speaker, text });
  }

  scheduleRound() {
    if (!this.state?.active) return;
    this.state.round += 1;
    this.state.phase = "countdown";
    this.state.opponentHand = null;
    this.state.countdown = BATTLE_RULES.roundSeconds;
    this.state.reactionRemaining = 0;
    this.state.morphUsed = false;
    const deadline = performance.now() + BATTLE_RULES.roundSeconds * 1000;
    this.emitState();

    this.countdownId = this.timers.interval(() => {
      const remaining = Math.max(0, deadline - performance.now());
      this.state.countdown = Math.ceil(remaining / 1000);
      this.emitState();
      if (remaining <= 0) this.revealHands();
    }, 80);
  }

  selectHand(handId) {
    if (!this.state?.active || this.state.phase !== "countdown" || !HANDS[handId]) return;
    this.state.selectedHand = handId;
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
    this.state.opponentHand = getRandomHand(this.random);
    this.state.reactionRemaining = 1;
    const deadline = performance.now() + BATTLE_RULES.reactionWindowMs;
    this.emitState();
    this.bus.emit("sound", { name: "reveal" });

    this.reactionTickId = this.timers.interval(() => {
      this.state.reactionRemaining = Math.max(0, (deadline - performance.now()) / 1000);
      this.emitState();
    }, 40);
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), BATTLE_RULES.reactionWindowMs);
  }

  useMorph() {
    if (!this.state?.active || this.state.phase !== "reaction") {
      return { ok: false, message: "變拳只能在看見小樂出拳後的一秒內使用。" };
    }
    if (this.state.playerMp < BATTLE_RULES.morphCost) {
      return { ok: false, message: "MP 不足，無法使用變拳。" };
    }
    this.clearReactionClocks();
    this.state.playerMp -= BATTLE_RULES.morphCost;
    this.state.selectedHand = getCounterHand(this.state.opponentHand);
    this.state.morphUsed = true;
    this.state.reactionRemaining = 0;
    this.emitState();
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say("咦……在最後一瞬間變拳了？", "小樂");
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), 320);
    return { ok: true };
  }

  resolveRound() {
    if (!this.state?.active || this.state.phase !== "reaction") return;
    this.clearReactionClocks();
    const result = compareHands(this.state.selectedHand, this.state.opponentHand);
    if (result === "loss") {
      this.startQte();
      return;
    }
    if (result === "win") {
      const suffix = this.state.morphUsed ? "變拳奏效，這一手由你拿下！" : "漂亮地壓過了小樂的手勢！";
      this.damageEnemy(suffix);
      return;
    }
    this.finishRound("draw", "同樣的手勢在空中碰上了——平手。");
  }

  startQte() {
    this.state.phase = "qte";
    this.emitState();
    this.say("抓到破綻了！想躲開的話，就跟上我的節奏！", "小樂");
    this.bus.emit("sound", { name: "danger" });
    this.qte.start(BATTLE_RULES.qteLength, BATTLE_RULES.qteSeconds * 1000);
  }

  inputQte(directionId) {
    if (this.state?.phase !== "qte") return false;
    return this.qte.input(directionId);
  }

  resolveQte({ success }) {
    if (!this.state?.active || this.state.phase !== "qte") return;
    if (success) {
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.damageEnemy(counter.text, true);
    } else {
      this.damagePlayer("節奏慢了一拍，小樂的攻勢命中了你。");
    }
  }

  damageEnemy(message, countered = false) {
    this.state.enemyHp = Math.max(0, this.state.enemyHp - this.state.playerDamage);
    this.bus.emit("battle:effect", {
      type: "enemy-hit",
      amount: this.state.playerDamage,
      countered
    });
    this.bus.emit("sound", { name: "hit" });
    this.finishRound("win", message);
  }

  damagePlayer(message) {
    this.state.playerHp = Math.max(0, this.state.playerHp - BATTLE_RULES.enemyDamage);
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: BATTLE_RULES.enemyDamage
    });
    this.bus.emit("sound", { name: "hurt" });
    this.finishRound("loss", message);
  }

  finishRound(result, message) {
    this.state.phase = "result";
    this.state.lastResult = result;
    this.emitState();
    this.say(message, result === "loss" ? "小樂" : "旁白");

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

    const before = this.state[valueKey];
    this.state[valueKey] = Math.min(this.state[maxKey], before + item.restore);
    const restored = this.state[valueKey] - before;
    this.emitState();
    this.bus.emit("battle:effect", { type: "item", resource: item.resource, amount: restored });
    this.bus.emit("sound", { name: "heal" });
    this.say("使用「" + item.name + "」，恢復了 " + restored + " 點 " + item.resource.toUpperCase() + "。", "旁白");
    return { ok: true };
  }

  end(won) {
    if (!this.state?.active) return;
    this.qte.stop();
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
