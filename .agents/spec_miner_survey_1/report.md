# Koraku RPS (狐樂・絆之勝負) Online-Authoritative Refactor
## Comprehensive Specification Mining & Codebase Survey Report (Survey 1)

> **Document Type**: Architecture Survey & Specification Mining  
> **Target Project**: `D:\game-dev\New-game-project-4`  
> **Date**: 2026-09-03  
> **Baseline Version**: `v0.0.17` / Protocol `v2.0.0` / Config `2026.09.03`  
> **Status**: Verified Baseline (119/119 client tests pass, 11/11 server tests pass, 100% green)

---

## 1. Executive Summary & Architectural Overview

Koraku RPS (狐樂・絆之勝負) is refactoring from a purely client-side browser game into an **Online-Authoritative Architecture** featuring dual-client support (`LocalGameClient` for an offline sandbox and `RemoteGameClient` for an authoritative online server).

### Key Architectural Pillars:
1. **Server-Authoritative Kernel (R1)**: A pure JavaScript game kernel running identically in-process (client sandbox) or on the server (Node.js/Cloudflare Workers/Durable Objects) with zero DOM and zero platform-exclusive APIs.
2. **Three-Class Adjudication & Timing Model (R2)**:
   - *Class 1: Timing Claims* (QTE inputs, watermelon strikes, morph triggers): optimistic client UI feedback, validated server-side within a 150ms arrival grace period.
   - *Class 2: Secret Commitments* (RPS hand selections): player choice must reach server before reveal deadline; late submissions are discarded.
   - *Class 3: Inventory & State Mutations* (purchases, equipment toggles, stat allocations): idempotent commands keyed by `cmdId`, with equipment & stat allocations locked during active battles.
3. **Schema v2, Equipment Instances, & Economic Ledger (R3)**:
   - Progression and inventory upgrade from static typeId strings to server-issued instance objects `{ uid, typeId, level }`.
   - Append-only economic ledger recording source, timestamp, and configVersion for all coin, XP, item, and gear mutations.
   - Battle RNG seeds and command logs persisted for deterministic replay verification.
4. **Data Governance, Security, & Ops (R4)**:
   - Server-side Dev Entitlement check for cheat commands (offline cheat panel preserved).
   - Server-issued one-time transfer codes (`KORAKU-XXXX-YYYY`, 15-minute TTL) for cross-device progression migration.
   - GDPR-compliant JSON data export (`account.exportJson`) and complete account deletion (`account.delete`).
   - Daily automated backup with SHA-256 hash manifest verification.
