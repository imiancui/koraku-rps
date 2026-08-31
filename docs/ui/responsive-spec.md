# UI and Responsive Governance Baseline

Last reviewed: 2026-08-31. Applies only to Koraku RPS.
This is a source-reviewed governance baseline, not a claim of rendered correctness or a replacement for [OPENSPEC.md](../../OPENSPEC.md).
Approved behavior and new behavior changes follow the [project OpenSpec workflow](../../AGENTS.md).

## Sources and Current Coverage

- Stack: vanilla HTML/CSS/ES Modules. [index.html](../../index.html) loads tokens, base, components, screens, animations, then responsive CSS.
- [AppView.js](../../src/js/ui/AppView.js) renders dynamic UI, navigation, saved screen state, and touch/keyboard interaction; [I18n.js](../../src/js/services/I18n.js) supplies four locales.
- [wiki.html](../../wiki.html) is a separate offline page with its own style variables, 900px query, search, filters, and calculators.
- Main screens: home, stages, shop, growth, gallery, guide, equipment, records, battle, and dojo-qte.
- Important overlays: single/dual QTE, settlement, floating auto-battle watermelon, pause, auto-battle setup, dojo setup, save records, cheat authorization/menu, gallery lightbox, and changelog.
- No desktop window manager, taskbar, drag/resize geometry system, or persisted application-window bounds were found in the inspected game sources. Do not invent contracts for them.
- npm test runs Node tests, not a maintained browser RWD suite. No test:rwd script is declared in package.json.
- Ad hoc viewport/Stage 4 Python scripts and PNGs exist in scratch/. They belong to other work and were not executed, visually evaluated, or promoted to an automated regression gate during this governance task.
- Baseline rendered verification was not performed during documentation bootstrap.

## Quality and Preservation

Preservation is the default. Incremental improvement, new design, or major redesign requires corresponding task authorization.

- Preserve the approved dark anime shrine theme, meaningful character composition, and existing token/type system.
- Use theme-colored SVG rather than colorful OS emoji. Keep icon markup separate from localized text.
- Maintain clear hierarchy, legible contrast, consistent spacing, semantic controls, accessible names, visible/reachable focus, and predictable close/back behavior.
- Preserve keyboard, pointer, touch, and hybrid access where the game supports them. A hover-only affordance is not sufficient for touch.
- Long CJK text, English labels/unbroken strings, large numbers, and maximum realistic lists must follow an intentional wrap/truncate/scroll policy. Never hide a required action to fit.
- Consider only states applicable to the changed component: normal, focus/active/disabled, empty/maximum content, loading/error/success, modal/menu open, and offline where relevant.
- Decorative motion should respect reduced-motion preferences. Do not remove or retime gameplay-critical QTE/watermelon feedback without a behavior proposal.
- Semantic or interaction equivalence must be verified, not inferred from visual similarity.

## Breakpoint Inventory

These are observed source queries, **not unified tokens or proof of support**. Re-read the cascade before changing them; concurrent work may alter the inventory.

| Query | Source | Observed purpose |
| --- | --- | --- |
| max-width: 1100px | responsive.css | Compact desktop/tablet composition |
| min-width: 601px and max-width: 1024px and orientation: portrait | responsive.css | Tablet portrait character placement; also described in HANDOFF v0.0.13 |
| max-height: 780px and min-width: 721px | responsive.css | Short-wide layout; intersects several width classes |
| max-width: 780px | responsive.css | Main mobile layout and header/scroll rules |
| max-width: 480px | responsive.css | Narrow-phone adjustments |
| max-width: 768px | responsive.css; screens.css | Component-specific mobile adjustments |
| max-width: 365px | responsive.css | Compact header treatment |
| max-width: 900px | screens.css; wiki.html | Component / independent encyclopedia layout |
| pointer: coarse / any-pointer: coarse | screens.css; responsive.css | Touch-control visibility |
| prefers-reduced-motion: reduce | animations.css | Existing partial motion preference handling |

