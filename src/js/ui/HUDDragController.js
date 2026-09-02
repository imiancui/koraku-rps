/**
 * HUDDragController.js
 * 戰鬥局內 HUD 自由拖曳管理控制器
 * 支援四大元件自由拖曳、安全邊界約束、localStorage 座標持久化與雙擊重設。
 */

export const HUD_STORAGE_KEY = "koraku_hud_positions_v1";
export const DRAG_THRESHOLD_PX = 4;
export const BOUNDS_MARGIN_PX = 8;

export class HUDDragController {
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
