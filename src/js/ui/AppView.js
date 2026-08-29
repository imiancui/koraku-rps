import { DIRECTIONS, GALLERY_ITEMS, HANDS, ITEMS, SKILLS, STAGES, EQUIPMENT_ITEMS, EQUIPMENT_SLOTS } from "../config/gameConfig.js";
import {
  arrowDirectionFromKey,
  directionFromKey,
  getDirectionChord,
  QTEKeyboardInput,
  wasdDirectionFromKey
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
