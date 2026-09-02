// server/core/Entitlements.js
import { Commands, ErrorCodes } from "../config.js";

export class EntitlementManager {
  constructor(options = {}) {
    this.logger = options.logger || console;
    this.cheatCommands = new Set([
      Commands.CHEAT_SET_STATS,
      Commands.CHEAT_UNLOCK_ALL,
      Commands.CHEAT_ADD_COINS
    ]);
  }

  /**
   * Check if a command is a cheat/dev-gated command
   * @param {string} command
   * @returns {boolean}
   */
  isCheatCommand(command) {
    return this.cheatCommands.has(command) || (typeof command === "string" && command.startsWith("cheat."));
  }

  /**
   * Verify if account has entitlement to execute the requested command
   * @param {object} params
   * @param {string} params.command
   * @param {string} params.accountId
   * @param {boolean} params.devEntitlement
   * @param {string} [params.ip]
   * @returns {{ allowed: boolean, error?: string }}
   */
  checkEntitlement({ command, accountId, devEntitlement, ip }) {
    if (!this.isCheatCommand(command)) {
      return { allowed: true };
    }

    if (devEntitlement === true) {
      return { allowed: true };
    }

    // Unauthorized attempt: Log security audit entry
    this.logger.warn(
      `[SECURITY AUDIT] Unauthorized cheat command attempt rejected. Time: ${new Date().toISOString()}, Account: ${accountId}, IP: ${ip || "unknown"}, Command: ${command}`
    );

    return {
      allowed: false,
      error: ErrorCodes.UNAUTHORIZED_CHEAT,
      message: `Account ${accountId} does not possess dev entitlement for cheat command ${command}.`
    };
  }
}

export default EntitlementManager;
