// tests/modeSwitching.test.js
// Mode switching test suite: verifies query param (?mode=offline / ?mode=online),
// localStorage fallback, client factory routing, sandbox data isolation, and transfer workflows.

import test from "node:test";
import assert from "node:assert/strict";
import { ConnectionStates, Commands, ErrorCodes } from "../src/js/kernel/protocol.js";
import { LocalGameClient } from "../src/js/kernel/LocalGameClient.js";
import {
  RemoteGameClient,
  ONLINE_STORAGE_PREFIX,
  ONLINE_TOKEN_KEY,
  ONLINE_STATE_CACHE_KEY
} from "../src/js/net/RemoteGameClient.js";
import { encodeSaveData, decodeSaveData } from "../src/js/services/Persistence.js";
import { STORAGE_KEY } from "../src/js/config/gameConfig.js";
import { resolveClientMode, resolveClientModeDetails } from "../src/js/main.js";
import {
  AuthoritativeKernelServer,
  MemoryPersistence,
  TestLocalGameClient,
  TestRemoteGameClient
} from "./helpers/testHarness.js";

/**
 * Client factory function (matches kernel factory contract)
 * @param {string} mode
 * @param {object} options
 * @returns {GameClient}
 */
export function createClientForMode(mode, options = {}) {
  if (mode === "offline") {
    return new TestLocalGameClient(options);
  }
  const server = options.server || new AuthoritativeKernelServer(options);
  return new TestRemoteGameClient(server, options);
}

test("模式解析策略：預設 offline，刪除 hostname 判斷，無配置時要求 online 降級並提供 warningKey", () => {
  // 1. URL 顯式指定 ?mode=offline -> 永遠 offline
  assert.equal(
    resolveClientMode({ search: "?mode=offline", storageValue: "online", serverUrl: "wss://example.com/ws" }),
    "offline",
    "?mode=offline 應具有最高優先級"
  );

  // 2. URL 顯式指定 ?mode=online 且有注入伺服器 -> online
  assert.equal(
    resolveClientMode({ search: "?mode=online", storageValue: "offline", serverUrl: "wss://example.com/ws" }),
    "online",
    "?mode=online 在有注入 URL 時為 online"
  );

  // 3. URL 顯式指定 ?mode=online 但無注入伺服器 -> 降級為 offline 並給出 connection.noServerConfigured
  const noServerRes = resolveClientModeDetails({ search: "?mode=online", serverUrl: null });
  assert.equal(noServerRes.mode, "offline", "無注入伺服器時要求 online 必須降級為 offline");
  assert.equal(noServerRes.warningKey, "connection.noServerConfigured", "應標記 noServerConfigured 警告鍵");

  // 4. 大小寫與空白容錯（如 ?mode=Offline）
  assert.equal(
    resolveClientMode({ search: "?mode=  OFFLINE  ", storageValue: "online" }),
    "offline"
  );

  // 5. 無 URL 參數時依 localStorage.koraku_mode
  assert.equal(
    resolveClientMode({ search: "", storageValue: "offline" }),
    "offline"
  );
  assert.equal(
    resolveClientMode({ search: "", storageValue: "online", serverUrl: "wss://staging.koraku.ts.net:8443/ws" }),
    "online"
  );
  // localStorage 為 online 但無伺服器注入 -> 降級 offline 並清除殘留的 koraku_mode，後續不再重複提示
  const mockStorage = {
    _map: new Map([["koraku_mode", "online"]]),
    getItem(k) { return this._map.get(k) || null; },
    removeItem(k) { this._map.delete(k); }
  };
  const localOnlineNoServer = resolveClientModeDetails({
    search: "",
    storage: mockStorage,
    storageValue: mockStorage.getItem("koraku_mode"),
    serverUrl: null
  });
  assert.equal(localOnlineNoServer.mode, "offline");
  assert.equal(localOnlineNoServer.warningKey, "connection.noServerConfigured");
  assert.equal(mockStorage.getItem("koraku_mode"), null, "應清除殘留之 localStorage.koraku_mode");

  // 下次載入時無殘留設定，提示只出現一次
  const nextLoadRes = resolveClientModeDetails({
    search: "",
    storage: mockStorage,
    storageValue: mockStorage.getItem("koraku_mode"),
    serverUrl: null
  });
  assert.equal(nextLoadRes.mode, "offline");
  assert.equal(nextLoadRes.warningKey, null, "殘留鍵清除後，提示不再重複出現");

  // 6. 皆未設定但有伺服器注入配置 -> 走 online
  assert.equal(
    resolveClientMode({ search: "", storageValue: null, serverUrl: "wss://staging.koraku.ts.net:8443/ws" }),
    "online"
  );

  // 7. 皆未設定且無伺服器注入配置 -> 預設 offline（止血保護！）
  assert.equal(
    resolveClientMode({ search: "", storageValue: null, serverUrl: null }),
    "offline",
    "未注入伺服器時預設必須為 offline"
  );

  // 8. 即使運行在 koraku.app 或任何生產網域，無注入時亦不再判定為 online
  assert.equal(
    resolveClientMode({ search: "", storageValue: null, serverUrl: null, hostname: "koraku.app" }),
    "offline",
    "已廢除依 hostname 自動 online 邏輯"
  );

  // 9. file:// 協定永遠 offline
  assert.equal(
    resolveClientMode({ protocol: "file:", serverUrl: "wss://staging.koraku.ts.net:8443/ws" }),
    "offline"
  );
});

