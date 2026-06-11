# Frontend Developer Core Reference

Frontend developer work must preserve state ownership, user-visible behavior,
and browser-verifiable quality.

## Hard Rules

- [DECISION] Keep UI layout and interaction code separate from form, state, API,
  and domain ownership when the repo has those boundaries.
- [DECISION] Avoid duplicating validation or mapping rules across UI and state
  layers without a shared contract.
- [DECISION] Keep generated API types, transport error mapping, and UI state in
  sync with the repo's source of truth.
- [DECISION] Do not create parallel client state when an existing view model,
  store, router loader, or generated data layer already owns the data.
- [DECISION] For reactive view models, keep lifecycle, disposal, async side
  effects, and public reactive getters explicit and testable.
- [DECISION] Use FSD or similar frontend boundaries only when they clarify real
  domain ownership; avoid ceremony for small apps.
- [DECISION] Browser-visible behavior may require browser, e2e, screenshot, or
  component-state checks in addition to static gates.
- [DECISION] Interactive UI must preserve keyboard navigation, visible focus,
  semantic controls, labels, contrast, and common-viewport text fit.

## Stop Conditions

- Return `needs_architect` when state ownership, routing/data-loading boundaries,
  generated contracts, or frontend layering must be decided.
- Return `needs_analyst` when user behavior, validation rules, empty/loading/error
  states, or acceptance criteria are unclear.
- Return `needs_human` when visual direction, product copy, or approval-gated UX
  tradeoffs block implementation.

## Source Material

- `../../../legacy/frontend/accessibility.md`
- `../../../legacy/frontend/forms.md`
- `../../../legacy/frontend/fsd.md`
- `../../../legacy/frontend/landing-page-quality.md`
- `../../../legacy/frontend/react-mobx.md`
- `../../../legacy/frontend/storybook-e2e.md`
