import { defineConfig } from "@playwright/test";
import { mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { requiredCases } from "./e2e/rwd/coverage.js";

const scope = process.env.KORAKU_RWD_SCOPE || "stage-a";
const engine = process.env.KORAKU_RWD_ENGINE || "chromium";
if (!["chromium", "firefox", "webkit"].includes(engine)) throw new Error("Unsupported RWD browser engine: " + engine);
const selectedCases = requiredCases(scope);
const grep = scope === "stage-a"
  ? new RegExp("@(?:" + [...new Set(selectedCases.map(item => item.lane))].join("|") + ")(?:\\s|$)")
  : new RegExp("@" + scope + "(?:\\s|$)");
// A fresh task-owned directory: Playwright never clears another run's evidence.
const ownerRoot = fileURLToPath(new URL("./", import.meta.url));
const gitHead = execFileSync("git", ["rev-parse", "HEAD"], { cwd: ownerRoot, encoding: "utf8", windowsHide: true }).trim();
let runDir = process.env.KORAKU_RWD_RUN_DIR;
if (!runDir) {
  runDir = mkdtempSync(path.join(os.tmpdir(), "koraku-rwd-"));
  writeFileSync(path.join(runDir, "owner.json"), JSON.stringify({ ownerRoot }));
  process.env.KORAKU_RWD_RUN_DIR = runDir;
} else {
  const resolved = realpathSync(runDir);
  if (path.dirname(resolved) !== realpathSync(os.tmpdir()) || !/^koraku-rwd-[A-Za-z0-9]+$/.test(path.basename(resolved)) ||
      JSON.parse(readFileSync(path.join(resolved, "owner.json"), "utf8")).ownerRoot !== ownerRoot) {
    throw new Error("Refusing a non-owned RWD output directory");
  }
  runDir = resolved;
}

export default defineConfig({
  testDir: "./e2e/rwd",
  testMatch: "**/*.spec.js",
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  expect: { timeout: 5000 },
  forbidOnly: true,
  retries: 0,
  updateSnapshots: "none",
  outputDir: path.join(runDir, "results"),
  snapshotPathTemplate: "{testDir}/baselines/{projectName}/{arg}{ext}",
  grep,
  metadata: { rwdScope: scope, rwdEngine: engine, rwdRunDir: runDir, gitHead, fullRwdAcceptance: false },
  reporter: [
    ["dot"],
    ["./e2e/rwd/report.js", { outputDir: runDir, scope, requiredIds: selectedCases.map(item => item.id) }],
    ["json", { outputFile: path.join(runDir, "playwright.json") }],
    ["html", { outputFolder: path.join(runDir, "report"), open: "never" }]
  ],
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "zh-TW",
    timezoneId: "Asia/Taipei",
    colorScheme: "dark",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: [{ name: engine, use: { browserName: engine } }]
});
