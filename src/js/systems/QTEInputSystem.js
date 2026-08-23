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
  constructor() {
    this.held = new Set();
  }

  keyDown(key, expectedDirection, repeat = false) {
    const direction = directionFromKey(key);
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
    const direction = directionFromKey(key);
    if (!CARDINAL_DIRECTIONS.has(direction)) return false;
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
