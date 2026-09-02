import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ConnectionManager } from "../server/core/ConnectionManager.js";
import { StorageAdapter } from "../server/storage/StorageAdapter.js";
import { TransferManager } from "../server/core/TransferManager.js";
import { Events, ConnectionStates } from "../server/config.js";

class MockMemoryStorage extends StorageAdapter {
  constructor() {
    super();
    this.accounts = new Map();
    this.transfers = new Map();
  }
  async init() {}
  async getAccount(id) { return this.accounts.get(id) || null; }
  async saveAccount(id, data) { this.accounts.set(id, data); }
  async deleteAccount(id) { this.accounts.delete(id); }
  async appendLedger() {}
  async getLedger() { return []; }
  async saveTransferCode(code, data) { this.transfers.set(code, data); }
  async getTransferCode(code) { return this.transfers.get(code) || null; }
  async markTransferCodeUsed(code) { const t = this.transfers.get(code); if (t) t.used = true; }
  async exportAllAccountData(id) { return { profile: {}, accountId: id }; }
  async listAllAccounts() { return Array.from(this.accounts.keys()); }
}

describe("Single Writer Guarantee & Multi-Device Kickout Test", () => {
  it("Smoothly disconnects old connection with NEW_CONNECTION_ESTABLISHED when new device connects", async () => {
    const storage = new MockMemoryStorage();
    const transferManager = new TransferManager({ storage });
    const connManager = new ConnectionManager({ storage, transferManager });

    const accountId = "acc_test_single_writer_123";
    
    // 1. Mock Phone connection
    const phoneSent = [];
    let phoneClosed = false;
    let phoneCloseCode = null;
    let phoneCloseReason = null;

    const phoneSocket = {
      send: (data) => phoneSent.push(JSON.parse(data)),
      close: (code, reason) => {
        phoneClosed = true;
        phoneCloseCode = code;
        phoneCloseReason = reason;
      }
    };

    connManager.registerConnection(accountId, phoneSocket, "conn_phone");
    assert.equal(connManager.connections.has(accountId), true);
    assert.equal(connManager.connections.get(accountId).connectionId, "conn_phone");

    // 2. Mock PC connection on same account
    const pcSent = [];
    let pcClosed = false;

    const pcSocket = {
      send: (data) => pcSent.push(JSON.parse(data)),
      close: () => { pcClosed = true; }
    };

    connManager.registerConnection(accountId, pcSocket, "conn_pc");

    // 3. Verify Phone connection was smoothly notified and closed
    assert.equal(phoneClosed, true, "Old phone connection must be closed");
    assert.equal(phoneCloseCode, 4001);
    assert.equal(phoneCloseReason, "NEW_CONNECTION_ESTABLISHED");

    // Verify phone received disconnect event with friendly reason
    const disconnectEvent = phoneSent.find((msg) => msg.event === Events.CONNECTION_STATE || msg.type === "connection:state");
    assert.ok(disconnectEvent, "Phone must receive connection:state event");
    assert.equal(disconnectEvent.payload.reason, "NEW_CONNECTION_ESTABLISHED");
    assert.equal(disconnectEvent.payload.state, ConnectionStates.DISCONNECTED);

    // 4. Verify PC connection is now the single active writer
    assert.equal(connManager.connections.get(accountId).connectionId, "conn_pc");
    assert.equal(pcClosed, false, "New PC connection must remain active");

    connManager.destroy();
  });
});
