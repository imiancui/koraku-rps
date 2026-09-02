# Project: Koraku RPS Online-Authoritative Refactor

## Architecture
Koraku RPS (狐樂・絆之勝負) is refactored from a client-authoritative single-player web game into a dual-client, server-authoritative architecture. The core gameplay kernel is 100% pure JavaScript with zero DOM and zero Node-only API dependencies, allowing it to execute identically inside the browser sandbox via `LocalGameClient` and on the authoritative Node.js server via `RemoteGameClient` and `GameSession`.

```
                    ┌────────────────────────────┐
                    │      Presentation Layer    │
                    │ (AppView.js, HTML/CSS UI)  │
                    │   - Intent commands only   │
                    │   - Subscribes to events   │
                    │   - Ponytail OFF           │
                    └─────────────┬──────────────┘
                                  │ Intent Commands / Read-Model Events
                    ┌─────────────▼──────────────┐
                    │      GameClient Interface  │
                    │ (send, on, getState, etc.) │
                    └──────┬──────────────┬──────┘
                           │              │
           ┌───────────────▼─┐          ┌─▼───────────────┐
           │ LocalGameClient │          │ RemoteGameClient│
           │ (Offline/Sandbox│          │ (WebSocket Net) │
           └───────┬─────────┘          └────────┬────────┘
                   │ In-Process                  │ WebSocket
                   │                             │
           ┌───────▼─────────┐          ┌────────▼────────┐
           │ Pure JS Kernel  │          │  Node.js Server │
           │ (Combat, Stats, │          │  (GameSession,  │
           │  QTE, Rules)    │          │   Anti-Cheat,   │
           └─────────────────┘          │   Ledger, PRNG) │
                                        └─────────────────┘
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Pure JS Kernel Extraction | Zero DOM/Node APIs in core combat/progression modules, time injection | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Localized Read-Model Events | Structured `{ key, params }` tokens emitted instead of hardcoded strings | M1 | ORIGINAL_REQUEST §R5 |
| 3 | Frozen Protocol Envelopes | Standard command envelopes (`cmdId`, `clientTime`, `configVersion`) & error codes | M1 | AGENTS.md / Survey |
| 4 | Schema v2 Equipment Instances | `{ uid, typeId, level, acquiredAt }` instances with 12-slot UID mapping | M2 | ORIGINAL_REQUEST §R3 |
| 5 | Save Migration (v1 -> v2) | Automatic non-destructive migration from legacy string IDs to instance UIDs | M2 | ORIGINAL_REQUEST §R3 |
| 6 | Append-Only Economic Ledger | `.jsonl` audit log tracking source, timestamp, delta, and configVersion | M2 | ORIGINAL_REQUEST §R3 |
| 7 | Deterministic Replay & Seed Logs | Crypto RNG seeding and timestamped command logs for battle reproduction | M2 | ORIGINAL_REQUEST §R3 |
| 8 | Class 1 Timing Claim Adjudication | QTE (IKI >= 40ms), watermelon triangular wave, morph with 150ms arrival grace | M3 | ORIGINAL_REQUEST §R2 |
| 9 | Class 2 Secret Commitment | RPS hand selection committed before reveal deadline, late arrivals rejected | M3 | ORIGINAL_REQUEST §R2 |
| 10 | Class 3 Idempotency & Session Lock | Idempotent `cmdId` deduplication; equipment/stat locking during active battle | M3 | ORIGINAL_REQUEST §R2 |
| 11 | Battle Pause & Disconnect Rules | Pause allowed only in countdown (max 3/battle); 10s disconnect grace | M3 | ORIGINAL_REQUEST §R2 |
| 12 | Server Security & Entitlements | Dev entitlement for cheats, origin checks, 4KB payload caps, rate limiting | M3 | ORIGINAL_REQUEST §R4 |
| 13 | Data Privacy & Cross-Device Transfer | 15-min transfer codes, GDPR JSON export, and account deletion (`account.delete`) | M3 | ORIGINAL_REQUEST §R4 |
| 14 | Unified Dual-Client Runtime | `LocalGameClient` (sandbox) and `RemoteGameClient` (WebSocket, reconnect, clock sync) | M4 | ORIGINAL_REQUEST §R1 |
| 15 | UI Decoupling & Read-Model Subscriptions | `AppView.js` refactored to send intents and subscribe to state/events | M4 | ORIGINAL_REQUEST §R5 |
| 16 | Connection State Banner & Mode Switch | Responsive connection banner (`online`, `offline`, `reconnecting`), `?mode=` switch | M4 | ORIGINAL_REQUEST §R5 |
| 17 | 4-Locale I18n UI Synchronization | 100% dictionary completeness across `zh-Hant`, `zh-Hans`, `en`, and `ja` | M4 | ORIGINAL_REQUEST §R5 |
| 18 | Final E2E Test Suite & Adversarial Pass | Pass 100% E2E suite (Tiers 1-4) + adversarial hardening (Tier 5) | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Kernel Extraction & Protocol Decoupling (M1) | Pure JS kernel, zero DOM/Node APIs, structured `{ key, params }` events, frozen protocol | none | DONE |
| 2 | Schema v2, Equipment Instances & Economic Ledger (M2) | Instance objects `{ uid, typeId, level }`, save migration v1->v2, append-only ledger, replay log | M1 | DONE |
| 3 | Three-Class Adjudication & Server Anti-Cheat (M3) | 3-class adjudication, 150ms grace, secret commitments, battle locking, pause/disconnect rules, dev entitlements, transfer codes, GDPR | M1, M2 | DONE |
| 4 | Dual-Client Runtime & UI Decoupling (M4) | `LocalGameClient`, `RemoteGameClient`, `AppView` decoupling, connection banner, 4-locale i18n, visual preservation (Ponytail OFF) | M1, M2, M3 | DONE |
| 5 | Final Acceptance & Adversarial Hardening (M5) | Pass 100% E2E test suite (Tiers 1-4) + Tier 5 adversarial stress testing | M1, M2, M3, M4, E2E-Track | DONE |

## Interface Contracts

### GameClient Interface
```javascript
class GameClient {
  async connect() {}
  async disconnect() {}
  async send(command, payload = {}) {} // returns Promise resolving to command response
  on(eventName, callback) {}
  off(eventName, callback) {}
  getState() {} // returns latest read-model state snapshot
  getConnectionState() {} // 'connecting' | 'online' | 'offline' | 'reconnecting'
}
```

### Command & Event Envelope Format (`protocol.js`)
```javascript
// Command Envelope
{
  cmdId: "cmd_1725321600000_abc123",
  command: "battle.selectHand",
  payload: { hand: "rock" },
  clientTime: 1725321600150,
  configVersion: "1.0.0",
  token: "jwt_or_session_token"
}

