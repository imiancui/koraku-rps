## 2026-09-03T01:51:03Z

You are a Spec Miner / Codebase Explorer for the Koraku RPS Online-Authoritative Refactor project.

Your assigned working directory is: D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3
(Write your progress.md, report.md, and handoff.md inside your assigned working directory).

MANDATORY INPUT:
Read the verbatim user request at:
D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md

Also inspect the codebase and architectural documentation:
- D:\game-dev\New-game-project-4\HANDOFF.md
- D:\game-dev\New-game-project-4\AI_HANDOVER.md
- D:\game-dev\New-game-project-4\OPENSPEC.md
- D:\game-dev\New-game-project-4\AGENTS.md
- `src/js/services/I18n.js` and `tests/i18n.test.js`
- `src/js/ui/` (especially `AppView.js`, HUD, modal, and responsive styles in `src/styles/`)
- Save/Load logic and storage schemas in `src/js/`

YOUR SURVEY FOCUS:
1. **Schema v2, Equipment Instances, & Economic Ledger (R3)**:
   - Current save schema vs Schema v2 requirements (`{ uid, typeId, level }` equipment instances).
   - Migration path for existing Schema v1 / legacy saves.
   - Append-only economic ledger design: tracking source, server timestamp, and configVersion for all coin, XP, item, and gear mutations.
2. **Security, Governance, & Data Privacy (R4)**:
   - Server-side dev entitlement for cheat commands (preserving offline cheat panel).
   - Server-issued one-time transfer codes for cross-device migration.
   - GDPR-compliant JSON account data export and complete account deletion (`account.delete`).
3. **UI Decoupling, Read-Model Feeds, & 4-Locale I18n (R5)**:
   - Decoupling `AppView.js` from direct state mutations into intent-only command dispatcher + subscriber to read-model events.
   - Ensuring server and kernel emit NO player-visible text (only `{ key, params }`), with client-side localization across `zh-Hant`, `zh-Hans`, `en`, and `ja`.
   - Connection state indicator banner requirements (`connecting`, `online`, `offline`, `reconnecting`).
   - Preservation of visual styling (Ponytail OFF for presentation files).

DELIVERABLE:
Write a comprehensive survey report to `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3\report.md` and a summary in `handoff.md`. Include schema definitions, migration logic, i18n key inventory, UI state flow, and safety boundaries. Send a message to parent when complete.