test("客戶端工廠路由：依據解析模式建立正確之 GameClient 實例", async () => {
  // 1. Offline 模式實例化
  const offlineClient = createClientForMode("offline");
  await offlineClient.init();
  assert.ok(offlineClient instanceof LocalGameClient, "離線模式應實例化 LocalGameClient");
  assert.equal(offlineClient.connectionState, ConnectionStates.OFFLINE);
  assert.equal(offlineClient.hasDevEntitlement(), true, "離線沙盒模式預設具備作弊與調試權限");

  // 2. Online 模式實例化
  const onlineClient = createClientForMode("online", { token: "guest_user" });
  await onlineClient.init();
  assert.ok(onlineClient instanceof RemoteGameClient, "線上模式應實例化 RemoteGameClient");
  assert.equal(onlineClient.connectionState, ConnectionStates.ONLINE);
  assert.equal(onlineClient.hasDevEntitlement(), false, "線上普通玩家預設無作弊權限");

  offlineClient.destroy();
  onlineClient.destroy();
});

test("模式資料隔離性（Sandbox Guarantee）：離線操作絕不污染或覆蓋線上伺服器存檔", async () => {
  const offlinePersistence = new MemoryPersistence();
  const offlineClient = createClientForMode("offline", { persistence: offlinePersistence });
  await offlineClient.init();

  const serverPersistence = new MemoryPersistence();
  const server = new AuthoritativeKernelServer({ persistence: serverPersistence });
  const onlineClient = createClientForMode("online", { server, token: "online_player" });
  await onlineClient.init();

  // 在離線模式進行大幅改動（作弊金幣與修改等級）
  await offlineClient.send(Commands.CHEAT_ADD_COINS, { amount: 99999 });
  await offlineClient.send(Commands.CHEAT_SET_STATS, { level: 80 });

  // 驗證離線客戶端狀態
  assert.equal(offlineClient.getState().coins, 99999);
  assert.equal(offlineClient.getState().profile.level, 80);

  // 驗證線上伺服器與線上客戶端狀態完全未受影響
  assert.equal(onlineClient.getState().coins, 0, "線上金幣應保持為 0");
  assert.equal(onlineClient.getState().profile.level, 1, "線上等級應保持為 1");
  assert.equal(serverPersistence.load()?.coins || 0, 0);

  offlineClient.destroy();
  onlineClient.destroy();
});

test("跨模式資料轉移流程：離線存檔導出與線上轉移碼兌換", async () => {
  // 1. 玩家在離線模式累積進度
  const offlineClient = createClientForMode("offline");
  await offlineClient.init();

  await offlineClient.send(Commands.CHEAT_ADD_COINS, { amount: 5000 });
  await offlineClient.send(Commands.BUY_ITEM, { itemKey: "mpPotion" });
  const offlineSnapshot = offlineClient.getState();

  // 導出離線存檔種子碼
  const saveCode = encodeSaveData(offlineSnapshot);
  assert.ok(saveCode.startsWith("KORAKU1_"));

  // 2. 切換至線上伺服器並透過轉移機制匯入進度
  const server = new AuthoritativeKernelServer();
  const onlineClient = createClientForMode("online", { server, token: "new_device_token" });
  await onlineClient.init();

  // 解碼種子碼並驗證完整性
  const decodedData = decodeSaveData(saveCode);
  assert.equal(decodedData.coins, offlineSnapshot.coins);
  assert.equal(decodedData.inventory.mpPotion, 1);

  // 伺服器簽發並兌換轉移碼
  const issueRes = await onlineClient.send(Commands.ACCOUNT_ISSUE_TRANSFER_CODE);
  assert.equal(issueRes.ok, true);

  const claimRes = await onlineClient.send(Commands.ACCOUNT_CLAIM_TRANSFER_CODE, { code: issueRes.code });
  assert.equal(claimRes.ok, true);

  offlineClient.destroy();
  onlineClient.destroy();
});