5. **UI Decoupling, Localized Read-Model Feeds, & Visual Preservation (R5)**:
   - `AppView.js` decoupled from direct state mutation; dispatches intent commands and subscribes to read-model feeds.
   - Server and kernel emit zero localized text; all dialogues, toasts, and battle logs use `{ key, params }` localized client-side across 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`).
   - Connection state indicator banner (`connecting`, `online`, `offline`, `reconnecting`).
   - Ponytail rule strictly OFF for presentation files to guarantee zero visual, animation, or responsive layout regressions.

---

## 2. Core Kernel Extraction & Pure JS Boundaries

### 2.1 Existing Couplings & Mixed Elements Identified
An audit of `src/js/` revealed the following DOM / Node / localization couplings in current core/system files:

| Module | Location | Current Coupling | Required Kernel Refactor |
| :--- | :--- | :--- | :--- |
| `GameStore.js` | Lines 239, 251, 263, 268 | Returns hardcoded Traditional Chinese strings on purchase/equip errors | Return structured `{ ok: boolean, code?: string, key?: string, params?: object }` |
| `GameStore.js` | Lines 222, 234 | Direct dependency on `Persistence` (`window.localStorage`) | Take abstract storage or pure state snapshot in constructor |
| `GameStore.js` | Lines 16-30 | Inventory equipment stored as array of strings `["flame_blade"]` | Upgrade to Schema v2 instance objects `[{ uid: "eq_...", typeId: "flame_blade", level: 1 }]` |
| `BattleSystem.js` | Lines 72-103 | Calls `I18n.t("dojo.chapterName")` etc. inside `start()` | Store stage IDs and semantic keys; resolve names client-side |
| `BattleSystem.js` | Lines 130, 138 | Emits `toast` with raw Chinese strings | Emit `{ key: "ui.mustClearOnceForAuto", tone: "danger" }` |
| `BattleSystem.js` | Lines 452-458 | Emits `battle:countdown-beat` with localized words (`"剪刀"`, `"石頭"`, `"布！"`) | Emit `{ count: 3\|2\|1, key: "rps.rock"\|"rps.paper"\|"rps.scissors" }` |
| `PostBattleSystem.js` | Line 99 | Uses `performance.now()` directly | Inject `now = Date.now` time provider in constructor |
| `PostBattleSystem.js` | Lines 70, 72, 82 | Emits `dialogue` with pre-rendered `I18n.t(...)` text | Emit `{ speakerKey: "character.koraku", key: "dialogue.postBattleWin" }` |
| `Persistence.js` | Lines 56, 65, 73 | Directly accesses `window.localStorage` | Encapsulate within browser-only scope; server uses `StorageAdapter` |
| `main.js` | Lines 10-23 | Directly wires DOM views to synchronous system instances | Wire `AppView` through `GameClient` abstraction |

### 2.2 Pure JS Kernel Architecture
The pure game kernel consists of the following isolated modules:
```
src/js/
├── config/
│   └── gameConfig.js       [Pure data: stats, items, skills, stages, balance]
├── core/
│   ├── EventBus.js         [Pure pub/sub event emitter]
│   ├── TimerRegistry.js    [Pure timer management wrapping setTimeout/setInterval]
│   └── GameStore.js        [Pure state reducer & schema validator]
├── kernel/
│   ├── protocol.js         [Pure contracts: Commands, Events, ErrorCodes, Envelopes]
│   ├── GameClient.js       [Pure abstract client interface]
│   └── LocalGameClient.js  [Pure in-process client orchestration]
└── systems/
    ├── progressionRules.js [Pure math: XP curves, stat derivation]
    ├── rpsRules.js         [Pure logic: 9-combination RPS, dual RPS, counter hands]
    ├── QTESystem.js        [Pure state machine: QTE sequence, 150ms timing audit]
    ├── BattleSystem.js     [Pure state machine: combat loop, damage, status effects]
    └── PostBattleSystem.js [Pure state machine: watermelon minigame physics & rewards]
```

**Kernel Invariant**: Zero imports of `window`, `document`, `HTMLElement`, `localStorage`, `AudioContext`, `node:fs`, `node:crypto`, or `ws` in the above files.

---

## 3. Dual-Client Architecture

```
                       ┌─────────────────────────┐
                       │        AppView.js       │
                       │   (DOM / UI / Sound)    │
                       └────────────┬────────────┘
                                    │ (Commands / Read-Model Events)
                                    ▼
                       ┌─────────────────────────┐
                       │   GameClient Interface  │
                       │  send() / on() / getState│
                       └─────┬─────────────┬─────┘
                             │             │
              (?mode=offline)│             │(?mode=online)
                             ▼             ▼
       ┌────────────────────────┐       ┌────────────────────────┐
       │    LocalGameClient     │       │    RemoteGameClient    │
       ├────────────────────────┤       ├────────────────────────┤
       │ - In-Process Kernel    │       │ - WebSocket Transport  │
       │ - localStorage Sandbox │       │ - Exponential Backoff  │
       │ - Dev Entitlement ON   │       │ - Heartbeat & RTT Sync │
       │ - Zero Network Traffic │       │ - Idempotent cmdId ACK │
       └────────────────────────┘       └───────────┬────────────┘
                                                    │ (WSS Protocol)
                                                    ▼
                                        ┌────────────────────────┐
                                        │  Authoritative Server  │
                                        │   (Node.js / Cloud)    │
                                        └────────────────────────┘
