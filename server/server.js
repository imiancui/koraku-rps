// server/server.js
import http from "node:http";
import {
  SERVER_CONFIG,
  Events,
  ConnectionStates,
  ErrorCodes,
  resolveBattleLockPolicy
} from "./config.js";
import { AuthManager } from "./core/Auth.js";
import { JsonStorage } from "./storage/JsonStorage.js";
import { TransferManager } from "./core/TransferManager.js";
import { ConnectionManager } from "./core/ConnectionManager.js";
import { CommandQueue } from "./core/CommandQueue.js";
import { Validator } from "./core/Validator.js";
import { RateLimiter } from "./core/RateLimiter.js";
import { EntitlementManager } from "./core/Entitlements.js";
import { WsAdapter } from "./net/WsAdapter.js";

export class KorakuServer {
  constructor(options = {}) {
    this.config = { ...SERVER_CONFIG, ...options };
    if (options.battleLockPolicy) {
      this.config.battleLockPolicy = resolveBattleLockPolicy(options.battleLockPolicy);
    }
    this.storage = options.storage || new JsonStorage({ dataDir: this.config.dataDir });
    this.auth = options.auth || new AuthManager({ secret: this.config.jwtSecret, tokenTtlMs: this.config.tokenTtlMs });
    this.transferManager = options.transferManager || new TransferManager({ storage: this.storage, ttlMs: this.config.transferCodeTtlMs });
    this.connectionManager = options.connectionManager || new ConnectionManager({
      storage: this.storage,
      transferManager: this.transferManager,
      idleTimeoutMs: this.config.idleSessionTimeoutMs,
      battleLockPolicy: this.config.battleLockPolicy
    });
    this.commandQueue = options.commandQueue || new CommandQueue();
    this.validator = options.validator || new Validator({
      allowedOrigins: this.config.allowedOrigins,
      maxEnvelopeSizeBytes: this.config.maxEnvelopeSizeBytes,
      configVersion: this.config.configVersion,
      allowEmptyOrigin: this.config.allowEmptyOrigin
    });
    this.rateLimiter = options.rateLimiter || new RateLimiter(this.config.rateLimit);
    this.entitlements = options.entitlements || new EntitlementManager();

    this.httpServer = null;
    this.wsAdapter = null;
  }

  async init() {
    await this.storage.init();
  }

  /**
   * Start HTTP and WebSocket servers
   */
  async start(port = this.config.port, host = this.config.host) {
    await this.init();

    return new Promise((resolve, reject) => {
      this.httpServer = http.createServer((req, res) => {
        this._handleHttpRequest(req, res);
      });

      this.wsAdapter = new WsAdapter(this.httpServer, {
        verifyClient: ({ req, origin }, cb) => {
          const clientOrigin = origin || req.headers.origin || "";
          const isAllowed = this.validator.validateOrigin(clientOrigin, { isWsUpgrade: true });
          if (!isAllowed) {
            const clientIp = this._resolveClientIp(req);
            console.warn(`[KorakuServer] Command rejected (FORBIDDEN_ORIGIN) origin=${clientOrigin || "empty"}, ip=${clientIp}: WebSocket upgrade forbidden`);
            cb(false, 403, "Forbidden Origin");
            return;
          }
          cb(true);
        }
      });

      this.wsAdapter.on("connection", (socket, req) => {
        this._handleWsConnection(socket, req);
      });

      this.httpServer.on("error", (err) => {
        reject(err);
      });

      this.httpServer.listen(port, host, () => {
        const addr = this.httpServer.address();
        this.actualPort = typeof addr === "object" ? addr.port : port;
        console.log(`[KorakuServer] Authoritative server listening on http://${host}:${this.actualPort} (Protocol: v${this.config.protocolVersion}, Config: ${this.config.configVersion})`);
        resolve(this);
      });
    });
  }

