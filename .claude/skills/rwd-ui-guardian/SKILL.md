---
name: rwd-ui-guardian
description: >-
  Guard Koraku RPS (New-game-project-4) responsive UI changes and reviews.
  Select viewport, game-state and input-mode checks for HUD/QTE/overlays,
  resize, localization and animation shifts; assess verification evidence.
  Not for other projects, functional-only work, or choosing visual direction.
---

# Koraku RPS RWD Guardian

Turn existing project contracts into a change-specific impact map, a risk-based verification plan, and an evidence-backed verdict. This is an instruction-only skill, not a browser engine, CI gate, or permission to modify the game.

## Scope and Authority

1. Resolve the target game directory from the task and these project-relative links, not from the enclosing Git root. Confirm `package.json` names `koraku-rps` and that the linked project instructions/specification exist. Do not assume the current shell directory is the game root.
2. If the target is another project, report `NOT_APPLICABLE` and stop this skill's workflow. Do not install or apply Koraku rules globally.
3. Preserve the user's requested mode. Read-only/report-only work does not authorize edits, builds, installation, or deployment. For a strict no-file-write request, use source review and existing evidence; do not create screenshots or test files.
4. For an authorized repair, carry this skill's checks into the project's approved OpenSpec apply workflow. The skill itself neither grants implementation authority nor adds a second approval gate to already authorized work.

Read the [project instructions](../../../AGENTS.md), [UI/RWD baseline](../../../docs/ui/responsive-spec.md), and relevant [regression history](../../../docs/ui/rwd-regression-log.md).
Read applicable nested AGENTS.md files and the affected requirements in [OPENSPEC.md](../../../OPENSPEC.md).
When a behavior change is involved, resolve its planning home with `openspec context --json`; a workspace fallback is not authorization to edit sibling games.
Use the [skill-routing policy](../../../docs/engineering/skill-routing.md) when selecting companion capabilities. Reuse its roles and the baseline's invariant/viewport IDs; do not copy their catalogs into this skill or invent a parallel policy.

## When to Apply

Apply when the task changes or reviews responsive layout, breakpoint/cascade behavior, orientation/resize, HUD/QTE/overlay geometry, input-dependent control visibility, animation displacement, or text/localization that can change layout.
A shared class or small text edit can still have responsive impact: determine that impact from its consumers.
Skip unrelated functional logic, balance formulas, serialization, non-visual tooling, routine documentation, and aesthetic direction. Responsive aspects of new UI or redesign remain in scope.

## 1. Build the Impact Map

Inspect the actual source and task diff before selecting checks.

- Trace affected selectors and handlers through root HTML, the CSS load order, AppView, and any other real consumers. Media queries are not confined to responsive.css.
- Include single/dual battle and dojo consumers of shared QTE or HUD styles. Include the standalone wiki only when its independent UI is affected.
- Check width, height, orientation, pointer/any-pointer, touch capability, keyboard classes, and JS sizing together.
- Identify the expected behavior's source: approved requirement, observed implementation, historical report, or unresolved decision. Observed output or completed task checkboxes alone do not establish correctness.
- Summarize only relevant fields: source/surface, shared consumers, state/locale, viewport/query/input, protected invariant, and planned evidence. Explain exclusions of plausibly affected variants.

Preserve unrelated work. A changed file or old screenshot may belong to another task; record the version/state examined instead of claiming it as this task's output.

## 2. Select the Smallest Sufficient Coverage

Use the baseline's risk tiers and current viewport dimensions, not a fixed full-device checklist.

| Changed area | Include these checks when affected |
| --- | --- |
| Shared layout or breakpoint | Phone/tablet/desktop consumers; threshold - 1px, exact threshold, threshold + 1px; intersections with height/orientation queries; resize in the same loaded page |
| Battle composition | Single and dual Boss, relevant portrait/short-landscape layouts, player HUD, oracle, dialogue, damage log, withdrawal and hand controls |
| Shared QTE UI or input visibility | Actual single/dual QTE states and dojo; maximum configured sequences; independent left/right progress; touch pad, swipe, keyboard and hybrid use |
| Animation or transient class | Before/during/after the affected animation, state/class cleanup, rapid repeated triggers, preserved viewport-specific anchor; reduced-motion behavior where applicable |
| Overlay or floating panel | Open/close/focus/scroll containment, reachable actions, software keyboard and safe areas; auto-battle pause/resume while watermelon is present |
| Text, records or navigation | Four relevant locale outputs, longest labels/unbroken content, realistic large values/lists; saved screen/tab/filter and back/refresh transitions when affected |

