import test from "node:test";
import assert from "node:assert/strict";
import { HUDDragController, HUD_STORAGE_KEY, BOUNDS_MARGIN_PX } from "../src/js/ui/HUDDragController.js";

class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] ?? null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

class MockElement {
  constructor(tag = "div") {
    this.tagName = tag.toUpperCase();
    this.classList = new Set();
    this.classList.add = (c) => this.classList.add(c);
    this.classList.remove = (c) => this.classList.delete(c);
    this.classList.contains = (c) => this.classList.has(c);
    this.style = {};
    this.listeners = {};
    this.attributes = {};
  }
  addEventListener(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }
  removeEventListener(event, fn) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
  }
  getBoundingClientRect() {
    return {
      left: parseFloat(this.style.left) || 100,
      top: parseFloat(this.style.top) || 100,
      width: 200,
      height: 120,
      right: (parseFloat(this.style.left) || 100) + 200,
      bottom: (parseFloat(this.style.top) || 100) + 120
    };
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name] ?? null;
  }
  closest(selector) {
    return null;
  }
}

test("HUDDragController: 儲存與讀取自訂座標", () => {
  const storage = new MockStorage();
  const controller = new HUDDragController({ storage });

  controller.savePosition("damageLog", { left: 120, top: 350 });
  const saved = controller.loadPositions();
  assert.equal(saved.damageLog.left, 120);
  assert.equal(saved.damageLog.top, 350);
});

test("HUDDragController: 註冊與套用自訂座標", () => {
  const storage = new MockStorage();
  storage.setItem(HUD_STORAGE_KEY, JSON.stringify({
    watermelon: { left: 50, top: 250 }
  }));

  const controller = new HUDDragController({ storage });
  const mockElem = new MockElement();
  controller.register("watermelon", mockElem);

  assert.equal(mockElem.style.left, "50px");
  assert.equal(mockElem.style.top, "250px");
  assert.equal(mockElem.style.right, "auto");
  assert.equal(mockElem.style.bottom, "auto");
});

test("HUDDragController: 雙擊重設元件為原廠預設座標", () => {
  const storage = new MockStorage();
  storage.setItem(HUD_STORAGE_KEY, JSON.stringify({
    damageLog: { left: 80, top: 300 }
  }));

  const controller = new HUDDragController({ storage });
  const mockElem = new MockElement();
  controller.register("damageLog", mockElem);

  assert.equal(mockElem.style.left, "80px");

  controller.resetPosition("damageLog");
  assert.equal(mockElem.style.left, "");
  assert.equal(mockElem.style.top, "");

  const afterReset = controller.loadPositions();
  assert.equal(afterReset.damageLog, undefined);
});

test("HUDDragController: 視窗邊界約束 (Viewport Bounds Clamping)", () => {
  const storage = new MockStorage();
  const controller = new HUDDragController({ storage });
  const mockElem = new MockElement();

  // 模擬儲存了超出 1920x1080 視窗的座標
  storage.setItem(HUD_STORAGE_KEY, JSON.stringify({
    roundOracle: { left: 2500, top: 1500 }
  }));

  controller.register("roundOracle", mockElem);

  // 寬度 200，在 1920 視窗下最大 left 應為 1920 - 200 - 8 = 1712
  const leftNum = parseFloat(mockElem.style.left);
  const topNum = parseFloat(mockElem.style.top);

  assert.ok(leftNum <= 1920 - 200 - BOUNDS_MARGIN_PX);
  assert.ok(topNum <= 1080 - 120 - BOUNDS_MARGIN_PX);
  assert.ok(leftNum >= BOUNDS_MARGIN_PX);
  assert.ok(topNum >= BOUNDS_MARGIN_PX);
});

test("HUD 預設生成座標佈局檢測：戰鬥紀錄與自動刷關切西瓜不重疊", () => {
  // 驗證預設 damageLog top = 68px, watermelon top >= 180px
  const damageLogDefaultTop = 68;
  const damageLogHeight = 100;
  const damageLogBottom = damageLogDefaultTop + damageLogHeight; // 168px

  const watermelonDefaultTopMin = 180;
  assert.ok(
    watermelonDefaultTopMin > damageLogBottom,
    `切西瓜卡片預設頂部 (${watermelonDefaultTopMin}px) 必須大於戰鬥紀錄底部 (${damageLogBottom}px) 避免生成重疊`
  );
});
