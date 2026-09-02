# Koraku RPS Online-Authoritative Refactor: Focus Area 3 Survey Report
**Project**: Koraku RPS (狐樂・絆之勝負)  
**Survey Focus**: Schema v2 & Equipment Instances & Economic Ledger (R3), Security/Governance/Privacy (R4), UI Decoupling & 4-Locale I18n & Connection Banner (R5)  
**Author**: Spec Miner / Codebase Explorer (`spec_miner_survey_3`)  
**Date**: 2026-09-03  
**Status**: Completed & Verified  

---

## 1. Executive Summary

This specification report details the architectural blueprint, contract definitions, data schemas, migration algorithms, and UI decoupling specifications for the three core domains of the **Koraku RPS Online-Authoritative Refactor**:
1. **Schema v2, Equipment Instances, & Economic Ledger (R3)**: Transition from typeId string references to server-issued instance objects (`{ uid, typeId, level }`), complete schema migration from Schema v1, and append-only `.jsonl` economic ledgers tracking source, server timestamp, and configVersion.
2. **Security, Governance, & Data Privacy (R4)**: Server-side Dev Entitlement gating for cheat commands, server-issued one-time 15-minute transfer codes for cross-device synchronization, and full GDPR compliance (`account.exportJson` and `account.delete`).
3. **UI Decoupling, Read-Model Feeds, 4-Locale I18n, & Connection Indicator (R5)**: Refactoring `AppView.js` to an intent-only dispatcher subscribing to read-model events, zero server-emitted text (`{ key, params }` localized client-side in `zh-Hant`, `zh-Hans`, `en`, `ja`), and a responsive Japanese shrine-themed connection state indicator banner (`connecting`, `online`, `offline`, `reconnecting`).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R3: Data Schema | Schema v2 Structure | Stores instantiated equipment instances with server-issued `uid`, `typeId`, `level`. | Schema v2 JSON payload | Normalized state snapshot | Fallback to sanitized default state if corrupted | `GameStore.js`, `HANDOFF.md` |
| 2 | R3: Migration | Schema v1 -> v2 Migration | Upgrades legacy v1 string arrays in `equipment` and `inventoryEquipment` to instance objects. | v1 Save object (`version: 1`) | v2 Save object (`version: 2`) | Idempotent upgrade, retains unequipped items | `GameStore.js`, `Persistence.js` |
| 3 | R3: Ledger | Append-Only Economic Ledger | Records every coin, XP, potion, and gear mutation with source, timestamp, and configVersion. | Mutation event & delta | Appended `.jsonl` record | Rejects missing accountId, logs disk errors | `JsonStorage.js`, `StorageAdapter.js` |
| 4 | R3: Determinism | Battle Replay Logging | Stores initial RNG seed and timestamped command log for deterministic replay audits. | Battle session log | Persisted battle record | Replay mismatch flagged as desync | `BattleSystem.js`, `protocol.js` |
| 5 | R4: Security | Server Dev Entitlement | Enforces JWT token `devEntitlement: true` check on `cheat.*` commands. | Command envelope with JWT | Execution ACK or 403 error | Emits `UNAUTHORIZED_CHEAT`, logs audit entry | `Entitlements.js`, `Auth.js` |
| 6 | R4: Security | Offline Sandbox Cheats | Retains offline cheat panel (PIN `8989`, `8-8-8-8` hotkey) via `LocalGameClient.hasDevEntitlement()`. | Local input | Instant state modification | Rejects invalid PIN | `AppView.js`, `LocalGameClient.js` |
| 7 | R4: Governance | One-Time Transfer Codes | Server issues short-lived (15 min) alphanumeric transfer codes for cross-device migration. | `account.issueTransferCode` | `{ code, expiresAt }` | Expired/used code returns `INVALID_TRANSFER_CODE` | `JsonStorage.js`, `protocol.js` |
| 8 | R4: Privacy | GDPR JSON Export | Full export of account profile, inventory, records, and economic ledger in standard format. | `account.exportJson` | `GDPR_JSON_EXPORT_V1` payload | Returns `NOT_FOUND` if account missing | `JsonStorage.js` |
| 9 | R4: Privacy | Complete Account Deletion | Permanently purges account data, economic ledger, and pending transfer codes. | `account.delete` | `{ success: true }` | Returns false if file not found | `JsonStorage.js` |
| 10 | R5: UI Decoupling | Intent-Only Dispatch | `AppView.js` dispatches commands via `client.send(cmd, payload)` without direct store mutations. | User interaction event | Async command Promise | Displays error toast on rejection | `AppView.js`, `GameClient.js` |
| 11 | R5: UI Feeds | Read-Model Subscriptions | UI renders purely based on `client.on(event, handler)` read-model updates. | Read-model events | DOM re-renders | Graceful fallback on missing data | `AppView.js`, `RemoteGameClient.js` |
| 12 | R5: Localization | 4-Locale Key Inventory | Zero plain-text emitted from server/kernel; client translates `{ key, params }` in 4 locales. | `{ key, params }` | Formatted locale string | Fallback to English/key string if missing | `I18n.js`, `tests/i18n.test.js` |
| 13 | R5: UI Banner | Connection State Banner | Header banner reflecting `connecting`, `online`, `offline`, `reconnecting`, `disconnected`. | `connection:state` event | Visual indicator & toast | Displays reconnecting attempt and countdown | `RemoteGameClient.js`, `tokens.css` |
| 14 | R5: Responsive | Mobile/Desktop Preservation | Ponytail OFF for presentation; preserves responsive layouts and Japanese shrine aesthetic. | CSS viewport queries | Zero layout regression | Violations caught in test suite | `responsive.css`, `AGENTS.md` |

