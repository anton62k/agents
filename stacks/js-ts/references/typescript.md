# TypeScript Reference

TypeScript rules apply when the stack owner selects `js-ts`.

## Hard Rules

- [DECISION] Use the repo TypeScript config and scripts as the source of truth.
- [DECISION] Do not weaken public or internal types to bypass review, lint, or
  test failures.
- [DECISION] When a public TypeScript API is part of the product contract, cover
  expected inference and invalid usage with type tests.
- [DECISION] Document known inference limitations instead of pretending types
  are stricter than they are.

## Library Surface

- [DECISION] Library packages expose an explicit public surface through package
  metadata, declaration output, and README examples.
- [DECISION] Verify generated declarations and exported files before publishing
  or handing work to an integrator.

## Source Material

- `../../../legacy/practices/type-tests.md`
- `../../../legacy/libraries/typescript-library.md`
- `../../../legacy/libraries/package-exports.md`
