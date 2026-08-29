import http from "node:http";
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBundle } from "./build.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const wantTailscale = process.argv.includes("--tailscale") || process.env.TAILSCALE === "1";
const host = process.env.HOST || "127.0.0.1";
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

const servers = [];

function runCommand(command, args, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(command + " timed out"));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error((stderr || stdout || command + " failed").trim()));
    });
  });
}

function runTailscale(args) {
  return runCommand("tailscale", args);
}

async function handleRequest(request, response) {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    const pathname = decodeURIComponent(requestUrl.pathname);
    const requested = path.resolve(root, "." + pathname);

    if (!requested.startsWith(root + path.sep) && requested !== root) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    let filePath = requested;
    const fileStat = await stat(filePath).catch(() => null);
    if (fileStat?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

function listenOn(bindHost) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handleRequest);
    server.once("error", reject);
    server.listen(port, bindHost, () => {
      servers.push(server);
      resolve(server);
    });
  });
}

async function readTailscaleIdentity() {
  const status = JSON.parse((await runTailscale(["status", "--json"])).stdout);
  const self = status.Self || {};
  const dnsName = String(self.DNSName || "").replace(/\.$/, "");
  const ips = Array.isArray(self.TailscaleIPs) ? self.TailscaleIPs : [];
  const ipv4 = ips.find((ip) => ip.includes(".")) || "";
  return { dnsName, ipv4 };
}

async function allowTailscaleFirewall() {
  const script = [
    "$name = 'Koraku RPS Tailscale'",
    "if (-not (Get-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue)) {",
    "  New-NetFirewallRule -DisplayName $name -Direction Inbound -Action Allow -Protocol TCP -LocalPort " + port + " -InterfaceAlias 'Tailscale' | Out-Null",
    "}"
  ].join("; ");
  await runCommand("powershell", ["-NoProfile", "-NonInteractive", "-Command", script]);
}

async function start() {
  await buildBundle().catch((err) => {
    console.warn("自動打包警告（若使用模組化開發可忽略）：", err.message);
  });
  await listenOn(host);
  console.log("狐樂・絆之勝負：http://" + host + ":" + port);

  if (!wantTailscale) {
    return;
  }

  const identity = await readTailscaleIdentity();
  if (identity.ipv4 && identity.ipv4 !== host) {
    await listenOn(identity.ipv4);
  }

  try {
    await allowTailscaleFirewall();
  } catch (error) {
    console.error("Windows 防火牆規則未寫入（可忽略，若連不上再以系統管理員重跑）：", error.message);
  }

  try {
    await runTailscale(["serve", "--bg", "--yes", String(port)]);
  } catch (error) {
    console.error("Tailscale HTTPS Serve 未掛上：", error.message);
  }

  console.log("Tailscale（僅同一個 tailnet 可連）：");
  if (identity.dnsName) {
    console.log("  https://" + identity.dnsName + "/");
    console.log("  http://" + identity.dnsName + ":" + port);
  }
  if (identity.ipv4) {
    console.log("  http://" + identity.ipv4 + ":" + port);
  }
}

function shutdown() {
  Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))))
    .finally(() => process.exit(0));
  setTimeout(() => process.exit(0), 1500).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
