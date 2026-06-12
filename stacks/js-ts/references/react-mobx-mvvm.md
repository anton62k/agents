# React MobX MVVM Composite Reference

This is a composite route reference, not the source of every frontend rule. Load
it only when the repo uses React with MobX and an MVVM-like or view-model-based
frontend architecture.

The route is the bundle. The rules remain independently selectable through the
granular references below.

## Load Order

1. `react-ui-boundary.md` when React is present.
2. `mvvm-frontend.md` when view models, presenters, or screen models own UI
   behavior.
3. `mobx-reactivity.md` when MobX observable state, actions, computed values, or
   reactions are present.
4. `frontend-di-composition.md` when dependencies are composed through DI,
   factories, providers, context, module constructors, or explicit composition
   roots.
5. `frontend-fsd.md` when Feature-Sliced Design is selected by repo docs,
   structure checks, config, overlay, or human approval.

## Route Responsibilities

- React renders and wires events.
- View models own behavior, derived read models, visible statuses, and UI
  actions.
- MobX owns reactive state transitions and observable derivations when selected.
- DI/composition owns object graph assembly and dependency boundaries.
- FSD owns import and layer boundaries only when selected.

## Ownership Tie-Breaks

- [DECISION] If a rule decides product behavior, validation, permission, status,
  or workflow, put it in the selected view model, use case, domain service, or
  form model, not in React render code.
- [DECISION] If a rule exists to maintain observable consistency, put it in the
  MobX model or store. If it exists to present screen behavior, expose it through
  the view model or presenter.
- [DECISION] If a rule selects concrete implementations, lifetime, config, or
  adapters, put it in the DI or composition boundary.
- [DECISION] If a rule decides import direction, public API, layer, slice, or
  segment placement, use the FSD reference when selected and return
  `needs_architect` when the boundary is not already clear.
- [DECISION] Generated API or schema contracts should enter the route through a
  data source, generated-client boundary, or view model before React renders
  them, unless the repo explicitly uses generated data directly in components.

## Hard Rules

- [DECISION] Do not treat this composite as a frontend default. Select it only
  from repo evidence, route approval, or overlay config.
- [DECISION] If a repo uses React without MobX, load `react-ui-boundary.md`
  without `mobx-reactivity.md`.
- [DECISION] If a repo uses MobX without a formal MVVM structure, load
  `mobx-reactivity.md` and the repo's local state-ownership docs; do not invent
  view-model ceremony.
- [DECISION] If FSD checks exist, load `frontend-fsd.md` as a blocking
  structure reference. If they do not exist, FSD remains a candidate, not a
  requirement.
- [DECISION] Keep user-visible behavior, state ownership, data access, and
  structure boundaries testable outside JSX whenever the repo architecture
  supports it.

## Verification Signals

When this composite route is selected, verification should combine the granular
references and map them to existing capabilities in `verification.md`; common
frontend gates include `tests`, `architecture_or_structure`, `typecheck`, `lint`,
and `build_or_package`, depending on repo evidence.

## Stop Conditions

- Return `needs_architect` when route evidence is split between competing
  ownership models, for example view model vs store vs route loader.
- Return `needs_analyst` when user-visible states, validation rules, or
  acceptance criteria are unclear.
- Return `needs_human` when selecting React, MobX, MVVM, DI, or FSD would create
  a new repo precedent.
