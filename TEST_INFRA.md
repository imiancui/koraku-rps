# E2E Test Infra: Koraku RPS Online-Authoritative Refactor

## Test Philosophy
- **Opaque-box, requirement-driven**: All test cases are derived from user requirements and public game specifications (`ORIGINAL_REQUEST.md`, `OPENSPEC.md`, `HANDOFF.md`, and `wiki.md`), independent of implementation internals.
- **Dual-Client Contract Equality**: Identical contract test suites run against both `LocalGameClient` (in-process sandbox) and `RemoteGameClient` (WebSocket live server) to guarantee 100% behavioral parity.
- **Methodology**: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory & Test Coverage Mapping
| # | Feature | Requirement Source | Tier 1 (Coverage) | Tier 2 (Boundaries) | Tier 3 (Pairwise) | Tier 4 (Workloads) |
|---|---------|-------------------|:-----------------:|:-------------------:|:-----------------:|:------------------:|
| F1 | Pure Kernel & Dual-Client | R1 (Local & Remote) | 6 | 5 | ✓ | ✓ |
| F2 | 3-Class Adjudication | R2 (Timing, Secret, State) | 6 | 6 | ✓ | ✓ |
| F3 | Schema v2 & Instances | R3 ({uid, typeId, level}) | 5 | 5 | ✓ | ✓ |
| F4 | Save Migration v1 -> v2 | R3 (Backward compatibility) | 5 | 5 | ✓ | ✓ |
| F5 | Economic Ledger | R3 (Append-only .jsonl) | 5 | 5 | ✓ | ✓ |
| F6 | Deterministic Replay | R3 (Seed + Command log) | 5 | 5 | ✓ | ✓ |
| F7 | Anti-Cheat & Security | R4 (Entitlements, origin, payload) | 5 | 5 | ✓ | ✓ |
| F8 | GDPR & Transfer Codes | R4 (Export, delete, 15m transfer) | 5 | 5 | ✓ | ✓ |
| F9 | UI Decoupling & Events | R5 (AppView, read-models) | 5 | 5 | ✓ | ✓ |
| F10| 4-Locale I18n Dictionary | R5 (zh-Hant, zh-Hans, en, ja) | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Node.js built-in test runner (`node --test`).
- **Invocation**:
  - Full client test suite: `npm test`
  - Full server & anti-cheat test suite: `npm run test:server`
  - Dual contract test suite: `node --test tests/contract/*.test.js`
  - Deterministic replay suite: `node --test tests/replay/*.test.js`
  - I18n completeness suite: `node --test tests/i18n.test.js`
- **Pass/Fail Semantics**: Process exits with code 0 on complete pass; any unhandled assertion throws failure and non-zero exit code.
- **Directory Layout**:
  - `tests/unit/`: Component-level unit tests for kernel math, PRNG, and models
  - `tests/contract/`: Dual-client contract tests executing identical scenarios on Local and Remote clients
  - `tests/security/`: Anti-cheat, unauthorized cheat prevention, and timing fraud tests
  - `tests/replay/`: Seeded PRNG and battle command log deterministic replay tests
  - `tests/e2e/`: Full multi-stage gameplay progression and GDPR workflow scenarios

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full 4-Chapter Boss Progression (Online) | F1, F2, F3, F5, F7, F9, F10 | High |
| 2 | Legacy Save Import, Migration & Progression (Offline Sandbox) | F1, F3, F4, F5, F9 | High |
| 3 | Cross-Device Account Migration via 15-Minute One-Time Transfer Code | F3, F5, F7, F8 | High |
| 4 | Network Disconnection & 10-Second Grace Auto-Settlement in Active Battle | F1, F2, F7, F9 | Medium |
| 5 | GDPR Complete JSON Export followed by Irrevocable Account Deletion | F3, F5, F7, F8 | Medium |

## Coverage Thresholds
- Tier 1: ≥5 test cases per feature (Total ≥ 50)
- Tier 2: ≥5 test cases per feature (Total ≥ 50)
- Tier 3: Pairwise coverage across major feature interactions (Total ≥ 10)
- Tier 4: ≥5 realistic application-level scenarios (Total ≥ 5)
- **Minimum Target: ≥ 115 test cases across test tracks**
