# JavaScript And TypeScript Application Architecture Reference

This reference maps readable-code rules to JS/TS applications, services,
libraries, and tools. It is not a framework prescription. Repo overlay and
existing architecture win for concrete structure.

## Source Priority

Use evidence in this order:

1. Repo-local architecture docs, ADRs, `REPOSITORY.md`, and `AGENTS.md`.
2. Existing source structure and nearby implementation patterns.
3. Package scripts, generated-code rules, and framework config.
4. This stack reference.

## Layer Boundaries

Common JS/TS layers:

- transport or entrypoint: HTTP, GraphQL, CLI, route loader, controller,
  framework hook, worker consumer;
- application or use case: orchestration of one business operation;
- domain policy: business rules, validation, state transitions, eligibility,
  matching, pricing, status decisions;
- data access: repositories, data sources, generated clients, ORM calls,
  persistence query construction;
- presenter or view model: derived read models, UI status, formatting,
  user-visible actions;
- renderer or adapter: React components, templates, serialization, framework
  glue, protocol mapping;
- system utility: env access, caching, lifecycle, retries, logging,
  observability, concurrency, parsing, serialization.

Do not mix these layers in one unit when extracting a name would clarify intent.

## Backend And CQRS

- [DECISION] In CQRS-style repos, Prisma or another ORM may be used directly in
  command and query handlers when that is the established data-access pattern.
- [DECISION] A command or query handler should still read as one use case. Use
  named private methods, functions, or narrow services when raw query details,
  mapping, validation, notification, or transaction steps obscure the use-case
  flow.
- [DECISION] Add a service when logic is reused, crosses a domain boundary,
  wraps an integration, or owns a durable policy. Do not add a service only to
  satisfy a generic layering rule.
- [DECISION] Keep write-side business intent separate from read-side projection
  logic when the repo uses CQRS.
- [DECISION] Keep transaction boundaries explicit. Do not hide partial writes,
  retry behavior, or rollback assumptions behind generic helpers.
- [DECISION] Public API handlers, controllers, and resolvers should stay thin:
  parse/auth/dispatch/map, not business-policy ownership.

## Frontend And UI Runtime

- [DECISION] React or another UI framework should render and wire events. Product
  behavior, derived read models, validation policy, URL construction, and async
  state belong in view models, stores, services, route loaders, or utilities
  according to repo pattern.
- [DECISION] Keep framework hooks as adapters. If a hook starts owning business
  behavior, move that behavior into a named non-React unit.
- [DECISION] Put each non-trivial component in its own file when the repo uses
  file-per-component structure. Keep local subcomponents only when they are
  tiny, private, and improve readability.

## Libraries And Packages

- [DECISION] Public package APIs should expose narrow factories, options,
  interfaces, and typed results instead of implementation classes when the
  package is meant to hide internals.
- [DECISION] Keep headless core behavior separate from renderer/adapters when a
  package has multiple consumers or might support multiple runtimes.
- [DECISION] Lifecycle ownership must be explicit. If an object creates
  reactions, subscriptions, timers, caches, workers, scopes, or child models, it
  must define who disposes them.
- [DECISION] Generated artifacts and declaration output are reviewed artifacts.
  Do not edit generated code manually unless the repo explicitly allows it.

## Readability Rules

- Prefer typed result objects for expected failures and data invariants.
- Prefer named predicates, mappers, and policies over dense inline conditions.
- Keep formatting and presentation mapping close to the presenter/view model,
  not in raw data sources or generic services.
- Keep environment access in a system boundary, not scattered through business
  logic.
- Keep cross-cutting concerns such as logging, telemetry, retries, caching, and
  feature flags out of domain policy unless they are part of the business rule.

## Review Questions

- Does this code read top-down at one abstraction level?
- Is the data layer allowed to own this detail in this repo?
- Is business behavior testable without rendering, transport, or infrastructure?
- Does a system utility avoid importing domain-specific concepts?
- Does a business use case avoid direct environment/framework/lifecycle
  mechanics?
- Are expected errors handled where they can be communicated meaningfully?
