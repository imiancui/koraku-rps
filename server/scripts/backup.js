// server/scripts/backup.js
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { SERVER_CONFIG } from "../config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Calculate SHA-256 hash of a file
 */
async function computeFileHash(filePath) {
  const data = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Recursively copy directory and record SHA-256 hashes
 */
async function copyDirWithHashes(srcDir, destDir, manifestFiles, rootSrcDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        await copyDirWithHashes(srcPath, destPath, manifestFiles, rootSrcDir);
      } else if (entry.isFile() && !entry.name.endsWith(".tmp")) {
        await fs.copyFile(srcPath, destPath);
        const hash = await computeFileHash(destPath);
        const stat = await fs.stat(destPath);
        const relPath = path.relative(rootSrcDir, srcPath).replace(/\\/g, "/");
        manifestFiles[relPath] = {
          sha256: hash,
          sizeBytes: stat.size
        };
      }
    }
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
}

/**
 * Create a timestamped backup of the data directory
 * @param {object} [options]
 * @param {string} [options.dataDir]
 * @param {string} [options.backupDir]
 * @returns {Promise<{ backupPath: string, manifestPath: string, fileCount: number }>}
 */
export async function createBackup(options = {}) {
  const dataDir = options.dataDir || SERVER_CONFIG.dataDir;
  const backupRoot = options.backupDir || SERVER_CONFIG.backupDir;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupRoot, `backup-${timestamp}`);
  await fs.mkdir(backupPath, { recursive: true });

  const manifestFiles = {};
  await copyDirWithHashes(dataDir, backupPath, manifestFiles, dataDir);

  const manifest = {
    backupTimestamp: Date.now(),
    isoDate: new Date().toISOString(),
    configVersion: SERVER_CONFIG.configVersion,
    protocolVersion: SERVER_CONFIG.protocolVersion,
    fileCount: Object.keys(manifestFiles).length,
    files: manifestFiles
  };

  const manifestPath = path.join(backupPath, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`[BACKUP] Successfully created backup at: ${backupPath} (${manifest.fileCount} files)`);
  return { backupPath, manifestPath, fileCount: manifest.fileCount };
}

/**
 * Verify integrity of an existing backup directory against its manifest.json
 * @param {string} backupPath
 * @returns {Promise<{ valid: boolean, errors: string[] }>}
 */
export async function verifyBackupIntegrity(backupPath) {
  const manifestPath = path.join(backupPath, "manifest.json");
  const manifestRaw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestRaw);
  const errors = [];

  for (const [relPath, info] of Object.entries(manifest.files)) {
    const filePath = path.join(backupPath, relPath);
    try {
      const actualHash = await computeFileHash(filePath);
      if (actualHash !== info.sha256) {
        errors.push(`Hash mismatch for ${relPath}: expected ${info.sha256}, got ${actualHash}`);
      }
    } catch (err) {
      errors.push(`Missing or unreadable file ${relPath}: ${err.message}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Restore data from a backup directory into target data directory
 * @param {string} backupPath
 * @param {string} targetDataDir
 */
export async function restoreBackup(backupPath, targetDataDir = SERVER_CONFIG.dataDir) {
  const verification = await verifyBackupIntegrity(backupPath);
  if (!verification.valid) {
    throw new Error(`Cannot restore corrupted backup: ${verification.errors.join(", ")}`);
  }

  const manifestPath = path.join(backupPath, "manifest.json");
  const manifestRaw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestRaw);

  await fs.mkdir(targetDataDir, { recursive: true });

  for (const relPath of Object.keys(manifest.files)) {
    const srcFile = path.join(backupPath, relPath);
    const destFile = path.join(targetDataDir, relPath);
    await fs.mkdir(path.dirname(destFile), { recursive: true });
    await fs.copyFile(srcFile, destFile);
  }

  console.log(`[RESTORE] Successfully restored ${Object.keys(manifest.files).length} files to: ${targetDataDir}`);
  return { restoredFiles: Object.keys(manifest.files).length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createBackup()
    .then(async ({ backupPath }) => {
      const verify = await verifyBackupIntegrity(backupPath);
      if (verify.valid) {
        console.log("[BACKUP] Backup integrity verified 100% OK.");
      } else {
        console.error("[BACKUP] Integrity check failed:", verify.errors);
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("[BACKUP] Error running backup:", err);
      process.exit(1);
    });
}
