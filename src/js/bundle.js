// Auto-generated standalone bundle for Koraku RPS
// Supports both file:// protocol and http:// server without module CORS restrictions.
(() => {
  "use strict";

// --- src/js/config/gameConfig.js ---
const ASSETS = Object.freeze({
  default: "./koraku/小樂-預設.png",
  final: "./koraku/小樂-2P色.png",
  swimsuit: "./koraku/泳裝小樂.png",
  watermelon: "./koraku/泳裝小樂_西瓜.png",
  defeat: "./koraku/凝視小樂.png"
});

const HANDS = Object.freeze({
  rock: { id: "rock", label: "石頭", glyph: "✊", beats: "scissors" },
  paper: { id: "paper", label: "布", glyph: "✋", beats: "rock" },
  scissors: { id: "scissors", label: "剪刀", glyph: "✌", beats: "paper" }
});

const HAND_ORDER = Object.freeze(["rock", "paper", "scissors"]);

const DIRECTIONS = Object.freeze([
  { id: "upLeft", glyph: "↖", label: "左上", keys: ["q", "7"] },
  { id: "up", glyph: "↑", label: "上", keys: ["w", "arrowup", "8"] },
  { id: "upRight", glyph: "↗", label: "右上", keys: ["e", "9"] },
  { id: "left", glyph: "←", label: "左", keys: ["a", "arrowleft", "4"] },
  { id: "right", glyph: "→", label: "右", keys: ["d", "arrowright", "6"] },
  { id: "downLeft", glyph: "↙", label: "左下", keys: ["z", "1"] },
  { id: "down", glyph: "↓", label: "下", keys: ["s", "arrowdown", "2"] },
  { id: "downRight", glyph: "↘", label: "右下", keys: ["c", "3"] }
]);

const STAGES = Object.freeze([
  {
    id: 1,
    chapter: "壹ノ章",
    name: "初逢・朱鳥居",
    subtitle: "先從看穿她的小動作開始",
    enemyHp: 1000,
    requiredLevel: 1,
    rewardMultiplier: 1,
    xpWin: 150,
    xpLoss: 50,
    winCoins: 100,
    lossCoins: 50,
    roundSeconds: 5,
    reactionWindowMs: 1000,
    momoDodgeRate: 0,
    qteDirections: "cardinal",
    qteLength: 5,
    maxErrors: Infinity,
    enemyDamageMultiplier: 1,
    enemies: [{ id: "main", name: "小樂", hp: 1000, maxHp: 1000 }],
    bossRuleSummary: "5 秒／4 向容錯",
    bossRuleDetail: "亮拳倒數 5 秒、QTE 僅出現正 4 方向（按錯不計失敗），變拳時機 1.0 秒，小樂不閃避摸摸。",
    final: false
  },
  {
    id: 2,
    chapter: "貳ノ章",
    name: "夕映・狐火",
    subtitle: "黃昏會把猶豫照得一清二楚",
    enemyHp: 2000,
    requiredLevel: 3,
    rewardMultiplier: 1.25,
    xpWin: 188,
    xpLoss: 63,
    winCoins: 125,
    lossCoins: 63,
    roundSeconds: 3,
    reactionWindowMs: 750,
    momoDodgeRate: 0.11,
    qteDirections: "all",
    qteLength: 5,
    maxErrors: 2,
    enemyDamageMultiplier: 1,
    enemies: [{ id: "main", name: "小樂", hp: 2000, maxHp: 2000 }],
    bossRuleSummary: "3 秒",
    bossRuleDetail: "亮拳倒數 3 秒、QTE 包含 8 方向（按錯 2 次失敗），變拳時機 0.75 秒，小樂有 11% 機率閃避摸摸。",
    final: false
  },
  {
    id: 3,
    chapter: "參ノ章",
    name: "月下・九尾試",
    subtitle: "別被九道殘影騙走視線",
    enemyHp: 5000,
    requiredLevel: 6,
    rewardMultiplier: 2,
    xpWin: 300,
    xpLoss: 100,
    winCoins: 200,
    lossCoins: 100,
    roundSeconds: 3,
    reactionWindowMs: 500,
    momoDodgeRate: 0.33,
    qteDirections: "all",
    qteLength: 7,
    maxErrors: 1,
    enemyDamageMultiplier: 1,
    enemies: [{ id: "main", name: "小樂", hp: 5000, maxHp: 5000 }],
    bossRuleSummary: "3 秒",
    bossRuleDetail: "亮拳倒數 3 秒、QTE 7 鍵長度（按錯 1 次失敗），變拳時機 0.5 秒，小樂有 33% 機率閃避摸摸。",
    final: false
  },
  {
    id: 4,
    chapter: "終ノ章",
    name: "鏡界・白金小樂",
    subtitle: "跨越鏡面，迎戰雙生的 2P 色",
    enemyHp: 10000,
    requiredLevel: 10,
    rewardMultiplier: 8,
    xpWin: 1200,
    xpLoss: 400,
    winCoins: 800,
    lossCoins: 400,
    roundSeconds: 3,
    reactionWindowMs: 250,
    momoDodgeRate: 0.66,
    qteDirections: "random",
    qteLength: 7,
    maxErrors: 1,
    enemyDamageMultiplier: 2,
    dualEnemy: true,
    enemies: [
      { id: "left", name: "白金小樂・左", hp: 5000, maxHp: 5000 },
      { id: "right", name: "白金小樂・右", hp: 5000, maxHp: 5000 }
    ],
    bossRuleSummary: "3 秒／雙小樂雙血條",
    bossRuleDetail: "亮拳倒數 3 秒、雙小樂雙血條（受擊 2 倍傷害）、7 鍵 QTE，極限變拳時機 0.25 秒，小樂有 66% 機率閃避摸摸。",
    final: true
  }
]);

const SKILLS = Object.freeze({
  momo: {
    id: "momo",
    name: "摸摸",
    code: "PETTING",
    unlockLevel: 2,
    maxLevel: 10,
    baseChance: 0.10,
    chancePerLevel: 0.10,
    damage: 25,
    costPerLevel: 1,
    glyph: "撫",
    description: "平手時以機率自動發動，偷摸摸場上隨機一個小樂對其造成 25 點傷害。"
  },
  dualHand: {
    id: "dualHand",
    name: "雙手解放",
    code: "DUAL_HANDS",
    unlockLevel: 4,
    maxLevel: 1,
    costPerLevel: 100,
    glyph: "掌",
    description: "解放另一隻手！在第四關對決中可同時使用左手（對左小樂）與右手（對右小樂）獨立出拳。"
  }
});

const GALLERY_ITEMS = Object.freeze([
  {
    id: "swimsuit_default",
    name: "夏日祭・清涼泳裝",
    variantName: "預設泳裝",
    src: ASSETS.swimsuit,
    description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。"
  },
  {
    id: "swimsuit_watermelon",
    name: "海風・切西瓜",
    variantName: "切西瓜",
    src: ASSETS.watermelon,
    description: "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣。"
  }
]);

const ITEMS = Object.freeze({
  hpPotion: {
    id: "hpPotion",
    name: "緋露藥",
    shortName: "HP 藥水",
    glyph: "◆",
    color: "crimson",
    restore: 25,
    price: 100,
    resource: "hp"
  },
  mpPotion: {
    id: "mpPotion",
    name: "蒼月露",
    shortName: "MP 藥水",
    glyph: "◇",
    color: "azure",
    restore: 25,
    price: 100,
    resource: "mp"
  }
});

const BASE_PLAYER = Object.freeze({
  maxHp: 100,
  maxMp: 50,
  damage: 100
});

const STAT_GAINS = Object.freeze({
  hp: 10,
  mp: 10,
  damage: 5
});

const BATTLE_RULES = Object.freeze({
  roundSeconds: 5,
  morphCost: 25,
  reactionWindowMs: 1000,
  qteSeconds: 5,
  qteLength: 5,
  enemyDamage: 100,
  hpPotionRestore: 25,
  mpPotionRestore: 25,
  winCoins: 100,
  lossCoins: 50
});

const EQUIPMENT_SLOTS = Object.freeze({
  head: { id: "head", label: "頭盔", icon: "👑" },
  shoulders: { id: "shoulders", label: "肩甲", icon: "🛡️" },
  chest: { id: "chest", label: "胸甲", icon: "🥋" },
  belt: { id: "belt", label: "腰帶", icon: "🎗️" },
  boots: { id: "boots", label: "鞋子", icon: "🥾" },
  mainHand: { id: "mainHand", label: "主手武器", icon: "⚔️" },
  offHand: { id: "offHand", label: "副手武防", icon: "🛡️" },
  ring1: { id: "ring1", label: "戒指 1", icon: "💍" },
  ring2: { id: "ring2", label: "戒指 2", icon: "💍" },
  earring1: { id: "earring1", label: "耳環 1", icon: "💎" },
  earring2: { id: "earring2", label: "耳環 2", icon: "💎" },
  badge: { id: "badge", label: "胸章", icon: "🏅" }
});

const EQUIPMENT_ITEMS = Object.freeze({
  chest_samurai: {
    id: "chest_samurai",
    name: "玄武・金剛胸甲",
    slotType: "chest",
    twoHanded: false,
    rarity: "epic",
    icon: "🥋🛡️",
    price: 320,
    stats: { damage: 0, hp: 150, mp: 0 },
    effect: { type: "armor_reduction", damageReduction: 25 },
    description: "玄武神靈加護的重型鎧甲。受到的傷害直接減免 25 點（可與盾牌減傷疊加）。"
  },
  chest_ninja: {
    id: "chest_ninja",
    name: "靈狐・幻影羽織",
    slotType: "chest",
    twoHanded: false,
    rarity: "epic",
    icon: "🥋🦊",
    price: 350,
    stats: { damage: 15, hp: 80, mp: 40 },
    effect: { type: "dodge", dodgeChance: 0.25 },
    description: "由九尾狐毛編織的靈幻羽織。猜輸受擊時有 25% 機率觸發殘影閃避，完全免疫本次傷害！"
  },
  chest_miko: {
    id: "chest_miko",
    name: "淨世・白狐千早",
    slotType: "chest",
    twoHanded: false,
    rarity: "rare",
    icon: "🥋⛩️",
    price: 260,
    stats: { damage: 10, hp: 100, mp: 60 },
    effect: { type: "mp_regen", mpRegen: 15 },
    description: "神社巫女穿著的純白千早服。每回合結束時回復 15 點 MP。"
  },
  chest_mirror: {
    id: "chest_mirror",
    name: "八咫・鏡光護胸",
    slotType: "chest",
    twoHanded: false,
    rarity: "legendary",
    icon: "🥋🪞",
    price: 550,
    stats: { damage: 20, hp: 120, mp: 50 },
    effect: { type: "reflect", reflectDamage: 40 },
    description: "鑲嵌神鏡碎片的護胸裝甲。受到小樂攻擊時，以鏡光反彈 40 點傷害給小樂。"
  },
  sword_flame: {
    id: "sword_flame",
    name: "業火・炎之太刀",
    slotType: "weapon",
    twoHanded: false,
    rarity: "epic",
    icon: "🔥⚔️",
    price: 350,
    stats: { damage: 25, hp: 50, mp: 0 },
    effect: { type: "burn", burnDamage: 30 },
    description: "刀身繚繞著永不熄滅的狐火。回合結束時對小樂造成 30 點燃燒傷害。"
  },
  sword_frost: {
    id: "sword_frost",
    name: "霜月・冰結靈刃",
    slotType: "weapon",
    twoHanded: false,
    rarity: "rare",
    icon: "❄️⚔️",
    price: 300,
    stats: { damage: 20, hp: 0, mp: 30 },
    effect: { type: "freeze", freezeChance: 0.3, reactionDelay: 0.5 },
    description: "極北寒潭萃取的靈刃。猜拳獲勝時 30% 機率冰凍小樂，使下一回合反應時間延長 +0.5 秒。"
  },
  sword_thunder: {
    id: "sword_thunder",
    name: "雷霆・神鳴迅劍",
    slotType: "weapon",
    twoHanded: false,
    rarity: "rare",
    icon: "⚡⚔️",
    price: 250,
    stats: { damage: 30, hp: 0, mp: 0 },
    effect: { type: "thunder", qteBonusDamage: 50 },
    description: "雷鳴纏繞的刺劍。QTE 反制成功時追加 50 點雷擊傷害。"
  },
  sword_great_nine: {
    id: "sword_great_nine",
    name: "破滅・九尾雙手巨劍",
    slotType: "weapon",
    twoHanded: true,
    rarity: "legendary",
    icon: "🗡️💥",
    price: 800,
    stats: { damage: 70, hp: 100, mp: -20 },
    effect: { type: "burst", winMultiplier: 1.5 },
    description: "蘊含九尾狂氣的雙手大劍（佔用雙手）。常規出拳獲勝傷害提高為 1.5 倍。"
  },
  shield_suzaku: {
    id: "shield_suzaku",
    name: "結界・朱雀盾",
    slotType: "offHand",
    twoHanded: false,
    rarity: "epic",
    icon: "🛡️✨",
    price: 320,
    stats: { damage: 0, hp: 150, mp: 50 },
    effect: { type: "shield", damageReduction: 30 },
    description: "刻有朱雀神紋的靈盾。受到的猜輸與 QTE 失敗傷害降低 30 點。"
  },
  dagger_shadow: {
    id: "dagger_shadow",
    name: "影月・短匕",
    slotType: "weapon",
    twoHanded: false,
    rarity: "rare",
    icon: "🗡️🌑",
    price: 220,
    stats: { damage: 25, hp: 0, mp: 0 },
    effect: { type: "shadow", momoDamageBonus: 15 },
    description: "隱於夜幕的短匕。可裝備於主手或副手，平手摸摸傷害額外 +15 點。"
  },
  helm_fox: {
    id: "helm_fox",
    name: "妖狐面具",
    slotType: "head",
    twoHanded: false,
    rarity: "rare",
    icon: "🦊🎭",
    price: 200,
    stats: { damage: 10, hp: 80, mp: 30 },
    description: "依小樂容貌雕琢的靈狐面具。提供均衡的生命、魔力與攻擊加成。"
  },
  shoulders_crimson: {
    id: "shoulders_crimson",
    name: "緋紅之肩鎧",
    slotType: "shoulders",
    twoHanded: false,
    rarity: "rare",
    icon: "🏮🛡️",
    price: 200,
    stats: { damage: 15, hp: 100, mp: 0 },
    description: "鳥居朱漆淬鍊的堅固肩鎧。大幅提升生命上限與攻擊力。"
  },
  belt_shimenawa: {
    id: "belt_shimenawa",
    name: "注連繩神靈腰帶",
    slotType: "belt",
    twoHanded: false,
    rarity: "epic",
    icon: "🎗️⛩️",
    price: 280,
    stats: { damage: 0, hp: 60, mp: 40 },
    effect: { type: "potion_boost", potionBoost: 10 },
    description: "神社結界編織的神繩腰帶。藥水回復效果額外提升 10 點。"
  },
  boots_gale: {
    id: "boots_gale",
    name: "疾風之草履",
    slotType: "boots",
    twoHanded: false,
    rarity: "epic",
    icon: "🥾💨",
    price: 300,
    stats: { damage: 0, hp: 50, mp: 0 },
    effect: { type: "qte_time", extraQteSeconds: 1 },
    description: "踏風而行的神行草履。QTE 反制時間延長 1.0 秒。"
  },
  earring_magatama: {
    id: "earring_magatama",
    name: "八尺瓊・勾玉耳環",
    slotType: "earring",
    twoHanded: false,
    rarity: "rare",
    icon: "💎✨",
    price: 180,
    stats: { damage: 8, hp: 0, mp: 25 },
    effect: { type: "morph_discount", morphDiscount: 5 },
    description: "翠綠溫潤的古老勾玉。變拳技能 MP 消耗降低 5 點。"
  },
  ring_ruby: {
    id: "ring_ruby",
    name: "狐火紅玉戒指",
    slotType: "ring",
    twoHanded: false,
    rarity: "rare",
    icon: "💍🔴",
    price: 160,
    stats: { damage: 12, hp: 50, mp: 0 },
    description: "封印狐火靈氣的紅寶石戒指。提升生命與攻擊。"
  },
  ring_sapphire: {
    id: "ring_sapphire",
    name: "月華藍玉戒指",
    slotType: "ring",
    twoHanded: false,
    rarity: "rare",
    icon: "💍🔵",
    price: 160,
    stats: { damage: 12, hp: 0, mp: 50 },
    description: "映照幽藍月光的寶石戒指。提升魔力與攻擊。"
  },
  badge_bond: {
    id: "badge_bond",
    name: "絆之守護胸章",
    slotType: "badge",
    twoHanded: false,
    rarity: "legendary",
    icon: "🏅💖",
    price: 500,
    stats: { damage: 20, hp: 100, mp: 50 },
    effect: { type: "coin_boost", coinMultiplier: 1.2 },
    description: "與小樂深厚羈絆的信物。全面提升能力，且戰勝時額外獲得 20% 星砂。"
  }
});

const STORAGE_KEY = "koraku-rps-save-v1";

// --- src/js/services/I18n.js ---
const LOCALES = Object.freeze({
  "zh-Hant": { id: "zh-Hant", label: "繁體中文", code: "zh-TW" },
  "zh-Hans": { id: "zh-Hans", label: "简体中文", code: "zh-CN" },
  "en": { id: "en", label: "English", code: "en-US" },
  "ja": { id: "ja", label: "日本語", code: "ja-JP" }
});

const LOCALE_ORDER = Object.freeze(["zh-Hant", "zh-Hans", "en", "ja"]);
const DEFAULT_LOCALE = "en";
const LOCALE_STORAGE_KEY = "koraku-rps-locale";

const DICTIONARY = {
  "zh-Hant": {
    meta: {
      title: "狐樂・絆之勝負",
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
      // Guide
      guideRpsTitle: "基礎猜拳規則",
      guideRpsDesc: "剪刀剋布、布剋石頭、石頭剋剪刀。猜贏對小樂造成傷害，平手可能觸發摸摸，猜輸進入 QTE 反制階段。",
      guideQteTitle: "QTE 絕地反制",
      guideQteDesc: "猜輸後在限定時間內依序輸入方向鍵。反制成功可免除傷害並給予小樂反擊；失敗則承受重擊。",
      guideMorphTitle: "時機變拳秘術",
      guideMorphDesc: "在看到小樂出拳後的極短反應窗口內，消耗 25 MP 可逆轉為克制對手的手勢！",
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
      btnAskSwimsuitSpace: "請小樂穿泳裝 <kbd>SPACE</kbd>",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜 <kbd>SPACE</kbd>",
      btnNextStrikeSpace: "進行第 {attempt} 刀 <kbd>SPACE</kbd>",
      btnRematch: "再次挑戰 <kbd>E</kbd>",
      btnSelectStages: "選擇章節 <kbd>C</kbd>",
      btnReturnHome: "回大廳 <kbd>Q</kbd>",
      unrevealed: "未揭曉",
      preparing: "準備中",
      countdownCaption: "出拳倒數",
      morphCaption: "按 F 變拳",
      qteCaption: "反制機會",
      settleCaption: "回合結算",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "和"
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
        description: "極北寒潭萃取的靈刃。猜拳獲勝時 30% 機率冰凍小樂，使下一回合反應時間延長 +0.5 秒。"
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
      guideRpsTitle: "基础猜拳规则",
      guideRpsDesc: "剪刀克布、布克石头、石头克剪刀。猜赢对小乐造成伤害，平手可能触发摸摸，猜输进入 QTE 反制阶段。",
      guideQteTitle: "QTE 绝地反制",
      guideQteDesc: "猜输后在限定时间内依次输入方向键。反制成功可免除伤害并给小乐予以反击；失败则承受重创。",
      guideMorphTitle: "时机变拳秘术",
      guideMorphDesc: "在看到小乐出拳后的极短反应窗口内，消耗 25 MP 可逆转为克制对手的手势！",
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
      btnAskSwimsuitSpace: "请小乐穿泳装 <kbd>SPACE</kbd>",
      btnPlayWatermelonSpace: "玩蒙眼切西瓜 <kbd>SPACE</kbd>",
      btnNextStrikeSpace: "进行第 {attempt} 刀 <kbd>SPACE</kbd>",
      btnRematch: "再次挑战 <kbd>E</kbd>",
      btnSelectStages: "选择章节 <kbd>C</kbd>",
      btnReturnHome: "回大厅 <kbd>Q</kbd>",
      unrevealed: "未揭晓",
      preparing: "准备中",
      countdownCaption: "出拳倒计时",
      morphCaption: "按 F 变拳",
      qteCaption: "反制机会",
      settleCaption: "回合结算",
      battleWon: "胜",
      battleLost: "负",
      battleDraw: "和"
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
        description: "极北寒潭萃取的灵刃。猜拳获胜时 30% 概率冰冻小乐，使下一回合反应时间延长 +0.5 秒。"
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
      guideRpsTitle: "Basic RPS Rules",
      guideRpsDesc: "Scissors beat Paper, Paper beats Rock, Rock beats Scissors. Winning deals damage, draws can trigger Petting, and losing triggers QTE Counter phase.",
      guideQteTitle: "Clutch QTE Counter",
      guideQteDesc: "When you lose a throw, input direction keys within the time limit. A successful counter cancels damage and strikes back!",
      guideMorphTitle: "Morph Technique",
      guideMorphDesc: "Spend 25 MP during the short reaction window after seeing her hand to morph into the winning hand!",
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
      btnAskSwimsuitSpace: "Ask Kohaku for Swimsuit <kbd>SPACE</kbd>",
      btnPlayWatermelonSpace: "Blindfolded Watermelon <kbd>SPACE</kbd>",
      btnNextStrikeSpace: "Strike #{attempt} <kbd>SPACE</kbd>",
      btnRematch: "Rematch <kbd>E</kbd>",
      btnSelectStages: "Select Chapter <kbd>C</kbd>",
      btnReturnHome: "Home Lobby <kbd>Q</kbd>",
      unrevealed: "Unrevealed",
      preparing: "Readying",
      countdownCaption: "RPS Countdown",
      morphCaption: "Press F to Morph",
      qteCaption: "Counter Window",
      settleCaption: "Round Summary",
      battleWon: "WIN",
      battleLost: "LOSE",
      battleDraw: "DRAW"
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
        description: "Forged in arctic waters. 30% chance on RPS win to freeze Kohaku, extending the next reaction window by +0.5s."
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
      guideRpsTitle: "基本じゃんけんルール",
      guideRpsDesc: "チョキはパーに勝ち、パーはグーに勝ち、グーはチョキに勝つ。勝ちでダメージ、あいこでナデナデ、負けで QTE 反撃へ突入。",
      guideQteTitle: "起死回生の QTE 反撃",
      guideQteDesc: "負けた直後の猶予時間内に方向キーを素早く入力。カウンター成功でダメージ無効＆反撃打撃を与えます！",
      guideMorphTitle: "刹那の変拳秘術",
      guideMorphDesc: "コハクの手が見えた一瞬の隙に 25 MP を消費して勝ち手に化かす奥義！",
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
      btnAskSwimsuitSpace: "水着に着替えてもらう <kbd>SPACE</kbd>",
      btnPlayWatermelonSpace: "目隠しスイカ割り <kbd>SPACE</kbd>",
      btnNextStrikeSpace: "{attempt}太刀目に挑戦 <kbd>SPACE</kbd>",
      btnRematch: "再挑戦 <kbd>E</kbd>",
      btnSelectStages: "章選択 <kbd>C</kbd>",
      btnReturnHome: "ロビーへ <kbd>Q</kbd>",
      unrevealed: "未公開",
      preparing: "構え中",
      countdownCaption: "じゃんけん秒読",
      morphCaption: "Fキーで変拳",
      qteCaption: "反撃チャンス",
      settleCaption: "ターン結果",
      battleWon: "勝",
      battleLost: "負",
      battleDraw: "分"
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
        description: "極北の霊峰で鍛えられた霊刃。勝利時 30% の確率で凍結させ、次ターンの猶予を +0.5 秒延長。"
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

class I18nService {
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

const I18n = new I18nService();

// --- src/js/core/EventBus.js ---
class EventBus {
  #listeners = new Map();

  on(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, new Set());
    }
    this.#listeners.get(eventName).add(listener);
    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    this.#listeners.get(eventName)?.delete(listener);
  }

  emit(eventName, payload) {
    this.#listeners.get(eventName)?.forEach((listener) => listener(payload));
  }
}

// --- src/js/core/TimerRegistry.js ---
class TimerRegistry {
  #timeouts = new Set();
  #intervals = new Set();

  timeout(callback, delay) {
    const id = globalThis.setTimeout(() => {
      this.#timeouts.delete(id);
      callback();
    }, delay);
    this.#timeouts.add(id);
    return id;
  }

  interval(callback, delay) {
    const id = globalThis.setInterval(callback, delay);
    this.#intervals.add(id);
    return id;
  }

  clearTimeout(id) {
    globalThis.clearTimeout(id);
    this.#timeouts.delete(id);
  }

  clearInterval(id) {
    globalThis.clearInterval(id);
    this.#intervals.delete(id);
  }

  clearAll() {
    this.#timeouts.forEach((id) => globalThis.clearTimeout(id));
    this.#intervals.forEach((id) => globalThis.clearInterval(id));
    this.#timeouts.clear();
    this.#intervals.clear();
  }
}

// --- src/js/services/Persistence.js ---
class Persistence {
  load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  save(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // The game remains playable when storage is unavailable.
    }
  }

  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore unavailable storage.
    }
  }
}

// --- src/js/systems/progressionRules.js ---
function xpNeededForLevel(level) {
  return 100 + Math.max(0, level - 1) * 75;
}

function applyExperience(profile, amount) {
  const next = structuredClone(profile);
  next.xp += amount;
  let levelsGained = 0;

  while (next.xp >= xpNeededForLevel(next.level)) {
    next.xp -= xpNeededForLevel(next.level);
    next.level += 1;
    next.skillPoints += 5;
    levelsGained += 1;
  }

  return { profile: next, levelsGained };
}

function computePlayerStats(profile, equipment = {}) {
  let bonusHp = 0;
  let bonusMp = 0;
  let bonusDamage = 0;

  if (equipment && typeof equipment === "object") {
    Object.values(equipment).forEach((itemId) => {
      if (!itemId) return;
      const item = EQUIPMENT_ITEMS[itemId];
      if (!item || !item.stats) return;
      bonusHp += item.stats.hp || 0;
      bonusMp += item.stats.mp || 0;
      bonusDamage += item.stats.damage || 0;
    });
  }

  return {
    maxHp: Math.max(1, BASE_PLAYER.maxHp + (profile.allocations?.hp || 0) * STAT_GAINS.hp + bonusHp),
    maxMp: Math.max(0, BASE_PLAYER.maxMp + (profile.allocations?.mp || 0) * STAT_GAINS.mp + bonusMp),
    damage: Math.max(1, BASE_PLAYER.damage + (profile.allocations?.damage || 0) * STAT_GAINS.damage + bonusDamage)
  };
}

// --- src/js/systems/rpsRules.js ---
function compareHands(playerHand, opponentHand) {
  if (!HANDS[playerHand] || !HANDS[opponentHand]) {
    throw new Error("Unknown hand");
  }
  if (playerHand === opponentHand) return "draw";
  return HANDS[playerHand].beats === opponentHand ? "win" : "loss";
}

function getCounterHand(opponentHand) {
  const counter = HAND_ORDER.find((hand) => HANDS[hand].beats === opponentHand);
  if (!counter) throw new Error("Unknown opponent hand");
  return counter;
}

function getRandomHand(random = Math.random) {
  return HAND_ORDER[Math.floor(random() * HAND_ORDER.length)];
}

function getHandLabel(hand) {
  return HANDS[hand]?.label || "";
}

function getQteCounterNarration(originalPlayerHand) {
  const narratives = {
    paper: {
      changedHand: "paper",
      text: "用手包裹住小樂的剪刀手——反制成功！"
    },
    scissors: {
      changedHand: "paper",
      text: "用布握住了小樂的小拳頭——反制成功！"
    },
    rock: {
      changedHand: "paper",
      text: "用五指交扣了小樂的軟綿綿小手手，離奇獲勝！"
    }
  };
  return narratives[originalPlayerHand];
}

function evaluateDualRps(playerHand, leftHand, rightHand) {
  const leftResult = leftHand ? compareHands(playerHand, leftHand) : null;
  const rightResult = rightHand ? compareHands(playerHand, rightHand) : null;

  const losses = [];
  const wins = [];
  const draws = [];

  if (leftResult === "loss") losses.push("left");
  else if (leftResult === "win") wins.push("left");
  else if (leftResult === "draw") draws.push("left");

  if (rightResult === "loss") losses.push("right");
  else if (rightResult === "win") wins.push("right");
  else if (rightResult === "draw") draws.push("right");

  return {
    left: leftResult,
    right: rightResult,
    losses,
    wins,
    draws,
    isDualLoss: losses.length === 2,
    isSingleLoss: losses.length === 1,
    hasLoss: losses.length > 0,
    isAllWin: wins.length > 0 && losses.length === 0 && draws.length === 0
  };
}

// --- src/js/systems/QTEInputSystem.js ---
const CARDINAL_DIRECTIONS = new Set(["up", "down", "left", "right"]);
const DIRECTION_CHORDS = Object.freeze({
  upLeft: ["up", "left"],
  upRight: ["up", "right"],
  downLeft: ["down", "left"],
  downRight: ["down", "right"]
});
const OPPOSITES = Object.freeze({
  up: "down",
  down: "up",
  left: "right",
  right: "left"
});

const WASD_KEY_MAP = Object.freeze({
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  q: "upLeft",
  e: "upRight",
  z: "downLeft",
  c: "downRight"
});

const ARROW_KEY_MAP = Object.freeze({
  arrowup: "up",
  arrowdown: "down",
  arrowleft: "left",
  arrowright: "right",
  "8": "up",
  "2": "down",
  "4": "left",
  "6": "right",
  "7": "upLeft",
  "9": "upRight",
  "1": "downLeft",
  "3": "downRight"
});

function wasdDirectionFromKey(key) {
  const normalized = String(key).toLowerCase();
  return WASD_KEY_MAP[normalized] || null;
}

function arrowDirectionFromKey(key) {
  const normalized = String(key).toLowerCase();
  return ARROW_KEY_MAP[normalized] || null;
}

function directionFromKey(key) {
  const normalized = String(key).toLowerCase();
  return DIRECTIONS.find((direction) => direction.keys.includes(normalized))?.id || null;
}

function isDiagonalDirection(directionId) {
  return Object.hasOwn(DIRECTION_CHORDS, directionId);
}

function getDirectionChord(directionId) {
  return DIRECTION_CHORDS[directionId] ? [...DIRECTION_CHORDS[directionId]] : null;
}

function combineCardinalDirections(directions) {
  const held = new Set(directions);
  return Object.entries(DIRECTION_CHORDS).find(([, pair]) => {
    return pair.every((direction) => held.has(direction));
  })?.[0] || null;
}

class QTEKeyboardInput {
  constructor(mapper = directionFromKey) {
    this.mapper = mapper;
    this.held = new Set();
  }

  keyDown(key, expectedDirection, repeat = false) {
    const direction = this.mapper(key);
    if (!direction) return { handled: false, direction: null };
    if (repeat) return { handled: true, direction: null };

    if (isDiagonalDirection(direction)) {
      return { handled: true, direction };
    }

    if (!CARDINAL_DIRECTIONS.has(direction)) {
      return { handled: false, direction: null };
    }

    this.held.delete(OPPOSITES[direction]);
    this.held.add(direction);

    if (isDiagonalDirection(expectedDirection)) {
      return {
        handled: true,
        direction: combineCardinalDirections(this.held)
      };
    }

    return { handled: true, direction };
  }

  keyUp(key) {
    const direction = this.mapper(key);
    if (!direction || !CARDINAL_DIRECTIONS.has(direction)) return false;
    this.held.delete(direction);
    return true;
  }


  snapshot() {
    return [...this.held];
  }

  reset() {
    this.held.clear();
  }
}

// --- src/js/systems/QTESystem.js ---
const CARDINAL_IDS = Object.freeze(["up", "down", "left", "right"]);
const ALL_IDS = Object.freeze(DIRECTIONS.map((d) => d.id));

class QTESystem {
  constructor(bus, timers, random = Math.random) {
    this.bus = bus;
    this.timers = timers;
    this.random = random;
    this.active = false;
    this.sequence = [];
    this.index = 0;
    this.deadline = 0;
    this.durationMs = 0;
    this.errors = 0;
    this.maxErrors = Infinity;
    this.tickId = null;
  }

  start(lengthOrOptions, durationMs = 5000, options = {}) {
    this.stop(false);
    let length = 5;
    let duration = durationMs;
    let directionMode = "all";
    let maxErrors = Infinity;

    if (typeof lengthOrOptions === "object" && lengthOrOptions !== null) {
      length = lengthOrOptions.length ?? 5;
      duration = lengthOrOptions.durationMs ?? 5000;
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? Infinity;
    } else {
      length = lengthOrOptions ?? 5;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? "all";
      maxErrors = options.maxErrors ?? Infinity;
    }

    this.active = true;
    this.index = 0;
    this.errors = 0;
    this.maxErrors = maxErrors;
    this.durationMs = duration;

    this.sequence = this.generateSequence(length, directionMode);
    this.deadline = performance.now() + duration;
    this.emit();
    this.tickId = this.timers.interval(() => {
      if (performance.now() >= this.deadline) {
        this.finish(false);
      } else {
        this.emit();
      }
    }, 50);
  }

  generateSequence(length, mode) {
    if (mode === "cardinal") {
      return Array.from({ length }, () => {
        return CARDINAL_IDS[Math.floor(this.random() * CARDINAL_IDS.length)];
      });
    }

    if (mode === "random" || mode === "mixed") {
      const styleRoll = this.random();
      if (styleRoll < 0.33) {
        // Entirely 4 directions
        return Array.from({ length }, () => {
          return CARDINAL_IDS[Math.floor(this.random() * CARDINAL_IDS.length)];
        });
      }
      if (styleRoll < 0.66) {
        // Entirely 8 directions
        return Array.from({ length }, () => {
          return ALL_IDS[Math.floor(this.random() * ALL_IDS.length)];
        });
      }
      // Mixed
      return Array.from({ length }, () => {
        const pool = this.random() < 0.5 ? CARDINAL_IDS : ALL_IDS;
        return pool[Math.floor(this.random() * pool.length)];
      });
    }

    // Default: all 8 directions
    return Array.from({ length }, () => {
      return ALL_IDS[Math.floor(this.random() * ALL_IDS.length)];
    });
  }

  input(directionId) {
    if (!this.active) return false;
    const expected = this.sequence[this.index];
    if (directionId !== expected) {
      this.errors += 1;
      this.bus.emit("qte:wrong", {
        expected,
        received: directionId,
        errors: this.errors,
        maxErrors: this.maxErrors
      });
      if (this.errors >= this.maxErrors) {
        this.finish(false);
      }
      return false;
    }

    this.index += 1;
    this.emit();
    if (this.index >= this.sequence.length) {
      this.finish(true);
    }
    return true;
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - performance.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = performance.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (performance.now() >= this.deadline) {
        this.finish(false);
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - performance.now());
    return {
      active: this.active,
      isPaused: Boolean(this.isPaused),
      sequence: [...this.sequence],
      index: this.index,
      errors: this.errors,
      maxErrors: this.maxErrors,
      remainingMs,
      progress: this.durationMs ? remainingMs / this.durationMs : 0
    };
  }

  emit() {
    this.bus.emit("qte:update", this.snapshot());
  }

  finish(success) {
    if (!this.active) return;
    const result = { success, sequence: [...this.sequence], index: this.index, errors: this.errors };
    this.active = false;
    this.isPaused = false;
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.bus.emit("qte:update", this.snapshot());
    this.bus.emit("qte:finished", result);
  }

  stop(emit = true) {
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    const wasActive = this.active;
    this.active = false;
    if (emit && wasActive) this.emit();
  }
}

class DualQTESystem {
  constructor(bus, timers, random = Math.random) {
    this.bus = bus;
    this.timers = timers;
    this.random = random;
    this.active = false;
    this.left = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "left" };
    this.right = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "right" };
    this.deadline = 0;
    this.durationMs = 0;
    this.tickId = null;
  }

  start(lengthOrOptions = {}, durationMs = 7000, options = {}) {
    this.stop(false);
    let length = 7;
    let duration = durationMs;
    let directionMode = "all";
    let maxErrors = 1;

    if (typeof lengthOrOptions === "object" && lengthOrOptions !== null) {
      length = lengthOrOptions.length ?? 7;
      duration = lengthOrOptions.durationMs ?? 7000;
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? 1;
    } else {
      length = lengthOrOptions ?? 7;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? "all";
      maxErrors = options.maxErrors ?? 1;
    }

    this.active = true;
    this.durationMs = duration;
    this.left = {
      sequence: this.generateSequence(length, directionMode),
      index: 0,
      errors: 0,
      maxErrors,
      completed: false,
      success: false,
      enemyId: "left"
    };
    this.right = {
      sequence: this.generateSequence(length, directionMode),
      index: 0,
      errors: 0,
      maxErrors,
      completed: false,
      success: false,
      enemyId: "right"
    };

    this.deadline = performance.now() + duration;
    this.emit();
    this.tickId = this.timers.interval(() => {
      if (performance.now() >= this.deadline) {
        this.finish();
      } else {
        this.emit();
      }
    }, 50);
  }

  generateSequence(length, mode) {
    if (mode === "cardinal") {
      return Array.from({ length }, () => CARDINAL_IDS[Math.floor(this.random() * CARDINAL_IDS.length)]);
    }
    if (mode === "random" || mode === "mixed") {
      const styleRoll = this.random();
      if (styleRoll < 0.33) {
        return Array.from({ length }, () => CARDINAL_IDS[Math.floor(this.random() * CARDINAL_IDS.length)]);
      }
      if (styleRoll < 0.66) {
        return Array.from({ length }, () => ALL_IDS[Math.floor(this.random() * ALL_IDS.length)]);
      }
      return Array.from({ length }, () => {
        const pool = this.random() < 0.5 ? CARDINAL_IDS : ALL_IDS;
        return pool[Math.floor(this.random() * pool.length)];
      });
    }
    return Array.from({ length }, () => ALL_IDS[Math.floor(this.random() * ALL_IDS.length)]);
  }

  inputSlot(slotKey, directionId) {
    if (!this.active) return false;
    const slot = this[slotKey];
    if (!slot || slot.completed) return false;

    const expected = slot.sequence[slot.index];
    if (directionId !== expected) {
      slot.errors += 1;
      this.bus.emit("qte:wrong", {
        slot: slotKey,
        expected,
        received: directionId,
        errors: slot.errors,
        maxErrors: slot.maxErrors
      });
      if (slot.errors >= slot.maxErrors) {
        slot.completed = true;
        slot.success = false;
        this.bus.emit("qte:slot-failed", { slot: slotKey, enemyId: slot.enemyId });
        if (this.left.completed && this.right.completed) {
          this.finish();
        }
      }
      this.emit();
      return false;
    }

    slot.index += 1;
    if (slot.index >= slot.sequence.length) {
      slot.completed = true;
      slot.success = true;
      this.bus.emit("qte:slot-success", { slot: slotKey, enemyId: slot.enemyId });
      if (this.left.completed && this.right.completed) {
        this.finish();
        return true;
      }
    }
    this.emit();
    return true;
  }

  inputLeft(directionId) {
    return this.inputSlot("left", directionId);
  }

  inputRight(directionId) {
    return this.inputSlot("right", directionId);
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - performance.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = performance.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (performance.now() >= this.deadline) {
        this.finish();
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - performance.now());
    return {
      mode: "dual",
      active: this.active,
      isPaused: Boolean(this.isPaused),
      left: { ...this.left, sequence: [...this.left.sequence] },
      right: { ...this.right, sequence: [...this.right.sequence] },
      remainingMs,
      progress: this.durationMs ? remainingMs / this.durationMs : 0
    };
  }

  emit() {
    this.bus.emit("qte:update", this.snapshot());
  }

  finish() {
    if (!this.active) return;
    this.active = false;
    this.isPaused = false;
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }

    const leftSuccess = this.left.success || (this.left.index >= this.left.sequence.length && this.left.errors < this.left.maxErrors);
    const rightSuccess = this.right.success || (this.right.index >= this.right.sequence.length && this.right.errors < this.right.maxErrors);

    const result = {
      mode: "dual",
      left: {
        success: leftSuccess,
        enemyId: "left",
        sequence: [...this.left.sequence],
        index: this.left.index,
        errors: this.left.errors
      },
      right: {
        success: rightSuccess,
        enemyId: "right",
        sequence: [...this.right.sequence],
        index: this.right.index,
        errors: this.right.errors
      }
    };

    this.bus.emit("qte:update", this.snapshot());
    this.bus.emit("qte:finished", result);
  }

  stop(emit = true) {
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    const wasActive = this.active;
    this.active = false;
    if (emit && wasActive) this.emit();
  }
}

