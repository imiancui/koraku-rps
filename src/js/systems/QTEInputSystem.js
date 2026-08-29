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

export function wasdDirectionFromKey(key) {
  const normalized = String(key).toLowerCase();
  return WASD_KEY_MAP[normalized] || null;
}

export function arrowDirectionFromKey(key) {
  const normalized = String(key).toLowerCase();
  return ARROW_KEY_MAP[normalized] || null;
}

export function directionFromKey(key) {
  const normalized = String(key).toLowerCase();
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

export class QTEKeyboardInput {
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
