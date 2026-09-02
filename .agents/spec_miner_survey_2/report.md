# Koraku RPS Online-Authoritative Refactor: Three-Class Adjudication, Timing Model, Deterministic Replay & Anti-Cheat Specification Report

> **Document Status**: Authoritative Specification Survey & Architectural Design Blueprint  
> **Author**: Specification Miner / Codebase Explorer (Survey 2)  
> **Working Directory**: `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_2`  
> **Project Root**: `D:\game-dev\New-game-project-4`  
> **Target Milestone**: Online-Authoritative Refactor (R2, R3, R4)  
> **Date**: 2026-09-03  

---

## 1. Executive Summary & Scope

This specification document provides the authoritative engineering blueprint for **Requirement 2 (Three-Class Adjudication & Timing Model)**, **Requirement 3 (Seeded Deterministic Replay & Economic Ledger Integration)**, and **Requirement 4 (Server Security, Anti-Cheat, and Architecture Governance)** of the *Koraku RPS (狐樂・絆之勝負)* online-authoritative refactor.

The core objective is to transition Koraku RPS from a client-authoritative single-player browser game into a robust, cheat-resistant, server-authoritative online architecture while preserving:
1. **Offline sandbox play** (`LocalGameClient` + `localStorage` via `?mode=offline` or offline mode).
2. **Zero DOM / Zero Node-only API leakage** in the shared pure JS game kernel.
3. **Instantaneous client-side tactile feedback** (optimistic prediction for inputs, QTE steps, and watermelon slices).
4. **Complete visual, animation, and responsive layout fidelity** (Ponytail strictly OFF for presentation layers).

---

## 2. Authoritative Specification & Codebase Sources

The findings and architectural specifications in this report were extracted and verified against:
- **`ORIGINAL_REQUEST.md`**: Master requirements for R1 through R5.
- **`HANDOFF.md` & `AI_HANDOVER.md`**: Architecture contracts, EventBus events, state machine definitions, and save schema.
- **`OPENSPEC.md` & `wiki.md`**: Gameplay mechanics, 4-stage Boss parameters, QTE directional mappings, morph timing, watermelon slicing mathematics, and theoretical DPS formulas.
- **`AGENTS.md`**: Online Authority Policies (Rules 1 to 16) and Concurrent Agent Governance.
- **`src/js/systems/`**: `BattleSystem.js`, `QTESystem.js`, `QTEInputSystem.js`, `PostBattleSystem.js`, `rpsRules.js`, `progressionRules.js`.
- **`src/js/core/`**: `GameStore.js`, `EventBus.js`, `TimerRegistry.js`.
- **`src/js/kernel/` & `src/js/net/`**: `protocol.js`, `GameClient.js`, `LocalGameClient.js`, `RemoteGameClient.js`.
- **`server/`**: `server.js`, `core/GameSession.js`, `core/Validator.js`, `core/CommandQueue.js`, `core/Entitlements.js`, `core/TransferManager.js`, `storage/JsonStorage.js`.

---

## 3. Three-Class Adjudication & Timing Model (R2)

