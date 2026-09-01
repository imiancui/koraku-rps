import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { TimerRegistry } from "../src/js/core/TimerRegistry.js";
import { DualQTESystem } from "../src/js/systems/QTESystem.js";
import {
  arrowDirectionFromKey,
  QTEKeyboardInput,
  wasdDirectionFromKey
} from "../src/js/systems/QTEInputSystem.js";

test("DualQTESystem 同時維護左右兩組序列且共用計時", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const dualQte = new DualQTESystem(bus, timers);

  dualQte.start({ length: 5, durationMs: 6000, maxErrors: 1 });
  assert.equal(dualQte.active, true);
  assert.equal(dualQte.left.sequence.length, 5);
  assert.equal(dualQte.right.sequence.length, 5);

  const snapshot = dualQte.snapshot();
  assert.equal(snapshot.mode, "dual");
  assert.equal(snapshot.left.index, 0);
  assert.equal(snapshot.right.index, 0);
  assert.ok(snapshot.remainingMs > 0);

  dualQte.stop();
  timers.clearAll();
});

test("DualQTESystem 左側輸入推進左序列、右側輸入推進右序列且觸發 slot-success", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const dualQte = new DualQTESystem(bus, timers);

  const slotSuccesses = [];
  bus.on("qte:slot-success", (data) => slotSuccesses.push(data));

  dualQte.start({ length: 2, durationMs: 10000, maxErrors: 1 });
  // Manually fix sequences for deterministic testing
  dualQte.left.sequence = ["up", "down"];
  dualQte.right.sequence = ["left", "right"];

  // Input left first
  const ok1 = dualQte.inputLeft("up");
  assert.equal(ok1, true);
  assert.equal(dualQte.left.index, 1);
  assert.equal(dualQte.right.index, 0);

  // Complete left
  const ok2 = dualQte.inputLeft("down");
  assert.equal(ok2, true);
  assert.equal(dualQte.left.completed, true);
  assert.equal(dualQte.left.success, true);
  assert.equal(slotSuccesses.length, 1);
  assert.equal(slotSuccesses[0].slot, "left");

  // QTE is still active because right is pending
  assert.equal(dualQte.active, true);

  // Input and complete right
  dualQte.inputRight("left");
  dualQte.inputRight("right");
  assert.equal(dualQte.right.completed, true);
  assert.equal(dualQte.right.success, true);
  assert.equal(slotSuccesses.length, 2);
  assert.equal(slotSuccesses[1].slot, "right");

  // All completed, dualQte finishes automatically
  assert.equal(dualQte.active, false);

  dualQte.stop();
  timers.clearAll();
});

test("DualQTESystem 的 left/right 方向不會被誤判為 slot", () => {
  const dualQte = new DualQTESystem(new EventBus(), new TimerRegistry());
  dualQte.start({ length: 1, durationMs: 10000, maxErrors: 1 });
  dualQte.left.sequence = ["right"];
  dualQte.right.sequence = ["left"];

  assert.equal(dualQte.input("right", "left"), true);
  assert.equal(dualQte.left.index, 1);
  assert.equal(dualQte.input("left", "right"), true);
  assert.equal(dualQte.right.index, 1);
});

test("WASD 與 方向鍵分流按鍵獨立運作", () => {
  assert.equal(wasdDirectionFromKey("w"), "up");
  assert.equal(wasdDirectionFromKey("A"), "left");
  assert.equal(wasdDirectionFromKey("s"), "down");
  assert.equal(wasdDirectionFromKey("d"), "right");
  assert.equal(wasdDirectionFromKey("q"), "upLeft");
  assert.equal(wasdDirectionFromKey("ArrowUp"), null, "WASD 映射器應忽略方向鍵");

  assert.equal(arrowDirectionFromKey("ArrowUp"), "up");
  assert.equal(arrowDirectionFromKey("ArrowLeft"), "left");
  assert.equal(arrowDirectionFromKey("ArrowDown"), "down");
  assert.equal(arrowDirectionFromKey("ArrowRight"), "right");
  assert.equal(arrowDirectionFromKey("w"), null, "方向鍵映射器應忽略 WASD 鍵");

  const leftKeyboard = new QTEKeyboardInput(wasdDirectionFromKey);
  const rightKeyboard = new QTEKeyboardInput(arrowDirectionFromKey);

  // Pressing 'w' affects left only
  const leftRes = leftKeyboard.keyDown("w", "up");
  const rightRes = rightKeyboard.keyDown("w", "up");
  assert.equal(leftRes.handled, true);
  assert.equal(leftRes.direction, "up");
  assert.equal(rightRes.handled, false);
  assert.equal(rightRes.direction, null);

  // Pressing 'ArrowRight' affects right only
  const leftRes2 = leftKeyboard.keyDown("ArrowRight", "right");
  const rightRes2 = rightKeyboard.keyDown("ArrowRight", "right");
  assert.equal(leftRes2.handled, false);
  assert.equal(leftRes2.direction, null);
  assert.equal(rightRes2.handled, true);
  assert.equal(rightRes2.direction, "right");
});