// --- src/js/core/GameStore.js ---
const DEFAULT_SAVE = Object.freeze({
  version: 1,
  profile: {
    level: 1,
    xp: 0,
    skillPoints: 0,
    allocations: { hp: 0, mp: 0, damage: 0 },
    skills: { momo: 0, dualHand: 0 }
  },
  coins: 0,
  inventory: { hpPotion: 1, mpPotion: 0 },
  equipment: {
    head: null,
    shoulders: null,
    chest: null,
    belt: null,
    boots: null,
    mainHand: null,
    offHand: null,
    ring1: null,
    ring2: null,
    earring1: null,
    earring2: null,
    badge: null
  },
  inventoryEquipment: [],
  records: { wins: 0, losses: 0, bestStage: 0, unlockedSwimsuit: false },
  settings: { muted: false }
});

function freshSave() {
  return structuredClone(DEFAULT_SAVE);
}

function sanitizeSave(candidate) {
  if (!candidate || candidate.version !== 1) return freshSave();
  const base = freshSave();
  return {
    ...base,
    ...candidate,
    profile: {
      ...base.profile,
      ...candidate.profile,
      allocations: {
        ...base.profile.allocations,
        ...candidate.profile?.allocations
      },
      skills: {
        ...base.profile.skills,
        ...candidate.profile?.skills
      }
    },
    inventory: { ...base.inventory, ...candidate.inventory },
    equipment: { ...base.equipment, ...candidate.equipment },
    inventoryEquipment: Array.isArray(candidate.inventoryEquipment) ? [...candidate.inventoryEquipment] : [],
    records: { ...base.records, ...candidate.records },
    settings: { ...base.settings, ...candidate.settings }
  };
}

