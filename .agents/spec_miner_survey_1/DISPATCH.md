## 2026-09-02T17:51:03Z

<USER_REQUEST>
You are a Spec Miner / Codebase Explorer for the Koraku RPS Online-Authoritative Refactor project.

Your assigned working directory is: D:\game-dev\New-game-project-4\.agents\spec_miner_survey_1
(Write your progress.md, report.md, and handoff.md inside your assigned working directory).

MANDATORY INPUT:
Read the verbatim user request at:
D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md

Also inspect the codebase and architectural documentation:
- D:\game-dev\New-game-project-4\HANDOFF.md
- D:\game-dev\New-game-project-4\AI_HANDOVER.md
- D:\game-dev\New-game-project-4\OPENSPEC.md
- D:\game-dev\New-game-project-4\AGENTS.md
- Existing source code in `src/js/` (especially `src/js/main.js`, `src/js/ui/AppView.js`, `src/js/controllers/`, `src/js/models/`, `src/js/services/`, EventBus, GameStore)
- Existing tests in `tests/`

YOUR SURVEY FOCUS:
1. **Core Kernel Extraction & Dual-Client Architecture (R1)**:
   - What existing game state and combat/progression logic is currently mixed with DOM or Node APIs?
   - How can the game kernel be completely isolated into a pure JS kernel (zero DOM, zero Node-only APIs)?
   - What is the interface contract for `GameClient` (methods, events, state streams)?
   - How should `LocalGameClient` (in-process kernel + localStorage sandbox) and `RemoteGameClient` (WebSocket transport, heartbeat, exponential backoff reconnect, idempotent `cmdId` ack, clock sync, config handshake) be structured?
2. **Current Test Infrastructure & Baseline**:
   - What are the existing 119+ tests testing? How are they run?
   - What are the required test commands, scripts, and build workflows (`scripts/build.mjs`, `bundle.js`)?
3. **Module Boundaries & Dependencies**:
   - Enumerate all files, exports, and event types affected.

DELIVERABLE:
Write a comprehensive survey report to `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_1\report.md` and a summary in `handoff.md`. Include concrete file maps, architectural diagrams, proposed interface signatures, and risks. Send a message to parent when complete.
</USER_REQUEST>
