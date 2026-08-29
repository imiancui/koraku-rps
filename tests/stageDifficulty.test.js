import test from "node:test";
import assert from "node:assert/strict";
import { STAGES } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { QTESystem } from "../src/js/systems/QTESystem.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("第 1 關難度設定：5秒出拳、4方向QTE、按錯不懲罰", () => {
  const stage1 = STAGES.find((s) => s.id === 1);
  assert.equal(stage1.roundSeconds, 5);
  assert.equal(stage1.qteDirections, "cardinal");
  assert.equal(stage1.maxErrors, Infinity);

  const bus = new EventBus();
  const dummyTimers = { interval: () => 1, clearInterval: () => {} };
  const qte = new QTESystem(bus, dummyTimers);
  const seq = qte.generateSequence(5, "cardinal");
  const cardinalSet = new Set(["up", "down", "left", "right"]);
  assert.ok(seq.every((dir) => cardinalSet.has(dir)), "Stage 1 QTE 序列必須全部為正四方向");

  qte.start({ allowedDirections: "cardinal", maxErrors: Infinity, length: 5 });
  const correct = qte.sequence[0];
  const wrong = correct === "up" ? "down" : "up";
  assert.equal(qte.input(wrong), false);
  assert.equal(qte.input(wrong), false);
  assert.equal(qte.errors, 2);
  assert.equal(qte.active, true, "Stage 1 按錯不應導致 QTE 直接失敗");
  qte.finish(false);
});

test("第 2 關難度設定：3秒出拳、8方向QTE、按錯 2 次失敗", () => {
  const stage2 = STAGES.find((s) => s.id === 2);
  assert.equal(stage2.roundSeconds, 3);
  assert.equal(stage2.qteDirections, "all");
  assert.equal(stage2.maxErrors, 2);

  const bus = new EventBus();
  const dummyTimers = { interval: () => 1, clearInterval: () => {} };
  let finished = false;
  let finishSuccess = null;
  bus.on("qte:finished", ({ success }) => {
    finished = true;
    finishSuccess = success;
  });

  const qte = new QTESystem(bus, dummyTimers);
  qte.start({ allowedDirections: "all", maxErrors: 2, length: 5 });

  const correct = qte.sequence[0];
  const wrong = correct === "up" ? "down" : "up";

  assert.equal(qte.input(wrong), false);
  assert.equal(qte.errors, 1);
  assert.equal(qte.active, true, "錯第 1 次未達 2 次上限，不應直接失敗");

  assert.equal(qte.input(wrong), false);
  assert.equal(qte.errors, 2);
  assert.equal(finished, true, "按錯 2 次應觸發 QTE 失敗結算");
  assert.equal(finishSuccess, false);
});

test("第 3 關難度設定：3秒出拳、8方向QTE長度7、按錯 1 次失敗", () => {
  const stage3 = STAGES.find((s) => s.id === 3);
  assert.equal(stage3.roundSeconds, 3);
  assert.equal(stage3.qteDirections, "all");
  assert.equal(stage3.qteLength, 7);
  assert.equal(stage3.maxErrors, 1);

  const bus = new EventBus();
  const dummyTimers = { interval: () => 1, clearInterval: () => {} };
  let finished = false;
  let finishSuccess = null;
  bus.on("qte:finished", ({ success }) => {
    finished = true;
    finishSuccess = success;
  });

  const qte = new QTESystem(bus, dummyTimers);
  qte.start({ allowedDirections: "all", maxErrors: 1, length: 7 });
  assert.equal(qte.sequence.length, 7, "Stage 3 QTE 序列長度應為 7 (比前一關多2鍵)");

  const correct = qte.sequence[0];
  const wrong = correct === "up" ? "down" : "up";

  assert.equal(qte.input(wrong), false);
  assert.equal(finished, true, "按錯 1 次應立即失敗");
  assert.equal(finishSuccess, false);
});