class GameStore {
  constructor(bus, persistence) {
    this.bus = bus;
    this.persistence = persistence;
    this.state = sanitizeSave(persistence.load());
  }

  snapshot() {
    return structuredClone({
      ...this.state,
      playerStats: computePlayerStats(this.state.profile, this.state.equipment),
      xpToNext: xpNeededForLevel(this.state.profile.level)
    });
  }

  commit(reason) {
    this.persistence.save(this.state);
    this.bus.emit("store:changed", { reason, state: this.snapshot() });
  }

  buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這件商品。" };
    if (this.state.coins < item.price) {
      return { ok: false, message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventory[itemId] += 1;
    this.commit("purchase");
    return { ok: true, message: "購入「" + item.name + "」！" };
  }

  buyEquipment(itemId) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這件裝備。" };
    if (this.state.coins < item.price) {
      return { ok: false, message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventoryEquipment.push(itemId);
    this.commit("purchase-equipment");
    return { ok: true, message: "購入「" + item.name + "」並已放入裝備背包！" };
  }

  equipItem(itemId, targetSlot = null) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item) return { ok: false, message: "無效的裝備。" };

    const invIndex = this.state.inventoryEquipment.indexOf(itemId);
    if (invIndex === -1) {
      return { ok: false, message: "背包中沒有這件裝備。" };
    }

    let slot = targetSlot;
    if (!slot) {
      if (item.slotType === "weapon") {
        if (item.twoHanded) {
          slot = "mainHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        slot = "offHand";
      } else if (item.slotType === "ring") {
        slot = !this.state.equipment.ring1 ? "ring1" : (!this.state.equipment.ring2 ? "ring2" : "ring1");
      } else if (item.slotType === "earring") {
        slot = !this.state.equipment.earring1 ? "earring1" : (!this.state.equipment.earring2 ? "earring2" : "earring1");
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, message: "無效的裝備欄位。" };
    }

    // Two-handed logic
    if (item.twoHanded) {
      slot = "mainHand";
      if (this.state.equipment.offHand) {
        this.state.inventoryEquipment.push(this.state.equipment.offHand);
        this.state.equipment.offHand = null;
      }
    } else if (slot === "offHand") {
      const currentMain = this.state.equipment.mainHand;
      if (currentMain && EQUIPMENT_ITEMS[currentMain]?.twoHanded) {
        this.state.inventoryEquipment.push(currentMain);
        this.state.equipment.mainHand = null;
      }
    }

    // Remove from inventory
    this.state.inventoryEquipment.splice(invIndex, 1);

    // If target slot had an item, return to inventory
    const oldItem = this.state.equipment[slot];
    if (oldItem) {
      this.state.inventoryEquipment.push(oldItem);
    }

    this.state.equipment[slot] = itemId;
    this.commit("equip-item");
    return { ok: true, message: "已穿戴「" + item.name + "」。" };
  }

  unequipItem(slotKey) {
    if (!this.state.equipment[slotKey]) {
      return { ok: false, message: "此欄位未裝備任何物品。" };
    }
    const itemId = this.state.equipment[slotKey];
    this.state.equipment[slotKey] = null;
    this.state.inventoryEquipment.push(itemId);
    this.commit("unequip-item");
    return { ok: true, message: "已卸下裝備。" };
  }

  consumeItem(itemId) {
    if (!ITEMS[itemId] || this.state.inventory[itemId] <= 0) return false;
    this.state.inventory[itemId] -= 1;
    this.commit("consume-item");
    return true;
  }

  allocateStat(stat) {
    if (!Object.hasOwn(this.state.profile.allocations, stat)) {
      return { ok: false, message: "無效的能力項目。" };
    }
    if (this.state.profile.skillPoints <= 0) {
      return { ok: false, message: "目前沒有可用點數。" };
    }
    this.state.profile.skillPoints -= 1;
    this.state.profile.allocations[stat] += 1;
    this.commit("allocate-stat");
    return { ok: true, message: "能力提升了。" };
  }

  allocateSkill(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return { ok: false, message: "無效的技能項目。" };
    if (this.state.profile.level < skill.unlockLevel) {
      return { ok: false, message: "等級需達 Lv. " + skill.unlockLevel + " 方可學習此技能。" };
    }
    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skill.maxLevel) {
      return { ok: false, message: "此技能已達最高等級。" };
    }
    if (this.state.profile.skillPoints < skill.costPerLevel) {
      return { ok: false, message: "技能點數不足。" };
    }
    this.state.profile.skillPoints -= skill.costPerLevel;
    this.state.profile.skills[skillId] = (currentLvl || 0) + 1;
    this.commit("allocate-skill");
    return { ok: true, message: "「" + skill.name + "」升級至 Lv. " + this.state.profile.skills[skillId] + "！" };
  }

  unlockSwimsuit() {
    if (!this.state.records.unlockedSwimsuit) {
      this.state.records.unlockedSwimsuit = true;
      this.commit("unlock-swimsuit");
    }
  }

  recordBattle(won, stage) {
    let stageCoins = won ? (stage?.winCoins ?? BATTLE_RULES.winCoins) : (stage?.lossCoins ?? BATTLE_RULES.lossCoins);
    const stageXp = won ? (stage?.xpWin ?? 0) : (stage?.xpLoss ?? 0);

    // Badge of bond 20% coin boost
    const badgeItem = EQUIPMENT_ITEMS[this.state.equipment.badge];
    if (won && badgeItem?.effect?.type === "coin_boost") {
      stageCoins = Math.round(stageCoins * (badgeItem.effect.coinMultiplier || 1.2));
    }

    const reward = {
      coins: stageCoins,
      xp: stageXp,
      levelsGained: 0
    };
    this.state.coins += reward.coins;
    this.state.records[won ? "wins" : "losses"] += 1;
    if (won && stage?.id) {
      this.state.records.bestStage = Math.max(this.state.records.bestStage, stage.id);
    }
    const gained = applyExperience(this.state.profile, reward.xp);
    this.state.profile = gained.profile;
    reward.levelsGained = gained.levelsGained;
    this.commit("battle-result");
    return reward;
  }

  grantExperience(amount, reason = "bonus-experience") {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (safeAmount === 0) return { xp: 0, levelsGained: 0 };

    const gained = applyExperience(this.state.profile, safeAmount);
    this.state.profile = gained.profile;
    this.commit(reason);
    return { xp: safeAmount, levelsGained: gained.levelsGained };
  }

  cheatSetValues(updates = {}) {
    if (typeof updates.level === "number" && updates.level >= 1) {
      this.state.profile.level = Math.floor(updates.level);
    }
    if (typeof updates.xp === "number" && updates.xp >= 0) {
      this.state.profile.xp = Math.floor(updates.xp);
    }
    if (typeof updates.skillPoints === "number" && updates.skillPoints >= 0) {
      this.state.profile.skillPoints = Math.floor(updates.skillPoints);
    }
    if (typeof updates.coins === "number" && updates.coins >= 0) {
      this.state.coins = Math.floor(updates.coins);
    }
    if (typeof updates.hpPotion === "number" && updates.hpPotion >= 0) {
      this.state.inventory.hpPotion = Math.floor(updates.hpPotion);
    }
    if (typeof updates.mpPotion === "number" && updates.mpPotion >= 0) {
      this.state.inventory.mpPotion = Math.floor(updates.mpPotion);
    }
    if (updates.allocations) {
      if (typeof updates.allocations.hp === "number") this.state.profile.allocations.hp = Math.max(0, updates.allocations.hp);
      if (typeof updates.allocations.mp === "number") this.state.profile.allocations.mp = Math.max(0, updates.allocations.mp);
      if (typeof updates.allocations.damage === "number") this.state.profile.allocations.damage = Math.max(0, updates.allocations.damage);
    }
    if (updates.skills) {
      if (typeof updates.skills.momo === "number") this.state.profile.skills.momo = Math.max(0, Math.min(10, updates.skills.momo));
      if (typeof updates.skills.dualHand === "number") this.state.profile.skills.dualHand = Math.max(0, Math.min(1, updates.skills.dualHand));
    }
    this.commit("cheat-update");
    return { ok: true, message: "數值已更新！" };
  }

  cheatUnlockAll() {
    this.state.records.bestStage = 4;
    this.commit("cheat-unlock-all");
    return { ok: true, message: "已解鎖全部 4 個關卡與 BOSS 說明！" };
  }

  cheatUnlockGallery() {
    this.state.records.unlockedSwimsuit = true;
    this.commit("cheat-unlock-gallery");
    return { ok: true, message: "已解鎖全部圖鑑立繪！" };
  }

  toggleMuted() {
    this.state.settings.muted = !this.state.settings.muted;
    this.commit("toggle-muted");
    return this.state.settings.muted;
  }

  reset() {
    this.state = freshSave();
    this.persistence.clear();
    this.commit("reset");
  }
}

// --- src/js/systems/BattleSystem.js ---
class BattleSystem {
  constructor(bus, store, random = Math.random) {
    this.bus = bus;
    this.store = store;
    this.random = random;
    this.timers = new TimerRegistry();
    this.qte = new QTESystem(bus, this.timers, random);
    this.dualQte = new DualQTESystem(bus, this.timers, random);
    this.state = null;
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
    this.bus.on("qte:finished", (result) => this.resolveQte(result));
    this.bus.on("qte:slot-success", ({ slot, enemyId }) => {
      if (this.state?.active && this.state.phase === "qte" && this.state.isDualQte) {
        this.handleDualQteSlotSuccess(enemyId || slot);
      }
    });
  }

  hasEquipEffect(effectType) {
    const snapshot = this.store.snapshot();
    const equipment = snapshot.equipment || {};
    for (const itemId of Object.values(equipment)) {
      if (!itemId) continue;
      const item = EQUIPMENT_ITEMS[itemId];
      if (item?.effect?.type === effectType) {
        return item.effect;
      }
    }
    return null;
  }

