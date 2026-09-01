import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "../e2e/rwd/coverage.js";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const args = new Set(process.argv.slice(2));
if ([...args].some(arg => !["--list", "--preflight"].includes(arg)) || args.size > 1) throw new Error("Use at most one of --list or --preflight");
const listOnly = args.has("--list");
const preflightOnly = args.has("--preflight");
const contract = manifest.stageC.full.repeat;
if (contract.smokeRuns !== 3 || contract.fullRuns !== 2 || contract.retries !== 0) throw new Error("Repeat manifest must require Smoke3, Full2 and zero retry");
const root = mkdtempSync(path.join(os.tmpdir(), "koraku-rwd-repeat-"));
writeFileSync(path.join(root, "owner.json"), JSON.stringify({ ownerRoot: projectRoot, kind: "repeat" }, null, 2));
let activeChild = null;
process.on("SIGINT", () => activeChild?.kill());
process.on("SIGTERM", () => activeChild?.kill());

function childRoot() {
  const value = mkdtempSync(path.join(os.tmpdir(), "koraku-rwd-"));
  writeFileSync(path.join(value, "owner.json"), JSON.stringify({ ownerRoot: projectRoot }));
  return value;
}

function execute(script, scriptArgs, env = {}) {
  return new Promise(resolve => {
    const output = [];
    const child = spawn(process.execPath, [path.join(projectRoot, script), ...scriptArgs], {
      cwd: projectRoot,
      env: { ...process.env, ...env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" },
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    activeChild = child;
    for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => {
      output.push(chunk);
      (stream === child.stdout ? process.stdout : process.stderr).write(chunk);
    });
    child.on("error", error => resolve({ code: 1, signal: null, error: error.message, output: "" }));
    child.on("close", (code, signal) => {
      activeChild = null;
      resolve({ code: code ?? 1, signal, output: Buffer.concat(output).toString("utf8") });
    });
  });
}

function evidenceFrom(output) {
  return [...output.matchAll(/evidence:\s*([^\r\n]+)/g)].at(-1)?.[1]?.trim() || null;
}

function finish(summary, code) {
  writeFileSync(path.join(root, "repeat-summary.json"), JSON.stringify(summary, null, 2));
  console.log(`RWD Repeat | ${summary.status.toUpperCase()} | evidence: ${root}`);
  process.exitCode = code;
}

const preflight = listOnly ? null : await execute("scripts/run-rwd-full.mjs", ["--preflight"]);
if (preflightOnly || (!listOnly && preflight.code !== 0)) {
  finish({
    schemaVersion: 1,
    mode: "preflight",
    status: preflight.code === 0 ? "passed" : "failed",
    fullRwdAcceptance: false,
    plan: contract,
    issues: preflight.code === 0 ? [] : [{ code: "full-preflight-failed", evidenceRoot: evidenceFrom(preflight.output) }],
    runs: [{ kind: "full-preflight", ...preflight, evidenceRoot: evidenceFrom(preflight.output) }]
  }, preflight.code);
} else if (listOnly) {
  const smokeRoot = childRoot();
  const smoke = await execute("scripts/run-rwd.mjs", [contract.smokeScope, "--list"], {
    KORAKU_RWD_ENGINE: contract.smokeEngine,
    KORAKU_RWD_RUN_DIR: smokeRoot
  });
  const full = await execute("scripts/run-rwd-full.mjs", ["--list"]);
  const passed = smoke.code === 0 && full.code === 0;
  finish({
    schemaVersion: 1,
    mode: "list",
    status: "not-run",
    discoveryStatus: passed ? "passed" : "failed",
    listOnly: true,
    fullRwdAcceptance: false,
    plan: contract,
    issues: passed ? [] : [{ code: "repeat-discovery-failed" }],
    runs: [
      { kind: "smoke-discovery", ...smoke, evidenceRoot: smokeRoot },
      { kind: "full-discovery", ...full, evidenceRoot: evidenceFrom(full.output) }
    ]
  }, passed ? 0 : 1);
} else {
  const results = [];
  for (let index = 0; index < contract.smokeRuns; index++) {
    const evidenceRoot = childRoot();
    const run = await execute("scripts/run-rwd.mjs", [contract.smokeScope], {
      KORAKU_RWD_ENGINE: contract.smokeEngine,
      KORAKU_RWD_RUN_DIR: evidenceRoot
    });
    results.push({ kind: "smoke", iteration: index + 1, ...run, evidenceRoot });
  }
  for (let index = 0; index < contract.fullRuns; index++) {
    const run = await execute("scripts/run-rwd-full.mjs", []);
    results.push({ kind: "full", iteration: index + 1, ...run, evidenceRoot: evidenceFrom(run.output) });
  }
  const issues = results.filter(run => run.code !== 0).map(run => ({ code: "repeat-run-failed", kind: run.kind, iteration: run.iteration, evidenceRoot: run.evidenceRoot }));
  finish({
    schemaVersion: 1,
    mode: "repeat",
    status: issues.length ? "failed" : "passed",
    fullRwdAcceptance: !issues.length,
    plan: contract,
    issues,
    runs: results
  }, issues.length ? 1 : 0);
}
