# Repository Agent Instructions — Koraku RPS

## Scope and Authority

- This file governs **New-game-project-4**, the directory containing this file and its descendants. The local checkout is `D:\game-dev\New-game-project-4`.
- The enclosing Git root is currently `D:\game-dev`. "Project root" in these instructions means this game's directory, not the enclosing multi-project workspace.
- Do not edit ancestor instructions, sibling games, shared skill sources, or user-global AI settings without explicit authorization.
- Preserve existing and concurrent changes. Record the starting status with `git status --short -- .`; compare your own changes against that baseline. Never assume the workspace is clean.
- Platform/system instructions, safety rules, tool permissions, and explicit user scope remain controlling. These documents do not redefine the platform's instruction hierarchy.
- Within the project, applicable nested instructions refine workflow; approved product specifications define game behavior. Approved design references and established design conventions take precedence over generic skill suggestions.
- Skills are advisory capabilities, not permission to expand scope. Accessibility, usable interaction, responsive correctness, and data safety are acceptance constraints, not tradeoffs for shorter code.
- If instructions, product requirements, or references conflict, identify the sources and record `NEEDS HUMAN DECISION`. Do not silently choose a new product behavior.
- Write new agent-governance rules in English. Report to this project's user in Traditional Chinese unless requested otherwise.

## Product and Source Map

- Product specification: [OPENSPEC.md](OPENSPEC.md). Architecture and event/save contracts: [HANDOFF.md](HANDOFF.md) and [AI_HANDOVER.md](AI_HANDOVER.md).
- Stack: vanilla HTML, CSS, ES Modules, Web Audio API, and localStorage; no third-party runtime framework.
- Game markup and early touch detection: [index.html](index.html). DOM rendering, navigation, and interaction: [src/js/ui](src/js/ui).
- Shared presentation: [src/styles](src/styles). Labels and localization helpers: [I18n.js](src/js/services/I18n.js). Debug UI also exists in [main.js](src/js/main.js).
- The standalone [wiki.html](wiki.html) has its own embedded styles and script. Do not overlook it when its UI is in scope.
- [bundle.js](src/js/bundle.js) is generated; edit source modules and rebuild only when the task authorizes production changes.
- Root instructions cover root HTML and all UI-affecting files. Also read [style rules](src/styles/AGENTS.md) or [DOM UI rules](src/js/ui/AGENTS.md) before working in those directories. Do not treat all of `src/js` as presentation.

## Task Classification and Reading

Classify before acting; use the smallest relevant scope:

| Task | Required context and approach |
| --- | --- |
| Read-only investigation/review | Inspect relevant sources and specifications; no fixes, generated files, installation, or release without authorization. |
| Documentation/governance or local skill setup | Read the affected instructions and [skill routing](docs/engineering/skill-routing.md); change only authorized governance/setup artifacts. |
| Functional core | Read relevant OpenSpec contracts, callers, and tests; use Ponytail within its non-visual boundary. |
| UI maintenance, responsive repair, or accessibility fix | Read affected product requirements, the relevant parts of the [UI/RWD baseline](docs/ui/responsive-spec.md), and related [regression entries](docs/ui/rwd-regression-log.md). |
| New UI or visual redesign | Use the same product/RWD context; establish an authorized design direction before implementation. |
| Browser verification | Read the relevant RWD cases and command side effects; isolate browser state and report actual evidence. |
| Mixed | Classify presentation and functional portions separately; do not refactor merely to enable a skill. |

Do not read every governance document or invoke every installed skill for every small task. Read each selected skill's complete `SKILL.md` before using it, then only the references required for that task.

## OpenSpec Workflow

Before changing any player-visible behavior, game rule, UI interaction, or localized text:

1. Understand intent, affected systems, edge cases, and the expected result.
2. Run `openspec context --json` from this project. A nested `openspec/` wins; currently this game uses the workspace fallback `D:\game-dev\openspec`.
3. Read this game's existing specifications and applicable change artifacts. Keep fallback-root artifacts scoped to Koraku RPS, not sibling products.
4. Propose first using `openspec-propose` (Codex: `$openspec-propose`), with Purpose, Requirements, and measurable GIVEN / WHEN / THEN scenarios.
5. Respect the selected workflow's proposal/review boundary, then implement approved change tasks using `openspec-apply-change` (Codex: `$openspec-apply-change`). Use the platform's installed command spelling; do not invent slash commands.
6. Update the approved specification and required handover artifacts as part of the change. Reuse an existing applicable change instead of creating duplicates.
7. After an authorized CLI upgrade, refresh generated tool files with `openspec update` at the affected roots; do not run a workspace-wide refresh as incidental project maintenance.

