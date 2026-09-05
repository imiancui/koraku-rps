// tests/onlineZombieConnectionCleanup.test.js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import crypto from "node:crypto";
import { createKorakuServer } from "../server/server.js";
import { RemoteGameClient } from "../src/js/net/RemoteGameClient.js";
import { ConnectionStates } from "../src/js/kernel/protocol.js";

test("殭屍連線修復：TCP FIN (socket end) 立即觸發釋放並扣減在線人數", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-zombie-test-"));
  const server = createKorakuServer({
    port: 0,
    host: "127.0.0.1",
    dataDir: tmpDir,
    allowedOrigins: ["*"],
    allowEmptyOrigin: true
  });

  await server.start(0, "127.0.0.1");
  const port = server.actualPort;

  // 1. 初始 /health: 在線人數 0
  const initialRes = await fetch(`http://127.0.0.1:${port}/health`);
  const initialData = await initialRes.json();
  assert.equal(initialData.onlineCount, 0, "初始人數應為 0");

  // 2. 建立原生 TCP WebSocket 升級連線
  const key = crypto.randomBytes(16).toString("base64");
  const socket = net.createConnection({ port, host: "127.0.0.1" });

  await new Promise((resolve, reject) => {
    socket.on("connect", () => {
      const req = [
        "GET /ws HTTP/1.1",
        `Host: 127.0.0.1:${port}`,
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Key: ${key}`,
        "Sec-WebSocket-Version: 13",
        "\r\n"
      ].join("\r\n");
      socket.write(req);
    });

    socket.once("data", (data) => {
      const res = data.toString("utf8");
      if (res.includes("101 Switching Protocols")) {
        resolve();
      } else {
        reject(new Error("Upgrade failed: " + res));
      }
    });
    socket.on("error", reject);
  });

  // 等待伺服器登記連線
  await new Promise((resolve) => setTimeout(resolve, 100));
  const duringRes = await fetch(`http://127.0.0.1:${port}/health`);
  const duringData = await duringRes.json();
  assert.equal(duringData.onlineCount, 1, "連線建立後 onlineCount 應為 1");

  // 3. 發送 TCP FIN (socket.end()) 模擬客戶端斷線或關閉分頁
  socket.end();

  // 等待伺服器處理 end 事件並清理
  await new Promise((resolve) => setTimeout(resolve, 150));

  const afterRes = await fetch(`http://127.0.0.1:${port}/health`);
  const afterData = await afterRes.json();
  assert.equal(afterData.onlineCount, 0, "收到 TCP end 後 onlineCount 應即時降為 0");

  await server.close();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("心跳超時巡檢：無心跳活動之滯留連線於超時後自動被剔除", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-stale-test-"));
  const server = createKorakuServer({
    port: 0,
    host: "127.0.0.1",
    dataDir: tmpDir,
    allowedOrigins: ["*"],
    allowEmptyOrigin: true
  });

  // 設定較短的連線超時時間以利快速測試 (200ms)
  server.connectionManager.connectionTimeoutMs = 200;

  await server.start(0, "127.0.0.1");
  const port = server.actualPort;

  // 建立連線
  const key = crypto.randomBytes(16).toString("base64");
  const socket = net.createConnection({ port, host: "127.0.0.1" });

  await new Promise((resolve, reject) => {
    socket.on("connect", () => {
      const req = [
        "GET /ws HTTP/1.1",
        `Host: 127.0.0.1:${port}`,
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Key: ${key}`,
        "Sec-WebSocket-Version: 13",
        "\r\n"
      ].join("\r\n");
      socket.write(req);
    });

    socket.once("data", (data) => {
      if (data.toString("utf8").includes("101 Switching Protocols")) {
        resolve();
      } else {
        reject(new Error("Upgrade failed"));
      }
    });
    socket.on("error", reject);
  });

  await new Promise((resolve) => setTimeout(resolve, 80));
  const activeRes = await fetch(`http://127.0.0.1:${port}/health`);
  const activeData = await activeRes.json();
  assert.equal(activeData.onlineCount, 1, "連線活躍時 onlineCount 應為 1");

  // 靜置超過超時時間 (300ms > 200ms)，並手動調用或等待巡檢
  await new Promise((resolve) => setTimeout(resolve, 300));
  server.connectionManager._sweepStaleConnections();

  const sweptRes = await fetch(`http://127.0.0.1:${port}/health`);
  const sweptData = await sweptRes.json();
  assert.equal(sweptData.onlineCount, 0, "超時無活動連線應被自動剔除，onlineCount 回歸 0");

  try { socket.destroy(); } catch (_) {}
  await server.close();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("全域即時廣播：連線加入與離開時，全體客戶端即時收到 online:count 事件", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-bcast-test-"));
  const server = createKorakuServer({
    port: 0,
    host: "127.0.0.1",
    dataDir: tmpDir,
    allowedOrigins: ["*"],
    allowEmptyOrigin: true
  });

  await server.start(0, "127.0.0.1");
  const port = server.actualPort;

  // 客戶端 1 連線
  const authRes1 = await fetch(`http://127.0.0.1:${port}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "device_bcast_1" })
  });
  const auth1 = await authRes1.json();

  const client1 = new RemoteGameClient({
    url: `ws://127.0.0.1:${port}`,
    token: auth1.token,
    pingInterval: 10000 // 設大以排除自動 ping 干擾
  });

  const receivedCounts = [];
  client1.on("online:count", (payload) => {
    receivedCounts.push(payload.onlineCount);
  });

  await client1.init();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 客戶端 2 連線
  const authRes2 = await fetch(`http://127.0.0.1:${port}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "device_bcast_2" })
  });
  const auth2 = await authRes2.json();

  const client2 = new RemoteGameClient({
    url: `ws://127.0.0.1:${port}`,
    token: auth2.token,
    pingInterval: 10000
  });

  await client2.init();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 客戶端 1 應該收到客戶端 2 連線時廣播的 count: 2
  assert.ok(receivedCounts.includes(2), `客戶端 1 應即時收到 2 人廣播，實際收到: ${JSON.stringify(receivedCounts)}`);

  // 客戶端 2 關閉連線
  client2.destroy();
  await new Promise((resolve) => setTimeout(resolve, 150));

  // 客戶端 1 應該收到客戶端 2 離線時廣播的 count: 1
  assert.ok(receivedCounts.includes(1), `客戶端 1 應即時收到降為 1 人的廣播，實際收到: ${JSON.stringify(receivedCounts)}`);

  client1.destroy();
  await server.close();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("前端韌性：visibilitychange 喚醒時主動補發 Ping", () => {
  const origDoc = globalThis.document;
  let visHandler = null;
  let pingSent = false;

  globalThis.document = {
    visibilityState: "hidden",
    addEventListener: (event, handler) => {
      if (event === "visibilitychange") visHandler = handler;
    },
    removeEventListener: () => {}
  };

  try {
    const client = new RemoteGameClient({ url: "ws://127.0.0.1:8080" });
    client._connectionState = ConnectionStates.ONLINE;
    client._sendPing = () => {
      pingSent = true;
    };

    assert.ok(visHandler !== null, "應註冊 visibilitychange 監聽器");

    // 切換為 visible
    globalThis.document.visibilityState = "visible";
    visHandler();

    assert.equal(pingSent, true, "分頁切換為可見狀態時應立即觸發 _sendPing()");
    client.destroy();
  } finally {
    globalThis.document = origDoc;
  }
});