```

### 3.1 `GameClient` Abstract Interface Contract
```typescript
interface GameClient {
  readonly connectionState: "offline" | "connecting" | "online" | "reconnecting" | "disconnected";
  init(): Promise<this>;
  send(command: string, payload?: object): Promise<object>;
  on(event: string, handler: (data: any) => void): () => void;
  off(event: string, handler: (data: any) => void): void;
  getState(): object;
  hasDevEntitlement(): boolean;
  destroy(): void | Promise<void>;
}
```

### 3.2 `LocalGameClient` (Offline Sandbox)
- **Lifecycle**: Synchronous bootstrap; transitions `connectionState` immediately to `ConnectionStates.OFFLINE`.
- **Storage**: Reads and writes to `localStorage` key `koraku-rps-save-v1` via `Persistence`.
- **Isolation**: Offline saves are strictly sandboxed and never synced to the authoritative server.
- **Entitlement**: `hasDevEntitlement()` always returns `true`, granting access to offline debug features.
- **Execution**: Direct synchronous dispatch of commands through local `GameStore`, `BattleSystem`, and `PostBattleSystem`.

### 3.3 `RemoteGameClient` (Authoritative Network Client)
- **Transport**: WebSocket connection with automatic endpoint discovery (`ws://` vs `wss://`).
- **Handshake Protocol**:
  1. Client sends `{ type: "handshake", protocolVersion: "2.0.0", configVersion: "2026.09.03", token, deviceId, clientTime }`.
  2. Server responds with `{ type: "handshake_ack", token, devEntitlement, state }` or `{ code: "VERSION_MISMATCH" }`.
- **Heartbeat & Clock Synchronization**:
  - Pings sent every 10,000ms with pong timeout of 5,000ms.
  - Computes 4-timestamp RTT: $\text{RTT} = (t_4 - t_1) - (t_3 - t_2)$ and clock offset $\theta = \frac{(t_2 - t_1) + (t_3 - t_4)}{2}$.
  - Exponential moving average filter ($\alpha = 0.2$).
- **Reconnection with Exponential Backoff & Jitter**:
  - Initial delay: 1,000ms, Backoff factor: 1.5x, Max delay: 30,000ms, Random jitter: 0–20%.
- **Command Dispatch & Idempotent ACK**:
  - Envelopes assigned unique `cmdId = "cmd_" + Date.now() + "_" + rand`.
  - Commands queued while disconnected and flushed automatically upon entering `ONLINE` state.
  - Per-command timeout (8,000ms) with up to 2 retry attempts.

---

## 4. Protocol & Adjudication Contracts

### 4.1 Command & Event Catalog (`protocol.js`)

#### Commands (Client -> Server / Kernel)
| Category | Command Identifier | Payload Parameters | Description |
| :--- | :--- | :--- | :--- |
| **Economy** | `buyItem` | `{ itemId: string }` | Purchase consumable potion |
| | `buyEquipment` | `{ itemId: string }` | Purchase equipment instance |
| | `equipItem` | `{ slot: string, uid?: string, itemId?: string }` | Equip gear to designated slot |
| | `unequipItem` | `{ slot: string }` | Unequip gear from slot to bag |
| | `allocateStat` | `{ stat: "hp"\|"mp"\|"damage", points: number }` | Allocate stat points |
| | `allocateSkill`| `{ skillId: "momo"\|"dualHand" }` | Learn or upgrade skill |
| **Battle** | `battle.start` | `{ stageId: number, options?: object }` | Initiate combat session |
| | `battle.selectHand` | `{ hand: "rock"\|"paper"\|"scissors", handLeft?: string, handRight?: string }` | Secret RPS hand commitment |
| | `battle.selectTarget`| `{ target: "left"\|"right"\|"main" }` | Select target in dual-boss combat |
| | `battle.useMorph` | `{ hand: string }` | Execute timing morph counter (變拳) |
| | `battle.useItem` | `{ itemId: "hpPotion"\|"mpPotion" }` | Use consumable during battle |
| | `battle.inputQte` | `{ direction: string, declaredAt: number }` | Submit directional QTE input |
| | `battle.pause` | `{}` | Pause battle (countdown only, max 3) |
| | `battle.resume` | `{}` | Resume paused battle |
| | `battle.abandon` | `{}` | Retreat from battle |
| **Auto/Post** | `autoBattle.start` | `{ stageId: number, totalRounds: number }` | Start background farming |
| | `autoBattle.stop` | `{}` | Stop autobattle |
| | `postBattle.requestSwimsuit` | `{}` | Request post-victory swimsuit scene |
| | `postBattle.startWatermelon` | `{}` | Start watermelon slicing attempt |
| | `postBattle.strikeWatermelon` | `{ declaredAt: number, cursorPosition: number }` | Strike watermelon blade |
| **Account** | `account.exportJson` | `{}` | GDPR full account data export |
| | `account.delete` | `{}` | GDPR permanent account deletion |
| | `account.issueTransferCode` | `{}` | Generate 15-minute transfer code |
| | `account.claimTransferCode` | `{ transferCode: string }` | Import progression to current device |
| **Cheat** | `cheat.setStats` | `{ level: number, skillPoints: number, coins: number }` | Dev-gated stat modification |
| | `cheat.unlockAll` | `{}` | Dev-gated content unlock |
| | `cheat.addCoins` | `{ amount: number }` | Dev-gated coin grant |

