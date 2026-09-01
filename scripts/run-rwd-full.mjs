import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, firefox, webkit } from "playwright";
import { fullRequiredCases, fullRuns } from "../e2e/rwd/coverage.js";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const workspaceRoot = path.resolve(projectRoot, "..");
const args = new Set(process.argv.slice(2));
if ([...args].some(arg => !["--list", "--preflight"].includes(arg)) || args.size > 1) {
  throw new Error("Use at most one of --list or --preflight");
}
const listOnly = args.has("--list");
const preflightOnly = args.has("--preflight");
const root = mkdtempSync(path.join(os.tmpdir(), "koraku-rwd-full-"));
writeFileSync(path.join(root, "owner.json"), JSON.stringify({ ownerRoot: projectRoot, kind: "full" }, null, 2));

const browsers = { chromium, firefox, webkit };
const browserStatus = Object.fromEntries(Object.entries(browsers).map(([name, type]) => {
  const executablePath = type.executablePath();
  return [name, { executablePath, available: existsSync(executablePath) }];
}));
const required = fullRequiredCases();
const runs = fullRuns();
writeFileSync(path.join(root, "full-required.json"), JSON.stringify({ expectedCount: required.length, cases: required }, null, 2));

const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const sha256 = file => hash(readFileSync(path.isAbsolute(file) ? file : path.join(projectRoot, file)));
const source = Object.fromEntries([
  "src/js/bundle.js", "src/styles/responsive.css", "e2e/rwd/manifest.json", "e2e/rwd/coverage.js",
  "playwright.rwd.config.js", "scripts/run-rwd.mjs", "scripts/run-rwd-full.mjs", "scripts/run-rwd-repeat.mjs"
].filter(file => existsSync(path.join(projectRoot, file))).map(file => [file, sha256(file)]));
const approvedPath = path.join(projectRoot, "e2e/rwd/baselines/approved.json");
const approved = JSON.parse(readFileSync(approvedPath, "utf8"));
const goldenHash = createHash("sha256");
for (const item of [...approved.cases].sort((a, b) => a.file.localeCompare(b.file))) {
  const file = path.join(projectRoot, item.file);
  goldenHash.update(path.basename(file));
  goldenHash.update(readFileSync(file));
}
const gitStatus = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all", "--", "New-game-project-4", "openspec/changes/koraku-rwd-contract-regression-gate"], { cwd: workspaceRoot, encoding: "utf8", windowsHide: true });
const dirtyHash = createHash("sha256");
for (const entry of gitStatus.trim().split(/\r?\n/).filter(Boolean)) {
  const relative = entry.slice(3).split(" -> ").at(-1);
  const file = path.join(workspaceRoot, relative);
  dirtyHash.update(entry);
  if (existsSync(file) && statSync(file).isFile()) dirtyHash.update(readFileSync(file));
  else dirtyHash.update("<missing-or-non-file>");
}
const openSpecFiles = [
  "proposal.md", "design.md", "tasks.md", "specs/koraku-rps/combat-and-qte/spec.md",
  "specs/koraku-rps/responsive-regression-verification/spec.md"
];
const changeRoot = path.join(workspaceRoot, "openspec/changes/koraku-rwd-contract-regression-gate");
const audit = {
  git: {
    head: execFileSync("git", ["rev-parse", "HEAD"], { cwd: workspaceRoot, encoding: "utf8", windowsHide: true }).trim(),
    dirtyStatusSha256: hash(gitStatus),
    dirtyTreeSha256: dirtyHash.digest("hex"),
    dirtyEntries: gitStatus.trim().split(/\r?\n/).filter(Boolean)
  },
  golden: {
    approval: approved.approval,
    approvedAt: approved.approvedAt,
    caseCount: approved.cases.length,
    treeSha256: goldenHash.digest("hex"),
    manifestSha256: sha256(approvedPath)
  },
  openSpec: Object.fromEntries(openSpecFiles.map(file => [file, sha256(path.join(changeRoot, file))]))
};

let activeChild = null;
process.on("SIGINT", () => activeChild?.kill());
process.on("SIGTERM", () => activeChild?.kill());
function childRoot() {
  const value = mkdtempSync(path.join(os.tmpdir(), "koraku-rwd-"));
  writeFileSync(path.join(value, "owner.json"), JSON.stringify({ ownerRoot: projectRoot }));
  return value;
}

