# Reviewer 2 Handoff Report — Milestone 1 (Review & Adversarial Audit)

## Review Summary
**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

1. **Kernel Factory Positional Parameter Mismatch / Runtime Crash**:
   - `src/js/kernel/kernelFactory.js:27-28`:
     ```javascript
     const battle = new BattleSystem(bus, store, { random, now });
     const postBattle = new PostBattleSystem(bus, store, { random, now });
     ```
   - `src/js/systems/BattleSystem.js:13`:
     ```javascript
     export class BattleSystem {
       constructor(bus, store, random = Math.random, now = Date.now) {
         this.bus = bus;
         this.store = store;
         this.random = random;
         this.now = typeof now === "function" ? now : () => Date.now();
     ```
   - `src/js/systems/PostBattleSystem.js:4`:
     ```javascript
     export class PostBattleSystem {
       constructor(bus, store, random = Math.random, now = null) {
     ```
   - **Direct Runtime Error Observed**:
     When `LocalGameClient` boots the game via `createKernel()`, `this.random` in `BattleSystem` is set to the object `{ random: Function, now: Function }` instead of a function. During `revealHands` (e.g. at line 873 `this.random()`) or anytime random is called, Node.js throws:
     ```
     TypeError: this.random is not a function
         at getFilteredHand (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:873:35)
         at BattleSystem.revealHands (file:///D:/game-dev/New-game-project-4/src/js/systems/BattleSystem.js:900:20)
     ```
     Furthermore, `this.now` is never assigned the injected clock (it defaults to `Date.now()`), violating clock injection. In `PostBattleSystem`, the exact same object-passing bug occurs.

2. **52 Missing I18n Keys in All 4 Locales (`src/js/services/I18n.js`)**:
   - Milestone 1 converted hardcoded system strings into structured tokens `{ key, params }`. However, **52 newly introduced keys** were never added to `DICTIONARY` in `src/js/services/I18n.js` for ANY of the four locales (`zh-Hant`, `zh-Hans`, `en`, `ja`):
     - `toast.levelRequirementNotMet` (`BattleSystem.js:248`)
     - `combat.morphWindowOnly` (`BattleSystem.js:942`)
     - `combat.morphWindowExpired` (`BattleSystem.js:950`)
     - `combat.insufficientMp` (`BattleSystem.js:961`)
     - `dialogue.winDualMorphBoth` (`BattleSystem.js:1048, 1104`)
     - `dialogue.winDualBoth` (`BattleSystem.js:1049, 1105`)
     - `dialogue.winDualMorphSingle` (`BattleSystem.js:1060, 1116`)
     - `dialogue.winDualSingle` (`BattleSystem.js:1061, 1117`)
     - `dialogue.winDualMorphDoubleDmg` (`BattleSystem.js:1143`)
     - `dialogue.winDualDoubleDmg` (`BattleSystem.js:1144`)
     - `dialogue.winSingleMorph` (`BattleSystem.js:1151, 1162`)
     - `dialogue.winSingleNormal` (`BattleSystem.js:1152, 1163`)
     - `dialogue.drawMomoDodge` (`BattleSystem.js:1191`)
     - `dialogue.drawMomoHit` (`BattleSystem.js:1194`)
     - `dialogue.drawNormal` (`BattleSystem.js:1197`)
     - `dialogue.deflectedSingleAttack` (`BattleSystem.js:1270`)
     - `dialogue.dualQteMiss` (`BattleSystem.js:1339`)
     - `dialogue.dualQteSuccess` (`BattleSystem.js:1347`)
     - `dialogue.qteMiss` (`BattleSystem.js:1369`)
     - `dialogue.freezeNarration` (`BattleSystem.js:1410`)
     - `combat.tookDamage` (`BattleSystem.js:1442`)
     - `dialogue.dodgeDodge` (`BattleSystem.js:1461`)
     - `dialogue.dodgeDodgeDual` (`BattleSystem.js:1530`)
     - `combat.notInBattle` (`BattleSystem.js:1661`)
     - `combat.itemNotFound` (`BattleSystem.js:1669`)
     - `combat.resourceFull` (`BattleSystem.js:1679`)
     - `combat.itemDepleted` (`BattleSystem.js:1687`)
     - `shop.itemNotFound` (`GameStore.js:305, 324`)
     - `shop.insufficientCoins` (`GameStore.js:307, 326`)
     - `shop.itemPurchased` (`GameStore.js:318`)
     - `shop.equipmentPurchased` (`GameStore.js:339`)
     - `equip.invalidItem` (`GameStore.js:345`)
     - `equip.notInInventory` (`GameStore.js:357`)
     - `equip.invalidSlot` (`GameStore.js:427`)
     - `equip.incompatibleSlot` (`GameStore.js:439`)
     - `equip.equipped` (`GameStore.js:476`)
     - `equip.slotEmpty` (`GameStore.js:481`)
     - `equip.unequipped` (`GameStore.js:494`)
     - `growth.invalidStat` (`GameStore.js:511`)
     - `growth.noPoints` (`GameStore.js:514`)
     - `growth.statIncreased` (`GameStore.js:524`)
     - `growth.invalidSkill` (`GameStore.js:529`)
     - `growth.levelRequirementNotMet` (`GameStore.js:531`)
     - `growth.skillMaxLevel` (`GameStore.js:535`)
     - `growth.insufficientPoints` (`GameStore.js:538`)
     - `growth.skillUpgraded` (`GameStore.js:549`)
     - `cheat.updated` (`GameStore.js:935`)
     - `cheat.unlockedAll` (`GameStore.js:955`)
     - `cheat.unlockedGallery` (`GameStore.js:966`)
     - `save.invalidCode` (`GameStore.js:992`)
     - `save.corruptCode` (`GameStore.js:996`)
     - `save.imported` (`GameStore.js:1005`)
   - **Consequence**: When players run the game in English (`en`), Japanese (`ja`), or Simplified Chinese (`zh-Hans`), all 52 toasts/dialogues fail translation lookup in `I18n.t(key)` and fall back to hardcoded Traditional Chinese strings in `AppView.js:3920` or key names. This violates AGENTS.md Online Authority Policy #8 ("The server emits no player-visible text. Dialogue, toasts, and battle log entries are `{ key, params }`; translation happens only on the client.") and the 4-locale UI synchronization requirement.

