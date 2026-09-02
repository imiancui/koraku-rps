## 2026-09-02T17:59:00Z
You are the Worker subagent for Milestone 1 (Kernel Extraction & Protocol Decoupling) of the Koraku RPS Online-Authoritative Refactor.

Your assigned working directory is: D:\game-dev\New-game-project-4\.agents\worker_m1_1

MANDATORY INPUTS:
Read the following files carefully:
- D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md
- D:\game-dev\New-game-project-4\PROJECT.md
- D:\game-dev\New-game-project-4\AGENTS.md
- Milestone 1 Plan & Exploration Report:
  - D:\game-dev\New-game-project-4\.agents\explorer_m1_1\plan.md
  - D:\game-dev\New-game-project-4\.agents\explorer_m1_1\handoff.md

EXCLUSIVE WRITE OWNERSHIP:
You own and may edit the following files:
- src/js/kernel/protocol.js
- src/js/systems/PostBattleSystem.js
- src/js/systems/BattleSystem.js
- src/js/core/GameStore.js
- src/js/ui/AppView.js (only the toast and dialogue { key, params } fallback handler; Ponytail OFF)

YOUR IMPLEMENTATION TASKS:
1. Pure JS Kernel Decoupling:
   - In PostBattleSystem.js: Replace all 8 performance.now() calls with 	his.now(). Remove import { I18n }. Emit structured { key, params, speakerKey } payloads in say() and all watermelon/swimsuit/settle methods.
   - In BattleSystem.js: Remove import { I18n }. Ensure all toasts, dialogues, chant beats, morph, QTE, and combat outcomes emit structured { key, params, speakerKey } tokens. Keep 	his.now() injected throughout.
   - In GameStore.js: Use injected 	his.now() for createEquipmentInstance UID generation fallback and ecentBattles timestamps. Return structured { ok, key, params, message } tokens in store methods.
   - In protocol.js: Ensure AUTOBATTLE_STREAM_CHUNK is included in Events, and all error codes and command names match PROJECT.md.
   - In AppView.js: Support { key, params } in showToast and dialogue handlers with I18n.t fallback, preserving all existing visual styling and responsive layouts (Ponytail OFF).
2. Verification:
   - Run 
pm test and verify 100% test pass.
   - Run 
ode scripts/build.mjs (or 
pm run build) to ensure bundle compiles cleanly.
   - Run 
ode --test tests/i18n.test.js to ensure 4-locale i18n completeness.
3. Deliver your 5-component handoff report to D:\game-dev\New-game-project-4\.agents\worker_m1_1\handoff.md and send a completion message to the parent orchestrator.
