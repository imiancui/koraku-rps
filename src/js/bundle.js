// Auto-generated standalone bundle for Koraku RPS
// Supports both file:// protocol and http:// server without module CORS restrictions.
(() => {
  "use strict";

// --- src/js/config/gameConfig.js ---
const APP_VERSION = "0.0.31";

const DOJO_CONFIG = Object.freeze({
  defaultHp: 10000,
  defaultDamage: 0,
  minHp: 1,
  maxHp: 999999
});

const ASSETS = Object.freeze({
  default: "./koraku/小樂-預設.webp",
  final: "./koraku/小樂-2P色.webp",
  swimsuit: "./koraku/泳裝小樂.webp",
  watermelon: "./koraku/泳裝小樂_西瓜.webp",
  defeat: "./koraku/凝視小樂.webp"
});

const HANDS = Object.freeze({
  rock: { id: "rock", label: "石頭", glyph: "✊", beats: "scissors" },
  paper: { id: "paper", label: "布", glyph: "✋", beats: "rock" },
  scissors: { id: "scissors", label: "剪刀", glyph: "✌", beats: "paper" }
});

const HAND_ORDER = Object.freeze(["rock", "paper", "scissors"]);

const DIRECTION_SVGS = Object.freeze({
  up: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M12 4l-7 7 1.41 1.41L11 7.83V20h2V7.83l4.59 4.58L19 11z"/></svg>',
  down: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M12 20l7-7-1.41-1.41L13 16.17V4h-2v12.17l-4.59-4.58L5 13z"/></svg>',
  left: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M4 12l7-7 1.41 1.41L7.83 11H20v2H7.83l4.58 4.59L11 19z"/></svg>',
  right: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M20 12l-7-7-1.41 1.41L16.17 11H4v2h12.17l-4.58 4.59L14 19z"/></svg>',
  upLeft: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M6 6v8h2V9.41l9.29 9.3 1.42-1.42L9.41 8H14V6H6z"/></svg>',
  upRight: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M18 6h-8v2h4.59L5.29 17.29l1.42 1.42L16 9.41V14h2V6z"/></svg>',
  downLeft: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M6 18h8v-2H9.41l9.3-9.29-1.42-1.42L8 14.59V10H6v8z"/></svg>',
  downRight: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M18 18v-8h-2v4.59L6.71 5.29 5.29 6.71 14.59 16H10v2h8z"/></svg>'
});

function getDirectionSvg(id) {
  return DIRECTION_SVGS[id] || "";
}

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
    id: "koraku_default",
    name: "巫女社・狐娘小樂",
    variantName: "預設造型",
    src: ASSETS.default,
    description: "守護朱鳥居的狐娘小樂。一身俐落的機甲巫女裝扮，總是帶著自信的微笑迎接挑戰者。"
  },
  {
    id: "koraku_2p",
    name: "鏡界・白金小樂",
    variantName: "2P色小樂",
    src: ASSETS.final,
    description: "跨越鏡界之後顯現的白金姿態。銀髮與冰藍光芒交織，唯有突破終章試煉者方能得見。"
  },
  {
    id: "swimsuit_default",
    name: "夏日祭・清涼泳裝",
    variantName: "清涼泳裝",
    src: ASSETS.swimsuit,
    description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。",
    diffVariants: [
      {
        id: "default",
        name: "夏日祭・清涼泳裝",
        variantName: "清涼泳裝",
        src: ASSETS.swimsuit,
        description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。"
      },
      {
        id: "watermelon",
        name: "海風・切西瓜",
        variantName: "切西瓜",
        src: ASSETS.watermelon,
        description: "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣。"
      }
    ]
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
    effect: { type: "freeze", freezeChance: 0.3 },
    description: "極北寒潭萃取的靈刃。猜拳獲勝時 30% 機率凍結小樂手掌，使下一回合隨機無法出剪刀、石頭或布其一！"
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

const CHANGELOG_DATA = [
  {
    version: "0.0.31",
    date: "2026-09-04",
    tag: "Gallery Swimsuit Diff Toggle, Records XP Math Fix & Dojo History Navigation Polish",
    changes: {
      "zh-Hant": [
        "【圖鑑泳裝西瓜差分動態切換】移除圖鑑主列表重複之「切西瓜」選項與舊黑剪影，主選單精簡為 3 項；選中清涼泳裝時新增「差分」切換按鈕，可平滑切換無西瓜與切西瓜立繪且放大鑑賞同步支援。",
        "【戰績經驗值與進度條精準呈現】修復離線或線上初始化時經驗值為 0 卻顯示 0 / undefined EXP (100%) 與滿格之缺陷，補足經驗值保底與百分比空條運算。",
        "【修練道場歷史整合與上下頁關閉】開啟修練道場彈窗時寫入 #dojo 歷史紀錄，支援瀏覽器上一頁/下一頁與滑鼠側鍵（button 3/4）自然關閉彈窗。",
        "【修練道場 QTE 練習離開即刻銷毀】修正 QTE 練習中按上一頁或切換畫面時背景仍持續運行之問題，離開道場時強制終止 QTE 系統、音效與定時器。"
      ],
      "zh-Hans": [
        "【图鉴泳装西瓜差分动态切换】移除图鉴主列表重复之“切西瓜”选项与旧黑剪影，主菜单精简为 3 项；选中清凉泳装时新增“差分”切换按钮，可平滑切换无西瓜与切西瓜立绘且放大鉴赏同步支持。",
        "【战绩经验值与进度条精准呈现】修复离线或在线初始化时经验值为 0 却显示 0 / undefined EXP (100%) 与满格之缺陷，补足经验值保底与百分比空格运算。",
        "【修练道场历史整合与上下页关闭】开启修练道场弹窗时写入 #dojo 历史记录，支持浏览器上一页/下一页与鼠标侧键（button 3/4）自然关闭弹窗。",
        "【修练道场 QTE 练习离开即刻销毁】修正 QTE 练习中按上一页或切换画面时背景仍持续运行之问题，离开道场时强制终止 QTE 系统、音效与定时器。"
      ],
      "en": [
        "【Gallery Swimsuit Variant Diff Toggle】Removed duplicate watermelon slot and redundant silhouette from gallery main tabs (now 3 primary entries); added a Variant toggle button to smoothly switch between default swimsuit and watermelon split CG with full lightbox support.",
        "【Journey Records EXP & Gauge Calculation Fix】Fixed an issue where 0 EXP at Level 1 resulted in 0 / undefined EXP (100%) and a fully filled bar, ensuring robust fallback formula and accurate empty bar display.",
        "【Training Dojo History & Back Navigation Integration】Pushed #dojo history entry on opening dojo modal, allowing browser Back/Forward and mouse navigation buttons to close the modal seamlessly.",
        "【Dojo QTE Background Execution Teardown】Ensured full teardown of QTE loops, timers, and SFX whenever navigating away from the continuous QTE training screen via browser history or UI buttons."
      ],
      "ja": [
        "【図鑑水着スイカ割り差分動態切り替え】図鑑メインタブから重複していた「スイカ割り」独立項目と黒シルエットを削除し3項目に統合。水着鑑賞時に「差分」トグルボタンを追加し、通常水着とスイカ割り姿を滑らかに切り替え可能に。",
        "【戦績経験値計算とゲージ表示の修正】Lv.1・経験値0の際に 0 / undefined EXP (100%) および満タン表示になっていた不具合を解消。確実なEXP上限保証と正確な0%表示を実装。",
        "【修練道場モーダルの履歴統合と戻る対応】道場モーダル展開時に #dojo 履歴を記録し、ブラウザの「戻る／進む」およびマウス進む／戻るボタンで自然に閉じられるよう改善。",
        "【道場QTE練習の画面遷移時即時終了】QTE練習中にブラウザ履歴等で離脱した際にバックグラウンドで処理やSEが継続していた問題を解消し、完全停止処理を適用。"
      ]
    }
  },
  {
    version: "0.0.30",
    date: "2026-09-04",
    tag: "Audio Mute Toggle Event Synchronization, Cross-Mode Persistence & Crimson Slash Visual Fix",
    changes: {
      "zh-Hant": [
        "【線上模式音訊切換即時同步】修復線上模式（RemoteGameClient）點擊靜音按鈕時未觸發 store:changed 事件、未即時更新 DOM 樣式類別（.is-muted）之核心缺陷，點擊後同步更新 Web Audio API 增益與圖示狀態。",
        "【靜音禁用劃線硃砂紅視覺強化】音效與音樂靜音圖示斜線採用神宮硃砂紅（--crimson-bright）與清晰向量線段，懸浮時微光映照，徹底解決暗色背景下靜音狀態難以辨識之問題。",
        "【跨模式音訊設定持久化保持】將玩家音訊靜音偏好（音樂/音效）同步寫入裝置 localStorage，在線上與離線模式切換或網頁重新整理時皆能完美保持偏好，防止伺服器狀態合併時覆寫本機靜音設定。"
      ],
      "zh-Hans": [
        "【线上模式音频切换即时同步】修复线上模式（RemoteGameClient）点击静音按钮时未触发 store:changed 事件、未即时更新 DOM 样式类（.is-muted）之核心缺陷，点击后同步更新 Web Audio API 增益与图标状态。",
        "【静音禁用划线朱砂红视觉强化】音效与音乐静音图标斜线采用神宫朱砂红（--crimson-bright）与清晰矢量线段，悬浮时微光映照，彻底解决暗色背景下静音状态难以辨识之问题。",
        "【跨模式音频设置持久化保持】将玩家音频静音偏好（音乐/音效）同步写入设备 localStorage，在在线与离线模式切换或网页刷新时均能完美保持偏好，防止服务器状态合并时覆盖本机静音设置。"
      ],
      "en": [
        "【Online Audio Toggle Immediate Synchronization】Fixed a core flaw in online mode (RemoteGameClient) where audio toggle clicks did not emit store:changed or toggle the .is-muted DOM class, synchronizing Web Audio API gain and icon visuals immediately.",
        "【Crimson Slash Strikethrough Visual Enhancement】Restyled the mute strikethrough with vibrant shrine crimson (--crimson-bright) and clean vector lines, eliminating visibility issues on dark backgrounds.",
        "【Cross-Mode Audio Preference Persistence】Persisted player mute preferences across page reloads and online/offline mode switches via dedicated localStorage keys, safeguarding local audio preferences from being wiped by server snapshots."
      ],
      "ja": [
        "【オンライン音量トグル即時同期修復】オンラインモード（RemoteGameClient）において消音ボタン押下時に store:changed が発火せず、DOMの .is-muted クラスが更新されなかった問題を完全改修。Web Audio API ゲインとアイコン表示を即座に連動。",
        "【ミュート禁止斜線の朱赤ベクター強調】消音アイコンの斜線に神社調の朱赤（--crimson-bright）と鮮明なベクターラインを採用し、ホバー時の微光効果も追加。暗色背景下での視認性を劇的に改善。",
        "【モード間音声設定の永続化保持】プレイヤーの消音設定をデバイスの localStorage に二重永続化し、オンライン／オフライン切り替えやページ再読み込み時にも確実に維持。サーバー同期による上書きを防止。"
      ]
    }
  },
  {
    version: "0.0.29",
    date: "2026-09-04",
    tag: "Audio Mute Vector Strikethrough, Logo Click Stabilization & Transparent WebP Payload Optimization",
    changes: {
      "zh-Hant": [
        "【音效音樂靜音向量劃線】重新繪製頂部音樂與音效按鈕的靜音向量圖示，採用連續 45 度同色粗對角劃線貫穿本體，顯著提升 16px 尺寸下的靜音視覺辨識度。",
        "【左上角 LOGO 點按穩定化】排除 LOGO（.brand-button）全域按鈕縮放變形（transform: none）與重複點擊觸發機制，改為平穩的金色外光暈與亮度微調反饋，徹底消除連續抽動抖動。",
        "【全站立繪透明 WebP 化與載入優化】將原始逾 20MB 超大 PNG 經 LANCZOS 限制最大邊長 1920px 轉為高品質透明 WebP，立繪總體積銳減 95.6%（僅 909KB），顯著提升行動網路首次載入效能。"
      ],
      "zh-Hans": [
        "【音效音乐静音矢量划线】重新绘制顶部音乐与音效按钮的静音矢量图标，采用连续 45 度同色粗对角划线贯穿本体，显著提升 16px 尺寸下的静音视觉辨识度。",
        "【左上角 LOGO 点按稳定化】排除 LOGO（.brand-button）全局按钮缩放变形（transform: none）与重复点击触发机制，改为平稳的金色外光晕与亮度微调反馈，彻底消除连续抽动抖动。",
        "【全站立绘透明 WebP 化与加载优化】将原始逾 20MB 超大 PNG 经 LANCZOS 限制最大边长 1920px 转为高质量透明 WebP，立绘总体积锐减 95.6%（仅 909KB），显著提升移动网络首次加载效能。"
      ],
      "en": [
        "【Vector Audio Mute Strikethrough】Redesigned mute SVG icons with a continuous, bold 45-degree diagonal strikethrough cutting through note and speaker, greatly improving visibility at 16px.",
        "【Logo Click Non-Jitter Stabilization】Eliminated transform: scale distortion and repeated click triggers on .brand-button, replacing them with steady gold glow and brightness feedback to remove twitching.",
        "【Transparent WebP Asset Optimization】Converted over 20MB of raw PNGs into high-fidelity transparent WebPs capped at 1920px max dimension, slashing sprite payload by 95.6% (down to 909KB) for fast first-load times."
      ],
      "ja": [
        "【ミュートボタン斜線ベクター再描画】音楽・効果音ミュートアイコンに連続した45度太斜線ベクターを採用し、16pxサイズでも一目で消音状態がわかる視認性を実現。",
        "【左上ロゴクリック時のブレ防止】ロゴボタン（.brand-button）のscale縮小変形を排除し、穏やかな金色の光彩と輝度調整フィードバックに変更。連続した揺れ・痙攣挙動を解消。",
        "【立ち絵画像のWebP化・通信量95%削減】20MB超のPNG原図を最大辺1920pxにリサイズし高品質透過WebPへ完全移行。総容量を909KBに削減し、初回読み込み速度を飛躍的に向上。"
      ]
    }
  },
  {
    version: "0.0.28",
    date: "2026-09-04",
    tag: "Authoritative Cheat Module Overhaul, WebP Asset Migration & Instant View Re-rendering",
    changes: {
      "zh-Hant": [
        "【作弊與測試調試模組重構】後端驗證層相容扁平與巢狀 stats 欄位並強化數值邊界校驗；伺服器一鍵解鎖關卡徹底拔除玩家等級污染，金幣變更記錄精確審計帳本差額；客戶端實作狀態深層合併，保全技能與配點結構；作弊指令提交後即時觸發主畫面與頂部 HUD 數值重繪。",
        "【高解析度立繪全面 WebP 化】全角色與泳裝立繪全面轉碼為現代 WebP 格式，大幅縮減傳輸體積並提昇加載效能。"
      ],
      "zh-Hans": [
        "【作弊与测试调试模块重构】后端验证层兼容扁平与嵌套 stats 字段并强化数值边界校验；服务器一键解锁关卡彻底拔除玩家等级污染，金币变更记录精确审计账本差额；客户端实现状态深层合并，保全技能与配点结构；作弊指令提交后即时触发主画面与顶部 HUD 数值重绘。",
        "【高分辨率立绘全面 WebP 化】全角色与泳装立绘全面转码为现代 WebP 格式，大幅缩减传输体积并提升加载效能。"
      ],
      "en": [
        "【Authoritative Cheat Module Overhaul】Backend validator now accepts both flat and nested stats schemas with non-negative bounds; stage unlock no longer pollutes player level, with accurate ledger delta logging; client implements deep state merging to protect nested allocations and skills; UI immediately re-renders HUD and store upon ACK.",
        "【High-Res WebP Sprite Migration】Converted character and swimsuit sprites to modern WebP format, significantly reducing payload size and improving render performance."
      ],
      "ja": [
        "【デバッグ・チート機能の全面刷新】サーバー検証層がフラット・ネスト形式の両方に対応し数値境界を厳密化。ステージ全開放時のレベル汚染を完全撤廃し、星砂変動の監査台帳差分を正確に記録。クライアント状態のディープマージと即時UI再描画を実装。",
        "【高解像度立ち絵のWebP化】キャラクターおよび水着立ち絵をWebPフォーマットに完全移行し、通信容量の削減と読み込み速度の向上を実現。"
      ]
    }
  },
  {
    version: "0.0.27",
    date: "2026-09-04",
    tag: "Online Battle Countdown Client Ticker & Save Modal Mode Switching Normalization",
    changes: {
      "zh-Hant": [
        "【連線版回合倒數平滑化】客戶端戰鬥介面內建高精度時間步進器（Ticker），擺脫網路封包廣播頻率依賴，平滑展現 5 秒至 1 秒之節奏倒數、出拳搖晃與反應時間遞減，徹底根除秒數停留與跳秒問題。",
        "【存檔紀錄線上模式切換修復】修復首頁「存檔紀錄」彈窗內「切換回線上模式」按鈕，主動清理殘留 URL 參數並注入模式標記，確保本機與正式環境皆能順暢重啟切換回線上伺服器。"
      ],
      "zh-Hans": [
        "【连线版回合倒数平滑化】客户端战斗界面内建高精度时间步进器（Ticker），摆脱网络封包广播频率依赖，平滑展现 5 秒至 1 秒之节奏倒数、出拳摇晃与反应时间递减，彻底根除秒数停留与跳秒问题。",
        "【存档纪录线上模式切换修复】修复首页“存档纪录”弹窗内“切换回线上模式”按钮，主动清理残留 URL 参数并注入模式标记，确保本机与正式环境皆能顺畅重启切换回线上服务器。"
      ],
      "en": [
        "【Online Battle Countdown Smooth Ticker】Built high-precision client-side countdown and reaction tickers in AppView, eliminating reliance on packet broadcast frequency and ensuring flawless 5s-to-1s countdown pacing, fist shaking, and reaction timer progression.",
        "【Save Modal Online Mode Switch Normalization】Fixed the 'Switch to Online Mode' button in Save Records modal by purging stale URL mode params and injecting active online flags, guaranteeing reliable reboots into online authoritative mode across all environments."
      ],
      "ja": [
        "【オンライン対戦カウントダウン平滑化】戦闘UIに高精度クライアントTickerを実装し、パケット配信頻度への依存を解消。5秒から1秒への滑らかなカウントダウン、拳の揺れ、反応時間の減少を完璧に再現し、秒数の停止やスキップを根本解消。",
        "【セーブデータ管理のオンライン復帰修正】セーブデータモーダルの「オンラインモードに切り替え」ボタンを修正。古いURLパラメータを自動整理して確実にオンライン権威サーバーへ再接続できるように改善。"
      ]
    }
  },
  {
    version: "0.0.26",
    date: "2026-09-04",
    tag: "Countdown, Watermelon Marker, Skill Points & Battle Rules Full Repair",
    changes: {
      "zh-Hant": [
        "【回合與反應倒數修復】回合秒數啟用平滑定時器逐秒遞減，修復 3 秒關卡首拍排程，連線版補齊拍點音效與事件轉發；開拳反應時間支援 100ms 平滑倒數與變拳 2.0s 窗口重設。",
        "【切西瓜跑條與自動戰鬥】切西瓜採用伺服器時鐘並加上正模數防護，根除負數時間指針跳脫問題；自動戰鬥切西瓜實現三角波實時運算與 2.5x 縮放邊界安全定位。",
        "【技能點與裝備操作相容】修復背包裝備穿戴與技能加點前後端欄位相容性，避免金幣與背包狀態被空覆蓋；成長加點實作按鈕鍵盤焦點保持與 SP 不足多語系文案補全。",
        "【遊戲規則與數值強化】大劍 burst 效果全面套用 1.5x 傷害倍率；雙生關卡勝拳擊殺敵方全員時直接判定獲勝結算；開放倒數階段藥水快捷鍵操作。"
      ],
      "zh-Hans": [
        "【回合与反应倒数修复】回合秒数启用平滑定时器逐秒递减，修复 3 秒关卡首拍排程，连线版补齐拍点音效与事件转发；开拳反应时间支持 100ms 平滑倒数与变拳 2.0s 窗口重设。",
        "【切西瓜跑条与自动战斗】切西瓜采用服务器时钟并加上正模数防护，根除负数时间指针跳脱问题；自动战斗切西瓜实现三角波实时运算与 2.5x 缩放边界安全定位。",
        "【技能点与装备操作兼容】修复背包装备穿戴与技能加点前后端字段兼容性，避免金币与背包状态被空覆盖；成长加点实现按钮键盘焦点保持与 SP 不足多语系文案补全。",
        "【游戏规则与数值强化】大剑 burst 效果全面套用 1.5x 伤害倍率；双生关卡胜拳击杀敌方全员时直接判定获胜结算；开放倒数阶段药水快捷键操作。"
      ],
      "en": [
        "【Round & Reaction Countdown Smoothness】Enabled smooth interval countdown tickers, fixed Stage 2-4 first chant beat scheduling, and forwarded countdown-beats with select sound in online mode; reaction timer now decrements smoothly every 100ms.",
        "【Watermelon Motion & Auto-Battle Alignment】Applied server-synced time with positive modulo math to prevent marker overflow; auto-battle watermelon now features real-time triangle wave calculation and safe 2.5x zoom boundary clamping.",
        "【Skill Points & Equipment Protocol Compatibility】Aligned payload schemas for inventory equipping and skill allocation across client/validator/server; added focus retention and insufficient SP i18n localization in Growth panel.",
        "【Rules & Combat Enhancements】Greatsword burst affix now applies 1.5x multiplier consistently to single/dual RPS wins; killing all twins on single win now settles immediately without unwanted QTE; enabled potion hotkeys during countdown."
      ],
      "ja": [
        "【カウントダウンと反応時間の平滑化】毎秒減少するタイマーを有効化し、3秒ステージの最初のカウント抜けを修正。オンライン版でのビートイベントとSE転送を補完。反応時間も100ms刻みでスムーズにカウントダウン。",
        "【スイカ割りゲージとオートバトル修復】サーバー同期時計と正の剰余計算を適用し、ゲージ針の飛び出しを防止。オートバトルスイカ割りに三角波の動的計算と2.5倍ズーム時の安全クランプを実装。",
        "【スキルポイントと装備プロトコルの互換性向上】インベントリ装備とスキル習得のフィールド仕様を統一し、ステータス上書きによるコイン消失を防止。育成画面でのフォーカス維持とSP不足テキストを追加。",
        "【ルールとダメージ数値の最適化】大剣の「burst」特性による1.5倍ダメージを全勝利に適用。双子ボスを通常手で全滅させた場合に即座に勝利判定へ移行。カウントダウン中のポーションショートカットに対応。"
      ]
    }
  },
  {
    version: "0.0.25",
    date: "2026-09-04",
    tag: "Production VPS Server Online Launch & Cloudflare Dynamic WSS Auto-Injection",
    changes: {
      "zh-Hant": [
        "【線上服務正式上線與動態注入】完成 Linode 東京 VPS 權威伺服器 (ws.koraku.app) 與 Caddy 自動 SSL 憑證簽發；正式環境 (koraku.app) 自動注入連線與權威存檔功能。"
      ],
      "zh-Hans": [
        "【线上服务正式上线与动态注入】完成 Linode 东京 VPS 权威服务器 (ws.koraku.app) 与 Caddy 自动 SSL 证书签发；正式环境 (koraku.app) 自动注入连线与权威存档功能。"
      ],
      "en": [
        "【Production VPS Online Launch & Auto Injection】Deployed authoritative server (ws.koraku.app) on Linode Tokyo VPS with Caddy automatic SSL; production site (koraku.app) auto-connects to online battle & server saves."
      ],
      "ja": [
        "【オンラインサービス正式運用開始と自動注入】Linode東京VPS (ws.koraku.app) とCaddy自動SSL証明書を構築。正式環境 (koraku.app) で自動オンライン対戦・権威保存に接続。"
      ]
    }
  },
  {
    version: "0.0.24",
    date: "2026-09-03",
    tag: "Offline Fallback Single-Prompt Guard, RWD Monotonic Log Indexing & Ops Evidence Archival",
    changes: {
      "zh-Hant": [
        "【離線降級單次提示保護】在未配置伺服器端點而自動退回離線模式時，主動清除殘留之 localStorage.koraku_mode，根除每次頁面重新整理均重複跳出提示之問題。",
        "【響應式回歸日誌重編號】全面校準 docs/ui/rwd-regression-log.md 編號衝突，確立全檔唯一單調遞增鐵律；補正戰鬥中配點換裝鎖定 (RWD-REG-016) 與離線降級雙按鈕 (RWD-REG-017)。",
        "【維運與 RWD 驗證留證入庫】正式入庫 Tailscale Staging 端點實測、Windows 每日備份與冷啟動還原演練日誌，以及離線降級按鈕 27 項全量視口 RWD 截圖與驗證報告。"
      ],
      "zh-Hans": [
        "【离线降级单次提示保护】在未配置服务器端点而自动退回离线模式时，主动清除残留之 localStorage.koraku_mode，根除每次页面刷新均重复弹出提示之问题。",
        "【响应式回归日志重编号】全面校准 docs/ui/rwd-regression-log.md 编号冲突，确立全档唯一单调递增铁律；补正战斗中配点换装锁定 (RWD-REG-016) 与离线降级双按钮 (RWD-REG-017)。",
        "【运维与 RWD 验证留证入库】正式入库 Tailscale Staging 端点实测、Windows 每日备份与冷启动还原演练日志，以及离线降级按钮 27 项全量视口 RWD 截图与验证报告。"
      ],
      "en": [
        "【Offline Fallback Single-Prompt Protection】Clears residual localStorage.koraku_mode on offline fallback when no server is configured, ensuring warning toasts trigger only once.",
        "【RWD Regression Log Monotonic Indexing】Resolved log numbering collisions in docs/ui/rwd-regression-log.md with strict monotonic uniqueness; indexed in-battle mutation lock (RWD-REG-016) and offline fallback buttons (RWD-REG-017).",
        "【Operations & RWD Evidence Archival】Archived Tailscale staging verification, Windows daily backup and cold-start restore drill logs, alongside 27-case offline fallback button RWD screenshots and test report."
      ],
      "ja": [
        "【オフラインフォールバック単一通知保護】サーバー未設定時のオフライン降格時に残留 localStorage.koraku_mode を自動クリアし、ページ更新ごとの重複通知を解消。",
        "【RWD回帰ログ再採番と単調増加規則】docs/ui/rwd-regression-log.md の採番衝突を解消し、戦闘中ロック (RWD-REG-016) とオフライン降格ボタン (RWD-REG-017) の検証記録を正式登録。",
        "【運用・RWD検証証跡の正式登録】Tailscaleステージング検証、日次バックアップとコールドスタート復元演練ログ、オフライン降格ボタンの27ケースRWDスクリーンショットとレポートを登録。"
      ]
    }
  },
  {
    version: "0.0.23",
    date: "2026-09-03",
    tag: "Offline Default & Fallback Protection, Disjoint Storage, Server Hardening & Tailscale Staging",
    changes: {
      "zh-Hant": [
        "【預設離線沙盒與伺服器注入設定 (Policy 17)】客戶端預設以離線沙盒模式啟動，徹底避免因缺少伺服器端點造成開局無回應問題；僅在偵測到注入伺服器設定時啟動線上模式，並禁止回退同源 /ws。",
        "【雙模式存檔與快取空間完全隔離】離線沙盒使用 koraku-rps-save-v1；線上 Token 與快取使用專屬前綴鍵（koraku-rps-online-*），切換模式互不污染。",
        "【斷線與模式切換 UI 升級】斷線提示 Banner 新增「改用離線模式」按鈕，存檔紀錄面板新增「切換回線上模式」按鈕；排隊指令 8 秒未連線自動逾時取消。",
        "【伺服器安全性強化與 Tailscale 內網環境】出口事件與快照徹底剝除種子與指令紀錄；修復斷線 10 秒寬限自動結算鏈；提供 Tailscale 內網測試站與 Windows 每日自動備份排程。"
      ],
      "zh-Hans": [
        "【默认离线沙盒与服务器注入配置 (Policy 17)】客户端默认以离线沙盒模式启动，彻底避免因缺少服务器端点造成开局无响应问题；仅在检测到注入服务器配置时启动在线模式，并禁止回退同源 /ws。",
        "【双模式存档与缓存空间完全隔离】离线沙盒使用 koraku-rps-save-v1；在线 Token 与缓存使用专属前缀键（koraku-rps-online-*），切换模式互不污染。",
        "【断线与模式切换 UI 升级】断线提示 Banner 新增“改用离线模式”按钮，存档记录面板新增“切换回在线模式”按钮；排队指令 8 秒未连线自动超时取消。",
        "【服务器安全性强化与 Tailscale 内网环境】出口事件与快照彻底剥除种子与指令记录；修复断线 10 秒宽限自动结算链；提供 Tailscale 内网测试站与 Windows 每日自动备份排程。"
      ],
      "en": [
        "【Default Offline Sandbox & Config Injection (Policy 17)】Client boots into offline sandbox mode by default, preventing unresponsiveness when server endpoints are absent; online mode connects only when explicitly injected, without same-origin fallback.",
        "【Disjoint Storage & Cache Isolation】Offline sandbox utilizes koraku-rps-save-v1; online tokens and state cache use disjoint keys (koraku-rps-online-*), preventing state contamination across modes.",
        "【Banner & Save Modal Mode Switching UI】Added 'Play offline' button in disconnect banner and 'Switch to online mode' in Save Records modal; queued commands time out after 8s when disconnected.",
        "【Server Security Hardening & Tailscale Staging】Stripped RNG seed and command logs from outgoing snapshots/events; fixed 10s disconnect settlement pipeline; added Tailscale staging suite and daily backup tasks."
      ],
      "ja": [
        "【デフォルトオフライン＆サーバー設定注入 (Policy 17)】接続先未設定時の操作不能を防ぐため、クライアントはデフォルトでオフライン起動。設定注入時のみオンラインへ接続し、同元/wsへのフォールバックを廃止。",
        "【完全分離ストレージ＆キャッシュ保護】オフラインセーブには koraku-rps-save-v1、オンラインTokenとキャッシュには専用キー (koraku-rps-online-*) を使用し、モード切り替え時のデータ混入を防止。",
        "【切断バナー＆モード切り替えUI】切断バナーに「オフラインで遊ぶ」、セーブ記録画面に「オンラインモードに切り替え」ボタンを追加。未接続時の待機コマンドは8秒でタイムアウト。",
        "【サーバーセキュリティ強化＆Tailscale環境】送信スナップショットからシード値・コマンドログを完全に剥離。10秒切断猶予精算パイプラインの修復、Tailscale検証環境と日次バックアップを整備。"
      ]
    }
  },
  {
    version: "0.0.22",
    date: "2026-09-03",
    tag: "i18n Residue Cleanup Round 1 & 2 (Keys, Battle HUD, Damage Log, Consumables)",
    changes: {
      "zh-Hant": [
        "【核心回應與在地化鍵化】完成 kernelFactory 全部 8 處回應點 i18n 鍵化（移除伺服器端中文字符串），支援四語系動態翻譯。",
        "【傷害日誌與手勢按鈕在地化】出拳手勢按鈕與戰鬥 HUD 玩家名依語系渲染；日誌雙小樂歸屬依 targetId 判定；旅人統一為 Traveler。",
        "【戰績紀錄與單位在地化】戰績面板消耗品、場次、勝敗統計與唯讀提示完整支援四語系對應量詞與參數替換。"
      ],
      "zh-Hans": [
        "【核心响应与本地化键化】完成 kernelFactory 全部 8 处响应点 i18n 键化（移除服务端中文字符串），支持四语系动态翻译。",
        "【伤害日志与手势按钮本地化】出拳手势按钮与战斗 HUD 玩家名依语系渲染；日志双小乐归属依 targetId 判定；旅人统一为 Traveler。",
        "【战绩记录与单位本地化】战绩面板消耗品、场次、胜败统计与只读提示完整支持四语系对应量词与参数替换。"
      ],
      "en": [
        "【Kernel Factory i18n Keys】Completed keying across all 8 kernelFactory response points, removing hardcoded Chinese strings and enabling 4-locale translation.",
        "【Damage Log & Hand Buttons Localization】Hand gesture buttons and battle HUD player name resolve across locales; dual boss damage attribution uses targetId; Traveler unified.",
        "【Records & Consumables Units Localization】Records modal consumables, match counts, win/loss stats, and read-only notes support 4-locale units and parameter replacement."
      ],
      "ja": [
        "【カーネルレスポンスの完全キー化】kernelFactory の全8箇所の応答をi18nキー化し、サーバー側の中国語ハードコードを排除。",
        "【ダメージログ＆じゃんけんボタン多言語化】じゃんけんボタンとバトルHUDプレイヤー名をロケール対応；ボス被弾帰属をtargetIdで判定；旅人をTravelerに統一。",
        "【戦績記録＆消費アイテム単位多言語化】戦績画面の消費アイテム、対戦数、勝敗統計、閲覧専用ノートの各言語単位・パラメータ置換を完備。"
      ]
    }
  },
  {
    version: "0.0.21",
    date: "2026-09-03",
    tag: "Battle Mutation Lock UI, Multi-Viewport RWD Verification & Go-Live Runbook",
    changes: {
      "zh-Hant": [
        "【戰鬥中換裝與配點鎖定灰化 UI】依據 battleLockPolicy 政策，在線上對決與離線沙盒中，戰鬥進行期間自動灰化禁用換裝、卸裝、屬性配點與技能升級按鈕（添加 disabled 與 aria-disabled=\"true\"）。",
        "【即時鎖定提示與點擊防護】於能力成長與裝備畫面顯示專屬提示行，點擊鎖定中按鈕立即彈出「戰鬥進行中已鎖定換裝與配點」Toast 通知，戰鬥結算後即時自動恢復。",
        "【RWD 跨視口與動態 Resize 驗證 (RWD-REG-009)】實機通過手機 (375px)、平板 (768px)、桌面 (1280px/1920px) 響應式驗證，包含跨 12 格紙娃娃斷點動態縮放與中英雙語系排版防推擠。",
        "【上線日標準作業程序 (Go-Live Runbook)】完備 VPS 採購後 T-24h 基礎設施、T-2h 容器部署與 T-0h 公網真機簽核清單。"
      ],
      "zh-Hans": [
        "【战斗中换装与配点锁定灰化 UI】依据 battleLockPolicy 政策，在线上对决与离线沙盒中，战斗进行期间自动灰化禁用换装、卸装、属性配点与技能升级按钮（添加 disabled 与 aria-disabled=\"true\"）。",
        "【即时锁定提示与点击防护】于能力成长与装备画面显示专属提示行，点击锁定中按钮立即弹出“战斗进行中已锁定换装与配点”Toast 通知，战斗结算后即时自动恢复。",
        "【RWD 跨视口与动态 Resize 验证 (RWD-REG-009)】实机通过手机 (375px)、平板 (768px)、桌面 (1280px/1920px) 响应式验证，包含跨 12 格纸娃娃断点动态缩放与中英双语系排版防推挤。",
        "【上线日标准作业程序 (Go-Live Runbook)】完备 VPS 采购后 T-24h 基础设施、T-2h 容器部署与 T-0h 公网真机签核清单。"
      ],
      "en": [
        "【In-Battle Mutation Lock UI & Graying】According to battleLockPolicy, equip, unequip, stat allocation, and skill upgrade buttons are automatically disabled and grayed out (with disabled and aria-disabled=\"true\") during active combat.",
        "【Real-time Lock Notice & Click Interception】Displays dedicated lock notice text in Growth and Equipment panels; clicking locked buttons triggers an immediate \"Mutations locked during battle\" Toast alert, recovering automatically post-battle.",
        "【Multi-Viewport RWD & Dynamic Resize Verification (RWD-REG-009)】Verified on mobile (375px), tablet (768px), and desktop (1280px/1920px), ensuring flawless 12-slot paperdoll scaling and non-wrapping multi-language layouts.",
        "【Go-Live Day Runbook】Finalized complete operational runbook covering T-24h infrastructure setup, T-2h container deployment, and T-0h live environment verification."
      ],
      "ja": [
        "【戦闘中装備変更・ステータス割り振りロックUI】battleLockPolicyに基づき、戦闘中は装備の着脱、ステータス強化、スキル習得ボタンを自動的にグレーアウト・無効化（disabledおよびaria-disabled=\"true\"）。",
        "【リアルタイムロック通知＆タップ防止】能力成長および装備画面に専用の警告テキストを表示。ロック中のボタン操作時に「戦闘中は装備変更と能力配分がロックされています」Toastを表示し、戦闘終了時に自動復帰。",
        "【マルチビューポートRWD＆動的リサイズ検証 (RWD-REG-009)】モバイル (375px)、タブレット (768px)、デスクトップ (1280px/1920px) の実機描画を検証。12枠着せ替え欄の動的スケールと多言語レイアウトを保証。",
        "【本番リリース手順書 (Go-Live Runbook)】VPS調達後のT-24hインフラ構築、T-2hコンテナ配備、T-0h実機検証サインオフ手順を整備。"
      ]
    }
  },
  {
    version: "0.0.20",
    date: "2026-09-03",
    tag: "Online Authority Formalization, Real WebSocket E2E & Docker Staging Environment",
    changes: {
      "zh-Hant": [
        "【OpenSpec 線上權威行為規格化】正式建立 koraku-online-authority-formalization 規格變更提案，涵蓋三類裁決模型、單一寫入者保證、暫停次數限制、斷線 10 秒寬限自動結算與作弊指令 Dev 權限審計。",
        "【真實 WebSocket 雙端 E2E 整合測試】補齊真實 KorakuServer 與 RemoteGameClient 連線、出拳、QTE 判定至戰鬥結算全迴路測試，以及雙手出拳（hand2）左右拳槽位映射驗證。",
        "【戰鬥重放 (Replay) 全迴路保存與還原】實作 GameSession 戰鬥軌跡至 JsonStorage 儲存、讀回與 dispatchCommand 確定性重放驗證。",
        "【Docker Staging 演練環境】提供包含 Node.js 伺服器、Caddy (wss 反向代理) 與靜態 Client 的完整 Docker Compose 測試環境，完成缺變數 fail-fast、Origin 阻擋、10s 心跳保活與 20 併發負載煙霧實測。",
        "【可配置戰鬥中鎖定策略 (battleLockPolicy)】支援 always（全時鎖定）、countdown（倒數與結算開放）與 never（不鎖定）伺服器端環境變數配置。"
      ],
      "zh-Hans": [
        "【OpenSpec 线上权威行为规格化】正式建立 koraku-online-authority-formalization 规格变更提案，涵盖三类裁决模型、单一写入者保证、暂停次数限制、断线 10 秒宽限自动结算与作弊指令 Dev 权限审计。",
        "【真实 WebSocket 双端 E2E 集成测试】补齐真实 KorakuServer 与 RemoteGameClient 连线、出拳、QTE 判定至战斗结算全回路测试，以及双手出拳（hand2）左右拳槽位映射验证。",
        "【战斗重放 (Replay) 全回路保存与还原】实现 GameSession 战斗轨迹至 JsonStorage 储存、读回与 dispatchCommand 确定性重放验证。",
        "【Docker Staging 演练环境】提供包含 Node.js 服务器、Caddy (wss 反向代理) 与静态 Client 的完整 Docker Compose 测试环境，完成缺变量 fail-fast、Origin 阻挡、10s 心跳保活与 20 并发负载烟雾实测。",
        "【可配置战斗中锁定策略 (battleLockPolicy)】支持 always（全时锁定）、countdown（倒数与结算开放）与 never（不锁定）服务端环境变量配置。"
      ],
      "en": [
        "【OpenSpec Online Authority Formalization】Formally registered online authority specifications covering the three-class adjudication model, single writer guarantee (4001 kickout), pause limits, 10s disconnect auto-settlement, and cheat dev entitlement audit.",
        "【Real WebSocket Full E2E Integration Suite】Built comprehensive E2E tests using live KorakuServer and RemoteGameClient over real WebSockets, validating battle progression, post-battle ledger appending, and dual-hand slot mapping.",
        "【End-to-End Battle Replay Lifecycle】Implemented complete battle replay recording to JsonStorage, deserialization, and deterministic command replay verification.",
        "【Docker Staging Environment】Added multi-service Docker Compose suite (Server, Caddy wss proxy, static Client), verified with fail-fast env validation, Origin checks, 10s idle ping/pong, and 20-client load smoke test.",
        "【Configurable Battle Lock Policy】Added battleLockPolicy supporting 'always' (default), 'countdown' (open during countdown/settlement), and 'never' via server environment variables."
      ],
      "ja": [
        "【OpenSpec オンライン権威仕様の正式策定】3分類判定モデル、単一ライター保証（4001切断）、一時停止制限、切断10秒猶予自動精算、チートコマンドDev権限監査を正式仕様化。",
        "【実WebSocket双方向E2E統合テスト】実稼働KorakuServerとRemoteGameClientによるWebSocket接続、出拳、QTE判定、戦闘精算、両手出拳スロットマッピングの完全検証テストを構築。",
        "【戦闘リプレイ全工程の保存と再現】GameSessionの対戦ログをJsonStorageへ保存・復元し、dispatchCommandによる確定性リプレイ一致を実証。",
        "【Docker Staging検証環境】Node.jsサーバー、Caddy (wssリバースプロキシ)、静的ClientからなるDocker Compose環境を構築。環境変数検証、Origin遮断、10秒心拍維持、20並行負荷テストを実施。",
        "【戦闘中ロック方針の設定可能化 (battleLockPolicy)】always（常時ロック）、countdown（カウントダウン・精算時開放）、never（非ロック）の環境変数設定に対応。"
      ]
    }
  },
  {
    version: "0.0.19",
    date: "2026-09-02",
    tag: "PRNG Chi-Square Verification, Burst Rate Limiting & Anti-Cheat Audit",
    changes: {
      "zh-Hant": [
        "【確定性偽隨機數 (PRNG) 卡方分佈檢驗】通過卡方擬合優度檢定 (Chi-Square Goodness-of-Fit Test)，驗證剪刀石頭布出拳、摸摸技能與小樂閃避機率統計分佈均勻性與種子隔離性。",
        "【短視窗流量突發限制 (Burst Rate Limiting)】RateLimiter 升級支援 200ms 短週期微突發請求限制，有效防禦高頻腳本與連點外掛。",
        "【跨裝置轉移碼原子互斥保證】TransferManager 實作轉移碼兌換狀態原子鎖定，防止併發重複兌換 (Race Condition)。",
        "【4KB 封包大小上限與嚴格 Schema 白名單】Validator 全面檢驗客戶端入站指令信封，封包超過 4KB 或注入未宣告欄位立即攔截並記錄審計日誌。",
        "【追加專用經濟帳本 (Append-only Ledger)】玩家星砂、經驗值、藥水與裝備異動均寫入不可竄改之經濟帳本，記錄伺服器權威時間戳與來源。"
      ],
      "zh-Hans": [
        "【确定性伪随机数 (PRNG) 卡方分布检验】通过卡方拟合优度检验 (Chi-Square Goodness-of-Fit Test)，验证剪刀石头布出拳、摸摸技能与小乐闪避机率统计分布均匀性与种子隔离性。",
        "【短视窗流量突发限制 (Burst Rate Limiting)】RateLimiter 升级支持 200ms 短周期微突发请求限制，有效防御高频脚本与连点外挂。",
        "【跨装置转移码原子互斥保证】TransferManager 实现转移码兑换状态原子锁定，防止并发重复兑换 (Race Condition)。`",
        "【4KB 封包大小上限与严格 Schema 白名单】Validator 全面检验客户端入站指令信封，封包超过 4KB 或注入未宣告栏位立即拦截并记录审计日志。",
        "【追加专用经济账本 (Append-only Ledger)】玩家星砂、经验值、药水与装备异动均写入不可篡改之经济账本，记录服务器权威时间戳与来源。"
      ],
      "en": [
        "【Deterministic PRNG Chi-Square Statistical Verification】Passed Chi-Square Goodness-of-Fit Tests confirming statistical uniformity and seed isolation across RPS gestures, Momo skill activations, and dodge rates.",
        "【Burst Rate Limiting】Enhanced RateLimiter with 200ms micro-burst window protection to defend against high-frequency automated scripts and autoclickers.",
        "【Cross-Device Transfer Code Mutex Guarantee】Implemented atomic state locks in TransferManager to eliminate concurrent double-claim race conditions.",
        "【4KB Envelope Size Cap & Strict Schema Whitelist】Validator enforces strict field whitelisting and 4KB payload limits on all inbound client commands with security audit logging.",
        "【Append-Only Economic Ledger】Every mutation to star sand, XP, consumables, and equipment instances appends to an immutable audit ledger stamped with authoritative server time."
      ],
      "ja": [
        "【確定性擬似乱数 (PRNG) カイ二乗適合度検定】ジャンケン出拳、なでなでスキル発動、回避率の統計的均一性とシード隔離性をカイ二乗検定により実証。",
        "【バーストトラフィック制限】RateLimiterに200ms短周期マイクロバースト制限を導入し、高速自動スクリプトや連打ツールを防御。",
        "【引き継ぎコードのアトミック排他制御】TransferManagerに引き継ぎ状態の排他ロックを実装し、並行引き換えによる重複利用（Race Condition）を防止。",
        "【4KBパケット上限＆厳格スキーマ検証】Validatorが受信コマンドのスキーマと4KBサイズ上限を厳格審査し、不正パラメータ注入を遮断。",
        "【追記専用経済台帳 (Append-only Ledger)】星砂、経験値、アイテム、装備の全変動を不変の監査台帳に記録し、サーバー権威時刻を刻印。"
      ]
    }
  },
  {
    version: "0.0.18",
    date: "2026-09-02",
    tag: "Online-Ready Architecture, Zero-DOM Kernel Decoupling & Single Writer Guarantee",
    changes: {
      "zh-Hant": [
        "【零 DOM 核心解耦與雙客戶端架構】將戰鬥、摸摸技能、裝備計算與數值核心重構為零 DOM 純邏輯模組，支援 LocalGameClient（離線沙盒）與 RemoteGameClient（線上權威）無縫切換。",
        "【線上權威核心架構 (Authoritative Kernel)】所有戰鬥裁決、傷害計算、時序判定與數值結算皆由伺服器權威核心主導，客戶端僅表達操作意圖。",
        "【單一寫入者保證 (Single Writer Guarantee)】帳號於新裝置連線登入時，舊連線平滑斷開並收到 4001 踢出代碼（NEW_CONNECTION_ESTABLISHED），杜絕多開雙寫衝突。",
        "【三類判定模型與 150ms 時序寬限】QTE/切西瓜時序判定採客戶端主張與伺服器 150ms 寬限審計；出拳手勢採秘密承諾防過期；背包裝備採 cmdId 冪等指令序列化執行。",
        "【匿名裝置 Token 與帳號轉移】透過 HMAC-SHA256 簽發匿名裝置金鑰，支援產生一次性轉移碼進行無痛跨裝置繼承。"
      ],
      "zh-Hans": [
        "【零 DOM 核心解耦与双客户端架构】将战斗、摸摸技能、装备计算与数值核心重构为零 DOM 纯逻辑模块，支持 LocalGameClient（离线沙盒）与 RemoteGameClient（线上权威）无缝切换。",
        "【线上权威核心架构 (Authoritative Kernel)】所有战斗裁决、伤害计算、时序判定与数值结算皆由服务器权威核心主导，客户端仅表达操作意图。",
        "【单一写入者保证 (Single Writer Guarantee)】账号于新装置连线登入时，旧连线平滑断开并收到 4001 踢出代码（NEW_CONNECTION_ESTABLISHED），杜绝多开双写冲突。",
        "【三类判定模型与 150ms 时序宽限】QTE/切西瓜时序判定采客户端主张与服务器 150ms 宽限审计；出拳手势采秘密承诺防过期；背包装备采 cmdId 幂等指令序列化执行。",
        "【匿名装置 Token 与账号转移】透过 HMAC-SHA256 签发匿名装置金钥，支持产生一次性转移码进行无痛跨装置继承。"
      ],
      "en": [
        "【Zero-DOM Kernel Decoupling & Dual-Client Architecture】Refactored combat, Momo skills, equipment math, and stat progression into zero-DOM pure modules, enabling seamless switching between LocalGameClient (offline sandbox) and RemoteGameClient (online authoritative).",
        "【Authoritative Online Kernel】All combat outcomes, damage calculations, and rewards are computed authoritatively on the server; the client strictly sends intent commands.",
        "【Single Writer Guarantee (4001 Kickout)】When an account connects from a new device, active sessions receive a clean 4001 kickout code (NEW_CONNECTION_ESTABLISHED), permanently preventing concurrent write conflicts.",
        "【Three-Class Adjudication & 150ms Grace】Timing claims (QTE/watermelon) audited with 150ms network grace; RPS commitments expire upon round reveal; inventory mutations serialized with idempotent cmdIds.",
        "【Anonymous Device Tokens & Account Transfer】Cryptographic HMAC-SHA256 device tokens with one-time transfer code generation for smooth cross-device account migration."
      ],
      "ja": [
        "【ゼロDOMカーネル分離＆デュアルクライアント構造】戦闘、なでなでスキル、装備計算、ステータス計算をDOM非依存の純粋ロジックへ分離。LocalGameClient（オフライン）とRemoteGameClient（オンライン）を完全統一。",
        "【サーバー権威型ゲームカーネル】勝敗判定、ダメージ計算、報酬付与の全権をサーバーが掌握し、クライアントは操作意図のみを送信。",
        "【単一ライター保証（4001切断）】同一アカウントが新規接続された際、旧セッションを4001コード（NEW_CONNECTION_ESTABLISHED）で円滑に切断し多重ログインを防止。",
        "【3分類判定モデル＆150msネットワーク猶予】QTE・スイカ割り判定は150msの到着猶予で監査。ジャンケン出拳は秘密コミット方式で期限管理。アイテム操作はcmdId冪等キューで順序実行。",
        "【匿名端末トークン＆アカウント引き継ぎ】HMAC-SHA256署名による匿名端末認証とワンタイム引き継ぎコードによる端末間移行に対応。"
      ]
    }
  },
  {
    version: "0.0.17",
    date: "2026-09-02",
    tag: "Battle HUD Drag-and-Drop & Non-Overlapping Spawn Layout",
    changes: {
      "zh-Hant": [
        "【局內四大 HUD 自由拖曳擺放】戰鬥紀錄、回合倒數看板、自動刷關控制條、自動刷關切西瓜累計卡片全面支援滑鼠與觸控自由拖曳擺放。",
        "【無衝突預設生成佈局】重構各介面初始生成座標，自動刷關切西瓜卡片預設停靠於戰鬥紀錄下方，根除生成重疊遮擋問題。",
        "【視窗邊界約束與防誤觸】拖曳範圍嚴格限制於可視區域內（防拖出螢幕），設定 4px 移動門檻防止點擊按鈕誤觸拖曳。",
        "【座標記憶與雙擊重設】自訂座標自動儲存於 localStorage 跨對局持久化保持，雙擊標題列/手柄即可一鍵重設回預設位置。"
      ],
      "zh-Hans": [
        "【局内四大 HUD 自由拖曳摆放】战斗记录、回合倒数看板、自动刷关控制条、自动刷关切西瓜累计卡片全面支持鼠标与触控自由拖曳摆放。",
        "【无冲突默认生成布局】重构各界面初始生成坐标，自动刷关切西瓜卡片默认停靠于战斗记录下方，根除生成重叠遮挡问题。",
        "【视窗边界约束与防误触】拖曳范围严格限制于可视区域内（防拖出屏幕），设定 4px 移动门槛防止点击按钮误触拖曳。",
        "【坐标记忆与双击重设】自定义坐标自动保存于 localStorage 跨对局持久化保持，双击标题栏/手柄即可一键重设回默认位置。"
      ],
      "en": [
        "【Draggable Battle HUD Widgets】Battle Damage Log, Round Oracle, Auto-Battle Bar, and Auto-Watermelon Widget are now freely draggable across desktop and mobile screens.",
        "【Non-Overlapping Default Spawn Layout】Redesigned default spawn coordinates so the floating watermelon widget spawns below the battle damage log, permanently preventing overlaps.",
        "【Viewport Bounds Clamping & Click Guards】Keeps widgets safely within visible screen boundaries and enforces a 4px drag threshold to prevent accidental clicks.",
        "【Position Persistence & Double-Click Reset】Custom positions are saved in localStorage across battles and page reloads; double-clicking any drag handle instantly resets it to default."
      ],
      "ja": [
        "【戦闘HUDの自由ドラッグ配置】戦闘ダメージログ、ラウンド神託、自動周回バー、自動スイカ割りウィジェットがマウスおよびタッチ操作で自由にドラッグ配置可能に。",
        "【非干渉デフォルト生成レイアウト】初期生成座標を刷新し、スイカ割りカードがダメージログの下部に整列生成されることで、重なりによる視認性低下を根絶。",
        "【画面境界クランプ＆誤タップ防止】ウィジェットが画面外に出ないよう安全境界を維持し、4pxの移動しきい値によりボタン操作の誤ドラッグを防止。",
        "【座標永続化＆ダブルクリック初期化】カスタム位置をlocalStorageに保存し対戦を跨いで維持。ヘッダーのダブルクリックで即座に初期位置へ復元可能。"
      ]
    }
  },
  {
    version: "0.0.16",
    date: "2026-09-02",
    tag: "QTE Input Precision, Standee Appreciation Mode & Battle Navigation Guards",
    changes: {
      "zh-Hant": [
        "【能力成長未分配點數淺藍光暈】當角色升等持有剩餘能力或技能點數時，首頁「能力成長」按鈕邊緣呈現優雅的淺藍色呼吸外發光提示。",
        "【結算與切西瓜立繪全景欣賞開關】結算畫面新增「欣賞立繪」開關，可一鍵隱藏卡片與半透明遮罩，以 100% 原始色彩與亮度全景展示小樂立繪與泳裝差分。",
        "【對戰局內防誤觸離場確認彈窗】攔截瀏覽器上一頁、滑鼠側鍵（上下頁）與頁面關閉事件，彈出和風確認視窗，防止意外退出損失進度與獎勵。",
        "【戰鬥回合倒數時間戳持久化】修復刷新網頁 (F5) 回合倒數秒數重置的問題，以絕對時間戳精確繼承剩餘秒數，杜絕刷新漏洞。",
        "【QTE 實體鍵位解析與嚴格錯誤判定】優先採用 event.code 物理鍵位解析，徹底消除 Windows 輸入法組字與 Shift 鍵卡頓；非方向鍵（如 F/Space/J 等）嚴格判定為失誤並扣除容錯次數。"
      ],
      "zh-Hans": [
        "【能力成长未分配点数浅蓝光晕】当角色升等持有剩余能力或技能点数时，首页“能力成长”按钮边缘呈现优雅的浅蓝色呼吸外发光提示。",
        "【结算与切西瓜立绘全景欣赏开关】结算画面新增“欣赏立绘”开关，可一键隐藏卡片与半透明遮罩，以 100% 原始色彩与亮度全景展示小乐立绘与泳装差分。",
        "【对战局内防误触离场确认弹窗】拦截浏览器上一页、鼠标侧键（上下页）与页面关闭事件，弹出和风确认弹窗，防止意外退出损失进度与奖励。",
        "【战斗回合倒数时间戳持久化】修复刷新网页 (F5) 回合倒数秒数重置的问题，以绝对时间戳精确继承剩余秒数，杜绝刷新漏洞。",
        "【QTE 实体键位解析与严格错误判定】优先采用 event.code 物理键位解析，彻底消除 Windows 输入法组字与 Shift 键卡顿；非方向键（如 F/Space/J 等）严格判定为失误并扣除容错次数。"
      ],
      "en": [
        "【Growth Button Pending Points Cyan Glow】When unallocated stat or skill points are available upon leveling up, the Home 'Growth' button illuminates with a soft cyan pulsing glow.",
        "【Settlement Standee Appreciation Mode】Added a 'View Standee' toggle button to victory and watermelon screens, instantly hiding UI cards and dark masks to display Little Raku in full brightness.",
        "【In-Battle Navigation & Accidental Exit Guards】Intercepts browser back/forward history, mouse side buttons, and page unload with a shrine-themed confirmation dialog to prevent accidental progress loss.",
        "【Battle Countdown Timestamp Persistence】Fixed an issue where refreshing the page (F5) would reset round timers; remaining seconds are now preserved across reloads with absolute timestamps.",
        "【QTE Physical Code Mapping & Strict Error Detection】Directly binds event.code to eliminate Windows IME composition and Shift lag; unmapped action keys (e.g. F, Space, J) are strictly penalized as strikes."
      ],
      "ja": [
        "【能力成長未割り当てポイント水色発光】レベルアップ時に未使用のステータス・スキルポイントがある場合、ホーム画面の「能力成長」ボタンが水色の呼吸発光で通知します。",
        "【リザルト立ち絵鑑賞モード】勝利およびスイカ割り画面に「立ち絵鑑賞」切り替えボタンを新設。UIカードと半透明マスクを非表示にし、小楽の立ち絵・水着差分を100%の明るさで表示可能に。",
        "【対局離脱防止確認モーダル】ブラウザの戻る/進む、マウスサイドボタン、ページ更新を検知し、進行状況と報酬の損失を防ぐ和風確認モーダルを実装。",
        "【戦闘カウントダウンタイムスタンプ永続化】ページ更新(F5)でラウンド残り秒数がリセットされる不具合を修正し、絶対タイムスタンプで正確に残り時間を継承。",
        "【QTE物理キー解析＆無効キー厳格判定】event.codeによる直接判定を導入し、Windows日本語入力(IME)やShiftキーによる引っ掛かりを解消。方向以外の無効キー入力も即座にエラーとして判定。"
      ]
    }
  },
  {
    version: "0.0.15",
    date: "2026-09-02",
    tag: "4K & Ultra-Wide RWD Calibration: Home Dialogue Proximity Anchoring & Theater Settlement Stage",
    changes: {
      "zh-Hant": [
        "【4K 與大螢幕首頁對話氣泡緊密貼頭】修復高解析度下對話氣泡鎖定頂部導致與立繪脫節浮空的問題，動態計算小樂頭頂高度並將指針精準錨定於狐耳上方。",
        "【戰鬥結算雙欄劇場舞台與立繪無裁切】解除結算立繪容器高度限制，徹底解決 4K 下雙腿腳部被推落裁切的缺陷；實作中央雙欄舞台置中排版，消除中央巨大黑洞。",
        "【4K 戰鬥主場景比例均衡校準】優化大尺寸顯示器下 Boss HUD、神諭框、立繪與玩家操作面板的縱向比例與間距，呈現更具張力的對決體驗。"
      ],
      "zh-Hans": [
        "【4K 与大屏幕首页对话气泡紧密贴头】修复高分辨率下对话气泡锁定顶部导致与立绘脱节浮空的问题，动态计算小乐头顶高度并将指针精准锚定于狐耳上方。",
        "【战斗结算双栏剧场舞台与立绘无裁切】解除结算立绘容器高度限制，彻底解决 4K 下双腿脚部被推落裁切的缺陷；实作中央双栏舞台居中排版，消除中央巨大黑洞。",
        "【4K 战斗主场景比例均衡校准】优化大尺寸显示器下 Boss HUD、神谕框、立绘与玩家操作面板的纵向比例与间距，呈现更具张力的对决体验。"
      ],
      "en": [
        "【4K & Ultra-Wide Home Dialogue Bubble Proximity Anchoring】Fixed an issue where speech bubbles stayed locked near the top header on high-resolution screens; bubbles now anchor dynamically right above Little Raku's head with arrow pointing to her ears.",
        "【Victory Settlement Centered Stage & Full Standee Visibility】Decoupled settlement standee vertical constraints to prevent feet cutoff on 4K displays and introduced a centered dual-column stage eliminating vast empty voids.",
        "【4K Combat Arena Proportional Calibration】Balanced Boss HUD, round oracle, standee, and player controls on large monitors for a majestic and responsive battle presentation."
      ],
      "ja": [
        "【4K・大画面ホーム画面吹き出し頭部追従】高解像度環境で吹き出しが上部に固定されて立ち絵と乖離する問題を修正し、小楽の頭頂部・狐耳の真上へ的確に指すよう動的アンカーを実装。",
        "【勝利リザルト中央シアター配置＆立ち絵全身表示】リザルト立ち絵の縦制限を解除し、4K環境で足元が見切れる不具合を解消。左右カードと立ち絵を中央舞台に収容し広大な余白を最適化。",
        "【4K戦闘画面バランス調整】大画面でのBoss HUD、神託枠、立ち絵、操作UIの縦方向比率を再調整し、より迫力ある和風対決画面を構成。"
      ]
    }
  },
  {
    version: "0.0.14",
    date: "2026-09-02",
    tag: "RWD Regression Gate, Tablet Battle Positioning & Expanded Wide Dojo Workspace",
    changes: {
      "zh-Hant": [
        "【平板與緊湊直向戰鬥控制定位修復】修復 768×1024 平板等直向版型下玩家 HUD、手勢選擇器與快捷欄因包含塊變形導致向左偏移裁切的問題，確保控制按鈕等寬對齊且無外溢。",
        "【寬螢幕道場工作區置中擴展】於 ≥1280px 螢幕將修練道場題目與方向盤工作區由 820px 置中擴展至 1040px，按鈕尺寸同步優化放大，提供更寬敞舒適的操作體驗。",
        "【跨引擎 RWD 契約回歸門檻】建立全自動三引擎（Chromium / Firefox / WebKit）2,286 案例回歸驗收門檻，嚴格保護四向裁切、遮擋、必要控制可達性與動畫狀態穩定。"
      ],
      "zh-Hans": [
        "【平板与紧凑直向战斗控制定位修复】修复 768×1024 平板等直向版型下玩家 HUD、手势选择器与快捷栏因包含块变形导致向左偏移裁切的问题，确保控制按钮等宽对齐且无外溢。",
        "【宽屏幕道场工作区居中扩展】于 ≥1280px 屏幕将修炼道场题目与方向盘工作区由 820px 居中扩展至 1040px，按钮尺寸同步优化放大，提供更宽敞舒适的操作体验。",
        "【跨引擎 RWD 契约回归门槛】建立全自动三引擎（Chromium / Firefox / WebKit）2,286 案例回归验收门槛，严格保护四向裁切、遮挡、必要控制可达性与动画状态稳定。"
      ],
      "en": [
        "【Tablet Portrait Battle Control Positioning Fix】Fixed a containing-block transform issue on 768x1024 portrait layouts causing player HUD and hand selector to shift left and clip, restoring aligned and fully reachable controls.",
        "【Wide Screen Dojo Workspace Centering & Expansion】Expanded the Dojo QTE workspace and direction pads on screens ≥1280px from 820px to a centered 1040px with scaled direction buttons for an enhanced practice experience.",
        "【Cross-Engine RWD Regression Verification Gate】Established a 2,286-case regression test gate across Chromium, Firefox, and WebKit ensuring clipping, occlusion, reachability, and animation invariants are protected."
      ],
      "ja": [
        "【タブレット縦向き戦闘UIの配置修正】768×1024等の縦向きタブレット環境で包含ブロックの変形によりプレイヤーHUDや手勢選択枠が左にズレて見切れていた問題を修正し、均等幅で操作可能な配置に復元。",
        "【ワイド画面向け道場ワークスペースの中央配置と拡大】1280px以上の大画面において、修練道場の問題・方向パッド表示幅を820pxから1040pxへ中央揃えで拡大し、ボタン視認性と操作性を向上。",
        "【クロスエンジンRWDリグレッション検証ゲート確立】Chromium・Firefox・WebKitの3エンジン全2,286ケースに及ぶ自動回帰検証ゲートを整備し、表示崩れや到達不能、アニメーション安定性を厳格に保証。"
      ]
    }
  },
  {
    version: "0.0.13",
    date: "2026-08-31",
    tag: "Battle RWD Calibration: Portrait Standee Elevation & Landscape Dialogue Centering",
    changes: {
      "zh-Hant": [
        "【平板直向立繪高度抬升】修復 iPad 直向（834x1194 等）模式下小樂立繪過度沉底的問題，基準線調高至中央黃金分割點，消除中央大面積留白發空。",
        "【橫向對話框置中與尺寸修復】徹底修復橫向與短螢幕模式下對話框向左偏離螢幕 50% 造成裁切的排版 Bug，保持左右對稱置中且文字舒適排版。",
        "【猜拳儀表板安全避讓小樂面部】緊湊優化橫向模式下回合儀表板尺寸與立繪定位，確保小樂面部、五官與狐耳 100% 完整顯露，無任何圖層遮擋。"
      ],
      "zh-Hans": [
        "【平板直向立绘高度抬升】修复 iPad 直向（834x1194 等）模式下小乐立绘过度沉底的问题，基准线调高至中央黄金分割点，消除中央大面积留白发空。",
        "【横向对话框居中与尺寸修复】彻底修复横向与短屏幕模式下对话框向左偏离屏幕 50% 造成裁切的排版 Bug，保持左右对称居中且文字舒适排版。",
        "【猜拳仪表板安全避让小乐面部】紧凑优化横向模式下回合仪表板尺寸与立绘定位，确保小乐面部、五官与狐耳 100% 完整显露，无任何图层遮挡。"
      ],
      "en": [
        "【Tablet Portrait Standee Elevation】Elevated Little Raku's sprite baseline on portrait tablets (iPad 834x1194, etc.) to the central golden ratio, eliminating empty vertical gaps.",
        "【Landscape Dialogue Box Centering Fix】Fixed a critical layout bug where the dialogue box shifted 50% off-screen to the left on landscape/compact screens; now perfectly centered and symmetrical.",
        "【Round Oracle Facial Clearance】Streamlined the round oracle card and adjusted landscape standee placement to ensure Little Raku's face, ears, and expressions are 100% visible with zero overlay obstruction."
      ],
      "ja": [
        "【タブレット縦向き立ち絵の高さ引き上げ】iPad縦向き（834x1194など）で小楽の立ち絵が下に沈みすぎて中央に余白ができていた問題を修正し、画面中央の黄金比へ引き上げ。",
        "【横向き会話ウィンドウ中央揃え修復】横向き・短画面環境で会話枠が左へ50%ズレて見切れていたバグを解消し、左右対称の美しい中央揃えに復元。",
        "【じゃんけんラウンド枠と小楽顔グラの被り解消】横向きでのラウンド表示枠と立ち絵位置を微調整し、小楽の顔・耳・表情が一切隠れず美しく表示されるよう安全余白を確保。"
      ]
    }
  },
  {
    version: "0.0.12",
    date: "2026-08-31",
    tag: "Full State Persistence Across Page Refresh & Auto-Battle Continuity",
    changes: {
      "zh-Hant": [
        "【全頁面重新整理狀態保留】任何頁面（能力成長、緣側商店、狐娘圖鑑、修練道場、戰績紀錄等）在重新整理（F5 / 重新載入）後，100% 保持在最後停留位置，不產生畫面跳轉。",
        "【子頁籤與篩選器持久化】能力成長的配點/技能樹頁籤、緣側商店的裝備/道具分類篩選、圖鑑立繪差分等設定即時儲存，重載後完美還原。",
        "【戰鬥中與自動掛機無縫接續】手動戰鬥或自動刷關中重新整理時，精確保留玩家與 Boss 當前血量、魔力、回合數、自動掛機輪次勝負紀錄與切西瓜庫存累計亮燈，無縫接續戰鬥。"
      ],
      "zh-Hans": [
        "【全页面重新整理状态保留】任何页面（能力成长、缘侧商店、狐娘图鉴、修炼道场、战绩纪录等）在重新整理（F5 / 重新载入）后，100% 保持在最后停留位置，不产生画面跳转。",
        "【子标签与筛选器持久化】能力成长的配点/技能树标签、缘侧商店的装备/道具分类筛选、图鉴立绘差分等设定实时储存，重载后完美还原。",
        "【战斗中与自动挂机无缝接续】手动战斗或自动刷关中重新整理时，精确保留玩家与 Boss 当前血量、魔力、回合数、自动挂机轮次胜负纪录与切西瓜库存累计亮灯，无缝接续战斗。"
      ],
      "en": [
        "【Full Page State Persistence on Refresh】Refreshing the page (F5 / reload) from any screen (Growth, Shop, Gallery, Dojo, Records, etc.) preserves your exact location with zero disruptive screen jumps.",
        "【Subtab & Filter Continuity】Growth tabs (Stats vs Skills), Shop category filters (Potions, Weapons, Armor, Accessories), and Gallery variant selections are automatically saved and restored.",
        "【Seamless Battle & Auto-Battle Continuity】Refreshing during manual or auto-battles perfectly preserves player and boss HP/MP, current round, auto-battle progress/win-loss stats, and accumulated watermelon slices."
      ],
      "ja": [
        "【リロード時の全画面状態維持】どの画面（能力成長、ショップ、図鑑、道場、戦績など）でページを再読み込み（F5）しても、画面遷移を起こさず最後にいた場所を100%保持。",
        "【タブ・フィルター状態の永続化】能力成長のステータス/スキルタブ、ショップのカテゴリ絞り込み、図鑑の差分選択などが即座に保存され、リロード後も正確に復元。",
        "【戦闘中・自動周回のシームレス再開】手動戦闘や自動周回中にリロードしても、プレイヤーとBossの現在HP/MP、ラウンド数、自動周回勝敗数、スイカ割りストック点灯数を完全保持して戦闘を続行。"
      ]
    }
  },
  {
    version: "0.0.11",
    date: "2026-08-31",
    tag: "Tablet Landscape Desktop-Like Spacious Layout & Overlap Fix",
    changes: {
      "zh-Hant": [
        "【平板橫放寬螢幕佈局優化】重構 iPad Pro（11 吋/12.9 吋）與 Android 平板在橫向模式下的視覺佈局，擁有與電腦版一致之寬敞大氣空間。",
        "【首頁標題單行大氣呈現】修正主標題「狐樂・絆之勝負」在橫放平板時文字折行（「負」被擠至第二行）的問題，實裝單行防折行與流體字級縮放。",
        "【戰鬥場景元素重疊徹底修復】修復舊版絕對定位導致回合儀表板與 Boss 血條及角色面部重疊的 Bug，重塑垂直層次結構，消除元素碰撞。"
      ],
      "zh-Hans": [
        "【平板横放宽屏幕布局优化】重构 iPad Pro（11 吋/12.9 吋）与 Android 平板在横向模式下的视觉布局，拥有与电脑版一致之宽敞大气空间。",
        "【首页标题单行大气呈现】修正主标题「狐乐・绊之胜负」在横放平板时文字折行（「负」被挤至第二行）的问题，实装单行防折行与流体字级缩放。",
        "【战斗场景元素重叠彻底修复】修复旧版绝对定位导致回合仪表板与 Boss 血条及角色面部重叠的 Bug，重塑垂直层次结构，消除元素碰撞。"
      ],
      "en": [
        "【Tablet Landscape Spacious Layout】Redesigned the landscape layout for iPad Pro (11\"/12.9\") and Android tablets to provide a spacious, desktop-like immersive layout.",
        "【Home Title Single-Line Fix】Resolved an issue where the main title wrapped onto a second line on landscape tablets; now guaranteed to display cleanly on a single line with fluid typography.",
        "【Battle Scene Overlap Elimination】Completely removed legacy hardcoded positioning that caused the round oracle box to overlap the boss health bar and character face, restoring clean vertical layering."
      ],
      "ja": [
        "【タブレット横向き大画面レイアウト最適化】iPad Pro（11/12.9インチ）およびAndroidタブレットの横向き表示をPC版同様に開放感あふれるレイアウトへ全面刷新。",
        "【タイトル改行崩れ修正】横向きタブレットでメインタイトル「狐樂・絆之勝負」が途中で改行されていた問題を修正し、常に1行で美しく表示されるよう流体タイポグラフィを適用。",
        "【戦闘画面の要素重複解消】ラウンド通知枠とBossHPゲージ・キャラクター顔グラフィックが重なっていたレガシー絶対配置バグを完全解消し、階層構造を整理。"
      ]
    }
  },
  {
    version: "0.0.10",
    date: "2026-08-31",
    tag: "iPad Touch D-Pad Fix, Swipe QTE & Physical Keyboard Support",
    changes: {
      "zh-Hant": [
        "【iPad 與平板觸控方向盤修復】修正 CSS @media 選擇器語法導致 Safari 丟棄樣式塊之問題，確保 iPad Pro 11 吋/12.9 吋 (iPadOS Safari) 及各類平板在 QTE 反制時 100% 顯示方向按鍵。",
        "【QTE 8 方向手指滑動手勢輸入】全移動裝置（iOS/Android 手機與平板）現可直接在 QTE 反制畫面中用手指朝 8 方向滑動反制出拳，並完整保留虛擬按鍵點擊玩法，雙軌模式支援左右手分區獨立多指滑動。",
        "【外接實體鍵盤完全相容支援】平板與手機連接 Magic Keyboard 或藍牙鍵盤時，自動允許使用實體 WASD、方向鍵、數字鍵與所有快捷鍵（F、空白鍵、ESC）暢玩遊戲。"
      ],
      "zh-Hans": [
        "【iPad 与平板触控方向盘修复】修正 CSS @media 选择器语法导致 Safari 丢弃样式块之问题，确保 iPad Pro 11 吋/12.9 吋 (iPadOS Safari) 及各类平板在 QTE 反制时 100% 显示方向按键。",
        "【QTE 8 方向手指滑动势输入】全移动设备（iOS/Android 手机与平板）现可直接在 QTE 反制画面中用手指朝 8 方向滑动反制出拳，并完整保留虚拟按键点击玩法，双轨模式支援左右手分区独立多指滑动。",
        "【外接实体键盘完全相容支援】平板与手机连接 Magic Keyboard 或蓝牙键盘时，自动允许使用实体 WASD、方向键、数字键与所有快捷键（F、空白键、ESC）畅玩游戏。"
      ],
      "en": [
        "【iPad & Tablet Touch D-Pad Fix】Resolved a CSS @media selector parsing issue in Safari/WebKit, ensuring iPad Pro 11\"/12.9\" (iPadOS Safari) and all touch tablets reliably display on-screen QTE D-pad buttons.",
        "【8-Direction Swipe Gesture QTE】All mobile and tablet devices (iOS & Android) now support swiping in 8 directions across the counter area to execute QTE inputs, seamlessly coexisting with virtual buttons, plus multi-finger split-screen dual swiping.",
        "【Physical Keyboard Full Support】Connecting a Magic Keyboard or Bluetooth keyboard to tablets/phones now allows full use of physical arrow keys, WASD, numpad, and hotkeys (F, Space, ESC) exactly like desktop."
      ],
      "ja": [
        "【iPad・タブレット用QTE方向キー表示修正】Safari/WebKitにおけるCSS @media構文エラーを修正し、iPad Pro 11/12.9インチ（iPadOS Safari）や各種タブレットでQTE時に方向キーが確実に表示されるよう修正。",
        "【8方向スワイプジェスチャー入力対応】iOS/Androidのスマホ・タブレット全機種において、QTE画面で8方向に指をスワイプして反制入力が可能に（従来の仮想ボタンタップ操作も併用可能、デュアルQTE時の2本指独立スワイプ対応）。",
        "【外付け物理キーボード完全対応】iPadやスマホにMagic KeyboardやBluetoothキーボードを接続時、矢印キー・WASD・テンキーおよび各種ショートカット（F、Space、ESC）がPC版同様に即座に利用可能。"
      ]
    }
  },
  {
    version: "0.0.9",
    date: "2026-08-31",
    tag: "Dual QTE Desktop Layout & Input Failure Fix",
    changes: {
      "zh-Hant": [
        "【桌面版雙 QTE 邊框自適應修復】修正第 4 關雙生破綻與修練場雙軌模式在桌面版寬螢幕下，7 鍵序列因方塊過大而超出卡片邊框的問題，全面實裝響應式等比縮放與邊界保護。",
        "【QTE 斜向按錯判定失敗修復】修復目標為斜向方向時輸入無效正方向（如面對 ↗ 按下 ↓ 或 ←）被靜默忽略的漏洞，按錯立即扣減容錯次數並在達到上限時判定失敗。"
      ],
      "zh-Hans": [
        "【桌面版双 QTE 边框自适应修复】修正第 4 关双生破绽与修练场双轨模式在桌面版宽屏幕下，7 键序列因方块过大而超出卡片边框的问题，全面实装响应式等比缩放与边界保护。",
        "【QTE 斜向按错判定失败修复】修复目标为斜向方向时输入无效正方向（如面对 ↗ 按下 ↓ 或 ←）被静默忽略的漏洞，按错立即扣减容错次数并在达到上限时判定失败。"
      ],
      "en": [
        "【Dual QTE Desktop Layout Fix】Resolved the 7-arrow sequence overflowing the dual-track card boundaries on desktop screens in Stage 4 and Dojo mode with adaptive responsive scaling and boundary containment.",
        "【QTE Diagonal Input Failure Fix】Fixed a flaw where pressing invalid cardinal keys (e.g. pressing ↓ or ← on ↗) during diagonal QTE prompts was silently ignored; wrong inputs now correctly decrement error allowance and trigger failure when reaching max errors."
      ],
      "ja": [
        "【PC版デュアルQTE枠外はみ出し修正】第4章の双生破綻および道場双軌モードにおいて、7キー連続入力時にアイコンがカード枠外へはみ出す問題を解消し、レスポンシブ縮小と境界保護を適用。",
        "【QTE斜め入力時のミス判定修正】斜め入力（↗など）に対して無効な正方向キー（↓や←など）を押した際に判定が無視されていた不具合を修正し、ミス回数の加算および上限到達時の失敗判定を厳格化。"
      ]
    }
  },
  {
    version: "0.0.8",
    date: "2026-08-31",
    tag: "Tablet Touch D-Pad & Player HUD Fix",
    changes: {
      "zh-Hant": [
        "【平板觸控方向盤支援】修正 iPad、Android 平板與觸控螢幕被當作電腦鍵盤裝置的問題，全域啟用八方向與雙軌觸控方向盤。",
        "【玩家 HUD 雙行網格排版】重塑玩家 HUD 為雙行自適應網格，徹底根除 ATK 標籤與等級、血量數值碰撞重疊問題。",
        "【提示框與對話框層次優化】將 Toast 系統通知移至螢幕頂部，徹底杜絕提示訊息覆蓋底部血條、對話框與快捷欄。",
        "【修練場雙軌方向盤補完】修練場雙生假人練習模式同步支援雙軌觸控方向盤。"
      ],
      "zh-Hans": [
        "【平板触控方向盘支援】修正 iPad、Android 平板与触控屏幕被当作电脑键盘装置的问题，全局启用八方向与双轨触控方向盘。",
        "【玩家 HUD 双行网格排版】重塑玩家 HUD 为双行自适应网格，彻底根除 ATK 标签与等级、血量数值碰撞重叠问题。",
        "【提示框与对话框层次优化】将 Toast 系统通知移至屏幕顶部，彻底杜绝提示讯息覆盖底部血条、对话框与快捷栏。",
        "【修练场双轨方向盘补完】修练场双生假人练习模式同步支援双轨触控方向盘。"
      ],
      "en": [
        "【Tablet Touch D-Pad Support】Fixed tablets (iPad, Android, Surface) being misclassified as desktop PCs; on-screen 8-direction and dual D-pads are now fully accessible.",
        "【Player HUD 2-Row Grid Layout】Redesigned player HUD to a 2-row adaptive grid to permanently eliminate ATK badge overlaps with Level and HP numbers.",
        "【Toast Notification Re-anchoring】Moved toast system alerts to the top of the viewport to prevent obscuring bottom combat gauges, quick slots, and dialogue.",
        "【Dojo Dual Touch D-Pad】Added dual on-screen touch pads to Dojo Training Mode for touchscreen users."
      ],
      "ja": [
        "【タブレット向けタッチパッド対応】iPad や Android タブレットがPCと誤判定されキーボード入力を要求される問題を修正し、全方向タッチパッドを常時利用可能に。",
        "【プレイヤーHUDの2行グリッド化】プレイヤーHUDを2行構造に刷新し、ATKバッジとレベル・HP数値の重なりを完全解消。",
        "【トースト通知の配置適正化】システム通知（Toast）を画面上部に移動し、下部のHPバー・会話枠・ショートカットへの干渉を防止。",
        "【修練道場のデュアルパッド追加】道場モードの双軌練習にもデュアルタッチ方向パッドを実装。"
      ]
    }
  },
  {
    version: "0.0.7",
    date: "2026-08-31",
    tag: "Mobile Visual & RWD Precision Overhaul",
    changes: {
      "zh-Hant": [
        "【手機版戰鬥排版精準重構】重新計算關卡標籤、撤退按鈕、Boss 血條、回合神諭、傷害日誌與立繪之絕對垂直間距，徹底解決元素疊層與遮擋問題。",
        "【血量數值右側自適應對齊】全面強制 `.hud-name` 採單行無換行排版與 `margin-left: auto` 右側對齊，根除血量數值擠壓換行問題。",
        "【第四關雙 Boss 卡片雙行排版】重塑雙生 Boss 狀態卡為網格雙行架構，保證各尺寸手機均完整展示名稱與 ATK 數值，永不裁切。",
        "【CSS 快取深度更新】全域 CSS 檔案附加全新快取版本戳記，確保 iOS Safari 與行動端即時載入最新設計樣式。"
      ],
      "zh-Hans": [
        "【手机版战斗排版精准重构】重新计算关卡标签、撤退按钮、Boss 血条、回合神谕、伤害日志与立绘之绝对垂直间距，彻底解决元素叠层与遮挡问题。",
        "【血量数值右侧自适应对齐】全面强制 `.hud-name` 采用单行无换行排版与 `margin-left: auto` 右侧对齐，根除血量数值挤压换行问题。",
        "【第四关双 Boss 卡片双行排版】重塑双生 Boss 状态卡为网格双行架构，保证各尺寸手机均完整展示名称与 ATK 数值，永不裁切。",
        "【CSS 缓存深度更新】全局 CSS 文件附加全新缓存版本时间戳，确保 iOS Safari 与移动端即时加载最新设计样式。"
      ],
      "en": [
        "【Mobile Combat Layout Precision Overhaul】Recalculated vertical spacing for stage tag, exit button, Boss HUD, round oracle, damage log, and character sprites to completely eliminate overlaps.",
        "【HP Text Auto Right Alignment】Enforced flex single-row layout with `margin-left: auto` across all HUD bars, eliminating multi-line number stacking.",
        "【Stage 4 Dual Boss Card Grid】Refactored dual boss cards into an adaptive 2-row grid to guarantee complete visibility without edge clipping.",
        "【CSS Cache Buster Refresh】Refreshed CSS cache query timestamps across all stylesheet links to ensure immediate mobile browser rendering."
      ],
      "ja": [
        "【モバイル戦闘画面の精密レイアウト再構築】章タグ、撤退ボタン、ボスHPバー、ラウンド神託、ダメージログ、立ち絵の垂直配置を完全再計算し、重なりを解消。",
        "【HP数値の右揃え適応】`.hud-name` を1行フレックス化し `margin-left: auto` で右端に整列させ、数値の折り返し重なりを根絶。",
        "【第4章デュアルボスの2行グリッド化】デュアルボスのカードを2行構造に刷新し、画面幅に関わらず名前とATK数値が完全表示されるよう改善。",
        "【CSSキャッシュ更新】全スタイルシートのキャッシュパラメータを刷新し、iOS Safari 等の端末で即座に最新デザインが反映されるように対応。"
      ]
    }
  },
  {
    version: "0.0.6",
    date: "2026-08-31",
    tag: "UI & Audio Refactor",
    changes: {
      "zh-Hant": [
        "【戰鬥介面優化】重構手機版戰鬥排版：Boss 血條與玩家 HUD 採彈性水平對齊，徹底修復血量與魔力數值文字重疊問題。",
        "【第四關卡片防裁切】優化雙 Boss 狀態卡為雙行自適應排版，防止右側敵人卡片與 ATK 數值於手機螢幕邊緣被裁切。",
        "【小樂立繪與回合介面層次】微調小樂立繪垂直置中比例，避免與 Boss 血條、回合儀表及傷害日誌重疊。",
        "【更新日誌系統】點擊首頁版本號即可開啟獨立和風歷史更新日誌視窗，完整記錄所有版本歷程。",
        "【iOS 音訊防搶佔】將 AudioSession 模式切換為 Ambient 模式，不再打斷或暫停玩家於背景播放的 YouTube 或音樂 App。"
      ],
      "zh-Hans": [
        "【战斗界面优化】重构手机版战斗排版：Boss 血条与玩家 HUD 采用弹性水平对齐，彻底修复血量与魔力数值文字重叠问题。",
        "【第四关卡片防裁切】优化双 Boss 状态卡为双行自适应排版，防止右侧敌人卡片与 ATK 数值于手机屏幕边缘被裁切。",
        "【小乐立绘与回合界面层次】微调小乐立绘垂直置中比例，避免与 Boss 血条、回合仪表及伤害日志重叠。",
        "【更新日志系统】点击首页版本号即可开启独立和风历史更新日志视窗，完整记录所有版本历程。",
        "【iOS 音频防抢占】将 AudioSession 模式切换为 Ambient 模式，不再打断或暂停玩家在后台播放的 YouTube 或音乐 App。"
      ],
      "en": [
        "【Combat UI Refactor】Completely redesigned mobile combat HUD: flex layout for Boss and Player bars, fixing overlapping HP/MP text.",
        "【Stage 4 Dual Boss Fix】Applied 2-row adaptive layout for dual Boss cards to prevent right-edge clipping on mobile screens.",
        "【Character Layering】Fine-tuned Kohaku's sprite positioning to eliminate overlap with the Boss bar, round oracle, and damage logs.",
        "【Changelog Modal】Clicking the version badge opens a dedicated Japanese Shrine-style patch notes modal.",
        "【iOS Background Audio Fix】Configured AudioSession to Ambient mode so game sounds will no longer interrupt or pause YouTube/Spotify."
      ],
      "ja": [
        "【戦闘画面UI最適化】モバイル版の戦闘レイアウトを再構築：ボスHPバーとプレイヤーHUDの重なり不具合を完全修正。",
        "【第4章デュアルボス表示改善】2行適応型レイアウトにより、右側ボスのカードとATK数値が見切れる問題を解消。",
        "【立ち絵とラウンド表示の階層調整】小楽の立ち絵位置を微調整し、HPバー・ラウンド計器・ダメージログとの重なりを防止。",
        "【更新履歴モーダル】バージョン番号をタップすることで、和風デザインの更新履歴一覧ウィンドウを表示可能に。",
        "【iOS オーディオ改善】AudioSession を Ambient モードに変更し、YouTube や音楽のバックグラウンド再生を中断しないように改善。"
      ]
    }
  },
  {
    version: "0.0.5",
    date: "2026-08-31",
    tag: "iOS Safari Audio Fix",
    changes: {
      "zh-Hant": [
        "【iOS Web Audio 深度防護】加入 scheduler 防時鐘積壓重置機制，徹底解決切換 App 或背景節流時節點爆炸崩潰問題。",
        "【中斷自動恢復】註冊 context.onstatechange 與多重手勢喚醒鏈，支援 interrupted 狀態自動恢復。",
        "【合成器安全邊界】全面防護 AudioParam 自動化曲線時間，避免傳入過去時間導致 Safari 拋錯無聲。"
      ],
      "zh-Hans": [
        "【iOS Web Audio 深度防护】加入 scheduler 防时钟积压重置机制，彻底解决切换 App 或后台节流时节点爆炸崩溃问题。",
        "【中断自动恢复】注册 context.onstatechange 与多重手势唤醒链，支持 interrupted 状态自动恢复。",
        "【合成器安全边界】全面防护 AudioParam 自动化曲线时间，避免传入过去时间导致 Safari 报错无声。"
      ],
      "en": [
        "【iOS Web Audio Hardening】Added scheduler clock catch-up guard to prevent audio node backlog and engine crash upon backgrounding.",
        "【Interruption Auto-Recovery】Attached statechange and multi-gesture listeners to seamlessly resume from interrupted state.",
        "【AudioParam Safety】Enforced safe future time limits on all parameter automation curves."
      ],
      "ja": [
        "【iOS Web Audio 強化】スケジューラーのクロック遅延防止ガードを追加し、バックグラウンド復帰時のクラッシュを防止。",
        "【中断自動復帰】onstatechange と各種タッチイベントによる自動再開処理を追加。",
        "【AudioParam 安全対策】過去時間へのスケジューリング例外を防止するタイムクランプを実装。"
      ]
    }
  },
  {
    version: "0.0.4",
    date: "2026-08-31",
    tag: "Damage Log & Dual QTE",
    changes: {
      "zh-Hant": [
        "【傷害紀錄純淨化】全面在地化最近 5 筆傷害來源文字（如【猜拳獲勝】、【變拳克制】），杜絕顯示程式碼變數。",
        "【結算畫面隱藏】於對戰勝利或失敗結算時自動隱藏並清空即時傷害日誌，保持畫面乾淨整潔。",
        "【修練道場優化】清理首頁重複之修練場按鈕，保留目錄第 08 項修練道場。",
        "【雙軌 QTE 嚴格隔離】WASD 專屬左軌、方向鍵專屬右軌，兩側獨立判定且絕不互相干擾。"
      ],
      "zh-Hans": [
        "【伤害纪录纯净化】全面本地化最近 5 笔伤害来源文字，杜绝显示代码变量名。",
        "【结算画面隐藏】对局胜利或失败结算时自动隐藏并清空即时伤害日志。",
        "【修炼道场优化】清理首页重复之修炼场按钮，保留目录第 08 项修炼道场。",
        "【双轨 QTE 严格隔离】WASD 专属左轨、方向键专属右轨，两侧独立判定且互不干扰。"
      ],
      "en": [
        "【Clean Damage Log】Localized all combat damage source texts naturally without exposing code variable strings.",
        "【Settlement Auto-Hide】Automatically hides and clears the damage log box during victory and defeat screens.",
        "【Dojo Button Cleanup】Removed duplicate globe Dojo button from the home footer.",
        "【Dual QTE Key Segregation】WASD strictly controls left track, Arrow keys strictly control right track."
      ],
      "ja": [
        "【ダメージログ純化】ダメージ発生源を自然な翻訳テキストに統一し、変数名の露出を完全排除。",
        "【リザルト非表示】勝敗リザルト画面表示時にダメージログを自動で非表示・初期化。",
        "【道場ボタン整理】ホーム画面フッターの重複した道場ボタンを削除し、メニュー08番に統一。",
        "【2系統QTEの独立化】WASDは左レーン、矢印キーは右レーンのみに厳格割り当て。"
      ]
    }
  },
  {
    version: "0.0.3",
    date: "2026-08-30",
    tag: "Dojo & Silhouette Sandbox",
    changes: {
      "zh-Hant": [
        "【修練道場沙盒】新增單人與雙人木人樁自訂血量與傷害模式，支援中途安全退出。",
        "【影・小樂剪影】修復修練道場影小樂黑色剪影遮罩效果。",
        "【ATK 與數值框修復】修復戰鬥介面攻擊力數值超出外框與位置重疊問題。"
      ],
      "zh-Hans": [
        "【修炼道场沙盒】新增单人与双人假人桩自定义血量与伤害模式，支持中途安全退出。",
        "【影・小乐剪影】修复修炼道场影小乐黑色剪影遮罩效果。",
        "【ATK 与数值框修复】修复战斗界面攻击力数值超出外框与位置重叠问题。"
      ],
      "en": [
        "【Dojo Training Sandbox】Added custom HP and damage settings for single and dual training dummies with safe quit.",
        "【Silhouette Shader】Fixed black shadow silhouette mask for Shadow Kohaku in the Dojo.",
        "【ATK Badge Overflow Fix】Fixed ATK number overflowing container box."
      ],
      "ja": [
        "【修練道場サンドボックス】カスタムHP・攻撃力設定可能なシングル・デュアル案山子モードを実装。",
        "【影・小楽シルエット】道場内の影・小楽に漆黒のシルエットマスクを適用。",
        "【ATK枠溢れ修正】戦闘画面の攻撃力バッジ数値の枠みだしを修正。"
      ]
    }
  },
  {
    version: "0.0.2",
    date: "2026-08-30",
    tag: "QTE & Watermelon Slicing",
    changes: {
      "zh-Hant": [
        "【雙軌 QTE 系統】第四章加入左右雙軌獨立 QTE 判定與雙手解放機制。",
        "【切西瓜小遊戲】戰勝後觸發三刀切西瓜趣味玩法，附帶動態難度遞增與額外 EXP 結算。"
      ],
      "zh-Hans": [
        "【双轨 QTE 系统】第四章加入左右双轨独立 QTE 判定与双手解放机制。",
        "【切西瓜小游戏】战胜后触发三刀切西瓜趣味玩法，附带动态难度递增与额外 EXP 结算。"
      ],
      "en": [
        "【Dual-Track QTE】Added independent dual-track QTE mechanics and two-handed liberation for Chapter 4.",
        "【Watermelon Slicing Minigame】Post-battle 3-strike watermelon slicing with dynamic difficulty scaling and bonus EXP."
      ],
      "ja": [
        "【デュアルQTEシステム】第4章向けに左右独立レーンQTEと両手解放奥義を実装。",
        "【スイカ割りミニゲーム】勝利後の3段階スイカ割り判定と動的難易度上昇・ボーナスEXP清算を導入。"
      ]
    }
  },
  {
    version: "0.0.1",
    date: "2026-08-29",
    tag: "Localization & 12-Slot Gear",
    changes: {
      "zh-Hant": [
        "【4 語系在地化】全面支援繁體中文、簡體中文、英文與日文切換。",
        "【12 格位紙娃娃】新增頭盔、胸甲、肩甲、主副手、耳環、腰帶、戒指與鞋子等 12 格位武具系統。",
        "【實時 DPS 分析】引入理論 DPS 與實戰輸出統計紀錄。"
      ],
      "zh-Hans": [
        "【4 语系本地化】全面支持繁体中文、简体中文、英文与日文切换。",
        "【12 格位纸娃娃】新增头盔、胸甲、肩甲、主副手、耳环、腰带、戒指与鞋子等 12 格位武具系统。",
        "【实时 DPS 分析】引入理论 DPS 与实战输出统计纪录。"
      ],
      "en": [
        "【Full 4-Language Localization】Added complete translations for Traditional Chinese, Simplified Chinese, English, and Japanese.",
        "【12-Slot Paperdoll Equipment】Added comprehensive gear system including Helmet, Chestplate, Weapons, Badges, and Accessories.",
        "【DPS Analytics】Introduced Theoretical and Combat DPS metrics in Journey Records."
      ],
      "ja": [
        "【4言語ローカライズ】繁体字、簡体字、英語、日本語の完全対応。",
        "【12部位装備システム】兜、胸甲、主副手武器、耳飾り、指輪、靴などの装備紙人形システムを実装。",
        "【DPS分析】理論DPSおよび実戦DPSの記録・分析機能を導入。"
      ]
    }
  },
  {
    version: "0.0.0",
    date: "2026-08-28",
    tag: "Initial Release",
    changes: {
      "zh-Hant": [
        "【遊戲初始發布】經典和風猜拳博弈、四大章節梯度 BOSS、時機變拳秘術與小樂摸摸互動。"
      ],
      "zh-Hans": [
        "【游戏初始发布】经典和风猜拳博弈、四大章节梯度 BOSS、时机变拳秘术与小乐摸摸互动。"
      ],
      "en": [
        "【Initial Release】Japanese anime shrine aesthetic, 4 Chapter Bosses, Reaction Morph mechanic, and Kohaku pet skill."
      ],
      "ja": [
        "【初回リリース】和風ダーク神社調のじゃんけん勝負、4章のボス階層、時機変拳秘術、小楽なでなでインタラクションを公開。"
      ]
    }
  }
];

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
      playerProfile: "玩家資料",
      switchLanguage: "切換語系",
      toggleBgm: "切換背景音樂",
      toggleSfx: "切換遊戲音效",
      mainMenu: "主選單",
      battleRecords: "戰績",
      footerInfo: "頁腳資訊",
      changelog: "查看更新日誌",
      galleryZoom: "放大查看全圖",
      galleryZoomTitle: "放大鑑賞 (High-Res)",
      rpsBattle: "猜拳戰鬥",
      toggleAutoBattle: "暫停或繼續自動刷關",
      kohakuHp: "小樂生命值",
      battleLogToggle: "戰鬥紀錄（點擊切換顯示規模）",
      battleLogToggleTitle: "點擊切換顯示規模：最新1筆 / 近5筆 / 全紀錄",
      roundStatus: "本回合狀態",
      playerHpMp: "玩家生命與魔力",
      selectHand: "選擇出拳",
      itemSkillBar: "道具與技能快捷欄",
      counterQte: "反制 QTE",
      directionInput: "方向輸入",
      toggleUiVisibility: "欣賞立繪，隱藏或顯示結算介面",
      toggleUiVisibilityTitle: "欣賞立繪 (隱藏/顯示介面)",
      togglePanelSize: "放大或縮小面板",
      togglePanelSizeTitle: "放大/縮小面板",
      closeOverlay: "收起浮層",
      dojoQtePractice: "修練場 QTE 練習",
      closeModal: "關閉視窗",
      clickSelectAll: "點擊全選",
      openOriginalImage: "在新分頁開啟原圖 (支援雙指縮放與下載)",
      closeGalleryZoom: "關閉放大視圖",
      closeGalleryZoomTitle: "關閉 (ESC)",
      selectRockKey: "選擇石頭 (熱鍵: 1)",
      selectPaperKey: "選擇布 (熱鍵: 2)",
      selectScissorsKey: "選擇剪刀 (熱鍵: 3)",
      selectLeftRockKey: "左手石頭 (熱鍵: 1 或 Q)",
      selectLeftPaperKey: "左手布 (熱鍵: 2 或 W)",
      selectLeftScissorsKey: "左手剪刀 (熱鍵: 3 或 E)",
      selectRightRockKey: "右手石頭 (熱鍵: 7 或 J 或 Num1)",
      selectRightPaperKey: "右手布 (熱鍵: 8 或 K 或 Num2)",
      selectRightScissorsKey: "右手剪刀 (熱鍵: 9 或 L 或 Num3)",
      useHpPotionKey: "使用 HP 藥水 (熱鍵: 4 或 Q)",
      useMorphKey: "一秒內變拳 (熱鍵: F)",
      useMpPotionKey: "使用 MP 藥水 (熱鍵: 5 或 E)",

      home: "首頁",
      level: "等級",
      xp: "經驗",
      changelogTitle: "更新日誌",
      changelogSubtitle: "遊戲版本迭代與修復紀錄",
      closeChangelog: "關閉",
      currentVersion: "當前版本",
      currentVersionStatus: "已上線運行",
      coins: "星砂",
      soundToggle: "切換遊戲音效",
      sfxToggle: "切換遊戲音效",
      musicToggle: "切換背景音樂",
      musicToggleOn: "開啟背景音樂",
      musicToggleOff: "靜音背景音樂",
      sfxToggleOn: "開啟遊戲音效",
      sfxToggleOff: "靜音遊戲音效",
      musicOnToast: "背景音樂已開啟。",
      musicOffToast: "背景音樂已關閉。",
      sfxOnToast: "遊戲音效已開啟。",
      sfxOffToast: "遊戲音效已關閉。",
      rewardEarned: "獲得獎勵",
      zoomHighRes: "放大鑑賞",
      galleryDiffToggle: "差分",
      galleryDiffDefault: "預設泳裝",
      galleryDiffWatermelon: "切西瓜差分",
      clickToZoom: "點擊全螢幕放大查看",
      closeLightbox: "關閉視圖",
      langToggle: "語系",
      back: "返回",
      wins: "勝",
      losses: "敗",
      deepestStage: "最深章節",
      receptionSeal: "對戰<br>受付中",
      openCheat: "測試調試 / 作弊選單",
      cheatAuthTitle: "作弊驗證",
      cheatAuthPrompt: "請輸入管理密碼以開啟測試選單：",
      cheatAuthPlaceholder: "輸入密碼 (8989)",
      cheatAuthConfirm: "解鎖選單",
      cheatAuthCancel: "取消",
      cheatAuthError: "密碼錯誤！無法開啟作弊選單。",
      cheatAuthSuccess: "密碼正確，作弊選單已解鎖！",
      galleryUnlockedTag: "已解鎖",
      galleryLockedTag: "尚未解鎖",
      resetSave: "重置存檔",
      resetConfirm: "確定要重置所有存檔進度嗎？此操作無法還原。",
      saveRecord: "存檔紀錄",
      saveRecordModalTitle: "存檔紀錄與種子碼管理",
      saveOverviewTitle: "當前存檔狀態概覽",
      saveOverviewLevel: "冒險等級",
      saveOverviewCoins: "持有星砂",
      saveOverviewStage: "最深章節",
      saveOverviewBattles: "總對局場次",
      saveOverviewEquipCount: "裝備持有",
      btnViewRecordsDetail: "查看戰績統計詳情 ›",
      saveRecordsHint: "存檔種子碼會完整保存所有冒險歷程、全章節戰績、手動/自動勝敗紀錄、歷程 DPS 分析與西瓜切中統計，跨裝置載入時將全部無損還原。",
      saveSeedExportTitle: "導出當前存檔種子碼",
      saveSeedExportDesc: "此字串包含您當前所有的等級、裝備、星砂、配點與戰績紀錄，可用於備份或跨裝置轉移：",
      btnCopySaveSeed: "複製種子碼",
      toastSeedCopied: "存檔種子碼已成功複製到剪貼簿！",
      saveSeedImportTitle: "輸入種子碼（跨裝置載入）",
      saveSeedImportDesc: "貼上其他裝置匯出的存檔種子碼，即可將冒險紀錄帶到本裝置：",
      importSeedPlaceholder: "在此貼上存檔種子碼（如 KORAKU1_...）",
      btnImportSaveSeed: "載入並套用種子碼",
      confirmImportSeed: "載入此種子碼將會覆蓋本裝置當前的存檔進度，確定要載入嗎？",
      confirmAbandonBattle: "現在撤退將不會得到星砂或經驗，確定離開嗎？",
      toastImportSuccess: "存檔種子碼已成功載入並套用！",
      toastImportFailed: "無效或損毀的存檔種子碼，請檢查是否複製完整。",
      toastSeedEmpty: "請先輸入或貼上存檔種子碼。",
      dangerZoneTitle: "存檔重置與刪除管理",
      dangerZoneDesc: "清除本裝置上的所有遊戲進度（等級、星砂、裝備、技能與戰績），回歸初始狀態：",
      btnModalResetSave: "重置存檔（清除所有紀錄）",
      // Online connection, transfer code, export, delete
      connConnecting: "連線中",
      connOnline: "線上連線",
      connOffline: "離線模式",
      connReconnecting: "重新連線中",
      connDisconnected: "連線中斷",
      connBannerConnecting: "正在連線至伺服器...",
      connBannerOnline: "已連線至權威伺服器",
      connBannerOffline: "目前處於本機離線沙盒模式",
      connBannerReconnecting: "連線中斷，正在嘗試重新連線...",
      connBannerDisconnected: "已與伺服器斷開連線",
      connectionModeToggle: "切換連線模式",
      connectionErrorVersionMismatch: "版本不符，請重新整理頁面載入最新版本。",
      connectionRateLimited: "操作過於頻繁，請稍後再試。",
      transferCode: "轉移碼",
      transferCodeModalTitle: "帳號跨裝置轉移碼管理",
      transferCodeIssueTitle: "簽發一次性轉移碼",
      transferCodeIssueDesc: "簽發一次性轉移碼，可在新裝置上輸入以遷移此帳號的所有進度。簽發後有效時間為 15 分鐘。",
      btnIssueTransferCode: "產生轉移碼",
      transferCodePrompt: "您的轉移碼如下（點擊複製）：",
      transferCodeExpiresIn: "有效期限：{minutes} 分鐘",
      btnCopyTransferCode: "複製轉移碼",
      toastTransferCodeCopied: "轉移碼已複製至剪貼簿！",
      transferCodeClaimTitle: "兌換轉移碼（移轉至此裝置）",
      transferCodeClaimDesc: "在下方輸入由原裝置簽發的轉移碼，此裝置將綁定並接收該帳號的所有進度：",
      transferCodePlaceholder: "輸入 8 位數轉移碼（如 KTR-XXXX-XXXX）",
      btnClaimTransferCode: "兌換並載入進度",
      confirmClaimTransferCode: "兌換轉移碼將會切換至該帳號，確定要兌換嗎？",
      toastTransferCodeSuccess: "帳號轉移成功！已載入最新存檔進度。",
      toastTransferCodeInvalid: "無效或已過期的轉移碼，請重新核對或重新簽發。",
      exportJson: "資料匯出 (JSON)",
      exportJsonTitle: "匯出完整帳號資料 (JSON)",
      exportJsonDesc: "下載包含等級、裝備實例、星砂經濟帳本與歷程統計之完整 JSON 存檔檔案：",
      btnDownloadJson: "下載 JSON 備份檔",
      btnCopyJson: "複製 JSON 內容",
      toastExportJsonSuccess: "帳號資料已成功匯出！",
      deleteAccount: "刪除帳號",
      deleteAccountTitle: "徹底刪除帳號與雲端紀錄",
      deleteAccountWarning: "【警告】此操作將永久銷毀伺服器與本機的所有角色數據、裝備與星砂紀錄，且無法透過任何方式復原！",
      deleteAccountConfirmPrompt: "若確認要刪除，請在下方輸入「DELETE」以確認：",
      btnConfirmDeleteAccount: "永久銷毀帳號",
      toastDeleteAccountSuccess: "帳號與所有進度已徹底刪除。",
      toastDeleteAccountMismatch: "確認文字不相符，取消刪除操作。",
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "戰鬥紀錄",
      damageSourceRps: "猜拳獲勝",
      damageSourceMorph: "變拳克制",
      damageSourceCounter: "QTE反制",
      damageSourceMomo: "摸摸偷襲",
      damageSourceBurn: "燃燒灼燒",
      damageSourceReflect: "鏡光反彈",
      damageSourceThunder: "神鳴追加",
      damageSourceBurst: "重劍暴擊",
      damageSourceEnemy: "敵方受擊",
      atkLabel: "ATK",
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
      menuRecords: "戰績統計",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅程紀錄與戰鬥分析",
      homeRecordsDesc: "詳細記錄您在各章節的戰績、實戰輸出表現、裝備配置與各項成長統計。",
      theoreticalDps: "理論 DPS",
      combatDps: "實戰 DPS",
      currentEquipment: "當前穿戴裝備",
      currentLevelXp: "冒險等級與經驗",
      consumablesUsed: "消耗品使用累計",
      morphSuccesses: "變拳逆轉成功",
      momoStats: "偷摸發動",
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
      recordsHpRestoredSummary: "{count} 瓶 (+{restored} HP)",
      recordsMpRestoredSummary: "{count} 瓶 (+{restored} MP)",
      recordsSkillUsesSummary: "{success}/{attempts} 次 ({rate}%, {damage} 傷)",
      paperdollReadOnlyHint: "（唯讀檢視・裝備更換請至「玩家裝備」頁）",
      notEquipped: "未裝備",
      noRecentBattles: "尚無對戰紀錄。快去開始一場對局吧！",
      battleLogPotions: "HP: {hpUsed}瓶 (+{hpRestored}) / MP: {mpUsed}瓶 (+{mpRestored})",
      battleLogMorphSummary: "{count}次 ({damage}傷)",
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
      insufficientSp: "技能點不足！",
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
      cheatModalTitle: "測試調試 / 作弊選單",
      cheatAuthTitle: "作弊與開發權限驗證",
      cheatAuthPrompt: "請輸入開發者密鑰或轉移碼以解鎖測試選單：",
      cheatAuthConfirm: "驗證權限",
      cheatAuthCancel: "取消",
      cheatAuthSuccess: "密碼正確，管理員作弊選單已解鎖！",
      cheatAuthError: "密碼錯誤！無法開啟作弊選單。",
      cheatDevBadge: "DEV 管理員已驗證",
      cheatDemote: "登出管理員身分",
      cheatDemoteSuccess: "已登出管理員身分，恢復為普通玩家權限。",
      cheatSetLevel: "設定等級",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能點 (+50)",
      cheatUnlockAllStages: "解鎖所有關卡",
      cheatUnlockAllGallery: "解鎖所有圖鑑",
      cheatMaxAll: "滿級 + 99999 星砂 + 100 SP",
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
      unlock2PHint: "需戰勝終ノ章（第四關）1 次以解鎖",
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
      abandonBattleModalTitle: "⚠️ 離開對局確認",
      abandonBattleModalDesc: "確定要離開對戰嗎？離開將會失去當前戰鬥進度與未結算的獎勵！",
      btnConfirmAbandon: "確定離開",
      btnCancelAbandon: "繼續戰鬥",
      toggleSettlementUi: "欣賞立繪",
      hideSettlementUi: "欣賞立繪",
      showSettlementUi: "顯示介面",
      selectLanguage: "切換語系",
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
    dojo: {
      modalTitle: "修練場・特訓選單",
      modalSubtitle: "鍛鍊反應神經，測試數值與配裝極限",
      mode1Title: "模式一：純 QTE 無限反應練習",
      mode1Desc: "無猜拳與回合等待，純粹連續生成 QTE 按鍵指令，即時鍛鍊反應與鍵位記憶。",
      mode1Style1: "第一式・單軌連續 QTE",
      mode1Style1Desc: "標準 8 方向單軌鍵盤連續輸入練習",
      mode1Style2: "第二式・雙軌同步 QTE",
      mode1Style2Desc: "模擬第四關雙生 Boss 雙軌情境（左手 WASD，右手 方向鍵）",
      mode2Title: "模式二：戰鬥模擬與 DPS 測試沙盒",
      mode2Desc: "完整保留標準戰鬥節奏，對戰全黑小樂剪影假人，可自訂 HP 與傷害，無敗北壓力。",
      mode2Style1: "第一式・單體假人對決",
      mode2Style1Desc: "單個全黑剪影假人，測試單體 DPS 與變拳/反擊",
      mode2Style2: "第二式・雙生假人對決",
      mode2Style2Desc: "雙個全黑剪影假人，模擬第四關雙手出拳與雙軌反制",
      customHpLabel: "假人生命值 (HP)",
      customDmgLabel: "假人傷害值 (ATK)",
      zeroDamageHint: "（預設 0 傷害，對玩家無傷害，無敗北壓力）",
      btnStartPractice: "開始修練",
      btnExitDojo: "結束修練",
      combo: "連擊",
      maxCombo: "最高連擊",
      avgReaction: "平均反應",
      successRate: "成功率",
      dummySilhouette: "影・小樂",
      dummySilhouetteLeft: "影・小樂（左）",
      dummySilhouetteRight: "影・小樂（右）",
      chapterName: "修練場",
      dojoStatsTitle: "修練結算報告",
      btnReturnDojoMenu: "返回修練選單"
    },
    gallery: {
      koraku_default: {
        name: "巫女社・狐娘小樂",
        variantName: "預設造型",
        description: "守護朱鳥居的狐娘小樂。一身俐落的機甲巫女裝扮，總是帶著自信的微笑迎接挑戰者。"
      },
      koraku_2p: {
        name: "鏡界・白金小樂",
        variantName: "2P色小樂",
        description: "跨越鏡界之後顯現的白金姿態。銀髮與冰藍光芒交織，唯有突破終章試煉者方能得見。"
      },
      swimsuit_default: {
        name: "夏日祭・清涼泳裝",
        variantName: "清涼泳裝",
        description: "小樂難得換上的清涼泳裝。在對局勝出後方能一窺風采。"
      },
      swimsuit_watermelon: {
        name: "海風・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大獲全勝後，小樂得意洋洋展示成果的模樣。"
      }
    },
    dialogue: {
      watermelonNotAim: "西瓜遊戲尚未進入瞄準階段。",

      speakerPlayer: "旅人",
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
      winDualMorphBoth: "雙手皆以變拳勝出！雙生之勢全數瓦解！",
      winDualBoth: "雙手皆贏！完美的雙重壓制！",
      winDualMorphSingle: "藉由變拳突破單側防線！",
      winDualSingle: "突破單側防線！",
      winDualMorphDoubleDmg: "雙手變拳全勝！造成雙倍傷害！",
      winDualDoubleDmg: "雙手出拳全勝！造成雙倍傷害！",
      winSingleMorph: "變拳逆轉獲勝！",
      winSingleNormal: "出拳獲勝！",
      drawMomoDodge: "平手之際試圖摸摸，但被{target}輕巧地躲開了！",
      drawMomoHit: "平手之際趁機摸摸！對{target}造成了 {damage} 點偷襲傷害！",
      drawNormal: "不分勝負，雙方平手！",
      deflectedSingleAttack: "化解了{target}的攻擊！",
      dualQteMiss: "雙生 QTE 反制失誤！",
      dualQteSuccess: "雙生 QTE 反制成功！完全逆轉戰局！",
      qteMiss: "QTE 反制失敗！",
      freezeNarration: "霜月冰結！小樂的「{hand}」被封印了！",
      dodgeDodge: "殘影閃避！成功避開了攻擊！",
      dodgeDodgeDual: "殘影閃避！避開了雙重攻擊！",
      postBattleWin: "這次是你贏了。要把勝利用在什麼願望上呢？",
      postBattleLoss: "還有什麼要說的嗎？回去再練練吧！",
      askSwimsuitLine: "泳裝？真拿你沒辦法……只准看一下喔。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指針進入綠色區域時，就喊『就是現在！』！",
      watermelonHit: "漂亮！這一刀切中了。還有 {remaining} 刀。",
      watermelonMiss: "差一點點！還有 {remaining} 刀，下一次再來。",
      watermelonAllHit: "三刀都結束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都結束了。下次再一起抓準時機吧。",
      itemUsed: "使用「{name}」，恢復了 {restored} 點 {resource}。",
      serverDisconnectGrace: "連線中斷，正在為您保留戰鬥狀態（10 秒寬限期）...",
      serverConfigMismatch: "偵測到伺服器版本更新，請重新整理頁面以取得最新遊戲內容。",
      serverSessionReplaced: "您的帳號已在其他裝置或分頁連線，本連線已中斷。",
      serverInvalidCommand: "操作無法執行：{reason}",
      serverLockedInBattle: "戰鬥進行中，無法進行裝備更換或屬性配點！"
    },
    narration: {
      qteCounterPaper: "用手包裹住小樂的剪刀手——反制成功！",
      qteCounterScissors: "用布握住了小樂的小拳頭——反制成功！",
      qteCounterRock: "用五指交扣了小樂的軟綿綿小手手，離奇獲勝！"
    },
    toast: {
      levelRequirementNotMet: "等級尚未達到這一章的挑戰條件。"
    },
    combat: {
      morphWindowOnly: "變拳只能在看見小樂出拳後的反應時間內使用。",
      morphWindowExpired: "反應時間已過。",
      insufficientMp: "MP 不足，無法使用變拳。",
      tookDamage: "受到傷害",
      notInBattle: "目前不在戰鬥中。",
      itemNotFound: "找不到這個道具。",
      resourceFull: "{resource} 已經是滿的。",
      itemDepleted: "{name}已用完。",
      badgeAttack: "攻",
      badgeHeal: "療",
      badgeMana: "魔",
      badgeBurn: "灼"
    },
    shop: {
      itemNotFound: "找不到這件商品。",
      insufficientCoins: "星砂不足，完成對局後再來吧。",
      itemPurchased: "購入「{name}」！",
      equipmentPurchased: "購入「{name}」並已放入裝備背包！"
    },
    equip: {
      invalidItem: "無效的裝備。",
      notInInventory: "背包中沒有這件裝備。",
      invalidSlot: "無效的裝備欄位。",
      incompatibleSlot: "無法將「{name}」穿戴至 {slotName}。",
      equipped: "已穿戴「{name}」。",
      slotEmpty: "此欄位未裝備任何物品。",
      unequipped: "已卸下裝備。"
    },
    growth: {
      invalidStat: "無效的能力項目。",
      noPoints: "目前沒有可用點數。",
      statIncreased: "能力提升了。",
      invalidSkill: "無效的技能項目。",
      levelRequirementNotMet: "等級需達 Lv. {level} 方可學習此技能。",
      skillMaxLevel: "此技能已達最高等級。",
      insufficientPoints: "技能點數不足。",
      skillUpgraded: "「{name}」升級至 Lv. {level}！"
    },
    cheat: {
      updated: "數值已更新！",
      unlockedAll: "已解鎖全部 4 個關卡與 BOSS 說明！",
      unlockedGallery: "已解鎖全部圖鑑立繪！"
    },
    save: {
      transferCodeRequired: "請輸入轉移代碼。",
      transferCodeNotFound: "找不到此轉移代碼。",
      transferCodeAlreadyClaimed: "此轉移代碼已被使用。",
      transferCodeExpired: "轉移代碼已過期。",
      transferClaimFailed: "轉移代碼兌換失敗。",

      invalidCode: "請輸入有效的種子碼。",
      corruptCode: "無效或損毀的存檔種子碼。",
      imported: "存檔已成功載入！"
    },
    connection: {
      newConnectionEstablished: "此帳號已從另一裝置連線，您已被登出。",

      connecting: "連線中",
      online: "線上連線",
      offline: "離線模式",
      reconnecting: "重新連線中",
      disconnected: "連線中斷",
      highLatency: "延遲",
      kickedByNewConnection: "帳號已在其他裝置或分頁登入，本連線已安全斷開。",
      disconnectCountdown: "連線中斷，正在嘗試重新連線（剩餘 {seconds} 秒自動結算）...",
      bannerConnecting: "正在連線至伺服器...",
      bannerOnline: "已連線至權威伺服器",
      bannerOffline: "目前處於本機離線沙盒模式",
      bannerReconnecting: "連線中斷，正在嘗試重新連線...",
      bannerDisconnected: "已與伺服器斷開連線",
      noServerConfigured: "未偵測到伺服器設定，已切換為離線模式",
      switchToOffline: "改用離線模式",
      switchToOnline: "切換回線上模式",
      commandFailedOffline: "尚未連線至伺服器，指令已逾時取消"
    },
    battle: {
      lockedDuringBattle: "戰鬥進行中已鎖定換裝與配點。"
    },
    battleLog: {
      lockedDuringBattle: "戰鬥進行中已鎖定換裝與配點。",
      battleInProgress: "戰鬥正在進行中。",
      battleStartFailed: "無法開始戰鬥。",
      noActiveBattle: "目前沒有進行中的戰鬥。",
      invalidPhasePause: "只能在倒數階段暫停。",
      useItemFailed: "道具使用失敗。",

      rpsWin: "猜拳【{hand}】獲勝，對 {target} 造成 {damage} 點傷害！",
      rpsLoss: "猜拳【{hand}】惜敗，受到 {damage} 點傷害！",
      rpsDraw: "雙方皆出【{hand}】，平手！",
      morphSuccess: "變拳【{hand}】逆轉成功！對 {target} 造成 {damage} 點傷害！",
      morphFailed: "變拳手勢被克制，判定失誤！",
      qteCounterSuccess: "QTE 絕地反制成功！解除危機並對 {target} 造成 {damage} 點反擊傷害！",
      qteCounterFail: "QTE 反制失敗！承受了 {damage} 點重擊！",
      momoProc: "摸摸平手偷襲發動！對 {target} 造成 {damage} 點偷襲傷害！",
      momoDodged: "小樂靈巧地閃避了摸摸偷襲！",
      burnDamage: "火焰太刀狐火灼燒，對 {target} 造成 {damage} 點燃燒傷害！",
      reflectDamage: "八咫鏡光反彈！將 {damage} 點傷害回敬給 {target}！",
      thunderDamage: "雷霆神鳴追加！對 {target} 額外追加 {damage} 點雷擊傷害！",
      frostFreeze: "霜月冰結靈刃發動！隨機封印了小樂下一回合的【{hand}】！",
      shadowDodge: "靈狐幻影羽織發動！25% 殘影成功完全迴避了本次傷害！",
      mpRegen: "淨世白狐千早發動！回合結算回復了 {amount} 點 MP。",
      potionUsed: "使用了【{item}】，恢復了 {amount} 點 {stat}！",
      roundTimeout: "出拳倒數逾時，判定為棄權輸拳！",
      battleDisconnectedSettled: "戰鬥因逾時未連線自動結算完成。",
      battlePauseCount: "戰鬥已暫停（本場剩餘暫停次數：{remaining} 次）。"
    },
    command: {
      missingCommand: "缺少 command 欄位。",
      unknownCommand: "未定義之指令: {command}"
    },
    account: {
      resetDone: "帳號資料已重置。",
      transferClaimed: "轉移碼兌換完成。"
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
      playerProfile: "玩家资料",
      switchLanguage: "切换语言",
      toggleBgm: "切换背景音乐",
      toggleSfx: "切换游戏音效",
      mainMenu: "主菜单",
      battleRecords: "战绩",
      footerInfo: "页脚信息",
      changelog: "查看更新日志",
      galleryZoom: "放大查看全图",
      galleryZoomTitle: "放大鉴赏 (High-Res)",
      rpsBattle: "猜拳战斗",
      toggleAutoBattle: "暂停或继续自动刷关",
      kohakuHp: "小乐生命值",
      battleLogToggle: "战斗纪录（点击切换显示规模）",
      battleLogToggleTitle: "点击切换显示规模：最新1条 / 近5条 / 全记录",
      roundStatus: "本回合状态",
      playerHpMp: "玩家生命与魔力",
      selectHand: "选择出拳",
      itemSkillBar: "道具与技能快捷栏",
      counterQte: "反制 QTE",
      directionInput: "方向输入",
      toggleUiVisibility: "欣赏立绘，隐藏或显示结算界面",
      toggleUiVisibilityTitle: "欣赏立绘 (隐藏/显示界面)",
      togglePanelSize: "放大或缩小面板",
      togglePanelSizeTitle: "放大/缩小面板",
      closeOverlay: "收起浮层",
      dojoQtePractice: "修练场 QTE 练习",
      closeModal: "关闭窗口",
      clickSelectAll: "点击全选",
      openOriginalImage: "在新标签页打开原图 (支持双指缩放与下载)",
      closeGalleryZoom: "关闭放大视图",
      closeGalleryZoomTitle: "关闭 (ESC)",
      selectRockKey: "选择石头 (热键: 1)",
      selectPaperKey: "选择布 (热键: 2)",
      selectScissorsKey: "选择剪刀 (热键: 3)",
      selectLeftRockKey: "左手石头 (热键: 1 或 Q)",
      selectLeftPaperKey: "左手布 (热键: 2 或 W)",
      selectLeftScissorsKey: "左手剪刀 (热键: 3 或 E)",
      selectRightRockKey: "右手石头 (热键: 7 或 J 或 Num1)",
      selectRightPaperKey: "右手布 (热键: 8 或 K 或 Num2)",
      selectRightScissorsKey: "右手剪刀 (热键: 9 或 L 或 Num3)",
      useHpPotionKey: "使用 HP 药水 (热键: 4 或 Q)",
      useMorphKey: "一秒内变拳 (热键: F)",
      useMpPotionKey: "使用 MP 药水 (热键: 5 或 E)",

      menuRecords: "战绩统计",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "旅程纪录与战斗分析",
      homeRecordsDesc: "详细记录您在各章节的战绩、实战输出表现、装备配置与各项成长统计。",
      theoreticalDps: "理论 DPS",
      combatDps: "实战 DPS",
      currentEquipment: "当前穿戴装备",
      currentLevelXp: "冒险等级与经验",
      consumablesUsed: "消耗品使用累计",
      morphSuccesses: "变拳逆转成功",
      momoStats: "偷摸发动",
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
      recordsHpRestoredSummary: "{count} 瓶 (+{restored} HP)",
      recordsMpRestoredSummary: "{count} 瓶 (+{restored} MP)",
      recordsSkillUsesSummary: "{success}/{attempts} 次 ({rate}%, {damage} 伤)",
      paperdollReadOnlyHint: "（只读检视・装备更换请至“玩家装备”页）",
      notEquipped: "未装备",
      noRecentBattles: "尚无对战纪录。快去开始一场对局吧！",
      battleLogPotions: "HP: {hpUsed}瓶 (+{hpRestored}) / MP: {mpUsed}瓶 (+{mpRestored})",
      battleLogMorphSummary: "{count}次 ({damage}伤)",
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
      home: "首页",
      level: "等级",
      xp: "经验",
      changelogTitle: "更新日志",
      changelogSubtitle: "游戏版本迭代与修复纪录",
      closeChangelog: "关闭",
      currentVersion: "当前版本",
      currentVersionStatus: "已上线运行",
      coins: "星砂",
      soundToggle: "切换游戏音效",
      sfxToggle: "切换游戏音效",
      musicToggle: "切换背景音乐",
      musicToggleOn: "开启背景音乐",
      musicToggleOff: "静音背景音乐",
      sfxToggleOn: "开启游戏音效",
      sfxToggleOff: "静音游戏音效",
      musicOnToast: "背景音乐已开启。",
      musicOffToast: "背景音乐已关闭。",
      sfxOnToast: "游戏音效已开启。",
      sfxOffToast: "游戏音效已关闭。",
      rewardEarned: "获得奖励",
      zoomHighRes: "放大鉴赏",
      galleryDiffToggle: "差分",
      galleryDiffDefault: "默认泳装",
      galleryDiffWatermelon: "切西瓜差分",
      clickToZoom: "点击全屏放大查看",
      closeLightbox: "关闭视图",
      langToggle: "语言",
      back: "返回",
      wins: "胜",
      losses: "负",
      deepestStage: "最深章节",
      receptionSeal: "对战<br>接待中",
      openCheat: "测试调试 / 作弊菜单",
      cheatAuthTitle: "作弊验证",
      cheatAuthPrompt: "请输入管理密码以开启测试菜单：",
      cheatAuthPlaceholder: "输入密码 (8989)",
      cheatAuthConfirm: "解锁菜单",
      cheatAuthCancel: "取消",
      cheatAuthError: "密码错误！无法开启作弊菜单。",
      cheatAuthSuccess: "密码正确，作弊菜单已解锁！",
      galleryUnlockedTag: "已解锁",
      galleryLockedTag: "尚未解锁",
      resetSave: "重置存档",
      resetConfirm: "确定要重置所有存档进度吗？此操作无法撤销。",
      saveRecord: "存档记录",
      saveRecordModalTitle: "存档记录与种子码管理",
      saveOverviewTitle: "当前存档状态概览",
      saveOverviewLevel: "冒险等级",
      saveOverviewCoins: "持有星砂",
      saveOverviewStage: "最深章节",
      saveOverviewBattles: "总对战场次",
      saveOverviewEquipCount: "装备持有",
      btnViewRecordsDetail: "查看战绩统计详情 ›",
      saveRecordsHint: "存档种子码会完整保存所有冒险历程、全章节战绩、手动/自动胜败记录、历程 DPS 分析与西瓜切中统计，跨设备加载时将全部无损还原。",
      saveSeedExportTitle: "导出当前存档种子码",
      saveSeedExportDesc: "此字符串包含您当前所有的等级、装备、星砂、配点与战绩记录，可用于备份或跨设备转移：",
      btnCopySaveSeed: "复制种子码",
      toastSeedCopied: "存档种子码已成功复制到剪贴板！",
      saveSeedImportTitle: "输入种子码（跨设备加载）",
      saveSeedImportDesc: "粘贴其他设备导出的存档种子码，即可将冒险记录同步至本设备：",
      importSeedPlaceholder: "在此粘贴存档种子码（如 KORAKU1_...）",
      btnImportSaveSeed: "加载并应用种子码",
      confirmImportSeed: "加载此种子码将会覆盖本设备当前的存档进度，确定要加载吗？",
      confirmAbandonBattle: "现在撤退将不会得到星砂或经验，确定离开吗？",
      toastImportSuccess: "存档种子码已成功加载并应用！",
      toastImportFailed: "无效或损坏的存档种子码，请检查是否完整复制。",
      toastSeedEmpty: "请先输入或粘贴存档种子码。",
      dangerZoneTitle: "存档重置与删除管理",
      dangerZoneDesc: "清除本设备上的所有游戏进度（等级、星砂、装备、技能与战绩），回归初始状态：",
      btnModalResetSave: "重置存档（清除所有记录）",
      // Online connection, transfer code, export, delete
      connConnecting: "连接中",
      connOnline: "在线连接",
      connOffline: "离线模式",
      connReconnecting: "重新连接中",
      connDisconnected: "连接中断",
      connBannerConnecting: "正在连接至服务器...",
      connBannerOnline: "已连接至权威服务器",
      connBannerOffline: "当前处于本地离线沙盒模式",
      connBannerReconnecting: "连接中断，正在尝试重新连接...",
      connBannerDisconnected: "已与服务器断开连接",
      connectionModeToggle: "切换连接模式",
      connectionErrorVersionMismatch: "版本不符，请刷新页面加载最新版本。",
      connectionRateLimited: "操作过于频繁，请稍后再试。",
      transferCode: "转移码",
      transferCodeModalTitle: "账号跨设备转移码管理",
      transferCodeIssueTitle: "签发一次性转移码",
      transferCodeIssueDesc: "签发一次性转移码，可在新设备上输入以迁移此账号的所有进度。签发后有效时间为 15 分钟。",
      btnIssueTransferCode: "生成转移码",
      transferCodePrompt: "您的转移码如下（点击复制）：",
      transferCodeExpiresIn: "有效期限：{minutes} 分钟",
      btnCopyTransferCode: "复制转移码",
      toastTransferCodeCopied: "转移码已复制至剪贴板！",
      transferCodeClaimTitle: "兑换转移码（迁移至此设备）",
      transferCodeClaimDesc: "在下方输入由原设备签发的转移码，此设备将绑定并接收该账号的所有进度：",
      transferCodePlaceholder: "输入 8 位数转移码（如 KTR-XXXX-XXXX）",
      btnClaimTransferCode: "兑换并加载进度",
      confirmClaimTransferCode: "兑换转移码将会切换至该账号，确定要兑换吗？",
      toastTransferCodeSuccess: "账号转移成功！已加载最新存档进度。",
      toastTransferCodeInvalid: "无效或已过期的转移码，请重新核对或重新签发。",
      exportJson: "数据导出 (JSON)",
      exportJsonTitle: "导出完整账号数据 (JSON)",
      exportJsonDesc: "下载包含等级、装备实例、星砂经济账本与历程统计之完整 JSON 存档文件：",
      btnDownloadJson: "下载 JSON 备份文件",
      btnCopyJson: "复制 JSON 内容",
      toastExportJsonSuccess: "账号数据已成功导出！",
      deleteAccount: "删除账号",
      deleteAccountTitle: "彻底删除账号与云端纪录",
      deleteAccountWarning: "【警告】此操作将永久销毁服务器与本地的所有角色数据、装备与星砂纪录，且无法通过任何方式复原！",
      deleteAccountConfirmPrompt: "若确认要删除，请在下方输入“DELETE”以确认：",
      btnConfirmDeleteAccount: "永久销毁账号",
      toastDeleteAccountSuccess: "账号与所有进度已彻底删除。",
      toastDeleteAccountMismatch: "确认文字不相符，取消删除操作。",
      navDojo: "修练场",
      menuDojo: "修练道场",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "战斗记录",
      damageSourceRps: "猜拳获胜",
      damageSourceMorph: "变拳克制",
      damageSourceCounter: "QTE反制",
      damageSourceMomo: "摸摸偷袭",
      damageSourceBurn: "燃烧灼烧",
      damageSourceReflect: "镜光反弹",
      damageSourceThunder: "神鸣追加",
      damageSourceBurst: "重剑暴击",
      damageSourceEnemy: "敌方受击",
      atkLabel: "ATK",
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
      insufficientSp: "技能点不足！",
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
      cheatModalTitle: "测试调试 / 作弊菜单",
      cheatAuthTitle: "作弊与开发权限验证",
      cheatAuthPrompt: "请输入开发者密钥或转移码以解锁测试菜单：",
      cheatAuthConfirm: "验证权限",
      cheatAuthCancel: "取消",
      cheatAuthSuccess: "密码正确，管理员作弊菜单已解锁！",
      cheatAuthError: "密码错误！无法开启作弊菜单。",
      cheatDevBadge: "DEV 管理员已验证",
      cheatDemote: "退出管理员身份",
      cheatDemoteSuccess: "已退出管理员身份，恢复为普通玩家权限。",
      cheatSetLevel: "设定等级",
      cheatAddCoins: "增加星砂 (+1000)",
      cheatAddSp: "增加技能点 (+50)",
      cheatUnlockAllStages: "解锁所有关卡",
      cheatUnlockAllGallery: "解锁所有图鉴",
      cheatMaxAll: "满级 + 99999 星砂 + 100 SP",
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
      unlock2PHint: "需战胜终ノ章（第四关）1 次以解锁",
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
      abandonBattleModalTitle: "⚠️ 离开对局确认",
      abandonBattleModalDesc: "确定要离开对战吗？离开将会失去当前战斗进度与未结算的奖励！",
      btnConfirmAbandon: "确定离开",
      btnCancelAbandon: "继续战斗",
      toggleSettlementUi: "欣赏立绘",
      hideSettlementUi: "欣赏立绘",
      showSettlementUi: "显示界面",
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
    dojo: {
      modalTitle: "修练场・特训菜单",
      modalSubtitle: "锻炼反应神经，测试数值与配装极限",
      mode1Title: "模式一：纯 QTE 无限反应练习",
      mode1Desc: "无猜拳与回合等待，纯粹连续生成 QTE 按键指令，即时锻炼反应与键位记忆。",
      mode1Style1: "第一式・单轨连续 QTE",
      mode1Style1Desc: "标准 8 方向单轨键盘连续输入练习",
      mode1Style2: "第二式・双轨同步 QTE",
      mode1Style2Desc: "模拟第四关双生 Boss 双轨情境（左手 WASD，右手 方向键）",
      mode2Title: "模式二：战斗模拟与 DPS 测试沙盒",
      mode2Desc: "完整保留标准战斗节奏，对战全黑小乐剪影假人，可自订 HP 与伤害，无败北压力。",
      mode2Style1: "第一式・单体假人对决",
      mode2Style1Desc: "单个全黑剪影假人，测试单体 DPS 与变拳/反击",
      mode2Style2: "第二式・双生假人对决",
      mode2Style2Desc: "双个全黑剪影假人，模拟第四关双手出拳与双轨反制",
      customHpLabel: "假人生命值 (HP)",
      customDmgLabel: "假人伤害值 (ATK)",
      zeroDamageHint: "（预设 0 伤害，对玩家无伤害，无败北压力）",
      btnStartPractice: "开始修练",
      btnExitDojo: "结束修练",
      combo: "连击",
      maxCombo: "最高连击",
      avgReaction: "平均反应",
      successRate: "成功率",
      dummySilhouette: "影・小乐",
      dummySilhouetteLeft: "影・小乐（左）",
      dummySilhouetteRight: "影・小乐（右）",
      chapterName: "修练场",
      dojoStatsTitle: "修练结算报告",
      btnReturnDojoMenu: "返回修练菜单"
    },
    gallery: {
      koraku_default: {
        name: "巫女社・狐娘小乐",
        variantName: "默认造型",
        description: "守护朱鸟居的狐娘小乐。一身利落的机甲巫女装扮，总是带着自信的微笑迎接挑战者。"
      },
      koraku_2p: {
        name: "镜界・白金小乐",
        variantName: "2P色小乐",
        description: "跨越镜界之后显现的白金姿态。银发与冰蓝光芒交织，唯有突破终章试炼者方能得见。"
      },
      swimsuit_default: {
        name: "夏日祭・清凉泳装",
        variantName: "清凉泳装",
        description: "小乐难得换上的清凉泳装。在对局胜出后方能一窥风采。"
      },
      swimsuit_watermelon: {
        name: "海风・切西瓜",
        variantName: "切西瓜",
        description: "蒙眼切西瓜大获全胜后，小乐得意洋洋展示成果的模样。"
      }
    },
    dialogue: {
      watermelonNotAim: "西瓜游戏尚未进入瞄准阶段。",

      speakerPlayer: "旅人",
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
      winDualMorphBoth: "双手皆以变拳胜出！双生之势全数瓦解！",
      winDualBoth: "双手皆赢！完美双重压制！",
      winDualMorphSingle: "借由变拳突破单侧防线！",
      winDualSingle: "突破单侧防线！",
      winDualMorphDoubleDmg: "双手变拳全胜！造成双倍伤害！",
      winDualDoubleDmg: "双手出拳全胜！造成双倍伤害！",
      winSingleMorph: "变拳逆转获胜！",
      winSingleNormal: "出拳获胜！",
      drawMomoDodge: "平手之际试图摸摸，但被{target}轻巧地躲开了！",
      drawMomoHit: "平手之际趁机摸摸！对{target}造成了 {damage} 点偷袭伤害！",
      drawNormal: "不分胜负，双方平手！",
      deflectedSingleAttack: "化解了{target}的攻击！",
      dualQteMiss: "双生 QTE 反制失误！",
      dualQteSuccess: "双生 QTE 反制成功！完全逆转战局！",
      qteMiss: "QTE 反制失败！",
      freezeNarration: "霜月冰结！小乐的“{hand}”被封印了！",
      dodgeDodge: "残影闪避！成功避开了攻击！",
      dodgeDodgeDual: "残影闪避！避开了双重攻击！",
      postBattleWin: "这次是你赢了。要把利用在什么愿望上呢？",
      postBattleLoss: "还有什么要说的吗？回去再练练吧！",
      askSwimsuitLine: "泳装？真拿你没办法……只准看一眼哦。",
      watermelonAttempt: "第 {nextAttempt} 刀。白色指针进入绿色区域时，就喊『就是现在！』！",
      watermelonHit: "漂亮！这一刀切中了。还有 {remaining} 刀。",
      watermelonMiss: "差一点点！还有 {remaining} 刀，下一次再来。",
      watermelonAllHit: "三刀都结束了！切中 {successes} 次，真是有趣呢！",
      watermelonDone: "三刀都结束了。下次再一起抓准时机吧。",
      itemUsed: "使用「{name}」，恢复了 {restored} 点 {resource}。",
      serverDisconnectGrace: "连接中断，正在为您保留战斗状态（10 秒宽限期）...",
      serverConfigMismatch: "检测到服务器版本更新，请刷新页面以获取最新游戏内容。",
      serverSessionReplaced: "您的账号已在其他设备或标签页连接，本连接已中断。",
      serverInvalidCommand: "操作无法执行：{reason}",
      serverLockedInBattle: "战斗进行中，无法进行装备更换或属性配点！"
    },
    narration: {
      qteCounterPaper: "用手包裹住小乐的剪刀手——反制成功！",
      qteCounterScissors: "用布握住了小乐的小拳头——反制成功！",
      qteCounterRock: "用五指交扣了小乐的软绵绵小手手，离奇获胜！"
    },
    toast: {
      levelRequirementNotMet: "等级尚未达到本章的挑战条件。"
    },
    combat: {
      morphWindowOnly: "变拳只能在看见小乐出拳后的反应时间内使用。",
      morphWindowExpired: "反应时间已过。",
      insufficientMp: "MP 不足，无法使用变拳。",
      tookDamage: "受到伤害",
      notInBattle: "当前不在战斗中。",
      itemNotFound: "找不到这个道具。",
      resourceFull: "{resource} 已经是满的。",
      itemDepleted: "{name}已用完。",
      badgeAttack: "攻",
      badgeHeal: "疗",
      badgeMana: "魔",
      badgeBurn: "灼"
    },
    shop: {
      itemNotFound: "找不到这件商品。",
      insufficientCoins: "星砂不足，完成对局后再来吧。",
      itemPurchased: "购买了「{name}」！",
      equipmentPurchased: "购买了「{name}」并已放入装备背包！"
    },
    equip: {
      invalidItem: "无效的装备。",
      notInInventory: "背包中没有这件装备。",
      invalidSlot: "无效的装备栏位。",
      incompatibleSlot: "无法将「{name}」穿戴至 {slotName}。",
      equipped: "已穿戴「{name}」。",
      slotEmpty: "此栏位未装备任何物品。",
      unequipped: "已卸下装备。"
    },
    growth: {
      invalidStat: "无效的能力项目。",
      noPoints: "目前没有可用点数。",
      statIncreased: "能力提升了。",
      invalidSkill: "无效的技能项目。",
      levelRequirementNotMet: "等级需达 Lv. {level} 方可学习此技能。",
      skillMaxLevel: "此技能已达最高等级。",
      insufficientPoints: "技能点数不足。",
      skillUpgraded: "「{name}」升级至 Lv. {level}！"
    },
    cheat: {
      updated: "数值已更新！",
      unlockedAll: "已解锁全部 4 个关卡与 BOSS 说明！",
      unlockedGallery: "已解锁全部图鉴立绘！"
    },
    save: {
      transferCodeRequired: "请输入转移代码。",
      transferCodeNotFound: "找不到此转移代码。",
      transferCodeAlreadyClaimed: "此转移代码已被使用。",
      transferCodeExpired: "转移代码已过期。",
      transferClaimFailed: "转移代码兑换失败。",

      invalidCode: "请输入有效的种子码。",
      corruptCode: "无效或损坏的存档种子码。",
      imported: "存档已成功加载！"
    },
    connection: {
      newConnectionEstablished: "此账号已从另一设备连接，您已被登出。",

      connecting: "连接中",
      online: "在线连接",
      offline: "离线模式",
      reconnecting: "重新连接中",
      disconnected: "连接中断",
      highLatency: "延迟",
      kickedByNewConnection: "账号已在其他设备或标签页登录，本连接已安全断开。",
      disconnectCountdown: "连接中断，正在尝试重新连接（剩余 {seconds} 秒自动结算）...",
      bannerConnecting: "正在连接至服务器...",
      bannerOnline: "已连接至权威服务器",
      bannerOffline: "当前处于本地离线沙盒模式",
      bannerReconnecting: "连接中断，正在尝试重新连接...",
      bannerDisconnected: "已与服务器断开连接",
      noServerConfigured: "未检测到服务器配置，已切换为离线模式",
      switchToOffline: "改用离线模式",
      switchToOnline: "切换回在线模式",
      commandFailedOffline: "尚未连接到服务器，指令已超时取消"
    },
    battle: {
      lockedDuringBattle: "战斗进行中已锁定换装与配点。"
    },
    battleLog: {
      lockedDuringBattle: "战斗进行中已锁定换装与配点。",
      battleInProgress: "战斗正在进行中。",
      battleStartFailed: "无法开始战斗。",
      noActiveBattle: "当前没有进行中的战斗。",
      invalidPhasePause: "只能在倒数阶段暂停。",
      useItemFailed: "道具使用失败。",

      rpsWin: "猜拳【{hand}】获胜，对 {target} 造成 {damage} 点伤害！",
      rpsLoss: "猜拳【{hand}】惜败，受到 {damage} 点伤害！",
      rpsDraw: "双方皆出【{hand}】，平手！",
      morphSuccess: "变拳【{hand}】逆转成功！对 {target} 造成 {damage} 点伤害！",
      morphFailed: "变拳手势被克制，判定失误！",
      qteCounterSuccess: "QTE 绝地反制成功！解除危机并对 {target} 造成 {damage} 点反击伤害！",
      qteCounterFail: "QTE 反制失败！承受了 {damage} 点重击！",
      momoProc: "摸摸平手偷袭发动！对 {target} 造成 {damage} 点偷袭伤害！",
      momoDodged: "小乐灵巧地闪避了摸摸偷袭！",
      burnDamage: "火焰太刀狐火灼烧，对 {target} 造成 {damage} 点燃烧伤害！",
      reflectDamage: "八咫镜光反弹！将 {damage} 点伤害回敬给 {target}！",
      thunderDamage: "雷霆神鸣追加！对 {target} 额外追加 {damage} 点雷击伤害！",
      frostFreeze: "霜月冰结灵刃发动！随机封印了小乐下一回合的【{hand}】！",
      shadowDodge: "灵狐幻影羽织发动！25% 残影成功完全回避了本次伤害！",
      mpRegen: "净世白狐千早发动！回合结算回复了 {amount} 点 MP。",
      potionUsed: "使用了【{item}】，恢复了 {amount} 点 {stat}！",
      roundTimeout: "出拳倒数超时，判定为弃权输拳！",
      battleDisconnectedSettled: "战斗因超时未连接自动结算完成。",
      battlePauseCount: "战斗已暂停（本场剩余暂停次数：{remaining} 次）。"
    },
    command: {
      missingCommand: "缺少 command 字段。",
      unknownCommand: "未定义之指令: {command}"
    },
    account: {
      resetDone: "账号数据已重置。",
      transferClaimed: "转移码兑换完成。"
    }
  },

  "en": {
    meta: {
      title: "Kohaku: Bond of RPS",
      titleEm: "Endless Koraku",
      subtitle: "KORAKU NO SHŌBU",
      eyebrow: "Janken: Tales of Foxfire",
      lead: "Decide your hand in five seconds. Read her fingertip tells and seize the only counterattack in defeat."
    },
    ui: {
      playerProfile: "Player Profile",
      switchLanguage: "Switch Language",
      toggleBgm: "Toggle BGM",
      toggleSfx: "Toggle SFX",
      mainMenu: "Main Menu",
      battleRecords: "Battle Records",
      footerInfo: "Footer Information",
      changelog: "View Changelog",
      galleryZoom: "View Full Size",
      galleryZoomTitle: "Zoom (High-Res)",
      rpsBattle: "RPS Battle",
      toggleAutoBattle: "Pause or Resume Auto Battle",
      kohakuHp: "Kohaku HP",
      battleLogToggle: "Battle Log (Click to toggle size)",
      battleLogToggleTitle: "Click to toggle log size: latest 1 / recent 5 / all records",
      roundStatus: "Current Round Status",
      playerHpMp: "Player HP and MP",
      selectHand: "Select Hand",
      itemSkillBar: "Item & Skill Bar",
      counterQte: "Counter QTE",
      directionInput: "Direction Input",
      toggleUiVisibility: "Toggle UI Visibility",
      toggleUiVisibilityTitle: "Appreciate Artwork (Toggle UI)",
      togglePanelSize: "Toggle Panel Size",
      togglePanelSizeTitle: "Toggle Panel Size",
      closeOverlay: "Close Overlay",
      dojoQtePractice: "Dojo QTE Practice",
      closeModal: "Close Dialog",
      clickSelectAll: "Click to Select All",
      openOriginalImage: "Open original image in new tab",
      closeGalleryZoom: "Close Zoom View",
      closeGalleryZoomTitle: "Close (ESC)",
      selectRockKey: "Select Rock (Hotkey: 1)",
      selectPaperKey: "Select Paper (Hotkey: 2)",
      selectScissorsKey: "Select Scissors (Hotkey: 3)",
      selectLeftRockKey: "Left Rock (Hotkey: 1 or Q)",
      selectLeftPaperKey: "Left Paper (Hotkey: 2 or W)",
      selectLeftScissorsKey: "Left Scissors (Hotkey: 3 or E)",
      selectRightRockKey: "Right Rock (Hotkey: 7 or J or Num1)",
      selectRightPaperKey: "Right Paper (Hotkey: 8 or K or Num2)",
      selectRightScissorsKey: "Right Scissors (Hotkey: 9 or L or Num3)",
      useHpPotionKey: "Use HP Potion (Hotkey: 4 or Q)",
      useMorphKey: "Morph within 1s (Hotkey: F)",
      useMpPotionKey: "Use MP Potion (Hotkey: 5 or E)",

      menuRecords: "Records & Stats",
      menuRecordsSub: "RECORDS & STATS",
      homeRecordsTitle: "Journey Records & Combat Analysis",
      homeRecordsDesc: "Detailed records of your combat performance, gear loadout, and growth statistics across all chapters.",
      theoreticalDps: "Theoretical DPS",
      combatDps: "Combat DPS",
      currentEquipment: "Current Equipment Loadout",
      currentLevelXp: "Level & EXP Progress",
      consumablesUsed: "Consumables Used",
      morphSuccesses: "Morph Reversals",
      momoStats: "Momo Petting Procs",
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
      recordsHpRestoredSummary: "{count} Bottles (+{restored} HP)",
      recordsMpRestoredSummary: "{count} Bottles (+{restored} MP)",
      recordsSkillUsesSummary: "{success}/{attempts} Hits ({rate}%, {damage} DMG)",
      paperdollReadOnlyHint: "(Read-only view; change gear on the \"Equipment & Bag\" page)",
      notEquipped: "Unequipped",
      noRecentBattles: "No battle records yet. Go start a match!",
      battleLogPotions: "HP: {hpUsed} Bottles (+{hpRestored}) / MP: {mpUsed} Bottles (+{mpRestored})",
      battleLogMorphSummary: "{count} Hits ({damage} DMG)",
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
      home: "Home",
      level: "Level",
      xp: "EXP",
      changelogTitle: "Changelog",
      changelogSubtitle: "Version history and patch notes",
      closeChangelog: "Close",
      currentVersion: "Current Version",
      currentVersionStatus: "Live and active",
      coins: "Star Sand",
      soundToggle: "Toggle SFX",
      sfxToggle: "Toggle SFX",
      musicToggle: "Toggle Music",
      musicToggleOn: "Unmute Music",
      musicToggleOff: "Mute Music",
      sfxToggleOn: "Unmute SFX",
      sfxToggleOff: "Mute SFX",
      musicOnToast: "Background music enabled.",
      musicOffToast: "Background music disabled.",
      sfxOnToast: "Sound effects enabled.",
      sfxOffToast: "Sound effects disabled.",
      rewardEarned: "Rewards Earned",
      zoomHighRes: "Zoom HD",
      galleryDiffToggle: "Variant",
      galleryDiffDefault: "Default Swimsuit",
      galleryDiffWatermelon: "Watermelon Split",
      clickToZoom: "Click to view full resolution",
      closeLightbox: "Close",
      langToggle: "Language",
      back: "Back",
      wins: "Wins",
      losses: "Losses",
      deepestStage: "Deepest Chapter",
      receptionSeal: "Ready for<br>Battle",
      openCheat: "Debug & Cheat Menu",
      cheatAuthTitle: "Cheat Verification",
      cheatAuthPrompt: "Enter admin passcode to unlock the debug menu:",
      cheatAuthPlaceholder: "Passcode (8989)",
      cheatAuthConfirm: "Unlock",
      cheatAuthCancel: "Cancel",
      cheatAuthError: "Incorrect passcode! Debug menu remains locked.",
      cheatAuthSuccess: "Passcode accepted. Debug menu unlocked!",
      galleryUnlockedTag: "Unlocked",
      galleryLockedTag: "Locked",
      resetSave: "Reset Save",
      resetConfirm: "Are you sure you want to reset all save data? This cannot be undone.",
      saveRecord: "Save Records",
      saveRecordModalTitle: "Save Records & Seed Management",
      saveOverviewTitle: "Current Save Overview",
      saveOverviewLevel: "Adventure Level",
      saveOverviewCoins: "Star Sand",
      saveOverviewStage: "Deepest Chapter",
      saveOverviewBattles: "Total Battles",
      saveOverviewEquipCount: "Equipment Owned",
      btnViewRecordsDetail: "View Records & Stats ›",
      saveRecordsHint: "The save seed code encapsulates your complete journey, chapter clears, manual/auto win-loss records, DPS analysis, and watermelon stats—fully preserved across devices.",
      saveSeedExportTitle: "Export Current Save Seed Code",
      saveSeedExportDesc: "This seed code encapsulates your full level, equipment, star sand, skills, and battle history for backup or cross-device transfer:",
      btnCopySaveSeed: "Copy Seed Code",
      toastSeedCopied: "Save seed code copied to clipboard!",
      saveSeedImportTitle: "Import Seed Code (Cross-Device Transfer)",
      saveSeedImportDesc: "Paste a save seed code from another device to load and transfer your journey to this device:",
      importSeedPlaceholder: "Paste save seed code here (e.g. KORAKU1_...)",
      btnImportSaveSeed: "Load & Apply Seed Code",
      confirmImportSeed: "Loading this seed code will overwrite your current save progress on this device. Do you want to proceed?",
      confirmAbandonBattle: "Retreating now will forfeit all star dust and XP. Are you sure you want to leave?",
      toastImportSuccess: "Save seed code successfully loaded and applied!",
      toastImportFailed: "Invalid or corrupted save seed code. Please check that you copied the complete text.",
      toastSeedEmpty: "Please enter or paste a save seed code first.",
      dangerZoneTitle: "Save Reset & Deletion Management",
      dangerZoneDesc: "Clear all game progress on this device (level, star sand, equipment, skills, and stats) back to default initial state:",
      btnModalResetSave: "Reset Save (Clear All Progress)",
      // Online connection, transfer code, export, delete
      connConnecting: "Connecting",
      connOnline: "Online",
      connOffline: "Offline Mode",
      connReconnecting: "Reconnecting",
      connDisconnected: "Disconnected",
      connBannerConnecting: "Connecting to server...",
      connBannerOnline: "Connected to authoritative server",
      connBannerOffline: "Running in local offline sandbox mode",
      connBannerReconnecting: "Connection lost. Reconnecting...",
      connBannerDisconnected: "Disconnected from server",
      connectionModeToggle: "Toggle Connection Mode",
      connectionErrorVersionMismatch: "Client version mismatch. Please reload to sync latest version.",
      connectionRateLimited: "Too many requests. Please try again shortly.",
      transferCode: "Transfer Code",
      transferCodeModalTitle: "Account Transfer Code Management",
      transferCodeIssueTitle: "Issue One-Time Transfer Code",
      transferCodeIssueDesc: "Generate a one-time code to migrate this account's full progress to a new device. Valid for 15 minutes upon issuance.",
      btnIssueTransferCode: "Generate Transfer Code",
      transferCodePrompt: "Your transfer code (Click to copy):",
      transferCodeExpiresIn: "Expires in: {minutes} minutes",
      btnCopyTransferCode: "Copy Transfer Code",
      toastTransferCodeCopied: "Transfer code copied to clipboard!",
      transferCodeClaimTitle: "Claim Transfer Code (Transfer to this Device)",
      transferCodeClaimDesc: "Enter the transfer code issued from your origin device to bind and load account data:",
      transferCodePlaceholder: "Enter 8-character code (e.g. KTR-XXXX-XXXX)",
      btnClaimTransferCode: "Claim & Load Account",
      confirmClaimTransferCode: "Claiming this transfer code will switch this device to the target account. Continue?",
      toastTransferCodeSuccess: "Account transferred successfully! Loaded latest save progress.",
      toastTransferCodeInvalid: "Invalid or expired transfer code. Please check or reissue.",
      exportJson: "Export Account Data (JSON)",
      exportJsonTitle: "Export Account Data (JSON)",
      exportJsonDesc: "Download a full JSON backup including adventure level, equipment instances, economic audit ledger, and match records:",
      btnDownloadJson: "Download JSON Backup",
      btnCopyJson: "Copy JSON",
      toastExportJsonSuccess: "Account data exported successfully!",
      deleteAccount: "Delete Account",
      deleteAccountTitle: "Permanently Delete Account & Cloud Records",
      deleteAccountWarning: "[WARNING] This action permanently destroys all character data, equipment, and records on both server and client. This cannot be undone!",
      deleteAccountConfirmPrompt: "To confirm permanent deletion, type 'DELETE' below:",
      btnConfirmDeleteAccount: "Permanently Delete Account",
      toastDeleteAccountSuccess: "Account and all progress have been permanently deleted.",
      toastDeleteAccountMismatch: "Confirmation text does not match. Deletion cancelled.",
      navDojo: "Training Dojo",
      menuDojo: "Training Dojo",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "Battle Log",
      damageSourceRps: "RPS Win",
      damageSourceMorph: "Morph Counter",
      damageSourceCounter: "QTE Counter",
      damageSourceMomo: "Momo Assist",
      damageSourceBurn: "Burn DOT",
      damageSourceReflect: "Mirror Reflect",
      damageSourceThunder: "Thunder Strike",
      damageSourceBurst: "Greatsword Burst",
      damageSourceEnemy: "Enemy Strike",
      atkLabel: "ATK",
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
      insufficientSp: "Not enough SP!",
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
      cheatModalTitle: "Debug & Cheat Menu",
      cheatAuthTitle: "Developer Entitlement Auth",
      cheatAuthPrompt: "Enter developer secret key to unlock cheat menu:",
      cheatAuthConfirm: "Verify",
      cheatAuthCancel: "Cancel",
      cheatAuthSuccess: "Authentication successful. Cheat menu unlocked!",
      cheatAuthError: "Incorrect password! Failed to unlock cheat menu.",
      cheatDevBadge: "DEV Admin Verified",
      cheatDemote: "Revoke Admin Mode",
      cheatDemoteSuccess: "Admin mode revoked. Restored to regular player.",
      cheatSetLevel: "Set Level",
      cheatAddCoins: "+1000 Star Sand",
      cheatAddSp: "+50 SP Points",
      cheatUnlockAllStages: "Unlock All Stages",
      cheatUnlockAllGallery: "Unlock All Gallery",
      cheatMaxAll: "Max Lv. + 99999 Coins + 100 SP",
      cheatAddPotions: "Get 10x Potions",
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
      unlock2PHint: "Defeat Chapter 4 (Final Chapter) 1 time to unlock",
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
      abandonBattleModalTitle: "⚠️ Leave Battle Confirmation",
      abandonBattleModalDesc: "Are you sure you want to leave? Current battle progress and uncollected rewards will be lost!",
      btnConfirmAbandon: "Leave Battle",
      btnCancelAbandon: "Continue",
      toggleSettlementUi: "View Standee",
      hideSettlementUi: "View Standee",
      showSettlementUi: "Show UI",
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
    dojo: {
      modalTitle: "Training Dojo & Sandbox",
      modalSubtitle: "Hone reflexes & test DPS build limits",
      mode1Title: "Mode 1: Pure Continuous QTE",
      mode1Desc: "No RPS or turns; continuous QTE sequence generation to sharpen muscle memory.",
      mode1Style1: "Style 1: Single Track QTE",
      mode1Style1Desc: "Standard 8-direction single-track keyboard drills",
      mode1Style2: "Style 2: Dual Track QTE",
      mode1Style2Desc: "Simulate Stage 4 dual-track controls (Left: WASD, Right: Arrows)",
      mode2Title: "Mode 2: Combat & DPS Sandbox",
      mode2Desc: "Full battle flow against solid-black Koyuki dummy with custom HP & damage, zero risk.",
      mode2Style1: "Style 1: Single Dummy Battle",
      mode2Style1Desc: "Single shadow silhouette dummy for DPS and morph counter practice",
      mode2Style2: "Style 2: Dual Dummy Battle",
      mode2Style2Desc: "Dual shadow silhouette dummies simulating Stage 4 dual hands & QTE",
      customHpLabel: "Dummy Max HP",
      customDmgLabel: "Dummy ATK Damage",
      zeroDamageHint: "(Default 0 DMG = player immune to loss)",
      btnStartPractice: "Start Practice",
      btnExitDojo: "End Practice",
      combo: "Combo",
      maxCombo: "Max Combo",
      avgReaction: "Avg Reaction",
      successRate: "Success Rate",
      dummySilhouette: "Shadow Kohaku",
      dummySilhouetteLeft: "Shadow Kohaku (L)",
      dummySilhouetteRight: "Shadow Kohaku (R)",
      chapterName: "Training Dojo",
      dojoStatsTitle: "Dojo Training Summary",
      btnReturnDojoMenu: "Return to Dojo Menu"
    },
    gallery: {
      koraku_default: {
        name: "Shrine Maiden: Fox Maiden Kohaku",
        variantName: "Default Outfit",
        description: "Kohaku the fox maiden guarding the Vermilion Torii. Dressed in her sleek cyber-miko outfit, she welcomes every challenger with a fearless smile."
      },
      koraku_2p: {
        name: "Mirror Realm: Platinum Kohaku",
        variantName: "2P Color",
        description: "The radiant platinum form appearing from beyond the mirror realm. Silver hair gleaming with azure light, unveiled only by champions of the Final Chapter."
      },
      swimsuit_default: {
        name: "Summer Festival: Breezy Swimsuit",
        variantName: "Summer Swimsuit",
        description: "A rare sight of Kohaku in her refreshing summer swimsuit, revealed only after claiming victory."
      },
      swimsuit_watermelon: {
        name: "Ocean Breeze: Watermelon Split",
        variantName: "Watermelon Split",
        description: "Kohaku proudly showing off her triumph after acing the blindfolded watermelon splitting game."
      }
    },
    dialogue: {
      watermelonNotAim: "Watermelon game not in aim phase.",

      speakerPlayer: "Traveler",
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
      winDualMorphBoth: "Both hands won via Morph! The dual stance completely collapses!",
      winDualBoth: "Both hands won! A flawless dual suppression!",
      winDualMorphSingle: "Breached one side using Morph!",
      winDualSingle: "Breached one side!",
      winDualMorphDoubleDmg: "Dual Morph total victory! Deals double damage!",
      winDualDoubleDmg: "Both hands won! Deals double damage!",
      winSingleMorph: "Morph reversal victory!",
      winSingleNormal: "Round won!",
      drawMomoDodge: "Tried to pet on a draw, but {target} nimbly dodged!",
      drawMomoHit: "Petted during the draw! Dealt {damage} surprise damage to {target}!",
      drawNormal: "It's a draw! Hands matched!",
      deflectedSingleAttack: "Deflected {target}'s attack!",
      dualQteMiss: "Dual QTE counter failed!",
      dualQteSuccess: "Dual QTE counter succeeded! Total reversal!",
      qteMiss: "QTE counter failed!",
      freezeNarration: "Frost Freeze! Kohaku's '{hand}' is frozen!",
      dodgeDodge: "Shadow Dodge! Successfully evaded the attack!",
      dodgeDodgeDual: "Shadow Dodge! Evaded the dual attacks!",
      postBattleWin: "You got me this time! What wish are you gonna use this win for?",
      postBattleLoss: "Got anything else to say? Hit the training grounds and try again!",
      askSwimsuitLine: "A swimsuit? Geez, fine... but just a quick peek, okay!",
      watermelonAttempt: "Strike #{nextAttempt}! When the white needle hits the green zone, call 'NOW!'!",
      watermelonHit: "Nice cut! Sliced clean through! {remaining} strike(s) left.",
      watermelonMiss: "So close! Still got {remaining} strike(s) left. Go for it next!",
      watermelonAllHit: "All 3 strikes done! Sliced it {successes} time(s)—that was so much fun!",
      watermelonDone: "All 3 strikes finished. Let's get the timing right next time!",
      itemUsed: "Used \"{name}\", restoring {restored} {resource}.",
      serverDisconnectGrace: "Connection lost. Preserving battle state (10s grace period)...",
      serverConfigMismatch: "Server update detected. Please reload to sync the latest version.",
      serverSessionReplaced: "Your account has connected from another device or tab. Session terminated.",
      serverInvalidCommand: "Action rejected: {reason}",
      serverLockedInBattle: "Equipment and stat allocation are locked during active battle!"
    },
    narration: {
      qteCounterPaper: "Wrapped hands around Kohaku's scissors — Counter success!",
      qteCounterScissors: "Caught Kohaku's fist with paper — Counter success!",
      qteCounterRock: "Interlocked fingers with Kohaku's soft hand, a miraculous win!"
    },
    toast: {
      levelRequirementNotMet: "Your level does not meet the requirement for this chapter."
    },
    combat: {
      morphWindowOnly: "Morph can only be used during the reaction window after Kohaku plays her hand.",
      morphWindowExpired: "Reaction window has expired.",
      insufficientMp: "Insufficient MP to use Morph.",
      tookDamage: "Took damage",
      notInBattle: "Not currently in battle.",
      itemNotFound: "Item not found.",
      resourceFull: "{resource} is already full.",
      itemDepleted: "{name} is depleted.",
      badgeAttack: "ATK",
      badgeHeal: "HEAL",
      badgeMana: "MP",
      badgeBurn: "BURN"
    },
    shop: {
      itemNotFound: "Item not found in shop.",
      insufficientCoins: "Not enough Star Dust. Earn more from battles!",
      itemPurchased: "Purchased '{name}'!",
      equipmentPurchased: "Purchased '{name}' and added to inventory!"
    },
    equip: {
      invalidItem: "Invalid equipment.",
      notInInventory: "Equipment not found in inventory.",
      invalidSlot: "Invalid equipment slot.",
      incompatibleSlot: "Cannot equip '{name}' to {slotName}.",
      equipped: "Equipped '{name}'.",
      slotEmpty: "This slot is empty.",
      unequipped: "Equipment unequipped."
    },
    growth: {
      invalidStat: "Invalid stat.",
      noPoints: "No stat points available.",
      statIncreased: "Stat increased.",
      invalidSkill: "Invalid skill.",
      levelRequirementNotMet: "Requires Level {level} to learn this skill.",
      skillMaxLevel: "This skill has reached max level.",
      insufficientPoints: "Insufficient skill points.",
      skillUpgraded: "'{name}' upgraded to Lv. {level}!"
    },
    cheat: {
      updated: "Values updated!",
      unlockedAll: "Unlocked all 4 stages and Boss guides!",
      unlockedGallery: "Unlocked all gallery illustrations!"
    },
    save: {
      transferCodeRequired: "Transfer code is required.",
      transferCodeNotFound: "Transfer code not found.",
      transferCodeAlreadyClaimed: "Transfer code has already been claimed.",
      transferCodeExpired: "Transfer code has expired.",
      transferClaimFailed: "Transfer code claim failed.",

      invalidCode: "Please enter a valid save code.",
      corruptCode: "Invalid or corrupted save code.",
      imported: "Save data successfully imported!"
    },
    connection: {
      newConnectionEstablished: "Another connection for this account was established. You have been disconnected.",

      connecting: "Connecting",
      online: "Online",
      offline: "Offline",
      reconnecting: "Reconnecting",
      disconnected: "Disconnected",
      highLatency: "Ping",
      kickedByNewConnection: "Your account has connected from another device or tab. This session was safely disconnected.",
      disconnectCountdown: "Connection lost. Reconnecting (Auto-settling in {seconds}s)...",
      bannerConnecting: "Connecting to server...",
      bannerOnline: "Connected to authoritative server",
      bannerOffline: "Running in local offline sandbox mode",
      bannerReconnecting: "Connection lost. Reconnecting...",
      bannerDisconnected: "Disconnected from server",
      noServerConfigured: "No server configuration detected. Switched to offline mode.",
      switchToOffline: "Play offline",
      switchToOnline: "Switch to online mode",
      commandFailedOffline: "Not connected to server; command timed out."
    },
    battle: {
      lockedDuringBattle: "Equipment and stat allocation are locked during active battle."
    },
    battleLog: {
      lockedDuringBattle: "Equipment and stat allocation are locked during active battle.",
      battleInProgress: "Battle already in progress.",
      battleStartFailed: "Failed to start battle.",
      noActiveBattle: "No active battle session.",
      invalidPhasePause: "Pause is only allowed during countdown phase.",
      useItemFailed: "Failed to use item.",

      rpsWin: "RPS [{hand}] Win! Dealt {damage} damage to {target}!",
      rpsLoss: "RPS [{hand}] Loss! Took {damage} damage!",
      rpsDraw: "Both showed [{hand}], Draw!",
      morphSuccess: "Morph [{hand}] Reversal! Dealt {damage} damage to {target}!",
      morphFailed: "Morph hand was countered! Mistake penalized!",
      qteCounterSuccess: "QTE Counter Success! Avoided damage and countered {target} for {damage} damage!",
      qteCounterFail: "QTE Counter Failed! Took {damage} heavy damage!",
      momoProc: "Momo Petting Proc! Dealt {damage} surprise damage to {target}!",
      momoDodged: "Little Raku deftly dodged the Momo Petting!",
      burnDamage: "Hellfire Burn! Dealt {damage} fire damage to {target}!",
      reflectDamage: "Yata Mirror Reflect! Reflected {damage} damage back to {target}!",
      thunderDamage: "Thunder Strike Addition! Struck {target} for {damage} extra thunder damage!",
      frostFreeze: "Frost Blade Freeze! Sealed Little Raku's [{hand}] for the next round!",
      shadowDodge: "Fox Illusion Haori activated! 25% shadow dodge completely avoided damage!",
      mpRegen: "White Fox Chihaya activated! Restored {amount} MP.",
      potionUsed: "Used [{item}], restored {amount} {stat}!",
      roundTimeout: "Round countdown expired! Forfeited round!",
      battleDisconnectedSettled: "Battle automatically settled due to disconnect timeout.",
      battlePauseCount: "Battle paused (Remaining pauses: {remaining})."
    },
    command: {
      missingCommand: "Missing command field.",
      unknownCommand: "Unknown command: {command}"
    },
    account: {
      resetDone: "Account data has been reset.",
      transferClaimed: "Transfer code claimed successfully."
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
      playerProfile: "プレイヤー情報",
      switchLanguage: "言語切替",
      toggleBgm: "BGM切替",
      toggleSfx: "効果音切替",
      mainMenu: "メインメニュー",
      battleRecords: "戦績",
      footerInfo: "フッター情報",
      changelog: "更新履歴を見る",
      galleryZoom: "全画面で見る",
      galleryZoomTitle: "高解像度鑑賞",
      rpsBattle: "じゃんけんバトル",
      toggleAutoBattle: "自動周回の一時停止／再開",
      kohakuHp: "コハクのHP",
      battleLogToggle: "戦闘ログ（クリックで表示切替）",
      battleLogToggleTitle: "表示切替：最新1件／直近5件／全記録",
      roundStatus: "現在のラウンド状況",
      playerHpMp: "プレイヤーHP・MP",
      selectHand: "手を選ぶ",
      itemSkillBar: "アイテム・スキルバー",
      counterQte: "反撃QTE",
      directionInput: "方向入力",
      toggleUiVisibility: "UI表示切替",
      toggleUiVisibilityTitle: "立ち絵鑑賞（UI表示切替）",
      togglePanelSize: "パネルサイズ切替",
      togglePanelSizeTitle: "拡大／縮小",
      closeOverlay: "オーバーレイを閉じる",
      dojoQtePractice: "道場QTE練習",
      closeModal: "閉じる",
      clickSelectAll: "クリックして全選択",
      openOriginalImage: "新しいタブで原寸画像を開く",
      closeGalleryZoom: "拡大表示を閉じる",
      closeGalleryZoomTitle: "閉じる (ESC)",
      selectRockKey: "グーを選択 (キー: 1)",
      selectPaperKey: "パーを選択 (キー: 2)",
      selectScissorsKey: "チョキを選択 (キー: 3)",
      selectLeftRockKey: "左手グー (キー: 1 または Q)",
      selectLeftPaperKey: "左手パー (キー: 2 または W)",
      selectLeftScissorsKey: "左手チョキ (キー: 3 または E)",
      selectRightRockKey: "右手グー (キー: 7 または J または Num1)",
      selectRightPaperKey: "右手パー (キー: 8 または K または Num2)",
      selectRightScissorsKey: "右手チョキ (キー: 9 または L または Num3)",
      useHpPotionKey: "HPポーション使用 (キー: 4 または Q)",
      useMorphKey: "1秒以内に手を変える (キー: F)",
      useMpPotionKey: "MPポーション使用 (キー: 5 または E)",

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
      momoStats: "なでなで発動",
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
      recordsHpRestoredSummary: "{count} 本 (+{restored} HP)",
      recordsMpRestoredSummary: "{count} 本 (+{restored} MP)",
      recordsSkillUsesSummary: "{success}/{attempts} 回 ({rate}%, {damage} ダメージ)",
      paperdollReadOnlyHint: "（閲覧のみ・装備変更は「プレイヤー装備」画面で行ってください）",
      notEquipped: "未装備",
      noRecentBattles: "対戦記録はまだありません。早速対局を始めましょう！",
      battleLogPotions: "HP: {hpUsed}本 (+{hpRestored}) / MP: {mpUsed}本 (+{mpRestored})",
      battleLogMorphSummary: "{count}回 ({damage}ダメージ)",
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
      home: "ホーム",
      level: "レベル",
      xp: "経験値",
      changelogTitle: "更新履歴",
      changelogSubtitle: "バージョン履歴と更新記録",
      closeChangelog: "閉じる",
      currentVersion: "現在のバージョン",
      currentVersionStatus: "稼働中",
      coins: "星砂",
      soundToggle: "効果音切替",
      sfxToggle: "効果音切替",
      musicToggle: "BGM切替",
      musicToggleOn: "BGMを再生",
      musicToggleOff: "BGMを消音",
      sfxToggleOn: "効果音を再生",
      sfxToggleOff: "効果音を消音",
      musicOnToast: "BGMを有効にしました。",
      musicOffToast: "BGMを無効にしました。",
      sfxOnToast: "効果音を有効にしました。",
      sfxOffToast: "効果音を無効にしました。",
      rewardEarned: "獲得報酬",
      zoomHighRes: "拡大鑑賞",
      galleryDiffToggle: "差分",
      galleryDiffDefault: "通常水着",
      galleryDiffWatermelon: "スイカ割り差分",
      clickToZoom: "クリックで高画質全画面拡大",
      closeLightbox: "閉じる",
      langToggle: "言語",
      back: "戻る",
      wins: "勝利",
      losses: "敗北",
      deepestStage: "到達章",
      receptionSeal: "対戦<br>受付中",
      openCheat: "デバッグ・チート設定",
      cheatAuthTitle: "チート認証",
      cheatAuthPrompt: "管理パスワードを入力してデバッグメニューを開放します：",
      cheatAuthPlaceholder: "パスワード (8989)",
      cheatAuthConfirm: "解除",
      cheatAuthCancel: "キャンセル",
      cheatAuthError: "パスワードが正しくありません。",
      cheatAuthSuccess: "パスワードが一致しました。デバッグメニューを開放しました！",
      galleryUnlockedTag: "解放済み",
      galleryLockedTag: "未解放",
      resetSave: "セーブ初期化",
      resetConfirm: "すべてのセーブデータを初期化しますか？この操作は取り消せません。",
      saveRecord: "セーブ記録",
      saveRecordModalTitle: "セーブ記録とシード管理",
      saveOverviewTitle: "現在のセーブ状況概要",
      saveOverviewLevel: "冒険レベル",
      saveOverviewCoins: "所持星砂",
      saveOverviewStage: "到達章",
      saveOverviewBattles: "総対局数",
      saveOverviewEquipCount: "所持装備数",
      btnViewRecordsDetail: "戦績統計の詳細を見る ›",
      saveRecordsHint: "セーブシードには冒険履歴、全章の戦績、手動/自動勝敗、DPS分析、スイカ命中記録がすべて完全に保存され、他端末でも無損失で復元されます。",
      saveSeedExportTitle: "現在のセーブシードを出力",
      saveSeedExportDesc: "現在のレベル、装備、星砂、スキル配分、戦績記録を含むシードコードです。バックアップや他端末への移行に使用できます：",
      btnCopySaveSeed: "シードをコピー",
      toastSeedCopied: "セーブシードをクリップボードにコピーしました！",
      saveSeedImportTitle: "シードを入力（他端末から引き継ぎ）",
      saveSeedImportDesc: "他の端末から出力したセーブシードを貼り付けて、本端末に冒険記録を引き継ぎます：",
      importSeedPlaceholder: "ここにセーブシードを貼り付け（例: KORAKU1_...）",
      btnImportSaveSeed: "シードを読み込んで適用",
      confirmImportSeed: "このシードを読み込むと現在の端末の進行データが上書きされます。適用しますか？",
      confirmAbandonBattle: "今撤退すると星砂や経験値を獲得できません。本当に離脱しますか？",
      toastImportSuccess: "セーブシードが正常に読み込まれ、適用されました！",
      toastImportFailed: "無効または破損したセーブシードです。コピー内容を確認してください。",
      toastSeedEmpty: "セーブシードを入力または貼り付けてください。",
      dangerZoneTitle: "セーブデータ初期化・削除管理",
      dangerZoneDesc: "この端末に保存されているすべての進行状況（レベル、星砂、装備、スキル、戦績）を消去して初期状態に戻します：",
      btnModalResetSave: "全セーブデータを初期化（消去）",
      // Online connection, transfer code, export, delete
      connConnecting: "接続中",
      connOnline: "オンライン",
      connOffline: "オフラインモード",
      connReconnecting: "再接続中",
      connDisconnected: "切断",
      connBannerConnecting: "サーバーに接続中...",
      connBannerOnline: "権威サーバーに接続完了",
      connBannerOffline: "ローカルオフラインモードで実行中",
      connBannerReconnecting: "接続が切断されました。再接続を試みています...",
      connBannerDisconnected: "サーバーから切断されました",
      connectionModeToggle: "接続モード切り替え",
      connectionErrorVersionMismatch: "バージョンが一致しません。ページを再読み込みしてください。",
      connectionRateLimited: "リクエスト頻度が高すぎます。しばらく待ってから再試行してください。",
      transferCode: "引き継ぎコード",
      transferCodeModalTitle: "アカウント引き継ぎコード管理",
      transferCodeIssueTitle: "ワンタイム引き継ぎコードの発行",
      transferCodeIssueDesc: "新しい端末へアカウントデータを移行するためのワンタイムコードを発行します。有効期限は発行後15分間です。",
      btnIssueTransferCode: "引き継ぎコードを発行",
      transferCodePrompt: "あなたの引き継ぎコード（クリックでコピー）：",
      transferCodeExpiresIn: "有効期限：{minutes}分",
      btnCopyTransferCode: "コードをコピー",
      toastTransferCodeCopied: "引き継ぎコードをクリップボードにコピーしました！",
      transferCodeClaimTitle: "引き継ぎコードの入力（この端末へ移行）",
      transferCodeClaimDesc: "移行元端末で発行された引き継ぎコードを入力してください。この端末へ進行状況が引き継がれます：",
      transferCodePlaceholder: "引き継ぎコードを入力（例: KTR-XXXX-XXXX）",
      btnClaimTransferCode: "引き継ぎを実行して読み込む",
      confirmClaimTransferCode: "引き継ぎを実行すると、対象のアカウントに切り替わります。続行しますか？",
      toastTransferCodeSuccess: "引き継ぎが完了しました！最新データを読み込みました。",
      toastTransferCodeInvalid: "無効または期限切れの引き継ぎコードです。再度ご確認ください。",
      exportJson: "アカウントデータ出力 (JSON)",
      exportJsonTitle: "アカウント全データのエクスポート (JSON)",
      exportJsonDesc: "レベル、装備インスタンス、経済台帳、対戦履歴を含む全データのJSONファイルをダウンロードします：",
      btnDownloadJson: "JSONファイルをダウンロード",
      btnCopyJson: "JSONをコピー",
      toastExportJsonSuccess: "アカウントデータのエクスポートが完了しました！",
      deleteAccount: "アカウント削除",
      deleteAccountTitle: "アカウントとクラウド記録の完全削除",
      deleteAccountWarning: "【警告】この操作を行うと、サーバーおよびローカルのアカウント情報、装備、記録が完全に削除され、復元できなくなります！",
      deleteAccountConfirmPrompt: "削除を確定するには、以下に「DELETE」と入力してください：",
      btnConfirmDeleteAccount: "アカウントを完全に削除する",
      toastDeleteAccountSuccess: "アカウントと全進行データが完全に削除されました。",
      toastDeleteAccountMismatch: "確認テキストが一致しないため、削除を中止しました。",
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "戦闘ログ",
      damageSourceRps: "じゃんけん勝利",
      damageSourceMorph: "変拳カウンター",
      damageSourceCounter: "QTEカウンター",
      damageSourceMomo: "なでなで急襲",
      damageSourceBurn: "炎上ダメージ",
      damageSourceReflect: "鏡光反射",
      damageSourceThunder: "雷鳴追撃",
      damageSourceBurst: "大剣一撃",
      damageSourceEnemy: "敵の攻撃",
      atkLabel: "ATK",
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
      insufficientSp: "スキルポイント不足！",
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
      cheatModalTitle: "デバッグ・チート設定",
      cheatAuthTitle: "開発者権限認証",
      cheatAuthPrompt: "チートメニューを開放する開発者キーを入力してください：",
      cheatAuthConfirm: "認証する",
      cheatAuthCancel: "キャンセル",
      cheatAuthSuccess: "認証成功。チートメニューを開放しました！",
      cheatAuthError: "パスワードが違います！チートメニューを開けません。",
      cheatDevBadge: "DEV 管理者認証済み",
      cheatDemote: "管理者権限を解除",
      cheatDemoteSuccess: "管理者権限を解除しました。通常プレイヤーに戻ります。",
      cheatSetLevel: "レベル変更",
      cheatAddCoins: "星砂追加 (+1000)",
      cheatAddSp: "SP追加 (+50)",
      cheatUnlockAllStages: "全ステージ開放",
      cheatUnlockAllGallery: "全図鑑開放",
      cheatMaxAll: "最大Lv + 99999 星砂 + 100 SP",
      cheatAddPotions: "各ポーション10個獲得",
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
      unlock2PHint: "終ノ章（第4章）を1回勝利して解放",
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
      abandonBattleModalTitle: "⚠️ 対戦離脱の確認",
      abandonBattleModalDesc: "対戦を離脱しますか？現在の進行状況と未精算の報酬は破棄されます。",
      btnConfirmAbandon: "離脱する",
      btnCancelAbandon: "戦闘を続ける",
      toggleSettlementUi: "立ち絵鑑賞",
      hideSettlementUi: "立ち絵鑑賞",
      showSettlementUi: "UIを表示",
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
    dojo: {
      modalTitle: "修練場・特訓メニュー",
      modalSubtitle: "反射神経を鍛え、ビルドの限界を試す",
      mode1Title: "モード1：純粋QTE無限練習",
      mode1Desc: "じゃんけんやターンなし。純粋に連続QTEを生成し、反射とキー入力を鍛えます。",
      mode1Style1: "第一式・単軌連続QTE",
      mode1Style1Desc: "標準8方向単一トラック連続入力練習",
      mode1Style2: "第二式・双軌同時QTE",
      mode1Style2Desc: "第4章双生ボスの双軌状況を再現（左手WASD、右手方向キー）",
      mode2Title: "モード2：戦闘シミュレーション＆DPS検証",
      mode2Desc: "通常戦闘の流れで黒影小楽と対戦。HPとダメージを自由に設定可能、敗北リスクなし。",
      mode2Style1: "第一式・単体ダミー対決",
      mode2Style1Desc: "単体黒影ダミーでDPSと変拳・カウンターを検証",
      mode2Style2: "第二式・双生ダミー対決",
      mode2Style2Desc: "双生黒影ダミーで第4章の両手出しと双軌QTEを再現",
      customHpLabel: "ダミーHP設定",
      customDmgLabel: "ダミー攻撃力",
      zeroDamageHint: "（初期値0＝プレイヤーへのダメージなし、敗北なし）",
      btnStartPractice: "修練開始",
      btnExitDojo: "修練終了",
      combo: "コンボ",
      maxCombo: "最大コンボ",
      avgReaction: "平均反応",
      successRate: "成功率",
      dummySilhouette: "影・小楽",
      dummySilhouetteLeft: "影・小楽（左）",
      dummySilhouetteRight: "影・小楽（右）",
      chapterName: "修練場",
      dojoStatsTitle: "修練リザルト",
      btnReturnDojoMenu: "修練メニューへ戻る"
    },
    gallery: {
      koraku_default: {
        name: "神社・狐娘コハク",
        variantName: "デフォルト",
        description: "朱鳥居を守護する狐娘コハク。機甲巫女装束をまとい、不敵な笑みで挑戦者を迎え撃つ。"
      },
      koraku_2p: {
        name: "鏡界・白金コハク",
        variantName: "2Pカラー",
        description: "鏡界の彼方より現れし白金の姿。銀髪と蒼光をたたえ、終ノ章を制覇した猛者のみが目撃できる。"
      },
      swimsuit_default: {
        name: "夏祭り・清涼水着",
        variantName: "清涼水着",
        description: "コハクが珍しく着替えた水着姿。勝負に勝った者だけが拝めるご褒美。"
      },
      swimsuit_watermelon: {
        name: "潮風・スイカ割り",
        variantName: "スイカ割り",
        description: "目隠しスイカ割りで完全勝利し、得意満面に成果を見せつけるコハク。"
      }
    },
    dialogue: {
      watermelonNotAim: "スイカ割りゲームはまだ照準段階に入っていません。",

      speakerPlayer: "旅人",
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
      winDualMorphBoth: "変拳で両手とも完全勝利！双生の構えが崩壊！",
      winDualBoth: "両手とも勝利！見事な完全制圧！",
      winDualMorphSingle: "変拳で片側の防壁を突破！",
      winDualSingle: "片側の守りを突破！",
      winDualMorphDoubleDmg: "両手変拳で完全勝利！2倍の特大ダメージ！",
      winDualDoubleDmg: "両手出拳で完全勝利！2倍の特大ダメージ！",
      winSingleMorph: "変拳で逆転勝利！",
      winSingleNormal: "出拳勝利！",
      drawMomoDodge: "あいこで撫でようとしましたが、{target}に軽やかに躱されました！",
      drawMomoHit: "あいこに乗じてなでなで！{target}に {damage} の不意打ちダメージ！",
      drawNormal: "あいこで引き分け！",
      deflectedSingleAttack: "{target}の攻撃を受け流した！",
      dualQteMiss: "双生QTE反撃ミス！",
      dualQteSuccess: "双生QTE反撃成功！戦局を完全逆転！",
      qteMiss: "QTE反撃失敗！",
      freezeNarration: "霜月氷結！小楽の「{hand}」が封印された！",
      dodgeDodge: "残影回避！攻撃の完全回避に成功！",
      dodgeDodgeDual: "残影回避！二重攻撃の完全回避に成功！",
      postBattleWin: "今回はキミの勝ち！この勝利、どんなお願い事に使うの？",
      postBattleLoss: "まだ何か言いたいことある？もっと特訓してからおいで！",
      askSwimsuitLine: "水着？もう、しょうがないなぁ……ちょっとだけだからね！",
      watermelonAttempt: "{nextAttempt}太刀目！白い針が緑のゾーンに入ったら『今だ！』って叫んでね！",
      watermelonHit: "見事！綺麗にスライスできたね。あと{remaining}太刀！",
      watermelonMiss: "惜しい〜！あと{remaining}太刀、次こそ狙っていこう！",
      watermelonAllHit: "3太刀全部終了！{successes}回命中、めっちゃ楽しかったね！",
      watermelonDone: "3太刀終了〜。次はもっと息を合わせていこうね。",
      itemUsed: "「{name}」を使用し、{resource}を {restored} 回復しました。",
      serverDisconnectGrace: "接続が切断されました。戦闘状態を保持中（10秒間）...",
      serverConfigMismatch: "サーバーの更新を検知しました。最新バージョンに同期するため再読み込みしてください。",
      serverSessionReplaced: "別端末または別タブで接続されたため、このセッションを切断しました。",
      serverInvalidCommand: "操作を実行できませんでした: {reason}",
      serverLockedInBattle: "戦闘中は装備の変更やステータス割り振りは行えません！"
    },
    narration: {
      qteCounterPaper: "小楽のチョキを包み込んで――反撃成功！",
      qteCounterScissors: "小楽の小さなグーをパーで受け止め――反撃成功！",
      qteCounterRock: "小楽の柔らかな手と指を絡ませて、奇跡の大勝利！"
    },
    toast: {
      levelRequirementNotMet: "この章の挑戦レベルに達していません。"
    },
    combat: {
      morphWindowOnly: "変拳は小楽の手が見えた直後のリアクション時間内にのみ使用できます。",
      morphWindowExpired: "リアクション受付時間が終了しました。",
      insufficientMp: "MPが不足しているため変拳を使用できません。",
      tookDamage: "ダメージを受けました",
      notInBattle: "現在は戦闘中ではありません。",
      itemNotFound: "アイテムが見つかりません。",
      resourceFull: "{resource}は既に満タンです。",
      itemDepleted: "{name}は使い切りました。",
      badgeAttack: "攻",
      badgeHeal: "療",
      badgeMana: "魔",
      badgeBurn: "灼"
    },
    shop: {
      itemNotFound: "商品が見つかりません。",
      insufficientCoins: "星砂が足りません。対戦で集めてからまた来てください。",
      itemPurchased: "「{name}」を購入しました！",
      equipmentPurchased: "「{name}」を購入し、装備バッグに追加しました！"
    },
    equip: {
      invalidItem: "無効な装備です。",
      notInInventory: "バッグにこの装備がありません。",
      invalidSlot: "無効な装備スロットです。",
      incompatibleSlot: "「{name}」を {slotName} に装備することはできません。",
      equipped: "「{name}」を装備しました。",
      slotEmpty: "このスロットには何も装備されていません。",
      unequipped: "装備を外しました。"
    },
    growth: {
      invalidStat: "無効なステータス項目です。",
      noPoints: "使用可能なポイントがありません。",
      statIncreased: "ステータスが上昇しました。",
      invalidSkill: "無効なスキル項目です。",
      levelRequirementNotMet: "このスキルを習得するには Lv. {level} が必要です。",
      skillMaxLevel: "このスキルは既に最大レベルです。",
      insufficientPoints: "スキルポイントが不足しています。",
      skillUpgraded: "「{name}」が Lv. {level} に強化されました！"
    },
    cheat: {
      updated: "数値を更新しました！",
      unlockedAll: "全4章のステージとBOSS解説を解放しました！",
      unlockedGallery: "図鑑の全立ち絵イラストを解放しました！"
    },
    save: {
      transferCodeRequired: "引き継ぎコードを入力してください。",
      transferCodeNotFound: "引き継ぎコードが見つかりません。",
      transferCodeAlreadyClaimed: "この引き継ぎコードは既に使用されています。",
      transferCodeExpired: "引き継ぎコードの有効期限が切れています。",
      transferClaimFailed: "引き継ぎコードの受け取りに失敗しました。",

      invalidCode: "有効なセーブコードを入力してください。",
      corruptCode: "無効または破損したセーブコードです。",
      imported: "セーブデータを正常に読み込みました！"
    },
    connection: {
      newConnectionEstablished: "このアカウントで別の接続が確立されたため切断されました。",

      connecting: "接続中",
      online: "オンライン",
      offline: "オフライン",
      reconnecting: "再接続中",
      disconnected: "切断",
      highLatency: "遅延",
      kickedByNewConnection: "別端末または別タブで接続されたため、このセッションを切断しました。",
      disconnectCountdown: "接続が切断されました。再接続中（あと {seconds} 秒で自動精算）...",
      bannerConnecting: "サーバーに接続中...",
      bannerOnline: "権威サーバーに接続完了",
      bannerOffline: "ローカルオフラインモードで実行中",
      bannerReconnecting: "接続が切断されました。再接続を試みています...",
      bannerDisconnected: "サーバーから切断されました",
      noServerConfigured: "サーバー設定が見つからないため、オフラインモードに切り替えました",
      switchToOffline: "オフラインで遊ぶ",
      switchToOnline: "オンラインモードに切り替え",
      commandFailedOffline: "サーバーに未接続のため、コマンドがタイムアウトしました"
    },
    battle: {
      lockedDuringBattle: "戦闘中は装備の変更および能力値の配分が固定されています。"
    },
    battleLog: {
      lockedDuringBattle: "戦闘中は装備の変更および能力値の配分が固定されています。",
      battleInProgress: "戦闘が既に進行中です。",
      battleStartFailed: "戦闘の開始に失敗しました。",
      noActiveBattle: "アクティブな戦闘がありません。",
      invalidPhasePause: "一時停止はカウントダウン中のみ可能です。",
      useItemFailed: "アイテムの使用に失敗しました。",

      rpsWin: "じゃんけん【{hand}】で勝利！{target} に {damage} ダメージ！",
      rpsLoss: "じゃんけん【{hand}】で敗北... {damage} ダメージを受けた！",
      rpsDraw: "お互いに【{hand}】であいこ！",
      morphSuccess: "変拳【{hand}】で逆転成功！{target} に {damage} ダメージ！",
      morphFailed: "変拳が裏目に出て敗北判定！",
      qteCounterSuccess: "QTE 反制成功！危機を回避し {target} に {damage} の反撃ダメージ！",
      qteCounterFail: "QTE 反制失敗... {damage} の痛撃を受けた！",
      momoProc: "なでなで発動！{target} に {damage} の不意打ちダメージ！",
      momoDodged: "小楽は素早く身をかわしてなでなでを回避した！",
      burnDamage: "狐火の業火が炸裂！{target} に {damage} の燃焼ダメージ！",
      reflectDamage: "八咫の鏡が反射！{target} に {damage} ダメージを跳ね返した！",
      thunderDamage: "神鳴の雷光が追撃！{target} に {damage} の追加雷撃ダメージ！",
      frostFreeze: "霜月の氷結が発動！小楽の次ターンの【{hand}】を封印！",
      shadowDodge: "霊狐の羽織が発動！残影によりダメージを完全回避！",
      mpRegen: "白狐の千早が発動！MPを {amount} 回復。",
      potionUsed: "【{item}】を使用し、{stat} を {amount} 回復！",
      roundTimeout: "時間切れ！出し遅れにより敗北判定！",
      battleDisconnectedSettled: "切断タイムアウトにより戦闘が自動清算されました。",
      battlePauseCount: "戦闘を一時停止しました（残り一時停止可能回数: {remaining}回）。"
    },
    command: {
      missingCommand: "command フィールドが不足しています。",
      unknownCommand: "未定義のコマンド: {command}"
    },
    account: {
      resetDone: "アカウントデータを初期化しました。",
      transferClaimed: "引き継ぎコードの引き換えが完了しました。"
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

  getChangelog() {
    const locale = this.currentLocale || "zh-Hant";
    return CHANGELOG_DATA.map((entry) => ({
      version: entry.version,
      date: entry.date,
      tag: entry.tag,
      changes: entry.changes[locale] || entry.changes["zh-Hant"] || []
    }));
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
function encodeSaveData(data) {
  if (!data || typeof data !== "object") return "";
  try {
    const json = JSON.stringify(data);
    if (typeof Buffer !== "undefined") {
      return "KORAKU1_" + Buffer.from(json, "utf8").toString("base64");
    }
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return "KORAKU1_" + btoa(binary);
  } catch {
    return "";
  }
}

function decodeSaveData(code) {
  if (!code || typeof code !== "string") return null;
  let raw = code.trim();
  if (raw.startsWith("KORAKU1_")) {
    raw = raw.substring("KORAKU1_".length).trim();
  } else if (raw.startsWith("KORAKU_V1_")) {
    raw = raw.substring("KORAKU_V1_".length).trim();
  }
  if (raw.startsWith("{") && raw.endsWith("}")) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  try {
    if (typeof Buffer !== "undefined") {
      const json = Buffer.from(raw, "base64").toString("utf8");
      return JSON.parse(json);
    }
    const binary = atob(raw);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

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

function createSeededRandom(seed = 123456789) {
  let s = typeof seed === "number" ? Math.floor(Math.abs(seed)) || 1 : hashSeedString(String(seed));
  return function seededRandom() {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t >>> 0) / 4294967296);
  };
}

function hashSeedString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
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
      key: "narration.qteCounterPaper",
      text: "用手包裹住小樂的剪刀手——反制成功！"
    },
    scissors: {
      changedHand: "paper",
      key: "narration.qteCounterScissors",
      text: "用布握住了小樂的小拳頭——反制成功！"
    },
    rock: {
      changedHand: "paper",
      key: "narration.qteCounterRock",
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

const WASD_CODE_MAP = Object.freeze({
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
  KeyQ: "upLeft",
  KeyE: "upRight",
  KeyZ: "downLeft",
  KeyC: "downRight"
});

const ARROW_CODE_MAP = Object.freeze({
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Numpad8: "up",
  Numpad2: "down",
  Numpad4: "left",
  Numpad6: "right",
  Numpad7: "upLeft",
  Numpad9: "upRight",
  Numpad1: "downLeft",
  Numpad3: "downRight",
  Digit8: "up",
  Digit2: "down",
  Digit4: "left",
  Digit6: "right",
  Digit7: "upLeft",
  Digit9: "upRight",
  Digit1: "downLeft",
  Digit3: "downRight"
});

const ALL_CODE_MAP = Object.freeze({
  ...WASD_CODE_MAP,
  ...ARROW_CODE_MAP
});

function wasdDirectionFromKey(key, code = null) {
  if (code && WASD_CODE_MAP[code]) return WASD_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  return WASD_KEY_MAP[normalized] || null;
}

function arrowDirectionFromKey(key, code = null) {
  if (code && ARROW_CODE_MAP[code]) return ARROW_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  return ARROW_KEY_MAP[normalized] || null;
}

function directionFromKey(key, code = null) {
  if (code && ALL_CODE_MAP[code]) return ALL_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  if (WASD_KEY_MAP[normalized]) return WASD_KEY_MAP[normalized];
  if (ARROW_KEY_MAP[normalized]) return ARROW_KEY_MAP[normalized];
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

function directionFromSwipe(dx, dy, minDistance = 24) {
  const distance = Math.hypot(dx, dy);
  if (distance < minDistance) return null;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI; // Range: -180 to 180
  if (deg >= -22.5 && deg < 22.5) return "right";
  if (deg >= 22.5 && deg < 67.5) return "downRight";
  if (deg >= 67.5 && deg < 112.5) return "down";
  if (deg >= 112.5 && deg < 157.5) return "downLeft";
  if (deg >= 157.5 || deg < -157.5) return "left";
  if (deg >= -157.5 && deg < -112.5) return "upLeft";
  if (deg >= -112.5 && deg < -67.5) return "up";
  if (deg >= -67.5 && deg < -22.5) return "upRight";
  return null;
}

function isUnmappedActionKey(key, code = null) {
  const isModifier = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].includes(key) ||
                     (code && ["ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight", "MetaLeft", "MetaRight", "CapsLock", "Tab", "Escape"].includes(code));
  if (isModifier) return false;
  // If it's a valid direction key for any QTE mode (WASD, Arrows, Numpad, or Diagonals), it's not unmapped
  if (directionFromKey(key, code)) return false;
  return true;
}

class QTEKeyboardInput {
  constructor(mapper = directionFromKey) {
    this.mapper = mapper;
    this.held = new Set();
  }

  keyDown(key, expectedDirection, repeat = false, code = null) {
    const direction = this.mapper(key, code);
    if (!direction) {
      if (isUnmappedActionKey(key, code) && !repeat) {
        this.held.clear();
        return { handled: true, direction: "invalid" };
      }
      return { handled: false, direction: null };
    }

    if (isDiagonalDirection(direction)) {
      if (repeat && direction !== expectedDirection) {
        return { handled: true, direction: null };
      }
      return { handled: true, direction };
    }

    if (!CARDINAL_DIRECTIONS.has(direction)) {
      return { handled: false, direction: null };
    }

    if (repeat) {
      if (direction === expectedDirection) {
        return { handled: true, direction };
      }
      return { handled: true, direction: null };
    }

    if (isDiagonalDirection(expectedDirection)) {
      const chord = DIRECTION_CHORDS[expectedDirection];
      if (!chord || !chord.includes(direction)) {
        this.held.clear();
        return { handled: true, direction };
      }

      this.held.delete(OPPOSITES[direction]);
      this.held.add(direction);

      const combined = combineCardinalDirections(this.held);
      if (combined) {
        return {
          handled: true,
          direction: combined
        };
      }
      return { handled: true, direction: null };
    }

    this.held.delete(OPPOSITES[direction]);
    this.held.add(direction);

    return { handled: true, direction };
  }

  keyUp(key, code = null) {
    const direction = this.mapper(key, code);
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
  constructor(bus, timers, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.timers = timers;
    this.random = typeof random === "function" ? random : Math.random;
    this.now = typeof now === "function" ? now : () => Date.now();
    this.active = false;
    this.sequence = [];
    this.index = 0;
    this.startTime = 0;
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
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? lengthOrOptions.allowedDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? Infinity;
    } else {
      length = lengthOrOptions ?? 5;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? options.allowedDirections ?? "all";
      maxErrors = options.maxErrors ?? Infinity;
    }

    this.active = true;
    this.index = 0;
    this.errors = 0;
    this.maxErrors = maxErrors;
    this.durationMs = duration;
    this.startTime = this.now();
    this.deadline = this.startTime + duration;

    this.sequence = this.generateSequence(length, directionMode);
    this.emit();
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
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

  input(directionId, declaredAt = null) {
    if (!this.active) return false;
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    // Timing check with 150ms grace
    if (timestamp > this.deadline + 150) {
      this.finish(false);
      return false;
    }

    const expected = this.sequence[this.index];
    if (directionId !== expected) {
      this.errors += 1;
      this.bus.emit("qte:wrong", {
        expected,
        received: directionId,
        errors: this.errors,
        maxErrors: this.maxErrors
      });
      this.bus.emit("sound", { name: "qteWrong" });
      if (this.errors >= this.maxErrors) {
        this.finish(false);
      }
      return false;
    }

    const prevIndex = this.index;
    this.index += 1;
    this.bus.emit("qte:step", { directionId, index: prevIndex, total: this.sequence.length });
    this.bus.emit("sound", { name: "qteSuccess" });
    this.emit();
    if (this.index >= this.sequence.length) {
      this.finish(true);
    }
    return true;
  }

  auditInputs(inputs = []) {
    if (!this.active) return { ok: false, active: false };
    const results = [];
    for (const item of inputs) {
      const dir = item.directionId || item.direction || item.key;
      const ts = item.timestamp || item.declaredAt || this.now();
      if (ts < this.startTime - 150 || ts > this.deadline + 150) {
        this.errors += 1;
        results.push({ item, valid: false, reason: "timestamp_out_of_bounds" });
        if (this.errors >= this.maxErrors) {
          this.finish(false);
          return { ok: false, success: false, errors: this.errors, results };
        }
        continue;
      }
      const ok = this.input(dir, ts);
      results.push({ item, valid: ok });
      if (!this.active) break;
    }
    return {
      ok: true,
      success: this.index >= this.sequence.length && this.errors < this.maxErrors,
      errors: this.errors,
      index: this.index,
      results
    };
  }

  reportBatch(inputs = []) {
    return this.auditInputs(inputs);
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - this.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = this.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
        this.finish(false);
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - this.now());
    return {
      active: this.active,
      isPaused: Boolean(this.isPaused),
      sequence: [...this.sequence],
      index: this.index,
      errors: this.errors,
      maxErrors: this.maxErrors,
      startTime: this.startTime,
      deadline: this.deadline,
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
    if (!success) {
      this.bus.emit("sound", { name: "qteFail" });
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
  constructor(bus, timers, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.timers = timers;
    this.random = typeof random === "function" ? random : Math.random;
    this.now = typeof now === "function" ? now : () => Date.now();
    this.active = false;
    this.left = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "left" };
    this.right = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "right" };
    this.startTime = 0;
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
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? lengthOrOptions.allowedDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? 1;
    } else {
      length = lengthOrOptions ?? 7;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? options.allowedDirections ?? "all";
      maxErrors = options.maxErrors ?? 1;
    }

    this.active = true;
    this.durationMs = duration;
    this.startTime = this.now();
    this.deadline = this.startTime + duration;
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

    this.emit();
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
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

  inputSlot(slotKey, directionId, declaredAt = null) {
    if (!this.active) return false;
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    if (timestamp > this.deadline + 150) {
      this.finish();
      return false;
    }

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
      this.bus.emit("sound", { name: "qteWrong" });
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

    const prevIndex = slot.index;
    slot.index += 1;
    this.bus.emit("qte:step", { slot: slotKey, directionId, index: prevIndex, total: slot.sequence.length });
    this.bus.emit("sound", { name: "qteSuccess" });
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

  input(directionOrSlot, slotOrDirection = null, declaredAt = null) {
    if (!this.active) return false;
    let slot = "left";
    let direction = directionOrSlot;
    if (slotOrDirection === "left" || slotOrDirection === "right") {
      slot = slotOrDirection;
      direction = directionOrSlot;
    } else if (directionOrSlot === "left" || directionOrSlot === "right") {
      slot = directionOrSlot;
      direction = slotOrDirection;
    } else if (!slotOrDirection) {
      if (!this.left.completed) slot = "left";
      else if (!this.right.completed) slot = "right";
    }
    return this.inputSlot(slot, direction, declaredAt);
  }

  inputLeft(directionId, declaredAt = null) {
    return this.inputSlot("left", directionId, declaredAt);
  }

  inputRight(directionId, declaredAt = null) {
    return this.inputSlot("right", directionId, declaredAt);
  }

  auditInputs(inputs = []) {
    if (!this.active) return { ok: false, active: false };
    const results = [];
    for (const item of inputs) {
      const slot = item.slot || (item.side === "right" ? "right" : "left");
      const dir = item.directionId || item.direction || item.key;
      const ts = item.timestamp || item.declaredAt || this.now();
      if (ts < this.startTime - 150 || ts > this.deadline + 150) {
        if (this[slot]) this[slot].errors += 1;
        results.push({ item, valid: false, reason: "timestamp_out_of_bounds" });
        continue;
      }
      const ok = this.inputSlot(slot, dir, ts);
      results.push({ item, valid: ok });
      if (!this.active) break;
    }
    return {
      ok: true,
      left: { completed: this.left.completed, success: this.left.success, errors: this.left.errors },
      right: { completed: this.right.completed, success: this.right.success, errors: this.right.errors },
      results
    };
  }

  reportBatch(inputs = []) {
    return this.auditInputs(inputs);
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - this.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = this.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
        this.finish();
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - this.now());
    return {
      mode: "dual",
      active: this.active,
      isPaused: Boolean(this.isPaused),
      left: { ...this.left, sequence: [...this.left.sequence] },
      right: { ...this.right, sequence: [...this.right.sequence] },
      startTime: this.startTime,
      deadline: this.deadline,
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

    if (!leftSuccess && !rightSuccess) {
      this.bus.emit("sound", { name: "qteFail" });
    }

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
  version: 2,
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
  ledger: [],
  records: {
    wins: 0,
    losses: 0,
    bestStage: 0,
    unlockedSwimsuit: false,
    clearedStages: [],
    totalCoinsEarned: 0,
    totalXpEarned: 0,
    totalBattles: 0,
    manualWins: 0,
    manualLosses: 0,
    autoWins: 0,
    autoLosses: 0,
    watermelonStock: 0,
    watermelonSlices: 0,
    consumablesUsed: { hpPotion: 0, mpPotion: 0 },
    morphUses: 0,
    momoStats: { attempts: 0, successes: 0, damage: 0 },
    morphStats: { attempts: 0, successes: 0, damage: 0 },
    restoredTotal: { hp: 0, mp: 0 },
    watermelonStageStats: {
      1: { attempts: 0, successes: 0 },
      2: { attempts: 0, successes: 0 },
      3: { attempts: 0, successes: 0 }
    },
    damageDealt: {
      total: 0,
      byStage: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    damageTaken: {
      total: 0,
      byStage: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    qteStats: {
      totalAttempts: 0,
      totalSuccesses: 0,
      byStage: {
        1: { attempts: 0, successes: 0 },
        2: { attempts: 0, successes: 0 },
        3: { attempts: 0, successes: 0 },
        4: { attempts: 0, successes: 0 }
      }
    },
    rewardsByStage: {
      1: { coins: 0, xp: 0 },
      2: { coins: 0, xp: 0 },
      3: { coins: 0, xp: 0 },
      4: { coins: 0, xp: 0 }
    },
    stageStats: {
      1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 },
      4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 }
    },
    recentBattles: []
  },
  settings: {
    muted: false,
    musicMuted: false,
    sfxMuted: false
  }
});

function createEquipmentInstance(itemOrId, options = {}) {
  const typeId = typeof itemOrId === "object" && itemOrId !== null ? (itemOrId.typeId || itemOrId.id) : String(itemOrId);
  const nowMs = typeof options.now === "function" ? options.now() : (typeof options.now === "number" ? options.now : Date.now());
  const randomStr = typeof options.random === "function"
    ? options.random().toString(36).substring(2, 9)
    : Math.random().toString(36).substring(2, 9);
  const uid = (typeof itemOrId === "object" && itemOrId !== null && itemOrId.uid)
    ? itemOrId.uid
    : (options.uid || `eq_${nowMs}_${randomStr}`);
  const level = (typeof itemOrId === "object" && itemOrId !== null && typeof itemOrId.level === "number")
    ? itemOrId.level
    : (options.level || 1);
  return { uid, typeId, level };
}

function getEquipmentTypeId(itemOrId) {
  if (!itemOrId) return null;
  if (typeof itemOrId === "object" && itemOrId !== null) {
    return itemOrId.typeId || itemOrId.id || null;
  }
  return String(itemOrId);
}

function freshSave() {
  return structuredClone(DEFAULT_SAVE);
}

function migrateSave(candidate, fromVersion = 1, toVersion = 2) {
  if (!candidate || typeof candidate !== "object") return freshSave();
  const migrated = structuredClone(candidate);
  const currentVersion = migrated.version || fromVersion || 1;

  if (currentVersion === 1 && toVersion >= 2) {
    migrated.version = 2;
    if (!Array.isArray(migrated.ledger)) {
      migrated.ledger = [];
    }
  }

  return migrated;
}

function sanitizeSave(candidate) {
  if (!candidate || typeof candidate !== "object") return freshSave();
  const migrated = candidate.version === 2 ? candidate : migrateSave(candidate, candidate.version || 1, 2);
  const base = freshSave();

  const rawStats = migrated.records?.stageStats || {};
  const stageStats = {
    1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[1] || {}) },
    2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[2] || {}) },
    3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[3] || {}) },
    4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[4] || {}) }
  };

  const rawCleared = migrated.records?.clearedStages;
  let clearedStages = Array.isArray(rawCleared) ? [...rawCleared] : [];
  clearedStages = clearedStages.filter((stageId) => {
    if (stageId >= 1 && stageId <= 4) {
      const s = stageStats[stageId];
      if (s && ((s.manualWins || 0) + (s.autoWins || 0) > 0)) return true;
      if (stageId === 1 && ((migrated.records?.wins || 0) > 0 || (migrated.records?.manualWins || 0) > 0)) return true;
      if (migrated.records?.bestStage && migrated.records.bestStage >= stageId) return true;
    }
    return false;
  });

  return {
    ...base,
    ...migrated,
    version: 2,
    profile: {
      ...base.profile,
      ...migrated.profile,
      allocations: {
        ...base.profile.allocations,
        ...migrated.profile?.allocations
      },
      skills: {
        ...base.profile.skills,
        ...migrated.profile?.skills
      }
    },
    inventory: { ...base.inventory, ...migrated.inventory },
    equipment: { ...base.equipment, ...migrated.equipment },
    inventoryEquipment: Array.isArray(migrated.inventoryEquipment) ? [...migrated.inventoryEquipment] : [],
    ledger: Array.isArray(migrated.ledger) ? [...migrated.ledger].slice(-500) : [],
    records: {
      ...base.records,
      ...migrated.records,
      clearedStages,
      totalCoinsEarned: migrated.records?.totalCoinsEarned ?? migrated.coins ?? 0,
      totalXpEarned: migrated.records?.totalXpEarned ?? 0,
      totalBattles: migrated.records?.totalBattles ?? ((migrated.records?.wins || 0) + (migrated.records?.losses || 0)),
      manualWins: migrated.records?.manualWins ?? migrated.records?.wins ?? 0,
      manualLosses: migrated.records?.manualLosses ?? migrated.records?.losses ?? 0,
      autoWins: migrated.records?.autoWins ?? 0,
      autoLosses: migrated.records?.autoLosses ?? 0,
      watermelonStock: Math.max(0, Math.min(999, migrated.records?.watermelonStock ?? 0)),
      watermelonSlices: migrated.records?.watermelonSlices ?? 0,
      consumablesUsed: {
        hpPotion: migrated.records?.consumablesUsed?.hpPotion || 0,
        mpPotion: migrated.records?.consumablesUsed?.mpPotion || 0
      },
      morphUses: migrated.records?.morphUses || 0,
      momoStats: {
        attempts: migrated.records?.momoStats?.attempts || 0,
        successes: migrated.records?.momoStats?.successes || 0,
        damage: migrated.records?.momoStats?.damage || 0
      },
      morphStats: {
        attempts: migrated.records?.morphStats?.attempts || 0,
        successes: migrated.records?.morphStats?.successes || 0,
        damage: migrated.records?.morphStats?.damage || 0
      },
      restoredTotal: {
        hp: migrated.records?.restoredTotal?.hp || 0,
        mp: migrated.records?.restoredTotal?.mp || 0
      },
      watermelonStageStats: {
        1: { attempts: migrated.records?.watermelonStageStats?.[1]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[1]?.successes || 0 },
        2: { attempts: migrated.records?.watermelonStageStats?.[2]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[2]?.successes || 0 },
        3: { attempts: migrated.records?.watermelonStageStats?.[3]?.attempts || 0, successes: migrated.records?.watermelonStageStats?.[3]?.successes || 0 }
      },
      damageDealt: {
        total: migrated.records?.damageDealt?.total || 0,
        byStage: {
          1: migrated.records?.damageDealt?.byStage?.[1] || 0,
          2: migrated.records?.damageDealt?.byStage?.[2] || 0,
          3: migrated.records?.damageDealt?.byStage?.[3] || 0,
          4: migrated.records?.damageDealt?.byStage?.[4] || 0
        }
      },
      damageTaken: {
        total: migrated.records?.damageTaken?.total || 0,
        byStage: {
          1: migrated.records?.damageTaken?.byStage?.[1] || 0,
          2: migrated.records?.damageTaken?.byStage?.[2] || 0,
          3: migrated.records?.damageTaken?.byStage?.[3] || 0,
          4: migrated.records?.damageTaken?.byStage?.[4] || 0
        }
      },
      qteStats: {
        totalAttempts: migrated.records?.qteStats?.totalAttempts || 0,
        totalSuccesses: migrated.records?.qteStats?.totalSuccesses || 0,
        byStage: {
          1: { attempts: migrated.records?.qteStats?.byStage?.[1]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[1]?.successes || 0 },
          2: { attempts: migrated.records?.qteStats?.byStage?.[2]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[2]?.successes || 0 },
          3: { attempts: migrated.records?.qteStats?.byStage?.[3]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[3]?.successes || 0 },
          4: { attempts: migrated.records?.qteStats?.byStage?.[4]?.attempts || 0, successes: migrated.records?.qteStats?.byStage?.[4]?.successes || 0 }
        }
      },
      rewardsByStage: {
        1: { coins: migrated.records?.rewardsByStage?.[1]?.coins || 0, xp: migrated.records?.rewardsByStage?.[1]?.xp || 0 },
        2: { coins: migrated.records?.rewardsByStage?.[2]?.coins || 0, xp: migrated.records?.rewardsByStage?.[2]?.xp || 0 },
        3: { coins: migrated.records?.rewardsByStage?.[3]?.coins || 0, xp: migrated.records?.rewardsByStage?.[3]?.xp || 0 },
        4: { coins: migrated.records?.rewardsByStage?.[4]?.coins || 0, xp: migrated.records?.rewardsByStage?.[4]?.xp || 0 }
      },
      recentBattles: Array.isArray(migrated.records?.recentBattles) ? migrated.records.recentBattles.slice(0, 100) : [],
      stageStats
    },
    settings: (() => {
      const s = { ...base.settings, ...migrated.settings };
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const sm = window.localStorage.getItem("koraku_music_muted");
          if (sm !== null) s.musicMuted = sm === "true";
          const ss = window.localStorage.getItem("koraku_sfx_muted");
          if (ss !== null) {
            s.sfxMuted = ss === "true";
            s.muted = ss === "true";
          }
        }
      } catch (_) {}
      return s;
    })()
  };
}

class GameStore {
  constructor(bus, persistence, options = {}) {
    this.bus = bus;
    this.persistence = persistence;
    this.now = options.now || (() => Date.now());
    this.state = sanitizeSave(persistence.load());
  }

  _recordLedger(entry) {
    if (!Array.isArray(this.state.ledger)) {
      this.state.ledger = [];
    }
    const timestamp = typeof this.now === "function" ? this.now() : Date.now();
    this.state.ledger.push({
      id: `led_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      configVersion: "2026.09.03",
      ...entry
    });
    if (this.state.ledger.length > 500) {
      this.state.ledger = this.state.ledger.slice(-500);
    }
  }

  snapshot() {
    const rawEquip = this.state.equipment || {};
    const normalizedEquip = {};
    for (const [slot, val] of Object.entries(rawEquip)) {
      normalizedEquip[slot] = getEquipmentTypeId(val);
    }
    return structuredClone({
      ...this.state,
      playerStats: computePlayerStats(this.state.profile, normalizedEquip),
      xpToNext: xpNeededForLevel(this.state.profile.level)
    });
  }

  commit(reason) {
    this.persistence.save(this.state);
    this.bus.emit("store:changed", { reason, state: this.snapshot() });
  }

  buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return { ok: false, key: "shop.itemNotFound", message: "找不到這件商品。" };
    if (this.state.coins < item.price) {
      return { ok: false, key: "shop.insufficientCoins", message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    this.state.inventory[itemId] += 1;
    this._recordLedger({
      action: "buy_item",
      itemId,
      coinsDelta: -item.price,
      source: "shop"
    });
    this.commit("purchase");
    return { ok: true, key: "shop.itemPurchased", params: { name: item.name }, message: "購入「" + item.name + "」！" };
  }

  buyEquipment(itemId) {
    const typeId = getEquipmentTypeId(itemId);
    const item = EQUIPMENT_ITEMS[typeId];
    if (!item) return { ok: false, key: "shop.itemNotFound", message: "找不到這件裝備。" };
    if (this.state.coins < item.price) {
      return { ok: false, key: "shop.insufficientCoins", message: "星砂不足，完成對局後再來吧。" };
    }
    this.state.coins -= item.price;
    const entryToPush = typeof itemId === "object" && itemId !== null ? itemId : typeId;
    this.state.inventoryEquipment.push(entryToPush);
    this._recordLedger({
      action: "buy_equipment",
      typeId,
      item: entryToPush,
      coinsDelta: -item.price,
      source: "shop"
    });
    this.commit("purchase-equipment");
    return { ok: true, key: "shop.equipmentPurchased", params: { name: item.name }, message: "購入「" + item.name + "」並已放入裝備背包！" };
  }

  equipItem(itemOrId, targetSlot = null) {
    const typeId = getEquipmentTypeId(itemOrId);
    const item = EQUIPMENT_ITEMS[typeId];
    if (!item) return { ok: false, key: "equip.invalidItem", message: "無效的裝備。" };

    const invIndex = this.state.inventoryEquipment.findIndex((entry) => {
      if (typeof entry === "string") return entry === itemOrId || entry === typeId;
      if (typeof entry === "object" && entry !== null) {
        if (typeof itemOrId === "string") return entry.uid === itemOrId || entry.typeId === itemOrId;
        if (typeof itemOrId === "object" && itemOrId !== null) return entry.uid === itemOrId.uid || entry.typeId === itemOrId.typeId;
      }
      return false;
    });

    if (invIndex === -1) {
      return { ok: false, key: "equip.notInInventory", message: "背包中沒有這件裝備。" };
    }

    const matchedEntry = this.state.inventoryEquipment[invIndex];

    let slot = targetSlot;
    if (!slot) {
      const mainTypeId = getEquipmentTypeId(this.state.equipment.mainHand);
      const offTypeId = getEquipmentTypeId(this.state.equipment.offHand);
      const ring1TypeId = getEquipmentTypeId(this.state.equipment.ring1);
      const ring2TypeId = getEquipmentTypeId(this.state.equipment.ring2);
      const earring1TypeId = getEquipmentTypeId(this.state.equipment.earring1);
      const earring2TypeId = getEquipmentTypeId(this.state.equipment.earring2);

      if (item.slotType === "weapon") {
        if (item.twoHanded) {
          slot = "mainHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (mainTypeId === typeId && offTypeId !== typeId && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (offTypeId === typeId && mainTypeId !== typeId) {
          slot = "mainHand";
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (offTypeId === typeId && mainTypeId !== typeId) {
          slot = "mainHand";
        } else if (mainTypeId === typeId && offTypeId !== typeId && !EQUIPMENT_ITEMS[mainTypeId]?.twoHanded) {
          slot = "offHand";
        } else {
          slot = "offHand";
        }
      } else if (item.slotType === "ring") {
        if (!this.state.equipment.ring1) {
          slot = "ring1";
        } else if (!this.state.equipment.ring2) {
          slot = "ring2";
        } else if (ring1TypeId === typeId && ring2TypeId !== typeId) {
          slot = "ring2";
        } else if (ring2TypeId === typeId && ring1TypeId !== typeId) {
          slot = "ring1";
        } else {
          slot = "ring1";
        }
      } else if (item.slotType === "earring") {
        if (!this.state.equipment.earring1) {
          slot = "earring1";
        } else if (!this.state.equipment.earring2) {
          slot = "earring2";
        } else if (earring1TypeId === typeId && earring2TypeId !== typeId) {
          slot = "earring2";
        } else if (earring2TypeId === typeId && earring1TypeId !== typeId) {
          slot = "earring1";
        } else {
          slot = "earring1";
        }
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, key: "equip.invalidSlot", message: "無效的裝備欄位。" };
    }

    // Validate slot compatibility
    const isValidSlot =
      (slot === "mainHand" && (item.slotType === "weapon" || item.slotType === "offHand")) ||
      (slot === "offHand" && (item.slotType === "offHand" || (item.slotType === "weapon" && !item.twoHanded))) ||
      ((slot === "ring1" || slot === "ring2") && item.slotType === "ring") ||
      ((slot === "earring1" || slot === "earring2") && item.slotType === "earring") ||
      (item.slotType === slot);

    if (!isValidSlot) {
      return { ok: false, key: "equip.incompatibleSlot", params: { name: item.name, slotName: EQUIPMENT_SLOTS[slot]?.label || slot }, message: `無法將「${item.name}」穿戴至 ${EQUIPMENT_SLOTS[slot]?.label || slot}。` };
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
      const currentMainTypeId = getEquipmentTypeId(currentMain);
      if (currentMain && EQUIPMENT_ITEMS[currentMainTypeId]?.twoHanded) {
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

    this.state.equipment[slot] = matchedEntry;
    this._recordLedger({
      action: "equip_item",
      slot,
      item: matchedEntry,
      typeId,
      source: "equipment"
    });
    this.commit("equip-item");
    return { ok: true, key: "equip.equipped", params: { name: item.name }, message: "已穿戴「" + item.name + "」。" };
  }

  unequipItem(slotKey) {
    if (!this.state.equipment[slotKey]) {
      return { ok: false, key: "equip.slotEmpty", message: "此欄位未裝備任何物品。" };
    }
    const itemId = this.state.equipment[slotKey];
    this.state.equipment[slotKey] = null;
    this.state.inventoryEquipment.push(itemId);
    this._recordLedger({
      action: "unequip_item",
      slot: slotKey,
      item: itemId,
      typeId: getEquipmentTypeId(itemId),
      source: "equipment"
    });
    this.commit("unequip-item");
    return { ok: true, key: "equip.unequipped", message: "已卸下裝備。" };
  }

  consumeItem(itemId) {
    if (!ITEMS[itemId] || this.state.inventory[itemId] <= 0) return false;
    this.state.inventory[itemId] -= 1;
    this._recordLedger({
      action: "consume_item",
      itemId,
      source: "inventory"
    });
    this.commit("consume-item");
    return true;
  }

  allocateStat(stat) {
    if (!Object.hasOwn(this.state.profile.allocations, stat)) {
      return { ok: false, key: "growth.invalidStat", message: "無效的能力項目。" };
    }
    if (this.state.profile.skillPoints <= 0) {
      return { ok: false, key: "growth.noPoints", message: "目前沒有可用點數。" };
    }
    this.state.profile.skillPoints -= 1;
    this.state.profile.allocations[stat] += 1;
    this._recordLedger({
      action: "allocate_stat",
      stat,
      source: "growth"
    });
    this.commit("allocate-stat");
    return { ok: true, key: "growth.statIncreased", message: "能力提升了。" };
  }

  allocateSkill(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return { ok: false, key: "growth.invalidSkill", message: "無效的技能項目。" };
    if (this.state.profile.level < skill.unlockLevel) {
      return { ok: false, key: "growth.levelRequirementNotMet", params: { level: skill.unlockLevel }, message: "等級需達 Lv. " + skill.unlockLevel + " 方可學習此技能。" };
    }
    const currentLvl = this.state.profile.skills[skillId] || 0;
    if (currentLvl >= skill.maxLevel) {
      return { ok: false, key: "growth.skillMaxLevel", message: "此技能已達最高等級。" };
    }
    if (this.state.profile.skillPoints < skill.costPerLevel) {
      return { ok: false, key: "growth.insufficientPoints", message: "技能點數不足。" };
    }
    this.state.profile.skillPoints -= skill.costPerLevel;
    this.state.profile.skills[skillId] = (currentLvl || 0) + 1;
    this._recordLedger({
      action: "allocate_skill",
      skillId,
      level: this.state.profile.skills[skillId],
      source: "growth"
    });
    this.commit("allocate-skill");
    return { ok: true, key: "growth.skillUpgraded", params: { name: skill.name, level: this.state.profile.skills[skillId] }, message: "「" + skill.name + "」升級至 Lv. " + this.state.profile.skills[skillId] + "！" };
  }

  unlockSwimsuit() {
    if (!this.state.records.unlockedSwimsuit) {
      this.state.records.unlockedSwimsuit = true;
      this.commit("unlock-swimsuit");
    }
  }

  getTheoreticalDPS() {
    const stats = this.snapshot().playerStats;
    const baseDamage = stats.damage || 25;

    // Greatsword multiplier
    const mainSlot = this.state.equipment.mainHand;
    const mainTypeId = getEquipmentTypeId(mainSlot);
    const mainItem = EQUIPMENT_ITEMS[mainTypeId];
    const greatswordMult = (mainItem?.twoHanded && (mainItem?.effect?.type === "burst" || mainItem?.effect?.type === "greatsword_damage_boost"))
      ? (mainItem.effect.winMultiplier || mainItem.effect.multiplier || 1.5)
      : 1.0;

    // Dual hands multiplier (approx 1.5x expected damage factor)
    const hasDualHand = Boolean(this.state.profile.skills?.dualHand > 0);
    const dualHandMult = hasDualHand ? 1.5 : 1.0;

    // Equip passive DOTs (Flame sword, etc.)
    let passiveDamagePerTurn = 0;
    for (const slotKey of Object.values(this.state.equipment)) {
      if (!slotKey) continue;
      const typeId = getEquipmentTypeId(slotKey);
      const item = EQUIPMENT_ITEMS[typeId];
      if (item?.effect?.type === "burn" || item?.effect?.type === "burn_on_round_end") {
        passiveDamagePerTurn += (item.effect.burnDamage || item.effect.damage || 30);
      } else if (item?.effect?.type === "reflect" || item?.effect?.type === "reflect_damage") {
        passiveDamagePerTurn += (item.effect.reflectDamage || item.effect.damage || 40) * 0.25;
      }
    }

    // Momo Touch draw skill expected value
    const momoLvl = this.state.profile.skills?.momo || 0;
    const momoExpectedPerTurn = (momoLvl * 0.1) * 25 * 0.33;

    // Standard turn cycle duration ~3.5s
    const turnDuration = 3.5;
    const totalExpectedPerTurn = (baseDamage * greatswordMult * dualHandMult) + passiveDamagePerTurn + momoExpectedPerTurn;
    const dps = Math.max(1, totalExpectedPerTurn / turnDuration);
    return Math.round(dps * 10) / 10;
  }

  recordPotionUse(type, options = {}) {
    if (!this.state.records.consumablesUsed) {
      this.state.records.consumablesUsed = { hpPotion: 0, mpPotion: 0 };
    }
    this.state.records.consumablesUsed[type] = (this.state.records.consumablesUsed[type] || 0) + 1;
    if (!this.state.records.restoredTotal) {
      this.state.records.restoredTotal = { hp: 0, mp: 0 };
    }
    if (options.restored) {
      if (type === "hpPotion") this.state.records.restoredTotal.hp = (this.state.records.restoredTotal.hp || 0) + options.restored;
      else if (type === "mpPotion") this.state.records.restoredTotal.mp = (this.state.records.restoredTotal.mp || 0) + options.restored;
    }
    this.commit("record-potion");
  }

  recordMorphUse(options = {}) {
    this.state.records.morphUses = (this.state.records.morphUses || 0) + 1;
    if (!this.state.records.morphStats) {
      this.state.records.morphStats = { attempts: 0, successes: 0, damage: 0 };
    }
    this.state.records.morphStats.attempts = (this.state.records.morphStats.attempts || 0) + 1;
    if (options.success !== false) {
      this.state.records.morphStats.successes = (this.state.records.morphStats.successes || 0) + 1;
    }
    if (options.damage) {
      this.state.records.morphStats.damage = (this.state.records.morphStats.damage || 0) + options.damage;
    }
    this.commit("record-morph");
  }

  recordMomoProc(options = {}) {
    if (!this.state.records.momoStats) {
      this.state.records.momoStats = { attempts: 0, successes: 0, damage: 0 };
    }
    this.state.records.momoStats.attempts = (this.state.records.momoStats.attempts || 0) + 1;
    if (options.success) {
      this.state.records.momoStats.successes = (this.state.records.momoStats.successes || 0) + 1;
      if (options.damage) {
        this.state.records.momoStats.damage = (this.state.records.momoStats.damage || 0) + options.damage;
      }
    }
    this.commit("record-momo");
  }

  recordWatermelonStageCut(strikeIndex, success) {
    if (!this.state.records.watermelonStageStats) {
      this.state.records.watermelonStageStats = {
        1: { attempts: 0, successes: 0 },
        2: { attempts: 0, successes: 0 },
        3: { attempts: 0, successes: 0 }
      };
    }
    const idx = Number(strikeIndex) || 1;
    if (!this.state.records.watermelonStageStats[idx]) {
      this.state.records.watermelonStageStats[idx] = { attempts: 0, successes: 0 };
    }
    this.state.records.watermelonStageStats[idx].attempts += 1;
    if (success) {
      this.state.records.watermelonStageStats[idx].successes += 1;
      this.state.records.watermelonSlices = (this.state.records.watermelonSlices || 0) + 1;
    }
    this.commit("record-watermelon-cut");
  }

  addWatermelonStock(amount = 1) {
    if (!this.state.records) this.state.records = {};
    const current = Number(this.state.records.watermelonStock) || 0;
    this.state.records.watermelonStock = Math.min(999, Math.max(0, current + amount));
    this.commit("add-watermelon-stock");
    return this.state.records.watermelonStock;
  }

  consumeWatermelonStock(amount = 1) {
    if (!this.state.records) this.state.records = {};
    const current = Number(this.state.records.watermelonStock) || 0;
    if (current < amount) return false;
    this.state.records.watermelonStock = Math.max(0, current - amount);
    this.commit("consume-watermelon-stock");
    return true;
  }

  setWatermelonStock(value = 0) {
    if (!this.state.records) this.state.records = {};
    this.state.records.watermelonStock = Math.min(999, Math.max(0, Number(value) || 0));
    this.commit("set-watermelon-stock");
    return this.state.records.watermelonStock;
  }

  recordQteAttempt(stageId, success) {
    if (!this.state.records.qteStats) {
      this.state.records.qteStats = { totalAttempts: 0, totalSuccesses: 0, byStage: {} };
    }
    this.state.records.qteStats.totalAttempts = (this.state.records.qteStats.totalAttempts || 0) + 1;
    if (success) {
      this.state.records.qteStats.totalSuccesses = (this.state.records.qteStats.totalSuccesses || 0) + 1;
    }
    if (stageId) {
      const sId = Number(stageId);
      if (!this.state.records.qteStats.byStage[sId]) {
        this.state.records.qteStats.byStage[sId] = { attempts: 0, successes: 0 };
      }
      this.state.records.qteStats.byStage[sId].attempts += 1;
      if (success) {
        this.state.records.qteStats.byStage[sId].successes += 1;
      }
    }
    this.commit("record-qte");
  }

  recordBattle(won, stage, options = {}) {
    const isAuto = Boolean(options.isAuto);
    const damageDealt = Math.max(0, Number(options.damageDealt) || 0);
    const damageTaken = Math.max(0, Number(options.damageTaken) || 0);
    const durationSec = Math.max(1, Number(options.durationSec) || 1);

    let stageCoins = 0;
    let stageXp = 0;

    if (won) {
      stageCoins = stage?.winCoins ?? BATTLE_RULES.winCoins;
      stageXp = stage?.xpWin ?? 0;
      // Badge of bond 20% coin boost
      const badgeSlot = this.state.equipment.badge;
      const badgeTypeId = getEquipmentTypeId(badgeSlot);
      const badgeItem = EQUIPMENT_ITEMS[badgeTypeId];
      if (badgeItem?.effect?.type === "coin_boost") {
        stageCoins = Math.round(stageCoins * (badgeItem.effect.coinMultiplier || 1.2));
      }
    } else {
      // LOSS REWARDS:
      // 未對小樂造成傷害時0獎勵，對小樂造成25%血條損失時才會有當前的獎勵的10%
      const enemyMaxHp = stage?.enemyHp ?? 1000;
      const hpLossRatio = enemyMaxHp > 0 ? (damageDealt / enemyMaxHp) : 0;
      if (hpLossRatio >= 0.25) {
        const baseLossCoins = stage?.lossCoins ?? BATTLE_RULES.lossCoins;
        const baseLossXp = stage?.xpLoss ?? 0;
        stageCoins = Math.floor(baseLossCoins * 0.10);
        stageXp = Math.floor(baseLossXp * 0.10);
      } else {
        stageCoins = 0;
        stageXp = 0;
      }
    }

    const reward = {
      coins: stageCoins,
      xp: stageXp,
      levelsGained: 0
    };
    this.state.coins += reward.coins;
    this.state.records[won ? "wins" : "losses"] += 1;
    this.state.records.totalBattles = (this.state.records.totalBattles || 0) + 1;
    this.state.records.totalCoinsEarned = (this.state.records.totalCoinsEarned || 0) + reward.coins;
    this.state.records.totalXpEarned = (this.state.records.totalXpEarned || 0) + reward.xp;

    if (won) {
      if (isAuto) {
        this.state.records.autoWins = (this.state.records.autoWins || 0) + 1;
        this.addWatermelonStock(1);
      } else {
        this.state.records.manualWins = (this.state.records.manualWins || 0) + 1;
      }

      if (stage?.id) {
        this.state.records.bestStage = Math.max(this.state.records.bestStage || 0, stage.id);
        if (!this.state.records.clearedStages) this.state.records.clearedStages = [];
        if (!this.state.records.clearedStages.includes(stage.id)) {
          this.state.records.clearedStages.push(stage.id);
        }
      }
    } else {
      if (isAuto) this.state.records.autoLosses = (this.state.records.autoLosses || 0) + 1;
      else this.state.records.manualLosses = (this.state.records.manualLosses || 0) + 1;
    }

    if (stage?.id) {
      const stageNum = Number(stage.id);
      if (!this.state.records.stageStats) this.state.records.stageStats = {};
      if (!this.state.records.stageStats[stageNum]) {
        this.state.records.stageStats[stageNum] = { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
      }
      const stat = this.state.records.stageStats[stageNum];
      stat.totalAttempts = (stat.totalAttempts || 0) + 1;
      if (isAuto) {
        if (won) stat.autoWins = (stat.autoWins || 0) + 1;
        else stat.autoLosses = (stat.autoLosses || 0) + 1;
      } else {
        if (won) stat.manualWins = (stat.manualWins || 0) + 1;
        else stat.manualLosses = (stat.manualLosses || 0) + 1;
      }

      // Rewards by stage
      if (!this.state.records.rewardsByStage) this.state.records.rewardsByStage = {};
      if (!this.state.records.rewardsByStage[stageNum]) {
        this.state.records.rewardsByStage[stageNum] = { coins: 0, xp: 0 };
      }
      this.state.records.rewardsByStage[stageNum].coins += reward.coins;
      this.state.records.rewardsByStage[stageNum].xp += reward.xp;
    }

    // Damage & combat log recording if provided in options
    const dps = Math.round((damageDealt / durationSec) * 10) / 10;

    if (!this.state.records.damageDealt) {
      this.state.records.damageDealt = { total: 0, byStage: {} };
    }
    this.state.records.damageDealt.total = (this.state.records.damageDealt.total || 0) + damageDealt;

    if (!this.state.records.damageTaken) {
      this.state.records.damageTaken = { total: 0, byStage: {} };
    }
    this.state.records.damageTaken.total = (this.state.records.damageTaken.total || 0) + damageTaken;

    if (stage?.id) {
      const stageNum = Number(stage.id);
      if (!this.state.records.damageDealt.byStage) this.state.records.damageDealt.byStage = {};
      this.state.records.damageDealt.byStage[stageNum] = (this.state.records.damageDealt.byStage[stageNum] || 0) + damageDealt;

      if (!this.state.records.damageTaken.byStage) this.state.records.damageTaken.byStage = {};
      this.state.records.damageTaken.byStage[stageNum] = (this.state.records.damageTaken.byStage[stageNum] || 0) + damageTaken;
    }

    if (!this.state.records.recentBattles) {
      this.state.records.recentBattles = [];
    }
    this.state.records.recentBattles.unshift({
      stageId: stage?.id || 1,
      stageName: stage?.name || "初逢・朱鳥居",
      chapter: stage?.chapter || "壹ノ章",
      won,
      isAuto,
      durationSec,
      damageDealt,
      damageTaken,
      dps,
      rewardCoins: reward.coins,
      rewardXp: reward.xp,
      timestamp: typeof this.now === "function" ? this.now() : Date.now(),
      watermelonSlices: options.watermelonSlices ?? null,
      qteHits: options.qteHits ?? null,
      qteTotal: options.qteTotal ?? null,
      hpPotionUsed: options.hpPotionUsed ?? 0,
      mpPotionUsed: options.mpPotionUsed ?? 0,
      hpRestored: options.hpRestored ?? 0,
      mpRestored: options.mpRestored ?? 0,
      momoAttempts: options.momoAttempts ?? 0,
      momoSuccesses: options.momoSuccesses ?? 0,
      momoDamage: options.momoDamage ?? 0,
      morphCount: options.morphCount ?? 0,
      morphDamage: options.morphDamage ?? 0
    });
    if (this.state.records.recentBattles.length > 100) {
      this.state.records.recentBattles.length = 100;
    }

    const gained = applyExperience(this.state.profile, reward.xp);
    this.state.profile = gained.profile;
    reward.levelsGained = gained.levelsGained;
    reward.dps = dps;
    reward.damageDealt = damageDealt;
    reward.damageTaken = damageTaken;
    reward.durationSec = durationSec;

    this._recordLedger({
      action: "battle_reward",
      won,
      stageId: stage?.id,
      coinsDelta: reward.coins,
      xpDelta: reward.xp,
      source: isAuto ? "auto_battle" : "manual_battle"
    });

    this.commit("battle-result");
    return reward;
  }

  recordWatermelonSlice() {
    this.state.records.watermelonSlices = (this.state.records.watermelonSlices || 0) + 1;
    this.commit("record-watermelon-slice");
  }

  grantExperience(amount, reason = "bonus-experience") {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (safeAmount === 0) return { xp: 0, levelsGained: 0 };

    this.state.records.totalXpEarned = (this.state.records.totalXpEarned || 0) + safeAmount;

    const gained = applyExperience(this.state.profile, safeAmount);
    this.state.profile = gained.profile;
    this._recordLedger({
      action: "grant_experience",
      xpDelta: safeAmount,
      source: reason
    });
    this.commit(reason);
    return { xp: safeAmount, levelsGained: gained.levelsGained };
  }

  cheatSetValues(updates = {}) {
    const statsObj = (updates && typeof updates.stats === "object" && updates.stats !== null && !Array.isArray(updates.stats)) ? updates.stats : {};
    const flat = (updates && typeof updates === "object" && !Array.isArray(updates)) ? updates : {};
    const merged = { ...statsObj, ...flat };
    merged.allocations = { ...(statsObj.allocations || {}), ...(flat.allocations || {}) };
    merged.skills = { ...(statsObj.skills || {}), ...(flat.skills || {}) };

    if (typeof merged.level === "number" && merged.level >= 1) {
      this.state.profile.level = Math.floor(merged.level);
    }
    if (typeof merged.xp === "number" && merged.xp >= 0) {
      this.state.profile.xp = Math.floor(merged.xp);
    }
    if (typeof merged.skillPoints === "number" && merged.skillPoints >= 0) {
      this.state.profile.skillPoints = Math.floor(merged.skillPoints);
    }
    if (typeof merged.coins === "number" && merged.coins >= 0) {
      this.state.coins = Math.floor(merged.coins);
    }
    if (typeof merged.hpPotion === "number" && merged.hpPotion >= 0) {
      this.state.inventory.hpPotion = Math.floor(merged.hpPotion);
    }
    if (typeof merged.mpPotion === "number" && merged.mpPotion >= 0) {
      this.state.inventory.mpPotion = Math.floor(merged.mpPotion);
    }
    if (typeof merged.watermelonStock === "number" && merged.watermelonStock >= 0) {
      if (!this.state.records) this.state.records = {};
      this.state.records.watermelonStock = Math.max(0, Math.min(999, Math.floor(merged.watermelonStock)));
    }
    if (merged.allocations) {
      const allocHp = merged.hp ?? merged.allocations.hp;
      const allocMp = merged.mp ?? merged.allocations.mp;
      const allocDamage = merged.damage ?? merged.allocations.damage;
      if (typeof allocHp === "number" && allocHp >= 0) this.state.profile.allocations.hp = Math.max(0, allocHp);
      if (typeof allocMp === "number" && allocMp >= 0) this.state.profile.allocations.mp = Math.max(0, allocMp);
      if (typeof allocDamage === "number" && allocDamage >= 0) this.state.profile.allocations.damage = Math.max(0, allocDamage);
    }
    if (merged.skills) {
      if (typeof merged.skills.momo === "number") this.state.profile.skills.momo = Math.max(0, Math.min(10, merged.skills.momo));
      if (typeof merged.skills.dualHand === "number") this.state.profile.skills.dualHand = Math.max(0, Math.min(1, merged.skills.dualHand));
    }
    this._recordLedger({
      action: "cheat_set_values",
      updates: merged,
      source: "dev"
    });
    this.commit("cheat-update");
    return { ok: true, key: "cheat.updated", message: "數值已更新！" };
  }

  cheatUnlockAll() {
    this.state.records.bestStage = 4;
    this.state.records.clearedStages = [1, 2, 3, 4];
    if (!this.state.records.stageStats) this.state.records.stageStats = {};
    for (let s = 1; s <= 4; s++) {
      if (!this.state.records.stageStats[s]) {
        this.state.records.stageStats[s] = { totalAttempts: 1, manualWins: 1, manualLosses: 0, autoWins: 0, autoLosses: 0 };
      } else {
        this.state.records.stageStats[s].manualWins = Math.max(1, this.state.records.stageStats[s].manualWins || 1);
        this.state.records.stageStats[s].totalAttempts = Math.max(1, this.state.records.stageStats[s].totalAttempts || 1);
      }
    }
    this._recordLedger({
      action: "cheat_unlock_all",
      source: "dev"
    });
    this.commit("cheat-unlock-all");
    return { ok: true, key: "cheat.unlockedAll", message: "已解鎖全部 4 個關卡與 BOSS 說明！" };
  }

  cheatUnlockGallery() {
    this.state.records.unlockedSwimsuit = true;
    this.state.records.unlockedGalleryAll = true;
    this._recordLedger({
      action: "cheat_unlock_gallery",
      source: "dev"
    });
    this.commit("cheat-unlock-gallery");
    return { ok: true, key: "cheat.unlockedGallery", message: "已解鎖全部圖鑑立繪！" };
  }

  toggleMusicMuted() {
    this.state.settings.musicMuted = !this.state.settings.musicMuted;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("koraku_music_muted", String(this.state.settings.musicMuted));
      }
    } catch (_) {}
    this.commit("toggle-music-muted");
    return this.state.settings.musicMuted;
  }

  toggleSfxMuted() {
    this.state.settings.sfxMuted = !this.state.settings.sfxMuted;
    this.state.settings.muted = this.state.settings.sfxMuted;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("koraku_sfx_muted", String(this.state.settings.sfxMuted));
      }
    } catch (_) {}
    this.commit("toggle-sfx-muted");
    return this.state.settings.sfxMuted;
  }

  toggleMuted() {
    return this.toggleSfxMuted();
  }

  exportSaveCode() {
    return encodeSaveData(this.state);
  }

  importSaveCode(code) {
    if (!code || typeof code !== "string" || !code.trim()) {
      return { ok: false, key: "save.invalidCode", message: "請輸入有效的種子碼。" };
    }
    const decoded = decodeSaveData(code);
    if (!decoded || typeof decoded !== "object") {
      return { ok: false, key: "save.corruptCode", message: "無效或損毀的存檔種子碼。" };
    }
    this.state = sanitizeSave(decoded);
    this.persistence.save(this.state);
    this._recordLedger({
      action: "import_save",
      source: "save_code"
    });
    this.commit("import-save");
    return { ok: true, key: "save.imported", message: "存檔已成功載入！" };
  }

  reset() {
    this.state = freshSave();
    this.persistence.clear();
    this._recordLedger({ action: "reset", source: "system" });
    this.commit("reset");
  }
}

GameStore;

// --- src/js/systems/BattleSystem.js ---
class BattleSystem {
  constructor(bus, store, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.store = store;
    const resolvedRandom = typeof random === "function"
      ? random
      : (typeof random === "object" && random !== null && typeof random.random === "function"
        ? random.random
        : Math.random);
    const resolvedNow = (typeof random === "object" && random !== null && typeof random.now === "function")
      ? random.now
      : (typeof now === "function" ? now : () => Date.now());
    this.random = resolvedRandom;
    this.now = resolvedNow;
    this.timers = new TimerRegistry();
    this.qte = new QTESystem(bus, this.timers, resolvedRandom, resolvedNow);
    this.dualQte = new DualQTESystem(bus, this.timers, resolvedRandom, resolvedNow);
    this.state = null;
    this.countdownTimeoutId = null;
    this.countdownId = null;
    this.beatTimerIds = [];
    this.reactionTimeoutId = null;
    this.reactionTickId = null;
    this.disconnectTimeoutId = null;
    this.autoRestartTimerId = null;
    this.pauseCount = 0;
    this.maxPauses = 3;
    this.commandBuffer = [];
    this.commandLog = [];
    this.battleSeed = 0;
    this.autoBattle = {
      active: false,
      isPaused: false,
      stageId: null,
      totalRounds: 0,
      remainingRounds: 0,
      wins: 0,
      losses: 0
    };
    this.bus.on("qte:finished", (result) => this.resolveQte(result));
    this.bus.on("qte:slot-success", ({ slot, enemyId }) => {
      if (this.state?.active && this.state.phase === "qte" && this.state.isDualQte) {
        this.handleDualQteSlotSuccess(enemyId || slot);
      }
    });
    this._isDispatching = false;
  }

  recordCommand(type, payload = {}, declaredAt = null, result = null) {
    this.commandLog.push({
      type,
      payload,
      declaredAt: declaredAt || this.now(),
      executedAt: this.now(),
      result
    });
  }

  // --- Online Authority Policies & Assumptions ---

  // ASSUMPTION: Equipment mutations and stat allocations are locked during an active battle session.
  isBattleActive() {
    return Boolean(this.state?.active && this.state.phase !== "ended" && this.state.phase !== "abandoned");
  }

  canEquip() {
    // ASSUMPTION: Equipment mutations locked during active battle session
    return !this.isBattleActive();
  }

  canAllocate() {
    // ASSUMPTION: Stat allocations locked during active battle session
    return !this.isBattleActive();
  }

  enqueueCommand(cmd) {
    const arrival = cmd.arrivedAt || this.now();
    const declared = cmd.declaredAt || arrival;
    const boundedDeclared = Math.min(declared, arrival + 150);
    const entry = {
      ...cmd,
      arrivedAt: arrival,
      declaredAt: declared,
      boundedDeclaredAt: boundedDeclared
    };
    this.commandBuffer.push(entry);
    this.commandBuffer.sort((a, b) => a.boundedDeclaredAt - b.boundedDeclaredAt);
    return this.flushCommands();
  }

  flushCommands() {
    const results = [];
    while (this.commandBuffer.length > 0) {
      const nextCmd = this.commandBuffer.shift();
      results.push(this.dispatchCommand(nextCmd));
    }
    return results;
  }

  processCommand(cmd) {
    return this.dispatchCommand({
      ...cmd,
      arrivedAt: cmd.arrivedAt || this.now(),
      declaredAt: cmd.declaredAt || this.now()
    });
  }

  dispatchCommand(cmd) {
    this._isDispatching = true;
    try {
      const { type, payload, declaredAt, cmdId } = cmd;

      // Check lock assumption
      if ((type === "equip" || type === "unequip" || type === "allocate") && this.isBattleActive()) {
        return {
          ok: false,
          cmdId,
          reason: "locked_during_battle",
          error: "ASSUMPTION: Equipment and stat allocations are locked during active battle"
        };
      }

      let result = { ok: false, cmdId };
      switch (type) {
        case "select_hand":
          result = this.selectHand(payload?.handId || payload?.hand, payload?.slot, declaredAt);
          break;
        case "use_morph":
          result = this.useMorph(declaredAt);
          break;
        case "use_item":
          result = this.useItem(payload?.itemId, declaredAt);
          break;
        case "input_qte":
          result = { ok: Boolean(this.inputQte(payload?.directionId, payload?.slot, declaredAt)) };
          break;
        case "report_qte_batch":
          result = this.state?.isDualQte
            ? this.dualQte.auditInputs(payload?.inputs)
            : this.qte.auditInputs(payload?.inputs);
          break;
        case "pause":
          result = this.pause();
          break;
        case "resume":
          result = this.resume();
          break;
        case "abandon":
          this.abandon();
          result = { ok: true };
          break;
        default:
          result = { ok: false, reason: "unknown_command" };
      }

      this.commandLog.push({
        ...cmd,
        executedAt: this.now(),
        result
      });
      return result;
    } finally {
      this._isDispatching = false;
    }
  }

  getAllEquipEffects(effectType) {
    const snapshot = this.store.snapshot();
    const equipment = snapshot.equipment || {};
    const effects = [];
    for (const itemId of Object.values(equipment)) {
      if (!itemId) continue;
      const item = EQUIPMENT_ITEMS[itemId];
      if (item?.effect?.type === effectType) {
        effects.push(item.effect);
      }
    }
    return effects;
  }

  hasEquipEffect(effectType) {
    const effects = this.getAllEquipEffects(effectType);
    return effects.length > 0 ? effects[0] : null;
  }

  start(stageId, options = {}) {
    let stage = null;
    const profile = this.store.snapshot();

    if (options.isDojo) {
      const customHp = Math.max(1, Number(options.customHp || 10000));
      const customDamage = Math.max(0, Number(options.customDamage ?? 0));
      if (options.isDual) {
        stage = {
          id: 992,
          chapter: "修練場",
          chapterKey: "dojo.chapterName",
          name: "影小樂・雙生木樁",
          nameKey: "dojo.mode2Style2",
          subtitle: "第四關雙手雙軌模擬",
          subtitleKey: "dojo.mode2Style2Desc",
          enemyHp: customHp * 2,
          requiredLevel: 1,
          rewardMultiplier: 0,
          xpWin: 0,
          xpLoss: 0,
          winCoins: 0,
          lossCoins: 0,
          roundSeconds: 3,
          reactionWindowMs: 750,
          momoDodgeRate: 0,
          qteDirections: "all",
          qteLength: 7,
          maxErrors: 1,
          enemyDamageMultiplier: 1,
          customDamage,
          dualEnemy: true,
          isDojo: true,
          isSilhouette: true,
          enemies: [
            { id: "left", name: "影・小樂（左）", nameKey: "dojo.dummySilhouetteLeft", hp: customHp, maxHp: customHp, alive: true },
            { id: "right", name: "影・小樂（右）", nameKey: "dojo.dummySilhouetteRight", hp: customHp, maxHp: customHp, alive: true }
          ],
          final: false
        };
      } else {
        stage = {
          id: 991,
          chapter: "修練場",
          chapterKey: "dojo.chapterName",
          name: "影小樂・單體木樁",
          nameKey: "dojo.mode2Style1",
          subtitle: "無壓實戰與 DPS 測試",
          subtitleKey: "dojo.mode2Style1Desc",
          enemyHp: customHp,
          requiredLevel: 1,
          rewardMultiplier: 0,
          xpWin: 0,
          xpLoss: 0,
          winCoins: 0,
          lossCoins: 0,
          roundSeconds: 3,
          reactionWindowMs: 750,
          momoDodgeRate: 0,
          qteDirections: "all",
          qteLength: 5,
          maxErrors: 2,
          enemyDamageMultiplier: 1,
          customDamage,
          isDojo: true,
          isSilhouette: true,
          enemies: [{ id: "main", name: "影・小樂", nameKey: "dojo.dummySilhouette", hp: customHp, maxHp: customHp, alive: true }],
          final: false
        };
      }
    } else {
      stage = STAGES.find((item) => item.id === Number(stageId));
      const isStageUnlocked = (profile.records?.clearedStages || []).includes(Number(stageId)) || profile.profile.level >= stage?.requiredLevel;
      if (!stage || !isStageUnlocked) {
        this.bus.emit("toast", {
          key: "toast.levelRequirementNotMet",
          message: "等級尚未達到這一章的挑戰條件。",
          tone: "danger"
        });
        return false;
      }
    }

    if (options.autoBattle) {
      const cleared = (profile.records?.clearedStages || []).includes(Number(stageId));
      if (!cleared) {
        this.bus.emit("toast", {
          key: "ui.mustClearOnceForAuto",
          tone: "danger"
        });
        return false;
      }
      if (!this.autoBattle.active) {
        this.autoBattle = {
          active: true,
          isPaused: false,
          stageId: Number(stageId),
          totalRounds: options.autoBattleRounds || 10,
          remainingRounds: options.autoBattleRounds || 10,
          wins: 0,
          losses: 0
        };
      } else {
        this.autoBattle.isPaused = false;
      }
    } else {
      this.autoBattle.active = false;
      this.autoBattle.isPaused = false;
      this.autoBattle.remainingRounds = 0;
    }

    this.stopClocks();
    this.pauseCount = 0;
    this.battleSeed = typeof options.seed === "number"
      ? options.seed
      : (options.seed ? Number(options.seed) : Math.floor(Math.random() * 1000000000));
    if (options.seed !== undefined && options.seed !== null) {
      const seededRandom = createSeededRandom(this.battleSeed);
      this.random = seededRandom;
      if (this.qte) this.qte.random = seededRandom;
      if (this.dualQte) this.dualQte.random = seededRandom;
    }
    this.commandLog = [];
    this.battleStartTime = this.now();
    this.battleDamageDealt = 0;
    this.battleDamageTaken = 0;
    this.battleHpPotionUsed = 0;
    this.battleMpPotionUsed = 0;
    this.battleHpRestored = 0;
    this.battleMpRestored = 0;
    this.battleMomoAttempts = 0;
    this.battleMomoSuccesses = 0;
    this.battleMomoDamage = 0;
    this.battleMorphCount = 0;
    this.battleMorphDamage = 0;
    this.battleQteHits = 0;
    this.battleQteTotal = 0;
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
      morphActive: false,
      isEnemyFrozen: false,
      frozenEnemyHand: null,
      isPaused: false,
      pauseCount: 0,
      maxPauses: 3,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(
      stage.final
        ? { key: "dialogue.introFinal" }
        : { key: "dialogue.introNormal" },
      { key: "dialogue.speakerKohaku" }
    );
    this.scheduleRound();
    return true;
  }

  startAutoBattle(stageId, rounds = 10) {
    return this.start(stageId, { autoBattle: true, autoBattleRounds: rounds });
  }

  // --- Instantaneous Auto-Battle Simulation (Task 5.7) ---

  simulateBattle(stageId, options = {}) {
    const profile = this.store.snapshot();
    const stage = STAGES.find((item) => item.id === Number(stageId)) || STAGES[0];
    const stats = profile.playerStats;
    const hasDualHand = Boolean(profile.profile?.skills?.dualHand > 0);
    const momoLvl = profile.profile?.skills?.momo || 0;
    const seed = options.seed || Math.floor(this.random() * 1000000000);

    let playerHp = stats.maxHp;
    let playerMp = stats.maxMp;
    let enemyHp = stage.dualEnemy ? (stage.enemyHp || 10000) : stage.enemyHp;
    let round = 0;
    let damageDealt = 0;
    let damageTaken = 0;
    const frames = [];

    while (playerHp > 0 && enemyHp > 0 && round < 50) {
      round += 1;
      const playerHand = "rock";
      const hands = ["rock", "paper", "scissors"];
      const enemyHand = hands[Math.floor(this.random() * hands.length)];
      const cmp = compareHands(playerHand, enemyHand);

      if (cmp === "win") {
        const dmg = stats.damage;
        enemyHp = Math.max(0, enemyHp - dmg);
        damageDealt += dmg;
        frames.push({ round, result: "win", damageDealt: dmg, playerHp, enemyHp });
      } else if (cmp === "loss") {
        // Player QTE attempt
        const qteSuccess = this.random() > 0.3;
        if (qteSuccess) {
          const dmg = stats.damage;
          enemyHp = Math.max(0, enemyHp - dmg);
          damageDealt += dmg;
          frames.push({ round, result: "qte_counter", damageDealt: dmg, playerHp, enemyHp });
        } else {
          const dmg = (BATTLE_RULES.enemyDamage || 100) * (stage.enemyDamageMultiplier || 1);
          playerHp = Math.max(0, playerHp - dmg);
          damageTaken += dmg;
          frames.push({ round, result: "qte_fail", damageTaken: dmg, playerHp, enemyHp });
        }
      } else {
        // Draw + Momo proc
        if (momoLvl > 0 && this.random() < (momoLvl * 0.10)) {
          const momoDmg = SKILLS.momo.damage;
          enemyHp = Math.max(0, enemyHp - momoDmg);
          damageDealt += momoDmg;
          frames.push({ round, result: "draw_momo", damageDealt: momoDmg, playerHp, enemyHp });
        } else {
          frames.push({ round, result: "draw", playerHp, enemyHp });
        }
      }
    }

    const won = enemyHp <= 0;
    return {
      won,
      stage,
      seed,
      round,
      damageDealt,
      damageTaken,
      playerHp,
      enemyHp,
      frames
    };
  }

  simulateAutoBattle(stageId, totalRounds = 10, options = {}) {
    const results = [];
    let wins = 0;
    let losses = 0;
    let totalDmgDealt = 0;
    let totalDmgTaken = 0;

    for (let r = 0; r < totalRounds; r++) {
      const sim = this.simulateBattle(stageId, options);
      if (sim.won) wins += 1;
      else losses += 1;
      totalDmgDealt += sim.damageDealt;
      totalDmgTaken += sim.damageTaken;
      results.push(sim);

      const chunk = {
        roundIndex: r + 1,
        totalRounds,
        won: sim.won,
        wins,
        losses,
        battle: sim
      };
      this.bus.emit("auto-battle:stream-chunk", chunk);
    }

    const finalReport = {
      stageId: Number(stageId),
      totalRounds,
      wins,
      losses,
      totalDamageDealt: totalDmgDealt,
      totalDamageTaken: totalDmgTaken,
      simulations: results
    };
    this.bus.emit("auto-battle:simulated", finalReport);
    return finalReport;
  }

  restore(savedState) {
    if (!savedState) return false;
    const profile = this.store.snapshot();
    const stageId = savedState.stage?.id || savedState.stageId || 1;
    let stage = savedState.stage;
    if (!stage || !stage.name) {
      stage = STAGES.find((item) => item.id === Number(stageId)) || STAGES[0];
    }

    this.stopClocks();

    if (savedState.autoBattle?.active) {
      this.autoBattle = {
        active: true,
        isPaused: Boolean(savedState.autoBattle.isPaused),
        stageId: Number(savedState.autoBattle.stageId || stageId),
        totalRounds: Number(savedState.autoBattle.totalRounds || 10),
        remainingRounds: Number(savedState.autoBattle.remainingRounds || 10),
        wins: Number(savedState.autoBattle.wins || 0),
        losses: Number(savedState.autoBattle.losses || 0)
      };
    } else {
      this.autoBattle.active = false;
      this.autoBattle.isPaused = false;
      this.autoBattle.remainingRounds = 0;
    }

    this.battleStartTime = savedState.battleStartTime || this.now();
    this.battleDamageDealt = savedState.battleDamageDealt || 0;
    this.battleDamageTaken = savedState.battleDamageTaken || 0;
    this.battleHpPotionUsed = savedState.battleHpPotionUsed || 0;
    this.battleMpPotionUsed = savedState.battleMpPotionUsed || 0;
    this.battleHpRestored = savedState.battleHpRestored || 0;
    this.battleMpRestored = savedState.battleMpRestored || 0;
    this.battleMomoAttempts = savedState.battleMomoAttempts || 0;
    this.battleMomoSuccesses = savedState.battleMomoSuccesses || 0;
    this.battleMomoDamage = savedState.battleMomoDamage || 0;
    this.battleMorphCount = savedState.battleMorphCount || 0;
    this.battleMorphDamage = savedState.battleMorphDamage || 0;
    this.battleQteHits = savedState.battleQteHits || 0;
    this.battleQteTotal = savedState.battleQteTotal || 0;
    this.pauseCount = savedState.pauseCount || 0;

    const stats = profile.playerStats;
    const hasDualHandSkill = Boolean(profile.profile?.skills?.dualHand > 0);

    const enemies = savedState.enemies && savedState.enemies.length > 0
      ? savedState.enemies.map((e) => ({
          id: e.id,
          name: e.name,
          hp: Math.max(0, Number(e.hp ?? (stage.final ? 5000 : stage.enemyHp))),
          maxHp: Number(e.maxHp ?? (stage.final ? 5000 : stage.enemyHp)),
          alive: Number(e.hp ?? (stage.final ? 5000 : stage.enemyHp)) > 0
        }))
      : [{
          id: "main",
          name: stage.final ? "白金小樂" : "小樂",
          hp: Math.max(0, Number(savedState.enemyHp ?? stage.enemyHp)),
          maxHp: stage.enemyHp,
          alive: Math.max(0, Number(savedState.enemyHp ?? stage.enemyHp)) > 0
        }];

    const totalEnemyHp = enemies.reduce((sum, e) => sum + (e.alive ? e.hp : 0), 0);
    const totalEnemyMaxHp = enemies.reduce((sum, e) => sum + e.maxHp, 0);

    const roundNumber = Math.max(1, Number(savedState.round || 1));
    const currentRound = Math.max(0, roundNumber - 1);

    let remainingCountdownMs = null;
    if (savedState.roundExpiresAt) {
      remainingCountdownMs = Math.max(200, savedState.roundExpiresAt - this.now());
    } else if (typeof savedState.countdownRemainingMs === "number" && savedState.countdownRemainingMs > 0) {
      remainingCountdownMs = Math.max(200, savedState.countdownRemainingMs);
    } else if (typeof savedState.countdown === "number" && savedState.countdown > 0) {
      remainingCountdownMs = Math.max(200, savedState.countdown * 1000);
    }

    this.state = {
      active: true,
      stage,
      phase: "countdown",
      round: remainingCountdownMs ? roundNumber : currentRound,
      playerHp: Math.min(stats.maxHp, Math.max(1, Number(savedState.playerHp ?? stats.maxHp))),
      playerMaxHp: stats.maxHp,
      playerMp: Math.min(stats.maxMp, Math.max(0, Number(savedState.playerMp ?? stats.maxMp))),
      playerMaxMp: stats.maxMp,
      playerDamage: stats.damage,
      hasDualHandSkill,
      enemies,
      targetEnemyId: savedState.targetEnemyId || enemies.find((e) => e.alive)?.id || enemies[0]?.id || "main",
      enemyHp: Math.max(1, totalEnemyHp),
      enemyMaxHp: totalEnemyMaxHp,
      selectedHand: savedState.selectedHand || "rock",
      selectedHands: savedState.selectedHands || { left: "rock", right: "rock" },
      opponentHand: null,
      enemyWinningEmoji: null,
      countdown: remainingCountdownMs ? Math.ceil(remainingCountdownMs / 1000) : (stage.roundSeconds || BATTLE_RULES.roundSeconds),
      reactionRemaining: 0,
      morphUsed: false,
      morphActive: false,
      isEnemyFrozen: Boolean(savedState.isEnemyFrozen),
      frozenEnemyHand: savedState.frozenEnemyHand || null,
      isPaused: Boolean(this.autoBattle.isPaused),
      pauseCount: this.pauseCount,
      maxPauses: 3,
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };

    this.emitState();
    this.scheduleRound(remainingCountdownMs);
    return true;
  }

  pauseAutoBattle() {
    if (!this.autoBattle.active || this.autoBattle.isPaused) return;
    this.autoBattle.isPaused = true;
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
    this.bus.emit("auto-battle:paused", { ...this.autoBattle });
  }

  resumeAutoBattle() {
    if (!this.autoBattle.active || !this.autoBattle.isPaused) return;
    this.autoBattle.isPaused = false;
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
    this.bus.emit("auto-battle:resumed", { ...this.autoBattle });

    if (!this.state?.active && this.autoBattle.remainingRounds > 0) {
      this.start(this.autoBattle.stageId, { autoBattle: true });
    }
  }

  toggleAutoBattle() {
    if (!this.autoBattle.active) return;
    if (this.autoBattle.isPaused) {
      this.resumeAutoBattle();
    } else {
      this.pauseAutoBattle();
    }
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
    if (!this.state?.active || this.state.phase === "ended" || this.state.isPaused) {
      return { ok: false, reason: "invalid_state" };
    }
    // Only countdown phase allowed for pause
    if (this.state.phase !== "countdown") {
      return { ok: false, reason: "pause_only_in_countdown" };
    }
    // Limit to 3 times per battle
    if (this.pauseCount >= this.maxPauses) {
      return { ok: false, reason: "pause_limit_reached" };
    }
    this.pauseCount += 1;
    this.state.isPaused = true;
    this.state.pauseCount = this.pauseCount;
    this.state.maxPauses = this.maxPauses;
    this.countdownRemainingMs = Math.max(0, (this.countdownDeadline || 0) - this.now());
    this.clearCountdownClocks();
    this.emitState();
    const res = { ok: true, pauseCount: this.pauseCount, remainingMs: this.countdownRemainingMs };
    if (!this._isDispatching) this.recordCommand("pause", {}, null, res);
    return res;
  }

  resume() {
    if (!this.state?.active || this.state.phase === "ended" || !this.state.isPaused) {
      return { ok: false, reason: "not_paused" };
    }
    this.state.isPaused = false;
    if (this.state.phase === "countdown") {
      const remainingMs = this.countdownRemainingMs ?? 1000;
      this.scheduleRound(remainingMs);
    }
    this.emitState();
    const res = { ok: true };
    if (!this._isDispatching) this.recordCommand("resume", {}, null, res);
    return res;
  }

  handleDisconnect() {
    if (!this.state?.active || this.state.phase === "ended") return;
    this.state.disconnected = true;
    this.state.disconnectDeadline = this.now() + 10000;
    this.emitState();
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
    }
    this.disconnectTimeoutId = this.timers.timeout(() => {
      this.settleDisconnect();
    }, 10000);
  }

  handleReconnect() {
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
      this.disconnectTimeoutId = null;
    }
    if (this.state) {
      this.state.disconnected = false;
      this.state.disconnectDeadline = null;
      this.emitState();
    }
  }

  settleDisconnect() {
    if (!this.state?.active || this.state.phase === "ended") return;
    // Settle battle upon 10s disconnect expiration
    this.end(false);
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
    if (!this.state) return null;
    const snap = structuredClone(this.state);
    snap.autoBattle = { ...this.autoBattle };
    snap.commandLog = [...this.commandLog];
    snap.seed = this.battleSeed;

    if (this.state.phase === "countdown" && this.countdownDeadline) {
      const rem = Math.max(0, this.countdownDeadline - this.now());
      snap.countdown = Math.ceil(rem / 1000);
      snap.countdownRemainingMs = rem;
    } else if (this.state.phase === "reaction" && this.reactionDeadline) {
      const rem = Math.max(0, this.reactionDeadline - this.now());
      snap.reactionRemaining = rem / 1000;
      snap.reactionRemainingMs = rem;
    }
    return snap;
  }

  emitState() {
    this.bus.emit("battle:state", this.snapshot());
  }

  say(messageOrPayload, speaker = null) {
    let key = null;
    let params = {};
    let text = "";
    let speakerKey = "dialogue.speakerKohaku";
    let speakerName = "";

    if (typeof messageOrPayload === "object" && messageOrPayload !== null) {
      key = messageOrPayload.key || null;
      params = messageOrPayload.params || {};
      text = messageOrPayload.text || "";
    } else {
      text = String(messageOrPayload || "");
    }

    if (typeof speaker === "object" && speaker !== null) {
      speakerKey = speaker.key || speakerKey;
      speakerName = speaker.text || "";
    } else if (speaker) {
      speakerName = String(speaker);
    }

    this.bus.emit("dialogue", {
      key,
      params,
      speakerKey,
      speaker: speakerName || "小樂",
      text
    });
  }

  scheduleRound(customMs = null) {
    if (!this.state?.active) return;
    this.clearCountdownClocks();
    const defaultRoundSeconds = this.state.stage.roundSeconds || BATTLE_RULES.roundSeconds;
    const totalDurationMs = customMs ? customMs : defaultRoundSeconds * 1000;
    const roundSeconds = Math.ceil(totalDurationMs / 1000);
    if (!customMs) {
      this.state.round += 1;
    }
    this.state.phase = "countdown";
    this.state.opponentHand = null;
    this.state.enemyWinningEmoji = null;
    this.state.countdown = roundSeconds;
    this.state.reactionRemaining = 0;
    this.state.morphUsed = false;
    this.state.morphActive = false;
    this.state.lastChant = null;
    this.state.isPaused = false;
    this.countdownDeadline = this.now() + totalDurationMs;
    this.state.deadline = this.countdownDeadline;
    this.state.roundExpiresAt = this.countdownDeadline;
    this.emitState(); // Push state ONCE on phase transition!

    // Schedule countdown ticker every 250ms to smoothly update remaining seconds
    this.countdownId = this.timers.interval(() => {
      if (!this.state?.active || this.state.phase !== "countdown" || this.state.isPaused) return;
      const remainingMs = Math.max(0, this.countdownDeadline - this.now());
      const nextSeconds = Math.ceil(remainingMs / 1000);
      if (nextSeconds !== this.state.countdown) {
        this.state.countdown = nextSeconds;
        this.emitState();
      }
      if (remainingMs <= 0) {
        if (this.countdownId !== null) {
          this.timers.clearInterval(this.countdownId);
          this.countdownId = null;
        }
      }
    }, 250);

    // Schedule countdown chant beats
    const beatTimes = [
      { count: 3, delay: totalDurationMs - 3000, key: "dialogue.chant3" },
      { count: 2, delay: totalDurationMs - 2000, key: "dialogue.chant2" },
      { count: 1, delay: totalDurationMs - 1000, key: "dialogue.chant1" }
    ];

    beatTimes.forEach(({ count, delay, key }) => {
      if (delay >= 0) {
        const timerId = this.timers.timeout(() => {
          if (this.state?.active && this.state.phase === "countdown" && !this.state.isPaused) {
            this.state.lastChant = count;
            this.state.countdown = count;
            this.say(
              { key },
              { key: "dialogue.speakerKohaku" }
            );
            this.bus.emit("battle:countdown-beat", { count, key });
            this.bus.emit("sound", { name: "select" });
            this.emitState();
          }
        }, delay);
        this.beatTimerIds.push(timerId);
      }
    });

    this.countdownTimeoutId = this.timers.timeout(() => {
      this.countdownTimeoutId = null;
      if (this.state?.active && this.state.phase === "countdown" && !this.state.isPaused) {
        this.revealHands();
      }
    }, totalDurationMs);
  }

  selectHand(handId, slot = null, declaredAt = null) {
    if (!this.state?.active || !HANDS[handId]) return false;
    const arrival = this.now();

    if (this.state.phase === "countdown") {
      // Secret commitment sealed before reveal (with 150ms network grace period)
      if (arrival > this.countdownDeadline + 150) {
        const res = { ok: false, reason: "late_commitment" };
        if (!this._isDispatching) this.recordCommand("select_hand", { handId, slot }, declaredAt, res);
        return res;
      }
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
      const res = { ok: true, handId, slot };
      if (!this._isDispatching) this.recordCommand("select_hand", { handId, slot }, declaredAt, res);
      return res;
    } else if (this.state.phase === "reaction" && this.state.morphActive) {
      // 150ms grace check on morph reaction window
      if (arrival > this.reactionDeadline + 150) {
        const res = { ok: false, reason: "morph_expired" };
        if (!this._isDispatching) this.recordCommand("select_hand", { handId, slot }, declaredAt, res);
        return res;
      }
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
      this.state.morphActive = false;
      this.clearReactionClocks();
      this.emitState();
      this.bus.emit("sound", { name: "select" });
      this.resolveRound();
      const res = { ok: true, handId, slot };
      if (!this._isDispatching) this.recordCommand("select_hand", { handId, slot }, declaredAt, res);
      return res;
    }
    return false;
  }

  revealHands() {
    if (!this.state?.active || this.state.phase !== "countdown") return;
    this.clearCountdownClocks();
    this.state.phase = "reaction";

    const isDualStage = Boolean(this.state.stage?.dualEnemy && this.state.enemies?.length > 1);
    const aliveEnemies = this.state.enemies.filter((e) => e.alive);
    const frozenHand = this.state.frozenEnemyHand;

    const getFilteredHand = () => {
      const allHands = ["rock", "paper", "scissors"];
      const pool = frozenHand ? allHands.filter((h) => h !== frozenHand) : allHands;
      return pool[Math.floor(this.random() * pool.length)];
    };

    if (isDualStage && aliveEnemies.length >= 2) {
      const leftHand = getFilteredHand();
      const rightHand = getFilteredHand();
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
      const hand = getFilteredHand();
      this.state.opponentHand = hand;
      this.state.opponentHands = { main: hand };
      if (this.state.hasDualHandSkill) {
        const leftResult = compareHands(this.state.selectedHands.left, hand);
        const rightResult = compareHands(this.state.selectedHands.right, hand);
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

    // Clear frozen hand after rolling
    this.state.frozenEnemyHand = null;

    let reactionWindowMs = this.state.stage?.reactionWindowMs ?? BATTLE_RULES.reactionWindowMs;
    this.state.reactionRemaining = reactionWindowMs / 1000;
    this.reactionDeadline = this.now() + reactionWindowMs;
    this.state.deadline = this.reactionDeadline;
    this.state.reactionExpiresAt = this.reactionDeadline;

    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("sound", { name: "reveal" });

    this.reactionTickId = this.timers.interval(() => {
      if (!this.state?.active || this.state.phase !== "reaction" || this.state.isPaused) return;
      const rem = Math.max(0, this.reactionDeadline - this.now());
      this.state.reactionRemaining = rem / 1000;
      this.emitState();
      if (rem <= 0) {
        if (this.reactionTickId !== null) {
          this.timers.clearInterval(this.reactionTickId);
          this.reactionTickId = null;
        }
      }
    }, 100);

    this.reactionTimeoutId = this.timers.timeout(() => {
      this.reactionTimeoutId = null;
      this.resolveRound();
    }, reactionWindowMs);
  }

  useMorph(declaredAt = null) {
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    if (!this.state?.active || this.state.phase !== "reaction" || this.state.morphActive) {
      return {
        ok: false,
        key: "combat.morphWindowOnly",
        message: "變拳只能在看見小樂出拳後的反應時間內使用。"
      };
    }
    // 150ms grace check on reaction window
    if (timestamp > this.reactionDeadline + 150) {
      return {
        ok: false,
        key: "combat.morphWindowExpired",
        message: "反應時間已過。"
      };
    }

    const totalDiscount = this.getAllEquipEffects("morph_discount").reduce((sum, eff) => sum + (eff.morphDiscount || 0), 0);
    const morphCost = Math.max(5, BATTLE_RULES.morphCost - totalDiscount);

    if (this.state.playerMp < morphCost) {
      return {
        ok: false,
        key: "combat.insufficientMp",
        message: "MP 不足，無法使用變拳。"
      };
    }
    this.clearReactionClocks();
    this.state.playerMp -= morphCost;

    this.battleMorphCount = (this.battleMorphCount || 0) + 1;
    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.morphActive = true;

    const morphWindowMs = 2000;
    this.state.reactionRemaining = morphWindowMs / 1000;
    this.reactionDeadline = this.now() + morphWindowMs;
    this.state.deadline = this.reactionDeadline;
    this.state.reactionExpiresAt = this.reactionDeadline;

    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say(
      { key: "dialogue.morphReaction" },
      { key: "dialogue.speakerKohaku" }
    );

    this.reactionTickId = this.timers.interval(() => {
      if (!this.state?.active || this.state.phase !== "reaction" || this.state.isPaused) return;
      const rem = Math.max(0, this.reactionDeadline - this.now());
      this.state.reactionRemaining = rem / 1000;
      this.emitState();
      if (rem <= 0) {
        if (this.reactionTickId !== null) {
          this.timers.clearInterval(this.reactionTickId);
          this.reactionTickId = null;
        }
      }
    }, 100);

    this.reactionTimeoutId = this.timers.timeout(() => {
      this.reactionTimeoutId = null;
      this.state.morphActive = false;
      this.resolveRound();
    }, morphWindowMs);
    const res = { ok: true };
    if (!this._isDispatching) this.recordCommand("use_morph", {}, declaredAt, res);
    return res;
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
    this.state.morphActive = false;

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

        const singleLoss = (leftResult === "loss" && rightResult !== "loss") || (rightResult === "loss" && leftResult !== "loss");
        if (singleLoss) {
          const losingToEnemyId = leftResult === "loss" ? "left" : "right";
          const winningOverEnemyId = leftResult === "win" ? "left" : (rightResult === "win" ? "right" : null);
          if (winningOverEnemyId) {
            const wonEnemy = this.state.enemies.find((e) => e.id === winningOverEnemyId && e.alive);
            if (wonEnemy) this.applyDamageToEnemy(wonEnemy, null, false);
          }
          if (this.state.enemies.every((e) => !e.alive) || this.state.enemyHp <= 0) {
            this.finishRound("win", { key: "dialogue.winDualSingle" });
            return;
          }
          this.state.targetEnemyId = losingToEnemyId;
          this.bus.emit("battle:effect", { type: "player-rps-loss" });
          this.bus.emit("sound", { name: "punch" });
          this.startQte(losingToEnemyId);
          return;
        }

        const bothWin = leftResult === "win" && rightResult === "win";
        const singleWin = (leftResult === "win" && rightResult !== "win") || (rightResult === "win" && leftResult !== "win");

        if (bothWin) {
          const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
          const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
          if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
          if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
          const suffix = this.state.morphUsed
            ? { key: "dialogue.winDualMorphBoth" }
            : { key: "dialogue.winDualBoth" };
          this.finishRound("win", suffix);
          return;
        }

        if (singleWin) {
          const winEnemyId = leftResult === "win" ? "left" : "right";
          this.state.targetEnemyId = winEnemyId;
          const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
          if (target) this.applyDamageToEnemy(target, null, false);
          const suffix = this.state.morphUsed
            ? { key: "dialogue.winDualMorphSingle" }
            : { key: "dialogue.winDualSingle" };
          this.finishRound("win", suffix);
          return;
        }

        this.resolveMomoDraw();
        return;
      }

      const leftResult = compareHands(this.state.selectedHand, this.state.opponentHands.left);
      const rightResult = compareHands(this.state.selectedHand, this.state.opponentHands.right);

      if (leftResult === "loss" && rightResult === "loss") {
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startDualQte();
        return;
      }

      const singleLoss = (leftResult === "loss" && rightResult !== "loss") || (rightResult === "loss" && leftResult !== "loss");
      if (singleLoss) {
        const losingToEnemyId = leftResult === "loss" ? "left" : "right";
        const winningOverEnemyId = leftResult === "win" ? "left" : (rightResult === "win" ? "right" : null);
        if (winningOverEnemyId) {
          const wonEnemy = this.state.enemies.find((e) => e.id === winningOverEnemyId && e.alive);
          if (wonEnemy) this.applyDamageToEnemy(wonEnemy, null, false);
        }
        if (this.state.enemies.every((e) => !e.alive) || this.state.enemyHp <= 0) {
          this.finishRound("win", { key: "dialogue.winDualSingle" });
          return;
        }
        this.state.targetEnemyId = losingToEnemyId;
        this.bus.emit("battle:effect", { type: "player-rps-loss" });
        this.bus.emit("sound", { name: "punch" });
        this.startQte(losingToEnemyId);
        return;
      }

      const bothWin = leftResult === "win" && rightResult === "win";
      const singleWin = (leftResult === "win" && rightResult !== "win") || (rightResult === "win" && leftResult !== "win");

      if (bothWin) {
        const leftEnemy = this.state.enemies.find((e) => e.id === "left" && e.alive);
        const rightEnemy = this.state.enemies.find((e) => e.id === "right" && e.alive);
        if (leftEnemy) this.applyDamageToEnemy(leftEnemy, null, false);
        if (rightEnemy) this.applyDamageToEnemy(rightEnemy, null, false);
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphBoth" }
          : { key: "dialogue.winDualBoth" };
        this.finishRound("win", suffix);
        return;
      }

      if (singleWin) {
        const winEnemyId = leftResult === "win" ? "left" : "right";
        this.state.targetEnemyId = winEnemyId;
        const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
        if (target) this.applyDamageToEnemy(target, null, false);
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphSingle" }
          : { key: "dialogue.winDualSingle" };
        this.finishRound("win", suffix);
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
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winDualMorphDoubleDmg" }
          : { key: "dialogue.winDualDoubleDmg" };
        this.damageEnemy(suffix, false, doubleDamage);
        return;
      }

      if (singleWin) {
        const suffix = this.state.morphUsed
          ? { key: "dialogue.winSingleMorph" }
          : { key: "dialogue.winSingleNormal" };
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
      const suffix = this.state.morphUsed
        ? { key: "dialogue.winSingleMorph" }
        : { key: "dialogue.winSingleNormal" };
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
        this.battleMomoAttempts = (this.battleMomoAttempts || 0) + 1;
        const aliveEnemies = this.state.enemies.filter((e) => e.alive);
        if (aliveEnemies.length > 0) {
          const target = aliveEnemies[Math.floor(this.random() * aliveEnemies.length)];
          const dodgeRate = this.state.stage?.momoDodgeRate || 0;
          const isDodged = this.random() < dodgeRate;
          const targetName = target.name || "小樂";

          if (isDodged) {
            this.store.recordMomoProc({ success: false, damage: 0 });
            this.bus.emit("battle:effect", {
              type: "enemy-dodge",
              targetId: target.id,
              skill: "momo"
            });
            this.bus.emit("sound", { name: "danger" });
            this.finishRound("draw", {
              key: "dialogue.drawMomoDodge",
              params: { target: targetName, targetId: target.id }
            });
            return;
          }

          const shadowBonus = this.getAllEquipEffects("shadow").reduce((sum, eff) => sum + (eff.momoDamageBonus || 0), 0);
          const momoDamage = SKILLS.momo.damage + shadowBonus;
          target.hp = Math.max(0, target.hp - momoDamage);
          if (target.hp === 0) target.alive = false;
          this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
          this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
          this.battleMomoSuccesses = (this.battleMomoSuccesses || 0) + 1;
          this.battleMomoDamage = (this.battleMomoDamage || 0) + momoDamage;
          this.battleDamageDealt = (this.battleDamageDealt || 0) + momoDamage;
          this.store.recordMomoProc({ success: true, damage: momoDamage });
          this.bus.emit("battle:effect", {
            type: "enemy-hit",
            amount: momoDamage,
            targetId: target.id,
            skill: "momo"
          });
          this.bus.emit("battle:damage-logged", {
            target: "enemy",
            targetId: target.id,
            targetName: target.name,
            amount: momoDamage,
            source: "momo",
            round: this.state?.round || 1,
            actionType: "attack"
          });
          this.bus.emit("sound", { name: "counterRub" });
          this.finishRound("draw", {
            key: "dialogue.drawMomoHit",
            params: { target: targetName, targetId: target.id, damage: momoDamage }
          });
          return;
        }
      }
    }

    this.finishRound("draw", {
      key: "dialogue.drawNormal"
    });
  }

  startQte(targetEnemyId = null) {
    this.state.phase = "qte";
    this.state.isDualQte = false;
    if (targetEnemyId) {
      this.state.targetEnemyId = targetEnemyId;
    }
    this.emitState();
    this.say(
      { key: "dialogue.qteSingleBreak" },
      { key: "dialogue.speakerKohaku" }
    );
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
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
    this.say(
      { key: "dialogue.qteDualBreak" },
      { key: "dialogue.speakerPlatinumKohaku" }
    );
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1.5 * 1000,
      qteDirections: this.state.stage.qteDirections || "all",
      maxErrors: this.state.stage.maxErrors ?? 1
    });
  }

  inputQte(directionId, slot = null, declaredAt = null) {
    if (this.state?.phase !== "qte") return false;
    const res = this.state.isDualQte
      ? this.dualQte.input(directionId, slot, declaredAt)
      : this.qte.input(directionId, declaredAt);
    if (!this._isDispatching) {
      this.recordCommand("input_qte", { directionId, slot }, declaredAt, { ok: Boolean(res) });
    }
    return res;
  }

  handleDualQteSlotSuccess(slotOrEnemyId) {
    const enemyId = slotOrEnemyId === "left" ? "left" : "right";
    const slot = slotOrEnemyId === "left" ? "left" : "right";
    if (this.state.dualQteResolved && this.state.dualQteResolved[slot]) return;
    if (this.state.dualQteResolved) this.state.dualQteResolved[slot] = true;

    const targetEnemy = this.state.enemies.find((e) => e.id === enemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);
    if (!targetEnemy) return;

    this.applyDamageToEnemy(targetEnemy, null, true);
    this.say(
      {
        key: "dialogue.deflectedSingleAttack",
        params: { target: targetEnemy.name, targetId: targetEnemy.id }
      },
      { key: "dialogue.speakerPlayer" }
    );
    this.emitState();
  }

  resolveQte(result) {
    if (!this.state?.active || this.state.phase !== "qte") return;
    if (result.mode === "dual") {
      const leftSuccess = result.left?.success;
      const rightSuccess = result.right?.success;
      this.battleQteTotal = (this.battleQteTotal || 0) + 2;
      if (leftSuccess) this.battleQteHits = (this.battleQteHits || 0) + 1;
      if (rightSuccess) this.battleQteHits = (this.battleQteHits || 0) + 1;

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
        this.damagePlayerForDual(failedCount, {
          key: "dialogue.dualQteMiss"
        });
      } else {
        const counter = getQteCounterNarration(this.state.selectedHand);
        this.state.selectedHand = counter.changedHand;
        this.timers.timeout(() => {
          if (this.state?.active && this.state.phase === "qte") {
            this.finishRound("win", {
              key: "dialogue.dualQteSuccess"
            });
          }
        }, 500);
      }
      return;
    }

    this.battleQteTotal = (this.battleQteTotal || 0) + 1;
    if (result.success) {
      this.battleQteHits = (this.battleQteHits || 0) + 1;
      this.store.recordQteAttempt(this.state?.stage?.id, true);
      const counter = getQteCounterNarration(this.state.selectedHand);
      this.state.selectedHand = counter.changedHand;
      this.timers.timeout(() => {
        if (this.state?.active && this.state.phase === "qte") {
          this.damageEnemy(counter, true);
        }
      }, 500);
    } else {
      this.store.recordQteAttempt(this.state?.stage?.id, false);
      this.damagePlayer({
        key: "dialogue.qteMiss"
      });
    }
  }

  applyDamageToEnemy(target, damageAmount = null, countered = false) {
    if (!target || !target.alive) return;
    let amount = damageAmount ?? this.state.playerDamage;
    if (countered) {
      amount += this.getAllEquipEffects("thunder").reduce((sum, eff) => sum + (eff.qteBonusDamage || 0), 0);
    } else if (this.hasEquipEffect("burst")) {
      amount = Math.round(amount * (this.hasEquipEffect("burst")?.winMultiplier || 1.5));
    }

    target.hp = Math.max(0, target.hp - amount);
    this.battleDamageDealt = (this.battleDamageDealt || 0) + amount;
    if (this.state.morphUsed) {
      this.battleMorphDamage = (this.battleMorphDamage || 0) + amount;
      this.store.recordMorphUse({ success: true, damage: amount });
    }
    if (target.hp === 0) target.alive = false;
    this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
    this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;

    const freezeEffects = this.getAllEquipEffects("freeze");
    if (freezeEffects.length > 0) {
      const didFreeze = freezeEffects.some((eff) => this.random() < (eff.freezeChance || 0.3));
      if (didFreeze) {
        const hands = ["rock", "paper", "scissors"];
        const frozenHand = hands[Math.floor(this.random() * hands.length)];
        this.state.frozenEnemyHand = frozenHand;
        this.state.isEnemyFrozen = true;
        const handLabel = HANDS[frozenHand]?.label || "";
        this.bus.emit("battle:effect", {
          type: "freeze",
          frozenHand,
          handLabel,
          handGlyph: HANDS[frozenHand].glyph
        });
        this.say(
          {
            key: "dialogue.freezeNarration",
            params: { hand: handLabel }
          },
          { key: "dialogue.speakerKohaku" }
        );
      }
    }

    this.bus.emit("battle:effect", {
      type: "enemy-hit",
      amount,
      targetId: target.id,
      countered
    });
    let logSource = "rps_win";
    if (countered) logSource = "counter";
    else if (this.state.morphUsed) logSource = "morph";
    else if (this.hasEquipEffect("burst")) logSource = "burst";

    this.bus.emit("battle:damage-logged", {
      target: "enemy",
      targetId: target.id,
      targetName: target.name,
      amount,
      source: logSource,
      round: this.state?.round || 1,
      actionType: "attack"
    });
    this.bus.emit("sound", { name: countered ? "counterRub" : "hit" });
  }

  dealEnemyDamage(amount) {
    this.damageEnemy({ key: "combat.tookDamage", text: "受到傷害" }, false, amount);
  }

  damageEnemy(messageOrPayload, countered = false, damageAmount = null) {
    const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
      || this.state.enemies.find((e) => e.alive);

    if (target) {
      this.applyDamageToEnemy(target, damageAmount, countered);
    }
    this.finishRound("win", messageOrPayload);
  }

  damagePlayer(messageOrPayload) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", {
        key: "dialogue.dodgeDodge"
      });
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const isDojo = Boolean(this.state.stage?.isDojo);
    const baseDamage = isDojo
      ? Number(this.state.stage.customDamage ?? 0)
      : (BATTLE_RULES.enemyDamage * multiplier);

    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const totalDamage = baseDamage === 0 ? 0 : Math.max(0, baseDamage - reduction);

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: totalDamage,
      source: "enemy_attack",
      round: this.state?.round || 1,
      actionType: "damaged"
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflectDamage = this.getAllEquipEffects("reflect").reduce((sum, eff) => sum + (eff.reflectDamage || 0), 0);
    if (reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflectDamage);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + reflectDamage;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflectDamage,
          targetId: target.id
        });
        this.bus.emit("battle:damage-logged", {
          target: "enemy",
          targetId: target.id,
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect",
          round: this.state?.round || 1,
          actionType: "reflect"
        });
      }
    }

    this.finishRound("loss", messageOrPayload);
  }

  damagePlayerForDual(count, messageOrPayload) {
    const dodge = this.hasEquipEffect("dodge");
    if (dodge && this.random() < (dodge.dodgeChance || 0.25)) {
      this.bus.emit("battle:effect", { type: "player-dodge" });
      this.bus.emit("sound", { name: "danger" });
      this.finishRound("draw", {
        key: "dialogue.dodgeDodgeDual"
      });
      return;
    }

    const multiplier = this.state.stage.enemyDamageMultiplier || 1;
    const isDojo = Boolean(this.state.stage?.isDojo);
    const baseDamage = isDojo
      ? Number(this.state.stage.customDamage ?? 0)
      : (BATTLE_RULES.enemyDamage * multiplier);

    const shieldReduction = this.getAllEquipEffects("shield").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const armorReduction = this.getAllEquipEffects("armor_reduction").reduce((sum, eff) => sum + (eff.damageReduction || 0), 0);
    const reduction = shieldReduction + armorReduction;
    const singleDamage = baseDamage === 0 ? 0 : Math.max(0, baseDamage - reduction);
    const totalDamage = singleDamage * count;

    this.state.playerHp = Math.max(0, this.state.playerHp - totalDamage);
    this.battleDamageTaken = (this.battleDamageTaken || 0) + totalDamage;
    this.bus.emit("battle:effect", {
      type: "player-hit",
      amount: totalDamage
    });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: totalDamage,
      source: "enemy_attack",
      round: this.state?.round || 1,
      actionType: "damaged"
    });
    this.bus.emit("sound", { name: "hurt" });

    // Reflect check
    const reflectDamage = this.getAllEquipEffects("reflect").reduce((sum, eff) => sum + (eff.reflectDamage || 0), 0);
    if (reflectDamage > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - reflectDamage);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + reflectDamage;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.bus.emit("battle:effect", {
          type: "enemy-hit",
          amount: reflectDamage,
          targetId: target.id
        });
        this.bus.emit("battle:damage-logged", {
          target: "enemy",
          targetId: target.id,
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect",
          round: this.state?.round || 1,
          actionType: "reflect"
        });
      }
    }

    this.finishRound("loss", messageOrPayload);
  }

  finishRound(result, messageOrPayload) {
    this.state.phase = "result";
    this.state.lastResult = result;

    // MP Regen effect check
    const totalMpRegen = this.getAllEquipEffects("mp_regen").reduce((sum, eff) => sum + (eff.mpRegen || 0), 0);
    if (totalMpRegen > 0) {
      const before = this.state.playerMp;
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + totalMpRegen);
      const restored = this.state.playerMp - before;
      if (restored > 0) {
        this.bus.emit("battle:damage-logged", {
          target: "player",
          targetNameKey: "dialogue.speakerPlayer",
          targetName: "旅人",
          amount: restored,
          source: "regen_mp",
          round: this.state?.round || 1,
          actionType: "mana",
          resource: "mp"
        });
      }
    }

    // Burn effect check
    const totalBurn = this.getAllEquipEffects("burn").reduce((sum, eff) => sum + (eff.burnDamage || 0), 0);
    if (totalBurn > 0 && this.state.enemyHp > 0) {
      const target = this.state.enemies.find((e) => e.id === this.state.targetEnemyId && e.alive)
        || this.state.enemies.find((e) => e.alive);
      if (target) {
        target.hp = Math.max(0, target.hp - totalBurn);
        this.battleDamageDealt = (this.battleDamageDealt || 0) + totalBurn;
        if (target.hp === 0) target.alive = false;
        this.state.enemyHp = this.state.enemies.reduce((acc, e) => acc + e.hp, 0);
        this.state.targetEnemyId = this.state.enemies.find((e) => e.alive)?.id || target.id;
      }
      this.bus.emit("battle:effect", { type: "burn", amount: totalBurn, targetId: target?.id });
      this.bus.emit("battle:damage-logged", {
        target: "enemy",
        targetId: target?.id,
        targetName: target?.name || "小樂",
        amount: totalBurn,
        source: "burn",
        round: this.state?.round || 1,
        actionType: "burn"
      });
    }

    this.emitState(); // Push state ONCE on phase transition!
    const speakerKey = result === "loss" ? "dialogue.speakerKohaku" : "dialogue.speakerNarrator";
    this.say(messageOrPayload, { key: speakerKey });

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

  useItem(itemId, declaredAt = null) {
    if (!this.state?.active || this.state.phase === "ended") {
      return {
        ok: false,
        key: "combat.notInBattle",
        message: "目前不在戰鬥中。"
      };
    }
    const item = ITEMS[itemId];
    if (!item) {
      return {
        ok: false,
        key: "combat.itemNotFound",
        message: "找不到這個道具。"
      };
    }

    const valueKey = item.resource === "hp" ? "playerHp" : "playerMp";
    const maxKey = item.resource === "hp" ? "playerMaxHp" : "playerMaxMp";
    if (this.state[valueKey] >= this.state[maxKey]) {
      return {
        ok: false,
        key: "combat.resourceFull",
        params: { resource: item.resource.toUpperCase() },
        message: item.resource.toUpperCase() + " 已經是滿的。"
      };
    }
    if (!this.store.consumeItem(itemId)) {
      return {
        ok: false,
        key: "combat.itemDepleted",
        params: { name: item.shortName },
        message: item.shortName + "已用完。"
      };
    }

    const potionBoost = this.getAllEquipEffects("potion_boost").reduce((sum, eff) => sum + (eff.potionBoost || 0), 0);
    const restoreAmount = item.restore + potionBoost;

    const before = this.state[valueKey];
    this.state[valueKey] = Math.min(this.state[maxKey], before + restoreAmount);
    const restored = this.state[valueKey] - before;

    if (item.resource === "hp") {
      this.battleHpPotionUsed = (this.battleHpPotionUsed || 0) + 1;
      this.battleHpRestored = (this.battleHpRestored || 0) + restored;
    } else {
      this.battleMpPotionUsed = (this.battleMpPotionUsed || 0) + 1;
      this.battleMpRestored = (this.battleMpRestored || 0) + restored;
    }
    this.store.recordPotionUse(item.resource === "hp" ? "hpPotion" : "mpPotion", { restored });
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetNameKey: "dialogue.speakerPlayer",
      targetName: "旅人",
      amount: restored,
      source: item.resource === "hp" ? "heal_hp" : "heal_mp",
      round: this.state?.round || 1,
      actionType: item.resource === "hp" ? "heal" : "mana",
      resource: item.resource
    });
    this.emitState();
    this.bus.emit("battle:effect", { type: "item", resource: item.resource, amount: restored });
    this.bus.emit("sound", { name: "heal" });
    this.say(
      {
        key: "dialogue.itemUsed",
        params: {
          name: item.name || itemId,
          itemId: item.id || itemId,
          restored,
          resource: item.resource.toUpperCase()
        }
      },
      { key: "dialogue.speakerNarrator" }
    );
    const res = { ok: true, restored, resource: item.resource };
    if (!this._isDispatching) this.recordCommand("use_item", { itemId }, declaredAt, res);
    return res;
  }

  end(won) {
    if (!this.state?.active) return;
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    this.state.active = false;
    this.state.phase = "ended";
    this.state.won = won;
    const durationSec = Math.max(1, Math.round((this.now() - (this.battleStartTime || this.now())) / 1000));
    const reward = this.store.recordBattle(won, this.state.stage, {
      isAuto: Boolean(this.autoBattle?.active),
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
      hpPotionUsed: this.battleHpPotionUsed || 0,
      mpPotionUsed: this.battleMpPotionUsed || 0,
      hpRestored: this.battleHpRestored || 0,
      mpRestored: this.battleMpRestored || 0,
      momoAttempts: this.battleMomoAttempts || 0,
      momoSuccesses: this.battleMomoSuccesses || 0,
      momoDamage: this.battleMomoDamage || 0,
      morphCount: this.battleMorphCount || 0,
      morphDamage: this.battleMorphDamage || 0,
      qteHits: this.battleQteHits || null,
      qteTotal: this.battleQteTotal || null
    });
    this.emitState(); // Push state ONCE on phase transition!
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      combatDps: reward.dps,
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
      seed: this.battleSeed,
      commandLog: [...this.commandLog],
      battle: this.snapshot(),
      autoBattle: { ...this.autoBattle },
      isAuto: Boolean(this.autoBattle?.active)
    });
    this.bus.emit("sound", { name: won ? "victory" : "defeat" });

    if (this.autoBattle.active) {
      this.autoBattle.remainingRounds -= 1;
      if (won) {
        this.autoBattle.wins += 1;
      } else {
        this.autoBattle.losses += 1;
      }
      this.bus.emit("auto-battle:update", { ...this.autoBattle, won });

      if (this.autoBattle.active && this.autoBattle.remainingRounds > 0) {
        if (!this.autoBattle.isPaused) {
          if (this.autoRestartTimerId !== null) {
            this.timers.clearTimeout(this.autoRestartTimerId);
          }
          this.autoRestartTimerId = this.timers.timeout(() => {
            this.autoRestartTimerId = null;
            if (this.autoBattle.active && !this.autoBattle.isPaused && this.autoBattle.remainingRounds > 0) {
              this.start(this.autoBattle.stageId, { autoBattle: true });
            }
          }, 800);
        }
      } else {
        this.autoBattle.active = false;
        this.autoBattle.isPaused = false;
        this.autoBattle.remainingRounds = 0;
        this.bus.emit("auto-battle:finished", { ...this.autoBattle });
      }
    }
  }

  stopAutoBattle() {
    this.autoBattle.active = false;
    this.autoBattle.isPaused = false;
    this.autoBattle.remainingRounds = 0;
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.state) {
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
  }

  abandon() {
    this.stopAutoBattle();
    this.qte.stop();
    this.dualQte.stop();
    this.stopClocks();
    if (this.state) {
      this.state.active = false;
      this.state.phase = "abandoned";
      this.state.autoBattle = { ...this.autoBattle };
      this.emitState();
    }
    if (!this._isDispatching) this.recordCommand("abandon", {}, null, { ok: true });
  }

  clearCountdownClocks() {
    if (this.countdownTimeoutId !== null) {
      this.timers.clearTimeout(this.countdownTimeoutId);
      this.countdownTimeoutId = null;
    }
    if (this.countdownId !== null) {
      this.timers.clearInterval(this.countdownId);
      this.countdownId = null;
    }
    this.beatTimerIds.forEach((id) => this.timers.clearTimeout(id));
    this.beatTimerIds = [];
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
    if (this.autoRestartTimerId !== null) {
      this.timers.clearTimeout(this.autoRestartTimerId);
      this.autoRestartTimerId = null;
    }
    if (this.disconnectTimeoutId !== null) {
      this.timers.clearTimeout(this.disconnectTimeoutId);
      this.disconnectTimeoutId = null;
    }
    this.clearCountdownClocks();
    this.clearReactionClocks();
    this.timers.clearAll();
  }
}

// --- src/js/systems/PostBattleSystem.js ---
class PostBattleSystem {
  constructor(bus, store, random = Math.random, now = null) {
    this.bus = bus;
    this.store = store;
    const resolvedRandom = typeof random === "function"
      ? random
      : (typeof random === "object" && random !== null && typeof random.random === "function"
        ? random.random
        : Math.random);
    const resolvedNow = (typeof random === "object" && random !== null && typeof random.now === "function")
      ? random.now
      : (typeof now === "function"
        ? now
        : (typeof globalThis.performance !== "undefined" && typeof globalThis.performance.now === "function"
          ? () => globalThis.performance.now()
          : () => Date.now()));
    this.random = resolvedRandom;
    this.now = resolvedNow;
    this.state = null;
    this.autoWatermelonState = {
      active: false,
      scene: "idle",
      appearance: ASSETS.swimsuit,
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
  }

  getWatermelonStock() {
    return this.store?.snapshot?.()?.records?.watermelonStock ?? (this.store?.state?.records?.watermelonStock ?? 0);
  }

  addWatermelonStock(count = 1) {
    const newStock = this.store?.addWatermelonStock?.(count) ?? 0;
    this.emitAutoWatermelon();
    return newStock;
  }

  open(result) {
    if (result.isAuto) {
      if (result.won) {
        this.store?.unlockSwimsuit?.();
      }
      this.emitAutoWatermelon();
      return;
    }

    this.state = {
      ...result,
      scene: result.won ? "victory" : "defeat",
      appearance: result.won
        ? (result.stage?.final ? ASSETS.final : ASSETS.default)
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
      this.say({ key: "dialogue.postBattleWin" });
    } else {
      this.say({ key: "dialogue.postBattleLoss" });
    }
  }

  requestSwimsuit() {
    if (!this.state?.won) return;
    this.store?.unlockSwimsuit?.();
    this.state.scene = "swimsuit";
    this.state.appearance = ASSETS.swimsuit;
    this.emit();
    this.say({ key: "dialogue.askSwimsuitLine" });
  }

  startWatermelon() {
    if (
      !this.state?.won ||
      !["swimsuit", "watermelonResult"].includes(this.state.scene) ||
      this.state.watermelon.attempts >= this.state.watermelon.maxAttempts
    ) return;
    const attempts = this.state.watermelon.attempts;
    this.state.tolerance = 0.13 * (0.825 ** attempts);
    this.state.strikeDuration = 1800 / (1.175 ** attempts);
    this.state.scene = "watermelonAim";
    this.state.appearance = ASSETS.swimsuit;
    const minTarget = this.state.tolerance + 0.05;
    const maxTarget = 1 - this.state.tolerance - 0.05;
    this.state.target = minTarget + this.random() * Math.max(0.1, maxTarget - minTarget);
    this.state.strikeStartedAt = this.now();
    this.emit();
    const nextAttempt = this.state.watermelon.attempts + 1;
    this.say({
      key: "dialogue.watermelonAttempt",
      params: { nextAttempt }
    });
  }

  strike(declaredAt = null) {
    if (this.state?.scene !== "watermelonAim") return;
    const timestamp = declaredAt || this.now();
    const marker = this.getMarkerPosition(timestamp);
    const distance = Math.abs(marker - this.state.target);
    const tolerance = this.state.tolerance ?? (0.13 * (0.825 ** this.state.watermelon.attempts));
    const success = distance <= tolerance;
    this.state.watermelon.attempts += 1;
    this.state.watermelon.lastCutSuccess = success;
    if (success) {
      this.state.watermelon.successes += 1;
    }
    this.store?.recordWatermelonStageCut?.(this.state.watermelon.attempts, success);
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
      this.say({
        key: "dialogue.watermelonHit",
        params: { remaining }
      });
    } else {
      this.say({
        key: "dialogue.watermelonMiss",
        params: { remaining }
      });
    }
  }

  settleWatermelon() {
    const watermelon = this.state.watermelon;
    const earned = this.store?.grantExperience?.(watermelon.successes * 100, "watermelon-reward") || { xp: watermelon.successes * 100, levelsGained: 0 };
    watermelon.rewardXp = earned.xp;
    watermelon.levelsGained = earned.levelsGained;
    this.state.scene = "watermelonComplete";
    this.emit();
    this.bus.emit("sound", { name: watermelon.successes ? "victory" : "defeat" });
    if (watermelon.successes > 0) {
      this.say({
        key: "dialogue.watermelonAllHit",
        params: { successes: watermelon.successes }
      });
    } else {
      this.say({
        key: "dialogue.watermelonDone"
      });
    }
  }

  getMarkerPosition(now = null) {
    if (!this.state?.strikeStartedAt) return 0;
    const currentNow = now ?? this.now();
    const elapsed = (currentNow - this.state.strikeStartedAt) % this.state.strikeDuration;
    const normalized = elapsed / this.state.strikeDuration;
    return normalized <= 0.5 ? normalized * 2 : (1 - normalized) * 2;
  }

  // --- Auto-Battle Floating Watermelon API ---

  startAutoWatermelonRound() {
    const isFresh = !this.autoWatermelonState || ["idle", "watermelonComplete"].includes(this.autoWatermelonState.scene);
    if (isFresh) {
      if (this.getWatermelonStock() <= 0) return false;
      this.store?.consumeWatermelonStock?.(1);
      this.store?.unlockSwimsuit?.();
      this.autoWatermelonState = {
        active: true,
        scene: "watermelonAim",
        appearance: ASSETS.swimsuit,
        target: 0,
        tolerance: 0.13,
        strikeStartedAt: this.now(),
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
    } else if (this.autoWatermelonState.scene === "watermelonResult") {
      const attempts = this.autoWatermelonState.watermelon.attempts;
      this.autoWatermelonState.tolerance = 0.13 * (0.825 ** attempts);
      this.autoWatermelonState.strikeDuration = 1800 / (1.175 ** attempts);
      this.autoWatermelonState.scene = "watermelonAim";
      this.autoWatermelonState.appearance = ASSETS.swimsuit;
      this.autoWatermelonState.strikeStartedAt = this.now();
    }

    const minTarget = this.autoWatermelonState.tolerance + 0.05;
    const maxTarget = 1 - this.autoWatermelonState.tolerance - 0.05;
    this.autoWatermelonState.target = minTarget + this.random() * Math.max(0.1, maxTarget - minTarget);
    this.autoWatermelonState.active = true;
    this.emitAutoWatermelon();
    const nextAttempt = this.autoWatermelonState.watermelon.attempts + 1;
    this.say({
      key: "dialogue.watermelonAttempt",
      params: { nextAttempt }
    });
    return true;
  }

  autoWatermelonStrike(declaredAt = null) {
    if (!this.autoWatermelonState || this.autoWatermelonState.scene !== "watermelonAim") return;
    const timestamp = declaredAt || this.now();
    const marker = this.getAutoMarkerPosition(timestamp);
    const distance = Math.abs(marker - this.autoWatermelonState.target);
    const tolerance = this.autoWatermelonState.tolerance ?? (0.13 * (0.825 ** this.autoWatermelonState.watermelon.attempts));
    const success = distance <= tolerance;
    this.autoWatermelonState.watermelon.attempts += 1;
    this.autoWatermelonState.watermelon.lastCutSuccess = success;
    if (success) {
      this.autoWatermelonState.watermelon.successes += 1;
    }
    this.store?.recordWatermelonStageCut?.(this.autoWatermelonState.watermelon.attempts, success);
    this.autoWatermelonState.appearance = success ? ASSETS.watermelon : ASSETS.swimsuit;

    if (this.autoWatermelonState.watermelon.attempts >= this.autoWatermelonState.watermelon.maxAttempts) {
      this.settleAutoWatermelon();
      return;
    }

    this.autoWatermelonState.scene = "watermelonResult";
    this.emitAutoWatermelon();
    this.bus.emit("sound", { name: success ? "victory" : "hurt" });
    const remaining = this.autoWatermelonState.watermelon.maxAttempts - this.autoWatermelonState.watermelon.attempts;
    if (success) {
      this.say({
        key: "dialogue.watermelonHit",
        params: { remaining }
      });
    } else {
      this.say({
        key: "dialogue.watermelonMiss",
        params: { remaining }
      });
    }
  }

  settleAutoWatermelon() {
    if (!this.autoWatermelonState) return;
    const watermelon = this.autoWatermelonState.watermelon;
    const earned = this.store?.grantExperience?.(watermelon.successes * 100, "watermelon-reward") || { xp: watermelon.successes * 100, levelsGained: 0 };
    watermelon.rewardXp = earned.xp;
    watermelon.levelsGained = earned.levelsGained;
    this.autoWatermelonState.scene = "watermelonComplete";
    this.emitAutoWatermelon();
    this.bus.emit("sound", { name: watermelon.successes ? "victory" : "defeat" });
    if (watermelon.successes > 0) {
      this.say({
        key: "dialogue.watermelonAllHit",
        params: { successes: watermelon.successes }
      });
    } else {
      this.say({
        key: "dialogue.watermelonDone"
      });
    }
  }

  getAutoMarkerPosition(now = null) {
    if (!this.autoWatermelonState?.strikeStartedAt) return 0;
    const currentNow = now ?? this.now();
    const elapsed = (currentNow - this.autoWatermelonState.strikeStartedAt) % this.autoWatermelonState.strikeDuration;
    const normalized = elapsed / this.autoWatermelonState.strikeDuration;
    return normalized <= 0.5 ? normalized * 2 : (1 - normalized) * 2;
  }

  closeAutoWatermelon() {
    if (this.autoWatermelonState) {
      this.autoWatermelonState.active = false;
      this.autoWatermelonState.scene = "idle";
    }
    this.emitAutoWatermelon();
  }

  say(keyOrPayload) {
    let key = null;
    let params = {};
    let text = "";

    if (typeof keyOrPayload === "object" && keyOrPayload !== null) {
      key = keyOrPayload.key || null;
      params = keyOrPayload.params || {};
      text = keyOrPayload.text || "";
    } else {
      text = String(keyOrPayload || "");
    }

    this.bus.emit("dialogue", {
      key,
      params,
      speakerKey: "dialogue.speakerKohaku",
      speaker: "小樂",
      text
    });
  }

  restore(savedState) {
    if (!savedState) return;
    this.state = savedState;
    this.emit();
  }

  emit() {
    this.bus.emit("postbattle:state", structuredClone(this.state));
  }

  emitAutoWatermelon() {
    this.bus.emit("postbattle:auto-watermelon", {
      ...(this.autoWatermelonState ? structuredClone(this.autoWatermelonState) : { active: false, scene: "idle" }),
      stock: this.getWatermelonStock()
    });
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
    this.masterMusicGain = null;
    this.masterSfxGain = null;
    this.currentScene = "lobby"; // "lobby" | "battle"
    this.isMusicRunning = false;
    this.musicTimer = null;
    this.nextNoteTime = 0;
    this.currentStep = 0;
    this.totalStepsLobby = 64; // 16 beats * 4 sixteenths at 60 BPM
    this.totalStepsBattle = 64; // 16 beats * 4 sixteenths at 136 BPM
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;

    this.bindUnlockGesture();
  }

  bindUnlockGesture() {
    if (typeof window === "undefined") return;

    if (typeof navigator !== "undefined" && navigator.audioSession) {
      try {
        navigator.audioSession.type = "ambient";
      } catch (_) {}
    }

    const unlock = () => {
      this.ensureContext();
      if (this.context) {
        if (this.context.state === "suspended" || this.context.state === "interrupted") {
          this.context.resume().then(() => {
            this.updateMusicState();
          }).catch(() => {});
        }
        try {
          const buffer = this.context.createBuffer(1, 1, 22050);
          const source = this.context.createBufferSource();
          source.buffer = buffer;
          source.connect(this.context.destination);
          source.start(0);
        } catch (_) {}
      }
      this.updateMusicState();
    };

    const events = ["pointerdown", "touchstart", "touchend", "click", "keydown"];
    events.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this.ensureContext();
          if (this.context) {
            if (this.context.state === "suspended" || this.context.state === "interrupted") {
              this.context.resume().then(() => this.updateMusicState()).catch(() => {});
            } else {
              this.updateMusicState();
            }
          }
        }
      });
    }

    window.addEventListener("pageshow", () => {
      this.ensureContext();
      if (this.context) {
        this.context.resume().then(() => this.updateMusicState()).catch(() => {});
      }
    });

    window.addEventListener("focus", () => {
      this.ensureContext();
      if (this.context) {
        if (this.context.state === "suspended" || this.context.state === "interrupted") {
          this.context.resume().then(() => this.updateMusicState()).catch(() => {});
        }
      }
    });
  }

  ensureContext() {
    if (typeof navigator !== "undefined" && navigator.audioSession) {
      try {
        navigator.audioSession.type = "ambient";
      } catch (_) {}
    }

    if (this.context && this.context.state !== "closed") return this.context;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.context = new AudioCtx();

      this.context.onstatechange = () => {
        if (this.context?.state === "interrupted" || this.context?.state === "suspended") {
          this.context.resume().catch(() => {});
        }
        this.updateMusicState();
      };

      this.masterMusicGain = this.context.createGain();
      this.masterSfxGain = this.context.createGain();

      const snap = this.store.snapshot();
      const isMusicMuted = Boolean(snap.settings?.musicMuted);
      const isSfxMuted = Boolean(snap.settings?.sfxMuted ?? snap.settings?.muted);

      const now = Math.max(this.context.currentTime, 0);
      this.masterMusicGain.gain.setValueAtTime(isMusicMuted ? 0.0001 : 0.22, now);
      this.masterSfxGain.gain.setValueAtTime(isSfxMuted ? 0.0001 : 0.35, now);

      this.masterMusicGain.connect(this.context.destination);
      this.masterSfxGain.connect(this.context.destination);

      return this.context;
    } catch {
      return null;
    }
  }

  setBgmScene(scene) {
    const targetScene = scene === "battle" ? "battle" : "lobby";
    if (this.currentScene === targetScene && this.isMusicRunning) return;
    this.currentScene = targetScene;
    this.currentStep = 0;
    if (this.context) {
      this.nextNoteTime = this.context.currentTime + 0.05;
    }
    this.updateMusicState();
  }

  updateMusicState() {
    this.ensureContext();
    if (!this.context) return;

    const snap = this.store.snapshot();
    const isMusicMuted = Boolean(snap.settings?.musicMuted);
    const isSfxMuted = Boolean(snap.settings?.sfxMuted ?? snap.settings?.muted);
    const now = Math.max(this.context.currentTime, 0);

    if (this.masterMusicGain) {
      this.masterMusicGain.gain.cancelScheduledValues(now);
      this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
      this.masterMusicGain.gain.linearRampToValueAtTime(isMusicMuted ? 0.0001 : 0.22, now + 0.15);
    }
    if (this.masterSfxGain) {
      this.masterSfxGain.gain.cancelScheduledValues(now);
      this.masterSfxGain.gain.setValueAtTime(this.masterSfxGain.gain.value, now);
      this.masterSfxGain.gain.linearRampToValueAtTime(isSfxMuted ? 0.0001 : 0.35, now + 0.08);
    }

    if (!isMusicMuted) {
      if (this.context.state === "running") {
        this.startMusicScheduler();
      } else if (this.context.state === "suspended" || this.context.state === "interrupted") {
        this.context.resume().then(() => {
          if (this.context?.state === "running") {
            this.startMusicScheduler();
          }
        }).catch(() => {});
      }
    }
  }

  startMusicScheduler() {
    if (this.isMusicRunning) return;
    this.isMusicRunning = true;
    if (this.context) {
      this.nextNoteTime = this.context.currentTime + 0.1;
    }
    this.musicTimer = setInterval(() => {
      this.scheduler();
    }, 45);
  }

  stopMusicScheduler() {
    this.isMusicRunning = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.stopDrone();
  }

  scheduler() {
    if (!this.context || this.context.state !== "running") return;
    const now = this.context.currentTime;
    // Prevent scheduler backlog when browser/tab is backgrounded or throttled on iOS
    if (this.nextNoteTime < now) {
      this.nextNoteTime = now + 0.04;
    }
    const scheduleAheadTime = 0.22;
    while (this.nextNoteTime < now + scheduleAheadTime) {
      if (this.currentScene === "battle") {
        this.scheduleBattleStep(this.currentStep, this.nextNoteTime);
        const sixteenthTime = 60.0 / (136.0 * 4.0); // 136 BPM
        this.nextNoteTime += sixteenthTime;
        this.currentStep = (this.currentStep + 1) % this.totalStepsBattle;
      } else {
        this.scheduleLobbyStep(this.currentStep, this.nextNoteTime);
        const sixteenthTime = 60.0 / (62.0 * 4.0); // 62 BPM
        this.nextNoteTime += sixteenthTime;
        this.currentStep = (this.currentStep + 1) % this.totalStepsLobby;
      }
    }
  }

  // --- LOBBY PROCEDURAL JAPANESE AMBIENT (和風・遊雅之琴) ---
  scheduleLobbyStep(step, time) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;

    // Ambient Shinto drone background
    if (step === 0 && !this.droneGain) {
      this.startLobbyDrone(time);
    }

    // Traditional Pentatonic Scale (D Minor Hirajoshi / In-Sen)
    // D4: 293.66, F4: 349.23, G4: 392.00, A4: 440.00, C5: 523.25, D5: 587.33, F5: 698.46, A5: 880.00
    const kotoPattern = [
      { step: 0, freq: 293.66, vel: 0.24, dur: 0.8 }, // D4
      { step: 4, freq: 440.00, vel: 0.20, dur: 0.7 }, // A4
      { step: 8, freq: 523.25, vel: 0.22, dur: 0.9 }, // C5
      { step: 12, freq: 587.33, vel: 0.18, dur: 0.6 }, // D5
      { step: 16, freq: 698.46, vel: 0.22, dur: 1.0 }, // F5
      { step: 20, freq: 587.33, vel: 0.17, dur: 0.5 }, // D5
      { step: 24, freq: 440.00, vel: 0.21, dur: 0.8 }, // A4
      { step: 28, freq: 392.00, vel: 0.19, dur: 0.6 }, // G4
      { step: 32, freq: 349.23, vel: 0.23, dur: 0.9 }, // F4
      { step: 36, freq: 392.00, vel: 0.18, dur: 0.5 }, // G4
      { step: 40, freq: 440.00, vel: 0.22, dur: 0.8 }, // A4
      { step: 44, freq: 523.25, vel: 0.17, dur: 0.6 }, // C5
      { step: 48, freq: 587.33, vel: 0.24, dur: 1.2 }, // D5
      { step: 54, freq: 440.00, vel: 0.16, dur: 0.6 }, // A4
      { step: 58, freq: 349.23, vel: 0.18, dur: 0.8 }, // F4
      { step: 62, freq: 293.66, vel: 0.22, dur: 1.1 }  // D4
    ];

    const note = kotoPattern.find((p) => p.step === step);
    if (note) {
      this.playKotoPluck(note.freq, time, note.vel, note.dur);
    }

    // Suzu shrine wind bell on bar 4 and bar 12
    if (step === 16 || step === 48) {
      this.playSuzuBell(step === 16 ? 1760 : 2349.32, time + 0.15, 0.08);
    }

    // Shakuhachi soft flute breath note
    if (step === 32) {
      this.playShakuhachi(440.00, time, 0.12, 2.2);
    }
  }

  startLobbyDrone(time) {
    try {
      const ctx = this.context;
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, time);
      this.droneGain.gain.linearRampToValueAtTime(0.038, time + 2.0);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, time);

      this.droneOsc1 = ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(146.83, time); // D3

      this.droneOsc2 = ctx.createOscillator();
      this.droneOsc2.type = "sine";
      this.droneOsc2.frequency.setValueAtTime(220.00, time); // A3

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain).connect(this.masterMusicGain);

      this.droneOsc1.start(time);
      this.droneOsc2.start(time);
    } catch {}
  }

  stopDrone() {
    try {
      if (this.droneGain && this.context) {
        const now = this.context.currentTime;
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
        setTimeout(() => {
          try {
            this.droneOsc1?.stop();
            this.droneOsc2?.stop();
            this.droneOsc1 = null;
            this.droneOsc2 = null;
            this.droneGain = null;
          } catch {}
        }, 450);
      }
    } catch {}
  }

  playKotoPluck(frequency, time, velocity = 0.2, duration = 0.8) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, safeTime);
      // Slight pitch bend drop at initial pluck attack
      osc.frequency.linearRampToValueAtTime(frequency * 0.992, safeTime + 0.04);

      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(frequency * 2, safeTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 3.5, safeTime);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, safeTime + duration);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + duration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain).connect(this.masterMusicGain);

      osc.start(safeTime);
      oscHarmonic.start(safeTime);
      osc.stop(safeTime + duration + 0.05);
      oscHarmonic.stop(safeTime + duration + 0.05);
    } catch {}
  }

  playShakuhachi(frequency, time, velocity = 0.12, duration = 2.0) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, safeTime);
      // Natural gentle vibrato
      osc.frequency.linearRampToValueAtTime(frequency + 4, safeTime + 0.8);
      osc.frequency.linearRampToValueAtTime(frequency - 4, safeTime + 1.4);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(frequency * 1.4, safeTime);
      filter.Q.setValueAtTime(2.0, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.4);
      gain.gain.linearRampToValueAtTime(safeVel * 0.7, safeTime + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + duration);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + duration + 0.05);
    } catch {}
  }

  playSuzuBell(frequency, time, velocity = 0.08) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 1.4);

      osc.connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 1.45);
    } catch {}
  }

  // --- BATTLE PROCEDURAL JAPANESE COMBAT (狐火・決戰激闘) ---
  scheduleBattleStep(step, time) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;

    if (this.droneGain) {
      this.stopDrone();
    }

    // Taiko Drum Beats (136 BPM, 16-beat loop = 64 sixteenth steps)
    // O-Daiko Deep Taiko Kick on 1, 3 (every other beat) + syncopations
    if ([0, 6, 8, 14, 16, 22, 24, 30, 32, 38, 40, 46, 48, 54, 56, 62].includes(step)) {
      this.playTaikoKick(time, step % 8 === 0 ? 0.32 : 0.22);
    }

    // Tsuke-Daiko Sharp Rim / Ka on beats 2, 4
    if ([4, 12, 20, 28, 36, 44, 52, 60].includes(step)) {
      this.playTaikoRim(time, 0.18);
    }

    // Driving Shamisen / Battle Pluck Arpeggio (Kumoi / In-sen scale)
    // D4: 293.66, Eb4: 311.13, G4: 392.00, A4: 440.00, Bb4: 466.16, D5: 587.33
    const battleRiff = [
      { step: 0, freq: 293.66 }, // D4
      { step: 2, freq: 311.13 }, // Eb4
      { step: 4, freq: 392.00 }, // G4
      { step: 6, freq: 440.00 }, // A4
      { step: 8, freq: 466.16 }, // Bb4
      { step: 10, freq: 440.00 }, // A4
      { step: 12, freq: 392.00 }, // G4
      { step: 14, freq: 311.13 }, // Eb4
      { step: 16, freq: 293.66 }, // D4
      { step: 18, freq: 392.00 }, // G4
      { step: 20, freq: 440.00 }, // A4
      { step: 22, freq: 587.33 }, // D5
      { step: 24, freq: 466.16 }, // Bb4
      { step: 26, freq: 440.00 }, // A4
      { step: 28, freq: 392.00 }, // G4
      { step: 30, freq: 311.13 }, // Eb4
      { step: 32, freq: 392.00 }, // G4
      { step: 34, freq: 440.00 }, // A4
      { step: 36, freq: 466.16 }, // Bb4
      { step: 38, freq: 587.33 }, // D5
      { step: 40, freq: 622.25 }, // Eb5
      { step: 42, freq: 587.33 }, // D5
      { step: 44, freq: 466.16 }, // Bb4
      { step: 46, freq: 440.00 }, // A4
      { step: 48, freq: 587.33 }, // D5
      { step: 50, freq: 466.16 }, // Bb4
      { step: 52, freq: 440.00 }, // A4
      { step: 54, freq: 392.00 }, // G4
      { step: 56, freq: 311.13 }, // Eb4
      { step: 58, freq: 293.66 }, // D4
      { step: 60, freq: 220.00 }, // A3
      { step: 62, freq: 293.66 }  // D4
    ];

    const shamisenNote = battleRiff.find((n) => n.step === step);
    if (shamisenNote) {
      this.playBattleShamisen(shamisenNote.freq, time, 0.16);
    }

    // Tension Bassline on 8th notes (steps 0, 2, 4, 8...)
    if (step % 2 === 0) {
      const bassFreq = step < 32 ? 146.83 : (step < 48 ? 196.00 : 220.00); // D3, G3, A3
      this.playTensionBass(bassFreq, time, 0.15);
    }

    // Hyoshigi (Japanese wooden clappers) accent on measure 4 & 8
    if (step === 30 || step === 62) {
      this.playHyoshigi(time, 0.20);
    }
  }

  playTaikoKick(time, velocity = 0.28) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(148, safeTime);
      osc.frequency.exponentialRampToValueAtTime(36, safeTime + 0.18);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, safeTime);
      filter.frequency.exponentialRampToValueAtTime(70, safeTime + 0.16);

      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.22);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.24);
    } catch {}
  }

  playTaikoRim(time, velocity = 0.16) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1350, safeTime);
      filter.Q.setValueAtTime(3.2, safeTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.045);

      noise.connect(filter).connect(gain).connect(this.masterMusicGain);
      noise.start(safeTime);
      noise.stop(safeTime + 0.05);
    } catch {}
  }

  playBattleShamisen(frequency, time, velocity = 0.15) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(frequency, safeTime);
      osc.frequency.linearRampToValueAtTime(frequency * 0.99, safeTime + 0.02);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 4.2, safeTime);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.5, safeTime + 0.12);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.14);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.16);
    } catch {}
  }

  playTensionBass(frequency, time, velocity = 0.14) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(frequency, safeTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(340, safeTime);

      gain.gain.setValueAtTime(0.0001, safeTime);
      gain.gain.linearRampToValueAtTime(safeVel, safeTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.12);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.13);
    } catch {}
  }

  playHyoshigi(time, velocity = 0.18) {
    const ctx = this.context;
    if (!ctx || !this.masterMusicGain) return;
    const safeTime = Math.max(time, ctx.currentTime + 0.002);
    const safeVel = Math.max(velocity, 0.0001);
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(2350, safeTime);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2350, safeTime);
      filter.Q.setValueAtTime(4.5, safeTime);

      gain.gain.setValueAtTime(safeVel, safeTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, safeTime + 0.05);

      osc.connect(filter).connect(gain).connect(this.masterMusicGain);
      osc.start(safeTime);
      osc.stop(safeTime + 0.06);
    } catch {}
  }

  // --- SOUND EFFECTS (SFX) ---
  play(name) {
    const snap = this.store.snapshot();
    if (snap.settings?.sfxMuted ?? snap.settings?.muted) return;
    this.ensureContext();
    if (!this.context) return;

    try {
      if (this.context.state === "suspended" || this.context.state === "interrupted") {
        this.context.resume().catch(() => {});
      }

      if (name === "punch" || name === "fistPunch") {
        this.playFistPunch();
        return;
      }
      if (name === "counterRub" || name === "rub" || name === "counter") {
        this.playCounterRub();
        return;
      }
      if (name === "qteSuccess" || name === "qteStep") {
        this.playQteSuccess();
        return;
      }
      if (name === "qteWrong") {
        this.playQteWrong();
        return;
      }
      if (name === "qteFail" || name === "qteDefeat") {
        this.playQteFail();
        return;
      }

      if (!NOTES[name]) return;
      let cursor = Math.max(this.context.currentTime, 0) + 0.002;
      NOTES[name].forEach(([frequency, duration]) => {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = name === "danger" || name === "hurt" ? "sawtooth" : "sine";
        oscillator.frequency.setValueAtTime(frequency, cursor);
        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(0.08, cursor + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
        oscillator.connect(gain).connect(this.masterSfxGain || this.context.destination);
        oscillator.start(cursor);
        oscillator.stop(cursor + duration + 0.02);
        cursor += duration;
      });
    } catch {}
  }

  playQteSuccess() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    // High pitched crisp bell
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1174.66, now); // D6
    osc1.frequency.exponentialRampToValueAtTime(1760.00, now + 0.08); // A6
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.006);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc1.connect(gain1).connect(sfxDest);
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Harmonic sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2349.32, now); // D7
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.10, now + 0.004);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc2.connect(gain2).connect(sfxDest);
    osc2.start(now);
    osc2.stop(now + 0.14);
  }

  playQteWrong() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(180, now + 0.04);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.10);
  }

  playQteFail() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    // Deep low monotone boom
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(92, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.35);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.32, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  playFistPunch() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 0.15);

    osc.connect(filter).connect(gain).connect(sfxDest);
    osc.start(now);
    osc.stop(now + 0.2);

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
    noiseGain.gain.setValueAtTime(0.22, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    noise.connect(noiseFilter).connect(noiseGain).connect(sfxDest);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  playCounterRub() {
    const ctx = this.context;
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, 0) + 0.002;
    const sfxDest = this.masterSfxGain || ctx.destination;
    const duration = 0.44;

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
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.linearRampToValueAtTime(1950, now + 0.12);
    filter.frequency.linearRampToValueAtTime(1150, now + 0.22);
    filter.frequency.linearRampToValueAtTime(2150, now + 0.32);
    filter.frequency.linearRampToValueAtTime(950, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.18);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter).connect(gain).connect(sfxDest);
    noise.start(now);
    noise.stop(now + duration + 0.02);

    const tone = ctx.createOscillator();
    const toneGain = ctx.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(420, now);
    tone.frequency.linearRampToValueAtTime(560, now + 0.18);
    tone.frequency.linearRampToValueAtTime(460, now + duration);

    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.045, now + 0.12);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    tone.connect(toneGain).connect(sfxDest);
    tone.start(now);
    tone.stop(now + duration + 0.02);
  }
}

// --- src/js/kernel/protocol.js ---
// src/js/kernel/protocol.js
// Frozen protocol specification for Koraku RPS online/offline kernel.
// Defines Command types, Read-model Event names, payload contracts, error codes, and module paths.

const PROTOCOL_VERSION = "2.0.0";
const CONFIG_VERSION = "2026.09.03";

/**
 * Command Names (Client -> Kernel / Server)
 */
const Commands = Object.freeze({
  // Economy & Inventory
  BUY_ITEM: "buyItem",
  BUY_EQUIPMENT: "buyEquipment",
  EQUIP_ITEM: "equipItem",
  UNEQUIP_ITEM: "unequipItem",
  ALLOCATE_STAT: "allocateStat",
  ALLOCATE_SKILL: "allocateSkill",

  // Battle Lifecycle & Actions
  BATTLE_START: "battle.start",
  BATTLE_SELECT_HAND: "battle.selectHand",
  BATTLE_SELECT_TARGET: "battle.selectTarget",
  BATTLE_USE_MORPH: "battle.useMorph",
  BATTLE_USE_ITEM: "battle.useItem",
  BATTLE_INPUT_QTE: "battle.inputQte",
  BATTLE_PAUSE: "battle.pause",
  BATTLE_RESUME: "battle.resume",
  BATTLE_ABANDON: "battle.abandon",

  // Auto-battle & Post-battle
  AUTO_BATTLE_START: "autoBattle.start",
  AUTO_BATTLE_STOP: "autoBattle.stop",
  POST_BATTLE_REQUEST_SWIMSUIT: "postBattle.requestSwimsuit",
  POST_BATTLE_START_WATERMELON: "postBattle.startWatermelon",
  POST_BATTLE_STRIKE_WATERMELON: "postBattle.strikeWatermelon",

  // Account & Data Governance
  ACCOUNT_EXPORT_JSON: "account.exportJson",
  ACCOUNT_DELETE: "account.delete",
  ACCOUNT_ISSUE_TRANSFER_CODE: "account.issueTransferCode",
  ACCOUNT_CLAIM_TRANSFER_CODE: "account.claimTransferCode",

  // Developer & Cheat (Entitlement Gated)
  CHEAT_SET_STATS: "cheat.setStats",
  CHEAT_UNLOCK_ALL: "cheat.unlockAll",
  CHEAT_ADD_COINS: "cheat.addCoins"
});

/**
 * Event Names (Kernel / Server -> Client Read Model)
 */
const Events = Object.freeze({
  // Store & Progress
  STORE_CHANGED: "store:changed",

  // Battle Read Model
  BATTLE_STATE: "battle:state",
  BATTLE_EFFECT: "battle:effect",
  BATTLE_DAMAGE_LOGGED: "battle:damage-logged",
  BATTLE_ENDED: "battle:ended",

  // QTE & Timing
  QTE_UPDATE: "qte:update",

  // Post-battle & Minigames
  POSTBATTLE_STATE: "postbattle:state",
  POSTBATTLE_AUTO_WATERMELON: "postbattle:auto-watermelon",

  // Auto-battle Stream
  AUTOBATTLE_STREAM_CHUNK: "auto-battle:stream-chunk",
  AUTOBATTLE_ROUND_COMPLETED: "auto-battle:round-completed",
  AUTOBATTLE_SUMMARY: "auto-battle:summary",

  // Localized UI Feeds (Payload: { key, params })
  DIALOGUE: "dialogue",
  TOAST: "toast",

  // Connection & Transport Layer
  CONNECTION_STATE: "connection:state",
  COMMAND_ACK: "command:ack",
  COMMAND_REJECTED: "command:rejected"
});

/**
 * Connection States
 */
const ConnectionStates = Object.freeze({
  OFFLINE: "offline",
  CONNECTING: "connecting",
  ONLINE: "online",
  RECONNECTING: "reconnecting",
  DISCONNECTED: "disconnected"
});

/**
 * Standard Error Codes
 */
const ErrorCodes = Object.freeze({
  UNAUTHORIZED_CHEAT: "UNAUTHORIZED_CHEAT",
  BATTLE_IN_PROGRESS_LOCKED: "BATTLE_IN_PROGRESS_LOCKED",
  INVALID_PHASE_PAUSE: "INVALID_PHASE_PAUSE",
  PAUSE_LIMIT_REACHED: "PAUSE_LIMIT_REACHED",
  INVALID_TRANSFER_CODE: "INVALID_TRANSFER_CODE",
  SECRET_COMMITMENT_EXPIRED: "SECRET_COMMITMENT_EXPIRED",
  TIMING_AUDIT_FAILED: "TIMING_AUDIT_FAILED",
  INVALID_SCHEMA: "INVALID_SCHEMA",
  RATE_LIMITED: "RATE_LIMITED",
  VERSION_MISMATCH: "VERSION_MISMATCH",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR"
});

/**
 * Create a standard Command Envelope
 * @param {string} command - Command name from Commands
 * @param {object} payload - Command payload
 * @param {object} [options] - Additional metadata
 * @returns {object} Command envelope
 */
function createCommandEnvelope(command, payload = {}, options = {}) {
  return {
    cmdId: options.cmdId || `cmd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    command,
    payload,
    clientTime: options.clientTime || Date.now(),
    configVersion: CONFIG_VERSION,
    token: options.token || null
  };
}

/**
 * Module bundle registration paths in strict dependency order
 */
const NEW_KERNEL_MODULE_PATHS = Object.freeze([
  "src/js/kernel/protocol.js",
  "src/js/kernel/GameClient.js",
  "src/js/kernel/LocalGameClient.js",
  "src/js/net/RemoteGameClient.js"
]);

// --- src/js/kernel/kernelFactory.js ---
// src/js/kernel/kernelFactory.js
// Factory function for creating in-memory Koraku RPS kernel instance.


/**
 * Create a new headless / server-ready or offline game kernel
 * @param {object} [options={}]
 * @param {object} [options.persistence] - Persistence adapter
 * @param {Function} [options.random] - RNG function () => number
 * @param {string} [options.locale] - Locale code
 * @param {Function} [options.now] - Clock function () => number
 * @param {EventBus} [options.bus] - Optional shared EventBus
 * @returns {object} Kernel instance
 */
function createKernel(options = {}) {
  const now = options.now || (() => Date.now());
  const random = options.random || (() => Math.random());
  const bus = options.bus || new EventBus();
  const persistence = options.persistence || new Persistence();
  const store = new GameStore(bus, persistence, { now });
  const battle = new BattleSystem(bus, store, random, now);
  const postBattle = new PostBattleSystem(bus, store, random, now);

  bus.on("battle:ended", (result) => postBattle.open(result));

  /**
   * Execute an intent command envelope
   * @param {object} envelope - Command envelope
   * @returns {object} Command ACK / result
   */
  function executeCommand(envelope = {}) {
    const { cmdId, command, payload = {} } = envelope;
    if (!command) {
      return {
        cmdId: cmdId || null,
        ack: false,
        errorCode: ErrorCodes.INVALID_SCHEMA,
        key: "command.missingCommand",
        message: "缺少 command 欄位。"
      };
    }

    let result = null;

    switch (command) {
      case Commands.BUY_ITEM: {
        const itemKey = payload.itemId || payload.itemKey || payload.id;
        result = store.buyItem(itemKey);
        break;
      }

      case Commands.BUY_EQUIPMENT: {
        const equipKey = payload.itemId || payload.typeId || payload.equipId || payload.id;
        result = store.buyEquipment(equipKey);
        break;
      }

      case Commands.EQUIP_ITEM: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止更換裝備。"
          };
        }
        const itemTarget = payload.itemId || payload.uid || payload.typeId || payload.equipId;
        const slotTarget = payload.slot || payload.targetSlot || payload.slotKey;
        result = store.equipItem(itemTarget, slotTarget);
        break;
      }

      case Commands.UNEQUIP_ITEM: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止更換裝備。"
          };
        }
        const slotKey = payload.slot || payload.slotKey;
        result = store.unequipItem(slotKey);
        break;
      }

      case Commands.ALLOCATE_STAT: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止分配屬性點數。"
          };
        }
        const stat = payload.stat || payload.statKey;
        result = store.allocateStat(stat);
        break;
      }

      case Commands.ALLOCATE_SKILL: {
        if (battle.snapshot()?.active) {
          return {
            cmdId,
            ack: false,
            errorCode: ErrorCodes.BATTLE_IN_PROGRESS_LOCKED,
            key: "battle.lockedDuringBattle",
            message: "戰鬥進行中，禁止分配技能點數。"
          };
        }
        const skillKey = payload.skillId || payload.skill || payload.skillKey;
        result = store.allocateSkill(skillKey);
        break;
      }

      case Commands.BATTLE_START:
        result = battle.start(payload.stageId, payload.options);
        break;

      case Commands.BATTLE_SELECT_HAND:
        if (payload.hand2 && !payload.slot) {
          battle.selectHand(payload.hand, "left", payload.clientTime);
          result = battle.selectHand(payload.hand2, "right", payload.clientTime);
        } else {
          result = battle.selectHand(payload.hand, payload.slot || null, payload.clientTime);
        }
        break;

      case Commands.BATTLE_SELECT_TARGET:
        result = battle.selectTarget(payload.target);
        break;

      case Commands.BATTLE_USE_MORPH:
        result = battle.useMorph(payload.targetHand);
        break;

      case Commands.BATTLE_USE_ITEM: {
        const itemKey = payload.itemId || payload.itemKey;
        result = battle.useItem(itemKey);
        break;
      }

      case Commands.BATTLE_INPUT_QTE:
        result = battle.inputQte(payload.input || payload.key || payload.direction);
        break;

      case Commands.BATTLE_PAUSE:
        result = battle.pause();
        break;

      case Commands.BATTLE_RESUME:
        result = battle.resume();
        break;

      case Commands.BATTLE_ABANDON:
        result = battle.abandon();
        break;

      case Commands.AUTO_BATTLE_START:
        if (typeof battle.startAutoBattle === "function") {
          result = battle.startAutoBattle(payload.stageId, payload.rounds);
        } else {
          result = { ok: true };
        }
        break;

      case Commands.AUTO_BATTLE_STOP:
        if (typeof battle.stopAutoBattle === "function") {
          result = battle.stopAutoBattle();
        } else {
          result = { ok: true };
        }
        break;

      case Commands.POST_BATTLE_REQUEST_SWIMSUIT:
        result = postBattle.requestSwimsuit();
        break;

      case Commands.POST_BATTLE_START_WATERMELON:
        if (postBattle.autoWatermelonState?.active || payload.auto) {
          result = postBattle.startAutoWatermelonRound();
        } else {
          result = postBattle.startWatermelon();
        }
        break;

      case Commands.POST_BATTLE_STRIKE_WATERMELON:
        if (postBattle.autoWatermelonState?.active) {
          result = postBattle.autoWatermelonStrike(payload.declaredAt || payload.timestamp);
        } else {
          result = postBattle.strike(payload.strikeIndex);
        }
        break;

      case Commands.ACCOUNT_EXPORT_JSON:
        result = {
          ok: true,
          data: {
            version: store.state.version,
            exportedAt: now(),
            configVersion: CONFIG_VERSION,
            profile: store.state.profile,
            coins: store.state.coins,
            inventory: store.state.inventory,
            equipment: store.state.equipment,
            inventoryEquipment: store.state.inventoryEquipment,
            records: store.state.records,
            ledger: store.state.ledger || []
          }
        };
        break;

      case Commands.ACCOUNT_DELETE:
        store.reset();
        result = { ok: true, key: "account.resetDone", message: "帳號資料已重置。" };
        break;

      case Commands.ACCOUNT_ISSUE_TRANSFER_CODE: {
        const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
        result = {
          ok: true,
          code: `KRK_${codeSuffix}`,
          expiresAt: now() + 15 * 60 * 1000
        };
        break;
      }

      case Commands.ACCOUNT_CLAIM_TRANSFER_CODE:
        if (payload.code && payload.code.startsWith("KORAKU1_")) {
          result = store.importSaveCode(payload.code);
        } else {
          result = { ok: true, key: "account.transferClaimed", message: "轉移碼兌換完成。" };
        }
        break;

      case Commands.CHEAT_SET_STATS:
        result = store.cheatSetValues(payload);
        break;

      case Commands.CHEAT_UNLOCK_ALL:
        result = payload?.gallery ? store.cheatUnlockGallery() : store.cheatUnlockAll();
        break;

      case Commands.CHEAT_ADD_COINS: {
        const amount = Number(payload.amount ?? payload.coins ?? 1000);
        result = store.cheatSetValues({ coins: (store.state.coins || 0) + amount });
        break;
      }

      default:
        return {
          cmdId,
          ack: false,
          errorCode: ErrorCodes.NOT_FOUND,
          key: "command.unknownCommand",
          params: { command },
          message: `未定義之指令: ${command}`
        };
    }

    return {
      cmdId,
      ack: result?.ok !== false,
      result,
      state: store.snapshot()
    };
  }

  function getState() {
    return store.snapshot();
  }

  function destroy() {
    battle.destroy?.();
    postBattle.destroy?.();
  }

  return {
    bus,
    store,
    battle,
    postBattle,
    persistence,
    executeCommand,
    getState,
    destroy
  };
}

createKernel;

// --- src/js/kernel/GameClient.js ---
// src/js/kernel/GameClient.js
// Abstract interface for Koraku RPS clients (LocalGameClient and RemoteGameClient).


/**
 * @interface GameClient
 */
class GameClient {
  constructor() {
    if (new.target === GameClient) {
      throw new TypeError("Cannot instantiate abstract class GameClient directly.");
    }
    this._connectionState = ConnectionStates.OFFLINE;
    this._eventListeners = new Map();
  }

  /**
   * Current connection state
   * @returns {string} One of ConnectionStates
   */
  get connectionState() {
    return this._connectionState;
  }

  /**
   * Current connection state method alias
   * @returns {string} One of ConnectionStates
   */
  getConnectionState() {
    return this._connectionState;
  }

  /**
   * Initialize client (connects ws or bootstraps local kernel)
   * @returns {Promise<void>}
   */
  async init() {
    throw new Error("Abstract method init() must be implemented.");
  }

  /**
   * Send an intent command to the kernel / server
   * @param {string} command - Command name from Commands
   * @param {object} [payload={}] - Command parameters
   * @returns {Promise<object>} Command ACK / outcome promise
   */
  async send(command, payload = {}) {
    throw new Error("Abstract method send() must be implemented.");
  }

  /**
   * Subscribe to read-model events
   * @param {string} event - Event name from Events
   * @param {Function} handler - Callback function
   * @returns {Function} Unsubscribe function
   */
  on(event, handler) {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    this._eventListeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  /**
   * Unsubscribe from read-model events
   * @param {string} event - Event name
   * @param {Function} handler - Callback function
   */
  off(event, handler) {
    const set = this._eventListeners.get(event);
    if (set) {
      set.delete(handler);
      if (set.size === 0) {
        this._eventListeners.delete(event);
      }
    }
  }

  /**
   * Emit an event internally to subscribers
   * @protected
   * @param {string} event - Event name
   * @param {any} data - Event data
   */
  _emit(event, data) {
    const set = this._eventListeners.get(event);
    if (set) {
      for (const handler of set) {
        try {
          handler(data);
        } catch (err) {
          console.error(`[GameClient] Error in event handler for ${event}:`, err);
        }
      }
    }
  }

  /**
   * Get current read-only store snapshot
   * @returns {object} Read-only state
   */
  getState() {
    throw new Error("Abstract method getState() must be implemented.");
  }

  /**
   * Get smoothed RTT latency in milliseconds
   * @returns {number}
   */
  getRTT() {
    return 0;
  }

  /**
   * Check if client possesses dev / cheat entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return false;
  }

  /**
   * Dispose / disconnect client
   * @returns {Promise<void>|void}
   */
  destroy() {
    this._eventListeners.clear();
  }
}

GameClient;

// --- src/js/kernel/LocalGameClient.js ---
// src/js/kernel/LocalGameClient.js
// Local in-process GameClient implementation running headless kernel and local storage.


class LocalGameClient extends GameClient {
  constructor(options = {}) {
    super();
    this._connectionState = ConnectionStates.OFFLINE;
    this.options = options;
    this.kernel = null;
    this._busForwarders = [];
  }

  /**
   * Initialize local kernel and forward events to subscribers
   * @returns {Promise<LocalGameClient>|LocalGameClient}
   */
  async init() {
    if (!this.kernel) {
      this.kernel = createKernel(this.options);
    }
    this._connectionState = ConnectionStates.OFFLINE;

    // Forward read-model events from kernel bus to client listeners
    const eventNames = Object.values(Events);
    for (const evt of eventNames) {
      const forwarder = (data) => {
        this._emit(evt, data);
      };
      this.kernel.bus.on(evt, forwarder);
      this._busForwarders.push({ evt, forwarder });
    }

    this._emit(Events.CONNECTION_STATE, { state: ConnectionStates.OFFLINE });
    return this;
  }

  /**
   * Send intent command to kernel
   * @param {string} command - Command name
   * @param {object} [payload={}] - Command payload
   * @returns {Promise<object>} Command ACK outcome
   */
  async send(command, payload = {}) {
    if (!this.kernel) {
      await this.init();
    }
    const envelope = createCommandEnvelope(command, payload);
    const outcome = this.kernel.executeCommand(envelope);
    this._emit(Events.COMMAND_ACK, outcome);
    return outcome;
  }

  /**
   * Get read-only snapshot
   * @returns {object}
   */
  getState() {
    return this.kernel ? this.kernel.getState() : {};
  }

  /**
   * Local sandbox always has developer entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return true;
  }

  // Accessors for UI/subsystem backward compatibility
  get store() {
    return this.kernel?.store;
  }

  get battle() {
    return this.kernel?.battle;
  }

  get postBattle() {
    return this.kernel?.postBattle;
  }

  get bus() {
    return this.kernel?.bus;
  }

  /**
   * Clean up listeners and kernel resources
   */
  destroy() {
    super.destroy();
    if (this.kernel && this._busForwarders.length > 0) {
      for (const { evt, forwarder } of this._busForwarders) {
        this.kernel.bus.off(evt, forwarder);
      }
      this._busForwarders = [];
    }
    this.kernel?.destroy();
    this.kernel = null;
  }
}

LocalGameClient;

// --- src/js/net/RemoteGameClient.js ---
// src/js/net/RemoteGameClient.js
// Authoritative WebSocket network client for Koraku RPS.
// Implements connection management, heartbeat, clock sync, RTT estimation,
// version handshake validation, idempotent command ACK tracking, and EventBus forwarding.


const ONLINE_STORAGE_PREFIX = "koraku-rps-online-";
const ONLINE_TOKEN_KEY = "koraku-rps-online-token";
const ONLINE_STATE_CACHE_KEY = "koraku-rps-online-state";

/**
 * Determine default WebSocket URL based on current runtime environment
 * @param {string} [customUrl]
 * @returns {string|null}
 */
function resolveWebSocketUrl(customUrl) {
  if (customUrl) return customUrl;
  if (typeof window !== "undefined") {
    if (window.KORAKU_SERVER_URL) return window.KORAKU_SERVER_URL;
    if (window.__KORAKU_CONFIG__?.serverUrl) return window.__KORAKU_CONFIG__.serverUrl;
  }
  return null;
}

/**
 * RemoteGameClient handles WebSocket transport, session management,
 * heartbeat ping/pong, RTT/clock offset calculation, command ACK lifecycle,
 * and server-pushed read model event propagation.
 */
class RemoteGameClient extends GameClient {
  /**
   * @param {object} [options={}]
   * @param {string} [options.url] - WebSocket server endpoint
   * @param {string} [options.token] - Session / device auth token
   * @param {string} [options.deviceId] - Anonymous device identifier
   * @param {object} [options.eventBus] - Local EventBus to forward read model events
   * @param {boolean} [options.autoReconnect=true] - Whether to automatically reconnect on drop
   * @param {number} [options.reconnectInitialDelay=1000] - Base delay (ms) for exponential backoff
   * @param {number} [options.reconnectMaxDelay=30000] - Max delay (ms) for reconnection
   * @param {number} [options.reconnectBackoffFactor=1.5] - Exponential multiplier
   * @param {boolean} [options.reconnectJitter=true] - Add random jitter to reconnect delay
   * @param {number} [options.maxReconnectAttempts=Infinity] - Max reconnect attempts before giving up
   * @param {number} [options.pingInterval=10000] - Heartbeat ping interval (ms)
   * @param {number} [options.pingTimeout=5000] - Timeout waiting for pong (ms)
   * @param {number} [options.commandTimeout=8000] - Timeout waiting for command ACK (ms)
   * @param {number} [options.commandMaxRetries=2] - Number of retry attempts for timed-out commands
   * @param {number} [options.handshakeTimeout=5000] - Timeout waiting for handshake ack (ms)
   * @param {Function} [options.now] - Timestamp provider function (ms)
   * @param {Function} [options.WebSocketClass] - WebSocket constructor (for testing / custom WS)
   */
  constructor(options = {}) {
    super();

    this.options = {
      url: resolveWebSocketUrl(options.url),
      token: options.token || null,
      deviceId: options.deviceId || null,
      eventBus: options.eventBus || null,
      autoReconnect: options.autoReconnect !== false,
      reconnectInitialDelay: options.reconnectInitialDelay || 1000,
      reconnectMaxDelay: options.reconnectMaxDelay || 30000,
      reconnectBackoffFactor: options.reconnectBackoffFactor || 1.5,
      reconnectJitter: options.reconnectJitter !== false,
      maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
      pingInterval: options.pingInterval || 10000,
      pingTimeout: options.pingTimeout || 5000,
      commandTimeout: options.commandTimeout || 8000,
      commandMaxRetries: options.commandMaxRetries ?? 2,
      handshakeTimeout: options.handshakeTimeout || 5000,
      now: options.now || (() => Date.now()),
      WebSocketClass: options.WebSocketClass || (typeof WebSocket !== "undefined" ? WebSocket : null),
      ...options
    };

    this._ws = null;
    this._connectionState = ConnectionStates.OFFLINE;
    this._storage = options.storage || (typeof window !== "undefined" ? window.localStorage : null);
    this._token = this.options.token || (this._storage ? this._storage.getItem(ONLINE_TOKEN_KEY) : null) || null;
    this._deviceId = this.options.deviceId;
    this._eventBus = this.options.eventBus || new EventBus();
    this._devEntitlement = Boolean(options.devEntitlement);

    // State snapshot cache
    this._state = {};
    if (this._storage) {
      try {
        const raw = this._storage.getItem(ONLINE_STATE_CACHE_KEY);
        if (raw) this._state = JSON.parse(raw);
      } catch (_) {}
    }
    if (!this._state.settings) {
      this._state.settings = {};
    }
    if (this._storage) {
      const savedMusic = this._storage.getItem("koraku_music_muted");
      if (savedMusic !== null) {
        this._state.settings.musicMuted = savedMusic === "true";
      }
      const savedSfx = this._storage.getItem("koraku_sfx_muted");
      if (savedSfx !== null) {
        this._state.settings.sfxMuted = savedSfx === "true";
        this._state.settings.muted = savedSfx === "true";
      }
    }
    this._storeProxy = null;
    this._battleProxy = null;
    this._postBattleProxy = null;

    // Reconnection tracking
    this._reconnectAttempts = 0;
    this._reconnectTimer = null;
    this._isExplicitlyClosed = false;
    this._handshakeTimer = null;
    this._initPromiseResolver = null;
    this._initPromiseRejecter = null;

    // Heartbeat tracking
    this._pingTimer = null;
    this._pongTimeoutTimer = null;
    this._lastPingTimestamp = 0;

    // Clock sync & RTT estimation
    this._clockOffset = 0; // serverTime - clientTime
    this._rtt = 0; // smoothed RTT in ms
    this._rttSamples = [];

    // Server configuration from handshake
    this._serverConfig = null;

    // Commands & ACK tracking
    this._pendingCommands = new Map(); // cmdId -> { envelope, resolve, reject, timer, retries, sentAt }
    this._commandQueue = []; // Array of cmdIds waiting to be dispatched when connection is ONLINE
  }

  get bus() {
    return this._eventBus;
  }

  get store() {
    if (!this._storeProxy) {
      const client = this;
      this._storeProxy = {
        snapshot: () => {
          const s = client.getState() || {};
          const profile = s.profile || {};
          const equip = s.equipment || {};
          return {
            ...s,
            playerStats: computePlayerStats(profile, equip)
          };
        },
        get state() {
          return this.snapshot();
        },
        getTheoreticalDPS: () => {
          const snap = client.store.snapshot();
          const stats = snap.playerStats || {};
          const damage = stats.damage || 10;
          return Math.round(damage * 1.5);
        },
        toggleMusicMuted: () => {
          if (!client._state) client._state = {};
          if (!client._state.settings) client._state.settings = {};
          const curr = Boolean(client._state.settings.musicMuted);
          const next = !curr;
          client._state.settings.musicMuted = next;
          try {
            if (client._storage) {
              client._storage.setItem("koraku_music_muted", String(next));
              client._storage.setItem(ONLINE_STATE_CACHE_KEY, JSON.stringify(client._state));
            }
          } catch (_) {}
          const snap = client.store.snapshot();
          if (client._eventBus && typeof client._eventBus.emit === "function") {
            client._eventBus.emit("store:changed", { reason: "toggle-music-muted", state: snap });
          }
          return next;
        },
        toggleSfxMuted: () => {
          if (!client._state) client._state = {};
          if (!client._state.settings) client._state.settings = {};
          const curr = Boolean(client._state.settings.sfxMuted);
          const next = !curr;
          client._state.settings.sfxMuted = next;
          client._state.settings.muted = next;
          try {
            if (client._storage) {
              client._storage.setItem("koraku_sfx_muted", String(next));
              client._storage.setItem(ONLINE_STATE_CACHE_KEY, JSON.stringify(client._state));
            }
          } catch (_) {}
          const snap = client.store.snapshot();
          if (client._eventBus && typeof client._eventBus.emit === "function") {
            client._eventBus.emit("store:changed", { reason: "toggle-sfx-muted", state: snap });
          }
          return next;
        }
      };
    }
    return this._storeProxy;
  }

  get battle() {
    if (!this._battleProxy) {
      const client = this;
      this._battleProxy = {
        get state() {
          return client._state?.battle || null;
        },
        get autoBattle() {
          return client._state?.battle?.autoBattle || { active: false, isPaused: false };
        },
        isBattleActive: () => {
          const b = client._state?.battle;
          return Boolean(b && b.active && b.phase !== "ended" && b.phase !== "abandoned");
        },
        snapshot: () => {
          return client._state?.battle || null;
        },
        start: (stageId, options) => {
          return client.send(Commands.BATTLE_START, { stageId, options });
        },
        selectHand: (hand, slot = null, declaredAt = Date.now()) => {
          return client.send(Commands.BATTLE_SELECT_HAND, { hand, slot, declaredAt });
        },
        selectTarget: (target) => {
          return client.send(Commands.BATTLE_SELECT_TARGET, { target });
        },
        abandon: () => {
          return client.send(Commands.BATTLE_ABANDON);
        },
        useItem: (itemId) => {
          return client.send(Commands.BATTLE_USE_ITEM, { itemId });
        },
        pause: () => {
          return client.send(Commands.BATTLE_PAUSE);
        },
        resume: () => {
          return client.send(Commands.BATTLE_RESUME);
        },
        stopAutoBattle: () => {
          return client.send(Commands.AUTO_BATTLE_STOP);
        },
        startAutoBattle: (stageId, rounds) => {
          return client.send(Commands.AUTO_BATTLE_START, { stageId, rounds });
        },
        end: (victory) => {
          if (client._eventBus) {
            client._eventBus.emit(Events.BATTLE_ENDED, {
              won: Boolean(victory),
              stageId: client._state?.battle?.stageId || 1
            });
          }
        }
      };
    }
    return this._battleProxy;
  }

  get postBattle() {
    if (!this._postBattleProxy) {
      const client = this;
      this._postBattleProxy = {
        open: (result) => {
          if (!result) return;
          if (result.isAuto) {
            if (result.won) {
              if (client._state?.records) client._state.records.unlockedSwimsuit = true;
            }
            client.postBattle.emitAutoWatermelon();
            return;
          }
          const appearance = result.won
            ? (result.stage?.final ? ASSETS.final : ASSETS.default)
            : ASSETS.defeat;
          const postState = {
            ...result,
            scene: result.won ? "victory" : "defeat",
            appearance,
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
          client._postBattleState = postState;
          if (client._eventBus) {
            client._eventBus.emit(Events.POSTBATTLE_STATE, postState);
            client._eventBus.emit(Events.DIALOGUE_LINE, {
              key: result.won ? "dialogue.postBattleWin" : "dialogue.postBattleLoss"
            });
          }
        },
        get state() {
          return client._postBattleState || null;
        },
        snapshot: () => {
          return client._postBattleState || null;
        },
        getMarkerPosition: () => {
          const state = client._postBattleState;
          if (!state || state.scene !== "watermelonAim" || !state.strikeStartedAt) return 0;
          const currentNow = client.getServerTime();
          const dur = state.strikeDuration || 1800;
          const elapsed = ((currentNow - state.strikeStartedAt) % dur + dur) % dur;
          const progress = elapsed / dur;
          return progress <= 0.5 ? progress * 2 : (1 - progress) * 2;
        },
        getAutoMarkerPosition: () => {
          const autoState = client._autoWatermelonState || client._postBattleState?.autoWatermelonState;
          if (!autoState || autoState.scene !== "watermelonAim" || !autoState.strikeStartedAt) return 0.5;
          const currentNow = client.getServerTime();
          const dur = autoState.strikeDuration || 1800;
          const elapsed = ((currentNow - autoState.strikeStartedAt) % dur + dur) % dur;
          const progress = elapsed / dur;
          return progress <= 0.5 ? progress * 2 : (1 - progress) * 2;
        },
        getWatermelonStock: () => {
          return client._state?.records?.watermelonStock || 0;
        },
        closeAutoWatermelon: () => {},
        emitAutoWatermelon: () => {
          if (client._eventBus) {
            client._eventBus.emit(Events.POSTBATTLE_AUTO_WATERMELON, {
              stock: client.postBattle.getWatermelonStock()
            });
          }
        },
        requestSwimsuit: () => {
          return client.send(Commands.POST_BATTLE_REQUEST_SWIMSUIT);
        },
        startWatermelon: () => {
          return client.send(Commands.POST_BATTLE_START_WATERMELON);
        },
        strike: (time) => {
          return client.send(Commands.POST_BATTLE_STRIKE_WATERMELON, { declaredAt: time });
        }
      };
    }
    return this._postBattleProxy;
  }

  /**
   * Current connection state
   * @returns {string}
   */
  get connectionState() {
    return this._connectionState;
  }

  /**
   * Cached state snapshot
   * @returns {object}
   */
  getState() {
    return this._state;
  }

  /**
   * Check if client possesses dev entitlement
   * @returns {boolean}
   */
  hasDevEntitlement() {
    return Boolean(this._devEntitlement);
  }

  /**
   * Set dev entitlement status
   * @param {boolean} value
   */
  setDevEntitlement(value) {
    this._devEntitlement = Boolean(value);
  }

  /**
   * Resolve HTTP base URL corresponding to server endpoint
   * @private
   * @returns {string}
   */
  _resolveHttpBaseUrl() {
    if (typeof window !== "undefined" && window.__KORAKU_CONFIG__?.httpUrl) {
      return window.__KORAKU_CONFIG__.httpUrl;
    }
    const wsUrl = this.options.url;
    if (!wsUrl) {
      if (typeof location !== "undefined" && location.origin && location.origin !== "null") {
        return location.origin;
      }
      return "http://127.0.0.1:8080";
    }
    try {
      const parsed = new URL(wsUrl);
      if (parsed.protocol === "ws:") {
        parsed.protocol = "http:";
      } else if (parsed.protocol === "wss:") {
        parsed.protocol = "https:";
      }
      return `${parsed.protocol}//${parsed.host}`;
    } catch {
      return wsUrl.replace(/^ws:\/\//i, "http://").replace(/^wss:\/\//i, "https://");
    }
  }

  /**
   * Request server elevation to Dev Entitlement using admin key
   * @param {string} pass - Admin / Dev secret key
   * @returns {Promise<boolean>}
   */
  async verifyDevEntitlement(pass) {
    const httpBase = this._resolveHttpBaseUrl();
    const token = this._token;
    if (!token) {
      console.warn("[RemoteGameClient] Cannot elevate without a valid session token");
      return false;
    }

    try {
      const fetchFn = typeof fetch !== "undefined" ? fetch : (globalThis.fetch || null);
      if (!fetchFn) {
        console.warn("[RemoteGameClient] Fetch API not available for dev entitlement elevation");
        return false;
      }

      const res = await fetchFn(`${httpBase}/auth/elevate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          devAdminKey: pass
        })
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      if (data && data.success && data.token) {
        this._token = data.token;
        this._devEntitlement = true;
        if (this._storage) {
          try {
            this._storage.setItem(ONLINE_TOKEN_KEY, data.token);
          } catch (_) {}
        }
        this._emit(Events.CONNECTION_STATE, {
          state: this._connectionState,
          token: this._token,
          devEntitlement: true
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("[RemoteGameClient] Error during dev entitlement verification:", err);
      return false;
    }
  }

  /**
   * Revoke dev entitlement and demote back to regular anonymous account
   * @returns {Promise<boolean>}
   */
  async revokeDevEntitlement() {
    const httpBase = this._resolveHttpBaseUrl();
    const token = this._token;
    if (!token) {
      this._devEntitlement = false;
      return true;
    }

    try {
      const fetchFn = typeof fetch !== "undefined" ? fetch : (globalThis.fetch || null);
      if (fetchFn) {
        const res = await fetchFn(`${httpBase}/auth/demote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.token) {
            this._token = data.token;
          }
        }
      }
    } catch (err) {
      console.warn("[RemoteGameClient] Remote demote failed, falling back to local revocation:", err);
    }

    this._devEntitlement = false;
    if (this._storage) {
      try {
        if (this._token) {
          this._storage.setItem(ONLINE_TOKEN_KEY, this._token);
        } else {
          this._storage.removeItem(ONLINE_TOKEN_KEY);
        }
      } catch (_) {}
    }

    this._emit(Events.CONNECTION_STATE, {
      state: this._connectionState,
      token: this._token,
      devEntitlement: false
    });
    return true;
  }

  /**
   * Get current auth token
   * @returns {string|null}
   */
  getToken() {
    return this._token;
  }

  /**
   * Set auth token
   * @param {string|null} token
   */
  setToken(token) {
    this._token = token;
  }

  /**
   * Get estimated server timestamp in ms
   * @returns {number}
   */
  getServerTime() {
    return Math.round(this._now() + this._clockOffset);
  }

  /**
   * Get estimated smoothed round-trip time in ms
   * @returns {number}
   */
  getRTT() {
    return Math.round(this._rtt);
  }

  /**
   * Get estimated clock offset (serverTime - clientTime) in ms
   * @returns {number}
   */
  getClockOffset() {
    return Math.round(this._clockOffset);
  }

  /**
   * Internal timestamp provider
   * @private
   * @returns {number}
   */
  _now() {
    return typeof this.options.now === "function" ? this.options.now() : Date.now();
  }

  /**
   * Initialize client and connect to server
   * @returns {Promise<RemoteGameClient>}
   */
  async init() {
    if (this._connectionState === ConnectionStates.ONLINE) {
      return this;
    }

    this._isExplicitlyClosed = false;

    return new Promise((resolve, reject) => {
      this._initPromiseResolver = resolve;
      this._initPromiseRejecter = reject;
      this._connect();
    });
  }

  /**
   * Resolve WebSocket URL with auth token attached as query param if present
   * @private
   * @returns {string|null}
   */
  _resolveConnectionUrl() {
    const rawUrl = this.options.url;
    if (!rawUrl) return null;
    if (!this._token) return rawUrl;
    try {
      const parsed = new URL(rawUrl);
      if (!parsed.searchParams.has("token")) {
        parsed.searchParams.set("token", this._token);
      }
      return parsed.toString();
    } catch {
      const separator = rawUrl.includes("?") ? "&" : "?";
      if (!rawUrl.includes("token=")) {
        return `${rawUrl}${separator}token=${encodeURIComponent(this._token)}`;
      }
      return rawUrl;
    }
  }

  /**
   * Establish WebSocket connection
   * @private
   */
  _connect() {
    if (this._isExplicitlyClosed) return;

    if (!this.options.url) {
      const err = new Error("No WebSocket URL configured");
      err.code = ErrorCodes.NOT_CONNECTED;
      this._setConnectionState(ConnectionStates.DISCONNECTED, { reason: "NO_SERVER_URL" });
      this._rejectInit(err);
      return;
    }

    const WebSocketClass = this.options.WebSocketClass;
    if (!WebSocketClass) {
      const err = new Error("WebSocket constructor not available in current environment");
      this._rejectInit(err);
      return;
    }

    this._cleanupSocket();

    const targetState = this._reconnectAttempts > 0 ? ConnectionStates.RECONNECTING : ConnectionStates.CONNECTING;
    this._setConnectionState(targetState, { attempt: this._reconnectAttempts });

    try {
      const connectUrl = this._resolveConnectionUrl();
      this._ws = new WebSocketClass(connectUrl);

      this._ws.onopen = () => this._onOpen();
      this._ws.onmessage = (event) => this._onMessage(event);
      this._ws.onerror = (error) => this._onError(error);
      this._ws.onclose = (event) => this._onClose(event);
    } catch (err) {
      this._onError(err);
    }
  }

  /**
   * WebSocket onopen handler: initiate handshake
   * @private
   */
  _onOpen() {
    // Send handshake request
    const handshakePayload = {
      type: "handshake",
      protocolVersion: PROTOCOL_VERSION,
      configVersion: CONFIG_VERSION,
      token: this._token,
      deviceId: this._deviceId,
      clientTime: this._now()
    };

    this._sendRaw(handshakePayload);

    // Start handshake timeout
    if (this._handshakeTimer) clearTimeout(this._handshakeTimer);
    this._handshakeTimer = setTimeout(() => {
      this._onHandshakeTimeout();
    }, this.options.handshakeTimeout);
  }

  /**
   * Handshake timeout handler
   * @private
   */
  _onHandshakeTimeout() {
    this._handshakeTimer = null;
    const err = new Error(`Handshake timed out after ${this.options.handshakeTimeout}ms`);
    if (this._ws) {
      try {
        this._ws.close();
      } catch (_) {}
    }
    this._rejectInit(err);
  }

  /**
   * Process incoming WebSocket message
   * @private
   * @param {MessageEvent|object} event
   */
  _onMessage(event) {
    let msg;
    try {
      const rawData = typeof event.data === "string" ? event.data : (typeof event === "string" ? event : JSON.stringify(event));
      msg = JSON.parse(rawData);
    } catch (err) {
      console.warn("[RemoteGameClient] Failed to parse incoming message JSON:", err, event.data);
      return;
    }

    if (!msg || typeof msg !== "object") return;

    // 1. Handshake response
    if (
      msg.type === "handshake_ack" ||
      msg.type === "handshake" ||
      (msg.event === Events.CONNECTION_STATE && (msg.payload?.state === ConnectionStates.ONLINE || msg.state === ConnectionStates.ONLINE))
    ) {
      this._handleHandshakeAck(msg.payload || msg);
      return;
    }

    // 2. Pong heartbeat response
    if (msg.type === "pong" || msg.event === "pong" || msg.payload?.type === "pong") {
      this._handlePong(msg.payload || msg);
      return;
    }

    // 3. Command ACK response
    if (msg.type === "ack" || msg.type === "command:ack" || (msg.event === Events.COMMAND_ACK) || (msg.cmdId && msg.ack === true)) {
      this._handleCommandAck(msg);
      return;
    }

    // 4. Command Rejected response
    if (msg.type === "reject" || msg.type === "command:rejected" || (msg.event === Events.COMMAND_REJECTED) || (msg.cmdId && msg.ack === false) || (msg.cmdId && msg.error)) {
      this._handleCommandReject(msg);
      return;
    }

    // 5. Server broadcast read model events
    this._handleServerEvent(msg);
  }

  /**
   * Handle handshake acknowledgement
   * @private
   * @param {object} msg
   */
  _handleHandshakeAck(msg) {
    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    // Validate version compatibility
    const serverProtocol = msg.protocolVersion;
    const serverConfig = msg.configVersion;

    const isProtocolMismatch = serverProtocol && serverProtocol !== PROTOCOL_VERSION;
    const isConfigMismatch = serverConfig && serverConfig !== CONFIG_VERSION;
    const isErrorMismatch = msg.code === ErrorCodes.VERSION_MISMATCH || msg.status === "error";

    if (isProtocolMismatch || isConfigMismatch || isErrorMismatch) {
      const mismatchPayload = {
        key: "connection.version_mismatch",
        params: {
          clientProtocol: PROTOCOL_VERSION,
          serverProtocol: serverProtocol || "unknown",
          clientConfig: CONFIG_VERSION,
          serverConfig: serverConfig || "unknown"
        }
      };

      this._emit(Events.TOAST, mismatchPayload);
      if (this._eventBus && typeof this._eventBus.emit === "function") {
        this._eventBus.emit(Events.TOAST, mismatchPayload);
      }

      this._isExplicitlyClosed = true; // Prevent reconnect loop on version mismatch
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        reason: ErrorCodes.VERSION_MISMATCH,
        details: mismatchPayload.params
      });

      if (this._ws) {
        try {
          this._ws.close(4002, ErrorCodes.VERSION_MISMATCH);
        } catch (_) {}
      }

      const err = new Error(`Version mismatch: client [${CONFIG_VERSION}/${PROTOCOL_VERSION}], server [${serverConfig}/${serverProtocol}]`);
      err.code = ErrorCodes.VERSION_MISMATCH;
      this._rejectInit(err);
      return;
    }

    // Handshake successful
    if (msg.token) {
      this._token = msg.token;
      try {
        if (this._storage) this._storage.setItem(ONLINE_TOKEN_KEY, msg.token);
      } catch (_) {}
    }
    if (msg.devEntitlement !== undefined) this._devEntitlement = Boolean(msg.devEntitlement);
    if (msg.serverConfig) this._serverConfig = msg.serverConfig;
    if (msg.state) {
      this._state = msg.state;
      try {
        if (this._storage) this._storage.setItem(ONLINE_STATE_CACHE_KEY, JSON.stringify(msg.state));
      } catch (_) {}
    }

    this._reconnectAttempts = 0;
    this._setConnectionState(ConnectionStates.ONLINE, {
      token: this._token,
      devEntitlement: this._devEntitlement,
      serverConfig: this._serverConfig
    });

    // Start heartbeat
    this._startHeartbeat();

    // Flush pending command queue
    this._flushCommandQueue();

    // Resolve init promise
    this._resolveInit(this);
  }

  /**
   * Handle Pong message for RTT & Clock offset estimation
   * @private
   * @param {object} msg
   */
  _handlePong(msg) {
    if (this._pongTimeoutTimer) {
      clearTimeout(this._pongTimeoutTimer);
      this._pongTimeoutTimer = null;
    }

    const t1 = msg.t1 || msg.clientTime || this._lastPingTimestamp;
    const t4 = this._now();
    const t2 = msg.t2 ?? msg.serverReceiveTime ?? msg.serverTime;
    const t3 = msg.t3 ?? msg.serverTransmitTime ?? msg.serverTime;

    let sampleRTT;
    if (t2 !== undefined && t3 !== undefined && t2 !== null && t3 !== null) {
      sampleRTT = Math.max(0, (t4 - t1) - (t3 - t2));
    } else {
      sampleRTT = Math.max(0, t4 - t1);
    }

    let sampleOffset;
    if (t2 !== undefined && t3 !== undefined && t2 !== null && t3 !== null) {
      sampleOffset = ((t2 - t1) + (t3 - t4)) / 2;
    } else if (msg.serverTime !== undefined && msg.serverTime !== null) {
      sampleOffset = msg.serverTime - (t1 + t4) / 2;
    } else {
      sampleOffset = this._clockOffset;
    }

    // Exponential moving average filter
    if (this._rtt === 0 && this._rttSamples.length === 0) {
      this._rtt = sampleRTT;
      this._clockOffset = sampleOffset;
    } else {
      this._rtt = 0.8 * this._rtt + 0.2 * sampleRTT;
      this._clockOffset = 0.8 * this._clockOffset + 0.2 * sampleOffset;
    }

    this._rttSamples.push({ rtt: sampleRTT, offset: sampleOffset, timestamp: t4 });
    if (this._rttSamples.length > 10) {
      this._rttSamples.shift();
    }

    const rttPayload = {
      rtt: Math.round(this._rtt),
      isHighLatency: this._rtt >= 180,
      clockOffset: Math.round(this._clockOffset)
    };
    this._emit("connection:ping", rttPayload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit("connection:ping", rttPayload);
    }
  }

  /**
   * Get smoothed RTT latency in milliseconds
   * @returns {number}
   */
  getRTT() {
    return Math.round(this._rtt || 0);
  }

  /**
   * Get server configuration received during handshake
   * @returns {object}
   */
  getServerConfig() {
    return this._serverConfig || { battleLockPolicy: "always" };
  }

  /**
   * Handle command ACK
   * @private
   * @param {object} msg
   */
  _handleCommandAck(msg) {
    const cmdId = msg.cmdId || msg.payload?.cmdId;
    if (!cmdId) return;

    const payload = msg.payload !== undefined ? msg.payload : msg;

    // Update state cache if state is embedded in successful ACK or root message
    if (msg.ack !== false && msg.ok !== false && payload?.ack !== false && payload?.ok !== false) {
      const stateObj = msg.state || (payload && payload.state) || (payload && typeof payload === "object" ? payload : null);
      if (stateObj && typeof stateObj === "object") {
        this._mergeState(stateObj);
      }
    }
    if (payload?.token) {
      this._token = payload.token;
      try {
        if (this._storage) this._storage.setItem(ONLINE_TOKEN_KEY, payload.token);
      } catch (_) {}
    }

    const pending = this._pendingCommands.get(cmdId);
    if (pending) {
      if (pending.timer) clearTimeout(pending.timer);
      this._pendingCommands.delete(cmdId);
      pending.resolve(payload);
    }

    // Broadcast ACK event
    this._emit(Events.COMMAND_ACK, payload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit(Events.COMMAND_ACK, payload);
    }
  }

  /**
   * Handle command rejection
   * @private
   * @param {object} msg
   */
  _handleCommandReject(msg) {
    const cmdId = msg.cmdId || msg.payload?.cmdId;
    if (!cmdId) return;

    const code = msg.code || msg.payload?.code || ErrorCodes.INTERNAL_ERROR;
    const reason = msg.error || msg.reason || msg.payload?.error || msg.payload?.message || "Command rejected";
    const payload = msg.payload !== undefined ? msg.payload : msg;

    const pending = this._pendingCommands.get(cmdId);
    if (pending) {
      if (pending.timer) clearTimeout(pending.timer);
      this._pendingCommands.delete(cmdId);
      const err = new Error(reason);
      err.code = code;
      err.payload = payload;
      pending.reject(err);
    }

    // Broadcast rejection event
    this._emit(Events.COMMAND_REJECTED, { cmdId, code, reason, payload });
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      this._eventBus.emit(Events.COMMAND_REJECTED, { cmdId, code, reason, payload });
    }
  }

  /**
   * Safely merge incoming state delta into internal cache
   * @private
   * @param {object} incoming
   */
  _mergeState(incoming) {
    if (!incoming || typeof incoming !== "object") return;

    const source = (incoming.state && typeof incoming.state === "object" && !Array.isArray(incoming.state))
      ? incoming.state
      : incoming;

    const ENVELOPE_METADATA_KEYS = new Set([
      "cmdId", "command", "ack", "ok", "code", "error", "message",
      "serverTime", "clientTime", "token", "type", "event", "status"
    ]);

    const deepMerge = (target, src) => {
      if (!src || typeof src !== "object" || Array.isArray(src)) {
        return src;
      }
      const result = (target && typeof target === "object" && !Array.isArray(target))
        ? { ...target }
        : {};

      for (const [key, val] of Object.entries(src)) {
        if (ENVELOPE_METADATA_KEYS.has(key)) {
          continue;
        }
        if (val === null || val === undefined) {
          result[key] = val;
        } else if (Array.isArray(val)) {
          result[key] = [...val];
        } else if (typeof val === "object") {
          result[key] = deepMerge(result[key], val);
        } else {
          result[key] = val;
        }
      }
      return result;
    };

    const localMusicMuted = this._state?.settings?.musicMuted;
    const localSfxMuted = this._state?.settings?.sfxMuted;

    this._state = deepMerge(this._state || {}, source);

    if (this._state.settings) {
      if (localMusicMuted !== undefined) {
        this._state.settings.musicMuted = localMusicMuted;
      }
      if (localSfxMuted !== undefined) {
        this._state.settings.sfxMuted = localSfxMuted;
        this._state.settings.muted = localSfxMuted;
      }
    }

    try {
      if (this._storage) this._storage.setItem(ONLINE_STATE_CACHE_KEY, JSON.stringify(this._state));
    } catch (_) {}
  }

  /**
   * Handle read model server push events
   * @private
   * @param {object} msg
   */
  _handleServerEvent(msg) {
    const eventName = msg.event || msg.type;
    if (!eventName) return;

    const payload = msg.payload !== undefined ? msg.payload : msg.data !== undefined ? msg.data : msg;

    // Cache state changes
    if (eventName === Events.STORE_CHANGED || eventName === "store:changed") {
      if (payload && typeof payload === "object") {
        this._mergeState(payload);
      }
    } else if (eventName === Events.BATTLE_STATE || eventName === "battle:state") {
      if (payload) {
        this._state.battle = payload;
      }
    } else if (eventName === Events.BATTLE_ENDED || eventName === "battle:ended") {
      if (this._state.battle) {
        delete this._state.battle;
      }
    } else if (eventName === Events.POSTBATTLE_STATE || eventName === "postbattle:state") {
      if (payload) {
        this._postBattleState = payload;
      }
    } else if (eventName === Events.POSTBATTLE_AUTO_WATERMELON || eventName === "postbattle:auto-watermelon") {
      if (payload) {
        this._autoWatermelonState = payload;
      }
    } else if (eventName === Events.CONNECTION_STATE || eventName === "connection:state") {
      if (payload?.reason === "NEW_CONNECTION_ESTABLISHED" || payload?.reason === "KICKED_BY_NEW_CONNECTION") {
        this._isExplicitlyClosed = true;
        this._setConnectionState(ConnectionStates.DISCONNECTED, {
          reason: "KICKED_BY_NEW_CONNECTION",
          message: payload.message || "Another connection for this account was established."
        });
      }
    }

    // Emit internally to GameClient listeners
    this._emit(eventName, payload);

    // Forward to local EventBus
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      try {
        this._eventBus.emit(eventName, payload);
      } catch (err) {
        console.error(`[RemoteGameClient] Error forwarding event ${eventName} to EventBus:`, err);
      }
    }
  }

  /**
   * Send an intent command to the authoritative server
   * @param {string} command - Command name from Commands
   * @param {object} [payload={}] - Command parameters
   * @param {object} [options={}] - Additional command envelope metadata
   * @returns {Promise<object>}
   */
  async send(command, payload = {}, options = {}) {
    const envelope = createCommandEnvelope(command, payload, {
      ...options,
      token: this._token,
      clientTime: this.getServerTime()
    });

    const cmdId = envelope.cmdId;

    return new Promise((resolve, reject) => {
      const entry = {
        envelope,
        resolve,
        reject,
        retries: 0,
        timer: null,
        sentAt: this._now()
      };

      this._pendingCommands.set(cmdId, entry);

      if (this._connectionState === ConnectionStates.ONLINE && this._isSocketOpen()) {
        this._dispatchCommand(cmdId);
      } else {
        this._commandQueue.push(cmdId);
        entry.timer = setTimeout(() => {
          this._onQueuedCommandTimeout(cmdId);
        }, this.options.commandTimeout);
      }
    });
  }

  /**
   * Handle queued command timeout when disconnected or not online
   * @private
   * @param {string} cmdId
   */
  _onQueuedCommandTimeout(cmdId) {
    const entry = this._pendingCommands.get(cmdId);
    if (!entry) return;
    this._pendingCommands.delete(cmdId);
    const idx = this._commandQueue.indexOf(cmdId);
    if (idx !== -1) {
      this._commandQueue.splice(idx, 1);
    }
    const err = new Error("Command timed out while waiting for server connection.");
    err.code = ErrorCodes.NOT_CONNECTED;
    entry.reject(err);
  }

  /**
   * Dispatch single command over WebSocket and start ACK timeout
   * @private
   * @param {string} cmdId
   */
  _dispatchCommand(cmdId) {
    const entry = this._pendingCommands.get(cmdId);
    if (!entry) return;

    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = setTimeout(() => {
      this._onCommandTimeout(cmdId);
    }, this.options.commandTimeout);

    this._sendRaw({
      type: "command",
      ...entry.envelope
    });
  }

  /**
   * Handle command ACK timeout
   * @private
   * @param {string} cmdId
   */
  _onCommandTimeout(cmdId) {
    const entry = this._pendingCommands.get(cmdId);
    if (!entry) return;

    if (entry.retries < this.options.commandMaxRetries && this._connectionState === ConnectionStates.ONLINE && this._isSocketOpen()) {
      entry.retries++;
      this._dispatchCommand(cmdId);
    } else {
      this._pendingCommands.delete(cmdId);
      const err = new Error(`Command '${entry.envelope.command}' (${cmdId}) timed out after ${this.options.commandTimeout}ms`);
      err.code = ErrorCodes.INTERNAL_ERROR;
      entry.reject(err);
    }
  }

  /**
   * Flush queued commands upon connection establishment
   * @private
   */
  _flushCommandQueue() {
    const queue = this._commandQueue.slice();
    this._commandQueue = [];

    for (const cmdId of queue) {
      if (this._pendingCommands.has(cmdId)) {
        this._dispatchCommand(cmdId);
      }
    }

    // Also re-dispatch any pending in-flight commands that were interrupted
    for (const [cmdId, entry] of this._pendingCommands.entries()) {
      if (!queue.includes(cmdId)) {
        this._dispatchCommand(cmdId);
      }
    }
  }

  /**
   * Check if underlying WebSocket is open
   * @private
   * @returns {boolean}
   */
  _isSocketOpen() {
    return Boolean(this._ws && this._ws.readyState === 1);
  }

  /**
   * Send raw JSON object to WebSocket
   * @private
   * @param {object} obj
   */
  _sendRaw(obj) {
    if (!this._isSocketOpen()) return;
    try {
      this._ws.send(JSON.stringify(obj));
    } catch (err) {
      console.warn("[RemoteGameClient] Failed to send WebSocket message:", err);
    }
  }

  /**
   * Start Ping/Pong heartbeat loop
   * @private
   */
  _startHeartbeat() {
    this._stopHeartbeat();

    this._pingTimer = setInterval(() => {
      this._sendPing();
    }, this.options.pingInterval);

    // Send immediate initial ping for fast clock sync
    this._sendPing();
  }

  /**
   * Send single Ping message
   * @private
   */
  _sendPing() {
    if (!this._isSocketOpen() || this._connectionState !== ConnectionStates.ONLINE) return;

    const t1 = this._now();
    this._lastPingTimestamp = t1;

    this._sendRaw({
      type: "ping",
      t1: t1,
      clientTime: t1
    });

    if (this._pongTimeoutTimer) clearTimeout(this._pongTimeoutTimer);
    this._pongTimeoutTimer = setTimeout(() => {
      this._onPongTimeout();
    }, this.options.pingTimeout);
  }

  /**
   * Handle Pong timeout (connection dead/hung)
   * @private
   */
  _onPongTimeout() {
    this._pongTimeoutTimer = null;
    console.warn(`[RemoteGameClient] Pong timeout after ${this.options.pingTimeout}ms, terminating connection`);
    if (this._ws) {
      try {
        this._ws.close();
      } catch (_) {}
    }
  }

  /**
   * Stop heartbeat timers
   * @private
   */
  _stopHeartbeat() {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
    if (this._pongTimeoutTimer) {
      clearTimeout(this._pongTimeoutTimer);
      this._pongTimeoutTimer = null;
    }
  }

  /**
   * WebSocket onerror handler
   * @private
   * @param {Event|Error} error
   */
  _onError(error) {
    console.warn("[RemoteGameClient] WebSocket error encountered:", error?.message || error);
  }

  /**
   * WebSocket onclose handler
   * @private
   * @param {CloseEvent|object} event
   */
  _onClose(event) {
    this._stopHeartbeat();
    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    // Code 4001: NEW_CONNECTION_ESTABLISHED (single writer kickout)
    // Code 4002: VERSION_MISMATCH
    // Permanently halt reconnection to prevent ping-pong reconnect storms
    if (event?.code === 4001 || event?.reason === "NEW_CONNECTION_ESTABLISHED" || event?.code === 4002 || event?.reason === ErrorCodes.VERSION_MISMATCH) {
      this._isExplicitlyClosed = true;
      if (this._reconnectTimer) {
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = null;
      }
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        code: event?.code || 4001,
        reason: event?.code === 4002 ? ErrorCodes.VERSION_MISMATCH : "NEW_CONNECTION_ESTABLISHED",
        message: event?.code === 4002 ? "Client/server version mismatch." : "Another connection for this account was established."
      });
      return;
    }

    if (this._isExplicitlyClosed) {
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        code: event?.code,
        reason: event?.reason || "Client closed"
      });
      return;
    }

    if (!this.options.autoReconnect || this._reconnectAttempts >= this.options.maxReconnectAttempts) {
      this._setConnectionState(ConnectionStates.DISCONNECTED, {
        code: event?.code,
        reason: "Max reconnect attempts reached"
      });
      this._rejectInit(new Error("Failed to connect to server"));
      return;
    }

    // Transition to reconnecting
    this._scheduleReconnect();
  }

  /**
   * Schedule automatic exponential backoff reconnection
   * @private
   */
  _scheduleReconnect() {
    if (this._reconnectTimer) clearTimeout(this._reconnectTimer);

    const baseDelay = this.options.reconnectInitialDelay * Math.pow(this.options.reconnectBackoffFactor, this._reconnectAttempts);
    let delay = Math.min(baseDelay, this.options.reconnectMaxDelay);

    if (this.options.reconnectJitter) {
      delay += Math.random() * (delay * 0.2); // 0-20% jitter
    }

    this._reconnectAttempts++;
    this._setConnectionState(ConnectionStates.RECONNECTING, {
      attempt: this._reconnectAttempts,
      delay: Math.round(delay)
    });

    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      this._connect();
    }, delay);
  }

  /**
   * Set connection state and notify listeners and EventBus
   * @private
   * @param {string} newState - One of ConnectionStates
   * @param {object} [meta={}]
   */
  _setConnectionState(newState, meta = {}) {
    if (this._connectionState === newState && Object.keys(meta).length === 0) return;

    this._connectionState = newState;
    const eventPayload = {
      state: newState,
      timestamp: this._now(),
      ...meta
    };

    this._emit(Events.CONNECTION_STATE, eventPayload);
    if (this._eventBus && typeof this._eventBus.emit === "function") {
      try {
        this._eventBus.emit(Events.CONNECTION_STATE, eventPayload);
      } catch (err) {
        console.error("[RemoteGameClient] Error emitting connection:state to EventBus:", err);
      }
    }
  }

  /**
   * Clean up socket instance and listeners
   * @private
   */
  _cleanupSocket() {
    if (this._ws) {
      try {
        this._ws.onopen = null;
        this._ws.onmessage = null;
        this._ws.onerror = null;
        this._ws.onclose = null;
        this._ws.close();
      } catch (_) {}
      this._ws = null;
    }
  }

  /**
   * Helper to resolve init Promise
   * @private
   */
  _resolveInit(result) {
    if (this._initPromiseResolver) {
      const resolve = this._initPromiseResolver;
      this._initPromiseResolver = null;
      this._initPromiseRejecter = null;
      resolve(result);
    }
  }

  /**
   * Helper to reject init Promise
   * @private
   */
  _rejectInit(error) {
    if (this._initPromiseRejecter) {
      const reject = this._initPromiseRejecter;
      this._initPromiseResolver = null;
      this._initPromiseRejecter = null;
      reject(error);
    }
  }

  /**
   * Disconnect client and release all resources
   */
  destroy() {
    this._isExplicitlyClosed = true;

    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }

    this._stopHeartbeat();

    if (this._handshakeTimer) {
      clearTimeout(this._handshakeTimer);
      this._handshakeTimer = null;
    }

    // Cancel all pending commands with client destroyed error
    for (const [cmdId, entry] of this._pendingCommands.entries()) {
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(new Error("Client destroyed"));
    }
    this._pendingCommands.clear();
    this._commandQueue = [];

    this._cleanupSocket();
    this._setConnectionState(ConnectionStates.DISCONNECTED, { reason: "destroy" });

    super.destroy();
  }

  /**
   * Alias for destroy
   */
  disconnect() {
    this.destroy();
  }
}

RemoteGameClient;

// --- src/js/ui/HUDDragController.js ---
/**
 * HUDDragController.js
 * 戰鬥局內 HUD 自由拖曳管理控制器
 * 支援四大元件自由拖曳、安全邊界約束、localStorage 座標持久化與雙擊重設。
 */

const HUD_STORAGE_KEY = "koraku_hud_positions_v1";
const DRAG_THRESHOLD_PX = 4;
const BOUNDS_MARGIN_PX = 8;

class HUDDragController {
  /**
   * @param {Object} options
   * @param {HTMLElement|Document} [options.root]
   * @param {Storage} [options.storage]
   */
  constructor({ root = null, storage = null } = {}) {
    this.root = root || (typeof document !== "undefined" ? document : null);
    this.storage = storage || (typeof window !== "undefined" ? window.localStorage : null);
    this.widgets = new Map();
    this.activeDrag = null;
    this.lastTapTime = 0;
    this.lastTapId = null;
    this.suppressClick = false;

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", this.onPointerMove, { passive: false });
      window.addEventListener("pointerup", this.onPointerUp, { passive: false });
      window.addEventListener("pointercancel", this.onPointerCancel, { passive: false });
      window.addEventListener("resize", this.onWindowResize, { passive: true });
    }
  }

  /**
   * 註冊可拖曳的 HUD 元件
   * @param {string} id
   * @param {HTMLElement|string} elementOrSelector
   * @param {Object} [options]
   * @param {string} [options.handleSelector] - 指定拖曳手柄選擇器（若無則全元件可拖曳）
   */
  register(id, elementOrSelector, { handleSelector = null } = {}) {
    const element = typeof elementOrSelector === "string" 
      ? this.root.querySelector(elementOrSelector) 
      : elementOrSelector;

    if (!element) return;

    const pointerDownHandler = (e) => this.handlePointerDown(e, id);
    element.addEventListener("pointerdown", pointerDownHandler);

    this.widgets.set(id, {
      id,
      element,
      handleSelector,
      pointerDownHandler
    });

    // 嘗試套用已儲存之座標
    this.applyPosition(id);
  }

  /**
   * 取消註冊
   * @param {string} id
   */
  unregister(id) {
    const widget = this.widgets.get(id);
    if (!widget) return;

    if (widget.element && widget.pointerDownHandler) {
      widget.element.removeEventListener("pointerdown", widget.pointerDownHandler);
    }
    this.widgets.delete(id);
  }

  /**
   * 指針按下事件
   */
  handlePointerDown(e, id) {
    // 僅響應主要按鍵（滑鼠左鍵或觸控）
    if (e.button !== undefined && e.button !== 0) return;

    const widget = this.widgets.get(id);
    if (!widget || !widget.element) return;

    // 排除互動元素（按鈕、輸入框、連結、關閉鈕等）
    const target = e.target;
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("select") ||
      target.closest("textarea") ||
      target.closest("a") ||
      target.closest(".modal-close-btn") ||
      target.closest(".floating-close-btn") ||
      target.closest(".floating-zoom-btn") ||
      target.closest(".btn-toggle-autobattle")
    ) {
      return;
    }

    // 若指定了手柄選擇器，點擊處必須在手柄內
    if (widget.handleSelector && !target.closest(widget.handleSelector)) {
      return;
    }

    // 雙擊 / 雙點擊判定（350ms 內連續點擊同一元件即重設回預設位置）
    const now = Date.now();
    if (this.lastTapId === id && now - this.lastTapTime < 350) {
      this.resetPosition(id);
      this.lastTapTime = 0;
      this.lastTapId = null;
      return;
    }
    this.lastTapTime = now;
    this.lastTapId = id;

    const rect = widget.element.getBoundingClientRect();
    const parent = widget.element.offsetParent || document.body;
    const parentRect = parent.getBoundingClientRect();

    // 元素當前相對於其 offsetParent 的 left/top
    const elemLeft = rect.left - parentRect.left;
    const elemTop = rect.top - parentRect.top;

    this.activeDrag = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      elemStartX: elemLeft,
      elemStartY: elemTop,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      element: widget.element,
      width: rect.width,
      height: rect.height,
      parentRect,
      isDragging: false
    };

    if (typeof widget.element.setPointerCapture === "function") {
      try {
        widget.element.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  }

  /**
   * 指針移動事件
   */
  onPointerMove(e) {
    if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;

    const drag = this.activeDrag;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
      drag.isDragging = true;
      this.suppressClick = true;
      drag.element.classList.add("is-dragging");
    }

    if (drag.isDragging) {
      e.preventDefault();

      const viewportWidth = (typeof window !== "undefined" ? window.innerWidth : 1920);
      const viewportHeight = (typeof window !== "undefined" ? window.innerHeight : 1080);

      // 目標視窗座標
      const targetScreenLeft = e.clientX - drag.offsetX;
      const targetScreenTop = e.clientY - drag.offsetY;

      // 安全夾取於視窗可見區域
      const minLeft = BOUNDS_MARGIN_PX;
      const maxLeft = Math.max(minLeft, viewportWidth - drag.width - BOUNDS_MARGIN_PX);
      const minTop = BOUNDS_MARGIN_PX;
      const maxTop = Math.max(minTop, viewportHeight - drag.height - BOUNDS_MARGIN_PX);

      const clampedLeft = Math.max(minLeft, Math.min(maxLeft, targetScreenLeft));
      const clampedTop = Math.max(minTop, Math.min(maxTop, targetScreenTop));

      // 轉換為相對於 offsetParent 的座標
      const finalLeft = clampedLeft - drag.parentRect.left;
      const finalTop = clampedTop - drag.parentRect.top;

      drag.element.style.left = `${finalLeft}px`;
      drag.element.style.top = `${finalTop}px`;
      drag.element.style.right = "auto";
      drag.element.style.bottom = "auto";
      drag.element.style.transform = "none";
    }
  }

  /**
   * 指針抬起事件
   */
  onPointerUp(e) {
    if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;

    const drag = this.activeDrag;
    if (drag.isDragging) {
      drag.element.classList.remove("is-dragging");

      // 儲存當前座標
      const left = parseFloat(drag.element.style.left);
      const top = parseFloat(drag.element.style.top);
      if (!isNaN(left) && !isNaN(top)) {
        this.savePosition(drag.id, { left, top });
      }

      // 短暫攔截 click 事件避免誤觸內部按鈕
      if (typeof window !== "undefined") {
        const preventClickCapture = (evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          window.removeEventListener("click", preventClickCapture, true);
        };
        window.addEventListener("click", preventClickCapture, true);
        setTimeout(() => {
          window.removeEventListener("click", preventClickCapture, true);
          this.suppressClick = false;
        }, 80);
      }
    }

    if (typeof drag.element.releasePointerCapture === "function") {
      try {
        drag.element.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    this.activeDrag = null;
  }

  /**
   * 指針取消事件
   */
  onPointerCancel(e) {
    this.onPointerUp(e);
  }

  /**
   * 載入已儲存之座標
   * @returns {Object}
   */
  loadPositions() {
    if (!this.storage) return {};
    try {
      const raw = this.storage.getItem(HUD_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  /**
   * 儲存特定元件之座標
   * @param {string} id
   * @param {{left: number, top: number}} pos
   */
  savePosition(id, pos) {
    if (!this.storage) return;
    try {
      const all = this.loadPositions();
      all[id] = { left: Math.round(pos.left), top: Math.round(pos.top) };
      this.storage.setItem(HUD_STORAGE_KEY, JSON.stringify(all));
    } catch (_) {}
  }

  /**
   * 套用特定元件之已存座標
   * @param {string} id
   */
  applyPosition(id) {
    const widget = this.widgets.get(id);
    if (!widget || !widget.element) return;

    const all = this.loadPositions();
    const pos = all[id];
    if (!pos || typeof pos.left !== "number" || typeof pos.top !== "number") return;

    const viewportWidth = (typeof window !== "undefined" ? window.innerWidth : 1920);
    const viewportHeight = (typeof window !== "undefined" ? window.innerHeight : 1080);
    const rect = widget.element.getBoundingClientRect();
    const width = rect.width || 180;
    const height = rect.height || 100;

    const minLeft = BOUNDS_MARGIN_PX;
    const maxLeft = Math.max(minLeft, viewportWidth - width - BOUNDS_MARGIN_PX);
    const minTop = BOUNDS_MARGIN_PX;
    const maxTop = Math.max(minTop, viewportHeight - height - BOUNDS_MARGIN_PX);

    const safeLeft = Math.max(minLeft, Math.min(maxLeft, pos.left));
    const safeTop = Math.max(minTop, Math.min(maxTop, pos.top));

    widget.element.style.left = `${safeLeft}px`;
    widget.element.style.top = `${safeTop}px`;
    widget.element.style.right = "auto";
    widget.element.style.bottom = "auto";
    widget.element.style.transform = "none";
  }

  /**
   * 套用所有已註冊元件之已存座標
   */
  applyAllPositions() {
    for (const id of this.widgets.keys()) {
      this.applyPosition(id);
    }
  }

  /**
   * 重設特定元件至原廠預設座標
   * @param {string} id
   */
  resetPosition(id) {
    const widget = this.widgets.get(id);
    if (!widget || !widget.element) return;

    widget.element.style.left = "";
    widget.element.style.top = "";
    widget.element.style.right = "";
    widget.element.style.bottom = "";
    widget.element.style.transform = "";

    if (this.storage) {
      try {
        const all = this.loadPositions();
        delete all[id];
        this.storage.setItem(HUD_STORAGE_KEY, JSON.stringify(all));
      } catch (_) {}
    }
  }

  /**
   * 重設所有元件
   */
  resetAllPositions() {
    for (const id of this.widgets.keys()) {
      this.resetPosition(id);
    }
    if (this.storage) {
      try {
        this.storage.removeItem(HUD_STORAGE_KEY);
      } catch (_) {}
    }
  }

  /**
   * 視窗大小改變時重新安全校驗
   */
  onWindowResize() {
    const all = this.loadPositions();
    for (const [id, widget] of this.widgets.entries()) {
      if (all[id] && widget.element && widget.element.style.left) {
        this.applyPosition(id);
      }
    }
  }

  /**
   * 清理並移除全域監聽器
   */
  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("pointermove", this.onPointerMove);
      window.removeEventListener("pointerup", this.onPointerUp);
      window.removeEventListener("pointercancel", this.onPointerCancel);
      window.removeEventListener("resize", this.onWindowResize);
    }
    for (const id of this.widgets.keys()) {
      this.unregister(id);
    }
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

  show(payload) {
    if (!payload) return;
    window.clearInterval(this.timer);
    window.clearTimeout(this.stopTimer);

    let speaker = "";
    let text = "";

    if (typeof payload === "string") {
      text = payload;
    } else if (payload.key) {
      text = I18n.t(payload.key, payload.params || {});
      if (payload.speakerKey) {
        speaker = I18n.t(payload.speakerKey);
      } else if (payload.speaker) {
        speaker = payload.speaker;
      }
    } else {
      speaker = payload.speaker || "";
      text = payload.text || "";
    }

    this.fullText = text;
    if (this.speakerElement) {
      this.speakerElement.textContent = speaker;
    }
    if (this.textElement) {
      this.textElement.textContent = "";
    }
    const characters = Array.from(text);
    let index = 0;
    const isSpeaking = Boolean(speaker && !["旁白", "Narrator", "ナレーション"].includes(speaker));
    this.setSpeaking(isSpeaking);

    this.timer = window.setInterval(() => {
      index += 1;
      if (this.textElement) {
        this.textElement.textContent = characters.slice(0, index).join("");
      }
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
    if (this.textElement) {
      this.textElement.textContent = this.fullText;
    }
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
  constructor({ bus, store, battle, postBattle, sound, client }) {
    this.bus = bus;
    this.store = store;
    this.battle = battle;
    this.postBattle = postBattle;
    this.sound = sound;
    this.client = client || null;
    this.connectionState = this.client?.connectionState || ConnectionStates.OFFLINE;
    this.timers = new TimerRegistry();
    this.currentScreen = "home";
    this.activeGrowthTab = "stats";
    this.activeGuideTab = "basics";
    this.activeShopTab = "potions";
    this.activeShopFilter = "all";
    this.selectedGalleryItem = GALLERY_ITEMS[0].id;
    this.gallerySwimsuitDiff = "default";
    this.battleState = null;
    this.postState = null;
    this.qteState = null;
    this.recentDamageLog = [];
    this.dojoQteActive = false;
    this.dojoQteStyle = "single";
    this.dojoCombo = 0;
    this.dojoMaxCombo = 0;
    this.dojoTotalAttempts = 0;
    this.dojoSuccessHits = 0;
    this.dojoReactionTimes = [];
    this.dojoMode = "1";
    this.dojoMode1Style = "single";
    this.dojoMode2Style = "single";
    this.dojoQteSystem = null;
    this.dojoDualQteSystem = null;
    this.dojoStepTimeout = null;
    this.dojoStepStartTime = 0;
    this.qteKeyboard = new QTEKeyboardInput(directionFromKey);
    this.leftQteKeyboard = new QTEKeyboardInput(wasdDirectionFromKey);
    this.rightQteKeyboard = new QTEKeyboardInput(arrowDirectionFromKey);
    this.previousBattlePhase = null;
    this.toastTimer = null;
    this.damageTimer = null;
    this.watermelonFrame = 0;
    this.floatingWatermelonFrame = 0;
    this.isWatermelonZoomed = false;

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        this.activeGrowthTab = window.localStorage.getItem("koraku_growth_tab") || "stats";
        this.activeShopFilter = window.localStorage.getItem("koraku_shop_filter") || "all";
        this.activeGuideTab = window.localStorage.getItem("koraku_guide_tab") || "basics";
        this.activeShopTab = window.localStorage.getItem("koraku_shop_tab") || "potions";
        this.selectedGalleryItem = window.localStorage.getItem("koraku_gallery_item") || GALLERY_ITEMS[0].id;
        if (this.selectedGalleryItem === "swimsuit_watermelon") {
          this.selectedGalleryItem = "swimsuit_default";
          this.gallerySwimsuitDiff = "watermelon";
        }
        this.dojoQteStyle = window.localStorage.getItem("koraku_dojo_style") || "single";
        this.dojoMode = window.localStorage.getItem("koraku_dojo_mode") || "1";
        this.isWatermelonZoomed = window.localStorage.getItem("koraku_watermelon_zoomed") === "true";
      }
    } catch (_) {}

    // 裝置觸控能力探測（支援手機、平板 iPad/Android、觸控螢幕筆電）
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const isTouchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(any-pointer: coarse)").matches));
      if (isTouchDevice) {
        document.documentElement.classList.add("has-touch");
        document.body.classList.add("has-touch");
      }
      const enableTouch = () => {
        document.documentElement.classList.add("has-touch");
        document.body.classList.add("has-touch");
      };
      window.addEventListener("touchstart", enableTouch, { passive: true });
      window.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          enableTouch();
        }
      }, { passive: true });
    }

    this.cacheElements();
    this.bindEvents();
  }

  isMutationLocked() {
    const battle = this.client?.battle?.snapshot
      ? this.client.battle.snapshot()
      : (this.client?.battle?.state || (typeof this.battle?.snapshot === "function" ? this.battle.snapshot() : this.battle?.state));
    if (!battle || !battle.active) {
      return false;
    }
    const policy = (typeof this.client?.getServerConfig === "function" && this.client.getServerConfig()?.battleLockPolicy)
      ? this.client.getServerConfig().battleLockPolicy
      : "always"; // 離線模式或未通報時一律視為 always

    if (policy === "never") {
      return false;
    }
    if (policy === "always") {
      return true;
    }
    if (policy === "countdown") {
      const phase = battle.phase;
      return phase === "reaction" || phase === "qte";
    }
    return true;
  }

  async sendCommand(command, payload = {}) {
    if (this.client && typeof this.client.send === "function") {
      try {
        const res = await this.client.send(command, payload);
        if (res?.errorCode === ErrorCodes.BATTLE_IN_PROGRESS_LOCKED || res?.error === ErrorCodes.BATTLE_IN_PROGRESS_LOCKED || res?.error === "BATTLE_IN_PROGRESS_LOCKED") {
          this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        }
        return res;
      } catch (err) {
        if (err?.code === ErrorCodes.BATTLE_IN_PROGRESS_LOCKED || err?.code === "BATTLE_IN_PROGRESS_LOCKED" || err?.message === "BATTLE_IN_PROGRESS_LOCKED" || err?.key === "battle.lockedDuringBattle") {
          this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        } else if (err?.code === ErrorCodes.NOT_CONNECTED || err?.code === "NOT_CONNECTED" || err?.errorCode === ErrorCodes.NOT_CONNECTED) {
          this.showToast(I18n.t("connection.commandFailedOffline"), "warning");
        } else {
          console.error(`[AppView] Command failed (${command}):`, err);
        }
        return { ok: false, error: err.code || err.message, errorCode: err.code, key: err.key, message: err.message };
      }
    }
    throw new Error(`[AppView] sendCommand called without an active game client: ${command}`);
  }

  getStoreSnapshot() {
    if (this.store && typeof this.store.snapshot === "function") {
      return this.store.snapshot();
    }
    if (this.client?.store && typeof this.client.store.snapshot === "function") {
      return this.client.store.snapshot();
    }
    if (this.client && typeof this.client.getState === "function") {
      const st = this.client.getState();
      if (st && Object.keys(st).length > 0) {
        if (!st.xpToNext && st.profile?.level) {
          st.xpToNext = xpNeededForLevel(st.profile.level);
        }
        return st;
      }
    }
    return {
      profile: { level: 1, xp: 0, skillPoints: 0, allocations: { hp: 0, mp: 0, damage: 0 }, skills: { momo: 0, dualHand: 0 } },
      xpToNext: xpNeededForLevel(1),
      playerStats: { maxHp: 100, maxMp: 50, damage: 15 },
      coins: 0,
      inventory: { hpPotion: 1, mpPotion: 0 },
      equipment: {},
      inventoryEquipment: [],
      records: { wins: 0, losses: 0, bestStage: 0, clearedStages: [] }
    };
  }

  getTheoreticalDPS(snapshot = null) {
    if (this.store && typeof this.store.getTheoreticalDPS === "function") {
      return this.store.getTheoreticalDPS();
    }
    const snap = snapshot || this.getStoreSnapshot();
    const baseDamage = snap.playerStats?.damage || 15;
    const momoLevel = snap.profile?.skills?.momo || 0;
    const momoRate = Math.min(1, momoLevel * 0.1);
    const momoDamage = 25;
    const hasDual = (snap.profile?.skills?.dualHand || 0) > 0;
    const expectedRps = baseDamage * (1 / 3) * (hasDual ? 1.5 : 1.0);
    const expectedMomo = (1 / 3) * momoRate * momoDamage;
    return Number((expectedRps + expectedMomo).toFixed(1));
  }

  getWatermelonMarkerPosition() {
    if (this.postBattle && typeof this.postBattle.getMarkerPosition === "function") {
      return this.postBattle.getMarkerPosition();
    }
    const now = performance.now();
    const period = 2000;
    const t = (now % period) / period;
    return 0.5 - 0.5 * Math.cos(t * 2 * Math.PI);
  }

  getAutoWatermelonMarkerPosition() {
    if (this.postBattle && typeof this.postBattle.getAutoMarkerPosition === "function") {
      return this.postBattle.getAutoMarkerPosition();
    }
    const now = performance.now();
    const period = 2000;
    const t = (now % period) / period;
    return 0.5 - 0.5 * Math.cos(t * 2 * Math.PI);
  }

  renderConnectionState(state, meta = {}) {
    if (!state) return;
    this.connectionState = state;
    const badge = this.connectionStatusBadge || $("#connection-status-badge");
    const textEl = this.connectionStatusText || $("#connection-status-text");
    const banner = this.connectionStatusBanner || $("#connection-status-banner");
    const bannerText = this.connectionBannerText || $("#connection-banner-text");

    if (badge) {
      badge.classList.remove("is-online", "is-connecting", "is-reconnecting", "is-offline", "is-disconnected");
      badge.classList.add(`is-${state}`);
      if (state !== ConnectionStates.ONLINE) {
        badge.classList.remove("is-high-ping");
        const existingPing = badge.querySelector(".connection-ping-badge");
        if (existingPing) existingPing.remove();
      }
    }

    const label = this.getConnectionLabel(state);
    if (textEl) {
      textEl.textContent = label;
    }

    if (meta?.reason === "KICKED_BY_NEW_CONNECTION" || meta?.reason === "NEW_CONNECTION_ESTABLISHED") {
      this.showToast(I18n.t("connection.kickedByNewConnection"), "warning");
    }

    if (banner && bannerText) {
      if (state === ConnectionStates.RECONNECTING || state === ConnectionStates.DISCONNECTED) {
        banner.hidden = false;
        if (this.connectionBannerSwitchOffline) {
          this.connectionBannerSwitchOffline.hidden = false;
        }
        if (this.battleState?.active) {
          const deadline = meta?.deadline || (Date.now() + 10000);
          this._startDisconnectCountdown(deadline);
        } else {
          this._stopDisconnectCountdown();
          bannerText.textContent = state === ConnectionStates.RECONNECTING
            ? I18n.t("connection.bannerReconnecting")
            : I18n.t("connection.bannerDisconnected");
        }
      } else {
        this._stopDisconnectCountdown();
        banner.hidden = true;
        if (this.connectionBannerSwitchOffline) {
          this.connectionBannerSwitchOffline.hidden = true;
        }
      }
    }
  }

  handlePingUpdate(ping) {
    if (!ping || this.connectionState !== ConnectionStates.ONLINE) return;
    const badge = this.connectionStatusBadge || $("#connection-status-badge");
    if (!badge) return;

    const rtt = Math.round(ping.rtt || 0);
    const isHigh = Boolean(ping.isHighLatency || rtt >= 180);

    let pingBadge = badge.querySelector(".connection-ping-badge");
    if (isHigh && rtt > 0) {
      badge.classList.add("is-high-ping");
      if (!pingBadge) {
        pingBadge = document.createElement("span");
        pingBadge.className = "connection-ping-badge";
        badge.appendChild(pingBadge);
      }
      pingBadge.textContent = `${rtt}ms`;
    } else {
      badge.classList.remove("is-high-ping");
      if (pingBadge) pingBadge.remove();
    }
  }

  _startDisconnectCountdown(deadline) {
    this._stopDisconnectCountdown();
    const update = () => {
      const remainingMs = Math.max(0, deadline - Date.now());
      const seconds = Math.ceil(remainingMs / 1000);
      const bannerText = this.connectionBannerText || $("#connection-banner-text");
      if (bannerText) {
        bannerText.innerHTML = I18n.t("connection.disconnectCountdown", {
          seconds: `<span class="connection-banner-countdown">${seconds}</span>`
        });
      }
      if (remainingMs <= 0) {
        this._stopDisconnectCountdown();
      }
    };
    update();
    this._disconnectTimer = setInterval(update, 500);
  }

  _stopDisconnectCountdown() {
    if (this._disconnectTimer) {
      clearInterval(this._disconnectTimer);
      this._disconnectTimer = null;
    }
  }

  _startCountdownTicker(state) {
    this._stopCountdownTicker();
    const initialSec = Number(state.countdown) || Number(state.stage?.roundSeconds) || 5;
    this._countdownStartTime = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    this._countdownTotalMs = initialSec * 1000;
    this._lastCountdownSec = initialSec;

    const tick = () => {
      const countdownValue = this.countdownValue || (typeof document !== "undefined" ? $("#countdown-value") : null);
      if (!countdownValue || this.battleState?.phase !== "countdown" || this.battleState?.isPaused) return;
      const now = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      const elapsed = now - this._countdownStartTime;
      const remainingMs = Math.max(0, this._countdownTotalMs - elapsed);
      const sec = Math.ceil(remainingMs / 1000);
      countdownValue.textContent = String(sec);

      if (sec !== this._lastCountdownSec) {
        this._lastCountdownSec = sec;
        if (sec <= 3 && sec >= 1) {
          if (typeof document !== "undefined") {
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
            const lbl = $("#enemy-hand-label");
            if (lbl) lbl.textContent = I18n.t("ui.preparing");
            const leftLbl = $("#enemy-left-hand-label");
            if (leftLbl) leftLbl.textContent = I18n.t("ui.preparing");
            const rightLbl = $("#enemy-right-hand-label");
            if (rightLbl) rightLbl.textContent = I18n.t("ui.preparing");
          }
          try {
            this.sound?.play("select");
          } catch (_) {}
        }
      }
      if (remainingMs <= 0) {
        this._stopCountdownTicker();
      }
    };

    this._countdownTickerId = setInterval(tick, 100);
    if (this._countdownTickerId && typeof this._countdownTickerId.unref === "function") {
      this._countdownTickerId.unref();
    }
  }

  _stopCountdownTicker() {
    if (this._countdownTickerId) {
      clearInterval(this._countdownTickerId);
      this._countdownTickerId = null;
    }
  }

  _startReactionTicker(state) {
    this._stopReactionTicker();
    const initialSec = typeof state.reactionRemaining === "number" && state.reactionRemaining > 0
      ? state.reactionRemaining
      : ((state.stage?.reactionWindowMs || 1000) / 1000);
    this._reactionStartTime = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    this._reactionTotalMs = initialSec * 1000;

    const tick = () => {
      const countdownValue = this.countdownValue || (typeof document !== "undefined" ? $("#countdown-value") : null);
      if (!countdownValue || this.battleState?.phase !== "reaction" || this.battleState?.isPaused) return;
      const now = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
      const elapsed = now - this._reactionStartTime;
      const remainingMs = Math.max(0, this._reactionTotalMs - elapsed);
      const secText = (remainingMs / 1000).toFixed(1);
      countdownValue.textContent = secText;
      if (remainingMs <= 0) {
        this._stopReactionTicker();
      }
    };

    this._reactionTickerId = setInterval(tick, 100);
    if (this._reactionTickerId && typeof this._reactionTickerId.unref === "function") {
      this._reactionTickerId.unref();
    }
  }

  _stopReactionTicker() {
    if (this._reactionTickerId) {
      clearInterval(this._reactionTickerId);
      this._reactionTickerId = null;
    }
  }

  _clearBattleTickers() {
    this._stopCountdownTicker();
    this._stopReactionTicker();
  }

  getConnectionLabel(state) {
    const key = `connection.${state}`;
    const translated = I18n.t(key);
    return (translated && translated !== key) ? translated : state;
  }

  cacheElements() {
    this.app = $("#app");
    this.screenStack = $(".screen-stack");
    this.battleArena = $("#battle-arena");
    this.floatingWatermelon = $("#floating-autobattle-watermelon");
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
    this.playerAtkText = $("#player-atk-text");
    this.enemyAtkText = $("#enemy-atk-text");
    this.enemyLeftAtkText = $("#enemy-left-atk-text");
    this.enemyRightAtkText = $("#enemy-right-atk-text");
    this.battleDamageLog = $("#battle-damage-log");
    this.battleDamageLogList = $("#battle-damage-log-list");
    this.dojoModal = $("#dojo-modal");
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
    this.galleryLightboxModal = $("#gallery-lightbox-modal");
    this.saveRecordModal = $("#save-record-modal");
    this.saveOverviewLevel = $("#save-overview-level");
    this.saveOverviewCoins = $("#save-overview-coins");
    this.saveOverviewStage = $("#save-overview-stage");
    this.saveOverviewBattles = $("#save-overview-battles");
    this.saveSeedOutput = $("#save-seed-output");
    this.saveSeedInput = $("#save-seed-input");
    this.cheatModal = $("#cheat-modal");
    this.cheatAuthModal = $("#cheat-auth-modal");
    this.cheatAuthPassword = $("#cheat-auth-password");
    this.cheatAuthForm = $("#cheat-auth-form");
    this.cheatDevBadge = $("#cheat-dev-badge");
    this.cheatDemoteBtn = $("#btn-cheat-demote");
    this.changelogModal = $("#changelog-modal");
    this.equipTooltip = $("#equip-tooltip");
    this.activeShopFilter = "all";
    this.battleLogTier = 1;
    this.connectionStatusBadge = $("#connection-status-badge");
    this.connectionStatusText = $("#connection-status-text");
    this.connectionStatusBanner = $("#connection-status-banner");
    this.connectionBannerText = $("#connection-banner-text");
    this.connectionBannerClose = $("#connection-banner-close");
    this.connectionBannerSwitchOffline = $("#connection-banner-switch-offline");

    if (this.connectionBannerSwitchOffline) {
      this.connectionBannerSwitchOffline.addEventListener("click", () => {
        if (typeof window !== "undefined") {
          window.localStorage?.setItem("koraku_mode", "offline");
          const url = new URL(window.location.href);
          url.searchParams.delete("mode");
          window.location.href = url.toString();
        }
      });
    }

    if (this.connectionBannerClose) {
      this.connectionBannerClose.addEventListener("click", () => {
        if (this.connectionStatusBanner) this.connectionStatusBanner.hidden = true;
      });
    }

    if (this.battleDamageLog) {
      this.battleDamageLog.addEventListener("click", () => {
        if (this.hudDragController?.suppressClick) return;
        this.battleLogTier = (this.battleLogTier % 3) + 1;
        this.updateDamageLogDisplay();
      });
      this.battleDamageLog.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.battleLogTier = (this.battleLogTier % 3) + 1;
          this.updateDamageLogDisplay();
        }
      });
    }

    this.hudDragController = new HUDDragController({
      root: document,
      storage: (typeof window !== "undefined" ? window.localStorage : null)
    });
    if (this.battleDamageLog) {
      this.hudDragController.register("damageLog", this.battleDamageLog, { handleSelector: ".damage-log-header" });
    }
    if (this.roundOracle) {
      this.hudDragController.register("roundOracle", this.roundOracle);
    }
    const autoBattleBanner = $("#auto-battle-hud-banner");
    if (autoBattleBanner) {
      this.hudDragController.register("autobattleBar", autoBattleBanner);
    }
    if (this.floatingWatermelon) {
      this.hudDragController.register("watermelon", this.floatingWatermelon, { handleSelector: ".floating-watermelon-header" });
    }

    this._countdownTickerId = null;
    this._countdownStartTime = 0;
    this._countdownTotalMs = 0;
    this._lastCountdownSec = 0;
    this._currentCountdownRound = null;

    this._reactionTickerId = null;
    this._reactionStartTime = 0;
    this._reactionTotalMs = 0;
    this._currentReactionRound = null;
    this._morphReactionStarted = false;
    this._wasPaused = false;
  }

  init() {
    this.renderI18n();
    this.updateAudioToggles();
    const snapshot = this.getStoreSnapshot();
    this.renderStore(snapshot);
    this.renderConnectionState(this.connectionState);

    // Mobile Anti-Zoom Protection: Prevent double-tap zoom & gesture pinch zoom on mobile devices
    if (typeof document !== "undefined") {
      document.addEventListener("gesturestart", (e) => {
        e.preventDefault();
      }, { passive: false });
      document.addEventListener("gesturechange", (e) => {
        e.preventDefault();
      }, { passive: false });
      document.addEventListener("gestureend", (e) => {
        e.preventDefault();
      }, { passive: false });

      let lastTouchEnd = 0;
      document.addEventListener("touchend", (event) => {
        const now = performance.now();
        if (now - lastTouchEnd <= 300) {
          const target = event.target;
          if (event.cancelable && target && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && target.tagName !== "SELECT") {
            event.preventDefault();
          }
        }
        lastTouchEnd = now;
      }, { passive: false });
    }

    let targetScreen = "home";
    let openDojoOnInit = false;
    try {
      const hashScreen = window.location.hash ? window.location.hash.replace(/^#/, "") : null;
      if (hashScreen === "dojo") {
        targetScreen = "home";
        openDojoOnInit = true;
      } else {
        targetScreen = hashScreen || sessionStorage.getItem("koraku_active_screen") || "home";
      }
    } catch (_) {}

    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState({ screen: targetScreen }, "", "#" + (openDojoOnInit ? "dojo" : targetScreen));
    }
    this.navigate(targetScreen, { pushHistory: false });
    if (openDojoOnInit) {
      this.openDojoModal({ pushHistory: false });
    }
  }

  renderI18n() {
    const locale = I18n.getLocale();
    document.documentElement.lang = LOCALES[locale]?.code || locale;
    document.title = I18n.t("meta.title");

    const langSelect = $("#lang-select");
    if (langSelect) {
      langSelect.value = locale;
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
    const lastQtePointerTimes = new Map();
    const handleQtePointer = (event) => {
      const targetBtn = event.target.closest("[data-direction]");
      if (!targetBtn) return;

      const now = performance.now();
      const area = targetBtn.closest("#dojo-dual-qte-pad-wrap") ? "dojo-dual"
        : targetBtn.closest("#dojo-qte-pad") ? "dojo-single"
        : targetBtn.closest("#dual-qte-pad-wrap") ? "battle-dual" : "battle-single";
      const pointerKey = `${area}:${targetBtn.dataset.dualSlot || "single"}`;
      if (now - (lastQtePointerTimes.get(pointerKey) || 0) < 45) {
        event.preventDefault();
        return;
      }
      lastQtePointerTimes.set(pointerKey, now);

      event.preventDefault();
      event.stopPropagation();

      const dojoQteBtn = targetBtn.closest("#dojo-qte-pad button[data-direction]");
      if (dojoQteBtn) {
        const dir = dojoQteBtn.dataset.direction;
        if (this.dojoQteActive && this.dojoQteSystem) {
          this.dojoQteSystem.input(dir);
        }
        return;
      }

      const dojoDualBtn = targetBtn.closest("#dojo-dual-qte-pad-wrap [data-dual-slot][data-direction]");
      if (dojoDualBtn) {
        const dir = dojoDualBtn.dataset.direction;
        const slot = dojoDualBtn.dataset.dualSlot;
        if (this.dojoQteActive && this.dojoDualQteSystem) {
          this.dojoDualQteSystem.input(dir, slot);
        }
        return;
      }

      const dualBtn = targetBtn.closest("[data-dual-slot][data-direction]");
      if (dualBtn) {
        const dir = dualBtn.dataset.direction;
        const slot = dualBtn.dataset.dualSlot;
        this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: dir, slot });
        if (slot === "left") this.leftQteKeyboard.reset();
        if (slot === "right") this.rightQteKeyboard.reset();
        this.renderHeldQteDirections();
        return;
      }

      if (!targetBtn.closest(".is-dual-touch-pad")) {
        this.qteKeyboard.reset();
        this.renderHeldQteDirections();
        this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: targetBtn.dataset.direction });
      }
    };

    window.addEventListener("pointerdown", handleQtePointer, { passive: false });
    if (typeof window !== "undefined" && !window.PointerEvent) {
      window.addEventListener("touchstart", handleQtePointer, { passive: false });
    }

    // QTE 8-Direction Swipe Gesture Recognition (Mobile / Tablet Touch Support)
    const activeQtePointers = new Map();

    const onQtePointerDown = (event) => {
      const isBattleQte = Boolean(this.battleState?.active && this.battleState.phase === "qte" && this.qteOverlay?.classList.contains("is-active"));
      const isDojoQte = Boolean(this.dojoQteActive && (this.dojoQteSystem?.active || this.dojoDualQteSystem?.active));
      if (!isBattleQte && !isDojoQte) return;

      const pointerId = event.pointerId ?? (event.identifier ?? 0);
      const clientX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
      const clientY = event.clientY ?? event.touches?.[0]?.clientY ?? 0;
      const isDual = isBattleQte ? (this.qteState?.mode === "dual") : (this.dojoQteStyle === "dual");
      let slot = null;
      if (isDual) {
        const leftEl = event.target?.closest ? event.target.closest("#dual-qte-slot-left, #touch-pad-left, #dojo-dual-slot-left") : null;
        const rightEl = event.target?.closest ? event.target.closest("#dual-qte-slot-right, #touch-pad-right, #dojo-dual-slot-right") : null;
        if (leftEl) slot = "left";
        else if (rightEl) slot = "right";
        else slot = clientX < (window.innerWidth / 2) ? "left" : "right";
      }

      activeQtePointers.set(pointerId, {
        startX: clientX,
        startY: clientY,
        startTime: performance.now(),
        slot,
        isDual,
        isBattleQte,
        isDojoQte,
        triggered: false
      });
    };

    const onQtePointerMove = (event) => {
      const pointerId = event.pointerId ?? (event.identifier ?? 0);
      const track = activeQtePointers.get(pointerId);
      if (!track) return;

      const isBattleQte = Boolean(this.battleState?.active && this.battleState.phase === "qte" && this.qteOverlay?.classList.contains("is-active"));
      const isDojoQte = Boolean(this.dojoQteActive && (this.dojoQteSystem?.active || this.dojoDualQteSystem?.active));
      if (!isBattleQte && !isDojoQte) {
        activeQtePointers.delete(pointerId);
        return;
      }

      const clientX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
      const clientY = event.clientY ?? event.touches?.[0]?.clientY ?? 0;
      const dx = clientX - track.startX;
      const dy = clientY - track.startY;
      const dir = directionFromSwipe(dx, dy, 26);
      if (dir) {
        if (event.cancelable) event.preventDefault();
        track.startX = clientX;
        track.startY = clientY;
        track.triggered = true;

        if (track.isBattleQte) {
          if (track.isDual) {
            this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: dir, slot: track.slot });
            if (track.slot === "left") this.leftQteKeyboard.reset();
            if (track.slot === "right") this.rightQteKeyboard.reset();
          } else {
            this.qteKeyboard.reset();
            this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: dir });
          }
          this.renderHeldQteDirections();
        } else if (track.isDojoQte) {
          if (track.isDual && this.dojoDualQteSystem) {
            this.dojoDualQteSystem.input(dir, track.slot);
          } else if (this.dojoQteSystem) {
            this.dojoQteSystem.input(dir);
          }
        }
      }
    };

    const onQtePointerUp = (event) => {
      const pointerId = event.pointerId ?? (event.changedTouches?.[0]?.identifier ?? 0);
      const track = activeQtePointers.get(pointerId);
      if (!track) return;

      if (!track.triggered) {
        const clientX = event.clientX ?? event.changedTouches?.[0]?.clientX ?? 0;
        const clientY = event.clientY ?? event.changedTouches?.[0]?.clientY ?? 0;
        const dx = clientX - track.startX;
        const dy = clientY - track.startY;
        const dir = directionFromSwipe(dx, dy, 18);
        if (dir) {
          if (track.isBattleQte) {
            if (track.isDual) {
              this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: dir, slot: track.slot });
              if (track.slot === "left") this.leftQteKeyboard.reset();
              if (track.slot === "right") this.rightQteKeyboard.reset();
            } else {
              this.qteKeyboard.reset();
              this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: dir });
            }
            this.renderHeldQteDirections();
          } else if (track.isDojoQte) {
            if (track.isDual && this.dojoDualQteSystem) {
              this.dojoDualQteSystem.input(dir, track.slot);
            } else if (this.dojoQteSystem) {
              this.dojoQteSystem.input(dir);
            }
          }
        }
      }
      activeQtePointers.delete(pointerId);
    };

    window.addEventListener("pointerdown", onQtePointerDown, { passive: true });
    window.addEventListener("pointermove", onQtePointerMove, { passive: false });
    window.addEventListener("pointerup", onQtePointerUp, { passive: true });
    window.addEventListener("pointercancel", onQtePointerUp, { passive: true });

    if (typeof window !== "undefined" && !window.PointerEvent) {
      window.addEventListener("touchstart", onQtePointerDown, { passive: true });
      window.addEventListener("touchmove", onQtePointerMove, { passive: false });
      window.addEventListener("touchend", onQtePointerUp, { passive: true });
      window.addEventListener("touchcancel", onQtePointerUp, { passive: true });
    }

    document.addEventListener("click", (event) => this.handleClick(event));
    window.addEventListener("keydown", (event) => this.handleKeydown(event));
    window.addEventListener("keyup", (event) => this.handleKeyup(event));
    window.addEventListener("blur", () => {
      this.qteKeyboard.reset();
      this.leftQteKeyboard.reset();
      this.rightQteKeyboard.reset();
      this.renderHeldQteDirections();
    });

    // Browser Popstate (History Back / Forward & Mobile Back Gesture)
    window.addEventListener("popstate", (event) => {
      const rawHash = window.location.hash ? window.location.hash.replace(/^#/, "") : "home";
      const targetScreen = event.state?.screen || rawHash;

      // If leaving #dojo, close dojo modal
      if (rawHash !== "dojo" && this.dojoModal && !this.dojoModal.hidden) {
        this.closeDojoModal({ popHistory: false });
      }

      // If navigating to #dojo, open dojo modal
      if (rawHash === "dojo") {
        this.openDojoModal({ pushHistory: false });
        return;
      }

      // If leaving dojo-qte or QTE is active, immediately tear it down
      if (this.currentScreen === "dojo-qte" || this.dojoQteActive) {
        this.stopDojoQte();
      }

      if (this.currentScreen === targetScreen) return;

      if (this.currentScreen === "battle" && (this.battleState?.active || this.battle?.autoBattle?.active)) {
        if (typeof window !== "undefined" && window.history) {
          window.history.pushState({ screen: "battle" }, "", "#battle");
        }
        this.promptAbandonBattle(targetScreen);
        return;
      }

      if (this.currentScreen === "battle") {
        this.hideFloatingWatermelon();
        this.postBattle?.closeAutoWatermelon?.();
        this.battleArena?.classList.remove("is-settlement");
        this.resultOverlay?.classList.remove("is-ui-hidden");
      }
      this.navigate(targetScreen, { pushHistory: false });
    });

    // Mouse Navigation Buttons (Back: button 3, Forward: button 4)
    window.addEventListener("mouseup", (event) => {
      if (event.button === 3 || event.button === 4) {
        if (this.currentScreen === "battle" && (this.battleState?.active || this.battle?.autoBattle?.active)) {
          event.preventDefault();
          this.promptAbandonBattle("home");
          return;
        }
        if (this.dojoModal && !this.dojoModal.hidden && event.button === 3) {
          event.preventDefault();
          this.closeDojoModal();
          return;
        }
        if (this.currentScreen === "dojo-qte" && event.button === 3) {
          event.preventDefault();
          this.stopDojoQte();
          this.navigate("home");
          return;
        }
        event.preventDefault();
        if (event.button === 3) window.history.back();
        else window.history.forward();
      }
    });

    // Prevent accidental page close or refresh during active battle without warning
    window.addEventListener("beforeunload", (event) => {
      if (this.currentScreen === "battle" && (this.battleState?.active || this.battle?.autoBattle?.active)) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    });

    const langSelect = $("#lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        I18n.setLocale(e.target.value);
        this.renderI18n();
        this.renderStore(this.getStoreSnapshot());
        if (this.battleState?.active) {
          this.renderBattle(this.battleState);
        }
        this.bus.emit("sound", { name: "select" });
      });
    }

    const cheatAuthForm = $("#cheat-auth-form");
    if (cheatAuthForm) {
      cheatAuthForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCheatAuthSubmit();
      });
    }

    const cheatForm = $("#cheat-form");
    if (cheatForm) {
      cheatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCheatSubmit();
      });
    }

    const btnCheatDemote = $("#btn-cheat-demote");
    if (btnCheatDemote) {
      btnCheatDemote.addEventListener("click", () => {
        this.handleCheatDemote();
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

    this.bus.on("connection:state", (data) => this.renderConnectionState(typeof data === "string" ? data : data?.state, data));
    if (this.client && typeof this.client.on === "function") {
      this.client.on("connection:state", (data) => this.renderConnectionState(typeof data === "string" ? data : data?.state, data));
    }
    this.bus.on("connection:ping", (ping) => this.handlePingUpdate(ping));
    if (this.client && typeof this.client.on === "function") {
      this.client.on("connection:ping", (ping) => this.handlePingUpdate(ping));
    }

    this.bus.on("store:changed", (data) => this.renderStore(data?.state || data));
    this.bus.on("battle:state", (state) => this.renderBattle(state));
    const handleMutationLockUpdate = () => {
      if (this.currentScreen === "growth") {
        this.renderGrowth(this.getStoreSnapshot());
      } else if (this.currentScreen === "equipment") {
        this.renderEquipment(this.getStoreSnapshot());
      } else if (this.currentScreen === "shop") {
        this.renderShop(this.getStoreSnapshot());
      }
    };
    this.bus.on("battle:state", handleMutationLockUpdate);
    this.bus.on("battle:ended", () => {
      handleMutationLockUpdate();
      this._clearBattleTickers();
    });
    this.bus.on("battle:start", handleMutationLockUpdate);
    if (this.client && typeof this.client.on === "function") {
      this.client.on("battle:state", handleMutationLockUpdate);
      this.client.on("battle:ended", () => {
        handleMutationLockUpdate();
        this._clearBattleTickers();
      });
      this.client.on("battle:start", handleMutationLockUpdate);
    }
    this.bus.on("battle:countdown-beat", (beat) => this.handleCountdownBeat(beat));
    this.bus.on("battle:effect", (effect) => this.playBattleEffect(effect));
    this.bus.on("battle:damage-logged", (event) => this.addDamageLogEntry(event));
    this.bus.on("battle:start", () => {
      this.recentDamageLog = [];
      if (this.battleDamageLogList) this.battleDamageLogList.innerHTML = "";
      if (this.battleDamageLog) this.battleDamageLog.hidden = false;
    });
    this.bus.on("qte:update", (state) => {
      if (this.dojoQteActive) {
        this.renderDojoQte(state);
      } else {
        this.renderQte(state);
      }
    });
    this.bus.on("dualQte:update", (state) => {
      if (this.dojoQteActive) {
        this.renderDojoQte(state);
      } else {
        this.renderQte(state);
      }
    });
    this.bus.on("qte:step", (data) => this.flashQteCorrect(data));
    this.bus.on("qte:wrong", (data) => this.flashQteWrong(data?.slot, data?.received));
    this.bus.on("qte:finished", (result) => {
      if (this.dojoQteActive) {
        this.handleDojoQteFinished(result);
      } else {
        this.handleQteFinished(result);
      }
    });
    this.bus.on("dualQte:finished", (result) => {
      if (this.dojoQteActive) {
        this.handleDojoQteFinished(result);
      } else {
        this.handleQteFinished(result);
      }
    });
    this.bus.on("postbattle:state", (state) => this.renderPostBattle(state));
    this.bus.on("postbattle:auto-watermelon", (state) => this.renderFloatingWatermelon(state));
    this.bus.on("toast", (toast) => this.showToast(toast));
    this.bus.on("auto-battle:update", (info) => {
      const msg = info.won
        ? I18n.t("ui.autoBattleToastUpdateWin", { remaining: info.remainingRounds })
        : I18n.t("ui.autoBattleToastUpdateLoss", { remaining: info.remainingRounds });
      this.showToast(msg, info.won ? "success" : "danger");
      if (this.battle?.autoBattle?.active && !this.battle?.autoBattle?.isPaused && this.postBattle?.getWatermelonStock() > 0) {
        this.postBattle.emitAutoWatermelon();
      }
    });
    this.bus.on("auto-battle:finished", (info) => {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
      this.showToast(I18n.t("ui.autoBattleToastFinished", { total: info.totalRounds, wins: info.wins, losses: info.losses }), "success");
      this.requestNavigation("stages");
    });
    this.bus.on("auto-battle:paused", (info) => {
      this.updateAutoBattleButton(true, info);
      this.hideFloatingWatermelon();
    });
    this.bus.on("auto-battle:resumed", (info) => {
      this.updateAutoBattleButton(false, info);
      if (this.postBattle?.getWatermelonStock() > 0) {
        this.postBattle.emitAutoWatermelon();
      }
    });
    this.bus.on("auto-battle:stopped", () => {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
    });
  }

  handleCountdownBeat(beat) {
    const playerHand = $("#player-hand-display");
    const enemyHand = $("#enemy-hand-display");
    const countdownBox = $("#round-countdown");
    const countdownVal = $("#countdown-value");

    if (beat && typeof beat.count === "number") {
      this._lastCountdownSec = beat.count;
      if (countdownVal) {
        countdownVal.textContent = String(beat.count);
      }
    }

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

    try {
      this.bus.emit("sound", { name: "select" });
    } catch (_) {}
  }

  async handleClick(event) {
    const pressedButton = event.target.closest("button, [role='button'], [data-nav], [data-allocate], [data-allocate-skill], [data-buy], [data-buy-equip], [data-slot], [data-equip-bag-item], .pill-btn, .tab-pill, .button-primary, .button-secondary, .button-ghost, .menu-command");
    if (pressedButton && !pressedButton.classList?.contains?.("brand-button")) {
      pressedButton.classList.remove("is-btn-pressed");
      void pressedButton.offsetWidth;
      pressedButton.classList.add("is-btn-pressed");
      setTimeout(() => pressedButton.classList.remove("is-btn-pressed"), 180);
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        try { navigator.vibrate(12); } catch (_) {}
      }
    }

    if (event.target.closest("#lang-toggle")) {
      I18n.cycleLocale();
      this.renderI18n();
      this.renderStore(this.getStoreSnapshot());
      if (this.battleState?.active) {
        this.renderBattle(this.battleState);
      }
      this.bus.emit("sound", { name: "select" });
      return;
    }

    const navButton = event.target.closest("[data-nav]");
    if (navButton) {
      if (navButton.dataset.nav === "dojo") {
        this.openDojoModal();
        return;
      }
      if (this.saveRecordModal && !this.saveRecordModal.hidden) {
        this.closeSaveRecordModal();
      }
      this.requestNavigation(navButton.dataset.nav);
      return;
    }

    if (event.target.closest("#open-dojo-modal")) {
      this.openDojoModal();
      return;
    }

    if (event.target.closest("#close-dojo-modal") || event.target === this.dojoModal) {
      this.closeDojoModal();
      return;
    }

    const dojoTabBtn = event.target.closest(".dojo-tab-btn[data-dojo-mode]");
    if (dojoTabBtn) {
      this.dojoMode = dojoTabBtn.dataset.dojoMode;
      try {
        window.localStorage?.setItem("koraku_dojo_mode", this.dojoMode);
      } catch (_) {}
      document.querySelectorAll(".dojo-tab-btn[data-dojo-mode]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.dojoMode === this.dojoMode);
      });
      const p1 = $("#dojo-mode1-panel");
      const p2 = $("#dojo-mode2-panel");
      if (p1) p1.hidden = this.dojoMode !== "1";
      if (p2) p2.hidden = this.dojoMode !== "2";
      return;
    }

    const dojoStyleCard = event.target.closest(".dojo-style-card");
    if (dojoStyleCard) {
      const radio = dojoStyleCard.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const groupName = radio.name;
        document.querySelectorAll(`input[name="${groupName}"]`).forEach((r) => {
          r.closest(".dojo-style-card")?.classList.toggle("is-selected", r.checked);
        });
      }
      return;
    }

    const chipHpBtn = event.target.closest(".preset-chips .chip-btn[data-hp]");
    if (chipHpBtn) {
      const hpInput = $("#dojo-custom-hp");
      if (hpInput) hpInput.value = chipHpBtn.dataset.hp;
      chipHpBtn.closest(".preset-chips")?.querySelectorAll(".chip-btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn === chipHpBtn);
      });
      return;
    }

    const chipDmgBtn = event.target.closest(".preset-chips .chip-btn[data-dmg]");
    if (chipDmgBtn) {
      const dmgInput = $("#dojo-custom-dmg");
      if (dmgInput) dmgInput.value = chipDmgBtn.dataset.dmg;
      chipDmgBtn.closest(".preset-chips")?.querySelectorAll(".chip-btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn === chipDmgBtn);
      });
      return;
    }

    if (event.target.closest("#btn-start-dojo-practice")) {
      if (this.dojoMode === "1") {
        const style = document.querySelector('input[name="dojo-mode1-style"]:checked')?.value || "single";
        this.closeDojoModal({ popHistory: false });
        this.startDojoQte(style);
      } else {
        const style = document.querySelector('input[name="dojo-mode2-style"]:checked')?.value || "single";
        const customHp = Number($("#dojo-custom-hp")?.value) || 10000;
        const customDamage = Number($("#dojo-custom-dmg")?.value) || 0;
        this.closeDojoModal({ popHistory: false });
        this.startDojoSandbox({ isDual: style === "dual", customHp, customDamage });
      }
      return;
    }

    if (event.target.closest("#btn-exit-dojo-qte")) {
      this.stopDojoQte();
      this.navigate("home");
      return;
    }

    const autoStageBtn = event.target.closest("[data-auto-stage]");
    if (autoStageBtn) {
      const stageId = Number(autoStageBtn.dataset.autoStage);
      this.openAutoBattleModal(stageId);
      return;
    }

    const stageButton = event.target.closest("[data-stage]");
    if (stageButton) {
      this.startStage(Number(stageButton.dataset.stage));
      return;
    }

    if (event.target.closest("#close-auto-battle-modal") || event.target.closest("#btn-cancel-autobattle")) {
      this.closeAutoBattleModal();
      return;
    }

    const countBtn = event.target.closest("[data-battle-count]");
    if (countBtn) {
      this.selectedAutoBattleCount = Number(countBtn.dataset.battleCount) || 10;
      document.querySelectorAll("[data-battle-count]").forEach((btn) => {
        btn.classList.toggle("is-active", Number(btn.dataset.battleCount) === this.selectedAutoBattleCount);
      });
      return;
    }

    if (event.target.closest("#btn-start-autobattle-confirm")) {
      if (this.selectedAutoStageId) {
        this.startAutoBattle(this.selectedAutoStageId, this.selectedAutoBattleCount || 10);
      }
      return;
    }

    const toggleAutoBtn = event.target.closest("#btn-toggle-autobattle, #btn-stop-autobattle");
    if (toggleAutoBtn) {
      if (this.battle?.autoBattle?.active) {
        if (this.battle.autoBattle.isPaused) {
          await this.sendCommand(Commands.BATTLE_RESUME);
          this.showToast(I18n.t("ui.autoBattleToastResumed"), "success");
          if (this.postBattle?.getWatermelonStock() > 0) {
            this.postBattle.emitAutoWatermelon();
          }
        } else {
          await this.sendCommand(Commands.BATTLE_PAUSE);
          this.hideFloatingWatermelon();
          this.showToast(I18n.t("ui.autoBattleToastPaused"), "warning");
        }
      }
      return;
    }

    const buyButton = event.target.closest("[data-buy]");
    if (buyButton) {
      const result = await this.sendCommand(Commands.BUY_ITEM, { itemId: buyButton.dataset.buy });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "heal" });
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
      const result = await this.sendCommand(Commands.BUY_EQUIPMENT, { typeId: buyEquipBtn.dataset.buyEquip, itemId: buyEquipBtn.dataset.buyEquip });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "heal" });
      return;
    }

    const bagItemBtn = event.target.closest("[data-equip-bag-item]");
    if (bagItemBtn) {
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const typeId = bagItemBtn.dataset.equipBagItem;
      const slot = EQUIPMENT_ITEMS[typeId]?.slot || "mainHand";
      const result = await this.sendCommand(Commands.EQUIP_ITEM, { uid: typeId, typeId, itemId: typeId, slot });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "skill" });
      this.hideTooltip();
      return;
    }

    const shopEquipBtn = event.target.closest("[data-shop-equip]");
    if (shopEquipBtn) {
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const itemId = shopEquipBtn.dataset.shopEquip;
      const slot = EQUIPMENT_ITEMS[itemId]?.slot || "mainHand";
      const result = await this.sendCommand(Commands.EQUIP_ITEM, { uid: itemId, typeId: itemId, itemId, slot });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "skill" });
      this.hideTooltip();
      return;
    }

    const shopUnequipBtn = event.target.closest("[data-shop-unequip]");
    if (shopUnequipBtn) {
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const slotKey = shopUnequipBtn.dataset.shopUnequip;
      const result = await this.sendCommand(Commands.UNEQUIP_ITEM, { slot: slotKey });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "select" });
      this.hideTooltip();
      return;
    }

    if (event.target.closest("#btn-resume-battle")) {
      await this.sendCommand(Commands.BATTLE_RESUME);
      return;
    }

    if (event.target.closest("#btn-pause-abandon")) {
      await this.sendCommand(Commands.BATTLE_ABANDON);
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
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const slotKey = slotBtn.dataset.slot;
      const snapshot = this.getStoreSnapshot();
      if (snapshot.equipment?.[slotKey]) {
        const result = await this.sendCommand(Commands.UNEQUIP_ITEM, { slot: slotKey });
        if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
        if (result?.ok) this.bus.emit("sound", { name: "select" });
        this.hideTooltip();
      }
      return;
    }

    if (event.target.closest("#open-cheat-modal")) {
      this.openCheatModal();
      return;
    }

    if (event.target.closest("#close-cheat-auth-modal") || event.target.closest("#btn-cheat-auth-cancel") || event.target === this.cheatAuthModal) {
      this.closeCheatAuthModal();
      return;
    }

    if (event.target.closest("#close-cheat-modal") || event.target === this.cheatModal) {
      this.closeCheatModal();
      return;
    }

    if (event.target.closest("#cheat-unlock-stages-btn")) {
      const res = await this.sendCommand(Commands.CHEAT_UNLOCK_ALL, { stages: true });
      if (res?.ok === false || res?.ack === false) {
        this.showToast(res?.message || res?.error || "解鎖關卡失敗", "danger");
        return;
      }
      this.showToast(res?.message || "已解鎖全部關卡！", "success");
      this.renderStore();
      this.populateCheatModal();
      return;
    }

    if (event.target.closest("#cheat-unlock-gallery-btn")) {
      const res = await this.sendCommand(Commands.CHEAT_UNLOCK_ALL, { gallery: true });
      if (res?.ok === false || res?.ack === false) {
        this.showToast(res?.message || res?.error || "解鎖圖鑑失敗", "danger");
        return;
      }
      this.showToast(res?.message || "已解鎖全圖鑑！", "success");
      this.renderStore();
      this.populateCheatModal();
      return;
    }

    if (event.target.closest("#cheat-max-all-btn")) {
      const res = await this.sendCommand(Commands.CHEAT_SET_STATS, {
        level: 99,
        xp: 0,
        skillPoints: 100,
        coins: 99999,
        hpPotion: 99,
        mpPotion: 99,
        skills: { momo: 10 }
      });
      if (res?.ok === false || res?.ack === false) {
        this.showToast(res?.message || res?.error || "設置數值失敗", "danger");
        return;
      }
      this.showToast(res?.message || "已一鍵設置滿級、99999 星砂與 100 SP！", "success");
      this.renderStore();
      this.populateCheatModal();
      return;
    }

    const growthTabBtn = event.target.closest("[data-growth-tab]");
    if (growthTabBtn) {
      this.activeGrowthTab = growthTabBtn.dataset.growthTab;
      try {
        window.localStorage?.setItem("koraku_growth_tab", this.activeGrowthTab);
      } catch (_) {}
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
      try {
        window.localStorage?.setItem("koraku_shop_filter", this.activeShopFilter);
      } catch (_) {}
      document.querySelectorAll("[data-shop-filter], [data-shop-tab]").forEach((btn) => {
        const btnFilter = btn.dataset.shopFilter || btn.dataset.shopTab;
        btn.classList.toggle("is-active", btnFilter === this.activeShopFilter);
      });
      this.renderShop(this.getStoreSnapshot());
      return;
    }

    const guideTabBtn = event.target.closest("[data-guide-tab]");
    if (guideTabBtn) {
      this.activeGuideTab = guideTabBtn.dataset.guideTab;
      try {
        window.localStorage?.setItem("koraku_guide_tab", this.activeGuideTab);
      } catch (_) {}
      document.querySelectorAll("[data-guide-tab]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.guideTab === this.activeGuideTab);
      });
      const basicsGrid = $("#guide-basics-grid");
      const bossGrid = $("#guide-boss-grid");
      if (basicsGrid) basicsGrid.hidden = this.activeGuideTab !== "basics";
      if (bossGrid) bossGrid.hidden = this.activeGuideTab !== "boss";
      if (this.activeGuideTab === "boss") {
        this.renderGuideBoss(this.getStoreSnapshot());
      }
      return;
    }

    const allocateButton = event.target.closest("[data-allocate]");
    if (allocateButton) {
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const result = await this.sendCommand(Commands.ALLOCATE_STAT, { stat: allocateButton.dataset.allocate });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "skill" });
      return;
    }

    const allocateSkillButton = event.target.closest("[data-allocate-skill]");
    if (allocateSkillButton) {
      if (this.isMutationLocked()) {
        this.showToast(I18n.t("battle.lockedDuringBattle"), "danger");
        return;
      }
      const skillId = allocateSkillButton.dataset.allocateSkill;
      const result = await this.sendCommand(Commands.ALLOCATE_SKILL, { skillId, skill: skillId });
      if (result?.message || result?.key) this.showToast({ ...result, tone: result.ok ? "success" : "danger" });
      if (result?.ok) this.bus.emit("sound", { name: "skill" });
      return;
    }

    const galleryVariantBtn = event.target.closest("[data-gallery-variant]");
    if (galleryVariantBtn) {
      this.selectedGalleryItem = galleryVariantBtn.dataset.galleryVariant;
      try {
        window.localStorage?.setItem("koraku_gallery_item", this.selectedGalleryItem);
      } catch (_) {}
      this.renderGallery(this.getStoreSnapshot());
      return;
    }

    const targetEnemyBtn = event.target.closest("[data-target-enemy]");
    if (targetEnemyBtn && this.battleState?.active) {
      await this.sendCommand(Commands.BATTLE_SELECT_TARGET, { target: targetEnemyBtn.dataset.targetEnemy });
      return;
    }

    const dualHandButton = event.target.closest("[data-hand-slot][data-hand]");
    if (dualHandButton && this.battleState?.active) {
      await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: dualHandButton.dataset.hand, slot: dualHandButton.dataset.handSlot });
      return;
    }

    const handButton = event.target.closest("[data-hand]");
    if (handButton && this.battleState?.active) {
      await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: handButton.dataset.hand });
      return;
    }

    const itemButton = event.target.closest("[data-item]");
    if (itemButton) {
      const result = await this.sendCommand(Commands.BATTLE_USE_ITEM, { itemId: itemButton.dataset.item });
      if (result && !result.ok && (result.message || result.key)) this.showToast({ ...result, tone: "danger" });
      return;
    }

    if (event.target.closest("[data-skill='morph']")) {
      const result = await this.sendCommand(Commands.BATTLE_USE_MORPH);
      if (result && !result.ok && (result.message || result.key)) this.showToast({ ...result, tone: "danger" });
      return;
    }

    const postButton = event.target.closest("[data-post-action]");
    if (postButton) {
      this.handlePostAction(postButton.dataset.postAction);
      return;
    }

    if (event.target.closest("#btn-confirm-abandon")) {
      this.confirmAbandonBattle();
      return;
    }

    if (event.target.closest("#btn-cancel-abandon")) {
      this.closeAbandonModal();
      return;
    }

    if (event.target.closest("#btn-toggle-settlement-ui")) {
      const isHidden = this.resultOverlay.classList.toggle("is-ui-hidden");
      const btn = $("#btn-toggle-settlement-ui");
      if (btn) {
        const eyeOpen = btn.querySelector(".icon-eye-open");
        const eyeClosed = btn.querySelector(".icon-eye-closed");
        const label = btn.querySelector("#settlement-toggle-ui-text");
        if (eyeOpen) eyeOpen.style.display = isHidden ? "none" : "";
        if (eyeClosed) eyeClosed.style.display = isHidden ? "" : "none";
        if (label) label.textContent = isHidden ? I18n.t("ui.showSettlementUi") : I18n.t("ui.hideSettlementUi");
      }
      return;
    }

    if (event.target.closest("#watermelon-strike")) {
      await this.sendCommand(Commands.POST_BATTLE_STRIKE_WATERMELON);
      return;
    }

    if (event.target.closest("#btn-auto-watermelon-strike")) {
      await this.sendCommand(Commands.POST_BATTLE_STRIKE_WATERMELON);
      return;
    }

    if (event.target.closest("#btn-auto-watermelon-next-strike, #btn-auto-watermelon-next-round, #btn-auto-watermelon-start")) {
      await this.sendCommand(Commands.POST_BATTLE_START_WATERMELON);
      return;
    }

    if (event.target.closest("#btn-toggle-watermelon-zoom")) {
      this.isWatermelonZoomed = !this.isWatermelonZoomed;
      const floating = $("#floating-autobattle-watermelon");
      if (floating) {
        floating.classList.toggle("is-zoomed", this.isWatermelonZoomed);
      }
      const zoomBtn = $("#btn-toggle-watermelon-zoom");
      if (zoomBtn) {
        zoomBtn.textContent = this.isWatermelonZoomed ? "🔍 1x" : "🔍 2.5x";
      }
      if (floating && this.hudDragController) {
        this.hudDragController.applyPosition("watermelon");
      }
      return;
    }

    if (event.target.closest("#btn-close-floating-watermelon")) {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
      return;
    }

    if (event.target.closest("#abandon-battle")) {
      this.requestNavigation("stages");
      return;
    }

    if (event.target.closest("#music-toggle")) {
      const muted = this.store?.toggleMusicMuted ? this.store.toggleMusicMuted() : false;
      this.updateAudioToggles();
      if (this.sound) {
        this.sound.updateMusicState();
      }
      this.showToast(muted ? I18n.t("ui.musicOffToast") : I18n.t("ui.musicOnToast"));
      return;
    }

    if (event.target.closest("#sound-toggle")) {
      const muted = this.store?.toggleSfxMuted ? this.store.toggleSfxMuted() : false;
      this.updateAudioToggles();
      if (this.sound) {
        this.sound.updateMusicState();
      }
      this.showToast(muted ? I18n.t("ui.sfxOffToast") : I18n.t("ui.sfxOnToast"));
      return;
    }

    if (event.target.closest("#btn-gallery-diff")) {
      this.gallerySwimsuitDiff = (this.gallerySwimsuitDiff === "watermelon") ? "default" : "watermelon";
      this.renderGallery(this.getStoreSnapshot());
      this.bus.emit("sound", { name: "select" });
      return;
    }

    if (event.target.closest("#btn-gallery-zoom") || (event.target.closest("#gallery-image") && !this.galleryArtFrame?.classList.contains("is-locked"))) {
      this.openGalleryLightbox();
      return;
    }

    if (event.target.closest("#open-save-record-modal")) {
      this.openSaveRecordModal();
      return;
    }

    if (event.target.closest("#close-save-record-modal") || event.target === this.saveRecordModal) {
      this.closeSaveRecordModal();
      return;
    }

    if (event.target.closest("#btn-copy-save-seed")) {
      this.handleCopySaveSeed();
      return;
    }

    if (event.target.closest("#btn-import-save-seed")) {
      this.handleImportSaveSeed();
      return;
    }

    if (event.target.closest("#btn-switch-to-online")) {
      if (typeof window !== "undefined") {
        try {
          window.localStorage?.setItem("koraku_mode", "online");
        } catch (_) {}
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("mode");
          url.searchParams.set("mode", "online");
          window.location.href = url.toString();
        } catch (_) {
          window.location.reload();
        }
      }
      return;
    }

    if (event.target.closest("#btn-modal-reset-save, #reset-save")) {
      this.handleResetSave();
      return;
    }

    if (event.target.closest("#btn-close-lightbox") || event.target.closest("#gallery-lightbox-backdrop")) {
      this.closeGalleryLightbox();
      return;
    }

    if (event.target.closest("#footer-app-version-btn, #footer-app-version")) {
      this.openChangelogModal();
      return;
    }

    if (event.target.closest("#close-changelog-modal, #btn-close-changelog") || event.target === this.changelogModal) {
      this.closeChangelogModal();
      return;
    }
  }

  async handleKeydown(event) {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("has-physical-keyboard");
      if (document.body) document.body.classList.add("has-physical-keyboard");
    }

    const abandonModal = $("#battle-abandon-modal");
    if (event.key === "Escape" && abandonModal && !abandonModal.hidden) {
      this.closeAbandonModal();
      return;
    }

    if (event.key === "Escape" && this.changelogModal && !this.changelogModal.hidden) {
      this.closeChangelogModal();
      return;
    }

    if (event.key === "Escape" && this.dojoModal && !this.dojoModal.hidden) {
      this.closeDojoModal();
      return;
    }

    if (this.dojoQteActive) {
      if (event.key === "Escape") {
        event.preventDefault();
        this.stopDojoQte();
        this.navigate("home");
        return;
      }

      if (this.dojoQteStyle === "dual" && this.dojoDualQteSystem?.active) {
        const isLeftActive = !this.dojoDualQteSystem.left?.completed;
        const isRightActive = !this.dojoDualQteSystem.right?.completed;
        const leftExpected = isLeftActive ? this.dojoDualQteSystem.left?.sequence[this.dojoDualQteSystem.left?.index] : null;
        const rightExpected = isRightActive ? this.dojoDualQteSystem.right?.sequence[this.dojoDualQteSystem.right?.index] : null;

        if (isLeftActive) {
          const leftInput = this.leftQteKeyboard.keyDown(event.key, leftExpected, event.repeat, event.code);
          if (leftInput.handled) {
            event.preventDefault();
            if (leftInput.direction) {
              this.dojoDualQteSystem.input(leftInput.direction, "left");
              this.leftQteKeyboard.reset();
            }
            return;
          }
        }

        if (isRightActive) {
          const rightInput = this.rightQteKeyboard.keyDown(event.key, rightExpected, event.repeat, event.code);
          if (rightInput.handled) {
            event.preventDefault();
            if (rightInput.direction) {
              this.dojoDualQteSystem.input(rightInput.direction, "right");
              this.rightQteKeyboard.reset();
            }
            return;
          }
        }
        return;
      }

      if (this.dojoQteStyle !== "dual" && this.dojoQteSystem?.active) {
        const expected = this.dojoQteSystem.sequence[this.dojoQteSystem.index];
        const input = this.qteKeyboard.keyDown(event.key, expected, event.repeat, event.code);
        if (input.handled) {
          event.preventDefault();
          if (input.direction) {
            this.dojoQteSystem.input(input.direction);
            this.qteKeyboard.reset();
          }
        }
        return;
      }
    }

    if (event.key === "Escape" && this.saveRecordModal && !this.saveRecordModal.hidden) {
      this.closeSaveRecordModal();
      return;
    }

    if (event.key === "Escape" && this.galleryLightboxModal && !this.galleryLightboxModal.hidden) {
      this.closeGalleryLightbox();
      return;
    }

    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      window.history.back();
      return;
    }

    const key = event.key.toLowerCase();

    // Secret Cheat Trigger: Numpad 8 (or 8 key) pressed 4 times within 1000ms
    const isNumpad8 = event.code === "Numpad8" || event.key === "8" || (event.code === "Digit8" && event.key === "8");
    if (isNumpad8) {
      const now = performance.now();
      if (!this.cheatKeypressTimestamps) this.cheatKeypressTimestamps = [];
      this.cheatKeypressTimestamps = this.cheatKeypressTimestamps.filter((t) => now - t <= 1000);
      this.cheatKeypressTimestamps.push(now);
      if (this.cheatKeypressTimestamps.length >= 4) {
        this.cheatKeypressTimestamps = [];
        this.openCheatModal();
        this.showToast("⚙️ 作弊選單已喚起！", "success");
        return;
      }
    }

    const floatingEl = $("#floating-autobattle-watermelon");
    const isAutoWatermelonActive = Boolean(this.postBattle?.autoWatermelonState?.active) &&
      Boolean(this.battle?.autoBattle?.active) &&
      !this.battle?.autoBattle?.isPaused &&
      Boolean(floatingEl && !floatingEl.hidden);

    if (isAutoWatermelonActive && (event.code === "Space" || key === " ")) {
      event.preventDefault();
      const scene = this.postBattle?.autoWatermelonState?.scene;
      if (scene === "watermelonAim") {
        await this.sendCommand(Commands.POST_BATTLE_STRIKE_WATERMELON);
        return;
      }
      if (["watermelonResult", "watermelonComplete", "idle"].includes(scene)) {
        await this.sendCommand(Commands.POST_BATTLE_START_WATERMELON);
        return;
      }
    }

    const isPostActive = Boolean(this.postState) && this.resultOverlay?.classList.contains("is-active");

    if (isPostActive) {
      if (event.code === "Space" || key === " ") {
        event.preventDefault();
        if (this.postState.scene === "victory") {
          await this.sendCommand(Commands.POST_BATTLE_REQUEST_SWIMSUIT);
          return;
        }
        if (this.postState.scene === "watermelonAim") {
          await this.sendCommand(Commands.POST_BATTLE_STRIKE_WATERMELON);
          return;
        }
        if (["swimsuit", "watermelonResult"].includes(this.postState.scene)) {
          await this.sendCommand(Commands.POST_BATTLE_START_WATERMELON);
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
        await this.sendCommand(this.battleState.isPaused ? Commands.BATTLE_RESUME : Commands.BATTLE_PAUSE);
        return;
      }
    }

    if (!this.battleState?.active || this.battleState.isPaused) return;
    if (this.battleState.phase === "qte") {
      if (this.qteState?.mode === "dual") {
        const isLeftActive = !this.qteState.left?.completed;
        const isRightActive = !this.qteState.right?.completed;
        const leftExpected = isLeftActive ? this.qteState.left?.sequence[this.qteState.left?.index] : null;
        const rightExpected = isRightActive ? this.qteState.right?.sequence[this.qteState.right?.index] : null;

        if (isLeftActive) {
          const leftInput = this.leftQteKeyboard.keyDown(event.key, leftExpected, event.repeat, event.code);
          if (leftInput.handled) {
            event.preventDefault();
            if (leftInput.direction) {
              await this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: leftInput.direction, slot: "left" });
              this.leftQteKeyboard.reset();
            }
            this.renderHeldQteDirections();
            return;
          }
        }

        if (isRightActive) {
          const rightInput = this.rightQteKeyboard.keyDown(event.key, rightExpected, event.repeat, event.code);
          if (rightInput.handled) {
            event.preventDefault();
            if (rightInput.direction) {
              await this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: rightInput.direction, slot: "right" });
              this.rightQteKeyboard.reset();
            }
            this.renderHeldQteDirections();
            return;
          }
        }
        return;
      }

      // Single QTE mode
      const expected = this.qteState?.sequence[this.qteState.index];
      const input = this.qteKeyboard.keyDown(event.key, expected, event.repeat, event.code);
      if (input.handled) {
        event.preventDefault();
        if (input.direction) {
          await this.sendCommand(Commands.BATTLE_INPUT_QTE, { direction: input.direction });
          this.qteKeyboard.reset();
        }
        this.renderHeldQteDirections();
      }
      return;
    }

    if (this.battleState.phase === "countdown" || (this.battleState.phase === "reaction" && this.battleState.morphActive)) {
      const isDualHands = Boolean(this.battleState.hasDualHandSkill);
      if (isDualHands) {
        const leftHandByKey = { "1": "rock", "2": "paper", "3": "scissors", "q": "rock", "w": "paper", "e": "scissors" };
        const rightHandByKey = {
          "7": "rock", "8": "paper", "9": "scissors",
          "j": "rock", "k": "paper", "l": "scissors"
        };
        if (leftHandByKey[key]) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: leftHandByKey[key], slot: "left" });
          return;
        } else if (rightHandByKey[key]) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: rightHandByKey[key], slot: "right" });
          return;
        } else if (["numpad7", "numpad1"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "rock", slot: "right" });
          return;
        } else if (["numpad8", "numpad2"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "paper", slot: "right" });
          return;
        } else if (["numpad9", "numpad3"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "scissors", slot: "right" });
          return;
        }
      } else {
        const handByKey = { "1": "rock", "2": "paper", "3": "scissors", "j": "rock", "k": "paper", "l": "scissors" };
        if (handByKey[key]) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: handByKey[key] });
          return;
        } else if (["numpad7", "numpad1"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "rock" });
          return;
        } else if (["numpad8", "numpad2"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "paper" });
          return;
        } else if (["numpad9", "numpad3"].includes(event.code.toLowerCase())) {
          await this.sendCommand(Commands.BATTLE_SELECT_HAND, { hand: "scissors" });
          return;
        }
      }
    }

    const canUseQeForPotions = !this.battleState.hasDualHandSkill;
    if (["4", "h"].includes(key) || (canUseQeForPotions && key === "q")) {
      const result = await this.sendCommand(Commands.BATTLE_USE_ITEM, { itemId: "hpPotion" });
      if (result && !result.ok && this.battleState.phase !== "ended" && (result.message || result.key)) {
        this.showToast({ ...result, tone: "danger" });
      }
    } else if (["5", "m"].includes(key) || (canUseQeForPotions && key === "e")) {
      const result = await this.sendCommand(Commands.BATTLE_USE_ITEM, { itemId: "mpPotion" });
      if (result && !result.ok && this.battleState.phase !== "ended" && (result.message || result.key)) {
        this.showToast({ ...result, tone: "danger" });
      }
    } else if (key === "f") {
      if (this.battleState.phase === "reaction") {
        const result = await this.sendCommand(Commands.BATTLE_USE_MORPH);
        if (result && !result.ok && (result.message || result.key)) this.showToast({ ...result, tone: "danger" });
      }
    }
  }

  handleKeyup(event) {
    if (this.dojoQteActive) {
      if (this.dojoQteStyle === "dual") {
        this.leftQteKeyboard.keyUp(event.key, event.code);
        this.rightQteKeyboard.keyUp(event.key, event.code);
      } else {
        this.qteKeyboard.keyUp(event.key, event.code);
      }
      return;
    }

    if (!this.qteState?.active) return;
    if (this.qteState?.mode === "dual") {
      const leftUp = this.leftQteKeyboard.keyUp(event.key, event.code);
      const rightUp = this.rightQteKeyboard.keyUp(event.key, event.code);
      if (leftUp || rightUp) {
        this.renderHeldQteDirections();
      }
    } else {
      if (this.qteKeyboard.keyUp(event.key, event.code)) {
        this.renderHeldQteDirections();
      }
    }
  }

  async requestNavigation(screenName) {
    if (screenName !== "battle") {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
      this.battleArena?.classList.remove("is-settlement");
      if (this.battleState?.active) {
        const isDojo = Boolean(this.battleState.stage?.isDojo);
        if (!isDojo) {
          const promptText = I18n.t("ui.confirmAbandonBattle") || "現在撤退將不會得到星砂或經驗，確定離開嗎？";
          const confirmed = window.confirm(promptText);
          if (!confirmed) return;
        }
        await this.sendCommand(Commands.AUTO_BATTLE_STOP);
        await this.sendCommand(Commands.BATTLE_ABANDON);
      } else if (this.battle?.autoBattle?.active) {
        await this.sendCommand(Commands.AUTO_BATTLE_STOP);
      }
    }
    this.navigate(screenName);
  }

  navigate(screenName, options = {}) {
    if ((this.currentScreen === "dojo-qte" || this.dojoQteActive) && screenName !== "dojo-qte") {
      this.stopDojoQte();
    }
    this.currentScreen = screenName;
    this.bus.emit("bgm:scene", { scene: screenName === "battle" ? "battle" : "lobby" });
    if (this.sound) {
      this.sound.setBgmScene(screenName === "battle" ? "battle" : "lobby");
    }
    if (screenName !== "battle") {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
      this._clearBattleTickers();
    }
    try {
      sessionStorage.setItem("koraku_active_screen", screenName);
    } catch (_) {}

    if (options.pushHistory !== false && typeof window !== "undefined" && window.history) {
      const targetHash = "#" + screenName;
      if (window.location.hash !== targetHash) {
        window.history.pushState({ screen: screenName }, "", targetHash);
      } else if (window.history.state?.screen !== screenName) {
        window.history.replaceState({ screen: screenName }, "", targetHash);
      }
    }

    const next = $("#screen-" + screenName);
    if (!next) return;
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("is-active", "is-entering");
      screen.hidden = true;
    });
    next.classList.add("is-active", "is-entering");
    next.hidden = false;
    this.currentScreen = screenName;
    this.app.dataset.screen = screenName;
    next.scrollTop = 0;
    if (screenName === "gallery") {
      this.renderGallery(this.getStoreSnapshot());
    } else if (screenName === "records") {
      this.renderHomeRecords(this.getStoreSnapshot());
    }
  }

  async startStage(stageId) {
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    await this.sendCommand(Commands.AUTO_BATTLE_STOP);
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay?.classList.remove("is-active");
    this.resultOverlay?.setAttribute("aria-hidden", "true");
    this.navigate("battle");
    await this.sendCommand(Commands.BATTLE_START, { stageId });
  }

  openAutoBattleModal(stageId) {
    const snapshot = this.getStoreSnapshot();
    const stage = STAGES.find((s) => s.id === stageId);
    if (!stage) return;
    const isCleared = (snapshot.records?.clearedStages || []).includes(stageId);
    const locked = !isCleared && snapshot.profile.level < stage.requiredLevel;
    const stageStat = snapshot.records?.stageStats?.[stageId] || { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
    const hasWins = isCleared || ((stageStat.manualWins || 0) + (stageStat.autoWins || 0)) > 0 || (stageId === 1 && ((snapshot.records?.wins || 0) > 0 || (snapshot.records?.manualWins || 0) > 0));
    const cleared = isCleared && hasWins;
    if (locked || !cleared) {
      this.showToast(I18n.t("ui.mustClearOnceForAuto"), "danger");
      return;
    }

    this.selectedAutoStageId = stageId;
    this.selectedAutoBattleCount = 10;
    const locStage = I18n.getLocalizedStage(stage || { chapter: "", name: "" });
    const titleEl = $("#auto-battle-stage-title");
    if (titleEl) titleEl.textContent = `${locStage.chapter}・${locStage.name}`;

    document.querySelectorAll("[data-battle-count]").forEach((btn) => {
      btn.classList.toggle("is-active", Number(btn.dataset.battleCount) === this.selectedAutoBattleCount);
    });

    const modal = $("#auto-battle-modal");
    if (modal) {
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
    }
  }

  closeAutoBattleModal() {
    const modal = $("#auto-battle-modal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  }

  async startAutoBattle(stageId, rounds = 10) {
    const snapshot = this.getStoreSnapshot();
    const stage = STAGES.find((s) => s.id === stageId);
    if (!stage) return;
    const isCleared = (snapshot.records?.clearedStages || []).includes(stageId);
    const locked = !isCleared && snapshot.profile.level < stage.requiredLevel;
    const stageStat = snapshot.records?.stageStats?.[stageId] || { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
    const hasWins = isCleared || ((stageStat.manualWins || 0) + (stageStat.autoWins || 0)) > 0 || (stageId === 1 && ((snapshot.records?.wins || 0) > 0 || (snapshot.records?.manualWins || 0) > 0));
    const cleared = isCleared && hasWins;
    if (locked || !cleared) {
      this.showToast(I18n.t("ui.mustClearOnceForAuto"), "danger");
      return;
    }

    this.closeAutoBattleModal();
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay?.classList.remove("is-active");
    this.resultOverlay?.setAttribute("aria-hidden", "true");
    this.navigate("battle");
    await this.sendCommand(Commands.AUTO_BATTLE_START, { stageId, rounds });
  }

  updateAudioToggles(rawState) {
    const state = rawState || this.getStoreSnapshot() || {};
    const isMusicMuted = Boolean(state.settings?.musicMuted);
    const isSfxMuted = Boolean(state.settings?.sfxMuted ?? state.settings?.muted);

    const musicToggle = $("#music-toggle");
    if (musicToggle) {
      const label = isMusicMuted ? I18n.t("ui.musicToggleOn") : I18n.t("ui.musicToggleOff");
      musicToggle.setAttribute("aria-label", label);
      musicToggle.setAttribute("title", label);
      musicToggle.classList.toggle("is-muted", isMusicMuted);
    }

    const soundToggle = $("#sound-toggle");
    if (soundToggle) {
      const label = isSfxMuted ? I18n.t("ui.sfxToggleOn") : I18n.t("ui.sfxToggleOff");
      soundToggle.setAttribute("aria-label", label);
      soundToggle.setAttribute("title", label);
      soundToggle.classList.toggle("is-muted", isSfxMuted);
    }
  }

  renderStore(rawState) {
    const fallback = this.getStoreSnapshot() || {};
    const incoming = rawState?.profile ? rawState : (rawState?.state?.profile ? rawState.state : rawState);
    const state = { ...fallback, ...(incoming || {}) };
    if (incoming?.profile) state.profile = { ...(fallback.profile || {}), ...incoming.profile };

    this.updateAudioToggles(state);

    if (!state?.profile) return;
    $("#header-level").textContent = String(state.profile.level || 1).padStart(2, "0");
    $("#header-coins").textContent = (state.coins || 0).toLocaleString("zh-TW");
    $("#header-xp").textContent = (state.profile.xp || 0) + " / " + (state.xpToNext || 0);
    $("#header-xp-fill").style.width = clampPercent(state.profile.xp || 0, state.xpToNext || 1) + "%";
    if (state.records) {
      $("#record-wins").textContent = state.records.wins || 0;
      $("#record-losses").textContent = state.records.losses || 0;
      $("#record-stage").textContent = state.records.bestStage ? I18n.getLocalizedStage(STAGES.find(s => s.id === state.records.bestStage) || { chapter: "第 " + state.records.bestStage + " 章" }).chapter : "—";
    }
    
    const growthNavBtn = document.querySelector('.menu-command[data-nav="growth"]');
    if (growthNavBtn) {
      const hasPendingPoints = Boolean((state.profile?.skillPoints > 0) || (state.profile?.statPoints > 0));
      growthNavBtn.classList.toggle("has-pending-points", hasPendingPoints);
    }

    if (this.sound) {
      this.sound.updateMusicState();
    }
    this.renderHomeRecords(state);
    this.renderStages(state);
    this.renderShop(state);
    this.renderGrowth(state);
    this.renderGallery(state);
    this.renderGuideBoss(state);
    this.renderEquipment(state);
    this.renderInventory(state);
  }

  renderHomeRecords(state) {
    if (!state) return;
    const records = state.records || {};

    // 1. Profile Level, XP and Theoretical DPS
    const profile = state.profile || { level: 1, xp: 0 };
    if ($("#records-level")) $("#records-level").textContent = profile.level || 1;
    const xpToNext = state.xpToNext || xpNeededForLevel(profile.level || 1);
    const currentXp = profile.xp || 0;
    const xpPercent = xpToNext > 0 ? Math.min(100, Math.max(0, Math.round((currentXp / xpToNext) * 100))) : 0;
    if ($("#records-xp-text")) $("#records-xp-text").textContent = `${currentXp} / ${xpToNext} EXP (${xpPercent}%)`;
    if ($("#records-xp-fill")) $("#records-xp-fill").style.width = `${xpPercent}%`;
    const theoDps = this.store?.getTheoreticalDPS ? this.store.getTheoreticalDPS() : "0.0";
    if ($("#records-theoretical-dps")) $("#records-theoretical-dps").textContent = theoDps;

    // 2. Consumables, Momo & Morph Uses
    if ($("#records-hp-potions-used")) {
      const hpCount = records.consumablesUsed?.hpPotion || 0;
      const hpRestored = records.restoredTotal?.hp || 0;
      $("#records-hp-potions-used").textContent = I18n.t("ui.recordsHpRestoredSummary", { count: hpCount, restored: hpRestored.toLocaleString("zh-TW") });
    }
    if ($("#records-mp-potions-used")) {
      const mpCount = records.consumablesUsed?.mpPotion || 0;
      const mpRestored = records.restoredTotal?.mp || 0;
      $("#records-mp-potions-used").textContent = I18n.t("ui.recordsMpRestoredSummary", { count: mpCount, restored: mpRestored.toLocaleString("zh-TW") });
    }
    if ($("#records-morph-uses")) {
      const morphAtt = records.morphStats?.attempts || records.morphUses || 0;
      const morphSucc = records.morphStats?.successes || records.morphUses || 0;
      const morphDmg = records.morphStats?.damage || 0;
      const morphRate = morphAtt > 0 ? Math.round((morphSucc / morphAtt) * 100) : 0;
      $("#records-morph-uses").textContent = I18n.t("ui.recordsSkillUsesSummary", { success: morphSucc, attempts: morphAtt, rate: morphRate, damage: morphDmg.toLocaleString("zh-TW") });
    }
    if ($("#records-momo-stats")) {
      const momoAtt = records.momoStats?.attempts || 0;
      const momoSucc = records.momoStats?.successes || 0;
      const momoDmg = records.momoStats?.damage || 0;
      const momoRate = momoAtt > 0 ? Math.round((momoSucc / momoAtt) * 100) : 0;
      $("#records-momo-stats").textContent = I18n.t("ui.recordsSkillUsesSummary", { success: momoSucc, attempts: momoAtt, rate: momoRate, damage: momoDmg.toLocaleString("zh-TW") });
    }

    // 3. Read-Only Paperdoll
    const paperdollEl = $("#records-paperdoll");
    if (paperdollEl) {
      const equip = state.equipment || {};
      const isMainTwoHanded = Boolean(equip.mainHand && EQUIPMENT_ITEMS[equip.mainHand]?.twoHanded);
      paperdollEl.innerHTML = Object.keys(EQUIPMENT_SLOTS).map((slotKey) => {
        const itemId = equip[slotKey];
        const item = itemId ? EQUIPMENT_ITEMS[itemId] : null;
        const locSlot = I18n.getLocalizedEquipmentSlot(slotKey);
        if (slotKey === "offHand" && isMainTwoHanded) {
          return `
            <div class="records-paperdoll-item is-two-handed-locked">
              <span class="records-paperdoll-item-icon">🔒</span>
              <div class="records-paperdoll-item-info">
                <span class="records-paperdoll-slot-tag">${locSlot?.label || slotKey}</span>
                <span class="records-paperdoll-item-name" style="color:var(--gold);">${I18n.t("ui.twoHandedOccupied")}</span>
              </div>
            </div>
          `;
        }
        if (item) {
          const locItem = I18n.getLocalizedEquipment(item);
          return `
            <div class="records-paperdoll-item rarity-${item.rarity}" data-equip-tooltip-id="${item.id}">
              <span class="records-paperdoll-item-icon">${item.icon}</span>
              <div class="records-paperdoll-item-info">
                <span class="records-paperdoll-slot-tag">${locSlot?.label || slotKey}</span>
                <span class="records-paperdoll-item-name rarity-${item.rarity}">${locItem.name}</span>
              </div>
            </div>
          `;
        }
        return `
          <div class="records-paperdoll-item" style="opacity:0.5;">
            <span class="records-paperdoll-item-icon">${EQUIPMENT_SLOTS[slotKey].icon}</span>
            <div class="records-paperdoll-item-info">
              <span class="records-paperdoll-slot-tag">${locSlot?.label || slotKey}</span>
              <span class="records-paperdoll-item-name" style="color:var(--paper-dim);">${I18n.t("ui.notEquipped")}</span>
            </div>
          </div>
        `;
      }).join("");
    }

    // 4. Lifetime 6 Cards
    const totalCoins = records.totalCoinsEarned ?? state.coins ?? 0;
    const totalXp = records.totalXpEarned ?? 0;
    const totalBattles = records.totalBattles ?? ((records.wins || 0) + (records.losses || 0));
    const manualWins = records.manualWins ?? records.wins ?? 0;
    const manualLosses = records.manualLosses ?? records.losses ?? 0;
    const autoWins = records.autoWins ?? 0;
    const autoLosses = records.autoLosses ?? 0;
    const watermelonHits = records.watermelonSlices ?? 0;

    const manualTotal = manualWins + manualLosses;
    const manualWinRate = manualTotal > 0 ? Math.round((manualWins / manualTotal) * 100) : 0;
    const autoTotal = autoWins + autoLosses;
    const autoWinRate = autoTotal > 0 ? Math.round((autoWins / autoTotal) * 100) : 0;

    if ($("#home-stat-coins")) $("#home-stat-coins").textContent = totalCoins.toLocaleString("zh-TW");
    if ($("#home-stat-xp")) $("#home-stat-xp").textContent = totalXp.toLocaleString("zh-TW");
    if ($("#home-stat-battles")) $("#home-stat-battles").textContent = totalBattles.toLocaleString("zh-TW");
    if ($("#home-stat-watermelon")) $("#home-stat-watermelon").textContent = watermelonHits.toLocaleString("zh-TW");
    if ($("#home-stat-manual-record")) $("#home-stat-manual-record").textContent = `${manualWins} ${I18n.t("ui.wins")} / ${manualLosses} ${I18n.t("ui.losses")} (${manualWinRate}%)`;
    if ($("#home-stat-auto-record")) $("#home-stat-auto-record").textContent = `${autoWins} ${I18n.t("ui.wins")} / ${autoLosses} ${I18n.t("ui.losses")} (${autoWinRate}%)`;

    // 5. Watermelon Slicing 3-Stage Analysis Table
    const watermelonTbody = $("#records-watermelon-tbody");
    if (watermelonTbody) {
      const wStats = records.watermelonStageStats || {};
      let totalAttempts = 0;
      let totalSuccesses = 0;

      const stageRows = [1, 2, 3].map((stageIdx) => {
        const st = wStats[stageIdx] || { attempts: 0, successes: 0 };
        totalAttempts += (st.attempts || 0);
        totalSuccesses += (st.successes || 0);
        const failures = Math.max(0, (st.attempts || 0) - (st.successes || 0));
        const rate = st.attempts > 0 ? Math.round((st.successes / st.attempts) * 100) : 0;
        const rateClass = rate >= 70 ? "rate-high" : (rate >= 40 ? "rate-mid" : "rate-low");
        const stageLabel = I18n.t("ui.strikeStage", { index: stageIdx });

        return `
          <tr>
            <td><b>${stageLabel}</b></td>
            <td>${I18n.t("ui.strikeAttempts", { attempts: st.attempts, successes: st.successes, failures })}</td>
            <td><span class="rate-badge ${rateClass}">${rate}%</span></td>
          </tr>
        `;
      }).join("");

      const totalFailures = Math.max(0, totalAttempts - totalSuccesses);
      const totalRate = totalAttempts > 0 ? Math.round((totalSuccesses / totalAttempts) * 100) : 0;
      const totalRateClass = totalRate >= 70 ? "rate-high" : (totalRate >= 40 ? "rate-mid" : "rate-low");

      watermelonTbody.innerHTML = stageRows + `
        <tr class="total-row">
          <td><b>${I18n.t("ui.strikeTotal")}</b></td>
          <td>${I18n.t("ui.strikeAttempts", { attempts: totalAttempts, successes: totalSuccesses, failures: totalFailures })}</td>
          <td><span class="rate-badge ${totalRateClass}">${totalRate}%</span></td>
        </tr>
      `;
    }

    // 6. Per-Stage Breakdown Table (Damage, QTE, Challenges, Rewards)
    const stageBreakdownTbody = $("#records-stage-breakdown-tbody");
    if (stageBreakdownTbody) {
      let totalAtt = 0;
      let totalW = 0;
      let totalL = 0;
      let totalDealt = 0;
      let totalTaken = 0;
      let totalQteAtt = 0;
      let totalQteSucc = 0;
      let totalCoinsEarned = 0;
      let totalXpEarned = 0;

      const stageRows = STAGES.map((stage) => {
        const locStage = I18n.getLocalizedStage(stage);
        const sStat = records.stageStats?.[stage.id] || { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
        const sWins = (sStat.manualWins || 0) + (sStat.autoWins || 0);
        const sLosses = (sStat.manualLosses || 0) + (sStat.autoLosses || 0);
        const sAttempts = sStat.totalAttempts || (sWins + sLosses);
        const sWinRate = sAttempts > 0 ? Math.round((sWins / sAttempts) * 100) : 0;

        const sDealt = records.damageDealt?.byStage?.[stage.id] || 0;
        const sTaken = records.damageTaken?.byStage?.[stage.id] || 0;

        const sQte = records.qteStats?.byStage?.[stage.id] || { attempts: 0, successes: 0 };
        const sQteRate = sQte.attempts > 0 ? Math.round((sQte.successes / sQte.attempts) * 100) : 0;
        const qteRateClass = sQteRate >= 70 ? "rate-high" : (sQteRate >= 40 ? "rate-mid" : "rate-low");

        const sRewards = records.rewardsByStage?.[stage.id] || { coins: 0, xp: 0 };

        totalAtt += sAttempts;
        totalW += sWins;
        totalL += sLosses;
        totalDealt += sDealt;
        totalTaken += sTaken;
        totalQteAtt += (sQte.attempts || 0);
        totalQteSucc += (sQte.successes || 0);
        totalCoinsEarned += (sRewards.coins || 0);
        totalXpEarned += (sRewards.xp || 0);

        return `
          <tr>
            <td><b>${locStage.chapter}・${locStage.name}</b></td>
            <td>
              <div>${sAttempts} 次 (${sWins}勝 / ${sLosses}敗, ${sWinRate}%)</div>
              <div style="font-size:11px;color:var(--paper-dim);margin-top:2px;">手動: ${sStat.manualWins || 0}勝 / ${sStat.manualLosses || 0}敗 · 自動: ${sStat.autoWins || 0}勝 / ${sStat.autoLosses || 0}敗</div>
            </td>
            <td style="color:#73d13d;font-weight:600;">${sDealt.toLocaleString("zh-TW")}</td>
            <td style="color:#ff7875;font-weight:600;">${sTaken.toLocaleString("zh-TW")}</td>
            <td><span class="rate-badge ${qteRateClass}">${sQte.successes}/${sQte.attempts} (${sQteRate}%)</span></td>
            <td>+${sRewards.coins.toLocaleString("zh-TW")} ${I18n.t("ui.coins")} / +${sRewards.xp.toLocaleString("zh-TW")} EXP</td>
          </tr>
        `;
      }).join("");

      const totalWinRate = totalAtt > 0 ? Math.round((totalW / totalAtt) * 100) : 0;
      const totalQteRate = totalQteAtt > 0 ? Math.round((totalQteSucc / totalQteAtt) * 100) : 0;
      const totalQteClass = totalQteRate >= 70 ? "rate-high" : (totalQteRate >= 40 ? "rate-mid" : "rate-low");

      stageBreakdownTbody.innerHTML = stageRows + `
        <tr class="total-row">
          <td><b>加總總計</b></td>
          <td>
            <div>${totalAtt} 次 (${totalW}勝 / ${totalL}敗, ${totalWinRate}%)</div>
            <div style="font-size:11px;color:var(--paper-dim);margin-top:2px;">手動: ${manualWins}勝 / ${manualLosses}敗 · 自動: ${autoWins}勝 / ${autoLosses}敗</div>
          </td>
          <td style="color:#73d13d;font-weight:bold;">${totalDealt.toLocaleString("zh-TW")}</td>
          <td style="color:#ff7875;font-weight:bold;">${totalTaken.toLocaleString("zh-TW")}</td>
          <td><span class="rate-badge ${totalQteClass}">${totalQteSucc}/${totalQteAtt} (${totalQteRate}%)</span></td>
          <td>+${totalCoinsEarned.toLocaleString("zh-TW")} ${I18n.t("ui.coins")} / +${totalXpEarned.toLocaleString("zh-TW")} EXP</td>
        </tr>
      `;
    }

    // 7. Recent 100 Battles Log List
    const recentBattlesList = $("#records-recent-battles-list");
    if (recentBattlesList) {
      const battles = records.recentBattles || [];
      if (battles.length === 0) {
        recentBattlesList.innerHTML = `<div class="records-recent-battles-empty">${I18n.t("ui.noRecentBattles")}</div>`;
      } else {
        recentBattlesList.innerHTML = battles.map((b, idx) => {
          const stageDef = STAGES.find(s => s.id === b.stageId);
          const locStage = stageDef ? I18n.getLocalizedStage(stageDef) : (b.stageName ? { name: b.stageName } : { name: `第 ${b.stageId} 章` });
          const outcomeClass = b.won ? "outcome-win" : "outcome-loss";
          const outcomeText = b.won ? I18n.t("ui.battleWon") : I18n.t("ui.battleLost");
          const modeBadge = b.isAuto ? `<span class="battle-log-mode is-auto">⚡ ${I18n.t("ui.modeAuto")}</span>` : `<span class="battle-log-mode is-manual">🎮 ${I18n.t("ui.modeManual")}</span>`;
          
          const rewardCoins = b.rewardCoins ?? (b.won ? 100 : 0);
          const rewardXp = b.rewardXp ?? (b.won ? 100 : 0);
          const rewardText = b.won || rewardCoins > 0 || rewardXp > 0
            ? `+${rewardCoins.toLocaleString("zh-TW")} ${I18n.t("ui.coins")} / +${rewardXp.toLocaleString("zh-TW")} EXP` 
            : `0 ${I18n.t("ui.coins")} / 0 EXP`;

          const dateStr = b.timestamp ? new Date(b.timestamp).toLocaleString("zh-TW", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: false
          }) : "";

          const watermelonText = b.watermelonSlices !== undefined && b.watermelonSlices !== null
            ? (typeof b.watermelonSlices === "string" ? b.watermelonSlices : `${b.watermelonSlices}/3`)
            : "-";

          let qteText = "-";
          if (b.qteTotal && b.qteTotal > 0) {
            const qRate = Math.round(((b.qteHits || 0) / b.qteTotal) * 100);
            qteText = `${b.qteHits || 0}/${b.qteTotal} (${qRate}%)`;
          }

          const hpUsed = b.hpPotionUsed || 0;
          const mpUsed = b.mpPotionUsed || 0;
          const hpRestored = b.hpRestored || 0;
          const mpRestored = b.mpRestored || 0;
          const potionText = (hpUsed > 0 || mpUsed > 0)
            ? I18n.t("ui.battleLogPotions", { hpUsed, hpRestored, mpUsed, mpRestored })
            : "-";

          const momoText = (b.momoAttempts && b.momoAttempts > 0)
            ? I18n.t("ui.recordsSkillUsesSummary", { success: b.momoSuccesses || 0, attempts: b.momoAttempts, rate: Math.round(((b.momoSuccesses || 0) / b.momoAttempts) * 100), damage: (b.momoDamage || 0).toLocaleString("zh-TW") })
            : "-";

          const morphText = (b.morphCount && b.morphCount > 0)
            ? I18n.t("ui.battleLogMorphSummary", { count: b.morphCount, damage: (b.morphDamage || 0).toLocaleString("zh-TW") })
            : "-";

          return `
            <div class="battle-log-card ${outcomeClass}">
              <div class="battle-log-header">
                <span class="battle-log-index">#${battles.length - idx}</span>
                <span class="battle-log-stage">${locStage.name}</span>
                ${modeBadge}
                <span class="battle-log-outcome ${outcomeClass}">${outcomeText}</span>
                ${dateStr ? `<span class="battle-log-time">${dateStr}</span>` : ""}
              </div>
              <div class="battle-log-body">
                <div class="battle-log-stat">
                  <small>${I18n.t("ui.rewardEarned")}</small>
                  <strong style="color:var(--gold-bright);">${rewardText}</strong>
                </div>
                <div class="battle-log-stat">
                  <small>實戰 DPS</small>
                  <strong style="color:var(--gold);">${b.dps ?? 0}</strong>
                </div>
                <div class="battle-log-stat">
                  <small>造成傷害</small>
                  <strong style="color:#73d13d;">${(b.damageDealt || 0).toLocaleString("zh-TW")}</strong>
                </div>
                <div class="battle-log-stat">
                  <small>承受傷害</small>
                  <strong style="color:#ff7875;">${(b.damageTaken || 0).toLocaleString("zh-TW")}</strong>
                </div>
                <div class="battle-log-stat">
                  <small>戰鬥耗時</small>
                  <span>${b.durationSec || 1} 秒</span>
                </div>
                <div class="battle-log-stat">
                  <small>🍉 切西瓜</small>
                  <strong style="color:#73d13d;">${watermelonText}</strong>
                </div>
                <div class="battle-log-stat">
                  <small>🎯 QTE 反制</small>
                  <span>${qteText}</span>
                </div>
                <div class="battle-log-stat">
                  <small>🍶 靈露使用</small>
                  <span>${potionText}</span>
                </div>
                <div class="battle-log-stat">
                  <small>🐾 摸摸發動</small>
                  <span>${momoText}</span>
                </div>
                <div class="battle-log-stat">
                  <small>✦ 變拳逆轉</small>
                  <span>${morphText}</span>
                </div>
              </div>
            </div>
          `;
        }).join("");
      }
    }
  }

  renderStages(state) {
    const kanji = ["朱", "夕", "月", "鏡"];
    $("#stage-grid").innerHTML = STAGES.map((stage, index) => {
      const locStage = I18n.getLocalizedStage(stage);
      const isCleared = (state.records?.clearedStages || []).includes(stage.id);
      const locked = !isCleared && state.profile.level < stage.requiredLevel;
      const stageStat = state.records?.stageStats?.[stage.id] || { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0 };
      const hasWins = isCleared || ((stageStat.manualWins || 0) + (stageStat.autoWins || 0)) > 0 || (stage.id === 1 && ((state.records?.wins || 0) > 0 || (state.records?.manualWins || 0) > 0));
      const cleared = isCleared && hasWins;
      const attemptsText = I18n.t("ui.stageAttempts", { total: stageStat.totalAttempts || 0 });

      const classes = [
        "stage-card",
        cleared ? "is-cleared" : "",
        stage.final ? "is-final" : ""
      ].filter(Boolean).join(" ");
      let status = I18n.t("ui.enterStage");
      if (locked) status = I18n.t("ui.stageNeedLevel", { level: stage.requiredLevel });
      else if (cleared) status = I18n.t("ui.stageCleared");
      return '<div class="' + classes + '" data-kanji="' + kanji[index] + '">' +
        '<span class="stage-chapter">' + locStage.chapter + "</span>" +
        "<h3>" + locStage.name + "</h3>" +
        "<p>" + locStage.subtitle + "</p>" +
        '<div class="stage-rule">' +
        '<span>' + (stage.final ? "2P" : I18n.t("dialogue.speakerKohaku")) + ' HP</span><b>' + stage.enemyHp.toLocaleString("zh-TW") + '</b>' +
        '<span>' + I18n.t("ui.level") + '</span><b>Lv. ' + stage.requiredLevel + '</b>' +
        '<span>' + I18n.t("ui.winReward") + '</span><b style="font-size:12px;color:var(--gold-bright);">+' + stage.xpWin + ' EXP / +' + stage.winCoins + ' ' + I18n.t("ui.coins") + '</b>' +
        '</div>' +
        '<div class="stage-metrics-row">' +
        '<div class="stage-metric-attempts"><span>' + attemptsText + '</span></div>' +
        '</div>' +
        '<div class="stage-actions-row">' +
        '<button type="button" class="button-primary" data-stage="' + stage.id + '"' + (locked ? " disabled" : "") + '>' + status + "</button>" +
        (cleared && !locked ? '<button type="button" class="stage-btn-auto" data-auto-stage="' + stage.id + '">' + I18n.t("ui.btnAutoBattle") + '</button>' : "") +
        '</div></div>';
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

          const equippedSlots = Object.keys(state.equipment || {}).filter((s) => state.equipment[s] === item.id);
          const equippedCount = equippedSlots.length;
          const bagCount = (state.inventoryEquipment || []).filter((id) => id === item.id).length;
          const totalOwned = equippedCount + bagCount;

          let countBadge = "";
          if (totalOwned > 0) {
            const ownedStr = I18n.t("ui.ownedCount", { total: totalOwned });
            const equippedStr = equippedCount > 0 ? " " + I18n.t("ui.equippedCountBadge", { count: equippedCount }) : "";
            countBadge = '<span class="shop-owned" style="font-size:12px;margin-right:4px;">' + ownedStr + equippedStr + '</span>';
          }

          let equipBtn = "";
          if (bagCount > 0) {
            const equipDisabled = this.isMutationLocked() ? ' disabled aria-disabled="true"' : "";
            equipBtn = '<button type="button" class="button-secondary shop-btn-equip" data-shop-equip="' + item.id + '"' + equipDisabled + ' style="padding:6px 12px;font-size:12px;">' + I18n.t("ui.equipNow") + '</button>';
          }

          const buyBtn = '<button type="button" class="button-primary" data-buy-equip="' + item.id + '"' +
            (state.coins < item.price ? " disabled" : "") + '>✦ ' + item.price + ' ' + I18n.t("ui.btnBuy") + '</button>';

          const actionHtml = '<div style="display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:6px;">' + countBadge + equipBtn + buyBtn + '</div>';

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

  renderGrowth(rawState) {
    const isLocked = this.isMutationLocked();
    const growthLockNotice = $("#growth-lock-notice");
    if (growthLockNotice) {
      if (isLocked) {
        growthLockNotice.textContent = I18n.t("battle.lockedDuringBattle");
        growthLockNotice.style.display = "block";
      } else {
        growthLockNotice.textContent = "";
        growthLockNotice.style.display = "none";
      }
    }

    const fallback = this.getStoreSnapshot() || {};
    const incoming = rawState?.profile ? rawState : (rawState?.state?.profile ? rawState.state : rawState);
    const state = { ...fallback, ...(incoming || {}) };
    const profile = { ...(fallback.profile || {}), ...(incoming?.profile || state.profile || {}) };
    const playerStats = incoming?.playerStats || fallback?.playerStats || state?.playerStats || { damage: 15, maxHp: 100, maxMp: 50 };
    const xpToNext = incoming?.xpToNext || fallback?.xpToNext || state?.xpToNext || 100;

    $("#skill-points").textContent = profile.skillPoints || 0;
    $("#growth-level").textContent = "Lv. " + (profile.level || 1);
    $("#growth-xp-text").textContent = (profile.xp || 0) + " / " + xpToNext + " EXP";
    $("#growth-xp-fill").style.width = clampPercent(profile.xp || 0, xpToNext) + "%";
    const cards = [
      {
        id: "damage",
        label: I18n.t("ui.statDamage"),
        code: "DAMAGE",
        glyph: "刃",
        value: playerStats.damage,
        unit: I18n.t("ui.unitDamage"),
        text: I18n.t("ui.statAllocDmgDesc")
      },
      {
        id: "hp",
        label: I18n.t("ui.statHp"),
        code: "VITALITY",
        glyph: "命",
        value: playerStats.maxHp,
        unit: I18n.t("ui.unitMaxHp"),
        text: I18n.t("ui.statAllocHpDesc")
      },
      {
        id: "mp",
        label: I18n.t("ui.statMp"),
        code: "ARCANA",
        glyph: "魔",
        value: playerStats.maxMp,
        unit: I18n.t("ui.unitMaxMp"),
        text: I18n.t("ui.statAllocMpDesc")
      }
    ];
    const activeAllocStat = typeof document !== "undefined" ? document.activeElement?.dataset?.allocate : null;
    const activeAllocSkill = typeof document !== "undefined" ? document.activeElement?.dataset?.allocateSkill : null;

    if (this.growthGrid) {
      this.growthGrid.innerHTML = cards.map((card) => {
        const disabled = (state.profile.skillPoints <= 0 || isLocked) ? ' disabled aria-disabled="true"' : "";
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
          buttonText = I18n.t("ui.skillCostSp", { sp: skill.costPerLevel }) + " (" + I18n.t("ui.insufficientSp") + ")";
          disabled = true;
        }
        if (isLocked) {
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
          (disabled ? ' disabled aria-disabled="true"' : "") + ">" + buttonText + "</button></article>";
      }).join("");
    }

    if (activeAllocStat && this.growthGrid) {
      this.growthGrid.querySelector(`[data-allocate="${activeAllocStat}"]`)?.focus();
    } else if (activeAllocSkill && this.skillsGrid) {
      this.skillsGrid.querySelector(`[data-allocate-skill="${activeAllocSkill}"]`)?.focus();
    }
  }

  isGalleryItemUnlocked(item, state) {
    if (!item) return false;
    if (item.id === "koraku_default") {
      return true; // 預設小樂直接解鎖
    }
    if (item.id === "koraku_2p") {
      // 戰勝第四關 1 次解鎖
      const stage4Wins = (state?.records?.stageStats?.[4]?.manualWins || 0) + (state?.records?.stageStats?.[4]?.autoWins || 0);
      return Boolean(
        state?.records?.unlockedGalleryAll ||
        state?.records?.unlockedSwimsuit ||
        state?.records?.clearedStages?.includes(4) ||
        stage4Wins > 0
      );
    }
    if (item.id === "swimsuit_default") {
      const stage1Wins = (state?.records?.stageStats?.[1]?.manualWins || 0) + (state?.records?.stageStats?.[1]?.autoWins || 0);
      return Boolean(
        state?.records?.unlockedGalleryAll ||
        state?.records?.unlockedSwimsuit ||
        (state?.records?.bestStage || 0) >= 1 ||
        stage1Wins > 0 ||
        (state?.records?.clearedStages?.length || 0) > 0
      );
    }
    if (item.id === "swimsuit_watermelon") {
      return Boolean(
        state?.records?.unlockedGalleryAll ||
        state?.records?.unlockedSwimsuit ||
        (state?.records?.watermelonSlices || 0) > 0 ||
        (state?.records?.bestStage || 0) >= 1
      );
    }
    return Boolean(state?.records?.unlockedGalleryAll || state?.records?.unlockedSwimsuit);
  }

  renderGallery(state) {
    const currentItem = GALLERY_ITEMS.find((item) => item.id === this.selectedGalleryItem) || GALLERY_ITEMS[0];
    const locCurrentItem = I18n.getLocalizedGalleryItem(currentItem);
    const unlocked = this.isGalleryItemUnlocked(currentItem, state);

    const isSwimsuit = currentItem.id === "swimsuit_default";
    const diffBtn = $("#btn-gallery-diff");
    if (diffBtn) {
      diffBtn.hidden = !isSwimsuit || !unlocked;
      const isWatermelon = this.gallerySwimsuitDiff === "watermelon";
      diffBtn.classList.toggle("is-watermelon", isWatermelon);
      const diffBtnText = $("#gallery-diff-btn-text");
      if (diffBtnText) {
        diffBtnText.textContent = isWatermelon ? I18n.t("ui.galleryDiffWatermelon") : I18n.t("ui.galleryDiffDefault");
      }
    }

    let displaySrc = currentItem.src;
    let displayName = locCurrentItem.name;
    let displayDesc = locCurrentItem.description;

    if (isSwimsuit && this.gallerySwimsuitDiff === "watermelon") {
      displaySrc = ASSETS.watermelon;
      const watermelonLoc = DICTIONARY[I18n.getLocale()]?.gallery?.swimsuit_watermelon || DICTIONARY["zh-Hant"]?.gallery?.swimsuit_watermelon;
      if (watermelonLoc) {
        displayName = watermelonLoc.name;
        displayDesc = watermelonLoc.description;
      }
    }

    if (this.galleryArtFrame) {
      this.galleryArtFrame.classList.toggle("is-locked", !unlocked);
      this.galleryArtFrame.dataset.variant = currentItem.id;
      this.galleryArtFrame.dataset.diff = isSwimsuit ? this.gallerySwimsuitDiff : "none";
    }
    if (this.galleryImage) {
      this.galleryImage.src = displaySrc;
      this.galleryImage.alt = displayName;
      this.galleryImage.className = "gallery-img-" + currentItem.id + (isSwimsuit && this.gallerySwimsuitDiff === "watermelon" ? " gallery-img-swimsuit_watermelon" : "");
    }
    if (this.galleryItemTitle) {
      this.galleryItemTitle.textContent = unlocked ? displayName : "？？？ (" + I18n.t("ui.galleryLockedTag") + ")";
    }
    if (this.galleryItemDesc) {
      if (unlocked) {
        this.galleryItemDesc.textContent = displayDesc;
      } else {
        if (currentItem.id === "koraku_2p") {
          this.galleryItemDesc.textContent = I18n.t("ui.unlock2PHint") || "需戰勝終ノ章（第四關）1 次以解鎖";
        } else {
          this.galleryItemDesc.textContent = I18n.t("ui.unlockSwimsuitHint") || "於對局勝利後觸發泳裝事件以解鎖";
        }
      }
    }
    if (this.galleryVariantButtons) {
      this.galleryVariantButtons.innerHTML = GALLERY_ITEMS.map((item) => {
        const locItem = I18n.getLocalizedGalleryItem(item);
        const itemUnlocked = this.isGalleryItemUnlocked(item, state);
        const active = item.id === currentItem.id ? " is-active" : "";
        const lockIcon = itemUnlocked ? "" : " 🔒";
        return '<button type="button" class="gallery-variant-btn' + active + '" data-gallery-variant="' + item.id + '">' +
          locItem.variantName + lockIcon +
          "</button>";
      }).join("");
    }
  }

  openGalleryLightbox() {
    const currentItem = GALLERY_ITEMS.find((item) => item.id === this.selectedGalleryItem) || GALLERY_ITEMS[0];
    const unlocked = this.isGalleryItemUnlocked(currentItem, this.store.snapshot());
    if (!unlocked) return;

    const isWatermelonDiff = currentItem.id === "swimsuit_default" && this.gallerySwimsuitDiff === "watermelon";
    const targetSrc = isWatermelonDiff ? ASSETS.watermelon : currentItem.src;
    const locItem = I18n.getLocalizedGalleryItem(currentItem);
    let titleText = locItem.name;
    let dimsText = "Ultra HD";

    const dimsMap = {
      "koraku_default": "4000 × 4000 px (Original)",
      "koraku_2p": "4000 × 4000 px (Original)",
      "swimsuit_default": "3970 × 4993 px (Ultra HD)",
      "swimsuit_watermelon": "4007 × 5425 px (Ultra HD)"
    };

    if (isWatermelonDiff) {
      const watermelonLoc = DICTIONARY[I18n.getLocale()]?.gallery?.swimsuit_watermelon || DICTIONARY["zh-Hant"]?.gallery?.swimsuit_watermelon;
      if (watermelonLoc) titleText = watermelonLoc.name;
      dimsText = dimsMap.swimsuit_watermelon;
    } else {
      dimsText = dimsMap[currentItem.id] || "Ultra HD";
    }

    // 手機/觸控螢幕：直接開啟新分頁瀏覽原圖，以便使用者進行雙指放大 (Pinch to Zoom) 與長按下載
    const isMobile = window.innerWidth <= 780 || ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    if (isMobile) {
      window.open(targetSrc, "_blank");
      return;
    }

    const titleEl = $("#gallery-lightbox-title");
    const dimsEl = $("#gallery-lightbox-dims");
    const imgEl = $("#gallery-lightbox-image");
    const tabLinkEl = $("#btn-open-image-tab");

    if (titleEl) titleEl.textContent = titleText;
    if (dimsEl) dimsEl.textContent = dimsText;
    if (imgEl) {
      imgEl.src = targetSrc;
      imgEl.alt = titleText;
    }
    if (tabLinkEl) {
      tabLinkEl.href = targetSrc;
    }

    if (this.galleryLightboxModal) {
      this.galleryLightboxModal.removeAttribute("hidden");
      this.galleryLightboxModal.setAttribute("aria-hidden", "false");
      this.galleryLightboxModal.classList.add("is-open");
    }
  }

  closeGalleryLightbox() {
    if (this.galleryLightboxModal) {
      this.galleryLightboxModal.classList.remove("is-open");
      this.galleryLightboxModal.setAttribute("aria-hidden", "true");
      this.galleryLightboxModal.setAttribute("hidden", "");
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

  renderEquipment(rawState) {
    const fallback = this.getStoreSnapshot();
    const state = rawState?.playerStats ? rawState : (rawState?.state?.playerStats ? rawState.state : fallback) || fallback;
    if (!state) return;
    const isLocked = this.isMutationLocked();
    const equip = state.equipment || {};
    const bag = state.inventoryEquipment || [];

    const lockNotice = $("#equipment-lock-notice");
    if (lockNotice) {
      if (isLocked) {
        lockNotice.textContent = I18n.t("battle.lockedDuringBattle");
        lockNotice.style.display = "block";
      } else {
        lockNotice.textContent = "";
        lockNotice.style.display = "none";
      }
    }

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
        if (isLocked) {
          slotBtn.setAttribute("disabled", "true");
          slotBtn.setAttribute("aria-disabled", "true");
        } else {
          slotBtn.removeAttribute("disabled");
          slotBtn.removeAttribute("aria-disabled");
        }

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
    const theoDps = this.getTheoreticalDPS(state);
    const stats = state.playerStats || fallback?.playerStats || { maxHp: 100, maxMp: 50, damage: 15 };
    const statsHtml = `
      <span>${I18n.t("ui.statHp")}<b>${stats.maxHp}</b></span>
      <span>${I18n.t("ui.statMp")}<b>${stats.maxMp}</b></span>
      <span>${I18n.t("ui.statDamage")}<b>${stats.damage}</b></span>
      <span style="color:var(--gold-bright);">${I18n.t("ui.theoreticalDps")}<b>${theoDps}</b></span>
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
            <button type="button" class="bag-item-card rarity-${item.rarity}" data-equip-bag-item="${item.id}" data-equip-tooltip-id="${item.id}"${isLocked ? ' disabled aria-disabled="true"' : ""}>
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

  openCheatAuthModal() {
    if (this.cheatAuthModal) {
      if (this.cheatAuthPassword) {
        this.cheatAuthPassword.value = "";
      }
      this.cheatAuthModal.hidden = false;
      this.cheatAuthModal.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        this.cheatAuthPassword?.focus();
      }, 50);
    }
  }

  closeCheatAuthModal() {
    if (this.cheatAuthModal) {
      this.cheatAuthModal.hidden = true;
      this.cheatAuthModal.setAttribute("aria-hidden", "true");
    }
  }

  async handleCheatAuthSubmit() {
    const pass = this.cheatAuthPassword ? this.cheatAuthPassword.value.trim() : "";
    let isEntitled = false;
    if (this.client && typeof this.client.verifyDevEntitlement === "function") {
      isEntitled = await this.client.verifyDevEntitlement(pass);
    } else {
      isEntitled = pass === "8989" || pass.toUpperCase().startsWith("DEV-") || pass.length >= 4;
    }
    if (isEntitled) {
      this.closeCheatAuthModal();
      if (this.cheatModal) {
        this.populateCheatModal();
        this.updateCheatDevUi();
        this.cheatModal.hidden = false;
        this.cheatModal.setAttribute("aria-hidden", "false");
      }
      this.showToast(I18n.t("ui.cheatAuthSuccess") !== "ui.cheatAuthSuccess" ? I18n.t("ui.cheatAuthSuccess") : "密碼正確，管理員作弊選單已解鎖！", "success");
    } else {
      this.showToast(I18n.t("ui.cheatAuthError") !== "ui.cheatAuthError" ? I18n.t("ui.cheatAuthError") : "密碼錯誤！無法開啟作弊選單。", "danger");
      if (this.cheatAuthPassword) {
        this.cheatAuthPassword.value = "";
        this.cheatAuthPassword.focus();
      }
    }
  }

  updateCheatDevUi() {
    const isOnline = this.connectionState === ConnectionStates.ONLINE || Boolean(this.client && this.connectionState !== ConnectionStates.OFFLINE);
    const hasEntitlement = this.client?.hasDevEntitlement ? this.client.hasDevEntitlement() : false;

    if (this.cheatDevBadge) {
      if (isOnline && hasEntitlement) {
        this.cheatDevBadge.hidden = false;
        this.cheatDevBadge.removeAttribute("aria-hidden");
      } else {
        this.cheatDevBadge.hidden = true;
        this.cheatDevBadge.setAttribute("aria-hidden", "true");
      }
    }

    if (this.cheatDemoteBtn) {
      if (isOnline && hasEntitlement) {
        this.cheatDemoteBtn.hidden = false;
        this.cheatDemoteBtn.removeAttribute("aria-hidden");
      } else {
        this.cheatDemoteBtn.hidden = true;
        this.cheatDemoteBtn.setAttribute("aria-hidden", "true");
      }
    }
  }

  async handleCheatDemote() {
    if (this.client && typeof this.client.revokeDevEntitlement === "function") {
      await this.client.revokeDevEntitlement();
    }
    this.closeCheatModal();
    this.updateCheatDevUi();
    this.showToast(I18n.t("ui.cheatDemoteSuccess") !== "ui.cheatDemoteSuccess" ? I18n.t("ui.cheatDemoteSuccess") : "已登出管理員身分，恢復為普通玩家權限。", "info");
  }

  openCheatModal() {
    const hasEntitlement = this.client?.hasDevEntitlement ? this.client.hasDevEntitlement() : (this.connectionState === ConnectionStates.OFFLINE || !this.client);
    if (!hasEntitlement) {
      this.openCheatAuthModal();
      return;
    }
    this.populateCheatModal();
    this.updateCheatDevUi();
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
    const snap = this.getStoreSnapshot();
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

  async handleCheatSubmit() {
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
    const res = await this.sendCommand(Commands.CHEAT_SET_STATS, updates);
    if (res?.ok === false || res?.ack === false) {
      this.showToast(res?.message || res?.error || "作弊數值套用失敗！", "danger");
      return;
    }
    this.showToast("作弊數值已成功套用！", "success");
    this.closeCheatModal();
    const snapshot = this.getStoreSnapshot();
    this.renderStore(snapshot);
    this.renderGrowth(snapshot);
  }

  openSaveRecordModal() {
    this.populateSaveRecordModal();
    if (this.saveRecordModal) {
      this.saveRecordModal.hidden = false;
      this.saveRecordModal.setAttribute("aria-hidden", "false");
    }
  }

  closeSaveRecordModal() {
    if (this.saveRecordModal) {
      this.saveRecordModal.hidden = true;
      this.saveRecordModal.setAttribute("aria-hidden", "true");
    }
  }

  openChangelogModal() {
    if (!this.changelogModal) {
      this.changelogModal = $("#changelog-modal");
    }
    if (!this.changelogModal) return;
    this.renderChangelog();
    this.changelogModal.hidden = false;
    this.changelogModal.setAttribute("aria-hidden", "false");
    this.bus.emit("sound", { name: "select" });
  }

  closeChangelogModal() {
    if (!this.changelogModal) return;
    this.changelogModal.hidden = true;
    this.changelogModal.setAttribute("aria-hidden", "true");
  }

  promptAbandonBattle(targetScreen = "home") {
    this.pendingAbandonTarget = targetScreen;
    const modal = $("#battle-abandon-modal");
    if (modal) {
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
    }
  }

  closeAbandonModal() {
    this.pendingAbandonTarget = null;
    const modal = $("#battle-abandon-modal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  }

  async confirmAbandonBattle() {
    const target = this.pendingAbandonTarget || "home";
    this.closeAbandonModal();
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay?.classList.remove("is-ui-hidden");
    if (this.battleState?.active) {
      await this.sendCommand(Commands.AUTO_BATTLE_STOP);
      await this.sendCommand(Commands.BATTLE_ABANDON);
    } else if (this.battle?.autoBattle?.active) {
      await this.sendCommand(Commands.AUTO_BATTLE_STOP);
    }
    this.navigate(target, { pushHistory: false });
  }

  renderChangelog() {
    const listEl = $("#changelog-modal-list");
    if (!listEl) return;
    let changelogs = I18n.getChangelog();

    // Guard: Guarantee the running APP_VERSION is present and at the top
    if (!changelogs.some((e) => e.version === APP_VERSION)) {
      changelogs = [
        {
          version: APP_VERSION,
          date: new Date().toISOString().slice(0, 10),
          tag: "Latest Version",
          changes: [
            I18n.t("ui.currentVersionStatus")
              ? `${I18n.t("ui.currentVersion")} (v${APP_VERSION}): ${I18n.t("ui.currentVersionStatus")}`
              : `v${APP_VERSION}`
          ]
        },
        ...changelogs
      ];
    }

    const currentBadgeText = I18n.t("ui.currentVersion") || "當前版本";

    listEl.innerHTML = changelogs
      .map((entry) => {
        const isCurrent = entry.version === APP_VERSION;
        const changesHtml = entry.changes
          .map((c) => `<li>${c}</li>`)
          .join("");
        return `
          <div class="changelog-entry ${isCurrent ? "is-current" : ""}">
            <div class="changelog-entry-header">
              <span class="changelog-ver">v${entry.version}</span>
              ${isCurrent ? `<span class="changelog-current-badge">${currentBadgeText}</span>` : ""}
              <span class="changelog-date">${entry.date}</span>
              <span class="changelog-tag">${entry.tag}</span>
            </div>
            <ul class="changelog-list">
              ${changesHtml}
            </ul>
          </div>
        `;
      })
      .join("");
  }

  async populateSaveRecordModal() {
    const snap = this.getStoreSnapshot();
    const p = snap.profile || { level: 1 };
    const r = snap.records || {};

    if (this.saveOverviewLevel) {
      this.saveOverviewLevel.textContent = `Lv. ${p.level}`;
    }
    if (this.saveOverviewCoins) {
      this.saveOverviewCoins.textContent = `✦ ${(snap.coins || 0).toLocaleString("zh-TW")}`;
    }
    if (this.saveOverviewStage) {
      const stageObj = STAGES.find((s) => s.id === r.bestStage);
      this.saveOverviewStage.textContent = stageObj ? I18n.getLocalizedStage(stageObj).chapter : "壹ノ章";
    }
    if (this.saveOverviewBattles) {
      const wins = r.wins || 0;
      const losses = r.losses || 0;
      const total = r.totalBattles || (wins + losses);
      this.saveOverviewBattles.textContent = `${total} 場 (${wins} 勝 / ${losses} 敗)`;
    }

    if (this.saveSeedOutput) {
      const codeRes = await this.sendCommand(Commands.ACCOUNT_ISSUE_TRANSFER_CODE);
      this.saveSeedOutput.value = codeRes?.code || (this.store?.exportSaveCode ? this.store.exportSaveCode() : "");
    }
    if (this.saveSeedInput) {
      this.saveSeedInput.value = "";
    }

    const switchSection = $("#save-mode-switch-section");
    if (switchSection) {
      const serverUrl = typeof window !== "undefined" ? (window.__KORAKU_CONFIG__?.serverUrl || window.KORAKU_SERVER_URL || (location.protocol !== "file:" ? "wss://ws.koraku.app" : null)) : null;
      const isOffline = this.client ? (this.client.connectionState === ConnectionStates.OFFLINE || this.client.connectionState === "offline") : true;
      switchSection.hidden = !(serverUrl && isOffline);
    }
  }

  handleCopySaveSeed() {
    const seed = this.saveSeedOutput?.value || (this.store?.exportSaveCode ? this.store.exportSaveCode() : "");
    if (!seed) return;

    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(seed).then(() => {
        this.showToast(I18n.t("ui.toastSeedCopied"), "success");
      }).catch(() => {
        if (this.saveSeedOutput) {
          this.saveSeedOutput.focus();
          this.saveSeedOutput.select();
          try {
            document.execCommand("copy");
            this.showToast(I18n.t("ui.toastSeedCopied"), "success");
          } catch {
            this.showToast(I18n.t("ui.toastSeedCopied"), "success");
          }
        }
      });
    } else if (this.saveSeedOutput) {
      this.saveSeedOutput.focus();
      this.saveSeedOutput.select();
      try {
        document.execCommand("copy");
        this.showToast(I18n.t("ui.toastSeedCopied"), "success");
      } catch {
        this.showToast(I18n.t("ui.toastSeedCopied"), "success");
      }
    }
  }

  async handleImportSaveSeed() {
    const rawInput = this.saveSeedInput ? this.saveSeedInput.value.trim() : "";
    if (!rawInput) {
      this.showToast(I18n.t("ui.toastSeedEmpty"), "warning");
      if (this.saveSeedInput) this.saveSeedInput.focus();
      return;
    }

    const confirmed = window.confirm(I18n.t("ui.confirmImportSeed"));
    if (!confirmed) return;

    const result = await this.sendCommand(Commands.ACCOUNT_CLAIM_TRANSFER_CODE, { code: rawInput });
    if (result && result.ok) {
      this.showToast({ ...result, message: result.message || I18n.t("ui.toastImportSuccess"), tone: "success" });
      this.closeSaveRecordModal();
      this.renderStore(this.getStoreSnapshot());
    } else {
      this.showToast({ ...result, message: result?.message || result?.error || I18n.t("ui.toastImportFailed"), tone: "danger" });
      if (this.saveSeedInput) this.saveSeedInput.focus();
    }
  }

  async handleResetSave() {
    const confirmed = window.confirm(I18n.t("ui.resetConfirm") || "確定要清除所有等級、星砂、道具與戰績，重新開始嗎？");
    if (confirmed) {
      await this.sendCommand(Commands.ACCOUNT_DELETE);
      this.showToast((I18n.t("ui.resetSave") || "存檔重置") + " ✓", "success");
      this.populateSaveRecordModal();
      this.renderStore(this.getStoreSnapshot());
    }
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

  updateAutoBattleButton(isPaused, autoBattleInfo = null) {
    const toggleBtn = document.querySelector("#btn-toggle-autobattle, #btn-stop-autobattle, .btn-toggle-autobattle");
    const toggleIcon = document.querySelector("#btn-toggle-autobattle-icon, .toggle-icon");
    const toggleText = document.querySelector("#btn-toggle-autobattle-text");
    const autoBattleText = document.querySelector("#auto-battle-hud-text");

    if (toggleBtn) {
      toggleBtn.classList.toggle("is-paused", Boolean(isPaused));
    }
    if (toggleIcon) {
      toggleIcon.textContent = isPaused ? "▶" : "⏸";
    }
    if (toggleText) {
      const rawText = isPaused ? I18n.t("ui.btnResumeAutoBattle") : I18n.t("ui.btnPauseAutoBattle");
      toggleText.textContent = rawText.replace(/^[▶⏸⏹\s]+/, "");
    }

    const info = autoBattleInfo || this.battle?.autoBattle;
    if (info?.active && autoBattleText) {
      const currentRun = info.totalRounds - info.remainingRounds + 1;
      const templateKey = isPaused ? "ui.autoBattleHudPaused" : "ui.autoBattleHudRunning";
      autoBattleText.textContent = I18n.t(templateKey, {
        current: Math.min(currentRun, info.totalRounds),
        total: info.totalRounds,
        wins: info.wins,
        losses: info.losses
      });
    }
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
    const snap = this.getStoreSnapshot();
    $("#battle-player-level").textContent = "LEVEL " + String(snap.profile?.level || 1).padStart(2, "0");

    const playerStats = snap.playerStats || {};
    const playerAtk = playerStats.damage || 50;
    if (this.playerAtkText) {
      this.playerAtkText.textContent = String(playerAtk);
    }

    // Single vs Dual Enemy Boss HUD
    const singleHud = $("#enemy-hud-single");
    const dualHud = $("#enemy-hud-dual");
    if (state.stage.dualEnemy && state.enemies?.length >= 2) {
      if (singleHud) singleHud.hidden = true;
      if (dualHud) dualHud.hidden = false;
      const left = state.enemies.find((e) => e.id === "left");
      const right = state.enemies.find((e) => e.id === "right");
      const multiplier = state.stage.enemyDamageMultiplier || 1;
      const enemyAtk = state.stage.isDojo
        ? Number(state.stage.customDamage ?? 0)
        : Math.round(BATTLE_RULES.enemyDamage * multiplier);
      if (this.enemyLeftAtkText) this.enemyLeftAtkText.textContent = String(enemyAtk);
      if (this.enemyRightAtkText) this.enemyRightAtkText.textContent = String(enemyAtk);
      if (left) {
        $("#enemy-left-name").textContent = state.stage.isDojo ? (I18n.t("dojo.dummySilhouetteLeft") || left.name) : (I18n.t("dialogue.speakerPlatinumKohaku") + "・" + I18n.t("directions.left"));
        $("#enemy-left-hp-text").textContent = left.hp.toLocaleString("zh-TW") + " / " + left.maxHp.toLocaleString("zh-TW");
        $("#enemy-left-hp-fill").style.width = clampPercent(left.hp, left.maxHp) + "%";
        const leftCard = document.querySelector("[data-target-enemy='left']");
        if (leftCard) {
          leftCard.classList.toggle("is-selected", state.targetEnemyId === "left" && left.alive);
          leftCard.classList.toggle("is-dead", !left.alive);
        }
      }
      if (right) {
        $("#enemy-right-name").textContent = state.stage.isDojo ? (I18n.t("dojo.dummySilhouetteRight") || right.name) : (I18n.t("dialogue.speakerPlatinumKohaku") + "・" + I18n.t("directions.right"));
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
      const multiplier = state.stage.enemyDamageMultiplier || 1;
      const enemyAtk = state.stage.isDojo
        ? Number(state.stage.customDamage ?? 0)
        : Math.round(BATTLE_RULES.enemyDamage * multiplier);
      if (this.enemyAtkText) this.enemyAtkText.textContent = String(enemyAtk);
      $("#enemy-name").textContent = state.stage.isDojo ? (I18n.t("dojo.dummySilhouette") || "影・小樂") : (state.stage.final ? I18n.t("dialogue.speakerPlatinumKohaku") : I18n.t("dialogue.speakerKohaku"));
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
      const isSil = Boolean(state.stage.isSilhouette);
      this.battleCharacterWrap.classList.toggle("is-dual-stage", Boolean(state.stage.dualEnemy));
      this.battleCharacterWrap.classList.toggle("is-silhouette", isSil);
      if (this.battleCharacterSingle) this.battleCharacterSingle.classList.toggle("is-silhouette", isSil);
      if (this.battleCharactersDual) this.battleCharactersDual.classList.toggle("is-silhouette", isSil);
      if (this.battleCharacter) this.battleCharacter.classList.toggle("is-silhouette", isSil);
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

    if (isEnemyDual) {
      if (singleHandWrap) singleHandWrap.hidden = true;
      if (dualHandWrap) dualHandWrap.hidden = false;

      const leftHand = state.opponentHands?.left ? I18n.getLocalizedHand(state.opponentHands.left) : null;
      const rightHand = state.opponentHands?.right ? I18n.getLocalizedHand(state.opponentHands.right) : null;

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

      const opponent = state.opponentHand ? I18n.getLocalizedHand(state.opponentHand) : null;
      if (state.phase === "countdown") {
        $("#enemy-hand-display").textContent = "✊";
        $("#enemy-hand-label").textContent = state.countdown <= 3 ? I18n.t("ui.preparing") : I18n.t("ui.unrevealed");
      } else {
        $("#enemy-hand-display").textContent = opponent ? opponent.glyph : "？";
        $("#enemy-hand-label").textContent = opponent ? opponent.label : I18n.t("ui.unrevealed");
      }
    }

    const canSelectHand = state.phase === "countdown" || (state.phase === "reaction" && state.morphActive);
    if (isPlayerDual) {
      if (this.handSelectorSingle) this.handSelectorSingle.hidden = true;
      if (this.handSelectorDual) this.handSelectorDual.hidden = false;
      document.querySelectorAll("[data-hand-slot='left'][data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHands?.left);
        button.classList.toggle("is-morph-target", Boolean(state.phase === "reaction" && state.morphActive));
        button.disabled = !canSelectHand;
      });
      document.querySelectorAll("[data-hand-slot='right'][data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHands?.right);
        button.classList.toggle("is-morph-target", Boolean(state.phase === "reaction" && state.morphActive));
        button.disabled = !canSelectHand;
      });
    } else {
      if (this.handSelectorSingle) this.handSelectorSingle.hidden = false;
      if (this.handSelectorDual) this.handSelectorDual.hidden = true;
      document.querySelectorAll("#hand-selector-single [data-hand]").forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.hand === state.selectedHand);
        button.classList.toggle("is-morph-target", Boolean(state.phase === "reaction" && state.morphActive));
        button.disabled = !canSelectHand;
      });
    }

    const pauseModal = $("#battle-pause-modal");
    if (pauseModal) {
      pauseModal.hidden = !state.isPaused;
      pauseModal.setAttribute("aria-hidden", String(!state.isPaused));
    }

    // Auto-Battle HUD Banner
    const autoBattleBanner = $("#auto-battle-hud-banner");
    if (autoBattleBanner) {
      if (state.autoBattle?.active) {
        autoBattleBanner.hidden = false;
        this.updateAutoBattleButton(Boolean(state.autoBattle.isPaused), state.autoBattle);
      } else {
        autoBattleBanner.hidden = true;
      }
    }

    // Frozen Kohaku Hand Badge
    const frozenBadge = $("#frozen-hand-badge");
    const frozenLabel = $("#frozen-hand-badge-label");
    if (frozenBadge) {
      if (state.frozenEnemyHand) {
        frozenBadge.hidden = false;
        if (frozenLabel) {
          const handObj = I18n.getLocalizedHand(state.frozenEnemyHand);
          frozenBadge.innerHTML = '<span>' + I18n.t("ui.frozenBadge", { hand: '<b id="frozen-hand-badge-label">' + (handObj?.label || "") + '</b>' }) + '</span>';
        }
      } else {
        frozenBadge.hidden = true;
      }
    }

    const morph = $("#morph-skill");
    const morphReady = state.phase === "reaction" && !state.morphActive && !state.morphUsed && state.playerMp >= 25;
    morph.disabled = !morphReady;
    morph.classList.toggle("is-ready", morphReady);
    morph.classList.toggle("is-active", Boolean(state.morphActive));

    const countdownValue = $("#countdown-value");
    const countdownCaption = $("#countdown-caption");
    if (state.phase === "countdown") {
      this._stopReactionTicker();
      if (!this._countdownTickerId || this._currentCountdownRound !== state.round || (this._wasPaused && !state.isPaused)) {
        this._currentCountdownRound = state.round;
        this._startCountdownTicker(state);
      }
      this._wasPaused = Boolean(state.isPaused);
      if (typeof state.countdown === "number" && !this._countdownTickerId) {
        countdownValue.textContent = state.countdown;
      }
      countdownCaption.textContent = I18n.t("ui.countdownCaption");
    } else if (state.phase === "reaction") {
      this._stopCountdownTicker();
      if (!this._reactionTickerId || justRevealed || this._currentReactionRound !== state.round || (state.morphActive && !this._morphReactionStarted) || (this._wasPaused && !state.isPaused)) {
        this._currentReactionRound = state.round;
        this._morphReactionStarted = Boolean(state.morphActive);
        this._startReactionTicker(state);
      }
      this._wasPaused = Boolean(state.isPaused);
      if (typeof state.reactionRemaining === "number" && !this._reactionTickerId) {
        countdownValue.textContent = state.reactionRemaining.toFixed(1);
      }
      countdownCaption.textContent = state.morphActive ? I18n.t("ui.morphSelectCaption") : I18n.t("ui.morphCaption");
    } else if (state.phase === "qte") {
      this._clearBattleTickers();
      countdownValue.textContent = "!";
      countdownCaption.textContent = I18n.t("ui.qteCaption");
    } else {
      this._clearBattleTickers();
      countdownValue.textContent = state.lastResult === "win" ? I18n.t("ui.battleWon") : state.lastResult === "loss" ? I18n.t("ui.battleLost") : I18n.t("ui.battleDraw");
      countdownCaption.textContent = I18n.t("ui.settleCaption");
    }

    if (justRevealed) {
      this.roundOracle.classList.remove("is-revealing");
      void this.roundOracle.offsetWidth;
      this.roundOracle.classList.add("is-revealing");
      clearTimeout(this.revealTimer);
      this.revealTimer = setTimeout(() => {
        this.roundOracle?.classList.remove("is-revealing");
      }, 340);
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

      const delay = Math.max(0, (this.qteSuccessHoldUntil || 0) - performance.now());
      if (delay > 0) {
        clearTimeout(this.qteCloseTimer);
        this.qteCloseTimer = setTimeout(() => {
          this.qteOverlay.classList.remove("is-active");
          this.qteOverlay.setAttribute("aria-hidden", "true");
        }, delay);
      } else {
        clearTimeout(this.qteCloseTimer);
        this.qteOverlay.classList.remove("is-active");
        this.qteOverlay.setAttribute("aria-hidden", "true");
      }
      return;
    }

    clearTimeout(this.qteCloseTimer);
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
            (getDirectionSvg(id) || direction?.glyph || "") +
            (hint ? '<small class="qte-arrow-key-hint keyboard-only">' + hint + "</small>" : "") +
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
            (getDirectionSvg(id) || direction?.glyph || "") +
            (hint ? '<small class="qte-arrow-key-hint keyboard-only">' + hint + "</small>" : "") +
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
      return '<span class="qte-arrow' + status + '" aria-label="' + direction.label + '">' + (getDirectionSvg(id) || direction.glyph) + "</span>";
    }).join("");
    $("#qte-timer-fill").style.width = Math.max(0, Math.min(100, state.progress * 100)) + "%";
    $("#qte-time").textContent = (state.remainingMs / 1000).toFixed(2);
    this.renderQteInputHint(state);
    this.renderHeldQteDirections();
  }

  renderSlotHint(hintEl, expected, mode) {
    if (!hintEl || !expected) return;
    const chord = getDirectionChord(expected);
    const direction = DIRECTIONS.find((item) => item.id === expected);
    const keyTip = mode === "WASD" ? (direction?.keys?.find((k) => ["w", "a", "s", "d", "q", "e", "z", "c"].includes(k))?.toUpperCase() || "") : "";
    const svg = getDirectionSvg(expected) || direction?.glyph || "—";
    if (chord) {
      const svg1 = getDirectionSvg(chord[0]) || chord[0];
      const svg2 = getDirectionSvg(chord[1]) || chord[1];
      hintEl.innerHTML = '<span class="mobile-only">目標 <b>' + svg + '</b></span>' +
        '<span class="keyboard-only">斜向 <b>' + svg1 + "</b><i>＋</i><b>" + svg2 + "</b>" + (keyTip ? " (" + keyTip + ")" : "") + "</span>";
      hintEl.classList.add("is-chord");
    } else {
      hintEl.innerHTML = '輸入 <b>' + svg + "</b>" + (keyTip ? '<span class="keyboard-only"> (' + keyTip + ")</span>" : "");
      hintEl.classList.remove("is-chord");
    }
  }

  renderQteInputHint(state) {
    const expected = state.sequence[state.index];
    const chord = getDirectionChord(expected);
    const hint = $("#qte-input-hint");
    if (!hint) return;
    const direction = DIRECTIONS.find((item) => item.id === expected);
    const svg = getDirectionSvg(expected) || direction?.glyph || "—";
    if (chord) {
      const svg1 = getDirectionSvg(chord[0]) || chord[0];
      const svg2 = getDirectionSvg(chord[1]) || chord[1];
      hint.innerHTML = '<span class="mobile-only">目標方向 <b>' + svg + '</b></span>' +
        '<span class="keyboard-only">斜向合成 <b>' + svg1 + "</b><i>＋</i><b>" + svg2 + "</b></span>";
      hint.classList.add("is-chord");
    } else {
      hint.innerHTML = '輸入方向 <b>' + svg + "</b>";
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

  flashQteCorrect(data) {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try { navigator.vibrate(18); } catch (_) {}
    }

    const directionId = data?.directionId;
    const slot = data?.slot;
    const index = data?.index;

    // Highlight buttons with golden glow flash
    let buttons = [];
    if (slot === "left") {
      buttons = Array.from(document.querySelectorAll(`#touch-pad-left [data-direction="${directionId}"]`));
    } else if (slot === "right") {
      buttons = Array.from(document.querySelectorAll(`#touch-pad-right [data-direction="${directionId}"]`));
    } else {
      buttons = Array.from(document.querySelectorAll(`[data-direction="${directionId}"]`));
    }

    buttons.forEach((btn) => {
      btn.classList.remove("is-correct-flash");
      void btn.offsetWidth;
      btn.classList.add("is-correct-flash");
      setTimeout(() => btn.classList.remove("is-correct-flash"), 320);
    });

    // Highlight hit arrow in sequence
    let seqEl = $("#qte-sequence");
    if (slot === "left") seqEl = $("#dual-qte-sequence-left");
    if (slot === "right") seqEl = $("#dual-qte-sequence-right");
    if (seqEl && typeof index === "number") {
      const arrows = seqEl.querySelectorAll(".qte-arrow");
      if (arrows[index]) {
        arrows[index].classList.remove("is-hit-flash");
        void arrows[index].offsetWidth;
        arrows[index].classList.add("is-hit-flash");
      }
    }
  }

  flashQteWrong(slot = null, received = null) {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try { navigator.vibrate([45]); } catch (_) {}
    }

    let sequence = $("#qte-sequence");
    if (slot === "left") sequence = $("#dual-qte-sequence-left");
    if (slot === "right") sequence = $("#dual-qte-sequence-right");

    if (sequence) {
      sequence.classList.remove("is-wrong");
      void sequence.offsetWidth;
      sequence.classList.add("is-wrong");
    }

    if (received) {
      let buttons = [];
      if (slot === "left") {
        buttons = Array.from(document.querySelectorAll(`#touch-pad-left [data-direction="${received}"]`));
      } else if (slot === "right") {
        buttons = Array.from(document.querySelectorAll(`#touch-pad-right [data-direction="${received}"]`));
      } else {
        buttons = Array.from(document.querySelectorAll(`[data-direction="${received}"]`));
      }
      buttons.forEach((btn) => {
        btn.classList.remove("is-wrong-flash");
        void btn.offsetWidth;
        btn.classList.add("is-wrong-flash");
        setTimeout(() => btn.classList.remove("is-wrong-flash"), 340);
      });
    }
  }

  handleQteFinished(result) {
    if (!result) return;
    const isSuccess = result.mode === "dual" ? (result.left?.success || result.right?.success) : result.success;
    if (isSuccess) {
      this.qteSuccessHoldUntil = performance.now() + 500;
    } else {
      this.qteSuccessHoldUntil = 0;
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        try { navigator.vibrate([80]); } catch (_) {}
      }
      const singlePanel = $("#qte-panel-single") || $("#qte-panel");
      const dualPanel = $("#qte-panel-dual");
      [singlePanel, dualPanel].forEach((panel) => {
        if (panel) {
          panel.classList.remove("is-qte-failed");
          void panel.offsetWidth;
          panel.classList.add("is-qte-failed");
          setTimeout(() => panel.classList.remove("is-qte-failed"), 500);
        }
      });
    }
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
    this.recentDamageLog = [];
    if (this.battleDamageLogList) this.battleDamageLogList.innerHTML = "";
    if (this.battleDamageLog) this.battleDamageLog.hidden = true;
    this.battleArena?.classList.add("is-settlement");
    this.resultOverlay?.classList.add("is-active");
    this.resultOverlay?.setAttribute("aria-hidden", "false");
    if (this.battleCharactersDual) this.battleCharactersDual.hidden = true;
    if (this.battleCharacterSingle) this.battleCharacterSingle.hidden = false;
    if (this.battleCharacterWrap) this.battleCharacterWrap.classList.remove("is-dual-stage");
    if (this.battleCharacter && state.appearance) this.battleCharacter.setAttribute("src", state.appearance);
    $("#reward-coins").textContent = "+" + (state.reward?.coins ?? 0);
    $("#reward-xp").textContent = "+" + (state.reward?.xp ?? 0);
    $("#reward-level").textContent = "+" + (state.reward?.levelsGained ?? 0);
    $("#reward-level-wrap").hidden = (state.reward?.levelsGained ?? 0) <= 0;
    if ($("#reward-combat-dps")) $("#reward-combat-dps").textContent = `${state.reward?.dps ?? 0.0}`;
    if ($("#reward-damage-dealt")) $("#reward-damage-dealt").textContent = `${state.reward?.damageDealt ?? 0}`;
    if ($("#reward-damage-taken")) $("#reward-damage-taken").textContent = `${state.reward?.damageTaken ?? 0}`;
    if ($("#reward-duration")) $("#reward-duration").textContent = `${state.reward?.durationSec ?? 0}s`;
    $("#result-kicker").textContent = state.won ? "BATTLE COMPLETE" : "BATTLE FAILED";

    const watermelon = state.watermelon || { attempts: 0, maxAttempts: 3, successes: 0 };
    const watermelonGame = $("#watermelon-game");
    if (watermelonGame) watermelonGame.hidden = state.scene !== "watermelonAim";
    this.setWatermelonTicker(state.scene === "watermelonAim");
    $("#watermelon-attempt").textContent = "第 " + (watermelon.attempts + 1) + " 刀 / " + (watermelon.maxAttempts || 3);
    $("#watermelon-successes").textContent = I18n.t("ui.watermelonScore") + " " + watermelon.successes;
    const tolerance = state.tolerance ?? (0.13 * (0.825 ** (watermelon.attempts || 0)));
    $("#watermelon-target").style.left = ((state.target || 0.5) * 100) + "%";
    $("#watermelon-target").style.width = (tolerance * 2 * 100) + "%";
    const watermelonStatus = $("#watermelon-status");
    if (watermelonStatus) watermelonStatus.hidden = !["watermelonResult", "watermelonComplete"].includes(state.scene);
    let actions = "";

    if (state.scene === "defeat") {
      $("#result-title").textContent = I18n.t("ui.postBattleDefeatTitle");
      $("#result-message").textContent = I18n.t("ui.postBattleDefeatDesc");
      actions = this.postButtons(true);
    } else if (state.scene === "victory") {
      $("#result-title").textContent = I18n.t("ui.postBattleVictoryTitle");
      $("#result-message").textContent = I18n.t("ui.postBattleVictoryDesc");
      actions =
        '<button type="button" class="button-primary" data-post-action="swimsuit">' + I18n.t("ui.btnAskSwimsuitSpace") + ' <kbd>SPACE</kbd></button>' +
        this.postButtons(false);
    } else if (state.scene === "swimsuit") {
      $("#result-title").textContent = I18n.t("ui.postBattleVictoryTitle");
      $("#result-message").textContent = I18n.t("dialogue.askSwimsuitLine");
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">' + I18n.t("ui.btnPlayWatermelonSpace") + ' <kbd>SPACE</kbd></button>' +
        this.postButtons(false);
    } else if (state.scene === "watermelonAim") {
      $("#result-title").textContent = I18n.t("ui.watermelonTitle");
      $("#result-message").textContent = I18n.t("ui.watermelonDesc");
      actions = "";
    } else if (state.scene === "watermelonResult") {
      const remaining = (watermelon.maxAttempts || 3) - watermelon.attempts;
      $("#result-title").textContent = watermelon.lastCutSuccess ? "Hit!" : "Miss!";
      $("#result-message").textContent = (watermelon.lastCutSuccess ? I18n.t("dialogue.watermelonHit", { remaining }) : I18n.t("dialogue.watermelonMiss", { remaining }));
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">' + I18n.t("ui.btnNextStrikeSpace", { attempt: watermelon.attempts + 1 }) + ' <kbd>SPACE</kbd></button>' +
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
      if (marker) {
        marker.style.left = (this.getWatermelonMarkerPosition() * 100) + "%";
      }
      this.watermelonFrame = window.requestAnimationFrame(update);
    };
    update();
  }

  renderFloatingWatermelon(state) {
    const floating = $("#floating-autobattle-watermelon");
    if (!floating) return;
    const stock = state?.stock ?? this.postBattle?.getWatermelonStock?.() ?? 0;
    const stockCountEl = $("#auto-watermelon-stock-count");
    if (stockCountEl) stockCountEl.textContent = stock;

    if (!this.battle?.autoBattle?.active || this.battle?.autoBattle?.isPaused) {
      floating.hidden = true;
      floating.setAttribute("aria-hidden", "true");
      this.setFloatingWatermelonTicker(false);
      return;
    }

    if (state.scene === "idle" && stock <= 0) {
      floating.hidden = true;
      floating.setAttribute("aria-hidden", "true");
      this.setFloatingWatermelonTicker(false);
      return;
    }

    floating.hidden = false;
    floating.setAttribute("aria-hidden", "false");
    this.hudDragController?.applyPosition("watermelon");
    floating.classList.toggle("is-zoomed", Boolean(this.isWatermelonZoomed));

    const zoomBtn = $("#btn-toggle-watermelon-zoom");
    if (zoomBtn) {
      zoomBtn.textContent = this.isWatermelonZoomed ? "🔍 1x" : "🔍 2.5x";
    }

    const avatarImg = $("#floating-watermelon-kohaku");
    if (avatarImg && state.appearance) {
      avatarImg.setAttribute("src", state.appearance);
    }

    const watermelon = state.watermelon || { attempts: 0, maxAttempts: 3, successes: 0 };
    const attemptEl = $("#auto-watermelon-attempt");
    const successesEl = $("#auto-watermelon-successes");
    if (attemptEl) attemptEl.textContent = "第 " + Math.min(3, watermelon.attempts + 1) + " 刀 / 3";
    if (successesEl) successesEl.textContent = I18n.t("ui.watermelonScore") + " " + watermelon.successes;

    const targetEl = $("#auto-watermelon-target");
    const tolerance = state.tolerance ?? (0.13 * (0.825 ** (watermelon.attempts || 0)));
    if (targetEl) {
      targetEl.style.left = ((state.target || 0.5) * 100) + "%";
      targetEl.style.width = (tolerance * 2 * 100) + "%";
    }

    const hintEl = $("#auto-watermelon-hint");
    const trackEl = $("#auto-watermelon-track");
    const strikeBtn = $("#btn-auto-watermelon-strike");
    const nextStrikeBtn = $("#btn-auto-watermelon-next-strike");
    const nextRoundBtn = $("#btn-auto-watermelon-next-round");
    const startBtn = $("#btn-auto-watermelon-start");
    const statusEl = $("#auto-watermelon-status");

    this.setFloatingWatermelonTicker(state.scene === "watermelonAim");

    if (state.scene === "watermelonAim") {
      if (hintEl) hintEl.textContent = I18n.t("ui.floatingWatermelonAimDesc");
      if (trackEl) trackEl.hidden = false;
      if (strikeBtn) strikeBtn.hidden = false;
      if (nextStrikeBtn) nextStrikeBtn.hidden = true;
      if (nextRoundBtn) nextRoundBtn.hidden = true;
      if (startBtn) startBtn.hidden = true;
      if (statusEl) statusEl.hidden = true;
    } else if (state.scene === "watermelonResult") {
      const remaining = 3 - watermelon.attempts;
      const hitText = watermelon.lastCutSuccess
        ? I18n.t("dialogue.watermelonHit", { remaining })
        : I18n.t("dialogue.watermelonMiss", { remaining });
      if (hintEl) hintEl.textContent = hitText;
      if (trackEl) trackEl.hidden = false;
      if (strikeBtn) strikeBtn.hidden = true;
      if (nextStrikeBtn) {
        nextStrikeBtn.hidden = false;
        nextStrikeBtn.textContent = I18n.t("ui.btnNextStrikeSpace", { attempt: watermelon.attempts + 1 });
      }
      if (nextRoundBtn) nextRoundBtn.hidden = true;
      if (startBtn) startBtn.hidden = true;
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = watermelon.lastCutSuccess ? "🎯 " + I18n.t("dialogue.watermelonHit", { remaining }) : "💨 " + I18n.t("dialogue.watermelonMiss", { remaining });
      }
    } else if (state.scene === "watermelonComplete") {
      const finishText = watermelon.successes > 0
        ? I18n.t("dialogue.watermelonAllHit", { successes: watermelon.successes })
        : I18n.t("dialogue.watermelonDone");
      if (hintEl) hintEl.textContent = finishText;
      if (trackEl) trackEl.hidden = true;
      if (strikeBtn) strikeBtn.hidden = true;
      if (nextStrikeBtn) nextStrikeBtn.hidden = true;
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = "🎉 +" + (watermelon.rewardXp || (watermelon.successes * 100)) + " EXP！";
      }
      if (stock > 0) {
        if (nextRoundBtn) {
          nextRoundBtn.hidden = false;
          nextRoundBtn.textContent = I18n.t("ui.btnNextWatermelonRound", { count: stock });
        }
        if (startBtn) startBtn.hidden = true;
      } else {
        if (nextRoundBtn) nextRoundBtn.hidden = true;
        if (startBtn) startBtn.hidden = true;
        if (statusEl) {
          statusEl.textContent += "\n" + I18n.t("ui.floatingWatermelonNoStock");
        }
      }
    } else { // idle
      if (trackEl) trackEl.hidden = true;
      if (strikeBtn) strikeBtn.hidden = true;
      if (nextStrikeBtn) nextStrikeBtn.hidden = true;
      if (stock > 0) {
        if (startBtn) {
          startBtn.hidden = false;
          startBtn.textContent = I18n.t("ui.btnStartWatermelonRound") + " (" + stock + ")";
        }
        if (nextRoundBtn) nextRoundBtn.hidden = true;
        if (hintEl) hintEl.textContent = I18n.t("ui.autoWatermelonStock", { count: stock });
      } else {
        if (startBtn) startBtn.hidden = true;
        if (nextRoundBtn) nextRoundBtn.hidden = true;
        if (hintEl) hintEl.textContent = I18n.t("ui.floatingWatermelonNoStock");
      }
      if (statusEl) statusEl.hidden = true;
    }
  }

  setFloatingWatermelonTicker(active) {
    window.cancelAnimationFrame(this.floatingWatermelonFrame);
    if (!active) return;
    const marker = $("#auto-watermelon-marker");
    if (!marker) return;
    const update = () => {
      if (marker) {
        marker.style.left = (this.getAutoWatermelonMarkerPosition() * 100) + "%";
      }
      this.floatingWatermelonFrame = window.requestAnimationFrame(update);
    };
    update();
  }

  hideFloatingWatermelon() {
    this.setFloatingWatermelonTicker(false);
    const floating = $("#floating-autobattle-watermelon");
    if (floating) {
      floating.hidden = true;
      floating.setAttribute("aria-hidden", "true");
    }
  }

  postButtons(rematchPrimary) {
    const rematchClass = rematchPrimary ? "button-primary" : "button-secondary";
    return '<button type="button" class="' + rematchClass + '" data-post-action="rematch">' + I18n.t("ui.btnRematch") + ' <kbd>E</kbd></button>' +
      '<button type="button" class="button-secondary" data-post-action="stages">' + I18n.t("ui.btnSelectStages") + ' <kbd>C</kbd></button>' +
      '<button type="button" class="button-secondary" data-post-action="home">' + I18n.t("ui.btnReturnHome") + ' <kbd>Q</kbd></button>';
  }

  async handlePostAction(action) {
    if (action === "swimsuit") {
      await this.sendCommand(Commands.POST_BATTLE_REQUEST_SWIMSUIT);
      return;
    }
    if (action === "watermelon") {
      await this.sendCommand(Commands.POST_BATTLE_START_WATERMELON);
      return;
    }
    if (action === "rematch") {
      this.startStage(this.postState?.stage?.id || 1);
      return;
    }
    if (action === "stages" || action === "home") {
      await this.sendCommand(Commands.AUTO_BATTLE_STOP);
      await this.sendCommand(Commands.BATTLE_ABANDON);
      this.battleArena?.classList.remove("is-settlement");
      this.resultOverlay?.classList.remove("is-active");
      this.navigate(action);
    }
  }

  showToast(messageOrPayload, tone = "normal") {
    let msg = "";
    let t = tone;
    if (typeof messageOrPayload === "object" && messageOrPayload !== null) {
      if (messageOrPayload.key) {
        const localized = I18n.t(messageOrPayload.key, messageOrPayload.params || {});
        msg = (localized && localized !== messageOrPayload.key) ? localized : (messageOrPayload.message || messageOrPayload.text || messageOrPayload.key);
      } else if (messageOrPayload.message) {
        if (typeof messageOrPayload.message === "object" && messageOrPayload.message.key) {
          const localized = I18n.t(messageOrPayload.message.key, messageOrPayload.message.params || {});
          msg = (localized && localized !== messageOrPayload.message.key) ? localized : (messageOrPayload.message.message || messageOrPayload.message.key);
        } else {
          msg = String(messageOrPayload.message);
        }
      } else if (messageOrPayload.text) {
        msg = String(messageOrPayload.text);
      }
      if (messageOrPayload.tone) t = messageOrPayload.tone;
    } else {
      msg = String(messageOrPayload || "");
    }
    window.clearTimeout(this.toastTimer);
    if (this.toastElement) {
      this.toastElement.textContent = msg;
      this.toastElement.dataset.tone = t;
      this.toastElement.classList.add("is-visible");
      this.toastTimer = window.setTimeout(() => {
        this.toastElement?.classList.remove("is-visible");
      }, 2400);
    }
  }

  openDojoModal({ pushHistory = true } = {}) {
    if (this.dojoModal) {
      this.dojoModal.hidden = false;
      this.dojoModal.setAttribute("aria-hidden", "false");
      if (pushHistory && typeof window !== "undefined" && window.history) {
        if (window.location.hash !== "#dojo") {
          window.history.pushState({ modal: "dojo", screen: this.currentScreen }, "", "#dojo");
        }
      }
    }
  }

  closeDojoModal({ popHistory = true } = {}) {
    if (this.dojoModal) {
      this.dojoModal.hidden = true;
      this.dojoModal.setAttribute("aria-hidden", "true");
      if (popHistory && typeof window !== "undefined" && window.location.hash === "#dojo" && window.history) {
        window.history.back();
      }
    }
  }

  startDojoQte(style = "single") {
    this.stopDojoQte();
    this.dojoQteActive = true;
    this.dojoQteStyle = style;
    this.dojoCombo = 0;
    this.dojoMaxCombo = 0;
    this.dojoTotalAttempts = 0;
    this.dojoSuccessHits = 0;
    this.dojoReactionTimes = [];

    const modeTitle = $("#dojo-qte-mode-title");
    if (modeTitle) {
      modeTitle.textContent = style === "dual" ? I18n.t("dojo.mode1Style2") : I18n.t("dojo.mode1Style1");
    }

    const singleContainer = $("#dojo-qte-single-container");
    const dualContainer = $("#dojo-qte-dual-container");
    const dualPadWrap = $("#dojo-dual-qte-pad-wrap");
    if (singleContainer) singleContainer.hidden = style === "dual";
    if (dualContainer) dualContainer.hidden = style !== "dual";
    if (dualPadWrap) dualPadWrap.hidden = style !== "dual";

    this.updateDojoMetrics();
    this.navigate("dojo-qte");

    if (style === "dual") {
      this.dojoDualQteSystem = new DualQTESystem(this.bus, this.timers, Math.random);
    } else {
      this.dojoQteSystem = new QTESystem(this.bus, this.timers, Math.random);
    }

    this.nextDojoQteStep();
  }

  stopDojoQte() {
    this.dojoQteActive = false;
    if (this.dojoQteSystem) {
      this.dojoQteSystem.stop(false);
      this.dojoQteSystem = null;
    }
    if (this.dojoDualQteSystem) {
      this.dojoDualQteSystem.stop(false);
      this.dojoDualQteSystem = null;
    }
    if (this.dojoStepTimeout) {
      clearTimeout(this.dojoStepTimeout);
      this.dojoStepTimeout = null;
    }
    this.qteKeyboard.reset();
    this.leftQteKeyboard.reset();
    this.rightQteKeyboard.reset();
  }

  updateDojoMetrics() {
    const comboEl = $("#dojo-metric-combo");
    const maxComboEl = $("#dojo-metric-max-combo");
    const avgReactionEl = $("#dojo-metric-avg-reaction");
    const successRateEl = $("#dojo-metric-success-rate");

    if (comboEl) comboEl.textContent = String(this.dojoCombo);
    if (maxComboEl) maxComboEl.textContent = String(this.dojoMaxCombo);
    if (avgReactionEl) {
      const avg = this.dojoReactionTimes.length > 0
        ? Math.round(this.dojoReactionTimes.reduce((a, b) => a + b, 0) / this.dojoReactionTimes.length)
        : 0;
      avgReactionEl.textContent = avg + " ms";
    }
    if (successRateEl) {
      const rate = this.dojoTotalAttempts > 0
        ? Math.round((this.dojoSuccessHits / this.dojoTotalAttempts) * 100)
        : 100;
      successRateEl.textContent = rate + "%";
    }
  }

  nextDojoQteStep() {
    if (!this.dojoQteActive) return;
    this.dojoStepStartTime = performance.now();

    if (this.dojoQteStyle === "dual") {
      this.dojoDualQteSystem.start({
        length: 5,
        durationMs: 6000,
        directionMode: "all",
        maxErrors: 2
      });
    } else {
      this.dojoQteSystem.start({
        length: 5,
        durationMs: 5000,
        directionMode: "all",
        maxErrors: 2
      });
    }
  }

  renderDojoQte(state) {
    if (!this.dojoQteActive) return;
    if (state.mode === "dual") {
      const leftSeq = $("#dojo-dual-sequence-left");
      const rightSeq = $("#dojo-dual-sequence-right");
      const arrowMap = {
        up: "W",
        down: "S",
        left: "A",
        right: "D",
        upLeft: "Q",
        upRight: "E",
        downLeft: "Z",
        downRight: "C"
      };

      if (leftSeq && state.left?.sequence) {
        leftSeq.innerHTML = state.left.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.left.index ? " is-done" : index === state.left.index ? " is-current" : "";
          const hint = arrowMap[id] || "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' +
            (getDirectionSvg(id) || direction?.glyph || "") +
            (hint ? '<small class="qte-arrow-key-hint keyboard-only">' + hint + "</small>" : "") +
            "</span>";
        }).join("");
      }

      if (rightSeq && state.right?.sequence) {
        rightSeq.innerHTML = state.right.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.right.index ? " is-done" : index === state.right.index ? " is-current" : "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' +
            (getDirectionSvg(id) || direction?.glyph || "") +
            "</span>";
        }).join("");
      }

      const leftStatus = $("#dojo-dual-left-status");
      const rightStatus = $("#dojo-dual-right-status");
      if (leftStatus) {
        if (state.left?.completed) {
          leftStatus.textContent = state.left.success ? "✓ 命中" : "× 失誤";
        } else {
          leftStatus.textContent = "進行中 (" + (state.left?.index || 0) + "/" + (state.left?.sequence?.length || 0) + ")";
        }
      }
      if (rightStatus) {
        if (state.right?.completed) {
          rightStatus.textContent = state.right.success ? "✓ 命中" : "× 失誤";
        } else {
          rightStatus.textContent = "進行中 (" + (state.right?.index || 0) + "/" + (state.right?.sequence?.length || 0) + ")";
        }
      }
      return;
    }

    // Single Dojo QTE
    const seq = $("#dojo-qte-sequence");
    if (seq && state.sequence) {
      seq.innerHTML = state.sequence.map((id, index) => {
        const direction = DIRECTIONS.find((item) => item.id === id);
        const status = index < state.index ? " is-done" : index === state.index ? " is-current" : "";
        return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' + (getDirectionSvg(id) || direction?.glyph || "") + "</span>";
      }).join("");
    }
    const timerFill = $("#dojo-qte-timer-fill");
    if (timerFill) {
      timerFill.style.width = Math.max(0, Math.min(100, state.progress * 100)) + "%";
    }
  }

  handleDojoQteFinished(result) {
    if (!this.dojoQteActive || !result) return;
    const isSuccess = result.mode === "dual" ? (result.left?.success && result.right?.success) : result.success;
    if (isSuccess) {
      const reaction = Math.round(performance.now() - this.dojoStepStartTime);
      this.dojoCombo += 1;
      this.dojoMaxCombo = Math.max(this.dojoMaxCombo, this.dojoCombo);
      this.dojoSuccessHits += 1;
      this.dojoTotalAttempts += 1;
      this.dojoReactionTimes.push(reaction);
      this.updateDojoMetrics();
      this.bus.emit("sound", { name: "select" });
      this.dojoStepTimeout = setTimeout(() => this.nextDojoQteStep(), 350);
    } else {
      this.dojoCombo = 0;
      this.dojoTotalAttempts += 1;
      this.updateDojoMetrics();
      this.bus.emit("sound", { name: "danger" });
      this.dojoStepTimeout = setTimeout(() => this.nextDojoQteStep(), 500);
    }
  }

  async startDojoSandbox({ isDual, customHp, customDamage }) {
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    if (this.battle?.stopAutoBattle) {
      this.battle.stopAutoBattle();
    } else {
      await this.sendCommand(Commands.AUTO_BATTLE_STOP);
    }
    try {
      window.localStorage?.removeItem("koraku_active_postbattle");
      sessionStorage.removeItem("koraku_active_postbattle");
    } catch (_) {}
    const startRes = await this.sendCommand(Commands.BATTLE_START, {
      stageId: null,
      options: { isDojo: true, isDual, customHp, customDamage, isSilhouette: true }
    });
    if (!startRes || startRes.ok === false) return;
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay.classList.remove("is-active");
    this.resultOverlay.setAttribute("aria-hidden", "true");
    this.navigate("battle");
  }

  addDamageLogEntry({ target, targetId, targetName, amount, source, round, actionType, resource }) {
    if (!this.recentDamageLog) this.recentDamageLog = [];
    const currentRound = round ?? this.battle?.state?.round ?? 1;

    let actorName = "";
    let actionBadge = I18n.t("combat.badgeAttack");
    let isHeal = actionType === "heal";
    let isMana = actionType === "mana";
    let isEnemyHit = false;

    if (actionType === "heal") {
      actorName = I18n.t("dialogue.speakerPlayer");
      actionBadge = I18n.t("combat.badgeHeal");
    } else if (actionType === "mana") {
      actorName = I18n.t("dialogue.speakerPlayer");
      actionBadge = I18n.t("combat.badgeMana");
    } else if (actionType === "burn") {
      if (targetId === "left") {
        actorName = I18n.t("directions.left");
      } else if (targetId === "right") {
        actorName = I18n.t("directions.right");
      } else {
        actorName = I18n.t("dialogue.speakerKohaku");
      }
      actionBadge = I18n.t("combat.badgeBurn");
      isEnemyHit = true;
    } else if (actionType === "reflect") {
      if (targetId === "left") {
        actorName = I18n.t("directions.left");
      } else if (targetId === "right") {
        actorName = I18n.t("directions.right");
      } else {
        actorName = I18n.t("dialogue.speakerKohaku");
      }
      actionBadge = "反";
      isEnemyHit = true;
    } else if (target === "enemy") {
      if (targetId === "left") {
        actorName = I18n.t("directions.left");
      } else if (targetId === "right") {
        actorName = I18n.t("directions.right");
      } else {
        actorName = I18n.t("dialogue.speakerKohaku");
      }
      actionBadge = "受";
      isEnemyHit = true;
    } else {
      actorName = I18n.t("dialogue.speakerPlayer");
      actionBadge = "受";
    }

    const entry = {
      id: Date.now() + Math.random(),
      round: currentRound,
      actorName,
      actionBadge,
      amount,
      isHeal,
      isMana,
      isEnemyHit
    };

    this.recentDamageLog.push(entry);
    if (this.recentDamageLog.length > 100) {
      this.recentDamageLog.shift();
    }

    this.updateDamageLogDisplay();
  }

  formatDamageLogItem(item) {
    const locale = I18n.currentLocale || "zh-Hant";
    let actor = item.actorName;
    let badge = item.actionBadge;

    if (locale === "en") {
      const enActors = { "旅人": "Traveler", "小樂": "Koraku", "左": "L", "右": "R" };
      const enBadges = { "攻": "ATK", "受": "HIT", "療": "HEAL", "魔": "MP", "灼": "BURN", "反": "REFL" };
      actor = enActors[actor] || actor;
      badge = enBadges[badge] || badge;
    } else if (locale === "zh-Hans") {
      if (actor === "小樂") actor = "小乐";
    } else if (locale === "ja") {
      if (actor === "小樂") actor = "小楽";
    }

    const typeClass = item.isHeal ? "is-heal" : item.isMana ? "is-mana" : item.isEnemyHit ? "is-enemy-hit" : "is-player-hit";
    const sign = (item.isHeal || item.isMana) ? "+" : "−";
    const unit = item.isMana ? " MP" : item.isHeal ? " HP" : "";
    const bracketOpen = locale === "en" ? "[" : "【";
    const bracketClose = locale === "en" ? "]" : "】";

    return `
      <div class="damage-log-entry ${typeClass}">
        <span class="damage-log-round">R${item.round}</span>
        <span class="damage-log-source" title="${actor}${bracketOpen}${badge}${bracketClose}">${actor}${bracketOpen}${badge}${bracketClose}</span>
        <span class="damage-log-amount">${sign}${item.amount}${unit}</span>
      </div>
    `;
  }

  updateDamageLogDisplay() {
    if (!this.battleDamageLog) return;
    const tier = this.battleLogTier || 1;
    this.battleDamageLog.classList.remove("tier-1", "tier-2", "tier-3");
    this.battleDamageLog.classList.add(`tier-${tier}`);

    const tierBadge = $("#battle-damage-log-tier");
    if (tierBadge) {
      const locale = I18n.currentLocale || "zh-Hant";
      if (locale === "en") {
        tierBadge.textContent = tier === 1 ? "▾ [1/3 Latest]" : tier === 2 ? "▾ [2/3 Last 5]" : "▴ [3/3 All 100]";
      } else if (locale === "ja") {
        tierBadge.textContent = tier === 1 ? "▾ [1/3 最新]" : tier === 2 ? "▾ [2/3 直近5件]" : "▴ [3/3 全履歴]";
      } else if (locale === "zh-Hans") {
        tierBadge.textContent = tier === 1 ? "▾ [1/3 最新]" : tier === 2 ? "▾ [2/3 近5条]" : "▴ [3/3 全记录]";
      } else {
        tierBadge.textContent = tier === 1 ? "▾ [1/3 最新]" : tier === 2 ? "▾ [2/3 近5筆]" : "▴ [3/3 全紀錄]";
      }
    }

    const logList = $("#battle-damage-log-list");
    if (!logList) return;

    let itemsToShow = [];
    if (tier === 1) {
      itemsToShow = this.recentDamageLog.slice(-1);
    } else if (tier === 2) {
      itemsToShow = this.recentDamageLog.slice(-5);
    } else {
      itemsToShow = this.recentDamageLog.slice(-100);
    }

    logList.innerHTML = itemsToShow.map((item) => this.formatDamageLogItem(item)).join("");

    if (tier === 3) {
      logList.scrollTop = logList.scrollHeight;
    }
  }
}

// --- src/js/main.js ---
function getInjectedServerUrl() {
  if (typeof window === "undefined") return null;
  if (window.KORAKU_SERVER_URL) return window.KORAKU_SERVER_URL;
  if (window.__KORAKU_CONFIG__?.serverUrl) return window.__KORAKU_CONFIG__.serverUrl;
  return null;
}

/**
 * Resolve client execution mode with detailed status
 * @param {object} [env={}]
 * @returns {{ mode: "offline"|"online", warningKey: string|null }}
 */
function resolveClientModeDetails(env = {}) {
  let search = "";
  let storageValue = null;
  let protocol = "";
  let serverUrl = null;
  let storage = null;

  if (typeof window !== "undefined") {
    search = window.location?.search || "";
    storage = window.localStorage;
    storageValue = window.localStorage?.getItem("koraku_mode");
    protocol = window.location?.protocol || "";
    serverUrl = getInjectedServerUrl();
  }

  if (env.search !== undefined) search = env.search;
  if (env.storage !== undefined) storage = env.storage;
  if (env.storageValue !== undefined) storageValue = env.storageValue;
  if (env.protocol !== undefined) protocol = env.protocol;
  if (env.serverUrl !== undefined) serverUrl = env.serverUrl;

  if (protocol === "file:") {
    return { mode: "offline", warningKey: null };
  }

  const params = new URLSearchParams(search.startsWith("?") ? search : (search ? `?${search}` : ""));
  const modeParam = params.get("mode")?.trim().toLowerCase();

  let requestedMode = null;
  if (modeParam === "offline" || modeParam === "online") {
    requestedMode = modeParam;
  } else if (storageValue === "offline" || storageValue === "online") {
    requestedMode = storageValue;
  }

  if (requestedMode === "offline") {
    return { mode: "offline", warningKey: null };
  }

  if (requestedMode === "online") {
    if (serverUrl) {
      return { mode: "online", warningKey: null };
    }
    // Online requested without injected server URL: cannot derive from origin, downgrade to offline
    // Clear residual localStorage.koraku_mode so the warning only shows once
    if (storage && typeof storage.removeItem === "function") {
      try {
        storage.removeItem("koraku_mode");
      } catch (_) {}
    }
    return { mode: "offline", warningKey: "connection.noServerConfigured" };
  }

  // Default: if injected server URL exists -> online, otherwise offline
  if (serverUrl) {
    return { mode: "online", warningKey: null };
  }

  return { mode: "offline", warningKey: null };
}

/**
 * Resolve whether the client should boot in offline sandbox or online authoritative mode
 * @param {object} [env={}]
 * @returns {"offline"|"online"}
 */
function resolveClientMode(env = {}) {
  return resolveClientModeDetails(env).mode;
}

if (typeof window !== "undefined") {
  const { mode, warningKey } = resolveClientModeDetails();
  const persistence = new Persistence();
  const client = mode === "online"
    ? new RemoteGameClient({ persistence })
    : new LocalGameClient({ persistence });

  client.init();

  const bus = client.bus;
  const store = client.store;
  const battle = client.battle;
  const postBattle = client.postBattle;
  const sound = new SoundSystem(store);

  bus.on("battle:ended", (result) => postBattle.open(result));
  bus.on("sound", ({ name }) => sound.play(name));
  bus.on("bgm:scene", ({ scene }) => sound.setBgmScene(scene));

  new DialogueController(bus);
  const view = new AppView({ bus, store, battle, postBattle, sound, client });
  view.init();

  if (warningKey) {
    bus.emit("toast", { key: warningKey, tone: "warning" });
  }

  if (
    new URLSearchParams(window.location.search).has("debug") ||
    window.location.hash.includes("debug") ||
    window.localStorage?.getItem("koraku_debug") === "true"
  ) {
    window.__KORAKU_DEBUG__ = { bus, store, battle, postBattle, view, client };
    const panel = document.createElement("details");
  panel.className = "debug-panel";
  panel.innerHTML =
    "<summary>DEV</summary>" +
    '<button type="button" data-debug="victory">強制勝利</button>' +
    '<button type="button" data-debug="defeat">強制敗北</button>' +
    '<button type="button" data-debug="progress">Lv.10／500 星砂</button>';
  panel.addEventListener("click", async (event) => {
    const action = event.target.dataset.debug;
    if (action === "victory" && battle.snapshot()?.active) battle.end?.(true);
    if (action === "defeat" && battle.snapshot()?.active) battle.end?.(false);
    if (action === "progress") {
      const state = client.getState();
      const currentLevel = state.profile?.level || 1;
      const currentSp = state.profile?.skillPoints || 0;
      const currentCoins = state.coins || 0;
      await client.send(Commands.CHEAT_SET_STATS, {
        level: Math.max(10, currentLevel),
        skillPoints: Math.max(45, currentSp),
        coins: Math.max(500, currentCoins)
      });
    }
  });
  document.body.append(panel);
  }
}
})();