test("雙模式 LocalStorage 鍵空間獨立（Disjoint Storage Keys）：koraku-rps-save-v1 與 koraku-rps-online-*", async () => {
  const mockStorageMap = new Map();
  const mockLocalStorage = {
    getItem: (key) => mockStorageMap.get(key) || null,
    setItem: (key, val) => mockStorageMap.set(key, String(val)),
    removeItem: (key) => mockStorageMap.delete(key),
    clear: () => mockStorageMap.clear()
  };

  // 1. 離線模式寫入資料至 koraku-rps-save-v1
  const offlineData = { coins: 8888, profile: { level: 25 } };
  mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(offlineData));

  // 2. 線上客戶端建立（注入 mockLocalStorage）
  const fakeSocket = {
    readyState: 1,
    send: () => {},
    close: () => {}
  };
  const onlineClient = new RemoteGameClient({
    url: "wss://staging.koraku.ts.net:8443/ws",
    storage: mockLocalStorage,
    WebSocketClass: function() { return fakeSocket; }
  });

  // 模擬收到 Handshake ACK
  onlineClient._handleHandshakeAck({
    token: "jwt_token_online_999",
    state: { coins: 100, profile: { level: 2 } }
  });

  // 3. 斷言儲存鍵互斥性
  assert.ok(mockStorageMap.has(STORAGE_KEY), "離線存檔鍵必須保留");
  assert.ok(mockStorageMap.has(ONLINE_TOKEN_KEY), "線上 token 必須寫入專屬鍵");
  assert.ok(mockStorageMap.has(ONLINE_STATE_CACHE_KEY), "線上 state 必須寫入專屬鍵");

  // 4. 斷言線上操作絕不變更離線存檔鍵
  const readOffline = JSON.parse(mockLocalStorage.getItem(STORAGE_KEY));
  assert.equal(readOffline.coins, 8888, "離線金幣未被線上 Handshake 影響");
  assert.equal(readOffline.profile.level, 25, "離線等級未被線上 Handshake 影響");

  // 5. 斷言線上快取讀取的是線上資料，非離線進度
  const onlineCached = JSON.parse(mockLocalStorage.getItem(ONLINE_STATE_CACHE_KEY));
  assert.equal(onlineCached.coins, 100, "線上快取金幣為 100");
  assert.equal(onlineCached.profile.level, 2, "線上快取等級為 2");

  // 6. 模擬離線進度修改，線上快取不變
  readOffline.coins = 99999;
  mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(readOffline));
  const onlineCachedAfter = JSON.parse(mockLocalStorage.getItem(ONLINE_STATE_CACHE_KEY));
  assert.equal(onlineCachedAfter.coins, 100, "離線寫入後，線上快取絕不受污染");

  onlineClient.destroy();
});

test("未連線狀態下佇列中指令超時（Queued Command Timeout）以 NOT_CONNECTED 拒絕", async () => {
  // 建立未連線且無自動重連之 RemoteGameClient，指令超時設為 60ms
  const client = new RemoteGameClient({
    url: "wss://staging.koraku.ts.net:8443/ws",
    autoReconnect: false,
    commandTimeout: 60,
    WebSocketClass: function() {
      // 模擬永遠無法建立連線的 socket
      this.readyState = 0; // CONNECTING
      this.send = () => {};
      this.close = () => {};
    }
  });

  // 客戶端尚未進入 ONLINE 狀態，直接發送指令排入 _commandQueue
  assert.notEqual(client.connectionState, ConnectionStates.ONLINE);

  let rejectedError = null;
  const sendPromise = client.send(Commands.BATTLE_START, { stageId: 1 }).catch((err) => {
    rejectedError = err;
  });

  // 等待 80ms 使其超過 60ms 佇列超時限制
  await new Promise((r) => setTimeout(r, 80));
  await sendPromise;

  assert.ok(rejectedError, "未連線逾時排隊指令應被 reject");
  assert.equal(rejectedError.code, ErrorCodes.NOT_CONNECTED, "錯誤碼必須為 NOT_CONNECTED");

  client.destroy();
});