Pure governance/documentation and local skill installation do not change game behavior. They do not by themselves require a new gameplay proposal, game version bump, bundle/Excel generation, or deployment. New behavior discovered during that work must be proposed separately, not implemented as an incidental fix.

## Skill Routing and Ponytail Boundary

Detailed routing, installation locations, and fallback rules: [Agent Skill Routing Policy](docs/engineering/skill-routing.md).

- `ui-ux-pro-max`: targeted UX, interaction, accessibility, and responsive reasoning.
- `frontend-design`: new visual direction or explicitly authorized redesign only; not a default maintenance/RWD repair skill.
- `web-design-guidelines`: rule-based review of affected UI, including post-implementation audit; not creative direction.
- `webapp-testing`: reproduction and rendered/browser verification, only when runtime access is appropriate.
- [rwd-ui-guardian](.agents/skills/rwd-ui-guardian/SKILL.md): this game's responsive impact map, risk-based case selection, and evidence verdict. Use for applicable RWD work when discovered by the current AI; if unavailable, use the UI/RWD baseline. It does not authorize fixes or replace browser verification.
- `ponytail`: functional-core simplicity. This project explicitly narrows the parent workspace's broad Ponytail policy: **Ponytail is OFF for presentation work**, including markup, CSS, layout, animation, visible state, and control replacement.
- For mixed work, apply Ponytail only to safely separable non-visual logic already within scope. If that is unsafe, leave it off for the mixed change; never extract modules solely to switch it on.
- Do not replace custom UI with native controls, remove visual wrappers, or drop interaction/motion just to shorten code. Native controls already used by this game remain valid.
- Ponytail may reduce implementation complexity, but it may not reduce design intent.
- For UI work, the smallest implementation is selected only among solutions that are already visually and behaviorally equivalent.

## UI Preservation and Responsive Gate

- Default to preservation. An RWD fix is not permission to change palette, typography, effects, animation, character composition, or approved interaction.
- Keep the dark Japanese anime shrine aesthetic: crimson, gold, deep ink, and paper; translucent gold-leaf borders/shadows. Use existing tokens from [tokens.css](src/styles/tokens.css).
- The implemented deep-background token is `--ink-950`; the older instruction name `--night-pure` is not currently defined. Do not invent a token or change the palette to resolve a documentation mismatch.
- No colorful OS emoji in UI buttons, headings, menus, or labels. Use theme-colored inline SVG; keep SVG separate from the localized `span`. Localization strings contain plain text.
- Keep decorative character layers non-interactive (`pointer-events: none`); give controls usable stacking contexts and `pointer-events: auto`. Preserve the project minimum 40px control-height requirement; existing undersized exceptions need explicit resolution, not an unearned pass.
- Before a UI change, briefly map affected screens/components, shared styles, width/height breakpoints, input modes, UI states, localization, fixed overlays, persisted state, and planned verification. Omit genuinely irrelevant fields.
- Game-stage layering and deliberate scene clipping are legitimate architecture, not blanket violations. Never add root overflow hiding, arbitrary offsets, `!important`, or z-index escalation to conceal unreachable content.
- Follow the risk-based viewport/state matrix, including runtime resize and affected breakpoint boundaries. Shared changes cover every affected screen; mobile fixes must not regress tablet/desktop.
- Treat newly introduced application console errors as blocking. Record existing errors separately; do not expand scope or hide them to obtain a clean report.
- Source review, Node tests, and screenshots at one width are not responsive verification. Without rendered verification, report exactly: `Responsive status: code-reviewed but not visually verified.`
- On a confirmed repeat RWD defect, update its regression entry, root cause, failed fixes, invariant, and a permanent guard when feasible. If a guard requires unapproved infrastructure, record the gap; do not claim permanent prevention.

## Localization

