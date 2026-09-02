# Milestone 1 Exploration Report & Implementation Strategy
**Milestone**: Milestone 1 (Kernel Extraction & Protocol Decoupling)  
**Agent**: Explorer M1 (`explorer_m1_1`)  
**Date**: 2026-09-02T17:58:30Z  

---

## 1. Observation

Direct code examination across the Koraku RPS codebase revealed the following exact dependencies, code patterns, and constraints:

### 1.1 `src/js/systems/PostBattleSystem.js`
- **`performance.now()` calls**: Direct calls to browser-specific `performance.now()` exist at:
  - Line 99: `this.state.strikeStartedAt = performance.now();`
  - Line 111: `const timestamp = declaredAt || performance.now();`
  - Line 170: `getMarkerPosition(now = performance.now())`
  - Line 191: `strikeStartedAt: performance.now()`
  - Line 208: `this.autoWatermelonState.strikeStartedAt = performance.now();`
  - Line 227: `const timestamp = declaredAt || performance.now();`
  - Line 287: `getAutoMarkerPosition(now = performance.now())`
- **`I18n.t(...)` imports and calls**:
  - Line 2: `import { I18n } from "../services/I18n.js";`
  - Direct translation invocations occur at lines 70, 72, 82, 105, 137, 143, 160, 165, 220, 253, 259, 277, 282, 310, 319, 320.
  - The `say()` method in lines 302–322 forces synchronous string resolution: `speaker: I18n.t("dialogue.speakerKohaku") || "小樂"`.

### 1.2 `src/js/systems/BattleSystem.js`
- **`I18n.t(...)` imports and direct calls**:
  - Line 2: `import { I18n } from "../services/I18n.js";`
  - Hardcoded Dojo stage strings resolved via `I18n.t`: lines 184–186, 206–207, 214–216, 234.
  - Hardcoded Toast emissions: lines 243–245 (`toast.levelRequirementNotMet`), line 256 (`ui.mustClearOnceForAuto`).
  - Hardcoded Dialogues: lines 341–343 (`introFinal` / `introNormal`), lines 780–795 (chant beats), lines 942–943 (`morphWindowOnly`), line 962 (`insufficientMp`), lines 983–984 (`morphReaction`), lines 1259–1260 (`qteSingleBreak`), lines 1278–1279 (`qteDualBreak`), lines 1492, 1563, 1615, 1718 (`speakerPlayer`).
  - Hardcoded Chinese combat text: lines 1048, 1049, 1060, 1061, 1104, 1105, 1116, 1117, 1143, 1144, 1151, 1152, 1170, 1171, 1204, 1238, 1247, 1314, 1344, 1353, 1376, 1419, 1470, 1540.
- **Time provider abstraction**:
  - Constructor already takes `now = Date.now` (line 14: `constructor(bus, store, random = Math.random, now = Date.now)` and line 18: `this.now = typeof now === "function" ? now : () => Date.now();`).
  - All internal scheduling and expiration logic uses `this.now()`.

### 1.3 `src/js/systems/QTESystem.js` & `DualQTESystem`
- **Cleanliness**: Contains 0 DOM calls, 0 window/localStorage dependencies, 0 `I18n.t` calls, and 0 `performance.now()` references.
- Time abstraction is properly injected: `this.now = typeof now === "function" ? now : () => Date.now()`.
- Emits purely structured read-model events: `qte:update`, `qte:wrong`, `qte:step`, `qte:finished`.

### 1.4 `src/js/core/GameStore.js`
- **DOM / Window**: Zero DOM or window references. Persistence is injected via `this.persistence`.
- **Time injection**:
  - Line 261: `this.now = options.now || (() => Date.now());`
  - Line 100: `createEquipmentInstance` calls `Date.now()` directly when `options.uid` is omitted.
  - Line 832: `recentBattles` stores `timestamp: Date.now()`.
