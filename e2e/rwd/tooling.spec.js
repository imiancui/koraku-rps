import { test, expect, attachJson, monitorPage } from "./fixtures.js";
import { openApp, assertAppState } from "./application.js";
import { auditLayout } from "./layout-audit.js";
import { checkCoverage, fullRequiredCases, fullRuns, manifest, requiredCases } from "./coverage.js";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const require = createRequire(import.meta.url);
const cli = require.resolve("@playwright/test/cli");
const apiUrl = pathToFileURL(path.join(path.dirname(require.resolve("@playwright/test/package.json")), "index.mjs")).href;
const configUrl = new URL("../../playwright.rwd.config.js", import.meta.url).href;
const reporterPath = fileURLToPath(new URL("./report.js", import.meta.url));
const idA = "RWD-G010.negative.a";
const idB = "RWD-G010.negative.b";
const visualToleranceCases = [
  {
    id: "RWD-G010.candidate.VP-PHONE-M.stages-end", viewport: [390, 844], input: "touch", state: "stages-end",
    selector: ".stage-card", snapshot: "RWD-G010-candidate-VP-PHONE-M-stages-end.png", maxDiffPixels: 1700,
    baseline: fileURLToPath(new URL("./baselines/chromium/RWD-G010-candidate-VP-PHONE-M-stages-end.png", import.meta.url))
  },
  {
    id: "RWD-G010.candidate.VP-DESKTOP-M.shop-end", viewport: [1440, 900], input: "mouse", state: "shop-end",
    selector: ".shop-equip-card", snapshot: "RWD-G010-candidate-VP-DESKTOP-M-shop-end.png", maxDiffPixels: 3000,
    baseline: fileURLToPath(new URL("./baselines/chromium/RWD-G010-candidate-VP-DESKTOP-M-shop-end.png", import.meta.url))
  }
];

async function childFixture(testInfo, body, { coverage = true, requiredIds = [idA, idB] } = {}) {
  await mkdir(testInfo.outputPath(), { recursive: true });
  const root = await mkdtemp(path.join(testInfo.outputPath(), "guard-"));
  const config = path.join(root, "guard.config.mjs");
  const reporters = coverage
    ? [[reporterPath, { outputDir: root, scope: "negative-calibration", requiredIds }], ["dot"]]
    : [["dot"]];
  await writeFile(path.join(root, "guard.spec.mjs"), "import { test, expect } from " + JSON.stringify(apiUrl) + ";\n" + body);
  // Inherit the actual project safety flags: changing them must break this negative control.
  await writeFile(config,
    "import main from " + JSON.stringify(configUrl) + ";\n" +
    "export default { ...main, testDir: " + JSON.stringify(root) + ", testMatch: '*.spec.mjs', grep: undefined," +
    " outputDir: " + JSON.stringify(path.join(root, "child-results")) + "," +
    " snapshotPathTemplate: " + JSON.stringify(path.join(root, "baselines", "{arg}{ext}")) + "," +
    " reporter: " + JSON.stringify(reporters) + " };\n"
  );
  return { root, config };
}

function runChild(config, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli, "test", "--config", config, ...args], {
      windowsHide: true, timeout: 20000, stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" }
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code, signal) => resolve({ code, signal, stdout, stderr }));
  });
}

function visualToleranceBody(injectFault) {
  const fixturesUrl = new URL("./fixtures.js", import.meta.url).href;
  const helpersUrl = new URL("./stage-b-helpers.js", import.meta.url).href;
  const cases = visualToleranceCases.map(({ baseline, ...item }) => item);
  return "import { startStaticServer } from " + JSON.stringify(fixturesUrl) + ";\n" +
    "import { prepareStageB, positionCandidateEnd } from " + JSON.stringify(helpersUrl) + ";\n" +
    "const items = " + JSON.stringify(cases) + ";\n" +
    "for (const item of items) { test.describe(item.id, () => {\n" +
    "  test.use({ viewport: { width: item.viewport[0], height: item.viewport[1] }, hasTouch: item.input === 'touch' });\n" +
    "  test('[' + item.id + ']', async ({ page }) => { const server = await startStaticServer(); try {\n" +
    "    await prepareStageB(page, server.url, item); await positionCandidateEnd(page, item);\n" +
    (injectFault
      ? "    const target = page.locator(item.selector).first(); const before = await target.boundingBox(); expect(before).not.toBeNull(); await page.addStyleTag({ content: item.selector + '{ position:relative !important; left:12px !important; }' }); const after = await target.boundingBox(); expect(after.x - before.x).toBeGreaterThan(10);\n"
      : "") +
    "    expect(await page.screenshot()).toMatchSnapshot(item.snapshot, { maxDiffPixels: item.maxDiffPixels });\n" +
    "  } finally { await server.close(); } });\n" +
    "}); }\n";
}

