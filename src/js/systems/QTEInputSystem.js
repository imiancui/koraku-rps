import { DIRECTIONS } from "../config/gameConfig.js";

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

export const WASD_KEY_MAP = Object.freeze({
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  q: "upLeft",
  e: "upRight",
  z: "downLeft",
  c: "downRight"
});

export const ARROW_KEY_MAP = Object.freeze({
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

export const WASD_CODE_MAP = Object.freeze({
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
  KeyQ: "upLeft",
  KeyE: "upRight",
  KeyZ: "downLeft",
  KeyC: "downRight"
});

export const ARROW_CODE_MAP = Object.freeze({
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Numpad8: "up",
  Numpad2: "down",
  Numpad4: "left",
  Numpad6: "right",
  Numpad7: "upLeft",
  Numpad9: "upRight",
  Numpad1: "downLeft",
  Numpad3: "downRight",
  Digit8: "up",
  Digit2: "down",
  Digit4: "left",
  Digit6: "right",
  Digit7: "upLeft",
  Digit9: "upRight",
  Digit1: "downLeft",
  Digit3: "downRight"
});

export const ALL_CODE_MAP = Object.freeze({
  ...WASD_CODE_MAP,
  ...ARROW_CODE_MAP
});

export function wasdDirectionFromKey(key, code = null) {
  if (code && WASD_CODE_MAP[code]) return WASD_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  return WASD_KEY_MAP[normalized] || null;
}

export function arrowDirectionFromKey(key, code = null) {
  if (code && ARROW_CODE_MAP[code]) return ARROW_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  return ARROW_KEY_MAP[normalized] || null;
}

export function directionFromKey(key, code = null) {
  if (code && ALL_CODE_MAP[code]) return ALL_CODE_MAP[code];
  const normalized = String(key || "").toLowerCase();
  if (WASD_KEY_MAP[normalized]) return WASD_KEY_MAP[normalized];
  if (ARROW_KEY_MAP[normalized]) return ARROW_KEY_MAP[normalized];
  return DIRECTIONS.find((direction) => direction.keys.includes(normalized))?.id || null;
}

export function isDiagonalDirection(directionId) {
  return Object.hasOwn(DIRECTION_CHORDS, directionId);
}

export function getDirectionChord(directionId) {
  return DIRECTION_CHORDS[directionId] ? [...DIRECTION_CHORDS[directionId]] : null;
}

export function combineCardinalDirections(directions) {
  const held = new Set(directions);
  return Object.entries(DIRECTION_CHORDS).find(([, pair]) => {
    return pair.every((direction) => held.has(direction));
  })?.[0] || null;
}

export function directionFromSwipe(dx, dy, minDistance = 24) {
  const distance = Math.hypot(dx, dy);
  if (distance < minDistance) return null;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI; // Range: -180 to 180
  if (deg >= -22.5 && deg < 22.5) return "right";
  if (deg >= 22.5 && deg < 67.5) return "downRight";
  if (deg >= 67.5 && deg < 112.5) return "down";
  if (deg >= 112.5 && deg < 157.5) return "downLeft";
  if (deg >= 157.5 || deg < -157.5) return "left";
  if (deg >= -157.5 && deg < -112.5) return "upLeft";
  if (deg >= -112.5 && deg < -67.5) return "up";
  if (deg >= -67.5 && deg < -22.5) return "upRight";
  return null;
}

export function isUnmappedActionKey(key, code = null) {
  const isModifier = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].includes(key) ||
                     (code && ["ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight", "MetaLeft", "MetaRight", "CapsLock", "Tab", "Escape"].includes(code));
  if (isModifier) return false;
  // If it's a valid direction key for any QTE mode (WASD, Arrows, Numpad, or Diagonals), it's not unmapped
  if (directionFromKey(key, code)) return false;
  return true;
}

export class QTEKeyboardInput {
  constructor(mapper = directionFromKey) {
    this.mapper = mapper;
    this.held = new Set();
  }

  keyDown(key, expectedDirection, repeat = false, code = null) {
    const direction = this.mapper(key, code);
    if (!direction) {
      if (isUnmappedActionKey(key, code) && !repeat) {
        this.held.clear();
        return { handled: true, direction: "invalid" };
      }
      return { handled: false, direction: null };
    }

    if (isDiagonalDirection(direction)) {
      if (repeat && direction !== expectedDirection) {
        return { handled: true, direction: null };
      }
      return { handled: true, direction };
    }

    if (!CARDINAL_DIRECTIONS.has(direction)) {
      return { handled: false, direction: null };
    }

    if (repeat) {
      if (direction === expectedDirection) {
        return { handled: true, direction };
      }
      return { handled: true, direction: null };
    }

    if (isDiagonalDirection(expectedDirection)) {
      const chord = DIRECTION_CHORDS[expectedDirection];
      if (!chord || !chord.includes(direction)) {
        this.held.clear();
        return { handled: true, direction };
      }

      this.held.delete(OPPOSITES[direction]);
      this.held.add(direction);

      const combined = combineCardinalDirections(this.held);
      if (combined) {
        return {
          handled: true,
          direction: combined
        };
      }
      return { handled: true, direction: null };
    }

    this.held.delete(OPPOSITES[direction]);
    this.held.add(direction);

    return { handled: true, direction };
  }

  keyUp(key, code = null) {
    const direction = this.mapper(key, code);
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
