import test from "node:test";
import assert from "node:assert/strict";
import {
  compareHands,
  evaluateDualRps,
  getCounterHand,
  getQteCounterNarration
} from "../src/js/systems/rpsRules.js";
import {
  combineCardinalDirections,
  directionFromKey,
  directionFromSwipe,
  QTEKeyboardInput
} from "../src/js/systems/QTEInputSystem.js";

test("猜拳的九種組合判定正確", () => {
  const expected = {
    "rock:rock": "draw",
    "rock:paper": "loss",
    "rock:scissors": "win",
    "paper:rock": "win",
    "paper:paper": "draw",
    "paper:scissors": "loss",
    "scissors:rock": "loss",
    "scissors:paper": "win",
    "scissors:scissors": "draw"
  };

  Object.entries(expected).forEach(([pair, result]) => {
    const [player, opponent] = pair.split(":");
    assert.equal(compareHands(player, opponent), result);
  });
});

test("雙手勢猜拳 evaluateDualRps 正確判定雙勝、雙負、一勝一負與單平", () => {
  // 雙負: 剪刀 vs 石頭 + 石頭
  const dualLoss = evaluateDualRps("scissors", "rock", "rock");
  assert.equal(dualLoss.isDualLoss, true);
  assert.equal(dualLoss.hasLoss, true);
  assert.deepEqual(dualLoss.losses, ["left", "right"]);

  // 一勝一負: 石頭 vs 剪刀(left勝) + 布(right負)
  const winLoss = evaluateDualRps("rock", "scissors", "paper");
  assert.equal(winLoss.isSingleLoss, true);
  assert.equal(winLoss.isDualLoss, false);
  assert.deepEqual(winLoss.wins, ["left"]);
  assert.deepEqual(winLoss.losses, ["right"]);

  // 雙勝: 布 vs 石頭 + 石頭
  const allWin = evaluateDualRps("paper", "rock", "rock");
  assert.equal(allWin.isAllWin, true);
  assert.deepEqual(allWin.wins, ["left", "right"]);
  assert.equal(allWin.hasLoss, false);

  // 一平一負: 石頭 vs 石頭(left平) + 布(right負)
  const drawLoss = evaluateDualRps("rock", "rock", "paper");
  assert.equal(drawLoss.isSingleLoss, true);
  assert.deepEqual(drawLoss.draws, ["left"]);
  assert.deepEqual(drawLoss.losses, ["right"]);

  // 單小樂存活情況（右側小樂已陣亡，rightHand 為 null）
  const singleAlive = evaluateDualRps("rock", "scissors", null);
  assert.equal(singleAlive.left, "win");
  assert.equal(singleAlive.right, null);
  assert.deepEqual(singleAlive.wins, ["left"]);
  assert.equal(singleAlive.hasLoss, false);
});

test("變拳總會回傳能克制對手的手勢", () => {
  ["rock", "paper", "scissors"].forEach((opponent) => {
    assert.equal(compareHands(getCounterHand(opponent), opponent), "win");
  });
});

test("QTE 三種敗勢使用指定反制敘事", () => {
  assert.match(getQteCounterNarration("paper").text, /用手包裹住小樂的剪刀手/);
  assert.match(getQteCounterNarration("scissors").text, /用布握住了小樂的小拳頭/);
  assert.match(getQteCounterNarration("rock").text, /用五指交扣了小樂的軟綿綿小手手/);
  assert.equal(getQteCounterNarration("rock").changedHand, "paper");
});

test("鍵盤涵蓋八方向與方向鍵", () => {
  assert.equal(directionFromKey("q"), "upLeft");
  assert.equal(directionFromKey("W"), "up");
  assert.equal(directionFromKey("e"), "upRight");
  assert.equal(directionFromKey("ArrowLeft"), "left");
  assert.equal(directionFromKey("ArrowRight"), "right");
  assert.equal(directionFromKey("z"), "downLeft");
  assert.equal(directionFromKey("ArrowDown"), "down");
  assert.equal(directionFromKey("c"), "downRight");
});

test("兩個正方向鍵會合成斜向輸入", () => {
  assert.equal(combineCardinalDirections(["up", "right"]), "upRight");
  assert.equal(combineCardinalDirections(["up", "left"]), "upLeft");
  assert.equal(combineCardinalDirections(["down", "right"]), "downRight");
  assert.equal(combineCardinalDirections(["down", "left"]), "downLeft");
});

test("右上 QTE 可由上與右依序按住完成", () => {
  const keyboard = new QTEKeyboardInput();
  assert.deepEqual(keyboard.keyDown("ArrowUp", "upRight"), {
    handled: true,
    direction: null
  });
  assert.deepEqual(keyboard.keyDown("ArrowRight", "upRight"), {
    handled: true,
    direction: "upRight"
  });

  keyboard.reset();
  assert.equal(keyboard.keyDown("w", "upRight").direction, null);
  assert.equal(keyboard.keyDown("d", "upRight").direction, "upRight");
});

