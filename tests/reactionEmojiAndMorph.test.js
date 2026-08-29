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

  assert.equal(battle.state.phase, "reaction", "亮拳後進入 1 秒 reaction 看清階段");
  assert.equal(battle.state.enemyWinningEmoji, HANDS.paper.glyph, "小樂獲勝應在中央設定出拳 Emoji 警告 (✋)");

  battle.abandon();
});

test("時機變拳機制：僅在 reaction 窗口生效、消耗 25 MP、逆轉勝負並清除警告 Emoji", () => {
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
  assert.equal(morphRes.ok, true, "1 秒窗口內變拳成功");
  assert.equal(battle.state.selectedHand, "scissors", "手勢應變為剋制對手的剪刀");
  assert.equal(battle.state.playerMp, 25, "扣除 25 MP");
  assert.equal(battle.state.enemyWinningEmoji, null, "變拳後清除敵方獲勝 Emoji");

  battle.abandon();
});
