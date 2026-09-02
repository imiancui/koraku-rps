// src/js/kernel/protocol.js
// Frozen protocol specification for Koraku RPS online/offline kernel.
// Defines Command types, Read-model Event names, payload contracts, error codes, and module paths.

export const PROTOCOL_VERSION = "2.0.0";
export const CONFIG_VERSION = "2026.09.03";

/**
 * Command Names (Client -> Kernel / Server)
 */
export const Commands = Object.freeze({
  // Economy & Inventory
  BUY_ITEM: "buyItem",
  BUY_EQUIPMENT: "buyEquipment",
  EQUIP_ITEM: "equipItem",
  UNEQUIP_ITEM: "unequipItem",
  ALLOCATE_STAT: "allocateStat",
  ALLOCATE_SKILL: "allocateSkill",

  // Battle Lifecycle & Actions
  BATTLE_START: "battle.start",
  BATTLE_SELECT_HAND: "battle.selectHand",
  BATTLE_SELECT_TARGET: "battle.selectTarget",
  BATTLE_USE_MORPH: "battle.useMorph",
  BATTLE_USE_ITEM: "battle.useItem",
  BATTLE_INPUT_QTE: "battle.inputQte",
  BATTLE_PAUSE: "battle.pause",
  BATTLE_RESUME: "battle.resume",
  BATTLE_ABANDON: "battle.abandon",

  // Auto-battle & Post-battle
  AUTO_BATTLE_START: "autoBattle.start",
  AUTO_BATTLE_STOP: "autoBattle.stop",
  POST_BATTLE_REQUEST_SWIMSUIT: "postBattle.requestSwimsuit",
  POST_BATTLE_START_WATERMELON: "postBattle.startWatermelon",
  POST_BATTLE_STRIKE_WATERMELON: "postBattle.strikeWatermelon",

  // Account & Data Governance
  ACCOUNT_EXPORT_JSON: "account.exportJson",
  ACCOUNT_DELETE: "account.delete",
  ACCOUNT_ISSUE_TRANSFER_CODE: "account.issueTransferCode",
  ACCOUNT_CLAIM_TRANSFER_CODE: "account.claimTransferCode",

  // Developer & Cheat (Entitlement Gated)
  CHEAT_SET_STATS: "cheat.setStats",
  CHEAT_UNLOCK_ALL: "cheat.unlockAll",
  CHEAT_ADD_COINS: "cheat.addCoins"
});

/**
 * Event Names (Kernel / Server -> Client Read Model)
 */
export const Events = Object.freeze({
  // Store & Progress
  STORE_CHANGED: "store:changed",

  // Battle Read Model
  BATTLE_STATE: "battle:state",
  BATTLE_EFFECT: "battle:effect",
  BATTLE_DAMAGE_LOGGED: "battle:damage-logged",
  BATTLE_ENDED: "battle:ended",

  // QTE & Timing
  QTE_UPDATE: "qte:update",

  // Post-battle & Minigames
  POSTBATTLE_STATE: "postbattle:state",
  POSTBATTLE_AUTO_WATERMELON: "postbattle:auto-watermelon",

  // Auto-battle Stream
  AUTOBATTLE_STREAM_CHUNK: "auto-battle:stream-chunk",
  AUTOBATTLE_ROUND_COMPLETED: "auto-battle:round-completed",
  AUTOBATTLE_SUMMARY: "auto-battle:summary",

  // Localized UI Feeds (Payload: { key, params })
  DIALOGUE: "dialogue",
  TOAST: "toast",

  // Connection & Transport Layer
  CONNECTION_STATE: "connection:state",
  COMMAND_ACK: "command:ack",
  COMMAND_REJECTED: "command:rejected"
});

/**
 * Connection States
 */
export const ConnectionStates = Object.freeze({
  OFFLINE: "offline",
  CONNECTING: "connecting",
  ONLINE: "online",
  RECONNECTING: "reconnecting",
  DISCONNECTED: "disconnected"
});

/**
 * Standard Error Codes
 */
export const ErrorCodes = Object.freeze({
  UNAUTHORIZED_CHEAT: "UNAUTHORIZED_CHEAT",
  BATTLE_IN_PROGRESS_LOCKED: "BATTLE_IN_PROGRESS_LOCKED",
  INVALID_PHASE_PAUSE: "INVALID_PHASE_PAUSE",
  PAUSE_LIMIT_REACHED: "PAUSE_LIMIT_REACHED",
  INVALID_TRANSFER_CODE: "INVALID_TRANSFER_CODE",
  SECRET_COMMITMENT_EXPIRED: "SECRET_COMMITMENT_EXPIRED",
  TIMING_AUDIT_FAILED: "TIMING_AUDIT_FAILED",
  INVALID_SCHEMA: "INVALID_SCHEMA",
  RATE_LIMITED: "RATE_LIMITED",
  VERSION_MISMATCH: "VERSION_MISMATCH",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR"
});

/**
 * Create a standard Command Envelope
 * @param {string} command - Command name from Commands
 * @param {object} payload - Command payload
 * @param {object} [options] - Additional metadata
 * @returns {object} Command envelope
 */
export function createCommandEnvelope(command, payload = {}, options = {}) {
  return {
    cmdId: options.cmdId || `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    command,
    payload,
    clientTime: options.clientTime || Date.now(),
    configVersion: CONFIG_VERSION,
    token: options.token || null
  };
}

/**
 * Module bundle registration paths in strict dependency order
 */
export const NEW_KERNEL_MODULE_PATHS = Object.freeze([
  "src/js/kernel/protocol.js",
  "src/js/kernel/GameClient.js",
  "src/js/kernel/LocalGameClient.js",
  "src/js/net/RemoteGameClient.js"
]);
