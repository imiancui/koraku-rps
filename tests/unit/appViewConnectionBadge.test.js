import test from "node:test";
import assert from "node:assert/strict";

const mockElements = new Map();
globalThis.document = {
  querySelector: (sel) => mockElements.get(sel) || null
};

import { AppView } from "../../src/js/ui/AppView.js";
import { ConnectionStates } from "../../src/js/kernel/protocol.js";
import { I18n } from "../../src/js/services/I18n.js";

test("AppView.handleConnectionBadgeAction: offline 模式下點擊清除 koraku_mode 並提示重新連線", () => {
  const toasts = [];
  const mockStorage = new Map([["koraku_mode", "offline"]]);

  globalThis.window = {
    localStorage: {
      getItem: (k) => mockStorage.get(k) || null,
      setItem: (k, v) => mockStorage.set(k, String(v)),
      removeItem: (k) => mockStorage.delete(k)
    },
    location: {
      href: "http://127.0.0.1:4173/?mode=offline",
      reload: () => {}
    }
  };

  const view = Object.create(AppView.prototype);
  view.connectionState = ConnectionStates.OFFLINE;
  view.showToast = (msg, type) => toasts.push({ msg, type });

  view.handleConnectionBadgeAction();

  assert.equal(mockStorage.has("koraku_mode"), false, "應清除 localStorage.koraku_mode");
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].type, "info");
  assert.equal(toasts[0].msg, I18n.t("connection.reconnectingToast"));
});

test("AppView.handleConnectionBadgeAction: online 模式下點擊提示連線人數與延遲", () => {
  const toasts = [];
  const view = Object.create(AppView.prototype);
  view.connectionState = ConnectionStates.ONLINE;
  view.client = {
    getOnlineCount: () => 3,
    getPing: () => ({ rtt: 45 })
  };
  view.showToast = (msg, type) => toasts.push({ msg, type });

  view.handleConnectionBadgeAction();

  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].type, "info");
  assert.ok(toasts[0].msg.includes("3"));
  assert.ok(toasts[0].msg.includes("45ms"));
});

test("AppView.handleConnectionBadgeAction: disconnected / reconnecting 下點擊觸發 client.reconnect()", () => {
  const toasts = [];
  let reconnectCalled = false;
  const view = Object.create(AppView.prototype);
  view.connectionState = ConnectionStates.DISCONNECTED;
  view.client = {
    reconnect: () => { reconnectCalled = true; }
  };
  view.showToast = (msg, type) => toasts.push({ msg, type });

  view.handleConnectionBadgeAction();

  assert.equal(reconnectCalled, true, "應呼叫 client.reconnect()");
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].msg, I18n.t("connection.reconnectingToast"));
});

test("AppView.renderConnectionState: 正確設定 badge.title 並在重新連線成功時彈出 Toast", () => {
  const toasts = [];
  const badgeClasses = new Set();
  const mockBadge = {
    classList: {
      add: (c) => badgeClasses.add(c),
      remove: (c) => badgeClasses.delete(c),
      contains: (c) => badgeClasses.has(c)
    },
    title: "",
    querySelector: () => null
  };
  const mockText = { textContent: "" };

  const view = Object.create(AppView.prototype);
  view.connectionStatusBadge = mockBadge;
  view.connectionStatusText = mockText;
  view.connectionStatusBanner = { hidden: true };
  view.showToast = (msg, type) => toasts.push({ msg, type });

  // 1. 初次進入 reconnecting
  view.renderConnectionState(ConnectionStates.RECONNECTING);
  assert.equal(mockBadge.title, I18n.t("connection.clickToReconnect"));
  assert.ok(badgeClasses.has("is-reconnecting"));

  // 2. 恢復為 online
  view.renderConnectionState(ConnectionStates.ONLINE, { onlineCount: 2 });
  assert.equal(mockBadge.title, I18n.t("connection.online"));
  assert.ok(badgeClasses.has("is-online"));
  assert.equal(toasts.length, 1);
  assert.equal(toasts[0].msg, I18n.t("connection.reconnectedSuccess"));
  assert.equal(toasts[0].type, "success");
});
