# BRIEFING — 2026-09-02T17:56:00Z

## Mission
Survey, discover, and document detailed authoritative specifications and architectural designs for the Koraku RPS Online-Authoritative Refactor (Focus 2: Three-Class Adjudication & Timing Model, Battle Pause Rules, Deterministic Replay & Server Anti-Cheat Requirements).

## 🔒 My Identity
- Archetype: Specification Miner / Codebase Explorer
- Roles: Specification Mining, Protocol Analysis, Anti-Cheat & Timing Architecture Modeling
- Working directory: D:\game-dev\New-game-project-4\.agents\spec_miner_survey_2
- Original parent: c7630716-50df-4080-829c-564e1bbc4ecf
- Milestone: Phase 0 Specification & Architecture Survey

## 🔒 Key Constraints
- Read-only specification survey and architecture formulation (no implementation / code modification).
- Adhere strictly to the Online Authority Policies in AGENTS.md and ORIGINAL_REQUEST.md.
- Focus on Three-Class Adjudication, Timing Models (150ms grace), Secret Commitments, Command Idempotency, Session Locking, Pause/Disconnect rules, Deterministic Replay, Crypto-backed Seeded RNG, and Server Architecture (`server/`, origin checks, size caps).
- Write report to `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_2\report.md` and handoff report to `handoff.md`.

## Current Parent
- Conversation ID: c7630716-50df-4080-829c-564e1bbc4ecf
- Updated: 2026-09-02T17:56:00Z

## Task Summary
- **What to build**: Survey report & architectural specification for Three-Class Adjudication, Timing Audit, Anti-Cheat, and Replay System.
- **Success criteria**: Comprehensive `report.md` and 5-component `handoff.md` with concrete schemas, timing equations, state transition charts, and verification strategies.
- **Interface contracts**: HANDOFF.md, AI_HANDOVER.md, OPENSPEC.md, AGENTS.md, protocol.js.
- **Code layout**: New-game-project-4 (`src/js/` for client, `server/` for backend adapters, and shared pure kernel).

## Key Decisions Made
- Formulated exact mathematical equations and sequence bounds for Class 1 timing claim audits (QTE sequence matching, IKI $\ge 40\text{ms}$, watermelon triangular waveform, morph window).
- Specified zero-leakage secret commitment scheme for Class 2 (RPS hand selection) with strict 150ms grace cutoff.
- Formulated Class 3 command idempotency (`cmdId`) and combat session locking policy (`BATTLE_IN_PROGRESS_LOCKED`).
- Detailed battle pause rules (countdown only, max 3/battle) and 10s disconnect grace period.
- Designed deterministic replay log schema and verification algorithm leveraging injected Mulberry32 PRNG.

## Artifact Index
- `DISPATCH.md` — Agent dispatch log
- `BRIEFING.md` — Persistent working memory
- `progress.md` — Liveness & step heartbeat
- `report.md` — Full survey & architectural specification report
- `handoff.md` — 5-component handoff report for parent agent