  start(stageId) {
    const stage = STAGES.find((item) => item.id === Number(stageId));
    const profile = this.store.snapshot();
    if (!stage || profile.profile.level < stage.requiredLevel) {
      this.bus.emit("toast", { message: "等級尚未達到這一章的挑戰條件。", tone: "danger" });
      return false;
    }

    this.stopClocks();
    const stats = profile.playerStats;
    const hasDualHandSkill = Boolean(profile.profile?.skills?.dualHand > 0);

    const enemies = stage.enemies
      ? stage.enemies.map((e) => ({ id: e.id, name: e.name, hp: e.hp, maxHp: e.maxHp, alive: true }))
      : [{ id: "main", name: stage.final ? "白金小樂" : "小樂", hp: stage.enemyHp, maxHp: stage.enemyHp, alive: true }];

    const totalEnemyHp = enemies.reduce((sum, e) => sum + e.hp, 0);
    const totalEnemyMaxHp = enemies.reduce((sum, e) => sum + e.maxHp, 0);

    this.state = {
      active: true,
      stage,
      phase: "countdown",
      round: 0,
      playerHp: stats.maxHp,
      playerMaxHp: stats.maxHp,
      playerMp: stats.maxMp,
      playerMaxMp: stats.maxMp,
      playerDamage: stats.damage,
      hasDualHandSkill,
      enemies,
      targetEnemyId: enemies[0].id,
      enemyHp: totalEnemyHp,
      enemyMaxHp: totalEnemyMaxHp,
      selectedHand: "rock",
      selectedHands: { left: "rock", right: "rock" },
      opponentHand: null,
      enemyWinningEmoji: null,
      countdown: stage.roundSeconds || BATTLE_RULES.roundSeconds,
      reactionRemaining: 0,
      morphUsed: false,
      isEnemyFrozen: false,
      isPaused: false,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(
      stage.final ? I18n.t("dialogue.introFinal") : I18n.t("dialogue.introNormal"),
      I18n.t("dialogue.speakerKohaku")
    );
    this.scheduleRound();
    return true;
  }

  togglePause() {
    if (!this.state?.active || this.state.phase === "ended") return;
    if (this.state.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  pause() {
    if (!this.state?.active || this.state.phase === "ended" || this.state.isPaused) return;
    this.state.isPaused = true;
    if (this.state.phase === "countdown") {
      this.countdownRemainingMs = Math.max(0, (this.countdownDeadline || 0) - performance.now());
      if (this.countdownId !== null) {
        this.timers.clearInterval(this.countdownId);
        this.countdownId = null;
      }
    } else if (this.state.phase === "reaction") {
      this.reactionRemainingMs = Math.max(0, (this.reactionDeadline || 0) - performance.now());
      this.clearReactionClocks();
    } else if (this.state.phase === "qte") {
      if (this.state.isDualQte) {
        this.dualQte.pause();
      } else {
        this.qte.pause();
      }
    }
    this.emitState();
  }

  resume() {
    if (!this.state?.active || this.state.phase === "ended" || !this.state.isPaused) return;
    this.state.isPaused = false;
    if (this.state.phase === "countdown") {
      const remainingMs = this.countdownRemainingMs ?? 1000;
      this.countdownDeadline = performance.now() + remainingMs;
      this.countdownId = this.timers.interval(() => {
        const remaining = Math.max(0, this.countdownDeadline - performance.now());
        const currentCount = Math.ceil(remaining / 1000);
        this.state.countdown = currentCount;

        if (currentCount === 3 && this.state.lastChant !== 3) {
          this.state.lastChant = 3;
          const chant = I18n.t("dialogue.chant3");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 3, word: chant });
        } else if (currentCount === 2 && this.state.lastChant !== 2) {
          this.state.lastChant = 2;
          const chant = I18n.t("dialogue.chant2");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 2, word: chant });
        } else if (currentCount === 1 && this.state.lastChant !== 1) {
          this.state.lastChant = 1;
          const chant = I18n.t("dialogue.chant1");
          this.say(chant, I18n.t("dialogue.speakerKohaku"));
          this.bus.emit("battle:countdown-beat", { count: 1, word: chant });
        }

        this.emitState();
        if (remaining <= 0) this.revealHands();
      }, 80);
    } else if (this.state.phase === "reaction") {
      const remainingMs = this.reactionRemainingMs ?? 500;
      this.reactionDeadline = performance.now() + remainingMs;
      this.reactionTickId = this.timers.interval(() => {
        this.state.reactionRemaining = Math.max(0, (this.reactionDeadline - performance.now()) / 1000);
        this.emitState();
      }, 40);
      this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), remainingMs);
    } else if (this.state.phase === "qte") {
      if (this.state.isDualQte) {
        this.dualQte.resume();
      } else {
        this.qte.resume();
      }
    }
    this.emitState();
  }

  selectTarget(enemyId) {
    if (!this.state?.active) return false;
    const target = this.state.enemies.find((e) => e.id === enemyId && e.alive);
    if (!target) return false;
    this.state.targetEnemyId = target.id;
    this.emitState();
    this.bus.emit("sound", { name: "select" });
    return true;
  }

  snapshot() {
    return this.state ? structuredClone(this.state) : null;
  }

  emitState() {
    this.bus.emit("battle:state", this.snapshot());
  }

  say(text, speaker = null) {
    this.bus.emit("dialogue", { speaker: speaker || I18n.t("dialogue.speakerKohaku"), text });
  }

  scheduleRound() {
    if (!this.state?.active) return;
    const roundSeconds = this.state.stage.roundSeconds || BATTLE_RULES.roundSeconds;
    this.state.round += 1;
    this.state.phase = "countdown";
    this.state.opponentHand = null;
    this.state.enemyWinningEmoji = null;
    this.state.countdown = roundSeconds;
    this.state.reactionRemaining = 0;
    this.state.morphUsed = false;
    this.state.lastChant = null;
    this.state.isPaused = false;
    this.countdownDeadline = performance.now() + roundSeconds * 1000;
    this.emitState();

    this.countdownId = this.timers.interval(() => {
      const remaining = Math.max(0, this.countdownDeadline - performance.now());
      const currentCount = Math.ceil(remaining / 1000);
      this.state.countdown = currentCount;

      if (currentCount === 3 && this.state.lastChant !== 3) {
        this.state.lastChant = 3;
        const chant = I18n.t("dialogue.chant3");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 3, word: chant });
      } else if (currentCount === 2 && this.state.lastChant !== 2) {
        this.state.lastChant = 2;
        const chant = I18n.t("dialogue.chant2");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 2, word: chant });
      } else if (currentCount === 1 && this.state.lastChant !== 1) {
        this.state.lastChant = 1;
        const chant = I18n.t("dialogue.chant1");
        this.say(chant, I18n.t("dialogue.speakerKohaku"));
        this.bus.emit("battle:countdown-beat", { count: 1, word: chant });
      }

      this.emitState();
      if (remaining <= 0) this.revealHands();
    }, 80);
  }

  selectHand(handId, slot = null) {
    if (!this.state?.active || this.state.phase !== "countdown" || !HANDS[handId]) return;
    if (slot === "left") {
      this.state.selectedHands.left = handId;
      this.state.selectedHand = handId;
    } else if (slot === "right") {
      this.state.selectedHands.right = handId;
    } else {
      this.state.selectedHand = handId;
      this.state.selectedHands.left = handId;
      if (!this.state.hasDualHandSkill) {
        this.state.selectedHands.right = handId;
      }
    }
    this.emitState();
    this.bus.emit("sound", { name: "select" });
  }

  revealHands() {
    if (!this.state?.active || this.state.phase !== "countdown") return;
    if (this.countdownId !== null) {
      this.timers.clearInterval(this.countdownId);
      this.countdownId = null;
    }
    this.state.phase = "reaction";

    const isDualStage = Boolean(this.state.stage?.dualEnemy && this.state.enemies?.length > 1);
    const aliveEnemies = this.state.enemies.filter((e) => e.alive);

    if (isDualStage && aliveEnemies.length >= 2) {
      const leftHand = getRandomHand(this.random);
      const rightHand = getRandomHand(this.random);
      this.state.opponentHands = { left: leftHand, right: rightHand };
      this.state.opponentHand = leftHand;

      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, leftHand);
        const rightResult = compareHands(this.state.selectedHands.right, rightHand);
        if (leftResult === "loss" || rightResult === "loss") {
          this.state.enemyWinningEmoji = leftResult === "loss" ? HANDS[leftHand].glyph : HANDS[rightHand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      } else {
        const leftResult = compareHands(this.state.selectedHand, leftHand);
        const rightResult = compareHands(this.state.selectedHand, rightHand);
        if (leftResult === "loss" || rightResult === "loss") {
          this.state.enemyWinningEmoji = leftResult === "loss" ? HANDS[leftHand].glyph : HANDS[rightHand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      }
    } else {
      const hand = getRandomHand(this.random);
      this.state.opponentHand = hand;
      this.state.opponentHands = { main: hand };
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, hand);
        const rightResult = compareHands(this.state.selectedHands.right, hand);
        // Only if BOTH hands lose does Kohaku win and show winning emoji
        if (leftResult === "loss" && rightResult === "loss") {
          this.state.enemyWinningEmoji = HANDS[hand].glyph;
        } else {
          this.state.enemyWinningEmoji = null;
        }
      } else {
        const rpsResult = compareHands(this.state.selectedHand, hand);
        this.state.enemyWinningEmoji = rpsResult === "loss" ? HANDS[hand].glyph : null;
      }
    }

    let reactionWindowMs = this.state.stage?.reactionWindowMs ?? BATTLE_RULES.reactionWindowMs;
    if (this.state.isEnemyFrozen) {
      reactionWindowMs += 500;
      this.state.isEnemyFrozen = false;
    }
    this.state.reactionRemaining = reactionWindowMs / 1000;

    this.reactionDeadline = performance.now() + reactionWindowMs;
    this.emitState();
    this.bus.emit("sound", { name: "reveal" });

    this.reactionTickId = this.timers.interval(() => {
      this.state.reactionRemaining = Math.max(0, (this.reactionDeadline - performance.now()) / 1000);
      this.emitState();
    }, 40);
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), reactionWindowMs);
  }

  useMorph() {
    if (!this.state?.active || this.state.phase !== "reaction") {
      return { ok: false, message: "變拳只能在看見小樂出拳後的反應時間內使用。" };
    }
    const morphDiscount = this.hasEquipEffect("morph_discount")?.morphDiscount || 0;
    const morphCost = Math.max(10, BATTLE_RULES.morphCost - morphDiscount);

    if (this.state.playerMp < morphCost) {
      return { ok: false, message: "MP 不足，無法使用變拳。" };
    }
    this.clearReactionClocks();
    this.state.playerMp -= morphCost;

    if (this.state.opponentHands?.left && this.state.opponentHands?.right) {
      if (this.state.hasDualHandSkill) {
        this.state.selectedHands.left = getCounterHand(this.state.opponentHands.left);
        this.state.selectedHands.right = getCounterHand(this.state.opponentHands.right);
        this.state.selectedHand = this.state.selectedHands.left;
      } else {
        const targetEnemy = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive);
        const targetOpponentHand = targetEnemy?.id === "right" ? this.state.opponentHands.right : this.state.opponentHands.left;
        this.state.selectedHand = getCounterHand(targetOpponentHand);
        this.state.selectedHands.left = this.state.selectedHand;
        this.state.selectedHands.right = this.state.selectedHand;
      }
    } else {
      const counter = getCounterHand(this.state.opponentHand);
      this.state.selectedHand = counter;
      this.state.selectedHands.left = counter;
      this.state.selectedHands.right = counter;
    }

    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.reactionRemaining = 0;
    this.emitState();
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say(I18n.t("dialogue.morphReaction"), I18n.t("dialogue.speakerKohaku"));
    this.reactionTimeoutId = this.timers.timeout(() => this.resolveRound(), 320);
    return { ok: true };
  }

  resolveDraw() {
    if (!this.state?.active) return;
    this.state.phase = "reaction";
    this.state.selectedHand = "rock";
    this.state.selectedHands = { left: "rock", right: "rock" };
    this.state.opponentHand = "rock";
    this.resolveRound();
  }

  resolveRound() {
    if (!this.state?.active || this.state.phase !== "reaction") return;
    this.clearReactionClocks();

    const isDualStage = Boolean(this.state.stage?.dualEnemy && this.state.enemies?.length > 1);
    const aliveEnemies = this.state.enemies.filter((e) => e.alive);

    if (isDualStage && aliveEnemies.length >= 2) {
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, this.state.opponentHands.left);
        const rightResult = compareHands(this.state.selectedHands.right, this.state.opponentHands.right);

        if (leftResult === "loss" && rightResult === "loss") {
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startDualQte();
          return;
        }

        if (leftResult === "loss") {
          if (rightResult === "win") {
            const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
            if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
          }
          this.state.targetEnemyId = "left";
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte("left");
          return;
        }

        if (rightResult === "loss") {
          if (leftResult === "win") {
            const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
            if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
          }
          this.state.targetEnemyId = "right";
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte("right");
          return;
        }

        // No losses on either side
        let anyWin = false;
        if (leftResult === "win") {
          const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
          if (leftEnemy) {
            anyWin = true;
            this.applyDamageToEnemy(leftEnemy, null, false);
          }
        }
        if (rightResult === "win") {
          const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
          if (rightEnemy) {
            anyWin = true;
            this.applyDamageToEnemy(rightEnemy, null, false);
          }
        }

        if (anyWin) {
          this.finishRound("win", this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！");
          return;
        }

        this.resolveMomoDraw();
        return;
      }

      // Single hand vs dual enemy
      const evalResult = evaluateDualRps(
        this.state.selectedHand,
        this.state.opponentHands.left,
        this.state.opponentHands.right
      );

      if (evalResult.isDualLoss) {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startDualQte();
        return;
      }

      if (evalResult.isSingleLoss) {
        const lostEnemyId = evalResult.losses[0];
        const wonEnemyId = evalResult.wins[0];
        if (wonEnemyId) {
          const wonEnemy = this.state.enemies.find((e) => e.id === wonEnemyId && e.alive);
          if (wonEnemy) {
            this.applyDamageToEnemy(wonEnemy, null, false);
          }
        }
        this.state.targetEnemyId = lostEnemyId;
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte(lostEnemyId);
        return;
      }

      // No losses: check wins
      let anyWin = false;
      evalResult.wins.forEach((wonEnemyId) => {
        const wonEnemy = this.state.enemies.find((e) => e.id === wonEnemyId && e.alive);
        if (wonEnemy) {
          anyWin = true;
          this.applyDamageToEnemy(wonEnemy, null, false);
        }
      });

      if (anyWin) {
        this.finishRound("win", this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！");
        return;
      }

      this.resolveMomoDraw();
      return;
    }

    if (this.state.hasDualHandSkill) {
      const leftResult = compareHands(this.state.selectedHands.left, this.state.opponentHand);
      const rightResult = compareHands(this.state.selectedHands.right, this.state.opponentHand);

      if (leftResult === "loss" && rightResult === "loss") {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte();
        return;
      }

      const bothWin = leftResult === "win" && rightResult === "win";
      const singleWin = leftResult === "win" || rightResult === "win";

      if (bothWin) {
        const doubleDamage = this.state.playerDamage * 2;
        const suffix = this.state.morphUsed ? "雙手變拳齊出，造成雙倍壓制傷害！" : "雙手同時獲勝，造成雙倍壓制傷害！";
        this.damageEnemy(suffix, false, doubleDamage);
        return;
      }

      if (singleWin) {
        const suffix = this.state.morphUsed ? "變拳奏效，成功壓制！" : "漂亮地壓過了小樂的手勢！";
        this.damageEnemy(suffix, false);
        return;
      }

      this.resolveMomoDraw();
      return;
    }

    const result = compareHands(this.state.selectedHand, this.state.opponentHand);
    if (result === "loss") {
      this.bus.emit("battle:effect", { type: "player-rps-loss" });
      this.bus.emit("sound", { name: "punch" });
      this.startQte();
      return;
    }
    if (result === "win") {
      const suffix = this.state.morphUsed ? "變拳奏效，這一手由你拿下！" : "漂亮地壓過了小樂的手勢！";
      this.damageEnemy(suffix);
      return;
    }

    this.resolveMomoDraw();
  }

  resolveMomoDraw() {
    const profile = this.store.snapshot().profile;
    const momoLvl = profile.skills?.momo || 0;
    if (momoLvl > 0) {
      const procChance = momoLvl * 0.10;
      if (this.random() < procChance) {
        const aliveEnemies = this.state.enemies.filter((e) => e.alive);
        if (aliveEnemies.length > 0) {
          const target = aliveEnemies[Math.floor(this.random() * aliveEnemies.length)];
          const dodgeRate = this.state.stage?.momoDodgeRate || 0;
          const isDodged = this.random() < dodgeRate;
          if (isDodged) {
            this.bus.emit("battle:effect", {
              type: "enemy-dodge",
              targetId: target.id,
              skill: "momo"
            });
            this.bus.emit("sound", { name: "danger" });
            this.finishRound("draw", "平手！你試圖偷摸" + target.name + "，但被她敏捷地閃開了！");
            return;
          }

          const shadowBonus = this.hasEquipEffect("shadow")?.momoDamageBonus || 0;
          const momoDamage = SKILLS.momo.damage + shadowBonus;
          target.hp = Math.max(0, target.hp - momoDamage);
          if (target.hp === 0) target.alive = false;
          this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
          this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
          this.bus.emit("battle:effect", {
            type: "enemy-hit",
            amount: momoDamage,
            targetId: target.id,
            skill: "momo"
          });
          this.bus.emit("sound", { name: "counterRub" });
          this.finishRound("draw", "平手！但你偷摸了" + target.name + "一下，造成 " + momoDamage + " 點傷害！");
          return;
        }
      }
    }

    this.finishRound("draw", "同樣的手勢在空中碰上了——平手。");
  }

  startQte(targetEnemyId = null) {
    this.state.phase = "qte";
    this.state.isDualQte = false;
    if (targetEnemyId) {
      this.state.targetEnemyId = targetEnemyId;
    }
    this.emitState();
    this.say(I18n.t("dialogue.qteSingleBreak"), I18n.t("dialogue.speakerKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.hasEquipEffect("qte_time")?.extraQteSeconds || 0;
    this.qte.start({
      length: this.state.stage.qteLength || BATTLE_RULES.qteLength,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? Infinity
    });
  }

  startDualQte() {
    this.state.phase = "qte";
    this.state.isDualQte = true;
    this.state.dualQteResolved = { left: false, right: false };
    this.emitState();
    this.say(I18n.t("dialogue.qteDualBreak"), I18n.t("dialogue.speakerPlatinumKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.hasEquipEffect("qte_time")?.extraQteSeconds || 0;
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1.5 * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? 1
    });
  }

  inputQte(directionId, slot = null) {
    if (this.state?.phase !== "qte") return false;
    if (this.state.isDualQte) {
      if (slot === "left") return this.dualQte.inputLeft(directionId);
      if (slot === "right") return this.dualQte.inputRight(directionId);
      if (this.dualQte.left.completed) return this.dualQte.inputRight(directionId);
      return this.dualQte.inputLeft(directionId);
    }
    return this.qte.input(directionId);
  }

  handleDualQteSlotSuccess(enemyId) {
    if (!this.state?.active || !this.state.isDualQte) return;
    if (this.state.dualQteResolved?.[enemyId]) return;
    this.state.dualQteResolved[enemyId] = true;

    const target = this.state.enemies.find((e) => e.id === enemyId && e.alive);
    if (target) {
      this.applyDamageToEnemy(target, null, true);
    }
  }

  resolveQte(result) {
    if (!this.state?.active || this.state.phase !== "qte") return;
    if (result.mode === "dual") {
      const leftSuccess = result.left?.success;
      const rightSuccess = result.right?.success;

      if (leftSuccess && !this.state.dualQteResolved?.left) {
        this.handleDualQteSlotSuccess("left");
      }
      if (rightSuccess && !this.state.dualQteResolved?.right) {
        this.handleDualQteSlotSuccess("right");
      }

      let failedCount = 0;
      if (!leftSuccess) failedCount += 1;
      if (!rightSuccess) failedCount += 1;

      if (failedCount > 0) {
        this.damagePlayerForDual(failedCount, "未能防住全部攻勢，受到反擊！");
      } else {
        const counter = getQteCounterNarration(this.state.selectedHand);
        this.state.selectedHand = counter.changedHand;
        this.finishRound("win", "雙重反制成功！完美化解了雙生攻勢！");
      }
      return;
    }

    if (result.success) {
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.damageEnemy(counter.text, true);
    } else {
      this.damagePlayer("節奏慢了一拍，小樂的攻勢命中了你。");
    }
  }

  applyDamageToEnemy(target, damageAmount = null, countered = false) {
    if (!target || !target.alive) return;
    let amount = damageAmount ?? this.state.playerDamage;
    if (countered) {
      amount += (this.hasEquipEffect("thunder")?.qteBonusDamage || 0);
    } else if (!damageAmount && this.hasEquipEffect("burst")) {
      amount = Math.round(amount * (this.hasEquipEffect("burst")?.winMultiplier || 1.5));
    }

    target.hp = Math.max(0, target.hp - amount);
    if (target.hp === 0) target.alive = false;
    this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
    this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;

    const freeze = this.hasEquipEffect("freeze");
    if (freeze && this.random() < (freeze.freezeChance || 0.3)) {
      this.state.isEnemyFrozen = true;
      this.bus.emit("battle:effect", { type: "freeze" });
    }

    this.bus.emit("battle:effect", {
      type: "enemy-hit",
      amount,
      targetId: target.id,
      countered
    });
    this.bus.emit("sound", { name: countered ? "counterRub" : "hit" });
  }

  dealEnemyDamage(amount) {
    this.damageEnemy("受到傷害", false, amount);
  }

  damageEnemy(message, countered = false, damageAmount = null) {
    const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);

    if (target) {
      this.applyDamageToEnemy(target, damageAmount, countered);
    }
    this.finishRound("win", message);
  }

  damagePlayer(message) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", "殘影閃避！你藉由幻影羽織化解了攻勢！");
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const shield = this.hasEquipEffect("shield");
    const armor = this.hasEquipEffect("armor_reduction");
    const reduction = (shield ? (shield.damageReduction || 0) : 0) + (armor ? (armor.damageReduction || 0) : 0);
    const totalDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflect = this.hasEquipEffect("reflect");
    if (reflect && reflect.reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflect.reflectDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflect.reflectDamage,
          targetId: target.id
        });
      }
    }

    this.finishRound("loss", message);
  }

  damagePlayerForDual(count, message) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", "殘影閃避！你藉由幻影羽織化解了雙生攻勢！");
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const shield = this.hasEquipEffect("shield");
    const armor = this.hasEquipEffect("armor_reduction");
    const reduction = (shield ? (shield.damageReduction || 0) : 0) + (armor ? (armor.damageReduction || 0) : 0);
    const singleDamage = Math.max(1, (BATTLE_RULES.enemyDamage * multiplier) - reduction);
    const totalDamage = singleDamage * count;

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflect = this.hasEquipEffect("reflect");
    if (reflect && reflect.reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflect.reflectDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflect.reflectDamage,
          targetId: target.id
        });
      }
    }

    this.finishRound("loss", message);
  }

  finishRound(result, message) {
    this.state.phase = "result";
    this.state.lastResult = result;

    // MP Regen effect check
    const mpRegen = this.hasEquipEffect("mp_regen")?.mpRegen || 0;
    if (mpRegen > 0) {
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + mpRegen);
    }

    // Burn effect check
    const burn = this.hasEquipEffect("burn");
    if (burn && this.state.enemyHp > 0) {
      const burnDamage = burn.burnDamage || 30;
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - burnDamage);
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
      }
      this.bus.emit("battle:effect", { type: "burn", amount: burnDamage, targetId: target?.id });
    }

    this.emitState();
    this.say(message, result === "loss" ? I18n.t("dialogue.speakerKohaku") : I18n.t("dialogue.speakerNarrator"));

    if (this.state.enemyHp <= 0) {
      this.timers.timeout(() => this.end(true), 1300);
      return;
    }
    if (this.state.playerHp <= 0) {
      this.timers.timeout(() => this.end(false), 1300);
      return;
    }
    this.timers.timeout(() => this.scheduleRound(), 1550);
  }

  useItem(itemId) {
    if (!this.state?.active || this.state.phase === "ended") {
      return { ok: false, message: "目前不在戰鬥中。" };
    }
    const item = ITEMS[itemId];
    if (!item) return { ok: false, message: "找不到這個道具。" };

    const valueKey = item.resource === "hp" ? "playerHp" : "playerMp";
    const maxKey = item.resource === "hp" ? "playerMaxHp" : "playerMaxMp";
    if (this.state[valueKey] >= this.state[maxKey]) {
      return { ok: false, message: item.resource.toUpperCase() + " 已經是滿的。" };
    }
    if (!this.store.consumeItem(itemId)) {
      return { ok: false, message: item.shortName + "已用完。" };
    }

    const potionBoost = this.hasEquipEffect("potion_boost")?.potionBoost || 0;
    const restoreAmount = item.restore + potionBoost;

    const before = this.state[valueKey];
    this.state[valueKey] = Math.min(this.state[maxKey], before + restoreAmount);
    const restored = this.state[valueKey] - before;
    this.emitState();
    this.bus.emit("battle:effect", { type: "item", resource: item.resource, amount: restored });
    this.bus.emit("sound", { name: "heal" });
    const locItem = I18n.getLocalizedItem(item);
    this.say(
      I18n.t("dialogue.itemUsed", {
        name: locItem.name,
        restored,
        resource: item.resource.toUpperCase()
      }),
      I18n.t("dialogue.speakerNarrator")
    );
    return { ok: true };
  }

  end(won) {
    if (!this.state?.active) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "ended";
    this.state.won = won;
    const reward = this.store.recordBattle(won, this.state.stage);
    this.emitState();
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      battle: this.snapshot()
    });
    this.bus.emit("sound", { name: won ? "victory" : "defeat" });
  }

  abandon() {
    if (!this.state) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "abandoned";
    this.emitState();
  }

  clearReactionClocks() {
    if (this.reactionTickId !== null) {
      this.timers.clearInterval(this.reactionTickId);
      this.reactionTickId = null;
    }
    if (this.reactionTimeoutId !== null) {
      this.timers.clearTimeout(this.reactionTimeoutId);
      this.reactionTimeoutId = null;
    }
  }

  stopClocks() {
    this.timers.clearAll();
    this.countdownId = null;
    this.reactionTickId = null;
    this.reactionTimeoutId = null;
  }
}

// --- src/js/systems/PostBattleSystem.js ---
class PostBattleSystem {
  constructor(bus, store, random = Math.random) {
    this.bus = bus;
    this.store = store;
    this.random = random;
    this.state = null;
  }

  open(result) {
    this.state = {
      ...result,
      scene: result.won ? "victory" : "defeat",
      appearance: result.won
        ? (result.stage.final ? ASSETS.final : ASSETS.default)
        : ASSETS.defeat,
      target: 0,
      tolerance: 0.13,
      strikeStartedAt: 0,
      strikeDuration: 1800,
      watermelon: {
        attempts: 0,
        maxAttempts: 3,
        successes: 0,
        lastCutSuccess: null,
        rewardXp: 0,
        levelsGained: 0
      }
    };
    this.emit();
    if (result.won) {
      this.say(I18n.t("dialogue.postBattleWin"));
    } else {
      this.say(I18n.t("dialogue.postBattleLoss"));
    }
  }

  requestSwimsuit() {
    if (!this.state?.won) return;
    this.store?.unlockSwimsuit?.();
    this.state.scene = "swimsuit";
    this.state.appearance = ASSETS.swimsuit;
    this.emit();
    this.say(I18n.t("dialogue.askSwimsuitLine"));
  }