// Read-Model Event Envelope
{
  event: "battle:state",
  payload: {
    phase: "reaction",
    playerHand: "rock",
    opponentHand: "scissors",
    outcome: "win",
    playerHp: 100,
    bossHp: 650,
    toast: { key: "battle.win_round", params: { damage: 45 } }
  },
  serverTime: 1725321600200
}
```

### Schema v2 Equipment Instance Format
```javascript
// Equipment Instance
{
  uid: "eq_1725321600000_9f8a",
  typeId: "sword_flame",
  level: 1,
  acquiredAt: 1725321600000
}

// GameStore State v2
{
  version: 2,
  accountId: "acc_local_or_uuid",
  coins: 500,
  stats: { str: 5, agi: 5, vit: 5, int: 5 },
  statPoints: 0,
  equipment: {
    weapon: "eq_1725321600000_9f8a",
    head: null,
    // ... all 12 slots mapped to instance UIDs or null
  },
  inventoryEquipment: [
    { uid: "eq_1725321600000_9f8a", typeId: "sword_flame", level: 1, acquiredAt: 1725321600000 }
  ]
}
```

### Economic Ledger Format (`.jsonl`)
```json
{"id":"led_001","accountId":"acc_123","source":"battle_reward","delta":{"coins":120,"xp":50},"serverTime":1725321600000,"configVersion":"1.0.0"}
```

## Code Layout & Write Boundaries
- `src/js/kernel/`: Pure JS kernel, `protocol.js`, `LocalGameClient.js`, `GameClient.js`
- `src/js/net/`: `RemoteGameClient.js`, WebSocket networking, clock sync
- `src/js/core/`: `GameStore.js` (Schema v2, migration), `EventBus.js`
- `src/js/systems/`: Pure JS systems (`BattleSystem.js`, `QTESystem.js`, `PostBattleSystem.js`, `SoundSystem.js`, `TimerRegistry.js`)
- `src/js/services/`: `I18n.js`, `Persistence.js`
- `src/js/ui/`: `AppView.js`, UI presentation components (Ponytail strictly OFF)
- `src/styles/`: Shared CSS, tokens, responsive layouts (Ponytail strictly OFF)
- `server/`: Authoritative Node.js server (`server.js`, `GameSession.js`, `JsonStorage.js`, `Entitlements.js`, `Validator.js`, `backup.js`)
- `tests/`: Unit, dual contract, anti-cheat, deterministic replay, and E2E test suites