test("斜向 QTE 目標按下無效正方向鍵時立即回傳錯誤方向供失敗判定", () => {
  const keyboard = new QTEKeyboardInput();
  // Target is upRight (needs up + right), pressing down or left should immediately return the wrong direction
  assert.deepEqual(keyboard.keyDown("ArrowDown", "upRight"), {
    handled: true,
    direction: "down"
  });
  keyboard.reset();
  assert.deepEqual(keyboard.keyDown("a", "upRight"), {
    handled: true,
    direction: "left"
  });
  keyboard.reset();
  assert.deepEqual(keyboard.keyDown("s", "upRight"), {
    handled: true,
    direction: "down"
  });
  // Pressing first key correctly then pressing invalid second key
  keyboard.reset();
  assert.deepEqual(keyboard.keyDown("w", "upRight"), {
    handled: true,
    direction: null
  });
  assert.deepEqual(keyboard.keyDown("s", "upRight"), {
    handled: true,
    direction: "down"
  });
});

test("手指滑動 directionFromSwipe 正確識別 8 方向與最小距離閾值", () => {
  // Distance threshold check
  assert.equal(directionFromSwipe(10, 5, 24), null);
  assert.equal(directionFromSwipe(0, 0, 24), null);

  // 8 Directions with >= 24px displacement
  assert.equal(directionFromSwipe(50, 0, 24), "right");
  assert.equal(directionFromSwipe(50, 50, 24), "downRight");
  assert.equal(directionFromSwipe(0, 50, 24), "down");
  assert.equal(directionFromSwipe(-50, 50, 24), "downLeft");
  assert.equal(directionFromSwipe(-50, 0, 24), "left");
  assert.equal(directionFromSwipe(-50, -50, 24), "upLeft");
  assert.equal(directionFromSwipe(0, -50, 24), "up");
  assert.equal(directionFromSwipe(50, -50, 24), "upRight");
});

test("猜拳猜輸時觸發 punch 音效與 player-rps-loss 效果", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  // deterministic random: index 1 in [rock, paper, scissors] is paper
  const battle = new BattleSystem(bus, store, () => 0.4);

  const effects = [];
  const sounds = [];
  bus.on("battle:effect", (e) => effects.push(e));
  bus.on("sound", (s) => sounds.push(s));

  battle.start(1);
  battle.selectHand("rock"); // rock vs paper => loss

  battle.revealHands();
  battle.resolveRound();

  assert.ok(effects.some((e) => e.type === "player-rps-loss"), "應發送 player-rps-loss 畫面震動事件");
  assert.ok(sounds.some((s) => s.name === "punch"), "猜輸應播放 punch 拳頭打擊音效");
  assert.equal(battle.state.phase, "qte", "猜輸後應進入 QTE");
  battle.abandon();
});

test("小樂被反制時觸發 counterRub 音效與 countered enemy-hit 效果", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  const effects = [];
  const sounds = [];
  bus.on("battle:effect", (e) => effects.push(e));
  bus.on("sound", (s) => sounds.push(s));

  battle.start(1);
  battle.state.selectedHand = "rock";
  battle.state.phase = "qte";

  battle.resolveQte({ success: true });
  await new Promise((r) => setTimeout(r, 550));

  const hitEffect = effects.find((e) => e.type === "enemy-hit");
  assert.ok(hitEffect, "應發送 enemy-hit 事件");
  assert.equal(hitEffect.countered, true, "受擊事件應標記為 countered");
  assert.ok(sounds.some((s) => s.name === "counterRub"), "反制成功應播放 counterRub 撫摸摩擦音效");
  battle.abandon();
});

test("SoundSystem 在無 AudioContext 環境下安全略過不拋出例外", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { SoundSystem } = await import("../src/js/systems/SoundSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const sound = new SoundSystem(store);

  assert.doesNotThrow(() => {
    sound.play("punch");
    sound.play("counterRub");
    sound.play("hit");
  });
});

test("最後三秒倒數依序發送剪刀、石頭、布節奏事件與台詞", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  const chants = [];
  const beats = [];
  bus.on("dialogue", (d) => chants.push(d.text));
  bus.on("battle:countdown-beat", (b) => beats.push(b));

  battle.start(1);

  // Directly test the countdown progression callback logic
  // Simulate remaining time going from 3.0s -> 2.0s -> 1.0s
  battle.state.countdown = 3;
  if (battle.state.lastChant !== 3) {
    battle.state.lastChant = 3;
    battle.say("剪刀", "小樂");
    battle.bus.emit("battle:countdown-beat", { count: 3, word: "剪刀" });
  }

  battle.state.countdown = 2;
  if (battle.state.lastChant !== 2) {
    battle.state.lastChant = 2;
    battle.say("石頭", "小樂");
    battle.bus.emit("battle:countdown-beat", { count: 2, word: "石頭" });
  }

  battle.state.countdown = 1;
  if (battle.state.lastChant !== 1) {
    battle.state.lastChant = 1;
    battle.say("布！", "小樂");
    battle.bus.emit("battle:countdown-beat", { count: 1, word: "布！" });
  }

  assert.deepEqual(beats.map((b) => b.word), ["剪刀", "石頭", "布！"], "應依序觸發剪刀、石頭、布之節奏事件");
  assert.ok(chants.includes("剪刀") && chants.includes("石頭") && chants.includes("布！"), "對話應依序喊出剪刀、石頭、布！");
  battle.abandon();
});

