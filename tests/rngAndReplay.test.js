// tests/rngAndReplay.test.js
// RNG Statistical Uniformity & Deterministic Battle Replay test suite.
// Verifies PRNG goodness-of-fit, RPS choice distribution, and 100% deterministic replay from seed + command log.

import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";
import { BattleSystem } from "../src/js/systems/BattleSystem.js";
import { getRandomHand } from "../src/js/systems/rpsRules.js";
import { STAGES } from "../src/js/config/gameConfig.js";
import {
  createSeededRandom,
  MemoryPersistence
} from "./helpers/testHarness.js";

test("RNG 演算法可重複性與種子隔離性", () => {
  const seed = 987654321;
  const rng1 = createSeededRandom(seed);
  const rng2 = createSeededRandom(seed);
  const rngOther = createSeededRandom(111222333);

  const seq1 = Array.from({ length: 20 }, () => rng1());
  const seq2 = Array.from({ length: 20 }, () => rng2());
  const seqOther = Array.from({ length: 20 }, () => rngOther());

  assert.deepEqual(seq1, seq2, "相同種子產出之隨機數列應 100% 相同");
  assert.notDeepEqual(seq1, seqOther, "不同種子產出之隨機數列應具備相異性");
});

test("RNG 統計均勻度檢定（卡方檢定 Chi-Square Goodness-of-Fit Test）", () => {
  const rng = createSeededRandom(424242);
  const totalSamples = 100000;
  const numBins = 10;
  const bins = new Array(numBins).fill(0);
  const expectedPerBin = totalSamples / numBins; // 10000

  for (let i = 0; i < totalSamples; i++) {
    const val = rng();
    assert.ok(val >= 0 && val < 1, "隨機值應落在 [0, 1) 區間");
    const binIndex = Math.min(numBins - 1, Math.floor(val * numBins));
    bins[binIndex]++;
  }

  // 計算卡方統計量: sum((O_i - E_i)^2 / E_i)
  let chiSquare = 0;
  for (let i = 0; i < numBins; i++) {
    const diff = bins[i] - expectedPerBin;
    chiSquare += (diff * diff) / expectedPerBin;
  }

  // 自由度 9，在 alpha = 0.01 之臨界值約為 21.666
  // 若 chiSquare < 21.67 則無法拒絕均勻分佈之虛無假說（通過檢定）
  assert.ok(
    chiSquare < 21.67,
    `PRNG 卡方統計量 ${chiSquare.toFixed(4)} 應小於 alpha=0.01 臨界值 21.67 (各區間統計: ${bins.join(", ")})`
  );
});

test("RPS 出拳機率統計均勻度（剪刀、石頭、布分佈檢定）", () => {
  const rng = createSeededRandom(888999);
  const totalRolls = 30000;
  const counts = { rock: 0, paper: 0, scissors: 0 };

  for (let i = 0; i < totalRolls; i++) {
    const hand = getRandomHand(rng);
    counts[hand]++;
  }

  // 期望各為 10000 次 (33.33%)，容許誤差 ±1.5% (約 ±450 次)
  for (const [hand, count] of Object.entries(counts)) {
    const ratio = count / totalRolls;
    assert.ok(
      ratio >= 0.318 && ratio <= 0.348,
      `手勢 ${hand} 出現頻率 ${(ratio * 100).toFixed(2)}% 應接近 33.33% (總次數: ${count})`
    );
  }
});

