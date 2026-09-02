// server/storage/JsonStorage.js
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { StorageAdapter } from "./StorageAdapter.js";
import { SERVER_CONFIG } from "../config.js";

export class JsonStorage extends StorageAdapter {
  constructor(options = {}) {
    super();
    this.dataDir = options.dataDir || SERVER_CONFIG.dataDir;
    this.accountsDir = path.join(this.dataDir, "accounts");
    this.ledgersDir = path.join(this.dataDir, "ledgers");
    this.transfersDir = path.join(this.dataDir, "transfers");
    this.replaysDir = path.join(this.dataDir, "replays");
    this._initialized = false;
  }

  async init() {
    if (this._initialized) return;
    await fs.mkdir(this.accountsDir, { recursive: true });
    await fs.mkdir(this.ledgersDir, { recursive: true });
    await fs.mkdir(this.transfersDir, { recursive: true });
    await fs.mkdir(this.replaysDir, { recursive: true });
    this._initialized = true;
  }

  _sanitizeId(id) {
    if (typeof id === "string" && /^[a-zA-Z0-9_-]+$/.test(id)) {
      return id;
    }
    const clean = String(id || "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const hash = crypto.createHash("sha256").update(String(id || "")).digest("hex").slice(0, 12);
    return `${clean}_${hash}`;
  }

  _accountPath(accountId) {
    const safeId = this._sanitizeId(accountId);
    return path.join(this.accountsDir, `${safeId}.json`);
  }

  _ledgerPath(accountId) {
    const safeId = this._sanitizeId(accountId);
    return path.join(this.ledgersDir, `${safeId}.jsonl`);
  }

  _transferPath(code) {
    const safeCode = this._sanitizeId(code);
    return path.join(this.transfersDir, `${safeCode}.json`);
  }

  _replayPath(accountId, battleId) {
    const safeAccount = this._sanitizeId(accountId);
    const safeBattle = this._sanitizeId(battleId);
    return path.join(this.replaysDir, `${safeAccount}_${safeBattle}.json`);
  }

  /**
   * Atomic file write using a unique temporary file, fsync, followed by rename
   */
  async _atomicWrite(targetPath, content) {
    await this.init();
    const tmpPath = `${targetPath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
    const handle = await fs.open(tmpPath, "w");
    try {
      await handle.writeFile(content, "utf8");
      await handle.sync();
    } finally {
      await handle.close();
    }
    await fs.rename(tmpPath, targetPath);
  }

  async getAccount(accountId) {
    await this.init();
    const filePath = this._accountPath(accountId);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") return null;
      throw err;
    }
  }

  async saveAccount(accountId, data) {
    await this.init();
    const filePath = this._accountPath(accountId);
    const content = JSON.stringify(data, null, 2);
    await this._atomicWrite(filePath, content);
    return data;
  }

  async deleteAccount(accountId) {
    await this.init();
    const accountFile = this._accountPath(accountId);
    const ledgerFile = this._ledgerPath(accountId);

    let deleted = false;
    try {
      await fs.unlink(accountFile);
      deleted = true;
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    // GDPR Right to Erasure with Economic Integrity:
    // Retain economic ledger for audit trail, but permanently anonymize accountId
    // with irreversible HMAC-SHA256(accountId, serverSalt)
    const salt = this.anonSalt || SERVER_CONFIG.anonSalt;
    const anonId = "anon_" + crypto.createHmac("sha256", salt).update(accountId).digest("hex").slice(0, 24);

    try {
      const content = await fs.readFile(ledgerFile, "utf8");
      const lines = content.split("\n").filter(Boolean);
      const anonymizedLines = lines.map((line) => {
        try {
          const parsed = JSON.parse(line);
          if (parsed.accountId === accountId) {
            parsed.accountId = anonId;
            parsed.anonymizedAt = Date.now();
          }
          return JSON.stringify(parsed);
        } catch {
          return line;
        }
      });

      const anonLedgerPath = this._ledgerPath(anonId);
      await fs.appendFile(anonLedgerPath, anonymizedLines.join("\n") + "\n", "utf8");
      await fs.unlink(ledgerFile);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    // Clean up any transfer codes associated with this account
    try {
      const transferFiles = await fs.readdir(this.transfersDir);
      for (const file of transferFiles) {
        if (!file.endsWith(".json")) continue;
        const transferPath = path.join(this.transfersDir, file);
        try {
          const raw = await fs.readFile(transferPath, "utf8");
          const codeData = JSON.parse(raw);
          if (codeData.accountId === accountId) {
            await fs.unlink(transferPath);
          }
        } catch {
          // ignore error on read/unlink
        }
      }
    } catch {
      // ignore readdir error
    }

    return deleted;
  }

  async appendLedger(accountId, entry) {
    await this.init();
    const ledgerFile = this._ledgerPath(accountId);
    const record = {
      id: entry.id || `led_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      accountId,
      source: entry.source || "unknown",
      delta: entry.delta || {},
      serverTime: entry.serverTime || Date.now(),
      configVersion: entry.configVersion || SERVER_CONFIG.configVersion
    };
    const line = JSON.stringify(record) + "\n";
    await fs.appendFile(ledgerFile, line, "utf8");
    return record;
  }

  async getLedger(accountId) {
    await this.init();
    const ledgerFile = this._ledgerPath(accountId);
    try {
      const content = await fs.readFile(ledgerFile, "utf8");
      return content
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async saveTransferCode(code, data) {
    await this.init();
    const filePath = this._transferPath(code);
    const content = JSON.stringify(data, null, 2);
    await this._atomicWrite(filePath, content);
    return data;
  }

  async getTransferCode(code) {
    await this.init();
    const filePath = this._transferPath(code);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") return null;
      throw err;
    }
  }

  async markTransferCodeUsed(code, claimData = {}) {
    await this.init();
    const current = await this.getTransferCode(code);
    if (!current) return null;
    const updated = {
      ...current,
      used: true,
      claimedAt: Date.now(),
      claimedByDeviceId: claimData.deviceId || null
    };
    await this.saveTransferCode(code, updated);
    return updated;
  }

  async exportAllAccountData(accountId) {
    await this.init();
    const account = await this.getAccount(accountId);
    if (!account) return null;
    const ledger = await this.getLedger(accountId);

    return {
      exportMetadata: {
        accountId,
        exportTimestamp: Date.now(),
        isoDate: new Date().toISOString(),
        configVersion: SERVER_CONFIG.configVersion,
        protocolVersion: SERVER_CONFIG.protocolVersion,
        format: "GDPR_JSON_EXPORT_V1"
      },
      accountData: account,
      economicLedger: ledger
    };
  }

  async saveBattleReplay(accountId, replayData) {
    await this.init();
    const filePath = this._replayPath(accountId, replayData.battleId);
    await this._atomicWrite(filePath, JSON.stringify(replayData, null, 2));
    return replayData;
  }

  async getBattleReplay(accountId, battleId) {
    await this.init();
    const filePath = this._replayPath(accountId, battleId);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") return null;
      throw err;
    }
  }

  async listAllAccounts() {
    await this.init();
    try {
      const files = await fs.readdir(this.accountsDir);
      return files
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(/\.json$/, ""));
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }
}

export default JsonStorage;
