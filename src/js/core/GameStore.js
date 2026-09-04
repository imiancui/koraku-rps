import { BATTLE_RULES, ITEMS, SKILLS, EQUIPMENT_ITEMS, EQUIPMENT_SLOTS } from "../config/gameConfig.js";
import { applyExperience, computePlayerStats, xpNeededForLevel } from "../systems/progressionRules.js";
import { encodeSaveData, decodeSaveData } from "../services/Persistence.js";

const DEFAULT_SAVE = Object.freeze({
  version: 2,
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
  ledger: [],
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
    watermelonStock: 0,
    watermelonSlices: 0,
    consumablesUsed: { hpPotion: 0, mpPotion: 0 },
    morphUses: 0,
    momoStats: { attempts: 0, successes: 0, damage: 0 },
    morphStats: { attempts: 0, successes: 0, damage: 0 },
    restoredTotal: { hp: 0, mp: 0 },
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
  settings: {
    muted: false,
    musicMuted: false,
    sfxMuted: false
  }
});

export function createEquipmentInstance(itemOrId, options = {}) {
  const typeId = typeof itemOrId === "object" && itemOrId !== null ? (itemOrId.typeId || itemOrId.id) : String(itemOrId);
  const nowMs = typeof options.now === "function" ? options.now() : (typeof options.now === "number" ? options.now : Date.now());
  const randomStr = typeof options.random === "function"
    ? options.random().toString(36).substring(2, 9)
    : Math.random().toString(36).substring(2, 9);
  const uid = (typeof itemOrId === "object" && itemOrId !== null && itemOrId.uid)
    ? itemOrId.uid
    : (options.uid || `eq_${nowMs}_${randomStr}`);
  const level = (typeof itemOrId === "object" && itemOrId !== null && typeof itemOrId.level === "number")
    ? itemOrId.level
    : (options.level || 1);
  return { uid, typeId, level };
}

export function getEquipmentTypeId(itemOrId) {
  if (!itemOrId) return null;
  if (typeof itemOrId === "object" && itemOrId !== null) {
    return itemOrId.typeId || itemOrId.id || null;
  }
  return String(itemOrId);
}

export function freshSave() {
  const save = structuredClone(DEFAULT_SAVE);
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const sm = window.localStorage.getItem("koraku_music_muted");
      if (sm !== null) save.settings.musicMuted = sm === "true";
      const ss = window.localStorage.getItem("koraku_sfx_muted");
      if (ss !== null) {
        save.settings.sfxMuted = ss === "true";
        save.settings.muted = ss === "true";
      }
    }
  } catch (_) {}
  return save;
}

export function migrateSave(candidate, fromVersion = 1, toVersion = 2) {
  if (!candidate || typeof candidate !== "object") return freshSave();
  const migrated = structuredClone(candidate);
  const currentVersion = migrated.version || fromVersion || 1;

  if (currentVersion === 1 && toVersion >= 2) {
    migrated.version = 2;
    if (!Array.isArray(migrated.ledger)) {
      migrated.ledger = [];
    }
  }

  return migrated;
}