Online game adjudication in Koraku RPS is categorized into **three distinct classes**, each with tailored latency tolerance, cryptographic guarantees, and server-side verification constraints:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THREE-CLASS ADJUDICATION MODEL                                  │
├────────────────────────────────┬───────────────────────────────┬───────────────────────────────┤
│    CLASS 1: TIMING CLAIMS      │  CLASS 2: SECRET COMMITMENTS  │    CLASS 3: STATE MUTATIONS   │
├────────────────────────────────┼───────────────────────────────┼───────────────────────────────┤
│ • QTE Inputs (Single/Dual)     │ • RPS Hand Selection          │ • Equipment Equip / Unequip   │
│ • Watermelon Blade Strike      │ • Dual-Hand Choices           │ • SP Stat Allocation          │
│ • Morph Skill Trigger (F key)  │ • Pre-reveal Intent           │ • Skill Tree Level-up         │
│                                │                               │ • Shop Purchase & Potions     │
├────────────────────────────────┼───────────────────────────────┼───────────────────────────────┤
│ Model: Optimistic Client +     │ Model: Commit-Before-Deadline │ Model: Idempotent Server      │
│ Server Audit (150ms Grace)     │ (Zero Peek-ahead Cheat)       │ Commands keyed by `cmdId`     │
└────────────────────────────────┴───────────────────────────────┴───────────────────────────────┘
```

---

### 3.1 Class 1: Timing Claims (QTE, Watermelon Strike, Morph Trigger)

#### 3.1.1 Optimistic Feedback Architecture
To ensure seamless anime-style responsive gameplay without network latency jarring the player:
- **Client Execution**: When the player presses a QTE arrow, clicks the watermelon strike button, or activates morph (<kbd>F</kbd>), the client view immediately renders visual particle bursts, triggers Web Audio cues, updates progress bars, and invokes `navigator.vibrate()`.
- **Server Audit**: The client sends a timing claim envelope `(command, payload, clientTime)` to the server. The server verifies that the claim conforms to strict physical and window boundaries before committing the state changes.

#### 3.1.2 Audit Rules & Mathematical Verification Formulas

##### A. QTE Input Sequences & Inter-Keystroke Intervals (IKI)
For a QTE sequence $S = [d_0, d_1, \dots, d_{L-1}]$ of length $L$ over duration $D_{qte}$:
1. **Sequence Order Audit**:
   $$\text{Input } i \text{ must match } S[i], \quad \text{for } 0 \le i < L$$
   If an input $d \ne S[i]$, errors increment $E = E + 1$. If $E \ge \text{maxErrors}_{\text{stage}}$, the QTE fails immediately.
2. **Window Arrival Deadline with 150ms Grace**:
   Let $T_{\text{qte\_start}}$ be the server timestamp when the QTE began. The final input must arrive at the server before:
   $$T_{\text{arrive}} \le T_{\text{qte\_start}} + D_{\text{qte}} + 150\text{ms}$$
   Where $D_{\text{qte}} = (\text{BATTLE\_RULES.qteSeconds} + \text{extraQteSeconds}) \times 1000$ (with $1.5\times$ duration for Dual QTE).
3. **Anti-Bot Inter-Keystroke Interval (IKI) Lower Bound**:
   Human physiological limits require a minimum physical interval between discrete cognitive inputs:
   $$\Delta T_{i} = t_{i} - t_{i-1} \ge \Delta T_{\text{human\_min}} \quad (\text{Threshold: } 40\text{ms})$$
   Inputs arriving with $\Delta T < 40\text{ms}$ trigger anti-macro suspicion flags.

##### B. Watermelon Slicing Triangular Waveform Position Verification
The watermelon slice marker position $P(t) \in [0, 1]$ oscillates as a symmetric triangular wave over duration $D_{\text{strike}}$ (1800ms base, accelerating by 17.5% per cut):
$$P(t) = 2 \cdot \left| \frac{t - T_{\text{start}}}{D_{\text{strike}}} - \left\lfloor \frac{t - T_{\text{start}}}{D_{\text{strike}}} + \frac{1}{2} \right\rfloor \right|$$

1. **Client Claim**: Client sends `slicePercent` claimed at `clientTime`.
2. **Server Audit**:
   - Server recomputes expected position $P_{\text{server}}(t_{\text{claim}})$.
   - Server verifies time bound: $T_{\text{start}} \le t_{\text{claim}} \le T_{\text{start}} + 3 \times D_{\text{strike}} + 150\text{ms}$.
   - Success criterion: $|P_{\text{server}}(t_{\text{claim}}) - \text{Target}| \le \text{Tolerance}_{\text{stage}}$.
   - Tolerance gradient: $\text{Tolerance}_k = 0.13 \times (0.825)^{k-1}$ for cut $k \in \{1, 2, 3\}$.

##### C. Morph Skill Window Audit
1. When hands are revealed at server time $T_{\text{reveal}}$, the reaction window opens for duration $W_{\text{reaction}}$ (Stage 1: 1000ms; Stage 2: 750ms; Stage 3: 500ms; Stage 4: 250ms).
2. The command `battle.useMorph` must arrive before:
   $$T_{\text{arrive}} \le T_{\text{reveal}} + W_{\text{reaction}} + 150\text{ms}$$
3. MP verification: Player must have $\text{playerMp} \ge \max(5, 25 - \text{morphDiscount})$.
4. Upon server acceptance, a new morph selection window is created with duration $W_{\text{morph}} = 2000\text{ms}$. Subsequent hand selection must arrive before $T_{\text{morph\_start}} + 2000\text{ms} + 150\text{ms}$.

---

### 3.2 Class 2: Secret Commitments (RPS Hand Selection)

To eliminate packet-sniffing, DOM-peeking, or memory-inspection cheats:

#### 3.2.1 Commitment Lifecycle Protocol
```
  Client                                                      Server (Authoritative)
    │                                                                   │
    │  ─── 1. BATTLE_START (stageId) ────────────────────────────────► │
    │                                                                   │ [Initializes Battle & Seed]
    │  ◄── 2. BATTLE_STATE (round=1, phase="countdown", deadline) ──── │ [Generates revealDeadline]
    │                                                                   │
    │  ─── 3. BATTLE_SELECT_HAND (hand="rock", cmdId) ───────────────► │
    │                                                                   │ [Verifies T_arrive <= deadline + 150ms]
    │                                                                   │ [Seals player's commitment in memory]
    │  ◄── 4. COMMAND_ACK (cmdId, committed=true) ──────────────────── │
    │                                                                   │
    │                                                                   │ (Countdown reaches zero)
    │                                                                   │ [Pulls Boss hand from PRNG]
    │                                                                   │ [Computes Win / Loss / Draw outcome]
    │  ◄── 5. BATTLE_STATE (phase="reaction", opponentHand="scissors") ─│
    │                                                                   │
```

#### 3.2.2 Zero-Leakage Guarantee
- **No Early Emission**: The server NEVER emits `opponentHand` or `opponentHands` during the `countdown` phase.
- **Strict Deadline Enforcement**: Any `battle.selectHand` arriving after $T_{\text{revealDeadline}} + 150\text{ms}$ is rejected with `ErrorCodes.SECRET_COMMITMENT_EXPIRED`. If no hand was committed before deadline, the server auto-commits the player's previously selected hand or defaults to `"rock"`.
- **Cryptographic Independence**: The opponent hand is generated dynamically from the crypto-seeded PRNG only at the moment of phase transition into `reaction`.

---

### 3.3 Class 3: State Mutations & Idempotent Commands

#### 3.3.1 Idempotent `cmdId` Processing
Every inbound state mutation envelope contains a client-generated UUID `cmdId`.
- The server tracks processed `cmdId`s in an LRU / Set deduplication cache per account.
- If a duplicate `cmdId` arrives (due to network retransmissions), the server returns the cached success result without re-executing state side effects (e.g., preventing duplicate gold deductions or double equipment purchases).

#### 3.3.2 Battle Session State Locking Policy
During an active combat session (`activeBattle.active === true`):
- **Locked Commands**:
  - `equipItem` $\to$ rejected with `ErrorCodes.BATTLE_IN_PROGRESS_LOCKED`
  - `unequipItem` $\to$ rejected with `ErrorCodes.BATTLE_IN_PROGRESS_LOCKED`
  - `allocateStat` $\to$ rejected with `ErrorCodes.BATTLE_IN_PROGRESS_LOCKED`
  - `allocateSkill` $\to$ rejected with `ErrorCodes.BATTLE_IN_PROGRESS_LOCKED`
- **Rationale**: Prevents runtime stat-tampering or equipment swapping mid-turn to exploit passive defense/attack bonuses.
- **Allowed In-Battle Mutations**: `battle.useItem` (consuming HP/MP potions), `battle.useMorph`, `battle.selectHand`, `battle.inputQte`, `battle.pause`, `battle.resume`, `battle.abandon`.

---

### 3.4 Battle Pause & Disconnect Handling Rules

#### 3.4.1 Strict Phase-Restricted Pause
- **Allowed Phase**: Pause is permitted **ONLY** during the `countdown` phase.
- **Disallowed Phases**: Pause during `reaction`, `qte`, `result`, or `idle` is rejected with `ErrorCodes.INVALID_PHASE_PAUSE`.
- **Battle Pause Cap**: Maximum **3 pauses** per battle session. A 4th pause request is rejected with `ErrorCodes.PAUSE_LIMIT_REACHED`.
- **Timer Continuity Invariant**: Reaction windows and QTE timers NEVER pause on the server. If a client attempts to suspend execution during QTE, the server clock continues ticking down, and the QTE fails upon deadline expiration.

#### 3.4.2 10-Second Disconnection Grace & Settlement
When a WebSocket connection drops during an active battle:
1. The server marks the session as `disconnectedAt = Date.now()` and starts a **10-second grace timer**.
2. **Reconnection within 10s**: If the client reconnects and issues `connection.reconnect` with a valid session token within 10 seconds:
   - Server re-attaches the socket to the active session.
   - Restores current battle state snapshot.
   - Clears the disconnect timer.
3. **Grace Expiration (> 10s)**: If 10 seconds elapse without reconnection:
   - Server auto-settles the battle as a defeat (`outcome: "defeat"`, reason: `"disconnect_timeout"`).
   - Grants consolation rewards (if enemy HP lost $\ge 25\%$, 10% base rewards; otherwise 0).
   - Appends the battle record to history and updates the economic ledger.

---

## 4. Deterministic Replay & Seeded RNG Architecture (R3/R4)

### 4.1 Injected Crypto-Backed RNG & Seed Management

#### 4.1.1 Cryptographic Seed Generation
At the start of each battle session, the server generates a high-entropy 128-bit hex seed:
```javascript
const battleSeed = crypto.randomBytes(16).toString("hex");
```

#### 4.1.2 Mulberry32 Deterministic PRNG Implementation
The game kernel utilizes a pure, fast 32-bit PRNG (`Mulberry32`) that runs identically on Node.js server, browser client, and Cloudflare Worker environments:

```javascript
export function createSeededRandom(seedInput) {
  let s = typeof seedInput === "number"
    ? Math.floor(Math.abs(seedInput)) || 1
    : hashSeedString(String(seedInput));

  return function random() {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t >>> 0) / 4294967296);
  };
}

