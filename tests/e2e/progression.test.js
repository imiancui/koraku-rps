// tests/e2e/progression.test.js
// E2E Multi-Stage Progression, Save Migration v1->v2, 15-Minute Transfer Codes & GDPR Test Suite (Tiers 1-4)

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { EventBus } from "../../src/js/core/EventBus.js";
import { GameStore, migrateSave, sanitizeSave, createEquipmentInstance, getEquipmentTypeId } from "../../src/js/core/GameStore.js";
import { STAGES, ITEMS, EQUIPMENT_ITEMS, SKILLS } from "../../src/js/config/gameConfig.js";
import { JsonStorage } from "../../server/storage/JsonStorage.js";
import { TransferManager } from "../../server/core/TransferManager.js";
import { GameSession } from "../../server/core/GameSession.js";
import {
  Commands,
  Events,
  ErrorCodes,
  CONFIG_VERSION,
  createCommandEnvelope
} from "../../src/js/kernel/protocol.js";
import {
  MemoryPersistence,
  AuthoritativeKernelServer,
  TestLocalGameClient,
  TestRemoteGameClient
} from "../helpers/testHarness.js";

test("Tier 4 - Scenario 1: 全 4 章關卡連續通關養成與解鎖流程（E2E Progression）", async () => {
  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);

  // 初始狀態驗證
  assert.equal(store.state.profile.level, 1);
  assert.equal(store.state.coins, 0);
  assert.equal(store.state.inventory.hpPotion, 1);

  // 通關第 1 關
  store.recordBattle(true, STAGES[0], { damageDealt: 100, durationSec: 10 });
  assert.equal(store.state.records.clearedStages.includes(1), true);
  assert.ok(store.state.coins > 0);

  // 升級至 Lv.2 並分配能力點
  store.state.profile.level = 2;
  store.state.profile.skillPoints = 5;
  store.allocateStat("hp");
  store.allocateStat("damage");
  store.allocateSkill("momo"); // Lv.2 解鎖摸摸
  assert.equal(store.state.profile.skills.momo, 1);

  // 購買裝備並穿戴
  store.state.coins += 2000;
  store.buyEquipment("sword_flame");
  store.buyEquipment("chest_samurai");
  store.equipItem("sword_flame", "mainHand");
  store.equipItem("chest_samurai", "chest");

  // 通關第 2 關
  store.recordBattle(true, STAGES[1], { damageDealt: 250, durationSec: 15 });
  assert.equal(store.state.records.clearedStages.includes(2), true);

  // 通關第 3 關
  store.recordBattle(true, STAGES[2], { damageDealt: 500, durationSec: 25 });
  assert.equal(store.state.records.clearedStages.includes(3), true);

  // 升級至 Lv.5 並解鎖雙手解放 (100 SP)
  store.state.profile.level = 5;
  store.state.profile.skillPoints = 100;
  store.allocateSkill("dualHand");
  assert.equal(store.state.profile.skills.dualHand, 1);

  // 通關第 4 關（雙生 Boss 終局戰勝）
  store.recordBattle(true, STAGES[3], { damageDealt: 1200, durationSec: 40 });
  assert.equal(store.state.records.clearedStages.includes(4), true);
  assert.equal(store.state.records.bestStage, 4);

  // 解鎖泳裝與通關圖鑑
  store.unlockSwimsuit();
  assert.equal(store.state.records.unlockedSwimsuit, true);

  // 驗證 12 欄位裝備映射與 DPS 計算
  const finalSnapshot = store.snapshot();
  assert.equal(finalSnapshot.equipment.mainHand, "sword_flame");
  assert.equal(finalSnapshot.equipment.chest, "chest_samurai");
  assert.ok(store.getTheoreticalDPS() > 10);
});