  startWatermelon() {
    if (
      !this.state?.won ||
      !["swimsuit", "watermelonResult"].includes(this.state.scene) ||
      this.state.watermelon.attempts >= this.state.watermelon.maxAttempts
    ) return;
    const successes = this.state.watermelon.successes;
    this.state.tolerance = 0.13 * (0.5 ** successes);
    this.state.strikeDuration = 1800 / (1.25 ** successes);
    this.state.scene = "watermelonAim";
    this.state.appearance = ASSETS.swimsuit;
    const minTarget = this.state.tolerance + 0.05;
    const maxTarget = 1 - this.state.tolerance - 0.05;
    this.state.target = minTarget + this.random() * Math.max(0.1, maxTarget - minTarget);
    this.state.strikeStartedAt = performance.now();
    this.emit();
    const nextAttempt = this.state.watermelon.attempts + 1;
    this.say(I18n.t("dialogue.watermelonAttempt", { nextAttempt }));
  }

  strike() {
    if (this.state?.scene !== "watermelonAim") return;
    const marker = this.getMarkerPosition();
    const distance = Math.abs(marker - this.state.target);
    const tolerance = this.state.tolerance ?? (0.13 * (0.5 ** this.state.watermelon.successes));
    const success = distance <= tolerance;
    this.state.watermelon.attempts += 1;
    this.state.watermelon.lastCutSuccess = success;
    if (success) this.state.watermelon.successes += 1;
    this.state.appearance = success ? ASSETS.watermelon : ASSETS.swimsuit;

    if (this.state.watermelon.attempts >= this.state.watermelon.maxAttempts) {
      this.settleWatermelon();
      return;
    }

    this.state.scene = "watermelonResult";
    this.emit();
    this.bus.emit("sound", { name: success ? "victory" : "hurt" });
    const remaining = this.state.watermelon.maxAttempts - this.state.watermelon.attempts;
    if (success) {
      this.say(I18n.t("dialogue.watermelonHit", { remaining }));
    } else {
      this.say(I18n.t("dialogue.watermelonMiss", { remaining }));
    }
  }

  settleWatermelon() {
    const watermelon = this.state.watermelon;
    const earned = this.store.grantExperience(watermelon.successes * 100, "watermelon-reward");
    watermelon.rewardXp = earned.xp;
    watermelon.levelsGained = earned.levelsGained;
    this.state.scene = "watermelonComplete";
    this.emit();
    this.bus.emit("sound", { name: watermelon.successes ? "victory" : "defeat" });
    if (watermelon.successes > 0) {
      this.say(I18n.t("dialogue.watermelonAllHit", { successes: watermelon.successes }));
    } else {
      this.say(I18n.t("dialogue.watermelonDone"));
    }
  }

  getMarkerPosition(now = performance.now()) {
    if (!this.state?.strikeStartedAt) return 0;
    const elapsed = (now - this.state.strikeStartedAt) % this.state.strikeDuration;
    const normalized = elapsed / this.state.strikeDuration;
    return normalized <= 0.5 ? normalized * 2 : (1 - normalized) * 2;
  }

  say(text) {
    this.bus.emit("dialogue", { speaker: I18n.t("dialogue.speakerKohaku"), text });
  }

  emit() {
    this.bus.emit("postbattle:state", structuredClone(this.state));
  }
}

// --- src/js/systems/SoundSystem.js ---
const NOTES = {
  select: [[620, 0.04]],
  reveal: [[220, 0.05], [440, 0.08]],
  skill: [[520, 0.06], [780, 0.08], [1040, 0.1]],
  danger: [[180, 0.08], [150, 0.1]],
  hit: [[120, 0.05], [90, 0.08]],
  hurt: [[95, 0.09], [70, 0.13]],
  heal: [[440, 0.05], [660, 0.08], [880, 0.12]],
  victory: [[523, 0.08], [659, 0.08], [784, 0.16]],
  defeat: [[220, 0.12], [196, 0.14], [147, 0.22]]
};

class SoundSystem {
  constructor(store) {
    this.store = store;
    this.context = null;
  }

  play(name) {
    if (this.store.snapshot().settings.muted) return;
    try {
      this.context ||= new (window.AudioContext || window.webkitAudioContext)();
      if (this.context.state === "suspended") {
        this.context.resume();
      }

      if (name === "punch" || name === "fistPunch") {
        this.playFistPunch();
        return;
      }
      if (name === "counterRub" || name === "rub" || name === "counter") {
        this.playCounterRub();
        return;
      }

      if (!NOTES[name]) return;
      let cursor = this.context.currentTime;
      NOTES[name].forEach(([frequency, duration]) => {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = name === "danger" || name === "hurt" ? "sawtooth" : "sine";
        oscillator.frequency.setValueAtTime(frequency, cursor);
        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(0.065, cursor + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
        oscillator.connect(gain).connect(this.context.destination);
        oscillator.start(cursor);
        oscillator.stop(cursor + duration + 0.02);
        cursor += duration;
      });
    } catch {
      // Audio is optional and should never interrupt gameplay.
    }
  }

  playFistPunch() {
    const ctx = this.context;
    const now = ctx.currentTime;

    // Heavy punch body: rapid pitch drop sub-bass
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 0.15);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    // Fist smack impact noise burst
    const bufferSize = Math.floor(ctx.sampleRate * 0.07);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1100, now);
    noiseFilter.Q.setValueAtTime(1.6, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  playCounterRub() {
    const ctx = this.context;
    const now = ctx.currentTime;
    const duration = 0.44;

    // Soft friction noise for hands rubbing / petting
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.65;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.4, now);
    // Two gentle stroking motions: frequency sweeps
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.linearRampToValueAtTime(1950, now + 0.12);
    filter.frequency.linearRampToValueAtTime(1150, now + 0.22);
    filter.frequency.linearRampToValueAtTime(2150, now + 0.32);
    filter.frequency.linearRampToValueAtTime(950, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.18);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration + 0.02);

    // Warm gentle harmonic tone
    const tone = ctx.createOscillator();
    const toneGain = ctx.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(420, now);
    tone.frequency.linearRampToValueAtTime(560, now + 0.18);
    tone.frequency.linearRampToValueAtTime(460, now + duration);

    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.035, now + 0.12);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    tone.connect(toneGain).connect(ctx.destination);
    tone.start(now);
    tone.stop(now + duration + 0.02);
  }
}

// --- src/js/ui/DialogueController.js ---
class DialogueController {
  constructor(bus) {
    this.speakerElement = document.querySelector("#dialogue-speaker");
    this.textElement = document.querySelector("#dialogue-text");
    this.characterElements = [...document.querySelectorAll("[data-character-speaker]")];
    this.timer = null;
    this.stopTimer = null;
    this.fullText = "";
    this.bus = bus;
    this.bus.on("dialogue", (line) => this.show(line));
    document.querySelector("#battle-dialogue")?.addEventListener("click", () => this.reveal());
  }

  show({ speaker, text }) {
    window.clearInterval(this.timer);
    window.clearTimeout(this.stopTimer);
    this.fullText = text;
    this.speakerElement.textContent = speaker;
    this.textElement.textContent = "";
    const characters = Array.from(text);
    let index = 0;
    const isSpeaking = Boolean(speaker && !["旁白", "Narrator", "ナレーション"].includes(speaker));
    this.setSpeaking(isSpeaking);

    this.timer = window.setInterval(() => {
      index += 1;
      this.textElement.textContent = characters.slice(0, index).join("");
      if (index >= characters.length) {
        window.clearInterval(this.timer);
        this.timer = null;
        this.stopTimer = window.setTimeout(() => this.setSpeaking(false), 260);
      }
    }, 28);
  }

  reveal() {
    if (!this.timer) return;
    window.clearInterval(this.timer);
    this.timer = null;
    this.textElement.textContent = this.fullText;
    this.setSpeaking(false);
  }

  setSpeaking(active) {
    this.characterElements.forEach((element) => element.classList.toggle("is-speaking", active));
  }
}

// --- src/js/ui/AppView.js ---
const $ = (selector) => document.querySelector(selector);
const clampPercent = (value, max) => Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));

class AppView {
  constructor({ bus, store, battle, postBattle }) {
    this.bus = bus;
    this.store = store;
    this.battle = battle;
    this.postBattle = postBattle;
    this.currentScreen = "home";
    this.activeGrowthTab = "stats";
    this.activeGuideTab = "basics";
    this.activeShopTab = "potions";
    this.selectedGalleryItem = GALLERY_ITEMS[0].id;
    this.battleState = null;
    this.postState = null;
    this.qteState = null;
    this.qteKeyboard = new QTEKeyboardInput(directionFromKey);
    this.leftQteKeyboard = new QTEKeyboardInput(wasdDirectionFromKey);
    this.rightQteKeyboard = new QTEKeyboardInput(arrowDirectionFromKey);
    this.previousBattlePhase = null;
    this.toastTimer = null;
    this.damageTimer = null;
    this.watermelonFrame = 0;
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.app = $("#app");
    this.screenStack = $(".screen-stack");
    this.battleArena = $("#battle-arena");
    this.battleCharacterWrap = $("#battle-character-wrap");
    this.battleCharacterSingle = $("#battle-character-single");
    this.battleCharactersDual = $("#battle-characters-dual");
    this.battleCharacterLeftSlot = $("#battle-character-left-slot");
    this.battleCharacterRightSlot = $("#battle-character-right-slot");
    this.battleCharacter = $("#battle-character");
    this.battleCharacterLeft = $("#battle-character-left");
    this.battleCharacterRight = $("#battle-character-right");
    this.handSelectorSingle = $("#hand-selector-single");
    this.handSelectorDual = $("#hand-selector-dual");
    this.playerHandWrapSingle = $("#player-hand-wrap-single");
    this.playerHandWrapDual = $("#player-hand-wrap-dual");
    this.playerHud = $(".player-hud");
    this.roundOracle = $(".round-oracle");
    this.roundWarningEmoji = $("#round-warning-emoji");
    this.qteOverlay = $("#qte-overlay");
    this.resultOverlay = $("#result-overlay");
    this.toastElement = $("#toast");
    this.growthGrid = $("#growth-grid");
    this.skillsGrid = $("#skills-grid");
    this.galleryArtFrame = $("#gallery-art-frame");
    this.galleryImage = $("#gallery-image");
    this.galleryItemTitle = $("#gallery-item-title");
    this.galleryItemDesc = $("#gallery-item-desc");
    this.galleryVariantButtons = $("#gallery-variant-buttons");
    this.cheatModal = $("#cheat-modal");
    this.equipTooltip = $("#equip-tooltip");
    this.activeShopFilter = "all";
  }

  init() {
    this.renderI18n();
    const snapshot = this.store.snapshot();
    this.renderStore(snapshot);
    this.navigate("home");
  }

