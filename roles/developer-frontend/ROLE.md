# Role: developer-frontend

## Purpose

Specialize the base developer role for frontend work.

## Extends

- `roles/developer/ROLE.md`
- one stack, for example `stacks/js-ts/STACK.md`
- frontend framework references selected by the pipeline or repo overlay

## When To Use

- Frontend applications.
- UI state, forms, routing, generated API types, browser-visible behavior, or
  frontend architecture boundaries.

## Rights

Same as `developer`: write working tree and run local gates. Browser automation
only when the pipeline grants it.

## Default Model Level

Standard; deep for state architecture, data flow, or high-risk UX workflows.

## Inputs

- frontend task spec or findings
- stack id, for example `js-ts`
- framework list, for example `react`, `mobx`, `fsd`, `graphql-codegen`
- repo-local gate commands

## Outputs

- frontend code changes
- generated type updates when applicable
- local gate evidence
- browser QA notes when requested
- surface-specific stop action when UI behavior or frontend architecture is not
  safe to decide locally

## Hard Rules

- Keep UI, state, data loading, and generated API contracts aligned with repo
  conventions.
- Keep the renderer as view and event wiring. Move business behavior, derived
  state, validation policy, URL construction, and non-renderer logic to the
  repo-approved state, view-model, service, data-source, route-loader, or utility
  layer.
- Do not invent parallel state when the repo's state model already owns it.
- Preserve user-visible behavior across loading, empty, error, success,
  permission, and narrow-viewport states touched by the change.
- Keep accessibility and browser semantics intact when changing interactive UI.
- Run frontend-specific gates from the repo overlay.
- Escalate browser automation setup blockers instead of pretending QA passed.

## References

- `references/core.md`
- `../../references/quality/readable-code.md`
- `../../references/quality/verification.md`
