# BRIEFING — 2026-09-03T01:51:30Z

## Mission
Survey and mine specifications for Focus Area 3: Schema v2 & Equipment Instances & Economic Ledger (R3), Security/Governance/Privacy (R4), and UI Decoupling / Read-Model Feeds / 4-Locale I18n / Connection Indicator (R5) for the Koraku RPS Online-Authoritative Refactor.

## 🔒 My Identity
- Archetype: Specification Miner / Codebase Explorer
- Roles: Teamwork specialist, Spec Miner
- Working directory: D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3
- Original parent: c7630716-50df-4080-829c-564e1bbc4ecf
- Milestone: Phase 0 Spec Mining & Discovery

## 🔒 Key Constraints
- Read-only on existing game code / do NOT implement or modify runtime code during this task.
- Follow Koraku RPS AGENTS.md rules (Ponytail OFF for presentation files; 4-locale i18n zh-Hant, zh-Hans, en, ja).
- Inspect authoritative codebase, specifications, and docs.
- Output comprehensive report to `report.md` and summary in `handoff.md`.
- Communicate to caller via `send_message` with Recipient `c7630716-50df-4080-829c-564e1bbc4ecf`.

## Current Parent
- Conversation ID: c7630716-50df-4080-829c-564e1bbc4ecf
- Updated: 2026-09-03T01:51:30Z

## Task Summary
- **What to build**: Survey report (`report.md`) covering R3 (Schema v2, Equipment Instances, Economic Ledger), R4 (Security, Dev Entitlements, Transfer Codes, GDPR Export/Delete), and R5 (UI Decoupling, Read-Model Event Feeds, 4-Locale i18n, Connection Banner).
- **Success criteria**: Exhaustive enumeration of schemas, migration algorithms, ledger entry models, dev entitlement validation, one-time transfer flow, GDPR export/deletion flow, UI event/command matrix, i18n key inventory for server events, connection state machine & banner UI spec, edge cases, and verification methods.
- **Interface contracts**: HANDOFF.md, AI_HANDOVER.md, OPENSPEC.md, ORIGINAL_REQUEST.md.
- **Code layout**: D:\game-dev\New-game-project-4\src\js

## Key Decisions Made
- Spec mining mode: deep dive into existing SaveManager/GameStore, I18n.js, AppView.js, HUD, modal systems, cheat panels, and responsive styling.

## Artifact Index
- `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3\report.md` — Comprehensive survey report
- `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3\handoff.md` — 5-component handoff report
- `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3\progress.md` — Progress tracker / heartbeat
