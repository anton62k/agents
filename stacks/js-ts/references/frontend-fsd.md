# Frontend FSD Reference

This reference applies when Feature-Sliced Design is selected by repo evidence,
structure-check config, route approval, overlay config, or human approval. It is
not a frontend default.

## Source Priority

1. Repo-local FSD docs, import rules, lint rules, and structure-check config.
2. Existing layer, slice, segment, and public API patterns.
3. Official FSD docs:
   - `https://feature-sliced.design/docs/reference/layers`
   - `https://feature-sliced.design/docs/reference/public-api`
4. This reference.

## Responsibilities

FSD should own:

- layer boundaries;
- slice boundaries;
- public API rules;
- import direction and dependency isolation;
- placement of UI, model, API, lib, config, and other repo-approved segments.

FSD should not own:

- product requirements;
- domain model decisions by itself;
- framework logic;
- test strategy by itself;
- business rules that belong in use cases, services, entities, or view models.

## Hard Rules

- [DECISION] Treat FSD checks as blocking only when repo config, overlay, CI, or
  human approval selects them.
- [DECISION] Follow repo-local layer names, segment names, aliases, and public
  API conventions before generic FSD examples.
- [DECISION] Do not import across private internals when a public API exists.
- [DECISION] Keep dependency direction explicit. Higher-level composition may
  depend on lower-level reusable units according to repo rules; lower-level code
  must not reach upward into app/page/widget orchestration.
- [DECISION] Avoid creating slices or segments that contain only one trivial file
  unless repo structure checks require them.
- [DECISION] Do not move files just to satisfy generic FSD shape inside an
  unrelated change. Structure migrations require route approval.
- [DECISION] If structure checks such as Steiger or custom lint rules exist, run
  the repo-approved command before claiming FSD compliance.

## Stop Conditions

- Return `needs_architect` when layer, slice, public API, or dependency direction
  is unclear.
- Return `needs_analyst` when slice boundaries depend on unresolved product or
  domain language.
- Return `needs_human` when adopting or changing FSD would create a repo
  precedent.
