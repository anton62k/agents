# NestJS / CQRS / Prisma

Apply this profile to projects that have agreed on this stack. It does not require
other projects to migrate.

- Organize Nest modules by business owner; one command or query handler owns one
  operation.
- Let `execute` define the execution boundary and delegate to a private handler.
  Name lower-level methods by purpose. A public feature API only dispatches.
- Commands return `void`, `true`, or a string ID. Queries return data without
  mutations.
- Keep input and result types next to their command or query. Do not create a
  catch-all contracts directory in advance.
- Keep a Prisma chain in named handler methods. Do not introduce a repository
  pattern.
- Call other features through their public API without importing their handlers.
- New data models and mappings require a consumer, not assumptions about the future.
- In projects using Oxlint and Oxfmt, use those tools. Do not add ESLint or a custom
  lint plugin for convenience without separate agreement.
- An explicit transaction requires an invariant across operations. Do not wrap a
  single read or an independently atomic write merely because of accessor design.
  For related changes, check Prisma nested query or mutation capabilities first;
  one chained write does not prove atomicity across several SQL operations.