function hashSeedString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}
```

#### 4.1.3 Dependency Injection in Pure Game Kernel
The `BattleSystem`, `QTESystem`, `DualQTESystem`, and `PostBattleSystem` constructors accept an optional `random = Math.random` parameter:
```javascript
export class BattleSystem {
  constructor(bus, store, random = Math.random) {
    this.bus = bus;
    this.store = store;
    this.random = random;
    this.qte = new QTESystem(bus, this.timers, random);
    this.dualQte = new DualQTESystem(bus, this.timers, random);
  }
  // ...
}
```
In server authority and replay validation, `createSeededRandom(battleSeed)` is injected. In single-player offline sandbox, `Math.random` or a local seed is used.

---

### 4.2 Deterministic Replay Log Schema

To support server-side verification, audit trails, and anti-cheat replays, every battle is recorded as an immutable log object:

```json
{
  "$schema": "https://koraku.app/schemas/battle-replay-v1.json",
  "replayVersion": 1,
  "battleId": "bat_1725321600000_3f8a9c1e",
  "accountId": "acc_user_9921",
  "stageId": 4,
  "seed": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
  "configVersion": "2026.09.03",
  "initialState": {
    "playerLevel": 10,
    "playerStats": { "maxHp": 250, "maxMp": 110, "damage": 165 },
    "allocations": { "hp": 5, "mp": 2, "damage": 7 },
    "skills": { "momo": 10, "dualHand": 1 },
    "equipment": {
      "head": "helm_fox",
      "chest": "chest_samurai",
      "mainHand": "sword_flame",
      "offHand": "shield_suzaku",
      "ring1": "ring_ruby",
      "earring1": "earring_magatama"
    }
  },
  "startTime": 1725321600000,
  "endTime": 1725321632450,
  "outcome": "win",
  "summary": {
    "rounds": 5,
    "damageDealt": 10000,
    "damageTaken": 240,
    "momoProcs": 3,
    "morphUses": 1,
    "qteHits": 7,
    "qteTotal": 7,
    "rewardCoins": 800,
    "rewardXp": 1200
  },
  "commandLog": [
    {
      "seq": 1,
      "cmdId": "cmd_1725321602100_abc123",
      "command": "battle.selectHand",
      "payload": { "hand": "rock", "slot": "left" },
      "clientTime": 1725321602100,
      "serverTime": 1725321602142
    },
    {
      "seq": 2,
      "cmdId": "cmd_1725321602105_abc124",
      "command": "battle.selectHand",
      "payload": { "hand": "scissors", "slot": "right" },
      "clientTime": 1725321602105,
      "serverTime": 1725321602144
    },
    {
      "seq": 3,
      "cmdId": "cmd_1725321608200_def456",
      "command": "battle.inputQte",
      "payload": { "direction": "up", "slot": "left", "stepIndex": 0 },
      "clientTime": 1725321608200,
      "serverTime": 1725321608235
    }
  ]
}
```

#### 4.2.1 Replay Verification Algorithm
```
Function VerifyReplay(replayLog):
  1. Instantiate fresh In-Memory Kernel with seed = replayLog.seed
  2. Set Kernel Player State to replayLog.initialState
  3. Start Battle(replayLog.stageId)
  4. For each command in replayLog.commandLog (ordered by seq):
       Kernel.ExecuteCommand(command.name, command.payload)
  5. Assert Kernel.State.outcome == replayLog.outcome
  6. Assert Kernel.State.damageDealt == replayLog.summary.damageDealt
  7. Assert Kernel.State.damageTaken == replayLog.summary.damageTaken
  8. If any assertion fails:
       Return REPLAY_TAMPERED (Discrepancy detected)
  9. Return REPLAY_VERIFIED (100% deterministic match)
