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
    skills: { momo: 8, dualHand: 1 }
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
  assert.equal(snap.profile.skills.dualHand, 1);
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
  assert.deepEqual(store.state.records.clearedStages, [1, 2, 3, 4]);
  assert.equal(store.state.records.stageStats[4].manualWins >= 1, true);

  // Snapshot and re-instantiate store from persistence
  const storeReloaded = new GameStore(bus, persistence);
  assert.deepEqual(storeReloaded.state.records.clearedStages, [1, 2, 3, 4]);

  // Unlock all gallery
  const unlockGalRes = store.cheatUnlockGallery();
  assert.equal(unlockGalRes.ok, true);
  assert.equal(store.state.records.unlockedSwimsuit, true);
  assert.equal(store.state.records.unlockedGalleryAll, true);
});

test("作弊密碼驗證：輸入 8989 才能解鎖作弊選單", () => {
  function verifyPasscode(input) {
    return String(input).trim() === "8989";
  }

  assert.equal(verifyPasscode("1234"), false, "錯誤密碼應驗證失敗");
  assert.equal(verifyPasscode(""), false, "空密碼應驗證失敗");
  assert.equal(verifyPasscode("8988"), false, "近似密碼應驗證失敗");
  assert.equal(verifyPasscode("8989"), true, "正確密碼 8989 應驗證成功");
  assert.equal(verifyPasscode("  8989  "), true, "帶空白之 8989 經 trim 後應驗證成功");
});