Sources: [responsive.css](../../src/styles/responsive.css), [screens.css](../../src/styles/screens.css), [animations.css](../../src/styles/animations.css).
JS also uses width/capability checks; do not assume CSS queries are the only responsive inputs.

## Responsive Invariants

| ID | Required outcome |
| --- | --- |
| RWD-G001 | No unintended document overflow or clipping of required controls/content; inspect nested scroll containers too. |
| RWD-G002 | Intentional scrolling/clipping is scoped and documented; root overflow hiding is not a repair. |
| RWD-G003 | Header, HUD, dialogue, overlays, and controls remain reachable, with no harmful stacking/pointer interception. |
| RWD-G004 | Applicable long-content and all four localization states retain a usable layout. |
| RWD-G005 | Runtime resize/orientation and modified breakpoint boundaries remain valid, not only first load. |
| RWD-G006 | Single/dual QTE and touch/keyboard/hybrid inputs preserve their separate contracts. |
| RWD-G007 | Safe areas, browser chrome, and software keyboards do not make critical controls unreachable. |
| RWD-G008 | Shared changes cover all affected screens and mobile/tablet/desktop classes. |
| RWD-G009 | New application console errors block completion; baseline errors remain recorded. |
| RWD-G010 | Evidence states its actual scope; emulation is not real-device verification. |

## Component Contracts to Verify

| Surface | Key cases |
| --- | --- |
| Header / home footer | Four locales; high level/coin values; language/audio controls; safe-area reachability; compact/short heights |
| Battle scene | Single/dual Boss; player HUD; oracle, character face, damage log, and dialogue separation; no control interception |
| QTE / dojo-qte | Single and dual sequences; touch pad, swipe, physical keyboard, simultaneous hybrid input; no sequence overflow |
| Settlement / watermelon | Scrollable results; timing controls visible; floating panel does not block auto-battle pause/resume |
| Shop / equipment / records | Category scrolling, long names, 12 slots, tooltips, empty/maximum lists, large numbers |
| Gallery / lightbox | Character scale/position, containment, close controls, keyboard access |
| Save / cheat / dojo / settings overlays | Focus, Escape/close behavior, long text, validation feedback, on-screen keyboard, scroll containment |
| Navigation / restore | Back/forward, refresh, saved screen/tab/filter and battle state; test only in disposable storage |
| Offline wiki | Search/filter/calculators, independent tokens, 900px boundary; only when this page is affected |

## Risk-Based Verification

Do not take a Cartesian product of every viewport, state, and locale for every edit. State the impact map and select by risk.

- **Local label/style change:** test the affected interaction and longest relevant text at a narrow phone, one tablet, and one desktop; retain all four dictionary checks for localization.
- **Component/responsive repair:** reproduce the reported case, test both sides of every changed query, and include the component's relevant input/state variants.
- **Shared layout/header/modal/QTE changes:** cover all affected screens using the core classes below, runtime resizing, orientation, relevant short heights, and safe-area/keyboard cases.
- **New breakpoint:** test threshold - 1px, exact threshold, threshold + 1px for every changed width/height condition; also test combinations with overlapping queries.
- **No runtime access:** do the source review and record the missing verification. Do not claim RWD complete or no regressions.

## Canonical Viewports and Device Classes

The following are **planned test viewports in CSS pixels**, not newly promised device support and not completed tests.
Existing CSS has min-width: 320px; the product describes 360-430px phone behavior. A formal minimum supported width, maximum validated width, OS/browser version floor, and foldable support policy remain TBD.

