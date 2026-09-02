// src/js/net/RemoteGameClient.js
// Authoritative WebSocket network client for Koraku RPS.
// Implements connection management, heartbeat, clock sync, RTT estimation,
// version handshake validation, idempotent command ACK tracking, and EventBus forwarding.

import { GameClient } from "../kernel/GameClient.js";
import {
  PROTOCOL_VERSION,
  CONFIG_VERSION,
  ConnectionStates,
  Events,
  ErrorCodes,
  createCommandEnvelope
} from "../kernel/protocol.js";

/**
 * Determine default WebSocket URL based on current runtime environment
 * @param {string} [customUrl]
 * @returns {string}
 */
function resolveWebSocketUrl(customUrl) {
  if (customUrl) return customUrl;
  if (typeof window !== "undefined" && window.location && window.location.host) {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}/ws`;
  }
  return "ws://localhost:8080/ws";
}

/**
 * RemoteGameClient handles WebSocket transport, session management,
 * heartbeat ping/pong, RTT/clock offset calculation, command ACK lifecycle,
 * and server-pushed read model event propagation.
 */
export class RemoteGameClient extends GameClient {
  /**
   * @param {object} [options={}]
   * @param {string} [options.url] - WebSocket server endpoint
   * @param {string} [options.token] - Session / device auth token
   * @param {string} [options.deviceId] - Anonymous device identifier
   * @param {object} [options.eventBus] - Local EventBus to forward read model events
   * @param {boolean} [options.autoReconnect=true] - Whether to automatically reconnect on drop
   * @param {number} [options.reconnectInitialDelay=1000] - Base delay (ms) for exponential backoff
   * @param {number} [options.reconnectMaxDelay=30000] - Max delay (ms) for reconnection
   * @param {number} [options.reconnectBackoffFactor=1.5] - Exponential multiplier
   * @param {boolean} [options.reconnectJitter=true] - Add random jitter to reconnect delay
   * @param {number} [options.maxReconnectAttempts=Infinity] - Max reconnect attempts before giving up
   * @param {number} [options.pingInterval=10000] - Heartbeat ping interval (ms)
   * @param {number} [options.pingTimeout=5000] - Timeout waiting for pong (ms)
   * @param {number} [options.commandTimeout=8000] - Timeout waiting for command ACK (ms)
   * @param {number} [options.commandMaxRetries=2] - Number of retry attempts for timed-out commands
   * @param {number} [options.handshakeTimeout=5000] - Timeout waiting for handshake ack (ms)
   * @param {Function} [options.now] - Timestamp provider function (ms)
   * @param {Function} [options.WebSocketClass] - WebSocket constructor (for testing / custom WS)
   */
  constructor(options = {}) {
    super();

    this.options = {
      url: resolveWebSocketUrl(options.url),
      token: options.token || null,
      deviceId: options.deviceId || null,
      eventBus: options.eventBus || null,
      autoReconnect: options.autoReconnect !== false,
      reconnectInitialDelay: options.reconnectInitialDelay || 1000,
      reconnectMaxDelay: options.reconnectMaxDelay || 30000,
      reconnectBackoffFactor: options.reconnectBackoffFactor || 1.5,
      reconnectJitter: options.reconnectJitter !== false,
      maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
      pingInterval: options.pingInterval || 10000,
      pingTimeout: options.pingTimeout || 5000,
      commandTimeout: options.commandTimeout || 8000,
      commandMaxRetries: options.commandMaxRetries ?? 2,
      handshakeTimeout: options.handshakeTimeout || 5000,
      now: options.now || (() => Date.now()),
      WebSocketClass: options.WebSocketClass || (typeof WebSocket !== "undefined" ? WebSocket : null),
      ...options
    };

    this._ws = null;
    this._connectionState = ConnectionStates.OFFLINE;
    this._token = this.options.token;
    this._deviceId = this.options.deviceId;
    this._eventBus = this.options.eventBus;
    this._devEntitlement = Boolean(options.devEntitlement);

    // State snapshot cache
    this._state = {};

    // Reconnection tracking
    this._reconnectAttempts = 0;
    this._reconnectTimer = null;
    this._isExplicitlyClosed = false;
    this._handshakeTimer = null;
    this._initPromiseResolver = null;
    this._initPromiseRejecter = null;

    // Heartbeat tracking
    this._pingTimer = null;
    this._pongTimeoutTimer = null;
    this._lastPingTimestamp = 0;

    // Clock sync & RTT estimation
    this._clockOffset = 0; // serverTime - clientTime
    this._rtt = 0; // smoothed RTT in ms
    this._rttSamples = [];

    // Commands & ACK tracking
    this._pendingCommands = new Map(); // cmdId -> { envelope, resolve, reject, timer, retries, sentAt }
    this._commandQueue = []; // Array of cmdIds waiting to be dispatched when connection is ONLINE
  }

  /**
   * Current connection state
   * @returns {string}
   */
  get connectionState() {
    return this._connectionState;
  }

  /**
   * Cached state snapshot
   * @returns {object}
   */
  getState() {
    return this._state;
  }

  /**
   * Check if client possesses dev entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return Boolean(this._devEntitlement);
  }

  /**
   * Set dev entitlement status
   * @param {boolean} value
   */
  setDevEntitlement(value) {
    this._devEntitlement = Boolean(value);
  }

  /**
   * Get current auth token
   * @returns {string|null}
   */
  getToken() {
    return this._token;
  }

  /**
   * Set auth token
   * @param {string|null} token
   */
  setToken(token) {
    this._token = token;
  }

  /**
   * Get estimated server timestamp in ms
   * @returns {number}
   */
  getServerTime() {
    return Math.round(this._now() + this._clockOffset);
  }

  /**
   * Get estimated smoothed round-trip time in ms
   * @returns {number}
   */
  getRTT() {
    return Math.round(this._rtt);
  }

  /**
   * Get estimated clock offset (serverTime - clientTime) in ms
   * @returns {number}
   */
  getClockOffset() {
    return Math.round(this._clockOffset);
  }

  /**
   * Internal timestamp provider
   * @private
   * @returns {number}
   */
  _now() {
    return typeof this.options.now === "function" ? this.options.now() : Date.now();
  }

  /**
   * Initialize client and connect to server
   * @returns {Promise<RemoteGameClient>}
   */
  async init() {
    if (this._connectionState === ConnectionStates.ONLINE) {
      return this;
    }

    this._isExplicitlyClosed = false;

    return new Promise((resolve, reject) => {
      this._initPromiseResolver = resolve;
      this._initPromiseRejecter = reject;
      this._connect();
    });
  }

  /**
   * Establish WebSocket connection
   * @private
   */
  _connect() {
    if (this._isExplicitlyClosed) return;

    const WebSocketClass = this.options.WebSocketClass;
    if (!WebSocketClass) {
      const err = new Error("WebSocket constructor not available in current environment");
      this._rejectInit(err);
      return;
    }

    this._cleanupSocket();

    const targetState = this._reconnectAttempts > 0 ? ConnectionStates.RECONNECTING : ConnectionStates.CONNECTING;
    this._setConnectionState(targetState, { attempt: this._reconnectAttempts });

    try {
      this._ws = new WebSocketClass(this.options.url);

      this._ws.onopen = () => this._onOpen();
      this._ws.onmessage = (event) => this._onMessage(event);
      this._ws.onerror = (error) => this._onError(error);
      this._ws.onclose = (event) => this._onClose(event);
    } catch (err) {
      this._onError(err);
    }
  }

  /**
   * WebSocket onopen handler: initiate handshake
   * @private
   */
  _onOpen() {
    // Send handshake request
    const handshakePayload = {
      type: "handshake",
      protocolVersion: PROTOCOL_VERSION,
      configVersion: CONFIG_VERSION,
      token: this._token,
      deviceId: this._deviceId,
      clientTime: this._now()
    };

    this._sendRaw(handshakePayload);

    // Start handshake timeout
    if (this._handshakeTimer) clearTimeout(this._handshakeTimer);
    this._handshakeTimer = setTimeout(() => {
      this._onHandshakeTimeout();
    }, this.options.handshakeTimeout);
  }

  /**
   * Handshake timeout handler
   * @private
   */
  _onHandshakeTimeout() {
    this._handshakeTimer = null;
    const err = new Error(`Handshake timed out after ${this.options.handshakeTimeout}ms`);
    if (this._ws) {
      try {
        this._ws.close();
      } catch (_) {}
    }
    this._rejectInit(err);
  }

  /**
   * Process incoming WebSocket message
   * @private
   * @param {MessageEvent|object} event
   */
  _onMessage(event) {
    let msg;
    try {
      const rawData = typeof event.data === "string" ? event.data : (typeof event === "string" ? event : JSON.stringify(event));
      msg = JSON.parse(rawData);
    } catch (err) {
      console.warn("[RemoteGameClient] Failed to parse incoming message JSON:", err, event.data);
      return;
    }

    if (!msg || typeof msg !== "object") return;

    // 1. Handshake response
    if (msg.type === "handshake_ack" || msg.type === "handshake") {
      this._handleHandshakeAck(msg);
      return;
    }

    // 2. Pong heartbeat response
    if (msg.type === "pong") {
      this._handlePong(msg);
      return;
    }

    // 3. Command ACK response
    if (msg.type === "ack" || msg.type === "command:ack" || (msg.event === Events.COMMAND_ACK) || (msg.cmdId && msg.ack === true)) {
      this._handleCommandAck(msg);
      return;
    }

    // 4. Command Rejected response
    if (msg.type === "reject" || msg.type === "command:rejected" || (msg.event === Events.COMMAND_REJECTED) || (msg.cmdId && msg.ack === false) || (msg.cmdId && msg.error)) {
      this._handleCommandReject(msg);
      return;
    }

    // 5. Server broadcast read model events
    this._handleServerEvent(msg);
  }

  /**
   * Handle handshake acknowledgement
   * @private
   * @param {object} msg
   */
  _handleHandshakeAck(msg) {
    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    // Validate version compatibility
    const serverProtocol = msg.protocolVersion;
    const serverConfig = msg.configVersion;

    const isProtocolMismatch = serverProtocol && serverProtocol !== PROTOCOL_VERSION;
    const isConfigMismatch = serverConfig && serverConfig !== CONFIG_VERSION;
    const isErrorMismatch = msg.code === ErrorCodes.VERSION_MISMATCH || msg.status === "error";

    if (isProtocolMismatch || isConfigMismatch || isErrorMismatch) {
      const mismatchPayload = {
        key: "connection.version_mismatch",
        params: {
          clientProtocol: PROTOCOL_VERSION,
          serverProtocol: serverProtocol || "unknown",
          clientConfig: CONFIG_VERSION,
          serverConfig: serverConfig || "unknown"
        }
      };

      this._emit(Events.TOAST, mismatchPayload);
      if (this._eventBus && typeof this._eventBus.emit === "function") {
        this._eventBus.emit(Events.TOAST, mismatchPayload);
      }

      this._isExplicitlyClosed = true; // Prevent reconnect loop on version mismatch
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        reason: ErrorCodes.VERSION_MISMATCH,
        details: mismatchPayload.params
      });

      if (this._ws) {
        try {
          this._ws.close(4001, ErrorCodes.VERSION_MISMATCH);
        } catch (_) {}
      }

      const err = new Error(`Version mismatch: client [${CONFIG_VERSION}/${PROTOCOL_VERSION}], server [${serverConfig}/${serverProtocol}]`);
      err.code = ErrorCodes.VERSION_MISMATCH;
      this._rejectInit(err);
      return;
    }

    // Handshake successful
    if (msg.token) this._token = msg.token;
    if (msg.devEntitlement !== undefined) this._devEntitlement = Boolean(msg.devEntitlement);
    if (msg.state) this._state = msg.state;

    this._reconnectAttempts = 0;
    this._setConnectionState(ConnectionStates.ONLINE, {
      token: this._token,
      devEntitlement: this._devEntitlement
    });

    // Start heartbeat
    this._startHeartbeat();

    // Flush pending command queue
    this._flushCommandQueue();

    // Resolve init promise
    this._resolveInit(this);
  }

  /**
   * Handle Pong message for RTT & Clock offset estimation
   * @private
   * @param {object} msg
   */
  _handlePong(msg) {
    if (this._pongTimeoutTimer) {
      clearTimeout(this._pongTimeoutTimer);
      this._pongTimeoutTimer = null;
    }

    const t1 = msg.t1 || msg.clientTime || this._lastPingTimestamp;
    const t4 = this._now();
    const t2 = msg.t2 ?? msg.serverReceiveTime ?? msg.serverTime;
    const t3 = msg.t3 ?? msg.serverTransmitTime ?? msg.serverTime;

    let sampleRTT;
    if (t2 !== undefined && t3 !== undefined && t2 !== null && t3 !== null) {
      sampleRTT = Math.max(0, (t4 - t1) - (t3 - t2));
    } else {
      sampleRTT = Math.max(0, t4 - t1);
    }

    let sampleOffset;
    if (t2 !== undefined && t3 !== undefined && t2 !== null && t3 !== null) {
      sampleOffset = ((t2 - t1) + (t3 - t4)) / 2;
    } else if (msg.serverTime !== undefined && msg.serverTime !== null) {
      sampleOffset = msg.serverTime - (t1 + t4) / 2;
    } else {
      sampleOffset = this._clockOffset;
    }

    // Exponential moving average filter
    if (this._rtt === 0 && this._rttSamples.length === 0) {
      this._rtt = sampleRTT;
      this._clockOffset = sampleOffset;
    } else {
      this._rtt = 0.8 * this._rtt + 0.2 * sampleRTT;
      this._clockOffset = 0.8 * this._clockOffset + 0.2 * sampleOffset;
    }

    this._rttSamples.push({ rtt: sampleRTT, offset: sampleOffset, timestamp: t4 });
    if (this._rttSamples.length > 10) {
      this._rttSamples.shift();
    }

    const rttPayload = {
      rtt: Math.round(this._rtt),
      isHighLatency: this._rtt >= 180,
      clockOffset: Math.round(this._clockOffset)
    };
    this._emit("connection:ping", rttPayload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit("connection:ping", rttPayload);
    }
  }

  /**
   * Get smoothed RTT latency in milliseconds
   * @returns {number}
   */
  getRTT() {
    return Math.round(this._rtt || 0);
  }

  /**
   * Handle command ACK
   * @private
   * @param {object} msg
   */
  _handleCommandAck(msg) {
    const cmdId = msg.cmdId || msg.payload?.cmdId;
    if (!cmdId) return;

    const payload = msg.payload !== undefined ? msg.payload : msg;

    // Update state cache if state is embedded in ACK or root message
    const stateObj = msg.state || (payload && payload.state);
    if (stateObj && typeof stateObj === "object") {
      this._state = { ...this._state, ...stateObj };
    }

    const pending = this._pendingCommands.get(cmdId);
    if (pending) {
      if (pending.timer) clearTimeout(pending.timer);
      this._pendingCommands.delete(cmdId);
      pending.resolve(payload);
    }

    // Broadcast ACK event
    this._emit(Events.COMMAND_ACK, payload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit(Events.COMMAND_ACK, payload);
    }
  }

  /**
   * Handle command rejection
   * @private
   * @param {object} msg
   */
  _handleCommandReject(msg) {
    const cmdId = msg.cmdId || msg.payload?.cmdId;
    const payload = msg.payload !== undefined ? msg.payload : msg;
    const code = msg.code || payload?.code || ErrorCodes.INTERNAL_ERROR;
    const reason = msg.reason || msg.error || payload?.reason || payload?.error || "Command rejected by server";

    const err = new Error(reason);
    err.code = code;
    err.payload = payload;

    const pending = cmdId ? this._pendingCommands.get(cmdId) : null;
    if (pending) {
      if (pending.timer) clearTimeout(pending.timer);
      this._pendingCommands.delete(cmdId);
      pending.reject(err);
    }

    // Broadcast rejection event
    this._emit(Events.COMMAND_REJECTED, { cmdId, code, reason, payload });
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit(Events.COMMAND_REJECTED, { cmdId, code, reason, payload });
    }
  }

  /**
   * Handle read model server push events
   * @private
   * @param {object} msg
   */
  _handleServerEvent(msg) {
    const eventName = msg.event || msg.type;
    if (!eventName) return;

    const payload = msg.payload !== undefined ? msg.payload : msg.data !== undefined ? msg.data : msg;

    // Cache state changes
    if (eventName === Events.STORE_CHANGED || eventName === "store:changed") {
      if (payload && typeof payload === "object") {
        this._state = { ...this._state, ...payload };
      }
    } else if (eventName === Events.BATTLE_STATE || eventName === "battle:state") {
      if (payload) {
        this._state.battle = payload;
      }
    } else if (eventName === Events.BATTLE_ENDED || eventName === "battle:ended") {
      if (this._state.battle) {
        delete this._state.battle;
      }
    } else if (eventName === Events.CONNECTION_STATE || eventName === "connection:state") {
      if (payload?.reason === "NEW_CONNECTION_ESTABLISHED" || payload?.reason === "KICKED_BY_NEW_CONNECTION") {
        this._isExplicitlyClosed = true;
        this._setConnectionState(ConnectionStates.DISCONNECTED, {
          reason: "KICKED_BY_NEW_CONNECTION",
          message: payload.message || "Another connection for this account was established."
        });
      }
    }

    // Emit internally to GameClient listeners
    this._emit(eventName, payload);

    // Forward to local EventBus
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      try {
        this._eventBus.emit(eventName, payload);
      } catch (err) {
        console.error(`[RemoteGameClient] Error forwarding event ${eventName} to EventBus:`, err);
      }
    }
  }

  /**
   * Send an intent command to the authoritative server
   * @param {string} command - Command name from Commands
   * @param {object} [payload={}] - Command parameters
   * @param {object} [options={}] - Additional command envelope metadata
   * @returns {Promise<object>}
   */
  async send(command, payload = {}, options = {}) {
    const envelope = createCommandEnvelope(command, payload, {
      ...options,
      token: this._token,
      clientTime: this.getServerTime()
    });

    const cmdId = envelope.cmdId;

    return new Promise((resolve, reject) => {
      const entry = {
        envelope,
        resolve,
        reject,
        retries: 0,
        timer: null,
        sentAt: this._now()
      };

      this._pendingCommands.set(cmdId, entry);

      if (this._connectionState === ConnectionStates.ONLINE && this._isSocketOpen()) {
        this._dispatchCommand(cmdId);
      } else {
        this._commandQueue.push(cmdId);
      }
    });
  }

  /**
   * Dispatch single command over WebSocket and start ACK timeout
   * @private
   * @param {string} cmdId
   */
  _dispatchCommand(cmdId) {
    const entry = this._pendingCommands.get(cmdId);
    if (!entry) return;

    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {
      this._onCommandTimeout(cmdId);
    }, this.options.commandTimeout);

    this._sendRaw({
      type: "command",
      ...entry.envelope
    });
  }

  /**
   * Handle command ACK timeout
   * @private
   * @param {string} cmdId
   */
  _onCommandTimeout(cmdId) {
    const entry = this._pendingCommands.get(cmdId);
    if (!entry) return;

    if (entry.retries < this.options.commandMaxRetries && this._connectionState === ConnectionStates.ONLINE && this._isSocketOpen()) {
      entry.retries++;
      this._dispatchCommand(cmdId);
    } else {
      this._pendingCommands.delete(cmdId);
      const err = new Error(`Command '${entry.envelope.command}' (${cmdId}) timed out after ${this.options.commandTimeout}ms`);
      err.code = ErrorCodes.INTERNAL_ERROR;
      entry.reject(err);
    }
  }

  /**
   * Flush queued commands upon connection establishment
   * @private
   */
  _flushCommandQueue() {
    const queue = this._commandQueue.slice();
    this._commandQueue = [];

    for (const cmdId of queue) {
      if (this._pendingCommands.has(cmdId)) {
        this._dispatchCommand(cmdId);
      }
    }

    // Also re-dispatch any pending in-flight commands that were interrupted
    for (const [cmdId, entry] of this._pendingCommands.entries()) {
      if (!queue.includes(cmdId)) {
        this._dispatchCommand(cmdId);
      }
    }
  }

  /**
   * Check if underlying WebSocket is open
   * @private
   * @returns {boolean}
   */
  _isSocketOpen() {
    return Boolean(this._ws && this._ws.readyState === 1);
  }

  /**
   * Send raw JSON object to WebSocket
   * @private
   * @param {object} obj
   */
  _sendRaw(obj) {
    if (!this._isSocketOpen()) return;
    try {
      this._ws.send(JSON.stringify(obj));
    } catch (err) {
      console.warn("[RemoteGameClient] Failed to send WebSocket message:", err);
    }
  }

  /**
   * Start Ping/Pong heartbeat loop
   * @private
   */
  _startHeartbeat() {
    this._stopHeartbeat();

    this._pingTimer = setInterval(() => {
      this._sendPing();
    }, this.options.pingInterval);

    // Send immediate initial ping for fast clock sync
    this._sendPing();
  }

  /**
   * Send single Ping message
   * @private
   */
  _sendPing() {
    if (!this._isSocketOpen() || this._connectionState !== ConnectionStates.ONLINE) return;

    const t1 = this._now();
    this._lastPingTimestamp = t1;

    this._sendRaw({
      type: "ping",
      t1: t1,
      clientTime: t1
    });

    if (this._pongTimeoutTimer) clearTimeout(this._pongTimeoutTimer);
    this._pongTimeoutTimer = setTimeout(() => {
      this._onPongTimeout();
    }, this.options.pingTimeout);
  }

  /**
   * Handle Pong timeout (connection dead/hung)
   * @private
   */
  _onPongTimeout() {
    this._pongTimeoutTimer = null;
    console.warn(`[RemoteGameClient] Pong timeout after ${this.options.pingTimeout}ms, terminating connection`);
    if (this._ws) {
      try {
        this._ws.close();
      } catch (_) {}
    }
  }

  /**
   * Stop heartbeat timers
   * @private
   */
  _stopHeartbeat() {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
    if (this._pongTimeoutTimer) {
      clearTimeout(this._pongTimeoutTimer);
      this._pongTimeoutTimer = null;
    }
  }

  /**
   * WebSocket onerror handler
   * @private
   * @param {Event|Error} error
   */
  _onError(error) {
    console.warn("[RemoteGameClient] WebSocket error encountered:", error?.message || error);
  }

  /**
   * WebSocket onclose handler
   * @private
   * @param {CloseEvent|object} event
   */
  _onClose(event) {
    this._stopHeartbeat();
    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    if (this._isExplicitlyClosed) {
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        code: event?.code,
        reason: event?.reason || "Client closed"
      });
      return;
    }

    if (!this.options.autoReconnect || this._reconnectAttempts >= this.options.maxReconnectAttempts) {
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        code: event?.code,
        reason: "Max reconnect attempts reached"
      });
      this._rejectInit(new Error("Failed to connect to server"));
      return;
    }

    // Transition to reconnecting
    this._scheduleReconnect();
  }

  /**
   * Schedule automatic exponential backoff reconnection
   * @private
   */
  _scheduleReconnect() {
    if (this._reconnectTimer) clearTimeout(this._reconnectTimer);

    const baseDelay = this.options.reconnectInitialDelay * Math.pow(this.options.reconnectBackoffFactor, this._reconnectAttempts);
    let delay = Math.min(baseDelay, this.options.reconnectMaxDelay);

    if (this.options.reconnectJitter) {
      delay += Math.random() * (delay * 0.2); // 0-20% jitter
    }

    this._reconnectAttempts++;
    this._setConnectionState(ConnectionStates.RECONNECTING, {
      attempt: this._reconnectAttempts,
      delay: Math.round(delay)
    });

    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      this._connect();
    }, delay);
  }

  /**
   * Set connection state and notify listeners and EventBus
   * @private
   * @param {string} newState - One of ConnectionStates
   * @param {object} [meta={}]
   */
  _setConnectionState(newState, meta = {}) {
    if (this._connectionState === newState && Object.keys(meta).length === 0) return;

    this._connectionState = newState;
    const eventPayload = {
      state: newState,
      timestamp: this._now(),
      ...meta
    };

    this._emit(Events.CONNECTION_STATE, eventPayload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      try {
        this._eventBus.emit(Events.CONNECTION_STATE, eventPayload);
      } catch (err) {
        console.error("[RemoteGameClient] Error emitting connection:state to EventBus:", err);
      }
    }
  }

  /**
   * Clean up socket instance and listeners
   * @private
   */
  _cleanupSocket() {
    if (this._ws) {
      try {
        this._ws.onopen = null;
        this._ws.onmessage = null;
        this._ws.onerror = null;
        this._ws.onclose = null;
        this._ws.close();
      } catch (_) {}
      this._ws = null;
    }
  }

  /**
   * Helper to resolve init Promise
   * @private
   */
  _resolveInit(result) {
    if (this._initPromiseResolver) {
      const resolve = this._initPromiseResolver;
      this._initPromiseResolver = null;
      this._initPromiseRejecter = null;
      resolve(result);
    }
  }

  /**
   * Helper to reject init Promise
   * @private
   */
  _rejectInit(error) {
    if (this._initPromiseRejecter) {
      const reject = this._initPromiseRejecter;
      this._initPromiseResolver = null;
      this._initPromiseRejecter = null;
      reject(error);
    }
  }

  /**
   * Disconnect client and release all resources
   */
  destroy() {
    this._isExplicitlyClosed = true;

    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }

    this._stopHeartbeat();

    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    // Cancel all pending commands with client destroyed error
    for (const [cmdId, entry] of this._pendingCommands.entries()) {
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Client destroyed"));
    }
    this._pendingCommands.clear();
    this._commandQueue = [];

    this._cleanupSocket();
    this._setConnectionState(ConnectionStates.DISCONNECTED, { reason: "destroy" });

    super.destroy();
  }

  /**
   * Alias for destroy
   */
  disconnect() {
    this.destroy();
  }
}

export default RemoteGameClient;

