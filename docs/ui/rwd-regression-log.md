# RWD Regression Log

Last reviewed: 2026-09-02.
This log indexes source/history evidence; it does not certify current browser behavior.
Read entries related to the affected component, not an unrelated full-device checklist.

## How to Use

- Distinguish a documented historical defect, a newly reproduced defect, and an unconfirmed risk.
- Cite source/history and actual reproduction evidence separately. Do not infer recurrence counts from multiple descriptions of one fix.
- For a confirmed repeat defect, record the root cause, unsuccessful approaches and side effects, update the invariant/component contract, and add a permanent guard when feasible.
- If a guard needs new infrastructure or authority, record that gap and propose the follow-up. Do not call a documentation entry a permanent fix.
- Keep existing screenshots/diagnostics owned by other work unchanged. Reverify before treating them as current acceptance evidence.

## Final-source supersession — seventh-round approval

- Current product source is identified by bundle SHA-256 `69919fb879995a299934f1a91b2a8a752de2abba722b2c169365100b5b2bd3cd` and responsive CSS SHA-256 `32591787e64260221c46a39794a49c10eda9d9c9c68bb7b31c0d675c48cc7787`.
- Same-source cross-engine repeat evidence: `npm run test:rwd:repeat` completed with Smoke3 (30/30 x 3) and Full2 (2,286/2,286 x 2 across Chromium 808, Firefox 739, WebKit 739), 0 retries, 0 issues, code 0 (`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-repeat-7mE7Sl`).
- The user explicitly approved all 61 seventh-round candidates; maintained visual comparison passed 61/61 without baseline updates.
- The current golden tree SHA-256 is `9fa0cbeb9c71a70425babafd6df5564467e0c8f66188202c453a298aaf30ba0f`. Per-case 1700/3000 text-raster bounds have a negative control: unchanged states pass 2/2 and a 12px card shift fails 2/2 at 16031/19748 pixels (`C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-0J6dxl`).
- Split evidence contract: Chromium trusted native touch-pan; Firefox/WebKit touch-capable layout with real wheel for content reachability (`nativeTouchPan:false`); manual pointer for app swipe handlers (`trusted:false`). WebKit is desktop browser emulation, NOT physical Safari/iPad.
- Entries below retain historical Red/attempt chronology. Real devices, software keyboards, hardware safe areas, browser zoom, and OS font scaling remain unverified.

## RWD-REG-001 — Dual QTE Sequence Overflow

- Classification/status: documented historical defect; its maximum-sequence containment and independent-track invariants are reverified on the final local Chromium source, without claiming a new historical recurrence.
- Source: [HANDOFF.md](../../HANDOFF.md), section 5.9 (v0.0.9).
- Surface: Stage 4 dual QTE and dojo dual-track practice.
- Documented cause: seven 68px direction tiles and 10px gaps exceeded the desktop slot width.
- Documented remedy: bounded/fluid tile and gap sizing plus container sizing.
- Invariants: RWD-G001, RWD-G006, RWD-G008 in the [baseline](responsive-spec.md).
- Guard target: maximum sequence length in both slots, affected query boundaries, touch-visible and keyboard layouts.
- Automated guard: maintained Stage B/Smoke/sweep geometry and interaction guards cover battle7-key and dojo5-key single/dual consumers; the approved visual lane covers selected layouts. Node tests remain logic-only evidence.
- Incorrect fixes attempted: not established; do not invent a history.
- Current evidence: final Stage B140/140, stress-input14/14, sweep400/400 and approved visual61/61; evidence roots are listed in the supersession section.

## RWD-REG-002 — Tablet Touch Controls Missing

- Classification/status: documented historical defect; touch/hybrid visibility and interaction are reverified in Chromium emulation, not on physical iPad/Safari.
- Source: [HANDOFF.md](../../HANDOFF.md), section 5.10 (v0.0.10).
- Surface: tablet QTE/dojo controls and mixed physical-keyboard input.
- Documented cause: an invalid media-query/selector construction caused Safari to discard rules.
- Documented remedy: separate valid capability queries and touch classes; early touch detection.
- Invariants: RWD-G003, RWD-G006, RWD-G008.
- Guard target: coarse/any-coarse pointers, touch-capable large viewports, physical-keyboard activation without removing touch access, single/dual QTE.
- Automated guard: boundary, Smoke, Stage B and stress-input record actual `hasTouch`/pointer capability plus tap/swipe/keyboard results. Cross-engine and physical-device guards remain NOT_RUN.
- Current evidence: final Chromium boundary39/39, stress-input14/14 and Stage B140/140; do not label these physical iPad verification.

