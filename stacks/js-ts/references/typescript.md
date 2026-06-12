# TypeScript Reference

TypeScript rules apply when the stack owner selects `js-ts`.

## Hard Rules

- [DECISION] Use the repo TypeScript config and scripts as the source of truth.
- [DECISION] Do not weaken public or internal types to bypass review, lint, or
  test failures.
- [DECISION] Do not replace domain or API types with broad casts, `any`, or
  unchecked assertions unless a narrow boundary wrapper records why the runtime
  value cannot be typed more precisely.
- [DECISION] Keep generated types, schema-derived types, and hand-written
  domain types at their intended abstraction level. Do not mix generated
  transport shapes into business code unless the repo architecture explicitly
  allows it.
- [DECISION] When a public TypeScript API is part of the product contract, cover
  expected inference and invalid usage with type tests.
- [DECISION] Document known inference limitations instead of pretending types
  are stricter than they are.

## Library Surface

- [DECISION] Library packages expose an explicit public surface through package
  metadata, declaration output, and README examples.
- [DECISION] Verify generated declarations and exported files before publishing
  or handing work to an integrator.
- [DECISION] Treat declaration output, package exports, and examples as one
  public contract. If one changes, verify the others still describe the same
  surface.
