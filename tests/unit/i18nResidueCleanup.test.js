// tests/unit/i18nResidueCleanup.test.js
// Unit tests for openspec change koraku-i18n-residue-cleanup:
// 1. kernelFactory 8 responses contain correct key and params
// 2. Dual-enemy damage log attribution strictly follows targetId regardless of name language
// 3. showToast resolves result objects with keys to English in 'en' locale and preserves zh-Hant

import test from "node:test";
import assert from "node:assert/strict";
import { createKernel } from "../../src/js/kernel/kernelFactory.js";
import { Commands, ErrorCodes } from "../../src/js/kernel/protocol.js";
import { I18n } from "../../src/js/services/I18n.js";
import { AppView } from "../../src/js/ui/AppView.js";

test("kernelFactory: all 8 response points contain correct i18n keys and params", () => {
  const kernel = createKernel({ now: () => 10000, random: () => 0.5 });

  // 1. Missing command field
  const missingRes = kernel.executeCommand({});
  assert.equal(missingRes.ack, false);
  assert.equal(missingRes.errorCode, ErrorCodes.INVALID_SCHEMA);
  assert.equal(missingRes.key, "command.missingCommand");
  assert.equal(missingRes.message, "缺少 command 欄位。");

  // Start battle to test the 4 locked mutations
  kernel.executeCommand({
    cmdId: "start_1",
    command: Commands.BATTLE_START,
    payload: { stageId: 1 }
  });
  assert.ok(kernel.battle.state?.active, "Battle should be active");

  // 2. Equip item locked
  const equipRes = kernel.executeCommand({
    cmdId: "equip_1",
    command: Commands.EQUIP_ITEM,
    payload: { slot: "weapon", itemId: "fox_blade" }
  });
  assert.equal(equipRes.ack, false);
  assert.equal(equipRes.errorCode, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(equipRes.key, "battle.lockedDuringBattle");
  assert.equal(equipRes.message, "戰鬥進行中，禁止更換裝備。");

  // 3. Unequip item locked
  const unequipRes = kernel.executeCommand({
    cmdId: "unequip_1",
    command: Commands.UNEQUIP_ITEM,
    payload: { slot: "weapon" }
  });
  assert.equal(unequipRes.ack, false);
  assert.equal(unequipRes.errorCode, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(unequipRes.key, "battle.lockedDuringBattle");
  assert.equal(unequipRes.message, "戰鬥進行中，禁止更換裝備。");

  // 4. Allocate stat locked
  const statRes = kernel.executeCommand({
    cmdId: "stat_1",
    command: Commands.ALLOCATE_STAT,
    payload: { stat: "atk" }
  });
  assert.equal(statRes.ack, false);
  assert.equal(statRes.errorCode, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(statRes.key, "battle.lockedDuringBattle");
  assert.equal(statRes.message, "戰鬥進行中，禁止分配屬性點數。");

  // 5. Allocate skill locked
  const skillRes = kernel.executeCommand({
    cmdId: "skill_1",
    command: Commands.ALLOCATE_SKILL,
    payload: { skill: "slash" }
  });
  assert.equal(skillRes.ack, false);
  assert.equal(skillRes.errorCode, ErrorCodes.BATTLE_IN_PROGRESS_LOCKED);
  assert.equal(skillRes.key, "battle.lockedDuringBattle");
  assert.equal(skillRes.message, "戰鬥進行中，禁止分配技能點數。");

  kernel.battle.stopClocks();

  // 6. Account delete / reset
  const deleteRes = kernel.executeCommand({
    cmdId: "del_1",
    command: Commands.ACCOUNT_DELETE
  });
  assert.equal(deleteRes.ack, true);
  assert.equal(deleteRes.result?.key, "account.resetDone");
  assert.equal(deleteRes.result?.message, "帳號資料已重置。");

  // 7. Account claim transfer code
  const claimRes = kernel.executeCommand({
    cmdId: "claim_1",
    command: Commands.ACCOUNT_CLAIM_TRANSFER_CODE,
    payload: { code: "SOME_OTHER_CODE" }
  });
  assert.equal(claimRes.ack, true);
  assert.equal(claimRes.result?.key, "account.transferClaimed");
  assert.equal(claimRes.result?.message, "轉移碼兌換完成。");

  // 8. Unknown command
  const unknownRes = kernel.executeCommand({
    cmdId: "unknown_1",
    command: "UNKNOWN_CUSTOM_COMMAND"
  });
  assert.equal(unknownRes.ack, false);
  assert.equal(unknownRes.errorCode, ErrorCodes.NOT_FOUND);
  assert.equal(unknownRes.key, "command.unknownCommand");
  assert.deepEqual(unknownRes.params, { command: "UNKNOWN_CUSTOM_COMMAND" });
  assert.equal(unknownRes.message, "未定義之指令: UNKNOWN_CUSTOM_COMMAND");

  kernel.destroy();
});

test("AppView.addDamageLogEntry: targetId determines left/right attribution without Chinese string matching", () => {
  const view = Object.create(AppView.prototype);
  view.recentDamageLog = [];
  view.updateDamageLogDisplay = () => {};

  // Test in English locale
  I18n.setLocale("en");

  // Left enemy with English name
  view.addDamageLogEntry({
    target: "enemy",
    targetId: "left",
    targetName: "Western Fox Maiden Left",
    amount: 100,
    actionType: "burn"
  });
  const entry1 = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entry1.actorName, "Left");
  assert.equal(entry1.actionBadge, "BURN");

  // Right enemy with English name
  view.addDamageLogEntry({
    target: "enemy",
    targetId: "right",
    targetName: "Eastern Fox Maiden Right",
    amount: 120,
    actionType: "reflect"
  });
  const entry2 = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entry2.actorName, "Right");

  // Main enemy (Kohaku) with English name
  view.addDamageLogEntry({
    target: "enemy",
    targetId: "kohaku",
    targetName: "Little Kohaku",
    amount: 80,
    actionType: "attack"
  });
  const entry3 = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entry3.actorName, "Kohaku");

  // Player heal
  view.addDamageLogEntry({
    target: "player",
    amount: 50,
    actionType: "heal"
  });
  const entry4 = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entry4.actorName, "Traveler");
  assert.equal(entry4.actionBadge, "HEAL");

  // Player mana
  view.addDamageLogEntry({
    target: "player",
    amount: 30,
    actionType: "mana"
  });
  const entry5 = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entry5.actorName, "Traveler");
  assert.equal(entry5.actionBadge, "MP");

  // Switch to zh-Hant and verify exact traditional Chinese names
  I18n.setLocale("zh-Hant");
  view.addDamageLogEntry({
    target: "enemy",
    targetId: "left",
    targetName: "English Name Ignored",
    amount: 50,
    actionType: "burn"
  });
  const entryHant = view.recentDamageLog[view.recentDamageLog.length - 1];
  assert.equal(entryHant.actorName, "左");
  assert.equal(entryHant.actionBadge, "灼");
});

