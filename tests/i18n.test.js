import test from "node:test";
import assert from "node:assert/strict";
import { I18n, I18nService, LOCALES, LOCALE_ORDER, DICTIONARY } from "../src/js/services/I18n.js";
import { STAGES, EQUIPMENT_ITEMS, SKILLS, ITEMS, GALLERY_ITEMS } from "../src/js/config/gameConfig.js";

test("I18nService 預設語系與支援語系列表檢查", () => {
  assert.equal(LOCALE_ORDER.length, 4);
  assert.deepEqual(LOCALE_ORDER, ["zh-Hant", "zh-Hans", "en", "ja"]);
  assert.ok(LOCALES["zh-Hant"]);
  assert.ok(LOCALES["zh-Hans"]);
  assert.ok(LOCALES["en"]);
  assert.ok(LOCALES["ja"]);
});

test("I18n 語系切換 cycleLocale 與 setLocale", () => {
  const i18n = new I18nService();
  i18n.setLocale("zh-Hant");
  assert.equal(i18n.getLocale(), "zh-Hant");
  
  const next = i18n.cycleLocale();
  assert.equal(next, "zh-Hans");
  assert.equal(i18n.getLocale(), "zh-Hans");

  i18n.cycleLocale();
  assert.equal(i18n.getLocale(), "en");

  i18n.cycleLocale();
  assert.equal(i18n.getLocale(), "ja");

  i18n.cycleLocale();
  assert.equal(i18n.getLocale(), "zh-Hant");
});

test("I18n 系統語系探測：繁中、簡中、日文與未知語系回退英文", () => {
  const i18n = new I18nService();

  // 測試繁中
  assert.equal(i18n.detectSystemLocale({ languages: ["zh-TW", "en-US"], language: "zh-TW" }), "zh-Hant");
  assert.equal(i18n.detectSystemLocale({ languages: ["zh-HK"], language: "zh-HK" }), "zh-Hant");

  // 測試簡中
  assert.equal(i18n.detectSystemLocale({ languages: ["zh-CN", "zh"], language: "zh-CN" }), "zh-Hans");
  assert.equal(i18n.detectSystemLocale({ languages: ["zh-SG"], language: "zh-SG" }), "zh-Hans");

  // 測試日文
  assert.equal(i18n.detectSystemLocale({ languages: ["ja-JP", "ja"], language: "ja-JP" }), "ja");

  // 測試未知語系（如法文、德文、西班牙文等）回退至英文
  assert.equal(i18n.detectSystemLocale({ languages: ["fr-FR", "fr"], language: "fr-FR" }), "en");

  // 測試無 navigator 環境回退至英文
  assert.equal(i18n.detectSystemLocale(null), "en");
});

test("I18n 字典字串與參數插值測試", () => {
  const i18n = new I18nService();
  i18n.setLocale("zh-Hant");
  assert.equal(i18n.t("dialogue.chant3"), "剪刀");
  assert.equal(i18n.t("dialogue.watermelonAttempt", { nextAttempt: 2 }), "第 2 刀。白色指針進入綠色區域時，就喊『就是現在！』！");

  i18n.setLocale("ja");
  assert.equal(i18n.t("dialogue.chant3"), "チョキ");
  assert.equal(i18n.t("dialogue.chant2"), "グー");
  assert.equal(i18n.t("dialogue.chant1"), "パー！");
  assert.equal(i18n.t("dialogue.watermelonAttempt", { nextAttempt: 2 }), "2太刀目！白い針が緑のゾーンに入ったら『今だ！』って叫んでね！");

  i18n.setLocale("en");
  assert.equal(i18n.t("dialogue.chant3"), "Scissors");
  assert.equal(i18n.t("dialogue.chant2"), "Rock");
  assert.equal(i18n.t("dialogue.chant1"), "Paper!");
  assert.equal(i18n.t("dialogue.watermelonAttempt", { nextAttempt: 2 }), "Strike #2! When the white needle hits the green zone, call 'NOW!'!");
});

