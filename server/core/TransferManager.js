// server/core/TransferManager.js
import crypto from "node:crypto";
import { SERVER_CONFIG, ErrorCodes } from "../config.js";

export class TransferManager {
  /**
   * @param {object} params
   * @param {import('../storage/StorageAdapter.js').StorageAdapter} params.storage
   * @param {number} [params.ttlMs]
   */
  constructor({ storage, ttlMs }) {
    this.storage = storage;
    this.ttlMs = ttlMs || SERVER_CONFIG.transferCodeTtlMs;
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
    const now = Date.now();
    const expiresAt = now + this.ttlMs;

    const data = {
      transferCode,
      accountId,
      createdAt: now,
      expiresAt,
      used: false,
      claimedAt: null,
      claimedByDeviceId: null
    };

    await this.storage.saveTransferCode(transferCode, data);

    return {
      transferCode,
      expiresAt,
      ttlSeconds: Math.floor(this.ttlMs / 1000)
    };
  }

  /**
   * Claim and consume an issued transfer code from another device
   * @param {string} transferCode
   * @param {string} deviceId
   * @returns {Promise<{ success: boolean, accountId?: string, error?: string, message?: string }>}
   */
  async claimTransferCode(transferCode, deviceId) {
    if (!transferCode || typeof transferCode !== "string") {
      return {
        success: false,
        error: ErrorCodes.INVALID_TRANSFER_CODE,
        message: "Transfer code is required."
      };
    }

    const cleanCode = transferCode.trim().toUpperCase();
    const record = await this.storage.getTransferCode(cleanCode);

    if (!record) {
      return {
        success: false,
        error: ErrorCodes.INVALID_TRANSFER_CODE,
        message: "Transfer code not found."
      };
    }

    if (record.used) {
      return {
        success: false,
        error: ErrorCodes.INVALID_TRANSFER_CODE,
        message: "Transfer code has already been claimed."
      };
    }

    if (Date.now() > record.expiresAt) {
      return {
        success: false,
        error: ErrorCodes.INVALID_TRANSFER_CODE,
        message: "Transfer code has expired."
      };
    }

    // Atomically mark code as used
    await this.storage.markTransferCodeUsed(cleanCode, { deviceId });

    return {
      success: true,
      accountId: record.accountId
    };
  }
}

export default TransferManager;