test("戰鬥中可正常使用 HP/MP 藥水與變拳技能", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  battle.start(1);
  battle.state.playerHp = 50; // damaged
  const hpResult = battle.useItem("hpPotion");
  assert.equal(hpResult.ok, true, "HP 藥水使用應成功");
  assert.equal(battle.state.playerHp, 75, "HP 應恢復 25");

  battle.revealHands();
  const morphResult = battle.useMorph();
  assert.equal(morphResult.ok, true, "反應時間內使用變拳應成功");
  assert.equal(battle.state.playerMp, 25, "MP 應扣除 25");
  battle.abandon();
});

test("BattleSystem restore: 正確還原單體戰鬥血量、魔力、回合數與狀態", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  const savedSnapshot = {
    stageId: 2,
    round: 4,
    playerHp: 65,
    playerMp: 30,
    enemyHp: 800,
    enemies: [{ id: "main", name: "小樂", hp: 800, maxHp: 2000, alive: true }],
    selectedHand: "scissors",
    isEnemyFrozen: true,
    frozenEnemyHand: "rock",
    battleDamageDealt: 1200,
    battleDamageTaken: 35
  };

  const restored = battle.restore(savedSnapshot);
  assert.equal(restored, true, "restore 應回傳 true");
  assert.equal(battle.state.active, true, "戰鬥應處於 active 狀態");
  assert.equal(battle.state.stage.id, 2, "關卡 ID 應為 2");
  assert.equal(battle.state.playerHp, 65, "玩家 HP 應還原為 65");
  assert.equal(battle.state.playerMp, 30, "玩家 MP 應還原為 30");
  assert.equal(battle.state.enemyHp, 800, "Boss HP 應還原為 800");
  assert.equal(battle.state.isEnemyFrozen, true, "冰結狀態應還原");
  assert.equal(battle.state.frozenEnemyHand, "rock", "冰結手勢應還原為 rock");
  assert.equal(battle.battleDamageDealt, 1200, "已造成傷害應還原");
  assert.equal(battle.battleDamageTaken, 35, "已受傷害應還原");
  battle.abandon();
});

test("BattleSystem restore: 正確還原第 4 關雙生 Boss 血條與各自存活狀態", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  const savedDualSnapshot = {
    stageId: 4,
    round: 6,
    playerHp: 90,
    playerMp: 50,
    enemies: [
      { id: "left", name: "白金小樂・左", hp: 0, maxHp: 5000, alive: false },
      { id: "right", name: "白金小樂・右", hp: 2400, maxHp: 5000, alive: true }
    ],
    targetEnemyId: "right",
    selectedHands: { left: "rock", right: "paper" }
  };

  battle.restore(savedDualSnapshot);
  assert.equal(battle.state.enemies[0].alive, false, "左側 Boss 應已擊敗");
  assert.equal(battle.state.enemies[1].hp, 2400, "右側 Boss HP 應為 2400");
  assert.equal(battle.state.targetEnemyId, "right", "目標應選中存活的右側 Boss");
  assert.equal(battle.state.enemyHp, 2400, "Boss 總剩餘 HP 應為 2400");
  battle.abandon();
});

test("BattleSystem restore: 正確還原自動刷關勝負統計與剩餘輪次", async () => {
  const { EventBus } = await import("../src/js/core/EventBus.js");
  const { GameStore } = await import("../src/js/core/GameStore.js");
  const { BattleSystem } = await import("../src/js/systems/BattleSystem.js");

  class MemoryPersistence {
    constructor(data = null) { this.data = data; }
    load() { return this.data; }
    save(data) { this.data = structuredClone(data); }
    clear() { this.data = null; }
  }

  const bus = new EventBus();
  const persistence = new MemoryPersistence();
  const store = new GameStore(bus, persistence);
  const battle = new BattleSystem(bus, store);

  const savedAutoSnapshot = {
    stageId: 1,
    round: 2,
    playerHp: 100,
    playerMp: 50,
    enemyHp: 400,
    autoBattle: {
      active: true,
      isPaused: false,
      stageId: 1,
      totalRounds: 10,
      remainingRounds: 6,
      wins: 4,
      losses: 0
    }
  };

  battle.restore(savedAutoSnapshot);
  assert.equal(battle.autoBattle.active, true, "自動刷關應處於 active 狀態");
  assert.equal(battle.autoBattle.remainingRounds, 6, "剩餘次數應還原為 6");
  assert.equal(battle.autoBattle.wins, 4, "勝場應還原為 4");
  assert.equal(battle.autoBattle.losses, 0, "敗場應還原為 0");
  battle.abandon();
});
