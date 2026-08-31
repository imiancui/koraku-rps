# RWD Regression Log

Last reviewed: 2026-08-31.
This log indexes source/history evidence; it does not certify current browser behavior.
Read entries related to the affected component, not an unrelated full-device checklist.

## How to Use

- Distinguish a documented historical defect, a newly reproduced defect, and an unconfirmed risk.
- Cite source/history and actual reproduction evidence separately. Do not infer recurrence counts from multiple descriptions of one fix.
- For a confirmed repeat defect, record the root cause, unsuccessful approaches and side effects, update the invariant/component contract, and add a permanent guard when feasible.
- If a guard needs new infrastructure or authority, record that gap and propose the follow-up. Do not call a documentation entry a permanent fix.
- Keep existing screenshots/diagnostics owned by other work unchanged. Reverify before treating them as current acceptance evidence.

## RWD-REG-001 — Dual QTE Sequence Overflow

- Classification/status: documented historical defect; current render not reverified in this governance task.
- Source: [HANDOFF.md](../../HANDOFF.md), section 5.9 (v0.0.9).
- Surface: Stage 4 dual QTE and dojo dual-track practice.
- Documented cause: seven 68px direction tiles and 10px gaps exceeded the desktop slot width.
- Documented remedy: bounded/fluid tile and gap sizing plus container sizing.
- Invariants: RWD-G001, RWD-G006, RWD-G008 in the [baseline](responsive-spec.md).
- Guard target: maximum sequence length in both slots, affected query boundaries, touch-visible and keyboard layouts.
- Automated guard: no maintained visual-assertion gate verified; Node QTE-rule tests do not establish layout containment.
- Incorrect fixes attempted: not established; do not invent a history.
- Current evidence: no new render/screenshot collected here.

## RWD-REG-002 — Tablet Touch Controls Missing

- Classification/status: documented historical defect; current render not reverified.
- Source: [HANDOFF.md](../../HANDOFF.md), section 5.10 (v0.0.10).
- Surface: tablet QTE/dojo controls and mixed physical-keyboard input.
- Documented cause: an invalid media-query/selector construction caused Safari to discard rules.
- Documented remedy: separate valid capability queries and touch classes; early touch detection.
- Invariants: RWD-G003, RWD-G006, RWD-G008.
- Guard target: coarse/any-coarse pointers, touch-capable large viewports, physical-keyboard activation without removing touch access, single/dual QTE.
- Automated guard: no maintained cross-engine touch-visibility gate verified.
- Current evidence: historical source only; do not label a Chromium screenshot as physical iPad verification.

## RWD-REG-003 — Tablet/Short-Wide Battle Composition

- Classification/status: documented historical layout corrections; recurrence count not established.
- Source: [HANDOFF.md](../../HANDOFF.md), sections 5.11 and 5.13 (v0.0.11/v0.0.13).
- Surface: home title/menu, battle HUD/oracle, character, and dialogue.
- Documented causes: conflicting short-height placement; the dialogue's edge offsets combined with translateX(-50%); insufficient portrait composition.
- Documented remedies: scoped width/height/orientation rules, consistent centering, and separate scene/control placement.
- Invariants: RWD-G001, RWD-G003, RWD-G005, RWD-G008.
- Guard target: VP-TABLET-S/M/L and VP-DESKTOP-S, reduced landscape height, 601/721/768/780/1024/1100 boundaries where affected, orientation change, single/dual Boss.
- Existing diagnostics: scratch/test_viewports.py, scratch/test_stage4.py, and associated PNGs were present at bootstrap; not run or visually validated here.
- Automated guard: ad hoc diagnostics are not yet a verified maintained CI gate.
- Incorrect fixes attempted: no additional sequence of attempts confirmed.
- Current evidence: source/history inventory, not a fresh pass.

## Known Risks — Not Confirmed Defects

Long localization/numbers, software-keyboard occlusion, global overflow hiding, stacking/pointer interception, stale saved UI state after resize, incomplete reduced-motion coverage, and shared-selector regressions remain targeted review risks.
Historical occurrence not confirmed from repository evidence unless a specific entry above supplies that history.
Do not attribute a regression to Ponytail without evidence.

## Entry Template

For a new entry record:

- Stable RWD-REG-XXX ID, title, classification/status, first/last observed date.
- Affected screens/components, viewport/input/locale/state, and protected invariant.
- Reproduction and symptom; source-evidenced root cause.
- Correct fix; only actually attempted incorrect fixes and their side effects.
- Automated guard location/command or explicit missing guard.
- Manual/browser evidence, console, screenshots, specification/decision link.
- Remaining risk and what must not be reintroduced.
