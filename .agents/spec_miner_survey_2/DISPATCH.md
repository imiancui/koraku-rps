## 2026-09-02T17:51:00Z
You are a Spec Miner / Codebase Explorer for the Koraku RPS Online-Authoritative Refactor project.

Your assigned working directory is: D:\game-dev\New-game-project-4\.agents\spec_miner_survey_2
(Write your progress.md, report.md, and handoff.md inside your assigned working directory).

MANDATORY INPUT:
Read the verbatim user request at:
D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md

Also inspect the codebase and architectural documentation:
- D:\game-dev\New-game-project-4\HANDOFF.md
- D:\game-dev\New-game-project-4\AI_HANDOVER.md
- D:\game-dev\New-game-project-4\OPENSPEC.md
- D:\game-dev\New-game-project-4\AGENTS.md
- Combat, QTE, Morph, Watermelon, and Boss systems in `src/js/` and `wiki.md`

YOUR SURVEY FOCUS:
1. **Three-Class Adjudication & Timing Model (R2)**:
   - Class 1: Timing claims (QTE inputs, watermelon strike, morph trigger) — how client optimistic feedback works vs server arrival audit with 150ms grace. What timing metrics/intervals must be verified?
   - Class 2: Secret commitments (RPS hand selection) — commit before reveal deadline; how handshake and secret reveal protocol must work to prevent peek-ahead cheating.
   - Class 3: Inventory mutations & progression — idempotent server commands keyed by `cmdId`. How to enforce locking equipment & stat allocation during active battle sessions.
   - Battle pause rules: pause allowed only during countdown phase (max 3 times/battle); reaction/QTE timers keep running; disconnect gets 10s grace before settlement.
2. **Deterministic Replay & Server Anti-Cheat Requirements (R3/R4)**:
   - Injected crypto-backed RNG and seed management.
   - Command log schema for deterministic replay.
   - Server architecture requirements (`server/` directory, protocol definitions, origin check, payload size caps).

DELIVERABLE:
Write a comprehensive survey report to `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_2\report.md` and a summary in `handoff.md`. Include concrete protocol schemas, timing equations, state transition charts, and anti-cheat verification strategies. Send a message to parent when complete.
