import { BASE_PLAYER, STAT_GAINS, EQUIPMENT_ITEMS } from "../config/gameConfig.js";

export function xpNeededForLevel(level) {
  return 100 + Math.max(0, level - 1) * 75;
}

export function applyExperience(profile, amount) {
  const next = structuredClone(profile);
  next.xp += amount;
  let levelsGained = 0;

  while (next.xp >= xpNeededForLevel(next.level)) {
    next.xp -= xpNeededForLevel(next.level);
    next.level += 1;
    next.skillPoints += 5;
    levelsGained += 1;
  }

  return { profile: next, levelsGained };
}

export function computePlayerStats(profile, equipment = {}) {
  let bonusHp = 0;
  let bonusMp = 0;
  let bonusDamage = 0;

  if (equipment && typeof equipment === "object") {
    Object.values(equipment).forEach((itemId) => {
      if (!itemId) return;
      const item = EQUIPMENT_ITEMS[itemId];
      if (!item || !item.stats) return;
      bonusHp += item.stats.hp || 0;
      bonusMp += item.stats.mp || 0;
      bonusDamage += item.stats.damage || 0;
    });
  }

  return {
    maxHp: Math.max(1, BASE_PLAYER.maxHp + (profile.allocations?.hp || 0) * STAT_GAINS.hp + bonusHp),
    maxMp: Math.max(0, BASE_PLAYER.maxMp + (profile.allocations?.mp || 0) * STAT_GAINS.mp + bonusMp),
    damage: Math.max(1, BASE_PLAYER.damage + (profile.allocations?.damage || 0) * STAT_GAINS.damage + bonusDamage)
  };
}

