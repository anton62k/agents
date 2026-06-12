# Minimal Sufficient Code Reference

Minimal sufficient code is the smallest implementation that satisfies the
approved behavior, preserves the existing architecture, stays readable, and
keeps future maintenance cost low.

This is not a rule to write terse code. It is a rule against unnecessary
surface area: extra layers, unused options, speculative abstractions,
duplicated helpers, and broad refactors that do not serve the current approved
change.

## Relationship To Other Quality Rules

- `readable-code.md` asks whether the code is understandable.
- `idiomatic-code.md` asks whether the code fits the stack and local codebase.
- This reference asks whether the code volume and abstraction surface are
  justified.

When these rules conflict, choose the smallest readable and idiomatic solution,
not the shortest expression.

## Hard Rules

- [DECISION] Prefer reusing existing local boundaries, helpers, factories,
  test kits, adapters, and patterns before adding new ones.
- [DECISION] Add a new abstraction only when it removes real current
  complexity, protects an existing boundary, or matches an established local
  pattern. Do not add abstractions only because a future variation might exist.
- [DECISION] Keep the implementation slice aligned with the approved task.
  Unrelated cleanup, renames, formatting churn, folder moves, and dependency
  swaps are separate tasks unless required to complete the current change.
- [DECISION] Delete or avoid code that does not carry current behavior,
  verification value, integration value, or explicit approved compatibility
  value.
- [DECISION] Prefer a narrow local function, method, adapter, or type over a
  new cross-cutting shared utility when there is only one use site and no
  approved shared boundary.
- [DECISION] Prefer repo-approved generated clients, framework primitives, and
  platform APIs over custom wrappers unless the wrapper is already a local
  boundary or removes repeated risk.
- [DECISION] Tests should cover behavior and risk, not duplicate every internal
  branch created by over-decomposition.
- [DECISION] Do not reduce code volume by mixing abstraction levels, hiding
  error handling, weakening types, or compressing control flow into clever code.

## Reuse Order

Before adding a new unit, inspect in this order:

1. Nearby code in the touched path.
2. Repo-local helper, test-kit, adapter, or module pattern.
3. Selected stack and framework references.
4. Existing shared utilities or package exports.
5. New local helper inside the touched boundary.
6. New shared abstraction only with an approved reason.

If a wider reuse candidate exists but would create coupling or force a broader
refactor, keep the current change local and record the follow-up separately.

## Review Blockers

Raise a finding when new or modified code:

- introduces a new service, repository, factory, provider, hook, store, or
  utility with one use site and no boundary reason;
- duplicates an existing local helper, test kit, adapter, query shape, or
  framework primitive without explaining why reuse is unsafe;
- adds optional configuration, extension points, interfaces, or generic
  parameters that the approved task does not use;
- expands the diff with unrelated cleanup, import churn, file moves, or style
  rewrites;
- creates parallel ways to do the same operation inside one repo;
- shrinks code by making behavior implicit, untyped, or harder to verify.

## Review Questions

- What behavior does each new file, type, function, class, provider, or helper
  make possible?
- Could the same behavior be expressed by extending an existing local pattern?
- Is this abstraction needed now, or only useful in a possible future?
- Does reuse reduce risk, or does it couple unrelated concerns?
- Would deleting this code remove approved behavior or only remove ceremony?
- Did the change keep verification focused on the behavior that changed?

## Stop Conditions

- Return `needs_architect` when minimality depends on choosing a new boundary,
  shared abstraction, public contract, data ownership model, or integration
  pattern.
- Return `needs_analyst` when the approved behavior is too vague to know what
  code is sufficient.
- Return `needs_human` when local patterns conflict and choosing one would set a
  repo precedent.
