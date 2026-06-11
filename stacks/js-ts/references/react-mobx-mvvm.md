# React MobX MVVM Reference

This reference applies when the selected repo uses React with MobX, view models,
or an MVVM-like pattern. It is not a global default for all JS/TS repositories.
Use it only when repo evidence or the approved route selects it.

## Source Priority

1. Repo-local frontend architecture docs and examples.
2. Existing `useViewModel`, DI, store, data-source, and form patterns.
3. FSD or other structure-check config when present.
4. This reference.

## Responsibilities

- React components render, compose UI, and wire events to already-named actions.
- View models own screen or component behavior, derived read models, user-visible
  statuses, validation orchestration, and UI actions.
- Stores own shared state that intentionally crosses pages, widgets, or feature
  boundaries.
- Data sources own raw data access and transport mapping. They do not build UI
  read models.
- Services own reusable system or domain capabilities, not one-off component
  convenience logic.
- Utilities own pure calculations, formatting, parsing, URL construction, and
  predicates when they do not need observable state.

## Hard Rules

- [DECISION] React must not own business logic. It should not contain domain
  decisions, pricing/status rules, validation policy, async orchestration,
  data-source composition, or derived read-model construction.
- [DECISION] Avoid putting logic in React hooks unless the logic is truly about
  adapting React lifecycle, context, refs, effects, or framework integration.
  Business logic belongs in a non-React unit.
- [DECISION] Keep view models readable as use-case or presenter code, not as a
  dump of unrelated helpers. Split system integration, data access, and pure
  transformation when a view model crosses abstraction levels.
- [DECISION] Keep components thin. If a component needs complex conditions,
  sorting, grouping, formatting, or URL construction, move that work to a view
  model or utility according to repo pattern.
- [DECISION] Prefer one non-trivial component per file when the repo follows
  that structure. Keep tiny private subcomponents local only when extracting
  them would reduce readability.
- [DECISION] Use `observer` at components that read observable state. Do not
  pass raw observable internals deeper than the component boundary needs.
- [DECISION] After `await`, wrap MobX observable mutations in the repo-approved
  action pattern, for example `runInAction`, when strict actions or local style
  require it.
- [DECISION] Lifecycle is part of correctness. View models, stores, and models
  that create reactions, timers, subscriptions, requests, form instances, or
  child models must define setup/init and dispose ownership.
- [DECISION] Do not dispose a shared or still-mounted form/model from a transient
  cleanup path. Verify ownership before adding cleanup logic.
- [DECISION] FSD or another structure rule is blocking only when repo config or
  overlay enables it. Do not infer FSD as a default.

## MVVM Boundaries

View model should own:

- loading, empty, error, and ready states;
- derived lists, grouped rows, badges, counters, and display status;
- user actions as named methods;
- routing/search-param construction when it represents screen behavior;
- form step transitions and validation orchestration;
- mapping expected data errors into renderable statuses.

React component should own:

- layout composition;
- semantic HTML and design-system components;
- event binding to view-model methods;
- accessibility attributes and visual states;
- local UI-only refs when needed for focus or measurement.

Data source should own:

- fetching raw data or reading fixture/mock data;
- transport and generated-client mapping;
- data invariant checks that belong at the data boundary;
- typed results for recoverable data problems.

Utility should own:

- pure formatting, parsing, and predicate logic;
- URL/search-param serialization;
- reusable calculations that do not depend on observable state.

## Forms

- [DECISION] For new complex reactive forms, prefer the repo-approved forms
  library or form model pattern over ad hoc React local state.
- [DECISION] Existing form model patterns such as `FormState`, `FormGroup`, or
  `FormControl` must coexist during migration. Do not replace them
  opportunistically inside unrelated work.
- [DECISION] Cross-field validation, server errors, step transitions, dirty and
  touched behavior, and visible-error policy belong in a form model or view
  model, not in JSX.
- [DECISION] Controlled/uncontrolled framework mechanics are adapter details.
  Business form state should remain testable without rendering React.

## Stop Conditions

- Return `needs_architect` when a change requires deciding between view model,
  store, service, data source, route loader, or utility ownership.
- Return `needs_analyst` when user-visible behavior, validation rules, or
  loading/empty/error states are unclear.
- Return `needs_human` when visual direction or product copy blocks a thin,
  behavior-preserving implementation.