---

## 3. Focus Area 1: Schema v2, Equipment Instances, & Economic Ledger (R3)

### 3.1 Current Schema (v1) vs Schema v2
In Schema v1 (`koraku-rps-save-v1`), equipment slots and inventory items are represented as raw typeId strings (e.g., `"sword_flame"` or `null`):
```json
// Legacy Schema v1
{
  "version": 1,
  "equipment": {
    "head": "helm_fox",
    "mainHand": "sword_flame",
    "offHand": null,
    "badge": "badge_bond"
    // ...
  },
  "inventoryEquipment": [
    "shield_suzaku",
    "dagger_shadow"
  ]
}
```

In **Schema v2** (`koraku-rps-save-v2`), every equipment item is a distinct, server-issued instance containing a unique identifier (`uid`), item reference (`typeId`), and item grade/level (`level`):
```json
// Schema v2 Specification
{
  "version": 2,
  "accountId": "acc_a1b2c3d4e5f6",
  "configVersion": "2026.09.03",
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
    "head": "eq_1725320000000_1001",
    "shoulders": null,
    "chest": null,
    "belt": null,
    "boots": null,
    "mainHand": "eq_1725320000000_1002",
    "offHand": null,
    "ring1": null,
    "ring2": null,
    "earring1": null,
    "earring2": null,
    "badge": "eq_1725320000000_1003"
  },
  "inventoryEquipment": [
    {
      "uid": "eq_1725320000000_1001",
      "typeId": "helm_fox",
      "level": 1,
      "acquiredAt": 1725320000000
    },
    {
      "uid": "eq_1725320000000_1002",
      "typeId": "sword_flame",
      "level": 1,
      "acquiredAt": 1725320000000
    },
    {
      "uid": "eq_1725320000000_1003",
      "typeId": "badge_bond",
      "level": 1,
      "acquiredAt": 1725320000000
    },
    {
      "uid": "eq_1725320000000_1004",
      "typeId": "shield_suzaku",
      "level": 1,
      "acquiredAt": 1725320000000
    }
  ],
  "records": {
    "wins": 0,
    "losses": 0,
    "bestStage": 0,
    "unlockedSwimsuit": false,
    "unlockedGalleryAll": false,
    "clearedStages": [],
    "totalCoinsEarned": 0,
    "totalXpEarned": 0,
    "totalBattles": 0,
    "manualWins": 0,
    "manualLosses": 0,
    "autoWins": 0,
    "autoLosses": 0,
    "watermelonStock": 0,
    "watermelonSlices": 0,
    "consumablesUsed": { "hpPotion": 0, "mpPotion": 0 },
    "morphUses": 0,
    "momoStats": { "attempts": 0, "successes": 0, "damage": 0 },
    "morphStats": { "attempts": 0, "successes": 0, "damage": 0 },
    "restoredTotal": { "hp": 0, "mp": 0 },
    "watermelonStageStats": {
      "1": { "attempts": 0, "successes": 0 },
      "2": { "attempts": 0, "successes": 0 },
      "3": { "attempts": 0, "successes": 0 }
    },
    "damageDealt": { "total": 0, "byStage": { "1": 0, "2": 0, "3": 0, "4": 0 } },
    "damageTaken": { "total": 0, "byStage": { "1": 0, "2": 0, "3": 0, "4": 0 } },
    "qteStats": {
      "totalAttempts": 0,
      "totalSuccesses": 0,
      "byStage": {
        "1": { "attempts": 0, "successes": 0 },
        "2": { "attempts": 0, "successes": 0 },
        "3": { "attempts": 0, "successes": 0 },
        "4": { "attempts": 0, "successes": 0 }
      }
    },
    "rewardsByStage": {
      "1": { "coins": 0, "xp": 0 },
      "2": { "coins": 0, "xp": 0 },
      "3": { "coins": 0, "xp": 0 },
      "4": { "coins": 0, "xp": 0 }
    },
    "stageStats": {
      "1": { "totalAttempts": 0, "manualWins": 0, "manualLosses": 0, "autoWins": 0, "autoLosses": 0 },
      "2": { "totalAttempts": 0, "manualWins": 0, "manualLosses": 0, "autoWins": 0, "autoLosses": 0 },
      "3": { "totalAttempts": 0, "manualWins": 0, "manualLosses": 0, "autoWins": 0, "autoLosses": 0 },
      "4": { "totalAttempts": 0, "manualWins": 0, "manualLosses": 0, "autoWins": 0, "autoLosses": 0 }
    },
    "recentBattles": []
  },
  "settings": {
    "muted": false,
    "musicMuted": false,
    "sfxMuted": false
  }
}
```

