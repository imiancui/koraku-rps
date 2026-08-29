import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { HANDS } from "../src/js/config/gameConfig.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("1秒看清階段與小樂獲勝巨型 Emoji 警告", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  // deterministic random: index 1 in [rock, paper, scissors] is paper
  const battle = new BattleSystem(bus, store, () => 0.4);

  battle.start(1);
  battle.selectHand("rock"); // Player rock vs Koraku paper => Koraku wins
  battle.revealHands();

  assert.equal(battle.state.phase, "reaction", "亮拳後進入 reaction 看清階段");
  assert.equal(battle.state.enemyWinningEmoji, HANDS.paper.glyph, "小樂獲勝應在中央設定出拳 Emoji 警告 (✋)");

  battle.abandon();
});

test("時機變拳機制：僅在 reaction 窗口生效、消耗 25 MP、進入 2 秒手動選擇窗口", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, () => 0.4);

  battle.start(1);
  // Before reveal: phase is countdown, morph not allowed
  const earlyMorph = battle.useMorph();
  assert.equal(earlyMorph.ok, false, "倒數階段不可變拳");

  // Reveal hands: player rock vs Koraku paper
  battle.selectHand("rock");
  battle.revealHands();
  assert.equal(battle.state.phase, "reaction");
  assert.equal(battle.state.enemyWinningEmoji, HANDS.paper.glyph);

  // Use morph in reaction phase
  const morphRes = battle.useMorph();
  assert.equal(morphRes.ok, true, "反應窗口內發動變拳成功");
  assert.equal(battle.state.morphActive, true, "應進入 morphActive 狀態");
  assert.equal(battle.state.morphUsed, true, "記錄 morphUsed 標記");
  assert.equal(battle.state.playerMp, 25, "扣除 25 MP");
  assert.equal(battle.state.enemyWinningEmoji, null, "變拳後清除敵方獲勝 Emoji");
  assert.equal(battle.state.reactionRemaining, 2.0, "倒數計時重設為 2 秒");

  // Cannot double-activate morph while already morphActive
  const secondMorph = battle.useMorph();
  assert.equal(secondMorph.ok, false, "已發動變拳時不可重複發動");

  // 1. 手動按下克制手勢 (scissors vs paper)
  battle.selectHand("scissors");
  assert.equal(battle.state.phase, "result", "手動選拳後立即結算");
  assert.equal(battle.state.lastResult, "win", "克制對手應獲勝");
  assert.equal(battle.state.enemyHp, 1000 - battle.state.playerDamage, "小樂應受到傷害");
  assert.equal(store.snapshot().records.morphUses, 1, "變拳勝利應累計記錄 morphUses");

  battle.abandon();
});

test("變拳手動選擇：選錯手勢（輸拳）判定為輸拳並進入 QTE", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  // deterministic random: Koraku plays paper (index 1)
  const battle = new BattleSystem(bus, store, () => 0.4);

  battle.start(1);
  battle.selectHand("scissors"); // originally scissors
  battle.revealHands(); // Koraku plays paper

  const morphRes = battle.useMorph();
  assert.equal(morphRes.ok, true);
  assert.equal(battle.state.morphActive, true);

  // Player makes a mistake and presses rock (rock loses to paper)
  battle.selectHand("rock");
  assert.equal(battle.state.phase, "qte", "選錯輸拳應進入 QTE 反制階段");

  battle.abandon();
});

test("變拳手動選擇：選擇平手手勢觸發摸摸技能發動率計算", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  // Level up to give player momo skill Lv.10 (100% proc rate)
  store.cheatSetValues({ level: 5, skills: { momo: 10 } });

  // deterministic random: Koraku plays paper (index 1)
  let callCount = 0;
  const battle = new BattleSystem(bus, store, () => {
    callCount++;
    if (callCount === 1) return 0.4; // Koraku hand: paper
    return 0.05; // Momo proc (< 1.0) & not dodged (< 0.0 is false)
  });

  battle.start(1);
  battle.selectHand("rock");
  battle.revealHands(); // Koraku plays paper

  const morphRes = battle.useMorph();
  assert.equal(morphRes.ok, true);

  // Player chooses paper (draw vs paper)
  battle.selectHand("paper");
  assert.equal(battle.state.phase, "result");
  assert.equal(battle.state.lastResult, "draw", "同手勢應判定為平手");
  // 1000 - 25 = 975
  assert.equal(battle.state.enemyHp, 975, "平手摸摸成功造成 25 點傷害");

  battle.abandon();
});

test("變拳手動選擇：2 秒逾時未選拳自動以當前手勢結算", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store, () => 0.4);

  battle.start(1);
  battle.selectHand("rock"); // player rock vs Koraku paper => loss
  battle.revealHands();

  battle.useMorph();
  assert.equal(battle.state.morphActive, true);
  assert.equal(battle.state.selectedHand, "rock", "變拳不再自動替換玩家手勢");

  // When timeout triggers resolveRound():
  battle.resolveRound();
  assert.equal(battle.state.morphActive, false);
  // rock loses to paper => QTE
  assert.equal(battle.state.phase, "qte");
  battle.abandon();
});
