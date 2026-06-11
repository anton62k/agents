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

## Stop Conditions

- Return `needs_architect` when route evidence is split between competing
  ownership models, for example view model vs store vs route loader.
- Return `needs_analyst` when user-visible states, validation rules, or
  acceptance criteria are unclear.
- Return `needs_human` when selecting React, MobX, MVVM, DI, or FSD would create
  a new repo precedent.
