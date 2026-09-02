// server/core/Validator.js
import { SERVER_CONFIG, Commands, ErrorCodes } from "../config.js";

const VALID_COMMAND_NAMES = new Set(Object.values(Commands));

const ALLOWED_ENVELOPE_FIELDS = new Set([
  "cmdId",
  "command",
  "payload",
  "clientTime",
  "configVersion",
  "token",
  "type"
]);

export class Validator {
  constructor(options = {}) {
    this.allowedOrigins = options.allowedOrigins || SERVER_CONFIG.allowedOrigins;
    this.maxEnvelopeSizeBytes = options.maxEnvelopeSizeBytes || SERVER_CONFIG.maxEnvelopeSizeBytes;
    this.configVersion = options.configVersion || SERVER_CONFIG.configVersion;
    this.allowEmptyOrigin = options.allowEmptyOrigin !== undefined ? options.allowEmptyOrigin : SERVER_CONFIG.allowEmptyOrigin;
  }

  /**
   * Validate WebSocket / HTTP Origin header
   * @param {string} origin
   * @param {{ isWsUpgrade?: boolean }} [options]
   * @returns {boolean}
   */
  validateOrigin(origin, { isWsUpgrade = false } = {}) {
    if (!origin) {
      if (!isWsUpgrade) return true; // Direct non-WS HTTP calls
      return Boolean(this.allowEmptyOrigin || process.env.ALLOW_EMPTY_ORIGIN === "true");
    }
    let originUrl;
    try {
      originUrl = new URL(origin);
    } catch {
      return false;
    }
    const originHost = originUrl.hostname.toLowerCase();
    const originProtocol = originUrl.protocol;

    for (const allowed of this.allowedOrigins) {
      const allowedTrimmed = allowed.trim().toLowerCase().replace(/\/+$/, "");
      let allowedUrl;
      try {
        allowedUrl = new URL(allowedTrimmed.startsWith("http") ? allowedTrimmed : `https://${allowedTrimmed}`);
      } catch {
        continue;
      }

      if (allowedTrimmed.startsWith("http://") || allowedTrimmed.startsWith("https://")) {
        if (originUrl.origin.toLowerCase() === allowedUrl.origin.toLowerCase()) {
          return true;
        }
      }

      // Check wildcard hostname match, e.g. *.koraku.app
      if (allowedUrl.hostname.startsWith("*.")) {
        const domainSuffix = allowedUrl.hostname.slice(2);
        if (originHost === domainSuffix || originHost.endsWith("." + domainSuffix)) {
          if (originProtocol === allowedUrl.protocol) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Validate raw message string / size
   * @param {string|Buffer} raw
   * @returns {{ valid: boolean, envelope?: object, error?: string, code?: string }}
   */
  validateRawMessage(raw) {
    const byteLength = Buffer.isBuffer(raw) ? raw.length : Buffer.byteLength(typeof raw === "string" ? raw : "");
    if (byteLength > this.maxEnvelopeSizeBytes) {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: `Envelope size (${byteLength} bytes) exceeds limit of ${this.maxEnvelopeSizeBytes} bytes.`
      };
    }

    let parsed;
    try {
      const text = Buffer.isBuffer(raw) ? raw.toString("utf8") : String(raw);
      parsed = JSON.parse(text);
    } catch {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: "Malformed JSON message."
      };
    }

    return this.validateEnvelope(parsed);
  }

  /**
   * Validate Command Envelope fields and schema
   * @param {object} envelope
   * @returns {{ valid: boolean, envelope?: object, error?: string, code?: string }}
   */
  validateEnvelope(envelope) {
    if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)) {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: "Envelope must be a non-null object."
      };
    }

    // Check field whitelist
    for (const key of Object.keys(envelope)) {
      if (!ALLOWED_ENVELOPE_FIELDS.has(key)) {
        return {
          valid: false,
          code: ErrorCodes.INVALID_SCHEMA,
          error: `Unrecognized envelope field '${key}'. Whitelist violated.`
        };
      }
    }