| ID | CSS viewport | Coverage intent |
| --- | --- | --- |
| VP-PHONE-S | 360 x 800 | Narrow phone, touch |
| VP-PHONE-M | 390 x 844 | Mainstream phone geometry, touch |
| VP-TABLET-S | 768 x 1024 | Tablet portrait; touch and optional keyboard |
| VP-TABLET-M | 834 x 1194 | Tablet portrait with large character/scene |
| VP-TABLET-L | 1194 x 834 | Tablet landscape; touch plus physical keyboard |
| VP-DESKTOP-S | 1366 x 768 | Short desktop |
| VP-DESKTOP-L | 1920 x 1080 | Wide desktop |

Conditional stress cases: 320 x 568 (defensive minimum-width stress test, not a representative modern phone), 375 x 667 (short phone), 430 x 932 (large phone), 844 x 390 (short touch landscape), and 1194 x 760 (reduced landscape height).

Use device families only as coverage references. Physical resolution, CSS pixels, native dp/pt, DPR, and performance tier are different dimensions.
Do not infer CSS viewport or safe-area insets from hardware resolution. Do not create a breakpoint per model.
For actual-device evidence, record measured viewport, browser/OS, DPR, orientation, input mode, display/font scaling, keyboard/chrome state, source, date, and result.
Cover fold transitions/split view only when support is approved or the task targets them; label other cases exploratory, not supported.
WebKit emulation alone is not an iPhone/iPad hardware test. Chromium viewport resizing alone does not exercise coarse-pointer or hybrid-input behavior.
Assess frame stability, image memory, particles/blur, scrolling, and long-session growth separately from layout width when performance is in scope.

## Intentional Architecture and Unresolved Decisions

| Item | Evidence | Governance decision / status |
| --- | --- | --- |
| Scene layering and clipping | base.css uses absolute-positioned screens and clipped app shell | Allowed architecture, not a blanket prohibition. Interactive content must still meet RWD-G001/RWD-G003. |
| Decorative art crop / scrollable categories | Existing character scenes and horizontal shop filters | Preserve documented intent; distinguish decorative crop from lost content/actions. |
| Browser zoom suppression | OPENSPEC section 6.6; index viewport meta; AppView gesture handlers | NEEDS HUMAN DECISION: reconcile anti-accidental-zoom gameplay requirements with accessible zoom. No silent rewrite or compliance claim. |
| Touch target heights | Project 40px minimum versus OPENSPEC's 30-32px compact controls | NEEDS HUMAN DECISION: reconcile the contract and effective hit areas; do not automatically normalize or mark exceptions compliant. |
| Deep background token | Older instruction named --night-pure; tokens.css defines --ink-950 | Documentation now names the implemented token; no visual change authorized. |
| Language control shape | Earlier wording referred to text buttons; current index uses a labeled native select | Preserve text labels/no flags and existing selector during maintenance; do not replace the control to resolve wording alone. |
| Reduced motion | Existing preference rule covers petals only | Source-observed coverage limit; evaluate affected motion, do not claim complete motion accessibility. |
| Saved application windows / taskbar | No corresponding system found | Not applicable; saved game navigation is a different contract. |

Exceptions require a source, reason, affected viewport/state, fallback, verification status, and approving decision. Documentation alone does not approve an accessibility waiver.

## Evidence and Commands

Follow the command side-effect table in [AGENTS.md](../../AGENTS.md). npm test and npm run dev both write the bundle; they are not read-only checks.
A future test:rwd command is **not implemented**; creating browser/CI regression infrastructure requires an authorized implementation task.
For deterministic screenshot comparison, control time/randomness, stored progress, fonts/assets, animations, and game phase in the test environment without altering production behavior as an incidental workaround.

Record browser/engine, viewport, input configuration, screen/state/locale, exact commands, console results, and screenshot paths.
Capture viewport screenshots for overlap and full-page/scroll-state evidence when relevant. A screenshot is not proof of keyboard focus, safe-area hardware behavior, or interaction correctness.
When unrendered, use: Responsive status: code-reviewed but not visually verified.
Update related [regression records](rwd-regression-log.md) with evidence rather than copying assertions from old handovers.