```

---

## 5. Server Architecture & Anti-Cheat Governance (R4)

### 5.1 Server Module Topology

All server-specific network, session, storage, and rate-limiting modules reside strictly within `server/` and are excluded from the client production bundle:

```
server/
├── config.js                 # Server ports, CORS origins, JWT secrets, rate limits, size caps
├── server.js                 # HTTP + WebSocket server bootstrap & request dispatching
├── core/
│   ├── Auth.js               # JWT tokens, device IDs, anonymous auth
│   ├── CommandQueue.js       # Serialized per-account FIFO command executor
│   ├── ConnectionManager.js  # WebSocket registry, heartbeat, single-writer enforcement
│   ├── Entitlements.js       # Developer entitlement check for cheat commands
│   ├── GameSession.js        # Server-side authoritative player session & battle loop
│   ├── RateLimiter.js        # Token-bucket / sliding-window IP & account rate limiter
│   ├── TransferManager.js    # One-time cryptographic transfer codes
│   └── Validator.js          # Envelope schema validation, size caps, origin checks
├── net/
│   └── WsAdapter.js          # Native Node ws / WebSocket server adapter
├── storage/
│   ├── StorageAdapter.js     # Abstract persistent storage interface
│   └── JsonStorage.js        # Atomic file-backed JSON store + append-only ledger
└── scripts/
    └── backup.js             # Automated daily snapshot & database backup script
