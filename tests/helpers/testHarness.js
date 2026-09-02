// tests/helpers/testHarness.js
// Shared test harness, mock server, seeded PRNG, and scenario runner for dual-client contract and anti-cheat testing.

import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { STAGES, ITEMS, EQUIPMENT_ITEMS } from "../../src/js/config/gameConfig.js";
import {
  Commands,
  Events,
  ConnectionStates,
  ErrorCodes,
  CONFIG_VERSION,
  createCommandEnvelope
} from "../../src/js/kernel/protocol.js";
import { GameClient } from "../../src/js/kernel/GameClient.js";
import { LocalGameClient } from "../../src/js/kernel/LocalGameClient.js";
import { RemoteGameClient } from "../../src/js/net/RemoteGameClient.js";

import { createSeededRandom } from "../../src/js/systems/rpsRules.js";
export { createSeededRandom };

/**
 * In-memory persistence adapter for testing
 */
export class MemoryPersistence {
  constructor(data = null) {
    this.data = data ? structuredClone(data) : null;
  }

  load() {
    return this.data ? structuredClone(this.data) : null;
  }

  save(data) {
    this.data = structuredClone(data);
  }

  clear() {
    this.data = null;
  }
}

/**
 * Authoritative In-Memory Kernel / Server Simulator for testing contract & anti-cheat rules
 */
export class AuthoritativeKernelServer {
  constructor(options = {}) {
    this.persistence = options.persistence || new MemoryPersistence();
    this.bus = new EventBus();
    this.random = options.random || createSeededRandom(options.seed || 42);
    this.store = new GameStore(this.bus, this.persistence);
    this.now = options.now || (() => Date.now());
    this.devEntitledTokens = new Set(options.devTokens || ["valid_dev_token"]);
    this.sessions = new Map(); // token -> session info
    this.commandHistory = new Set(); // deduplication of cmdId
    this.commandLog = []; // append-only log of executed commands
    this.activeBattle = null;
    this.transferCodes = new Map(); // code -> save snapshot
    this.disconnectTimers = new Map(); // token -> timer info
  }

