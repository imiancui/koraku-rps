import { BATTLE_RULES, ITEMS } from "../config/gameConfig.js";
import { applyExperience, computePlayerStats, xpNeededForLevel } from "../systems/progressionRules.js";

const DEFAULT_SAVE = Object.freeze({
  version: 1,
  profile: {
    level: 1,
    xp: 0,
    skillPoints: 0,
    allocations: { hp: 0, mp: 0, damage: 0 }
  },
  coins: 0,
  inventory: { hpPotion: 1, mpPotion: 0 },
  records: { wins: 0, losses: 0, bestStage: 0 },
  settings: { muted: false }
});

function freshSave() {
  return structuredClone(DEFAULT_SAVE);
}

function sanitizeSave(candidate) {
  if (!candidate || candidate.version !== 1) return freshSave();
  const base = freshSave();
  return {
    ...base,
    ...candidate,
    profile: {
      ...base.profile,
      ...candidate.profile,
      allocations: {
        ...base.profile.allocations,
        ...candidate.profile?.allocations
      }
    },
    inventory: { ...base.inventory, ...candidate.inventory },
    records: { ...base.records, ...candidate.records },
    settings: { ...base.settings, ...candidate.settings }
  };
}

export class GameStore {
  constructor(bus, persistence) {
    this.bus = bus;
    this.persistence = persistence;
    this.state = sanitizeSave(persistence.load());
  }

  snapshot() {
    return structuredClone({
      ...this.state,
      playerStats: computePlayerStats(this.state.profile),
      xpToNext: xpNeededForLevel(this.state.profile.level)
    });
  }

  commit(reason) {
    this.persistence.save(this.state);
    this.bus.emit("store:changed", { reason, state: this.snapshot() });
  }

  buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這件商品。" };
    if (this.state.coins < item.price) {
      return { ok: false, message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventory[itemId] += 1;
    this.commit("purchase");
    return { ok: true, message: "購入「" + item.name + "」！" };
  }

  consumeItem(itemId) {
    if (!ITEMS[itemId] || this.state.inventory[itemId] <= 0) return false;
    this.state.inventory[itemId] -= 1;
    this.commit("consume-item");
    return true;
  }

  allocateStat(stat) {
    if (!Object.hasOwn(this.state.profile.allocations, stat)) {
      return { ok: false, message: "無效的能力項目。" };
    }
    if (this.state.profile.skillPoints <= 0) {
      return { ok: false, message: "目前沒有可用點數。" };
    }
    this.state.profile.skillPoints -= 1;
    this.state.profile.allocations[stat] += 1;
    this.commit("allocate-stat");
    return { ok: true, message: "能力提升了。" };
  }

  recordBattle(won, stage) {
    const reward = {
      coins: won ? BATTLE_RULES.winCoins : BATTLE_RULES.lossCoins,
      xp: won ? stage.xpWin : stage.xpLoss,
      levelsGained: 0
    };
    this.state.coins += reward.coins;
    this.state.records[won ? "wins" : "losses"] += 1;
    if (won) {
      this.state.records.bestStage = Math.max(this.state.records.bestStage, stage.id);
    }
    const gained = applyExperience(this.state.profile, reward.xp);
    this.state.profile = gained.profile;
    reward.levelsGained = gained.levelsGained;
    this.commit("battle-result");
    return reward;
  }

  grantExperience(amount, reason = "bonus-experience") {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (safeAmount === 0) return { xp: 0, levelsGained: 0 };

    const gained = applyExperience(this.state.profile, safeAmount);
    this.state.profile = gained.profile;
    this.commit(reason);
    return { xp: safeAmount, levelsGained: gained.levelsGained };
  }

  toggleMuted() {
    this.state.settings.muted = !this.state.settings.muted;
    this.commit("toggle-muted");
    return this.state.settings.muted;
  }

  reset() {
    this.state = freshSave();
    this.persistence.clear();
    this.commit("reset");
  }
}