## RWD-REG-003 — Tablet/Short-Wide Battle Composition

- Classification/status: documented historical layout corrections; final-source Chromium protection is Green, while recurrence count remains unclaimed.
- Source: [HANDOFF.md](../../HANDOFF.md), sections 5.11 and 5.13 (v0.0.11/v0.0.13).
- Surface: home title/menu, battle HUD/oracle, character, and dialogue.
- Documented causes: conflicting short-height placement; the dialogue's edge offsets combined with translateX(-50%); insufficient portrait composition.
- Documented remedies: scoped width/height/orientation rules, consistent centering, and separate scene/control placement.
- Invariants: RWD-G001, RWD-G003, RWD-G005, RWD-G008.
- Guard target: VP-TABLET-S/M/L and VP-DESKTOP-S, reduced landscape height, 601/721/768/780/1024/1100 boundaries where affected, orientation change, single/dual Boss.
- Existing diagnostics: scratch/test_viewports.py, scratch/test_stage4.py, and associated PNGs were present at bootstrap; not run or visually validated here.
- Automated guard: maintained boundary39/39, sweep400/400, Stage B140/140 and approved visual61/61 replace the ad hoc scripts as local evidence; CI and real devices remain absent.
- Incorrect fixes attempted: no additional sequence of attempts confirmed.
- Current evidence: fresh same-source Chromium evidence is listed in the supersession section; the old scratch diagnostics remain historical only.

## RWD-REG-004 — Tablet/Compact Battle Control Clipping

- Classification/status: formally reproduced before repair, repaired locally and included in the user-approved seventh-round Chromium golden.
- Initial evidence: [investigation](../../../openspec/changes/koraku-rwd-contract-regression-gate/investigation.md), 2026-09-01, IAB browser emulation on the original working tree; the later aa97c87 backup retained the examined source bytes.
- Surface/state:768x1024, Stage1 single-hand countdown and actual dojo single dummy; player HUD/items/hand selector.
- Measurement: player HUD/left cluster x=-79.5,width175; hand selector x=-87.5,width175; document scrollWidth/clientWidth both768.
- Source-evidenced cause: the601–1024 portrait/13:10 rule retains translateX(-50%), while the<=780 override changes left to8px and width to175px. The translated ancestor also changes the fixed hand selector's containing block.
- Protected invariants: RWD-G001/G003/G005/G008. Preserve the approved phone/tablet/desktop contracts; do not add root overflow hiding, arbitrary offsets or new specificity escalation.
- Correct repair: remove the conflicting translated containing block from compact portrait control placement, keep player HUD/quick slots/hand selectors in explicit layout regions, and verify shared battle/dojo consumers without root overflow hiding or z-index escalation.
- Incorrect approaches actually encountered: early candidate rounds over-compressed or misplaced character/control regions; human REJECT feedback was preserved and folded into shared composition rules rather than accepted as baseline.
- Infrastructure: [shared audit](../../e2e/rwd/layout-audit.js), calibrated by 45 fixtures and 8 actual-app probes, plus maintained Stage B and Stage C lanes.
- Formal evidence: pre-repair `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-7vssNZ`; current Stage B140/140 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-quAwld`; current visual61/61 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-dgmgpd`.
- Transition: 44 executable FAIL→PASS, 35 executable PASS→PASS, 0 remaining executable FAIL. Candidate-generation cases remain a separate human-review concern.

## Known Risks — Not Confirmed Defects

Long localization/numbers, software-keyboard occlusion, global overflow hiding, stacking/pointer interception, stale saved UI state after resize, incomplete reduced-motion coverage, and shared-selector regressions remain targeted review risks.
Historical occurrence not confirmed from repository evidence unless a specific entry above supplies that history.
Do not attribute a regression to Ponytail without evidence.

## RWD-REG-005 — Save Modal Competing Scroll Owners