- **Method return values**: Methods (`buyItem`, `buyEquipment`, `equipItem`, `unequipItem`, `allocateStat`, `allocateSkill`, `cheatSetValues`, `importSaveCode`) return `{ ok: boolean, message: string }` with hardcoded Chinese strings instead of structured tokens `{ ok, key, params, message }`.

### 1.5 `src/js/core/TimerRegistry.js`
- Located at `src/js/core/TimerRegistry.js` (37 lines).
- Uses `globalThis.setTimeout` and `globalThis.setInterval`, which is valid in both Node.js and browser environments.

### 1.6 `src/js/kernel/protocol.js`
- Protocol definition specifies `PROTOCOL_VERSION = "2.0.0"`, `CONFIG_VERSION = "2026.09.03"`.
- `Commands`, `Events`, `ConnectionStates`, and `ErrorCodes` are frozen.
- All core commands and read-model events are cataloged, with `AUTOBATTLE_STREAM_CHUNK` needing explicit registration in `Events`.

### 1.7 Current Test Suite Baseline
- Execution of `npm test` runs 30 test files and 154 test cases.
- **Pass rate**: 154 passed, 0 failed, 0 skipped (`duration_ms: ~20206ms`).

---

## 2. Logic Chain

1. **Premise**: Online-authoritative architecture requires the game kernel to execute identically on headless server environments (Node.js) and local sandbox runtimes (`LocalGameClient` in browser), conforming to Online Authority Policy Rule 8 ("The server emits no player-visible text. Dialogue, toasts, and battle log entries are `{ key, params }`; translation happens only on the client.").
2. **From Observation 1.1**: `PostBattleSystem.js` uses `performance.now()`. In standard headless Node.js, `performance.now()` requires importing the `perf_hooks` module or is non-standard. Replacing all 8 instances with `this.now()` enables seamless deterministic time injection across both browser and server.
3. **From Observation 1.1 & 1.2**: `BattleSystem.js` and `PostBattleSystem.js` directly import `I18n.js` and invoke `I18n.t(...)`. Removing the `I18n` import and emitting `{ key, params, speakerKey }` strips player-visible string dependencies from the kernel, satisfying Rule 8.
4. **From Observation 1.4**: In `GameStore.js`, replacing standalone `Date.now()` in `recentBattles` and `createEquipmentInstance` with injected `this.now()` ensures 100% deterministic time logging for replay verification. Adding `{ key, params }` to store operation results allows the UI layer to localize shop and inventory toasts dynamically.
5. **From Observation 1.6**: `src/js/kernel/protocol.js` serves as the frozen contract boundary. Ensuring all event names (including `AUTOBATTLE_STREAM_CHUNK`) are frozen prevents contract drift across Milestone 2, Milestone 3, and Milestone 4.
6. **From Observation 1.7**: Refactoring must preserve backward-compatible event signatures (e.g. including `text` if provided or allowing `AppView.js` / test harnesses to resolve `key` seamlessly), keeping all 154 existing tests green.

---

## 3. Caveats

1. **`AppView.js` Decoupling Horizon**: Complete UI decoupling of `AppView.js` to pure `GameClient` command dispatch and read-model subscriptions belongs to Milestone 4. For Milestone 1, `AppView.js` adjustments must be limited strictly to supporting structured `{ key, params }` feeds in `showToast` and `dialogue` handlers without refactoring its DOM rendering architecture (Ponytail OFF).
2. **Audio System Presentation Isolation**: `SoundSystem.js` interacts with `window.AudioContext` and DOM events. This is intentional as `SoundSystem` is part of the presentation/client audio layer, not the server-side authoritative kernel.
3. **Persistence Layer Boundary**: `Persistence.js` wraps `localStorage`. `GameStore` receives its persistence instance via constructor injection; the server uses `JsonStorage.js` or `MemoryPersistence`, maintaining clean kernel separation.

---

## 4. Conclusion & Worker 1 Implementation Roadmap

Milestone 1 is cleanly scoped to 5 core files. Below is the precise implementation specification and file write boundaries for Worker 1:

### Exact File Write Boundaries for Worker 1

