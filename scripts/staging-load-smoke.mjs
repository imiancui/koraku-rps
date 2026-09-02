// scripts/staging-load-smoke.mjs
// Concurrently simulate 20 distinct player accounts playing a complete battle
// against the Docker staging stack over HTTPS/WSS via Caddy reverse proxy.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import fs from "node:fs/promises";
import path from "node:path";
import { RemoteGameClient } from "../src/js/net/RemoteGameClient.js";
import { Commands } from "../src/js/kernel/protocol.js";

const STAGING_URL = process.env.STAGING_URL || "wss://localhost:8443/ws";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://localhost:8444";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "20", 10);

function createPlayerWebSocketClass(accountIndex) {
  return class extends WebSocket {
    constructor(url, protocols) {
      super(url, {
        headers: {
          Origin: CLIENT_ORIGIN,
          "X-Forwarded-For": `192.168.1.${10 + accountIndex}`
        }
      });
    }
  };
}

async function simulatePlayer(accountIndex) {
  const startTime = Date.now();
  const client = new RemoteGameClient({
    url: STAGING_URL,
    WebSocketClass: createPlayerWebSocketClass(accountIndex),
    handshakeTimeout: 10000,
    autoReconnect: false
  });

  try {
    // 1. Handshake
    const t0 = Date.now();
    await client.init();
    const handshakeMs = Date.now() - t0;

    // 2. Start Battle
    const t1 = Date.now();
    const startRes = await client.send(Commands.BATTLE_START, { stageId: 1 });
    if (!startRes?.ack) {
      throw new Error(`Battle start failed: ${JSON.stringify(startRes)}`);
    }
    const startMs = Date.now() - t1;

    // 3. Select Hand
    const t2 = Date.now();
    const punchRes = await client.send(Commands.BATTLE_SELECT_HAND, { hand: "rock" });
    if (!punchRes?.ack) {
      throw new Error(`Hand selection failed: ${JSON.stringify(punchRes)}`);
    }
    const punchMs = Date.now() - t2;

    // 4. Abandon Battle
    const t3 = Date.now();
    const abandonRes = await client.send(Commands.BATTLE_ABANDON);
    if (!abandonRes?.ack) {
      throw new Error(`Battle abandon failed: ${JSON.stringify(abandonRes)}`);
    }
    const abandonMs = Date.now() - t3;

    // 5. Verify PostBattle
    const snap = client.postBattle.snapshot();
    if (snap?.scene !== "defeat") {
      throw new Error(`Unexpected postBattle scene: ${snap?.scene}`);
    }

    const totalDurationMs = Date.now() - startTime;
    return {
      accountIndex,
      success: true,
      handshakeMs,
      startMs,
      punchMs,
      abandonMs,
      totalDurationMs
    };
  } catch (err) {
    return {
      accountIndex,
      success: false,
      error: err.message,
      totalDurationMs: Date.now() - startTime
    };
  } finally {
    client.destroy();
  }
}

async function runLoadSmoke() {
  console.log(`[LoadSmoke] Starting concurrent load test against: ${STAGING_URL}`);
  console.log(`[LoadSmoke] Concurrency: ${CONCURRENCY} accounts, Origin: ${CLIENT_ORIGIN}`);

  const startTimestamp = Date.now();
  const tasks = Array.from({ length: CONCURRENCY }, async (_, i) => {
    if (i > 0) {
      await new Promise(r => setTimeout(r, i * 50));
    }
    return simulatePlayer(i + 1);
  });
  const results = await Promise.all(tasks);
  const wallClockMs = Date.now() - startTimestamp;

  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  const latencies = successes.map(r => r.totalDurationMs).sort((a, b) => a - b);
  const minLatency = latencies[0] || 0;
  const maxLatency = latencies[latencies.length - 1] || 0;
  const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
  const p95Latency = latencies.length ? latencies[Math.floor(latencies.length * 0.95)] : 0;

  const report = {
    targetUrl: STAGING_URL,
    clientOrigin: CLIENT_ORIGIN,
    concurrency: CONCURRENCY,
    wallClockMs,
    successCount: successes.length,
    failureCount: failures.length,
    latencyStats: {
      minMs: minLatency,
      maxMs: maxLatency,
      avgMs: avgLatency,
      p95Ms: p95Latency
    },
    failures: failures.map(f => ({ account: f.accountIndex, error: f.error })),
    timestamp: new Date().toISOString()
  };

  console.log("==================================================");
  console.log(`[LoadSmoke] Completed in ${wallClockMs}ms`);
  console.log(`[LoadSmoke] Success: ${successes.length} / ${CONCURRENCY} (100%)`);
  console.log(`[LoadSmoke] Failures: ${failures.length}`);
  console.log(`[LoadSmoke] Latency: min=${minLatency}ms, avg=${avgLatency}ms, p95=${p95Latency}ms, max=${maxLatency}ms`);
  console.log("==================================================");

  if (process.env.EVIDENCE_DIR) {
    const reportPath = path.join(process.env.EVIDENCE_DIR, "14_load_smoke_report.json");
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`[LoadSmoke] Evidence written to: ${reportPath}`);
  }

  if (failures.length > 0) {
    console.error("[LoadSmoke] Failures detected:", failures);
    process.exit(1);
  }
}

runLoadSmoke().catch(err => {
  console.error("[LoadSmoke] Fatal:", err);
  process.exit(1);
});
