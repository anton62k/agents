# Test Strategy

Test coverage should scale with risk.

## Library

- Unit tests for runtime behavior.
- Type tests for public TypeScript surface.
- Packaging/build checks for exported files and declaration output.

## Frontend

- Unit tests for state and parsing logic.
- Component tests for reusable UI logic.
- Browser/e2e checks for critical workflows and visual regressions.

## Backend

- Unit tests for pure logic.
- Integration tests for API contracts, persistence, queues, and auth boundaries.
- Migration tests when schema changes are risky.
