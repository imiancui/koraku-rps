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

  snapshot() {
    const remainingMs = Math.max(0, this.deadline - performance.now());
    return {
      active: this.active,
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

  snapshot() {
    const remainingMs = Math.max(0, this.deadline - performance.now());
    return {
      mode: "dual",
      active: this.active,
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
      appearance: stage.final ? ASSETS.final : ASSETS.default
    };
    this.emitState();
    this.say(stage.final ? "鏡中的我，可不會手下留情。" : "出拳一決。讓我看看你的決心吧。");
    this.scheduleRound();
    return true;
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

  say(text, speaker = "小樂") {
    this.bus.emit("dialogue", { speaker, text });
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
    const deadline = performance.now() + roundSeconds * 1000;
    this.emitState();

    this.countdownId = this.timers.interval(() => {
      const remaining = Math.max(0, deadline - performance.now());
      const currentCount = Math.ceil(remaining / 1000);
      this.state.countdown = currentCount;

      if (currentCount === 3 && this.state.lastChant !== 3) {
        this.state.lastChant = 3;
        this.say("剪刀", "小樂");
        this.bus.emit("battle:countdown-beat", { count: 3, word: "剪刀" });
      } else if (currentCount === 2 && this.state.lastChant !== 2) {
        this.state.lastChant = 2;
        this.say("石頭", "小樂");
        this.bus.emit("battle:countdown-beat", { count: 2, word: "石頭" });
      } else if (currentCount === 1 && this.state.lastChant !== 1) {
        this.state.lastChant = 1;
        this.say("布！", "小樂");
        this.bus.emit("battle:countdown-beat", { count: 1, word: "布！" });
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
      const rpsResult = compareHands(this.state.selectedHand, hand);
      this.state.enemyWinningEmoji = rpsResult === "loss" ? HANDS[hand].glyph : null;
    }

    let reactionWindowMs = this.state.stage?.reactionWindowMs ?? BATTLE_RULES.reactionWindowMs;
    if (this.state.isEnemyFrozen) {
      reactionWindowMs += 500;
      this.state.isEnemyFrozen = false;
    }
    this.state.reactionRemaining = reactionWindowMs / 1000;

    const deadline = performance.now() + reactionWindowMs;
    this.emitState();
    this.bus.emit("sound", { name: "reveal" });

    this.reactionTickId = this.timers.interval(() => {
      this.state.reactionRemaining = Math.max(0, (deadline - performance.now()) / 1000);
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
      this.state.selectedHand = getCounterHand(this.state.opponentHand);
      this.state.selectedHands.left = this.state.selectedHand;
      this.state.selectedHands.right = this.state.selectedHand;
    }

    this.state.enemyWinningEmoji = null;
    this.state.morphUsed = true;
    this.state.reactionRemaining = 0;
    this.emitState();
    this.bus.emit("battle:effect", { type: "morph" });
    this.bus.emit("sound", { name: "skill" });
    this.say("咦……在最後一瞬間變拳了？", "小樂");
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
    this.say("抓到破綻了！想躲開的話，就跟上我的節奏！", "小樂");
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
    this.say("雙重破綻！跟上我們的雙生節奏吧！", "白金小樂");
    this.bus.emit("sound", { name: "danger" });
    const extraQte = this.hasEquipEffect("qte_time")?.extraQteSeconds || 0;
    this.dualQte.start({
      length: this.state.stage.qteLength || 7,
      durationMs: (BATTLE_RULES.qteSeconds + extraQte) * 1000,
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
    this.say(message, result === "loss" ? "小樂" : "旁白");

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
    this.say("使用「" + item.name + "」，恢復了 " + restored + " 點 " + item.resource.toUpperCase() + "。", "旁白");
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
      this.say("這次是你贏了。要把勝利用在什麼願望上呢？");
    } else {
      this.say("還有什麼要說的嗎？回去再練練吧！");
    }
  }

  requestSwimsuit() {
    if (!this.state?.won) return;
    this.store?.unlockSwimsuit?.();
    this.state.scene = "swimsuit";
    this.state.appearance = ASSETS.swimsuit;
    this.emit();
    this.say("泳裝？真拿你沒辦法……只准看一下喔。");
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
    this.say("第 " + nextAttempt + " 刀。白色指針進入綠色區域時，就喊『就是現在！』！");
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
    if (success) {
      this.say("漂亮！這一刀切中了。還有 " + (this.state.watermelon.maxAttempts - this.state.watermelon.attempts) + " 刀。");
    } else {
      this.say("差一點點！還有 " + (this.state.watermelon.maxAttempts - this.state.watermelon.attempts) + " 刀，下一次再來。");
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
      this.say("三刀都結束了！切中 " + watermelon.successes + " 次，真是有趣呢！");
    } else {
      this.say("三刀都結束了。下次再一起抓準時機吧。");
    }
  }

  getMarkerPosition(now = performance.now()) {
    if (!this.state?.strikeStartedAt) return 0;
    const elapsed = (now - this.state.strikeStartedAt) % this.state.strikeDuration;
    const normalized = elapsed / this.state.strikeDuration;
    return normalized <= 0.5 ? normalized * 2 : (1 - normalized) * 2;
  }

  say(text) {
    this.bus.emit("dialogue", { speaker: "小樂", text });
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
    this.setSpeaking(speaker === "小樂");

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
    const snapshot = this.store.snapshot();
    this.renderStore(snapshot);
    this.navigate("home");
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

    if (!this.battleState?.active) return;
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
      const isDualHands = Boolean(this.battleState.hasDualHandSkill && this.battleState.stage?.dualEnemy);
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
        } else if (event.code === "Numpad1") {
          this.battle.selectHand("rock", "right");
        } else if (event.code === "Numpad2") {
          this.battle.selectHand("paper", "right");
        } else if (event.code === "Numpad3") {
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
    $("#record-stage").textContent = state.records.bestStage ? "第 " + state.records.bestStage + " 章" : "—";
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
      const locked = state.profile.level < stage.requiredLevel;
      const cleared = state.records.bestStage >= stage.id;
      const classes = [
        "stage-card",
        cleared ? "is-cleared" : "",
        stage.final ? "is-final" : ""
      ].filter(Boolean).join(" ");
      let status = "進入對局　›";
      if (locked) status = "需達 Lv. " + stage.requiredLevel + "　🔒";
      if (cleared) status = "已締結・再次挑戰　✓";
      return '<button type="button" class="' + classes + '" data-stage="' + stage.id +
        '" data-kanji="' + kanji[index] + '"' + (locked ? " disabled" : "") + '>' +
        '<span class="stage-chapter">' + stage.chapter + "</span>" +
        "<h3>" + stage.name + "</h3>" +
        "<p>" + stage.subtitle + "</p>" +
        '<div class="stage-rule">' +
        '<span>小樂 HP</span><b>' + stage.enemyHp.toLocaleString("zh-TW") + '</b>' +
        '<span>建議等級</span><b>Lv. ' + stage.requiredLevel + '</b>' +
        '<span>勝利獎勵</span><b style="font-size:12px;color:var(--gold-bright);">+' + stage.xpWin + ' EXP / +' + stage.winCoins + ' 星砂</b>' +
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
      if (item.twoHanded) return "主手 (雙手)";
      if (item.slotType === "weapon") return "主手武器";
      if (item.slotType === "offHand") return "副手武防";
      if (item.slotType === "head") return "頭盔";
      if (item.slotType === "shoulders") return "肩甲";
      if (item.slotType === "chest") return "胸甲";
      if (item.slotType === "belt") return "腰帶";
      if (item.slotType === "boots") return "鞋子";
      if (item.slotType === "ring") return "戒指";
      if (item.slotType === "earring") return "耳環";
      if (item.slotType === "badge") return "胸章";
      return EQUIPMENT_SLOTS[item.slotType]?.label || "裝備";
    };

    const categories = [
      {
        id: "potions",
        title: "消耗靈露",
        items: Object.values(ITEMS).map((item) => ({ ...item, isPotion: true }))
      },
      {
        id: "weapon",
        title: "主手武器",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "weapon")
      },
      {
        id: "offHand",
        title: "副手武防",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "offHand" || item.id === "dagger_shadow")
      },
      {
        id: "head",
        title: "頭盔防具",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "head")
      },
      {
        id: "shoulders",
        title: "肩甲防具",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "shoulders")
      },
      {
        id: "chest",
        title: "胸甲防具",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "chest")
      },
      {
        id: "belt",
        title: "腰帶防具",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "belt")
      },
      {
        id: "boots",
        title: "鞋子防具",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "boots")
      },
      {
        id: "ring",
        title: "戒指飾品",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "ring")
      },
      {
        id: "earring",
        title: "耳環飾品",
        items: Object.values(EQUIPMENT_ITEMS).filter((item) => item.slotType === "earring")
      },
      {
        id: "badge",
        title: "胸章飾品",
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
          const description = item.resource === "hp"
            ? "溫熱的紅色靈露，在對局中恢復 25 點生命。"
            : "映著月色的藍色靈露，在對局中恢復 25 點魔力。";
          html += '<article class="shop-equip-card shop-card-potion">' +
            '<div class="item-orb ' + item.color + '"><i>' + item.glyph + "</i></div>" +
            '<div class="shop-equip-info">' +
            '<div class="shop-equip-header">' +
            '<span class="shop-slot-badge is-potion">【消耗靈露】</span>' +
            '<span class="shop-equip-name">' + item.name + '</span>' +
            '</div>' +
            '<div class="shop-equip-desc">' + description + '</div>' +
            '<div class="shop-equip-action">' +
            '<span class="shop-owned">持有數 <b>' + state.inventory[item.id] + '</b></span>' +
            '<button type="button" class="button-primary" data-buy="' + item.id + '"' +
            (state.coins < item.price ? " disabled" : "") + '>✦ ' + item.price + ' 購入</button>' +
            '</div>' +
            '</div></article>';
        } else {
          const statParts = [];
          if (item.stats.damage) statParts.push("攻擊 +" + item.stats.damage);
          if (item.stats.hp) statParts.push("生命 +" + item.stats.hp);
          if (item.stats.mp) statParts.push("魔力 +" + item.stats.mp);
          const statsText = statParts.join(" / ");
          const slotLabel = getSlotLabel(item);

          const equippedSlot = Object.keys(state.equipment || {}).find((s) => state.equipment[s] === item.id);
          const isEquipped = Boolean(equippedSlot);
          const isOwnedInBag = (state.inventoryEquipment || []).includes(item.id);

          let actionHtml = "";
          if (isEquipped) {
            actionHtml = '<span class="shop-status-badge is-equipped">已裝備 ✓</span>' +
              '<button type="button" class="button-secondary shop-btn-unequip" data-shop-unequip="' + equippedSlot + '">卸下</button>';
          } else if (isOwnedInBag) {
            actionHtml = '<span class="shop-status-badge is-owned">背包持有</span>' +
              '<button type="button" class="button-primary shop-btn-equip" data-shop-equip="' + item.id + '">即刻穿戴</button>';
          } else {
            actionHtml = '<span style="font-size:12px;color:var(--gold);">✦ ' + item.price + ' 星砂</span>' +
              '<button type="button" class="button-primary" data-buy-equip="' + item.id + '"' +
              (state.coins < item.price ? " disabled" : "") + '>購入</button>';
          }

          html += '<article class="shop-equip-card rarity-' + item.rarity + '" data-equip-tooltip-id="' + item.id + '">' +
            '<div class="shop-equip-icon">' + item.icon + '</div>' +
            '<div class="shop-equip-info">' +
            '<div class="shop-equip-header">' +
            '<span class="shop-slot-badge">【' + slotLabel + '】</span>' +
            '<span class="shop-equip-name">' + item.name + '</span>' +
            '</div>' +
            '<div class="shop-equip-stats">' + statsText + '</div>' +
            '<div class="shop-equip-desc">' + item.description + '</div>' +
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
        label: "攻擊",
        code: "DAMAGE",
        glyph: "刃",
        value: state.playerStats.damage,
        unit: "每次勝利傷害",
        text: "每投入 1 點，對小樂造成的傷害增加 5。"
      },
      {
        id: "hp",
        label: "生命",
        code: "VITALITY",
        glyph: "命",
        value: state.playerStats.maxHp,
        unit: "最大 HP",
        text: "每投入 1 點，最大生命增加 10。"
      },
      {
        id: "mp",
        label: "魔力",
        code: "ARCANA",
        glyph: "魔",
        value: state.playerStats.maxMp,
        unit: "最大 MP",
        text: "每投入 1 點，最大魔力增加 10。"
      }
    ];
    if (this.growthGrid) {
      this.growthGrid.innerHTML = cards.map((card) => {
        const disabled = state.profile.skillPoints <= 0 ? " disabled" : "";
        return '<article class="growth-card" data-glyph="' + card.glyph + '"><small>' + card.code +
          "</small><h3>" + card.label + '</h3><div class="stat-value"><b>' + card.value +
          "</b><span>" + card.unit + "</span></div><p>" + card.text +
          '</p><button type="button" class="button-primary" data-allocate="' + card.id + '"' +
          disabled + ">投入 1 SP　＋</button></article>";
      }).join("");
    }

    if (this.skillsGrid) {
      this.skillsGrid.innerHTML = Object.values(SKILLS).map((skill) => {
        const unlocked = state.profile.level >= skill.unlockLevel;
        const currentLvl = (state.profile.skills && state.profile.skills[skill.id]) || 0;
        const isMax = currentLvl >= skill.maxLevel;
        const canAfford = state.profile.skillPoints >= skill.costPerLevel;
        const currentChance = unlocked && currentLvl > 0 ? (currentLvl * 10) : 0;
        const nextChance = (currentLvl + 1) * 10;

        let statValueHtml = "";
        if (skill.id === "momo") {
          statValueHtml = '<div class="stat-value"><b>' + currentChance + "%</b><span>平手發動率</span></div>";
        } else if (skill.id === "dualHand") {
          statValueHtml = '<div class="stat-value"><b>' + (currentLvl > 0 ? "已解放" : "未解鎖") + "</b><span>第四關雙手出拳</span></div>";
        }

        let buttonText = "修練 (" + skill.costPerLevel + " SP)";
        let disabled = false;
        if (!unlocked) {
          buttonText = "需達 Lv. " + skill.unlockLevel + " 解鎖";
          disabled = true;
        } else if (isMax) {
          buttonText = "已達最高等級 (MAX)";
          disabled = true;
        } else if (!canAfford) {
          buttonText = "投入 " + skill.costPerLevel + " SP (點數不足)";
          disabled = true;
        }

        const nextTip = (!isMax && unlocked && skill.id === "momo")
          ? '<br><small style="color:var(--azure-bright);display:block;margin-top:4px;">下一級機率: ' + nextChance + "%</small>"
          : "";

        return '<article class="growth-card" data-glyph="' + skill.glyph + '">' +
          "<small>" + skill.code + "</small>" +
          "<h3>" + skill.name + ' <small style="font-size:12px;color:var(--gold);margin-left:6px;">Lv. ' + currentLvl + " / " + skill.maxLevel + "</small></h3>" +
          statValueHtml +
          "<p>" + skill.description + nextTip + "</p>" +
          '<button type="button" class="button-primary" data-allocate-skill="' + skill.id + '"' +
          (disabled ? " disabled" : "") + ">" + buttonText + "</button></article>";
      }).join("");
    }
  }

  renderGallery(state) {
    const unlocked = Boolean(state.records.unlockedSwimsuit || state.records.bestStage >= 1);
    const currentItem = GALLERY_ITEMS.find((item) => item.id === this.selectedGalleryItem) || GALLERY_ITEMS[0];

    if (this.galleryArtFrame) {
      this.galleryArtFrame.classList.toggle("is-locked", !unlocked);
    }
    if (this.galleryImage) {
      this.galleryImage.src = currentItem.src;
    }
    if (this.galleryItemTitle) {
      this.galleryItemTitle.textContent = currentItem.name;
    }
    if (this.galleryItemDesc) {
      this.galleryItemDesc.textContent = currentItem.description;
    }
    if (this.galleryVariantButtons) {
      this.galleryVariantButtons.innerHTML = GALLERY_ITEMS.map((item) => {
        const active = item.id === currentItem.id ? " is-active" : "";
        return '<button type="button" class="gallery-variant-btn' + active + '" data-gallery-variant="' + item.id + '">' + item.variantName + "</button>";
      }).join("");
    }
  }

  renderGuideBoss(state) {
    const bossGrid = $("#guide-boss-grid");
    if (!bossGrid) return;
    const kanji = ["朱", "夕", "月", "鏡"];
    bossGrid.innerHTML = STAGES.map((stage, index) => {
      const cleared = (state.records.bestStage || 0) >= stage.id;
      return '<article class="guide-card' + (cleared ? " is-cleared" : " is-locked") + '">' +
        '<span class="guide-number">' + kanji[index] + "</span>" +
        '<small style="color:var(--gold);font-size:10px;letter-spacing:0.2em;display:block;margin-bottom:4px;">' + stage.chapter + "</small>" +
        "<h3>" + (cleared ? stage.name : "？？？") + "</h3>" +
        (cleared
          ? '<div style="margin:8px 0 10px;font-size:13px;color:var(--gold-bright);font-weight:600;">規則重點：' + stage.bossRuleSummary + "</div>" +
            '<p style="min-height:80px;color:var(--paper-dim);font-size:12px;line-height:1.7;">' + stage.bossRuleDetail + "</p>" +
            '<div class="guide-reward" style="margin-top:12px;font-size:13px;">勝利獎勵：+' + stage.xpWin + " EXP / +" + stage.winCoins + " 星砂</div>"
          : '<div style="min-height:140px;display:grid;place-content:center;text-align:center;color:var(--paper-dim);">' +
            '<span style="font-size:28px;margin-bottom:6px;">🔒</span>' +
            '<b style="color:var(--paper-dim);font-size:13px;">尚未通關</b>' +
            '<small style="margin-top:4px;font-size:11px;color:var(--paper-dim);">打贏此關卡後揭曉具體規則</small>' +
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
    if ($("#bag-count")) $("#bag-count").textContent = `${bag.length} 件裝備`;

    // Render paperdoll slots
    const isMainTwoHanded = Boolean(equip.mainHand && EQUIPMENT_ITEMS[equip.mainHand]?.twoHanded);

    Object.keys(EQUIPMENT_SLOTS).forEach((slotKey) => {
      const box = $("#slot-" + slotKey);
      const slotBtn = $(`[data-slot="${slotKey}"]`);
      if (!box || !slotBtn) return;

      if (slotKey === "offHand" && isMainTwoHanded) {
        slotBtn.classList.add("is-two-handed-locked");
        box.innerHTML = '<span class="slot-placeholder" style="font-size:14px;color:var(--gold);">⚔️ (雙手佔用)</span>';
        slotBtn.removeAttribute("data-equip-tooltip-id");
        return;
      } else {
        slotBtn.classList.remove("is-two-handed-locked");
      }

      const itemId = equip[slotKey];
      if (itemId && EQUIPMENT_ITEMS[itemId]) {
        const item = EQUIPMENT_ITEMS[itemId];
        slotBtn.setAttribute("data-equip-tooltip-id", item.id);
        box.innerHTML = `
          <span class="slot-item-icon">${item.icon}</span>
          <span class="slot-item-name rarity-${item.rarity}">${item.name}</span>
        `;
      } else {
        slotBtn.removeAttribute("data-equip-tooltip-id");
        box.innerHTML = `<span class="slot-placeholder">${EQUIPMENT_SLOTS[slotKey].icon}</span>`;
      }
    });

    // Render stats summary
    const statsSummary = $("#paperdoll-stats-summary");
    if (statsSummary) {
      statsSummary.innerHTML = `
        <span>HP<b>${state.playerStats.maxHp}</b></span>
        <span>MP<b>${state.playerStats.maxMp}</b></span>
        <span>ATK<b>${state.playerStats.damage}</b></span>
      `;
    }

    // Render Bag
    const bagGrid = $("#equipment-bag-grid");
    if (bagGrid) {
      if (bag.length === 0) {
        bagGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 10px;color:var(--paper-dim);">背包空空如也，可至緣側商店選購裝備。</div>';
      } else {
        bagGrid.innerHTML = bag.map((itemId) => {
          const item = EQUIPMENT_ITEMS[itemId];
          if (!item) return "";
          return `
            <button type="button" class="bag-item-card rarity-${item.rarity}" data-equip-bag-item="${item.id}" data-equip-tooltip-id="${item.id}">
              <span class="bag-item-icon">${item.icon}</span>
              <div class="bag-item-info">
                <span class="bag-item-name">${item.name}</span>
                <span class="bag-item-type">${item.twoHanded ? "雙手武器" : (EQUIPMENT_SLOTS[item.slotType]?.label || item.slotType)}</span>
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

    let effectHtml = "";
    if (item.effect) {
      let effectLabel = "";
      if (item.effect.type === "burn") effectLabel = `【狐火燃燒】回合結束額外造成 ${item.effect.burnDamage} 點燃燒傷害`;
      if (item.effect.type === "freeze") effectLabel = `【寒霜凝滯】勝出 30% 機率冰凍小樂，下回合反應時間 +0.5 秒`;
      if (item.effect.type === "thunder") effectLabel = `【迅雷反制】QTE 反制成功追加 ${item.effect.qteBonusDamage} 點雷擊傷害`;
      if (item.effect.type === "burst") effectLabel = `【霸者破甲】出拳勝利傷害為 1.5 倍（雙手佔用）`;
      if (item.effect.type === "shield") effectLabel = `【靈壁減傷】受傷減免 ${item.effect.damageReduction} 點`;
      if (item.effect.type === "shadow") effectLabel = `【連擊刺擊】平手摸摸傷害 +${item.effect.momoDamageBonus} 點`;
      if (item.effect.type === "potion_boost") effectLabel = `【藥泉共鳴】藥水回復效果 +${item.effect.potionBoost} 點`;
      if (item.effect.type === "qte_time") effectLabel = `【神行步法】QTE 反制時限延長 ${item.effect.extraQteSeconds} 秒`;
      if (item.effect.type === "morph_discount") effectLabel = `【靈玉凝神】變拳 MP 消耗降低 ${item.effect.morphDiscount} 點`;
      if (item.effect.type === "coin_boost") effectLabel = `【羈絆之證】戰勝獲得星砂 +20%`;
      effectHtml = `<div class="tooltip-effect">${effectLabel}</div>`;
    }

    const statParts = [];
    if (item.stats?.damage) statParts.push(`攻擊 +${item.stats.damage}`);
    if (item.stats?.hp) statParts.push(`生命 +${item.stats.hp}`);
    if (item.stats?.mp) statParts.push(`魔力 +${item.stats.mp}`);
    const statsHtml = statParts.length > 0 ? `<div class="tooltip-stats">${statParts.join(" / ")}</div>` : "";

    this.equipTooltip.innerHTML = `
      <div class="tooltip-header rarity-${item.rarity}">
        <span class="tooltip-icon">${item.icon}</span>
        <div>
          <div class="tooltip-title">${item.name}</div>
          <small style="font-size:10px;text-transform:uppercase;">${item.rarity} ${item.twoHanded ? "雙手巨劍" : "裝備"}</small>
        </div>
      </div>
      ${statsHtml}
      ${effectHtml}
      <div class="tooltip-desc">${item.description}</div>
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
    $("#battle-chapter").textContent = state.stage.chapter;
    $("#battle-stage-name").textContent = state.stage.name;
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
        $("#enemy-left-name").textContent = left.name;
        $("#enemy-left-hp-text").textContent = left.hp.toLocaleString("zh-TW") + " / " + left.maxHp.toLocaleString("zh-TW");
        $("#enemy-left-hp-fill").style.width = clampPercent(left.hp, left.maxHp) + "%";
        const leftCard = document.querySelector("[data-target-enemy='left']");
        if (leftCard) {
          leftCard.classList.toggle("is-selected", state.targetEnemyId === "left" && left.alive);
          leftCard.classList.toggle("is-dead", !left.alive);
        }
      }
      if (right) {
        $("#enemy-right-name").textContent = right.name;
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
      $("#enemy-name").textContent = state.stage.final ? "白金小樂" : "小樂";
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

    const isDualHands = Boolean(state.stage?.dualEnemy && state.hasDualHandSkill);
    if (isDualHands) {
      if (this.playerHandWrapSingle) this.playerHandWrapSingle.hidden = true;
      if (this.playerHandWrapDual) this.playerHandWrapDual.hidden = false;
      const leftPlayerHand = HANDS[state.selectedHands?.left || "rock"];
      const rightPlayerHand = HANDS[state.selectedHands?.right || "rock"];
      $("#player-left-hand-display").textContent = leftPlayerHand.glyph;
      $("#player-left-hand-label").textContent = leftPlayerHand.label;
      $("#player-right-hand-display").textContent = rightPlayerHand.glyph;
      $("#player-right-hand-label").textContent = rightPlayerHand.label;
    } else {
      if (this.playerHandWrapSingle) this.playerHandWrapSingle.hidden = false;
      if (this.playerHandWrapDual) this.playerHandWrapDual.hidden = true;
      $("#player-hand-display").textContent = HANDS[state.selectedHand].glyph;
      $("#player-hand-label").textContent = HANDS[state.selectedHand].label;
    }

    const singleHandWrap = $("#enemy-hand-wrap-single");
    const dualHandWrap = $("#enemy-hand-wrap-dual");

    if (isDualHands && state.opponentHands?.left && state.opponentHands?.right) {
      if (singleHandWrap) singleHandWrap.hidden = true;
      if (dualHandWrap) dualHandWrap.hidden = false;

      const leftHand = HANDS[state.opponentHands.left];
      const rightHand = HANDS[state.opponentHands.right];

      if (state.phase === "countdown") {
        $("#enemy-left-hand-display").textContent = "✊";
        $("#enemy-left-hand-label").textContent = state.countdown <= 3 ? "準備中" : "未揭曉";
        $("#enemy-right-hand-display").textContent = "✊";
        $("#enemy-right-hand-label").textContent = state.countdown <= 3 ? "準備中" : "未揭曉";
      } else {
        $("#enemy-left-hand-display").textContent = leftHand ? leftHand.glyph : "？";
        $("#enemy-left-hand-label").textContent = leftHand ? leftHand.label : "未揭曉";
        $("#enemy-right-hand-display").textContent = rightHand ? rightHand.glyph : "？";
        $("#enemy-right-hand-label").textContent = rightHand ? rightHand.label : "未揭曉";
      }
    } else {
      if (singleHandWrap) singleHandWrap.hidden = false;
      if (dualHandWrap) dualHandWrap.hidden = true;

      const opponent = HANDS[state.opponentHand];
      if (state.phase === "countdown") {
        $("#enemy-hand-display").textContent = "✊";
        $("#enemy-hand-label").textContent = state.countdown <= 3 ? "準備中" : "未揭曉";
      } else {
        $("#enemy-hand-display").textContent = opponent ? opponent.glyph : "？";
        $("#enemy-hand-label").textContent = opponent ? opponent.label : "未揭曉";
      }
    }

    if (isDualHands) {
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

    const morph = $("#morph-skill");
    const morphReady = state.phase === "reaction" && state.playerMp >= 25;
    morph.disabled = !morphReady;
    morph.classList.toggle("is-ready", morphReady);

    const countdownValue = $("#countdown-value");
    const countdownCaption = $("#countdown-caption");
    if (state.phase === "countdown") {
      countdownValue.textContent = state.countdown;
      countdownCaption.textContent = "出拳倒數";
    } else if (state.phase === "reaction") {
      countdownValue.textContent = state.reactionRemaining.toFixed(1);
      countdownCaption.textContent = "按 F 變拳";
    } else if (state.phase === "qte") {
      countdownValue.textContent = "!";
      countdownCaption.textContent = "反制機會";
    } else {
      countdownValue.textContent = state.lastResult === "win" ? "勝" : state.lastResult === "loss" ? "負" : "和";
      countdownCaption.textContent = "回合結算";
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

      // Render Left Slot
      const leftSeq = $("#dual-qte-sequence-left");
      if (leftSeq && state.left?.sequence) {
        leftSeq.innerHTML = state.left.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.left.index ? " is-done" : index === state.left.index ? " is-current" : "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' + (direction?.glyph || "") + "</span>";
        }).join("");
      }

      // Render Right Slot
      const rightSeq = $("#dual-qte-sequence-right");
      if (rightSeq && state.right?.sequence) {
        rightSeq.innerHTML = state.right.sequence.map((id, index) => {
          const direction = DIRECTIONS.find((item) => item.id === id);
          const status = index < state.right.index ? " is-done" : index === state.right.index ? " is-current" : "";
          return '<span class="qte-arrow' + status + '" aria-label="' + (direction?.label || "") + '">' + (direction?.glyph || "") + "</span>";
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
    $("#watermelon-successes").textContent = "切中 " + watermelon.successes + " 次";
    const tolerance = state.tolerance ?? (0.13 * (0.5 ** watermelon.successes));
    $("#watermelon-target").style.left = (state.target * 100) + "%";
    $("#watermelon-target").style.width = (tolerance * 2 * 100) + "%";
    const watermelonStatus = $("#watermelon-status");
    watermelonStatus.hidden = !["watermelonResult", "watermelonComplete"].includes(state.scene);
    let actions = "";

    if (state.scene === "defeat") {
      $("#result-title").textContent = "敗北・凝視";
      $("#result-message").textContent = "小樂居高臨下地看著你，留下 50 星砂作為練習的證明。";
      actions = this.postButtons(true);
    } else if (state.scene === "victory") {
      $("#result-title").textContent = "勝利・結緣";
      $("#result-message").textContent = "你拆解了小樂的架勢。現在，可以向她提出勝者的願望。";
      actions =
        '<button type="button" class="button-primary" data-post-action="swimsuit">請小樂穿泳裝 <kbd>SPACE</kbd></button>' +
        this.postButtons(false);
    } else if (state.scene === "swimsuit") {
      $("#result-title").textContent = "勝者的願望";
      $("#result-message").textContent = "小樂換上了泳裝，也準備好了木棒。";
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">玩蒙眼切西瓜 <kbd>SPACE</kbd></button>' +
        this.postButtons(false);
    } else if (state.scene === "watermelonAim") {
      $("#result-title").textContent = "蒙眼切西瓜・第 " + (watermelon.attempts + 1) + " 刀";
      $("#result-message").textContent = "白色指針進入綠色區域後，立即按下「就是現在！」。";
      actions = "";
    } else if (state.scene === "watermelonResult") {
      const remaining = watermelon.maxAttempts - watermelon.attempts;
      const cutMessage = watermelon.lastCutSuccess ? "切中了！" : "這一刀沒有碰到西瓜。";
      $("#result-title").textContent = watermelon.lastCutSuccess ? "漂亮一擊" : "差一點點";
      $("#result-message").textContent = cutMessage + "還有 " + remaining + " 刀，完成三刀後才會結算獎勵。";
      watermelonStatus.textContent = "目前切中 " + watermelon.successes + " 次・第 " + watermelon.attempts + " / " + watermelon.maxAttempts + " 刀";
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">進行第 ' + (watermelon.attempts + 1) + " 刀 <kbd>SPACE</kbd></button>" +
        this.postButtons(false);
    } else if (state.scene === "watermelonComplete") {
      $("#result-title").textContent = "西瓜大結算";
      $("#result-message").textContent = "三刀完成，成功切中 " + watermelon.successes + " 次。";
      watermelonStatus.textContent = watermelon.rewardXp > 0
        ? "西瓜獎勵　＋" + watermelon.rewardXp + " EXP" + (watermelon.levelsGained ? "　Lv.＋" + watermelon.levelsGained : "")
        : "本次沒有切中西瓜，未獲得額外經驗。";
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
    return '<button type="button" class="' + rematchClass + '" data-post-action="rematch">再次挑戰 <kbd>E</kbd></button>' +
      '<button type="button" class="button-secondary" data-post-action="stages">選擇章節 <kbd>C</kbd></button>' +
      '<button type="button" class="button-secondary" data-post-action="home">回大廳 <kbd>Q</kbd></button>';
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