async function seedVisualToleranceBaselines(root) {
  const baselineDir = path.join(root, "baselines");
  await mkdir(baselineDir, { recursive: true });
  for (const item of visualToleranceCases) {
    await writeFile(path.join(baselineDir, item.snapshot), await readFile(item.baseline));
  }
}

test("[RWD-G010.tooling.error-collection] @tooling", async ({ browser, appUrl }, testInfo) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const monitor = await monitorPage(page);
  try {
    await openApp(page, appUrl, { debug: false, freeze: false });
    monitor.assertNoErrors();
    const before = monitor.events.length;
    await page.route("**/rwd-aborted.png", route => route.abort("failed"));
    await page.evaluate(() => {
      console.error("RWD-CALIBRATION-console");
      setTimeout(() => { throw new Error("RWD-CALIBRATION-pageerror"); }, 0);
      Promise.reject(new Error("RWD-CALIBRATION-rejection"));
      const img = document.createElement("img");
      img.src = "/rwd-aborted.png";
      document.body.append(img);
    });
    await page.evaluate(() => fetch("/rwd-missing-resource").then(response => response.status));
    await expect.poll(() => monitor.events.slice(before).some(event => event.kind === "unhandledrejection")).toBe(true);
    await expect.poll(() => monitor.events.slice(before).some(event => event.kind === "requestfailed")).toBe(true);
    const injected = monitor.events.slice(before);
    expect(injected.some(event => event.kind === "console" && event.level === "error" && event.message === "RWD-CALIBRATION-console")).toBe(true);
    expect(injected.some(event => event.kind === "pageerror" && event.message.includes("RWD-CALIBRATION-pageerror"))).toBe(true);
    expect(injected.some(event => event.kind === "response" && event.status === 404 && event.url.endsWith("/rwd-missing-resource"))).toBe(true);
    expect(injected.some(event => event.kind === "requestfailed" && event.url.endsWith("/rwd-aborted.png"))).toBe(true);
    expect(() => monitor.assertNoErrors()).toThrow("Unexpected page/console/resource errors");
    await attachJson(testInfo, "error-collector-negative-control", { beforeCount: before, events: monitor.events, allInjectedErrorsBlocked: true });
  } finally {
    await context.close();
  }
});

test("[RWD-G010.tooling.isolated-storage] @tooling", async ({ browser, appUrl }, testInfo) => {
  const first = await browser.newContext();
  const second = await browser.newContext();
  try {
    const a = await first.newPage();
    const b = await second.newPage();
    const monitorA = await monitorPage(a);
    const monitorB = await monitorPage(b);
    await a.goto(appUrl);
    await a.evaluate(() => localStorage.setItem("rwd-isolation-sentinel", "task-only"));
    await b.goto(appUrl);
    expect(await b.evaluate(() => localStorage.getItem("rwd-isolation-sentinel"))).toBeNull();
    expect(await a.evaluate(() => localStorage.getItem("rwd-isolation-sentinel"))).toBe("task-only");
    await attachJson(testInfo, "console-and-resource-events", [...monitorA.events, ...monitorB.events]);
    monitorA.assertNoErrors();
    monitorB.assertNoErrors();
    await attachJson(testInfo, "context-isolation", { sameOrigin: new URL(a.url()).origin === new URL(b.url()).origin, isolated: true });
  } finally {
    await first.close();
    await second.close();
  }
});

test("[RWD-G010.tooling.state-negative] @tooling", async ({ page, appUrl }, testInfo) => {
  await openApp(page, appUrl);
  await assertAppState(page, { screen: "home" });
  await expect(assertAppState(page, { screen: "battle", battle: { phase: "qte" } })).rejects.toThrow("Actual application state");
  await expect(assertAppState(page, {})).rejects.toThrow("Empty application state contract");
  await expect(page.evaluate(auditLayout, {})).rejects.toThrow("Empty layout contract");
  await attachJson(testInfo, "state-negative-control", { wrongStateRejected: true, emptyStateRejected: true, emptyAuditRejected: true });
});

