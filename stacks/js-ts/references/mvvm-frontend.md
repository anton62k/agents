# Frontend MVVM Reference

This reference applies when the selected frontend architecture uses view models,
presenters, screen models, or an MVVM-like boundary. It is framework-neutral and
may be composed with React, MobX, Vue, Svelte, route loaders, generated clients,
or repo-specific form models.

## Source Priority

1. Repo-local frontend architecture docs.
2. Existing view-model, presenter, screen-model, store, data-source, and form
   patterns.
3. Shared readable-code and application-architecture references.
4. This reference.

## Responsibilities

View model should own:

- screen or component behavior;
- loading, empty, error, and ready states;
- derived lists, grouped rows, badges, counters, labels, and display statuses;
- user actions as named methods;
- validation orchestration and visible-error policy;
- form step transitions;
- routing/search-param construction when it represents screen behavior;
- mapping expected data problems into renderable statuses.

Renderer component should own:

- UI composition;
- semantic markup and design-system primitives;
- event binding to view-model methods;
- accessibility attributes and visual states;
- local UI-only refs when needed for focus or measurement.

Data source should own:

- raw data access;
- transport and generated-client mapping;
- boundary invariant checks;
- typed results for recoverable data problems.

Utility should own:

- pure formatting, parsing, and predicates;
- reusable calculations that do not require observable state;
- URL/search-param serialization when it is not screen behavior.

## Hard Rules

- [DECISION] Keep view models readable as use-case or presenter code. Do not use
  them as dumps for unrelated helpers.
- [DECISION] Do not mix abstraction levels inside one method. Keep transport
  calls, domain decisions, UI labels, and low-level formatting separated unless
  the method is deliberately coordinating them.
- [DECISION] Move reusable pure logic to utilities and reusable system/domain
  capabilities to services. Keep one-off screen behavior in the view model.
- [DECISION] Form models or view models own cross-field validation, server
  errors, dirty/touched policy, step transitions, and visible-error policy.
  Renderer components should not duplicate that policy in JSX.
- [DECISION] Existing form model patterns must coexist during migration. Do not
  replace them opportunistically inside unrelated work.
- [DECISION] View models that create reactions, subscriptions, requests, timers,
  forms, or child models must expose lifecycle and disposal ownership.
- [DECISION] Developers may implement local coding details, but if the task
  requires choosing a new ownership model, return `needs_architect` instead of
  creating a precedent.

## Stop Conditions

- Return `needs_architect` when a change requires deciding between view model,
  store, service, data source, route loader, form model, or utility ownership.
- Return `needs_analyst` when user-visible behavior, validation rules, or states
  are unclear.
- Return `needs_human` when MVVM adoption or migration would create a new repo
  precedent.