#### Events (Server / Kernel -> Client Read Model)
| Event Name | Source | Payload | Description |
| :--- | :--- | :--- | :--- |
| `store:changed` | Store | `{ reason: string, state: object }` | Player progression snapshot |
| `battle:state` | Battle | Complete battle snapshot | Active battle state machine update |
| `battle:effect` | Battle | `{ type: string, target?: string, damage?: number }` | Visual/audio FX trigger |
| `battle:damage-logged` | Battle | `{ target: string, damage: number, source: string }` | 5-slot damage log feed |
| `battle:ended` | Battle | `{ won: boolean, stage: object, rewards: object }` | Battle settlement |
| `qte:update` | QTE | `{ active: boolean, sequence: string[], index: number, ... }` | QTE arrow feed |
| `postbattle:state` | PostBattle | Complete postbattle state | Settlement & watermelon UI state |
| `postbattle:auto-watermelon`| PostBattle | `{ scene: string, watermelon: object, stock: number }` | Floating watermelon widget feed |
| `auto-battle:round-completed`| Battle | `{ round: number, won: boolean, rewards: object }` | Autobattle round feed |
| `auto-battle:summary` | Battle | `{ wins: number, losses: number, totalCoins: number }` | Autobattle finish feed |
| `toast` | Systems | `{ key: string, params?: object, tone: "info"\|"danger"\|"success" }` | Localized notification feed |
| `dialogue` | Systems | `{ speakerKey: string, key: string, params?: object }` | Localized AVG dialogue feed |
| `connection:state` | Transport | `{ state: string, details?: object }` | Connection state transition |
| `command:ack` | Transport | `{ cmdId: string, payload: object, state?: object }` | Command success acknowledgement |
| `command:rejected`| Transport | `{ cmdId: string, code: string, reason: string }` | Command error rejection |

---

## 5. Schema v2, Equipment Instances, & Economic Ledger

### 5.1 Schema v2 Structure
```json
{
  "version": 2,
  "accountId": "acc_a1b2c3d4e5f6",
  "profile": {
    "level": 1,
    "xp": 0,
    "skillPoints": 0,
    "allocations": { "hp": 0, "mp": 0, "damage": 0 },
    "skills": { "momo": 0, "dualHand": 0 }
  },
  "coins": 0,
  "inventory": { "hpPotion": 1, "mpPotion": 0 },
  "equipment": {
    "head": null, "shoulders": null, "chest": null, "belt": null, "boots": null,
    "mainHand": "eq_main_01", "offHand": null, "ring1": null, "ring2": null,
    "earring1": null, "earring2": null, "badge": null
  },
  "inventoryEquipment": [
    { "uid": "eq_main_01", "typeId": "flame_blade", "level": 1, "acquiredAt": 1772640000000 },
    { "uid": "eq_shield_02", "typeId": "suzaku_shield", "level": 1, "acquiredAt": 1772640100000 }
  ],
  "records": {
    "wins": 0, "losses": 0, "bestStage": 0, "unlockedSwimsuit": false, "unlockedGalleryAll": false,
    "clearedStages": [], "totalCoinsEarned": 0, "totalXpEarned": 0, "totalBattles": 0,
    "manualWins": 0, "manualLosses": 0, "autoWins": 0, "autoLosses": 0,
    "watermelonStock": 0, "watermelonSlices": 0,
    "consumablesUsed": { "hpPotion": 0, "mpPotion": 0 },
    "morphUses": 0,
    "recentBattles": []
  },
  "settings": { "muted": false, "musicMuted": false, "sfxMuted": false }
}
```

