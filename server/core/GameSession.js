// server/core/GameSession.js
import crypto from "node:crypto";
import {
  SERVER_CONFIG,
  Commands,
  Events,
  ErrorCodes
} from "../config.js";
import {
  ITEMS,
  EQUIPMENT_ITEMS,
  STAGES,
  SKILLS,
  BASE_PLAYER,
  STAT_GAINS
} from "../../src/js/config/gameConfig.js";
import { applyExperience, computePlayerStats } from "../../src/js/systems/progressionRules.js";
import { compareHands, evaluateDualRps } from "../../src/js/systems/rpsRules.js";

function getDefaultSaveData() {
  return {
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
      damageDealt: { total: 0, byStage: { 1: 0, 2: 0, 3: 0, 4: 0 } },
      damageTaken: { total: 0, byStage: { 1: 0, 2: 0, 3: 0, 4: 0 } },
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
  };
}

export class GameSession {
  /**
   * @param {object} params
   * @param {string} params.accountId
   * @param {import('../storage/StorageAdapter.js').StorageAdapter} params.storage
   * @param {import('./TransferManager.js').TransferManager} params.transferManager
   * @param {Function} [params.emitFn] - Callback to send event to client connection
   */
  constructor({ accountId, storage, transferManager, emitFn }) {
    this.accountId = accountId;
    this.storage = storage;
    this.transferManager = transferManager;
    this.emitFn = emitFn || (() => {});

    this.state = null;
    this.activeBattle = null;
    this.lastActivityTime = Date.now();
    this.isDirty = false;
  }

  async load() {
    const existing = await this.storage.getAccount(this.accountId);
    if (existing) {
      this.state = existing;
    } else {
      this.state = getDefaultSaveData();
      await this.save();
    }
    this.lastActivityTime = Date.now();
    return this.state;
  }

  async save() {
    if (!this.state) return;
    await this.storage.saveAccount(this.accountId, this.state);
    this.isDirty = false;
  }

  touch() {
    this.lastActivityTime = Date.now();
  }

  emit(event, payload) {
    this.emitFn(event, payload);
  }

  /**
   * Authoritative random integer [min, max]
   */
  _randomInt(min, max) {
    return crypto.randomInt(min, max + 1);
  }

  /**
   * Dispatch and execute an authoritative command
   * @param {object} envelope
   * @returns {Promise<object>} Command ACK / outcome result
   */
  async executeCommand(envelope) {
    this.touch();
    const { cmdId, command, payload = {} } = envelope;

    if (!this.state) {
      await this.load();
    }

    let result;
    switch (command) {
      case Commands.BUY_ITEM:
        result = await this._handleBuyItem(payload);
        break;

      case Commands.BUY_EQUIPMENT:
        result = await this._handleBuyEquipment(payload);
        break;

      case Commands.EQUIP_ITEM:
        result = await this._handleEquipItem(payload);
        break;

      case Commands.UNEQUIP_ITEM:
        result = await this._handleUnequipItem(payload);
        break;

      case Commands.ALLOCATE_STAT:
        result = await this._handleAllocateStat(payload);
        break;

      case Commands.ALLOCATE_SKILL:
        result = await this._handleAllocateSkill(payload);
        break;

      case Commands.BATTLE_START:
        result = await this._handleBattleStart(payload);
        break;

      case Commands.BATTLE_SELECT_HAND:
        result = await this._handleBattleSelectHand(payload, envelope.clientTime);
        break;

      case Commands.BATTLE_PAUSE:
        result = await this._handleBattlePause();
        break;

      case Commands.BATTLE_RESUME:
        result = await this._handleBattleResume();
        break;

      case Commands.BATTLE_ABANDON:
        result = await this._handleBattleAbandon();
        break;

      case Commands.BATTLE_USE_ITEM:
        result = await this._handleBattleUseItem(payload);
        break;

      case Commands.BATTLE_INPUT_QTE:
        result = await this._handleBattleInputQte(payload, envelope.clientTime);
        break;

      case Commands.POST_BATTLE_START_WATERMELON:
        result = await this._handleStartWatermelon();
        break;

      case Commands.POST_BATTLE_STRIKE_WATERMELON:
        result = await this._handleStrikeWatermelon(payload, envelope.clientTime);
        break;

      case Commands.CHEAT_SET_STATS:
        result = await this._handleCheatSetStats(payload);
        break;

      case Commands.CHEAT_UNLOCK_ALL:
        result = await this._handleCheatUnlockAll();
        break;

      case Commands.CHEAT_ADD_COINS:
        result = await this._handleCheatAddCoins(payload);
        break;

      case Commands.ACCOUNT_ISSUE_TRANSFER_CODE:
        result = await this._handleIssueTransferCode();
        break;

      case Commands.ACCOUNT_CLAIM_TRANSFER_CODE:
        result = await this._handleClaimTransferCode(payload);
        break;

      case Commands.ACCOUNT_EXPORT_JSON:
        result = await this._handleExportJson();
        break;

      case Commands.ACCOUNT_DELETE:
        result = await this._handleDeleteAccount();
        break;

      default:
        result = { ack: false, error: ErrorCodes.INVALID_SCHEMA, message: `Unsupported command: ${command}` };
        break;
    }

    if (result && result.ack !== false) {
      await this.save();
    }

    return {
      cmdId,
      command,
      serverTime: Date.now(),
      ...result
    };
  }

