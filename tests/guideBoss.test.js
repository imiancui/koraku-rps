import test from "node:test";
import assert from "node:assert/strict";
import { STAGES } from "../src/js/config/gameConfig.js";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("首頁指南 BOSS 規則與通關解鎖判定", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // 1. Initial: bestStage is 0, no stages cleared
  assert.equal(store.state.records.bestStage, 0);
  STAGES.forEach((stage) => {
    const isCleared = (store.state.records.bestStage || 0) >= stage.id;
    assert.equal(isCleared, false, `Stage ${stage.id} 初始應為未解鎖`);
  });

  // 2. Clear Stage 1: bestStage = 1
  store.recordBattle(true, STAGES[0]);
  assert.equal(store.state.records.bestStage, 1);
  assert.equal(store.state.records.bestStage >= STAGES[0].id, true, "Stage 1 通關後應解鎖");
  assert.match(STAGES[0].bossRuleSummary, /5 秒／4 向容錯/);
  assert.equal(store.state.records.bestStage >= STAGES[1].id, false, "Stage 2 仍應鎖定");

  // 3. Clear Stage 4: bestStage = 4
  store.recordBattle(true, STAGES[3]);
  assert.equal(store.state.records.bestStage, 4);
  assert.equal(store.state.records.bestStage >= STAGES[3].id, true, "Stage 4 通關後應解鎖");
  assert.match(STAGES[3].bossRuleSummary, /雙小樂雙血條/);
});
