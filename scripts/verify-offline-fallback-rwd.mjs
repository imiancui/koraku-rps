import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs", "ui", "evidence", "offline-fallback-20260903");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

async function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const reqUrl = new URL(req.url || "/", "http://localhost");
      let pathname = decodeURIComponent(reqUrl.pathname);
      if (pathname === "/") pathname = "/index.html";
      const filePath = path.resolve(root, "." + pathname);

      if (!filePath.startsWith(root + path.sep) && filePath !== root) {
        res.writeHead(403).end("Forbidden");
        return;
      }

      const content = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-cache"
      });
      res.end(content);
    } catch {
      res.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const server = await startServer();
  console.log(`[RWD-Runner] Static server listening at ${server.url}`);

  const browser = await chromium.launch({ headless: true });
  const report = {
    testDate: new Date().toISOString(),
    feature: "Offline Fallback & Mode Switching Buttons RWD",
    testedComponents: [
      "#connection-banner-switch-offline",
      "#btn-switch-to-online",
      "#save-mode-switch-section"
    ],
    invariants: ["RWD-G001", "RWD-G003", "RWD-G006", "RWD-G008"],
    viewports: [
      { name: "mobile", width: 375, height: 812, hasTouch: true },
      { name: "tablet", width: 768, height: 1024, hasTouch: true },
      { name: "desktop-compact", width: 1280, height: 800, hasTouch: false },
      { name: "desktop-fullhd", width: 1920, height: 1080, hasTouch: false }
    ],
    locales: ["zh-Hant", "en"],
    results: [],
    consoleErrors: []
  };

  const consoleErrors = [];

  try {
    for (const locale of report.locales) {
      for (const vp of report.viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          hasTouch: vp.hasTouch,
          locale: locale === "zh-Hant" ? "zh-TW" : "en-US"
        });

        const page = await context.newPage();

        page.on("console", (msg) => {
          if (msg.type() === "error") {
            const text = msg.text();
            if (!text.includes("net::ERR") && !text.includes("favicon.ico") && !text.includes("404")) {
              consoleErrors.push({ locale, viewport: vp.name, error: text });
            }
          }
        });

        page.on("pageerror", (err) => {
          consoleErrors.push({ locale, viewport: vp.name, error: err.message });
        });

        await page.goto(`${server.url}/?lang=${locale}&mode=offline`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(400);

        // Switch locale in I18n explicitly if helper exists
        await page.evaluate((loc) => {
          if (window.I18n?.setLocale) {
            window.I18n.setLocale(loc);
          }
          window.__KORAKU_CONFIG__ = { serverUrl: "wss://20250606-120834.tailfe8b74.ts.net:8443/ws" };
        }, locale);

        // 1. Test Banner in reconnecting state
        const bannerReconnecting = await page.evaluate(() => {
          const view = window.__KORAKU_DEBUG__?.view;
          if (view) {
            view.renderConnectionState("reconnecting");
          }
          const banner = document.getElementById("connection-status-banner");
          const btn = document.getElementById("connection-banner-switch-offline");
          if (banner) {
            banner.hidden = false;
            banner.removeAttribute("hidden");
          }
          if (btn) {
            btn.hidden = false;
            btn.removeAttribute("hidden");
          }
          const rect = btn.getBoundingClientRect();
          return {
            visible: rect.width > 0 && rect.height > 0,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            text: btn.textContent.trim(),
            minHeightOk: Math.round(rect.height) >= 40
          };
        });

        const shot1 = `banner-reconnecting-${locale}-${vp.name}-${vp.width}x${vp.height}.png`;
        await page.screenshot({ path: path.join(outDir, shot1), fullPage: false });

        report.results.push({
          caseId: `fallback-banner.reconnecting.${locale}.${vp.name}`,
          component: "#connection-banner-switch-offline",
          state: "reconnecting",
          locale,
          viewport: `${vp.width}x${vp.height}`,
          measurement: bannerReconnecting,
          screenshot: shot1,
          pass: bannerReconnecting.visible && bannerReconnecting.minHeightOk
        });

        // 2. Test Banner in disconnected state
        const bannerDisconnected = await page.evaluate(() => {
          const view = window.__KORAKU_DEBUG__?.view;
          if (view) {
            view.renderConnectionState("disconnected");
          }
          const banner = document.getElementById("connection-status-banner");
          const btn = document.getElementById("connection-banner-switch-offline");
          if (banner) {
            banner.hidden = false;
            banner.removeAttribute("hidden");
          }
          if (btn) {
            btn.hidden = false;
            btn.removeAttribute("hidden");
          }
          const rect = btn.getBoundingClientRect();
          return {
            visible: rect.width > 0 && rect.height > 0,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            text: btn.textContent.trim(),
            minHeightOk: Math.round(rect.height) >= 40
          };
        });

        const shot2 = `banner-disconnected-${locale}-${vp.name}-${vp.width}x${vp.height}.png`;
        await page.screenshot({ path: path.join(outDir, shot2), fullPage: false });

        report.results.push({
          caseId: `fallback-banner.disconnected.${locale}.${vp.name}`,
          component: "#connection-banner-switch-offline",
          state: "disconnected",
          locale,
          viewport: `${vp.width}x${vp.height}`,
          measurement: bannerDisconnected,
          screenshot: shot2,
          pass: bannerDisconnected.visible && bannerDisconnected.minHeightOk
        });

        // 3. Test Save Modal Open State (Mode Switch Section)
        const saveModalData = await page.evaluate(() => {
          const banner = document.getElementById("connection-status-banner");
          if (banner) banner.hidden = true;

          const modal = document.getElementById("save-record-modal");
          const section = document.getElementById("save-mode-switch-section");
          const btn = document.getElementById("btn-switch-to-online");

          if (modal) {
            modal.hidden = false;
            modal.removeAttribute("hidden");
          }
          if (section) {
            section.hidden = false;
            section.removeAttribute("hidden");
            section.scrollIntoView({ block: "center", inline: "nearest" });
          }

          const btnRect = btn.getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();

          return {
            sectionVisible: !section.hidden && sectionRect.width > 0 && sectionRect.height > 0,
            btnVisible: !btn.hidden && btnRect.width > 0 && btnRect.height > 0,
            btnRect: { x: btnRect.x, y: btnRect.y, width: btnRect.width, height: btnRect.height },
            btnMinHeightOk: Math.round(btnRect.height) >= 40,
            btnText: btn.textContent.trim()
          };
        });

        const shot3 = `save-modal-mode-switch-${locale}-${vp.name}-${vp.width}x${vp.height}.png`;
        await page.screenshot({ path: path.join(outDir, shot3), fullPage: false });

        report.results.push({
          caseId: `save-modal.mode-switch.${locale}.${vp.name}`,
          component: "#btn-switch-to-online",
          state: "save-modal-open",
          locale,
          viewport: `${vp.width}x${vp.height}`,
          measurement: saveModalData,
          screenshot: shot3,
          pass: saveModalData.sectionVisible && saveModalData.btnVisible && saveModalData.btnMinHeightOk
        });

        await context.close();
      }
    }

    // 4. Dynamic Resize Verification (375 -> 768 -> 1280)
    console.log("[RWD-Runner] Running Dynamic Resize Verification: 375 -> 768 -> 1280...");
    const resizeContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
      locale: "zh-TW"
    });
    const resizePage = await resizeContext.newPage();
    await resizePage.goto(`${server.url}/?lang=zh-Hant&mode=offline`, { waitUntil: "domcontentloaded" });
    await resizePage.waitForTimeout(400);

    const resizeSteps = [
      { name: "mobile-375", width: 375, height: 812 },
      { name: "tablet-768", width: 768, height: 1024 },
      { name: "desktop-1280", width: 1280, height: 800 }
    ];

    for (const step of resizeSteps) {
      await resizePage.setViewportSize({ width: step.width, height: step.height });
      await resizePage.waitForTimeout(300);

      // A. Measure banner button in dynamic resize
      const bannerMetrics = await resizePage.evaluate(() => {
        const modal = document.getElementById("save-record-modal");
        if (modal) modal.hidden = true;

        const banner = document.getElementById("connection-status-banner");
        const bannerBtn = document.getElementById("connection-banner-switch-offline");
        if (banner) {
          banner.hidden = false;
          banner.removeAttribute("hidden");
        }
        if (bannerBtn) {
          bannerBtn.hidden = false;
          bannerBtn.removeAttribute("hidden");
        }
        const bRect = bannerBtn.getBoundingClientRect();
        return {
          width: bRect.width,
          height: bRect.height,
          minHeightOk: Math.round(bRect.height) >= 40
        };
      });

      // B. Measure save modal button in dynamic resize
      const saveMetrics = await resizePage.evaluate(() => {
        const banner = document.getElementById("connection-status-banner");
        if (banner) banner.hidden = true;

        const modal = document.getElementById("save-record-modal");
        const section = document.getElementById("save-mode-switch-section");
        const saveBtn = document.getElementById("btn-switch-to-online");
        if (modal) {
          modal.hidden = false;
          modal.removeAttribute("hidden");
        }
        if (section) {
          section.hidden = false;
          section.removeAttribute("hidden");
          section.scrollIntoView({ block: "center", inline: "nearest" });
        }
        const sRect = saveBtn.getBoundingClientRect();
        return {
          width: sRect.width,
          height: sRect.height,
          minHeightOk: Math.round(sRect.height) >= 40
        };
      });

      const shotResize = `dynamic-resize-${step.name}-${step.width}x${step.height}.png`;
      await resizePage.screenshot({ path: path.join(outDir, shotResize), fullPage: false });

      report.results.push({
        caseId: `dynamic-resize.${step.name}`,
        component: "both-buttons",
        state: "resized",
        viewport: `${step.width}x${step.height}`,
        measurement: { bannerBtn: bannerMetrics, saveBtn: saveMetrics },
        screenshot: shotResize,
        pass: bannerMetrics.minHeightOk && saveMetrics.minHeightOk
      });
    }

    await resizeContext.close();

    report.consoleErrors = consoleErrors;
    report.overallPass = report.results.every((r) => r.pass) && consoleErrors.length === 0;

    const reportPath = path.join(outDir, "rwd_verification_report.json");
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`[RWD-Runner] Verification report saved to ${reportPath}`);
    console.log(`[RWD-Runner] Total cases: ${report.results.length}, Overall PASS: ${report.overallPass}, Console errors: ${consoleErrors.length}`);
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error("Fatal RWD runner error:", err);
  process.exit(1);
});
