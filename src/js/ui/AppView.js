import { DIRECTIONS, HANDS, ITEMS, STAGES } from "../config/gameConfig.js";
import {
  directionFromKey,
  getDirectionChord,
  QTEKeyboardInput
} from "../systems/QTEInputSystem.js";

const $ = (selector) => document.querySelector(selector);
const clampPercent = (value, max) => Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));

export class AppView {
  constructor({ bus, store, battle, postBattle }) {
    this.bus = bus;
    this.store = store;
    this.battle = battle;
    this.postBattle = postBattle;
    this.currentScreen = "home";
    this.battleState = null;
    this.postState = null;
    this.qteState = null;
    this.qteKeyboard = new QTEKeyboardInput();
    this.previousBattlePhase = null;
    this.toastTimer = null;
    this.damageTimer = null;
    this.watermelonFrame = 0;
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.app = $("#app");
    this.battleArena = $("#battle-arena");
    this.battleCharacterWrap = $("#battle-character-wrap");
    this.battleCharacter = $("#battle-character");
    this.roundOracle = $(".round-oracle");
    this.qteOverlay = $("#qte-overlay");
    this.resultOverlay = $("#result-overlay");
    this.toastElement = $("#toast");
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
      this.renderHeldQteDirections();
    });
    this.bus.on("store:changed", ({ state }) => this.renderStore(state));
    this.bus.on("battle:state", (state) => this.renderBattle(state));
    this.bus.on("battle:effect", (effect) => this.playBattleEffect(effect));
    this.bus.on("qte:update", (state) => this.renderQte(state));
    this.bus.on("qte:wrong", () => this.flashQteWrong());
    this.bus.on("postbattle:state", (state) => this.renderPostBattle(state));
    this.bus.on("toast", (toast) => this.showToast(toast.message, toast.tone));
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

    const allocateButton = event.target.closest("[data-allocate]");
    if (allocateButton) {
      const result = this.store.allocateStat(allocateButton.dataset.allocate);
      this.showToast(result.message, result.ok ? "success" : "danger");
      if (result.ok) this.bus.emit("sound", { name: "skill" });
      return;
    }

    const handButton = event.target.closest("[data-hand]");
    if (handButton) {
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
    if (this.postState?.scene === "watermelonAim" && event.code === "Space") {
      event.preventDefault();
      this.postBattle.strike();
      return;
    }

    if (!this.battleState?.active) return;
    if (this.battleState.phase === "qte") {
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
      const handByKey = { "1": "rock", "2": "paper", "3": "scissors" };
      if (handByKey[event.key]) this.battle.selectHand(handByKey[event.key]);
    }
    if (this.battleState.phase === "reaction" && event.key.toLowerCase() === "f") {
      this.battle.useMorph();
    }
  }

  handleKeyup(event) {
    if (!this.qteState?.active) return;
    if (this.qteKeyboard.keyUp(event.key)) {
      this.renderHeldQteDirections();
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
        '<div class="stage-rule"><span>小樂 HP</span><b>' + stage.enemyHp.toLocaleString("zh-TW") +
        '</b><span>建議等級</span><b>Lv. ' + stage.requiredLevel + "</b></div>" +
        '<span class="stage-status">' + status + "</span></button>";
    }).join("");
  }

  renderShop(state) {
    $("#shop-coins").textContent = state.coins.toLocaleString("zh-TW");
    $("#shop-grid").innerHTML = Object.values(ITEMS).map((item) => {
      const description = item.resource === "hp"
        ? "溫熱的紅色靈露，在對局中恢復 25 點生命。"
        : "映著月色的藍色靈露，在對局中恢復 25 點魔力。";
      return '<article class="shop-card">' +
        '<div class="item-orb ' + item.color + '"><i>' + item.glyph + "</i></div>" +
        '<div class="shop-info"><small>' + item.resource.toUpperCase() + " RECOVERY</small>" +
        "<h3>" + item.name + "</h3><p>" + description + "</p>" +
        '<div class="shop-buy-row"><span class="shop-owned">持有數<b>' + state.inventory[item.id] +
        '</b></span><button type="button" class="button-primary shop-buy" data-buy="' + item.id +
        '">✦ ' + item.price + " 購入</button></div></div></article>";
    }).join("");
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
    $("#growth-grid").innerHTML = cards.map((card) => {
      const disabled = state.profile.skillPoints <= 0 ? " disabled" : "";
      return '<article class="growth-card" data-glyph="' + card.glyph + '"><small>' + card.code +
        "</small><h3>" + card.label + '</h3><div class="stat-value"><b>' + card.value +
        "</b><span>" + card.unit + "</span></div><p>" + card.text +
        '</p><button type="button" class="button-primary" data-allocate="' + card.id + '"' +
        disabled + ">投入 1 SP　＋</button></article>";
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

  renderBattle(state) {
    if (!state) return;
    const justRevealed = this.previousBattlePhase === "countdown" && state.phase === "reaction";
    this.previousBattlePhase = state.phase;
    this.battleState = state;
    $("#battle-chapter").textContent = state.stage.chapter;
    $("#battle-stage-name").textContent = state.stage.name;
    $("#enemy-name").textContent = state.stage.final ? "白金小樂" : "小樂";
    $("#round-number").textContent = state.round;
    $("#enemy-hp-text").textContent = state.enemyHp.toLocaleString("zh-TW") + " / " + state.enemyMaxHp.toLocaleString("zh-TW");
    $("#enemy-hp-fill").style.width = clampPercent(state.enemyHp, state.enemyMaxHp) + "%";
    $("#player-hp-text").textContent = state.playerHp + " / " + state.playerMaxHp;
    $("#player-hp-fill").style.width = clampPercent(state.playerHp, state.playerMaxHp) + "%";
    $("#player-mp-text").textContent = state.playerMp + " / " + state.playerMaxMp;
    $("#player-mp-fill").style.width = clampPercent(state.playerMp, state.playerMaxMp) + "%";
    $("#battle-player-level").textContent = "LEVEL " + String(this.store.snapshot().profile.level).padStart(2, "0");

    if (this.battleCharacter.getAttribute("src") !== state.appearance) {
      this.battleCharacter.setAttribute("src", state.appearance);
    }

    $("#player-hand-display").textContent = HANDS[state.selectedHand].glyph;
    $("#player-hand-label").textContent = HANDS[state.selectedHand].label;
    const opponent = HANDS[state.opponentHand];
    $("#enemy-hand-display").textContent = opponent ? opponent.glyph : "？";
    $("#enemy-hand-label").textContent = opponent ? opponent.label : "未揭曉";

    document.querySelectorAll("[data-hand]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.hand === state.selectedHand);
      button.disabled = state.phase !== "countdown";
    });

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
      this.renderHeldQteDirections();
      this.qteOverlay.classList.remove("is-active");
      this.qteOverlay.setAttribute("aria-hidden", "true");
      return;
    }
    if (!wasActive) this.qteKeyboard.reset();
    this.qteOverlay.classList.add("is-active");
    this.qteOverlay.setAttribute("aria-hidden", "false");
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
    const held = new Set(this.qteKeyboard.snapshot());
    document.querySelectorAll("#qte-pad [data-direction]").forEach((button) => {
      button.classList.toggle("is-held", held.has(button.dataset.direction));
    });
  }

  flashQteWrong() {
    const sequence = $("#qte-sequence");
    sequence.classList.remove("is-wrong");
    void sequence.offsetWidth;
    sequence.classList.add("is-wrong");
    this.bus.emit("sound", { name: "danger" });
  }

  playBattleEffect(effect) {
    if (effect.type === "enemy-hit") {
      window.clearTimeout(this.damageTimer);
      $("#damage-number").textContent = "−" + effect.amount;
      this.battleCharacter.classList.remove("is-enemy-hit");
      void this.battleCharacter.offsetWidth;
      this.battleCharacter.classList.add("is-enemy-hit");
      this.damageTimer = window.setTimeout(() => this.battleCharacter.classList.remove("is-enemy-hit"), 780);
    }
    if (effect.type === "player-hit") {
      this.app.classList.remove("is-player-hit");
      this.battleArena.classList.remove("is-player-hit");
      void this.app.offsetWidth;
      this.app.classList.add("is-player-hit");
      this.battleArena.classList.add("is-player-hit");
      window.setTimeout(() => {
        this.app.classList.remove("is-player-hit");
        this.battleArena.classList.remove("is-player-hit");
      }, 620);
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
    $("#watermelon-target").style.left = (state.target * 100) + "%";
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
        '<button type="button" class="button-primary" data-post-action="swimsuit">請小樂穿泳裝</button>' +
        this.postButtons(false);
    } else if (state.scene === "swimsuit") {
      $("#result-title").textContent = "勝者的願望";
      $("#result-message").textContent = "小樂換上了泳裝，也準備好了木棒。";
      actions =
        '<button type="button" class="button-primary" data-post-action="watermelon">玩蒙眼切西瓜</button>' +
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
        '<button type="button" class="button-primary" data-post-action="watermelon">進行第 ' + (watermelon.attempts + 1) + " 刀</button>" +
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
    return '<button type="button" class="' + rematchClass + '" data-post-action="rematch">再次挑戰</button>' +
      '<button type="button" class="button-secondary" data-post-action="stages">選擇章節</button>' +
      '<button type="button" class="button-secondary" data-post-action="home">回首頁</button>';
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