test("第四關雙小樂同時猜拳：雙敗觸發雙 QTE、單敗觸發單 QTE、雙勝直接造成傷害", async () => {
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10;

  const battle = new BattleSystem(bus, store);
  battle.start(4);

  // 1. 模擬雙敗 (玩家出剪刀，雙小樂出石頭)
  battle.state.selectedHand = "scissors";
  battle.state.opponentHands = { left: "rock", right: "rock" };
  battle.state.phase = "reaction";
  battle.resolveRound();

  assert.equal(battle.state.phase, "qte", "雙敗應進入 QTE");
  assert.equal(battle.state.isDualQte, true, "雙敗應啟動雙 QTE 模式");
  assert.equal(battle.dualQte.active, true, "DualQTESystem 應為啟動狀態");

  // 完成左側
  battle.handleDualQteSlotSuccess("left");
  const leftEnemy = battle.state.enemies.find((e) => e.id === "left");
  assert.equal(leftEnemy.hp, 4900, "完成左側 QTE 應對左側小樂造成傷害 (5000 - 100 = 4900)");

  battle.dualQte.stop();

  // 2. 模擬一勝一負 (玩家出石頭，左小樂出剪刀[勝]，右小樂出布[負])
  battle.state.phase = "reaction";
  battle.state.selectedHand = "rock";
  battle.state.opponentHands = { left: "scissors", right: "paper" };
  battle.resolveRound();

  assert.equal(leftEnemy.hp, 4800, "勝過左小樂應對其造成常規傷害 (4900 - 100 = 4800)");
  assert.equal(battle.state.phase, "qte", "右小樂輸了應進入 QTE");
  assert.equal(battle.state.isDualQte, false, "單敗應為單 QTE 模式");
  assert.equal(battle.state.targetEnemyId, "right", "目標應鎖定為負方的右小樂");

  battle.qte.stop();

  // 3. 模擬雙勝 (玩家出布，雙小樂出石頭)
  battle.state.phase = "reaction";
  battle.state.selectedHand = "paper";
  battle.state.opponentHands = { left: "rock", right: "rock" };
  battle.resolveRound();

  const rightEnemy = battle.state.enemies.find((e) => e.id === "right");
  assert.equal(leftEnemy.hp, 4700, "雙勝左側受到傷害 (4800 - 100 = 4700)");
  assert.equal(rightEnemy.hp, 4900, "雙勝右側受到傷害 (5000 - 100 = 4900)");
  assert.equal(battle.state.phase, "result", "雙勝直接進入結算階段");

  battle.abandon();
});

test("QTE 與 DualQTESystem 成功輸入發送 qte:step 與 qteSuccess 音效，按錯發送 qteWrong，失敗發送 qteFail", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const dualQte = new DualQTESystem(bus, timers);

  const sounds = [];
  const steps = [];
  const wrongs = [];

  bus.on("sound", (s) => sounds.push(s.name));
  bus.on("qte:step", (st) => steps.push(st));
  bus.on("qte:wrong", (w) => wrongs.push(w));

  dualQte.start({ length: 2, durationMs: 5000, maxErrors: 1 });
  dualQte.left.sequence = ["up", "down"];
  dualQte.right.sequence = ["left", "right"];

  // 1. 正確輸入
  dualQte.inputLeft("up");
  assert.equal(steps.length, 1);
  assert.equal(steps[0].directionId, "up");
  assert.equal(steps[0].slot, "left");
  assert.equal(sounds.includes("qteSuccess"), true);

  // 2. 按錯鍵
  dualQte.inputRight("up"); // expected "left"
  assert.equal(wrongs.length, 1);
  assert.equal(wrongs[0].slot, "right");
  assert.equal(wrongs[0].received, "up");
  assert.equal(sounds.includes("qteWrong"), true);

  // 3. 失敗結算
  dualQte.finish();
  assert.equal(sounds.includes("qteFail"), true);

  dualQte.stop();
  timers.clearAll();
});

test("DualQTESystem 在 maxErrors=1 時按錯單鍵立即標記該側 slot 失敗", () => {
  const bus = new EventBus();
  const timers = new TimerRegistry();
  const dualQte = new DualQTESystem(bus, timers);

  const slotFailures = [];
  bus.on("qte:slot-failed", (data) => slotFailures.push(data));

  dualQte.start({ length: 3, durationMs: 5000, maxErrors: 1 });
  dualQte.left.sequence = ["up", "down", "left"];
  dualQte.right.sequence = ["right", "up", "down"];

  // Left inputs wrong key
  const leftRes = dualQte.inputLeft("down"); // expected "up"
  assert.equal(leftRes, false);
  assert.equal(dualQte.left.errors, 1);
  assert.equal(dualQte.left.completed, true);
  assert.equal(dualQte.left.success, false);
  assert.equal(slotFailures.length, 1);
  assert.equal(slotFailures[0].slot, "left");

  // QTE is still active for right slot
  assert.equal(dualQte.active, true);

  // Right inputs wrong key too
  const rightRes = dualQte.inputRight("left"); // expected "right"
  assert.equal(rightRes, false);
  assert.equal(dualQte.right.errors, 1);
  assert.equal(dualQte.right.completed, true);
  assert.equal(dualQte.right.success, false);
  assert.equal(slotFailures.length, 2);
  assert.equal(slotFailures[1].slot, "right");

  // Both failed, dual QTE should finish automatically
  assert.equal(dualQte.active, false);

  dualQte.stop();
  timers.clearAll();
});

