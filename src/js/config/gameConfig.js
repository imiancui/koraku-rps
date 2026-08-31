export const APP_VERSION = "0.0.13";

export const DOJO_CONFIG = Object.freeze({
  defaultHp: 10000,
  defaultDamage: 0,
  minHp: 1,
  maxHp: 999999
});

export const ASSETS = Object.freeze({
  default: "./koraku/小樂-預設.png",
  final: "./koraku/小樂-2P色.png",
  swimsuit: "./koraku/泳裝小樂.png",
  watermelon: "./koraku/泳裝小樂_西瓜.png",
  defeat: "./koraku/凝視小樂.png"
});

export const HANDS = Object.freeze({
  rock: { id: "rock", label: "石頭", glyph: "✊", beats: "scissors" },
  paper: { id: "paper", label: "布", glyph: "✋", beats: "rock" },
  scissors: { id: "scissors", label: "剪刀", glyph: "✌", beats: "paper" }
});

export const HAND_ORDER = Object.freeze(["rock", "paper", "scissors"]);

export const DIRECTION_SVGS = Object.freeze({
  up: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M12 4l-7 7 1.41 1.41L11 7.83V20h2V7.83l4.59 4.58L19 11z"/></svg>',
  down: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M12 20l7-7-1.41-1.41L13 16.17V4h-2v12.17l-4.59-4.58L5 13z"/></svg>',
  left: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M4 12l7-7 1.41 1.41L7.83 11H20v2H7.83l4.58 4.59L11 19z"/></svg>',
  right: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M20 12l-7-7-1.41 1.41L16.17 11H4v2h12.17l-4.58 4.59L14 19z"/></svg>',
  upLeft: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M6 6v8h2V9.41l9.29 9.3 1.42-1.42L9.41 8H14V6H6z"/></svg>',
  upRight: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M18 6h-8v2h4.59L5.29 17.29l1.42 1.42L16 9.41V14h2V6z"/></svg>',
  downLeft: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M6 18h8v-2H9.41l9.3-9.29-1.42-1.42L8 14.59V10H6v8z"/></svg>',
  downRight: '<svg class="qte-dir-svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M18 18v-8h-2v4.59L6.71 5.29 5.29 6.71 14.59 16H10v2h8z"/></svg>'
});

export function getDirectionSvg(id) {
  return DIRECTION_SVGS[id] || "";
}

export const DIRECTIONS = Object.freeze([
  { id: "upLeft", glyph: "↖", label: "左上", keys: ["q", "7"] },
  { id: "up", glyph: "↑", label: "上", keys: ["w", "arrowup", "8"] },
  { id: "upRight", glyph: "↗", label: "右上", keys: ["e", "9"] },
  { id: "left", glyph: "←", label: "左", keys: ["a", "arrowleft", "4"] },
  { id: "right", glyph: "→", label: "右", keys: ["d", "arrowright", "6"] },
  { id: "downLeft", glyph: "↙", label: "左下", keys: ["z", "1"] },
  { id: "down", glyph: "↓", label: "下", keys: ["s", "arrowdown", "2"] },
  { id: "downRight", glyph: "↘", label: "右下", keys: ["c", "3"] }
]);

export const STAGES = Object.freeze([
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

export const SKILLS = Object.freeze({
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

export const GALLERY_ITEMS = Object.freeze([
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

export const ITEMS = Object.freeze({
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

export const BASE_PLAYER = Object.freeze({
  maxHp: 100,
  maxMp: 50,
  damage: 100
});

export const STAT_GAINS = Object.freeze({
  hp: 10,
  mp: 10,
  damage: 5
});

export const BATTLE_RULES = Object.freeze({
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

export const EQUIPMENT_SLOTS = Object.freeze({
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

export const EQUIPMENT_ITEMS = Object.freeze({
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

export const STORAGE_KEY = "koraku-rps-save-v1";