test("AppView.showToast: resolves result objects with keys to English in 'en' locale", () => {
  if (typeof globalThis.window === "undefined") {
    globalThis.window = { clearTimeout: () => {}, setTimeout: () => {} };
  }

  const view = Object.create(AppView.prototype);
  let displayedText = "";
  view.toastElement = {
    set textContent(v) { displayedText = v; },
    get textContent() { return displayedText; },
    dataset: {},
    classList: { add() {}, remove() {} }
  };

  I18n.setLocale("en");

  // command.missingCommand
  view.showToast({ key: "command.missingCommand", message: "缺少 command 欄位。", tone: "danger" });
  assert.equal(displayedText, "Missing command field.");

  // command.unknownCommand with params
  view.showToast({ key: "command.unknownCommand", params: { command: "testCmd" }, message: "未定義之指令: testCmd", tone: "danger" });
  assert.equal(displayedText, "Unknown command: testCmd");

  // account.resetDone
  view.showToast({ key: "account.resetDone", message: "帳號資料已重置。", tone: "success" });
  assert.equal(displayedText, "Account data has been reset.");

  // account.transferClaimed
  view.showToast({ key: "account.transferClaimed", message: "轉移碼兌換完成。", tone: "success" });
  assert.equal(displayedText, "Transfer code claimed successfully.");

  // battle.lockedDuringBattle
  view.showToast({ key: "battle.lockedDuringBattle", message: "戰鬥進行中，禁止更換裝備。", tone: "danger" });
  assert.equal(displayedText, "Equipment and stat allocation are locked during active battle.");

  // Fallback when no key is present
  view.showToast({ message: "Raw server message", tone: "danger" });
  assert.equal(displayedText, "Raw server message");
  // Reset locale to zh-Hant
  I18n.setLocale("zh-Hant");
  view.showToast({ key: "command.missingCommand", message: "缺少 command 欄位。", tone: "danger" });
  assert.equal(displayedText, "缺少 command 欄位。");
});