- Classification/status: reproduced, repaired and reverified in the user-approved seventh-round Chromium visual/source set.
- Surface/state: save-record modal at 1440×900, `zh-Hant`, mouse/keyboard; the reset-save action was below the visible content pane.
- Root cause: `.save-record-card` declared `overflow: hidden` before the later generic `.modal-card { overflow-y: auto; }`; equal specificity let the generic rule re-enable outer-card scrolling while `.save-record-content` was also scrollable.
- Correct fix: the later `.modal-card.save-record-card` rule restores one owner by keeping the outer card hidden and the content pane vertically scrollable. No root overflow hiding, `!important`, new breakpoint, removed content, or text shrinking was added.
- Incorrect attempts: the first Stage C smoke used the content pane's geometric center for a wheel action, which landed on the nested save-code textarea and did not exercise the intended owner; the guard now targets content padding and distinguishes content that already fully fits.
- Automated guards: `npm run test:rwd:smoke` covers save open/end reachability at five core viewports; `npm run test:rwd:boundary` checks the single-owner invariant around 480px and runtime/boundary consumers.
- Evidence: Smoke 30/30 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-n4LWJk`; boundary 39/39 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-tdDGa0`.
- Final-source evidence: boundary39/39 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-V41GG0` and visual61/61 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-dgmgpd`; real keyboard/safe-area evidence remains NOT_RUN.

## RWD-REG-006 — 720px Dojo Dual-Control Clipping

- Classification/status: reproduced, repaired and included in the user-approved seventh-round Chromium visual/source set.
- Surface/state: touch dojo dual QTE at height 720 and sampled widths 320–760; the eight-direction control wrapper lost 4.8–41.6px at the viewport bottom.
- Root cause: the mobile dojo retained desktop vertical padding and 20px content gaps while its title wrapped more at narrow widths; the fixed gameplay screen correctly refused page scrolling, leaving the final control row outside the stage.
- Correct fix: at the already declared 780px height boundary, compact only dojo screen/track padding and content gaps. Controls remain at least 40px, all content remains present, and gameplay is not converted into a scroll surface.
- Automated guard/evidence: `npm run test:rwd:sweep`; 16 initial FAIL cases in `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-pW9HcX`, then 400/400 PASS in `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-UhtE59`.

## RWD-REG-007 — Medium-Width Quick Slots / Dialogue Label Overlap

- Classification/status: reproduced, repaired and included in the user-approved seventh-round Chromium visual/source set.
- Surface/state: single-Boss countdown at sampled widths 800–960, heights 900/720; `.quick-slots` sample points were intercepted by `#dialogue-speaker`.
- Root cause: existing tablet and short-height partitions left only the dialogue body's clearance, but did not reserve the speaker label's upward protrusion.
- Correct fix: increase the existing tablet/short-height bottom reservation for the player control cluster and matching hand selector. The dialogue and controls remain in separate partitions; no z-index escalation or content removal was used.
- Automated guard/evidence: 11 initial FAIL cases in the first sweep, representative repairs 3/3, final `npm run test:rwd:sweep` 400/400 PASS at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-UhtE59`.

## RWD-REG-008 — Long Text and Records Nested Scroll

- Classification/status: reproduced, repaired and included in the user-approved seventh-round Chromium visual/source set; browser zoom/OS font scaling remain NOT_RUN.
- Surfaces: home menu/title and records 100-battle list under four locales, unbroken text, large values and maximum injected list content.
- Root causes: home labels lacked a long-token wrapping policy; mobile title inherited desktop `nowrap`; the recent-battles wrapper retained its own 380px vertical scroll inside the already scrollable records screen.
- Correct fixes: allow long menu tokens and mobile title text to wrap without shrinking; remove the recent-list scroll owner so the content screen reaches all 100 rows. Required content remains present and readable.
- Automated guard/evidence: `npm run test:rwd:stress-content`, final 27/27 PASS at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-ccmagJ`; computed font ratios verify 125/150/200% targeted injection. Browser zoom/OS font scaling remain explicitly NOT_RUN.

## RWD-REG-009 — Dual QTE Tap Routing and Cross-Track Debounce

- Classification/status: reproduced, repaired and reverified on the final source with Node and Chromium hybrid-input evidence.
- Surfaces: battle and dojo dual QTE under hybrid touch-plus-keyboard capability.
- Root causes: dojo pad buttons live under `#dojo-dual-qte-pad-wrap` but the event matcher required `#dojo-qte-dual-container`; one global 45ms timestamp also suppressed a rapid tap on the other track.
- Correct fix: match the actual dojo pad wrapper and debounce independently by battle/dojo plus left/right/single track. Swipe and keyboard paths remain unchanged.
- Automated guard/evidence: `npm run test:rwd:stress-input`; 12/14 initial with both hybrid dual-tap cases failing, then 14/14 PASS at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-2dNluz`. The formal production bundle was rebuilt before Green.

## RWD-REG-010 — Reduced-Motion Coverage Gap

- Classification/status: source-observed partial policy expanded locally on 2026-09-01.
- Root cause: the existing reduced-motion rule disabled only infinite petals; decorative screen-enter, speaking/caret and QTE opacity transition still ran.
- Correct fix: disable those decorative effects under `prefers-reduced-motion: reduce` while preserving gameplay-critical oracle and hit feedback/timing.
- Automated guard/evidence: `npm run test:rwd:stress-animation`, 12/12 PASS at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-NltibX`, including before/middle/after samples, rapid retrigger and cleanup. This is browser emulation, not an OS accessibility setting or real-device claim.