  /**
   * Handle standard HTTP requests
   */
  _handleHttpRequest(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;
    const origin = req.headers.origin;

    // CORS headers
    if (origin) {
      if (this.validator.validateOrigin(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      } else {
        const clientIp = this._resolveClientIp(req);
        console.warn(`[KorakuServer] Command rejected (FORBIDDEN_ORIGIN) origin=${origin}, ip=${clientIp}: HTTP CORS origin rejected`);
      }
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === "GET" && pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          protocolVersion: this.config.protocolVersion,
          configVersion: this.config.configVersion,
          onlineConnections: this.connectionManager.getConnectionCount(),
          serverTime: Date.now()
        })
      );
      return;
    }

    if (req.method === "POST" && pathname === "/auth/anonymous") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          const payload = body ? JSON.parse(body) : {};
          const deviceId = payload.deviceId;
          // Dev entitlement can ONLY be granted by server whitelist or devAdminKey
          // Client request body cannot self-declare devEntitlement
          let devEntitlement = false;
          if (this.config.devAdminKey && payload.devAdminKey && payload.devAdminKey === this.config.devAdminKey) {
            devEntitlement = true;
          } else if (this.config.devDeviceWhitelist?.length && deviceId && this.config.devDeviceWhitelist.includes(deviceId)) {
            devEntitlement = true;
          }
          const authData = this.auth.issueAnonymousToken(deviceId, devEntitlement);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(authData));
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON body" }));
        }
      });
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }

  _resolveClientIp(req) {
    if (this.config.trustProxy || process.env.TRUST_PROXY === "true") {
      const forwarded = req.headers["x-forwarded-for"];
      if (forwarded) {
        const firstIp = forwarded.split(",")[0].trim();
        if (firstIp) return firstIp;
      }
      const realIp = req.headers["x-real-ip"];
      if (realIp) return realIp.trim();
    }
    return req.socket.remoteAddress || "unknown_ip";
  }

  /**
   * Handle incoming WebSocket connections
   */
  async _handleWsConnection(socket, req) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const clientIp = this._resolveClientIp(req);

    // Handshake IP rate limiter check
    const ipHandshakeCheck = this.rateLimiter.check(`ip_${clientIp}`);
    if (!ipHandshakeCheck.allowed) {
      socket.close(1008, "Rate limit exceeded");
      return;
    }

    const tokenQuery = parsedUrl.searchParams.get("token");
    const deviceIdQuery = parsedUrl.searchParams.get("deviceId");

    let authResult = null;
    if (tokenQuery) {
      authResult = this.auth.verifyToken(tokenQuery);
    }

    let accountId;
    let deviceId;
    let devEntitlement = false;
    let token = tokenQuery;

    if (authResult && authResult.valid) {
      accountId = authResult.payload.accountId;
      deviceId = authResult.payload.deviceId;
      devEntitlement = Boolean(authResult.payload.devEntitlement);
    } else {
      // Auto-issue fresh anonymous token
      const fresh = this.auth.issueAnonymousToken(deviceIdQuery);
      accountId = fresh.accountId;
      deviceId = fresh.deviceId;
      devEntitlement = fresh.devEntitlement;
      token = fresh.token;
    }

    // Register with ConnectionManager (automatically kicks any older duplicate connection)
    const session = this.connectionManager.registerConnection(accountId, socket, undefined, deviceId);
    await session.load();

    // Send connection state handshake ACK
    this.connectionManager.sendToSocket(socket, Events.CONNECTION_STATE, {
      state: ConnectionStates.ONLINE,
      accountId,
      deviceId,
      token,
      devEntitlement,
      protocolVersion: this.config.protocolVersion,
      configVersion: this.config.configVersion,
      serverConfig: {
        battleLockPolicy: this.config.battleLockPolicy
      },
      serverTime: Date.now()
    });

    // Send current store snapshot
    this.connectionManager.sendToSocket(socket, Events.STORE_CHANGED, session.state);

    // Socket message listener
    socket.on("message", async (rawMessage) => {
      await this._handleSocketMessage(socket, accountId, devEntitlement, clientIp, rawMessage);
    });

    socket.on("close", () => {
      this.connectionManager.handleDisconnect(socket);
    });

    socket.on("error", (err) => {
      console.error(`[KorakuServer] Socket error on account ${accountId}:`, err);
      this.connectionManager.handleDisconnect(socket);
    });
  }

  /**
   * Handle incoming envelope message from a socket
   */
  async _handleSocketMessage(socket, accountId, devEntitlement, clientIp, rawMessage) {
    // 1. Control frames (handshake / ping) - bypass command rate limits
    let parsedObj = null;
    try {
      parsedObj = typeof rawMessage === "string" ? JSON.parse(rawMessage) : JSON.parse(rawMessage.toString("utf8"));
    } catch (_) {}

    if (parsedObj?.type === "handshake") {
      return;
    }
    if (parsedObj?.type === "ping") {
      this.connectionManager.sendToSocket(socket, "pong", {
        type: "pong",
        clientTime: parsedObj.clientTime,
        t1: parsedObj.clientTime,
        serverTime: Date.now()
      });
      return;
    }

    // 2. Rate limiter check for commands (account-level and IP-level)
    const rateCheck = this.rateLimiter.check(accountId || clientIp);
    const ipMsgCheck = clientIp ? this.rateLimiter.check(`ip_${clientIp}`) : { allowed: true };
    if (!rateCheck.allowed || !ipMsgCheck.allowed) {
      const retryAfterMs = Math.max(rateCheck.retryAfterMs || 0, ipMsgCheck.retryAfterMs || 0) || 1000;
      console.warn(`[KorakuServer] Command rejected (RATE_LIMITED) for account=${accountId || "unknown"}, ip=${clientIp}: Rate limit exceeded, retry after ${retryAfterMs}ms`);
      this.connectionManager.sendToSocket(socket, Events.COMMAND_REJECTED, {
        code: ErrorCodes.RATE_LIMITED,
        error: `Rate limit exceeded. Retry after ${retryAfterMs}ms.`,
        retryAfterMs
      });
      return;
    }

    // 3. Schema and envelope validation
    const validation = this.validator.validateRawMessage(rawMessage);
    if (!validation.valid) {
      if (validation.code === ErrorCodes.VERSION_MISMATCH) {
        console.warn(`[KorakuServer] Command rejected (VERSION_MISMATCH) for account=${accountId || "unknown"}, ip=${clientIp}, clientVersion=${parsedObj?.configVersion || "unknown"}, serverVersion=${this.config.configVersion}: ${validation.error}`);
      } else {
        console.warn(`[KorakuServer] Command rejected (${validation.code || ErrorCodes.INVALID_SCHEMA}) for account=${accountId || "unknown"}, cmdId=${validation.envelope?.cmdId}: ${validation.error}`);
      }
      this.connectionManager.sendToSocket(socket, Events.COMMAND_REJECTED, {
        cmdId: validation.envelope?.cmdId || parsedObj?.cmdId || null,
        code: validation.code || ErrorCodes.INVALID_SCHEMA,
        error: validation.error
      });
      return;
    }

    const envelope = validation.envelope;

    // 3. Dev Entitlement verification for cheat commands
    const entitlementCheck = this.entitlements.checkEntitlement({
      command: envelope.command,
      accountId,
      devEntitlement,
      ip: clientIp
    });

    if (!entitlementCheck.allowed) {
      console.warn(`[KorakuServer] Command rejected (${entitlementCheck.error || ErrorCodes.UNAUTHORIZED_CHEAT}) for account=${accountId}, cmdId=${envelope.cmdId}: ${entitlementCheck.message}`);
      this.connectionManager.sendToSocket(socket, Events.COMMAND_REJECTED, {
        cmdId: envelope.cmdId,
        code: entitlementCheck.error || ErrorCodes.UNAUTHORIZED_CHEAT,
        error: entitlementCheck.message
      });
      return;
    }

    // 4. Enqueue into serialized FIFO queue per account
    try {
      const outcome = await this.commandQueue.enqueue(accountId, envelope, async () => {
        const session = await this.connectionManager.getOrCreateSession(accountId);
        return session.executeCommand(envelope);
      });

      if (outcome && outcome.ack === false) {
        console.warn(`[KorakuServer] Command rejected (${outcome.error || ErrorCodes.INTERNAL_ERROR}) for account=${accountId}, cmdId=${envelope.cmdId}: ${outcome.message || "Command execution failed"}`);
        this.connectionManager.sendToSocket(socket, Events.COMMAND_REJECTED, {
          cmdId: envelope.cmdId,
          code: outcome.error || ErrorCodes.INTERNAL_ERROR,
          error: outcome.message || "Command execution failed"
        });
      } else {
        this.connectionManager.sendToSocket(socket, Events.COMMAND_ACK, {
          cmdId: envelope.cmdId,
          ...outcome
        });
      }
    } catch (err) {
      console.error(`[KorakuServer] Error processing command ${envelope.command} for ${accountId}:`, err);
      this.connectionManager.sendToSocket(socket, Events.COMMAND_REJECTED, {
        cmdId: envelope.cmdId,
        code: ErrorCodes.INTERNAL_ERROR,
        error: "Internal server error occurred."
      });
    }
  }

  /**
   * Graceful server shutdown
   */
  async close() {
    if (this.rateLimiter) {
      this.rateLimiter.destroy();
    }
    if (this.commandQueue) {
      this.commandQueue.destroy();
    }
    if (this.connectionManager) {
      await this.connectionManager.flushAll();
      this.connectionManager.destroy();
    }
    if (this.wsAdapter) {
      this.wsAdapter.close();
    }

    return new Promise((resolve) => {
      if (this.httpServer) {
        this.httpServer.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  async stop() {
    return this.close();
  }
}

export function createKorakuServer(options = {}) {
  return new KorakuServer(options);
}

export default KorakuServer;