- Maintain all four locales: `zh-Hant`, `zh-Hans`, `en`, and `ja`, in [I18n.js](src/js/services/I18n.js).
- Synchronize new/changed features, items, equipment, skills, stages, dialogue, menus, labels, cheats, and help text across all locales.
- Use natural local ACGN/game terminology, including Japanese janken calls and natural English Rock-Paper-Scissors / Counter Chance phrasing.
- Language controls use text labels, never flags. Preserve browser/system-language detection and English fallback.
- Test long CJK/English labels and large numbers in the affected layout. Do not use shrinking or hiding required text as the first overflow fix.
- For localized implementation changes, `npm test` must include the dictionary-completeness checks in [tests/i18n.test.js](tests/i18n.test.js), followed by the required bundle build.

## Commands and Side Effects

Run commands from this project and inspect scripts before assuming they are read-only.

| Existing command | Effect |
| --- | --- |
| `openspec context --json` | Resolves the specification root. |
| `npm test` | Runs Node's test runner; the bundle test also writes `src/js/bundle.js`. |
| `npm run build` / `node scripts/build.mjs` | Writes the generated bundle. |
| `npm run dev` / `npm start` | Rebuilds the bundle, then serves the app; default local port is 4173. |
| `npm run specs:excel` | Regenerates `game_specs.xlsx`. |
| `npm run start:tailscale` | Also changes network-sharing/firewall state; use only when explicitly requested. |

For read-only or governance-only work, do not run the writing commands merely as a checklist. Use file/link validation and scoped diffs. If browser evidence is necessary, use a verified non-writing route to existing artifacts, a disposable browser context, and evidence storage outside the project. Do not modify a player's save or stop a server/browser owned by someone else.

## Handover and Game Content Artifacts

For new/changed game content, synchronize the existing four artifact categories:

1. [HANDOFF.md](HANDOFF.md) / [AI_HANDOVER.md](AI_HANDOVER.md): architecture, EventBus contracts, state transitions, GameStore/save schema, testing, and build workflow; keep overlapping contracts consistent.
2. [wiki.md](wiki.md): the complete gameplay reference, including characters, four Boss chapters, RPS/morph, single/dual eight-direction QTE, skills, 12 equipment slots, watermelon, DPS, gallery, cheats, and localization.
3. [wiki.html](wiki.html): the offline searchable/filterable shrine-themed encyclopedia and interactive level/allocation/DPS/QTE calculators.
4. [game_specs.xlsx](game_specs.xlsx): stages/Bosses, equipment, items/potions, skills, combat/QTE, growth/formulas, watermelon/gallery, cheats/debugging, and localization worksheets.

Do not regenerate player-facing HTML or Excel for a governance-only edit. Keep governance details in the linked agent documents rather than duplicating the product encyclopedia.

## Versioning and Release

For completed gameplay features/fixes/releases, preserve the existing release requirements:

- The home footer's leftmost first item displays `MAJOR.MINOR.PATCH`.
- Increment PATCH through 100; the next release carries: `0.0.100 -> 0.1.0`, `0.1.100 -> 0.2.0`, `0.99.100 -> 1.0.0`.
- Update `APP_VERSION` in [gameConfig.js](src/js/config/gameConfig.js), the footer version in [index.html](index.html), CSS/bundle cache parameters (`?v=YYYYMMDDHHmm`), and version records in HANDOFF/wiki.
- Run `npm test` and `node scripts/build.mjs`; regenerate Excel when game-content changes require it.
- Publish the game's latest tested commit to `imiancui/koraku-rps`, branch `main`, for [koraku.app](https://koraku.app/) with `CNAME: koraku.app`.
- Verify the exact remote and project-only publication scope first. Do not push the entire multi-project workspace, sibling files, or unrelated changes. If safe isolation is unclear, stop and request direction.
- No version bump, commit/push, or deployment is implied by read-only review, governance edits, or skill installation alone.

## Final Reporting

Lead with the result. Report changed files, relevant skills used or meaningfully skipped, actual commands/checks, limitations, and remaining decisions. For UI implementation include affected screens/states, viewport and input coverage, console findings, and evidence paths. Distinguish proposed, source-reviewed, browser-emulated, and real-device-verified results; never claim testing or regression protection that was not performed.