## RWD-REG-011 — Dual-Boss Header / Oracle Partition and Balance

- Classification/status: fourth-round human review defect, reproduced, repaired and included in the user-approved seventh-round Chromium golden.
- Human evidence: final-source batch `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-uaWwaK` received 4 REJECT / 57 HOLD / 0 APPROVE. Rejected cases were 360×800 and 390×844 ATK/HP separation, 1440×900 oracle/HP plus right-character balance, and 1920×1080 coordinated HUD/oracle placement.
- Root causes: dual cards retained `min-width:auto`, allowing desktop content to expand the two-card grid roughly 100px beyond its 700px HUD; title, ATK and HP text shared an unstable header flow; 1440 oracle overlapped the HUD by 4px; landscape rules placed oracle 10.6–20px inside the HUD region.
- Correct repair: dual cards now use a two-row grid—name/ATK then HP text—with meter below and `min-width:0`; mobile ATK→meter clearance is at least 17.5px; 1440 oracle is smaller/lower and the right character moves left 18px; 1920 HUD/oracle move together slightly left/down; 1194 and 844×390 landscape oracle positions preserve at least 10px HUD clearance, with the short variant compacted between character faces.
- Guard: `criticalAudit` measures both ATK→meter gaps, card containment within HUD, and visible countdown/reaction HUD→oracle clearance. QTE-active underlying layers are excluded because the QTE overlay is the active contract.
- Actual failed-fix evidence: first full fourth-round Stage B was 133/140 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-XjehIC`, revealing seven landscape/protection overlaps; the guard was retained and shared landscape rules were corrected.
- Green evidence: targeted four review cases 4/4; former seven failures 7/7; complement 69/69 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-whe7ET`; Stage B 140/140 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-9UfHRn`; sweep 400/400 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-2XECWj`; candidate batch `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-RDkMMY`.
- Final supersession: current Stage B140/140 and visual61/61 on the source/hash set named above; the seventh-round61 images are all APPROVE.

## RWD-REG-012 — Compact Player HP/MP Fill Collapsed to Zero

- Classification/status: fourth-round human-review defect, reproduced, repaired and included in the user-approved seventh-round Chromium golden.
- Affected states: 360×800 and 390×844 single/dual Boss countdown player HUD. Text correctly reported 100/100 HP and 50/50 MP while both painted fills were absent.
- Root cause: compact rules set meter border-box heights to 8px/6px but retained 3px top/bottom padding and 1px top/bottom border. The inner content height and each `i { height:100% }` fill therefore computed to 0px.
- Correct fix: compact player meters use 1px padding with 10px HP and 8px MP border-box heights, yielding visible 6px/4px fills while preserving the compact layout.
- Guard: `criticalAudit` parses current/max text, calculates the painted inner track, requires positive values to have nonzero fill height, checks fill width against the numeric ratio, and checks full-value height against the complete inner track. Hidden inactive battle screens are excluded by rendered client-rect/hidden-ancestor checks.
- Actual detector correction: the first 73-case run was 70/73 because hidden battle HUDs under dojo-QTE screens have zero rects; the guard was scoped to the actual visible player HUD without relaxing any active battle assertion.
- Green evidence: targeted four mobile cases 4/4 with HP `0→6px` and MP `0→4px`; complement 73/73 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-ltnW1x`; Stage B 140/140 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-ZY5yUU`; sweep 400/400 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-uwleg2`; fifth-round candidates `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-Uodk9O`.
- Final supersession: current Stage B140/140 and visual61/61 retain the HP/MP fill guard; the seventh-round61 images are all APPROVE.

## RWD-REG-013 — Mobile Chapter Label / Boss HUD Overlap

- Classification/status: fifth-round human-review defect, reproduced, repaired and included in the user-approved seventh-round Chromium golden.
- Affected states: 360×800, 390×844 and 768×1024 single/dual Boss countdown. The issue was longstanding but the user explicitly changed the visual decision in this review.
- Root cause: the later max-width 780px battle rule forced `.chapter-tag` to screen `top:58px`, overriding the tablet/available-space placement at 14px. The label occupied viewport y110–142 while the Boss HUD began at y138, producing a 4px/approximately 530px² overlap.
- Correct fix: mobile chapter label uses screen top 12px (viewport y64–96), preserving 42px clearance before the Boss HUD and horizontal separation from retreat.
- Guard: active battle `criticalAudit` measures chapter bounds, requires at least 8px inset below the battle screen/global header boundary, and rejects painted overlap with Boss HUD, retreat, oracle/countdown or battle log. Landscape layouts with separate horizontal regions are evaluated by actual rectangle intersection, not an irrelevant global vertical order.
- Green evidence: targeted six review cases 6/6; complement 79/79 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-5fECGx`; Stage B 140/140 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-b963TY`; sweep 400/400 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-0n4CQh`; sixth-round candidates `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-CPKOZu`.
- Final supersession: current Stage B140/140 and visual61/61 retain the chapter-label/Boss-HUD partition; the seventh-round61 images are all APPROVE.

