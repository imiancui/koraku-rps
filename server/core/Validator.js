// server/core/Validator.js
import { SERVER_CONFIG, Commands, ErrorCodes } from "../config.js";

const VALID_COMMAND_NAMES = new Set(Object.values(Commands));

const ALLOWED_ENVELOPE_FIELDS = new Set([
  "cmdId",
  "command",
  "payload",
  "clientTime",
  "configVersion",
  "token"
]);

export class Validator {
  constructor(options = {}) {
    this.allowedOrigins = options.allowedOrigins || SERVER_CONFIG.allowedOrigins;
    this.maxEnvelopeSizeBytes = options.maxEnvelopeSizeBytes || SERVER_CONFIG.maxEnvelopeSizeBytes;
    this.configVersion = options.configVersion || SERVER_CONFIG.configVersion;
  }

  /**
   * Validate WebSocket / HTTP Origin header
   * @param {string} origin
   * @returns {boolean}
   */
  validateOrigin(origin) {
    if (!origin) return true; // Direct non-browser clients (tests, mobile app wrappers, curl)
    const normalized = origin.trim().toLowerCase().replace(/\/+$/, "");

    for (const allowed of this.allowedOrigins) {
      const allowedNorm = allowed.trim().toLowerCase().replace(/\/+$/, "");
      if (normalized === allowedNorm) {
        return true;
      }
      // Wildcard check
      if (allowedNorm.startsWith("*.") && normalized.endsWith(allowedNorm.substring(1))) {
        return true;
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
        break;

      default:
        break;
    }

    return { valid: true };
  }
}

export default Validator;
