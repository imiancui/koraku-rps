# Styles — Scoped Agent Rules

These rules cover CSS in this directory, not functional JavaScript.
Read the [project instructions](../../AGENTS.md) and relevant sections of the [UI/RWD baseline](../../docs/ui/responsive-spec.md).

- Ponytail is OFF for presentation; preserve approved appearance and interaction.
- Inspect the full cascade: tokens, base, components, screens, animations, responsive, and affected inline declarations in root HTML.
- Media queries exist in both screens.css and responsive.css. Check width, height, orientation, and input-capability conditions together.
- Before changing a shared selector, identify every consuming screen and both single/dual battle and QTE variants where applicable.
- Scene positioning/clipping can be intentional. Never hide an overflow defect or add unexplained specificity/z-index escalation.
- Use the risk-based viewport/state matrix; record breakpoint boundaries and runtime resize evidence.
- Read related [regression entries](../../docs/ui/rwd-regression-log.md) before a repair and update them when the evidence changes.
- Do not run the development server or tests during read-only review: both can rewrite the bundle.
