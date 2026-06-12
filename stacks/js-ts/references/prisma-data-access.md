# Prisma Data Access Reference

This reference applies when Prisma is selected by repo evidence, package
metadata, route approval, or overlay config. It is not a backend default.

## Source Priority

1. Repo-local Prisma schema, migrations, generated-client rules, transaction
   helpers, and database test setup.
2. Existing command, query, use-case, API-service, and data-access patterns.
3. Official Prisma docs:
   - `https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production`
   - `https://www.prisma.io/docs/orm/prisma-client/testing/integration-testing`
   - `https://www.prisma.io/docs/orm/prisma-client/queries/transactions`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows Prisma schema, Prisma Client,
migrations, generated Prisma types, Prisma transaction helpers, database test
setup, or package metadata/config selecting Prisma as the persistence boundary.

## Responsibilities

Prisma should own:

- generated database types;
- schema-defined relations, constraints, enums, and indexes;
- query construction where the repo data boundary allows it;
- transactions and database-specific behavior through repo-approved helpers.

Prisma should not own:

- public API shape by accident;
- business policy that should be named in application or domain code;
- transport-specific DTO mapping;
- hidden transaction propagation through long argument chains.

## Migrations

- [DECISION] Create and apply Prisma migrations only through the official Prisma
  Migrate CLI flow through repo scripts, for example `prisma migrate dev`,
  `prisma migrate dev --create-only`, and `prisma migrate deploy`.
- [DECISION] Do not use `prisma db push` as the committed migration workflow.
  Use it only when repo docs explicitly allow prototyping, and do not ship that
  as a migration substitute.
- [DECISION] Review migration files and generated artifacts as code. Do not edit
  generated client output manually.
- [DECISION] Schema changes must keep migration files, generated client output,
  tests, and public data contracts synchronized according to repo policy.
- [DECISION] `prisma migrate reset`, production migration repair, and
  `prisma migrate resolve` are destructive or precedent-setting operations and
  require human approval unless the repo overlay explicitly authorizes them.

## Transactions

- [DECISION] Prefer a repo-approved transaction abstraction for multi-step
  writes, especially a `TransactionPrismaService`-style helper that uses async
  context to expose the active transaction client.
- [DECISION] Do not pass transaction clients through long command, query, or
  helper argument chains when the repo has an async-context transaction helper.
- [DECISION] Keep transaction boundaries explicit at the application boundary.
  State isolation, retry, rollback, and idempotency assumptions when they matter.
- [DECISION] A command or use case that relies on transaction context must make
  that requirement visible through the repo-approved transaction abstraction,
  not hidden control flow.
- [DECISION] Test transaction behavior against a real database when correctness
  depends on rollback, isolation, unique constraints, concurrent writes, JSON
  behavior, or generated SQL.

## Types And Data Access

- [DECISION] Reuse generated Prisma types for command/query data and return
  types when they accurately represent the boundary. Add narrower explicit types
  when the public contract must hide persistence shape.
- [DECISION] Prisma may live directly in command handlers, query handlers, use
  cases, or data-access units when the repo intentionally uses that data
  boundary. Do not add a repository layer only to satisfy a generic pattern.
- [DECISION] Avoid returning raw Prisma errors or raw persistence objects through
  public API boundaries unless the repo contract explicitly allows it.
- [DECISION] Map expected Prisma and database errors into application errors at
  the approved boundary. Preserve enough evidence for debugging without leaking
  persistence details through public APIs.

## Idiomatic Form

- [DECISION] Query shapes should be named or localized when `where`, `include`,
  `select`, ordering, pagination, or relation traversal carries business or API
  meaning.
- [DECISION] Prefer generated Prisma types at the persistence boundary and
  narrower explicit types at public boundaries that should hide database shape.
- [DECISION] Keep Prisma calls in command, query, use-case, or data-access units
  according to the repo pattern. Do not add a repository layer only to make code
  look cleaner.
- [DECISION] Use repo-approved pagination, transaction, and error-mapping
  helpers instead of inventing parallel query conventions.
- [DECISION] Keep migrations, schema, generated client expectations, and tests
  visually synchronized in the diff. A schema-only change that hides required
  migration or test updates is not idiomatic Prisma work.

## Verification Signals

Prisma changes commonly require `tests` with real database behavior,
`build_or_package` for generated client or declaration synchronization, and
`architecture_or_structure` when data boundaries or migrations change. Exact
gates are owned by `verification.md`.

## Stop Conditions

- Return `needs_architect` when migration strategy, transaction helper,
  persistence boundary, or generated-type exposure is unclear.
- Return `needs_analyst` when data behavior, compatibility, or error semantics
  are unclear.
- Return `needs_human` before destructive database commands, production
  migration repair, or changing established persistence boundaries.
