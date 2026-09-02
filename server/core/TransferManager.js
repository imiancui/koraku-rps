// server/core/TransferManager.js
import crypto from "node:crypto";
import { SERVER_CONFIG, ErrorCodes } from "../config.js";

export class TransferManager {
  /**
   * @param {object} params
   * @param {import('../storage/StorageAdapter.js').StorageAdapter} params.storage
   * @param {number} [params.ttlMs]
   */
  constructor({ storage, authManager, ttlMs } = {}) {
    this.storage = storage;
    this.authManager = authManager || null;
    this.ttlMs = ttlMs || SERVER_CONFIG.transferCodeTtlMs;
    this._claimLocks = new Map();
  }

  async _withLock(key, fn) {
    while (this._claimLocks.has(key)) {
      await this._claimLocks.get(key);
    }
    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    this._claimLocks.set(key, promise);
    try {
      return await fn();
    } finally {
      this._claimLocks.delete(key);
      resolve();
    }
  }

  /**
   * Generate a random formatted transfer code (e.g. KORAKU-8F3K-9M2P)
   */
  _generateCode() {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude ambiguous chars like 0, 1, I, O
    let part1 = "";
    let part2 = "";
    const bytes = crypto.randomBytes(8);
    for (let i = 0; i < 4; i++) {
      part1 += chars[bytes[i] % chars.length];
    }
    for (let i = 4; i < 8; i++) {
      part2 += chars[bytes[i] % chars.length];
    }
    return `KORAKU-${part1}-${part2}`;
  }

  /**
   * Issue a new one-time transfer code for an account
   * @param {string} accountId
   * @returns {Promise<{ transferCode: string, expiresAt: number, ttlSeconds: number }>}
   */
  async issueTransferCode(accountId) {
    if (!accountId) {
      throw new Error("accountId is required to issue a transfer code.");
    }

    const transferCode = this._generateCode();
    const expiresAt = Date.now() + this.ttlMs;

    await this.storage.saveTransferCode(transferCode, {
      code: transferCode,
      accountId,
      issuedAt: Date.now(),
      expiresAt,
      used: false
    });

    return {
      transferCode,
      expiresAt,
      ttlSeconds: Math.round(this.ttlMs / 1000)
    };
  }

  /**
   * Claim and migrate an account using a transfer code
   * Atomically serialized per-code with mutex to prevent double-claim races.
   * @param {string} transferCode
   * @param {string} [deviceId]
   * @returns {Promise<{ success: boolean, accountId?: string, account?: object, token?: string, error?: string, key?: string, message?: string }>}
   */
  async claimTransferCode(transferCode, deviceId) {
    if (!transferCode || typeof transferCode !== "string") {
      return {
        success: false,
        error: ErrorCodes.INVALID_TRANSFER_CODE,
        key: "save.transferCodeRequired",
        message: "Transfer code is required."
      };
    }

    const cleanCode = transferCode.trim().toUpperCase();
    return this._withLock(cleanCode, async () => {
      const record = await this.storage.getTransferCode(cleanCode);

      if (!record) {
        return {
          success: false,
          error: ErrorCodes.INVALID_TRANSFER_CODE,
          key: "save.transferCodeNotFound",
          message: "Transfer code not found."
        };
      }

      if (record.used) {
        return {
          success: false,
          error: ErrorCodes.INVALID_TRANSFER_CODE,
          key: "save.transferCodeAlreadyClaimed",
          message: "Transfer code has already been claimed."
        };
      }

      if (Date.now() > record.expiresAt) {
        return {
          success: false,
          error: ErrorCodes.INVALID_TRANSFER_CODE,
          key: "save.transferCodeExpired",
          message: "Transfer code has expired."
        };
      }

      // Atomically mark code as used
      await this.storage.markTransferCodeUsed(cleanCode, { deviceId });

      // Retrieve full migrated account state
      const targetAccount = await this.storage.getAccount(record.accountId);

      // Issue signed session token for target device if authManager is available
      let token = null;
      if (this.authManager && typeof this.authManager.issueToken === "function") {
        token = this.authManager.issueToken({
          accountId: record.accountId,
          deviceId: deviceId || "device_transferred",
          devEntitlement: targetAccount?.devEntitlement || false
        });
      }

      return {
        success: true,
        accountId: record.accountId,
        account: targetAccount,
        token
      };
    });
  }
}

export default TransferManager;
