---
name: "/ponytail-debt"
id: "ponytail-debt"
category: "Workflow"
description: "Harvest ponytail: comments into a tracked debt ledger"
---

Harvest every `ponytail:` comment in this repository into a debt ledger. Follow `.agents/skills/ponytail-debt/SKILL.md`. Grep the whole tree for comment markers, skipping node_modules/.git/build output. One row per marker, grouped by file. Tag any marker that names no upgrade path as no-trigger. Report only, change nothing. If none: 'No ponytail: debt. Clean ledger.'