```
src/js/
├── kernel/
│   └── protocol.js               [UPDATE: add AUTOBATTLE_STREAM_CHUNK, freeze exports]
├── core/
│   ├── TimerRegistry.js          [VERIFY / CLEAN: pure JS timer registry]
│   └── GameStore.js              [UPDATE: inject time in recentBattles/instances, structured { key, params } returns]
├── systems/
│   ├── PostBattleSystem.js       [UPDATE: replace 8 performance.now() with this.now(), remove I18n, emit { key, params }]
│   └── BattleSystem.js           [UPDATE: remove I18n import, convert dialogues/toasts/narrations to { key, params, speakerKey }]
└── ui/
    └── AppView.js                [UPDATE: ensure showToast & dialogue handlers consume { key, params } with I18n fallback]
```

### Detailed File Modifications:

#### 1. `src/js/kernel/protocol.js`
- In `Events` object:
  - Add `AUTOBATTLE_STREAM_CHUNK: "auto-battle:stream-chunk"`.
- Ensure all command names, event names, connection states, and error codes match contracts defined in `PROJECT.md`.

#### 2. `src/js/systems/PostBattleSystem.js`
- Remove `import { I18n } from "../services/I18n.js";`.
- Replace all 8 `performance.now()` calls with `this.now()`.
- Refactor `say(keyOrPayload)`:
  ```javascript
  say(keyOrPayload) {
    let key = null;
    let params = {};
    let text = "";
    if (typeof keyOrPayload === "object" && keyOrPayload !== null) {
      key = keyOrPayload.key || null;
      params = keyOrPayload.params || {};
      text = keyOrPayload.text || "";
    } else {
      text = String(keyOrPayload || "");
    }
    this.bus.emit("dialogue", {
      key,
      params,
      speakerKey: "dialogue.speakerKohaku",
      text
    });
  }
  ```
- Replace all `I18n.t(...)` in `open()`, `requestSwimsuit()`, `startWatermelon()`, `strike()`, `settleWatermelon()`, `startAutoWatermelonRound()`, `autoWatermelonStrike()`, `settleAutoWatermelon()` with `{ key, params }`.

#### 3. `src/js/systems/BattleSystem.js`
- Remove `import { I18n } from "../services/I18n.js";`.
- Refactor Dojo dummy stage definition to use `{ chapterKey, nameKey, subtitleKey, enemies: [{ id, nameKey, hp, maxHp, alive }] }`.
- Refactor `toast` emissions:
  - `this.bus.emit("toast", { key: "toast.levelRequirementNotMet", tone: "danger" });`
  - `this.bus.emit("toast", { key: "ui.mustClearOnceForAuto", tone: "danger" });`
- Refactor `say(messageOrPayload, speaker = null)`:
  ```javascript
  say(messageOrPayload, speaker = null) {
    let key = null;
    let params = {};
    let text = "";
    let speakerKey = "dialogue.speakerKohaku";
    let speakerName = "";

    if (typeof messageOrPayload === "object" && messageOrPayload !== null) {
      key = messageOrPayload.key || null;
      params = messageOrPayload.params || {};
      text = messageOrPayload.text || "";
    } else {
      text = String(messageOrPayload || "");
    }

    if (typeof speaker === "object" && speaker !== null) {
      speakerKey = speaker.key || speakerKey;
      speakerName = speaker.text || "";
    } else if (speaker) {
      speakerName = String(speaker);
    }

    this.bus.emit("dialogue", {
      key,
      params,
      speakerKey,
      speaker: speakerName,
      text
    });
  }
  ```
