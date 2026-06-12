# Backend CQRS Reference

This reference applies when CQRS is selected by repo evidence, package metadata,
route approval, or overlay config. It may be implemented with NestJS CQRS or a
repo-specific command/query pattern.

## Source Priority

1. Repo-local command, query, handler, API-service, module, and transactional
   helper patterns.
2. Existing command/query type files and module exports.
3. Official NestJS CQRS docs when `@nestjs/cqrs` is selected:
   - `https://docs.nestjs.com/recipes/cqrs`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows commands, queries, handlers,
buses, command/query type files, read/write model separation, API-service
facades over commands and queries, or route approval selecting CQRS.

## Responsibilities

Command should own:

- state-changing business intent;
- validation or policy orchestration required to perform the write;
- transaction boundary participation according to repo pattern;
- returning only id, ids, or a boolean result.

Query should own:

- side-effect-free reads;
- read models, paginated read models, counts, filters, sorting, and lookups;
- mapping persistence results into application read contracts.

API service should own:

- the module's public application API;
- invoking command and query buses or handlers;
- composing command then query when a public API needs data after a write;
- hiding internal command/query classes from transport adapters and other
  modules.

## Hard Rules

- [DECISION] Do not mix CQRS handlers with transport layers. GraphQL resolvers,
  REST controllers, MCP tools, CLIs, and workers call the module API service or
  an approved application boundary.
- [DECISION] When a module uses CQRS, export an API service or equivalent facade.
  Do not expose internal command/query classes as the module's normal public API.
- [DECISION] Commands return only an id, ids, or boolean by default. If the
  caller needs data, run a query after the command through the API service.
- [DECISION] Queries return read models. Collection queries should be designed
  for pagination from the start when they can grow beyond a tiny bounded set.
- [DECISION] Put command and query input/return types in explicit type files near
  the command/query. Reuse Prisma generated types when they are the correct data
  boundary; otherwise define narrower public types.
- [DECISION] Command and query types are contracts for the application boundary.
  Do not let transport DTOs or raw persistence shapes become those contracts by
  accident.
- [DECISION] Keep handlers readable as one use case or read model. Split raw
  query details, domain policy, transport mapping, and integration calls when
  abstraction levels mix.
- [DECISION] Do not use commands for read-only work or queries for writes.
- [DECISION] Commands that enqueue work, publish events, or call integrations
  must make idempotency and transaction ordering explicit.
- [DECISION] Events, sagas, and process managers require idempotency, retry, and
  ordering tests when they cross process or transaction boundaries.

## Verification Signals

CQRS changes commonly require `tests` for command/query behavior and
`architecture_or_structure` for boundary, type, and handler ownership. Generated
or package-visible contracts may require `build_or_package` through
`verification.md`.

## Stop Conditions

- Return `needs_architect` when module API service boundaries, command/query
  visibility, transaction ownership, or read/write split is unclear.
- Return `needs_analyst` when business intent, read model shape, or write result
  semantics are unclear.
- Return `needs_human` when introducing CQRS would create a repo precedent.