test("I18n 動態在地化物件轉換函式測試", () => {
  const i18n = new I18nService();
  
  // 英文
  i18n.setLocale("en");
  const stage1En = i18n.getLocalizedStage(STAGES[0]);
  assert.equal(stage1En.chapter, "Chapter 1");
  assert.equal(stage1En.name, "First Encounter: Crimson Torii");

  const equipFlameEn = i18n.getLocalizedEquipment(EQUIPMENT_ITEMS.sword_flame);
  assert.equal(equipFlameEn.name, "Hellfire Flame Katana");

  const skillMomoEn = i18n.getLocalizedSkill(SKILLS.momo);
  assert.equal(skillMomoEn.name, "Petting");

  // 日文
  i18n.setLocale("ja");
  const stage1Ja = i18n.getLocalizedStage(STAGES[0]);
  assert.equal(stage1Ja.chapter, "壱ノ章");
  assert.equal(stage1Ja.name, "初逢・朱鳥居");

  const equipFlameJa = i18n.getLocalizedEquipment(EQUIPMENT_ITEMS.sword_flame);
  assert.equal(equipFlameJa.name, "業火・炎の太刀");

  const skillDualJa = i18n.getLocalizedSkill(SKILLS.dualHand);
  assert.equal(skillDualJa.name, "両手解放");
});