test("[RWD-G010.tooling.missing-coverage] @tooling", async ({}, testInfo) => {
  expect(new Set(manifest.stageA.required.map(item => item.id)).size).toBe(77);
  expect(requiredCases("calibrate")).toHaveLength(53);
  expect(requiredCases("calibration-fixtures")).toHaveLength(45);
  expect(requiredCases("calibration-probes")).toHaveLength(8);
  expect(requiredCases("stage-b-protection")).toHaveLength(79);
  expect(fullRuns()).toHaveLength(29);
  expect(fullRequiredCases()).toHaveLength(2286);
  expect(new Set(fullRequiredCases().map(item => item.id)).size).toBe(2286);
  expect(checkCoverage([idA, idB], [{ id: idA, status: "passed", retry: 0 }])).toEqual([{ code: "missing-required-case", id: idB }]);
  const fixture = await childFixture(testInfo, "test('[" + idA + "]', () => { expect(2 + 2).toBe(4); });\n");
  const run = await runChild(fixture.config);
  await attachJson(testInfo, "missing-case-child", run);
  expect(run.signal).toBeNull();
  expect(run.code).toBe(1);
  const coverage = JSON.parse(await readFile(path.join(fixture.root, "coverage.json"), "utf8"));
  expect(coverage.issues).toContainEqual({ code: "missing-required-case", id: idB });
});

test("[RWD-G010.tooling.empty-coverage] @tooling", async ({}, testInfo) => {
  expect(checkCoverage([idA], [])).toContainEqual({ code: "empty-selection" });
  const fixture = await childFixture(testInfo, "test('[" + idA + "]', () => { expect(1).toBe(1); });\n", { requiredIds: [idA] });
  const run = await runChild(fixture.config, ["--grep", "^not-a-case$", "--pass-with-no-tests"]);
  await attachJson(testInfo, "empty-selection-child", run);
  expect(run.signal).toBeNull();
  expect(run.code).toBe(1);
  const coverage = JSON.parse(await readFile(path.join(fixture.root, "coverage.json"), "utf8"));
  expect(coverage.issues).toContainEqual({ code: "empty-selection" });
});

test("[RWD-G010.tooling.forbid-only] @tooling", async ({}, testInfo) => {
  // A focused test exists only in this generated negative fixture, never in the real suite.
  const fixture = await childFixture(testInfo,
    "const focused = 'only'; test[focused]('[" + idA + "]', () => { expect(1).toBe(1); });\n",
    { coverage: false }
  );
  const run = await runChild(fixture.config);
  await attachJson(testInfo, "focused-test-child", run);
  expect(run.signal).toBeNull();
  expect(run.code).toBe(1);
  expect(run.stdout + run.stderr).toContain("forbidOnly");
});

test("[RWD-G010.tooling.missing-baseline-twice] @tooling", async ({}, testInfo) => {
  test.slow();
  const fixture = await childFixture(testInfo,
    "test('[" + idA + "]', async ({ page }) => { await page.setContent('<!doctype html><button>Baseline control</button>'); await expect(page).toHaveScreenshot('must-remain-missing.png'); });\n",
    { coverage: false }
  );
  const baselineDir = path.join(fixture.root, "baselines");
  await mkdir(baselineDir);
  await writeFile(path.join(baselineDir, "approved-sentinel.txt"), "Existing approved content must remain unchanged.");
  const snapshot = async () => Object.fromEntries(await Promise.all((await readdir(baselineDir)).sort().map(async name => [
    name, createHash("sha256").update(await readFile(path.join(baselineDir, name))).digest("hex")
  ])));
  const before = await snapshot();
  const runs = [];
  for (let index = 0; index < 2; index++) {
    const run = await runChild(fixture.config);
    runs.push(run);
    expect(run.signal).toBeNull();
    expect(run.code).toBe(1);
    expect(run.stdout + run.stderr).toContain("must-remain-missing");
    expect(await snapshot()).toEqual(before);
  }
  const control = await childFixture(testInfo, visualToleranceBody(false), { coverage: false });
  await seedVisualToleranceBaselines(control.root);
  const controlRun = await runChild(control.config);
  expect(controlRun.signal).toBeNull();
  expect(controlRun.code).toBe(0);

  const fault = await childFixture(testInfo, visualToleranceBody(true), { coverage: false });
  await seedVisualToleranceBaselines(fault.root);
  const faultRun = await runChild(fault.config);
  expect(faultRun.signal).toBeNull();
  expect(faultRun.code).toBe(1);
  for (const item of visualToleranceCases) expect(faultRun.stdout + faultRun.stderr).toContain(item.id);
  expect(faultRun.stdout + faultRun.stderr).toContain("pixels");

  await attachJson(testInfo, "missing-baseline-negative-control", { runs, before, after: await snapshot(), baselineUnchanged: true });
  await attachJson(testInfo, "visual-tolerance-negative-control", {
    cases: visualToleranceCases.map(({ baseline, ...item }) => item),
    controlRun,
    faultRun,
    injection: "Move every visible stage/shop card 12 CSS px to the right; both bounded per-case tolerances must still fail."
  });
});