    // Check cmdId
    if (!envelope.cmdId || typeof envelope.cmdId !== "string") {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: "Field 'cmdId' is required and must be a string."
      };
    }

    // Check command
    if (!envelope.command || typeof envelope.command !== "string") {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: "Field 'command' is required and must be a string."
      };
    }

    if (!VALID_COMMAND_NAMES.has(envelope.command)) {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: `Unknown command '${envelope.command}'.`
      };
    }

    // Check payload
    if (envelope.payload !== undefined && (typeof envelope.payload !== "object" || envelope.payload === null || Array.isArray(envelope.payload))) {
      return {
        valid: false,
        code: ErrorCodes.INVALID_SCHEMA,
        error: "Field 'payload' must be an object if present."
      };
    }

    // Check configVersion
    if (envelope.configVersion && envelope.configVersion !== this.configVersion) {
      return {
        valid: false,
        code: ErrorCodes.VERSION_MISMATCH,
        error: `Config version mismatch: client is on '${envelope.configVersion}', server is on '${this.configVersion}'.`
      };
    }

    // Specific command payload validation
    const payloadValidation = this.validatePayload(envelope.command, envelope.payload || {});
    if (!payloadValidation.valid) {
      return payloadValidation;
    }

    return {
      valid: true,
      envelope: {
        cmdId: envelope.cmdId,
        command: envelope.command,
        payload: envelope.payload || {},
        clientTime: envelope.clientTime || Date.now(),
        configVersion: envelope.configVersion || this.configVersion,
        token: envelope.token || null
      }
    };
  }

  /**
   * Validate command payload types
   */
  validatePayload(command, payload) {
    switch (command) {
      case Commands.BUY_ITEM:
        if (!payload.itemId || typeof payload.itemId !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "buyItem requires string payload.itemId." };
        }
        break;

      case Commands.BUY_EQUIPMENT:
        if (!payload.itemId || typeof payload.itemId !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "buyEquipment requires string payload.itemId." };
        }
        break;

      case Commands.EQUIP_ITEM:
        if (!payload.slot || typeof payload.slot !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "equipItem requires string payload.slot." };
        }
        break;

      case Commands.UNEQUIP_ITEM:
        if (!payload.slot || typeof payload.slot !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "unequipItem requires string payload.slot." };
        }
        break;

      case Commands.ALLOCATE_STAT:
        if (!payload.stat || !["hp", "mp", "damage"].includes(payload.stat)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "allocateStat requires stat to be hp, mp, or damage." };
        }
        if (payload.points !== undefined && (typeof payload.points !== "number" || payload.points <= 0)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "allocateStat points must be a positive number." };
        }
        break;

      case Commands.ALLOCATE_SKILL:
        if (!payload.skillId || typeof payload.skillId !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "allocateSkill requires string payload.skillId." };
        }
        break;

      case Commands.BATTLE_START:
        if (payload.stageId !== undefined && typeof payload.stageId !== "number") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "battle.start stageId must be a number." };
        }
        break;

      case Commands.ACCOUNT_CLAIM_TRANSFER_CODE:
        if (!payload.transferCode || typeof payload.transferCode !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "claimTransferCode requires string payload.transferCode." };
        }
        for (const k of Object.keys(payload)) {
          if (k !== "transferCode") {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `account.claimTransferCode unexpected field: ${k}` };
          }
        }
        break;

      case Commands.BATTLE_USE_ITEM:
        if (!payload.itemId || typeof payload.itemId !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "battle.useItem requires string payload.itemId." };
        }
        for (const k of Object.keys(payload)) {
          if (k !== "itemId") {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `battle.useItem unexpected field: ${k}` };
          }
        }
        break;

      case Commands.BATTLE_INPUT_QTE: {
        const allowedQteFields = new Set(["direction", "slot", "stepIndex", "declaredAt", "input", "key"]);
        for (const k of Object.keys(payload)) {
          if (!allowedQteFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `battle.inputQte unexpected field: ${k}` };
          }
        }
        const dir = payload.direction || payload.input || payload.key;
        if (!dir || typeof dir !== "string") {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "battle.inputQte requires string direction." };
        }
        break;
      }

      case Commands.BATTLE_USE_MORPH: {
        const allowedMorphFields = new Set(["targetHand", "slot", "declaredAt"]);
        for (const k of Object.keys(payload)) {
          if (!allowedMorphFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `battle.useMorph unexpected field: ${k}` };
          }
        }
        break;
      }

      case Commands.BATTLE_SELECT_TARGET: {
        const allowedTargetFields = new Set(["target"]);
        for (const k of Object.keys(payload)) {
          if (!allowedTargetFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `battle.selectTarget unexpected field: ${k}` };
          }
        }
        if (payload.target !== undefined && !["main", "left", "right"].includes(payload.target)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "battle.selectTarget target must be 'main', 'left', or 'right'." };
        }
        break;
      }

      case Commands.AUTO_BATTLE_START: {
        const allowedAutoFields = new Set(["stageId", "rounds"]);
        for (const k of Object.keys(payload)) {
          if (!allowedAutoFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `autoBattle.start unexpected field: ${k}` };
          }
        }
        if (payload.stageId !== undefined && (typeof payload.stageId !== "number" || !Number.isFinite(payload.stageId) || payload.stageId < 1 || payload.stageId > 4)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "autoBattle.start stageId must be a number between 1 and 4." };
        }
        if (payload.rounds !== undefined && (typeof payload.rounds !== "number" || !Number.isInteger(payload.rounds) || payload.rounds < 1 || payload.rounds > 100)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "autoBattle.start rounds must be an integer between 1 and 100." };
        }
        break;
      }

      case Commands.AUTO_BATTLE_STOP: {
        if (Object.keys(payload).length > 0) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "autoBattle.stop does not accept payload fields." };
        }
        break;
      }

      case Commands.POST_BATTLE_REQUEST_SWIMSUIT: {
        if (Object.keys(payload).length > 0) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "postBattle.requestSwimsuit does not accept payload fields." };
        }
        break;
      }

      case Commands.POST_BATTLE_STRIKE_WATERMELON: {
        const allowedWatermelonFields = new Set(["slicePercent", "declaredAt"]);
        for (const k of Object.keys(payload)) {
          if (!allowedWatermelonFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `postBattle.strikeWatermelon unexpected field: ${k}` };
          }
        }
        if (payload.slicePercent !== undefined && (typeof payload.slicePercent !== "number" || !Number.isFinite(payload.slicePercent) || payload.slicePercent < 0 || payload.slicePercent > 1)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "postBattle.strikeWatermelon slicePercent must be a number between 0 and 1." };
        }
        break;
      }

      case Commands.CHEAT_UNLOCK_ALL: {
        const allowedUnlockFields = new Set(["gallery", "stages"]);
        for (const k of Object.keys(payload)) {
          if (!allowedUnlockFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `cheat.unlockAll unexpected field: ${k}` };
          }
        }
        break;
      }

      case Commands.CHEAT_ADD_COINS:
        if (typeof payload.amount !== "number" || !Number.isFinite(payload.amount)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "cheat.addCoins requires finite number payload.amount." };
        }
        for (const k of Object.keys(payload)) {
          if (k !== "amount") {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `cheat.addCoins unexpected field: ${k}` };
          }
        }
        break;

      case Commands.CHEAT_SET_STATS: {
        if (!payload.stats || typeof payload.stats !== "object" || Array.isArray(payload.stats)) {
          return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: "cheat.setStats requires object payload.stats." };
        }
        const allowedStatsFields = new Set(["hp", "mp", "damage", "level", "skillPoints"]);
        for (const k of Object.keys(payload.stats)) {
          if (!allowedStatsFields.has(k)) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `cheat.setStats unexpected stat field: ${k}` };
          }
          if (typeof payload.stats[k] !== "number" || !Number.isFinite(payload.stats[k])) {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `cheat.setStats stat ${k} must be finite number.` };
          }
        }
        for (const k of Object.keys(payload)) {
          if (k !== "stats") {
            return { valid: false, code: ErrorCodes.INVALID_SCHEMA, error: `cheat.setStats unexpected field: ${k}` };
          }
        }
        break;
      }

      default:
        break;
    }

    return { valid: true };
  }
}

export default Validator;
