# Handoff Report — Challenger 2 (Milestone 1)

**Verdict**: **REQUEST_CHANGES**
**Date**: 2026-09-02T18:13:30Z
**Agent**: `challenger_m1_2` (Empirical Challenger)
**Recipient**: `parent` (Orchestrator, ID: `c7630716-50df-4080-829c-564e1bbc4ecf`)

---

## 1. Observation

Direct empirical observations and verification test results:

### 1.1 Deterministic Replay & Seed Reproducibility (1,000 Battles)
- Executed 1,000 automated battles with seeded Mulberry32 PRNG across Stages 1, 2, 3, and 4 (including Stage 4 dual bosses, dual-hand mechanics, potions, morphing, single/dual QTEs, and equipment procs).
- **Results**:
  - Total battles tested: **1,000 / 1,000**
  - Bitwise identical damage logs: **1,000 / 1,000 (100%)**
  - Bitwise identical state trajectories: **1,000 / 1,000 (100%)**
  - Bitwise identical final outcomes: **1,000 / 1,000 (100%)**
  - Adversarial command/seed perturbation divergence confirmed: **20 / 20 (100%)**
  - Test script: `.agents/challenger_m1_2/stress_deterministic_replay_1000.mjs` (execution time: 2.13s)

### 1.2 Defect 1: `TypeError: this.random is not a function` in `kernelFactory.js`
- **Location**: `src/js/kernel/kernelFactory.js:27-28`
- **Code**:
  ```javascript
  const battle = new BattleSystem(bus, store, { random, now });
  const postBattle = new PostBattleSystem(bus, store, { random, now });
  ```
- **Constructor signature in `BattleSystem.js:13` and `PostBattleSystem.js:4`**:
  ```javascript
  constructor(bus, store, random = Math.random, now = Date.now)
  constructor(bus, store, random = Math.random, now = null)
  ```
- **Observed error**:
  ```
  TypeError: this.random is not a function
      at getFilteredHand (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:873:35)
      at BattleSystem.revealHands (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:900:20)
  ```
- **Empirical reproduction command**:
  `node -e "import('./src/js/kernel/kernelFactory.js').then(m => { const k = m.createKernel(); k.battle.start(1); k.battle.revealHands(); })"`

### 1.3 Defect 2: 29 Missing Localization Keys in `I18n.js` for Emitted Combat Read-Models
- **Location**: `src/js/systems/BattleSystem.js`, `src/js/systems/rpsRules.js`, `src/js/services/I18n.js`
- **Observed**: `BattleSystem` and `rpsRules` emit structured dialogue, toast, and combat result payloads with keys that do not exist in `I18n.translations` across `zh-Hant`, `zh-Hans`, `en`, and `ja`.
- **Missing Keys List**:
  1. `dialogue.winSingleNormal`
  2. `dialogue.winSingleMorph`
  3. `dialogue.winDualBoth`
  4. `dialogue.winDualMorphBoth`
  5. `dialogue.winDualSingle`
  6. `dialogue.winDualMorphSingle`
  7. `dialogue.winDualDoubleDmg`
  8. `dialogue.winDualMorphDoubleDmg`
  9. `dialogue.drawNormal`
  10. `dialogue.drawMomoHit`
  11. `dialogue.drawMomoDodge`
  12. `dialogue.qteMiss`
  13. `dialogue.dualQteMiss`
  14. `dialogue.dualQteSuccess`
  15. `dialogue.deflectedSingleAttack`
  16. `dialogue.freezeNarration`
  17. `dialogue.dodgeDodge`
  18. `dialogue.dodgeDodgeDual`
  19. `narration.qteCounterPaper`
  20. `narration.qteCounterScissors`
  21. `narration.qteCounterRock`
  22. `combat.notInBattle`
  23. `combat.itemNotFound`
  24. `combat.resourceFull`
  25. `combat.itemDepleted`
  26. `combat.morphWindowOnly`
  27. `combat.morphWindowExpired`
  28. `combat.insufficientMp`
  29. `toast.levelRequirementNotMet`
- **Impact**: `I18n.t(key)` returns the literal key path (e.g., `"dialogue.winSingleNormal"`), rendering untranslated raw key strings in the UI for all 4 languages.
- **Empirical reproduction command**:
  `node .agents/challenger_m1_2/stress_localization_exceptions.mjs`

### 1.4 Exception Safety
- Fuzzed `BattleSystem`, `QTESystem`, `DualQTESystem`, `enqueueCommand`, `processCommand`, `useItem`, and `restore` with invalid inputs (`null`, `undefined`, `NaN`, corrupted state snapshots, invalid hands, out-of-order phase actions).
- **Result**: 0 unhandled exceptions; all gracefully returned structured failure objects or handled safely.

---

## 2. Logic Chain

1. **Deterministic Replay (F6)**:
   - When PRNG streams are injected cleanly into `BattleSystem` and isolated from player intent generators, 1,000 battles across 4 stages with distinct equipment, inventory, and skills produced 100% bitwise parity upon replay.
   - Command perturbations confirmed that the replay engine strictly processes input logs and is not hardcoded.

2. **Kernel Factory Signature Mismatch**:
   - `BattleSystem` expects `random` as the 3rd parameter and `now` as the 4th parameter (or needs options-object normalization).
   - `kernelFactory.js:27` passes `{ random, now }` as parameter 3.
   - `this.random` evaluates to an `Object` instead of a `Function`, guaranteeing a crash on any battle executed via `createKernel()`.

3. **I18n Dictionary Gaps**:
   - Refactored `BattleSystem` decoupled hardcoded strings into `{ key, params }` envelopes (fulfilling Requirement R5).
   - However, the newly introduced keys were never added to `I18n.js` dictionaries for `zh-Hant`, `zh-Hans`, `en`, and `ja`.
   - As a result, read-model consumers receive unresolvable keys, causing UI degradation.

---

## 3. Caveats

- Presentation rendering (`AppView.js` DOM updates) was not directly modified or rendered in headless Node environment; UI verification relies on read-model event contracts and translation integrity.
- Server-side WebSocket transport was tested via in-memory protocol test doubles; network socket latency jitter is bounded by the 150ms timing audit contract.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

Deterministic replay and exception safety are robust and verified across 1,000 battles. However, two blocking defects must be resolved by the worker agent before Milestone 1 sign-off:
1. **Fix `createKernel` constructor calls in `src/js/kernel/kernelFactory.js`** to pass `random` and `now` positionally or normalize options inside `BattleSystem.js` and `PostBattleSystem.js`.
2. **Add the 29 missing translation keys to `src/js/services/I18n.js`** across all 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`) so all battle dialogue, combat errors, toasts, and QTE narrations resolve properly.

---

## 5. Verification Method

To independently verify these findings:

```bash
# 1. Run 1,000-battle deterministic replay stress test
node .agents/challenger_m1_2/stress_deterministic_replay_1000.mjs

# 2. Reproduce kernelFactory TypeError
node -e "import('./src/js/kernel/kernelFactory.js').then(m => { const k = m.createKernel(); k.battle.start(1); k.battle.revealHands(); })"

# 3. Run localization and exception safety verification test
node .agents/challenger_m1_2/stress_localization_exceptions.mjs

# 4. Run baseline project test suite
npm test
```
