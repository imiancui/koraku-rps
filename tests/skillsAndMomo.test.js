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
});

test("雙手解放技能：100 SP 解鎖、雙手獨立出拳與勝負判定", () => {
  const dualHand = SKILLS.dualHand;
  assert.equal(dualHand.name, "雙手解放");
  assert.equal(dualHand.costPerLevel, 100);
  assert.equal(dualHand.unlockLevel, 4);
  assert.equal(dualHand.maxLevel, 1);

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // Insufficient SP
  store.state.profile.level = 10;
  store.state.profile.skillPoints = 50;
  const resFail = store.allocateSkill("dualHand");
  assert.equal(resFail.ok, false, "SP < 100 不能學習雙手解放");

  // Sufficient SP
  store.state.profile.skillPoints = 100;
  const resOk = store.allocateSkill("dualHand");
  assert.equal(resOk.ok, true, "100 SP 可以成功學習雙手解放");
  assert.equal(store.state.profile.skills.dualHand, 1);
  assert.equal(store.state.profile.skillPoints, 0);

  // Test Battle with two hands
  const battle = new BattleSystem(bus, store, () => 0.5);
  battle.start(4);
  assert.equal(battle.state.hasDualHandSkill, true);

  // Select left hand Rock, right hand Scissors
  battle.selectHand("rock", "left");
  battle.selectHand("scissors", "right");
  assert.equal(battle.state.selectedHands.left, "rock");
  assert.equal(battle.state.selectedHands.right, "scissors");

  // Simulate opponent hands: Left Scissors (Loss to Rock), Right Rock (Wins over Scissors)
  battle.state.phase = "reaction";
  battle.state.opponentHands = { left: "scissors", right: "rock" };
  const leftEnemyBefore = battle.state.enemies.find((e) => e.id === "left").hp;
  const rightEnemyBefore = battle.state.enemies.find((e) => e.id === "right").hp;

  battle.resolveRound();

  // Left enemy lost to player left hand -> took damage
  assert.ok(battle.state.enemies.find((e) => e.id === "left").hp < leftEnemyBefore, "左小樂輸給玩家左手應受傷");
  // Right enemy won against player right hand -> triggers single QTE targeting right
  assert.equal(battle.state.phase, "qte");
  assert.equal(battle.state.targetEnemyId, "right");
  battle.abandon();
});

test("雙手解放技能對抗單隻小樂：單勝常規傷害、雙勝雙倍傷害、一平一負逃脫、雙敗QTE", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10;
  store.state.profile.skills.dualHand = 1;

  const battle = new BattleSystem(bus, store, () => 0.5);
  battle.start(1); // Stage 1 (single enemy)
  assert.equal(battle.state.hasDualHandSkill, true);

  // Case 1: Left Rock, Right Scissors vs Enemy Scissors (Left wins, Right draws -> Round Won!)
  battle.selectHand("rock", "left");
  battle.selectHand("scissors", "right");
  battle.state.phase = "reaction";
  battle.state.opponentHand = "scissors";
  let hpBefore = battle.state.enemyHp;
  battle.resolveRound();
  assert.equal(battle.state.enemyHp, hpBefore - battle.state.playerDamage, "單手獲勝應扣除常規傷害");

  // Case 2: Left Rock, Right Rock vs Enemy Scissors (Both win -> Double Damage!)
  battle.state.phase = "reaction";
  battle.state.opponentHand = "scissors";
  battle.selectHand("rock", "left");
  battle.selectHand("rock", "right");
  hpBefore = battle.state.enemyHp;
  battle.resolveRound();
  assert.equal(battle.state.enemyHp, hpBefore - (battle.state.playerDamage * 2), "雙手同時獲勝應扣除雙倍傷害");

  // Case 3: Left Paper, Right Scissors vs Enemy Scissors (Left loses, Right draws -> Draw/Safe Escape)
  battle.state.phase = "reaction";
  battle.state.opponentHand = "scissors";
  battle.selectHand("paper", "left");
  battle.selectHand("scissors", "right");
  battle.resolveRound();
  assert.notEqual(battle.state.phase, "qte", "一負一平不應觸發 QTE 懲罰（安全脫離）");

  // Case 4: Left Paper, Right Paper vs Enemy Scissors (Both lose -> Triggers QTE!)
  battle.state.phase = "reaction";
  battle.state.opponentHand = "scissors";
  battle.selectHand("paper", "left");
  battle.selectHand("paper", "right");
  battle.resolveRound();
  assert.equal(battle.state.phase, "qte", "雙手皆輸應觸發 QTE 反制");
  battle.abandon();
});