### 5.2 Append-Only Economic Ledger (`ledgers/<accountId>.jsonl`)
Every economic transaction appends a deterministic audit line:
```json
{"id":"led_1772640200_a1b2","accountId":"acc_a1b2c3d4e5f6","source":"stage_clear_reward","delta":{"coins":120,"xp":80},"serverTime":1772640200150,"configVersion":"2026.09.03"}
{"id":"led_1772640250_c3d4","accountId":"acc_a1b2c3d4e5f6","source":"buyEquipment","delta":{"coins":-300,"equipmentAdded":"eq_shield_02"},"serverTime":1772640250320,"configVersion":"2026.09.03"}
```

---

## 6. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Kernel | 9-Combo RPS Evaluator | Evaluates win, loss, tie across Rock, Paper, Scissors | `(handA, handB)` | `1 (win), -1 (loss), 0 (tie)` | Throws on invalid hand | `rpsRules.js` |
| 2 | Kernel | Dual-Hand RPS Evaluator | Evaluates independent dual player hands vs single/dual enemy | `([left, right], enemyHand)` | `{ outcome, wins, losses, ties }` | Validates hand shapes | `rpsRules.js` |
| 3 | Kernel | Morph Counter (變拳) | Replaces lost RPS hand with counter hand; 2s decision window, 25 MP cost | `targetHand` | Counter hand `("rock"\|"paper"\|"scissors")` | Fails if MP < 25 or phase != reaction | `BattleSystem.js` |
| 4 | Kernel | 8-Direction QTE System | Single track 4 or 8 direction QTE sequence with mistake limits | `(length, duration, mode, maxErrors)` | `qte:update`, `qte:finished` | Fails on timeout or maxErrors exceeded | `QTESystem.js` |
| 5 | Kernel | Dual-Track QTE System | Independent Left (WASD) and Right (Arrow) QTE tracks for dual bosses | `(length, duration, maxErrors)` | `qte:slot-success`, `qte:finished` | Tracks separate error thresholds | `QTESystem.js` |
| 6 | Kernel | Momo Skill Leveling & Dodge | Lv.2 unlock, 10 ranks (10%–100% trigger on ties). Boss dodge: Stg1 0%, Stg2 11%, Stg3 33%, Stg4 66% | `skillPoints` | Deals 25 damage on tie | Ignored if dodged | `skillsAndMomo.test.js` |
| 7 | Kernel | Dual Hands Unlock Skill | 100 SP skill enabling 2-hand combat mode | `skillPoints` | Enables dual-hand selection UI & rules | Locked if SP < 100 | `skillsAndMomo.test.js` |
| 8 | Kernel | 12 Equipment Slots & Synergy | Head, shoulders, chest, belt, boots, mainHand, offHand, rings(2), earrings(2), badge | `itemId, slot` | Stat boosts + 8 unique combat passives | Rejects mismatched slot | `equipment.js` |
| 9 | Kernel | 2-Handed Weapon Mutual Exclusivity | Equipping two-handed greatsword automatically unequips offHand shield | `itemId` | Unequips offHand | Auto-handled in store reducer | `GameStore.js` |
| 10 | Kernel | 3-Stage Watermelon Slicing | Post-battle minigame: 3 slice attempts, speed & tolerance shrink by 17.5% per cut | `declaredAt, cursorPosition` | +100 XP per successful cut | Misses if outside green tolerance | `PostBattleSystem.js` |
| 11 | Kernel | Battle State Persistence & Restore | Restores exact HP, MP, countdown timestamp, and dual-boss status on page reload | Snapshot object | Restored active battle | Resets cleanly if battle ended | `BattleSystem.js` |
| 12 | Net | WebSocket Handshake & Version Guard | Validates `PROTOCOL_VERSION` and `CONFIG_VERSION` upon connection | Handshake envelope | `handshake_ack` or `VERSION_MISMATCH` | Closes socket (4001) on mismatch | `RemoteGameClient.js` |
| 13 | Net | Exponential Backoff Reconnect | Auto-reconnects with exponential delay (1s–30s) + 0–20% random jitter | Drop event | Scheduled reconnect timer | Disconnects on max attempts | `RemoteGameClient.js` |
| 14 | Net | Ping/Pong Heartbeat & Clock Sync | 10s ping interval, 5s pong timeout, computes smoothed RTT and clock offset | Timestamp envelope | Smoothed `_clockOffset`, `_rtt` | Closes socket on pong timeout | `RemoteGameClient.js` |
| 15 | Net | Idempotent Command Pipeline | Assigns `cmdId`, manages ACK timeouts (8s) and retries (max 2) | Command envelope | Resolved promise or ACK rejection | Rejects with timeout error | `RemoteGameClient.js` |
| 16 | Server | Per-Account FIFO Command Queue | Chains command execution promises sequentially per account | `(accountId, envelope, handler)` | Ordered handler execution | Prevents race conditions | `CommandQueue.js` |
| 17 | Server | Dev Entitlement Cheat Guard | Restricts `cheat.*` commands to accounts with server-verified dev entitlement | `(command, devEntitlement)` | Allowed / `UNAUTHORIZED_CHEAT` | Logs audit warning to security log | `Entitlements.js` |
| 18 | Server | One-Time Transfer Code Manager | Generates formatted code `KORAKU-XXXX-YYYY` with 15-minute TTL | `accountId` | Transfer code record | Rejects expired or used codes | `TransferManager.js` |
| 19 | Server | GDPR Account Export & Deletion | Full JSON export and atomic deletion of account and ledger files | `accountId` | JSON bundle / boolean | Safe ENOENT handling | `JsonStorage.js` |
| 20 | Ops | Automated Backup & SHA-256 Manifest | Creates timestamped backup directory with SHA-256 hash manifest | Data dir path | Backup dir + manifest.json | Validates hash on restore | `backup.js` |

