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
8. `idiomatic-js-ts.md` for plain TypeScript functions, classes, modules,
   async flow, and type-level code form.

## Route Evidence

Select this composite only when route evidence selects NestJS, Prisma, CQRS, and
GraphQL together. If one concern is absent or uncertain, load only the confirmed
granular references and return `needs_architect` when the missing concern would
change ownership.

## Route Responsibilities

- GraphQL, REST, MCP, and other protocols remain transport adapters.
- Module API services expose the feature surface and hide internal commands and
  queries.
- Commands change state and return id, ids, or boolean results.
- Queries read data and are ready for paginated read models.
- Prisma owns persistence through repo-approved data and transaction boundaries.
- Tests use real database behavior where Prisma or database semantics matter.

## Ownership Tie-Breaks

- [DECISION] Transport concerns stay in GraphQL, REST, MCP, or other adapters;
  application intent enters through the module API service.
- [DECISION] Write behavior belongs to commands or use cases; read behavior
  belongs to queries or read-model builders.
- [DECISION] Persistence shape belongs to Prisma and the approved data boundary;
  public API shape belongs to GraphQL or the selected protocol reference.
- [DECISION] Transaction ownership belongs to the application boundary and the
  repo-approved Prisma transaction abstraction, not to transport adapters.
- [DECISION] Pagination starts at the query contract and is mapped into GraphQL
  connection shape by the GraphQL layer.

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
- [DECISION] Preserve idiomatic form at each selected boundary: transport maps,
  API service exposes the module surface, commands and queries read as
  application operations, Prisma code stays at the persistence boundary, and
  plain TypeScript helpers stay narrow and named.

## Verification Signals

This composite combines granular verification signals. Common capabilities are
`tests`, `architecture_or_structure`, `build_or_package`, `typecheck`, and
`lint`; exact gates are selected through `verification.md` and the consuming repo
contract.

## Stop Conditions

- Return `needs_architect` when any layer boundary in this route is unclear.
- Return `needs_analyst` when public behavior, error behavior, auth behavior, or
  pagination semantics are unclear.
- Return `needs_human` when selecting this route would create a new repo
  precedent.
