import { DIRECTIONS, DIRECTION_SVGS, getDirectionSvg, GALLERY_ITEMS, HANDS, ITEMS, SKILLS, STAGES, EQUIPMENT_ITEMS, EQUIPMENT_SLOTS, BATTLE_RULES, DOJO_CONFIG } from "../config/gameConfig.js";
import { I18n, LOCALES, LOCALE_ORDER } from "../services/I18n.js";
import { TimerRegistry } from "../core/TimerRegistry.js";
import { QTESystem, DualQTESystem } from "../systems/QTESystem.js";
import {
  arrowDirectionFromKey,
  directionFromKey,
  directionFromSwipe,
  getDirectionChord,
  QTEKeyboardInput,
  wasdDirectionFromKey
} from "../systems/QTEInputSystem.js";

const $ = (selector) => document.querySelector(selector);
const clampPercent = (value, max) => Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));

export class AppView {
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
    this.activeShopFilter = "all";
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

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        this.activeGrowthTab = window.localStorage.getItem("koraku_growth_tab") || "stats";
        this.activeShopFilter = window.localStorage.getItem("koraku_shop_filter") || "all";
        this.activeGuideTab = window.localStorage.getItem("koraku_guide_tab") || "basics";
        this.activeShopTab = window.localStorage.getItem("koraku_shop_tab") || "potions";
        this.selectedGalleryItem = window.localStorage.getItem("koraku_gallery_item") || GALLERY_ITEMS[0].id;
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
    this.battleLogTier = 1;

