import { BATTLE_RULES, ITEMS, SKILLS, EQUIPMENT_ITEMS, EQUIPMENT_SLOTS } from "../config/gameConfig.js";
import { applyExperience, computePlayerStats, xpNeededForLevel } from "../systems/progressionRules.js";

const DEFAULT_SAVE = Object.freeze({
  version: 1,
  profile: {
    level: 1,
    xp: 0,
    skillPoints: 0,
    allocations: { hp: 0, mp: 0, damage: 0 },
    skills: { momo: 0, dualHand: 0 }
  },
  coins: 0,
  inventory: { hpPotion: 1, mpPotion: 0 },
  equipment: {
    head: null,
    shoulders: null,
    chest: null,
    belt: null,
    boots: null,
    mainHand: null,
    offHand: null,
    ring1: null,
    ring2: null,
    earring1: null,
    earring2: null,
    badge: null
  },
  inventoryEquipment: [],
  records: {
    wins: 0,
    losses: 0,
    bestStage: 0,
    unlockedSwimsuit: false,
    clearedStages: [],
    totalCoinsEarned: 0,
    totalXpEarned: 0,
    totalBattles: 0,
    manualWins: 0,
    manualLosses: 0,
    autoWins: 0,
    autoLosses: 0,
    watermelonSlices: 0,
    consumablesUsed: { hpPotion: 0, mpPotion: 0 },
    morphUses: 0,
    watermelonStageStats: {
      1: { attempts: 0, successes: 0 },
      2: { attempts: 0, successes: 0 },
      3: { attempts: 0, successes: 0 }
    },
    damageDealt: {
      total: 0,
      byStage: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    damageTaken: {
      total: 0,
      byStage: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    qteStats: {
      totalAttempts: 0,
      totalSuccesses: 0,
      byStage: {
        1: { attempts: 0, successes: 0 },
        2: { attempts: 0, successes: 0 },
        3: { attempts: 0, successes: 0 },
        4: { attempts: 0, successes: 0 }
      }
    },
    rewardsByStage: {
      1: { coins: 0, xp: 0 },
      2: { coins: 0, xp: 0 },
      3: { coins: 0, xp: 0 },
      4: { coins: 0, xp: 0 }
    },
    stageStats: {
      1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 }
    },
    recentBattles: []
  },
  settings: { muted: false }
});

function freshSave() {
  return structuredClone(DEFAULT_SAVE);
}

function sanitizeSave(candidate) {
  if (!candidate || candidate.version !== 1) return freshSave();
  const base = freshSave();
  const rawStats = candidate.records?.stageStats || {};
  const stageStats = {
    1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[1] || {}) },
    2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[2] || {}) },
    3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[3] || {}) },
    4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[4] || {}) }
  };

  const rawCleared = candidate.records?.clearedStages;
  let clearedStages = Array.isArray(rawCleared) ? [...rawCleared] : [];
  clearedStages = clearedStages.filter((stageId) => {
    const s = stageStats[stageId];
    if (s && ((s.manualWins || 0) + (s.autoWins || 0) > 0)) return true;
    if (stageId === 1 && ((candidate.records?.wins || 0) > 0 || (candidate.records?.manualWins || 0) > 0)) return true;
    return false;
  });

  return {
    ...base,
    ...candidate,
    profile: {
      ...base.profile,
      ...candidate.profile,
      allocations: {
        ...base.profile.allocations,
        ...candidate.profile?.allocations
      },
      skills: {
        ...base.profile.skills,
        ...candidate.profile?.skills
      }
    },
    inventory: { ...base.inventory, ...candidate.inventory },
    equipment: { ...base.equipment, ...candidate.equipment },
    inventoryEquipment: Array.isArray(candidate.inventoryEquipment) ? [...candidate.inventoryEquipment] : [],
    records: {
      ...base.records,
      ...candidate.records,
      clearedStages,
      totalCoinsEarned: candidate.records?.totalCoinsEarned ?? candidate.coins ?? 0,
      totalXpEarned: candidate.records?.totalXpEarned ?? 0,
      totalBattles: candidate.records?.totalBattles ?? ((candidate.records?.wins || 0) + (candidate.records?.losses || 0)),
      manualWins: candidate.records?.manualWins ?? candidate.records?.wins ?? 0,
      manualLosses: candidate.records?.manualLosses ?? candidate.records?.losses ?? 0,
      autoWins: candidate.records?.autoWins ?? 0,
      autoLosses: candidate.records?.autoLosses ?? 0,
      watermelonSlices: candidate.records?.watermelonSlices ?? 0,
      consumablesUsed: {
        hpPotion: candidate.records?.consumablesUsed?.hpPotion || 0,
        mpPotion: candidate.records?.consumablesUsed?.mpPotion || 0
      },
      morphUses: candidate.records?.morphUses || 0,
      watermelonStageStats: {
        1: { attempts: candidate.records?.watermelonStageStats?.[1]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[1]?.successes || 0 },
        2: { attempts: candidate.records?.watermelonStageStats?.[2]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[2]?.successes || 0 },
        3: { attempts: candidate.records?.watermelonStageStats?.[3]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[3]?.successes || 0 }
      },
      damageDealt: {
        total: candidate.records?.damageDealt?.total || 0,
        byStage: {
          1: candidate.records?.damageDealt?.byStage?.[1] || 0,
          2: candidate.records?.damageDealt?.byStage?.[2] || 0,
          3: candidate.records?.damageDealt?.byStage?.[3] || 0,
          4: candidate.records?.damageDealt?.byStage?.[4] || 0
        }
      },
      damageTaken: {
        total: candidate.records?.damageTaken?.total || 0,
        byStage: {
          1: candidate.records?.damageTaken?.byStage?.[1] || 0,
          2: candidate.records?.damageTaken?.byStage?.[2] || 0,
          3: candidate.records?.damageTaken?.byStage?.[3] || 0,
          4: candidate.records?.damageTaken?.byStage?.[4] || 0
        }
      },
      qteStats: {
        totalAttempts: candidate.records?.qteStats?.totalAttempts || 0,
        totalSuccesses: candidate.records?.qteStats?.totalSuccesses || 0,
        byStage: {
          1: { attempts: candidate.records?.qteStats?.byStage?.[1]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[1]?.successes || 0 },
          2: { attempts: candidate.records?.qteStats?.byStage?.[2]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[2]?.successes || 0 },
          3: { attempts: candidate.records?.qteStats?.byStage?.[3]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[3]?.successes || 0 },
          4: { attempts: candidate.records?.qteStats?.byStage?.[4]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[4]?.successes || 0 }
        }
      },
      rewardsByStage: {
        1: { coins: candidate.records?.rewardsByStage?.[1]?.coins || 0, xp: candidate.records?.rewardsByStage?.[1]?.xp || 0 },
        2: { coins: candidate.records?.rewardsByStage?.[2]?.coins || 0, xp: candidate.records?.rewardsByStage?.[2]?.xp || 0 },
        3: { coins: candidate.records?.rewardsByStage?.[3]?.coins || 0, xp: candidate.records?.rewardsByStage?.[3]?.xp || 0 },
        4: { coins: candidate.records?.rewardsByStage?.[4]?.coins || 0, xp: candidate.records?.rewardsByStage?.[4]?.xp || 0 }
      },
      recentBattles: Array.isArray(candidate.records?.recentBattles) ? candidate.records.recentBattles.slice(0, 100) : [],
      stageStats
    },
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
      playerStats: computePlayerStats(this.state.profile, this.state.equipment),
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

  buyEquipment(itemId) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這件裝備。" };
    if (this.state.coins < item.price) {
      return { ok: false, message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventoryEquipment.push(itemId);
    this.commit("purchase-equipment");
    return { ok: true, message: "購入「" + item.name + "」並已放入裝備背包！" };
  }

  equipItem(itemId, targetSlot = null) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item) return { ok: false, message: "無效的裝備。" };

    const invIndex = this.state.inventoryEquipment.indexOf(itemId);
    if (invIndex === -1) {
      return { ok: false, message: "背包中沒有這件裝備。" };
    }

    let slot = targetSlot;
    if (!slot) {
      if (item.slotType === "weapon") {
        if (item.twoHanded) {
          slot = "mainHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else if (this.state.equipment.mainHand === itemId && this.state.equipment.offHand !== itemId && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else if (this.state.equipment.offHand === itemId && this.state.equipment.mainHand !== itemId) {
          slot = "mainHand";
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (this.state.equipment.offHand === itemId && this.state.equipment.mainHand !== itemId) {
          slot = "mainHand";
        } else if (this.state.equipment.mainHand === itemId && this.state.equipment.offHand !== itemId && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else {
          slot = "offHand";
        }
      } else if (item.slotType === "ring") {
        if (!this.state.equipment.ring1) {
          slot = "ring1";
        } else if (!this.state.equipment.ring2) {
          slot = "ring2";
        } else if (this.state.equipment.ring1 === itemId && this.state.equipment.ring2 !== itemId) {
          slot = "ring2";
        } else if (this.state.equipment.ring2 === itemId && this.state.equipment.ring1 !== itemId) {
          slot = "ring1";
        } else {
          slot = "ring1";
        }
      } else if (item.slotType === "earring") {
        if (!this.state.equipment.earring1) {
          slot = "earring1";
        } else if (!this.state.equipment.earring2) {
          slot = "earring2";
        } else if (this.state.equipment.earring1 === itemId && this.state.equipment.earring2 !== itemId) {
          slot = "earring2";
        } else if (this.state.equipment.earring2 === itemId && this.state.equipment.earring1 !== itemId) {
          slot = "earring1";
        } else {
          slot = "earring1";
        }
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, message: "無效的裝備欄位。" };
    }

    // Validate slot compatibility
    const isValidSlot =
      (slot === "mainHand" && (item.slotType === "weapon" || item.slotType === "offHand")) ||
      (slot === "offHand" && (item.slotType === "offHand" || (item.slotType === "weapon" && !item.twoHanded))) ||
      ((slot === "ring1" || slot === "ring2") && item.slotType === "ring") ||
      ((slot === "earring1" || slot === "earring2") && item.slotType === "earring") ||
      (item.slotType === slot);

    if (!isValidSlot) {
      return { ok: false, message: `無法將「${item.name}」穿戴至 ${EQUIPMENT_SLOTS[slot]?.label || slot}。` };
    }

    // Two-handed logic
    if (item.twoHanded) {
      slot = "mainHand";
      if (this.state.equipment.offHand) {
        this.state.inventoryEquipment.push(this.state.equipment.offHand);
        this.state.equipment.offHand = null;
      }
    } else if (slot === "offHand") {
      const currentMain = this.state.equipment.mainHand;
      if (currentMain && EQUIPMENT_ITEMS[currentMain]?.twoHanded) {
        this.state.inventoryEquipment.push(currentMain);
        this.state.equipment.mainHand = null;
      }
    }

    // Remove from inventory
    this.state.inventoryEquipment.splice(invIndex, 1);

    // If target slot had an item, return to inventory
    const oldItem = this.state.equipment[slot];
    if (oldItem) {
      this.state.inventoryEquipment.push(oldItem);
    }

    this.state.equipment[slot] = itemId;
    this.commit("equip-item");
    return { ok: true, message: "已穿戴「" + item.name + "」。" };
  }

  unequipItem(slotKey) {
    if (!this.state.equipment[slotKey]) {
      return { ok: false, message: "此欄位未裝備任何物品。" };
    }
    const itemId = this.state.equipment[slotKey];
    this.state.equipment[slotKey] = null;
    this.state.inventoryEquipment.push(itemId);
    this.commit("unequip-item");
    return { ok: true, message: "已卸下裝備。" };
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

  allocateSkill(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return { ok: false, message: "無效的技能項目。" };
    if (this.state.profile.level < skill.unlockLevel) {
      return { ok: false, message: "等級需達 Lv. " + skill.unlockLevel + " 方可學習此技能。" };
    }
    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skill.maxLevel) {
      return { ok: false, message: "此技能已達最高等級。" };
    }
    if (this.state.profile.skillPoints < skill.costPerLevel) {
      return { ok: false, message: "技能點數不足。" };
    }
    this.state.profile.skillPoints -= skill.costPerLevel;
    this.state.profile.skills[skillId] = (currentLvl || 0) + 1;
    this.commit("allocate-skill");
    return { ok: true, message: "「" + skill.name + "」升級至 Lv. " + this.state.profile.skills[skillId] + "！" };
  }

  unlockSwimsuit() {
    if (!this.state.records.unlockedSwimsuit) {
      this.state.records.unlockedSwimsuit = true;
      this.commit("unlock-swimsuit");
    }
  }

  getTheoreticalDPS() {
    const stats = computePlayerStats(this.state.profile, this.state.equipment);
    const baseDamage = stats.damage || 25;

    // Greatsword multiplier
    const mainItem = EQUIPMENT_ITEMS[this.state.equipment.mainHand];
    const greatswordMult = mainItem?.twoHanded && mainItem?.effect?.type === "greatsword_damage_boost"
      ? (mainItem.effect.multiplier || 1.5)
      : 1.0;

    // Dual hands multiplier (approx 1.5x expected damage factor)
    const hasDualHand = Boolean(this.state.profile.skills?.dualHand > 0);
    const dualHandMult = hasDualHand ? 1.5 : 1.0;

    // Equip passive DOTs (Flame sword, etc.)
    let passiveDamagePerTurn = 0;
    for (const slotKey of Object.values(this.state.equipment)) {
      if (!slotKey) continue;
      const item = EQUIPMENT_ITEMS[slotKey];
      if (item?.effect?.type === "burn_on_round_end") {
        passiveDamagePerTurn += (item.effect.damage || 30);
      } else if (item?.effect?.type === "reflect_damage") {
        passiveDamagePerTurn += (item.effect.damage || 40) * 0.25;
      }
    }

    // Momo Touch draw skill expected value
    const momoLvl = this.state.profile.skills?.momo || 0;
    const momoExpectedPerTurn = (momoLvl * 0.1) * 25 * 0.33;

    // Standard turn cycle duration ~3.5s
    const turnDuration = 3.5;
    const totalExpectedPerTurn = (baseDamage * greatswordMult * dualHandMult) + passiveDamagePerTurn + momoExpectedPerTurn;
    const dps = Math.max(1, totalExpectedPerTurn / turnDuration);
    return Math.round(dps * 10) / 10;
  }

  recordPotionUse(type) {
    if (!this.state.records.consumablesUsed) {
      this.state.records.consumablesUsed = { hpPotion: 0, mpPotion: 0 };
    }
    this.state.records.consumablesUsed[type] = (this.state.records.consumablesUsed[type] || 0) + 1;
    this.commit("record-potion");
  }

  recordMorphUse() {
    this.state.records.morphUses = (this.state.records.morphUses || 0) + 1;
    this.commit("record-morph");
  }

  recordWatermelonStageCut(strikeIndex, success) {
    if (!this.state.records.watermelonStageStats) {
      this.state.records.watermelonStageStats = {
        1: { attempts: 0, successes: 0 },
        2: { attempts: 0, successes: 0 },
        3: { attempts: 0, successes: 0 }
      };
    }
    const idx = Math.max(1, Math.min(3, Number(strikeIndex) || 1));
    if (!this.state.records.watermelonStageStats[idx]) {
      this.state.records.watermelonStageStats[idx] = { attempts: 0, successes: 0 };
    }
    this.state.records.watermelonStageStats[idx].attempts += 1;
    if (success) {
      this.state.records.watermelonStageStats[idx].successes += 1;
      this.state.records.watermelonSlices = (this.state.records.watermelonSlices || 0) + 1;
    }
    this.commit("record-watermelon-cut");
  }

  recordQteAttempt(stageId, success) {
    if (!this.state.records.qteStats) {
      this.state.records.qteStats = { totalAttempts: 0, totalSuccesses: 0, byStage: {} };
    }
    this.state.records.qteStats.totalAttempts = (this.state.records.qteStats.totalAttempts || 0) + 1;
    if (success) {
      this.state.records.qteStats.totalSuccesses = (this.state.records.qteStats.totalSuccesses || 0) + 1;
    }
    if (stageId) {
      const sId = Number(stageId);
      if (!this.state.records.qteStats.byStage[sId]) {
        this.state.records.qteStats.byStage[sId] = { attempts: 0, successes: 0 };
      }
      this.state.records.qteStats.byStage[sId].attempts += 1;
      if (success) {
        this.state.records.qteStats.byStage[sId].successes += 1;
      }
    }
    this.commit("record-qte");
  }

  recordBattle(won, stage, options = {}) {
    const isAuto = Boolean(options.isAuto);
    let stageCoins = won ? (stage?.winCoins ?? BATTLE_RULES.winCoins) : (stage?.lossCoins ?? BATTLE_RULES.lossCoins);
    const stageXp = won ? (stage?.xpWin ?? 0) : (stage?.xpLoss ?? 0);

    // Badge of bond 20% coin boost
    const badgeItem = EQUIPMENT_ITEMS[this.state.equipment.badge];
    if (won && badgeItem?.effect?.type === "coin_boost") {
      stageCoins = Math.round(stageCoins * (badgeItem.effect.coinMultiplier || 1.2));
    }

    const reward = {
      coins: stageCoins,
      xp: stageXp,
      levelsGained: 0
    };
    this.state.coins += reward.coins;
    this.state.records[won ? "wins" : "losses"] += 1;
    this.state.records.totalBattles = (this.state.records.totalBattles || 0) + 1;
    this.state.records.totalCoinsEarned = (this.state.records.totalCoinsEarned || 0) + reward.coins;
    this.state.records.totalXpEarned = (this.state.records.totalXpEarned || 0) + reward.xp;

    if (won) {
      if (isAuto) this.state.records.autoWins = (this.state.records.autoWins || 0) + 1;
      else this.state.records.manualWins = (this.state.records.manualWins || 0) + 1;

      if (stage?.id) {
        this.state.records.bestStage = Math.max(this.state.records.bestStage || 0, stage.id);
        if (!this.state.records.clearedStages) this.state.records.clearedStages = [];
        if (!this.state.records.clearedStages.includes(stage.id)) {
          this.state.records.clearedStages.push(stage.id);
        }
      }
    } else {
      if (isAuto) this.state.records.autoLosses = (this.state.records.autoLosses || 0) + 1;
      else this.state.records.manualLosses = (this.state.records.manualLosses || 0) + 1;
    }

    if (stage?.id) {
      const stageNum = Number(stage.id);
      if (!this.state.records.stageStats) this.state.records.stageStats = {};
      if (!this.state.records.stageStats[stageNum]) {
        this.state.records.stageStats[stageNum] = { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
      }
      const stat = this.state.records.stageStats[stageNum];
      stat.totalAttempts = (stat.totalAttempts || 0) + 1;
      if (isAuto) {
        if (won) stat.autoWins = (stat.autoWins || 0) + 1;
        else stat.autoLosses = (stat.autoLosses || 0) + 1;
      } else {
        if (won) stat.manualWins = (stat.manualWins || 0) + 1;
        else stat.manualLosses = (stat.manualLosses || 0) + 1;
      }

      // Rewards by stage
      if (!this.state.records.rewardsByStage) this.state.records.rewardsByStage = {};
      if (!this.state.records.rewardsByStage[stageNum]) {
        this.state.records.rewardsByStage[stageNum] = { coins: 0, xp: 0 };
      }
      this.state.records.rewardsByStage[stageNum].coins += reward.coins;
      this.state.records.rewardsByStage[stageNum].xp += reward.xp;
    }

    // Damage & combat log recording if provided in options
    const damageDealt = Math.max(0, Number(options.damageDealt) || 0);
    const damageTaken = Math.max(0, Number(options.damageTaken) || 0);
    const durationSec = Math.max(1, Number(options.durationSec) || 1);
    const dps = Math.round((damageDealt / durationSec) * 10) / 10;

    if (!this.state.records.damageDealt) {
      this.state.records.damageDealt = { total: 0, byStage: {} };
    }
    this.state.records.damageDealt.total = (this.state.records.damageDealt.total || 0) + damageDealt;

    if (!this.state.records.damageTaken) {
      this.state.records.damageTaken = { total: 0, byStage: {} };
    }
    this.state.records.damageTaken.total = (this.state.records.damageTaken.total || 0) + damageTaken;

    if (stage?.id) {
      const stageNum = Number(stage.id);
      if (!this.state.records.damageDealt.byStage) this.state.records.damageDealt.byStage = {};
      this.state.records.damageDealt.byStage[stageNum] = (this.state.records.damageDealt.byStage[stageNum] || 0) + damageDealt;

      if (!this.state.records.damageTaken.byStage) this.state.records.damageTaken.byStage = {};
      this.state.records.damageTaken.byStage[stageNum] = (this.state.records.damageTaken.byStage[stageNum] || 0) + damageTaken;
    }

    if (!this.state.records.recentBattles) {
      this.state.records.recentBattles = [];
    }
    this.state.records.recentBattles.unshift({
      stageId: stage?.id || 1,
      stageName: stage?.name || "初逢・朱鳥居",
      chapter: stage?.chapter || "壹ノ章",
      won,
      isAuto,
      durationSec,
      damageDealt,
      damageTaken,
      dps,
      timestamp: Date.now()
    });
    if (this.state.records.recentBattles.length > 100) {
      this.state.records.recentBattles.length = 100;
    }

    const gained = applyExperience(this.state.profile, reward.xp);
    this.state.profile = gained.profile;
    reward.levelsGained = gained.levelsGained;
    reward.dps = dps;
    reward.damageDealt = damageDealt;
    reward.damageTaken = damageTaken;
    reward.durationSec = durationSec;
    this.commit("battle-result");
    return reward;
  }

  recordWatermelonSlice() {
    this.state.records.watermelonSlices = (this.state.records.watermelonSlices || 0) + 1;
    this.commit("record-watermelon-slice");
  }

  grantExperience(amount, reason = "bonus-experience") {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (safeAmount === 0) return { xp: 0, levelsGained: 0 };

    this.state.records.totalXpEarned = (this.state.records.totalXpEarned || 0) + safeAmount;

    const gained = applyExperience(this.state.profile, safeAmount);
    this.state.profile = gained.profile;
    this.commit(reason);
    return { xp: safeAmount, levelsGained: gained.levelsGained };
  }

  cheatSetValues(updates = {}) {
    if (typeof updates.level === "number" && updates.level >= 1) {
      this.state.profile.level = Math.floor(updates.level);
    }
    if (typeof updates.xp === "number" && updates.xp >= 0) {
      this.state.profile.xp = Math.floor(updates.xp);
    }
    if (typeof updates.skillPoints === "number" && updates.skillPoints >= 0) {
      this.state.profile.skillPoints = Math.floor(updates.skillPoints);
    }
    if (typeof updates.coins === "number" && updates.coins >= 0) {
      this.state.coins = Math.floor(updates.coins);
    }
    if (typeof updates.hpPotion === "number" && updates.hpPotion >= 0) {
      this.state.inventory.hpPotion = Math.floor(updates.hpPotion);
    }
    if (typeof updates.mpPotion === "number" && updates.mpPotion >= 0) {
      this.state.inventory.mpPotion = Math.floor(updates.mpPotion);
    }
    if (updates.allocations) {
      if (typeof updates.allocations.hp === "number") this.state.profile.allocations.hp = Math.max(0, updates.allocations.hp);
      if (typeof updates.allocations.mp === "number") this.state.profile.allocations.mp = Math.max(0, updates.allocations.mp);
      if (typeof updates.allocations.damage === "number") this.state.profile.allocations.damage = Math.max(0, updates.allocations.damage);
    }
    if (updates.skills) {
      if (typeof updates.skills.momo === "number") this.state.profile.skills.momo = Math.max(0, Math.min(10, updates.skills.momo));
      if (typeof updates.skills.dualHand === "number") this.state.profile.skills.dualHand = Math.max(0, Math.min(1, updates.skills.dualHand));
    }
    this.commit("cheat-update");
    return { ok: true, message: "數值已更新！" };
  }

  cheatUnlockAll() {
    this.state.records.bestStage = 4;
    this.state.records.clearedStages = [1, 2, 3, 4];
    this.commit("cheat-unlock-all");
    return { ok: true, message: "已解鎖全部 4 個關卡與 BOSS 說明！" };
  }

  cheatUnlockGallery() {
    this.state.records.unlockedSwimsuit = true;
    this.commit("cheat-unlock-gallery");
    return { ok: true, message: "已解鎖全部圖鑑立繪！" };
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

