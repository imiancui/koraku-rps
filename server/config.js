// server/config.js
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

export const SERVER_CONFIG = Object.freeze({
  port: parseInt(process.env.PORT || "8080", 10),
  host: process.env.HOST || "0.0.0.0",
  protocolVersion: PROTOCOL_VERSION,
  configVersion: CONFIG_VERSION,
  jwtSecret: process.env.JWT_SECRET || "koraku-rps-auth-secret-key-2026",
  tokenTtlMs: 30 * 24 * 60 * 60 * 1000, // 30 days
  transferCodeTtlMs: 15 * 60 * 1000, // 15 minutes
  idleSessionTimeoutMs: 5 * 60 * 1000, // 5 minutes idle to unload from memory
  timingGraceMs: 150, // 150ms timing claim grace
  maxEnvelopeSizeBytes: 65536, // 64 KB
  rateLimit: {
    windowMs: 1000,
    maxRequestsPerWindow: 30,
    burstLimit: 50
  },
  allowedOrigins: [
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
