# Original User Request

## Initial Request — 2026-09-03T01:50:12+08:00

You are the Project Orchestrator for the Koraku RPS (狐樂・絆之勝負) online-authoritative refactor.

Your working directory is: D:\game-dev\New-game-project-4\.agents\orch_online_refactor_1
The project root is: D:\game-dev\New-game-project-4
Original request is recorded at: D:\game-dev\New-game-project-4\.agents\ORIGINAL_REQUEST.md

## Mission & Requirements
Refactor Koraku RPS into an online-authoritative architecture with dual-client support (`LocalGameClient` and `RemoteGameClient`), 3-class adjudication, Schema v2 equipment instances, append-only economic ledger, and server-side anti-cheat, while preserving offline sandbox play and complete UI/visual fidelity.

### Key Requirements:
1. **R1. Dual-Client Architecture & Server-Authoritative Kernel**:
   - Pure JS game kernel (zero DOM, zero Node-only APIs).
   - Unified `GameClient` interface with `LocalGameClient` (in-process kernel + localStorage for offline sandbox) and `RemoteGameClient` (WebSocket transport, heartbeat, exponential backoff reconnect, idempotent `cmdId` ack, clock sync, and config version handshake).
2. **R2. Three-Class Adjudication & Timing Model**:
   - Timing claims (QTE, morph trigger, watermelon slicing): optimistic client feedback, server audits sequence, intervals, and arrival within 150ms grace.
   - Secret commitments (RPS hand selection): must reach server before reveal deadline; late arrivals ignored.
   - Inventory & progression mutations: idempotent server commands keyed by `cmdId`. Lock equipment & stat allocation during active battle sessions.
   - Battle pause allowed only during countdown (max 3 times/battle); disconnect receives 10s grace before auto-settlement.
3. **R3. Schema v2, Equipment Instances, & Economic Ledger**:
   - Upgrade save and item model from typeId strings to server-issued instance objects `{ uid, typeId, level }`.
   - Append-only economic ledger recording source, timestamp, and configVersion for all coin, XP, item, and gear mutations.
   - Persist battle RNG seeds and command logs for deterministic replay.
4. **R4. Security, Governance, & Data Privacy**:
   - Server-side dev entitlement for cheat commands (offline cheat panel preserved).
   - Server-issued one-time transfer codes for cross-device migration.
   - GDPR-compliant JSON account data export and complete account deletion (`account.delete`).
5. **R5. UI Decoupling, Localized Read-Model Feeds, & Visual Preservation**:
   - Decouple `AppView.js` to send intent commands only and subscribe to read-model events.
   - Server and kernel emit no player-visible text; all toasts, dialogue, and battle logs use `{ key, params }` localized client-side across 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`).
   - Add connection state indicator banner (`connecting`, `online`, `offline`, `reconnecting`).
   - Keep Ponytail OFF for all presentation files to guarantee zero visual, animation, or responsive layout regressions.

## Acceptance Criteria:
- `npm test` passes 100% (all existing 119+ tests and new contract / anti-cheat / replay / i18n tests).
- Dual contract tests verify identical gameplay behavior across `LocalGameClient` and `RemoteGameClient`.
- Anti-cheat test suite passes.
- Deterministic replay tests verify identical seed and command logs produce identical battle outcomes.
- 4-locale i18n dictionary completeness test passes in `tests/i18n.test.js`.
- `?mode=offline` runs completely offline in sandbox without attempting server connection.
- `?mode=online` connects via WebSocket, syncs clocks, and successfully executes full battle loop against the server.
- Zero visual or layout regressions.