test("Tier 4 - Scenario 2: 舊版存檔匯入與 Schema v1 -> v2 無損自動遷移（Save Migration）", () => {
  // 構造典型的舊版 v1 存檔資料（以純字串作為裝備識別）
  const legacyV1Save = {
    version: 1,
    profile: {
      level: 4,
      xp: 350,
      skillPoints: 2,
      allocations: { hp: 3, mp: 1, damage: 4 },
      skills: { momo: 3, dualHand: 0 }
    },
    coins: 1850,
    inventory: { hpPotion: 3, mpPotion: 2 },
    equipment: {
      head: null,
      shoulders: null,
      chest: "chest_samurai",
      belt: null,
      boots: "boots_ninja",
      mainHand: "sword_flame",
      offHand: "shield_suzaku",
      ring1: "ring_ruby",
      ring2: null,
      earring1: null,
      earring2: null,
      badge: "badge_bond"
    },
    inventoryEquipment: ["sword_ice", "greatsword_destroyer"],
    records: {
      wins: 15,
      losses: 3,
      bestStage: 3,
      clearedStages: [1, 2, 3],
      totalCoinsEarned: 2400,
      totalXpEarned: 1200,
      totalBattles: 18,
      manualWins: 12,
      manualLosses: 2,
      autoWins: 3,
      autoLosses: 1
    }
  };

  // 執行 Schema 遷移
  const migrated = migrateSave(legacyV1Save, 1, 2);
  const sanitized = sanitizeSave(migrated);

  // 驗證遷移結果：
  // 1. 版本號升級為 2
  assert.equal(sanitized.version, 2);

  // 2. 歷史養成數據與貨幣 100% 完整保留
  assert.equal(sanitized.profile.level, 4);
  assert.equal(sanitized.profile.allocations.damage, 4);
  assert.equal(sanitized.profile.skills.momo, 3);
  assert.equal(sanitized.coins, 1850);
  assert.equal(sanitized.inventory.hpPotion, 3);
  assert.equal(sanitized.inventory.mpPotion, 2);

  // 3. 通關紀錄與關卡統計無損保留
  assert.deepEqual(sanitized.records.clearedStages, [1, 2, 3]);
  assert.equal(sanitized.records.bestStage, 3);
  assert.equal(sanitized.records.totalBattles, 18);

  // 4. 裝備欄位正常解析
  assert.equal(sanitized.equipment.mainHand, "sword_flame");
  assert.equal(sanitized.equipment.chest, "chest_samurai");
  assert.equal(sanitized.equipment.boots, "boots_ninja");

  // 5. 經濟帳本陣列已正確初始化
  assert.ok(Array.isArray(sanitized.ledger));
});

