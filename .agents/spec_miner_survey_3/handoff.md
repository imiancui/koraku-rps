# Handoff Report: Koraku RPS Online Refactor Spec Mining (Focus Area 3)

**Agent ID**: `spec_miner_survey_3`  
**Working Directory**: `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3`  
**Parent Conversation ID**: `c7630716-50df-4080-829c-564e1bbc4ecf`  
**Handoff Type**: Hard (Task complete)  
**Date**: 2026-09-03  

---

### 1. Observation

1. **Test Suite Execution**:
   Command `npm test` executed in `D:\game-dev\New-game-project-4`:
   ```
   ℹ tests 119
   ℹ suites 0
   ℹ pass 119
   ℹ fail 0
   ℹ cancelled 0
   ℹ skipped 0
   ℹ todo 0
   ℹ duration_ms 9387.0333
   ```
   All 119 tests passed with zero failures.

2. **Schema & Persistence Contracts**:
   - `src/js/core/GameStore.js` (lines 5–93): `DEFAULT_SAVE` defines `version: 1`, `equipment` (12 slot map to typeId strings/null), and `inventoryEquipment` (array of strings).
   - `src/js/services/Persistence.js` (lines 8, 15, 24–28): Seed codes use `KORAKU1_` prefix and Base64-encoded JSON.
   - `server/storage/JsonStorage.js` (lines 113–128): `appendLedger(accountId, entry)` writes `.jsonl` lines containing `{ id, accountId, source, delta, serverTime, configVersion }`.
   - `server/storage/JsonStorage.js` (lines 186–204): `exportAllAccountData(accountId)` exports `{ exportMetadata, accountData, economicLedger }` formatted as `GDPR_JSON_EXPORT_V1`.
   - `server/storage/JsonStorage.js` (lines 71–111): `deleteAccount(accountId)` irrevocably deletes account file, ledger file, and transfer records.

3. **Security & Entitlements**:
   - `server/core/Entitlements.js` (lines 7–52): Whitelists cheat commands (`cheat.setStats`, `cheat.unlockAll`, `cheat.addCoins`); verifies `devEntitlement === true` or returns `ErrorCodes.UNAUTHORIZED_CHEAT` and logs `[SECURITY AUDIT]`.
   - `src/js/kernel/LocalGameClient.js` (lines 25–27): In offline sandbox, `hasDevEntitlement()` returns `true`.

4. **UI Decoupling & Localization**:
   - `src/js/kernel/protocol.js` (lines 11–48): `Commands` and `Events` define all intent commands and read-model event feeds.
   - `src/js/services/I18n.js` (lines 12–22): Supports 4 locales (`zh-Hant`, `zh-Hans`, `en`, `ja`) with fallback to `en`.
   - `src/styles/tokens.css` (lines 1–28): Deep background `--ink-950: #080a10`, gold `--gold: #d8b66a`, crimson `--crimson: #b52537`.

---

### 2. Logic Chain

1. **Schema v2 Instance Model**:
   - *Observation*: Schema v1 uses raw string IDs (`"sword_flame"`), preventing per-instance properties (level, enchantments, uniqueness).
   - *Reasoning*: Upgrading `inventoryEquipment` to `[{ uid, typeId, level, acquiredAt }]` and `equipment` to slot-to-UID mappings enables server-issued instance tracking.
   - *Deduction*: Migration logic must detect `version === 1`, generate deterministic UIDs for all equipped and bag items, and bump version to 2 while preserving save integrity.

2. **Economic Ledger & Replay Auditing**:
   - *Observation*: `JsonStorage.prototype.appendLedger` uses append-only `.jsonl` logging.
   - *Reasoning*: Pairing every economic change (purchase, reward, consumption) with an appended delta record ensures complete auditability. Persisting initial RNG seed and timestamped command logs in battle records enables deterministic server re-simulation.

3. **Security & GDPR Privacy**:
   - *Observation*: Dev entitlement checks in `Entitlements.js` reject unauthorized cheat requests online, while `LocalGameClient.js` allows them in offline sandbox.
   - *Reasoning*: This separates online competitive integrity from local debugging/sandbox testing.
   - *Deduction*: Server-managed 15-minute transfer codes replace insecure client-side save imports for online play, and `account.exportJson` / `account.delete` provide full GDPR compliance.

4. **UI Decoupling & Read-Model Subscriptions**:
   - *Observation*: `AppView.js` currently invokes mutations directly on `GameStore` and `BattleSystem`.
   - *Reasoning*: Refactoring `AppView.js` to dispatch commands via `client.send()` and re-render only in response to read-model events (`store:changed`, `battle:state`, `connection:state`) cleanly decouples presentation from execution.
   - *Deduction*: Adhering to the rule that server/kernel emit only `{ key, params }` ensures zero hardcoded text leaks and complete 4-locale localization across `zh-Hant`, `zh-Hans`, `en`, and `ja`.

---

### 3. Caveats

- **Active Battle Equipment Lock**: Confirmed assumption that equipment changes and stat allocations are rejected with `BATTLE_IN_PROGRESS_LOCKED` while a battle session is in active/countdown/reaction/qte phases.
- **Replay Precision**: Deterministic replay relies on seeded crypto RNG and recorded command timestamps; clock drift is handled via client-server clock offset sync.

---

### 4. Conclusion

All specifications, data schemas, migration algorithms, security models, data privacy workflows, UI decoupling contracts, i18n inventories, and responsive connection banner requirements for **Focus Area 3 (R3, R4, R5)** have been probed, verified against the codebase, and documented in detail in `report.md`.

---

### 5. Verification Method

To independently verify the evidence and findings:
1. **Run Core Test Suite**:
   ```bash
   npm test
   ```
   *Expected Output*: 119 passing tests (100% Pass) covering i18n completeness, save seeds, battle rules, and stats.
2. **Inspect Survey Report & Artifacts**:
   - `D:\game-dev\New-game-project-4\.agents\spec_miner_survey_3\report.md`
   - `D:\game-dev\New-game-project-4\src\js\kernel\protocol.js`
   - `D:\game-dev\New-game-project-4\server\storage\JsonStorage.js`
   - `D:\game-dev\New-game-project-4\server\core\Entitlements.js`
   - `D:\game-dev\New-game-project-4\src\js\services\I18n.js`