3. **Incomplete I18n Test Coverage in `tests/i18n.test.js`**:
   - `tests/i18n.test.js` lines 147-254 test only a static list of legacy keys (`meta.title`, `dialogue.speakerKohaku`, `ui.enterStage`, etc.) and omitted assertions for the 52 newly introduced keys. As a result, `npm test` showed 6/6 passing I18n tests despite 52 keys missing from dictionary definitions.

4. **Test Suite Execution Results**:
   - `npm test`: 184 pass, 0 fail.
   - `node --test tests/contract/*.test.js`: 7 pass, 0 fail.
   - `npm run test:server`: 11 pass, 0 fail.
   - `node scripts/build.mjs`: Success.

---

## 2. Logic Chain

1. Observations 1 & 4 show that while existing unit tests passed because they instantiated `BattleSystem` directly (`new BattleSystem(bus, store, rng, now)`), `kernelFactory.js` (which is used by `LocalGameClient` in `main.js`) instantiated `BattleSystem` and `PostBattleSystem` with an options object as the 3rd parameter (`new BattleSystem(bus, store, { random, now })`).
2. Because `BattleSystem` and `PostBattleSystem` constructors take positional parameters `(bus, store, random, now)`, passing an options object causes `this.random` to become `{ random, now }` (an object, not a function) and `this.now` to default to `Date.now()`.
3. When any player initiates a battle via `LocalGameClient`, hand reveal or QTE calculation calls `this.random()`, which triggers an unhandled `TypeError: this.random is not a function` runtime crash.
4. Observation 2 shows that all 52 newly introduced keys in `BattleSystem.js` and `GameStore.js` are absent in `DICTIONARY` across all 4 locales in `src/js/services/I18n.js`.
5. Because `tests/i18n.test.js` (Observation 3) did not check these newly introduced keys, the missing keys went unnoticed during worker testing, causing localization degradation in English, Japanese, and Simplified Chinese.

---

## 3. Caveats

- The protocol envelopes in `src/js/kernel/protocol.js` are well structured, frozen, and adhere to `PROJECT.md` specifications.
- Pure JS isolation in `BattleSystem.js`, `PostBattleSystem.js`, `QTESystem.js`, and `GameStore.js` is verified: direct DOM/Node imports have been eradicated from the gameplay kernel.
- No malicious code or deliberate cheating facades were detected in the test suites; the issues stem from parameter mismatch in `kernelFactory.js` and dictionary omission in `I18n.js`.

---

## 4. Conclusion & Required Changes

**Verdict**: **REQUEST_CHANGES**

### Actionable Fix Instructions for Worker:

1. **Fix `src/js/kernel/kernelFactory.js:27-28`**:
   Change:
   ```javascript
   const battle = new BattleSystem(bus, store, random, now);
   const postBattle = new PostBattleSystem(bus, store, random, now);
   ```
   (Optionally, make `BattleSystem` and `PostBattleSystem` constructors accept either positional arguments `(bus, store, random, now)` or an options object `(bus, store, { random, now })` defensively).

2. **Populate all 52 missing keys in `src/js/services/I18n.js` across all 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`)**:
   Add proper translations under `dialogue`, `combat`, `shop`, `equip`, `growth`, `cheat`, `save`, and `toast` dictionary sections for `zh-Hant`, `zh-Hans`, `en`, and `ja`.

3. **Update `tests/i18n.test.js`**:
   Add assertions verifying that every newly introduced key emitted by `BattleSystem.js`, `GameStore.js`, and `PostBattleSystem.js` resolves to a non-fallback translation in all 4 locales.

---

## 5. Verification Method

To verify the fixes independently:
1. Run `node -e 'import { createKernel } from "./src/js/kernel/kernelFactory.js"; const k = createKernel(); console.assert(typeof k.battle.random === "function"); console.assert(typeof k.postBattle.random === "function");'`
2. Run `npm test` and `node --test tests/i18n.test.js` (must pass 100% with full dictionary assertions).
3. Run `node scripts/build.mjs` to re-bundle.
