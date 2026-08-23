import { BASE_PLAYER, STAT_GAINS } from "../config/gameConfig.js";

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

export function computePlayerStats(profile) {
  return {
    maxHp: BASE_PLAYER.maxHp + profile.allocations.hp * STAT_GAINS.hp,
    maxMp: BASE_PLAYER.maxMp + profile.allocations.mp * STAT_GAINS.mp,
    damage: BASE_PLAYER.damage + profile.allocations.damage * STAT_GAINS.damage
  };
}
