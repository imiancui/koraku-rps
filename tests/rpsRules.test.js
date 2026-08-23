import test from "node:test";
import assert from "node:assert/strict";
import {
  compareHands,
  getCounterHand,
  getQteCounterNarration
} from "../src/js/systems/rpsRules.js";
import {
  combineCardinalDirections,
  directionFromKey,
  QTEKeyboardInput
} from "../src/js/systems/QTEInputSystem.js";

test("猜拳的九種組合判定正確", () => {
  const expected = {
    "rock:rock": "draw",
    "rock:paper": "loss",
    "rock:scissors": "win",
    "paper:rock": "win",
    "paper:paper": "draw",
    "paper:scissors": "loss",
    "scissors:rock": "loss",
    "scissors:paper": "win",
    "scissors:scissors": "draw"
  };

  Object.entries(expected).forEach(([pair, result]) => {
    const [player, opponent] = pair.split(":");
    assert.equal(compareHands(player, opponent), result);
  });
});

test("變拳總會回傳能克制對手的手勢", () => {
  ["rock", "paper", "scissors"].forEach((opponent) => {
    assert.equal(compareHands(getCounterHand(opponent), opponent), "win");
  });
});

test("QTE 三種敗勢使用指定反制敘事", () => {
  assert.match(getQteCounterNarration("paper").text, /用手包裹住小樂的剪刀手/);
  assert.match(getQteCounterNarration("scissors").text, /用布握住了小樂的小拳頭/);
  assert.match(getQteCounterNarration("rock").text, /用五指交扣了小樂的軟綿綿小手手/);
  assert.equal(getQteCounterNarration("rock").changedHand, "paper");
});

test("鍵盤涵蓋八方向與方向鍵", () => {
  assert.equal(directionFromKey("q"), "upLeft");
  assert.equal(directionFromKey("W"), "up");
  assert.equal(directionFromKey("e"), "upRight");
  assert.equal(directionFromKey("ArrowLeft"), "left");
  assert.equal(directionFromKey("ArrowRight"), "right");
  assert.equal(directionFromKey("z"), "downLeft");
  assert.equal(directionFromKey("ArrowDown"), "down");
  assert.equal(directionFromKey("c"), "downRight");
});

test("兩個正方向鍵會合成斜向輸入", () => {
  assert.equal(combineCardinalDirections(["up", "right"]), "upRight");
  assert.equal(combineCardinalDirections(["up", "left"]), "upLeft");
  assert.equal(combineCardinalDirections(["down", "right"]), "downRight");
  assert.equal(combineCardinalDirections(["down", "left"]), "downLeft");
});

test("右上 QTE 可由上與右依序按住完成", () => {
  const keyboard = new QTEKeyboardInput();
  assert.deepEqual(keyboard.keyDown("ArrowUp", "upRight"), {
    handled: true,
    direction: null
  });
  assert.deepEqual(keyboard.keyDown("ArrowRight", "upRight"), {
    handled: true,
    direction: "upRight"
  });

  keyboard.reset();
  assert.equal(keyboard.keyDown("w", "upRight").direction, null);
  assert.equal(keyboard.keyDown("d", "upRight").direction, "upRight");
});