test("I18n 完整性檢查：繁中、簡中、英文、日文所有關卡、道具、裝備、技能皆完整翻譯", () => {
  const i18n = new I18nService();

  for (const locale of LOCALE_ORDER) {
    i18n.setLocale(locale);

    // 關卡
    for (const stage of STAGES) {
      const locStage = i18n.getLocalizedStage(stage);
      assert.ok(locStage.name, `Stage ${stage.id} name missing in ${locale}`);
      assert.ok(locStage.chapter, `Stage ${stage.id} chapter missing in ${locale}`);
      assert.ok(locStage.subtitle, `Stage ${stage.id} subtitle missing in ${locale}`);
      assert.ok(locStage.bossRuleSummary, `Stage ${stage.id} bossRuleSummary missing in ${locale}`);
      assert.ok(locStage.bossRuleDetail, `Stage ${stage.id} bossRuleDetail missing in ${locale}`);
    }

    // 消耗品
    for (const item of Object.values(ITEMS)) {
      const locItem = i18n.getLocalizedItem(item);
      assert.ok(locItem.name, `Item ${item.id} name missing in ${locale}`);
      assert.ok(locItem.description, `Item ${item.id} description missing in ${locale}`);
    }

    // 裝備
    for (const equip of Object.values(EQUIPMENT_ITEMS)) {
      const locEquip = i18n.getLocalizedEquipment(equip);
      assert.ok(locEquip.name, `Equipment ${equip.id} name missing in ${locale}`);
      assert.ok(locEquip.description, `Equipment ${equip.id} description missing in ${locale}`);
    }

    // 技能
    for (const skill of Object.values(SKILLS)) {
      const locSkill = i18n.getLocalizedSkill(skill);
      assert.ok(locSkill.name, `Skill ${skill.id} name missing in ${locale}`);
      assert.ok(locSkill.description, `Skill ${skill.id} description missing in ${locale}`);
    }

    // 圖鑑
    for (const gallery of GALLERY_ITEMS) {
      const locGallery = i18n.getLocalizedGalleryItem(gallery);
      assert.ok(locGallery.name, `Gallery ${gallery.id} name missing in ${locale}`);
      assert.ok(locGallery.variantName, `Gallery ${gallery.id} variantName missing in ${locale}`);
      assert.ok(locGallery.description, `Gallery ${gallery.id} description missing in ${locale}`);
    }

    // 核心 UI 字串
    assert.ok(i18n.t("meta.title"));
    assert.ok(i18n.t("dialogue.speakerKohaku"));
    assert.ok(i18n.t("dialogue.introNormal"));
    assert.ok(i18n.t("dialogue.introFinal"));
    assert.ok(i18n.t("dialogue.chant3"));
    assert.ok(i18n.t("dialogue.chant2"));
    assert.ok(i18n.t("dialogue.chant1"));
    assert.ok(i18n.t("dialogue.morphReaction"));
    assert.ok(i18n.t("dialogue.qteSingleBreak"));
    assert.ok(i18n.t("dialogue.qteDualBreak"));
    assert.ok(i18n.t("dialogue.postBattleWin"));
    assert.ok(i18n.t("dialogue.postBattleLoss"));
    assert.ok(i18n.t("ui.enterStage"));
    assert.ok(i18n.t("ui.btnBuy"));
    assert.ok(i18n.t("ui.btnRematch"));
    assert.ok(i18n.t("ui.btnAutoBattle"));
    assert.ok(i18n.t("ui.autoBattleModalTitle"));
    assert.ok(i18n.t("ui.autoBattleModalDesc"));
    assert.ok(i18n.t("ui.autoBattleCountLabel"));
    assert.ok(i18n.t("ui.btnStartAutoBattle"));
    assert.ok(i18n.t("ui.btnCancel"));
    assert.ok(i18n.t("ui.btnStopAutoBattle"));
    assert.ok(i18n.t("ui.autoBattleHudRunning", { current: 1, total: 10, wins: 0, losses: 0 }));
    assert.ok(i18n.t("ui.autoBattleToastUpdateWin", { remaining: 5 }));
    assert.ok(i18n.t("ui.autoBattleToastUpdateLoss", { remaining: 5 }));
    assert.ok(i18n.t("ui.autoBattleToastFinished", { total: 10, wins: 8, losses: 2 }));
    assert.ok(i18n.t("ui.autoBattleToastStopped"));
    assert.ok(i18n.t("ui.frozenBadge", { hand: "Rock" }));
    assert.ok(i18n.t("ui.pauseModalTitle"));
    assert.ok(i18n.t("ui.pauseModalDesc"));
    assert.ok(i18n.t("ui.btnResumeBattle"));
    assert.ok(i18n.t("ui.btnAbandonBattle"));
    assert.ok(i18n.t("ui.selectLanguage"));
    assert.equal(i18n.t("meta.titleEm"), "Endless Koraku", "meta.titleEm 必須為 Endless Koraku");
    assert.ok(i18n.t("ui.homeRecordsTitle"));
    assert.ok(i18n.t("ui.homeRecordsDesc"));
    assert.ok(i18n.t("ui.statTotalCoinsEarned"));
    assert.ok(i18n.t("ui.statTotalXpEarned"));
    assert.ok(i18n.t("ui.statTotalBattles"));
    assert.ok(i18n.t("ui.statManualRecord"));
    assert.ok(i18n.t("ui.statAutoRecord"));
    assert.ok(i18n.t("ui.statWatermelonHits"));
    assert.ok(i18n.t("ui.stageAttempts", { total: 5 }));
    assert.ok(i18n.t("ui.stageRecordBadge", { autoWins: 3, manualLosses: 1 }));
    assert.ok(i18n.t("ui.stageStatsBreakdownTitle"));
    assert.ok(i18n.t("ui.footerEndlessAliceLink"));
    assert.ok(i18n.t("ui.menuRecords"));
    assert.ok(i18n.t("ui.menuRecordsSub"));
    assert.ok(i18n.t("ui.morphSelectCaption"));
    assert.ok(i18n.t("ui.openCheat"));
    assert.ok(i18n.t("ui.cheatAuthTitle"));
    assert.ok(i18n.t("ui.cheatAuthPrompt"));
    assert.ok(i18n.t("ui.cheatAuthConfirm"));
    assert.ok(i18n.t("ui.cheatAuthCancel"));
    assert.ok(i18n.t("ui.cheatAuthError"));
    assert.ok(i18n.t("ui.cheatAuthSuccess"));
    assert.ok(i18n.t("ui.unlock2PHint"));
    assert.ok(i18n.t("ui.musicToggle"));
    assert.ok(i18n.t("ui.musicToggleOn"));
    assert.ok(i18n.t("ui.musicToggleOff"));
    assert.ok(i18n.t("ui.sfxToggle"));
    assert.ok(i18n.t("ui.sfxToggleOn"));
    assert.ok(i18n.t("ui.sfxToggleOff"));
    assert.ok(i18n.t("ui.musicOnToast"));
    assert.ok(i18n.t("ui.musicOffToast"));
    assert.ok(i18n.t("ui.sfxOnToast"));
    assert.ok(i18n.t("ui.sfxOffToast"));
    assert.ok(i18n.t("ui.rewardEarned"));
    assert.ok(i18n.t("ui.zoomHighRes"));
    assert.ok(i18n.t("ui.clickToZoom"));
    assert.ok(i18n.t("ui.closeLightbox"));
    assert.ok(i18n.t("ui.saveRecord"));
    assert.ok(i18n.t("ui.saveRecordModalTitle"));
    assert.ok(i18n.t("ui.saveOverviewTitle"));
    assert.ok(i18n.t("ui.saveOverviewLevel"));
    assert.ok(i18n.t("ui.saveOverviewCoins"));
    assert.ok(i18n.t("ui.saveOverviewStage"));
    assert.ok(i18n.t("ui.saveOverviewBattles"));
    assert.ok(i18n.t("ui.saveOverviewEquipCount"));
    assert.ok(i18n.t("ui.saveSeedExportTitle"));
    assert.ok(i18n.t("ui.saveSeedExportDesc"));
    assert.ok(i18n.t("ui.btnCopySaveSeed"));
    assert.ok(i18n.t("ui.toastSeedCopied"));
    assert.ok(i18n.t("ui.saveSeedImportTitle"));
    assert.ok(i18n.t("ui.saveSeedImportDesc"));
    assert.ok(i18n.t("ui.importSeedPlaceholder"));
    assert.ok(i18n.t("ui.btnImportSaveSeed"));
    assert.ok(i18n.t("ui.confirmImportSeed"));
    assert.ok(i18n.t("ui.toastImportSuccess"));
    assert.ok(i18n.t("ui.toastImportFailed"));
    assert.ok(i18n.t("ui.toastSeedEmpty"));
    assert.ok(i18n.t("ui.dangerZoneTitle"));
    assert.ok(i18n.t("ui.dangerZoneDesc"));
    assert.ok(i18n.t("ui.btnModalResetSave"));
    assert.ok(i18n.t("ui.changelogTitle"));
    assert.ok(i18n.t("ui.changelogSubtitle"));
    assert.ok(i18n.t("ui.closeChangelog"));

    const changelogs = i18n.getChangelog();
    assert.ok(Array.isArray(changelogs) && changelogs.length >= 7);
    for (const log of changelogs) {
      assert.ok(log.version);
      assert.ok(log.date);
      assert.ok(log.tag);
      assert.ok(Array.isArray(log.changes) && log.changes.length > 0);
    }
  }
});