    if (this.battleDamageLog) {
      this.battleDamageLog.addEventListener("click", () => {
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
      targetScreen = hashScreen || window.localStorage?.getItem("koraku_active_screen") || sessionStorage.getItem("koraku_active_screen") || "home";
    } catch (_) {}

    let activeBattle = null;
    let activePostBattle = null;
    let savedStageId = 1;
    try {
      const rawPost = window.localStorage?.getItem("koraku_active_postbattle") || sessionStorage.getItem("koraku_active_postbattle");
      if (rawPost) activePostBattle = JSON.parse(rawPost);
      const rawBattle = window.localStorage?.getItem("koraku_active_battle_state") || sessionStorage.getItem("koraku_active_battle_state") || sessionStorage.getItem("koraku_active_battle");
      if (rawBattle) activeBattle = JSON.parse(rawBattle);
      savedStageId = Number(window.localStorage?.getItem("koraku_active_stage") || sessionStorage.getItem("koraku_active_stage")) || activeBattle?.stage?.id || activeBattle?.stageId || this.store.snapshot().records?.bestStage || 1;
    } catch (_) {}

    if (activePostBattle) {
      if (typeof window !== "undefined" && window.history) {
        window.history.replaceState({ screen: "battle" }, "", "#battle");
      }
      this.navigate("battle", { pushHistory: false });
      this.postBattle.restore(activePostBattle);
      if (this.postBattle?.getWatermelonStock() > 0) {
        this.postBattle.emitAutoWatermelon();
      }
      return;
    }

    if (targetScreen === "battle") {
      if (typeof window !== "undefined" && window.history) {
        window.history.replaceState({ screen: "battle" }, "", "#battle");
      }
      this.navigate("battle", { pushHistory: false });

      if (activeBattle && activeBattle.active && (activeBattle.playerHp > 0) && (activeBattle.enemyHp > 0)) {
        this.battle.restore(activeBattle);
      } else {
        const stageToRun = activeBattle?.stage?.id || activeBattle?.stageId || savedStageId || 1;
        if (activeBattle?.isAuto || activeBattle?.autoBattle?.active) {
          this.startAutoBattle(stageToRun, activeBattle?.autoBattle?.remainingRounds || activeBattle?.remainingRounds || 10);
        } else {
          this.startStage(stageToRun);
        }
      }
      if (this.postBattle?.getWatermelonStock() > 0) {
        this.postBattle.emitAutoWatermelon();
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
            this.battle.inputQte(dir, track.slot);
            if (track.slot === "left") this.leftQteKeyboard.reset();
            if (track.slot === "right") this.rightQteKeyboard.reset();
          } else {
            this.qteKeyboard.reset();
            this.battle.inputQte(dir);
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
              this.battle.inputQte(dir, track.slot);
              if (track.slot === "left") this.leftQteKeyboard.reset();
              if (track.slot === "right") this.rightQteKeyboard.reset();
            } else {
              this.qteKeyboard.reset();
              this.battle.inputQte(dir);
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
        const raw = window.localStorage?.getItem("koraku_active_battle_state") || sessionStorage.getItem("koraku_active_battle_state");
        if (raw) {
          const snapshot = JSON.parse(raw);
          if (snapshot.autoBattle) {
            snapshot.autoBattle.remainingRounds = info.remainingRounds;
            snapshot.autoBattle.wins = info.wins;
            snapshot.autoBattle.losses = info.losses;
            snapshot.autoBattle.isPaused = Boolean(info.isPaused);
            window.localStorage?.setItem("koraku_active_battle_state", JSON.stringify(snapshot));
            sessionStorage.setItem("koraku_active_battle_state", JSON.stringify(snapshot));
          }
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
        window.localStorage?.removeItem("koraku_active_battle_state");
        sessionStorage.removeItem("koraku_active_battle_state");
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
        window.localStorage?.removeItem("koraku_active_battle_state");
        sessionStorage.removeItem("koraku_active_battle_state");
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
      this.renderShop(this.store.snapshot());
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
      try {
        window.localStorage?.setItem("koraku_gallery_item", this.selectedGalleryItem);
      } catch (_) {}
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
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("has-physical-keyboard");
      if (document.body) document.body.classList.add("has-physical-keyboard");
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
    try {
      window.localStorage?.removeItem("koraku_active_postbattle");
      sessionStorage.removeItem("koraku_active_postbattle");
    } catch (_) {}
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
    try {
      window.localStorage?.removeItem("koraku_active_postbattle");
      sessionStorage.removeItem("koraku_active_postbattle");
    } catch (_) {}
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
    if (state.active && state.phase !== "ended" && state.phase !== "abandoned") {
      try {
        const battleSnapshot = {
          stageId: state.stage?.id,
          stage: state.stage,
          active: state.active,
          phase: state.phase,
          round: state.round,
          playerHp: state.playerHp,
          playerMaxHp: state.playerMaxHp,
          playerMp: state.playerMp,
          playerMaxMp: state.playerMaxMp,
          enemies: state.enemies,
          targetEnemyId: state.targetEnemyId,
          enemyHp: state.enemyHp,
          enemyMaxHp: state.enemyMaxHp,
          selectedHand: state.selectedHand,
          selectedHands: state.selectedHands,
          isEnemyFrozen: state.isEnemyFrozen,
          frozenEnemyHand: state.frozenEnemyHand,
          autoBattle: { ...(this.battle?.autoBattle || state.autoBattle) },
          isAuto: Boolean((this.battle?.autoBattle || state.autoBattle)?.active),
          battleStartTime: this.battle?.battleStartTime,
          battleDamageDealt: this.battle?.battleDamageDealt,
          battleDamageTaken: this.battle?.battleDamageTaken,
          battleHpPotionUsed: this.battle?.battleHpPotionUsed,
          battleMpPotionUsed: this.battle?.battleMpPotionUsed,
          battleHpRestored: this.battle?.battleHpRestored,
          battleMpRestored: this.battle?.battleMpRestored,
          recentDamageLog: this.recentDamageLog
        };
        window.localStorage?.setItem("koraku_active_battle_state", JSON.stringify(battleSnapshot));
        sessionStorage.setItem("koraku_active_battle_state", JSON.stringify(battleSnapshot));
      } catch (_) {}
    } else if (!state.active) {
      try {
        window.localStorage?.removeItem("koraku_active_battle_state");
        sessionStorage.removeItem("koraku_active_battle_state");
        sessionStorage.removeItem("koraku_active_battle");
      } catch (_) {}
    }

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
    try {
      window.localStorage?.setItem("koraku_active_postbattle", JSON.stringify(state));
      sessionStorage.setItem("koraku_active_postbattle", JSON.stringify(state));
      sessionStorage.removeItem("koraku_active_battle");
      window.localStorage?.removeItem("koraku_active_battle_state");
      sessionStorage.removeItem("koraku_active_battle_state");
    } catch (_) {}
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
      try {
        window.localStorage?.removeItem("koraku_active_postbattle");
        sessionStorage.removeItem("koraku_active_postbattle");
      } catch (_) {}
      this.startStage(this.postState.stage.id);
      return;
    }
    if (action === "stages" || action === "home") {
      try {
        window.localStorage?.removeItem("koraku_active_postbattle");
        sessionStorage.removeItem("koraku_active_postbattle");
      } catch (_) {}
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
    try {
      window.localStorage?.removeItem("koraku_active_postbattle");
      sessionStorage.removeItem("koraku_active_postbattle");
    } catch (_) {}
    if (!this.battle.start(null, { isDojo: true, isDual, customHp, customDamage, isSilhouette: true })) return;
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
    let actionBadge = "攻";
    let isHeal = actionType === "heal";
    let isMana = actionType === "mana";
    let isEnemyHit = false;

    if (actionType === "heal") {
      actorName = "旅人";
      actionBadge = "療";
    } else if (actionType === "mana") {
      actorName = "旅人";
      actionBadge = "魔";
    } else if (actionType === "burn") {
      if (targetId === "left" || (targetName && targetName.includes("左"))) {
        actorName = "左";
      } else if (targetId === "right" || (targetName && targetName.includes("右"))) {
        actorName = "右";
      } else {
        actorName = "小樂";
      }
      actionBadge = "灼";
      isEnemyHit = true;
    } else if (actionType === "reflect") {
      if (targetId === "left" || (targetName && targetName.includes("左"))) {
        actorName = "左";
      } else if (targetId === "right" || (targetName && targetName.includes("右"))) {
        actorName = "右";
      } else {
        actorName = "小樂";
      }
      actionBadge = "反";
      isEnemyHit = true;
    } else if (target === "enemy") {
      if (targetId === "left" || (targetName && targetName.includes("左"))) {
        actorName = "左";
      } else if (targetId === "right" || (targetName && targetName.includes("右"))) {
        actorName = "右";
      } else {
        actorName = "小樂";
      }
      actionBadge = "受";
      isEnemyHit = true;
    } else {
      actorName = "旅人";
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
      const enActors = { "旅人": "Hero", "小樂": "Koraku", "左": "L", "右": "R" };
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