## RWD-REG-014 — Wide Desktop Dojo Workspace Left Bias

- Classification/status: user-approved layout refinement implemented locally; all seventh-round candidates were subsequently approved and imported as the maintained Chromium golden.
- Affected states: dojo single/dual QTE at 1440×900 and 1920×1080, with boundary and input protection at 1279/1280/1281, 1194×834 and 844×390.
- Red: metrics and workspace stayed fixed at 820px with center x426 at every desktop width; this was 294px left of 1440 center and 534px left of 1920 center. Single arrows were68px, dual arrows42px.
- Approved direction: title/mode/exit header remains x16/820px; metrics and workspace use bounded1040px centered below; single arrows80px, dual arrows52px, equal dual slots; desktop touch/hybrid buttons52px. No edge-to-edge 1920 layout, palette/type/copy/gameplay change or mobile/tablet change.
- Correct fix: one `min-width:1280px` media query expands only the dojo content consumers. CSS variables route existing important touch-capability sizes without adding new `!important`; no DOM wrapper or root overflow change was added.
- Guard: `criticalAudit` verifies 1279 isolation, 1280+ header anchor,1040px width/center, single/dual arrow sizes, dual-slot equality and visible desktop pad center/button height.
- Test correction: first Stage B run was139/140 because rotation geometry was sampled during a finite descendant transition. `settleFiniteLayout` now waits the target subtree and rotation waits after each resize; the unchanged10px battle guard then passed.
- Green evidence: targeted14/14; Stage B140/140 `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-quAwld`; core30/30 `koraku-rwd-kkxK9v`; complement93/93 `koraku-rwd-bGw1Th`; boundary39/39 `koraku-rwd-V41GG0`; stress27/14/12 at `koraku-rwd-w2bnq3`, `koraku-rwd-FPEZei`, `koraku-rwd-50er1F`; sweep400/400 `koraku-rwd-n72NAI`; candidates `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-GS0OAR`.
- Final visual evidence:61/61 at `C:\Users\Administrator\AppData\Local\Temp\koraku-rwd-dgmgpd`; golden tree SHA-256 `9fa0cbeb9c71a70425babafd6df5564467e0c8f66188202c453a298aaf30ba0f`.

## RWD-REG-015 — 4K Home Dialogue Bubble Sky-Floating and Victory Settlement Standee Sinkage

