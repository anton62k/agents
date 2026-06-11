# Backend Developer Core Reference

Backend developer work must preserve contracts, persistence behavior, and
runtime boundaries.

## Hard Rules

- [DECISION] Define API changes through request shape, response shape, auth
  requirements, error model, retry or idempotency behavior, compatibility notes,
  and contract tests.
- [DECISION] Keep transport handlers thin when the framework supports separate
  service, handler, or domain layers.
- [DECISION] Put state-changing business intent in the repo-approved application
  layer, for example a use case, command handler, service, or workflow unit.
- [DECISION] Keep read paths side-effect free when the repo uses separate read
  and write models.
- [DECISION] Generated clients, ORMs, query builders, and repositories belong at
  the repo-approved data boundary. Do not force a repository or service layer
  when the repo intentionally keeps data access in a handler or use-case unit.
- [DECISION] A backend unit should still read as one use case. Split raw query
  detail, transport mapping, domain policy, integration calls, and system
  mechanics when they obscure the flow.
- [DECISION] Add services for reused domain policy, integration boundaries, or
  cross-cutting backend capabilities. Do not add a service only to satisfy a
  generic layering rule.
- [DECISION] Keep persistence details behind repo-approved boundaries when
  domain rules are non-trivial or the public contract should not expose storage
  shape.
- [DECISION] Treat migrations and generated artifacts as reviewed artifacts that
  follow repo-local rules.
- [DECISION] Test database-specific query, JSON, transaction, and rollback
  behavior when the implementation depends on it.
- [DECISION] Do not leak raw persistence or infrastructure errors through public
  APIs.
- [DECISION] Queue, worker, auth, and integration changes need behavior checks
  that cross the relevant boundary when mocks would hide risk.

## Stop Conditions

- Return `needs_architect` when the change requires new service boundaries,
  public contracts, persistence ownership, or migration strategy.
- Return `needs_analyst` when domain behavior, error behavior, or acceptance
  criteria are unclear.
- Return `needs_human` when the repo requires explicit approval for migrations,
  auth changes, or compatibility breaks.

## Source Material

- Always load:
  - `../../../references/quality/readable-code.md`

- Load when the selected stack is `js-ts`:
  - `../../../stacks/js-ts/references/application-architecture.md`
  - `../../../stacks/js-ts/references/backend-testing.md`

- Load when selected by route evidence or repo overlay:
  - `../../../stacks/js-ts/references/backend-api-layers.md`
  - `../../../stacks/js-ts/references/nestjs-backend.md`
  - `../../../stacks/js-ts/references/prisma-data-access.md`
  - `../../../stacks/js-ts/references/cqrs-backend.md`
  - `../../../stacks/js-ts/references/graphql-api.md`
  - `../../../stacks/js-ts/references/backend-integrations-jobs.md`
  - `../../../stacks/js-ts/references/nestjs-prisma-cqrs-graphql.md` as a
    composite route only

Do not load CQRS, NestJS, Prisma, GraphQL, a specific ORM, or a repository
pattern as a backend default. They are conditional on repo evidence, route
approval, or overlay config.
