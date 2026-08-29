import test from "node:test";
import assert from "node:assert/strict";
import { EventBus } from "../src/js/core/EventBus.js";
import { GameStore } from "../src/js/core/GameStore.js";

class MemoryPersistence {
  constructor(data = null) { this.data = data; }
  load() { return this.data; }
  save(data) { this.data = structuredClone(data); }
  clear() { this.data = null; }
}

test("作弊調試設定：自訂修改等級、經驗、SP、星砂、配點、技能與藥水", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  const res = store.cheatSetValues({
    level: 50,
    xp: 250,
    skillPoints: 40,
    coins: 88888,
    hpPotion: 15,
    mpPotion: 20,
    allocations: { hp: 10, mp: 10, damage: 10 },
    skills: { momo: 8 }
  });

  assert.equal(res.ok, true);
  const snap = store.snapshot();
  assert.equal(snap.profile.level, 50);
  assert.equal(snap.profile.xp, 250);
  assert.equal(snap.profile.skillPoints, 40);
  assert.equal(snap.coins, 88888);
  assert.equal(snap.inventory.hpPotion, 15);
  assert.equal(snap.inventory.mpPotion, 20);
  assert.equal(snap.profile.allocations.hp, 10);
  assert.equal(snap.profile.skills.momo, 8);
});

test("一鍵解鎖全關卡與一鍵解鎖全圖鑑", () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  assert.equal(store.state.records.bestStage, 0);
  assert.equal(store.state.records.unlockedSwimsuit, false);

  // Unlock all stages
  const unlockStageRes = store.cheatUnlockAll();
  assert.equal(unlockStageRes.ok, true);
  assert.equal(store.state.records.bestStage, 4);

  // Unlock all gallery
  const unlockGalRes = store.cheatUnlockGallery();
  assert.equal(unlockGalRes.ok, true);
  assert.equal(store.state.records.unlockedSwimsuit, true);
});