test("round 2: hand buttons and battle HUD player name resolve correctly across locales", () => {
  // Test that I18n.t("hands.<id>.label") resolves correctly
  for (const [locale, expected] of Object.entries({
    "zh-Hant": { rock: "石頭", paper: "布", scissors: "剪刀", player: "旅人" },
    "zh-Hans": { rock: "石头", paper: "布", scissors: "剪刀", player: "旅人" },
    "en": { rock: "Rock", paper: "Paper", scissors: "Scissors", player: "Traveler" },
    "ja": { rock: "グー", paper: "パー", scissors: "チョキ", player: "旅人" }
  })) {
    I18n.setLocale(locale);
    assert.equal(I18n.t("hands.rock.label"), expected.rock);
    assert.equal(I18n.t("hands.paper.label"), expected.paper);
    assert.equal(I18n.t("hands.scissors.label"), expected.scissors);
    assert.equal(I18n.t("dialogue.speakerPlayer"), expected.player);
  }

  // Restore locale
  I18n.setLocale("zh-Hant");
});

test("round 2: formatDamageLogItem unifies 旅人 to Traveler in en locale", () => {
  const view = Object.create(AppView.prototype);

  // en locale
  I18n.setLocale("en");
  const formattedEn = view.formatDamageLogItem({
    actorName: "旅人",
    actionBadge: "攻",
    amount: 50,
    isEnemyHit: true
  });
  assert.ok(formattedEn.includes("Traveler[ATK]"), `Expected Traveler[ATK], got: ${formattedEn}`);
  assert.ok(!formattedEn.includes("Hero"), `Must not include Hero, got: ${formattedEn}`);

  // zh-Hant locale
  I18n.setLocale("zh-Hant");
  const formattedZh = view.formatDamageLogItem({
    actorName: "旅人",
    actionBadge: "攻",
    amount: 50,
    isEnemyHit: true
  });
  assert.ok(formattedZh.includes("旅人【攻】"), `Expected 旅人【攻】, got: ${formattedZh}`);
});

test("round 2: records consumables and summary keys format with correct units and params", () => {
  for (const [locale, checks] of Object.entries({
    "zh-Hant": {
      hp: "2 瓶 (+50 HP)",
      mp: "1 瓶 (+25 MP)",
      skill: "3/5 次 (60%, 150 傷)",
      hint: "（唯讀檢視・裝備更換請至「玩家裝備」頁）",
      notEquipped: "未裝備",
      noRecent: "尚無對戰紀錄。快去開始一場對局吧！"
    },
    "en": {
      hp: "2 Bottles (+50 HP)",
      mp: "1 Bottles (+25 MP)",
      skill: "3/5 Hits (60%, 150 DMG)",
      hint: "(Read-only view; change gear on the \"Equipment & Bag\" page)",
      notEquipped: "Unequipped",
      noRecent: "No battle records yet. Go start a match!"
    },
    "ja": {
      hp: "2 本 (+50 HP)",
      mp: "1 本 (+25 MP)",
      skill: "3/5 回 (60%, 150 ダメージ)",
      hint: "（閲覧のみ・装備変更は「プレイヤー装備」画面で行ってください）",
      notEquipped: "未装備",
      noRecent: "対戦記録はまだありません。早速対局を始めましょう！"
    }
  })) {
    I18n.setLocale(locale);
    assert.equal(I18n.t("ui.recordsHpRestoredSummary", { count: 2, restored: 50 }), checks.hp);
    assert.equal(I18n.t("ui.recordsMpRestoredSummary", { count: 1, restored: 25 }), checks.mp);
    assert.equal(I18n.t("ui.recordsSkillUsesSummary", { success: 3, attempts: 5, rate: 60, damage: 150 }), checks.skill);
    assert.equal(I18n.t("ui.paperdollReadOnlyHint"), checks.hint);
    assert.equal(I18n.t("ui.notEquipped"), checks.notEquipped);
    assert.equal(I18n.t("ui.noRecentBattles"), checks.noRecent);
  }

  // Restore locale
  I18n.setLocale("zh-Hant");
});
