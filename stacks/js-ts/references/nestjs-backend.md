# NestJS Backend Reference

This reference applies when NestJS is selected by repo evidence, package
metadata, route approval, or overlay config. It is not a default for all JS/TS
backends.

## Source Priority

1. Repo-local Nest modules, API services, providers, guards, pipes, interceptors,
   and test patterns.
2. Existing module export boundaries and DI patterns.
3. Official NestJS docs:
   - `https://docs.nestjs.com/fundamentals/testing`
   - `https://docs.nestjs.com/techniques/validation`
   - `https://docs.nestjs.com/graphql/quick-start`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows NestJS modules, controllers,
resolvers, providers, guards, pipes, interceptors, decorators, `TestingModule`,
or Nest-specific package metadata and framework config.

## Responsibilities

Nest transport adapters should own:

- request parsing and framework decorators;
- guards, pipes, interceptors, and filters;
- controller, resolver, subscription, gateway, or worker entrypoints;
- protocol-specific DTO and response mapping.

Nest application providers should own:

- module composition and DI wiring;
- API services that present the module's public application surface;
- use cases, command/query handlers, services, and integration adapters
  according to repo pattern.

## Hard Rules

- [DECISION] Keep controllers, resolvers, gateways, and tools thin. They should
  parse, authorize at the framework boundary, call a module API service or
  approved application boundary, and map protocol output.
- [DECISION] Do not place business policy, transaction orchestration, raw Prisma
  query construction, or CQRS command/query construction directly in transport
  handlers when the repo has a module API service boundary.
- [DECISION] Use `TestingModule` or the repo-approved Nest test kit for module
  behavior. Override external integrations at their boundary; do not override
  real Prisma or database behavior when persistence is under test.
- [DECISION] Module exports are public contracts. Export API services and
  approved providers, not internal command/query handlers or low-level
  persistence details, unless the repo explicitly uses them as public APIs.
- [DECISION] Provider scope and lifecycle are architecture decisions when they
  affect transactions, caching, request context, subscriptions, or background
  work. Do not change scope casually inside feature work.
- [DECISION] Guards, pipes, interceptors, and filters are framework adapters.
  They may enforce protocol concerns, but business policy should still live in
  the approved application or domain boundary.
- [DECISION] Keep generated DTOs, validation, and serialization in sync with the
  public API contract. API contract changes require corresponding tests.

## Idiomatic Form

- [DECISION] Modules should present a small public API through exports. Keep
  internal providers private unless they are an approved module contract.
- [DECISION] Controllers, resolvers, and gateways should look like transport
  adapters: decorator metadata, request mapping, boundary call, response mapping.
  If they read like use cases, move behavior into the approved provider.
- [DECISION] Provider names and injection tokens should reflect their
  responsibility at the call site. Avoid generic `Manager`, `Helper`, or
  `Service` names when a narrower module concept exists.
- [DECISION] Do not let decorators, framework exceptions, request objects, or
  GraphQL/REST DTOs leak into domain policy unless the repo intentionally makes
  that layer framework-bound.
- [DECISION] Keep module test setup idiomatic: use the repo Nest test kit or
  `TestingModule` pattern instead of ad hoc object graphs when Nest behavior or
  DI is under test.

## Verification Signals

NestJS changes commonly require `tests` for module or API behavior,
`architecture_or_structure` for module boundaries, and `build_or_package` when
generated DTOs or framework metadata must stay synchronized. Exact gates are
owned by `verification.md`.

## Stop Conditions

- Return `needs_architect` when module exports, DI lifetime, provider ownership,
  or API-service boundaries are unclear.
- Return `needs_analyst` when request/response/error behavior is unclear.
- Return `needs_human` when changing module exports would create a repo
  precedent.
