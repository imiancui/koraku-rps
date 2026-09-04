// tests/onlineCountAndMuteFix.test.js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createKorakuServer } from "../server/server.js";
import { RemoteGameClient } from "../src/js/net/RemoteGameClient.js";
import { ConnectionStates } from "../src/js/kernel/protocol.js";
import { AppView } from "../src/js/ui/AppView.js";
import { GameStore, freshSave, sanitizeSave } from "../src/js/core/GameStore.js";
import { SoundSystem } from "../src/js/systems/SoundSystem.js";
import { EventBus } from "../src/js/core/EventBus.js";

test("線上人數：伺服器 /health 與 WebSocket Pong 正確回傳在線人數", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-count-test-"));
  const server = createKorakuServer({
    port: 0,
    host: "127.0.0.1",
    dataDir: tmpDir,
    allowedOrigins: ["*"],
    allowEmptyOrigin: true
  });

  await server.start(0, "127.0.0.1");
  const port = server.actualPort;

  // 1. 初始 /health: 在線人數為 0
  const initialHealthRes = await fetch(`http://127.0.0.1:${port}/health`);
  const initialHealth = await initialHealthRes.json();
  assert.equal(initialHealth.onlineCount, 0, "未連線時 onlineCount 應為 0");

  // 2. 第一個客戶端連線
  const authRes1 = await fetch(`http://127.0.0.1:${port}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "device_count_1" })
  });
  const auth1 = await authRes1.json();

  const client1 = new RemoteGameClient({
    url: `ws://127.0.0.1:${port}`,
    token: auth1.token,
    pingInterval: 500
  });

  await client1.init();

  // 等待連線就緒
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.equal(client1.getOnlineCount(), 1, "單一客戶端連線時在線人數應為 1");

  // 3. 第二個客戶端連線
  const authRes2 = await fetch(`http://127.0.0.1:${port}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "device_count_2" })
  });
  const auth2 = await authRes2.json();

  const client2 = new RemoteGameClient({
    url: `ws://127.0.0.1:${port}`,
    token: auth2.token,
    pingInterval: 500
  });

  await client2.init();
  await new Promise((resolve) => setTimeout(resolve, 100));

  assert.equal(client2.getOnlineCount(), 2, "雙客戶端連線時在線人數應為 2");

  const healthRes2 = await fetch(`http://127.0.0.1:${port}/health`);
  const health2 = await healthRes2.json();
  assert.equal(health2.onlineCount, 2, "雙客戶端連線時 /health 應回報 2");

  client1.destroy();
  client2.destroy();
  await server.close();
  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("UI 視圖：AppView 連線狀態徽章在線上時整合顯示括號人數，離線時顯示乾淨狀態", () => {
  const elements = new Map();
  const getOrCreateEl = (id) => {
    if (!elements.has(id)) {
      elements.set(id, {
        textContent: "",
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        querySelector: () => null,
        appendChild: () => {}
      });
    }
    return elements.get(id);
  };

  const origDoc = globalThis.document;
  globalThis.document = {
    querySelector: (sel) => getOrCreateEl(sel),
    querySelectorAll: () => []
  };

  try {
    const bus = new EventBus();
    const appView = Object.create(AppView.prototype);
    appView.connectionStatusBadge = getOrCreateEl("#connection-status-badge");
    appView.connectionStatusText = getOrCreateEl("#connection-status-text");
    appView.client = { getOnlineCount: () => 3 };

    // 1. 線上狀態且有 3 人在線
    appView.renderConnectionState(ConnectionStates.ONLINE, { onlineCount: 3 });
    assert.equal(appView.connectionStatusText.textContent, "連線中 (3人)", "線上且 3 人在線時應呈現「連線中 (3人)」");
    assert.equal(appView.connectionStatusBadge.classList.contains("is-online"), true);

    // 2. 離線狀態
    appView.renderConnectionState(ConnectionStates.OFFLINE);
    assert.equal(appView.connectionStatusText.textContent, "離線模式", "離線模式下不應顯示人數括號");
    assert.equal(appView.connectionStatusBadge.classList.contains("is-offline"), true);

    // 3. 重新連線中狀態
    appView.renderConnectionState(ConnectionStates.RECONNECTING);
    assert.equal(appView.connectionStatusText.textContent, "重新連線中", "重新連線中不應顯示人數括號");
  } finally {
    globalThis.document = origDoc;
  }
});

test("靜音持久化：模擬 F5 刷新，localStorage 記憶之 BGM 與 SFX 靜音設定完好保留", () => {
  const fakeStorage = new Map();
  fakeStorage.set("koraku_music_muted", "true");
  fakeStorage.set("koraku_sfx_muted", "true");

  const origWindow = globalThis.window;
  globalThis.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage: {
      getItem: (k) => fakeStorage.get(k) || null,
      setItem: (k, v) => fakeStorage.set(k, String(v)),
      removeItem: (k) => fakeStorage.delete(k)
    }
  };

  try {
    // 1. freshSave() 安全讀取 localStorage
    const fresh = freshSave();
    assert.equal(fresh.settings.musicMuted, true, "freshSave() 應從 localStorage 載入 musicMuted = true");
    assert.equal(fresh.settings.sfxMuted, true, "freshSave() 應從 localStorage 載入 sfxMuted = true");

    // 2. sanitizeSave(null) 保底
    const sanitized = sanitizeSave(null);
    assert.equal(sanitized.settings.musicMuted, true, "sanitizeSave(null) 應載入 musicMuted = true");
    assert.equal(sanitized.settings.sfxMuted, true, "sanitizeSave(null) 應載入 sfxMuted = true");

    // 3. SoundSystem getEffectiveMuteState() 保底
    const mockStore = { snapshot: () => ({ settings: { musicMuted: false, sfxMuted: false } }) };
    const sound = new SoundSystem(mockStore);
    const { isMusicMuted, isSfxMuted } = sound.getEffectiveMuteState();
    assert.equal(isMusicMuted, true, "即使 store snapshot 暫時為 false，SoundSystem 也從 localStorage 保底讀出 true");
    assert.equal(isSfxMuted, true, "即使 store snapshot 暫時為 false，SoundSystem 也從 localStorage 保底讀出 true");

    // 4. RemoteGameClient 初始化與狀態合併時保留本機靜音設定
    const client = new RemoteGameClient({
      storage: window.localStorage,
      pingInterval: 5000
    });
    assert.equal(client._state.settings?.musicMuted, true, "RemoteGameClient constructor 應載入 musicMuted = true");
    assert.equal(client._state.settings?.sfxMuted, true, "RemoteGameClient constructor 應載入 sfxMuted = true");

    // 模擬伺服器推送了未靜音的預設存檔
    client._mergeState({
      profile: { level: 1 },
      settings: { musicMuted: false, sfxMuted: false }
    });
    assert.equal(client._state.settings.musicMuted, true, "伺服器推送狀態後，本地 musicMuted 依然保持 true");
    assert.equal(client._state.settings.sfxMuted, true, "伺服器推送狀態後，本地 sfxMuted 依然保持 true");
  } finally {
    globalThis.window = origWindow;
  }
});
