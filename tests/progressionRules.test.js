import test from "node:test";
import assert from "node:assert/strict";
import {
  applyExperience,
  computePlayerStats,
  xpNeededForLevel
} from "../src/js/systems/progressionRules.js";

const profile = () => ({
  level: 1,
  xp: 0,
  skillPoints: 0,
  allocations: { hp: 0, mp: 0, damage: 0 }
});

test("每次升等獲得五點技能點並保留溢出經驗", () => {
  const result = applyExperience(profile(), 300);
  assert.equal(result.levelsGained, 2);
  assert.equal(result.profile.level, 3);
  assert.equal(result.profile.skillPoints, 10);
  assert.equal(result.profile.xp, 25);
});

test("升級需求按等級遞增", () => {
  assert.equal(xpNeededForLevel(1), 100);
  assert.equal(xpNeededForLevel(2), 175);
  assert.equal(xpNeededForLevel(10), 775);
});

test("能力點正確增加生命、魔力與傷害", () => {
  const upgraded = profile();
  upgraded.allocations = { hp: 3, mp: 2, damage: 4 };
  assert.deepEqual(computePlayerStats(upgraded), {
    maxHp: 130,
    maxMp: 70,
    damage: 30
  });
});