test("I18n 完整性檢查：所有 52 個系統與戰鬥提示/對話鍵在 4 語系下皆存在且非回退字串", () => {
  const i18n = new I18nService();
  const keysToVerify = [
    // Toast
    "toast.levelRequirementNotMet",
    // Combat
    "combat.morphWindowOnly",
    "combat.morphWindowExpired",
    "combat.insufficientMp",
    "combat.tookDamage",
    "combat.notInBattle",
    "combat.itemNotFound",
    "combat.resourceFull",
    "combat.itemDepleted",
    // Dialogue
    "dialogue.winDualMorphBoth",
    "dialogue.winDualBoth",
    "dialogue.winDualMorphSingle",
    "dialogue.winDualSingle",
    "dialogue.winDualMorphDoubleDmg",
    "dialogue.winDualDoubleDmg",
    "dialogue.winSingleMorph",
    "dialogue.winSingleNormal",
    "dialogue.drawMomoDodge",
    "dialogue.drawMomoHit",
    "dialogue.drawNormal",
    "dialogue.deflectedSingleAttack",
    "dialogue.dualQteMiss",
    "dialogue.dualQteSuccess",
    "dialogue.qteMiss",
    "dialogue.freezeNarration",
    "dialogue.dodgeDodge",
    "dialogue.dodgeDodgeDual",
    // Narration
    "narration.qteCounterPaper",
    "narration.qteCounterScissors",
    "narration.qteCounterRock",
    // Shop
    "shop.itemNotFound",
    "shop.insufficientCoins",
    "shop.itemPurchased",
    "shop.equipmentPurchased",
    // Equip
    "equip.invalidItem",
    "equip.notInInventory",
    "equip.invalidSlot",
    "equip.incompatibleSlot",
    "equip.equipped",
    "equip.slotEmpty",
    "equip.unequipped",
    // Growth
    "growth.invalidStat",
    "growth.noPoints",
    "growth.statIncreased",
    "growth.invalidSkill",
    "growth.levelRequirementNotMet",
    "growth.skillMaxLevel",
    "growth.insufficientPoints",
    "growth.skillUpgraded",
    // Cheat
    "cheat.updated",
    "cheat.unlockedAll",
    "cheat.unlockedGallery",
    // Save
    "save.invalidCode",
    "save.corruptCode",
    "save.imported",
    // Connection
    "connection.connecting",
    "connection.online",
    "connection.offline",
    "connection.reconnecting",
    "connection.disconnected",
    "connection.highLatency",
    "connection.kickedByNewConnection",
    "connection.disconnectCountdown",
    "connection.bannerConnecting",
    "connection.bannerOnline",
    "connection.bannerOffline",
    "connection.bannerReconnecting",
    "connection.bannerDisconnected",
    // BattleLog
    "battleLog.rpsWin",
    "battleLog.rpsLoss",
    "battleLog.rpsDraw",
    "battleLog.morphSuccess",
    "battleLog.morphFailed",
    "battleLog.qteCounterSuccess",
    "battleLog.qteCounterFail",
    "battleLog.momoProc",
    "battleLog.momoDodged",
    "battleLog.burnDamage",
    "battleLog.reflectDamage",
    "battleLog.thunderDamage",
    "battleLog.frostFreeze",
    "battleLog.shadowDodge",
    "battleLog.mpRegen",
    "battleLog.potionUsed",
    "battleLog.roundTimeout",
    "battleLog.battleDisconnectedSettled",
    "battleLog.battlePauseCount"
  ];

  for (const locale of LOCALE_ORDER) {
    i18n.setLocale(locale);
    for (const key of keysToVerify) {
      const translated = i18n.t(key, {
        resource: "HP",
        name: "Item",
        target: "Kohaku",
        damage: 10,
        hand: "Rock",
        slotName: "Weapon",
        level: 5,
        seconds: 10,
        remaining: 2,
        amount: 20,
        item: "Potion",
        stat: "HP"
      });
      assert.ok(translated, `Key '${key}' is empty in locale '${locale}'`);
      assert.notEqual(translated, key, `Key '${key}' is untranslated/missing in locale '${locale}'`);
    }
  }
});

test("四語系 key-set 結構等價：zh-Hant, zh-Hans, en, ja 鍵值集合完全一致", () => {
  function getFlatKeys(obj, prefix = "") {
    const keys = [];
    for (const [k, v] of Object.entries(obj)) {
      const full = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        keys.push(...getFlatKeys(v, full));
      } else {
        keys.push(full);
      }
    }
    return keys;
  }

  const hantKeys = new Set(getFlatKeys(DICTIONARY["zh-Hant"]));
  for (const locale of ["zh-Hans", "en", "ja"]) {
    const locKeys = new Set(getFlatKeys(DICTIONARY[locale]));
    const missing = [...hantKeys].filter((k) => !locKeys.has(k));
    const extra = [...locKeys].filter((k) => !hantKeys.has(k));
    assert.deepEqual(missing, [], `語系 '${locale}' 缺少以下鍵值: ${missing.join(", ")}`);
    assert.deepEqual(extra, [], `語系 '${locale}' 包含多餘鍵值: ${extra.join(", ")}`);
    assert.equal(locKeys.size, hantKeys.size, `語系 '${locale}' 鍵值總數 (${locKeys.size}) 與 zh-Hant (${hantKeys.size}) 不一致`);
  }
});