export function sanitizeSave(candidate) {
  if (!candidate || typeof candidate !== "object") return freshSave();
  const migrated = candidate.version === 2 ? candidate : migrateSave(candidate, candidate.version || 1, 2);
  const base = freshSave();

  const rawStats = migrated.records?.stageStats || {};
  const stageStats = {
    1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[1] || {}) },
    2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[2] || {}) },
    3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[3] || {}) },
    4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[4] || {}) }
  };

  const rawCleared = migrated.records?.clearedStages;
  let clearedStages = Array.isArray(rawCleared) ? [...rawCleared] : [];
  clearedStages = clearedStages.filter((stageId) => {
    if (stageId >= 1 && stageId <= 4) {
      const s = stageStats[stageId];
      if (s && ((s.manualWins || 0) + (s.autoWins || 0) > 0)) return true;
      if (stageId === 1 && ((migrated.records?.wins || 0) > 0 || (migrated.records?.manualWins || 0) > 0)) return true;
      if (migrated.records?.bestStage && migrated.records.bestStage >= stageId) return true;
    }
    return false;
  });

  return {
    ...base,
    ...migrated,
    version: 2,
    profile: {
      ...base.profile,
      ...migrated.profile,
      allocations: {
        ...base.profile.allocations,
        ...migrated.profile?.allocations
      },
      skills: {
        ...base.profile.skills,
        ...migrated.profile?.skills
      }
    },
    inventory: { ...base.inventory, ...migrated.inventory },
    equipment: { ...base.equipment, ...migrated.equipment },
    inventoryEquipment: Array.isArray(migrated.inventoryEquipment) ? [...migrated.inventoryEquipment] : [],
    ledger: Array.isArray(migrated.ledger) ? [...migrated.ledger].slice(-500) : [],
    records: {
      ...base.records,
      ...migrated.records,
      clearedStages,
      totalCoinsEarned: migrated.records?.totalCoinsEarned ?? migrated.coins ?? 0,
      totalXpEarned: migrated.records?.totalXpEarned ?? 0,
      totalBattles: migrated.records?.totalBattles ?? ((migrated.records?.wins || 0) + (migrated.records?.losses || 0)),
      manualWins: migrated.records?.manualWins ?? migrated.records?.wins ?? 0,
      manualLosses: migrated.records?.manualLosses ?? migrated.records?.losses ?? 0,
      autoWins: migrated.records?.autoWins ?? 0,
      autoLosses: migrated.records?.autoLosses ?? 0,
      watermelonStock: Math.max(0, Math.min(999, migrated.records?.watermelonStock ?? 0)),
      watermelonSlices: migrated.records?.watermelonSlices ?? 0,
      consumablesUsed: {
        hpPotion: migrated.records?.consumablesUsed?.hpPotion || 0,
        mpPotion: migrated.records?.consumablesUsed?.mpPotion || 0
      },
      morphUses: migrated.records?.morphUses || 0,
      momoStats: {
        attempts: migrated.records?.momoStats?.attempts || 0,
        successes: migrated.records?.momoStats?.successes || 0,
        damage: migrated.records?.momoStats?.damage || 0
      },
      morphStats: {
        attempts: migrated.records?.morphStats?.attempts || 0,
        successes: migrated.records?.morphStats?.successes || 0,
        damage: migrated.records?.morphStats?.damage || 0
      },
      restoredTotal: {
        hp: migrated.records?.restoredTotal?.hp || 0,
        mp: migrated.records?.restoredTotal?.mp || 0
      },
      watermelonStageStats: {
        1: { attempts: migrated.records?.watermelonStageStats?.[1]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[1]?.successes || 0 },
        2: { attempts: migrated.records?.watermelonStageStats?.[2]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[2]?.successes || 0 },
        3: { attempts: migrated.records?.watermelonStageStats?.[3]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[3]?.successes || 0 }
      },
      damageDealt: {
        total: migrated.records?.damageDealt?.total || 0,
        byStage: {
          1: migrated.records?.damageDealt?.byStage?.[1] || 0,
          2: migrated.records?.damageDealt?.byStage?.[2] || 0,
          3: migrated.records?.damageDealt?.byStage?.[3] || 0,
          4: migrated.records?.damageDealt?.byStage?.[4] || 0
        }
      },
      damageTaken: {
        total: migrated.records?.damageTaken?.total || 0,
        byStage: {
          1: migrated.records?.damageTaken?.byStage?.[1] || 0,
          2: migrated.records?.damageTaken?.byStage?.[2] || 0,
          3: migrated.records?.damageTaken?.byStage?.[3] || 0,
          4: migrated.records?.damageTaken?.byStage?.[4] || 0
        }
      },
      qteStats: {
        totalAttempts: migrated.records?.qteStats?.totalAttempts || 0,
        totalSuccesses: migrated.records?.qteStats?.totalSuccesses || 0,
        byStage: {
          1: { attempts: migrated.records?.qteStats?.byStage?.[1]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[1]?.successes || 0 },
          2: { attempts: migrated.records?.qteStats?.byStage?.[2]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[2]?.successes || 0 },
          3: { attempts: migrated.records?.qteStats?.byStage?.[3]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[3]?.successes || 0 },
          4: { attempts: migrated.records?.qteStats?.byStage?.[4]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[4]?.successes || 0 }
        }
      },
      rewardsByStage: {
        1: { coins: migrated.records?.rewardsByStage?.[1]?.coins || 0, xp: migrated.records?.rewardsByStage?.[1]?.xp || 0 },
        2: { coins: migrated.records?.rewardsByStage?.[2]?.coins || 0, xp: migrated.records?.rewardsByStage?.[2]?.xp || 0 },
        3: { coins: migrated.records?.rewardsByStage?.[3]?.coins || 0, xp: migrated.records?.rewardsByStage?.[3]?.xp || 0 },
        4: { coins: migrated.records?.rewardsByStage?.[4]?.coins || 0, xp: migrated.records?.rewardsByStage?.[4]?.xp || 0 }
      },
      recentBattles: Array.isArray(migrated.records?.recentBattles) ? migrated.records.recentBattles.slice(0, 100) : [],
      stageStats
    },
    settings: (() => {
      const s = { ...base.settings, ...migrated.settings };
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const sm = window.localStorage.getItem("koraku_music_muted");
          if (sm !== null) s.musicMuted = sm === "true";
          const ss = window.localStorage.getItem("koraku_sfx_muted");
          if (ss !== null) {
            s.sfxMuted = ss === "true";
            s.muted = ss === "true";
          }
        }
      } catch (_) {}
      return s;
    })()
  };
}