function execute(run, index) {
  const evidenceRoot = childRoot();
  const logPath = path.join(root, `${String(index + 1).padStart(2, "0")}-${run.engine}-${run.scope}.log`);
  return new Promise(resolve => {
    const output = [];
    const child = spawn(process.execPath, [path.join(projectRoot, "scripts/run-rwd.mjs"), run.scope, ...(listOnly ? ["--list"] : [])], {
      cwd: projectRoot,
      env: {
        ...process.env,
        KORAKU_RWD_ENGINE: run.engine,
        KORAKU_RWD_RUN_DIR: evidenceRoot,
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1"
      },
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    activeChild = child;
    for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => {
      output.push(chunk);
      (stream === child.stdout ? process.stdout : process.stderr).write(chunk);
    });
    child.on("error", error => resolve({ code: 1, signal: null, error: error.message, evidenceRoot }));
    child.on("close", (code, signal) => {
      activeChild = null;
      writeFileSync(logPath, Buffer.concat(output));
      resolve({ code: code ?? 1, signal, evidenceRoot, logPath });
    });
  });
}

function finish(summary, exitCode) {
  const complete = { ...summary, audit };
  writeFileSync(path.join(root, "full-summary.json"), JSON.stringify(complete, null, 2));
  console.log(`RWD Full | ${complete.status.toUpperCase()} | required: ${required.length} | evidence: ${root}`);
  if (complete.issues.length) console.error(JSON.stringify(complete.issues, null, 2));
  process.exitCode = exitCode;
}

const missing = Object.entries(browserStatus).filter(([, status]) => !status.available).map(([engine, status]) => ({
  code: "required-browser-missing", engine, executablePath: status.executablePath, status: "NOT_RUN"
}));

if (preflightOnly || (!listOnly && missing.length)) {
  finish({
    schemaVersion: 1,
    mode: "preflight",
    status: missing.length ? "failed" : "passed",
    fullRwdAcceptance: false,
    browserStatus,
    source,
    requiredCount: required.length,
    executedCount: 0,
    issues: missing,
    runs: []
  }, missing.length ? 1 : 0);
} else {
  const results = [];
  const actual = [];
  for (let index = 0; index < runs.length; index++) {
    const run = runs[index];
    console.log(`\nFull subrun ${index + 1}/${runs.length}: ${run.engine} / ${run.scope} / ${run.requiredCount} cases`);
    const processResult = await execute(run, index);
    let coverage = null;
    try { coverage = JSON.parse(readFileSync(path.join(processResult.evidenceRoot, "coverage.json"), "utf8")); } catch {}
    const ids = listOnly
      ? JSON.parse(readFileSync(path.join(processResult.evidenceRoot, "discovery.json"), "utf8")).discovered.map(item => item.id)
      : coverage?.results?.map(item => item.id) || [];
    actual.push(...ids.map(id => `${run.engine}:${run.scope}:${id}`));
    results.push({ ...run, cases: undefined, ...processResult, coverage });
  }
  const expectedIds = new Set(required.map(item => item.id));
  const actualIds = new Set(actual);
  const issues = [];
  if (actualIds.size !== actual.length) issues.push({ code: "duplicate-full-case", actual: actual.length, unique: actualIds.size });
  for (const id of expectedIds) if (!actualIds.has(id)) issues.push({ code: "missing-full-case", id });
  for (const id of actualIds) if (!expectedIds.has(id)) issues.push({ code: "unexpected-full-case", id });
  for (const result of results) {
    const expectedStatus = listOnly ? result.coverage?.discoveryStatus === "passed" : result.coverage?.status === "passed";
    if (result.code !== 0 || !expectedStatus) issues.push({
      code: "full-subrun-failed", engine: result.engine, scope: result.scope, exitCode: result.code,
      status: result.coverage?.status, discoveryStatus: result.coverage?.discoveryStatus, evidenceRoot: result.evidenceRoot
    });
  }
  const passed = !issues.length && actual.length === required.length;
  finish({
    schemaVersion: 1,
    mode: listOnly ? "list" : "full",
    status: listOnly ? "not-run" : passed ? "passed" : "failed",
    discoveryStatus: listOnly ? (passed ? "passed" : "failed") : undefined,
    listOnly,
    fullRwdAcceptance: !listOnly && passed,
    browserStatus,
    source,
    requiredCount: required.length,
    executedCount: listOnly ? 0 : actual.length,
    discoveredCount: listOnly ? actual.length : undefined,
    issues,
    runs: results
  }, passed ? 0 : 1);
}
