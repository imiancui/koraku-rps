import { DIRECTIONS } from "../config/gameConfig.js";

const CARDINAL_IDS = Object.freeze(["up", "down", "left", "right"]);
const ALL_IDS = Object.freeze(DIRECTIONS.map((d) => d.id));

export class QTESystem {
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

export class DualQTESystem {
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

