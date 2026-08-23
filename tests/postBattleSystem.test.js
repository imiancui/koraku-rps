import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { STAGES } from "../src/js/config/gameConfig.js";
import { PostBattleSystem } from "../src/js/systems/PostBattleSystem.js";

const battleResult = () => ({
  won: true,
  stage: STAGES[0],
  reward: { coins: 100, xp: 150, levelsGained: 1 }
});

test("切西瓜固定三刀，成功每刀結算 100 額外經驗", () => {
  const granted = [];
  const store = {
    grantExperience(amount) {
      granted.push(amount);
      return { xp: amount, levelsGained: 0 };
    }
  };
  const system = new PostBattleSystem(new EventBus(), store, () => 0.5);
  system.open(battleResult());
  system.requestSwimsuit();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    system.startWatermelon();
    system.state.strikeStartedAt = performance.now() - 450;
    system.strike();
  }

  assert.equal(system.state.scene, "watermelonComplete");
  assert.equal(system.state.watermelon.attempts, 3);
  assert.equal(system.state.watermelon.successes, 3);
  assert.equal(system.state.watermelon.rewardXp, 300);
  assert.deepEqual(granted, [300]);
});

test("三刀皆失敗也會結束，且不給額外經驗", () => {
  const granted = [];
  const store = {
    grantExperience(amount) {
      granted.push(amount);
      return { xp: amount, levelsGained: 0 };
    }
  };
  const system = new PostBattleSystem(new EventBus(), store, () => 0.5);
  system.open(battleResult());
  system.requestSwimsuit();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    system.startWatermelon();
    system.strike();
  }

  assert.equal(system.state.scene, "watermelonComplete");
  assert.equal(system.state.watermelon.attempts, 3);
  assert.equal(system.state.watermelon.successes, 0);
  assert.equal(system.state.watermelon.rewardXp, 0);
  assert.deepEqual(granted, [0]);
});
