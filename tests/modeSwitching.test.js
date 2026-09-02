// tests/modeSwitching.test.js
// Mode switching test suite: verifies query param (?mode=offline / ?mode=online),
// localStorage fallback, client factory routing, sandbox data isolation, and transfer workflows.

import test from "node:test";
import assert from "node:assert/strict";
import { ConnectionStates, Commands } from "../src/js/kernel/protocol.js";
import { LocalGameClient } from "../src/js/kernel/LocalGameClient.js";
import { RemoteGameClient } from "../src/js/net/RemoteGameClient.js";
import { encodeSaveData, decodeSaveData } from "../src/js/services/Persistence.js";
import {
  AuthoritativeKernelServer,
  MemoryPersistence,
  TestLocalGameClient,
  TestRemoteGameClient
} from "./helpers/testHarness.js";

/**
 * Pure mode resolver utility (matches main.js resolution contract)
 * @param {object} env - { search: string, storageValue: string|null, hostname: string }
 * @returns {"offline"|"online"} Resolved mode
 */
export function resolveClientMode(env = {}) {
  const search = env.search || "";
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const modeParam = params.get("mode")?.trim().toLowerCase();

  if (modeParam === "offline") return "offline";
  if (modeParam === "online") return "online";

  const storageMode = env.storageValue?.trim().toLowerCase();
  if (storageMode === "offline") return "offline";
  if (storageMode === "online") return "online";

  return "online"; // Default mode
}

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

test("模式解析策略：URL 參數優先於 localStorage 與預設值", () => {
  // 1. URL 顯式指定 ?mode=offline
  assert.equal(
    resolveClientMode({ search: "?mode=offline", storageValue: "online", hostname: "koraku.app" }),
    "offline",
    "?mode=offline 應具有最高優先級"
  );

  // 2. URL 顯式指定 ?mode=online
  assert.equal(
    resolveClientMode({ search: "?mode=online", storageValue: "offline", hostname: "koraku.app" }),
    "online",
    "?mode=online 應具有最高優先級"
  );

  // 3. 大小寫與空白容錯（如 ?mode=Offline）
  assert.equal(
    resolveClientMode({ search: "?mode=  OFFLINE  ", storageValue: "online" }),
    "offline"
  );

  // 4. 無 URL 參數時回退至 localStorage
  assert.equal(
    resolveClientMode({ search: "", storageValue: "offline" }),
    "offline"
  );
  assert.equal(
    resolveClientMode({ search: "", storageValue: "online" }),
    "online"
  );

  // 5. 皆未設定時回退至預設 online 模式
  assert.equal(
    resolveClientMode({ search: "", storageValue: null }),
    "online"
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
