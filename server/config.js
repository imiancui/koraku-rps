import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PROTOCOL_VERSION,
  CONFIG_VERSION,
  Commands,
  Events,
  ErrorCodes,
  ConnectionStates
} from "../src/js/kernel/protocol.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function isDevOrTestEnvironment() {
  return process.env.NODE_ENV !== "production";
}

function resolveJwtSecret() {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  if (isDevOrTestEnvironment()) {
    console.warn("[KorakuServer] Warning: JWT_SECRET not set in development mode. Generating ephemeral random secret.");
    return crypto.randomBytes(32).toString("hex");
  }
  throw new Error("[KorakuServer] Fatal: JWT_SECRET environment variable is strictly required when not in explicit development mode.");
}

function resolveAnonSalt() {
  if (process.env.ANON_SALT) {
    return process.env.ANON_SALT;
  }
  if (isDevOrTestEnvironment()) {
    console.warn("[KorakuServer] Warning: ANON_SALT not set in development mode. Generating ephemeral random salt.");
    return crypto.randomBytes(32).toString("hex");
  }
  throw new Error("[KorakuServer] Fatal: ANON_SALT environment variable is strictly required when not in explicit development mode.");
}

export const VALID_BATTLE_LOCK_POLICIES = new Set(["always", "countdown", "never"]);

export function resolveBattleLockPolicy(policyValue = process.env.BATTLE_LOCK_POLICY) {
  const policy = (policyValue || "always").trim().toLowerCase();
  if (!VALID_BATTLE_LOCK_POLICIES.has(policy)) {
    throw new Error(`[KorakuServer] Fatal: Invalid battleLockPolicy '${policyValue}'. Valid options are: always, countdown, never.`);
  }
  return policy;
}

export function resolveDevAdminKey() {
  if (process.env.DEV_ADMIN_KEY) {
    return process.env.DEV_ADMIN_KEY;
  }
  if (isDevOrTestEnvironment()) {
    return "8989";
  }
  return null;
}

export const SERVER_CONFIG = Object.freeze({
  port: parseInt(process.env.PORT || "8080", 10),
  host: process.env.HOST || "0.0.0.0",
  protocolVersion: PROTOCOL_VERSION,
  configVersion: CONFIG_VERSION,
  battleLockPolicy: resolveBattleLockPolicy(),
  jwtSecret: resolveJwtSecret(),
  anonSalt: resolveAnonSalt(),
  trustProxy: process.env.TRUST_PROXY === "true",
  allowEmptyOrigin: process.env.ALLOW_EMPTY_ORIGIN === "true",
  tokenTtlMs: 30 * 24 * 60 * 60 * 1000, // 30 days
  transferCodeTtlMs: 15 * 60 * 1000, // 15 minutes
  idleSessionTimeoutMs: 5 * 60 * 1000, // 5 minutes idle to unload from memory
  timingGraceMs: 150, // 150ms timing claim grace
  maxEnvelopeSizeBytes: 4096, // 4 KB (adjudicated from max valid command 1850 bytes)
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "1000", 10),
    maxRequestsPerWindow: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "30", 10),
    burstWindowMs: parseInt(process.env.RATE_LIMIT_BURST_WINDOW_MS || "200", 10),
    burstLimit: parseInt(process.env.RATE_LIMIT_BURST_LIMIT || "10", 10)
  },
  devAdminKey: resolveDevAdminKey(),
  devDeviceWhitelist: process.env.DEV_DEVICE_WHITELIST ? process.env.DEV_DEVICE_WHITELIST.split(",") : [],
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
    : [
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://koraku.app",
        "http://koraku.app",
        "https://imiancui.github.io"
      ],
  dataDir: process.env.STORAGE_DIR || path.resolve(__dirname, "data"),
  backupDir: process.env.BACKUP_DIR || path.resolve(__dirname, "backups")
});

export {
  PROTOCOL_VERSION,
  CONFIG_VERSION,
  Commands,
  Events,
  ErrorCodes,
  ConnectionStates
};
