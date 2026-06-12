# Frontend Developer Core Reference

Frontend developer work must preserve state ownership, user-visible behavior,
and browser-verifiable quality.

## Hard Rules

- [DECISION] Keep UI layout and interaction code separate from form, state, API,
  and domain ownership when the repo has those boundaries.
- [DECISION] Renderer components, templates, pages, and widgets render and wire
  events. They must not own business rules, async orchestration, validation
  policy, URL construction, or derived read-model construction.
- [DECISION] Framework lifecycle adapters, hooks, effects, bindings, and loaders
  should stay adapter-level. Move business logic into the repo-approved
  non-renderer unit.
- [DECISION] Avoid duplicating validation or mapping rules across UI and state
  layers without a shared contract.
- [DECISION] Keep generated API types, transport error mapping, and UI state in
  sync with the repo's source of truth.
- [DECISION] Do not create parallel client state when an existing view model,
  store, router loader, or generated data layer already owns the data.
- [DECISION] For reactive view models, keep lifecycle, disposal, async side
  effects, and public reactive getters explicit and testable.
- [DECISION] Keep component-level changes small enough that a reviewer can see
  rendering, event wiring, and state ownership separately.
- [DECISION] Use frontend structure boundaries only when they clarify real domain
  ownership or the repo has selected them; avoid ceremony for small apps.
- [DECISION] Treat frontend structure checks as blocking only when the repo
  overlay or config enables them.
- [DECISION] Browser-visible behavior may require browser, e2e, screenshot, or
  component-state checks in addition to static gates.
- [DECISION] Interactive UI must preserve keyboard navigation, visible focus,
  semantic controls, labels, contrast, and common-viewport text fit.
- [DECISION] Generated frontend contracts must be regenerated from the approved
  schema, API, or codegen command. Do not hand-edit generated API types.

## Work Focus

For frontend work, inspect:

- route, loader, data-source, state, view-model, and renderer ownership;
- generated API or schema artifacts that the UI consumes;
- existing tests or stories for the touched workflow;
- browser-visible states: loading, empty, error, success, permission, and
  responsive layout states;
- repo-selected frontend structure checks, when configured.

Keep business behavior outside renderer code unless the repo explicitly uses
renderer-local business logic for that surface.

## Stop Conditions

- Return `needs_architect` when state ownership, routing/data-loading boundaries,
  generated contracts, or frontend layering must be decided.
- Return `needs_analyst` when user behavior, validation rules, empty/loading/error
  states, or acceptance criteria are unclear.
- Return `needs_reviewer` when a frontend structure, accessibility, generated
  contract, or browser behavior finding needs risk classification before code
  should change.
- Return `needs_human` when visual direction, product copy, or approval-gated UX
  tradeoffs block implementation.

## Source Material

- Always load:
  - `../../../references/quality/readable-code.md`

- Load when selected by route evidence or repo overlay:
  - `../../../stacks/js-ts/references/react-ui-boundary.md`
  - `../../../stacks/js-ts/references/mobx-reactivity.md`
  - `../../../stacks/js-ts/references/mvvm-frontend.md`
  - `../../../stacks/js-ts/references/frontend-di-composition.md`
  - `../../../stacks/js-ts/references/frontend-fsd.md`
  - `../../../stacks/js-ts/references/react-mobx-mvvm.md` as a composite route
    only

Do not load React, MobX, MVVM, DI, FSD, Storybook, or browser-specific
references as frontend defaults. They are conditional on repo evidence, route
approval, or overlay config.
