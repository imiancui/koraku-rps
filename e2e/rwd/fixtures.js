import { test as base, expect } from "@playwright/test";
import http from "node:http";
import path from "node:path";
import os from "node:os";
import { readFile, realpath } from "node:fs/promises";
import { createHash, randomInt } from "node:crypto";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp" };

export async function startStaticServer() {
  const root = await realpath(projectRoot);
  const server = http.createServer(async (request, response) => {
    try {
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const relative = pathname === "/" ? "index.html" : pathname.slice(1);
      // Only application assets, never agent links, saves, dependencies or sibling projects.
      if (!/^(index\.html|favicon\.(ico|svg)|src\/(styles\/[^/]+\.css|js\/bundle\.js)|koraku\/[^/]+\.(png|webp|jpg))$/.test(relative)) {
        response.writeHead(404).end("Not found"); return;
      }
      const target = await realpath(path.resolve(root, relative));
      if (!target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
      const bytes = await readFile(target);
      response.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
      response.end(request.method === "HEAD" ? undefined : bytes);
    } catch (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500).end("Resource unavailable");
    }
  });
  let listening = false;
  for (let attempt = 0; attempt < 50 && !listening; attempt++) {
    const port = randomInt(20000, 50000);
    try {
      await new Promise((resolve, reject) => {
        const onError = error => { server.off("listening", onListening); reject(error); };
        const onListening = () => { server.off("error", onError); resolve(); };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port, "127.0.0.1");
      });
      listening = true;
    } catch (error) {
      if (error.code !== "EADDRINUSE") throw error;
    }
  }
  if (!listening) throw new Error("Unable to allocate a safe task-owned loopback port");
  return {
    url: "http://127.0.0.1:" + server.address().port,
    close: () => new Promise((resolve, reject) => {
      server.closeIdleConnections();
      server.close(error => error ? reject(error) : resolve());
    })
  };
}

export async function monitorPage(page) {
  const events = [];
  const add = (kind, details) => events.push({ kind, ...details });
  page.on("console", message => {
    if (message.type() === "error" || message.type() === "warning") add("console", { level: message.type(), message: message.text(), location: message.location() });
  });
  page.on("pageerror", error => add("pageerror", { message: error.message }));
  page.on("requestfailed", request => add("requestfailed", { url: request.url(), error: request.failure()?.errorText }));
  page.on("response", response => { if (response.status() >= 400) add("response", { url: response.url(), status: response.status() }); });
  await page.exposeBinding("__korakuRwdUnhandled", (_source, reason) => add("unhandledrejection", { message: reason }));
  await page.addInitScript(() => {
    window.addEventListener("unhandledrejection", event => {
      window.__korakuRwdUnhandled(String(event.reason?.stack || event.reason));
    });
  });
  return {
    events,
    // Warnings remain in evidence; the project gate blocks errors, not every browser advisory.
    assertNoErrors: () => expect(events.filter(event => event.kind !== "console" || event.level === "error"), "Unexpected page/console/resource errors").toEqual([])
  };
}

export async function attachJson(testInfo, name, value) {
  await testInfo.attach(name, { body: Buffer.from(JSON.stringify(value, null, 2)), contentType: "application/json" });
}

export async function sourceFingerprint() {
  const names = [
    "index.html", "src/js/bundle.js", "src/styles/tokens.css", "src/styles/base.css", "src/styles/components.css", "src/styles/screens.css", "src/styles/animations.css", "src/styles/responsive.css",
    "package-lock.json", "playwright.rwd.config.js", "scripts/run-rwd.mjs", "scripts/run-rwd-full.mjs", "scripts/run-rwd-repeat.mjs", "scripts/accept-rwd-baseline.mjs",
    "e2e/rwd/manifest.json", "e2e/rwd/coverage.js", "e2e/rwd/report.js", "e2e/rwd/fixtures.js",
    "e2e/rwd/application.js", "e2e/rwd/layout-audit.js", "e2e/rwd/calibration.spec.js",
    "e2e/rwd/probes.spec.js", "e2e/rwd/states.spec.js", "e2e/rwd/smoke.spec.js", "e2e/rwd/tooling.spec.js",
    "e2e/rwd/stage-b-helpers.js", "e2e/rwd/stage-b-before.spec.js", "e2e/rwd/candidates.spec.js",
    "e2e/rwd/visual.spec.js", "e2e/rwd/smoke-core.spec.js", "e2e/rwd/smoke-complement.spec.js", "e2e/rwd/boundary.spec.js", "e2e/rwd/sweep.spec.js", "e2e/rwd/stress-content.spec.js", "e2e/rwd/stress-input.spec.js", "e2e/rwd/stress-animation.spec.js", "e2e/rwd/baselines/approved.json"
  ];
  return Object.fromEntries(await Promise.all(names.map(async name => [name, createHash("sha256").update(await readFile(path.join(projectRoot, name))).digest("hex")])));
}

export const test = base.extend({
  appUrl: [async ({}, use) => {
    const server = await startStaticServer();
    try { await use(server.url); } finally { await server.close(); }
  }, { scope: "worker" }],
  page: async ({ page, browser }, use, testInfo) => {
    const monitor = await monitorPage(page);
    try {
      await use(page);
    } finally {
      await attachJson(testInfo, "environment", {
        browser: browser.version(), node: process.version, os: os.platform(), release: os.release(), viewport: page.viewportSize(), gitHead: testInfo.config.metadata.gitHead,
        source: await sourceFingerprint(), evidenceLevel: "browser-emulated", fullRwdAcceptance: false
      });
      await attachJson(testInfo, "console-and-resource-events", monitor.events);
      monitor.assertNoErrors();
    }
  }
});
export { expect };