A page opened at a tablet-sized viewport is not necessarily touch-enabled. Verify actual browser capability configuration and runtime control visibility.
Entering Stage 4 is not proof that dual QTE was tested. Establish the requested state from current DOM/system evidence before assertions or screenshots.
A pair of fresh pages at different sizes is not a runtime resize/orientation test.
Do not expand a local repair into every screen/state combination without an impact reason.

## 3. Preserve Game-Specific Intent

- Keep the approved shrine theme, composition and interaction. Use ui-ux-pro-max only for a concrete UX decision; do not invoke frontend-design to repair RWD.
- Ponytail remains OFF for presentation. Do not remove wrappers, replace controls, shrink required text, or drop motion/interactions merely to shorten code.
- Absolute-positioned scenes and deliberate decorative clipping are legitimate here. Never use root overflow hiding or unexplained offsets/specificity/z-index changes to conceal inaccessible content.
- Distinguish painted character content from transparent image canvas. Do not fail a layout merely because decorative image rectangles overlap; inspect the approved composition and actual content/control visibility.
- Check required controls for real reachability and input interception, not just visible pixels or bounding boxes. Keyboard focus must remain visible/reachable in the applicable state.
- Animation checks protect the approved anchor, not one hard-coded transform formula on every viewport. A stopped animation can hide the very regression being investigated.
- Do not remove QTE swipe input because generic web guidance discourages horizontal gestures. Preserve the game's approved touch and keyboard alternatives.
- Treat conflicting zoom and touch-target requirements from the baseline as `NEEDS HUMAN DECISION`. Do not silently change behavior or interpret an exception as accessibility compliance.

## 4. Obtain Evidence Safely

Use webapp-testing or an available platform browser capability when testing is authorized. Follow that capability's own instructions; do not invent tool syntax, ports, or runtime dependencies.

- Inspect the existing scripts before execution: `npm run dev` / `npm start`, `npm test`, and build commands can write the bundle. `npm run specs:excel` writes the workbook. They are not read-only probes.
- Do not enable Tailscale/network sharing, install dependencies, overwrite saves, or change release/version state merely to gather evidence.
- For allowed browser diagnostics, use disposable storage and a verified local route to the intended artifacts. Keep evidence in an authorized output location and clean up only processes/contexts created by this task.
- Attach console and page-error collection before reproduction. New application errors are blocking; retain baseline errors separately.
- Stabilize or record the game phase, progress, randomness/time, fonts/assets and animations as appropriate. Do not modify production behavior to manufacture a passing test.
- Check containment of required content, allowed component scrolling, relevant click/touch and keyboard behavior, and the selected state transitions. A successful screenshot command alone is not an assertion.
- Existing scratch scripts/screenshots are diagnostic material, not automatically a maintained guard. Inspect their assumptions and coverage before reuse; never overwrite another task's evidence.
- If the runtime cannot exercise a case, mark it `NOT_RUN` with the limitation. Chromium size emulation does not certify touch or physical iPad behavior; browser emulation does not certify hardware safe-area/keyboard behavior.

## 5. Report the Verification Verdict

Use a short result table or list. For each required case record its surface/state, viewport/input/locale, result, evidence level, and evidence reference or missing check.

- Results: `PASS`, `FAIL`, `NOT_RUN`, or `NOT_APPLICABLE` with a reason.
- Evidence levels: `source-reviewed`, `browser-emulated`, or `real-device`. Keep the level separate from the result.
- A source-review PASS is not a rendered PASS. Missing required rendered checks prevent an overall responsive-verified claim.
- Use `NEEDS HUMAN DECISION` for unresolved expected behavior; do not invent a passing criterion.
- Without rendered verification, state exactly: `Responsive status: code-reviewed but not visually verified.`
- With partial evidence, state exactly what was tested and what remains unverified. Never label the game fully tested or permanently fixed from a subset of cases.
- On a confirmed repeat defect, identify the protected invariant and needed permanent guard. Update the regression log only when documentation edits are authorized; otherwise include the proposed entry in the report.
- If automation or a fix needs new scope/authority, explain that boundary and request it. Do not bootstrap a framework, change product rules, or claim this instruction file itself provides automated regression protection.
