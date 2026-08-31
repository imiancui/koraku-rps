---
name: "/ponytail"
id: "ponytail"
category: "Workflow"
description: "Switch ponytail intensity level (lite/full/ultra/off)"
---

Switch to ponytail $ARGUMENTS mode. If no level specified, use full.

Follow `.agents/skills/ponytail/SKILL.md`. Lazy senior dev mode, before any code: does it need to exist at all (YAGNI)? Does the standard library do it? A native platform feature? Can it be one line? Build the minimum that works. No unrequested abstractions, no avoidable dependencies, no boilerplate. Mark deliberate simplifications that cut a real corner with a known ceiling using a `ponytail:` comment that names the ceiling and upgrade path.

In this workspace, OpenSpec still gates player-visible behavior. Ponytail only governs implementation style after the spec is locked.
