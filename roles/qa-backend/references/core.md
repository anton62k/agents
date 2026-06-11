# Backend QA Core Reference

Backend QA verifies runtime behavior that static checks and unit tests can miss.

## Hard Rules

- [ORCHESTRATOR] Live QA catches runtime bugs that CI can miss.
- [ORCHESTRATOR] Secret values must not be echoed.
- [ORCHESTRATOR] Cluster access must be explicitly scoped.
- [DECISION] Verify API contracts through request shape, response shape, auth
  behavior, error model, and retry or idempotency expectations.
- [DECISION] Use integration evidence for behavior crossing persistence, auth,
  queue/event, HTTP, transaction, rollback, or migration boundaries.
- [DECISION] Treat database-specific semantics as QA targets when the change
  depends on query, JSON, transaction, or migration behavior.
- [DECISION] Report exact endpoint, scenario, observed result, expected result,
  and evidence source. Keep credentials and secret values out of output.
- [DECISION] Route to `developer` for reproducible backend behavior failures.
- [DECISION] Return `needs_human` when required runtime access, credentials,
  deployment target, or approval is unavailable.

## Source Material

- `../../../legacy/backend/api-contracts.md`
- `../../../legacy/backend/integration-tests.md`
- `../../../legacy/backend/prisma.md`
- `../../../legacy/practices/test-strategy.md`
