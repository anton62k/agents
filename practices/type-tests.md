# Type Tests

Use type tests when a TypeScript public API is part of the product contract.

## Recommended Shape

- Keep `*.test-d.ts` files under `test/types`.
- Include them in `tsc --noEmit`.
- Use positive assignments for expected inference.
- Use `@ts-expect-error` for invalid usage.
- Document known limitations instead of pretending inference is stronger than it
  is.
