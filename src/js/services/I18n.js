import {
  HANDS,
  DIRECTIONS,
  STAGES,
  SKILLS,
  ITEMS,
  EQUIPMENT_SLOTS,
  EQUIPMENT_ITEMS,
  GALLERY_ITEMS
} from "../config/gameConfig.js";

export const LOCALES = Object.freeze({
  "zh-Hant": { id: "zh-Hant", label: "繁體中文", code: "zh-TW" },
  "zh-Hans": { id: "zh-Hans", label: "简体中文", code: "zh-CN" },
  "en": { id: "en", label: "English", code: "en-US" },
  "ja": { id: "ja", label: "日本語", code: "ja-JP" }
});

export const LOCALE_ORDER = Object.freeze(["zh-Hant", "zh-Hans", "en", "ja"]);
export const DEFAULT_LOCALE = "en";
export const LOCALE_STORAGE_KEY = "koraku-rps-locale";

const DICTIONARY = {
  "zh-Hant": {
    meta: {
      title: "狐樂・絆之勝負",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火異聞",
      lead: "五秒定一手。看穿她的指尖，在敗勢裡抓住唯一的反擊。"
    },
    ui: {
      home: "首頁",
      level: "等級",
      xp: "經驗",
      coins: "星砂",
      soundToggle: "切換音效",
      langToggle: "語系",
      back: "返回",
      wins: "勝",
      losses: "敗",
      deepestStage: "最深章節",
      receptionSeal: "對戰<br>受付中",
      openCheat: "⚙️ 測試調試 / 作弊選單",
      resetSave: "重置存檔",
      resetConfirm: "確定要重置所有存檔進度嗎？此操作無法還原。",
      // Main menu
      menuStages: "開始對局",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "能力成長",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "緣側商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘圖鑑",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "遊戲指南",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "玩家裝備",
      menuEquipmentSub: "EQUIPMENT & BAG",
      menuRecords: "戦績統計",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅の記録と戦闘分析",
      homeRecordsDesc: "全章の戦績、実戦DPS、装備構成、成長記録の詳細分析。",
      theoreticalDps: "理論DPS",
      combatDps: "実戦DPS",
      currentEquipment: "現在の装備構成",
      currentLevelXp: "冒険レベルと経験値",
      consumablesUsed: "消費アイテム使用累計",
      morphSuccesses: "後出し変化成功",
      watermelonCutAnalysis: "スイカ割り段階別命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀合計",
      successRate: "成功率",
      damageDealt: "与ダメージ",
      damageTaken: "被ダメージ",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "獲得報酬",
      recentBattlesTitle: "直近100局の対戦記録",
      battleDuration: "戦闘時間",
      stageDamageDealt: "累計与ダメージ",
      stageDamageTaken: "累計被ダメージ",
      hpPotionCountUsed: "HPポーション使用: {count}本",
      mpPotionCountUsed: "MPポーション使用: {count}本",
      strikeAttempts: "{attempts} 回 ({successes} 命中 / {failures} 失敗)",
      resultWin: "勝利",
      resultLoss: "敗北",
      modeAuto: "自動",
      modeManual: "手動",
      homeRecordsTitle: "Journey Records & Combat Analysis",
      homeRecordsDesc: "Detailed records of your combat performance, gear loadout, and growth statistics across all chapters.",
      theoreticalDps: "Theoretical DPS",
      combatDps: "Combat DPS",
      currentEquipment: "Current Equipment Loadout",
      currentLevelXp: "Level & EXP Progress",
      consumablesUsed: "Consumables Used",
      morphSuccesses: "Morph Reversals",
      watermelonCutAnalysis: "Watermelon Slicing Stage Analysis",
      strikeStage: "Strike {index}",
      strikeTotal: "All 3 Strikes",
      successRate: "Success Rate",
      damageDealt: "Damage Dealt",
      damageTaken: "Damage Taken",
      qteSuccessRate: "QTE Success Rate",
      rewardsEarned: "Rewards Earned",
      recentBattlesTitle: "Recent 100 Battles Log",
      battleDuration: "Duration",
      stageDamageDealt: "Total Damage Dealt",
      stageDamageTaken: "Total Damage Taken",
      hpPotionCountUsed: "HP Potions Used: {count}",
      mpPotionCountUsed: "MP Potions Used: {count}",
      strikeAttempts: "{attempts} strikes ({successes} hit / {failures} miss)",
      resultWin: "WIN",
      resultLoss: "LOSS",
      modeAuto: "Auto",
      modeManual: "Manual",
      homeRecordsTitle: "旅程纪录与战斗分析",
      homeRecordsDesc: "详细记录您在各章节的战绩、实战输出表现、装备配置与各项成长统计。",
      theoreticalDps: "理论 DPS",
      combatDps: "实战 DPS",
      currentEquipment: "当前穿戴装备",
      currentLevelXp: "冒险等级与经验",
      consumablesUsed: "消耗品使用累计",
      morphSuccesses: "变拳逆转成功",
      watermelonCutAnalysis: "切西瓜阶段命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀加总",
      successRate: "成功率",
      damageDealt: "造成伤害",
      damageTaken: "承受伤害",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "获取奖励",
      recentBattlesTitle: "最近 100 局对战纪录",
      battleDuration: "战斗耗时",
      stageDamageDealt: "总造成伤害",
      stageDamageTaken: "总承受伤害",
      hpPotionCountUsed: "HP 药水使用: {count} 瓶",
      mpPotionCountUsed: "MP 药水使用: {count} 瓶",
      strikeAttempts: "{attempts} 刀 ({successes} 中 / {failures} 空)",
      resultWin: "胜利",
      resultLoss: "战败",
      modeAuto: "自动",
      modeManual: "手动",
      homeRecordsTitle: "旅程紀錄與戰鬥分析",
      homeRecordsDesc: "詳細記錄您在各章節的戰績、實戰輸出表現、裝備配置與各項成長統計。",
      theoreticalDps: "理論 DPS",
      combatDps: "實戰 DPS",
      currentEquipment: "當前穿戴裝備",
      currentLevelXp: "冒險等級與經驗",
      consumablesUsed: "消耗品使用累計",
      morphSuccesses: "變拳逆轉成功",
      watermelonCutAnalysis: "切西瓜階段命中分析",
      strikeStage: "第 {index} 刀",
      strikeTotal: "三刀加總",
      successRate: "成功率",
      damageDealt: "造成傷害",
      damageTaken: "承受傷害",
      qteSuccessRate: "QTE 成功率",
      rewardsEarned: "獲取獎勵",
      recentBattlesTitle: "最近 100 局對戰紀錄",
      battleDuration: "戰鬥耗時",
      stageDamageDealt: "總造成傷害",
      stageDamageTaken: "總承受傷害",
      hpPotionCountUsed: "HP 藥水使用: {count} 瓶",
      mpPotionCountUsed: "MP 藥水使用: {count} 瓶",
      strikeAttempts: "{attempts} 刀 ({successes} 中 / {failures} 空)",
      resultWin: "勝利",
      resultLoss: "戰敗",
      modeAuto: "自動",
      modeManual: "手動",
      menuRecords: "Records & Stats",
      menuRecordsSub: "RECORDS & STATS",
      menuRecords: "战绩统计",
      menuRecordsSub: "RECORDS & STATS",
      menuRecords: "戰績統計",
      menuRecordsSub: "RECORDS & STATS",
      // Screens headings
      stagesTitle: "選擇章節",
      stagesSubtitle: "小樂會隨章節變得更有耐力。提升等級後，新的鏡界便會開啟。",
      shopTitle: "緣側商店",
      shopSubtitle: "選購靈藥與神威武裝。購入之裝備會直接放入裝備背包。",
      growthTitle: "能力成長",
      growthSubtitle: "升級獲得點數分配，或修煉強化必殺與雙手奧義。",
      galleryTitle: "狐娘圖鑑",
      gallerySubtitle: "記錄旅程中的點滴回憶與特別造型插畫。",
      guideTitle: "遊戲指南",
      guideSubtitle: "掌握猜拳決鬥、QTE 反制、時機變拳與雙手奧義的關鍵秘訣。",
      equipmentTitle: "裝備與背包",
      equipmentSubtitle: "穿戴神威裝備強化各項屬性，於對決中發揮特殊靈力加護。",
      // Equipment paperdoll
      paperdollTitle: "當前穿戴裝備",
      paperdollSummaryTitle: "✦ 角色穿戴紙娃娃與屬性總覽（點擊格位可直接卸下裝備）",
      paperdollEquipped: "已穿戴",
      paperdollEmpty: "無裝備",
      paperdollUnequipTip: "（點擊格位卸下）",
      bagTitle: "裝備背包",
      bagEmpty: "背包內目前沒有裝備。可至商店購買！",
      bagEquipBtn: "裝備",
      bagUnequipBtn: "卸下",
      bagEquippedBadge: "已穿戴",
      twoHandedBadge: "雙手武器",
      // Growth
      unallocatedSp: "未分配點數 (SP)",
      statHpName: "生命上限 (HP)",
      statHpDesc: "增加對決中的生存容錯率",
      statMpName: "靈力上限 (MP)",
      statMpDesc: "支撐變拳秘術與技能發動",
      statDmgName: "基礎攻擊 (DMG)",
      statDmgDesc: "提升常規猜拳勝出時的打擊傷害",
      btnAllocate: "分配 +1",
      skillsHeading: "奧義與必殺技能",
      btnUpgradeSkill: "升級技能",
      skillMaxLevel: "已達最高等級",
      skillLocked: "尚未解鎖（需 Lv.{level}）",
      skillCostSp: "消耗 {sp} SP",
      // Shop
      shopPaperdollToggle: "✦ 角色穿戴紙娃娃與屬性總覽（點擊格位可直接卸下裝備）",
      shopConsumablesHeading: "靈露藥水",
      shopEquipmentHeading: "神威裝備武裝",
      btnBuy: "購買",
      btnEquipDirect: "立即穿戴",
      itemOwned: "已持有",
      insufficientCoins: "星砂不足！",
      // Battle
      battleRounds: "回合",
      targetEnemy: "當前鎖定",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "變拳秘術 (25 MP)",
      useHpPotion: "HP 藥水",
      useMpPotion: "MP 藥水",
      qteFailCount: "失誤",
      qteTimeRemaining: "反制時間",
      dualQteNotice: "雙重 QTE 反制！請連續輸入 WASD / 方向鍵！",
      // Post-battle
      postBattleVictoryTitle: "對局獲勝！",
      postBattleDefeatTitle: "對局惜敗...",
      postBattleVictoryDesc: "成功擊敗了小樂，獲得了豐富的經驗與星砂！",
      postBattleDefeatDesc: "未能抵擋小樂的猛攻，回去整備再戰吧！",
      btnAskSwimsuit: "請小樂換穿泳裝",
      btnPlayWatermelon: "進行海邊切西瓜挑戰",
      btnContinue: "返回章節選單",
      btnRetry: "再次挑戰",
      // Watermelon
      watermelonTitle: "蒙眼切西瓜大挑戰！",
      watermelonDesc: "當指針進入綠色完美區域時按下按鈕，考驗你的直覺與時機！",
      btnSliceWatermelon: "就是現在！切！",
      watermelonScore: "切中次數：",
      autoWatermelonStock: "累計切西瓜次數：{count} / 999",
      btnNextWatermelonRound: "進行下一輪切西瓜 (剩餘 {count})",
      btnStartWatermelonRound: "開始切西瓜",
      floatingWatermelonTitle: "🍉 蒙眼切西瓜 (自動刷關累積)",
      floatingWatermelonAimDesc: "白色指針進入綠色區域時按下揮刀！",
      floatingWatermelonFinished: "本輪三刀結束！累計剩餘：{count} 次",
      floatingWatermelonNoStock: "切西瓜次數已用盡，等待自動刷關勝場累積中...",
      // Guide
      guideRpsTitle: "基礎猜拳規則",
      guideRpsDesc: "剪刀剋布、布剋石頭、石頭剋剪刀。猜贏對小樂造成傷害，平手可能觸發摸摸，猜輸進入 QTE 反制階段。",
      guideQteTitle: "QTE 絕地反制",
      guideQteDesc: "猜輸後在限定時間內依序輸入方向鍵。反制成功可免除傷害並給予小樂反擊；失敗則承受重擊。",
      guideMorphTitle: "時機變拳秘術",
      guideMorphDesc: "在看到小樂出拳後的極短反應窗口內消耗 MP 發動變拳，可在 2 秒內手動選擇手勢反制小樂！若按錯將承擔輸拳或平手摸摸判定。",
      guideDualTitle: "雙手解放奧義",
      guideDualDesc: "在第四章解鎖雙手技能後，可同時以左手與右手獨立出拳，分別對決兩位小樂！",
      // Cheat Modal
      cheatModalTitle: "⚙️ 測試調試 / 作弊選單",
      cheatSetLevel: "設定等級",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能點 (+50)",
      cheatUnlockAllStages: "解鎖所有關卡",
      cheatUnlockAllGallery: "解鎖所有圖鑑",
      cheatAddPotions: "獲得各 10 瓶藥水",
      cheatAddAllEquip: "獲得全套神威裝備",
      cheatClose: "關閉",
      // Stats summary
      statDamage: "攻擊",
      statHp: "生命",
      statMp: "魔力",
      statArmor: "減傷",
      statDodge: "閃避",
      statMpRegen: "魔力回復",
      statReflect: "反彈",
      statBurn: "燃燒",
      statFreeze: "冰凍",
      statThunder: "雷擊",
      statMomoBonus: "摸摸加成",
      statCoinBonus: "星砂加成",
      // Action strings
      enterStage: "進入對局　›",
      stageNeedLevel: "需達 Lv. {level}　🔒",
      stageCleared: "已締結・再次挑戰　✓",
      ruleFocus: "規則重點：",
      winReward: "勝利獎勵：",
      notCleared: "尚未通關",
      unlockRuleAfterClear: "打贏此關卡後揭曉具體規則",
      equippedBadge: "已裝備 ✓",
      ownedInBag: "背包持有",
      equipNow: "即刻穿戴",
      equipBuy: "購入",
      twoHandedOccupied: "⚔️ (雙手佔用)",
      unitDamage: "每次勝利傷害",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "每投入 1 點，對小樂造成的傷害增加 5。",
      statAllocHpDesc: "每投入 1 點，最大生命增加 10。",
      statAllocMpDesc: "每投入 1 點，最大魔力增加 10。",
      spInvestBtn: "投入 1 SP　＋",
      momoProcRate: "平手發動率",
      dualHandUnlocked: "已解放",
      dualHandLocked: "未解鎖",
      dualHandDescSub: "第四關雙手出拳",
      nextLevelRate: "下一級機率: {chance}%",
      notYetUnlocked: "尚未解鎖",
      unlockSwimsuitHint: "於對局勝利後觸發泳裝事件以解鎖",
      btnAskSwimsuitSpace: "請小樂穿泳裝",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜",
      btnNextStrikeSpace: "進行第 {attempt} 刀",
      btnRematch: "再次挑戰",
      btnSelectStages: "選擇章節",
      btnReturnHome: "回大廳",
      unrevealed: "未揭曉",
      preparing: "準備中",
      countdownCaption: "出拳倒數",
      morphCaption: "按 F 變拳",
      morphSelectCaption: "2秒內選擇變拳手勢！",
      qteCaption: "反制機會",
      settleCaption: "回合結算",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "和",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自動刷關",
      autoBattleModalTitle: "⚡ 自動連續刷關設定",
      autoBattleModalDesc: "連續自動進行關卡對局，依據角色當前屬性與裝備配置挑戰。獲勝時直接跳過切西瓜領取獎勵並接續下一場；失敗時自動扣除次數繼續重試。",
      autoBattleCountLabel: "選擇連續刷關次數：",
      autoBattleTimes: "{count} 次",
      btnStartAutoBattle: "⚡ 開始自動刷關",
      btnCancel: "取消",
      btnStopAutoBattle: "⏹ 停止刷關",
      btnPauseAutoBattle: "暫停刷關",
      btnResumeAutoBattle: "繼續刷關",
      autoBattleHudPaused: "自動刷關已暫停：第 {current} / {total} 次（勝: {wins}, 敗: {losses}）",
      autoBattleToastPaused: "已暫停自動刷關，可手動操作或再次點擊繼續。",
      autoBattleToastResumed: "已繼續自動刷關。",
      autoBattleHudRunning: "自動刷關中：第 {current} / {total} 次（勝: {wins}, 敗: {losses}）",
      autoBattleToastUpdateWin: "自動刷關：獲勝！剩餘 {remaining} 場...",
      autoBattleToastUpdateLoss: "自動刷關：戰敗！剩餘 {remaining} 場...",
      autoBattleToastFinished: "🎉 自動刷關完成！共進行 {total} 場（勝: {wins}, 敗: {losses}）。",
      autoBattleToastStopped: "已手動停止自動刷關。",
      mustClearOnceForAuto: "必須先手動戰勝該關卡一次後，才可開啟自動刷關！",
      frozenBadge: "❄️ 霜月冰結：小樂【{hand}】已被封印！",
      ownedCount: "擁有 {total}",
      equippedCountBadge: "(已裝備 {count})",
      pauseModalTitle: "⏸️ 對局暫停中",
      pauseModalDesc: "戰鬥與 QTE 計時已完全暫停。您可以隨時繼續對局，或放棄本場戰鬥返回大廳。",
      btnResumeBattle: "繼續戰鬥",
      btnAbandonBattle: "放棄對局 (返回大廳)",
      selectLanguage: "切換語系",
      homeRecordsTitle: "戦績と獲得リソース統計",
      homeRecordsDesc: "小楽との対決履歴、手動勝敗、自動周回実績、累計獲得リソースの記録。",
      statTotalCoinsEarned: "累計獲得星砂",
      statTotalXpEarned: "累計獲得経験値",
      statTotalBattles: "総対局数",
      statManualRecord: "手動対決戦績",
      statAutoRecord: "自動周回戦績",
      statWatermelonHits: "スイカ命中累計",
      stageAttempts: "挑戦 {total} 回",
      stageRecordBadge: "自動勝 {autoWins} / 手動敗 {manualLosses}",
      stageStatsBreakdownTitle: "各章挑戦統計",
      footerEndlessAliceLink: "Steam で『Endless Alice』をチェック",
      times: "回",
      homeRecordsTitle: "Records & Resource Statistics",
      homeRecordsDesc: "Tracking every match, manual performance, auto-battle outcomes, and all cumulative resources.",
      statTotalCoinsEarned: "Total Star Sand Earned",
      statTotalXpEarned: "Total EXP Earned",
      statTotalBattles: "Total Battles",
      statManualRecord: "Manual Record",
      statAutoRecord: "Auto Battle Record",
      statWatermelonHits: "Watermelon Slices Hit",
      stageAttempts: "Attempts: {total}",
      stageRecordBadge: "Auto Win: {autoWins} / Manual Loss: {manualLosses}",
      stageStatsBreakdownTitle: "Chapter Statistics Breakdown",
      footerEndlessAliceLink: "Explore 'Endless Alice' on Steam",
      times: "times",
      homeRecordsTitle: "战绩与资源统计",
      homeRecordsDesc: "记录您与小乐的每一场对局、手动战绩、自动刷关成果及累计获取的所有资源。",
      statTotalCoinsEarned: "累计获得星砂",
      statTotalXpEarned: "累计获得经验",
      statTotalBattles: "总对战场次",
      statManualRecord: "手动对决战绩",
      statAutoRecord: "自动刷关战绩",
      statWatermelonHits: "西瓜切中累计",
      stageAttempts: "挑战 {total} 次",
      stageRecordBadge: "自动胜 {autoWins} / 手动败 {manualLosses}",
      stageStatsBreakdownTitle: "各章节挑战统计",
      footerEndlessAliceLink: "前往 Steam 探索《Endless Alice》",
      times: "次",
      homeRecordsTitle: "戰績與資源統計",
      homeRecordsDesc: "紀錄您與小樂的每一場對局、手動戰績、自動刷關成果及累計獲取的所有資源。",
      statTotalCoinsEarned: "累計獲得星砂",
      statTotalXpEarned: "累計獲得經驗",
      statTotalBattles: "總對局場次",
      statManualRecord: "手動對決戰績",
      statAutoRecord: "自動刷關戰績",
      statWatermelonHits: "西瓜切中累計",
      stageAttempts: "挑戰 {total} 次",
      stageRecordBadge: "自動勝 {autoWins} / 手動敗 {manualLosses}",
      stageStatsBreakdownTitle: "各章節挑戰統計",
      footerEndlessAliceLink: "前往 Steam 探索《Endless Alice》",
      times: "次",
    },
    hands: {
      rock: { label: "石頭", glyph: "✊" },
      paper: { label: "布", glyph: "✋" },
      scissors: { label: "剪刀", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壹ノ章",
        name: "初逢・朱鳥居",
        subtitle: "先從看穿她的小動作開始",
        bossRuleSummary: "5 秒／4 向容錯",
        bossRuleDetail: "亮拳倒數 5 秒、QTE 僅出現正 4 方向（按錯不計失敗），變拳時機 1.0 秒，小樂不閃避摸摸。"
      },
      2: {
        chapter: "貳ノ章",
        name: "夕映・狐火",
        subtitle: "黃昏會把猶豫照得一清二楚",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒數 3 秒、QTE 包含 8 方向（按錯 2 次失敗），變拳時機 0.75 秒，小樂有 11% 機率閃避摸摸。"
      },
      3: {
        chapter: "參ノ章",
        name: "月下・九尾試",
        subtitle: "別被九道殘影騙走視線",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒數 3 秒、QTE 7 鍵長度（按錯 1 次失敗），變拳時機 0.5 秒，小樂有 33% 機率閃避摸摸。"
      },
      4: {
        chapter: "終ノ章",
        name: "鏡界・白金小樂",
        subtitle: "跨越鏡面，迎戰雙生的 2P 色",
        bossRuleSummary: "3 秒／雙小樂雙血條",
        bossRuleDetail: "亮拳倒數 3 秒、雙小樂雙血條（受擊 2 倍傷害）、7 鍵 QTE，極限變拳時機 0.25 秒，小樂有 66% 機率閃避摸摸。"
      }
    },
    skills: {
      momo: {
        name: "摸摸",
        glyph: "撫",
        description: "平手時以機率自動發動，偷摸摸場上隨機一個小樂對其造成 25 點傷害。"
      },
      dualHand: {
        name: "雙手解放",
        glyph: "掌",
        description: "解放另一隻手！在第四關對決中可同時使用左手（對左小樂）與右手（對右小樂）獨立出拳。"
      }
    },
    items: {
      hpPotion: {
        name: "緋露藥",
        shortName: "HP 藥水",
        description: "神社特製緋紅靈露，使用後立即恢復 25 點生命值。"
      },
      mpPotion: {
        name: "蒼月露",
        shortName: "MP 藥水",
        description: "汲取月華凝成的靈泉，使用後立即恢復 25 點靈力值。"
      }
    },
    equipmentSlots: {
      head: "頭盔",
      shoulders: "肩甲",
      chest: "胸甲",
      belt: "腰帶",
      boots: "鞋子",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "戒指 1",
      ring2: "戒指 2",
      earring1: "耳環 1",
      earring2: "耳環 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金剛胸甲",
        description: "玄武神靈加護的重型鎧甲。受到的傷害直接減免 25 點（可與盾牌減傷疊加）。"
      },
      chest_ninja: {
        name: "靈狐・幻影羽織",
        description: "由九尾狐毛編織的靈幻羽織。猜輸受擊時有 25% 機率觸發殘影閃避，完全免疫本次傷害！"
      },
      chest_miko: {
        name: "淨世・白狐千早",
        description: "神社巫女穿著的純白千早服。每回合結束時回復 15 點 MP。"
      },
      chest_mirror: {
        name: "八咫・鏡光護胸",
        description: "鑲嵌神鏡碎片的護胸裝甲。受到小樂攻擊時，以鏡光反彈 40 點傷害給小樂。"
      },
      sword_flame: {
        name: "業火・炎之太刀",
        description: "刀身繚繞著永不熄滅的狐火。回合結束時對小樂造成 30 點燃燒傷害。"
      },
      sword_frost: {
        name: "霜月・冰結靈刃",
        description: "散發刺骨寒氣的靈刃。攻擊命中時 30% 機率觸發霜月冰結，隨機封印小樂下一回合的其中一種出拳手勢。"
      },
      sword_thunder: {
        name: "雷霆・神鳴迅劍",
        description: "雷鳴纏繞的刺劍。QTE 反制成功時追加 50 點雷擊傷害。"
      },
      sword_great_nine: {
        name: "破滅・九尾雙手巨劍",
        description: "蘊含九尾狂氣的雙手大劍（佔用雙手）。常規出拳獲勝傷害提高為 1.5 倍。"
      },
      shield_suzaku: {
        name: "結界・朱雀盾",
        description: "刻有朱雀神紋的靈盾。受到的猜輸與 QTE 失敗傷害降低 30 點。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "隱於夜幕的短匕。可裝備於主手或副手，平手摸摸傷害額外 +15 點。"
      },
      helm_fox: {
        name: "妖狐面具",
        description: "依小樂容貌雕琢的靈狐面具。提供均衡的生命、魔力與攻擊加成。"
      },
      shoulders_crimson: {
        name: "緋紅之肩鎧",
        description: "鳥居朱漆淬鍊的堅固肩鎧。大幅提升生命上限與攻擊力。"
      },
      belt_shimenawa: {
        name: "注連繩神靈腰帶",
        description: "神社結界編織的神繩腰帶。藥水回復效果額外提升 10 點。"
      },
      boots_gale: {
        name: "疾風之草履",
        description: "踏風而行的神行草履。QTE 反制時間延長 1.0 秒。"
      },
      earring_magatama: {
        name: "八尺瓊・勾玉耳環",
        description: "翠綠溫潤的古老勾玉。變拳技能 MP 消耗降低 5 點。"
      },
      ring_ruby: {
        name: "狐火紅玉戒指",
        description: "封印狐火靈氣的紅寶石戒指。提升生命與攻擊。"
      },
      ring_sapphire: {
        name: "月華藍玉戒指",
        description: "映照幽藍月光的寶石戒指。提升魔力與攻擊。"
      },
      badge_bond: {
        name: "絆之守護胸章",
        description: "與小樂深厚羈絆的信物。全面提升能力，且戰勝時額外獲得 20% 星砂。"
      }
    },
    gallery: {
      swimsuit_default: {
        name: "夏日祭・清涼泳裝",
        variantName: "預設泳裝",
        description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。"
      },
      swimsuit_watermelon: {
        name: "海風・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣。"
      }
    },
    dialogue: {
      speakerKohaku: "小樂",
      speakerPlatinumKohaku: "白金小樂",
      speakerNarrator: "旁白",
      homeGreeting: "準備好了嗎？這次可別把視線移開喔。",
      introNormal: "出拳一決。讓我看看你的決心吧。",
      introFinal: "鏡中的我，可不會手下留情。",
      chant3: "剪刀",
      chant2: "石頭",
      chant1: "布！",
      morphReaction: "咦……在最後一瞬間變拳了？",
      qteSingleBreak: "抓到破綻了！想躲開的話，就跟上我的節奏！",
      qteDualBreak: "雙重破綻！跟上我們的雙生節奏吧！",
      postBattleWin: "這次是你贏了。要把勝利用在什麼願望上呢？",
      postBattleLoss: "還有什麼要說的嗎？回去再練練吧！",
      askSwimsuitLine: "泳裝？真拿你沒辦法……只准看一下喔。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指針進入綠色區域時，就喊『就是現在！』！",
      watermelonHit: "漂亮！這一刀切中了。還有 {remaining} 刀。",
      watermelonMiss: "差一點點！還有 {remaining} 刀，下一次再來。",
      watermelonAllHit: "三刀都結束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都結束了。下次再一起抓準時機吧。",
      itemUsed: "使用「{name}」，恢復了 {restored} 點 {resource}。"
    }
  },

  "zh-Hans": {
    meta: {
      title: "狐乐・绊之胜负",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火异闻",
      lead: "五秒定一手。看穿她的指尖，在败势中抓住唯一的反击。"
    },
    ui: {
      home: "首页",
      level: "等级",
      xp: "经验",
      coins: "星砂",
      soundToggle: "切换音效",
      langToggle: "语言",
      back: "返回",
      wins: "胜",
      losses: "负",
      deepestStage: "最深章节",
      receptionSeal: "对战<br>接待中",
      openCheat: "⚙️ 测试调试 / 作弊菜单",
      resetSave: "重置存档",
      resetConfirm: "确定要重置所有存档进度吗？此操作无法撤销。",
      menuStages: "开始对局",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "属性成长",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "缘侧商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘图鉴",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "游戏指南",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "玩家装备",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "选择章节",
      stagesSubtitle: "小乐会随章节变得更有耐力。提升等级后，新的镜界便会开启。",
      shopTitle: "缘侧商店",
      shopSubtitle: "选购灵药与神威武装。购入之装备会直接放入装备背包。",
      growthTitle: "属性成长",
      growthSubtitle: "升级获得点数分配，或修练强化必杀与双手奥义。",
      galleryTitle: "狐娘图鉴",
      gallerySubtitle: "记录旅程中的点滴回忆与特别造型插画。",
      guideTitle: "游戏指南",
      guideSubtitle: "掌握猜拳决斗、QTE 反制、时机变拳与双手奥义的关键秘诀。",
      equipmentTitle: "装备与背包",
      equipmentSubtitle: "穿戴神威装备强化各项属性，于对决中发挥特殊灵力加护。",
      paperdollTitle: "当前穿戴装备",
      paperdollSummaryTitle: "✦ 角色穿戴纸娃娃与属性总览（点击格位可直接卸下装备）",
      paperdollEquipped: "已穿戴",
      paperdollEmpty: "无装备",
      paperdollUnequipTip: "（点击格位卸下）",
      bagTitle: "装备背包",
      bagEmpty: "背包内目前没有装备。可前往商店购买！",
      bagEquipBtn: "装备",
      bagUnequipBtn: "卸下",
      bagEquippedBadge: "已穿戴",
      twoHandedBadge: "双手武器",
      unallocatedSp: "未分配点数 (SP)",
      statHpName: "生命上限 (HP)",
      statHpDesc: "增加对决中的生存容错率",
      statMpName: "灵力上限 (MP)",
      statMpDesc: "支撑变拳秘术与技能发动",
      statDmgName: "基础攻击 (DMG)",
      statDmgDesc: "提升常规猜拳胜出时的打击伤害",
      btnAllocate: "分配 +1",
      skillsHeading: "奥义与必杀技能",
      btnUpgradeSkill: "升级技能",
      skillMaxLevel: "已达最高等级",
      skillLocked: "尚未解锁（需 Lv.{level}）",
      skillCostSp: "消耗 {sp} SP",
      shopPaperdollToggle: "✦ 角色穿戴纸娃娃与属性总览（点击格位可直接卸下装备）",
      shopConsumablesHeading: "灵露药水",
      shopEquipmentHeading: "神威装备武装",
      btnBuy: "购买",
      btnEquipDirect: "立即穿戴",
      itemOwned: "已持有",
      insufficientCoins: "星砂不足！",
      battleRounds: "回合",
      targetEnemy: "当前锁定",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "变拳秘术 (25 MP)",
      useHpPotion: "HP 药水",
      useMpPotion: "MP 药水",
      qteFailCount: "失误",
      qteTimeRemaining: "反制时间",
      dualQteNotice: "双重 QTE 反制！请连续输入 WASD / 方向键！",
      postBattleVictoryTitle: "对局获胜！",
      postBattleDefeatTitle: "对局惜败...",
      postBattleVictoryDesc: "成功击败了小乐，获得了丰厚的经验与星砂！",
      postBattleDefeatDesc: "未能抵挡小乐的猛攻，回去整备再战吧！",
      btnAskSwimsuit: "请小乐换穿泳装",
      btnPlayWatermelon: "进行海边切西瓜挑战",
      btnContinue: "返回章节菜单",
      btnRetry: "再次挑战",
      watermelonTitle: "蒙眼切西瓜大挑战！",
      watermelonDesc: "当指针进入绿色完美区域时按下按钮，考验你的直觉与时机！",
      btnSliceWatermelon: "就是现在！切！",
      watermelonScore: "切中次数：",
      autoWatermelonStock: "累计切西瓜次数：{count} / 999",
      btnNextWatermelonRound: "进行下一轮切西瓜 (剩余 {count})",
      btnStartWatermelonRound: "开始切西瓜",
      floatingWatermelonTitle: "🍉 蒙眼切西瓜 (自动刷关累积)",
      floatingWatermelonAimDesc: "白色指针进入绿色区域时按下挥刀！",
      floatingWatermelonFinished: "本轮三刀结束！累计剩余：{count} 次",
      floatingWatermelonNoStock: "切西瓜次数已用尽，等待自动刷关胜场累积中...",
      guideRpsTitle: "基础猜拳规则",
      guideRpsDesc: "剪刀克布、布克石头、石头克剪刀。猜赢对小乐造成伤害，平手可能触发摸摸，猜输进入 QTE 反制阶段。",
      guideQteTitle: "QTE 绝地反制",
      guideQteDesc: "猜输后在限定时间内依次输入方向键。反制成功可免除伤害并给小乐予以反击；失败则承受重创。",
      guideMorphTitle: "时机变拳秘术",
      guideMorphDesc: "在看到小乐出拳后的极短反应窗口内消耗 MP 发动变拳，可在 2 秒内手动选择手势反制小乐！若按错将承担输拳或平手摸摸判定。",
      guideDualTitle: "双手解放奥义",
      guideDualDesc: "在第四章解锁双手技能后，可同时以左手与右手独立出拳，分别对决两位小乐！",
      cheatModalTitle: "⚙️ 测试调试 / 作弊菜单",
      cheatSetLevel: "设定等级",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能点 (+50)",
      cheatUnlockAllStages: "解锁所有关卡",
      cheatUnlockAllGallery: "解锁所有图鉴",
      cheatAddPotions: "获得各 10 瓶药水",
      cheatAddAllEquip: "获得全套神威装备",
      cheatClose: "关闭",
      statDamage: "攻击",
      statHp: "生命",
      statMp: "魔力",
      statArmor: "减伤",
      statDodge: "闪避",
      statMpRegen: "魔力回复",
      statReflect: "反弹",
      statBurn: "燃烧",
      statFreeze: "冰冻",
      statThunder: "雷击",
      statMomoBonus: "摸摸加成",
      statCoinBonus: "星砂加成",
      // Action strings
      enterStage: "进入对局　›",
      stageNeedLevel: "需达 Lv. {level}　🔒",
      stageCleared: "已缔结・再次挑战　✓",
      ruleFocus: "规则重点：",
      winReward: "胜利奖励：",
      notCleared: "尚未通关",
      unlockRuleAfterClear: "打赢此关卡后揭晓具体规则",
      equippedBadge: "已装备 ✓",
      ownedInBag: "背包持有",
      equipNow: "即刻穿戴",
      equipBuy: "购买",
      twoHandedOccupied: "⚔️ (双手占用)",
      unitDamage: "每次胜利伤害",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "每投入 1 点，对小乐造成的伤害增加 5。",
      statAllocHpDesc: "每投入 1 点，最大生命增加 10。",
      statAllocMpDesc: "每投入 1 点，最大魔力增加 10。",
      spInvestBtn: "投入 1 SP　＋",
      momoProcRate: "平手发动率",
      dualHandUnlocked: "已解放",
      dualHandLocked: "未解锁",
      dualHandDescSub: "第四关双手出拳",
      nextLevelRate: "下一级概率: {chance}%",
      notYetUnlocked: "尚未解锁",
      unlockSwimsuitHint: "于对局胜利后触发泳装事件以解锁",
      btnAskSwimsuitSpace: "请小乐穿泳装",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜",
      btnNextStrikeSpace: "进行第 {attempt} 刀",
      btnRematch: "再次挑战",
      btnSelectStages: "选择章节",
      btnReturnHome: "回大厅",
      unrevealed: "未揭晓",
      preparing: "准备中",
      countdownCaption: "出拳倒计时",
      morphCaption: "按 F 变拳",
      morphSelectCaption: "2秒内选择变拳手势！",
      qteCaption: "反制机会",
      settleCaption: "回合结算",
      battleWon: "胜",
      battleLost: "负",
      battleDraw: "和",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自动刷关",
      autoBattleModalTitle: "⚡ 自动连续刷关设置",
      autoBattleModalDesc: "连续自动进行关卡对局，依据角色当前属性与装备配置挑战。获胜时直接跳过切西瓜领取奖励并接续下一场；失败时自动扣除次数继续重试。",
      autoBattleCountLabel: "选择连续刷关次数：",
      autoBattleTimes: "{count} 次",
      btnStartAutoBattle: "⚡ 开始自动刷关",
      btnCancel: "取消",
      btnStopAutoBattle: "⏹ 停止刷关",
      btnPauseAutoBattle: "暂停刷关",
      btnResumeAutoBattle: "继续刷关",
      autoBattleHudPaused: "自动刷关已暂停：第 {current} / {total} 次（胜: {wins}, 败: {losses}）",
      autoBattleToastPaused: "已暂停自动刷关，可手动操作或再次点击继续。",
      autoBattleToastResumed: "已继续自动刷关。",
      autoBattleHudRunning: "自动刷关中：第 {current} / {total} 次（胜: {wins}, 败: {losses}）",
      autoBattleToastUpdateWin: "自动刷关：获胜！剩余 {remaining} 场...",
      autoBattleToastUpdateLoss: "自动刷关：战败！剩余 {remaining} 场...",
      autoBattleToastFinished: "🎉 自动刷关完成！共进行 {total} 场（胜: {wins}, 败: {losses}）。",
      autoBattleToastStopped: "已手动停止自动刷关。",
      mustClearOnceForAuto: "必须先手动战胜该关卡一次后，才可开启自动刷关！",
      frozenBadge: "❄️ 霜月冰结：小乐【{hand}】已被封印！",
      ownedCount: "拥有 {total}",
      equippedCountBadge: "(已装备 {count})",
      pauseModalTitle: "⏸️ 对局暂停中",
      pauseModalDesc: "战斗与 QTE 计时已完全暂停。您可以随时继续对局，或放弃本场战斗返回大厅。",
      btnResumeBattle: "继续战斗",
      btnAbandonBattle: "放弃对局 (返回大厅)",
      selectLanguage: "切换语言",
    },
    hands: {
      rock: { label: "石头", glyph: "✊" },
      paper: { label: "布", glyph: "✋" },
      scissors: { label: "剪刀", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壹ノ章",
        name: "初遇・朱鸟居",
        subtitle: "先从看穿她的小动作开始",
        bossRuleSummary: "5 秒／4 向容错",
        bossRuleDetail: "亮拳倒计时 5 秒、QTE 仅出现正 4 方向（按错不计失败），变拳时机 1.0 秒，小乐不闪避摸摸。"
      },
      2: {
        chapter: "贰ノ章",
        name: "夕映・狐火",
        subtitle: "黄昏会把犹豫照得一清二楚",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒计时 3 秒、QTE 包含 8 方向（按错 2 次失败），变拳时机 0.75 秒，小乐有 11% 概率闪避摸摸。"
      },
      3: {
        chapter: "叁ノ章",
        name: "月下・九尾试",
        subtitle: "别被九道残影骗走视线",
        bossRuleSummary: "3 秒",
        bossRuleDetail: "亮拳倒计时 3 秒、QTE 7 键长度（按错 1 次失败），变拳时机 0.5 秒，小乐有 33% 概率闪避摸摸。"
      },
      4: {
        chapter: "终ノ章",
        name: "镜界・白金小乐",
        subtitle: "跨越镜面，迎战双生的 2P 色",
        bossRuleSummary: "3 秒／双小乐双血条",
        bossRuleDetail: "亮拳倒计时 3 秒、双小乐双血条（受击 2 倍伤害）、7 键 QTE，极限变拳时机 0.25 秒，小乐有 66% 概率闪避摸摸。"
      }
    },
    skills: {
      momo: {
        name: "摸摸",
        glyph: "抚",
        description: "平手时以概率自动发动，偷摸摸场上随机一个小乐对其造成 25 点伤害。"
      },
      dualHand: {
        name: "双手解放",
        glyph: "掌",
        description: "解放另一只手！在第四关对决中可同时使用左手（对左小乐）与右手（对右小乐）独立出拳。"
      }
    },
    items: {
      hpPotion: {
        name: "绯露药",
        shortName: "HP 药水",
        description: "神社特制绯红灵露，使用后立即恢复 25 点生命值。"
      },
      mpPotion: {
        name: "苍月露",
        shortName: "MP 药水",
        description: "汲取月华凝成的灵泉，使用后立即恢复 25 点灵力值。"
      }
    },
    equipmentSlots: {
      head: "头盔",
      shoulders: "肩甲",
      chest: "胸甲",
      belt: "腰带",
      boots: "鞋子",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "戒指 1",
      ring2: "戒指 2",
      earring1: "耳环 1",
      earring2: "耳环 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金刚胸甲",
        description: "玄武神灵加护的重型铠甲。受到的伤害直接减免 25 点（可与盾牌减伤叠加）。"
      },
      chest_ninja: {
        name: "灵狐・幻影羽织",
        description: "由九尾狐毛编织的灵幻羽织。猜输受击时有 25% 概率触发残影闪避，完全免疫本次伤害！"
      },
      chest_miko: {
        name: "净世・白狐千早",
        description: "神社巫女穿着的纯白千早服。每回合结束时回复 15 点 MP。"
      },
      chest_mirror: {
        name: "八咫・镜光护胸",
        description: "镶嵌神镜碎片的护胸装甲。受到小乐攻击时，以镜光反弹 40 点伤害给小乐。"
      },
      sword_flame: {
        name: "业火・炎之太刀",
        description: "刀身缭绕着永不熄灭的狐火。回合结束时对小乐造成 30 点燃烧伤害。"
      },
      sword_frost: {
        name: "霜月・冰结灵刃",
        description: "散发刺骨寒气的灵刃。攻击命中时 30% 概率触发霜月冰结，随机封印小乐下一回合的其中一种出拳手势。"
      },
      sword_thunder: {
        name: "雷霆・神鸣迅剑",
        description: "雷鸣缠绕的刺剑。QTE 反制成功时追加 50 点雷击伤害。"
      },
      sword_great_nine: {
        name: "破灭・九尾双手巨剑",
        description: "蕴含九尾狂气的双手大剑（占用双手）。常规出拳获胜伤害提高为 1.5 倍。"
      },
      shield_suzaku: {
        name: "结界・朱雀盾",
        description: "刻有朱雀神纹的灵盾。受到的猜输与 QTE 失败伤害降低 30 点。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "隐于夜幕的短匕。可装备于主手或副手，平手摸摸伤害额外 +15 点。"
      },
      helm_fox: {
        name: "妖狐面具",
        description: "依小乐容貌雕琢的灵狐面具。提供均衡的生命、魔力与攻击加成。"
      },
      shoulders_crimson: {
        name: "绯红之肩铠",
        description: "鸟居朱漆淬炼的坚固肩铠。大幅提升生命上限与攻击力。"
      },
      belt_shimenawa: {
        name: "注连绳神灵腰带",
        description: "神社结界编织的神绳腰带。药水回复效果额外提升 10 点。"
      },
      boots_gale: {
        name: "疾风之草履",
        description: "踏风而行的神行草履。QTE 反制时间延长 1.0 秒。"
      },
      earring_magatama: {
        name: "八尺琼・勾玉耳环",
        description: "翠绿温润的古老勾玉。变拳技能 MP 消耗降低 5 点。"
      },
      ring_ruby: {
        name: "狐火红玉戒指",
        description: "封印狐火灵气的红宝石戒指。提升生命与攻击。"
      },
      ring_sapphire: {
        name: "月华蓝玉戒指",
        description: "映照幽蓝月光的宝石戒指。提升魔力与攻击。"
      },
      badge_bond: {
        name: "绊之守护胸章",
        description: "与小乐深厚羁绊的信物。全面提升能力，且战胜时额外获得 20% 星砂。"
      }
    },
    gallery: {
      swimsuit_default: {
        name: "夏日祭・清凉泳装",
        variantName: "默认泳装",
        description: "小乐难得换上的清凉泳装。在对局胜出后方能一窥风采。"
      },
      swimsuit_watermelon: {
        name: "海风・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大获全胜后，小乐得意洋洋展示成果的模样。"
      }
    },
    dialogue: {
      speakerKohaku: "小乐",
      speakerPlatinumKohaku: "白金小乐",
      speakerNarrator: "旁白",
      homeGreeting: "准备好了吗？这次可别移开视线哦。",
      introNormal: "出拳一决。让我看看你的决心吧。",
      introFinal: "镜中的我，可不会手下留情。",
      chant3: "剪刀",
      chant2: "石头",
      chant1: "布！",
      morphReaction: "咦……在最后一瞬间变拳了？",
      qteSingleBreak: "抓到破绽了！想躲开的话，就跟上我的节奏！",
      qteDualBreak: "双重破绽！跟上我们的双生节奏吧！",
      postBattleWin: "这次是你赢了。要把利用在什么愿望上呢？",
      postBattleLoss: "还有什么要说的吗？回去再练练吧！",
      askSwimsuitLine: "泳装？真拿你没办法……只准看一眼哦。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指针进入绿色区域时，就喊『就是现在！』！",
      watermelonHit: "漂亮！这一刀切中了。还有 {remaining} 刀。",
      watermelonMiss: "差一点点！还有 {remaining} 刀，下一次再来。",
      watermelonAllHit: "三刀都结束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都结束了。下次再一起抓准时机吧。",
      itemUsed: "使用「{name}」，恢复了 {restored} 点 {resource}。"
    }
  },

  "en": {
    meta: {
      title: "Kohaku: Bond of RPS",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "Janken: Tales of Foxfire",
      lead: "Decide your hand in five seconds. Read her fingertip tells and seize the only counterattack in defeat."
    },
    ui: {
      home: "Home",
      level: "Level",
      xp: "EXP",
      coins: "Star Sand",
      soundToggle: "Toggle Sound",
      langToggle: "Language",
      back: "Back",
      wins: "Wins",
      losses: "Losses",
      deepestStage: "Deepest Chapter",
      receptionSeal: "Ready for<br>Battle",
      openCheat: "⚙️ Debug & Cheat Menu",
      resetSave: "Reset Save",
      resetConfirm: "Are you sure you want to reset all game data? This action cannot be undone.",
      menuStages: "Story Battle",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "Player Growth",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "Engawa Shop",
      menuShopSub: "ITEM SHOP",
      menuGallery: "Kohaku Gallery",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "How to Play",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "Equipment & Bag",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "Select Chapter",
      stagesSubtitle: "Kohaku becomes more resilient as you advance. Level up to unlock new mirror realms.",
      shopTitle: "Engawa Item Shop",
      shopSubtitle: "Stock up on elixirs and divine gear. Purchased equipment is stored in your inventory bag.",
      growthTitle: "Player Growth",
      growthSubtitle: "Allocate stat points gained from leveling up, or upgrade your Petting and Dual Hands masteries.",
      galleryTitle: "Kohaku Gallery",
      gallerySubtitle: "Cherish memorable moments and exclusive outfit artworks unlocked during your journey.",
      guideTitle: "How to Play",
      guideSubtitle: "Master the rhythm of RPS duels, QTE counters, Morph timing, and Dual Hands mastery.",
      equipmentTitle: "Equipment & Bag",
      equipmentSubtitle: "Equip divine gear to boost stats and unleash powerful combat passives during battles.",
      paperdollTitle: "Equipped Gear",
      paperdollSummaryTitle: "✦ Character Paperdoll & Total Stats (Click slot to unequip)",
      paperdollEquipped: "Equipped",
      paperdollEmpty: "Empty",
      paperdollUnequipTip: "(Click to unequip)",
      bagTitle: "Inventory Bag",
      bagEmpty: "No gear in your inventory yet. Visit the shop to purchase equipment!",
      bagEquipBtn: "Equip",
      bagUnequipBtn: "Unequip",
      bagEquippedBadge: "Equipped",
      twoHandedBadge: "Two-Handed",
      unallocatedSp: "Unallocated Points (SP)",
      statHpName: "Max Health (HP)",
      statHpDesc: "Enhances survival endurance during intense battles",
      statMpName: "Max Mana (MP)",
      statMpDesc: "Fuels Morph techniques and skill activations",
      statDmgName: "Base Attack (DMG)",
      statDmgDesc: "Increases strike damage dealt on winning RPS throws",
      btnAllocate: "+1 Point",
      skillsHeading: "Masteries & Special Skills",
      btnUpgradeSkill: "Upgrade Skill",
      skillMaxLevel: "Max Level Reached",
      skillLocked: "Locked (Requires Lv.{level})",
      skillCostSp: "Costs {sp} SP",
      shopPaperdollToggle: "✦ Character Paperdoll & Total Stats (Click slot to unequip)",
      shopConsumablesHeading: "Elixirs & Potions",
      shopEquipmentHeading: "Divine Armaments",
      btnBuy: "Buy",
      btnEquipDirect: "Equip Now",
      itemOwned: "Owned",
      insufficientCoins: "Not enough Star Sand!",
      battleRounds: "Round",
      targetEnemy: "Targeting",
      playerLeftHand: "Left Hand",
      playerRightHand: "Right Hand",
      morphSkillBtn: "Morph Technique (25 MP)",
      useHpPotion: "HP Potion",
      useMpPotion: "MP Potion",
      qteFailCount: "Misses",
      qteTimeRemaining: "Counter Window",
      dualQteNotice: "Dual QTE Counter! Input WASD / Arrow keys continuously!",
      postBattleVictoryTitle: "Victory!",
      postBattleDefeatTitle: "Defeat...",
      postBattleVictoryDesc: "You defeated Kohaku! Gained abundant EXP and Star Sand.",
      postBattleDefeatDesc: "Overwhelmed by Kohaku's barrage. Regroup and challenge her again!",
      btnAskSwimsuit: "Ask Kohaku to Wear Swimsuit",
      btnPlayWatermelon: "Watermelon Splitting Challenge",
      btnContinue: "Back to Stages",
      btnRetry: "Retry Battle",
      watermelonTitle: "Blindfolded Watermelon Split!",
      watermelonDesc: "Press the strike button when the indicator enters the green sweet spot!",
      btnSliceWatermelon: "Strike Now!",
      watermelonScore: "Clean Hits:",
      autoWatermelonStock: "Watermelon Slices Stored: {count} / 999",
      btnNextWatermelonRound: "Next Watermelon Round ({count} left)",
      btnStartWatermelonRound: "Start Watermelon Slicing",
      floatingWatermelonTitle: "🍉 Blindfolded Watermelon Slicing (Auto Stored)",
      floatingWatermelonAimDesc: "Strike when the white indicator is in the green zone!",
      floatingWatermelonFinished: "Round finished! Stored remaining: {count}",
      floatingWatermelonNoStock: "No stored watermelon slices left. Stacking with auto-battle wins...",
      guideRpsTitle: "Basic RPS Rules",
      guideRpsDesc: "Scissors beat Paper, Paper beats Rock, Rock beats Scissors. Winning deals damage, draws can trigger Petting, and losing triggers QTE Counter phase.",
      guideQteTitle: "Clutch QTE Counter",
      guideQteDesc: "When you lose a throw, input direction keys within the time limit. A successful counter cancels damage and strikes back!",
      guideMorphTitle: "Morph Technique",
      guideMorphDesc: "Spend MP during the reaction window to enter a 2s Morph state, allowing you to manually choose a counter hand! Wrong choices result in a loss or draw Momo check.",
      guideDualTitle: "Dual Hands Mastery",
      guideDualDesc: "Unlock Dual Hands in Chapter 4 to throw left and right hands independently against Twin Kohakus!",
      cheatModalTitle: "⚙️ Debug & Cheat Menu",
      cheatSetLevel: "Set Level",
      cheatAddCoins: "+1000 Star Sand",
      cheatAddSp: "+50 SP Points",
      cheatUnlockAllStages: "Unlock All Stages",
      cheatUnlockAllGallery: "Unlock All Gallery",
      cheatAddPotions: "+10 of Each Potion",
      cheatAddAllEquip: "Grant All Divine Gear",
      cheatClose: "Close",
      statDamage: "Attack",
      statHp: "Health",
      statMp: "Mana",
      statArmor: "Armor Red.",
      statDodge: "Dodge",
      statMpRegen: "MP Regen",
      statReflect: "Reflect",
      statBurn: "Burn",
      statFreeze: "Freeze",
      statThunder: "Lightning",
      statMomoBonus: "Petting DMG",
      statCoinBonus: "Sand Boost",
      // Action strings
      enterStage: "Enter Battle ›",
      stageNeedLevel: "Requires Lv. {level} 🔒",
      stageCleared: "Cleared: Replay ✓",
      ruleFocus: "Key Rules: ",
      winReward: "Victory Rewards: ",
      notCleared: "Not Cleared",
      unlockRuleAfterClear: "Defeat this boss to reveal full rules",
      equippedBadge: "Equipped ✓",
      ownedInBag: "In Bag",
      equipNow: "Equip",
      equipBuy: "Buy",
      twoHandedOccupied: "⚔️ (Two-Handed)",
      unitDamage: "Per-win DMG",
      unitMaxHp: "Max HP",
      unitMaxMp: "Max MP",
      statAllocDmgDesc: "Each point increases strike damage dealt by +5.",
      statAllocHpDesc: "Each point increases Max HP by +10.",
      statAllocMpDesc: "Each point increases Max MP by +10.",
      spInvestBtn: "Invest 1 SP +",
      momoProcRate: "Draw Trigger Rate",
      dualHandUnlocked: "Unlocked",
      dualHandLocked: "Locked",
      dualHandDescSub: "Ch.4 Dual Throws",
      nextLevelRate: "Next Level Rate: {chance}%",
      notYetUnlocked: "Locked",
      unlockSwimsuitHint: "Defeat Kohaku to trigger swimsuit event and unlock",
      btnAskSwimsuitSpace: "Ask Kohaku for Swimsuit",
      btnPlayWatermelonSpace: "Blindfolded Watermelon",
      btnNextStrikeSpace: "Strike #{attempt}",
      btnRematch: "Rematch",
      btnSelectStages: "Select Chapter",
      btnReturnHome: "Home Lobby",
      unrevealed: "Unrevealed",
      preparing: "Readying",
      countdownCaption: "RPS Countdown",
      morphCaption: "Press F to Morph",
      morphSelectCaption: "Select Counter Gesture (2s)!",
      qteCaption: "Counter Window",
      settleCaption: "Round Summary",
      battleWon: "WIN",
      battleLost: "LOSE",
      battleDraw: "DRAW",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ Auto-Battle",
      autoBattleModalTitle: "⚡ Auto-Battle Stage Config",
      autoBattleModalDesc: "Continuously battles the stage using your current character attributes and equipment. Wins claim rewards and skip watermelon to continue; losses deduct attempts and auto-retry.",
      autoBattleCountLabel: "Select continuous battle count:",
      autoBattleTimes: "{count} Times",
      btnStartAutoBattle: "⚡ Start Auto-Battle",
      btnCancel: "Cancel",
      btnStopAutoBattle: "⏹ Stop Auto",
      btnPauseAutoBattle: "Pause Auto",
      btnResumeAutoBattle: "Resume Auto",
      autoBattleHudPaused: "Auto-Battle Paused: Run {current} / {total} (Wins: {wins}, Losses: {losses})",
      autoBattleToastPaused: "Auto-battle paused. You can play manually or click to resume.",
      autoBattleToastResumed: "Auto-battle resumed.",
      autoBattleHudRunning: "Auto-Battling: Run {current} / {total} (Wins: {wins}, Losses: {losses})",
      autoBattleToastUpdateWin: "Auto-battle: Victory! {remaining} rounds remaining...",
      autoBattleToastUpdateLoss: "Auto-battle: Defeat! {remaining} rounds remaining...",
      autoBattleToastFinished: "🎉 Auto-battle complete! Total {total} rounds (Wins: {wins}, Losses: {losses}).",
      autoBattleToastStopped: "Auto-battle stopped manually.",
      mustClearOnceForAuto: "You must defeat this stage once before using auto-battle!",
      frozenBadge: "❄️ Frost Blade: Kohaku's [{hand}] is frozen!",
      ownedCount: "Owned {total}",
      equippedCountBadge: "(Equipped {count})",
      pauseModalTitle: "⏸️ Battle Paused",
      pauseModalDesc: "Battle and QTE timers are paused. You can resume at any time or abandon the battle to return home.",
      btnResumeBattle: "Resume Battle",
      btnAbandonBattle: "Abandon Battle (Return Home)",
      selectLanguage: "Language",
    },
    hands: {
      rock: { label: "Rock", glyph: "✊" },
      paper: { label: "Paper", glyph: "✋" },
      scissors: { label: "Scissors", glyph: "✌" }
    },
    directions: {
      upLeft: "Up-Left",
      up: "Up",
      upRight: "Up-Right",
      left: "Left",
      right: "Right",
      downLeft: "Down-Left",
      down: "Down",
      downRight: "Down-Right"
    },
    stages: {
      1: {
        chapter: "Chapter 1",
        name: "First Encounter: Crimson Torii",
        subtitle: "Start by reading her subtle tells",
        bossRuleSummary: "5s / 4-way Fault-Tolerant",
        bossRuleDetail: "5s reveal countdown, 4 cardinal QTEs (misses don't penalize), 1.0s Morph window, Kohaku does not dodge Petting."
      },
      2: {
        chapter: "Chapter 2",
        name: "Sunset Foxfire",
        subtitle: "Twilight reveals every hesitation",
        bossRuleSummary: "3s",
        bossRuleDetail: "3s countdown, 8-directional QTE (fails on 2 misses), 0.75s Morph window, 11% Petting dodge rate."
      },
      3: {
        chapter: "Chapter 3",
        name: "Moonlit Trial of the Nine Tails",
        subtitle: "Don't let the nine afterimages deceive you",
        bossRuleSummary: "3s",
        bossRuleDetail: "3s countdown, 7-key QTE (fails on 1 miss), 0.5s Morph window, 33% Petting dodge rate."
      },
      4: {
        chapter: "Final Chapter",
        name: "Mirror Realm: Platinum Kohaku",
        subtitle: "Step through the mirror and face the twin 2P alter",
        bossRuleSummary: "3s / Twin Kohakus Dual HP",
        bossRuleDetail: "3s countdown, Twin Kohakus (takes 2x damage on hit), 7-key QTE, 0.25s tight Morph window, 66% Petting dodge rate."
      }
    },
    skills: {
      momo: {
        name: "Petting",
        glyph: "抚",
        description: "Triggers on RPS draws by chance to gently pet a random Kohaku, dealing 25 damage."
      },
      dualHand: {
        name: "Dual Hands",
        glyph: "掌",
        description: "Unlock your second hand! In Chapter 4, throw left hand (vs Left Kohaku) and right hand (vs Right Kohaku) independently."
      }
    },
    items: {
      hpPotion: {
        name: "Crimson Elixir",
        shortName: "HP Potion",
        description: "Shrine-crafted crimson elixir. Instantly restores 25 HP upon use."
      },
      mpPotion: {
        name: "Azure Moonlight Dew",
        shortName: "MP Potion",
        description: "Purified essence of moonlight. Instantly restores 25 MP upon use."
      }
    },
    equipmentSlots: {
      head: "Head",
      shoulders: "Shoulders",
      chest: "Chest",
      belt: "Belt",
      boots: "Boots",
      mainHand: "Main Hand",
      offHand: "Off Hand",
      ring1: "Ring 1",
      ring2: "Ring 2",
      earring1: "Earring 1",
      earring2: "Earring 2",
      badge: "Badge"
    },
    equipment: {
      chest_samurai: {
        name: "Genbu Adamantine Cuirass",
        description: "Heavy armor blessed by the divine Genbu. Directly reduces incoming damage by 25 (stacks with shield)."
      },
      chest_ninja: {
        name: "Spirit Fox Phantom Haori",
        description: "Woven from nine-tails fur. 25% chance on losing throw to trigger phantom dodge, completely nullifying damage!"
      },
      chest_miko: {
        name: "Purifying White Fox Chihaya",
        description: "Pure white ceremonial robe. Restores 15 MP at the end of every round."
      },
      chest_mirror: {
        name: "Yata Mirrorlight Breastplate",
        description: "Armor embedded with sacred mirror shards. Reflects 40 damage back to Kohaku when hit."
      },
      sword_flame: {
        name: "Hellfire Flame Katana",
        description: "Engulfed in inextinguishable foxfire. Inflicts 30 burn damage to Kohaku at the end of each round."
      },
      sword_frost: {
        name: "Frostmoon Freezing Spiritblade",
        description: "A spirit blade radiating piercing cold. On hit, 30% chance to freeze Kohaku's hand, sealing one random gesture next round."
      },
      sword_thunder: {
        name: "Thunder God Swift Rapier",
        description: "Crackling with lightning. Deals +50 bonus electric damage upon successful QTE counter."
      },
      sword_great_nine: {
        name: "Ruin: Nine-Tails Greatsword",
        description: "Infused with feral nine-tails fury (Two-Handed). Normal RPS win damage increased to 1.5x."
      },
      shield_suzaku: {
        name: "Barrier: Suzaku Shield",
        description: "Divine shield engraved with Suzaku crest. Reduces damage from RPS loss and failed QTE by 30."
      },
      dagger_shadow: {
        name: "Shadowmoon Dagger",
        description: "Concealed in darkness. Can be equipped in main or off hand; adds +15 bonus damage to draw Petting."
      },
      helm_fox: {
        name: "Kitsune Mask",
        description: "Carved in Kohaku's likeness. Provides balanced bonus to HP, MP, and Attack."
      },
      shoulders_crimson: {
        name: "Crimson Pauldrons",
        description: "Sturdy pauldrons tempered with shrine torii lacquer. Significantly boosts Max HP and Attack."
      },
      belt_shimenawa: {
        name: "Sacred Shimenawa Belt",
        description: "Woven with shrine warding cords. Potion restoration effects increased by +10."
      },
      boots_gale: {
        name: "Gale Waraji",
        description: "Wind-walking sandals. Extends QTE counter window by +1.0s."
      },
      earring_magatama: {
        name: "Yasakani Magatama Earring",
        description: "Ancient verdant jewel. Reduces MP cost of Morph technique by 5."
      },
      ring_ruby: {
        name: "Foxfire Ruby Ring",
        description: "Seals fiery fox spirit energy. Increases Max HP and Attack."
      },
      ring_sapphire: {
        name: "Moonlight Sapphire Ring",
        description: "Shimmers with cool moonlight. Increases Max MP and Attack."
      },
      badge_bond: {
        name: "Badge of Bond's Protection",
        description: "Token of deep bonding with Kohaku. Boosts all stats and grants +20% extra Star Sand on victory."
      }
    },
    gallery: {
      swimsuit_default: {
        name: "Summer Festival: Breezy Swimsuit",
        variantName: "Default Swimsuit",
        description: "A rare sight of Kohaku in her refreshing summer swimsuit, revealed only after claiming victory."
      },
      swimsuit_watermelon: {
        name: "Ocean Breeze: Watermelon Split",
        variantName: "Watermelon Split",
        description: "Kohaku proudly showing off her triumph after acing the blindfolded watermelon splitting game."
      }
    },
    dialogue: {
      speakerKohaku: "Kohaku",
      speakerPlatinumKohaku: "Platinum Kohaku",
      speakerNarrator: "Narrator",
      homeGreeting: "Ready yet? Don't take your eyes off me this time!",
      introNormal: "Show me what you've got! Let's see your resolve.",
      introFinal: "The mirror version of me won't go easy on you!",
      chant3: "Scissors",
      chant2: "Rock",
      chant1: "Paper!",
      morphReaction: "Wait... you changed your hand at the last second?!",
      qteSingleBreak: "Caught you slipping! If you wanna dodge, keep up with my rhythm!",
      qteDualBreak: "Double opening! Can you match our twin rhythm?!",
      postBattleWin: "You got me this time! What wish are you gonna use this win for?",
      postBattleLoss: "Got anything else to say? Hit the training grounds and try again!",
      askSwimsuitLine: "A swimsuit? Geez, fine... but just a quick peek, okay!",
      watermelonAttempt: "Strike #{nextAttempt}! When the white needle hits the green zone, call 'NOW!'!",
      watermelonHit: "Nice cut! Sliced clean through! {remaining} strike(s) left.",
      watermelonMiss: "So close! Still got {remaining} strike(s) left. Go for it next!",
      watermelonAllHit: "All 3 strikes done! Sliced it {successes} time(s)—that was so much fun!",
      watermelonDone: "All 3 strikes finished. Let's get the timing right next time!",
      itemUsed: "Used \"{name}\", restoring {restored} {resource}."
    }
  },

  "ja": {
    meta: {
      title: "狐楽・絆の勝負",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "じゃんけん・狐火異聞",
      lead: "五秒で一手。彼女の指先を見極め、劣勢の中で唯一の反撃を掴み取れ。"
    },
    ui: {
      home: "ホーム",
      level: "レベル",
      xp: "経験値",
      coins: "星砂",
      soundToggle: "サウンド切替",
      langToggle: "言語",
      back: "戻る",
      wins: "勝利",
      losses: "敗北",
      deepestStage: "到達章",
      receptionSeal: "対戦<br>受付中",
      openCheat: "⚙️ デバッグ・チート設定",
      resetSave: "セーブ初期化",
      resetConfirm: "すべてのセーブデータを初期化しますか？この操作は取り消せません。",
      menuStages: "物語対戦",
      menuStagesSub: "STORY BATTLE",
      menuGrowth: "能力強化",
      menuGrowthSub: "PLAYER GROWTH",
      menuShop: "縁側商店",
      menuShopSub: "ITEM SHOP",
      menuGallery: "狐娘図鑑",
      menuGallerySub: "ILLUSTRATION GALLERY",
      menuGuide: "遊び方",
      menuGuideSub: "HOW TO PLAY",
      menuEquipment: "装備・荷物",
      menuEquipmentSub: "EQUIPMENT & BAG",
      stagesTitle: "章選択",
      stagesSubtitle: "章が進むほどコハクは手強くなります。レベルを上げて新たな鏡界を開放しましょう。",
      shopTitle: "縁側商店",
      shopSubtitle: "霊薬や神威武具を購入できます。購入した装備はそのまま荷物袋に格納されます。",
      growthTitle: "能力強化",
      growthSubtitle: "レベルアップで獲得したポイントを振り分けるか、奥義・必殺スキルを習得しましょう。",
      galleryTitle: "狐娘図鑑",
      gallerySubtitle: "旅の思い出と特別な衣装イラストを閲覧できます。",
      guideTitle: "遊び方",
      guideSubtitle: "じゃんけん対決、QTEカウンター、変拳、両手奥義の極意をマスターしましょう。",
      equipmentTitle: "装備と荷物",
      equipmentSubtitle: "神威装備を身に着けてステータスを強化し、対戦で特殊な加護を発動させましょう。",
      paperdollTitle: "現在の装備状況",
      paperdollSummaryTitle: "✦ 装備ペーパードール＆総合ステータス（枠クリックで装備解除）",
      paperdollEquipped: "装備中",
      paperdollEmpty: "未装備",
      paperdollUnequipTip: "（枠をクリックで解除）",
      bagTitle: "装備バッグ",
      bagEmpty: "バッグの中に装備がありません。縁側商店で購入してみましょう！",
      bagEquipBtn: "装備する",
      bagUnequipBtn: "外す",
      bagEquippedBadge: "装備中",
      twoHandedBadge: "両手持ち",
      unallocatedSp: "未割り当てポイント (SP)",
      statHpName: "最大体力 (HP)",
      statHpDesc: "対決における耐久力を向上させます",
      statMpName: "最大霊力 (MP)",
      statMpDesc: "変拳秘術やスキルの発動に必要です",
      statDmgName: "基礎攻撃力 (DMG)",
      statDmgDesc: "じゃんけん勝利時の与ダメージを高めます",
      btnAllocate: "強化 +1",
      skillsHeading: "奥義・必殺スキル",
      btnUpgradeSkill: "スキル強化",
      skillMaxLevel: "最大レベル到達",
      skillLocked: "未解放（必要 Lv.{level}）",
      skillCostSp: "消費 {sp} SP",
      shopPaperdollToggle: "✦ 装備ペーパードール＆総合ステータス（枠クリックで装備解除）",
      shopConsumablesHeading: "霊薬・ポーション",
      shopEquipmentHeading: "神威装備武具",
      btnBuy: "購入",
      btnEquipDirect: "今すぐ装備",
      itemOwned: "所持中",
      insufficientCoins: "星砂が足りません！",
      battleRounds: "ターン",
      targetEnemy: "ターゲット",
      playerLeftHand: "左手",
      playerRightHand: "右手",
      morphSkillBtn: "変拳秘術 (25 MP)",
      useHpPotion: "HP 薬水",
      useMpPotion: "MP 薬水",
      qteFailCount: "ミス",
      qteTimeRemaining: "反撃猶予",
      dualQteNotice: "ダブル QTE カウンター！WASD / 矢印キーを連続入力！",
      postBattleVictoryTitle: "対局勝利！",
      postBattleDefeatTitle: "対局敗北...",
      postBattleVictoryDesc: "コハクに勝利しました！経験値と星砂をたっぷり獲得！",
      postBattleDefeatDesc: "コハクの攻勢に敵いませんでした。態勢を立て直して再挑戦しましょう！",
      btnAskSwimsuit: "水着に着替えてもらう",
      btnPlayWatermelon: "海辺のスイカ割りに挑戦",
      btnContinue: "章選択へ戻る",
      btnRetry: "もう一度挑戦",
      watermelonTitle: "目隠しスイカ割りチャレンジ！",
      watermelonDesc: "白い針が緑のゾーンに入ったらボタンを押そう。直感とタイミングの勝負！",
      btnSliceWatermelon: "今だ！一刀両断！",
      watermelonScore: "命中回数：",
      autoWatermelonStock: "スイカ割り蓄積回数：{count} / 999",
      btnNextWatermelonRound: "次のスイカ割りを開始 (残り {count})",
      btnStartWatermelonRound: "スイカ割りを開始",
      floatingWatermelonTitle: "🍉 目隠しスイカ割り（自動周回蓄積）",
      floatingWatermelonAimDesc: "白い針が緑のゾーンに入ったらボタンを押そう！",
      floatingWatermelonFinished: "3太刀終了！蓄積残り：{count} 回",
      floatingWatermelonNoStock: "スイカ割り回数を使い切りました。自動周回で勝利すると蓄積されます...",
      guideRpsTitle: "基本じゃんけんルール",
      guideRpsDesc: "チョキはパーに勝ち、パーはグーに勝ち、グーはチョキに勝つ。勝ちでダメージ、あいこでナデナデ、負けで QTE 反撃へ突入。",
      guideQteTitle: "起死回生の QTE 反撃",
      guideQteDesc: "負けた直後の猶予時間内に方向キーを素早く入力。カウンター成功でダメージ無効＆反撃打撃を与えます！",
      guideMorphTitle: "刹那の変拳秘術",
      guideMorphDesc: "小楽の手が見えた反応時間内にMPを消費して変拳を発動！2秒以内に手勢を選択して反撃せよ。間違えた場合は敗北またはあいこの撫で判定になります。",
      guideDualTitle: "両手解放の極意",
      guideDualDesc: "第4章で両手スキルを解放すると、左手と右手で独立してじゃんけんが可能に！",
      cheatModalTitle: "⚙️ デバッグ・チート設定",
      cheatSetLevel: "レベル変更",
      cheatAddCoins: "星砂追加 (+1000)",
      cheatAddSp: "SP追加 (+50)",
      cheatUnlockAllStages: "全ステージ解放",
      cheatUnlockAllGallery: "全図鑑解放",
      cheatAddPotions: "各ポーション+10個",
      cheatAddAllEquip: "全神威装備を獲得",
      cheatClose: "閉じる",
      statDamage: "攻撃",
      statHp: "体力",
      statMp: "霊力",
      statArmor: "被ダメ軽減",
      statDodge: "回避",
      statMpRegen: "MP回復",
      statReflect: "反射",
      statBurn: "炎上",
      statFreeze: "氷結",
      statThunder: "雷撃",
      statMomoBonus: "ナデナデ加算",
      statCoinBonus: "星砂ボーナス",
      // Action strings
      enterStage: "対戦開始　›",
      stageNeedLevel: "Lv. {level} で解放 🔒",
      stageCleared: "撃破済・再挑戦　✓",
      ruleFocus: "ルール要点：",
      winReward: "勝利報酬：",
      notCleared: "未撃破",
      unlockRuleAfterClear: "このステージをクリアすると詳細ルールが解放されます",
      equippedBadge: "装備中 ✓",
      ownedInBag: "所持中",
      equipNow: "装備する",
      equipBuy: "購入",
      twoHandedOccupied: "⚔️ (両手占有)",
      unitDamage: "勝利時ダメージ",
      unitMaxHp: "最大 HP",
      unitMaxMp: "最大 MP",
      statAllocDmgDesc: "1ポイントにつき、与ダメージが5上昇。",
      statAllocHpDesc: "1ポイントにつき、最大HPが10上昇。",
      statAllocMpDesc: "1ポイントにつき、最大MPが10上昇。",
      spInvestBtn: "1 SP 割り当て ＋",
      momoProcRate: "あいこ発動率",
      dualHandUnlocked: "解放済",
      dualHandLocked: "未解放",
      dualHandDescSub: "第4章 両手出拳",
      nextLevelRate: "次レベル発動率: {chance}%",
      notYetUnlocked: "未解放",
      unlockSwimsuitHint: "対局勝利後に水着イベントを発生させて解放",
      btnAskSwimsuitSpace: "水着に着替えてもらう",
      btnPlayWatermelonSpace: "目隠しスイカ割り",
      btnNextStrikeSpace: "{attempt}太刀目に挑戦",
      btnRematch: "再挑戦",
      btnSelectStages: "章選択",
      btnReturnHome: "ロビーへ",
      unrevealed: "未公開",
      preparing: "構え中",
      countdownCaption: "じゃんけん秒読",
      morphCaption: "Fキーで変拳",
      morphSelectCaption: "2秒以内に手勢を選択！",
      qteCaption: "反撃チャンス",
      settleCaption: "ターン結果",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "分",
      // Auto-Battle & Frost & Pause
      btnAutoBattle: "⚡ 自動周回",
      autoBattleModalTitle: "⚡ 自動連続周回設定",
      autoBattleModalDesc: "現在のステータスと装備構成でステージを連続周回します。勝利時はスイカ割りをスキップして報酬を獲得し次へ進み、敗北時は回数を消費して自動で再試行します。",
      autoBattleCountLabel: "連続周回回数を選択：",
      autoBattleTimes: "{count} 回",
      btnStartAutoBattle: "⚡ 自動周回を開始",
      btnCancel: "キャンセル",
      btnStopAutoBattle: "⏹ 周回停止",
      btnPauseAutoBattle: "周回一時停止",
      btnResumeAutoBattle: "周回再開",
      autoBattleHudRunning: "自動周回中：第 {current} / {total} 回（勝: {wins}, 敗: {losses}）",
      autoBattleHudPaused: "自動周回一時停止中：第 {current} / {total} 回（勝: {wins}, 敗: {losses}）",
      autoBattleToastUpdateWin: "自動周回：勝利！残り {remaining} 回...",
      autoBattleToastUpdateLoss: "自動周回：敗北！残り {remaining} 回...",
      autoBattleToastFinished: "🎉 自動周回完了！全 {total} 回（勝: {wins}, 敗: {losses}）。",
      autoBattleToastStopped: "自動周回を停止しました。",
      autoBattleToastPaused: "自動周回を一時停止しました。手動で続行するか再開を押してください。",
      autoBattleToastResumed: "自動周回を再開しました。",
      mustClearOnceForAuto: "自動周回を行うには、まず本ステージに一度勝利する必要があります！",
      frozenBadge: "❄️ 霜月氷結：コハクの【{hand}】は封印中！",
      ownedCount: "所持数 {total}",
      equippedCountBadge: "(装備中 {count})",
      pauseModalTitle: "⏸️ 対局一時停止中",
      pauseModalDesc: "バトルとQTEタイマーが停止中です。いつでも対局を再開、または対局を破棄して戻ることができます。",
      btnResumeBattle: "対戦再開",
      btnAbandonBattle: "対局破棄 (ロビーへ戻る)",
      selectLanguage: "言語切替"
    },
    hands: {
      rock: { label: "グー", glyph: "✊" },
      paper: { label: "パー", glyph: "✋" },
      scissors: { label: "チョキ", glyph: "✌" }
    },
    directions: {
      upLeft: "左上",
      up: "上",
      upRight: "右上",
      left: "左",
      right: "右",
      downLeft: "左下",
      down: "下",
      downRight: "右下"
    },
    stages: {
      1: {
        chapter: "壱ノ章",
        name: "初逢・朱鳥居",
        subtitle: "彼女の仕草を見切ることから始めよう",
        bossRuleSummary: "5秒／4方向（ミス許容）",
        bossRuleDetail: "カウントダウン5秒、QTEは十字4方向のみ（押し間違い無罰則）、変拳猶予1.0秒、ナデナデ回避なし。"
      },
      2: {
        chapter: "弐ノ章",
        name: "夕映・狐火",
        subtitle: "黄昏は迷いを鮮明に映し出す",
        bossRuleSummary: "3秒",
        bossRuleDetail: "カウントダウン3秒、全8方向QTE（2回ミスで失敗）、変拳猶予0.75秒、ナデナデ回避率11%。"
      },
      3: {
        chapter: "参ノ章",
        name: "月下・九尾の試練",
        subtitle: "九つの残影に目を奪われるな",
        bossRuleSummary: "3秒",
        bossRuleDetail: "カウントダウン3秒、7連QTE（1回ミスで即失敗）、変拳猶予0.5秒、ナデナデ回避率33%。"
      },
      4: {
        chapter: "終ノ章",
        name: "鏡界・白金コハク",
        subtitle: "鏡を越え、双生の2Pカラーに挑め",
        bossRuleSummary: "3秒／双生コハク・2本ゲージ",
        bossRuleDetail: "カウントダウン3秒、双生コハク（被ダメージ2倍）、7連QTE、極限変拳猶予0.25秒、ナデナデ回避率66%。"
      }
    },
    skills: {
      momo: {
        name: "なでなで",
        glyph: "撫",
        description: "あいこ時に確率で発動。場のコハクを撫でて25ダメージを与える。"
      },
      dualHand: {
        name: "両手解放",
        glyph: "掌",
        description: "もう片方の手を解放！第4章にて左手（左コハク用）と右手（右コハク用）で同時に個別じゃんけんが可能になる。"
      }
    },
    items: {
      hpPotion: {
        name: "緋露薬",
        shortName: "HP 薬水",
        description: "神社謹製の緋色ポーション。使用すると体力が 25 回復します。"
      },
      mpPotion: {
        name: "蒼月露",
        shortName: "MP 薬水",
        description: "月光を宿した神聖な霊水。使用すると霊力が 25 回復します。"
      }
    },
    equipmentSlots: {
      head: "兜・仮面",
      shoulders: "肩当て",
      chest: "胸当て",
      belt: "腰帯",
      boots: "履物",
      mainHand: "主手武器",
      offHand: "副手武防",
      ring1: "指輪 1",
      ring2: "指輪 2",
      earring1: "耳飾り 1",
      earring2: "耳飾り 2",
      badge: "胸章"
    },
    equipment: {
      chest_samurai: {
        name: "玄武・金剛胸当て",
        description: "玄武の神霊が宿る重鎧。受けるダメージを直接 25 軽減（盾と重複可能）。"
      },
      chest_ninja: {
        name: "霊狐・幻影羽織",
        description: "九尾の毛で織られた羽織。負け被弾時に 25% の確率で残影回避が発動しノーダメ無効化！"
      },
      chest_miko: {
        name: "浄世・白狐千早",
        description: "神社の巫女が纏う白き千早。毎ターン終了時に MP を 15 回復。"
      },
      chest_mirror: {
        name: "八咫・鏡光胸当",
        description: "神鏡の破片を散りばめた胸甲。攻撃を受けた際、鏡光で 40 反射ダメージを返す。"
      },
      sword_flame: {
        name: "業火・炎の太刀",
        description: "決して消えぬ狐火を纏う太刀。ターン終了時にコハクへ 30 の炎上ダメージを与える。"
      },
      sword_frost: {
        name: "霜月・氷結霊刃",
        description: "凍てつく冷気を纏う霊刃。攻撃命中時 30% の確率で霜月氷結を発動し、次ターンの小楽の手の1つをランダムに封印する。"
      },
      sword_thunder: {
        name: "雷霆・神鳴迅剣",
        description: "雷光迸る刺剣。QTE カウンター成功時に 50 の追撃雷撃ダメージを与える。"
      },
      sword_great_nine: {
        name: "破滅・九尾両手巨剣",
        description: "九尾の狂気を宿す大剣（両手占有）。通常じゃんけん勝利時のダメージが 1.5 倍になる。"
      },
      shield_suzaku: {
        name: "結界・朱雀盾",
        description: "朱雀の神紋が刻まれた盾。じゃんけん負け及び QTE 失敗時の被ダメージを 30 軽減。"
      },
      dagger_shadow: {
        name: "影月・短匕",
        description: "夜陰に紛れる短刀。主手・副手どちらにも装備可能で、あいこナデナデのダメージ +15。"
      },
      helm_fox: {
        name: "妖狐の面",
        description: "コハクの姿を模した狐面。HP・MP・攻撃力をバランスよく強化。"
      },
      shoulders_crimson: {
        name: "緋紅の肩当て",
        description: "鳥居の朱漆で鍛えた堅牢な肩当て。最大 HP と攻撃力を大きく上昇させる。"
      },
      belt_shimenawa: {
        name: "注連縄神霊帯",
        description: "結界の注連縄で編まれた帯。ポーションの回復効果が +10 向上する。"
      },
      boots_gale: {
        name: "疾風の草履",
        description: "風を纏って走る神速の草履。QTE 反撃の猶予時間が +1.0 秒延長される。"
      },
      earring_magatama: {
        name: "八尺瓊勾玉の耳飾り",
        description: "神秘の翡翠勾玉。変拳スキルの消費 MP を 5 軽減。"
      },
      ring_ruby: {
        name: "狐火紅玉の指輪",
        description: "狐火の霊気を封じたルビーの指輪。HP と攻撃力を上昇させる。"
      },
      ring_sapphire: {
        name: "月華蒼玉の指輪",
        description: "蒼き月光を映すサファイアの指輪。MP と攻撃力を上昇させる。"
      },
      badge_bond: {
        name: "絆の守護バッジ",
        description: "コハクとの深い絆の証。全能力を高め、勝利時の獲得星砂が 20% 増加する。"
      }
    },
    gallery: {
      swimsuit_default: {
        name: "夏祭り・清涼水着",
        variantName: "通常水着",
        description: "コハクが珍しく着替えた水着姿。勝負に勝った者だけが拝めるご褒美。"
      },
      swimsuit_watermelon: {
        name: "潮風・スイカ割り",
        variantName: "スイカ割り",
        description: "目隠しスイカ割りで完全勝利し、得意満面に成果を見せつけるコハク。"
      }
    },
    dialogue: {
      speakerKohaku: "コハク",
      speakerPlatinumKohaku: "白金コハク",
      speakerNarrator: "ナレーション",
      homeGreeting: "準備はいい？今度は目を離しちゃダメだよ。",
      introNormal: "いざ勝負！君の覚悟、見せてもらおうかな。",
      introFinal: "鏡のボクは、手加減なんてしないよ！",
      chant3: "チョキ",
      chant2: "グー",
      chant1: "パー！",
      morphReaction: "えぇっ…最後の最後で手を変えたの…！？",
      qteSingleBreak: "スキあり！避けたいなら、ボクのリズムについてきて！",
      qteDualBreak: "ダブルでスキあり！ボクたち双子のリズムについてこられるかな？！",
      postBattleWin: "今回はキミの勝ち！この勝利、どんなお願い事に使うの？",
      postBattleLoss: "まだ何か言いたいことある？もっと特訓してからおいで！",
      askSwimsuitLine: "水着？もう、しょうがないなぁ……ちょっとだけだからね！",
      watermelonAttempt: "{nextAttempt}太刀目！白い針が緑のゾーンに入ったら『今だ！』って叫んでね！",
      watermelonHit: "見事！綺麗にスライスできたね。あと{remaining}太刀！",
      watermelonMiss: "惜しい〜！あと{remaining}太刀、次こそ狙っていこう！",
      watermelonAllHit: "3太刀全部終了！{successes}回命中、めっちゃ楽しかったね！",
      watermelonDone: "3太刀終了〜。次はもっと息を合わせていこうね。",
      itemUsed: "「{name}」を使用し、{resource}を {restored} 回復しました。"
    }
  }
};