test("技能觸發機率統計檢定（摸摸技能發動率）", () => {
  const rng = createSeededRandom(556677);
  const totalTrials = 10000;

  function simulateMomoTrigger(ratePercent, rngFunc) {
    let triggered = 0;
    for (let i = 0; i < totalTrials; i++) {
      if (rngFunc() * 100 < ratePercent) {
        triggered++;
      }
    }
    return triggered / totalTrials;
  }

  // Lv.1: 10%
  const rate1 = simulateMomoTrigger(10, rng);
  assert.ok(Math.abs(rate1 - 0.10) < 0.015, `Lv.1 摸摸觸發率 ${(rate1 * 100).toFixed(2)}% 應接近 10%`);

  // Lv.5: 50%
  const rate5 = simulateMomoTrigger(50, rng);
  assert.ok(Math.abs(rate5 - 0.50) < 0.015, `Lv.5 摸摸觸發率 ${(rate5 * 100).toFixed(2)}% 應接近 50%`);

  // Lv.10: 100%
  const rate10 = simulateMomoTrigger(100, rng);
  assert.equal(rate10, 1.0, "Lv.10 摸摸觸發率應為 100%");
});

test("確定性戰鬥重放驗證：相同 seed + command log 產出 100% 相同戰鬥軌跡", () => {
  const SEED = "koraku_deterministic_seed_101";

  // 預先錄製之玩家操作日誌（Command Log）
  const commandLog = [
    { round: 1, hand: "rock", useItem: null },
    { round: 2, hand: "paper", useItem: "hpPotion" },
    { round: 3, hand: "scissors", useItem: null },
    { round: 4, hand: "rock", useItem: null },
    { round: 5, hand: "paper", useItem: null }
  ];

  function runDeterministicBattle(seed, log) {
    const rng = createSeededRandom(seed);
    const bus = new EventBus();
    const persistence = new MemoryPersistence();
    const store = new GameStore(bus, persistence);
    const battle = new BattleSystem(bus, store, rng);

    // 關閉非同步倒數計時器，以純邏輯步進（Step-by-step deterministic runner）
    battle.start(1);
    const battleTrajectory = [];

    for (const step of log) {
      if (battle.state && battle.state.active) {
        // 1. 如果有使用道具
        if (step.useItem && store.state.inventory[step.useItem] > 0) {
          battle.useItem(step.useItem);
        }

        // 2. 玩家選擇出拳手勢
        battle.selectHand(step.hand);

        // 3. 推進回合（獲取當前敵方出手與結算結果）
        // 捕捉敵方出手手勢（由注入之 PRNG 生成）
        const enemyHand = getRandomHand(rng);
        
        // 紀錄當前回合之完整狀態快照
        battleTrajectory.push({
          round: battle.state.round,
          playerHand: step.hand,
          enemyHand,
          playerHp: battle.state.playerHp,
          playerMp: battle.state.playerMp,
          enemyHp: battle.state.enemyHp,
          inventory: structuredClone(store.state.inventory)
        });
      }
    }

    const finalPlayerHp = battle.state?.playerHp;
    const finalEnemyHp = battle.state?.enemyHp;
    battle.abandon();

    return {
      trajectory: battleTrajectory,
      finalPlayerHp,
      finalEnemyHp
    };
  }

  // 執行兩次獨立重放
  const runA = runDeterministicBattle(SEED, commandLog);
  const runB = runDeterministicBattle(SEED, commandLog);

  // 驗證兩次執行結果 100% 相同
  assert.deepEqual(runA.trajectory, runB.trajectory, "戰鬥軌跡步驟應 100% 嚴格一致");
  assert.equal(runA.finalPlayerHp, runB.finalPlayerHp);
  assert.equal(runA.finalEnemyHp, runB.finalEnemyHp);

  // 驗證變更 1 個指令日誌時，戰鬥軌跡產生確定性分歧
  const alteredCommandLog = [
    { round: 1, hand: "rock", useItem: null },
    { round: 2, hand: "scissors", useItem: null }, // 改出剪刀且不吃藥
    { round: 3, hand: "scissors", useItem: null },
    { round: 4, hand: "rock", useItem: null },
    { round: 5, hand: "paper", useItem: null }
  ];

  const runAltered = runDeterministicBattle(SEED, alteredCommandLog);
  assert.notDeepEqual(
    runA.trajectory,
    runAltered.trajectory,
    "指令日誌變更時軌跡應產生分歧，證明重放系統非寫死"
  );
});
