# Backend API Layers Reference

This reference applies when a backend exposes one or more API protocols such as
GraphQL, REST, MCP, CLI, webhooks, or workers.

## Source Priority

1. Repo-local API docs, controller/resolver/tool patterns, generated contracts,
   and module API services.
2. Existing auth, validation, error, pagination, and compatibility behavior.
3. Protocol-specific references selected by the route.
4. This reference.

## Route Evidence

Select this reference when a backend surface exposes protocol entrypoints,
generated API contracts, controllers, resolvers, tools, webhooks, workers,
module API services, or compatibility-sensitive public behavior.

## Responsibilities

Transport layer should own:

- protocol decorators and request parsing;
- protocol validation and serialization;
- framework guards, pipes, filters, middleware, and interceptors;
- mapping request context into application input;
- mapping application output into protocol response shape.

Application API service should own:

- the stable module-facing application surface;
- command/query invocation when CQRS is selected;
- composition across commands, queries, and integration adapters;
- protocol-neutral behavior and error semantics.

Domain or application units should own:

- business policy;
- persistence decisions through repo-approved data boundaries;
- transaction and idempotency behavior.

## Hard Rules

- [DECISION] Do not mix GraphQL, REST, MCP, CLI, or webhook protocol code into
  CQRS handlers or domain services.
- [DECISION] Do not let transport handlers construct internal commands/queries
  directly when the module has an API service boundary.
- [DECISION] API changes must define request shape, response shape, auth
  behavior, validation errors, application errors, idempotency or retry behavior,
  pagination behavior, and compatibility impact.
- [DECISION] A module may support several protocols, but they should converge on
  the same application API service unless protocol behavior intentionally
  differs.
- [DECISION] Generated DTOs, schemas, clients, or protocol contracts are public
  API evidence. Keep them synchronized with the application boundary and review
  them with the code that changed the contract.
- [DECISION] Transport-specific auth, validation, serialization, and error
  mapping should be explicit at the protocol boundary. Do not let generic
  helpers hide compatibility behavior.
- [DECISION] Breaking contract changes, auth changes, and compatibility changes
  require human approval.

## Verification Signals

API-layer changes commonly require `tests` for contract behavior,
`architecture_or_structure` for layer boundaries, and `build_or_package` when
generated contracts or clients must stay in sync. Exact gates are owned by
`verification.md`.

## Stop Conditions

- Return `needs_architect` when API service boundaries, public contracts, or
  protocol ownership are unclear.
- Return `needs_analyst` when request, response, error, auth, or pagination
  behavior is unclear.
- Return `needs_human` when public compatibility, auth, or protocol support would
  change.
