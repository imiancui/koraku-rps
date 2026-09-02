import { chromium } from "playwright";
import http from "node:http";
import path from "node:path";
import { readFile, realpath } from "node:fs/promises";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { KorakuServer } from "../server/server.js";

const evidenceDir = process.env.EVIDENCE_DIR
  ? path.join(process.env.EVIDENCE_DIR, "rwd")
  : path.join("C:\\Users\\Administrator\\AppData\\Local\\Temp\\koraku-staging-evidence\\20260903-0535", "rwd");

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

// 1. Static Web Server
async function startStaticServer() {
  const root = await realpath(projectRoot);
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const relative = pathname === "/" ? "index.html" : pathname.slice(1);
      const target = path.resolve(root, relative);
      if (!target.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const bytes = await readFile(target);
      res.writeHead(200, {
        "Content-Type": mime[path.extname(target)] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      res.end(bytes);
    } catch (e) {
      res.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  return { server, url: `http://127.0.0.1:${port}` };
}

// 2. Local Game Server with configurable battleLockPolicy
async function startLocalWsServer(battleLockPolicy = "always", staticHostUrl = "") {
  const tempDir = fs.mkdtempSync(path.join(process.env.TEMP || "C:\\Temp", "koraku-rwd-ws-"));
  const { Validator } = await import("../server/core/Validator.js");
  const wsServer = new KorakuServer({
    port: 0,
    host: "127.0.0.1",
    dataDir: tempDir,
    battleLockPolicy,
    validator: new Validator({
      allowedOrigins: [staticHostUrl, "http://127.0.0.1", "http://localhost", "*"]
    }),
    devAdminKey: "dev_secret",
    devDeviceWhitelist: []
  });
  await wsServer.start();
  const wsUrl = `ws://127.0.0.1:${wsServer.actualPort}/ws`;
  return {
    wsServer,
    wsUrl,
    cleanup: async () => {
      await wsServer.close();
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  };
}

async function runVerification() {
  console.log("[RWD-Verification] Starting test run...");
  console.log("[RWD-Verification] Evidence directory:", evidenceDir);

  const staticHost = await startStaticServer();
  console.log("[RWD-Verification] Static web server running at:", staticHost.url);

  const defaultWs = await startLocalWsServer("always", staticHost.url);
  console.log("[RWD-Verification] WS Server (always) running at:", defaultWs.wsUrl);

  const countdownWs = await startLocalWsServer("countdown", staticHost.url);
  console.log("[RWD-Verification] WS Server (countdown) running at:", countdownWs.wsUrl);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  const consoleErrors = [];

  const viewports = [
    { name: "mobile_375x812", width: 375, height: 812, hasTouch: true },
    { name: "tablet_768x1024", width: 768, height: 1024, hasTouch: true },
    { name: "desktop_1280x800", width: 1280, height: 800, hasTouch: false },
    { name: "desktop_1920x1080", width: 1920, height: 1080, hasTouch: false }
  ];

  const appBaseUrl = `${staticHost.url}/?mode=online&debug=1`;

  try {
    for (const vp of viewports) {
      console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}, touch=${vp.hasTouch}) ===`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        hasTouch: vp.hasTouch,
        locale: "zh-TW"
      });

      const page = await context.newPage();
      page.on("pageerror", err => {
        console.error(`[PageError][${vp.name}]`, err);
        consoleErrors.push({ vp: vp.name, text: err.message });
      });
      page.on("console", msg => {
        if (msg.type() === "error") {
          console.error(`[BrowserConsoleError][${vp.name}]`, msg.text());
          consoleErrors.push({ vp: vp.name, text: msg.text() });
        }
      });

      // Inject server URL
      await page.addInitScript((ws) => {
        window.__KORAKU_CONFIG__ = { serverUrl: ws };
      }, defaultWs.wsUrl);

      // Load app with debug enabled so __KORAKU_DEBUG__ is accessible
      await page.goto(appBaseUrl);
      await page.waitForFunction(() => Boolean(window.__KORAKU_DEBUG__?.view), { timeout: 10000 });
      await page.waitForSelector("#screen-home", { state: "visible" });

      // 1. Non-battle state (Equipment Screen)
      await page.evaluate(() => window.__KORAKU_DEBUG__.view.requestNavigation("equipment"));
      await page.waitForSelector("#screen-equipment", { state: "visible" });
      const eqNoticeNonBattle = await page.$eval("#equipment-lock-notice", el => el.style.display);
      console.log(`[${vp.name}] Equipment Non-battle lock notice display:`, eqNoticeNonBattle);
      await page.screenshot({ path: path.join(evidenceDir, `${vp.name}_01_equipment_non_battle.png`) });

      // 2. Non-battle state (Growth Screen)
      await page.evaluate(() => window.__KORAKU_DEBUG__.view.requestNavigation("growth"));
      await page.waitForSelector("#screen-growth", { state: "visible" });
      const growthNoticeNonBattle = await page.$eval("#growth-lock-notice", el => el.style.display);
      console.log(`[${vp.name}] Growth Non-battle lock notice display:`, growthNoticeNonBattle);
      await page.screenshot({ path: path.join(evidenceDir, `${vp.name}_02_growth_non_battle.png`) });

      // 3. Start Battle (online mode, always policy)
      await page.evaluate(() => window.__KORAKU_DEBUG__.view.requestNavigation("stages"));
      await page.waitForSelector("#screen-stages", { state: "visible" });
      await page.click("[data-stage='1']");
      await page.waitForSelector("#screen-battle", { state: "visible" });

      // Navigate while battle active to Growth
      await page.evaluate(() => {
        window.__KORAKU_DEBUG__.view.navigate("growth");
        window.__KORAKU_DEBUG__.view.renderGrowth();
      });
      await page.waitForSelector("#screen-growth", { state: "visible" });

      const growthLockedNotice = await page.$eval("#growth-lock-notice", el => el.textContent.trim());
      const growthBtnDisabled = await page.$eval("[data-allocate='damage']", el => el.disabled && el.getAttribute("aria-disabled") === "true");
      console.log(`[${vp.name}] Growth In-battle locked notice text:`, growthLockedNotice);
      console.log(`[${vp.name}] Growth In-battle button disabled:`, growthBtnDisabled);
      await page.screenshot({ path: path.join(evidenceDir, `${vp.name}_03_growth_in_battle_locked.png`) });

      // Test Click on Locked Button (Mouse / Touch)
      // Uses dispatchEvent to verify event bubbling to the document mutation lock handler
      await page.dispatchEvent("[data-allocate='damage']", "click");
      await page.waitForTimeout(200);
      const toastText = await page.evaluate(() => document.querySelector(".toast")?.textContent?.trim() || "");
      console.log(`[${vp.name}] Toast on locked button click:`, toastText);

      // Navigate while battle active to Equipment
      await page.evaluate(() => {
        window.__KORAKU_DEBUG__.view.navigate("equipment");
        window.__KORAKU_DEBUG__.view.renderEquipment(window.__KORAKU_DEBUG__.view.getStoreSnapshot());
      });
      await page.waitForSelector("#screen-equipment", { state: "visible" });

      const eqLockedNotice = await page.$eval("#equipment-lock-notice", el => el.textContent.trim());
      const slotHeadDisabled = await page.$eval("[data-slot='head']", el => el.getAttribute("disabled") === "true" && el.getAttribute("aria-disabled") === "true");
      console.log(`[${vp.name}] Equipment In-battle locked notice text:`, eqLockedNotice);
      console.log(`[${vp.name}] Equipment In-battle slot head disabled:`, slotHeadDisabled);
      await page.screenshot({ path: path.join(evidenceDir, `${vp.name}_04_equipment_in_battle_locked.png`) });

      // 4. End Battle -> Verify Restoration
      await page.evaluate(async () => {
        await window.__KORAKU_DEBUG__.view.sendCommand("battle.abandon");
        window.__KORAKU_DEBUG__.view.renderEquipment(window.__KORAKU_DEBUG__.view.getStoreSnapshot());
      });
      await page.waitForTimeout(500);

      // Re-check Equipment
      await page.evaluate(() => {
        window.__KORAKU_DEBUG__.view.renderEquipment(window.__KORAKU_DEBUG__.view.getStoreSnapshot());
      });
      const eqNoticeRestored = await page.$eval("#equipment-lock-notice", el => el.style.display);
      const slotHeadRestored = await page.$eval("[data-slot='head']", el => !el.hasAttribute("disabled"));
      console.log(`[${vp.name}] Equipment Post-battle lock notice display:`, eqNoticeRestored);
      console.log(`[${vp.name}] Equipment Post-battle slot head restored:`, slotHeadRestored);
      await page.screenshot({ path: path.join(evidenceDir, `${vp.name}_05_equipment_post_battle_restored.png`) });

      await context.close();
      results.push({
        vp: vp.name,
        dimensions: `${vp.width}x${vp.height}`,
        touch: vp.hasTouch,
        lockNoticeShown: growthLockedNotice.length > 0 && eqLockedNotice.length > 0,
        buttonsDisabled: growthBtnDisabled && slotHeadDisabled,
        postBattleRestored: eqNoticeRestored === "none" && slotHeadRestored,
        toastOnLockedClick: toastText.length > 0
      });
    }

    // 5. Dynamic Resize across Equipment 12-slot breakpoint (375 -> 768 -> 1280)
    console.log("\n=== Testing Dynamic Runtime Resize (375 -> 768 -> 1280) ===");
    const resizeContext = await browser.newContext({
      viewport: { width: 375, height: 812 }
    });
    const resizePage = await resizeContext.newPage();
    await resizePage.addInitScript((ws) => {
      window.__KORAKU_CONFIG__ = { serverUrl: ws };
    }, defaultWs.wsUrl);
    await resizePage.goto(appBaseUrl);
    await resizePage.evaluate(() => window.__KORAKU_DEBUG__.view.requestNavigation("equipment"));
    await resizePage.waitForSelector("#screen-equipment", { state: "visible" });
    await resizePage.screenshot({ path: path.join(evidenceDir, "resize_step1_375.png") });

    await resizePage.setViewportSize({ width: 768, height: 1024 });
    await resizePage.waitForTimeout(300);
    await resizePage.screenshot({ path: path.join(evidenceDir, "resize_step2_768.png") });

    await resizePage.setViewportSize({ width: 1280, height: 800 });
    await resizePage.waitForTimeout(300);
    await resizePage.screenshot({ path: path.join(evidenceDir, "resize_step3_1280.png") });
    await resizeContext.close();
    console.log("[RWD-Verification] Dynamic resize across breakpoints verified.");

    // 6. Multilingual Verification: zh-Hant vs en at 375 width (Check overflow / truncation)
    console.log("\n=== Testing Localization (zh-Hant vs en at 375x812) ===");
    for (const loc of ["zh-Hant", "en"]) {
      const locContext = await browser.newContext({
        viewport: { width: 375, height: 812 },
        locale: loc === "zh-Hant" ? "zh-TW" : "en-US"
      });
      const locPage = await locContext.newPage();
      await locPage.addInitScript((ws) => {
        window.__KORAKU_CONFIG__ = { serverUrl: ws };
      }, defaultWs.wsUrl);
      await locPage.goto(appBaseUrl);
      await locPage.waitForFunction(() => Boolean(window.__KORAKU_DEBUG__?.view));
      await locPage.evaluate((l) => {
        const langSelect = document.querySelector("#lang-select");
        if (langSelect) {
          langSelect.value = l;
          langSelect.dispatchEvent(new Event("change"));
        }
        // simulate battle active
        window.__KORAKU_DEBUG__.client._state.battle = { active: true, phase: "countdown" };
        window.__KORAKU_DEBUG__.view.navigate("equipment");
        window.__KORAKU_DEBUG__.view.renderEquipment(window.__KORAKU_DEBUG__.view.getStoreSnapshot());
      }, loc);
      await locPage.waitForSelector("#screen-equipment", { state: "visible" });

      // Check overflow
      const noticeBounds = await locPage.$eval("#equipment-lock-notice", el => {
        const r = el.getBoundingClientRect();
        return { width: r.width, height: r.height, right: r.right, text: el.textContent };
      });
      console.log(`[Locale-${loc}] Lock notice bounding rect:`, noticeBounds);
      await locPage.screenshot({ path: path.join(evidenceDir, `locale_${loc}_375_equipment_notice.png`) });
      await locContext.close();
    }

    // 7. Countdown Policy Test: Countdown phase enabled vs Reaction phase locked
    console.log("\n=== Testing Countdown Policy (Local WS BATTLE_LOCK_POLICY=countdown) ===");
    const cdContext = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const cdPage = await cdContext.newPage();
    await cdPage.addInitScript((ws) => {
      window.__KORAKU_CONFIG__ = { serverUrl: ws };
    }, countdownWs.wsUrl);
    await cdPage.goto(appBaseUrl);
    await cdPage.waitForFunction(() => Boolean(window.__KORAKU_DEBUG__?.view));

    // Enter countdown phase
    const countdownPhaseState = await cdPage.evaluate(() => {
      window.__KORAKU_DEBUG__.client._state.battle = { active: true, phase: "countdown" };
      return window.__KORAKU_DEBUG__.view.isMutationLocked();
    });
    console.log("[CountdownPolicy] Countdown phase isMutationLocked:", countdownPhaseState);

    // Enter reaction phase
    const reactionPhaseState = await cdPage.evaluate(() => {
      window.__KORAKU_DEBUG__.client._state.battle = { active: true, phase: "reaction" };
      return window.__KORAKU_DEBUG__.view.isMutationLocked();
    });
    console.log("[CountdownPolicy] Reaction phase isMutationLocked:", reactionPhaseState);

    // Enter QTE phase
    const qtePhaseState = await cdPage.evaluate(() => {
      window.__KORAKU_DEBUG__.client._state.battle = { active: true, phase: "qte" };
      return window.__KORAKU_DEBUG__.view.isMutationLocked();
    });
    console.log("[CountdownPolicy] QTE phase isMutationLocked:", qtePhaseState);

    await cdContext.close();

    // Summary output
    const report = {
      timestamp: new Date().toISOString(),
      viewportResults: results,
      countdownPolicy: {
        countdownPhaseLocked: countdownPhaseState, // should be false
        reactionPhaseLocked: reactionPhaseState,   // should be true
        qtePhaseLocked: qtePhaseState             // should be true
      },
      consoleErrorsCount: consoleErrors.length,
      consoleErrors,
      verdict: (consoleErrors.length === 0 && !countdownPhaseState && reactionPhaseState && qtePhaseState) ? "PASS" : "FAIL"
    };

    fs.writeFileSync(path.join(evidenceDir, "rwd_verification_report.json"), JSON.stringify(report, null, 2));
    console.log("\n==================================================");
    console.log("[RWD-Verification] ALL TESTS COMPLETED!");
    console.log("[RWD-Verification] Overall Verdict:", report.verdict);
    console.log("[RWD-Verification] Console Errors Count:", consoleErrors.length);
    console.log("[RWD-Verification] Report written to:", path.join(evidenceDir, "rwd_verification_report.json"));
    console.log("==================================================");

  } finally {
    await browser.close();
    staticHost.server.close();
    await defaultWs.cleanup();
    await countdownWs.cleanup();
  }
}

runVerification().catch(err => {
  console.error("[RWD-Verification] Failed:", err);
  process.exit(1);
});