---

## 7. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---|---|---|
| 1 | QTE Keyboard Input | Fast simultaneous dual-direction press (e.g. `Up` + `Right`) | Synthesizes composite diagonal direction `upRight` correctly. |
| 2 | QTE Error Handling | Pressing invalid key (e.g. `Space`, `F`, `J`) or opposite key during QTE | Triggers `qte:wrong` immediately, deducts error quota, and fails if `maxErrors` exceeded. |
| 3 | QTE Input (IME Process) | Pressing keys while Windows IME is active (`event.key === "Process"`) | Resolved via physical `event.code` mapping (`KeyW`, `ArrowUp`), avoiding stuck keys. |
| 4 | Secret RPS Commitment | Submitting hand selection after countdown timer has elapsed | Server rejects command with `SECRET_COMMITMENT_EXPIRED`; previous hand used. |
| 5 | Timing Claim Grace | Submitting QTE / watermelon input with packet delay | Validated against server arrival timestamp with 150ms grace window (`TIMING_AUDIT_FAILED` if >150ms late). |
| 6 | Mid-Battle Equipment Swap | Attempting to equip/unequip gear while `battle.phase !== "idle"` | Server rejects command with `BATTLE_IN_PROGRESS_LOCKED`. |
| 7 | Mid-Battle Pause Limit | Attempting 4th pause or pausing during `reaction` / `qte` phase | Server rejects command with `PAUSE_LIMIT_REACHED` or `INVALID_PHASE_PAUSE`. |
| 8 | Disconnect During Battle | WebSocket connection drops during active combat | 10-second grace timer starts; if player does not reconnect, battle settles with current state. |
| 9 | Duplicate Equipment Purchase | Purchasing multiple copies of same equipment (e.g. 2x Flame Blade) | Allowed; multiple instances stored in `inventoryEquipment` with unique `uid`s. |
| 10 | Dual-Wield Shield Stacking | Equipping Suzaku Shield in both `mainHand` and `offHand` | Damage reduction stacks additively (30 + 30 = 60 damage reduction). |
| 11 | Genbu Armor + Shield Stacking | Equipping Genbu Armor (25 reduction) + Suzaku Shield (30 reduction) | Damage reduction stacks additively to 55 total damage reduction. |
| 12 | Frozen Hand by Frost Blade | Triggering Frost Blade passive against enemy Xiao Le | Randomly locks 1 of 3 enemy hands for the subsequent turn. |
| 13 | Cross-Device Transfer Code | Claiming an already claimed or expired transfer code | Rejection with `INVALID_TRANSFER_CODE` and user-friendly error message. |
| 14 | Rapid Multiple Connections | Same account connecting from a second tab/device | Newest WebSocket connection wins; older connection is disconnected gracefully. |
| 15 | Malformed / Giant Packet | Sending payload > 64 KB or malformed JSON to WebSocket | Server rejects with `INVALID_SCHEMA` and drops invalid socket. |

