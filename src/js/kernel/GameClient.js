// src/js/kernel/GameClient.js
// Abstract interface for Koraku RPS clients (LocalGameClient and RemoteGameClient).

import { ConnectionStates } from "./protocol.js";

/**
 * @interface GameClient
 */
export class GameClient {
  constructor() {
    if (new.target === GameClient) {
      throw new TypeError("Cannot instantiate abstract class GameClient directly.");
    }
    this._connectionState = ConnectionStates.OFFLINE;
    this._eventListeners = new Map();
  }

  /**
   * Current connection state
   * @returns {string} One of ConnectionStates
   */
  get connectionState() {
    return this._connectionState;
  }

  /**
   * Current connection state method alias
   * @returns {string} One of ConnectionStates
   */
  getConnectionState() {
    return this._connectionState;
  }

  /**
   * Initialize client (connects ws or bootstraps local kernel)
   * @returns {Promise<void>}
   */
  async init() {
    throw new Error("Abstract method init() must be implemented.");
  }

  /**
   * Send an intent command to the kernel / server
   * @param {string} command - Command name from Commands
   * @param {object} [payload={}] - Command parameters
   * @returns {Promise<object>} Command ACK / outcome promise
   */
  async send(command, payload = {}) {
    throw new Error("Abstract method send() must be implemented.");
  }

  /**
   * Subscribe to read-model events
   * @param {string} event - Event name from Events
   * @param {Function} handler - Callback function
   * @returns {Function} Unsubscribe function
   */
  on(event, handler) {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    this._eventListeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  /**
   * Unsubscribe from read-model events
   * @param {string} event - Event name
   * @param {Function} handler - Callback function
   */
  off(event, handler) {
    const set = this._eventListeners.get(event);
    if (set) {
      set.delete(handler);
      if (set.size === 0) {
        this._eventListeners.delete(event);
      }
    }
  }

  /**
   * Emit an event internally to subscribers
   * @protected
   * @param {string} event - Event name
   * @param {any} data - Event data
   */
  _emit(event, data) {
    const set = this._eventListeners.get(event);
    if (set) {
      for (const handler of set) {
        try {
          handler(data);
        } catch (err) {
          console.error(`[GameClient] Error in event handler for ${event}:`, err);
        }
      }
    }
  }

  /**
   * Get current read-only store snapshot
   * @returns {object} Read-only state
   */
  getState() {
    throw new Error("Abstract method getState() must be implemented.");
  }

  /**
   * Get smoothed RTT latency in milliseconds
   * @returns {number}
   */
  getRTT() {
    return 0;
  }

  /**
   * Check if client possesses dev / cheat entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return false;
  }

  /**
   * Dispose / disconnect client
   * @returns {Promise<void>|void}
   */
  destroy() {
    this._eventListeners.clear();
  }
}

export default GameClient;
