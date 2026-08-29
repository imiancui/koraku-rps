import { ASSETS } from "../config/gameConfig.js";

export class PostBattleSystem {
  constructor(bus, store, random = Math.random) {
    this.bus = bus;
    this.store = store;
    this.random = random;
    this.state = null;
  }

  open(result) {
    this.state = {
      ...result,
      scene: result.won ? "victory" : "defeat",
      appearance: result.won
        ? (result.stage.final ? ASSETS.final : ASSETS.default)
        : ASSETS.defeat,
      target: 0,
      tolerance: 0.13,
      strikeStartedAt: 0,
      strikeDuration: 1800,
      watermelon: {
        attempts: 0,
        maxAttempts: 3,
        successes: 0,
        lastCutSuccess: null,
        rewardXp: 0,
        levelsGained: 0
      }
    };
    this.emit();
    if (result.won) {
      this.say("這次是你贏了。要把勝利用在什麼願望上呢？");
    } else {
      this.say("還有什麼要說的嗎？回去再練練吧！");
    }
  }

  requestSwimsuit() {
    if (!this.state?.won) return;
    this.store?.unlockSwimsuit?.();
    this.state.scene = "swimsuit";
    this.state.appearance = ASSETS.swimsuit;
    this.emit();
    this.say("泳裝？真拿你沒辦法……只准看一下喔。");
  }

  startWatermelon() {
    if (
      !this.state?.won ||
      !["swimsuit", "watermelonResult"].includes(this.state.scene) ||
      this.state.watermelon.attempts >= this.state.watermelon.maxAttempts
    ) return;
    const successes = this.state.watermelon.successes;
    this.state.tolerance = 0.13 * (0.5 ** successes);
    this.state.strikeDuration = 1800 / (1.25 ** successes);
    this.state.scene = "watermelonAim";
    this.state.appearance = ASSETS.swimsuit;
    const minTarget = this.state.tolerance + 0.05;
    const maxTarget = 1 - this.state.tolerance - 0.05;
    this.state.target = minTarget + this.random() * Math.max(0.1, maxTarget - minTarget);
    this.state.strikeStartedAt = performance.now();
    this.emit();
    const nextAttempt = this.state.watermelon.attempts + 1;
    this.say("第 " + nextAttempt + " 刀。白色指針進入綠色區域時，就喊『就是現在！』！");
  }

  strike() {
    if (this.state?.scene !== "watermelonAim") return;
    const marker = this.getMarkerPosition();
    const distance = Math.abs(marker - this.state.target);
    const tolerance = this.state.tolerance ?? (0.13 * (0.5 ** this.state.watermelon.successes));
    const success = distance <= tolerance;
    this.state.watermelon.attempts += 1;
    this.state.watermelon.lastCutSuccess = success;
    if (success) this.state.watermelon.successes += 1;
    this.state.appearance = success ? ASSETS.watermelon : ASSETS.swimsuit;

    if (this.state.watermelon.attempts >= this.state.watermelon.maxAttempts) {
      this.settleWatermelon();
      return;
    }

    this.state.scene = "watermelonResult";
    this.emit();
    this.bus.emit("sound", { name: success ? "victory" : "hurt" });
    if (success) {
      this.say("漂亮！這一刀切中了。還有 " + (this.state.watermelon.maxAttempts - this.state.watermelon.attempts) + " 刀。");
    } else {
      this.say("差一點點！還有 " + (this.state.watermelon.maxAttempts - this.state.watermelon.attempts) + " 刀，下一次再來。");
    }
  }

  settleWatermelon() {
    const watermelon = this.state.watermelon;
    const earned = this.store.grantExperience(watermelon.successes * 100, "watermelon-reward");
    watermelon.rewardXp = earned.xp;
    watermelon.levelsGained = earned.levelsGained;
    this.state.scene = "watermelonComplete";
    this.emit();
    this.bus.emit("sound", { name: watermelon.successes ? "victory" : "defeat" });
    if (watermelon.successes > 0) {
      this.say("三刀都結束了！切中 " + watermelon.successes + " 次，真是有趣呢！");
    } else {
      this.say("三刀都結束了。下次再一起抓準時機吧。");
    }
  }

  getMarkerPosition(now = performance.now()) {
    if (!this.state?.strikeStartedAt) return 0;
    const elapsed = (now - this.state.strikeStartedAt) % this.state.strikeDuration;
    const normalized = elapsed / this.state.strikeDuration;
    return normalized <= 0.5 ? normalized * 2 : (1 - normalized) * 2;
  }

  say(text) {
    this.bus.emit("dialogue", { speaker: "小樂", text });
  }

  emit() {
    this.bus.emit("postbattle:state", structuredClone(this.state));
  }
}
