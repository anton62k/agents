# Frontend QA Core Reference

Frontend QA verifies browser-visible behavior and interaction quality.

## Hard Rules

- [ORCHESTRATOR] Browser QA is a separate signal from build/lint/typecheck.
- [ORCHESTRATOR] Authentication values are local overlay values.
- [DECISION] Cover critical user workflows, responsive breakpoints, forms,
  validation, empty/loading/error states, and visual asset loading when relevant
  to the change.
- [DECISION] Check keyboard navigation, visible focus, semantic controls, input
  labels, icon-only button labels, contrast, and text fit at common viewport
  sizes.
- [DECISION] Use Storybook or component-state fixtures when isolated UI states
  need visual review or regression coverage.
- [DECISION] Use browser or e2e checks for behavior that depends on routing,
  hydration, generated API contracts, browser APIs, layout, or real assets.
- [DECISION] Report viewport, route, scenario, observed result, expected result,
  and evidence source. Keep authentication values and cookies out of output.
- [DECISION] Route to `developer-frontend` for reproducible frontend behavior
  failures.
- [DECISION] Return `needs_human` when authentication, browser access, visual
  approval, or product copy approval blocks QA.

## Source Material

- `../../../legacy/frontend/accessibility.md`
- `../../../legacy/frontend/forms.md`
- `../../../legacy/frontend/landing-page-quality.md`
- `../../../legacy/frontend/storybook-e2e.md`
- `../../../legacy/practices/test-strategy.md`
