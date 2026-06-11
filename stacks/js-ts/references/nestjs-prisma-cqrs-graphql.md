# NestJS Prisma CQRS GraphQL Composite Reference

This is a composite route reference, not a backend default. Load it only when
repo evidence or route approval selects NestJS, Prisma, CQRS, and GraphQL
together.

The route is the bundle. The rules remain independently selectable through the
granular references below.

## Load Order

1. `backend-testing.md` for backend verification expectations.
2. `backend-api-layers.md` for transport vs application boundaries.
3. `nestjs-backend.md` when NestJS modules and DI are present.
4. `prisma-data-access.md` when Prisma owns persistence access.
5. `cqrs-backend.md` when commands, queries, handlers, buses, or an equivalent
   CQRS pattern are present.
6. `graphql-api.md` when GraphQL schema, resolvers, generated clients, or
   GraphQL tests are present.
7. `backend-integrations-jobs.md` when queues, workers, jobs, webhooks, or
   external integrations are involved.

## Route Responsibilities

- GraphQL, REST, MCP, and other protocols remain transport adapters.
- Module API services expose the feature surface and hide internal commands and
  queries.
- Commands change state and return id, ids, or boolean results.
- Queries read data and are ready for paginated read models.
- Prisma owns persistence through repo-approved data and transaction boundaries.
- Tests use real database behavior where Prisma or database semantics matter.

## Hard Rules

- [DECISION] Do not select this composite as a shortcut. If a repo uses NestJS
  without GraphQL, Prisma without CQRS, or CQRS without NestJS, load only the
  matching granular references.
- [DECISION] Public API changes should flow transport -> API service -> command
  or query -> data boundary, with mapping at the appropriate boundary.
- [DECISION] Collection reads exposed through GraphQL should be pagination-ready
  from the CQRS query contract through the GraphQL connection type.
- [DECISION] State-changing commands should return id, ids, or boolean. Use a
  query for data returned after writes.
- [DECISION] Real database tests are required when the change depends on Prisma,
  transactions, generated SQL, migrations, constraints, JSON, or pagination.

## Stop Conditions

- Return `needs_architect` when any layer boundary in this route is unclear.
- Return `needs_analyst` when public behavior, error behavior, auth behavior, or
  pagination semantics are unclear.
- Return `needs_human` when selecting this route would create a new repo
  precedent.
