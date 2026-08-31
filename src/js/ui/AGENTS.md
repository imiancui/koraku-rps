# DOM UI — Scoped Agent Rules

These rules cover AppView and DialogueController, including generated markup, navigation, visible state, and input bindings.
Read the [project instructions](../../../AGENTS.md) and relevant sections of the [UI/RWD baseline](../../../docs/ui/responsive-spec.md).

- Ponytail is OFF for presentation. Do not split a component just to enable Ponytail on a small helper.
- Keep gameplay balance in config/systems; preserve EventBus, GameStore, and save contracts from the handover documents.
- Trace each changed handler across battle, dojo, overlays, keyboard, touch, and hybrid-input consumers as applicable.
- Preserve single/dual QTE independence, touch controls with external keyboards, focus/close behavior, and safe restoration of saved screen state.
- Keep inline SVG separate from localized text; update all four dictionaries for visible-text changes.
- Check affected root HTML and CSS: this directory does not contain all UI.
- Browser tests use disposable storage, never a player's live save. Do not infer browser verification from Node tests.
- Build bundle.js only for an authorized implementation/release, never edit it by hand.