```

### 5.2 Server Security & Governance Matrix

| Security Layer | Implementation Mechanism | Threshold / Rule | Failure Action |
| :--- | :--- | :--- | :--- |
| **Origin Verification** | `Validator.validateOrigin(origin)` | Whitelist: `https://koraku.app`, `http://127.0.0.1:*`, `http://localhost:*` | 403 Forbidden / WebSocket handshake rejected |
| **Envelope Size Cap** | Max raw byte length check | Maximum 4,096 bytes (4 KB) per WebSocket message | Connection closed with `1009 Message Too Big` |
| **Rate Limiter** | Token bucket per Account / IP | Max 20 commands/sec (burst allowance: 30) | `ErrorCodes.RATE_LIMITED` + `retryAfterMs` |
| **Single-Writer Rule** | `ConnectionManager.registerConnection` | One active WebSocket writer per account ID | Older connection is gracefully superseded |
| **Dev Entitlements** | `EntitlementManager.checkEntitlement` | Requires `devEntitlement: true` signed in server JWT | `ErrorCodes.UNAUTHORIZED_CHEAT` + Audit Log |
| **One-Time Transfer** | `TransferManager.claimTransferCode` | Ephemeral `TR_XXXXXX` code, 5-minute TTL, single-use | `ErrorCodes.INVALID_TRANSFER_CODE` |
| **GDPR Export / Delete** | `ACCOUNT_EXPORT_JSON` / `ACCOUNT_DELETE` | Full JSON export & complete purge of save/ledger | Returns verified data / clears persistent storage |

