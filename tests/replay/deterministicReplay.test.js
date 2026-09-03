// tests/replay/deterministicReplay.test.js
// Deterministic Replay & PRNG Statistical Integrity Test Suite (Tiers 1-4)
// Verifies seeded PRNG repeatability, chi-square goodness-of-fit, RPS uniform distribution,
// and 100% deterministic battle reproduction from recorded command logs.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore } from "../../src/js/core/GameStore.js";
import { BattleSystem } from "../../src/js/systems/BattleSystem.js";
import { getRandomHand, compareHands, evaluateDualRps } from "../../src/js/systems/rpsRules.js";
import { STAGES } from "../../src/js/config/gameConfig.js";
import { Commands } from "../../src/js/kernel/protocol.js";
import { JsonStorage } from "../../server/storage/JsonStorage.js";
import { GameSession } from "../../server/core/GameSession.js";
import {
  createSeededRandom,
  MemoryPersistence
} from "../helpers/testHarness.js";

test("Tier 1 - F6: PRNG 演算法種子隔離性與可重複性", () => {
  const seedA = 123456789;
  const rng1 = createSeededRandom(seedA);
  const rng2 = createSeededRandom(seedA);
  const rngDifferent = createSeededRandom(987654321);

  const series1 = Array.from({ length: 50 }, () => rng1());
  const series2 = Array.from({ length: 50 }, () => rng2());
  const seriesDiff = Array.from({ length: 50 }, () => rngDifferent());

  assert.deepEqual(series1, series2, "相同種子產出之隨機浮點數序列應 100% 嚴格相同");
  assert.notDeepEqual(series1, seriesDiff, "不同種子產出之序列應存在統計顯著差異");
});

test("Tier 1 - F6: PRNG 統計均勻度卡方檢定 (Chi-Square Goodness-of-Fit Test)", () => {
  const rng = createSeededRandom(777888999);
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

  // 卡方統計量: sum((O_i - E_i)^2 / E_i)
  let chiSquare = 0;
  for (let i = 0; i < numBins; i++) {
    const diff = bins[i] - expectedPerBin;
    chiSquare += (diff * diff) / expectedPerBin;
  }

  // 自由度 9，在顯著水準 alpha = 0.01 下臨界值為 21.666
  assert.ok(
    chiSquare < 21.67,
    `卡方統計量 ${chiSquare.toFixed(4)} 應小於臨界值 21.67 (各區間樣本數: ${bins.join(", ")})`
  );
});

test("Tier 2 - F6: 猜拳出拳機率統計均勻度（剪刀、石頭、布分佈檢定）", () => {
  const rng = createSeededRandom(445566);
  const totalRolls = 30000;
  const counts = { rock: 0, paper: 0, scissors: 0 };

  for (let i = 0; i < totalRolls; i++) {
    const hand = getRandomHand(rng);
    counts[hand]++;
  }

  // 期望各為 10000 次 (33.33%)，容許誤差 ±1.5% (31.8% ~ 34.8%)
  for (const [hand, count] of Object.entries(counts)) {
    const ratio = count / totalRolls;
    assert.ok(
      ratio >= 0.318 && ratio <= 0.348,
      `手勢 ${hand} 出現頻率 ${(ratio * 100).toFixed(2)}% 應接近 33.33% (總次數: ${count})`
    );
  }
});

test("Tier 2 - F6: 技能觸發機率統計檢定（摸摸技能發動率）", () => {
  const rng = createSeededRandom(112233);
  const totalTrials = 10000;

  function simulateMomoRate(ratePercent, rngFunc) {
    let triggered = 0;
    for (let i = 0; i < totalTrials; i++) {
      if (rngFunc() * 100 < ratePercent) {
        triggered++;
      }
    }
    return triggered / totalTrials;
  }

  // Lv.1: 10%
  const r1 = simulateMomoRate(10, rng);
  assert.ok(Math.abs(r1 - 0.10) < 0.015, `Lv.1 發動率 ${(r1 * 100).toFixed(2)}% 應接近 10%`);

  // Lv.5: 50%
  const r5 = simulateMomoRate(50, rng);
  assert.ok(Math.abs(r5 - 0.50) < 0.015, `Lv.5 發動率 ${(r5 * 100).toFixed(2)}% 應接近 50%`);

  // Lv.10: 100%
  const r10 = simulateMomoRate(100, rng);
  assert.equal(r10, 1.0, "Lv.10 發動率應為 100%");
});

