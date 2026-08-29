import { BATTLE_RULES, ITEMS, SKILLS, EQUIPMENT_ITEMS, EQUIPMENT_SLOTS } from "../config/gameConfig.js";
import { applyExperience, computePlayerStats, xpNeededForLevel } from "../systems/progressionRules.js";

const DEFAULT_SAVE = Object.freeze({
  version: 1,
  profile: {
    level: 1,
    xp: 0,
    skillPoints: 0,
    allocations: { hp: 0, mp: 0, damage: 0 },
    skills: { momo: 0 }
  },
  coins: 0,
  inventory: { hpPotion: 1, mpPotion: 0 },
  equipment: {
    head: null,
    shoulders: null,
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
  records: { wins: 0, losses: 0, bestStage: 0, unlockedSwimsuit: false },
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
      },
      skills: {
        ...base.profile.skills,
        ...candidate.profile?.skills
      }
    },
    inventory: { ...base.inventory, ...candidate.inventory },
    equipment: { ...base.equipment, ...candidate.equipment },
    inventoryEquipment: Array.isArray(candidate.inventoryEquipment) ? [...candidate.inventoryEquipment] : [],
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
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        slot = "offHand";
      } else if (item.slotType === "ring") {
        slot = !this.state.equipment.ring1 ? "ring1" : (!this.state.equipment.ring2 ? "ring2" : "ring1");
      } else if (item.slotType === "earring") {
        slot = !this.state.equipment.earring1 ? "earring1" : (!this.state.equipment.earring2 ? "earring2" : "earring1");
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, message: "無效的裝備欄位。" };
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

  recordBattle(won, stage) {
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
    if (won && stage?.id) {
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
    }
    this.commit("cheat-update");
    return { ok: true, message: "數值已更新！" };
  }

  cheatUnlockAll() {
    this.state.records.bestStage = 4;
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

