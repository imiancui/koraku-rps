# Agent Skill Routing Policy

Last reviewed: 2026-08-31. Scope: New-game-project-4 only.
Read the [project instructions](../../AGENTS.md) first.

## Purpose and Discovery

Use a skill for a concrete phase and outcome, not to assemble a committee of all installed skills.
First inspect the active platform's skill catalog and the actual entrypoint; installation on disk and activation in the current session are different facts.
Read the complete selected SKILL.md, use its real workflow, and load only its required references.
Do not copy skill manuals into project governance or invent invocation syntax.

| Skill | Local availability | Entry point | Role and boundary |
| --- | --- | --- | --- |
| frontend-design | Available | [SKILL.md](../../.agents/skills/frontend-design/SKILL.md) | New visual direction/authorized redesign; not ordinary maintenance. |
| ui-ux-pro-max | Available | [SKILL.md](../../.agents/skills/ui-ux-pro-max/SKILL.md) | Targeted UX, accessibility, interaction, and responsive reasoning. |
| web-design-guidelines | Available | [SKILL.md](../../.agents/skills/web-design-guidelines/SKILL.md) | Rule-based review; fetch its current guidelines before an actual audit. |
| webapp-testing | Available | [SKILL.md](../../.agents/skills/webapp-testing/SKILL.md) | Browser reproduction and rendered verification, not a substitute for product requirements. |
| ponytail | Available; functional core only | [SKILL.md](../../.agents/skills/ponytail/SKILL.md) | Reduce non-visual implementation complexity without weakening requirements. |
| rwd-ui-guardian | Available; project-owned | [SKILL.md](../../.agents/skills/rwd-ui-guardian/SKILL.md) | Koraku-only responsive impact/case selection and evidence verdict; not redesign, a browser engine, or implementation permission. |

Recheck availability after moving the project or refreshing an AI session. If missing, report Unavailable and use the repository contracts; do not install or upgrade software without authorization.
For missing rwd-ui-guardian, use the [UI/RWD baseline](../ui/responsive-spec.md) as project guidance subordinate to approved product requirements.

## Phase Routing

OpenSpec's propose/review/apply boundary remains mandatory for all player-visible implementation.
The following routes refine that workflow; they never replace it.

| Task | Planning / reproduction | Implementation | Review / verification |
| --- | --- | --- | --- |
| New UI / authorized redesign | Product/spec references; ui-ux-pro-max; frontend-design for the authorized visual direction | Apply approved OpenSpec tasks; preserve decisions | web-design-guidelines, then webapp-testing on affected viewports/states |
| Responsive repair | Related regression entry; webapp-testing reproduction when safe; targeted ui-ux-pro-max outcome | Apply the approved root-cause fix; no redesign | Rule audit, affected breakpoint/resize/input cases, regression guard |
| Existing UI feature / accessibility fix | Classify presentation/core; ui-ux-pro-max when visible behavior or interaction changes | Apply approved tasks; Ponytail only within the core boundary | Audit changed presentation; test affected interactions and viewport classes |
| Read-only UI review | ui-ux-pro-max for usability; web-design-guidelines for concrete file/rule findings | No implementation | webapp-testing only where runtime evidence is needed and safe |
| Functional-only work | Relevant contracts/callers; Ponytail | Smallest correct in-scope implementation | Relevant Node tests; UI skills only if the work actually affects UI |
| Governance / skill setup | Read relevant instruction/skill definitions; targeted UX guidance only if it improves the rules | Authorized documentation or local installation only | Link, entrypoint, scope, and consistency checks; no automatic game build |

When responsive behavior is involved, consult rwd-ui-guardian before planning and reuse its verification checklist **only if it is available and its actual instructions match this project**.
It selects the affected viewport/state/input cases and assesses their evidence after verification. It does not require every companion skill, duplicate the product rules, or turn a review into an implementation task.

Do not invoke frontend-design for a breakpoint, overflow, accessibility-only, or preservation task.
Do not invoke UI skills for unrelated backend/build logic.
Reading a skill to verify installation is not evidence that its design/audit/testing workflow was run.

## Ponytail Scope

This is a project-local narrowing of the parent workspace's broad default, not an edit to the installed skill.

- Presentation: OFF. Includes HTML/templates, CSS, layout, typography, colors, spacing, stacking, visual state, animation, and control replacement.
- Functional core: permitted for rules, parsing, validation, persistence, algorithms, and non-visual tests/tools. Trace callers first and preserve validation, data safety, and correctness.
- Mixed: use it only on safely separable in-scope logic. Do not introduce modules, wrappers, or an abstraction just to enable Ponytail. Otherwise keep it off for the mixed change.
- Selecting a shorter implementation requires already-equivalent visual and behavioral results; equivalence is not assumed from screenshots alone.
- A custom modal/select/picker or animated panel is not replaceable merely because a native/static alternative is shorter. Such a change needs approved requirements and interaction/render verification.
- Existing native controls remain valid. This is not a ban on native HTML or on simplifying a genuinely equivalent implementation.