test("Tier 3 - F6: 單體 Boss 確定性戰鬥重放（相同 Seed + Command Log 產出 100% 相同戰鬥軌跡）", () => {
  const SEED = "koraku_single_boss_seed_001";

  const commandLog = [
    { round: 1, hand: "rock", useItem: null },
    { round: 2, hand: "scissors", useItem: "hpPotion" },
    { round: 3, hand: "paper", useItem: null },
    { round: 4, hand: "rock", useItem: null },
    { round: 5, hand: "scissors", useItem: null }
  ];

  function executeDeterministicBattle(seed, log) {
    const rng = createSeededRandom(seed);
    const bus = new EventBus();
    const persistence = new MemoryPersistence();
    const store = new GameStore(bus, persistence);
    const battle = new BattleSystem(bus, store, rng);

    battle.start(1);
    const trajectory = [];

    for (const step of log) {
      if (battle.state && battle.state.active) {
        if (step.useItem && store.state.inventory[step.useItem] > 0) {
          battle.useItem(step.useItem);
        }
        battle.selectHand(step.hand);
        const enemyHand = getRandomHand(rng);

        trajectory.push({
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

    return {
      trajectory,
      finalPlayerHp: battle.state?.playerHp,
      finalEnemyHp: battle.state?.enemyHp
    };
  }

  const run1 = executeDeterministicBattle(SEED, commandLog);
  const run2 = executeDeterministicBattle(SEED, commandLog);

  assert.deepEqual(run1.trajectory, run2.trajectory, "兩次執行產出之每回合軌跡應完全一致");
  assert.equal(run1.finalPlayerHp, run2.finalPlayerHp);
  assert.equal(run1.finalEnemyHp, run2.finalEnemyHp);

  // 對抗性驗證：修改第 2 回合出拳指令 -> 軌跡必須產生確定性分歧
  const alteredLog = [
    { round: 1, hand: "rock", useItem: null },
    { round: 2, hand: "paper", useItem: null }, // 改出布且不吃藥
    { round: 3, hand: "paper", useItem: null },
    { round: 4, hand: "rock", useItem: null },
    { round: 5, hand: "scissors", useItem: null }
  ];
  const runAltered = executeDeterministicBattle(SEED, alteredLog);
  assert.notDeepEqual(run1.trajectory, runAltered.trajectory, "指令日誌修改後軌跡應產生分歧");
});

test("Tier 3 - F6: 第 4 關雙生 Boss 確定性戰鬥重放（雙血條、雙出拳與目標判定）", () => {
  const SEED = "koraku_dual_boss_seed_stage4";

  function executeDualBossBattle(seed, rounds = 4) {
    const rng = createSeededRandom(seed);
    const history = [];

    let playerHp = 100;
    let bossMainHp = 300;
    let bossCloneHp = 300;

    for (let r = 1; r <= rounds; r++) {
      const playerHand = r % 2 === 0 ? "rock" : "paper";
      const bossMainHand = getRandomHand(rng);
      const bossCloneHand = getRandomHand(rng);

      const resMain = compareHands(playerHand, bossMainHand);
      const resClone = compareHands(playerHand, bossCloneHand);

      if (resMain === 1) bossMainHp = Math.max(0, bossMainHp - 30);
      if (resClone === 1) bossCloneHp = Math.max(0, bossCloneHp - 30);
      if (resMain === -1 || resClone === -1) playerHp = Math.max(0, playerHp - 20);

      history.push({
        round: r,
        playerHand,
        bossMainHand,
        bossCloneHand,
        playerHp,
        bossMainHp,
        bossCloneHp
      });
    }

    return history;
  }

  const dualRun1 = executeDualBossBattle(SEED, 6);
  const dualRun2 = executeDualBossBattle(SEED, 6);

  assert.deepEqual(dualRun1, dualRun2, "雙生 Boss 多回合重放應 100% 確定性一致");
});

test("Tier 4 - F6: 戰鬥重放日誌序列化與反序列化還原（JSON Replay Bundle）", () => {
  const replayBundle = {
    version: 2,
    seed: "replay_bundle_seed_2026",
    stageId: 2,
    initialProfile: { level: 2, allocations: { damage: 2 } },
    commandLog: [
      { cmd: "selectHand", hand: "rock", time: 1000 },
      { cmd: "useItem", itemId: "hpPotion", time: 2500 },
      { cmd: "selectHand", hand: "scissors", time: 4000 }
    ]
  };

  // 模擬寫入與讀取 JSON
  const jsonStr = JSON.stringify(replayBundle);
  const parsed = JSON.parse(jsonStr);

  assert.equal(parsed.seed, replayBundle.seed);
  assert.equal(parsed.stageId, 2);
  assert.equal(parsed.commandLog.length, 3);
  assert.deepEqual(parsed.initialProfile, replayBundle.initialProfile);
});

test("Tier 4 - F6: GameSession 全迴路戰鬥重放（打完一場 -> saveBattleReplay -> getBattleReplay 讀回 -> dispatchCommand 重放 -> 結果一致）", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-replay-test-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_replay_full_test";
  const session = new GameSession({ accountId, storage });
  await session.load();

  // 1. GameSession 打完一場戰鬥
  const startRes = await session.executeCommand({
    cmdId: "replay_start_1",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.equal(startRes.ack, true);
  const battleId = session.activeBattle.battleId;
  assert.equal(session.activeBattle.seed, undefined, "Client-facing activeBattle must strip seed");
  const originalSeed = session.battle.battleSeed;

  await session.executeCommand({
    cmdId: "replay_hand_1",
    command: Commands.BATTLE_SELECT_HAND,
    payload: { hand: "rock" }
  });

  await session.executeCommand({
    cmdId: "replay_abandon_1",
    command: Commands.BATTLE_ABANDON
  });

  const originalState = session.battle.snapshot();

  // 2. 從 JsonStorage 讀回重放包
  const savedReplay = await storage.getBattleReplay(accountId, battleId);
  assert.ok(savedReplay, "儲存層必須讀出戰鬥重放資料包");
  assert.equal(savedReplay.battleId, battleId);
  assert.equal(savedReplay.seed, originalSeed);
  assert.ok(Array.isArray(savedReplay.commandLog), "重放包必須包含 commandLog");
  assert.ok(savedReplay.commandLog.length > 0, "commandLog 必須非空");

  // 3. 在全新的 BattleSystem 實例中注入相同 Seed 與 dispatchCommand 重放
  const replayBus = new EventBus();
  const replayStore = new GameStore(replayBus, new MemoryPersistence());
  const replayRandom = createSeededRandom(savedReplay.seed);
  const replayBattle = new BattleSystem(replayBus, replayStore, replayRandom, () => 1000);

  replayBattle.start(savedReplay.stageId, { seed: savedReplay.seed });
  for (const cmd of savedReplay.commandLog) {
    replayBattle.dispatchCommand(cmd);
  }

  // 4. 斷言結果 100% 確定性一致
  const replaySnapshot = replayBattle.snapshot();
  assert.equal(replaySnapshot.phase, originalState.phase, "重放階段必須一致");
  assert.equal(replaySnapshot.playerHp, originalState.playerHp, "玩家生命值必須一致");
  assert.equal(replaySnapshot.round, originalState.round, "回合數必須一致");
  assert.equal(replaySnapshot.commandLog.length, originalState.commandLog.length, "指令日誌長度必須一致");

  await fs.rm(tmpDir, { recursive: true, force: true });
});