  renderI18n() {
    const locale = I18n.getLocale();
    document.documentElement.lang = LOCALES[locale]?.code || locale;
    document.title = I18n.t("meta.title");

    const headerLang = $("#header-lang");
    if (headerLang) {
      headerLang.textContent = LOCALES[locale]?.label || "English";
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const text = I18n.t(key);
      if (typeof text === "string") {
        if (text.includes("<br>") || text.includes("<b>") || text.includes("<em>") || text.includes("<kbd>")) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const pairs = el.dataset.i18nAttr.split(",");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":");
        if (attr && key) {
          el.setAttribute(attr.trim(), I18n.t(key.trim()));
        }
      });
    });
  }

  bindEvents() {
    document.addEventListener("click", (event) => this.handleClick(event));
    window.addEventListener("keydown", (event) => this.handleKeydown(event));
    window.addEventListener("keyup", (event) => this.handleKeyup(event));
    window.addEventListener("blur", () => {
      this.qteKeyboard.reset();
      this.leftQteKeyboard.reset();
      this.rightQteKeyboard.reset();
      this.renderHeldQteDirections();
    });

    const cheatForm = $("#cheat-form");
    if (cheatForm) {
      cheatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCheatSubmit();
      });
    }

    document.addEventListener("mousemove", (event) => {
      const tooltipTarget = event.target.closest("[data-equip-tooltip-id]");
      if (tooltipTarget) {
        this.showTooltip(tooltipTarget.dataset.equipTooltipId, event.clientX, event.clientY);
      } else {
        this.hideTooltip();
      }
    });

    this.bus.on("store:changed", ({ state }) => this.renderStore(state));
    this.bus.on("battle:state", (state) => this.renderBattle(state));
    this.bus.on("battle:countdown-beat", (beat) => this.handleCountdownBeat(beat));
    this.bus.on("battle:effect", (effect) => this.playBattleEffect(effect));
    this.bus.on("qte:update", (state) => this.renderQte(state));
    this.bus.on("qte:wrong", (data) => this.flashQteWrong(data?.slot));
    this.bus.on("postbattle:state", (state) => this.renderPostBattle(state));
    this.bus.on("toast", (toast) => this.showToast(toast.message, toast.tone));
  }

  handleCountdownBeat() {
    const playerHand = $("#player-hand-display");
    const enemyHand = $("#enemy-hand-display");
    const countdownBox = $("#round-countdown");

    [playerHand, enemyHand].forEach((el) => {
      if (!el) return;
      el.classList.remove("is-fist-shaking");
      void el.offsetWidth;
      el.classList.add("is-fist-shaking");
    });

    if (countdownBox) {
      countdownBox.classList.remove("is-beat");
      void countdownBox.offsetWidth;
      countdownBox.classList.add("is-beat");
    }
  }

  handleClick(event) {
    if (event.target.closest("#lang-toggle")) {
      I18n.cycleLocale();
      this.renderI18n();
      this.renderStore(this.store.snapshot());
      if (this.battleState?.active) {
        this.renderBattle(this.battleState);
      }
      this.bus.emit("sound", { name: "select" });
      return;
    }

    const navButton = event.target.closest("[data-nav]");
    if (navButton) {
      this.requestNavigation(navButton.dataset.nav);
      return;
    }

    const stageButton = event.target.closest("[data-stage]");
    if (stageButton) {
      this.startStage(Number(stageButton.dataset.stage));
      return;
    }

    const buyButton = event.target.closest("[data-buy]");
    if (buyButton) {
      const result = this.store.buyItem(buyButton.dataset.buy);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "heal" });
      return;
    }

    const shopTabBtn = event.target.closest("[data-shop-tab]");
    if (shopTabBtn) {
      this.activeShopTab = shopTabBtn.dataset.shopTab;
      document.querySelectorAll("[data-shop-tab]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.shopTab === this.activeShopTab);
      });
      const potionsGrid = $("#shop-potions-grid");
      const equipGrid = $("#shop-equipment-grid");
      if (potionsGrid) potionsGrid.hidden = this.activeShopTab !== "potions";
      if (equipGrid) equipGrid.hidden = this.activeShopTab !== "equipment";
      return;
    }

    const buyEquipBtn = event.target.closest("[data-buy-equip]");
    if (buyEquipBtn) {
      const result = this.store.buyEquipment(buyEquipBtn.dataset.buyEquip);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "heal" });
      return;
    }

    const bagItemBtn = event.target.closest("[data-equip-bag-item]");
    if (bagItemBtn) {
      const result = this.store.equipItem(bagItemBtn.dataset.equipBagItem);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "skill" });
      this.hideTooltip();
      return;
    }

    const shopEquipBtn = event.target.closest("[data-shop-equip]");
    if (shopEquipBtn) {
      const itemId = shopEquipBtn.dataset.shopEquip;
      const result = this.store.equipItem(itemId);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "skill" });
      this.hideTooltip();
      return;
    }

    const shopUnequipBtn = event.target.closest("[data-shop-unequip]");
    if (shopUnequipBtn) {
      const slotKey = shopUnequipBtn.dataset.shopUnequip;
      const result = this.store.unequipItem(slotKey);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "select" });
      this.hideTooltip();
      return;
    }

    if (event.target.closest("#btn-resume-battle")) {
      this.battle.resume();
      return;
    }

    if (event.target.closest("#btn-pause-abandon")) {
      this.battle.abandon();
      const pauseModal = $("#battle-pause-modal");
      if (pauseModal) {
        pauseModal.hidden = true;
        pauseModal.setAttribute("aria-hidden", "true");
      }
      this.requestNavigation("stages");
      return;
    }

    const slotBtn = event.target.closest("[data-slot]");
    if (slotBtn) {
      const slotKey = slotBtn.dataset.slot;
      const snapshot = this.store.snapshot();
      if (snapshot.equipment?.[slotKey]) {
        const result = this.store.unequipItem(slotKey);
        this.showToast(result.message, result.ok ? "success" : "danger");
        if (result.ok) this.bus.emit("sound", { name: "select" });
        this.hideTooltip();
      }
      return;
    }

    if (event.target.closest("#open-cheat-modal")) {
      this.openCheatModal();
      return;
    }

    if (event.target.closest("#close-cheat-modal") || event.target === this.cheatModal) {
      this.closeCheatModal();
      return;
    }

    if (event.target.closest("#cheat-unlock-stages-btn")) {
      const res = this.store.cheatUnlockAll();
      this.showToast(res.message, "success");
      this.populateCheatModal();
      return;
    }

    if (event.target.closest("#cheat-unlock-gallery-btn")) {
      const res = this.store.cheatUnlockGallery();
      this.showToast(res.message, "success");
      this.populateCheatModal();
      return;
    }

    if (event.target.closest("#cheat-max-all-btn")) {
      this.store.cheatSetValues({
        level: 99,
        xp: 0,
        skillPoints: 100,
        coins: 99999,
        hpPotion: 99,
        mpPotion: 99,
        skills: { momo: 10 }
      });
      this.showToast("已一鍵設置滿級、99999 星砂與 100 SP！", "success");
      this.populateCheatModal();
      return;
    }

    const growthTabBtn = event.target.closest("[data-growth-tab]");
    if (growthTabBtn) {
      this.activeGrowthTab = growthTabBtn.dataset.growthTab;
      document.querySelectorAll("[data-growth-tab]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.growthTab === this.activeGrowthTab);
      });
      if (this.growthGrid) this.growthGrid.hidden = this.activeGrowthTab !== "stats";
      if (this.skillsGrid) this.skillsGrid.hidden = this.activeGrowthTab !== "skills";
      return;
    }

    const shopFilterBtn = event.target.closest("[data-shop-filter], [data-shop-tab]");
    if (shopFilterBtn) {
      this.activeShopFilter = shopFilterBtn.dataset.shopFilter || shopFilterBtn.dataset.shopTab;
      document.querySelectorAll("[data-shop-filter], [data-shop-tab]").forEach((btn) => {
        const btnFilter = btn.dataset.shopFilter || btn.dataset.shopTab;
        btn.classList.toggle("is-active", btnFilter === this.activeShopFilter);
      });
      this.renderShop(this.store.snapshot());
      return;
    }

    const guideTabBtn = event.target.closest("[data-guide-tab]");
    if (guideTabBtn) {
      this.activeGuideTab = guideTabBtn.dataset.guideTab;
      document.querySelectorAll("[data-guide-tab]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.guideTab === this.activeGuideTab);
      });
      const basicsGrid = $("#guide-basics-grid");
      const bossGrid = $("#guide-boss-grid");
      if (basicsGrid) basicsGrid.hidden = this.activeGuideTab !== "basics";
      if (bossGrid) bossGrid.hidden = this.activeGuideTab !== "boss";
      if (this.activeGuideTab === "boss") {
        this.renderGuideBoss(this.store.snapshot());
      }
      return;
    }

    const allocateButton = event.target.closest("[data-allocate]");
    if (allocateButton) {
      const result = this.store.allocateStat(allocateButton.dataset.allocate);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "skill" });
      return;
    }

    const allocateSkillButton = event.target.closest("[data-allocate-skill]");
    if (allocateSkillButton) {
      const result = this.store.allocateSkill(allocateSkillButton.dataset.allocateSkill);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "skill" });
      return;
    }

    const galleryVariantBtn = event.target.closest("[data-gallery-variant]");
    if (galleryVariantBtn) {
      this.selectedGalleryItem = galleryVariantBtn.dataset.galleryVariant;
      this.renderGallery(this.store.snapshot());
      return;
    }

    const targetEnemyBtn = event.target.closest("[data-target-enemy]");
    if (targetEnemyBtn && this.battleState?.active) {
      this.battle.selectTarget(targetEnemyBtn.dataset.targetEnemy);
      return;
    }

    const dualHandButton = event.target.closest("[data-hand-slot][data-hand]");
    if (dualHandButton && this.battleState?.active) {
      this.battle.selectHand(dualHandButton.dataset.hand, dualHandButton.dataset.handSlot);
      return;
    }

    const handButton = event.target.closest("[data-hand]");
    if (handButton && this.battleState?.active) {
      this.battle.selectHand(handButton.dataset.hand);
      return;
    }

    const itemButton = event.target.closest("[data-item]");
    if (itemButton) {
      const result = this.battle.useItem(itemButton.dataset.item);
      if (!result.ok) this.showToast(result.message, "danger");
      return;
    }

    if (event.target.closest("[data-skill='morph']")) {
      const result = this.battle.useMorph();
      if (!result.ok) this.showToast(result.message, "danger");
      return;
    }

    const dualDirectionBtn = event.target.closest("[data-dual-slot][data-direction]");
    if (dualDirectionBtn) {
      this.battle.inputQte(dualDirectionBtn.dataset.direction, dualDirectionBtn.dataset.dualSlot);
      return;
    }

    const directionButton = event.target.closest("[data-direction]");
    if (directionButton) {
      this.qteKeyboard.reset();
      this.renderHeldQteDirections();
      this.battle.inputQte(directionButton.dataset.direction);
      return;
    }

    const postButton = event.target.closest("[data-post-action]");
    if (postButton) {
      this.handlePostAction(postButton.dataset.postAction);
      return;
    }

    if (event.target.closest("#watermelon-strike")) {
      this.postBattle.strike();
      return;
    }

    if (event.target.closest("#abandon-battle")) {
      this.requestNavigation("stages");
      return;
    }

    if (event.target.closest("#sound-toggle")) {
      const muted = this.store.toggleMuted();
      this.showToast(muted ? "音效已關閉。" : "音效已開啟。");
      return;
    }

    if (event.target.closest("#reset-save")) {
      const confirmed = window.confirm("要清除等級、星砂、道具與戰績，重新開始嗎？");
      if (confirmed) {
        this.store.reset();
        this.showToast("存檔已重置。");
      }
    }
  }

  handleKeydown(event) {
    const key = event.key.toLowerCase();
    const isPostActive = Boolean(this.postState) && this.resultOverlay?.classList.contains("is-active");

    if (isPostActive) {
      if (event.code === "Space" || key === " ") {
        event.preventDefault();
        if (this.postState.scene === "victory") {
          this.postBattle.requestSwimsuit();
          return;
        }
        if (this.postState.scene === "watermelonAim") {
          this.postBattle.strike();
          return;
        }
        if (["swimsuit", "watermelonResult"].includes(this.postState.scene)) {
          this.postBattle.startWatermelon();
          return;
        }
      }

      if (key === "q") {
        event.preventDefault();
        this.handlePostAction("home");
        return;
      }

      if (key === "e") {
        event.preventDefault();
        this.handlePostAction("rematch");
        return;
      }

      if (key === "c") {
        event.preventDefault();
        this.handlePostAction("stages");
        return;
      }
    }

    if (event.key === "Escape") {
      if (this.battleState?.active && this.battleState.phase !== "ended") {
        event.preventDefault();
        this.battle.togglePause();
        return;
      }
    }

    if (!this.battleState?.active || this.battleState.isPaused) return;
    if (this.battleState.phase === "qte") {
      if (this.qteState?.mode === "dual") {
        const leftExpected = this.qteState.left?.sequence[this.qteState.left?.index];
        const rightExpected = this.qteState.right?.sequence[this.qteState.right?.index];

        const leftInput = this.leftQteKeyboard.keyDown(event.key, leftExpected, event.repeat);
        if (leftInput.handled) {
          event.preventDefault();
          if (leftInput.direction) {
            const accepted = this.battle.inputQte(leftInput.direction, "left");
            if (!accepted) this.leftQteKeyboard.reset();
          }
          this.renderHeldQteDirections();
          return;
        }

        const rightInput = this.rightQteKeyboard.keyDown(event.key, rightExpected, event.repeat);
        if (rightInput.handled) {
          event.preventDefault();
          if (rightInput.direction) {
            const accepted = this.battle.inputQte(rightInput.direction, "right");
            if (!accepted) this.rightQteKeyboard.reset();
          }
          this.renderHeldQteDirections();
          return;
        }
        return;
      }

      // Single QTE mode
      const expected = this.qteState?.sequence[this.qteState.index];
      const input = this.qteKeyboard.keyDown(event.key, expected, event.repeat);
      if (input.handled) {
        event.preventDefault();
        if (input.direction) {
          const accepted = this.battle.inputQte(input.direction);
          if (!accepted) this.qteKeyboard.reset();
        }
        this.renderHeldQteDirections();
      }
      return;
    }

    if (this.battleState.phase === "countdown") {
      const isDualHands = Boolean(this.battleState.hasDualHandSkill);
      if (isDualHands) {
        const leftHandByKey = { "1": "rock", "2": "paper", "3": "scissors", "q": "rock", "w": "paper", "e": "scissors" };
        const rightHandByKey = {
          "7": "rock", "8": "paper", "9": "scissors",
          "j": "rock", "k": "paper", "l": "scissors"
        };
        if (leftHandByKey[key]) {
          this.battle.selectHand(leftHandByKey[key], "left");
        } else if (rightHandByKey[key]) {
          this.battle.selectHand(rightHandByKey[key], "right");
        } else if (["numpad7", "numpad1"].includes(event.code.toLowerCase())) {
          this.battle.selectHand("rock", "right");
        } else if (["numpad8", "numpad2"].includes(event.code.toLowerCase())) {
          this.battle.selectHand("paper", "right");
        } else if (["numpad9", "numpad3"].includes(event.code.toLowerCase())) {
          this.battle.selectHand("scissors", "right");
        }
      } else {
        const handByKey = { "1": "rock", "2": "paper", "3": "scissors" };
        if (handByKey[event.key]) this.battle.selectHand(handByKey[event.key]);
      }
    }

    if (["4", "h"].includes(key)) {
      const result = this.battle.useItem("hpPotion");
      if (!result.ok && this.battleState.phase !== "ended") {
        this.showToast(result.message, "danger");
      }
    } else if (["5", "m"].includes(key)) {
      const result = this.battle.useItem("mpPotion");
      if (!result.ok && this.battleState.phase !== "ended") {
        this.showToast(result.message, "danger");
      }
    } else if (key === "f") {
      if (this.battleState.phase === "reaction") {
        const result = this.battle.useMorph();
        if (!result.ok) this.showToast(result.message, "danger");
      }
    }
  }

  handleKeyup(event) {
    if (!this.qteState?.active) return;
    if (this.qteState?.mode === "dual") {
      const leftUp = this.leftQteKeyboard.keyUp(event.key);
      const rightUp = this.rightQteKeyboard.keyUp(event.key);
      if (leftUp || rightUp) {
        this.renderHeldQteDirections();
      }
    } else {
      if (this.qteKeyboard.keyUp(event.key)) {
        this.renderHeldQteDirections();
      }
    }
  }

  requestNavigation(screenName) {
    if (this.battleState?.active && screenName !== "battle") {
      const confirmed = window.confirm("現在撤退將不會得到星砂或經驗，確定離開嗎？");
      if (!confirmed) return;
      this.battle.abandon();
    }
    this.navigate(screenName);
  }

  navigate(screenName) {
    const next = $("#screen-" + screenName);
    if (!next) return;
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("is-active", "is-entering");
    });
    next.classList.add("is-active", "is-entering");
    this.currentScreen = screenName;
    this.app.dataset.screen = screenName;
    next.scrollTop = 0;
    if (screenName === "gallery") {
      this.renderGallery(this.store.snapshot());
    }
  }

  startStage(stageId) {
    if (!this.battle.start(stageId)) return;
    this.postState = null;
    this.resultOverlay.classList.remove("is-active");
    this.resultOverlay.setAttribute("aria-hidden", "true");
    this.navigate("battle");
  }

  renderStore(state) {
    $("#header-level").textContent = String(state.profile.level).padStart(2, "0");
    $("#header-coins").textContent = state.coins.toLocaleString("zh-TW");
    $("#header-xp").textContent = state.profile.xp + " / " + state.xpToNext;
    $("#header-xp-fill").style.width = clampPercent(state.profile.xp, state.xpToNext) + "%";
    $("#record-wins").textContent = state.records.wins;
    $("#record-losses").textContent = state.records.losses;
    $("#record-stage").textContent = state.records.bestStage ? I18n.getLocalizedStage(STAGES.find(s => s.id === state.records.bestStage) || { chapter: "第 " + state.records.bestStage + " 章" }).chapter : "—";
    $("#sound-toggle").textContent = state.settings.muted ? "×" : "♪";
    $("#sound-toggle").setAttribute("aria-label", state.settings.muted ? "開啟音效" : "關閉音效");
    this.renderStages(state);
    this.renderShop(state);
    this.renderGrowth(state);
    this.renderGallery(state);
    this.renderGuideBoss(state);
    this.renderEquipment(state);
    this.renderInventory(state);
  }

  renderStages(state) {
    const kanji = ["朱", "夕", "月", "鏡"];
    $("#stage-grid").innerHTML = STAGES.map((stage, index) => {
      const locStage = I18n.getLocalizedStage(stage);
      const locked = state.profile.level < stage.requiredLevel;
      const cleared = state.records.bestStage >= stage.id;
      const classes = [
        "stage-card",
        cleared ? "is-cleared" : "",
        stage.final ? "is-final" : ""
      ].filter(Boolean).join(" ");
      let status = I18n.t("ui.enterStage");
      if (locked) status = I18n.t("ui.stageNeedLevel", { level: stage.requiredLevel });
      else if (cleared) status = I18n.t("ui.stageCleared");
      return '<button type="button" class="' + classes + '" data-stage="' + stage.id +
        '" data-kanji="' + kanji[index] + '"' + (locked ? " disabled" : "") + '>' +
        '<span class="stage-chapter">' + locStage.chapter + "</span>" +
        "<h3>" + locStage.name + "</h3>" +
        "<p>" + locStage.subtitle + "</p>" +
        '<div class="stage-rule">' +
        '<span>' + (stage.final ? "2P" : I18n.t("dialogue.speakerKohaku")) + ' HP</span><b>' + stage.enemyHp.toLocaleString("zh-TW") + '</b>' +
        '<span>' + I18n.t("ui.level") + '</span><b>Lv. ' + stage.requiredLevel + '</b>' +
        '<span>' + I18n.t("ui.winReward") + '</span><b style="font-size:12px;color:var(--gold-bright);">+' + stage.xpWin + ' EXP / +' + stage.winCoins + ' ' + I18n.t("ui.coins") + '</b>' +
        '</div>' +
        '<span class="stage-status">' + status + "</span></button>";
    }).join("");
  }

  renderShop(state) {
    $("#shop-coins").textContent = state.coins.toLocaleString("zh-TW");
    const shopGrid = $("#shop-grid") || $("#shop-equipment-grid") || $("#shop-potions-grid");
    if (!shopGrid) return;

    const filter = this.activeShopFilter || "all";
    const getSlotLabel = (item) => {
      if (item.twoHanded) return I18n.t("ui.twoHandedBadge");
      const locSlot = I18n.getLocalizedEquipmentSlot(item.slotType);
      return locSlot?.label || "裝備";
    };

    const categories = [
      {
        id: "potions",
        title: I18n.t("ui.shopConsumablesHeading"),
        items: Object.values(ITEMS).map((item) => ({ ...item, isPotion: true }))
      },
      {
        id: "weapon",
        title: I18n.getLocalizedEquipmentSlot("mainHand")?.label || "主手武器",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "weapon")
      },
      {
        id: "offHand",
        title: I18n.getLocalizedEquipmentSlot("offHand")?.label || "副手武防",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "offHand" || item.id === "dagger_shadow")
      },
      {
        id: "head",
        title: I18n.getLocalizedEquipmentSlot("head")?.label || "頭盔",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "head")
      },
      {
        id: "shoulders",
        title: I18n.getLocalizedEquipmentSlot("shoulders")?.label || "肩甲",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "shoulders")
      },
      {
        id: "chest",
        title: I18n.getLocalizedEquipmentSlot("chest")?.label || "胸甲",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "chest")
      },
      {
        id: "belt",
        title: I18n.getLocalizedEquipmentSlot("belt")?.label || "腰帶",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "belt")
      },
      {
        id: "boots",
        title: I18n.getLocalizedEquipmentSlot("boots")?.label || "鞋子",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "boots")
      },
      {
        id: "ring",
        title: I18n.getLocalizedEquipmentSlot("ring1")?.label || "戒指",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "ring")
      },
      {
        id: "earring",
        title: I18n.getLocalizedEquipmentSlot("earring1")?.label || "耳環",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "earring")
      },
      {
        id: "badge",
        title: I18n.getLocalizedEquipmentSlot("badge")?.label || "胸章",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "badge")
      }
    ];

    let html = "";
    categories.forEach((cat) => {
      if (filter !== "all" && filter !== cat.id && filter !== (cat.id === "potions" ? "potion" : cat.id)) return;
      if (filter === "all") {
        html += '<div class="shop-section-heading"><span>✦ ' + cat.title + '</span></div>';
      }

      cat.items.forEach((item) => {
        if (item.isPotion) {
          const locItem = I18n.getLocalizedItem(item);
          html += '<article class="shop-equip-card shop-card-potion">' +
            '<div class="item-orb ' + item.color + '"><i>' + item.glyph + "</i></div>" +
            '<div class="shop-equip-info">' +
            '<div class="shop-equip-header">' +
            '<span class="shop-slot-badge is-potion">【' + I18n.t("ui.shopConsumablesHeading") + '】</span>' +
            '<span class="shop-equip-name">' + locItem.name + '</span>' +
            '</div>' +
            '<div class="shop-equip-desc">' + locItem.description + '</div>' +
            '<div class="shop-equip-action">' +
            '<span class="shop-owned">' + I18n.t("ui.itemOwned") + ' <b>' + state.inventory[item.id] + '</b></span>' +
            '<button type="button" class="button-primary" data-buy="' + item.id + '"' +
            (state.coins < item.price ? " disabled" : "") + '>✦ ' + item.price + ' ' + I18n.t("ui.btnBuy") + '</button>' +
            '</div>' +
            '</div></article>';
        } else {
          const locItem = I18n.getLocalizedEquipment(item);
          const statParts = [];
          if (item.stats.damage) statParts.push(I18n.t("ui.statDamage") + " +" + item.stats.damage);
          if (item.stats.hp) statParts.push(I18n.t("ui.statHp") + " +" + item.stats.hp);
          if (item.stats.mp) statParts.push(I18n.t("ui.statMp") + " +" + item.stats.mp);
          const statsText = statParts.join(" / ");
          const slotLabel = getSlotLabel(item);

          const equippedSlot = Object.keys(state.equipment || {}).find((s) => state.equipment[s] === item.id);
          const isEquipped = Boolean(equippedSlot);
          const isOwnedInBag = (state.inventoryEquipment || []).includes(item.id);

          let actionHtml = "";
          if (isEquipped) {
            actionHtml = '<span class="shop-status-badge is-equipped">' + I18n.t("ui.equippedBadge") + '</span>' +
              '<button type="button" class="button-secondary shop-btn-unequip" data-shop-unequip="' + equippedSlot + '">' + I18n.t("ui.bagUnequipBtn") + '</button>';
          } else if (isOwnedInBag) {
            actionHtml = '<span class="shop-status-badge is-owned">' + I18n.t("ui.ownedInBag") + '</span>' +
              '<button type="button" class="button-primary shop-btn-equip" data-shop-equip="' + item.id + '">' + I18n.t("ui.equipNow") + '</button>';
          } else {
            actionHtml = '<span style="font-size:12px;color:var(--gold);">✦ ' + item.price + ' ' + I18n.t("ui.coins") + '</span>' +
              '<button type="button" class="button-primary" data-buy-equip="' + item.id + '"' +
              (state.coins < item.price ? " disabled" : "") + '>' + I18n.t("ui.equipBuy") + '</button>';
          }

          html += '<article class="shop-equip-card rarity-' + item.rarity + '" data-equip-tooltip-id="' + item.id + '">' +
            '<div class="shop-equip-icon">' + item.icon + '</div>' +
            '<div class="shop-equip-info">' +
            '<div class="shop-equip-header">' +
            '<span class="shop-slot-badge">【' + slotLabel + '】</span>' +
            '<span class="shop-equip-name">' + locItem.name + '</span>' +
            '</div>' +
            '<div class="shop-equip-stats">' + statsText + '</div>' +
            '<div class="shop-equip-desc">' + locItem.description + '</div>' +
            '<div class="shop-equip-action">' + actionHtml + '</div>' +
            '</div></article>';
        }
      });
    });

    shopGrid.innerHTML = html;
  }

  renderGrowth(state) {
    $("#skill-points").textContent = state.profile.skillPoints;
    $("#growth-level").textContent = "Lv. " + state.profile.level;
    $("#growth-xp-text").textContent = state.profile.xp + " / " + state.xpToNext + " EXP";
    $("#growth-xp-fill").style.width = clampPercent(state.profile.xp, state.xpToNext) + "%";
    const cards = [
      {
        id: "damage",
        label: I18n.t("ui.statDamage"),
        code: "DAMAGE",
        glyph: "刃",
        value: state.playerStats.damage,
        unit: I18n.t("ui.unitDamage"),
        text: I18n.t("ui.statAllocDmgDesc")
      },
      {
        id: "hp",
        label: I18n.t("ui.statHp"),
        code: "VITALITY",
        glyph: "命",
        value: state.playerStats.maxHp,
        unit: I18n.t("ui.unitMaxHp"),
        text: I18n.t("ui.statAllocHpDesc")
      },
      {
        id: "mp",
        label: I18n.t("ui.statMp"),
        code: "ARCANA",
        glyph: "魔",
        value: state.playerStats.maxMp,
        unit: I18n.t("ui.unitMaxMp"),
        text: I18n.t("ui.statAllocMpDesc")
      }
    ];
    if (this.growthGrid) {
      this.growthGrid.innerHTML = cards.map((card) => {
        const disabled = state.profile.skillPoints <= 0 ? " disabled" : "";
        return '<article class="growth-card" data-glyph="' + card.glyph + '"><small>' + card.code +
          "</small><h3>" + card.label + '</h3><div class="stat-value"><b>' + card.value +
          "</b><span>" + card.unit + "</span></div><p>" + card.text +
          '</p><button type="button" class="button-primary" data-allocate="' + card.id + '"' +
          disabled + ">" + I18n.t("ui.spInvestBtn") + "</button></article>";
      }).join("");
    }

    if (this.skillsGrid) {
      this.skillsGrid.innerHTML = Object.values(SKILLS).map((skill) => {
        const locSkill = I18n.getLocalizedSkill(skill);
        const unlocked = state.profile.level >= skill.unlockLevel;
        const currentLvl = (state.profile.skills && state.profile.skills[skill.id]) || 0;
        const isMax = currentLvl >= skill.maxLevel;
        const canAfford = state.profile.skillPoints >= skill.costPerLevel;
        const currentChance = unlocked && currentLvl > 0 ? (currentLvl * 10) : 0;
        const nextChance = (currentLvl + 1) * 10;

        let statValueHtml = "";
        if (skill.id === "momo") {
          statValueHtml = '<div class="stat-value"><b>' + currentChance + "%</b><span>" + I18n.t("ui.momoProcRate") + "</span></div>";
        } else if (skill.id === "dualHand") {
          statValueHtml = '<div class="stat-value"><b>' + (currentLvl > 0 ? I18n.t("ui.dualHandUnlocked") : I18n.t("ui.dualHandLocked")) + "</b><span>" + I18n.t("ui.dualHandDescSub") + "</span></div>";
        }

        let buttonText = I18n.t("ui.btnUpgradeSkill") + " (" + skill.costPerLevel + " SP)";
        let disabled = false;
        if (!unlocked) {
          buttonText = I18n.t("ui.skillLocked", { level: skill.unlockLevel });
          disabled = true;
        } else if (isMax) {
          buttonText = I18n.t("ui.skillMaxLevel");
          disabled = true;
        } else if (!canAfford) {
          buttonText = I18n.t("ui.skillCostSp", { sp: skill.costPerLevel }) + " (" + I18n.t("ui.insufficientCoins") + ")";
          disabled = true;
        }

        const nextTip = (!isMax && unlocked && skill.id === "momo")
          ? '<br><small style="color:var(--azure-bright);display:block;margin-top:4px;">' + I18n.t("ui.nextLevelRate", { chance: nextChance }) + '</small>'
          : "";

        return '<article class="growth-card" data-glyph="' + locSkill.glyph + '">' +
          "<small>" + skill.code + "</small>" +
          "<h3>" + locSkill.name + ' <small style="font-size:12px;color:var(--gold);margin-left:6px;">Lv. ' + currentLvl + " / " + skill.maxLevel + "</small></h3>" +
          statValueHtml +
          "<p>" + locSkill.description + nextTip + "</p>" +
          '<button type="button" class="button-primary" data-allocate-skill="' + skill.id + '"' +
          (disabled ? " disabled" : "") + ">" + buttonText + "</button></article>";
      }).join("");
    }
  }

  renderGallery(state) {
    const unlocked = Boolean(state.records.unlockedSwimsuit || state.records.bestStage >= 1);
    const currentItem = GALLERY_ITEMS.find((item) => item.id === this.selectedGalleryItem) || GALLERY_ITEMS[0];
    const locCurrentItem = I18n.getLocalizedGalleryItem(currentItem);

    if (this.galleryArtFrame) {
      this.galleryArtFrame.classList.toggle("is-locked", !unlocked);
    }
    if (this.galleryImage) {
      this.galleryImage.src = currentItem.src;
    }
    if (this.galleryItemTitle) {
      this.galleryItemTitle.textContent = locCurrentItem.name;
    }
    if (this.galleryItemDesc) {
      this.galleryItemDesc.textContent = locCurrentItem.description;
    }
    if (this.galleryVariantButtons) {
      this.galleryVariantButtons.innerHTML = GALLERY_ITEMS.map((item) => {
        const locItem = I18n.getLocalizedGalleryItem(item);
        const active = item.id === currentItem.id ? " is-active" : "";
        return '<button type="button" class="gallery-variant-btn' + active + '" data-gallery-variant="' + item.id + '">' + locItem.variantName + "</button>";
      }).join("");
    }
  }

  renderGuideBoss(state) {
    const bossGrid = $("#guide-boss-grid");
    if (!bossGrid) return;
    const kanji = ["朱", "夕", "月", "鏡"];
    bossGrid.innerHTML = STAGES.map((stage, index) => {
      const locStage = I18n.getLocalizedStage(stage);
      const cleared = (state.records.bestStage || 0) >= stage.id;
      return '<article class="guide-card' + (cleared ? " is-cleared" : " is-locked") + '">' +
        '<span class="guide-number">' + kanji[index] + "</span>" +
        '<small style="color:var(--gold);font-size:10px;letter-spacing:0.2em;display:block;margin-bottom:4px;">' + locStage.chapter + "</small>" +
        "<h3>" + (cleared ? locStage.name : "？？？") + "</h3>" +
        (cleared
          ? '<div style="margin:8px 0 10px;font-size:13px;color:var(--gold-bright);font-weight:600;">' + I18n.t("ui.ruleFocus") + locStage.bossRuleSummary + "</div>" +
            '<p style="min-height:80px;color:var(--paper-dim);font-size:12px;line-height:1.7;">' + locStage.bossRuleDetail + "</p>" +
            '<div class="guide-reward" style="margin-top:12px;font-size:13px;">' + I18n.t("ui.winReward") + '+' + stage.xpWin + " EXP / +" + stage.winCoins + " " + I18n.t("ui.coins") + "</div>"
          : '<div style="min-height:140px;display:grid;place-content:center;text-align:center;color:var(--paper-dim);">' +
            '<span style="font-size:28px;margin-bottom:6px;">🔒</span>' +
            '<b style="color:var(--paper-dim);font-size:13px;">' + I18n.t("ui.notCleared") + "</b>" +
            '<small style="margin-top:4px;font-size:11px;color:var(--paper-dim);">' + I18n.t("ui.unlockRuleAfterClear") + "</small>" +
            "</div>"
        ) +
        "</article>";
    }).join("");
  }

  renderInventory(state) {
    $("#battle-hp-potions").textContent = state.inventory.hpPotion;
    $("#battle-mp-potions").textContent = state.inventory.mpPotion;
    document.querySelectorAll("[data-item='hpPotion']").forEach((button) => {
      button.disabled = state.inventory.hpPotion <= 0;
    });
    document.querySelectorAll("[data-item='mpPotion']").forEach((button) => {
      button.disabled = state.inventory.mpPotion <= 0;
    });
  }

  renderEquipment(state) {
    if (!state) return;
    const equip = state.equipment || {};
    const bag = state.inventoryEquipment || [];

    if ($("#equipment-coins")) $("#equipment-coins").textContent = state.coins.toLocaleString("zh-TW");
    if ($("#bag-count")) $("#bag-count").textContent = `${bag.length} ` + I18n.t("ui.menuEquipment");

    if ($("#equip-hp-potion-count")) $("#equip-hp-potion-count").textContent = `${state.inventory?.hpPotion || 0}`;
    if ($("#equip-mp-potion-count")) $("#equip-mp-potion-count").textContent = `${state.inventory?.mpPotion || 0}`;

    // Render paperdoll slots (both growth screen and shop screen)
    const isMainTwoHanded = Boolean(equip.mainHand && EQUIPMENT_ITEMS[equip.mainHand]?.twoHanded);

    Object.keys(EQUIPMENT_SLOTS).forEach((slotKey) => {
      const itemId = equip[slotKey];
      const item = itemId ? EQUIPMENT_ITEMS[itemId] : null;
      const locSlot = I18n.getLocalizedEquipmentSlot(slotKey);

      document.querySelectorAll(`[data-slot="${slotKey}"]`).forEach((slotBtn) => {
        const box = slotBtn.querySelector(".slot-box");
        const tag = slotBtn.querySelector(".slot-tag");
        if (tag && locSlot) tag.textContent = locSlot.label;
        if (!box) return;

        if (slotKey === "offHand" && isMainTwoHanded) {
          slotBtn.classList.add("is-two-handed-locked");
          box.innerHTML = '<span class="slot-placeholder" style="font-size:12px;color:var(--gold);">' + I18n.t("ui.twoHandedOccupied") + '</span>';
          slotBtn.removeAttribute("data-equip-tooltip-id");
          return;
        } else {
          slotBtn.classList.remove("is-two-handed-locked");
        }

        if (item) {
          const locItem = I18n.getLocalizedEquipment(item);
          slotBtn.setAttribute("data-equip-tooltip-id", item.id);
          box.innerHTML = `
            <span class="slot-item-icon">${item.icon}</span>
            <span class="slot-item-name rarity-${item.rarity}">${locItem.name}</span>
          `;
        } else {
          slotBtn.removeAttribute("data-equip-tooltip-id");
          box.innerHTML = `<span class="slot-placeholder">${EQUIPMENT_SLOTS[slotKey].icon}</span>`;
        }
      });
    });

    // Render stats summary for both panels
    const statsHtml = `
      <span>${I18n.t("ui.statHp")}<b>${state.playerStats.maxHp}</b></span>
      <span>${I18n.t("ui.statMp")}<b>${state.playerStats.maxMp}</b></span>
      <span>${I18n.t("ui.statDamage")}<b>${state.playerStats.damage}</b></span>
    `;
    if ($("#paperdoll-stats-summary")) $("#paperdoll-stats-summary").innerHTML = statsHtml;
    if ($("#shop-paperdoll-stats-summary")) $("#shop-paperdoll-stats-summary").innerHTML = statsHtml;

    // Render Bag
    const bagGrid = $("#equipment-bag-grid");
    if (bagGrid) {
      if (bag.length === 0) {
        bagGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 10px;color:var(--paper-dim);">' + I18n.t("ui.bagEmpty") + '</div>';
      } else {
        bagGrid.innerHTML = bag.map((itemId) => {
          const item = EQUIPMENT_ITEMS[itemId];
          if (!item) return "";
          const locItem = I18n.getLocalizedEquipment(item);
          const locSlot = I18n.getLocalizedEquipmentSlot(item.slotType);
          return `
            <button type="button" class="bag-item-card rarity-${item.rarity}" data-equip-bag-item="${item.id}" data-equip-tooltip-id="${item.id}">
              <span class="bag-item-icon">${item.icon}</span>
              <div class="bag-item-info">
                <span class="bag-item-name">${locItem.name}</span>
                <span class="bag-item-type">${item.twoHanded ? I18n.t("ui.twoHandedBadge") : (locSlot?.label || item.slotType)}</span>
              </div>
            </button>
          `;
        }).join("");
      }
    }
  }

  openCheatModal() {
    this.populateCheatModal();
    if (this.cheatModal) {
      this.cheatModal.hidden = false;
      this.cheatModal.setAttribute("aria-hidden", "false");
    }
  }

  closeCheatModal() {
    if (this.cheatModal) {
      this.cheatModal.hidden = true;
      this.cheatModal.setAttribute("aria-hidden", "true");
    }
  }

  populateCheatModal() {
    const snap = this.store.snapshot();
    const p = snap.profile;
    if ($("#cheat-level")) $("#cheat-level").value = p.level;
    if ($("#cheat-xp")) $("#cheat-xp").value = p.xp;
    if ($("#cheat-sp")) $("#cheat-sp").value = p.skillPoints;
    if ($("#cheat-coins")) $("#cheat-coins").value = snap.coins;
    if ($("#cheat-alloc-hp")) $("#cheat-alloc-hp").value = p.allocations?.hp || 0;
    if ($("#cheat-alloc-mp")) $("#cheat-alloc-mp").value = p.allocations?.mp || 0;
    if ($("#cheat-alloc-dmg")) $("#cheat-alloc-dmg").value = p.allocations?.damage || 0;
    if ($("#cheat-skill-momo")) $("#cheat-skill-momo").value = p.skills?.momo || 0;
    if ($("#cheat-skill-dualHand")) $("#cheat-skill-dualHand").value = p.skills?.dualHand || 0;
    if ($("#cheat-hp-pot")) $("#cheat-hp-pot").value = snap.inventory?.hpPotion || 0;
    if ($("#cheat-mp-pot")) $("#cheat-mp-pot").value = snap.inventory?.mpPotion || 0;
  }

  handleCheatSubmit() {
    const updates = {
      level: Number($("#cheat-level")?.value) || 1,
      xp: Number($("#cheat-xp")?.value) || 0,
      skillPoints: Number($("#cheat-sp")?.value) || 0,
      coins: Number($("#cheat-coins")?.value) || 0,
      hpPotion: Number($("#cheat-hp-pot")?.value) || 0,
      mpPotion: Number($("#cheat-mp-pot")?.value) || 0,
      allocations: {
        hp: Number($("#cheat-alloc-hp")?.value) || 0,
        mp: Number($("#cheat-alloc-mp")?.value) || 0,
        damage: Number($("#cheat-alloc-dmg")?.value) || 0
      },
      skills: {
        momo: Number($("#cheat-skill-momo")?.value) || 0,
        dualHand: Number($("#cheat-skill-dualHand")?.value) || 0
      }
    };
    this.store.cheatSetValues(updates);
    this.showToast("作弊數值已成功套用！", "success");
    this.closeCheatModal();
  }

  showTooltip(itemId, x, y) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item || !this.equipTooltip) return;
    const locItem = I18n.getLocalizedEquipment(item);

    const statParts = [];
    if (item.stats?.damage) statParts.push(`${I18n.t("ui.statDamage")} +${item.stats.damage}`);
    if (item.stats?.hp) statParts.push(`${I18n.t("ui.statHp")} +${item.stats.hp}`);
    if (item.stats?.mp) statParts.push(`${I18n.t("ui.statMp")} +${item.stats.mp}`);
    const statsHtml = statParts.length > 0 ? `<div class="tooltip-stats">${statParts.join(" / ")}</div>` : "";

    this.equipTooltip.innerHTML = `
      <div class="tooltip-header rarity-${item.rarity}">
        <span class="tooltip-icon">${item.icon}</span>
        <div>
          <div class="tooltip-title">${locItem.name}</div>
          <small style="font-size:10px;text-transform:uppercase;">${item.rarity} ${item.twoHanded ? I18n.t("ui.twoHandedBadge") : ""}</small>
        </div>
      </div>
      ${statsHtml}
      <div class="tooltip-desc">${locItem.description}</div>
    `;

    const posX = Math.min(window.innerWidth - 270, x + 15);
    const posY = Math.min(window.innerHeight - 200, y + 15);
    this.equipTooltip.style.left = posX + "px";
    this.equipTooltip.style.top = posY + "px";
    this.equipTooltip.hidden = false;
  }

  hideTooltip() {
    if (this.equipTooltip) this.equipTooltip.hidden = true;
  }

  renderBattle(state) {
    if (!state) return;
    const justRevealed = this.previousBattlePhase === "countdown" && state.phase === "reaction";
    this.previousBattlePhase = state.phase;
    this.battleState = state;
    const locStage = I18n.getLocalizedStage(state.stage);
    $("#battle-chapter").textContent = locStage.chapter;
    $("#battle-stage-name").textContent = locStage.name;
    $("#round-number").textContent = state.round;
    $("#player-hp-text").textContent = state.playerHp + " / " + state.playerMaxHp;
    $("#player-hp-fill").style.width = clampPercent(state.playerHp, state.playerMaxHp) + "%";
    $("#player-mp-text").textContent = state.playerMp + " / " + state.playerMaxMp;
    $("#player-mp-fill").style.width = clampPercent(state.playerMp, state.playerMaxMp) + "%";
    $("#battle-player-level").textContent = "LEVEL " + String(this.store.snapshot().profile.level).padStart(2, "0");

    // Single vs Dual Enemy Boss HUD
    const singleHud = $("#enemy-hud-single");
    const dualHud = $("#enemy-hud-dual");
    if (state.stage.dualEnemy && state.enemies?.length >= 2) {
      if (singleHud) singleHud.hidden = true;
      if (dualHud) dualHud.hidden = false;
      const left = state.enemies.find((e) => e.id === "left");
      const right = state.enemies.find((e) => e.id === "right");
      if (left) {
        $("#enemy-left-name").textContent = I18n.t("dialogue.speakerPlatinumKohaku") + "・" + I18n.t("directions.left");
        $("#enemy-left-hp-text").textContent = left.hp.toLocaleString("zh-TW") + " / " + left.maxHp.toLocaleString("zh-TW");
        $("#enemy-left-hp-fill").style.width = clampPercent(left.hp, left.maxHp) + "%";
        const leftCard = document.querySelector("[data-target-enemy='left']");
        if (leftCard) {
          leftCard.classList.toggle("is-selected", state.targetEnemyId === "left" && left.alive);
          leftCard.classList.toggle("is-dead", !left.alive);
        }
      }
      if (right) {
        $("#enemy-right-name").textContent = I18n.t("dialogue.speakerPlatinumKohaku") + "・" + I18n.t("directions.right");
        $("#enemy-right-hp-text").textContent = right.hp.toLocaleString("zh-TW") + " / " + right.maxHp.toLocaleString("zh-TW");
        $("#enemy-right-hp-fill").style.width = clampPercent(right.hp, right.maxHp) + "%";
        const rightCard = document.querySelector("[data-target-enemy='right']");
        if (rightCard) {
          rightCard.classList.toggle("is-selected", state.targetEnemyId === "right" && right.alive);
          rightCard.classList.toggle("is-dead", !right.alive);
        }
      }
    } else {
      if (singleHud) singleHud.hidden = false;
      if (dualHud) dualHud.hidden = true;
      $("#enemy-name").textContent = state.stage.final ? I18n.t("dialogue.speakerPlatinumKohaku") : I18n.t("dialogue.speakerKohaku");
      $("#enemy-hp-text").textContent = state.enemyHp.toLocaleString("zh-TW") + " / " + state.enemyMaxHp.toLocaleString("zh-TW");
      $("#enemy-hp-fill").style.width = clampPercent(state.enemyHp, state.enemyMaxHp) + "%";
    }

    // 畫面中央放大警告 Emoji
    const warningEmoji = $("#round-warning-emoji");
    if (warningEmoji) {
      if (state.phase === "reaction" && state.enemyWinningEmoji) {
        warningEmoji.textContent = state.enemyWinningEmoji;
        warningEmoji.classList.add("is-active");
      } else {
        warningEmoji.classList.remove("is-active");
        warningEmoji.textContent = "";
      }
    }

    if (this.battleCharacterWrap) {
      this.battleCharacterWrap.classList.toggle("is-dual-stage", Boolean(state.stage.dualEnemy));
    }

    if (state.stage.dualEnemy && state.enemies?.length >= 2) {
      if (this.battleCharacterSingle) this.battleCharacterSingle.hidden = true;
      if (this.battleCharactersDual) this.battleCharactersDual.hidden = false;
      const left = state.enemies.find((e) => e.id === "left");
      const right = state.enemies.find((e) => e.id === "right");
      if (this.battleCharacterLeftSlot && left) this.battleCharacterLeftSlot.classList.toggle("is-dead", !left.alive);
      if (this.battleCharacterRightSlot && right) this.battleCharacterRightSlot.classList.toggle("is-dead", !right.alive);
    } else {
      if (this.battleCharacterSingle) this.battleCharacterSingle.hidden = false;
      if (this.battleCharactersDual) this.battleCharactersDual.hidden = true;
      if (this.battleCharacter.getAttribute("src") !== state.appearance) {
        this.battleCharacter.setAttribute("src", state.appearance);
      }
    }

    const isPlayerDual = Boolean(state.hasDualHandSkill);
    if (isPlayerDual) {
      if (this.playerHandWrapSingle) this.playerHandWrapSingle.hidden = true;
      if (this.playerHandWrapDual) this.playerHandWrapDual.hidden = false;
      const leftPlayerHand = I18n.getLocalizedHand(state.selectedHands?.left || "rock");
      const rightPlayerHand = I18n.getLocalizedHand(state.selectedHands?.right || "rock");
      $("#player-left-hand-display").textContent = leftPlayerHand.glyph;
      $("#player-left-hand-label").textContent = leftPlayerHand.label;
      $("#player-right-hand-display").textContent = rightPlayerHand.glyph;
      $("#player-right-hand-label").textContent = rightPlayerHand.label;
    } else {
      if (this.playerHandWrapSingle) this.playerHandWrapSingle.hidden = false;
      if (this.playerHandWrapDual) this.playerHandWrapDual.hidden = true;
      const playerHand = I18n.getLocalizedHand(state.selectedHand);
      $("#player-hand-display").textContent = playerHand.glyph;
      $("#player-hand-label").textContent = playerHand.label;
    }

    const singleHandWrap = $("#enemy-hand-wrap-single");
    const dualHandWrap = $("#enemy-hand-wrap-dual");
    const isEnemyDual = Boolean(state.stage?.dualEnemy && state.enemies?.length > 1);

    if (isEnemyDual && state.opponentHands?.left && state.opponentHands?.right) {
      if (singleHandWrap) singleHandWrap.hidden = true;
      if (dualHandWrap) dualHandWrap.hidden = false;

      const leftHand = I18n.getLocalizedHand(state.opponentHands.left);
      const rightHand = I18n.getLocalizedHand(state.opponentHands.right);

      if (state.phase === "countdown") {
        $("#enemy-left-hand-display").textContent = "✊";
        $("#enemy-left-hand-label").textContent = state.countdown <= 3 ? I18n.t("ui.preparing") : I18n.t("ui.unrevealed");
        $("#enemy-right-hand-display").textContent = "✊";
        $("#enemy-right-hand-label").textContent = state.countdown <= 3 ? I18n.t("ui.preparing") : I18n.t("ui.unrevealed");
      } else {
        $("#enemy-left-hand-display").textContent = leftHand ? leftHand.glyph : "？";
        $("#enemy-left-hand-label").textContent = leftHand ? leftHand.label : I18n.t("ui.unrevealed");
        $("#enemy-right-hand-display").textContent = rightHand ? rightHand.glyph : "？";
        $("#enemy-right-hand-label").textContent = rightHand ? rightHand.label : I18n.t("ui.unrevealed");
      }
    } else {
      if (singleHandWrap) singleHandWrap.hidden = false;
      if (dualHandWrap) dualHandWrap.hidden = true;

      const opponent = I18n.getLocalizedHand(state.opponentHand);
      if (state.phase === "countdown") {
        $("#enemy-hand-display").textContent = "✊";
        $("#enemy-hand-label").textContent = state.countdown <= 3 ? I18n.t("ui.preparing") : I18n.t("ui.unrevealed");
      } else {
        $("#enemy-hand-display").textContent = opponent ? opponent.glyph : "？";
        $("#enemy-hand-label").textContent = opponent ? opponent.label : I18n.t("ui.unrevealed");
      }
    }

    if (isPlayerDual) {
      if (this.handSelectorSingle) this.handSelectorSingle.hidden = true;
      if (this.handSelectorDual) this.handSelectorDual.hidden = false;
      document.querySelectorAll("[data-hand-slot='left'][data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHands?.left);
        button.disabled = state.phase !== "countdown";
      });
      document.querySelectorAll("[data-hand-slot='right'][data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHands?.right);
        button.disabled = state.phase !== "countdown";
      });
    } else {
      if (this.handSelectorSingle) this.handSelectorSingle.hidden = false;
      if (this.handSelectorDual) this.handSelectorDual.hidden = true;
      document.querySelectorAll("#hand-selector-single [data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHand);
        button.disabled = state.phase !== "countdown";
      });
    }

    const pauseModal = $("#battle-pause-modal");
    if (pauseModal) {
      pauseModal.hidden = !state.isPaused;
      pauseModal.setAttribute("aria-hidden", String(!state.isPaused));
    }

    const morph = $("#morph-skill");
    const morphReady = state.phase === "reaction" && state.playerMp >= 25;
    morph.disabled = !morphReady;
    morph.classList.toggle("is-ready", morphReady);

    const countdownValue = $("#countdown-value");
    const countdownCaption = $("#countdown-caption");
    if (state.phase === "countdown") {
      countdownValue.textContent = state.countdown;
      countdownCaption.textContent = I18n.t("ui.countdownCaption");
    } else if (state.phase === "reaction") {
      countdownValue.textContent = state.reactionRemaining.toFixed(1);
      countdownCaption.textContent = I18n.t("ui.morphCaption");
    } else if (state.phase === "qte") {
      countdownValue.textContent = "!";
      countdownCaption.textContent = I18n.t("ui.qteCaption");
    } else {
      countdownValue.textContent = state.lastResult === "win" ? I18n.t("ui.battleWon") : state.lastResult === "loss" ? I18n.t("ui.battleLost") : I18n.t("ui.battleDraw");
      countdownCaption.textContent = I18n.t("ui.settleCaption");
    }

    if (justRevealed) {
      this.roundOracle.classList.remove("is-revealing");
      void this.roundOracle.offsetWidth;
      this.roundOracle.classList.add("is-revealing");
    }
  }

  renderQte(state) {
    const wasActive = this.qteState?.active;
    this.qteState = state;
    if (!state?.active) {
      this.qteKeyboard.reset();
      this.leftQteKeyboard.reset();
      this.rightQteKeyboard.reset();
      this.renderHeldQteDirections();
      this.qteOverlay.classList.remove("is-active");
      this.qteOverlay.setAttribute("aria-hidden", "true");
      return;
    }
    if (!wasActive) {
      this.qteKeyboard.reset();
      this.leftQteKeyboard.reset();
      this.rightQteKeyboard.reset();
    }
    this.qteOverlay.classList.add("is-active");
    this.qteOverlay.setAttribute("aria-hidden", "false");

    const singlePanel = $("#qte-panel-single");
    const dualPanel = $("#qte-panel-dual");

    if (state.mode === "dual") {
      if (singlePanel) singlePanel.hidden = true;
      if (dualPanel) dualPanel.hidden = false;

      const wasdMap = {
        up: "W",
        down: "S",
        left: "A",
        right: "D",
        upLeft: "WA",
        upRight: "WD",
        downLeft: "SA",
        downRight: "SD"
      };
      const arrowMap = {
        up: "↑",
        down: "↓",
        left: "←",
        right: "→",
        upLeft: "↖",
        upRight: "↗",
        downLeft: "↙",
        downRight: "↘"
      };

      // Render Left Slot
      const leftSeq = $("#dual-qte-sequence-left");
      if (leftSeq && state.left?.sequence) {
        leftSeq.innerHTML = state.left.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.left.index ? " is-done" : index === state.left.index ? " is-current" : "";
          const hint = wasdMap[id] || "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' +
            (direction?.glyph || "") +
            (hint ? '<small class="qte-arrow-key-hint">' + hint + "</small>" : "") +
            "</span>";
        }).join("");
      }

      // Render Right Slot
      const rightSeq = $("#dual-qte-sequence-right");
      if (rightSeq && state.right?.sequence) {
        rightSeq.innerHTML = state.right.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.right.index ? " is-done" : index === state.right.index ? " is-current" : "";
          const hint = arrowMap[id] || "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' +
            (direction?.glyph || "") +
            (hint ? '<small class="qte-arrow-key-hint">' + hint + "</small>" : "") +
            "</span>";
        }).join("");
      }

      // Left Hint & Status
      const leftSlot = $("#dual-qte-slot-left");
      const leftStatus = $("#dual-qte-left-status");
      const leftHint = $("#dual-qte-hint-left");
      if (state.left?.completed) {
        if (leftSlot) {
          leftSlot.classList.toggle("is-completed", Boolean(state.left.success));
          leftSlot.classList.toggle("is-failed", !state.left.success);
        }
        if (leftStatus) leftStatus.textContent = state.left.success ? "✓ 反制成功" : "× 判定失敗";
        if (leftHint) leftHint.textContent = state.left.success ? "已完成" : "未命中";
      } else {
        if (leftSlot) {
          leftSlot.classList.remove("is-completed", "is-failed");
        }
        if (leftStatus) leftStatus.textContent = "進行中 (" + state.left.index + "/" + state.left.sequence.length + ")";
        this.renderSlotHint(leftHint, state.left.sequence[state.left.index], "WASD");
      }

      // Right Hint & Status
      const rightSlot = $("#dual-qte-slot-right");
      const rightStatus = $("#dual-qte-right-status");
      const rightHint = $("#dual-qte-hint-right");
      if (state.right?.completed) {
        if (rightSlot) {
          rightSlot.classList.toggle("is-completed", Boolean(state.right.success));
          rightSlot.classList.toggle("is-failed", !state.right.success);
        }
        if (rightStatus) rightStatus.textContent = state.right.success ? "✓ 反制成功" : "× 判定失敗";
        if (rightHint) rightHint.textContent = state.right.success ? "已完成" : "未命中";
      } else {
        if (rightSlot) {
          rightSlot.classList.remove("is-completed", "is-failed");
        }
        if (rightStatus) rightStatus.textContent = "進行中 (" + state.right.index + "/" + state.right.sequence.length + ")";
        this.renderSlotHint(rightHint, state.right.sequence[state.right.index], "ARROW");
      }

      $("#dual-qte-timer-fill").style.width = Math.max(0, Math.min(100, state.progress * 100)) + "%";
      $("#dual-qte-time").textContent = (state.remainingMs / 1000).toFixed(2);
      this.renderHeldQteDirections();
      return;
    }

    // Single QTE mode
    if (singlePanel) singlePanel.hidden = false;
    if (dualPanel) dualPanel.hidden = true;

    $("#qte-sequence").innerHTML = state.sequence.map((id, index) => {
      const direction = DIRECTIONS.find((item) => item.id === id);
      const status = index < state.index ? " is-done" : index === state.index ? " is-current" : "";
      return '<span class="qte-arrow' + status + '" aria-label="' + direction.label + '">' + direction.glyph + "</span>";
    }).join("");
    $("#qte-timer-fill").style.width = Math.max(0, Math.min(100, state.progress * 100)) + "%";
    $("#qte-time").textContent = (state.remainingMs / 1000).toFixed(2);
    this.renderQteInputHint(state);
    this.renderHeldQteDirections();
  }

  renderSlotHint(hintEl, expected, mode) {
    if (!hintEl || !expected) return;
    const chord = getDirectionChord(expected);
    if (chord) {
      const glyphs = chord.map((id) => DIRECTIONS.find((item) => item.id === id)?.glyph);
      hintEl.innerHTML = '斜向 <b>' + glyphs[0] + "</b><i>＋</i><b>" + glyphs[1] + "</b>";
      hintEl.classList.add("is-chord");
    } else {
      const direction = DIRECTIONS.find((item) => item.id === expected);
      const keyTip = mode === "WASD" ? (direction?.keys?.find((k) => ["w", "a", "s", "d", "q", "e", "z", "c"].includes(k))?.toUpperCase() || "") : "";
      hintEl.innerHTML = '輸入 <b>' + (direction?.glyph || "—") + "</b>" + (keyTip ? " (" + keyTip + ")" : "");
      hintEl.classList.remove("is-chord");
    }
  }

  renderQteInputHint(state) {
    const expected = state.sequence[state.index];
    const chord = getDirectionChord(expected);
    const hint = $("#qte-input-hint");
    if (!hint) return;
    if (chord) {
      const glyphs = chord.map((id) => DIRECTIONS.find((item) => item.id === id)?.glyph);
      hint.innerHTML = '斜向合成 <b>' + glyphs[0] + "</b><i>＋</i><b>" + glyphs[1] + "</b>";
      hint.classList.add("is-chord");
    } else {
      const direction = DIRECTIONS.find((item) => item.id === expected);
      hint.innerHTML = '單方向輸入 <b>' + (direction?.glyph || "—") + "</b>";
      hint.classList.remove("is-chord");
    }
  }

  renderHeldQteDirections() {
    if (this.qteState?.mode === "dual") {
      const leftHeld = new Set(this.leftQteKeyboard.snapshot());
      const rightHeld = new Set(this.rightQteKeyboard.snapshot());
      document.querySelectorAll("#touch-pad-left [data-direction]").forEach((btn) => {
        btn.classList.toggle("is-held", leftHeld.has(btn.dataset.direction));
      });
      document.querySelectorAll("#touch-pad-right [data-direction]").forEach((btn) => {
        btn.classList.toggle("is-held", rightHeld.has(btn.dataset.direction));
      });
    } else {
      const held = new Set(this.qteKeyboard.snapshot());
      document.querySelectorAll("#qte-pad [data-direction]").forEach((button) => {
        button.classList.toggle("is-held", held.has(button.dataset.direction));
      });
    }
  }

  flashQteWrong(slot = null) {
    let sequence = $("#qte-sequence");
    if (slot === "left") sequence = $("#dual-qte-sequence-left");
    if (slot === "right") sequence = $("#dual-qte-sequence-right");

    if (sequence) {
      sequence.classList.remove("is-wrong");
      void sequence.offsetWidth;
      sequence.classList.add("is-wrong");
    }
    this.bus.emit("sound", { name: "danger" });
  }

  playBattleEffect(effect) {
    if (effect.type === "enemy-hit") {
      window.clearTimeout(this.damageTimer);
      $("#damage-number").textContent = "−" + effect.amount;
      const enemyElements = [];
      if (effect.targetId === "left" && this.battleCharacterLeftSlot) {
        enemyElements.push(this.battleCharacterLeftSlot);
      } else if (effect.targetId === "right" && this.battleCharacterRightSlot) {
        enemyElements.push(this.battleCharacterRightSlot);
      } else if (this.battleCharactersDual && !this.battleCharactersDual.hidden) {
        enemyElements.push(this.battleCharacterLeftSlot, this.battleCharacterRightSlot);
      } else {
        enemyElements.push(this.battleCharacterSingle || this.battleCharacter);
      }
      enemyElements.forEach((el) => {
        if (!el) return;
        el.classList.remove("is-enemy-hit");
        void el.offsetWidth;
        el.classList.add("is-enemy-hit");
      });
      this.damageTimer = window.setTimeout(() => {
        enemyElements.forEach((el) => {
          if (el) el.classList.remove("is-enemy-hit");
        });
      }, 720);
    }
    if (effect.type === "player-rps-loss" || effect.type === "player-hit") {
      const shakeElements = [this.app, this.battleArena, this.screenStack, this.qteOverlay, this.playerHud];
      shakeElements.forEach((el) => {
        if (!el) return;
        el.classList.remove("is-player-hit");
        void el.offsetWidth;
        el.classList.add("is-player-hit");
      });
      window.setTimeout(() => {
        shakeElements.forEach((el) => {
          if (el) el.classList.remove("is-player-hit");
        });
      }, 640);
    }
    if (effect.type === "morph") {
      this.flashArenaClass("is-morphing", 460);
    }
    if (effect.type === "item") {
      this.flashArenaClass("is-healing", 620);
    }
  }

  flashArenaClass(className, duration) {
    this.battleArena.classList.remove(className);
    void this.battleArena.offsetWidth;
    this.battleArena.classList.add(className);
    window.setTimeout(() => this.battleArena.classList.remove(className), duration);
  }

  renderPostBattle(state) {
    if (!state) return;
    this.postState = state;
    this.resultOverlay.classList.add("is-active");
    this.resultOverlay.setAttribute("aria-hidden", "false");
    if (this.battleCharactersDual) this.battleCharactersDual.hidden = true;
    if (this.battleCharacterSingle) this.battleCharacterSingle.hidden = false;
    if (this.battleCharacterWrap) this.battleCharacterWrap.classList.remove("is-dual-stage");
    this.battleCharacter.setAttribute("src", state.appearance);
    $("#reward-coins").textContent = "+" + state.reward.coins;
    $("#reward-xp").textContent = "+" + state.reward.xp;
    $("#reward-level").textContent = "+" + state.reward.levelsGained;
    $("#reward-level-wrap").hidden = state.reward.levelsGained <= 0;
    $("#result-kicker").textContent = state.won ? "BATTLE COMPLETE" : "BATTLE FAILED";

    const watermelon = state.watermelon;
    const watermelonGame = $("#watermelon-game");
    watermelonGame.hidden = state.scene !== "watermelonAim";
    this.setWatermelonTicker(state.scene === "watermelonAim");
    $("#watermelon-attempt").textContent = "第 " + (watermelon.attempts + 1) + " 刀 / " + watermelon.maxAttempts;
    $("#watermelon-successes").textContent = I18n.t("ui.watermelonScore") + " " + watermelon.successes;
    const tolerance = state.tolerance ?? (0.13 * (0.5 ** watermelon.successes));
    $("#watermelon-target").style.left = (state.target * 100) + "%";
    $("#watermelon-target").style.width = (tolerance * 2 * 100) + "%";
    const watermelonStatus = $("#watermelon-status");
    watermelonStatus.hidden = !["watermelonResult", "watermelonComplete"].includes(state.scene);
    let actions = "";

    if (state.scene === "defeat") {
      $("#result-title").textContent = I18n.t("ui.postBattleDefeatTitle");
      $("#result-message").textContent = I18n.t("ui.postBattleDefeatDesc");
      actions = this.postButtons(true);
    } else if (state.scene === "victory") {
      $("#result-title").textContent = I18n.t("ui.postBattleVictoryTitle");
      $("#result-message").textContent = I18n.t("ui.postBattleVictoryDesc");
      actions =
        '<button type="button" class="button-primary" data-post-action="swimsuit">' + I18n.t("ui.btnAskSwimsuitSpace") + '</button>' +
        this.postButtons(false);
    } else if (state.scene === "swimsuit") {
      $("#result-title").textContent = I18n.t("ui.postBattleVictoryTitle");
      $("#result-message").textContent = I18n.t("dialogue.askSwimsuitLine");
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">' + I18n.t("ui.btnPlayWatermelonSpace") + '</button>' +
        this.postButtons(false);
    } else if (state.scene === "watermelonAim") {
      $("#result-title").textContent = I18n.t("ui.watermelonTitle");
      $("#result-message").textContent = I18n.t("ui.watermelonDesc");
      actions = "";
    } else if (state.scene === "watermelonResult") {
      const remaining = watermelon.maxAttempts - watermelon.attempts;
      $("#result-title").textContent = watermelon.lastCutSuccess ? "Hit!" : "Miss!";
      $("#result-message").textContent = (watermelon.lastCutSuccess ? I18n.t("dialogue.watermelonHit", { remaining }) : I18n.t("dialogue.watermelonMiss", { remaining }));
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">' + I18n.t("ui.btnNextStrikeSpace", { attempt: watermelon.attempts + 1 }) + '</button>' +
        this.postButtons(false);
    } else if (state.scene === "watermelonComplete") {
      $("#result-title").textContent = I18n.t("ui.postBattleVictoryTitle");
      $("#result-message").textContent = (watermelon.successes > 0 ? I18n.t("dialogue.watermelonAllHit", { successes: watermelon.successes }) : I18n.t("dialogue.watermelonDone"));
      actions = this.postButtons(false);
    }

    $("#postbattle-actions").innerHTML = actions;
  }

  setWatermelonTicker(active) {
    window.cancelAnimationFrame(this.watermelonFrame);
    if (!active) return;
    const marker = $("#watermelon-marker");
    const update = () => {
      marker.style.left = (this.postBattle.getMarkerPosition() * 100) + "%";
      this.watermelonFrame = window.requestAnimationFrame(update);
    };
    update();
  }

  postButtons(rematchPrimary) {
    const rematchClass = rematchPrimary ? "button-primary" : "button-secondary";
    return '<button type="button" class="' + rematchClass + '" data-post-action="rematch">' + I18n.t("ui.btnRematch") + '</button>' +
      '<button type="button" class="button-secondary" data-post-action="stages">' + I18n.t("ui.btnSelectStages") + '</button>' +
      '<button type="button" class="button-secondary" data-post-action="home">' + I18n.t("ui.btnReturnHome") + '</button>';
  }

  handlePostAction(action) {
    if (action === "swimsuit") {
      this.postBattle.requestSwimsuit();
      return;
    }
    if (action === "watermelon") {
      this.postBattle.startWatermelon();
      return;
    }
    if (action === "rematch") {
      this.startStage(this.postState.stage.id);
      return;
    }
    if (action === "stages" || action === "home") {
      this.resultOverlay.classList.remove("is-active");
      this.navigate(action);
    }
  }

  showToast(message, tone = "normal") {
    window.clearTimeout(this.toastTimer);
    this.toastElement.textContent = message;
    this.toastElement.dataset.tone = tone;
    this.toastElement.classList.add("is-visible");
    this.toastTimer = window.setTimeout(() => {
      this.toastElement.classList.remove("is-visible");
    }, 2400);
  }
}

