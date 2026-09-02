## 2026-09-03T02:13:42Z

You are Worker 2 for Milestone 1 (Remediation Iteration) of the Koraku RPS Online-Authoritative Refactor.

Your working directory is: D:\game-dev\New-game-project-4\.agents\worker_m1_2
(Write your progress.md and handoff.md inside your assigned working directory).

MANDATORY INPUTS:
Read the following files:
- D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md
- D:\game-dev\New-game-project-4\PROJECT.md
- D:\game-dev\New-game-project-4\AGENTS.md
- Reviewer & Challenger Handoff Reports:
  - D:\game-dev\New-game-project-4\.agents\reviewer_m1_2\handoff.md
  - D:\game-dev\New-game-project-4\.agents\challenger_m1_1\handoff.md
  - D:\game-dev\New-game-project-4\.agents\challenger_m1_2\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVE WRITE OWNERSHIP:
- `src/js/kernel/kernelFactory.js`
- `src/js/systems/BattleSystem.js`
- `src/js/systems/PostBattleSystem.js`
- `src/js/services/I18n.js`
- `tests/i18n.test.js`
- `tests/unit/kernelFactory.test.js` (or unit test files)

REMEDIATION TASKS:
1. **Fix `src/js/kernel/kernelFactory.js:27-28`**:
   - Change `new BattleSystem(bus, store, { random, now })` to `new BattleSystem(bus, store, random, now)`.
   - Change `new PostBattleSystem(bus, store, { random, now })` to `new PostBattleSystem(bus, store, random, now)`.
   - Defensively update `BattleSystem.js` and `PostBattleSystem.js` constructors so that if the 3rd argument is an object containing `random` and/or `now`, it safely unpacks them.
2. **Populate all 52 missing keys in `src/js/services/I18n.js` across ALL 4 LOCALES (`zh-Hant`, `zh-Hans`, `en`, `ja`)**:
   - Add accurate, natural game translations for:
     - `toast.levelRequirementNotMet`
     - `combat.morphWindowOnly`, `combat.morphWindowExpired`, `combat.insufficientMp`, `combat.tookDamage`, `combat.notInBattle`, `combat.itemNotFound`, `combat.resourceFull`, `combat.itemDepleted`
     - `dialogue.winDualMorphBoth`, `dialogue.winDualBoth`, `dialogue.winDualMorphSingle`, `dialogue.winDualSingle`, `dialogue.winDualMorphDoubleDmg`, `dialogue.winDualDoubleDmg`, `dialogue.winSingleMorph`, `dialogue.winSingleNormal`
     - `dialogue.drawMomoDodge`, `dialogue.drawMomoHit`, `dialogue.drawNormal`, `dialogue.deflectedSingleAttack`
     - `dialogue.dualQteMiss`, `dialogue.dualQteSuccess`, `dialogue.qteMiss`, `dialogue.freezeNarration`, `dialogue.dodgeDodge`, `dialogue.dodgeDodgeDual`
     - `shop.itemNotFound`, `shop.insufficientCoins`, `shop.itemPurchased`, `shop.equipmentPurchased`
     - `equip.invalidItem`, `equip.notInInventory`, `equip.invalidSlot`, `equip.incompatibleSlot`, `equip.equipped`, `equip.slotEmpty`, `equip.unequipped`
     - `growth.invalidStat`, `growth.noPoints`, `growth.statIncreased`, `growth.invalidSkill`, `growth.levelRequirementNotMet`, `growth.skillMaxLevel`, `growth.insufficientPoints`, `growth.skillUpgraded`
     - `cheat.updated`, `cheat.unlockedAll`, `cheat.unlockedGallery`
     - `save.invalidCode`, `save.corruptCode`, `save.imported`
3. **Update `tests/i18n.test.js`**:
   - Add explicit assertions ensuring that every single one of these keys exists and translates cleanly in `zh-Hant`, `zh-Hans`, `en`, and `ja`.
4. **Verification**:
   - Run `npm test` and verify 100% test pass.
   - Run `node scripts/build.mjs` to rebuild `src/js/bundle.js`.
   - Run `.agents/challenger_m1_1/test_kernel_options_probe.mjs` and verify zero errors.
5. Deliver your 5-component handoff report to `D:\game-dev\New-game-project-4\.agents\worker_m1_2\handoff.md` and send a message to parent when complete.
