# Backend Testing Reference

This reference applies when a JS/TS backend change needs behavior confidence
across API, CQRS, persistence, jobs, auth, or integration boundaries.

## Source Priority

1. Repo-local `VERIFICATION.md`, test docs, package scripts, and CI jobs.
2. Existing test-kit helpers, fixtures, factories, database setup, and cleanup
   patterns.
3. Official framework and ORM docs:
   - `https://docs.nestjs.com/fundamentals/testing`
   - `https://www.prisma.io/docs/orm/prisma-client/testing/integration-testing`
4. This reference.

## Route Evidence

Select this reference for JS/TS backend surfaces when discovery finds server
entrypoints, API protocol handlers, persistence config, workers, queues,
auth/permission boundaries, backend test kits, or repo verification docs that
require backend behavior evidence.

## Test Categories

- Unit tests: pure domain policy, mappers, validators, utility logic, and
  handlers whose behavior does not depend on the real database.
- Module tests: repo DI module plus selected providers, usually through a
  reusable test kit.
- Integration tests: real database, real ORM client, generated types, real
  transaction behavior, queues, cache, or external boundary substitutes.
- Contract or e2e tests: public API shape, auth, validation, error model,
  pagination, compatibility, and protocol behavior.

## Hard Rules

- [DECISION] Prefer real database tests when behavior depends on Prisma schema,
  generated client behavior, SQL, transactions, constraints, JSON fields,
  pagination, rollback, or concurrency.
- [DECISION] Do not mock Prisma for behavior that Prisma or the database owns.
  Mock Prisma only for narrow unit tests where persistence behavior is outside
  the assertion.
- [DECISION] Prefer repo-approved test kits over ad hoc setup in each spec. A
  good backend test kit boots the relevant module, exposes real Prisma or data
  clients, command/query buses or API services, transaction helpers, seed or
  factory helpers, cleanup, and `close()`.
- [DECISION] A test kit should make the tested boundary visible. The reader
  should know whether the test is exercising a module, API service, command,
  query, data boundary, queue handler, or integration adapter.
- [DECISION] Keep test kits small and surface-specific. Do not create a global
  test kit that hides which module, database, bus, or integration is under test.
- [DECISION] Commands and queries should be tested through the same public
  module boundary that production code uses when that boundary exists.
- [DECISION] API tests must cover request shape, response shape, auth, validation
  errors, application errors, compatibility behavior, and generated-client
  impact when relevant.
- [DECISION] Pagination tests must cover `first`, `after`, invalid cursors or
  offsets, `edges`, `pageInfo`, `totalCount`, stable ordering, and requesting
  the next page.
- [DECISION] Queue, worker, cache, auth, and integration changes need boundary
  behavior checks when mocks would hide retry, idempotency, timing, or
  serialization risk.
- [DECISION] Match test scope to risk. Unit-only evidence is insufficient for
  persistence, transaction, migration, public-contract, auth, queue, or external
  integration behavior when the real boundary owns correctness.
- [DECISION] Do not report the backend as verified when only a targeted subset
  ran. State targeted vs full gate explicitly.

## Verification Signals

Backend testing usually maps to `tests`; generated contracts and package
surfaces may also require `build_or_package`, while boundary or module checks
may require `architecture_or_structure` through `verification.md`.

## Stop Conditions

- Return `needs_architect` when the repo lacks a reusable test-kit boundary and
  adding one would set a precedent.
- Return `needs_analyst` when expected error behavior, auth behavior,
  pagination behavior, or acceptance criteria are unclear.
- Return `needs_human` when real database tests require unavailable local
  services, credentials, or destructive setup.