Examples: simplify a save-code parser, not the save modal's layout; simplify QTE direction normalization, not the dual touch controls; simplify numeric validation, not dojo focus/feedback or keyboard access.

Ponytail may reduce implementation complexity, but it may not reduce design intent.
For UI work, the smallest implementation is selected only among solutions that are already visually and behaviorally equivalent.

## Skill-Specific Notes

- rwd-ui-guardian: read the project-owned entrypoint for impact analysis and final evidence review. It covers cascade intersections, battle/QTE states, animation displacement, input capability, and actual control reachability. Source-only and partial browser coverage must remain explicitly unverified beyond their scope.
- ui-ux-pro-max: the detected stack is vanilla HTML/CSS/JS, not Tailwind or React. For a targeted issue, search one semantic UX outcome. Do not generate/persist a new design system during preservation.
- frontend-design: an aesthetic suggestion is not permission to change the shrine theme, typography, or character composition.
- web-design-guidelines: report concrete source locations and classify findings as blocking/high/medium/advisory. Product conflicts go to Needs Human Decision; an audit does not authorize fixes.
- webapp-testing: inspect the actual start/test scripts first. Its example ports and commands are examples, not this repository's configuration. Run its helper with --help before use.
- Browser setup: a skill folder does not install Playwright, browsers, Python, or an AI client. Confirm capabilities before claiming runtime readiness. Do not use npm run start:tailscale as a local-testing shortcut.
- Live testing: isolate storage and downloads; clean up only processes/contexts created by the current task. Keep evidence outside the project during documentation-only work.
- Reporting: list used skills and material skips with reasons. A full ledger of every installed skill is unnecessary for a small change.

## Local Installation and AI Entry Points

General-purpose skills reuse existing sources through Windows directory junctions, following this workspace's established convention.
Their shared sources remain at D:/game-dev/.agents/skills/<skill-name>; some are themselves linked to the user's existing skill installation. Existing Ponytail and OpenSpec links are preserved.
The project-specific rwd-ui-guardian is different: its canonical, real source directory is .agents/skills/rwd-ui-guardian inside New-game-project-4. The other six AI skill directories link to that project-owned directory, not to a workspace-wide or user-global Guardian.

| AI / convention | Project skill directory | Governance entry |
| --- | --- | --- |
| Codex / shared Agent Skills | .agents/skills | AGENTS.md |
| Claude Code | .claude/skills | CLAUDE.md -> AGENTS.md |
| Cursor | .cursor/skills | .cursor/rules/koraku-governance.mdc -> AGENTS.md |
| Gemini CLI | .gemini/skills | GEMINI.md -> AGENTS.md |
| Qwen Code | .qwen/skills | QWEN.md -> AGENTS.md |
| Grok workspace convention | .grok/skills | .grok/rules/koraku-governance.md -> AGENTS.md |
| Antigravity workspace convention | .agent/skills | .agent/rules/koraku-governance.md -> AGENTS.md |

These entries provide readable on-disk skills; they are not a claim that every AI client was launched and exercised.
Refresh/reopen the client's project or skill catalog after installation and satisfy its workspace trust/consent requirements. Do not bypass those requirements.
Gemini offers /skills reload and /skills list; other clients should use their installed version's actual discovery mechanism.

Codex supports repository .agents/skills discovery and linked skill folders; see the [official skills guide](https://learn.chatgpt.com/docs/build-skills).
Gemini's discovery, trust, and refresh behavior is documented in its [skills guide](https://geminicli.com/docs/cli/skills/).
Cursor uses .mdc project rules; see [Cursor rules](https://prod.cursor.com/docs/rules).
Antigravity retains .agent/rules compatibility; see [Antigravity rules](https://antigravity.google/docs/rules-workflows).

## Portability and Maintenance

- Generic skill installations and the AI alias junctions are **local-machine links**, not vendored dependencies; rebuild the links after moving or cloning the project.
- Guardian's canonical .agents/skills/rwd-ui-guardian content is project-owned and can be versioned with the game. Edit that source, not duplicate per-AI copies; keep its referenced governance documents together.
- Never edit a generic upstream SKILL.md or resource through a project junction: that would change other projects and AI clients. Do not install this project's Guardian into shared/global skill directories as an incidental update.
- Do not run the parent link-openspec-skills.ps1 merely to repair this game; it operates across user-global locations and multiple workspace projects.
- On another machine, install the original packages or link to verified local sources under the same skill names, retaining their resources and licenses.
- Preserve existing destinations. A mismatched link or real directory must be inspected and resolved explicitly, not deleted/overwritten automatically.
- If an AI shows duplicate skill names from parent/user catalogs, use its available source metadata to select the intended entry; do not remove shared installations as an incidental fix.
- Verify all expected SKILL.md files, helper/reference resources, and source hashes. A readable link is installation evidence, not rendered UI verification.
