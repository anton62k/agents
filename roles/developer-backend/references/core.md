# Backend Developer Core Reference

Backend developer work must preserve contracts, persistence behavior, and
runtime boundaries.

## Hard Rules

- [DECISION] Define API changes through request shape, response shape, auth
  requirements, error model, retry or idempotency behavior, compatibility notes,
  and contract tests.
- [DECISION] Keep transport handlers thin when the framework supports separate
  service, handler, or domain layers.
- [DECISION] Put state-changing business intent in commands or services, and
  keep read paths side-effect free when the repo uses CQRS.
- [DECISION] Prisma or another ORM may live directly in command/query handlers
  when that is the repo pattern. The handler must still read as one use case and
  should not mix raw query detail, transport mapping, domain policy, and system
  mechanics in one unreadable block.
- [DECISION] Add services for reused domain policy, integration boundaries, or
  cross-cutting backend capabilities. Do not add a service only to satisfy a
  generic layering rule.
- [DECISION] Keep persistence details behind repo-approved boundaries when
  domain rules are non-trivial.
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

- `../../../legacy/backend/api-contracts.md`
- `../../../legacy/backend/cqrs.md`
- `../../../legacy/backend/integration-tests.md`
- `../../../legacy/backend/nestjs.md`
- `../../../legacy/backend/prisma.md`
- `../../../references/quality/readable-code.md`
- `../../../stacks/js-ts/references/application-architecture.md`
