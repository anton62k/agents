# React UI Boundary Reference

This reference applies when React is selected by repo evidence, package
metadata, route approval, or overlay config. It is not a default for all
frontend work.

## Source Priority

1. Repo-local React architecture docs and examples.
2. Repo-local component, hook, page, route, and design-system conventions.
3. Official React docs:
   - `https://react.dev/reference/rules/components-and-hooks-must-be-pure`
   - `https://react.dev/learn/you-might-not-need-an-effect`
   - `https://react.dev/reference/rules/rules-of-hooks`
4. This reference.

## Route Evidence

Select this reference only when discovery finds React-specific evidence, for
example React package metadata, JSX or TSX components, React hooks, React route
or framework config, repo docs, or human-approved route selection.

## Responsibilities

React components should own:

- layout composition;
- semantic HTML and design-system component composition;
- event binding to already-named actions;
- accessibility attributes and visual states;
- local ephemeral UI state for focus, disclosure, measurement, or uncontrolled
  browser behavior;
- framework lifecycle integration when React is the only correct owner.

React components should not own:

- business rules or domain decisions;
- async orchestration and transport mapping;
- validation policy;
- derived read-model construction;
- pricing, status, permission, or workflow decisions;
- URL/search-param construction when it represents screen behavior rather than
  link rendering.

## Hard Rules

- [DECISION] Treat render as a pure calculation from inputs. Do not introduce
  side effects, mutations, subscriptions, or requests in render paths.
- [DECISION] Prefer computing derived UI data in a view model, presenter, route
  loader, store, selector, or pure utility according to repo pattern. Avoid
  using effects to derive state from other state.
- [DECISION] Use hooks for React lifecycle, context, refs, effects, memoization,
  and framework integration. Do not turn hooks into business-logic containers.
- [DECISION] Custom hooks may adapt React mechanics, but reusable business logic
  should remain testable without rendering React.
- [DECISION] Use effects for synchronization with external systems or framework
  lifecycle only. Do not add effects for calculations that can be derived from
  inputs, view models, stores, route loaders, selectors, or utilities.
- [DECISION] Keep components thin. Complex conditions, grouping, sorting,
  formatting, and URL construction should move to the selected non-renderer
  owner.
- [DECISION] Keep React state local only when it is purely view-local. Shared,
  persisted, permission-sensitive, workflow, or cross-component state belongs in
  the repo-approved state owner.
- [DECISION] Prefer one non-trivial component per file when the repo follows
  that structure. Keep tiny private subcomponents local only when local reading
  improves.
- [DECISION] Keep prop contracts explicit and small. Do not pass broad service,
  store, or observable internals through the tree when a render-ready contract is
  enough.
- [DECISION] Treat React context and providers as composition adapters. They may
  expose dependencies, but they must not become hidden business workflows.
- [DECISION] Interactive UI must preserve semantic controls, labels, visible
  focus, keyboard navigation, contrast, and common-viewport text fit.

## Idiomatic Form

- [DECISION] Components should read as render functions over a small, explicit
  view contract. If a component needs many derived values before returning JSX,
  move that derivation to the selected view model, store, loader, selector, or
  pure utility.
- [DECISION] Event props and local handlers should name user intent, for example
  `onSubmit`, `onClose`, `selectItem`, or `openDetails`, not framework mechanics
  or vague work such as `handleData`.
- [DECISION] Keep hooks near React lifecycle concerns. If a hook reads like a
  use case, domain policy, transport mapper, or validation engine, move that
  behavior behind a non-React boundary.
- [DECISION] Keep JSX visually shallow enough to scan. Extract a component,
  render helper, or data-ready child when nested conditionals, mapping, and
  inline formatting obscure the UI structure.
- [DECISION] Do not pass broad stores, services, generated clients, or raw DTOs
  through component trees when a render-ready prop contract would express the
  same screen state with less coupling. A narrow view model or presenter object
  is acceptable when the selected architecture defines it as the render-ready
  contract.

## Verification Signals

When React is selected, frontend verification may need `tests`,
`architecture_or_structure`, or `build_or_package` capability coverage from
`verification.md`. Exact commands still come from the consuming repo.

## Stop Conditions

- Return `needs_architect` when ownership between component, hook, route loader,
  view model, store, or utility is unclear.
- Return `needs_analyst` when user behavior, validation, empty/loading/error
  states, or acceptance criteria are unclear.
- Return `needs_human` when visual direction, copy, or design-system tradeoffs
  block implementation.