---

## 6. Features Discovered & Probe Matrix

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Adjudication | QTE Input Audit | Verifies QTE sequence, step matching, and deadline with 150ms grace | `direction`, `slot`, `stepIndex`, `clientTime` | `{ ack: true, audited: true }` | `TIMING_AUDIT_FAILED` if expired | `QTESystem.js`, `GameSession.js` |
| 2 | Adjudication | Watermelon Slicing | Triangular wave position calculation and precision tolerance check | `slicePercent`, `clientTime` | `{ ack: true, extraXp: 100 }` | Rejects if minigame not active | `PostBattleSystem.js`, `wiki.md` |
| 3 | Adjudication | Morph Skill Trigger | 2.0s manual counter selection window within reaction phase | `command: "battle.useMorph"` | `{ ack: true, playerMp }` | `INVALID_SCHEMA` if MP < 25 | `BattleSystem.js`, `OPENSPEC.md` |
| 4 | Commitment | RPS Hand Commitment | Secret commitment before countdown expiration | `hand: "rock"\|"paper"\|"scissors"` | `{ ack: true, committed: true }` | `SECRET_COMMITMENT_EXPIRED` | `BattleSystem.js`, `protocol.js` |
| 5 | Progression | Idempotent Mutations | Deduplicated state mutation execution | `cmdId`, `command`, `payload` | `{ ack: true, ... }` | Replays cached result if duplicate | `GameStore.js`, `testHarness.js` |
| 6 | Governance | Battle Session Locking | Locks equipment & stat allocation during battle | `equipItem`, `allocateStat` | `{ ack: false }` | `BATTLE_IN_PROGRESS_LOCKED` | `AGENTS.md`, `GameSession.js` |
| 7 | Lifecycle | Countdown-Only Pause | Pause restricted to countdown phase (max 3 times) | `command: "battle.pause"` | `{ ack: true, pauseCount }` | `INVALID_PHASE_PAUSE` / `PAUSE_LIMIT_REACHED` | `AGENTS.md`, `BattleSystem.js` |
| 8 | Lifecycle | Disconnect Grace | 10-second auto-settlement grace period on disconnect | Socket disconnect event | `{ ok: true, restored: true }` | Settles as defeat after 10s | `AGENTS.md`, `testHarness.js` |
| 9 | Replay | Seeded PRNG Injection | Injected deterministic Mulberry32 PRNG | `seed: string\|number` | `() => float [0, 1)` | Reverts to fallback if invalid | `testHarness.js`, `rpsRules.test.js` |
| 10 | Security | Dev Entitlement | Server-gated permission check for cheat commands | `token`, `command: "cheat.*"` | `{ ack: true }` | `UNAUTHORIZED_CHEAT` | `Entitlements.js`, `server.js` |
| 11 | Data Privacy | One-Time Transfer Code | Ephemeral single-use cross-device migration token | `code: "TR_XXXX"` | `{ ack: true, imported: true }` | `INVALID_TRANSFER_CODE` | `TransferManager.js`, `GameStore.js` |
| 12 | Data Privacy | GDPR Export & Deletion | Full JSON export and complete account erasure | `account.exportJson` / `delete` | `{ ack: true, data / deleted }` | Rejects if unauthenticated | `GameSession.js`, `JsonStorage.js` |