test("Tier 4 - Scenario 3: 跨裝置 15 分鐘一次性轉移碼簽發與兌換流程（Transfer Codes）", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-transfer-e2e-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const transferManager = new TransferManager({ storage, ttlMs: 15 * 60 * 1000 }); // 15 分鐘

  const sourceAccountId = "acc_device_A";
  const targetAccountId = "acc_device_B";

  // 1. 在裝置 A 儲存玩家進度
  await storage.saveAccount(sourceAccountId, {
    version: 2,
    coins: 9999,
    profile: { level: 10, skills: { momo: 10 } }
  });

  // 2. 簽發 15 分鐘有效轉移碼
  const issueResult = await transferManager.issueTransferCode(sourceAccountId);
  assert.ok(issueResult.transferCode.startsWith("KORAKU-"), "轉移碼應帶有 KORAKU- 前綴");
  assert.equal(issueResult.ttlSeconds, 900, "TTL 應為 900 秒 (15 分鐘)");
  assert.ok(issueResult.expiresAt > Date.now() + 800000);

  // 3. 裝置 B 兌換該轉移碼
  const claimResult = await transferManager.claimTransferCode(issueResult.transferCode, targetAccountId);
  assert.equal(claimResult.success, true);
  assert.equal(claimResult.accountId, sourceAccountId);

  // 4. 再次嘗試兌換該轉移碼（防重複使用）
  const secondClaim = await transferManager.claimTransferCode(issueResult.transferCode, "acc_device_C");
  assert.equal(secondClaim.success, false);
  assert.equal(secondClaim.error, ErrorCodes.INVALID_TRANSFER_CODE);

  // 5. 驗證過期轉移碼拒絕
  const expiredManager = new TransferManager({ storage, ttlMs: -1000 }); // 立即過期
  const expiredCode = await expiredManager.issueTransferCode(sourceAccountId);
  const expiredClaim = await transferManager.claimTransferCode(expiredCode.transferCode, "acc_device_D");
  assert.equal(expiredClaim.success, false);
  assert.equal(expiredClaim.error, ErrorCodes.INVALID_TRANSFER_CODE);

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Tier 4 - Scenario 4: GDPR 完整 JSON 導出與帳號徹底刪除（GDPR Compliance）", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-gdpr-e2e-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  await storage.init();

  const accountId = "acc_gdpr_subject_01";
  const profileData = {
    version: 2,
    coins: 4500,
    profile: { level: 6, xp: 800 },
    inventory: { hpPotion: 5 }
  };

  await storage.saveAccount(accountId, profileData);
  await storage.appendLedger(accountId, { source: "battle_win", delta: { coins: 500, xp: 200 } });
  await storage.appendLedger(accountId, { source: "shop_buy", delta: { coins: -200, items: { hpPotion: 2 } } });

  // 1. 執行 GDPR JSON 匯出
  const exportData = await storage.exportAllAccountData(accountId);
  assert.ok(exportData.exportMetadata);
  assert.equal(exportData.exportMetadata.accountId, accountId);
  assert.equal(exportData.exportMetadata.format, "GDPR_JSON_EXPORT_V1");
  assert.deepEqual(exportData.accountData, profileData);
  assert.equal(exportData.economicLedger.length, 2);

  // 2. 執行帳號徹底刪除
  const deleted = await storage.deleteAccount(accountId);
  assert.equal(deleted, true);

  // 3. 驗證儲存庫中完全無法查詢該帳號與帳本
  const loadedAfterDelete = await storage.getAccount(accountId);
  assert.equal(loadedAfterDelete, null);
  const ledgerAfterDelete = await storage.getLedger(accountId);
  assert.equal(ledgerAfterDelete.length, 0);

  await fs.rm(tmpDir, { recursive: true, force: true });
});

test("Tier 4 - Scenario 5: 追加型經濟帳本 (.jsonl) 審計與資金守恆性檢驗 (Ledger Audit)", async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "koraku-test-ledger-e2e-"));
  const storage = new JsonStorage({ dataDir: tmpDir });
  const accountId = "acc_economic_audit_01";

  // 紀錄一系列經濟突變操作
  await storage.appendLedger(accountId, { source: "init", delta: { coins: 0 } });
  await storage.appendLedger(accountId, { source: "stage1_win", delta: { coins: 300 } });
  await storage.appendLedger(accountId, { source: "buy_hpPotion", delta: { coins: -100 } });
  await storage.appendLedger(accountId, { source: "stage2_win", delta: { coins: 600 } });
  await storage.appendLedger(accountId, { source: "buy_equipment", delta: { coins: -350 } });

  const ledger = await storage.getLedger(accountId);
  assert.equal(ledger.length, 5);

  // 計算帳本總星砂變動量
  let calculatedCoins = 0;
  for (const entry of ledger) {
    assert.ok(entry.id.startsWith("led_"));
    assert.ok(entry.serverTime > 0);
    assert.equal(entry.configVersion, CONFIG_VERSION);
    if (entry.delta && typeof entry.delta.coins === "number") {
      calculatedCoins += entry.delta.coins;
    }
  }

  // 期望餘額: 0 + 300 - 100 + 600 - 350 = 450
  assert.equal(calculatedCoins, 450, "經由帳本回溯累加之星砂應等於 450");

  await fs.rm(tmpDir, { recursive: true, force: true });
});