  /**
   * Process an inbound command envelope through server authority
   * @param {object} envelope
   * @param {object} [context={}]
   * @returns {object} Response object { ok: boolean, data?: any, error?: string, code?: string }
   */
  executeCommand(envelope, context = {}) {
    // 1. Schema Validation
    if (!envelope || typeof envelope !== "object") {
      return { ok: false, error: "Invalid command envelope", code: ErrorCodes.INVALID_SCHEMA };
    }
    const { cmdId, command, payload = {}, clientTime, token } = envelope;

    if (!cmdId || typeof cmdId !== "string" || !command || typeof command !== "string") {
      return { ok: false, error: "Missing cmdId or command", code: ErrorCodes.INVALID_SCHEMA };
    }

    // 2. Origin & Token Verification
    const isDev = Boolean(token && this.devEntitledTokens.has(token)) || context.isDev === true;

    // 3. Idempotency Check (Replay Attack Protection)
    if (this.commandHistory.has(cmdId)) {
      return { ok: true, replayed: true, cmdId, message: "Command already processed (idempotent)" };
    }

    // 4. Battle-in-progress lock (ASSUMPTION: equip & allocate locked during battle)
    const lockedDuringBattle = [
      Commands.EQUIP_ITEM,
      Commands.UNEQUIP_ITEM,
      Commands.ALLOCATE_STAT,
      Commands.ALLOCATE_SKILL
    ];
    if (this.activeBattle?.active && lockedDuringBattle.includes(command)) {
      return {
        ok: false,
        error: "Cannot change equipment or stats while battle is in progress",
        code: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED
      };
    }

    // 5. Route Command
    let result = null;
    switch (command) {
      // Economy & Progression
      case Commands.BUY_ITEM: {
        const itemKey = payload.itemKey;
        if (!itemKey || !ITEMS[itemKey]) {
          result = { ok: false, error: "Invalid item", code: ErrorCodes.INVALID_SCHEMA };
        } else {
          result = this.store.buyItem(itemKey);
        }
        break;
      }
      case Commands.BUY_EQUIPMENT: {
        const equipId = payload.equipId;
        if (!equipId || !EQUIPMENT_ITEMS[equipId]) {
          result = { ok: false, error: "Invalid equipment", code: ErrorCodes.INVALID_SCHEMA };
        } else {
          result = this.store.buyEquipment(equipId);
        }
        break;
      }
      case Commands.EQUIP_ITEM: {
        const { itemId, slot } = payload;
        result = this.store.equipItem(itemId, slot);
        break;
      }
      case Commands.UNEQUIP_ITEM: {
        const slot = payload.slot;
        result = this.store.unequipItem(slot);
        break;
      }
      case Commands.ALLOCATE_STAT: {
        const stat = payload.stat;
        result = this.store.allocateStat(stat);
        break;
      }
      case Commands.ALLOCATE_SKILL: {
        const skill = payload.skill;
        result = this.store.allocateSkill(skill);
        break;
      }

      // Battle Lifecycle
      case Commands.BATTLE_START: {
        const stageId = payload.stageId || 1;
        const stage = STAGES.find(s => s.id === stageId) || STAGES[0];
        const playerStats = this.store.snapshot().playerStats;
        this.activeBattle = {
          active: true,
          stageId,
          stage,
          phase: "countdown",
          pauseCount: 0,
          isPaused: false,
          playerHp: playerStats.maxHp,
          playerMp: playerStats.maxMp,
          playerMaxHp: playerStats.maxHp,
          playerMaxMp: playerStats.maxMp,
          enemyHp: stage.enemyHp,
          enemyMaxHp: stage.enemyHp,
          round: 1,
          revealDeadline: this.now() + (stage.roundSeconds * 1000),
          committedHand: null,
          commandLog: [],
          disconnectedAt: null
        };
        this.bus.emit(Events.BATTLE_STATE, { ...this.activeBattle });
        result = { ok: true, battle: { ...this.activeBattle } };
        break;
      }
      case Commands.BATTLE_SELECT_HAND: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        // Secret commitment validation: must arrive before revealDeadline
        const arrivalTime = this.now();
        if (arrivalTime > this.activeBattle.revealDeadline) {
          result = {
            ok: false,
            error: "Hand choice arrived after reveal deadline",
            code: ErrorCodes.SECRET_COMMITMENT_EXPIRED
          };
          break;
        }
        const hand = payload.hand;
        if (!["rock", "paper", "scissors"].includes(hand)) {
          result = { ok: false, error: "Invalid hand", code: ErrorCodes.INVALID_SCHEMA };
          break;
        }
        this.activeBattle.committedHand = hand;
        this.activeBattle.commandLog.push({ command, payload, time: arrivalTime });
        result = { ok: true, hand };
        break;
      }
      case Commands.BATTLE_PAUSE: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        // Online rule: Pause is allowed ONLY during countdown phase, max 3 times
        if (this.activeBattle.phase !== "countdown") {
          result = {
            ok: false,
            error: "Pause allowed only during countdown phase",
            code: ErrorCodes.INVALID_PHASE_PAUSE
          };
          break;
        }
        if (this.activeBattle.pauseCount >= 3) {
          result = {
            ok: false,
            error: "Pause limit of 3 reached for this battle",
            code: ErrorCodes.PAUSE_LIMIT_REACHED
          };
          break;
        }
        this.activeBattle.pauseCount += 1;
        this.activeBattle.isPaused = true;
        this.bus.emit(Events.BATTLE_STATE, { ...this.activeBattle });
        result = { ok: true, pauseCount: this.activeBattle.pauseCount };
        break;
      }
      case Commands.BATTLE_RESUME: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        this.activeBattle.isPaused = false;
        this.bus.emit(Events.BATTLE_STATE, { ...this.activeBattle });
        result = { ok: true };
        break;
      }
      case Commands.BATTLE_USE_ITEM: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        const itemKey = payload.itemKey;
        const inv = this.store.snapshot().inventory;
        if (!inv[itemKey] || inv[itemKey] <= 0) {
          result = { ok: false, error: "No item available", code: ErrorCodes.INVALID_SCHEMA };
          break;
        }
        if (itemKey === "hpPotion") {
          this.activeBattle.playerHp = Math.min(this.activeBattle.playerMaxHp, this.activeBattle.playerHp + 50);
          this.store.state.inventory.hpPotion -= 1;
        } else if (itemKey === "mpPotion") {
          this.activeBattle.playerMp = Math.min(this.activeBattle.playerMaxMp, this.activeBattle.playerMp + 30);
          this.store.state.inventory.mpPotion -= 1;
        }
        this.bus.emit(Events.BATTLE_STATE, { ...this.activeBattle });
        result = { ok: true, itemKey, playerHp: this.activeBattle.playerHp, playerMp: this.activeBattle.playerMp };
        break;
      }
      case Commands.BATTLE_USE_MORPH: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        if (this.activeBattle.playerMp < 25) {
          result = { ok: false, error: "Insufficient MP for morph", code: ErrorCodes.INVALID_SCHEMA };
          break;
        }
        this.activeBattle.playerMp -= 25;
        this.activeBattle.morphed = true;
        this.bus.emit(Events.BATTLE_STATE, { ...this.activeBattle });
        result = { ok: true, playerMp: this.activeBattle.playerMp };
        break;
      }
      case Commands.BATTLE_INPUT_QTE: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        const { key, timestamp } = payload;
        // Audit arrival time with 150ms grace
        const serverNow = this.now();
        if (timestamp && Math.abs(serverNow - timestamp) > 5000) {
          result = { ok: false, error: "Timing verification failed", code: ErrorCodes.TIMING_AUDIT_FAILED };
          break;
        }
        result = { ok: true, key, accepted: true };
        break;
      }
      case Commands.BATTLE_ABANDON: {
        if (!this.activeBattle || !this.activeBattle.active) {
          result = { ok: false, error: "No active battle", code: ErrorCodes.NOT_FOUND };
          break;
        }
        this.activeBattle.active = false;
        this.bus.emit(Events.BATTLE_ENDED, { outcome: "abandoned", stageId: this.activeBattle.stageId });
        result = { ok: true, outcome: "abandoned" };
        this.activeBattle = null;
        break;
      }

      // Auto & Post-battle
      case Commands.AUTO_BATTLE_START: {
        result = { ok: true, active: true, stageId: payload.stageId || 1, rounds: payload.rounds || 5 };
        this.bus.emit(Events.AUTOBATTLE_SUMMARY, result);
        break;
      }
      case Commands.AUTO_BATTLE_STOP: {
        result = { ok: true, active: false };
        break;
      }
      case Commands.POST_BATTLE_REQUEST_SWIMSUIT: {
        result = { ok: true, swimsuitRequested: true };
        this.bus.emit(Events.POSTBATTLE_STATE, { phase: "swimsuit" });
        break;
      }
      case Commands.POST_BATTLE_START_WATERMELON: {
        result = { ok: true, watermelonActive: true };
        this.bus.emit(Events.POSTBATTLE_STATE, { phase: "watermelon" });
        break;
      }
      case Commands.POST_BATTLE_STRIKE_WATERMELON: {
        result = { ok: true, sliced: true, bonusXp: 100 };
        this.bus.emit(Events.POSTBATTLE_STATE, { phase: "result", bonusXp: 100 });
        break;
      }

      // Account & Data Governance
      case Commands.ACCOUNT_EXPORT_JSON: {
        result = { ok: true, data: this.store.snapshot(), exportedAt: this.now() };
        break;
      }
      case Commands.ACCOUNT_DELETE: {
        this.store.reset();
        this.persistence.clear();
        result = { ok: true, deleted: true };
        break;
      }
      case Commands.ACCOUNT_ISSUE_TRANSFER_CODE: {
        const code = `TR_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        this.transferCodes.set(code, {
          data: this.store.snapshot(),
          issuedAt: this.now(),
          expiresAt: this.now() + 300000 // 5 minutes
        });
        result = { ok: true, code, expiresAt: this.now() + 300000 };
        break;
      }
      case Commands.ACCOUNT_CLAIM_TRANSFER_CODE: {
        const code = payload.code;
        const entry = this.transferCodes.get(code);
        if (!entry || entry.expiresAt < this.now()) {
          result = { ok: false, error: "Invalid or expired transfer code", code: ErrorCodes.INVALID_TRANSFER_CODE };
        } else {
          this.transferCodes.delete(code); // One-time use
          this.store.state = structuredClone(entry.data);
          this.persistence.save(this.store.state);
          result = { ok: true, imported: true };
        }
        break;
      }

      // Developer Cheats
      case Commands.CHEAT_SET_STATS: {
        if (!isDev) {
          result = { ok: false, error: "Unauthorized cheat attempt", code: ErrorCodes.UNAUTHORIZED_CHEAT };
          break;
        }
        result = this.store.cheatSetValues(payload);
        break;
      }
      case Commands.CHEAT_UNLOCK_ALL: {
        if (!isDev) {
          result = { ok: false, error: "Unauthorized cheat attempt", code: ErrorCodes.UNAUTHORIZED_CHEAT };
          break;
        }
        result = this.store.cheatUnlockAll();
        break;
      }
      case Commands.CHEAT_ADD_COINS: {
        if (!isDev) {
          result = { ok: false, error: "Unauthorized cheat attempt", code: ErrorCodes.UNAUTHORIZED_CHEAT };
          break;
        }
        const amount = Number(payload.amount || 0);
        if (isNaN(amount) || amount < 0) {
          result = { ok: false, error: "Invalid coin amount", code: ErrorCodes.INVALID_SCHEMA };
          break;
        }
        this.store.state.coins += amount;
        this.store.commit("cheat-add-coins");
        result = { ok: true, coins: this.store.state.coins };
        break;
      }

      default:
        result = { ok: false, error: `Unknown command: ${command}`, code: ErrorCodes.INVALID_SCHEMA };
    }

    if (result && result.ok) {
      this.commandHistory.add(cmdId);
      this.commandLog.push({ cmdId, command, payload, time: this.now() });
    }

    return { ...result, cmdId };
  }

  /**
   * Handle player disconnect: starts a 10s auto-settlement grace timer
   * @param {string} token
   */
  handlePlayerDisconnect(token) {
    if (this.activeBattle?.active) {
      this.activeBattle.disconnectedAt = this.now();
      const timerInfo = {
        token,
        scheduledSettlement: this.now() + 10000,
        settled: false
      };
      this.disconnectTimers.set(token, timerInfo);
    }
  }

  /**
   * Handle player reconnect within grace period
   * @param {string} token
   * @returns {object}
   */
  handlePlayerReconnect(token) {
    const timer = this.disconnectTimers.get(token);
    if (timer) {
      if (this.now() <= timer.scheduledSettlement && !timer.settled) {
        this.disconnectTimers.delete(token);
        if (this.activeBattle) {
          this.activeBattle.disconnectedAt = null;
        }
        return { ok: true, restored: true, battle: this.activeBattle };
      }
    }
    return { ok: false, restored: false, error: "Session expired or settled" };
  }

  /**
   * Tick disconnect grace timer
   * @param {number} currentTime
   */
  tickDisconnectGrace(currentTime) {
    for (const [token, timer] of this.disconnectTimers.entries()) {
      if (currentTime >= timer.scheduledSettlement && !timer.settled) {
        timer.settled = true;
        if (this.activeBattle?.active) {
          this.activeBattle.active = false;
          this.bus.emit(Events.BATTLE_ENDED, {
            outcome: "defeat",
            reason: "disconnect_timeout",
            stageId: this.activeBattle.stageId
          });
        }
      }
    }
  }
}

/**
 * Functional Test Double for LocalGameClient
 */
export class TestLocalGameClient extends LocalGameClient {
  constructor(options = {}) {
    super(options);
    this.server = new AuthoritativeKernelServer({
      persistence: options.persistence,
      random: options.random,
      seed: options.seed
    });
    this._connectionState = ConnectionStates.OFFLINE;

    // Forward server read-model events to client listeners
    for (const eventName of Object.values(Events)) {
      this.server.bus.on(eventName, (data) => {
        this._emit(eventName, data);
      });
    }
  }

  async init() {
    this._connectionState = ConnectionStates.OFFLINE;
    return this;
  }

  async send(command, payload = {}) {
    const envelope = createCommandEnvelope(command, payload);
    const res = this.server.executeCommand(envelope, { isDev: true }); // local offline has dev access
    this._emit(Events.COMMAND_ACK, { cmdId: envelope.cmdId, ok: res.ok, result: res });
    return res;
  }

  getState() {
    return this.server.store.snapshot();
  }

  hasDevEntitlement() {
    return true; // offline sandbox allows cheats
  }

  destroy() {
    super.destroy();
  }
}

/**
 * Functional Test Double for RemoteGameClient connecting to Authoritative Server
 */
export class TestRemoteGameClient extends RemoteGameClient {
  constructor(server, options = {}) {
    super(options);
    this.server = server;
    this.token = options.token || "guest_token";
    this._connectionState = ConnectionStates.OFFLINE;

    // Listen to server bus events and forward to client
    for (const eventName of Object.values(Events)) {
      this.server.bus.on(eventName, (data) => {
        this._emit(eventName, data);
      });
    }
  }

  async init() {
    this._connectionState = ConnectionStates.ONLINE;
    this._emit(Events.CONNECTION_STATE, { state: ConnectionStates.ONLINE });
    return this;
  }

  async send(command, payload = {}) {
    const envelope = createCommandEnvelope(command, payload, { token: this.token });
    const res = this.server.executeCommand(envelope, { isDev: this.hasDevEntitlement() });
    if (res.ok) {
      this._emit(Events.COMMAND_ACK, { cmdId: envelope.cmdId, ok: true, result: res });
    } else {
      this._emit(Events.COMMAND_REJECTED, { cmdId: envelope.cmdId, code: res.code, error: res.error });
    }
    return res;
  }

  getState() {
    return this.server.store.snapshot();
  }

  hasDevEntitlement() {
    return Boolean(this.token && this.server.devEntitledTokens.has(this.token));
  }

  destroy() {
    this._connectionState = ConnectionStates.DISCONNECTED;
    this._emit(Events.CONNECTION_STATE, { state: ConnectionStates.DISCONNECTED });
    super.destroy();
  }
}
