import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { QTESystem, DualQTESystem } from "../src/js/systems/QTESystem.js";
import {
  QTEKeyboardInput,
  directionFromKey,
  wasdDirectionFromKey,
  arrowDirectionFromKey,
  isUnmappedActionKey
} from "../src/js/systems/QTEInputSystem.js";
import { STAGES } from "../src/js/config/gameConfig.js";

class MemoryPersistence {
  constructor(data = null) {
    this.data = data;
  }

  load() {
    return this.data;
  }

  save(data) {
    this.data = structuredClone(data);
  }

  clear() {
    this.data = null;
  }
}

function createMockTimers() {
  const intervals = new Map();
  const timeouts = new Map();
  let nextId = 1;
  return {
    interval(fn, ms) {
      const id = nextId++;
      intervals.set(id, { fn, ms });
      return id;
    },
    clearInterval(id) {
      intervals.delete(id);
    },
    timeout(fn, ms) {
      const id = nextId++;
      timeouts.set(id, { fn, ms });
      return id;
    },
    clearTimeout(id) {
      timeouts.delete(id);
    },
    flushTimeouts() {
      const pending = [...timeouts.values()];
      timeouts.clear();
      pending.forEach((t) => t.fn());
    }
  };
}

test("未分配點數檢測：升級後 skillPoints > 0 判定為待分配狀態", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  assert.equal(store.state.profile.skillPoints, 0);
  let hasPending = Boolean((store.state.profile?.skillPoints > 0) || (store.state.profile?.statPoints > 0));
  assert.equal(hasPending, false);

  store.grantExperience(100);
  assert.equal(store.state.profile.level, 2);
  assert.equal(store.state.profile.skillPoints, 5);
  hasPending = Boolean((store.state.profile?.skillPoints > 0) || (store.state.profile?.statPoints > 0));
  assert.equal(hasPending, true);

  for (let i = 0; i < 5; i++) {
    store.allocateStat("damage");
  }
  assert.equal(store.state.profile.skillPoints, 0);
  hasPending = Boolean((store.state.profile?.skillPoints > 0) || (store.state.profile?.statPoints > 0));
  assert.equal(hasPending, false);
});

test("戰鬥回合倒數時間戳持久化：restore 恢復精確剩餘時間而不重置", () => {
  const bus = new EventBus();
  const store = new GameStore(bus, new MemoryPersistence());
  const battle = new BattleSystem(bus, store);

  const remainingMs = 1800;
  const simulatedSavedState = {
    active: true,
    stage: STAGES[0],
    round: 3,
    playerHp: 80,
    enemyHp: 150,
    roundExpiresAt: Date.now() + remainingMs,
    countdownRemainingMs: remainingMs
  };

  const restored = battle.restore(simulatedSavedState);
  assert.equal(restored, true);
  assert.equal(battle.state.round, 3);
  assert.equal(battle.state.countdown, 2);
});

test("QTE 鍵盤輸入實體鍵位解析與 Windows 輸入法 (Process) 防卡鍵相容", () => {
  const input = new QTEKeyboardInput(directionFromKey);
  const imeResult = input.keyDown("Process", "up", false, "KeyW");
  assert.equal(imeResult.handled, true);
  assert.equal(imeResult.direction, "up");

  const shiftResult = input.keyDown("W", "up", false, "KeyW");
  assert.equal(shiftResult.handled, true);
  assert.equal(shiftResult.direction, "up");
});

test("QTE 無效按鍵（如 F, Space, J）嚴格判定為 invalid 並計入錯誤懲罰", () => {
  const input = new QTEKeyboardInput(directionFromKey);
  assert.equal(isUnmappedActionKey("f", "KeyF"), true);
  assert.equal(isUnmappedActionKey(" ", "Space"), true);
  assert.equal(isUnmappedActionKey("Shift", "ShiftLeft"), false);

  const wrongKeyResult = input.keyDown("f", "up", false, "KeyF");
  assert.equal(wrongKeyResult.handled, true);
  assert.equal(wrongKeyResult.direction, "invalid");

  const shiftOnlyResult = input.keyDown("Shift", "up", false, "ShiftLeft");
  assert.equal(shiftOnlyResult.handled, false);
  assert.equal(shiftOnlyResult.direction, null);
});

test("QTESystem 接收到 invalid 鍵時觸發 qte:wrong 並在容錯次數耗盡時判定失敗", () => {
  const bus = new EventBus();
  const timers = createMockTimers();
  const qte = new QTESystem(bus, timers);

  let wrongEvents = [];
  let finishEvent = null;
  bus.on("qte:wrong", (e) => wrongEvents.push(e));
  bus.on("qte:finished", (e) => (finishEvent = e));

  qte.start({ length: 5, maxErrors: 2, durationMs: 7000 });
  assert.equal(qte.active, true);
  assert.equal(qte.errors, 0);

  qte.input("invalid");
  assert.equal(qte.errors, 1);
  assert.equal(wrongEvents.length, 1);
  assert.equal(wrongEvents[0].received, "invalid");
  assert.equal(qte.active, true);

  qte.input("invalid");
  assert.equal(qte.errors, 2);
  assert.equal(wrongEvents.length, 2);
  assert.equal(qte.active, false);
  assert.equal(finishEvent?.success, false);
});

test("DualQTESystem 雙手模式無效按鍵與各自容錯獨立判定", () => {
  const bus = new EventBus();
  const timers = createMockTimers();
  const dualQte = new DualQTESystem(bus, timers);

  let slotFailedEvents = [];
  bus.on("qte:slot-failed", (e) => slotFailedEvents.push(e));

  dualQte.start({ length: 5, maxErrors: 1, durationMs: 7000 });
  assert.equal(dualQte.active, true);

  dualQte.inputSlot("left", "invalid");
  assert.equal(dualQte.left.completed, true);
  assert.equal(dualQte.left.success, false);
  assert.equal(slotFailedEvents.length, 1);
  assert.equal(slotFailedEvents[0].slot, "left");

  assert.equal(dualQte.right.completed, false);
});
