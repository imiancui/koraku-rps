import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { requiredCases } from "../e2e/rwd/coverage.js";

const scope = process.argv[2] || "stage-a";
const engine = process.env.KORAKU_RWD_ENGINE || "chromium";
if (!["chromium", "firefox", "webkit"].includes(engine)) throw new Error("Unsupported RWD browser engine: " + engine);
const args = process.argv.slice(3);
if (args.some(arg => arg !== "--list")) throw new Error("Only --list is accepted; use a named scope, not an untracked filter.");
const expected = requiredCases(scope);
const require = createRequire(import.meta.url);
const child = spawn(process.execPath, [
  require.resolve("@playwright/test/cli"), "test", "--config=playwright.rwd.config.js", ...args
], {
  cwd: fileURLToPath(new URL("../", import.meta.url)),
  env: { ...process.env, KORAKU_RWD_SCOPE: scope, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" },
  stdio: "inherit",
  windowsHide: true
});
console.log("Selected RWD scope " + scope + " on " + engine + ": " + expected.length + " required cases. Not Full RWD acceptance.");
child.on("error", error => { console.error(error); process.exitCode = 1; });
child.on("exit", code => { process.exitCode = code ?? 1; });
process.on("SIGINT", () => child.kill());
process.on("SIGTERM", () => child.kill());
