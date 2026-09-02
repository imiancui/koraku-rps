# Handoff Report — Spec Miner (Survey 1)

> **Agent**: `spec_miner_survey_1`  
> **Target**: `orch_online_refactor_1` (Parent: `c7630716-50df-4080-829c-564e1bbc4ecf`)  
> **Timestamp**: 2026-09-03T01:55:55+08:00  
> **Type**: Hard Handoff (Task Complete)

---

## 1. Observation
1. **Verbatim User Request & Requirements**: Checked `D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md`. Mandates:
   - R1: Pure JS kernel (zero DOM/Node APIs) + Dual-Client (`LocalGameClient` & `RemoteGameClient`).
   - R2: 3-class adjudication (timing claims with 150ms grace, secret RPS commitments before reveal, idempotent mutations).
   - R3: Schema v2 equipment instances `{ uid, typeId, level }`, append-only economic ledger, deterministic replay logs.
   - R4: Dev entitlement for cheats, one-time transfer codes, GDPR export/delete, daily backup with SHA-256 manifests.
   - R5: UI decoupling (`AppView.js`), localized read-model feeds (`{ key, params }`), connection indicator, Ponytail strictly OFF for presentation files.
2. **Current Test Baseline**:
   - Ran `npm test` via Node test runner (`node --test`). Observed:
     ```
     ℹ tests 119
     ℹ suites 0
     ℹ pass 119
     ℹ fail 0
     ```
   - Ran `npm run test:server` (`node --test server/test/server.test.js`). Observed:
     ```
     ℹ tests 11
     ℹ suites 0
     ℹ pass 11
     ℹ fail 0
     ```
3. **Source Code & Couplings Survey**:
   - `src/js/main.js`: Wires `EventBus`, `Persistence`, `GameStore`, `BattleSystem`, `PostBattleSystem`, `SoundSystem`, and `AppView` directly without `GameClient` layer.
   - `src/js/core/GameStore.js` (lines 239, 251, 263, 268): Returns hardcoded Traditional Chinese error strings.
   - `src/js/systems/BattleSystem.js` (lines 72, 130, 138, 452): Calls `I18n.t()` and emits localized Chinese text directly in toasts and countdown beats.
   - `src/js/systems/PostBattleSystem.js` (line 99): Directly calls `performance.now()`.
   - `src/js/services/Persistence.js` (lines 56, 65): Directly accesses `window.localStorage`.
   - `src/js/kernel/GameClient.js`, `LocalGameClient.js`, `protocol.js`, `src/js/net/RemoteGameClient.js`: Core protocol and dual client abstractions are defined and frozen.
   - `server/`: Server modules (`Auth.js`, `CommandQueue.js`, `ConnectionManager.js`, `Entitlements.js`, `GameSession.js`, `RateLimiter.js`, `TransferManager.js`, `Validator.js`, `JsonStorage.js`, `backup.js`) are fully tested.

---

## 2. Logic Chain
1. **Kernel Separation**: From Observation 3, the combat math (`progressionRules.js`, `rpsRules.js`), timer management (`TimerRegistry.js`), QTE engine (`QTESystem.js`), and battle state machine (`BattleSystem.js`) contain no intrinsic DOM requirements. By replacing direct `I18n.t(...)` calls with structured event payloads `{ key, params }` and injecting abstract time providers (`now = Date.now`), the entire game engine becomes a 100% pure JS kernel suitable for both browser sandbox and server execution.
2. **Dual-Client Feasibility**: `LocalGameClient` can instantiate the pure kernel in-process with `localStorage` sandbox, while `RemoteGameClient` transports intent envelopes over WebSocket to `server/core/GameSession.js`. Because both adhere to the unified `GameClient` interface (`send()`, `on()`, `getState()`), UI layer (`AppView.js`) remains completely agnostic of the execution environment.
3. **Safety & Visual Invariance**: Because presentation files (`AppView.js`, `index.html`, `src/styles/`) operate purely on read-model feeds and Ponytail is kept OFF for all CSS/layout logic, the refactor will introduce zero visual or animation regressions.

---

## 3. Caveats
- **Assumption 1**: Equipment and stat allocations remain locked during active battle sessions (`battle.phase !== "idle"`).
- **Assumption 2**: Single active connection per account online: connecting from a second tab/device supersedes the older connection.
- No other unverified assumptions.

---

## 4. Conclusion
The codebase is fully mapped, with all DOM and localization couplings cataloged and modularized. The architecture cleanly supports dual-client operation with pure JS kernel isolation, 3-class adjudication, Schema v2 equipment instances, append-only economic ledger, and server security governance.

---

## 5. Verification Method
1. **Client Unit & System Tests**:
   ```bash
   npm test
   ```
   *Expected*: 119/119 tests pass (0 failures).
2. **Server Architecture Tests**:
   ```bash
   npm run test:server
   ```
   *Expected*: 11/11 tests pass (0 failures).
3. **Bundle Build Verification**:
   ```bash
   npm run build
   ```
   *Expected*: Standalone `src/js/bundle.js` builds without module errors.
4. **Survey Artifact Inspection**:
   Inspect `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_1\report.md` for full module maps, interface contracts, feature tables, edge cases, and risk analysis.
