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

## Responsibilities

React components should own:

- layout composition;
- semantic HTML and design-system component composition;
- event binding to already-named actions;
- accessibility attributes and visual states;
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
- [DECISION] Keep components thin. Complex conditions, grouping, sorting,
  formatting, and URL construction should move to the selected non-renderer
  owner.
- [DECISION] Prefer one non-trivial component per file when the repo follows
  that structure. Keep tiny private subcomponents local only when local reading
  improves.
- [DECISION] Keep prop contracts explicit and small. Do not pass broad service,
  store, or observable internals through the tree when a render-ready contract is
  enough.
- [DECISION] Interactive UI must preserve semantic controls, labels, visible
  focus, keyboard navigation, contrast, and common-viewport text fit.

## Stop Conditions

- Return `needs_architect` when ownership between component, hook, route loader,
  view model, store, or utility is unclear.
- Return `needs_analyst` when user behavior, validation, empty/loading/error
  states, or acceptance criteria are unclear.
- Return `needs_human` when visual direction, copy, or design-system tradeoffs
  block implementation.
