# MobX Reactivity Reference

This reference applies when MobX is selected by repo evidence, package metadata,
route approval, or overlay config. It may be used with React, MVVM, FSD, or other
frontend structures, but it is not a default for JS/TS repositories.

## Source Priority

1. Repo-local store, model, view-model, and disposal conventions.
2. Existing action, `runInAction`, `computed`, `reaction`, `autorun`, `observer`,
   and flow patterns in the repo.
3. Official MobX docs:
   - `https://mobx.js.org/actions.html`
   - `https://mobx.js.org/computeds.html`
   - `https://mobx.js.org/reactions.html`
   - `https://mobx.js.org/react-integration.html`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows MobX package metadata, observable
models, `makeObservable`, `makeAutoObservable`, `computed`, `action`,
`runInAction`, `reaction`, `autorun`, `observer`, or repo docs that name MobX as
the state owner.

## Responsibilities

MobX units should own:

- observable state that must be reactive;
- actions that mutate observable state;
- computed values for derivations from observable state;
- reactions only when reactive state must synchronize with an external effect;
- lifecycle and disposal for reactions, timers, subscriptions, requests, child
  models, and form instances they create.

MobX units should not become:

- generic service locators;
- transport clients;
- bags of unrelated screen helpers;
- hidden owners of business rules that belong in domain services, use cases, or
  explicit view models.

## Hard Rules

- [DECISION] Mutate observable state through the repo-approved action pattern.
  When strict action mode or local style requires it, wrap mutations after
  `await` in `runInAction` or the repo's equivalent.
- [DECISION] Treat actions as the visible mutation boundary. Do not mutate
  observable state from renderer code, transport callbacks, or reactions unless
  the repo pattern explicitly defines that owner.
- [DECISION] Use computed values for deterministic derivations from observable
  state. Do not duplicate cached state unless lifecycle, performance, or
  transport boundaries require it.
- [DECISION] Computed values must stay derivational: no requests, subscriptions,
  timers, navigation, logging, mutation, or other synchronization effects.
- [DECISION] Use `observer` only around components that read observables. Keep
  observable reads close enough to render that reactivity is clear.
- [DECISION] Reactions are for synchronization effects, not ordinary derivation.
  Dispose every reaction, autorun, subscription, timer, and long-lived request
  owner created by the unit.
- [DECISION] Reactions must name the external system they synchronize with. If
  no external synchronization exists, use computed state or an explicit action
  instead.
- [DECISION] Lifecycle is correctness. Models and stores that create resources
  must expose setup/init and dispose ownership according to repo style.
- [DECISION] Do not dispose shared or still-mounted models from transient cleanup
  paths. Verify ownership before adding cleanup logic.
- [DECISION] Async actions should expose user-visible status and recoverable
  error mapping through explicit state, not implicit promise inspection in JSX.
- [DECISION] Keep MobX boundaries aligned with the selected architecture. A
  store should not mix transport mapping, UI rendering details, and domain
  policy in one abstraction.

## Verification Signals

When MobX is selected, verification may need `tests` for actions, computed
derivations, reactions, async status transitions, and disposal ownership.
Structure or ownership checks map to `architecture_or_structure` through
`verification.md`.

## Stop Conditions

- Return `needs_architect` when ownership between store, view model, service,
  data source, and form model is unclear.
- Return `needs_analyst` when visible statuses, error handling, or validation
  behavior is unclear.
- Return `needs_human` when selecting MobX creates a new repo precedent.
