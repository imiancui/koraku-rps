// server/storage/StorageAdapter.js

/**
 * @interface StorageAdapter
 */
export class StorageAdapter {
  constructor() {
    if (new.target === StorageAdapter) {
      throw new TypeError("Cannot instantiate abstract class StorageAdapter directly.");
    }
  }

  async init() {
    throw new Error("Abstract method init() must be implemented.");
  }

  async getAccount(accountId) {
    throw new Error("Abstract method getAccount() must be implemented.");
  }

  async saveAccount(accountId, data) {
    throw new Error("Abstract method saveAccount() must be implemented.");
  }

  async deleteAccount(accountId) {
    throw new Error("Abstract method deleteAccount() must be implemented.");
  }

  async appendLedger(accountId, entry) {
    throw new Error("Abstract method appendLedger() must be implemented.");
  }

  async getLedger(accountId) {
    throw new Error("Abstract method getLedger() must be implemented.");
  }

  async saveTransferCode(code, data) {
    throw new Error("Abstract method saveTransferCode() must be implemented.");
  }

  async getTransferCode(code) {
    throw new Error("Abstract method getTransferCode() must be implemented.");
  }

  async markTransferCodeUsed(code, claimData) {
    throw new Error("Abstract method markTransferCodeUsed() must be implemented.");
  }

  async exportAllAccountData(accountId) {
    throw new Error("Abstract method exportAllAccountData() must be implemented.");
  }

  async listAllAccounts() {
    throw new Error("Abstract method listAllAccounts() must be implemented.");
  }
}

export default StorageAdapter;
