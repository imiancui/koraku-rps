# Milestone 1 Implementation Plan: Kernel Extraction & Protocol Decoupling

## Objective
Establish a pure JavaScript, headless game kernel (zero DOM, zero Node-only APIs, zero window/localStorage dependencies, zero direct I18n imports) with abstract time injection, frozen protocol envelope definitions, and client-side localized event feeds.

---

## Phase 1: Protocol & Timer Abstraction
1. **`src/js/kernel/protocol.js`**:
   - Audit and freeze all `Commands`, `Events`, `ConnectionStates`, `ErrorCodes`, and `createCommandEnvelope`.
   - Add `AUTOBATTLE_STREAM_CHUNK: "auto-battle:stream-chunk"` to `Events`.
2. **`src/js/core/TimerRegistry.js`**:
   - Verify zero DOM dependencies (uses `globalThis`).
   - Support optional timer injection / custom ticker for deterministic time testing.

---

## Phase 2: PostBattleSystem & QTESystem Purification
1. **`src/js/systems/PostBattleSystem.js`**:
   - Eliminate all 8 occurrences of `performance.now()` in favor of `this.now()`.
   - Remove `import { I18n } from "../services/I18n.js";`.
   - Refactor `say(...)` and all minigame dialogue emissions to emit structured `{ key, params, speakerKey }` payloads.
2. **`src/js/systems/QTESystem.js`**:
   - Verify constructor time injection (`now = typeof now === "function" ? now : () => Date.now()`).
   - Ensure clean event emission (`qte:update`, `qte:wrong`, `qte:step`, `qte:finished`).

---

## Phase 3: GameStore Headless Decoupling & Structured Payloads
1. **`src/js/core/GameStore.js`**:
   - Ensure `createEquipmentInstance` accepts custom time or uses `now()`.
   - Ensure `recentBattles` timestamp uses `this.now()`.
   - Refactor return values of `buyItem`, `buyEquipment`, `equipItem`, `unequipItem`, `allocateStat`, `allocateSkill`, `cheatSetValues`, `cheatUnlockAll`, `cheatUnlockGallery`, `importSaveCode` to provide structured `{ ok, key, params, message }` tokens.

---

## Phase 4: BattleSystem Pure JS Kernel Refactor
1. **`src/js/systems/BattleSystem.js`**:
   - Remove `import { I18n } from "../services/I18n.js";`.
   - Refactor Dojo dummy stage configuration to use localization keys (`chapterKey`, `nameKey`, `subtitleKey`, `nameKey` on enemies).
   - Refactor `toast` emissions to send `{ key, params, tone }`.
   - Refactor `say()` and all combat dialogue emissions (`chant3`, `chant2`, `chant1`, `morphReaction`, `winDualMorphBoth`, `winSingleNormal`, `drawMomoDodge`, `qteSingleBreak`, `qteDualBreak`, `freezeNarration`, `dodgeDodge`, etc.) to send structured `{ key, params, speakerKey }`.
   - Refactor `battle:countdown-beat` to emit `{ count, key }`.
   - Refactor `battle:damage-logged` to emit `{ target: "player" | "enemy", targetNameKey, amount, source, round, actionType }`.

---

## Phase 5: Presentation & Contract Compatibility
1. **`src/js/ui/AppView.js`**:
   - Ensure `showToast(toast)` and `dialogue` handlers inspect `toast.key` / `event.key` and resolve via `I18n.t(key, params)`.
   - Maintain Ponytail strictly OFF for presentation files.
2. **Verification & Regression Gate**:
   - Run `npm test` to guarantee 100% pass rate (154/154 tests).
   - Verify bundle generation via `node scripts/build.mjs`.