export class GameStore {
  constructor(bus, persistence, options = {}) {
    this.bus = bus;
    this.persistence = persistence;
    this.now = options.now || (() => Date.now());
    this.state = sanitizeSave(persistence.load());
  }

  _recordLedger(entry) {
    if (!Array.isArray(this.state.ledger)) {
      this.state.ledger = [];
    }
    const timestamp = typeof this.now === "function" ? this.now() : Date.now();
    this.state.ledger.push({
      id: `led_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      configVersion: "2026.09.03",
      ...entry
    });
    if (this.state.ledger.length > 500) {
      this.state.ledger = this.state.ledger.slice(-500);
    }
  }

  snapshot() {
    const rawEquip = this.state.equipment || {};
    const normalizedEquip = {};
    for (const [slot, val] of Object.entries(rawEquip)) {
      normalizedEquip[slot] = getEquipmentTypeId(val);
    }
    return structuredClone({
      ...this.state,
      playerStats: computePlayerStats(this.state.profile, normalizedEquip),
      xpToNext: xpNeededForLevel(this.state.profile.level)
    });
  }

  commit(reason) {
    this.persistence.save(this.state);
    this.bus.emit("store:changed", { reason, state: this.snapshot() });
  }

  buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return { ok: false, key: "shop.itemNotFound", message: "找不到這件商品。" };
    if (this.state.coins < item.price) {
      return { ok: false, key: "shop.insufficientCoins", message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventory[itemId] += 1;
    this._recordLedger({
      action: "buy_item",
      itemId,
      coinsDelta: -item.price,
      source: "shop"
    });
    this.commit("purchase");
    return { ok: true, key: "shop.itemPurchased", params: { name: item.name }, message: "購入「" + item.name + "」！" };
  }

  buyEquipment(itemId) {
    const typeId = getEquipmentTypeId(itemId);
    const item = EQUIPMENT_ITEMS[typeId];
    if (!item) return { ok: false, key: "shop.itemNotFound", message: "找不到這件裝備。" };
    if (this.state.coins < item.price) {
      return { ok: false, key: "shop.insufficientCoins", message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    const entryToPush = typeof itemId === "object" && itemId !== null ? itemId : typeId;
    this.state.inventoryEquipment.push(entryToPush);
    this._recordLedger({
      action: "buy_equipment",
      typeId,
      item: entryToPush,
      coinsDelta: -item.price,
      source: "shop"
    });
    this.commit("purchase-equipment");
    return { ok: true, key: "shop.equipmentPurchased", params: { name: item.name }, message: "購入「" + item.name + "」並已放入裝備背包！" };
  }

  equipItem(itemOrId, targetSlot = null) {
    const typeId = getEquipmentTypeId(itemOrId);
    const item = EQUIPMENT_ITEMS[typeId];
    if (!item) return { ok: false, key: "equip.invalidItem", message: "無效的裝備。" };

    const invIndex = this.state.inventoryEquipment.findIndex((entry) => {
      if (typeof entry === "string") return entry === itemOrId || entry === typeId;
      if (typeof entry === "object" && entry !== null) {
        if (typeof itemOrId === "string") return entry.uid === itemOrId || entry.typeId === itemOrId;
        if (typeof itemOrId === "object" && itemOrId !== null) return entry.uid === itemOrId.uid || entry.typeId === itemOrId.typeId;
      }
      return false;
    });

    if (invIndex === -1) {
      return { ok: false, key: "equip.notInInventory", message: "背包中沒有這件裝備。" };
    }

    const matchedEntry = this.state.inventoryEquipment[invIndex];

    let slot = targetSlot;
    if (!slot) {
      const mainTypeId = getEquipmentTypeId(this.state.equipment.mainHand);
      const offTypeId = getEquipmentTypeId(this.state.equipment.offHand);
      const ring1TypeId = getEquipmentTypeId(this.state.equipment.ring1);
      const ring2TypeId = getEquipmentTypeId(this.state.equipment.ring2);
      const earring1TypeId = getEquipmentTypeId(this.state.equipment.earring1);
      const earring2TypeId = getEquipmentTypeId(this.state.equipment.earring2);

      if (item.slotType === "weapon") {
        if (item.twoHanded) {
          slot = "mainHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (mainTypeId === typeId && offTypeId !== typeId && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (offTypeId === typeId && mainTypeId !== typeId) {
          slot = "mainHand";
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (offTypeId === typeId && mainTypeId !== typeId) {
          slot = "mainHand";
        } else if (mainTypeId === typeId && offTypeId !== typeId && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else {
          slot = "offHand";
        }
      } else if (item.slotType === "ring") {
        if (!this.state.equipment.ring1) {
          slot = "ring1";
        } else if (!this.state.equipment.ring2) {
          slot = "ring2";
        } else if (ring1TypeId === typeId && ring2TypeId !== typeId) {
          slot = "ring2";
        } else if (ring2TypeId === typeId && ring1TypeId !== typeId) {
          slot = "ring1";
        } else {
          slot = "ring1";
        }
      } else if (item.slotType === "earring") {
        if (!this.state.equipment.earring1) {
          slot = "earring1";
        } else if (!this.state.equipment.earring2) {
          slot = "earring2";
        } else if (earring1TypeId === typeId && earring2TypeId !== typeId) {
          slot = "earring2";
        } else if (earring2TypeId === typeId && earring1TypeId !== typeId) {
          slot = "earring1";
        } else {
          slot = "earring1";
        }
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, key: "equip.invalidSlot", message: "無效的裝備欄位。" };
    }

    // Validate slot compatibility
    const isValidSlot =
      (slot === "mainHand" && (item.slotType === "weapon" || item.slotType === "offHand")) ||
      (slot === "offHand" && (item.slotType === "offHand" || (item.slotType === "weapon" && !item.twoHanded))) ||
      ((slot === "ring1" || slot === "ring2") && item.slotType === "ring") ||
      ((slot === "earring1" || slot === "earring2") && item.slotType === "earring") ||
      (item.slotType === slot);

    if (!isValidSlot) {
      return { ok: false, key: "equip.incompatibleSlot", params: { name: item.name, slotName: EQUIPMENT_SLOTS[slot]?.label || slot }, message: `無法將「${item.name}」穿戴至 ${EQUIPMENT_SLOTS[slot]?.label || slot}。` };
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
      const currentMainTypeId = getEquipmentTypeId(currentMain);
      if (currentMain && EQUIPMENT_ITEMS[currentMainTypeId]?.twoHanded) {
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

    this.state.equipment[slot] = matchedEntry;
    this._recordLedger({
      action: "equip_item",
      slot,
      item: matchedEntry,
      typeId,
      source: "equipment"
    });
    this.commit("equip-item");
    return { ok: true, key: "equip.equipped", params: { name: item.name }, message: "已穿戴「" + item.name + "」。" };
  }

  unequipItem(slotKey) {
    if (!this.state.equipment[slotKey]) {
      return { ok: false, key: "equip.slotEmpty", message: "此欄位未裝備任何物品。" };
    }
    const itemId = this.state.equipment[slotKey];
    this.state.equipment[slotKey] = null;
    this.state.inventoryEquipment.push(itemId);
    this._recordLedger({
      action: "unequip_item",
      slot: slotKey,
      item: itemId,
      typeId: getEquipmentTypeId(itemId),
      source: "equipment"
    });
    this.commit("unequip-item");
    return { ok: true, key: "equip.unequipped", message: "已卸下裝備。" };
  }

  consumeItem(itemId) {
    if (!ITEMS[itemId] || this.state.inventory[itemId] <= 0) return false;
    this.state.inventory[itemId] -= 1;
    this._recordLedger({
      action: "consume_item",
      itemId,
      source: "inventory"
    });
    this.commit("consume-item");
    return true;
  }

  allocateStat(stat) {
    if (!Object.hasOwn(this.state.profile.allocations, stat)) {
      return { ok: false, key: "growth.invalidStat", message: "無效的能力項目。" };
    }
    if (this.state.profile.skillPoints <= 0) {
      return { ok: false, key: "growth.noPoints", message: "目前沒有可用點數。" };
    }
    this.state.profile.skillPoints -= 1;
    this.state.profile.allocations[stat] += 1;
    this._recordLedger({
      action: "allocate_stat",
      stat,
      source: "growth"
    });
    this.commit("allocate-stat");
    return { ok: true, key: "growth.statIncreased", message: "能力提升了。" };
  }

  allocateSkill(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return { ok: false, key: "growth.invalidSkill", message: "無效的技能項目。" };
    if (this.state.profile.level < skill.unlockLevel) {
      return { ok: false, key: "growth.levelRequirementNotMet", params: { level: skill.unlockLevel }, message: "等級需達 Lv. " + skill.unlockLevel + " 方可學習此技能。" };
    }
    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skill.maxLevel) {
      return { ok: false, key: "growth.skillMaxLevel", message: "此技能已達最高等級。" };
    }
    if (this.state.profile.skillPoints < skill.costPerLevel) {
      return { ok: false, key: "growth.insufficientPoints", message: "技能點數不足。" };
    }
    this.state.profile.skillPoints -= skill.costPerLevel;
    this.state.profile.skills[skillId] = (currentLvl || 0) + 1;
    this._recordLedger({
      action: "allocate_skill",
      skillId,
      level: this.state.profile.skills[skillId],
      source: "growth"
    });
    this.commit("allocate-skill");
    return { ok: true, key: "growth.skillUpgraded", params: { name: skill.name, level: this.state.profile.skills[skillId] }, message: "「" + skill.name + "」升級至 Lv. " + this.state.profile.skills[skillId] + "！" };
  }

  unlockSwimsuit() {
    if (!this.state.records.unlockedSwimsuit) {
      this.state.records.unlockedSwimsuit = true;
      this.commit("unlock-swimsuit");
    }
  }

  getTheoreticalDPS() {
    const stats = this.snapshot().playerStats;
    const baseDamage = stats.damage || 25;

    // Greatsword multiplier
    const mainSlot = this.state.equipment.mainHand;
    const mainTypeId = getEquipmentTypeId(mainSlot);
    const mainItem = EQUIPMENT_ITEMS[mainTypeId];
    const greatswordMult = (mainItem?.twoHanded && (mainItem?.effect?.type === "burst" || mainItem?.effect?.type === "greatsword_damage_boost"))
      ? (mainItem.effect.winMultiplier || mainItem.effect.multiplier || 1.5)
      : 1.0;

    // Dual hands multiplier (approx 1.5x expected damage factor)
    const hasDualHand = Boolean(this.state.profile.skills?.dualHand > 0);
    const dualHandMult = hasDualHand ? 1.5 : 1.0;

    // Equip passive DOTs (Flame sword, etc.)
    let passiveDamagePerTurn = 0;
    for (const slotKey of Object.values(this.state.equipment)) {
      if (!slotKey) continue;
      const typeId = getEquipmentTypeId(slotKey);
      const item = EQUIPMENT_ITEMS[typeId];
      if (item?.effect?.type === "burn" || item?.effect?.type === "burn_on_round_end") {
        passiveDamagePerTurn += (item.effect.burnDamage || item.effect.damage || 30);
      } else if (item?.effect?.type === "reflect" || item?.effect?.type === "reflect_damage") {
        passiveDamagePerTurn += (item.effect.reflectDamage || item.effect.damage || 40) * 0.25;
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

  recordPotionUse(type, options = {}) {
    if (!this.state.records.consumablesUsed) {
      this.state.records.consumablesUsed = { hpPotion: 0, mpPotion: 0 };
    }
    this.state.records.consumablesUsed[type] = (this.state.records.consumablesUsed[type] || 0) + 1;
    if (!this.state.records.restoredTotal) {
      this.state.records.restoredTotal = { hp: 0, mp: 0 };
    }
    if (options.restored) {
      if (type === "hpPotion") this.state.records.restoredTotal.hp = (this.state.records.restoredTotal.hp || 0) + options.restored;
      else if (type === "mpPotion") this.state.records.restoredTotal.mp = (this.state.records.restoredTotal.mp || 0) + options.restored;
    }
    this.commit("record-potion");
  }

  recordMorphUse(options = {}) {
    this.state.records.morphUses = (this.state.records.morphUses || 0) + 1;
    if (!this.state.records.morphStats) {
      this.state.records.morphStats = { attempts: 0, successes: 0, damage: 0 };
    }
    this.state.records.morphStats.attempts = (this.state.records.morphStats.attempts || 0) + 1;
    if (options.success !== false) {
      this.state.records.morphStats.successes = (this.state.records.morphStats.successes || 0) + 1;
    }
    if (options.damage) {
      this.state.records.morphStats.damage = (this.state.records.morphStats.damage || 0) + options.damage;
    }
    this.commit("record-morph");
  }

  recordMomoProc(options = {}) {
    if (!this.state.records.momoStats) {
      this.state.records.momoStats = { attempts: 0, successes: 0, damage: 0 };
    }
    this.state.records.momoStats.attempts = (this.state.records.momoStats.attempts || 0) + 1;
    if (options.success) {
      this.state.records.momoStats.successes = (this.state.records.momoStats.successes || 0) + 1;
      if (options.damage) {
        this.state.records.momoStats.damage = (this.state.records.momoStats.damage || 0) + options.damage;
      }
    }
    this.commit("record-momo");
  }

  recordWatermelonStageCut(strikeIndex, success) {
    if (!this.state.records.watermelonStageStats) {
      this.state.records.watermelonStageStats = {
        1: { attempts: 0, successes: 0 },
        2: { attempts: 0, successes: 0 },
        3: { attempts: 0, successes: 0 }
      };
    }
    const idx = Number(strikeIndex) || 1;
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

  addWatermelonStock(amount = 1) {
    if (!this.state.records) this.state.records = {};
    const current = Number(this.state.records.watermelonStock) || 0;
    this.state.records.watermelonStock = Math.min(999, Math.max(0, current + amount));
    this.commit("add-watermelon-stock");
    return this.state.records.watermelonStock;
  }

  consumeWatermelonStock(amount = 1) {
    if (!this.state.records) this.state.records = {};
    const current = Number(this.state.records.watermelonStock) || 0;
    if (current < amount) return false;
    this.state.records.watermelonStock = Math.max(0, current - amount);
    this.commit("consume-watermelon-stock");
    return true;
  }

  setWatermelonStock(value = 0) {
    if (!this.state.records) this.state.records = {};
    this.state.records.watermelonStock = Math.min(999, Math.max(0, Number(value) || 0));
    this.commit("set-watermelon-stock");
    return this.state.records.watermelonStock;
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
    const damageDealt = Math.max(0, Number(options.damageDealt) || 0);
    const damageTaken = Math.max(0, Number(options.damageTaken) || 0);
    const durationSec = Math.max(1, Number(options.durationSec) || 1);

    let stageCoins = 0;
    let stageXp = 0;

    if (won) {
      stageCoins = stage?.winCoins ?? BATTLE_RULES.winCoins;
      stageXp = stage?.xpWin ?? 0;
      // Badge of bond 20% coin boost
      const badgeSlot = this.state.equipment.badge;
      const badgeTypeId = getEquipmentTypeId(badgeSlot);
      const badgeItem = EQUIPMENT_ITEMS[badgeTypeId];
      if (badgeItem?.effect?.type === "coin_boost") {
        stageCoins = Math.round(stageCoins * (badgeItem.effect.coinMultiplier || 1.2));
      }
    } else {
      // LOSS REWARDS:
      // 未對小樂造成傷害時0獎勵，對小樂造成25%血條損失時才會有當前的獎勵的10%
      const enemyMaxHp = stage?.enemyHp ?? 1000;
      const hpLossRatio = enemyMaxHp > 0 ? (damageDealt / enemyMaxHp) : 0;
      if (hpLossRatio >= 0.25) {
        const baseLossCoins = stage?.lossCoins ?? BATTLE_RULES.lossCoins;
        const baseLossXp = stage?.xpLoss ?? 0;
        stageCoins = Math.floor(baseLossCoins * 0.10);
        stageXp = Math.floor(baseLossXp * 0.10);
      } else {
        stageCoins = 0;
        stageXp = 0;
      }
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
      if (isAuto) {
        this.state.records.autoWins = (this.state.records.autoWins || 0) + 1;
        this.addWatermelonStock(1);
      } else {
        this.state.records.manualWins = (this.state.records.manualWins || 0) + 1;
      }

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
      rewardCoins: reward.coins,
      rewardXp: reward.xp,
      timestamp: typeof this.now === "function" ? this.now() : Date.now(),
      watermelonSlices: options.watermelonSlices ?? null,
      qteHits: options.qteHits ?? null,
      qteTotal: options.qteTotal ?? null,
      hpPotionUsed: options.hpPotionUsed ?? 0,
      mpPotionUsed: options.mpPotionUsed ?? 0,
      hpRestored: options.hpRestored ?? 0,
      mpRestored: options.mpRestored ?? 0,
      momoAttempts: options.momoAttempts ?? 0,
      momoSuccesses: options.momoSuccesses ?? 0,
      momoDamage: options.momoDamage ?? 0,
      morphCount: options.morphCount ?? 0,
      morphDamage: options.morphDamage ?? 0
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

    this._recordLedger({
      action: "battle_reward",
      won,
      stageId: stage?.id,
      coinsDelta: reward.coins,
      xpDelta: reward.xp,
      source: isAuto ? "auto_battle" : "manual_battle"
    });

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
    this._recordLedger({
      action: "grant_experience",
      xpDelta: safeAmount,
      source: reason
    });
    this.commit(reason);
    return { xp: safeAmount, levelsGained: gained.levelsGained };
  }

  cheatSetValues(updates = {}) {
    const statsObj = (updates && typeof updates.stats === "object" && updates.stats !== null && !Array.isArray(updates.stats)) ? updates.stats : {};
    const flat = (updates && typeof updates === "object" && !Array.isArray(updates)) ? updates : {};
    const merged = { ...statsObj, ...flat };
    merged.allocations = { ...(statsObj.allocations || {}), ...(flat.allocations || {}) };
    merged.skills = { ...(statsObj.skills || {}), ...(flat.skills || {}) };

    if (typeof merged.level === "number" && merged.level >= 1) {
      this.state.profile.level = Math.floor(merged.level);
    }
    if (typeof merged.xp === "number" && merged.xp >= 0) {
      this.state.profile.xp = Math.floor(merged.xp);
    }
    if (typeof merged.skillPoints === "number" && merged.skillPoints >= 0) {
      this.state.profile.skillPoints = Math.floor(merged.skillPoints);
    }
    if (typeof merged.coins === "number" && merged.coins >= 0) {
      this.state.coins = Math.floor(merged.coins);
    }
    if (typeof merged.hpPotion === "number" && merged.hpPotion >= 0) {
      this.state.inventory.hpPotion = Math.floor(merged.hpPotion);
    }
    if (typeof merged.mpPotion === "number" && merged.mpPotion >= 0) {
      this.state.inventory.mpPotion = Math.floor(merged.mpPotion);
    }
    if (typeof merged.watermelonStock === "number" && merged.watermelonStock >= 0) {
      if (!this.state.records) this.state.records = {};
      this.state.records.watermelonStock = Math.max(0, Math.min(999, Math.floor(merged.watermelonStock)));
    }
    if (merged.allocations) {
      const allocHp = merged.hp ?? merged.allocations.hp;
      const allocMp = merged.mp ?? merged.allocations.mp;
      const allocDamage = merged.damage ?? merged.allocations.damage;
      if (typeof allocHp === "number" && allocHp >= 0) this.state.profile.allocations.hp = Math.max(0, allocHp);
      if (typeof allocMp === "number" && allocMp >= 0) this.state.profile.allocations.mp = Math.max(0, allocMp);
      if (typeof allocDamage === "number" && allocDamage >= 0) this.state.profile.allocations.damage = Math.max(0, allocDamage);
    }
    if (merged.skills) {
      if (typeof merged.skills.momo === "number") this.state.profile.skills.momo = Math.max(0, Math.min(10, merged.skills.momo));
      if (typeof merged.skills.dualHand === "number") this.state.profile.skills.dualHand = Math.max(0, Math.min(1, merged.skills.dualHand));
    }
    this._recordLedger({
      action: "cheat_set_values",
      updates: merged,
      source: "dev"
    });
    this.commit("cheat-update");
    return { ok: true, key: "cheat.updated", message: "數值已更新！" };
  }

  cheatUnlockAll() {
    this.state.records.bestStage = 4;
    this.state.records.clearedStages = [1, 2, 3, 4];
    if (!this.state.records.stageStats) this.state.records.stageStats = {};
    for (let s = 1; s <= 4; s++) {
      if (!this.state.records.stageStats[s]) {
        this.state.records.stageStats[s] = { totalAttempts: 1, manualWins: 1, manualLosses: 0, autoWins: 0, autoLosses: 0 };
      } else {
        this.state.records.stageStats[s].manualWins = Math.max(1, this.state.records.stageStats[s].manualWins || 1);
        this.state.records.stageStats[s].totalAttempts = Math.max(1, this.state.records.stageStats[s].totalAttempts || 1);
      }
    }
    this._recordLedger({
      action: "cheat_unlock_all",
      source: "dev"
    });
    this.commit("cheat-unlock-all");
    return { ok: true, key: "cheat.unlockedAll", message: "已解鎖全部 4 個關卡與 BOSS 說明！" };
  }

  cheatUnlockGallery() {
    this.state.records.unlockedSwimsuit = true;
    this.state.records.unlockedGalleryAll = true;
    this._recordLedger({
      action: "cheat_unlock_gallery",
      source: "dev"
    });
    this.commit("cheat-unlock-gallery");
    return { ok: true, key: "cheat.unlockedGallery", message: "已解鎖全部圖鑑立繪！" };
  }

  toggleMusicMuted() {
    this.state.settings.musicMuted = !this.state.settings.musicMuted;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("koraku_music_muted", String(this.state.settings.musicMuted));
      }
    } catch (_) {}
    this.commit("toggle-music-muted");
    return this.state.settings.musicMuted;
  }

  toggleSfxMuted() {
    this.state.settings.sfxMuted = !this.state.settings.sfxMuted;
    this.state.settings.muted = this.state.settings.sfxMuted;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("koraku_sfx_muted", String(this.state.settings.sfxMuted));
      }
    } catch (_) {}
    this.commit("toggle-sfx-muted");
    return this.state.settings.sfxMuted;
  }

  toggleMuted() {
    return this.toggleSfxMuted();
  }

  exportSaveCode() {
    return encodeSaveData(this.state);
  }

  importSaveCode(code) {
    if (!code || typeof code !== "string" || !code.trim()) {
      return { ok: false, key: "save.invalidCode", message: "請輸入有效的種子碼。" };
    }
    const decoded = decodeSaveData(code);
    if (!decoded || typeof decoded !== "object") {
      return { ok: false, key: "save.corruptCode", message: "無效或損毀的存檔種子碼。" };
    }
    this.state = sanitizeSave(decoded);
    this.persistence.save(this.state);
    this._recordLedger({
      action: "import_save",
      source: "save_code"
    });
    this.commit("import-save");
    return { ok: true, key: "save.imported", message: "存檔已成功載入！" };
  }

  reset() {
    this.state = freshSave();
    this.persistence.clear();
    this._recordLedger({ action: "reset", source: "system" });
    this.commit("reset");
  }
}

export default GameStore;
