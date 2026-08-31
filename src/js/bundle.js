// Auto-generated standalone bundle for Koraku RPS
// Supports both file:// protocol and http:// server without module CORS restrictions.
(() => {
  "use strict";

// --- src/js/config/gameConfig.js ---
const APP_VERSION = "0.0.9";

const DOJO_CONFIG = Object.freeze({
  defaultHp: 10000,
  defaultDamage: 0,
  minHp: 1,
  maxHp: 999999
});

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
      home: "首頁",
      level: "等級",
      xp: "經驗",
      changelogTitle: "更新日誌",
      changelogSubtitle: "遊戲版本迭代與修復紀錄",
      closeChangelog: "關閉",
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
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "最近傷害",
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
      cheatModalTitle: "測試調試 / 作弊選單",
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
      changelogTitle: "更新日志",
      changelogSubtitle: "游戏版本迭代与修复纪录",
      closeChangelog: "关闭",
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
      navDojo: "修练场",
      menuDojo: "修练道场",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "最近伤害",
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
      changelogTitle: "Changelog",
      changelogSubtitle: "Version history and patch notes",
      closeChangelog: "Close",
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
      navDojo: "Training Dojo",
      menuDojo: "Training Dojo",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "Recent Damage",
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
      changelogTitle: "更新履歴",
      changelogSubtitle: "バージョン履歴と更新記録",
      closeChangelog: "閉じる",
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
      navDojo: "修練場",
      menuDojo: "修練道場",
      menuDojoSub: "QTE & SANDBOX",
      recentDamageLog: "最近のダメージ",
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

class QTEKeyboardInput {
  constructor(mapper = directionFromKey) {
    this.mapper = mapper;
    this.held = new Set();
  }

  keyDown(key, expectedDirection, repeat = false, code = null) {
    const direction = this.mapper(key, code);
    if (!direction) return { handled: false, direction: null };

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

  input(directionOrSlot, slotOrDirection = null) {
    if (!this.active) return false;
    let slot = "left";
    let direction = directionOrSlot;
    if (directionOrSlot === "left" || directionOrSlot === "right") {
      slot = directionOrSlot;
      direction = slotOrDirection;
    } else if (slotOrDirection === "left" || slotOrDirection === "right") {
      slot = slotOrDirection;
      direction = directionOrSlot;
    } else if (!slotOrDirection) {
      if (!this.left.completed) slot = "left";
      else if (!this.right.completed) slot = "right";
    }
    return this.inputSlot(slot, direction);
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

function freshSave() {
  return structuredClone(DEFAULT_SAVE);
}

function sanitizeSave(candidate) {
  if (!candidate || candidate.version !== 1) return freshSave();
  const base = freshSave();
  const rawStats = candidate.records?.stageStats || {};
  const stageStats = {
    1: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[1] || {}) },
    2: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[2] || {}) },
    3: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[3] || {}) },
    4: { totalAttempts: 0, manualWins: 0, manualLosses: 0, autoWins: 0, autoLosses: 0, ...(rawStats[4] || {}) }
  };

  const rawCleared = candidate.records?.clearedStages;
  let clearedStages = Array.isArray(rawCleared) ? [...rawCleared] : [];
  clearedStages = clearedStages.filter((stageId) => {
    if (stageId >= 1 && stageId <= 4) {
      const s = stageStats[stageId];
      if (s && ((s.manualWins || 0) + (s.autoWins || 0) > 0)) return true;
      if (stageId === 1 && ((candidate.records?.wins || 0) > 0 || (candidate.records?.manualWins || 0) > 0)) return true;
      if (candidate.records?.bestStage && candidate.records.bestStage >= stageId) return true;
    }
    return false;
  });

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
    records: {
      ...base.records,
      ...candidate.records,
      clearedStages,
      totalCoinsEarned: candidate.records?.totalCoinsEarned ?? candidate.coins ?? 0,
      totalXpEarned: candidate.records?.totalXpEarned ?? 0,
      totalBattles: candidate.records?.totalBattles ?? ((candidate.records?.wins || 0) + (candidate.records?.losses || 0)),
      manualWins: candidate.records?.manualWins ?? candidate.records?.wins ?? 0,
      manualLosses: candidate.records?.manualLosses ?? candidate.records?.losses ?? 0,
      autoWins: candidate.records?.autoWins ?? 0,
      autoLosses: candidate.records?.autoLosses ?? 0,
      watermelonStock: Math.max(0, Math.min(999, candidate.records?.watermelonStock ?? 0)),
      watermelonSlices: candidate.records?.watermelonSlices ?? 0,
      consumablesUsed: {
        hpPotion: candidate.records?.consumablesUsed?.hpPotion || 0,
        mpPotion: candidate.records?.consumablesUsed?.mpPotion || 0
      },
      morphUses: candidate.records?.morphUses || 0,
      momoStats: {
        attempts: candidate.records?.momoStats?.attempts || 0,
        successes: candidate.records?.momoStats?.successes || 0,
        damage: candidate.records?.momoStats?.damage || 0
      },
      morphStats: {
        attempts: candidate.records?.morphStats?.attempts || 0,
        successes: candidate.records?.morphStats?.successes || 0,
        damage: candidate.records?.morphStats?.damage || 0
      },
      restoredTotal: {
        hp: candidate.records?.restoredTotal?.hp || 0,
        mp: candidate.records?.restoredTotal?.mp || 0
      },
      watermelonStageStats: {
        1: { attempts: candidate.records?.watermelonStageStats?.[1]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[1]?.successes || 0 },
        2: { attempts: candidate.records?.watermelonStageStats?.[2]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[2]?.successes || 0 },
        3: { attempts: candidate.records?.watermelonStageStats?.[3]?.attempts || 0, successes: candidate.records?.watermelonStageStats?.[3]?.successes || 0 }
      },
      damageDealt: {
        total: candidate.records?.damageDealt?.total || 0,
        byStage: {
          1: candidate.records?.damageDealt?.byStage?.[1] || 0,
          2: candidate.records?.damageDealt?.byStage?.[2] || 0,
          3: candidate.records?.damageDealt?.byStage?.[3] || 0,
          4: candidate.records?.damageDealt?.byStage?.[4] || 0
        }
      },
      damageTaken: {
        total: candidate.records?.damageTaken?.total || 0,
        byStage: {
          1: candidate.records?.damageTaken?.byStage?.[1] || 0,
          2: candidate.records?.damageTaken?.byStage?.[2] || 0,
          3: candidate.records?.damageTaken?.byStage?.[3] || 0,
          4: candidate.records?.damageTaken?.byStage?.[4] || 0
        }
      },
      qteStats: {
        totalAttempts: candidate.records?.qteStats?.totalAttempts || 0,
        totalSuccesses: candidate.records?.qteStats?.totalSuccesses || 0,
        byStage: {
          1: { attempts: candidate.records?.qteStats?.byStage?.[1]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[1]?.successes || 0 },
          2: { attempts: candidate.records?.qteStats?.byStage?.[2]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[2]?.successes || 0 },
          3: { attempts: candidate.records?.qteStats?.byStage?.[3]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[3]?.successes || 0 },
          4: { attempts: candidate.records?.qteStats?.byStage?.[4]?.attempts || 0, successes: candidate.records?.qteStats?.byStage?.[4]?.successes || 0 }
        }
      },
      rewardsByStage: {
        1: { coins: candidate.records?.rewardsByStage?.[1]?.coins || 0, xp: candidate.records?.rewardsByStage?.[1]?.xp || 0 },
        2: { coins: candidate.records?.rewardsByStage?.[2]?.coins || 0, xp: candidate.records?.rewardsByStage?.[2]?.xp || 0 },
        3: { coins: candidate.records?.rewardsByStage?.[3]?.coins || 0, xp: candidate.records?.rewardsByStage?.[3]?.xp || 0 },
        4: { coins: candidate.records?.rewardsByStage?.[4]?.coins || 0, xp: candidate.records?.rewardsByStage?.[4]?.xp || 0 }
      },
      recentBattles: Array.isArray(candidate.records?.recentBattles) ? candidate.records.recentBattles.slice(0, 100) : [],
      stageStats
    },
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
        } else if (this.state.equipment.mainHand === itemId && this.state.equipment.offHand !== itemId && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else if (this.state.equipment.offHand === itemId && this.state.equipment.mainHand !== itemId) {
          slot = "mainHand";
        } else {
          slot = "mainHand";
        }
      } else if (item.slotType === "offHand") {
        if (!this.state.equipment.offHand && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else if (!this.state.equipment.mainHand) {
          slot = "mainHand";
        } else if (this.state.equipment.offHand === itemId && this.state.equipment.mainHand !== itemId) {
          slot = "mainHand";
        } else if (this.state.equipment.mainHand === itemId && this.state.equipment.offHand !== itemId && !EQUIPMENT_ITEMS[this.state.equipment.mainHand]?.twoHanded) {
          slot = "offHand";
        } else {
          slot = "offHand";
        }
      } else if (item.slotType === "ring") {
        if (!this.state.equipment.ring1) {
          slot = "ring1";
        } else if (!this.state.equipment.ring2) {
          slot = "ring2";
        } else if (this.state.equipment.ring1 === itemId && this.state.equipment.ring2 !== itemId) {
          slot = "ring2";
        } else if (this.state.equipment.ring2 === itemId && this.state.equipment.ring1 !== itemId) {
          slot = "ring1";
        } else {
          slot = "ring1";
        }
      } else if (item.slotType === "earring") {
        if (!this.state.equipment.earring1) {
          slot = "earring1";
        } else if (!this.state.equipment.earring2) {
          slot = "earring2";
        } else if (this.state.equipment.earring1 === itemId && this.state.equipment.earring2 !== itemId) {
          slot = "earring2";
        } else if (this.state.equipment.earring2 === itemId && this.state.equipment.earring1 !== itemId) {
          slot = "earring1";
        } else {
          slot = "earring1";
        }
      } else {
        slot = item.slotType;
      }
    }

    if (!EQUIPMENT_SLOTS[slot]) {
      return { ok: false, message: "無效的裝備欄位。" };
    }

    // Validate slot compatibility
    const isValidSlot =
      (slot === "mainHand" && (item.slotType === "weapon" || item.slotType === "offHand")) ||
      (slot === "offHand" && (item.slotType === "offHand" || (item.slotType === "weapon" && !item.twoHanded))) ||
      ((slot === "ring1" || slot === "ring2") && item.slotType === "ring") ||
      ((slot === "earring1" || slot === "earring2") && item.slotType === "earring") ||
      (item.slotType === slot);

    if (!isValidSlot) {
      return { ok: false, message: `無法將「${item.name}」穿戴至 ${EQUIPMENT_SLOTS[slot]?.label || slot}。` };
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

  getTheoreticalDPS() {
    const stats = computePlayerStats(this.state.profile, this.state.equipment);
    const baseDamage = stats.damage || 25;

    // Greatsword multiplier
    const mainItem = EQUIPMENT_ITEMS[this.state.equipment.mainHand];
    const greatswordMult = mainItem?.twoHanded && mainItem?.effect?.type === "greatsword_damage_boost"
      ? (mainItem.effect.multiplier || 1.5)
      : 1.0;

    // Dual hands multiplier (approx 1.5x expected damage factor)
    const hasDualHand = Boolean(this.state.profile.skills?.dualHand > 0);
    const dualHandMult = hasDualHand ? 1.5 : 1.0;

    // Equip passive DOTs (Flame sword, etc.)
    let passiveDamagePerTurn = 0;
    for (const slotKey of Object.values(this.state.equipment)) {
      if (!slotKey) continue;
      const item = EQUIPMENT_ITEMS[slotKey];
      if (item?.effect?.type === "burn_on_round_end") {
        passiveDamagePerTurn += (item.effect.damage || 30);
      } else if (item?.effect?.type === "reflect_damage") {
        passiveDamagePerTurn += (item.effect.damage || 40) * 0.25;
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
      const badgeItem = EQUIPMENT_ITEMS[this.state.equipment.badge];
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
      timestamp: Date.now(),
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
    if (typeof updates.watermelonStock === "number" && updates.watermelonStock >= 0) {
      if (!this.state.records) this.state.records = {};
      this.state.records.watermelonStock = Math.max(0, Math.min(999, Math.floor(updates.watermelonStock)));
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
    this.commit("cheat-unlock-all");
    return { ok: true, message: "已解鎖全部 4 個關卡與 BOSS 說明！" };
  }

  cheatUnlockGallery() {
    this.state.records.unlockedSwimsuit = true;
    this.state.records.unlockedGalleryAll = true;
    this.commit("cheat-unlock-gallery");
    return { ok: true, message: "已解鎖全部圖鑑立繪！" };
  }

  toggleMusicMuted() {
    this.state.settings.musicMuted = !this.state.settings.musicMuted;
    this.commit("toggle-music-muted");
    return this.state.settings.musicMuted;
  }

  toggleSfxMuted() {
    this.state.settings.sfxMuted = !this.state.settings.sfxMuted;
    this.state.settings.muted = this.state.settings.sfxMuted;
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
      return { ok: false, message: "請輸入有效的種子碼。" };
    }
    const decoded = decodeSaveData(code);
    if (!decoded || typeof decoded !== "object") {
      return { ok: false, message: "無效或損毀的存檔種子碼。" };
    }
    this.state = sanitizeSave(decoded);
    this.persistence.save(this.state);
    this.commit("import-save");
    return { ok: true, message: "存檔已成功載入！" };
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
    this.autoRestartTimerId = null;
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
          chapter: I18n.t("dojo.chapterName") || "修練場",
          name: I18n.t("dojo.mode2Style2") || "影小樂・雙生木樁",
          subtitle: I18n.t("dojo.mode2Style2Desc") || "第四關雙手雙軌模擬",
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
            { id: "left", name: I18n.t("dojo.dummySilhouetteLeft") || "影・小樂（左）", hp: customHp, maxHp: customHp, alive: true },
            { id: "right", name: I18n.t("dojo.dummySilhouetteRight") || "影・小樂（右）", hp: customHp, maxHp: customHp, alive: true }
          ],
          final: false
        };
      } else {
        stage = {
          id: 991,
          chapter: I18n.t("dojo.chapterName") || "修練場",
          name: I18n.t("dojo.mode2Style1") || "影小樂・單體木樁",
          subtitle: I18n.t("dojo.mode2Style1Desc") || "無壓實戰與 DPS 測試",
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
          enemies: [{ id: "main", name: I18n.t("dojo.dummySilhouette") || "影・小樂", hp: customHp, maxHp: customHp, alive: true }],
          final: false
        };
      }
    } else {
      stage = STAGES.find((item) => item.id === Number(stageId));
      const isStageUnlocked = (profile.records?.clearedStages || []).includes(Number(stageId)) || profile.profile.level >= stage?.requiredLevel;
      if (!stage || !isStageUnlocked) {
        this.bus.emit("toast", { message: "等級尚未達到這一章的挑戰條件。", tone: "danger" });
        return false;
      }
    }

    if (options.autoBattle) {
      const cleared = (profile.records?.clearedStages || []).includes(Number(stageId));
      if (!cleared) {
        this.bus.emit("toast", { message: I18n.t("ui.mustClearOnceForAuto"), tone: "danger" });
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
    this.battleStartTime = Date.now();
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

  startAutoBattle(stageId, rounds = 10) {
    return this.start(stageId, { autoBattle: true, autoBattleRounds: rounds });
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
    return this.state
      ? {
          ...structuredClone(this.state),
          autoBattle: { ...this.autoBattle }
        }
      : null;
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
    this.state.morphActive = false;
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
    if (!this.state?.active || !HANDS[handId]) return;
    if (this.state.phase === "countdown") {
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
    } else if (this.state.phase === "reaction" && this.state.morphActive) {
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
    }
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
    if (!this.state?.active || this.state.phase !== "reaction" || this.state.morphActive) {
      return { ok: false, message: "變拳只能在看見小樂出拳後的反應時間內使用。" };
    }
    const totalDiscount = this.getAllEquipEffects("morph_discount").reduce((sum, eff) => sum + (eff.morphDiscount || 0), 0);
    const morphCost = Math.max(5, BATTLE_RULES.morphCost - totalDiscount);

    if (this.state.playerMp < morphCost) {
      return { ok: false, message: "MP 不足，無法使用變拳。" };
    }
    this.clearReactionClocks();
    this.state.playerMp -= morphCost;

    this.battleMorphCount = (this.battleMorphCount || 0) + 1;
    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.morphActive = true;

    const morphWindowMs = 2000;
    this.state.reactionRemaining = morphWindowMs / 1000;
    this.reactionDeadline = performance.now() + morphWindowMs;

    this.emitState();
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say(I18n.t("dialogue.morphReaction"), I18n.t("dialogue.speakerKohaku"));

    this.reactionTickId = this.timers.interval(() => {
      this.state.reactionRemaining = Math.max(0, (this.reactionDeadline - performance.now()) / 1000);
      this.emitState();
    }, 40);
    this.reactionTimeoutId = this.timers.timeout(() => {
      this.state.morphActive = false;
      this.resolveRound();
    }, morphWindowMs);
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
          const suffix = this.state.morphUsed ? "雙手變拳齊出，完美破除雙生合擊！" : "雙手同時獲勝，漂亮破除雙生合擊！";
          this.finishRound("win", suffix);
          return;
        }

        if (singleWin) {
          const winEnemyId = leftResult === "win" ? "left" : "right";
          this.state.targetEnemyId = winEnemyId;
          const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
          if (target) this.applyDamageToEnemy(target, null, false);
          const suffix = this.state.morphUsed ? "變拳擊破一手，成功壓制！" : "單手獲勝，成功壓制一手！";
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
        const suffix = this.state.morphUsed ? "變拳齊出，一併壓制雙生小樂！" : "雙拳齊勝，完美克制雙生小樂！";
        this.finishRound("win", suffix);
        return;
      }

      if (singleWin) {
        const winEnemyId = leftResult === "win" ? "left" : "right";
        this.state.targetEnemyId = winEnemyId;
        const target = this.state.enemies.find((e) => e.id === winEnemyId && e.alive);
        if (target) this.applyDamageToEnemy(target, null, false);
        const suffix = this.state.morphUsed ? "變拳奏效，成功壓制一手！" : "單手壓制，削弱了雙生陣勢！";
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
        this.battleMomoAttempts = (this.battleMomoAttempts || 0) + 1;
        const aliveEnemies = this.state.enemies.filter((e) => e.alive);
        if (aliveEnemies.length > 0) {
          const target = aliveEnemies[Math.floor(this.random() * aliveEnemies.length)];
          const dodgeRate = this.state.stage?.momoDodgeRate || 0;
          const isDodged = this.random() < dodgeRate;
          if (isDodged) {
            this.store.recordMomoProc({ success: false, damage: 0 });
            this.bus.emit("battle:effect", {
              type: "enemy-dodge",
              targetId: target.id,
              skill: "momo"
            });
            this.bus.emit("sound", { name: "danger" });
            this.finishRound("draw", "平手！你試圖偷摸" + target.name + "，但被她敏捷地閃開了！");
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
            targetName: target.name,
            amount: momoDamage,
            source: "momo"
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
    this.say(I18n.t("dialogue.qteDualBreak"), I18n.t("dialogue.speakerPlatinumKohaku"));
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.getAllEquipEffects("qte_time").reduce((sum, eff) => sum + (eff.extraQteSeconds || 0), 0);
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
      return this.dualQte.input(directionId, slot);
    }
    return this.qte.input(directionId);
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
    this.say(`化解了${targetEnemy.name}的單側攻勢！`, "你");
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
        this.damagePlayerForDual(failedCount, "未能防住全部攻勢，受到反擊！");
      } else {
        const counter = getQteCounterNarration(this.state.selectedHand);
        this.state.selectedHand = counter.changedHand;
        this.timers.timeout(() => {
          if (this.state?.active && this.state.phase === "qte") {
            this.finishRound("win", "雙重反制成功！完美化解了雙生攻勢！");
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
          this.damageEnemy(counter.text, true);
        }
      }, 500);
    } else {
      this.store.recordQteAttempt(this.state?.stage?.id, false);
      this.damagePlayer("節奏慢了一拍，小樂的攻勢命中了你。");
    }
  }

  applyDamageToEnemy(target, damageAmount = null, countered = false) {
    if (!target || !target.alive) return;
    let amount = damageAmount ?? this.state.playerDamage;
    if (countered) {
      amount += this.getAllEquipEffects("thunder").reduce((sum, eff) => sum + (eff.qteBonusDamage || 0), 0);
    } else if (!damageAmount && this.hasEquipEffect("burst")) {
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
        this.bus.emit("battle:effect", {
          type: "freeze",
          frozenHand,
          handLabel: HANDS[frozenHand].label,
          handGlyph: HANDS[frozenHand].glyph
        });
        this.say(`❄️ 霜月冰結！小樂的手掌被凍結，下一回合無法出【${HANDS[frozenHand].label}】！`, "小樂");
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
    else if (!damageAmount && this.hasEquipEffect("burst")) logSource = "burst";

    this.bus.emit("battle:damage-logged", {
      target: "enemy",
      targetName: target.name,
      amount,
      source: logSource
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
    const playerName = (I18n.t("dialogue.speakerPlayer") && !I18n.t("dialogue.speakerPlayer").includes(".")) ? I18n.t("dialogue.speakerPlayer") : "旅人";
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetName: playerName,
      amount: totalDamage,
      source: "enemy_attack"
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
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect"
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
    const playerName = (I18n.t("dialogue.speakerPlayer") && !I18n.t("dialogue.speakerPlayer").includes(".")) ? I18n.t("dialogue.speakerPlayer") : "旅人";
    this.bus.emit("battle:damage-logged", {
      target: "player",
      targetName: playerName,
      amount: totalDamage,
      source: "enemy_attack"
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
          targetName: target.name,
          amount: reflectDamage,
          source: "reflect"
        });
      }
    }

    this.finishRound("loss", message);
  }

  finishRound(result, message) {
    this.state.phase = "result";
    this.state.lastResult = result;

    // MP Regen effect check
    const totalMpRegen = this.getAllEquipEffects("mp_regen").reduce((sum, eff) => sum + (eff.mpRegen || 0), 0);
    if (totalMpRegen > 0) {
      this.state.playerMp = Math.min(this.state.playerMaxMp, this.state.playerMp + totalMpRegen);
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
        targetName: target?.name || "小樂",
        amount: totalBurn,
        source: "burn"
      });
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
    const durationSec = Math.max(1, Math.round((Date.now() - (this.battleStartTime || Date.now())) / 1000));
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
    this.emitState();
    this.bus.emit("battle:ended", {
      won,
      stage: this.state.stage,
      reward,
      combatDps: reward.dps,
      damageDealt: this.battleDamageDealt || 0,
      damageTaken: this.battleDamageTaken || 0,
      durationSec,
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
    const attempts = this.state.watermelon.attempts;
    this.state.tolerance = 0.13 * (0.825 ** attempts);
    this.state.strikeDuration = 1800 / (1.175 ** attempts);
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
      this.say(I18n.t("dialogue.watermelonHit", { remaining }));
    } else {
      this.say(I18n.t("dialogue.watermelonMiss", { remaining }));
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
        strikeStartedAt: performance.now(),
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
      this.autoWatermelonState.strikeStartedAt = performance.now();
    }

    const minTarget = this.autoWatermelonState.tolerance + 0.05;
    const maxTarget = 1 - this.autoWatermelonState.tolerance - 0.05;
    this.autoWatermelonState.target = minTarget + this.random() * Math.max(0.1, maxTarget - minTarget);
    this.autoWatermelonState.active = true;
    this.emitAutoWatermelon();
    const nextAttempt = this.autoWatermelonState.watermelon.attempts + 1;
    this.say(I18n.t("dialogue.watermelonAttempt", { nextAttempt }));
    return true;
  }

  autoWatermelonStrike() {
    if (!this.autoWatermelonState || this.autoWatermelonState.scene !== "watermelonAim") return;
    const marker = this.getAutoMarkerPosition();
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
      this.say(I18n.t("dialogue.watermelonHit", { remaining }));
    } else {
      this.say(I18n.t("dialogue.watermelonMiss", { remaining }));
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
      this.say(I18n.t("dialogue.watermelonAllHit", { successes: watermelon.successes }));
    } else {
      this.say(I18n.t("dialogue.watermelonDone"));
    }
  }

  getAutoMarkerPosition(now = performance.now()) {
    if (!this.autoWatermelonState?.strikeStartedAt) return 0;
    const elapsed = (now - this.autoWatermelonState.strikeStartedAt) % this.autoWatermelonState.strikeDuration;
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

  say(text) {
    this.bus.emit("dialogue", { speaker: I18n.t("dialogue.speakerKohaku"), text });
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
  constructor({ bus, store, battle, postBattle, sound }) {
    this.bus = bus;
    this.store = store;
    this.battle = battle;
    this.postBattle = postBattle;
    this.sound = sound;
    this.timers = new TimerRegistry();
    this.currentScreen = "home";
    this.activeGrowthTab = "stats";
    this.activeGuideTab = "basics";
    this.activeShopTab = "potions";
    this.selectedGalleryItem = GALLERY_ITEMS[0].id;
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

    // 裝置觸控能力探測（支援手機、平板 iPad/Android、觸控螢幕筆電）
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const isTouchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
      if (isTouchDevice) {
        document.documentElement.classList.add("has-touch");
        document.body.classList.add("has-touch");
      }
      const enableTouch = () => {
        document.documentElement.classList.add("has-touch");
        document.body.classList.add("has-touch");
        window.removeEventListener("touchstart", enableTouch);
        window.removeEventListener("pointerdown", onPointer);
      };
      const onPointer = (e) => {
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          enableTouch();
        }
      };
      window.addEventListener("touchstart", enableTouch, { passive: true, once: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
    }

    this.cacheElements();
    this.bindEvents();
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
    this.changelogModal = $("#changelog-modal");
    this.equipTooltip = $("#equip-tooltip");
    this.activeShopFilter = "all";
  }

  init() {
    this.renderI18n();
    const snapshot = this.store.snapshot();
    this.renderStore(snapshot);

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
          if (target && target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && target.tagName !== "SELECT") {
            event.preventDefault();
          }
        }
        lastTouchEnd = now;
      }, { passive: false });
    }

    let targetScreen = "home";
    try {
      const hashScreen = window.location.hash ? window.location.hash.replace(/^#/, "") : null;
      targetScreen = hashScreen || sessionStorage.getItem("koraku_active_screen") || "home";
    } catch (_) {}

    let activeBattle = null;
    let savedStageId = 1;
    try {
      const savedBattle = sessionStorage.getItem("koraku_active_battle");
      if (savedBattle) activeBattle = JSON.parse(savedBattle);
      savedStageId = Number(sessionStorage.getItem("koraku_active_stage")) || activeBattle?.stageId || this.store.snapshot().records?.bestStage || 1;
    } catch (_) {}

    if (targetScreen === "battle") {
      const stageToRun = activeBattle?.stageId || savedStageId || 1;
      if (typeof window !== "undefined" && window.history) {
        window.history.replaceState({ screen: "battle" }, "", "#battle");
      }
      if (activeBattle?.isAuto) {
        this.startAutoBattle(stageToRun, activeBattle.remainingRounds || 10);
      } else {
        this.startStage(stageToRun);
      }
    } else {
      if (typeof window !== "undefined" && window.history) {
        window.history.replaceState({ screen: targetScreen }, "", "#" + targetScreen);
      }
      this.navigate(targetScreen, { pushHistory: false });
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
    let lastQtePointerTime = 0;
    const handleQtePointer = (event) => {
      const targetBtn = event.target.closest("[data-direction]");
      if (!targetBtn) return;

      const now = performance.now();
      if (now - lastQtePointerTime < 45) {
        event.preventDefault();
        return;
      }
      lastQtePointerTime = now;

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

      const dojoDualBtn = targetBtn.closest("#dojo-qte-dual-container [data-dual-slot][data-direction]");
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
        this.battle.inputQte(dir, slot);
        if (slot === "left") this.leftQteKeyboard.reset();
        if (slot === "right") this.rightQteKeyboard.reset();
        this.renderHeldQteDirections();
        return;
      }

      if (!targetBtn.closest(".is-dual-touch-pad")) {
        this.qteKeyboard.reset();
        this.renderHeldQteDirections();
        this.battle.inputQte(targetBtn.dataset.direction);
      }
    };

    window.addEventListener("pointerdown", handleQtePointer, { passive: false });
    if (typeof window !== "undefined" && !window.PointerEvent) {
      window.addEventListener("touchstart", handleQtePointer, { passive: false });
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
      const targetScreen = event.state?.screen || (window.location.hash ? window.location.hash.replace(/^#/, "") : "home");
      if (this.currentScreen === targetScreen) return;

      if (this.currentScreen === "battle") {
        this.hideFloatingWatermelon();
        this.postBattle?.closeAutoWatermelon?.();
        this.battleArena?.classList.remove("is-settlement");
        if (this.battleState?.active) {
          this.battle.stopAutoBattle();
          this.battle.abandon();
        } else if (this.battle.autoBattle?.active) {
          this.battle.stopAutoBattle();
        }
      }
      this.navigate(targetScreen, { pushHistory: false });
    });

    // Mouse Navigation Buttons (Back: button 3, Forward: button 4)
    window.addEventListener("mouseup", (event) => {
      if (event.button === 3) {
        event.preventDefault();
        window.history.back();
      } else if (event.button === 4) {
        event.preventDefault();
        window.history.forward();
      }
    });

    const langSelect = $("#lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        I18n.setLocale(e.target.value);
        this.renderI18n();
        this.renderStore(this.store.snapshot());
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
    this.bus.on("toast", (toast) => this.showToast(toast.message, toast.tone));
    this.bus.on("auto-battle:update", (info) => {
      try {
        const activeBattleStr = sessionStorage.getItem("koraku_active_battle");
        if (activeBattleStr) {
          const activeBattle = JSON.parse(activeBattleStr);
          activeBattle.remainingRounds = info.remainingRounds;
          sessionStorage.setItem("koraku_active_battle", JSON.stringify(activeBattle));
        }
      } catch (_) {}
      const msg = info.won
        ? I18n.t("ui.autoBattleToastUpdateWin", { remaining: info.remainingRounds })
        : I18n.t("ui.autoBattleToastUpdateLoss", { remaining: info.remainingRounds });
      this.showToast(msg, info.won ? "success" : "danger");
      if (this.battle?.autoBattle?.active && !this.battle?.autoBattle?.isPaused && this.postBattle?.getWatermelonStock() > 0) {
        this.postBattle.emitAutoWatermelon();
      }
    });
    this.bus.on("auto-battle:finished", (info) => {
      try {
        sessionStorage.removeItem("koraku_active_battle");
      } catch (_) {}
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
      try {
        sessionStorage.removeItem("koraku_active_battle");
      } catch (_) {}
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
    });
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
    const pressedButton = event.target.closest("button, [role='button'], [data-nav], [data-allocate], [data-allocate-skill], [data-buy], [data-buy-equip], [data-slot], [data-equip-bag-item], .pill-btn, .tab-pill, .button-primary, .button-secondary, .button-ghost, .menu-command");
    if (pressedButton) {
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
      this.renderStore(this.store.snapshot());
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
        this.closeDojoModal();
        this.startDojoQte(style);
      } else {
        const style = document.querySelector('input[name="dojo-mode2-style"]:checked')?.value || "single";
        const customHp = Number($("#dojo-custom-hp")?.value) || 10000;
        const customDamage = Number($("#dojo-custom-dmg")?.value) || 0;
        this.closeDojoModal();
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
      if (this.battle.autoBattle.active) {
        if (this.battle.autoBattle.isPaused) {
          this.battle.resumeAutoBattle();
          this.showToast(I18n.t("ui.autoBattleToastResumed"), "success");
          if (this.postBattle?.getWatermelonStock() > 0) {
            this.postBattle.emitAutoWatermelon();
          }
        } else {
          this.battle.pauseAutoBattle();
          this.hideFloatingWatermelon();
          this.showToast(I18n.t("ui.autoBattleToastPaused"), "warning");
        }
      }
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
      this.openCheatAuthModal();
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

    const postButton = event.target.closest("[data-post-action]");
    if (postButton) {
      this.handlePostAction(postButton.dataset.postAction);
      return;
    }

    if (event.target.closest("#watermelon-strike")) {
      this.postBattle.strike();
      return;
    }

    if (event.target.closest("#btn-auto-watermelon-strike")) {
      this.postBattle.autoWatermelonStrike();
      return;
    }

    if (event.target.closest("#btn-auto-watermelon-next-strike, #btn-auto-watermelon-next-round, #btn-auto-watermelon-start")) {
      this.postBattle.startAutoWatermelonRound();
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
      return;
    }

    if (event.target.closest("#btn-close-floating-watermelon")) {
      this.postBattle.closeAutoWatermelon();
      return;
    }

    if (event.target.closest("#abandon-battle")) {
      this.requestNavigation("stages");
      return;
    }

    if (event.target.closest("#music-toggle")) {
      const muted = this.store.toggleMusicMuted();
      this.showToast(muted ? I18n.t("ui.musicOffToast") : I18n.t("ui.musicOnToast"));
      return;
    }

    if (event.target.closest("#sound-toggle")) {
      const muted = this.store.toggleSfxMuted();
      this.showToast(muted ? I18n.t("ui.sfxOffToast") : I18n.t("ui.sfxOnToast"));
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

  handleKeydown(event) {
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
      const scene = this.postBattle.autoWatermelonState.scene;
      if (scene === "watermelonAim") {
        this.postBattle.autoWatermelonStrike();
        return;
      }
      if (["watermelonResult", "watermelonComplete", "idle"].includes(scene)) {
        this.postBattle.startAutoWatermelonRound();
        return;
      }
    }

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
        const isLeftActive = !this.qteState.left?.completed;
        const isRightActive = !this.qteState.right?.completed;
        const leftExpected = isLeftActive ? this.qteState.left?.sequence[this.qteState.left?.index] : null;
        const rightExpected = isRightActive ? this.qteState.right?.sequence[this.qteState.right?.index] : null;

        if (isLeftActive) {
          const leftInput = this.leftQteKeyboard.keyDown(event.key, leftExpected, event.repeat, event.code);
          if (leftInput.handled) {
            event.preventDefault();
            if (leftInput.direction) {
              this.battle.inputQte(leftInput.direction, "left");
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
              this.battle.inputQte(rightInput.direction, "right");
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
          this.battle.inputQte(input.direction);
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
        return;
      }

      const handByKey = { "1": "rock", "2": "paper", "3": "scissors", "j": "rock", "k": "paper", "l": "scissors" };
      if (handByKey[key]) {
        this.battle.selectHand(handByKey[key]);
      } else if (["numpad7", "numpad1"].includes(event.code.toLowerCase())) {
        this.battle.selectHand("rock");
      } else if (["numpad8", "numpad2"].includes(event.code.toLowerCase())) {
        this.battle.selectHand("paper");
      } else if (["numpad9", "numpad3"].includes(event.code.toLowerCase())) {
        this.battle.selectHand("scissors");
      }
      return;
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

  requestNavigation(screenName) {
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
        this.battle.stopAutoBattle();
        this.battle.abandon();
      } else if (this.battle.autoBattle?.active) {
        this.battle.stopAutoBattle();
      }
    }
    this.navigate(screenName);
  }

  navigate(screenName, options = {}) {
    this.currentScreen = screenName;
    this.bus.emit("bgm:scene", { scene: screenName === "battle" ? "battle" : "lobby" });
    if (this.sound) {
      this.sound.setBgmScene(screenName === "battle" ? "battle" : "lobby");
    }
    if (screenName !== "battle") {
      this.hideFloatingWatermelon();
      this.postBattle?.closeAutoWatermelon?.();
      try {
        sessionStorage.removeItem("koraku_active_battle");
      } catch (_) {}
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
      this.renderGallery(this.store.snapshot());
    } else if (screenName === "records") {
      this.renderHomeRecords(this.store.snapshot());
    }
  }

  startStage(stageId) {
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    this.battle.stopAutoBattle();
    if (!this.battle.start(stageId)) return;
    try {
      sessionStorage.setItem("koraku_active_battle", JSON.stringify({ stageId, isAuto: false }));
      sessionStorage.setItem("koraku_active_stage", String(stageId));
    } catch (_) {}
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay.classList.remove("is-active");
    this.resultOverlay.setAttribute("aria-hidden", "true");
    this.navigate("battle");
  }

  openAutoBattleModal(stageId) {
    const snapshot = this.store.snapshot();
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

  startAutoBattle(stageId, rounds = 10) {
    const snapshot = this.store.snapshot();
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
    if (!this.battle.startAutoBattle(stageId, rounds)) return;
    try {
      sessionStorage.setItem("koraku_active_battle", JSON.stringify({ stageId, isAuto: true, remainingRounds: rounds }));
      sessionStorage.setItem("koraku_active_stage", String(stageId));
    } catch (_) {}
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
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
    if ($("#records-level")) $("#records-level").textContent = state.profile.level;
    const xpPercent = state.xpToNext > 0 ? Math.min(100, Math.round((state.profile.xp / state.xpToNext) * 100)) : 100;
    if ($("#records-xp-text")) $("#records-xp-text").textContent = `${state.profile.xp} / ${state.xpToNext} EXP (${xpPercent}%)`;
    if ($("#records-xp-fill")) $("#records-xp-fill").style.width = `${xpPercent}%`;
    const theoDps = this.store.getTheoreticalDPS();
    if ($("#records-theoretical-dps")) $("#records-theoretical-dps").textContent = theoDps;

    // 2. Consumables, Momo & Morph Uses
    if ($("#records-hp-potions-used")) {
      const hpCount = records.consumablesUsed?.hpPotion || 0;
      const hpRestored = records.restoredTotal?.hp || 0;
      $("#records-hp-potions-used").textContent = `${hpCount} 瓶 (+${hpRestored.toLocaleString("zh-TW")} HP)`;
    }
    if ($("#records-mp-potions-used")) {
      const mpCount = records.consumablesUsed?.mpPotion || 0;
      const mpRestored = records.restoredTotal?.mp || 0;
      $("#records-mp-potions-used").textContent = `${mpCount} 瓶 (+${mpRestored.toLocaleString("zh-TW")} MP)`;
    }
    if ($("#records-morph-uses")) {
      const morphAtt = records.morphStats?.attempts || records.morphUses || 0;
      const morphSucc = records.morphStats?.successes || records.morphUses || 0;
      const morphDmg = records.morphStats?.damage || 0;
      const morphRate = morphAtt > 0 ? Math.round((morphSucc / morphAtt) * 100) : 0;
      $("#records-morph-uses").textContent = `${morphSucc}/${morphAtt} 次 (${morphRate}%, ${morphDmg.toLocaleString("zh-TW")} 傷)`;
    }
    if ($("#records-momo-stats")) {
      const momoAtt = records.momoStats?.attempts || 0;
      const momoSucc = records.momoStats?.successes || 0;
      const momoDmg = records.momoStats?.damage || 0;
      const momoRate = momoAtt > 0 ? Math.round((momoSucc / momoAtt) * 100) : 0;
      $("#records-momo-stats").textContent = `${momoSucc}/${momoAtt} 次 (${momoRate}%, ${momoDmg.toLocaleString("zh-TW")} 傷)`;
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
              <span class="records-paperdoll-item-name" style="color:var(--paper-dim);">未裝備</span>
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
            <td>${st.attempts} 刀 (${st.successes} 中 / ${failures} 空)</td>
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
          <td>${totalAttempts} 刀 (${totalSuccesses} 中 / ${totalFailures} 空)</td>
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
        recentBattlesList.innerHTML = '<div class="records-recent-battles-empty">尚無對戰紀錄。快去開始一場對局吧！</div>';
      } else {
        recentBattlesList.innerHTML = battles.map((b, idx) => {
          const locStage = b.stageName ? { name: b.stageName } : I18n.getLocalizedStage(STAGES.find(s => s.id === b.stageId) || { name: `第 ${b.stageId} 章` });
          const outcomeClass = b.won ? "outcome-win" : "outcome-loss";
          const outcomeText = b.won ? I18n.t("ui.battleWon") : I18n.t("ui.battleLost");
          const modeBadge = b.isAuto ? '<span class="battle-log-mode is-auto">⚡ 自動</span>' : '<span class="battle-log-mode is-manual">🎮 手動</span>';
          
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
            ? `HP: ${hpUsed}瓶 (+${hpRestored}) / MP: ${mpUsed}瓶 (+${mpRestored})`
            : "-";

          const momoText = (b.momoAttempts && b.momoAttempts > 0)
            ? `${b.momoSuccesses || 0}/${b.momoAttempts} (${Math.round(((b.momoSuccesses || 0) / b.momoAttempts) * 100)}%, ${(b.momoDamage || 0).toLocaleString("zh-TW")}傷)`
            : "-";

          const morphText = (b.morphCount && b.morphCount > 0)
            ? `${b.morphCount}次 (${(b.morphDamage || 0).toLocaleString("zh-TW")}傷)`
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
            equipBtn = '<button type="button" class="button-secondary shop-btn-equip" data-shop-equip="' + item.id + '" style="padding:6px 12px;font-size:12px;">' + I18n.t("ui.equipNow") + '</button>';
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

    if (this.galleryArtFrame) {
      this.galleryArtFrame.classList.toggle("is-locked", !unlocked);
      this.galleryArtFrame.dataset.variant = currentItem.id;
    }
    if (this.galleryImage) {
      this.galleryImage.src = currentItem.src;
      this.galleryImage.alt = locCurrentItem.name;
      this.galleryImage.className = "gallery-img-" + currentItem.id;
    }
    if (this.galleryItemTitle) {
      this.galleryItemTitle.textContent = unlocked ? locCurrentItem.name : "？？？ (" + I18n.t("ui.galleryLockedTag") + ")";
    }
    if (this.galleryItemDesc) {
      if (unlocked) {
        this.galleryItemDesc.textContent = locCurrentItem.description;
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

    // 手機/觸控螢幕：直接開啟新分頁瀏覽原圖，以便使用者進行雙指放大 (Pinch to Zoom) 與長按下載
    const isMobile = window.innerWidth <= 780 || ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    if (isMobile) {
      window.open(currentItem.src, "_blank");
      return;
    }

    const locItem = I18n.getLocalizedGalleryItem(currentItem);
    const dimsMap = {
      "koraku_default": "4000 × 4000 px (Original)",
      "koraku_2p": "4000 × 4000 px (Original)",
      "swimsuit_default": "3970 × 4993 px (Ultra HD)",
      "swimsuit_watermelon": "4007 × 5425 px (Ultra HD)"
    };

    const titleEl = $("#gallery-lightbox-title");
    const dimsEl = $("#gallery-lightbox-dims");
    const imgEl = $("#gallery-lightbox-image");
    const tabLinkEl = $("#btn-open-image-tab");

    if (titleEl) titleEl.textContent = locItem.name;
    if (dimsEl) dimsEl.textContent = dimsMap[currentItem.id] || "Ultra HD";
    if (imgEl) {
      imgEl.src = currentItem.src;
      imgEl.alt = locItem.name;
    }
    if (tabLinkEl) {
      tabLinkEl.href = currentItem.src;
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
    const theoDps = this.store.getTheoreticalDPS();
    const statsHtml = `
      <span>${I18n.t("ui.statHp")}<b>${state.playerStats.maxHp}</b></span>
      <span>${I18n.t("ui.statMp")}<b>${state.playerStats.maxMp}</b></span>
      <span>${I18n.t("ui.statDamage")}<b>${state.playerStats.damage}</b></span>
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

  handleCheatAuthSubmit() {
    const pass = this.cheatAuthPassword ? this.cheatAuthPassword.value.trim() : "";
    if (pass === "8989") {
      this.closeCheatAuthModal();
      this.openCheatModal();
      this.showToast(I18n.t("ui.cheatAuthSuccess") || "⚙️ 密碼正確，作弊選單已解鎖！", "success");
    } else {
      this.showToast(I18n.t("ui.cheatAuthError") || "密碼錯誤！無法開啟作弊選單。", "danger");
      if (this.cheatAuthPassword) {
        this.cheatAuthPassword.value = "";
        this.cheatAuthPassword.focus();
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

  renderChangelog() {
    const listEl = $("#changelog-modal-list");
    if (!listEl) return;
    const changelogs = I18n.getChangelog();
    listEl.innerHTML = changelogs
      .map((entry, idx) => {
        const isCurrent = idx === 0;
        const changesHtml = entry.changes
          .map((c) => `<li>${c}</li>`)
          .join("");
        return `
          <div class="changelog-entry ${isCurrent ? "is-current" : ""}">
            <div class="changelog-entry-header">
              <span class="changelog-ver">v${entry.version}</span>
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

  populateSaveRecordModal() {
    const snap = this.store.snapshot();
    const p = snap.profile;
    const r = snap.records || {};

    if (this.saveOverviewLevel) {
      this.saveOverviewLevel.textContent = `Lv. ${p.level}`;
    }
    if (this.saveOverviewCoins) {
      this.saveOverviewCoins.textContent = `✦ ${snap.coins.toLocaleString("zh-TW")}`;
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
      this.saveSeedOutput.value = this.store.exportSaveCode();
    }
    if (this.saveSeedInput) {
      this.saveSeedInput.value = "";
    }
  }

  handleCopySaveSeed() {
    const seed = this.saveSeedOutput?.value || this.store.exportSaveCode();
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

  handleImportSaveSeed() {
    const rawInput = this.saveSeedInput ? this.saveSeedInput.value.trim() : "";
    if (!rawInput) {
      this.showToast(I18n.t("ui.toastSeedEmpty"), "warning");
      if (this.saveSeedInput) this.saveSeedInput.focus();
      return;
    }

    const confirmed = window.confirm(I18n.t("ui.confirmImportSeed"));
    if (!confirmed) return;

    const result = this.store.importSaveCode(rawInput);
    if (result.ok) {
      this.showToast(I18n.t("ui.toastImportSuccess"), "success");
      this.closeSaveRecordModal();
      this.renderStore(this.store.snapshot());
    } else {
      this.showToast(I18n.t("ui.toastImportFailed"), "danger");
      if (this.saveSeedInput) this.saveSeedInput.focus();
    }
  }

  handleResetSave() {
    const confirmed = window.confirm(I18n.t("ui.resetConfirm") || "確定要清除所有等級、星砂、道具與戰績，重新開始嗎？");
    if (confirmed) {
      this.store.reset();
      this.showToast((I18n.t("ui.resetSave") || "存檔重置") + " ✓", "success");
      this.populateSaveRecordModal();
      this.renderStore(this.store.snapshot());
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
    $("#battle-player-level").textContent = "LEVEL " + String(this.store.snapshot().profile.level).padStart(2, "0");

    const playerStats = this.store.snapshot().playerStats;
    const playerAtk = playerStats?.damage || 50;
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
      countdownValue.textContent = state.countdown;
      countdownCaption.textContent = I18n.t("ui.countdownCaption");
    } else if (state.phase === "reaction") {
      countdownValue.textContent = state.reactionRemaining.toFixed(1);
      countdownCaption.textContent = state.morphActive ? I18n.t("ui.morphSelectCaption") : I18n.t("ui.morphCaption");
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
      const singlePanel = $("#qte-panel");
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
    if ($("#reward-combat-dps")) $("#reward-combat-dps").textContent = `${state.reward?.dps ?? 0.0}`;
    if ($("#reward-damage-dealt")) $("#reward-damage-dealt").textContent = `${state.reward?.damageDealt ?? 0}`;
    if ($("#reward-damage-taken")) $("#reward-damage-taken").textContent = `${state.reward?.damageTaken ?? 0}`;
    if ($("#reward-duration")) $("#reward-duration").textContent = `${state.reward?.durationSec ?? 0}s`;
    $("#result-kicker").textContent = state.won ? "BATTLE COMPLETE" : "BATTLE FAILED";

    const watermelon = state.watermelon;
    const watermelonGame = $("#watermelon-game");
    watermelonGame.hidden = state.scene !== "watermelonAim";
    this.setWatermelonTicker(state.scene === "watermelonAim");
    $("#watermelon-attempt").textContent = "第 " + (watermelon.attempts + 1) + " 刀 / " + watermelon.maxAttempts;
    $("#watermelon-successes").textContent = I18n.t("ui.watermelonScore") + " " + watermelon.successes;
    const tolerance = state.tolerance ?? (0.13 * (0.825 ** watermelon.attempts));
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
      const remaining = watermelon.maxAttempts - watermelon.attempts;
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
      marker.style.left = (this.postBattle.getMarkerPosition() * 100) + "%";
      this.watermelonFrame = window.requestAnimationFrame(update);
    };
    update();
  }

  renderFloatingWatermelon(state) {
    const floating = $("#floating-autobattle-watermelon");
    if (!floating) return;
    const stock = state?.stock ?? this.postBattle?.getWatermelonStock() ?? 0;
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
      if (marker && this.postBattle) {
        marker.style.left = (this.postBattle.getAutoMarkerPosition() * 100) + "%";
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
      this.battle.stopAutoBattle();
      this.battle.abandon();
      this.battleArena?.classList.remove("is-settlement");
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

  openDojoModal() {
    if (this.dojoModal) {
      this.dojoModal.hidden = false;
      this.dojoModal.setAttribute("aria-hidden", "false");
    }
  }

  closeDojoModal() {
    if (this.dojoModal) {
      this.dojoModal.hidden = true;
      this.dojoModal.setAttribute("aria-hidden", "true");
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

  startDojoSandbox({ isDual, customHp, customDamage }) {
    this.hideFloatingWatermelon();
    this.postBattle?.closeAutoWatermelon?.();
    this.battle.stopAutoBattle();
    if (!this.battle.start(null, { isDojo: true, isDual, customHp, customDamage, isSilhouette: true })) return;
    this.postState = null;
    this.battleArena?.classList.remove("is-settlement");
    this.resultOverlay.classList.remove("is-active");
    this.resultOverlay.setAttribute("aria-hidden", "true");
    this.navigate("battle");
  }

  addDamageLogEntry({ target, targetName, amount, source }) {
    if (!this.recentDamageLog) this.recentDamageLog = [];
    const sourceKeyMap = {
      rps_win: "ui.damageSourceRps",
      morph: "ui.damageSourceMorph",
      counter: "ui.damageSourceCounter",
      momo: "ui.damageSourceMomo",
      burn: "ui.damageSourceBurn",
      reflect: "ui.damageSourceReflect",
      burst: "ui.damageSourceBurst",
      enemy_attack: "ui.damageSourceEnemy"
    };
    const fallbackSources = {
      rps_win: "猜拳獲勝",
      morph: "變拳克制",
      counter: "QTE反擊",
      momo: "摸摸偷襲",
      burn: "太刀灼燒",
      reflect: "鏡光反彈",
      burst: "重劍暴擊",
      enemy_attack: "小樂出拳"
    };

    let sourceText = "";
    if (sourceKeyMap[source]) {
      const translated = I18n.t(sourceKeyMap[source]);
      if (translated && !translated.includes(".")) sourceText = translated;
    }
    if (!sourceText) {
      const translated = I18n.t("ui." + source);
      if (translated && !translated.includes(".")) sourceText = translated;
    }
    if (!sourceText) {
      sourceText = fallbackSources[source] || "攻擊";
    }

    let cleanTargetName = targetName;
    if (!cleanTargetName || cleanTargetName.includes(".")) {
      if (target === "enemy") {
        const t = I18n.t("dialogue.speakerKohaku");
        cleanTargetName = (t && !t.includes(".")) ? t : "小樂";
      } else {
        const t = I18n.t("dialogue.speakerPlayer");
        cleanTargetName = (t && !t.includes(".")) ? t : "旅人";
      }
    }

    const entry = {
      id: Date.now() + Math.random(),
      target,
      targetName: cleanTargetName,
      amount,
      sourceText,
      isEnemyHit: target === "enemy"
    };

    this.recentDamageLog.push(entry);
    if (this.recentDamageLog.length > 5) {
      this.recentDamageLog.shift();
    }

    const logList = $("#battle-damage-log-list");
    if (logList) {
      logList.innerHTML = this.recentDamageLog.map((item) => `
        <div class="damage-log-entry ${item.isEnemyHit ? "is-enemy-hit" : "is-player-hit"}">
          <span class="damage-log-source" title="${item.targetName}【${item.sourceText}】">${item.targetName}【${item.sourceText}】</span>
          <span class="damage-log-amount">−${item.amount}</span>
        </div>
      `).join("");
    }
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
bus.on("bgm:scene", ({ scene }) => sound.setBgmScene(scene));

new DialogueController(bus);
const view = new AppView({ bus, store, battle, postBattle, sound });
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