test("第 4 關雙小樂雙血條：選定目標、總血量統計、受擊雙倍傷害與獨立存活判定", () => {
  const stage4 = STAGES.find((s) => s.id === 4);
  assert.equal(stage4.roundSeconds, 3);
  assert.equal(stage4.dualEnemy, true);
  assert.equal(stage4.qteLength, 7);
  assert.equal(stage4.maxErrors, 1);
  assert.equal(stage4.enemyDamageMultiplier, 2);

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10; // Unlock Stage 4
  const battle = new BattleSystem(bus, store);

  const started = battle.start(4);
  assert.equal(started, true);
  assert.equal(battle.state.enemies.length, 2);
  assert.equal(battle.state.enemies[0].id, "left");
  assert.equal(battle.state.enemies[1].id, "right");
  assert.equal(battle.state.enemyHp, 10000);
  assert.equal(battle.state.targetEnemyId, "left");

  // Switch target to right
  const switchOk = battle.selectTarget("right");
  assert.equal(switchOk, true);
  assert.equal(battle.state.targetEnemyId, "right");

  // Deal damage to right enemy
  battle.dealEnemyDamage(5000);
  const rightEnemy = battle.state.enemies.find((e) => e.id === "right");
  assert.equal(rightEnemy.hp, 0);
  assert.equal(rightEnemy.alive, false);
  assert.equal(battle.state.enemyHp, 5000, "擊倒右側小樂後總血量應為 5000");
  assert.equal(battle.state.targetEnemyId, "left", "目標死亡後應自動切換至存活的左側小樂");

  // QTE fail under 2x multiplier deals 200 damage
  battle.state.phase = "qte";
  battle.state.playerHp = 300;
  battle.resolveQte({ success: false });
  assert.equal(battle.state.playerHp, 100, "第 4 關遭受小樂 2 倍傷害 (100 * 2 = 200)");

  battle.abandon();
});

test("關卡變拳時機梯度設定：第 1 關 1 秒、第 2 關 0.75 秒、第 3 關 0.5 秒、第 4 關 0.25 秒", () => {
  const [s1, s2, s3, s4] = STAGES;
  assert.equal(s1.reactionWindowMs, 1000, "第 1 關變拳時機 1 秒");
  assert.equal(s2.reactionWindowMs, 750, "第 2 關變拳時機 0.75 秒");
  assert.equal(s3.reactionWindowMs, 500, "第 3 關變拳時機 0.5 秒");
  assert.equal(s4.reactionWindowMs, 250, "第 4 關變拳時機 0.25 秒");

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  store.state.profile.level = 10;
  const battle = new BattleSystem(bus, store, () => 0.0);

  battle.start(2);
  battle.revealHands();
  assert.equal(battle.state.reactionRemaining, 0.75, "第 2 關亮拳後初始反應時間應為 0.75 秒");
  battle.abandon();

  battle.start(4);
  battle.revealHands();
  assert.equal(battle.state.reactionRemaining, 0.25, "第 4 關亮拳後初始反應時間應為 0.25 秒");
  battle.abandon();
});

test("關卡獎勵倍率設定：第 1 關 N+N、第 2 關 1.25x、第 3 關 2x、第 4 關 8x", () => {
  const [s1, s2, s3, s4] = STAGES;
  assert.equal(s1.rewardMultiplier, 1);
  assert.equal(s1.xpWin, 150);
  assert.equal(s1.winCoins, 100);

  assert.equal(s2.rewardMultiplier, 1.25);
  assert.equal(s2.xpWin, 188);
  assert.equal(s2.winCoins, 125);

  assert.equal(s3.rewardMultiplier, 2);
  assert.equal(s3.xpWin, 300);
  assert.equal(s3.winCoins, 200);

  assert.equal(s4.rewardMultiplier, 8);
  assert.equal(s4.xpWin, 1200);
  assert.equal(s4.winCoins, 800);

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // Win on Stage 4 gives 1200 XP and 800 Star Sand
  const reward4 = store.recordBattle(true, s4);
  assert.equal(reward4.xp, 1200);
  assert.equal(reward4.coins, 800);
  assert.equal(store.snapshot().coins, 800);
});