### 3.2 Schema v1 -> Schema v2 Migration Path
To ensure seamless upgrades for existing players without data loss:
1. **Detection**: If `candidate.version === 1` or `candidate.version === undefined`:
2. **Instance Generation Algorithm**:
   - Maintain a generated instances list `inventoryEquipment: []`.
   - Iterate through the 12 equipment slots in `candidate.equipment`:
     - If `candidate.equipment[slot]` is a string (e.g. `"sword_flame"`), generate an instance:
       `const inst = { uid: "eq_migrated_" + slot + "_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5), typeId: candidate.equipment[slot], level: 1, acquiredAt: Date.now() };`
     - Push `inst` into `inventoryEquipment`.
     - Set `equipment[slot] = inst.uid`.
   - Iterate through `candidate.inventoryEquipment`:
     - For each `item`: if string, generate instance `{ uid: "eq_migrated_inv_" + i + "_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5), typeId: item, level: 1, acquiredAt: Date.now() }` and push to `inventoryEquipment`.
     - If already an object `{ uid, typeId, level }`, validate and retain.
3. **Seed Code Dual-Compatibility**:
   - `KORAKU1_` prefixed Base64 strings are decoded and routed through `migrateV1ToV2()`.
   - `KORAKU2_` prefixed Base64 strings are decoded directly as Schema v2.
   - Newly exported seed codes use `KORAKU2_` prefix.