---

## 8. Test Infrastructure & Baseline Verification

### 8.1 Test Inventory Breakdown
- **Client Test Suite**: 24 test files in `tests/` comprising **119 test cases** (Node.js test runner `node --test`).
  - `tests/bundle.test.js`: Bundle bundling integrity and ES module stripping.
  - `tests/i18n.test.js`: 4-locale translation completeness (0 missing keys across all 4 languages).
  - `tests/equipmentBattleEffects.test.js`: All 8 passive gear effect simulations.
  - `tests/journeyRecordsAndDps.test.js`: 100-battle rolling cap and DPS formula precision.
  - `tests/reactionEmojiAndMorph.test.js`: Morph reaction window and decision branches.
  - `tests/stageDifficulty.test.js`: 4-chapter progression, dual-boss logic, and reward multipliers.
- **Server Test Suite**: 11 comprehensive tests in `server/test/server.test.js` (`npm run test:server`).
  - Auth, Storage, Transfers, Validation, RateLimiting, Entitlements, Queueing, Sessions, Backups, and Health endpoints.
- **Responsive Layout Verification**: Playwright test suites in `scripts/run-rwd.mjs` and `scripts/run-rwd-full.mjs` verifying Chromium, Firefox, and WebKit at 360px, 390px, 768px, 834px, 1024px, 1280px, and 1440px viewports.

### 8.2 Build & Verification Workflow
```bash
# 1. Run full unit and system test suite (119 client + 11 server)
npm test
npm run test:server

# 2. Rebuild production bundle
npm run build # (node scripts/build.mjs)

# 3. Regenerate specification Excel
npm run specs:excel

# 4. Optional responsive regression checks
npm run test:rwd:smoke
```

---

## 9. Architectural Risks & Mitigation Strategies

| Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Accidental Presentation Regression (Ponytail violation)** | Visual, layout, or animation breakage | Medium | Strictly enforce **Ponytail OFF** for all CSS (`src/styles/`), HTML (`index.html`), and DOM controllers (`AppView.js`, `HUDDragController.js`). |
| **Timing Desync in Remote QTE / Watermelon** | Player feels lag or false failure | Medium | Implement optimistic client animations with server-side 150ms grace window audit. |
| **Save Migration Data Loss (v1 -> v2)** | Player loses progression during schema upgrade | Low | Implement idempotent upgrade migration sanitizer in `GameStore` and `GameSession`. |
| **Memory Leak in Server Sessions** | Server memory exhaustion on high concurrent connections | Low | `ConnectionManager` implements 5-minute idle session auto-eviction and periodic garbage collection. |
| **Bundle Dependency Order Violation** | Standalone `bundle.js` throws `ReferenceError` | Low | Maintain strict module dependency order in `scripts/build.mjs` and verify via `tests/bundle.test.js`. |

---

## 10. Conclusion & Next Steps
The specification mining survey confirms that:
1. The pure JS game kernel boundary is clearly defined and cleanly separable from DOM and Node-only dependencies.
2. The dual-client interface (`GameClient`, `LocalGameClient`, `RemoteGameClient`) conforms to the 3-class adjudication model.
3. The existing 119 client tests and 11 server tests pass 100%, establishing a rock-solid verification baseline for the refactor.
