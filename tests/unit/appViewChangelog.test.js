import test from "node:test";
import assert from "node:assert/strict";

const container = { innerHTML: "" };
globalThis.document = {
  querySelector: (sel) => {
    if (sel === "#changelog-modal-list") return container;
    return null;
  }
};

import { AppView } from "../../src/js/ui/AppView.js";
import { APP_VERSION } from "../../src/js/config/gameConfig.js";
import { I18n } from "../../src/js/services/I18n.js";

test("AppView.renderChangelog: 最上方正確渲染當前 APP_VERSION 並帶有 is-current 與當前版本標籤", () => {
  container.innerHTML = "";
  const view = Object.create(AppView.prototype);

  view.renderChangelog();

  assert.ok(container.innerHTML.includes("v" + APP_VERSION), "必須包含當前 APP_VERSION");
  assert.ok(container.innerHTML.includes("changelog-current-badge"), "必須包含當前版本 Badge");
  assert.ok(container.innerHTML.includes("當前版本") || container.innerHTML.includes("Current Version"), "Badge 需有在地化文字");
  assert.ok(container.innerHTML.includes("is-current"), "必須帶有 is-current 樣式類別");

  // 驗證最頂部第一個版本即為當前版本
  const match = container.innerHTML.match(/<span class="changelog-ver">v(.*?)<\/span>/);
  assert.ok(match, "必須匹配到版本號");
  assert.equal(match[1], APP_VERSION, "更新日誌最頂部第一個條目必須是當前 APP_VERSION");
});

test("AppView.renderChangelog: 若資料源遺漏當前版本，自動在前頭合成當前版本條目與狀態文字", () => {
  container.innerHTML = "";
  const view = Object.create(AppView.prototype);

  // 模擬資料源缺少當前版本
  const origGet = I18n.getChangelog;
  I18n.getChangelog = () => [
    { version: "0.0.21", date: "2026-09-03", tag: "Old Version", changes: ["Old item"] }
  ];

  try {
    view.renderChangelog();

    const match = container.innerHTML.match(/<span class="changelog-ver">v(.*?)<\/span>/);
    assert.ok(match, "即便資料源未填，亦須匹配到版本號");
    assert.equal(match[1], APP_VERSION, "即便資料源未填，最頂部亦強制合成當前 APP_VERSION");
    assert.ok(container.innerHTML.includes("changelog-current-badge"), "合成條目亦帶有當前版本 Badge");
    assert.ok(container.innerHTML.includes("is-current"), "合成條目標記為 is-current");
  } finally {
    I18n.getChangelog = origGet;
  }
});
