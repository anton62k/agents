# GraphQL API Reference

This reference applies when GraphQL is selected by repo evidence, package
metadata, route approval, or overlay config.

## Source Priority

1. Repo-local GraphQL schema, resolver, connection, pagination, codegen, and
   generated-client rules.
2. Existing GraphQL tests and API-service patterns.
3. Official GraphQL and NestJS docs:
   - `https://graphql.org/learn/pagination/`
   - `https://graphql.org/learn/serving-over-http/`
   - `https://graphql.org/learn/validation/`
   - `https://docs.nestjs.com/graphql/quick-start`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows GraphQL schema files, resolvers,
queries, mutations, subscriptions, connection types, generated GraphQL clients,
GraphQL codegen, or route approval selecting GraphQL.

## Responsibilities

GraphQL layer should own:

- schema fields, object types, input types, mutations, queries, subscriptions,
  and field resolvers;
- GraphQL-specific validation, serialization, nullability, and error mapping;
- translating GraphQL args into application API-service input;
- returning GraphQL response shapes such as connection objects.

GraphQL layer should not own:

- business policy;
- Prisma query construction except for narrow mapping adapters approved by repo
  pattern;
- CQRS command/query internals;
- transaction orchestration.

## Pagination

- [DECISION] Prefer paginated connection-style responses for GraphQL collections
  that can grow beyond a tiny bounded set.
- [DECISION] The preferred connection shape is `edges[]`, `edge.node`,
  `edge.cursor`, `pageInfo`, and `totalCount`, with input such as `first` and
  `after`, unless the repo has a different approved connection contract.
- [DECISION] Treat cursors as opaque API values even if the current
  implementation uses offsets internally.
- [DECISION] CQRS query contracts that back GraphQL collections must accept
  pagination, filtering, and ordering input as needed, and return a paginated
  read model instead of a raw array.
- [DECISION] Resolvers should not implement pagination math directly when the
  repo has shared pagination helpers or query-layer pagination.
- [DECISION] Pagination behavior requires tests for invalid cursors or offsets,
  stable ordering, empty results, first page, next page, `hasNextPage`,
  `hasPreviousPage`, and `totalCount` when exposed.

## GraphQL Boundaries

- [DECISION] GraphQL queries should call API-service query methods or approved
  query boundaries. They should not reach into internal command/query classes
  when an API service exists.
- [DECISION] GraphQL mutations should call API-service command methods. If a
  mutation needs to return fresh data, the API service should run command then
  query rather than making the command return a full read model.
- [DECISION] Field resolvers should be explicit about auth, batching, and N+1
  risk. Add loader or batched query boundaries when repeated per-field access
  would be expensive.
- [DECISION] Nullability is a public contract. Do not change nullable vs
  non-null behavior without matching resolver behavior, generated artifacts,
  tests, and compatibility review.
- [DECISION] GraphQL error mapping should preserve the public error contract
  while keeping internal persistence and infrastructure details out of the
  response.
- [DECISION] Keep generated GraphQL clients and schema artifacts in sync with
  API changes through repo-approved scripts.

## Verification Signals

GraphQL changes commonly require `tests` for schema, resolver, pagination, auth,
nullability, and error behavior; `build_or_package` for schema/codegen output;
and `architecture_or_structure` for resolver/API-service boundaries through
`verification.md`.

## Stop Conditions

- Return `needs_architect` when GraphQL schema shape, pagination contract,
  resolver ownership, or batching strategy is unclear.
- Return `needs_analyst` when public field behavior, nullability, validation, or
  error behavior is unclear.
- Return `needs_human` when changing a public GraphQL contract or pagination
  model would break clients.
