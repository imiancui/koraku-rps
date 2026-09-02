## 2026-09-02T17:56:34Z
<USER_REQUEST>
You are an Explorer for Milestone 1 (Kernel Extraction & Protocol Decoupling) of the Koraku RPS Online-Authoritative Refactor.

Your working directory is: D:\game-dev\New-game-project-4\.agents\explorer_m1_1
(Write your progress.md, plan.md, and handoff.md inside your assigned working directory).

MANDATORY INPUTS:
Read the following files:
- D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md
- D:\game-dev\New-game-project-4\PROJECT.md
- D:\game-dev\New-game-project-4\AGENTS.md
- `src/js/systems/BattleSystem.js`, `src/js/systems/QTESystem.js`, `src/js/systems/PostBattleSystem.js`, `src/js/systems/TimerRegistry.js`, `src/js/core/GameStore.js`, `src/js/kernel/protocol.js`

YOUR MISSION:
1. Formulate a precise, step-by-step implementation strategy for Milestone 1:
   - Pure JS Kernel: Remove all DOM, `window.localStorage`, `performance.now()`, and direct `I18n.t(...)` calls from `BattleSystem.js`, `QTESystem.js`, `PostBattleSystem.js`, `GameStore.js`, and `TimerRegistry.js`.
   - Inject abstract time providers (`now = Date.now` or custom ticker).
   - Replace hardcoded Chinese strings and direct translation calls with structured event payloads `{ key, params }`.
   - Verify that `protocol.js` defines all required Command and Event types.
2. Outline exact file write boundaries and modifications for Worker 1.
3. Write your findings and implementation roadmap to `D:\game-dev\New-game-project-4\.agents\explorer_m1_1\handoff.md` and send a completion message to the parent orchestrator.
</USER_REQUEST>
