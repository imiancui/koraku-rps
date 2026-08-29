import test from "node:test";
import assert from "node:assert/strict";
import { SKILLS } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("技能設定：摸摸技能 Lv.2 解鎖，共 10 級（9次升級，10%~100% 機率）", () => {
  const momo = SKILLS.momo;
  assert.equal(momo.name, "摸摸");
  assert.equal(momo.unlockLevel, 2);
  assert.equal(momo.maxLevel, 10);
  assert.equal(momo.damage, 25);
  assert.equal(momo.chancePerLevel, 0.10);
});

test("技能學習與升級邏輯：等級限制、技能點消耗與最高等級防護", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // Level 1 cannot allocate
  store.state.profile.level = 1;
  store.state.profile.skillPoints = 10;
  const res1 = store.allocateSkill("momo");
  assert.equal(res1.ok, false, "Lv. 1 不能學習摸摸");
  assert.equal(store.state.profile.skills.momo, 0);

  // Level 2 can allocate
  store.state.profile.level = 2;
  const res2 = store.allocateSkill("momo");
  assert.equal(res2.ok, true, "Lv. 2 可以學習摸摸");
  assert.equal(store.state.profile.skills.momo, 1);
  assert.equal(store.state.profile.skillPoints, 9);

  // Allocate 9 more times to reach max level 10
  for (let i = 2; i <= 10; i++) {
    const res = store.allocateSkill("momo");
    assert.equal(res.ok, true);
    assert.equal(store.state.profile.skills.momo, i);
  }

  // Already max level
  const resMax = store.allocateSkill("momo");
  assert.equal(resMax.ok, false, "滿級後不可再升級");
});

test("摸摸技能平手觸發：第 1 關小樂 0% 閃避率，必造成 25 點傷害", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10;
  store.state.profile.skills.momo = 10; // 100% proc

  const hitEvents = [];
  bus.on("battle:effect", (e) => {
    if (e.type === "enemy-hit") hitEvents.push(e);
  });

  const battle = new BattleSystem(bus, store, () => 0.0);
  battle.start(1);
  const hpBefore = battle.state.enemyHp;

  battle.resolveDraw();

  assert.equal(battle.state.enemyHp, hpBefore - 25, "第 1 關平手摸摸扣除小樂 25 HP");
  assert.ok(hitEvents.some((e) => e.skill === "momo"), "應發送摸摸技能受擊效果");
  battle.abandon();
});

test("小樂閃避摸摸：第 2 關 11%、第 3 關 33%、第 4 關 66% 閃避率（不閃避常規出拳）", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10;
  store.state.profile.skills.momo = 10;

  // Test Stage 2: 11% dodge rate
  {
    const dodgeEvents = [];
    bus.on("battle:effect", (e) => {
      if (e.type === "enemy-dodge") dodgeEvents.push(e);
    });

    // Random generator returning 0.05 (< 0.11 -> dodge)
    const battleDodge = new BattleSystem(bus, store, () => 0.05);
    battleDodge.start(2);
    const hpBefore = battleDodge.state.enemyHp;
    battleDodge.resolveDraw();
    assert.equal(battleDodge.state.enemyHp, hpBefore, "小樂閃避摸摸時不應受傷");
    assert.ok(dodgeEvents.some((e) => e.type === "enemy-dodge" && e.skill === "momo"), "應發送 enemy-dodge 效果");
    battleDodge.abandon();

    // Random generator returning 0.15 (> 0.11 -> not dodged)
    const battleHit = new BattleSystem(bus, store, () => 0.15);
    battleHit.start(2);
    const hpBeforeHit = battleHit.state.enemyHp;
    battleHit.resolveDraw();
    assert.equal(battleHit.state.enemyHp, hpBeforeHit - 25, "小樂未閃避時應受 25 點傷害");
    battleHit.abandon();
  }

  // Test Stage 3: 33% dodge rate
  {
    // Random 0.20 (< 0.33 -> dodge)
    const battle3Dodge = new BattleSystem(bus, store, () => 0.20);
    battle3Dodge.start(3);
    const hpBefore = battle3Dodge.state.enemyHp;
    battle3Dodge.resolveDraw();
    assert.equal(battle3Dodge.state.enemyHp, hpBefore, "Stage 3 命中 33% 閃避率應閃避");
    battle3Dodge.abandon();

    // Random 0.40 (> 0.33 -> hit)
    const battle3Hit = new BattleSystem(bus, store, () => 0.40);
    battle3Hit.start(3);
    const hpBeforeHit = battle3Hit.state.enemyHp;
    battle3Hit.resolveDraw();
    assert.equal(battle3Hit.state.enemyHp, hpBeforeHit - 25, "Stage 3 未命中閃避率應受傷");
    battle3Hit.abandon();
  }

  // Test Stage 4: 66% dodge rate & regular punches are NOT dodged
  {
    // Random 0.50 (< 0.66 -> dodge momo)
    const battle4Momo = new BattleSystem(bus, store, () => 0.50);
    battle4Momo.start(4);
    const hpBefore = battle4Momo.state.enemyHp;
    battle4Momo.resolveDraw();
    assert.equal(battle4Momo.state.enemyHp, hpBefore, "Stage 4 命中 66% 閃避率應閃避摸摸");

    // Regular punch (damageEnemy) MUST NOT dodge
    battle4Momo.damageEnemy("贏了！");
    assert.equal(battle4Momo.state.enemyHp, hpBefore - store.snapshot().playerStats.damage, "常規出拳不可被閃避");
    battle4Momo.abandon();
  }
});

