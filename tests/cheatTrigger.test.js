import test from "node:test";
import assert from "node:assert/strict";

test("Cheat Trigger: 4 presses within 1000ms rolling window triggers activation", () => {
  let timestamps = [];
  let modalOpened = false;

  function handleKeyPress(time) {
    timestamps = timestamps.filter((t) => time - t <= 1000);
    timestamps.push(time);
    if (timestamps.length >= 4) {
      timestamps = [];
      modalOpened = true;
    }
  }

  // 1. Slow presses (e.g. 400ms interval -> 0, 400, 800, 1200)
  // At 1200, 0 is filtered out -> length is 3 -> modal NOT opened
  handleKeyPress(0);
  handleKeyPress(400);
  handleKeyPress(800);
  assert.equal(modalOpened, false);
  handleKeyPress(1200);
  assert.equal(modalOpened, false, "Slow presses should not trigger modal");

  // 2. Fast 4 presses within 1000ms (e.g. 2000, 2150, 2300, 2450)
  handleKeyPress(2000);
  handleKeyPress(2150);
  handleKeyPress(2300);
  assert.equal(modalOpened, false);
  handleKeyPress(2450);
  assert.equal(modalOpened, true, "Fast 4 presses within 1s should trigger modal");
});
