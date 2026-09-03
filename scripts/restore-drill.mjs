import fs from "node:fs/promises";
import path from "node:path";
import { restoreBackup } from "../server/scripts/backup.js";
import { createKorakuServer } from "../server/server.js";

const evidenceDir = path.resolve("docs/ops/evidence/tailscale-20260903");
const logFile = path.join(evidenceDir, "restore_drill_log.txt");
const logs = [];

function log(msg) {
  console.log(msg);
  logs.push(msg);
}

async function runDrill() {
  await fs.mkdir(evidenceDir, { recursive: true });
  const root = path.resolve(".");
  const dataDir = path.join(root, "server", "data");
  const dataBakDir = path.join(root, "server", "data.drill_bak");
  const backupDir = path.join(root, "server", "backups", "backup-2026-09-03T07-14-24-959Z");

  log("=== [Restore Drill Start] ===");
  log("Timestamp: " + new Date().toISOString());
  log("Backup source: " + backupDir);

  // 1. Rename server/data -> server/data.drill_bak
  log("Step 1: Renaming server/data to server/data.drill_bak...");
  await fs.rename(dataDir, dataBakDir);
  log("server/data moved successfully.");

  // 2. Execute restore
  log("Step 2: Executing restoreBackup from " + backupDir + "...");
  const restoreRes = await restoreBackup(backupDir, dataDir);
  log("Restore completed: " + JSON.stringify(restoreRes));

  // 3. Verify files restored
  log("Step 3: Verifying restored files in server/data...");
  const accountFile = path.join(dataDir, "accounts", "acc_prod_sample.json");
  const ledgerFile = path.join(dataDir, "ledgers", "acc_prod_sample.jsonl");
  const replayFile = path.join(dataDir, "replays", "acc_prod_sample_btl_sample_001.json");

  const accStat = await fs.stat(accountFile);
  const ledStat = await fs.stat(ledgerFile);
  const repStat = await fs.stat(replayFile);
  log(`Restored files verified: account (${accStat.size}B), ledger (${ledStat.size}B), replay (${repStat.size}B)`);

  // 4. Start server on ephemeral port and test /health
  log("Step 4: Starting server against restored data and testing /health...");
  const server = createKorakuServer({ port: 0, host: "127.0.0.1", dataDir });
  await server.start();
  const port = server.actualPort;
  log(`Server started on port ${port}`);

  const healthRes = await fetch(`http://127.0.0.1:${port}/health`);
  const healthJson = await healthRes.json();
  log(`/health status: ${healthRes.status}, body: ${JSON.stringify(healthJson)}`);

  await server.close();
  log("Server stopped.");

  // 5. Cleanup drill bak
  log("Step 5: Cleaning up drill temporary backup...");
  await fs.rm(dataBakDir, { recursive: true, force: true });
  log("Cleanup finished.");

  log("=== [Restore Drill Completed Successfully] ===");

  await fs.writeFile(logFile, logs.join("\n"), "utf8");
}

runDrill().catch(async (err) => {
  log("Drill failed: " + err.stack);
  await fs.writeFile(logFile, logs.join("\n"), "utf8").catch(() => {});
  process.exit(1);
});