- Classification/status: 4K ultra-wide (3840×2160, 2560×1440, 21:9) layout and vertical anchoring defect; identified, diagnosed, repaired and verified.
- Affected states: Home screen (#screen-home) dialogue bubble, decorative halo and seal; Victory settlement overlay (#result-overlay) and standee (#battle-character-wrap) in normal and swimsuit variants on viewports >= 1920px.
- Symptoms:
  1. On 4K (height 2160px), home dialogue was locked to `top: 160px` while Little Raku's standee was anchored at `bottom: 40px` (head at Y ≈ 1148px), leaving a ~1000px detached black void between head and bubble.
  2. In victory settlement, `.battle-character-wrap` was forced to `height: 96%` with `object-position: center bottom`. Container extended 143px below viewport bottom, pushing legs and feet completely off-screen and cutting off the standee.
  3. Victory card remained locked to extreme left (600px width at left: 110px) while standee was at center (700px width), creating an 860px central black void.
- Root cause: Missing media query containment and scaling for viewports >= 1921px; hardcoded `top` anchoring for home speech bubble; unconstrained `height: 96%` during settlement overlay.
- Correct fix:
  1. In `src/styles/screens.css`, updated settlement `.battle-character-wrap` to `top: clamp(100px, 12vh, 180px); bottom: clamp(50px, 7vh, 110px); height: auto;`, ensuring standee renders 100% within viewport with 110px bottom clearance.
  2. In `src/styles/responsive.css`, added `@media (min-width: 1441px)` and `@media (min-width: 1921px)`:
     - Home: anchored `.home-dialogue` dynamically via bottom distance to character head (`bottom: calc(min(84vh, 1300px) * 0.88 + clamp(25px, 3.5vh, 60px));`), keeping bubble caret directly over Little Raku's head.
     - Settlement: wrapped layout in a centered stage (`padding-left: max(80px, calc(50vw - 960px));`), expanded card to `min(32vw, 720px)`, and shifted standee to `left: calc(50vw + 160px)` with `width: min(38vw, 1100px)`, creating a balanced 2220px centered dual-column stage.
- Guard & Evidence: Verified via Playwright at 3840×2160 (`home-4k.png`, `victory-4k.png`, `swimsuit-4k.png`); `npm test` 108/108 pass; `npm run test:rwd:smoke` 30/30 pass.

## RWD-REG-009 — In-Battle Mutation Lock State UI (Growth & Equipment)

- Classification/status: Verified implementation & responsive protection; verified green in Playwright Chromium across 4 viewports, dynamic resize across 12-slot breakpoint, 2 locales (zh-Hant & en), and policy variants.
- Date: 2026-09-03.
- Surface: Growth screen (`#screen-growth`), Equipment screen (`#screen-equipment`), Shop screen (`#screen-shop`), and global Toast notifications.
- Verified Invariants: RWD-G001, RWD-G003, RWD-G006, RWD-G008 in the [baseline](responsive-spec.md). Minimum button height >= 40px preserved; dark shrine palette and token `--crimson-bright` maintained; 12 paperdoll slots not displaced.
- Viewports covered:
  - 375×812 (Mobile portrait, touch=true)
  - 768×1024 (Tablet portrait, touch=true)
  - 1280×800 (Desktop compact, touch=false)
  - 1920×1080 (Desktop full HD, touch=false)
  - Dynamic runtime resize across equipment 12-slot breakpoint: 375 -> 768 -> 1280.
- States verified:
  - Non-battle: `#equipment-lock-notice` and `#growth-lock-notice` hidden (`display: none`), buttons active and enabled.
  - Active battle (always policy): buttons disabled with `disabled` and `aria-disabled="true"`, notices display `battle.lockedDuringBattle`.
  - Post-battle: notices hidden, buttons restored to active state.
  - Countdown policy: unlocked during `countdown` phase, locked during `reaction` and `qte` phases.
- Locales verified at 375px:
  - `zh-Hant`: bounding rect `{ width: 313, height: 16 }` within 375px viewport, 0 overflow.
  - `en`: bounding rect `{ width: 313, height: 32 }` within 375px viewport, wraps cleanly across 2 lines without clipping or displacing 12 equipment slots.
- Input verified:
  - Mouse click and Touch dispatch on locked buttons block command execution and trigger danger Toast with `battle.lockedDuringBattle`.
- Browser console: 0 new errors across all test passes.
- Automated guards: `tests/unit/appViewMutationLock.test.js` (5/5 pass), `npm test` (213/213 pass), `npm run test:server` (17/17 pass), `npm run test:rwd:smoke` (30/30 pass).
- Visual evidence root: `C:\Users\Administrator\AppData\Local\Temp\koraku-staging-evidence\20260903-0535\rwd\` (25 PNG screenshots + `rwd_verification_report.json`).

## Entry Template

For a new entry record:

- Stable RWD-REG-XXX ID, title, classification/status, first/last observed date.
- Affected screens/components, viewport/input/locale/state, and protected invariant.
- Reproduction and symptom; source-evidenced root cause.
- Correct fix; only actually attempted incorrect fixes and their side effects.
- Automated guard location/command or explicit missing guard.
- Manual/browser evidence, console, screenshots, specification/decision link.
- Remaining risk and what must not be reintroduced.
