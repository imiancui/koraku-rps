// server/core/ConnectionManager.js
import { SERVER_CONFIG, Events, ConnectionStates } from "../config.js";
import { GameSession } from "./GameSession.js";

export class ConnectionManager {
  /**
   * @param {object} params
   * @param {import('../storage/StorageAdapter.js').StorageAdapter} params.storage
   * @param {import('./TransferManager.js').TransferManager} params.transferManager
   * @param {number} [params.idleTimeoutMs]
   */
  constructor({ storage, transferManager, idleTimeoutMs }) {
    this.storage = storage;
    this.transferManager = transferManager;
    this.idleTimeoutMs = idleTimeoutMs || SERVER_CONFIG.idleSessionTimeoutMs;

    this.connections = new Map(); // accountId -> { socket, connectionId, connectedAt }
    this.sessions = new Map(); // accountId -> GameSession
    this.socketToAccount = new Map(); // socket -> accountId

    // Periodic sweep for idle sessions to flush and unload from memory
    this._idleTimer = setInterval(() => this._sweepIdleSessions(), 60000);
    if (this._idleTimer.unref) {
      this._idleTimer.unref();
    }
  }

  /**
   * Register a new connection for an account.
   * If an existing connection exists, it is kicked (newest connection wins).
   * @param {string} accountId
   * @param {object} socket - WebSocket instance or adapter
   * @param {string} [connectionId]
   * @returns {GameSession}
   */
  registerConnection(accountId, socket, connectionId = `conn_${Date.now()}`) {
    if (!accountId || !socket) {
      throw new Error("accountId and socket are required.");
    }

    // Single connection per account: kick any existing connection
    const existing = this.connections.get(accountId);
    if (existing && existing.socket !== socket) {
      try {
        this.sendToSocket(existing.socket, Events.CONNECTION_STATE, {
          state: ConnectionStates.DISCONNECTED,
          reason: "NEW_CONNECTION_ESTABLISHED",
          message: "Another connection for this account was established. You have been disconnected."
        });
        if (typeof existing.socket.close === "function") {
          existing.socket.close(4001, "NEW_CONNECTION_ESTABLISHED");
        } else if (typeof existing.socket.destroy === "function") {
          existing.socket.destroy();
        }
      } catch (err) {
        console.error(`[ConnectionManager] Error kicking old connection for ${accountId}:`, err);
      }
      this.socketToAccount.delete(existing.socket);
    }

    this.connections.set(accountId, {
      socket,
      connectionId,
      connectedAt: Date.now()
    });
    this.socketToAccount.set(socket, accountId);

    // Get or create GameSession
    let session = this.sessions.get(accountId);
    if (!session) {
      session = new GameSession({
        accountId,
        storage: this.storage,
        transferManager: this.transferManager,
        emitFn: (event, payload) => this.sendToAccount(accountId, event, payload)
      });
      this.sessions.set(accountId, session);
    } else {
      // Update session emit callback in case it changed
      session.emitFn = (event, payload) => this.sendToAccount(accountId, event, payload);
    }

    session.touch();
    return session;
  }

  /**
   * Get active GameSession for account, creating or restoring if needed
   * @param {string} accountId
   * @returns {GameSession}
   */
  async getOrCreateSession(accountId) {
    let session = this.sessions.get(accountId);
    if (!session) {
      session = new GameSession({
        accountId,
        storage: this.storage,
        transferManager: this.transferManager,
        emitFn: (event, payload) => this.sendToAccount(accountId, event, payload)
      });
      await session.load();
      this.sessions.set(accountId, session);
    }
    session.touch();
    return session;
  }

  /**
   * Handle socket disconnection
   * @param {object} socket
   */
  handleDisconnect(socket) {
    const accountId = this.socketToAccount.get(socket);
    if (accountId) {
      const conn = this.connections.get(accountId);
      if (conn && conn.socket === socket) {
        this.connections.delete(accountId);
      }
      this.socketToAccount.delete(socket);

      const session = this.sessions.get(accountId);
      if (session) {
        session.touch();
        // If battle in progress, allow 10s grace before battle settling
        if (session.activeBattle) {
          session.activeBattle.disconnectedAt = Date.now();
        }
      }
    }
  }

  /**
   * Send an event payload to a specific socket
   */
  sendToSocket(socket, event, payload = {}) {
    if (!socket) return false;
    const message = JSON.stringify({
      event,
      payload,
      serverTime: Date.now()
    });

    try {
      const isOpen = socket.readyState === undefined || socket.readyState === 1 || socket.writable === true;
      if (isOpen) {
        if (typeof socket.send === "function") {
          socket.send(message);
        } else if (typeof socket.write === "function") {
          socket.write(message);
        }
        return true;
      }
    } catch (err) {
      console.error("[ConnectionManager] Error sending to socket:", err);
    }
    return false;
  }

  /**
   * Send an event payload to an account's active connection
   */
  sendToAccount(accountId, event, payload = {}) {
    const conn = this.connections.get(accountId);
    if (conn && conn.socket) {
      return this.sendToSocket(conn.socket, event, payload);
    }
    return false;
  }

  /**
   * Check if an account is currently online
   */
  isOnline(accountId) {
    return this.connections.has(accountId);
  }

  /**
   * Get active connection count
   */
  getConnectionCount() {
    return this.connections.size;
  }

  /**
   * Periodically sweep idle sessions not connected via socket and unload them from memory
   */
  async _sweepIdleSessions() {
    const now = Date.now();
    for (const [accountId, session] of this.sessions.entries()) {
      const isConnected = this.connections.has(accountId);
      if (!isConnected && now - session.lastActivityTime >= this.idleTimeoutMs) {
        try {
          // Flush to disk before unloading
          await session.save();
          this.sessions.delete(accountId);
        } catch (err) {
          console.error(`[ConnectionManager] Error flushing idle session for ${accountId}:`, err);
        }
      }
    }
  }

  /**
   * Flush all active sessions to storage
   */
  async flushAll() {
    for (const session of this.sessions.values()) {
      try {
        await session.save();
      } catch (err) {
        console.error(`[ConnectionManager] Error saving session ${session.accountId}:`, err);
      }
    }
  }

  destroy() {
    if (this._idleTimer) {
      clearInterval(this._idleTimer);
    }
    for (const conn of this.connections.values()) {
      try {
        if (typeof conn.socket.close === "function") {
          conn.socket.close(1001, "SERVER_SHUTDOWN");
        }
      } catch {
        // ignore error on shutdown
      }
    }
    this.connections.clear();
    this.sessions.clear();
    this.socketToAccount.clear();
  }
}

export default ConnectionManager;
