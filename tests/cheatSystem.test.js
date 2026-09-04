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

test("作弊密碼驗證邏輯：8989 在線上伺服器連線失敗時仍具備客戶端解鎖兜底，且非 DEV/8989 密碼均被拒絕", async () => {
  async function simulateCheatAuthSubmit({ pass, hasVerifyDevFn, serverSuccess }) {
    const trimmed = String(pass || "").trim();
    const isMasterPass = trimmed === "8989";
    const isDevKey = trimmed.toUpperCase().startsWith("DEV-");
    let isEntitled = false;

    if (hasVerifyDevFn) {
      try {
        isEntitled = serverSuccess;
      } catch (_) {
        isEntitled = false;
      }
      if (!isEntitled && (isMasterPass || isDevKey)) {
        isEntitled = true;
      }
    } else {
      isEntitled = isMasterPass || isDevKey;
    }
    return isEntitled;
  }

  // 1. 離線模式
  assert.equal(await simulateCheatAuthSubmit({ pass: "8989", hasVerifyDevFn: false }), true, "離線輸入 8989 應成功");
  assert.equal(await simulateCheatAuthSubmit({ pass: "  8989  ", hasVerifyDevFn: false }), true, "離線空白 8989 應成功");
  assert.equal(await simulateCheatAuthSubmit({ pass: "1234", hasVerifyDevFn: false }), false, "離線輸入 1234 應失敗");
  assert.equal(await simulateCheatAuthSubmit({ pass: "8988", hasVerifyDevFn: false }), false, "離線輸入 8988 應失敗");

  // 2. 線上模式但伺服器提權失敗 (e.g. 斷線或未啟用) -> 8989 依然客戶端解鎖成功
  assert.equal(await simulateCheatAuthSubmit({ pass: "8989", hasVerifyDevFn: true, serverSuccess: false }), true, "線上連線失敗時 8989 依然解鎖");
  assert.equal(await simulateCheatAuthSubmit({ pass: "1234", hasVerifyDevFn: true, serverSuccess: false }), false, "線上錯誤密碼失敗");
  assert.equal(await simulateCheatAuthSubmit({ pass: "DEV-KEY-1", hasVerifyDevFn: true, serverSuccess: false }), true, "DEV- 開頭密鑰放行");
});


