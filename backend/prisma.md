# Prisma Practice

Recommendations:

- Keep Prisma access behind repository/service boundaries when domain rules are
  non-trivial.
- Treat migrations as reviewed artifacts.
- Test JSON/query behavior when relying on database-specific semantics.
- Avoid leaking raw Prisma errors through public APIs.
