import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { QTESystem } from "../src/js/systems/QTESystem.js";
import { PostBattleSystem } from "../src/js/systems/PostBattleSystem.js";
import { TimerRegistry } from "../src/js/core/TimerRegistry.js";

describe("Extreme Stress Testing - High Latency & 150ms Grace Adjudication", () => {
  it("QTESystem: accepts QTE inputs within 150ms clock grace during high network latency", () => {
    let now = 1000000;
    const bus = new EventBus();
    const timers = new TimerRegistry();
    const qte = new QTESystem(bus, timers, () => 0.5, () => now);

    qte.start({ length: 4, durationMs: 3000, directionMode: "all", maxErrors: 2 });
    assert.equal(qte.active, true);

    const deadline = qte.deadline;
    const expected = qte.sequence[0];

    // Client pressed key at deadline + 100ms (within 150ms grace)
    // Packet arrives at server when now is deadline + 220ms
    now = deadline + 220;
    const declaredAt = deadline + 100;

    const result = qte.input(expected, declaredAt);
    assert.equal(result, true, "Input declared within 150ms grace should be accepted");
    assert.equal(qte.index, 1);
    timers.clearAll();
  });

  it("QTESystem: rejects QTE inputs exceeding 150ms grace limit", () => {
    let now = 1000000;
    const bus = new EventBus();
    const timers = new TimerRegistry();
    const qte = new QTESystem(bus, timers, () => 0.5, () => now);

    qte.start({ length: 4, durationMs: 3000, directionMode: "all", maxErrors: 2 });
    const deadline = qte.deadline;
    const expected = qte.sequence[0];

    // Client pressed key at deadline + 200ms (exceeding 150ms grace)
    now = deadline + 300;
    const declaredAt = deadline + 200;

    const result = qte.input(expected, declaredAt);
    assert.equal(result, false, "Input declared after 150ms grace must be rejected");
    assert.equal(qte.active, false, "QTE should terminate as failed");
    timers.clearAll();
  });

  it("QTESystem: auditInputs batch audit processes sequence with timestamps under network lag", () => {
    let now = 1000000;
    const bus = new EventBus();
    const timers = new TimerRegistry();
    const qte = new QTESystem(bus, timers, () => 0.5, () => now);

    qte.start({ length: 3, durationMs: 4000, directionMode: "all", maxErrors: 2 });
    const seq = [...qte.sequence];

    // Batch arrives all at once at deadline + 50ms due to packet buffering
    now = qte.startTime + 2500;
    const batch = [
      { direction: seq[0], declaredAt: qte.startTime + 500 },
      { direction: seq[1], declaredAt: qte.startTime + 1000 },
      { direction: seq[2], declaredAt: qte.startTime + 1500 }
    ];

    const audit = qte.auditInputs(batch);
    assert.equal(audit.ok, true);
    assert.equal(audit.success, true);
    assert.equal(audit.errors, 0);
    assert.equal(audit.index, 3);
    timers.clearAll();
  });

  it("PostBattleSystem: audits watermelon strike accuracy under simulated 250ms network lag", () => {
    let now = 2000000;
    const bus = new EventBus();
    const mockStore = {
      state: {
        profile: { level: 1 },
        playerStats: { maxHp: 100, maxMp: 50, damage: 15 },
        records: { wins: 1, bestStage: 1, watermelonSuccess: 0, watermelonAttempts: 0 }
      },
      snapshot() { return this.state; },
      commit() {},
      unlockSwimsuit() {},
      recordWatermelonCut() {},
      addWatermelonStock() { return 1; },
      recordWatermelonStageCut() {},
      grantExperience() { return { xp: 100, levelsGained: 0 }; }
    };

    const postBattle = new PostBattleSystem(bus, mockStore, () => 0.5, () => now);

    postBattle.open({ won: true, stage: { id: 1, xpWin: 100, winCoins: 50 } });
    postBattle.requestSwimsuit();
    postBattle.startWatermelon();

    assert.equal(postBattle.state.scene, "watermelonAim");

    // Strike at exact strikeStartedAt (marker position is at start)
    const strikeTime = postBattle.state.strikeStartedAt;
    now += 250; // transit latency

    postBattle.strike(strikeTime);
    assert.equal(postBattle.state.watermelon.attempts, 1);
    assert.equal(typeof postBattle.state.watermelon.lastCutSuccess, "boolean");
  });
});
