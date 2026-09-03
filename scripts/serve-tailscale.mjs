import http from "node:http";
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBundle } from "./build.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const staticPort = 4173;
const serverPort = 8080;
const host = "127.0.0.1";

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

function runCommand(command, args, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(command + " timed out"));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => { clearTimeout(timer); reject(error); });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error((stderr || stdout || command + " failed").trim()));
    });
  });
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const k = trimmed.slice(0, eqIdx).trim();
    const v = trimmed.slice(eqIdx + 1).trim();
    env[k] = v;
  }
  return env;
}

async function readTailscaleIdentity() {
  try {
    const res = await runCommand("tailscale", ["status", "--json"]);
    const status = JSON.parse(res.stdout);
    const self = status.Self || {};
    const dnsName = String(self.DNSName || "").replace(/\.$/, "");
    const ips = Array.isArray(self.TailscaleIPs) ? self.TailscaleIPs : [];
    const ipv4 = ips.find((ip) => ip.includes(".")) || "";
    return { dnsName, ipv4 };
  } catch (err) {
    console.warn("[Tailscale] Warning: Could not read Tailscale status:", err.message);
    return { dnsName: "127.0.0.1", ipv4: "127.0.0.1" };
  }
}

async function main() {
  console.log("=== Koraku RPS Tailscale Staging Runner ===");

  // 1. Build bundle
  await buildBundle().catch((err) => {
    console.warn("Bundle warning:", err.message);
  });

  // 2. Read Tailscale identity
  const identity = await readTailscaleIdentity();
  const dnsName = identity.dnsName;
  console.log("[Tailscale] Detected Node DNS Name:", dnsName);

  // 3. Load server/.env and start server/index.js as child process
  const envFile = path.join(root, "server", ".env");
  const parsedEnv = parseEnvFile(envFile);
  const configuredOrigins = parsedEnv.ALLOWED_ORIGINS
    ? parsedEnv.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const originsSet = new Set([
    `https://${dnsName}`,
    "https://koraku.app",
    `http://127.0.0.1:${staticPort}`,
    `http://localhost:${staticPort}`,
    ...configuredOrigins
  ]);
  if (identity.ipv4 && identity.ipv4 !== "127.0.0.1") {
    originsSet.add(`http://${identity.ipv4}:${staticPort}`);
    originsSet.add(`https://${identity.ipv4}`);
  }

  const serverEnv = {
    ...process.env,
    ...parsedEnv,
    HOST: "127.0.0.1",
    PORT: String(serverPort),
    ALLOWED_ORIGINS: Array.from(originsSet).join(",")
  };

  const serverProc = spawn("node", ["server/index.js"], {
    cwd: root,
    env: serverEnv,
    stdio: "inherit"
  });

  serverProc.on("error", (err) => {
    console.error("[Server Process Error]:", err);
  });

  // 4. Static web server on 4173 with HTML injection
  const injectionScript = `<script>window.__KORAKU_CONFIG__ = { serverUrl: "wss://${dnsName}:8443/ws" };</script>`;

  const staticServer = http.createServer(async (req, res) => {
    try {
      const reqUrl = new URL(req.url || "/", "http://localhost");
      const pathname = decodeURIComponent(reqUrl.pathname);
      let filePath = path.resolve(root, "." + pathname);

      if (!filePath.startsWith(root + path.sep) && filePath !== root) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      const fileStat = await stat(filePath).catch(() => null);
      if (fileStat?.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (path.basename(filePath) === "index.html") {
        let html = await readFile(filePath, "utf8");
        const bundlePattern = /<script\s+src=["'](?:\.\/)?src\/js\/bundle\.js[^"']*["']><\/script>/i;
        if (bundlePattern.test(html)) {
          html = html.replace(bundlePattern, (match) => `${injectionScript}\n    ${match}`);
        } else if (html.includes("</head>")) {
          html = html.replace("</head>", `${injectionScript}\n</head>`);
        }
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache"
        });
        res.end(html);
        return;
      }

      const content = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-cache"
      });
      res.end(content);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  await new Promise((resolve) => staticServer.listen(staticPort, host, resolve));
  console.log(`[Static Client] Listening locally on http://${host}:${staticPort}`);

  // 5. Run tailscale serve
  try {
    console.log("[Tailscale] Configuring Tailscale Serve on 443 (static)...");
    await runCommand("tailscale", ["serve", "--bg", "--yes", String(staticPort)]);
  } catch (err) {
    console.warn("[Tailscale] Serve static warning:", err.message);
  }

  try {
    console.log("[Tailscale] Configuring Tailscale Serve on 8443 (server proxy)...");
    await runCommand("tailscale", ["serve", "--bg", "--yes", "--https=8443", `http://127.0.0.1:${serverPort}`]);
  } catch (err) {
    console.warn("[Tailscale] Serve backend warning:", err.message);
  }

  // 6. Display access URLs
  console.log("\n========================================================");
  console.log("  狐樂・絆之勝負 Tailscale Staging 站點已就緒");
  console.log("========================================================");
  console.log(`  手機/內網客戶端 URL:  https://${dnsName}/`);
  console.log(`  本機客戶端 URL:        http://${host}:${staticPort}/`);
  console.log(`  權威伺服器端點 (WSS): wss://${dnsName}:8443/ws`);
  console.log(`  健康檢查端點 (HTTPS): https://${dnsName}:8443/health`);
  console.log("========================================================\n");

  function shutdown() {
    console.log("\n[Shutdown] Stopping servers...");
    try { serverProc.kill(); } catch (_) {}
    staticServer.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 1500).unref();
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
