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
    system.state.target = 0.5;
    system.state.strikeStartedAt = performance.now() - (system.state.strikeDuration / 4);
    system.strike();
  }

  assert.equal(system.state.scene, "watermelonComplete");
  assert.equal(system.state.watermelon.attempts, 3);
  assert.equal(system.state.watermelon.successes, 3);
  assert.equal(system.state.watermelon.rewardXp, 300);
  assert.deepEqual(granted, [300]);
});

test("切西瓜每成功一次，下一刀綠色安全範圍縮小 50%、速度增加 25%", () => {
  const store = {
    grantExperience(amount) {
      return { xp: amount, levelsGained: 0 };
    }
  };
  const system = new PostBattleSystem(new EventBus(), store, () => 0.5);
  system.open(battleResult());
  system.requestSwimsuit();

  // Knife 1: initial
  system.startWatermelon();
  assert.equal(system.state.tolerance, 0.13, "第 1 刀初始公差半徑應為 0.13");
  assert.equal(system.state.strikeDuration, 1800, "第 1 刀初始週期應為 1800ms");

  // Force hit on knife 1
  system.state.target = 0.5;
  system.state.strikeStartedAt = performance.now() - (system.state.strikeDuration / 4); // marker at 0.5
  system.strike();
  assert.equal(system.state.watermelon.successes, 1);

  // Knife 2: after 1 success
  system.startWatermelon();
  assert.equal(system.state.tolerance, 0.065, "第 2 刀安全範圍縮小 50% (0.065)");
  assert.equal(system.state.strikeDuration, 1440, "第 2 刀速度增加 25% (週期 1440ms)");

  // Force hit on knife 2
  system.state.target = 0.5;
  system.state.strikeStartedAt = performance.now() - (system.state.strikeDuration / 4); // marker at 0.5
  system.strike();
  assert.equal(system.state.watermelon.successes, 2);

  // Knife 3: after 2 successes
  system.startWatermelon();
  assert.equal(system.state.tolerance, 0.0325, "第 3 刀安全範圍再次縮小 50% (0.0325)");
  assert.equal(system.state.strikeDuration, 1152, "第 3 刀速度再次增加 25% (週期 1152ms)");
});

