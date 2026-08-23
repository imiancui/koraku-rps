import { DIRECTIONS } from "../config/gameConfig.js";

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
    this.tickId = null;
  }

  start(length, durationMs) {
    this.stop(false);
    this.active = true;
    this.index = 0;
    this.durationMs = durationMs;
    this.sequence = Array.from({ length }, () => {
      return DIRECTIONS[Math.floor(this.random() * DIRECTIONS.length)].id;
    });
    this.deadline = performance.now() + durationMs;
    this.emit();
    this.tickId = this.timers.interval(() => {
      if (performance.now() >= this.deadline) {
        this.finish(false);
      } else {
        this.emit();
      }
    }, 50);
  }

  input(directionId) {
    if (!this.active) return false;
    const expected = this.sequence[this.index];
    if (directionId !== expected) {
      this.bus.emit("qte:wrong", { expected, received: directionId });
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
      remainingMs,
      progress: this.durationMs ? remainingMs / this.durationMs : 0
    };
  }

  emit() {
    this.bus.emit("qte:update", this.snapshot());
  }

  finish(success) {
    if (!this.active) return;
    const result = { success, sequence: [...this.sequence], index: this.index };
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
