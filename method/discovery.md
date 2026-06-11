# Discovery

Discovery turns a user request into catalog-backed route candidates before the
capability check runs.

## Inputs

- user request;
- known repo or artifact context, expressed as placeholders;
- `roles/INDEX.md`;
- `pipelines/INDEX.md`;
- `references/README.md` and selected shared reference indexes when available;
- `stacks/README.md` and selected stack indexes when available;
- `adapters/README.md` and selected adapter notes.

## Process

1. Read `../pipelines/INDEX.md` and match request triggers to candidate
   pipelines.
2. Prefer explicit user intent over keyword matches.
3. Read required and optional roles from the selected pipeline catalog row.
4. Read alternative role groups from the selected pipeline catalog row.
5. Read `../roles/INDEX.md` and confirm each role id has a catalog entry.
6. Infer surface, stack, framework, tooling, verification, and
   practice-reference candidates from the request and repo context without
   resolving local values.
7. Mark unknown or ambiguous values visibly in the candidate route.
8. Pass the candidate route to `capability-check.md`.

## Output

```yaml
candidate_routes:
  - pipeline: ""
    why: ""
    confidence: high | medium | low
    required_roles: []
    alternative_roles:
      - group_id: ""
        roles: []
        resolution: at_least_one
    optional_roles: []
    surfaces: [] # backend | frontend | infra | docs | library | method | repo
    stack:
      primary: unknown
      secondary: []
    frameworks: []
    tooling:
      static_analysis: []
      structure_checks: []
      ci_providers: []
    verification_capabilities:
      primary_local_gate: available | missing | unknown
      typecheck: available | missing | unknown | not-applicable
      lint: available | missing | unknown | not-applicable
      tests: available | missing | unknown | not-applicable
      build_or_package: available | missing | unknown | not-applicable
      architecture_or_structure: available | missing | unknown | not-applicable
      static_analysis: configured | optional | unavailable | unknown
      remote_ci: available | missing | unknown
    practice_references: []
    local_values_needed: []
    ambiguity:
      - field: ""
        reason: ""
        candidates: []
recommended_route: ""
```

## Rules

- Do not invent role or pipeline ids that are absent from the catalogs.
- Do not treat catalog selection as authorization; route approval still controls
  execution.
- Do not infer JavaScript, TypeScript, npm, Sonar, or any other ecosystem/tool as
  default. Detect them from repo evidence, stack catalogs, or overlays.
- If required catalog entries are missing, recommend `method-development` before
  execution.
- Keep concrete accounts, local paths, hosts, namespaces, tokens, and secrets out
  of discovery output.