// --- src/js/main.js ---
const bus = new EventBus();
const persistence = new Persistence();
const store = new GameStore(bus, persistence);
const battle = new BattleSystem(bus, store);
const postBattle = new PostBattleSystem(bus, store);
const sound = new SoundSystem(store);

bus.on("battle:ended", (result) => postBattle.open(result));
bus.on("sound", ({ name }) => sound.play(name));

new DialogueController(bus);
const view = new AppView({ bus, store, battle, postBattle });
view.init();

if (new URLSearchParams(window.location.search).has("debug")) {
  window.__KORAKU_DEBUG__ = { bus, store, battle, postBattle, view };
  const panel = document.createElement("details");
  panel.className = "debug-panel";
  panel.innerHTML =
    "<summary>DEV</summary>" +
    '<button type="button" data-debug="victory">強制勝利</button>' +
    '<button type="button" data-debug="defeat">強制敗北</button>' +
    '<button type="button" data-debug="progress">Lv.10／500 星砂</button>';
  panel.addEventListener("click", (event) => {
    const action = event.target.dataset.debug;
    if (action === "victory" && battle.snapshot()?.active) battle.end(true);
    if (action === "defeat" && battle.snapshot()?.active) battle.end(false);
    if (action === "progress") {
      store.state.profile.level = Math.max(10, store.state.profile.level);
      store.state.profile.skillPoints = Math.max(45, store.state.profile.skillPoints);
      store.state.coins = Math.max(500, store.state.coins);
      store.commit("debug-progress");
    }
  });
  document.body.append(panel);
}
})();
