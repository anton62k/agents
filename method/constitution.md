# Method Constitution

The constitution is the always-on rule set for this method. Roles, pipelines,
references, stacks, and adapters may add detail, but they must not weaken these
rules.

## Scope

- [DECISION] Canonical behavior lives in this repository's method, roles,
  pipelines, references, stacks, checklists, and adapters.
- [DECISION] Consuming repositories keep product context, generated adapter
  files, run artifacts, and ignored local overlays.
- [DECISION] Codex, Claude Code, and future revo execution must follow the same
  canonical contracts even when their platform mechanics differ.

## Principles

### 1. Source-Backed Work

- [DECISION] Inspect relevant repository files, existing docs, run artifacts, or
  external sources before making claims that depend on them.
- [DECISION] If evidence is missing, make the gap visible instead of inventing
  product, architecture, or environment facts.

### 2. Route Before Execution

- [DECISION] Classify the request, discover candidate routes, check
  capabilities, and get route approval before multi-role execution.
- [DECISION] The orchestrator owns route choice and gate handling; worker roles
  own the artifacts and actions assigned to them.

### 3. Clarification Before Mutation

- [DECISION] Do not start working-tree mutation while blocking clarification
  markers are unresolved.
- [DECISION] Blocking clarification markers include open questions, unapproved
  human actions, `needs_human`, `needs_analyst`, `needs_architect`, missing
  required capabilities, unresolved alternative roles, and local values required
  for the current step.
- [DECISION] When clarification is required, return the smallest correct next
  action or route decision: `needs_analyst`, `needs_architect`, `needs_human`,
  `method first`, or `stop`.

### 4. Role Boundaries

- [DECISION] Analyst owns requirements, scope, acceptance criteria, and
  human-action separation.
- [DECISION] Architect owns technical shape, boundaries, contracts, tradeoffs,
  quality attributes, migration path, and ADR candidates.
- [DECISION] Developer owns local implementation details inside the approved
  requirements and architecture constraints.
- [DECISION] Integrator, watcher, merger, and deploy roles own their pipeline
  actions and must not rewrite upstream requirements or architecture silently.

### 5. Environment Boundary

- [DECISION] Committed markdown uses placeholders for local paths, accounts,
  credentials, deployment targets, namespaces, and other environment-specific
  values.
- [DECISION] Concrete local values belong in ignored overlays, runtime state, or
  human-provided inputs for a specific run.

### 6. Human Gates

- [DECISION] Human review is required for route approval, significant
  architecture or ADR decisions, merge, deployment by default, destructive
  actions, secret access, and unresolved product ambiguity.
- [DECISION] A role may recommend a decision, but it must not bypass a required
  human gate.

### 7. Validation And Evidence

- [DECISION] Run the narrowest useful validation first, widen when risk or
  shared behavior justifies it, and report failures with evidence.
- [DECISION] Claims that a failure is pre-existing must be proven against the
  base branch, baseline artifact, or prior run state.

### 8. Lessons And Promotion

- [DECISION] New hard rules are promoted through `method/maintenance.md`.
- [DECISION] Unapproved lessons stay in `_learnings-candidate.md` until a human
  accepts them.

### 9. Adapter Neutrality

- [DECISION] Adapter output must point back to canonical source files and remain
  reproducible from them.
- [DECISION] If generated Codex or Claude Code files conflict with canonical
  method files, the canonical method wins.

## Change Rule

Changes to this constitution require an explicit human-approved method change.
Use small PRs and keep the rationale visible in the diff.