- Replace all hardcoded combat dialogues with structured keys:
  - Chants: `{ key: "dialogue.chant3" }`, `{ key: "dialogue.chant2" }`, `{ key: "dialogue.chant1" }`.
  - Morph: `{ key: "dialogue.morphReaction" }`.
  - QTE: `{ key: "dialogue.qteSingleBreak" }`, `{ key: "dialogue.qteDualBreak" }`, `{ key: "dialogue.dualQteMiss" }`, `{ key: "dialogue.dualQteSuccess" }`, `{ key: "dialogue.qteMiss" }`.
  - Win/Loss suffixes: `{ key: "dialogue.winDualMorphBoth" }`, `{ key: "dialogue.winDualBoth" }`, `{ key: "dialogue.winDualMorphSingle" }`, `{ key: "dialogue.winDualSingle" }`, `{ key: "dialogue.winDualMorphDoubleDmg" }`, `{ key: "dialogue.winDualDoubleDmg" }`, `{ key: "dialogue.winSingleMorph" }`, `{ key: "dialogue.winSingleNormal" }`.
  - Momo procs: `{ key: "dialogue.drawMomoDodge", params: { targetId: target.id } }`, `{ key: "dialogue.drawMomoHit", params: { targetId: target.id, damage: momoDamage } }`, `{ key: "dialogue.drawNormal" }`.
  - Freeze: `{ key: "dialogue.freezeNarration", params: { hand: frozenHand } }`.
  - Dodge: `{ key: "dialogue.dodgeDodge" }`, `{ key: "dialogue.dodgeDodgeDual" }`.
  - Items: `{ key: "dialogue.itemUsed", params: { itemId, restored, resource: item.resource } }`.
- In `battle:damage-logged`:
  - Set `target: "player" | "enemy"`, `targetNameKey: "dialogue.speakerPlayer"` (remove `I18n.t("dialogue.speakerPlayer")`).

#### 4. `src/js/core/GameStore.js`
- In `createEquipmentInstance(itemOrId, options = {})`: use `(options.now ? options.now() : Date.now())` for UID generation fallback.
- In `recordBattle()` line 832: use `timestamp: (typeof this.now === "function" ? this.now() : Date.now())`.
- Return structured `{ ok, key, params, message }` in `buyItem`, `buyEquipment`, `equipItem`, `unequipItem`, `allocateStat`, `allocateSkill`, `cheatSetValues`, `cheatUnlockAll`, `cheatUnlockGallery`, `importSaveCode`.

#### 5. `src/js/ui/AppView.js`
- In `showToast(messageOrToast, tone = "normal")`:
  - Check if `messageOrToast` is an object with `key`: `const msg = messageOrToast.key ? (I18n.t(messageOrToast.key, messageOrToast.params) || messageOrToast.message) : (messageOrToast.message || messageOrToast);`
- In `bus.on("dialogue", ...)`:
  - If `payload.key` is present and `!payload.text`, resolve `I18n.t(payload.key, payload.params)`.
  - If `payload.speakerKey` is present and `!payload.speaker`, resolve `I18n.t(payload.speakerKey)`.

---

## 5. Verification Method

1. **Static Analysis & Dependency Audit**:
   - Run PowerShell regex query to verify zero `performance.now()`, `window.`, `document.`, `localStorage`, or `I18n.t` in `src/js/systems/` and `src/js/core/`:
     ```powershell
     Get-ChildItem -Path "src\js\systems", "src\js\core" -Recurse -Filter "*.js" | Select-String -Pattern "performance\.now|I18n\.t|window\.|document\.|localStorage"
     ```
   - Invalidation condition: Any match in `BattleSystem.js`, `QTESystem.js`, `PostBattleSystem.js`, `GameStore.js`, or `TimerRegistry.js`.
2. **Automated Unit & Contract Test Suite**:
   - Run:
     ```powershell
     npm test
     ```
   - Invalidation condition: Any test failure out of 154+ tests.
3. **Deterministic Replay Test**:
   - Run:
     ```powershell
     node --test tests/rngAndReplay.test.js
     ```
   - Invalidation condition: Any failure in deterministic battle trajectory reproduction.
4. **4-Locale I18n Completeness Verification**:
   - Run:
     ```powershell
     node --test tests/i18n.test.js
     ```
   - Invalidation condition: Missing localization key in any of the 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`).
5. **Bundle Integrity Verification**:
   - Run:
     ```powershell
     node scripts/build.mjs
     ```
   - Invalidation condition: Build error or syntax error during bundle generation.
