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
- [DECISION] Keep generated DTOs, validation, and serialization in sync with the
  public API contract. API contract changes require corresponding tests.

## Stop Conditions

- Return `needs_architect` when module exports, DI lifetime, provider ownership,
  or API-service boundaries are unclear.
- Return `needs_analyst` when request/response/error behavior is unclear.
- Return `needs_human` when changing module exports would create a repo
  precedent.