### 3.3 Append-Only Economic Ledger Design
To guarantee authoritative auditability and prevent economic manipulation:
1. **Ledger Record Schema**:
   ```json
   {
     "id": "led_1725320000000_a1b2c3",
     "accountId": "acc_0123456789abcdef",
     "source": "battle_reward" | "purchase_item" | "purchase_equipment" | "consume_item" | "allocate_stat" | "allocate_skill" | "watermelon_cut" | "cheat_update",
     "delta": {
       "coins": 100,
       "xp": 150,
       "items": { "hpPotion": -1 },
       "equipment": {
         "added": [{ "uid": "eq_1725320000000_1001", "typeId": "sword_flame", "level": 1 }],
         "removed": []
       }
     },
     "serverTime": 1725320000000,
     "configVersion": "2026.09.03"
   }
   ```
2. **Storage Layer**:
   - Online mode: Written via `JsonStorage.prototype.appendLedger` to `server/data/ledgers/<accountId>.jsonl`.
   - Sandbox/Offline mode: Appended locally in localStorage (`koraku-rps-ledger-v2`) or in-memory array.
3. **Deterministic Replay Logging**:
   - Each battle record written to `recentBattles` includes:
     - `battleId`: Unique battle identifier
     - `stageId`: Stage number (1 to 4)
     - `seed`: Initial RNG seed
     - `commands`: Array of `{ timestamp, cmd, payload }`
     - `outcome`: `{ won, playerHp, enemyHp, dps, rewardCoins, rewardXp }`
   - Enables server-side deterministic re-simulation for dispute resolution and anti-cheat validation.

---

## 4. Focus Area 2: Security, Governance, & Data Privacy (R4)

### 4.1 Server-Side Dev Entitlement for Cheat Commands
- **Command Whitelist**: Commands under the `cheat.*` namespace (`cheat.setStats`, `cheat.unlockAll`, `cheat.addCoins`).
- **Online Enforcement**:
  - `RemoteGameClient` attaches the signed session JWT token to each command envelope.
  - Server `EntitlementManager.prototype.checkEntitlement` verifies `payload.devEntitlement === true`.
  - If unauthorized: rejects with `ErrorCodes.UNAUTHORIZED_CHEAT` (`403 Forbidden`) and logs a structured security audit line:
    ```
    [SECURITY AUDIT] Unauthorized cheat command attempt rejected. Time: 2026-09-03T01:52:00Z, Account: acc_xxx, IP: 192.168.1.10, Command: cheat.setStats
    ```
- **Offline Sandbox Preservation**:
  - `LocalGameClient` returns `hasDevEntitlement() { return true; }`.
  - In offline mode (`?mode=offline`), the existing cheat UI with password `8989` and the `8-8-8-8` 4-key combo within 1000ms remains 100% operational for standalone local testing.

### 4.2 Server-Issued One-Time Transfer Codes
Replaces insecure client-side save injection with secure server-coordinated device handoffs:
1. **Issuance (`account.issueTransferCode`)**:
   - Device A requests a transfer code.
   - Server generates a cryptographically secure 8-character token (e.g. `KORAKU-8F3A-9B2C`).
   - Stored in `server/data/transfers/<safeCode>.json`:
     ```json
     {
       "code": "KORAKU-8F3A-9B2C",
       "accountId": "acc_0123456789abcdef",
       "issuedAt": 1725320000000,
       "expiresAt": 1725320900000,
       "used": false,
       "claimedAt": null,
       "claimedByDeviceId": null
     }
     ```
   - TTL: 15 minutes (`transferCodeTtlMs: 900000`).
2. **Claim (`account.claimTransferCode`)**:
   - Device B submits `{ code: "KORAKU-8F3A-9B2C" }`.
   - Server validates that code exists, `Date.now() < expiresAt`, and `used === false`.
   - Marks `used: true`, records `claimedAt` and `claimedByDeviceId`.
   - Issues a fresh session token for Device B bound to `accountId`.

### 4.3 GDPR-Compliant Data Governance
1. **Data Export (`account.exportJson`)**:
   - Packages full account state and line-by-line economic ledger history into a JSON payload:
     ```json
     {
       "exportMetadata": {
         "accountId": "acc_0123456789abcdef",
         "exportTimestamp": 1725320000000,
         "isoDate": "2026-09-03T01:52:00.000Z",
         "configVersion": "2026.09.03",
         "protocolVersion": "2.0.0",
         "format": "GDPR_JSON_EXPORT_V1"
       },
       "accountData": { /* full Schema v2 state */ },
       "economicLedger": [ /* full ledger records */ ]
     }
     ```