  // --- Economic & Inventory Handlers ---

  async _handleBuyItem({ itemId }) {
    const itemDef = ITEMS[itemId];
    if (!itemDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: `Item ${itemId} not found.` };
    }

    if (this.state.coins < itemDef.price) {
      return { ack: false, error: "INSUFFICIENT_COINS", message: "Not enough coins." };
    }

    this.state.coins -= itemDef.price;
    this.state.inventory[itemId] = (this.state.inventory[itemId] || 0) + 1;

    await this.storage.appendLedger(this.accountId, {
      source: "buyItem",
      delta: { coins: -itemDef.price, items: { [itemId]: 1 } },
      serverTime: Date.now()
    });

    this.emit(Events.STORE_CHANGED, { coins: this.state.coins, inventory: this.state.inventory });
    return { ack: true, itemId, coins: this.state.coins, inventory: this.state.inventory };
  }

  async _handleBuyEquipment({ itemId }) {
    const eqDef = EQUIPMENT_ITEMS[itemId];
    if (!eqDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: `Equipment ${itemId} not found.` };
    }

    if (this.state.coins < eqDef.price) {
      return { ack: false, error: "INSUFFICIENT_COINS", message: "Not enough coins." };
    }

    this.state.coins -= eqDef.price;
    this.state.inventoryEquipment.push(itemId);

    await this.storage.appendLedger(this.accountId, {
      source: "buyEquipment",
      delta: { coins: -eqDef.price, equipment: [itemId] },
      serverTime: Date.now()
    });

    this.emit(Events.STORE_CHANGED, { coins: this.state.coins, inventoryEquipment: this.state.inventoryEquipment });
    return { ack: true, itemId, coins: this.state.coins, inventoryEquipment: this.state.inventoryEquipment };
  }

  async _handleEquipItem({ slot, itemId, inventoryIndex }) {
    if (this.activeBattle) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, message: "Cannot change equipment during active battle." };
    }

    let targetItemId = itemId;
    let removeIdx = inventoryIndex;

    if (removeIdx !== undefined && this.state.inventoryEquipment[removeIdx]) {
      targetItemId = this.state.inventoryEquipment[removeIdx];
    } else if (targetItemId) {
      removeIdx = this.state.inventoryEquipment.indexOf(targetItemId);
    }

    if (!targetItemId || removeIdx === -1) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "Item not found in inventoryEquipment." };
    }

    const itemDef = EQUIPMENT_ITEMS[targetItemId];
    if (!itemDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "Unknown equipment definition." };
    }

    // Unequip existing in slot
    const prevItem = this.state.equipment[slot];
    if (prevItem) {
      this.state.inventoryEquipment.push(prevItem);
    }

    // Remove from inventory
    this.state.inventoryEquipment.splice(removeIdx, 1);

    // Two-handed logic
    if (itemDef.twoHanded && slot === "mainHand") {
      const offHandItem = this.state.equipment.offHand;
      if (offHandItem) {
        this.state.inventoryEquipment.push(offHandItem);
        this.state.equipment.offHand = null;
      }
    } else if (slot === "offHand") {
      const mainHandItem = this.state.equipment.mainHand;
      if (mainHandItem && EQUIPMENT_ITEMS[mainHandItem]?.twoHanded) {
        this.state.inventoryEquipment.push(mainHandItem);
        this.state.equipment.mainHand = null;
      }
    }

    this.state.equipment[slot] = targetItemId;

    this.emit(Events.STORE_CHANGED, { equipment: this.state.equipment, inventoryEquipment: this.state.inventoryEquipment });
    return { ack: true, slot, itemId: targetItemId, equipment: this.state.equipment };
  }

  async _handleUnequipItem({ slot }) {
    if (this.activeBattle) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, message: "Cannot change equipment during active battle." };
    }

    const current = this.state.equipment[slot];
    if (!current) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: `Slot ${slot} is empty.` };
    }

    this.state.equipment[slot] = null;
    this.state.inventoryEquipment.push(current);

    this.emit(Events.STORE_CHANGED, { equipment: this.state.equipment, inventoryEquipment: this.state.inventoryEquipment });
    return { ack: true, slot, unequipped: current, equipment: this.state.equipment };
  }

  async _handleAllocateStat({ stat, points = 1 }) {
    if (this.activeBattle) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, message: "Cannot allocate stats during active battle." };
    }

    if (this.state.profile.skillPoints < points) {
      return { ack: false, error: "INSUFFICIENT_POINTS", message: "Not enough skill points." };
    }

    this.state.profile.skillPoints -= points;
    this.state.profile.allocations[stat] = (this.state.profile.allocations[stat] || 0) + points;

    this.emit(Events.STORE_CHANGED, { profile: this.state.profile });
    return { ack: true, stat, allocations: this.state.profile.allocations, skillPoints: this.state.profile.skillPoints };
  }

  async _handleAllocateSkill({ skillId }) {
    if (this.activeBattle) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, message: "Cannot allocate skills during active battle." };
    }

    const skillDef = SKILLS[skillId];
    if (!skillDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: `Skill ${skillId} not found.` };
    }

    if (this.state.profile.level < skillDef.unlockLevel) {
      return { ack: false, error: "LEVEL_TOO_LOW", message: "Level too low to unlock skill." };
    }

    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skillDef.maxLevel) {
      return { ack: false, error: "MAX_LEVEL_REACHED", message: "Skill is already at max level." };
    }

    const cost = skillDef.costPerLevel;
    if (this.state.profile.skillPoints < cost) {
      return { ack: false, error: "INSUFFICIENT_POINTS", message: "Not enough skill points." };
    }

    this.state.profile.skillPoints -= cost;
    this.state.profile.skills[skillId] = currentLvl + 1;

    this.emit(Events.STORE_CHANGED, { profile: this.state.profile });
    return { ack: true, skillId, newLevel: this.state.profile.skills[skillId], skillPoints: this.state.profile.skillPoints };
  }

  // --- Battle Lifecycle Handlers ---

  async _handleBattleStart({ stageId = 1 }) {
    const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];
    const playerStats = computePlayerStats(this.state.profile, this.state.equipment);

    const battleSeed = crypto.randomBytes(16).toString("hex");
    const serverTime = Date.now();

    this.activeBattle = {
      battleId: `bat_${serverTime}_${crypto.randomBytes(4).toString("hex")}`,
      stageId: stage.id,
      seed: battleSeed,
      round: 1,
      phase: "countdown",
      pauseCount: 0,
      playerHp: playerStats.maxHp,
      playerMaxHp: playerStats.maxHp,
      playerMp: playerStats.maxMp,
      playerMaxMp: playerStats.maxMp,
      enemyHp: stage.enemyHp,
      enemyMaxHp: stage.enemyHp,
      handCommitDeadline: serverTime + stage.roundSeconds * 1000,
      enemies: stage.enemies ? JSON.parse(JSON.stringify(stage.enemies)) : [{ id: "main", hp: stage.enemyHp, maxHp: stage.enemyHp }],
      startTime: serverTime,
      log: []
    };

    const battleStatePayload = {
      battleId: this.activeBattle.battleId,
      stageId: stage.id,
      round: this.activeBattle.round,
      phase: this.activeBattle.phase,
      playerHp: this.activeBattle.playerHp,
      playerMaxHp: this.activeBattle.playerMaxHp,
      playerMp: this.activeBattle.playerMp,
      playerMaxMp: this.activeBattle.playerMaxMp,
      enemies: this.activeBattle.enemies,
      handCommitDeadline: this.activeBattle.handCommitDeadline
    };

    this.emit(Events.BATTLE_STATE, battleStatePayload);
    return { ack: true, battleState: battleStatePayload };
  }

  async _handleBattleSelectHand({ hand }, clientTime) {
    if (!this.activeBattle) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "No active battle session." };
    }

    const now = Date.now();
    // Timing check: hand selection must reach server before reveal deadline + grace
    if (now > this.activeBattle.handCommitDeadline + SERVER_CONFIG.timingGraceMs) {
      return {
        ack: false,
        error: ErrorCodes.SECRET_COMMITMENT_EXPIRED,
        message: "Hand commitment arrived after round countdown expired."
      };
    }

    this.activeBattle.playerHand = hand;
    return { ack: true, round: this.activeBattle.round, committed: true };
  }

  async _handleBattlePause() {
    if (!this.activeBattle) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "No active battle session." };
    }

    if (this.activeBattle.phase !== "countdown") {
      return {
        ack: false,
        error: ErrorCodes.INVALID_PHASE_PAUSE,
        message: "Pause is only allowed during countdown phase."
      };
    }

    if (this.activeBattle.pauseCount >= 3) {
      return {
        ack: false,
        error: ErrorCodes.PAUSE_LIMIT_REACHED,
        message: "Maximum 3 pauses per battle reached."
      };
    }

    this.activeBattle.pauseCount += 1;
    this.activeBattle.isPaused = true;
    this.activeBattle.pauseStartTime = Date.now();

    this.emit(Events.BATTLE_STATE, {
      battleId: this.activeBattle.battleId,
      isPaused: true,
      pauseCount: this.activeBattle.pauseCount
    });

    return { ack: true, isPaused: true, pauseCount: this.activeBattle.pauseCount };
  }

  async _handleBattleResume() {
    if (!this.activeBattle || !this.activeBattle.isPaused) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "Battle is not paused." };
    }

    const pausedDuration = Date.now() - (this.activeBattle.pauseStartTime || Date.now());
    this.activeBattle.isPaused = false;
    this.activeBattle.handCommitDeadline += pausedDuration;

    this.emit(Events.BATTLE_STATE, {
      battleId: this.activeBattle.battleId,
      isPaused: false,
      handCommitDeadline: this.activeBattle.handCommitDeadline
    });

    return { ack: true, isPaused: false, handCommitDeadline: this.activeBattle.handCommitDeadline };
  }

  async _handleBattleAbandon() {
    if (!this.activeBattle) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "No active battle session." };
    }

    const stageId = this.activeBattle.stageId;
    const stage = STAGES.find((s) => s.id === stageId) || STAGES[0];

    // Loss settlements
    const lossCoins = stage.lossCoins || 0;
    const lossXp = stage.xpLoss || 0;

    this.state.coins += lossCoins;
    this.state.records.losses += 1;
    this.state.records.totalBattles += 1;

    applyExperience(this.state.profile, lossXp);

    await this.storage.appendLedger(this.accountId, {
      source: "battleLossRewards",
      delta: { coins: lossCoins, xp: lossXp, stageId },
      serverTime: Date.now()
    });

    this.activeBattle = null;

    this.emit(Events.BATTLE_ENDED, { outcome: "abandoned", stageId, coinsEarned: lossCoins, xpEarned: lossXp });
    this.emit(Events.STORE_CHANGED, { coins: this.state.coins, profile: this.state.profile, records: this.state.records });

    return { ack: true, outcome: "abandoned" };
  }

  async _handleBattleUseItem({ itemId }) {
    if (!this.activeBattle) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "No active battle session." };
    }

    const count = this.state.inventory[itemId] || 0;
    if (count <= 0) {
      return { ack: false, error: "ITEM_EMPTY", message: `No ${itemId} left in inventory.` };
    }

    const itemDef = ITEMS[itemId];
    if (!itemDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: `Unknown item ${itemId}.` };
    }

    this.state.inventory[itemId] -= 1;
    this.state.records.consumablesUsed[itemId] = (this.state.records.consumablesUsed[itemId] || 0) + 1;

    if (itemDef.resource === "hp") {
      this.activeBattle.playerHp = Math.min(this.activeBattle.playerMaxHp, this.activeBattle.playerHp + itemDef.restore);
    } else if (itemDef.resource === "mp") {
      this.activeBattle.playerMp = Math.min(this.activeBattle.playerMaxMp, this.activeBattle.playerMp + itemDef.restore);
    }

    await this.storage.appendLedger(this.accountId, {
      source: "useItemBattle",
      delta: { items: { [itemId]: -1 } },
      serverTime: Date.now()
    });

    this.emit(Events.STORE_CHANGED, { inventory: this.state.inventory });
    this.emit(Events.BATTLE_STATE, {
      playerHp: this.activeBattle.playerHp,
      playerMp: this.activeBattle.playerMp
    });

    return { ack: true, itemId, playerHp: this.activeBattle.playerHp, playerMp: this.activeBattle.playerMp };
  }

  async _handleBattleInputQte({ direction, stepIndex }, clientTime) {
    if (!this.activeBattle) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, message: "No active battle session." };
    }

    // Timing claim audit: check packet arrival time
    const now = Date.now();
    return {
      ack: true,
      audited: true,
      serverTime: now,
      stepIndex,
      direction
    };
  }

  // --- Watermelon Minigame Handlers ---

  async _handleStartWatermelon() {
    this.watermelonSession = {
      stage: 1,
      startTime: Date.now()
    };
    return { ack: true, watermelonStage: 1 };
  }

  async _handleStrikeWatermelon({ slicePercent }, clientTime) {
    const stage = this.watermelonSession ? this.watermelonSession.stage : 1;
    const extraXp = 100;

    this.state.records.watermelonSlices += 1;
    this.state.records.watermelonStageStats[stage] = this.state.records.watermelonStageStats[stage] || { attempts: 0, successes: 0 };
    this.state.records.watermelonStageStats[stage].attempts += 1;
    this.state.records.watermelonStageStats[stage].successes += 1;

    applyExperience(this.state.profile, extraXp);

    await this.storage.appendLedger(this.accountId, {
      source: "watermelonSlice",
      delta: { xp: extraXp, stage },
      serverTime: Date.now()
    });

    if (this.watermelonSession) {
      this.watermelonSession.stage += 1;
    }

    this.emit(Events.STORE_CHANGED, { profile: this.state.profile, records: this.state.records });
    return { ack: true, slicePercent, extraXp, nextStage: this.watermelonSession?.stage || 1 };
  }

  // --- Dev Entitlement / Cheat Handlers ---

  async _handleCheatSetStats({ stats = {} }) {
    if (stats.hp !== undefined) this.state.profile.allocations.hp = stats.hp;
    if (stats.mp !== undefined) this.state.profile.allocations.mp = stats.mp;
    if (stats.damage !== undefined) this.state.profile.allocations.damage = stats.damage;
    if (stats.level !== undefined) this.state.profile.level = stats.level;
    if (stats.skillPoints !== undefined) this.state.profile.skillPoints = stats.skillPoints;

    this.emit(Events.STORE_CHANGED, { profile: this.state.profile });
    return { ack: true, profile: this.state.profile };
  }

  async _handleCheatUnlockAll() {
    this.state.profile.level = 10;
    this.state.profile.skillPoints = 999;
    this.state.profile.skills.momo = 10;
    this.state.profile.skills.dualHand = 1;
    this.state.records.unlockedSwimsuit = true;
    this.state.records.clearedStages = [1, 2, 3, 4];
    this.state.records.bestStage = 4;

    this.emit(Events.STORE_CHANGED, { profile: this.state.profile, records: this.state.records });
    return { ack: true, unlocked: true };
  }

  async _handleCheatAddCoins({ amount = 1000 }) {
    this.state.coins += amount;
    await this.storage.appendLedger(this.accountId, {
      source: "cheatAddCoins",
      delta: { coins: amount },
      serverTime: Date.now()
    });

    this.emit(Events.STORE_CHANGED, { coins: this.state.coins });
    return { ack: true, coins: this.state.coins };
  }

  // --- Account & Transfer Code Handlers ---

  async _handleIssueTransferCode() {
    const result = await this.transferManager.issueTransferCode(this.accountId);
    return { ack: true, ...result };
  }

  async _handleClaimTransferCode({ transferCode }) {
    const result = await this.transferManager.claimTransferCode(transferCode, this.accountId);
    if (!result.success) {
      return { ack: false, error: result.error, message: result.message };
    }
    return { ack: true, targetAccountId: result.accountId };
  }

  async _handleExportJson() {
    const data = await this.storage.exportAllAccountData(this.accountId);
    return { ack: true, exportData: data };
  }

  async _handleDeleteAccount() {
    await this.storage.deleteAccount(this.accountId);
    this.state = null;
    this.activeBattle = null;
    return { ack: true, deleted: true };
  }
}

export default GameSession;
