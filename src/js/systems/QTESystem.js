import { DIRECTIONS } from "../config/gameConfig.js";

const CARDINAL_IDS = Object.freeze(["up", "down", "left", "right"]);
const ALL_IDS = Object.freeze(DIRECTIONS.map((d) => d.id));

export class QTESystem {
  constructor(bus, timers, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.timers = timers;
    this.random = typeof random === "function" ? random : Math.random;
    this.now = typeof now === "function" ? now : () => Date.now();
    this.active = false;
    this.sequence = [];
    this.index = 0;
    this.startTime = 0;
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
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? lengthOrOptions.allowedDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? Infinity;
    } else {
      length = lengthOrOptions ?? 5;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? options.allowedDirections ?? "all";
      maxErrors = options.maxErrors ?? Infinity;
    }

    this.active = true;
    this.index = 0;
    this.errors = 0;
    this.maxErrors = maxErrors;
    this.durationMs = duration;
    this.startTime = this.now();
    this.deadline = this.startTime + duration;

    this.sequence = this.generateSequence(length, directionMode);
    this.emit();
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
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

  input(directionId, declaredAt = null) {
    if (!this.active) return false;
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    // Timing check with 150ms grace
    if (timestamp > this.deadline + 150) {
      this.finish(false);
      return false;
    }

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

  auditInputs(inputs = []) {
    if (!this.active) return { ok: false, active: false };
    const results = [];
    for (const item of inputs) {
      const dir = item.directionId || item.direction || item.key;
      const ts = item.timestamp || item.declaredAt || this.now();
      if (ts < this.startTime - 150 || ts > this.deadline + 150) {
        this.errors += 1;
        results.push({ item, valid: false, reason: "timestamp_out_of_bounds" });
        if (this.errors >= this.maxErrors) {
          this.finish(false);
          return { ok: false, success: false, errors: this.errors, results };
        }
        continue;
      }
      const ok = this.input(dir, ts);
      results.push({ item, valid: ok });
      if (!this.active) break;
    }
    return {
      ok: true,
      success: this.index >= this.sequence.length && this.errors < this.maxErrors,
      errors: this.errors,
      index: this.index,
      results
    };
  }

  reportBatch(inputs = []) {
    return this.auditInputs(inputs);
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - this.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = this.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
        this.finish(false);
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - this.now());
    return {
      active: this.active,
      isPaused: Boolean(this.isPaused),
      sequence: [...this.sequence],
      index: this.index,
      errors: this.errors,
      maxErrors: this.maxErrors,
      startTime: this.startTime,
      deadline: this.deadline,
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

export class DualQTESystem {
  constructor(bus, timers, random = Math.random, now = Date.now) {
    this.bus = bus;
    this.timers = timers;
    this.random = typeof random === "function" ? random : Math.random;
    this.now = typeof now === "function" ? now : () => Date.now();
    this.active = false;
    this.left = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "left" };
    this.right = { sequence: [], index: 0, errors: 0, maxErrors: Infinity, completed: false, success: false, enemyId: "right" };
    this.startTime = 0;
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
      directionMode = lengthOrOptions.directionMode ?? lengthOrOptions.qteDirections ?? lengthOrOptions.allowedDirections ?? "all";
      maxErrors = lengthOrOptions.maxErrors ?? 1;
    } else {
      length = lengthOrOptions ?? 7;
      duration = durationMs;
      directionMode = options.directionMode ?? options.qteDirections ?? options.allowedDirections ?? "all";
      maxErrors = options.maxErrors ?? 1;
    }

    this.active = true;
    this.durationMs = duration;
    this.startTime = this.now();
    this.deadline = this.startTime + duration;
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

    this.emit();
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
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

  inputSlot(slotKey, directionId, declaredAt = null) {
    if (!this.active) return false;
    const arrival = this.now();
    const timestamp = declaredAt || arrival;

    if (timestamp > this.deadline + 150) {
      this.finish();
      return false;
    }

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

  input(directionOrSlot, slotOrDirection = null, declaredAt = null) {
    if (!this.active) return false;
    let slot = "left";
    let direction = directionOrSlot;
    if (slotOrDirection === "left" || slotOrDirection === "right") {
      slot = slotOrDirection;
      direction = directionOrSlot;
    } else if (directionOrSlot === "left" || directionOrSlot === "right") {
      slot = directionOrSlot;
      direction = slotOrDirection;
    } else if (!slotOrDirection) {
      if (!this.left.completed) slot = "left";
      else if (!this.right.completed) slot = "right";
    }
    return this.inputSlot(slot, direction, declaredAt);
  }

  inputLeft(directionId, declaredAt = null) {
    return this.inputSlot("left", directionId, declaredAt);
  }

  inputRight(directionId, declaredAt = null) {
    return this.inputSlot("right", directionId, declaredAt);
  }

  auditInputs(inputs = []) {
    if (!this.active) return { ok: false, active: false };
    const results = [];
    for (const item of inputs) {
      const slot = item.slot || (item.side === "right" ? "right" : "left");
      const dir = item.directionId || item.direction || item.key;
      const ts = item.timestamp || item.declaredAt || this.now();
      if (ts < this.startTime - 150 || ts > this.deadline + 150) {
        if (this[slot]) this[slot].errors += 1;
        results.push({ item, valid: false, reason: "timestamp_out_of_bounds" });
        continue;
      }
      const ok = this.inputSlot(slot, dir, ts);
      results.push({ item, valid: ok });
      if (!this.active) break;
    }
    return {
      ok: true,
      left: { completed: this.left.completed, success: this.left.success, errors: this.left.errors },
      right: { completed: this.right.completed, success: this.right.success, errors: this.right.errors },
      results
    };
  }

  reportBatch(inputs = []) {
    return this.auditInputs(inputs);
  }

  pause() {
    if (!this.active || this.isPaused) return;
    this.isPaused = true;
    this.remainingOnPause = Math.max(0, this.deadline - this.now());
    if (this.tickId !== null) {
      this.timers.clearInterval(this.tickId);
      this.tickId = null;
    }
    this.emit();
  }

  resume() {
    if (!this.active || !this.isPaused) return;
    this.isPaused = false;
    this.deadline = this.now() + (this.remainingOnPause || 0);
    this.tickId = this.timers.interval(() => {
      if (this.now() >= this.deadline) {
        this.finish();
      } else {
        this.emit();
      }
    }, 50);
    this.emit();
  }

  snapshot() {
    const remainingMs = this.isPaused ? (this.remainingOnPause || 0) : Math.max(0, this.deadline - this.now());
    return {
      mode: "dual",
      active: this.active,
      isPaused: Boolean(this.isPaused),
      left: { ...this.left, sequence: [...this.left.sequence] },
      right: { ...this.right, sequence: [...this.right.sequence] },
      startTime: this.startTime,
      deadline: this.deadline,
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
