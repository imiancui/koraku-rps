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
    xpWin: 150,
    xpLoss: 50,
    final: false
  },
  {
    id: 2,
    chapter: "貳ノ章",
    name: "夕映・狐火",
    subtitle: "黃昏會把猶豫照得一清二楚",
    enemyHp: 2000,
    requiredLevel: 3,
    xpWin: 320,
    xpLoss: 110,
    final: false
  },
  {
    id: 3,
    chapter: "參ノ章",
    name: "月下・九尾試",
    subtitle: "別被九道殘影騙走視線",
    enemyHp: 5000,
    requiredLevel: 6,
    xpWin: 760,
    xpLoss: 240,
    final: false
  },
  {
    id: 4,
    chapter: "終ノ章",
    name: "鏡界・白金小樂",
    subtitle: "跨越鏡面，迎戰最終的 2P 色",
    enemyHp: 10000,
    requiredLevel: 10,
    xpWin: 1800,
    xpLoss: 520,
    final: true
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
  damage: 10
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
  enemyDamage: 10,
  hpPotionRestore: 25,
  mpPotionRestore: 25,
  winCoins: 100,
  lossCoins: 50
});

export const STORAGE_KEY = "koraku-rps-save-v1";
