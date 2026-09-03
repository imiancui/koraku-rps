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
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { PostBattleSystem } from "../../src/js/systems/PostBattleSystem.js";

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
  constructor({ accountId, deviceId = null, storage, transferManager, emitFn, battleLockPolicy = "always" }) {
    this.accountId = accountId;
    this.deviceId = deviceId;
    this.storage = storage;
    this.transferManager = transferManager;
    this.emitFn = emitFn || (() => {});
    this.battleLockPolicy = battleLockPolicy;

    this.state = null;
    this._currentBattleId = null;
    this._systemsInitialized = false;
    this.lastActivityTime = Date.now();
    this.isDirty = false;
  }

  isMutationLocked() {
    if (!this.activeBattle) {
      return false;
    }

    const policy = this.battleLockPolicy || "always";
    if (policy === "never") {
      return false;
    }

    if (policy === "always") {
      return true;
    }

    if (policy === "countdown") {
      // In countdown policy, mutations are locked only during commitment (reaction) and QTE adjudication phases
      const phase = this.activeBattle.phase;
      if (phase === "reaction" || phase === "qte") {
        return true;
      }
      return false;
    }

    return true;
  }

  get activeBattle() {
    if (this.battle && this.battle.isBattleActive()) {
      const snap = this.battle.snapshot();
      if (snap) {
        if (!snap.battleId) {
          snap.battleId = this._currentBattleId || `bat_${this.battle.battleStartTime || Date.now()}_${(this.battle.battleSeed || 0).toString(16)}`;
        }
        const deadline = snap.countdownRemainingMs ? (Date.now() + snap.countdownRemainingMs) : (snap.revealDeadline || snap.deadline || this.battle.countdownDeadline || 0);
        snap.revealDeadline = deadline;
        snap.deadline = deadline;
        snap.pauseCount = this.battle.pauseCount || 0;
        snap.roundSeconds = snap.stage?.roundSeconds || 3;
        delete snap.seed;
        delete snap.commandLog;
      }
      return snap;
    }
    return null;
  }

  set activeBattle(val) {
    if (val === null && this.battle?.state) {
      this.battle.state.active = false;
      this.battle.state.phase = "ended";
    }
  }

  _initSystems() {
    if (this._systemsInitialized) return;
    this._systemsInitialized = true;

    this.bus = new EventBus();
    const persistenceAdapter = {
      load: () => this.state || getDefaultSaveData(),
      save: (state) => {
        this.state = state;
        this.isDirty = true;
      }
    };
    const cryptoRandom = () => crypto.randomBytes(4).readUInt32LE(0) / 4294967296;

    this.store = new GameStore(this.bus, persistenceAdapter, {
      now: () => Date.now(),
      random: cryptoRandom
    });

    this.battle = new BattleSystem(this.bus, this.store, cryptoRandom, () => Date.now());
    this.postBattle = new PostBattleSystem(this.bus, this.store, cryptoRandom, () => Date.now());

    this.bus.on("battle:ended", (result) => {
      this._battleEndedPromise = (async () => {
        this.postBattle.open(result);
        try {
          const stageId = result.stage?.id || 1;
          const coins = result.reward?.coins || 0;
          const xp = result.reward?.xp || 0;
          await this.storage.appendLedger(this.accountId, {
            source: result.won ? "battleVictory" : "battleDefeat",
            delta: { coins, xp, stageId },
            serverTime: Date.now()
          });
          if (this._currentBattleId && this.battle?.battleSeed) {
            await this.storage.saveBattleReplay(this.accountId, {
              battleId: this._currentBattleId,
              seed: this.battle.battleSeed,
              stageId,
              commandLog: [...(this.battle.commandLog || [])],
              result: {
                won: result.won,
                damageDealt: result.damageDealt,
                damageTaken: result.damageTaken
              },
              recordedAt: Date.now()
            });
          }
          await this.save();
        } catch (err) {
          console.error("[GameSession] Error recording battle outcome:", err);
        }
      })();
    });

    const forwardEvents = [
      Events.STORE_CHANGED,
      Events.BATTLE_STATE,
      Events.BATTLE_EFFECT,
      Events.BATTLE_DAMAGE_LOGGED,
      Events.BATTLE_ENDED,
      Events.QTE_UPDATE,
      Events.POSTBATTLE_STATE,
      Events.POSTBATTLE_AUTO_WATERMELON,
      Events.AUTOBATTLE_STREAM_CHUNK,
      Events.AUTOBATTLE_ROUND_COMPLETED,
      Events.AUTOBATTLE_SUMMARY,
      Events.DIALOGUE,
      Events.TOAST,
      "sound",
      "battle:countdown-beat"
    ];

    for (const evt of forwardEvents) {
      this.bus.on(evt, (payload) => {
        let forwardedPayload = payload;
        if (evt === Events.BATTLE_STATE && payload && typeof payload === "object") {
          forwardedPayload = { ...payload };
          delete forwardedPayload.seed;
          delete forwardedPayload.commandLog;
        } else if (evt === Events.BATTLE_ENDED && payload && typeof payload === "object") {
          forwardedPayload = { ...payload };
          delete forwardedPayload.seed;
          delete forwardedPayload.commandLog;
          if (forwardedPayload.battle && typeof forwardedPayload.battle === "object") {
            forwardedPayload.battle = { ...forwardedPayload.battle };
            delete forwardedPayload.battle.seed;
            delete forwardedPayload.battle.commandLog;
          }
        }
        this.emit(evt, forwardedPayload);
      });
    }
  }

  handleDisconnect() {
    this.touch();
    if (this.battle && typeof this.battle.handleDisconnect === "function" && this.battle.isBattleActive()) {
      this.battle.handleDisconnect();
    }
  }

  handleReconnect() {
    this.touch();
    if (this.battle && typeof this.battle.handleReconnect === "function" && this.battle.isBattleActive()) {
      this.battle.handleReconnect();
    }
  }

  async load() {
    const existing = await this.storage.getAccount(this.accountId);
    if (existing) {
      this.state = existing;
    } else {
      this.state = getDefaultSaveData();
      await this.save();
    }
    this._initSystems();
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
    } else if (!this._systemsInitialized) {
      this._initSystems();
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

      case Commands.BATTLE_SELECT_TARGET:
        result = await this._handleBattleSelectTarget(payload);
        break;

      case Commands.BATTLE_USE_MORPH:
        result = await this._handleBattleUseMorph(payload, envelope.clientTime);
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

      case Commands.AUTO_BATTLE_START:
        result = await this._handleAutoBattleStart(payload);
        break;

      case Commands.AUTO_BATTLE_STOP:
        result = await this._handleAutoBattleStop();
        break;

      case Commands.POST_BATTLE_REQUEST_SWIMSUIT:
        result = await this._handlePostBattleRequestSwimsuit();
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
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "shop.itemNotFound", message: `Item ${itemId} not found.` };
    }

    if (this.state.coins < itemDef.price) {
      return { ack: false, error: "INSUFFICIENT_COINS", key: "shop.insufficientCoins", message: "Not enough coins." };
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
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "shop.itemNotFound", message: `Equipment ${itemId} not found.` };
    }

    if (this.state.coins < eqDef.price) {
      return { ack: false, error: "INSUFFICIENT_COINS", key: "shop.insufficientCoins", message: "Not enough coins." };
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

  async _handleEquipItem({ slot, itemId, typeId, inventoryIndex }) {
    if (this.isMutationLocked()) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, key: "battle.lockedDuringBattle", message: "Equipment and stat allocation are locked during active battle." };
    }

    let targetItemId = itemId || typeId;
    let removeIdx = inventoryIndex;

    if (removeIdx !== undefined && this.state.inventoryEquipment[removeIdx]) {
      targetItemId = this.state.inventoryEquipment[removeIdx];
    } else if (targetItemId) {
      removeIdx = this.state.inventoryEquipment.indexOf(targetItemId);
    }

    if (!targetItemId || removeIdx === -1) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "equip.notInInventory", message: "Item not found in inventoryEquipment." };
    }

    const itemDef = EQUIPMENT_ITEMS[targetItemId];
    if (!itemDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "equip.invalidItem", message: "Unknown equipment definition." };
    }

    // Unequip existing in slot
    const prevItem = this.state.equipment[slot];
    if (prevItem) {
      this.state.inventoryEquipment.push(prevItem);
    }

    // Remove new item from inventory
    this.state.inventoryEquipment.splice(removeIdx, 1);

    // Two-handed weapon logic: clears subWeapon
    if (itemDef.twoHanded && slot === "weapon") {
      const subItem = this.state.equipment.subWeapon;
      if (subItem) {
        this.state.inventoryEquipment.push(subItem);
        this.state.equipment.subWeapon = null;
      }
    }

    // Equipping into subWeapon when two-handed weapon is equipped unequips the weapon
    if (slot === "subWeapon" && this.state.equipment.weapon) {
      const mainDef = EQUIPMENT_ITEMS[this.state.equipment.weapon];
      if (mainDef?.twoHanded) {
        this.state.inventoryEquipment.push(this.state.equipment.weapon);
        this.state.equipment.weapon = null;
      }
    }

    this.state.equipment[slot] = targetItemId;

    this.emit(Events.STORE_CHANGED, { equipment: this.state.equipment, inventoryEquipment: this.state.inventoryEquipment });
    return { ack: true, slot, itemId: targetItemId, equipment: this.state.equipment };
  }

  async _handleUnequipItem({ slot }) {
    if (this.isMutationLocked()) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, key: "battle.lockedDuringBattle", message: "Equipment and stat allocation are locked during active battle." };
    }

    const current = this.state.equipment[slot];
    if (!current) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "equip.slotEmpty", message: `Slot ${slot} is empty.` };
    }

    this.state.equipment[slot] = null;
    this.state.inventoryEquipment.push(current);

    this.emit(Events.STORE_CHANGED, { equipment: this.state.equipment, inventoryEquipment: this.state.inventoryEquipment });
    return { ack: true, slot, unequipped: current, equipment: this.state.equipment };
  }

  async _handleAllocateStat({ stat, points = 1 }) {
    if (this.isMutationLocked()) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, key: "battle.lockedDuringBattle", message: "Equipment and stat allocation are locked during active battle." };
    }

    if (this.state.profile.skillPoints < points) {
      return { ack: false, error: "INSUFFICIENT_POINTS", key: "growth.noPoints", message: "Not enough skill points." };
    }

    this.state.profile.skillPoints -= points;
    this.state.profile.allocations[stat] = (this.state.profile.allocations[stat] || 0) + points;

    this.emit(Events.STORE_CHANGED, {
      profile: this.state.profile,
      coins: this.state.coins,
      inventory: this.state.inventory,
      equipment: this.state.equipment,
      playerStats: computePlayerStats(this.state.profile, this.state.equipment)
    });
    return { ack: true, stat, allocations: this.state.profile.allocations, skillPoints: this.state.profile.skillPoints };
  }

  async _handleAllocateSkill({ skillId }) {
    if (this.isMutationLocked()) {
      return { ack: false, error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED, key: "battle.lockedDuringBattle", message: "Equipment and stat allocation are locked during active battle." };
    }

    const skillDef = SKILLS[skillId];
    if (!skillDef) {
      return { ack: false, error: ErrorCodes.NOT_FOUND, key: "growth.invalidSkill", message: `Skill ${skillId} not found.` };
    }

    if (this.state.profile.level < skillDef.unlockLevel) {
      return { ack: false, error: "LEVEL_TOO_LOW", key: "growth.levelRequirementNotMet", message: "Level too low to unlock skill." };
    }

    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skillDef.maxLevel) {
      return { ack: false, error: "MAX_LEVEL_REACHED", key: "growth.skillMaxLevel", message: "Skill is already at max level." };
    }

    const cost = skillDef.costPerLevel;
    if (this.state.profile.skillPoints < cost) {
      return { ack: false, error: "INSUFFICIENT_POINTS", key: "growth.insufficientPoints", message: "Not enough skill points." };
    }

    this.state.profile.skillPoints -= cost;
    this.state.profile.skills[skillId] = currentLvl + 1;

    this.emit(Events.STORE_CHANGED, {
      profile: this.state.profile,
      coins: this.state.coins,
      inventory: this.state.inventory,
      equipment: this.state.equipment,
      playerStats: computePlayerStats(this.state.profile, this.state.equipment)
    });
    return { ack: true, skillId, newLevel: this.state.profile.skills[skillId], skillPoints: this.state.profile.skillPoints };
  }

  // --- Battle Lifecycle Handlers ---

  async _handleBattleStart({ stageId = 1, options = {} }) {
    if (this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
        key: "battleLog.battleInProgress",
        message: "Battle already in progress."
      };
    }

    const battleOpts = { ...(options.options || {}), ...(options || {}) };
    // Authority Policy #9: All outcome-affecting RNG is cryptographically generated by server
    const seed = crypto.randomInt(1, 2147483647);
    this._currentBattleId = `bat_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

    const startOk = this.battle.start(stageId, { ...battleOpts, seed });
    if (!startOk) {
      return {
        ack: false,
        error: "BATTLE_START_FAILED",
        key: "battleLog.battleStartFailed",
        message: "Failed to start battle."
      };
    }

    const snap = this.activeBattle;
    return { ack: true, battleState: snap };
  }

  async _handleBattleSelectHand(payload = {}, clientTime) {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }

    const now = Date.now();
    const deadline = this.activeBattle.revealDeadline || 0;
    if (deadline && now > deadline + SERVER_CONFIG.timingGraceMs) {
      return {
        ack: false,
        error: ErrorCodes.SECRET_COMMITMENT_EXPIRED,
        key: "battleLog.roundTimeout",
        message: "Hand commitment arrived after round countdown expired."
      };
    }

    const hand = payload.hand || payload.playerHand;
    const slot = payload.slot || null;
    const hand2 = payload.hand2 || null;
    const declaredAt = payload.declaredAt || clientTime || now;
    const boundedDeclaredAt = Math.min(declaredAt, now + SERVER_CONFIG.timingGraceMs);

    let result;
    if (hand2 && !slot) {
      this.battle.selectHand(hand, "left", boundedDeclaredAt);
      result = this.battle.selectHand(hand2, "right", boundedDeclaredAt);
    } else {
      result = this.battle.selectHand(hand, slot, boundedDeclaredAt);
    }

    if (this._battleEndedPromise && (!this.battle.state || !this.battle.state.active)) {
      await this._battleEndedPromise;
    }

    return {
      ack: true,
      round: this.battle.state?.round || 1,
      committed: true,
      result,
      battleState: this.activeBattle
    };
  }

  async _handleBattleSelectTarget(payload = {}) {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }
    const target = payload.target || "left";
    const ok = this.battle.selectTarget(target);
    return {
      ack: ok !== false,
      target,
      battleState: this.activeBattle
    };
  }

  async _handleBattleUseMorph(payload = {}, clientTime) {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }
    const now = Date.now();
    if (this.activeBattle.reactionExpiresAt && now > this.activeBattle.reactionExpiresAt + SERVER_CONFIG.timingGraceMs) {
      return {
        ack: false,
        error: "MORPH_EXPIRED",
        key: "combat.morphWindowExpired",
        message: "Morph command arrived after reaction window expired."
      };
    }
    const declaredAt = typeof clientTime === "number" ? clientTime : (typeof payload.declaredAt === "number" ? payload.declaredAt : now);
    const res = this.battle.useMorph(declaredAt);
    return {
      ack: res?.ok !== false,
      result: res,
      battleState: this.activeBattle
    };
  }

  async _handleBattlePause() {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }

    if (this.battle.state?.phase !== "countdown") {
      return {
        ack: false,
        error: ErrorCodes.INVALID_PHASE_PAUSE,
        key: "battleLog.invalidPhasePause",
        message: "Pause is only allowed during countdown phase."
      };
    }

    if (this.battle.pauseCount >= 3) {
      return {
        ack: false,
        error: ErrorCodes.PAUSE_LIMIT_REACHED,
        key: "battleLog.battlePauseCount",
        params: { remaining: 0 },
        message: "Maximum 3 pauses per battle reached."
      };
    }

    const res = this.battle.pause();
    return {
      ack: res?.ok !== false,
      isPaused: true,
      pauseCount: this.battle.pauseCount,
      battleState: this.activeBattle
    };
  }

  async _handleBattleResume() {
    if (!this.activeBattle || !this.battle.state?.isPaused) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "Battle is not paused."
      };
    }

    const res = this.battle.resume();
    const deadline = this.activeBattle?.revealDeadline;
    return {
      ack: res?.ok !== false,
      isPaused: false,
      revealDeadline: deadline,
      battleState: this.activeBattle
    };
  }

  async _handleBattleAbandon() {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }

    const stageId = this.battle.state?.stage?.id || 1;
    if (this._currentBattleId && this.battle?.battleSeed) {
      try {
        await this.storage.saveBattleReplay(this.accountId, {
          battleId: this._currentBattleId,
          seed: this.battle.battleSeed,
          stageId,
          commandLog: [...(this.battle.commandLog || [])],
          result: {
            won: false,
            damageDealt: this.battle.battleDamageDealt || 0,
            damageTaken: this.battle.battleDamageTaken || 0,
            abandoned: true
          },
          recordedAt: Date.now()
        });
      } catch (err) {
        console.error("[GameSession] Error saving battle replay on abandon:", err);
      }
    }

    this.battle.end(false);
    this.battle.abandon();
    if (this._battleEndedPromise) {
      await this._battleEndedPromise;
    }
    await this.save();

    return { ack: true, outcome: "abandoned" };
  }

  async _handleBattleUseItem({ itemId }) {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }

    const res = this.battle.useItem(itemId);
    if (!res || !res.ok) {
      return {
        ack: false,
        error: res?.key || "USE_ITEM_FAILED",
        key: res?.key || "battleLog.useItemFailed",
        message: res?.message || "Failed to use item."
      };
    }

    await this.storage.appendLedger(this.accountId, {
      source: "useItemBattle",
      delta: { items: { [itemId]: -1 } },
      serverTime: Date.now()
    });
    await this.save();

    return {
      ack: true,
      itemId,
      restored: res.restored,
      playerHp: this.battle.state?.playerHp,
      playerMp: this.battle.state?.playerMp,
      battleState: this.activeBattle
    };
  }

  async _handleBattleInputQte(payload = {}, clientTime) {
    if (!this.activeBattle) {
      return {
        ack: false,
        error: ErrorCodes.NOT_FOUND,
        key: "battleLog.noActiveBattle",
        message: "No active battle session."
      };
    }

    const direction = payload.direction || payload.input || payload.key;
    const slot = payload.slot || null;
    const now = Date.now();
    const declaredAt = payload.declaredAt || clientTime || now;
    const boundedDeclaredAt = Math.min(declaredAt, now + SERVER_CONFIG.timingGraceMs);

    const ok = this.battle.inputQte(direction, slot, boundedDeclaredAt);

    return {
      ack: true,
      audited: true,
      serverTime: now,
      direction,
      success: ok,
      battleState: this.activeBattle
    };
  }

  // --- Auto Battle Handlers ---

  async _handleAutoBattleStart({ stageId = 1, rounds = 10 }) {
    const safeRounds = Math.max(1, Math.min(100, Math.floor(Number(rounds) || 10)));
    this.battle.startAutoBattle(stageId, safeRounds);
    return {
      ack: true,
      autoBattle: { ...this.battle.autoBattle }
    };
  }

  async _handleAutoBattleStop() {
    this.battle.stopAutoBattle();
    return {
      ack: true,
      autoBattle: { ...this.battle.autoBattle }
    };
  }

  // --- Post-Battle & Watermelon Minigame Handlers ---

  async _handlePostBattleRequestSwimsuit() {
    this.postBattle.requestSwimsuit();
    await this.save();
    return {
      ack: true,
      scene: this.postBattle.state?.scene,
      appearance: this.postBattle.state?.appearance
    };
  }

  async _handleStartWatermelon() {
    this.postBattle.startWatermelon();
    return {
      ack: true,
      scene: this.postBattle.state?.scene,
      target: this.postBattle.state?.target,
      tolerance: this.postBattle.state?.tolerance,
      watermelonStage: (this.postBattle.state?.watermelon?.attempts || 0) + 1
    };
  }

  async _handleStrikeWatermelon(payload = {}, clientTime) {
    if (!this.postBattle.state || this.postBattle.state.scene !== "watermelonAim") {
      return {
        ack: false,
        error: "INVALID_STATE",
        key: "dialogue.watermelonNotAim",
        message: "Watermelon game not in aim phase."
      };
    }

    const now = Date.now();
    const declaredAt = payload.declaredAt || clientTime || now;
    const boundedTime = Math.min(declaredAt, now + SERVER_CONFIG.timingGraceMs);

    // Authoritative strike execution via PostBattleSystem
    this.postBattle.strike(boundedTime);

    const attempts = this.postBattle.state.watermelon.attempts;
    const lastCutSuccess = this.postBattle.state.watermelon.lastCutSuccess;
    const successes = this.postBattle.state.watermelon.successes;

    await this.storage.appendLedger(this.accountId, {
      source: "watermelonSlice",
      delta: { stage: attempts, success: lastCutSuccess },
      serverTime: now
    });
    await this.save();

    return {
      ack: true,
      audited: true,
      slicePercent: payload.slicePercent,
      success: lastCutSuccess,
      attempts,
      successes,
      scene: this.postBattle.state.scene,
      nextStage: attempts + 1
    };
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

  async _handleClaimTransferCode(payload = {}) {
    const transferCode = payload.transferCode;
    const deviceId = payload.deviceId || this.deviceId || null;
    const result = await this.transferManager.claimTransferCode(transferCode, deviceId);
    if (!result.success) {
      return {
        ack: false,
        error: result.error,
        key: result.key || "save.transferClaimFailed",
        message: result.message
      };
    }
    return {
      ack: true,
      targetAccountId: result.accountId,
      token: result.token,
      account: result.account
    };
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