2. **Account Deletion (`account.delete`)**:
   - Permanently deletes:
     - Account data file: `server/data/accounts/<accountId>.json`
     - Economic ledger file: `server/data/ledgers/<accountId>.jsonl`
     - Any active transfer codes referencing `accountId`.
   - Returns confirmation and disconnects active WebSocket session.

---

## 5. Focus Area 3: UI Decoupling, Read-Model Feeds, & 4-Locale I18n (R5)

### 5.1 `AppView.js` Decoupling Architecture
`AppView.js` is transformed from an imperative store mutator into a pure intent dispatcher and reactive subscriber:

```
[ User Interaction in DOM ]
          │
          ▼
[ AppView.js (Intent Dispatcher) ]
          │  client.send(Commands.BUY_ITEM, { itemId })
          ▼
[ GameClient (LocalGameClient / RemoteGameClient) ]
          │
          ▼ (Process intent in Kernel or Server)
[ Read Model Events Pushed (Events.STORE_CHANGED, Events.BATTLE_STATE, etc.) ]
          │
          ▼
[ AppView.js Event Handlers ] ──► [ Update DOM Subtree Reactive Components ]
```

#### Event-to-UI Component Subscription Matrix
| Read-Model Event | Emitted Payload | Subscribing UI Handler in `AppView` | DOM Components Updated |
|---|---|---|---|
| `Events.STORE_CHANGED` | `{ reason, state }` | `renderStore(state)` | Gold/SP counters, paperdoll slots, bag grid, stats |
| `Events.BATTLE_STATE` | `BattleState snapshot` | `renderBattle(state)` | HP/MP gauges, boss bars, round oracle, hand selector |
| `Events.BATTLE_EFFECT` | `{ type, target, params }` | `playBattleEffect(effect)` | Screen shake, burn/freeze overlay, slash particles |
| `Events.BATTLE_DAMAGE_LOGGED` | `{ sourceKey, target, value }` | `addDamageLogEntry(entry)` | `#battle-damage-log-list` (FIFO 5 entries) |
| `Events.QTE_UPDATE` | `{ sequence, index, remainingMs }`| `renderQte(state)` | `#qte-overlay`, arrow sequence cards, progress gauge |
| `Events.POSTBATTLE_STATE` | `PostBattle snapshot` | `renderPostBattle(state)` | `#result-overlay`, standee lightbox, watermelon stage |
| `Events.POSTBATTLE_AUTO_WATERMELON` | `{ scene, watermelon, stock }` | `renderFloatingWatermelon(state)` | `#floating-autobattle-watermelon` widget |
| `Events.CONNECTION_STATE` | `{ state, attempt, delay }` | `updateConnectionBanner(payload)` | `#connection-status-banner` |
| `Events.DIALOGUE` | `{ speakerKey, key, params }` | `dialogueController.speak(...)` | `#dialogue-box`, avatar bounce |
| `Events.TOAST` | `{ key, params, tone }` | `showToast(key, params, tone)` | `#toast` banner notification |

### 5.2 Server & Kernel Text Localization Contract
The server and kernel emit **zero** hardcoded user-facing strings. All messages are emitted as `{ key, params }` envelopes and resolved client-side via `I18n.t(key, params)`:

#### Required 4-Locale I18n Key Inventory for Server Events
| i18n Key | `zh-Hant` | `zh-Hans` | `en` | `ja` |
|---|---|---|---|---|
| `connection.online` | 線上連線已建立 | 在线连接已建立 | Online connected | オンライン接続完了 |
| `connection.offline` | 離線沙盒模式 | 离线沙盒模式 | Offline Sandbox | オフラインサンドボックス |
| `connection.connecting` | 正在連線伺服器... | 正在连接服务器... | Connecting to server... | サーバーへ接続中... |
| `connection.reconnecting` | 連線中斷，正在嘗試第 {attempt} 次重新連線... | 连接中断，正在尝试第 {attempt} 次重新连接... | Connection lost, reconnecting (attempt #{attempt})... | 接続切断、再接続中 (試行 #{attempt})... |
| `connection.disconnected` | 連線已中斷，請檢查網路或重新整理 | 连接已中断，请检查网络或刷新 | Disconnected. Please check connection or reload. | 切断されました。接続を確認するか再読み込みしてください |
| `connection.version_mismatch` | 版本不符合，請重新整理以載入最新版本 | 版本不匹配，请刷新加载最新版本 | Version mismatch. Please refresh to update. | バージョン不一致。再読み込みして更新してください |
| `error.UNAUTHORIZED_CHEAT` | 未獲得伺服器開發者權限，作弊指令已拒絕 | 未获得服务器开发者权限，作弊指令已拒绝 | Unauthorized: Developer entitlement required for cheats. | 権限エラー：チートコマンドには開発者権限が必要です |
| `error.BATTLE_IN_PROGRESS_LOCKED` | 戰鬥進行中，無法更換裝備或配點 | 战斗进行中，无法更换装备或配点 | Cannot change equipment or allocate stats during active battle. | 戦闘中は装備の変更やステータス割り振りができません |
| `error.PAUSE_LIMIT_REACHED` | 本場戰鬥暫停次數已達上限（3次） | 本场战斗暂停次数已达上限（3次） | Battle pause limit reached (max 3 times). | 一時停止の上限（3回）に達しました |
| `error.INVALID_PHASE_PAUSE` | 僅能在出拳倒數階段暫停戰鬥 | 仅能在出拳倒数阶段暂停战斗 | Pause is only allowed during countdown phase. | 一時停止はカウントダウンフェーズ中のみ可能です |
| `error.INVALID_TRANSFER_CODE` | 轉移碼無效或已過期 | 转移码无效或已过期 | Transfer code is invalid or has expired. | 引き継ぎコードが無効または期限切れです |
| `error.SECRET_COMMITMENT_EXPIRED` | 出拳超時，未能在揭曉前送達 | 出拳超时，未能在揭晓前送达 | Hand choice arrived after reveal deadline. | 手勢の選択期限を過ぎました |
| `error.TIMING_AUDIT_FAILED` | 時機審查未通過（間隔異常或延遲過大） | 时机审查未通过（间隔异常或延迟过大） | Timing claim rejected by server audit. | タイミング判定がサーバー監査で却下されました |
| `toast.purchase_success` | 購入「{name}」！ | 购买「{name}」！ | Purchased "{name}"! | 「{name}」を購入しました！ |
| `toast.insufficient_coins` | 星砂不足，完成對局後再來吧。 | 星砂不足，完成对局后再来吧。 | Not enough Star Sand. | 星砂が足りません。 |
| `damageSource.rpsWin` | 猜拳獲勝 | 猜拳获胜 | RPS Victory | じゃんけん勝利 |
| `damageSource.morphCounter` | 變拳克制 | 变拳克制 | Morph Counter | 変拳カウンター |
| `damageSource.momo` | 摸摸偷襲 | 摸摸偷袭 | Petting Surprise | なでなで急襲 |
| `damageSource.qteCounter` | QTE 反制 | QTE 反制 | QTE Counter | QTE 反撃 |
| `damageSource.burn` | 灼燒傷害 | 灼烧伤害 | Burn Damage | 炎上ダメージ |
| `damageSource.reflect` | 鏡光反彈 | 镜光反弹 | Mirror Reflect | 八咫の反射 |
| `damageSource.thunder` | 雷霆神鳴 | 雷霆神鸣 | Thunder Strike | 雷霆の追撃 |

### 5.3 Connection State Indicator Banner Specification
1. **DOM Markup & Hierarchy**:
   ```html
   <!-- Placed directly inside <header class="game-header"> -->
   <div id="connection-status-banner" class="connection-banner state-online" role="status" aria-live="polite">
     <span class="connection-dot"></span>
     <span class="connection-label" data-i18n="connection.online">線上連線已建立</span>
     <button id="btn-reconnect-retry" class="connection-retry-btn" hidden data-i18n="ui.btnRetry">重試</button>
   </div>
   ```
2. **Visual & Theme Alignment**:
   - Follows dark Japanese shrine aesthetic:
     - `state-online`: Jade green dot (`--green: #61a985`), subtle glowing border, collapsible after 3s into a compact green header dot.
     - `state-connecting` / `state-reconnecting`: Gold pulsing animation (`--gold-bright: #ffe2a0`), amber background banner with glowing radar wave.
     - `state-offline`: Slate/ink badge (`--paper-dim: #a99e8a`) indicating sandbox mode.
     - `state-disconnected`: Crimson warning banner (`--crimson-bright: #ef5365`) with "Retry" button.
3. **Mobile Responsive Invariants**:
   - Fits seamlessly in the elastic 360px~430px header without overflowing brand title or language/audio buttons.
   - Preserves 40px minimum touch target size for the retry button.

---

## 6. Edge Cases & Boundary Conditions

| # | Feature | Input / Condition | Observed Behavior & Handling |
|---|---------|-------------------|-----------------------------|
| 1 | Schema v1 Migration | Corrupted `inventoryEquipment` containing duplicate or non-existent typeIds | `sanitizeSave()` filters unknown IDs against `EQUIPMENT_ITEMS` whitelist, assigns fresh unique UIDs. |
| 2 | Schema v1 Migration | Legacy save with two-handed sword + offHand equipped simultaneously | Unequips offHand, places offHand into `inventoryEquipment`, equips mainHand safely. |
| 3 | Transfer Codes | Code entered with lower-case letters, hyphens omitted, or extra spaces | Sanitized via `.toUpperCase().trim().replace(/[^A-Z0-9]/g, "")` before matching. |
| 4 | Transfer Codes | Concurrent attempts to claim the same code on two devices simultaneously | Atomic file read-and-rename locking guarantees first claim succeeds, second gets `INVALID_TRANSFER_CODE`. |
| 5 | Economic Ledger | High-frequency auto-battle transactions (50+ rounds in seconds) | Server queues ledger writes to append stream sequentially; `JsonStorage` guarantees atomic flush without line interleaving. |
| 6 | Dev Entitlement | Client attempts to forge `token.devEntitlement = true` in unsigned token | HMAC-SHA256 signature verification fails (`INVALID_SIGNATURE`), socket dropped, 403 returned. |
| 7 | UI Decoupling | Command sent while WebSocket connection drops mid-flight | Command queued in `_pendingCommands`; upon reconnection, re-dispatched with original `cmdId` for server idempotency. |
| 8 | UI Decoupling | Rapid clicking on Equip/Unequip buttons before previous ACK | Client dispatches commands sequentially; UI reflects optimistic local transition or locks button until ACK. |
| 9 | i18n Feeds | Server returns unregistered i18n key `{ key: "unknown.event" }` | `I18n.t` returns fallback string `"[unknown.event]"` without throwing exception or breaking UI. |
| 10 | Connection Banner | Fast connect-disconnect fluttering within 200ms | Exponential backoff timer with jitter dampens reconnect requests; banner debounces state transitions. |

---

## 7. Verification Method & Evidence

1. **Test Suite Execution**:
   - `npm test`: Runs the 119 native Node.js tests validating `GameStore`, `I18nService`, `DualQTESystem`, `progressionRules`, `rpsRules`, and `saveSeed`.
   - Verified result: **119/119 passing (100% Pass, duration ~9.3s)**.
2. **I18n Dictionary Validation**:
   - Verified that `tests/i18n.test.js` tests all 4 languages (`zh-Hant`, `zh-Hans`, `en`, `ja`) for dictionary completeness, interpolation, and changelog data.
3. **Storage & Contract Inspection**:
   - Inspected `server/storage/JsonStorage.js`, `server/core/Auth.js`, `server/core/Entitlements.js`, `src/js/kernel/protocol.js`, `src/js/kernel/GameClient.js`, and `src/js/net/RemoteGameClient.js` for architectural conformity.