---

## 7. Edge Cases & Anti-Cheat Boundary Analysis

| # | Feature | Input / Condition | Expected Authoritative Behavior |
|---|---------|-------------------|---------------------------------|
| 1 | Hand Selection | Packet arrives at $T_{\text{deadline}} + 180\text{ms}$ | **Rejected** with `SECRET_COMMITMENT_EXPIRED`. Server uses previously committed hand or defaults to `"rock"`. |
| 2 | QTE Input | Micro-interval $\Delta T = 5\text{ms}$ between 5 keys (Bot macro injection) | **Flagged** by IKI check ($\Delta T < 40\text{ms}$); logged to server anti-cheat monitor. |
| 3 | Battle Pause | Player sends `battle.pause` while in `reaction` or `qte` phase | **Rejected** with `INVALID_PHASE_PAUSE`. Reaction and QTE timers continue running. |
| 4 | Battle Pause | Player sends 4th pause command during countdown | **Rejected** with `PAUSE_LIMIT_REACHED`. Countdown continues to zero. |
| 5 | Equipment Mutation | Player sends `equipItem` while `activeBattle.active === true` | **Rejected** with `BATTLE_IN_PROGRESS_LOCKED`. Gear remains unchanged. |
| 6 | Network Disconnect | Player disconnects at round 3 and reconnects at $T + 7\text{s}$ | **Restored**: Server restores battle snapshot; player resumes round. |
| 7 | Network Disconnect | Player disconnects at round 3 and reconnects at $T + 12\text{s}$ | **Defeat Settlement**: Session already settled as defeat; returns settlement summary. |
| 8 | Transfer Code | Player submits transfer code `TR_ABC123` a second time | **Rejected** with `INVALID_TRANSFER_CODE` (code was deleted upon first claim). |
| 9 | Cheat Command | Non-entitled player sends `cheat.setStats` | **Rejected** with `UNAUTHORIZED_CHEAT`; security violation logged. |
| 10 | Replay Log | Attacker alters `outcome: "win"` on a battle where damage was insufficient | **Verification Failed**: Deterministic replay execution yields `outcome: "defeat"`; mismatch rejected. |

---

## 8. Verification & Test Plan

1. **Dual-Client Contract Suite (`tests/contract.test.js`)**:
   - Verify `LocalGameClient` and `RemoteGameClient` execute identical behavioral scenarios (Progression, Combat, Post-Battle Watermelon, Account Governance).
2. **Anti-Cheat & Timing Suite (`tests/anticheat.test.js` / `server/test/`)**:
   - Verify rejection of late secret commitments (> 150ms).
   - Verify rejection of pauses during reaction/QTE and pauses $> 3$.
   - Verify equipment lock during active battle.
   - Verify disconnect 10s grace timeout and auto-settlement.
   - Verify rate limiting and envelope size limits.
3. **Deterministic Replay Suite (`tests/replay.test.js`)**:
   - Execute 100 randomized battles with fixed seeds.
   - Replay logs through in-memory kernel and assert 100% exact outcome matching.
4. **4-Locale i18n Dictionary Integrity (`tests/i18n.test.js`)**:
   - Verify all 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`) contain complete dictionary entries with zero missing keys.

---

*Report compiled and verified against Koraku RPS codebase baseline.*