export class I18nService {
  constructor() {
    this.currentLocale = this.detectInitialLocale();
  }

  detectInitialLocale() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (saved && LOCALES[saved]) {
          return saved;
        }
      }
    } catch {
      // localStorage may fail in security restricted contexts
    }

    return this.detectSystemLocale();
  }

  detectSystemLocale(customNavigator = undefined) {
    try {
      const nav = customNavigator !== undefined ? customNavigator : (typeof navigator !== "undefined" ? navigator : null);
      if (nav) {
        const rawLanguages = Array.isArray(nav.languages) && nav.languages.length > 0
          ? nav.languages
          : [nav.language || ""];

        for (const lang of rawLanguages) {
          if (!lang) continue;
          const lower = lang.toLowerCase();
          if (lower.startsWith("zh")) {
            if (lower.includes("tw") || lower.includes("hk") || lower.includes("mo") || lower.includes("hant")) {
              return "zh-Hant";
            }
            return "zh-Hans";
          }
          if (lower.startsWith("ja")) {
            return "ja";
          }
          if (lower.startsWith("en")) {
            return "en";
          }
        }
      }
    } catch {
      // Fallback
    }

    return DEFAULT_LOCALE;
  }

  getLocale() {
    return this.currentLocale;
  }

  setLocale(locale) {
    if (!LOCALES[locale]) return false;
    this.currentLocale = locale;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      }
    } catch {
      // Ignore
    }
    return true;
  }

  cycleLocale() {
    const currentIndex = LOCALE_ORDER.indexOf(this.currentLocale);
    const nextIndex = (currentIndex + 1) % LOCALE_ORDER.length;
    const nextLocale = LOCALE_ORDER[nextIndex];
    this.setLocale(nextLocale);
    return nextLocale;
  }

  t(key, params = {}) {
    const segments = key.split(".");
    let current = DICTIONARY[this.currentLocale];

    for (const segment of segments) {
      if (current && typeof current === "object" && segment in current) {
        current = current[segment];
      } else {
        current = null;
        break;
      }
    }

    if (current === null || current === undefined) {
      // Fallback to default locale (en) or zh-Hant
      let fallback = DICTIONARY["en"];
      for (const segment of segments) {
        if (fallback && typeof fallback === "object" && segment in fallback) {
          fallback = fallback[segment];
        } else {
          fallback = null;
          break;
        }
      }
      if (fallback === null || fallback === undefined) {
        fallback = DICTIONARY["zh-Hant"];
        for (const segment of segments) {
          if (fallback && typeof fallback === "object" && segment in fallback) {
            fallback = fallback[segment];
          } else {
            fallback = null;
            break;
          }
        }
      }
      current = fallback ?? key;
    }

    if (typeof current !== "string") {
      return current ?? key;
    }

    return current.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
  }

  getLocalizedHand(handId) {
    const base = HANDS[handId];
    if (!base) return null;
    const loc = DICTIONARY[this.currentLocale]?.hands?.[handId] || DICTIONARY["zh-Hant"].hands[handId];
    return {
      ...base,
      label: loc?.label || base.label,
      glyph: loc?.glyph || base.glyph
    };
  }

  getLocalizedDirection(directionId) {
    const base = DIRECTIONS.find((d) => d.id === directionId);
    if (!base) return null;
    const label = DICTIONARY[this.currentLocale]?.directions?.[directionId] || base.label;
    return {
      ...base,
      label
    };
  }

  getLocalizedStage(stage) {
    if (!stage) return null;
    const loc = DICTIONARY[this.currentLocale]?.stages?.[stage.id] || DICTIONARY["zh-Hant"].stages[stage.id];
    if (!loc) return { ...stage };
    return {
      ...stage,
      chapter: loc.chapter || stage.chapter,
      name: loc.name || stage.name,
      subtitle: loc.subtitle || stage.subtitle,
      bossRuleSummary: loc.bossRuleSummary || stage.bossRuleSummary,
      bossRuleDetail: loc.bossRuleDetail || stage.bossRuleDetail
    };
  }

  getLocalizedSkill(skill) {
    if (!skill) return null;
    const loc = DICTIONARY[this.currentLocale]?.skills?.[skill.id] || DICTIONARY["zh-Hant"].skills[skill.id];
    if (!loc) return { ...skill };
    return {
      ...skill,
      name: loc.name || skill.name,
      glyph: loc.glyph || skill.glyph,
      description: loc.description || skill.description
    };
  }

  getLocalizedItem(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.items?.[item.id] || DICTIONARY["zh-Hant"].items[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      shortName: loc.shortName || item.shortName,
      description: loc.description || item.description
    };
  }

  getLocalizedEquipment(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.equipment?.[item.id] || DICTIONARY["zh-Hant"].equipment[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      description: loc.description || item.description
    };
  }

  getLocalizedEquipmentSlot(slotId) {
    const base = EQUIPMENT_SLOTS[slotId];
    if (!base) return null;
    const label = DICTIONARY[this.currentLocale]?.equipmentSlots?.[slotId] || base.label;
    return {
      ...base,
      label
    };
  }

  getLocalizedGalleryItem(item) {
    if (!item) return null;
    const loc = DICTIONARY[this.currentLocale]?.gallery?.[item.id] || DICTIONARY["zh-Hant"].gallery[item.id];
    if (!loc) return { ...item };
    return {
      ...item,
      name: loc.name || item.name,
      variantName: loc.variantName || item.variantName,
      description: loc.description || item.description
    };
  }
}

export const I18n = new I18nService();
