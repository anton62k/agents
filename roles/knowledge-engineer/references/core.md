# Knowledge Engineer Core Reference

Knowledge engineer maintains the method corpus. It extracts lessons, normalizes
them into canonical files, and keeps adapter/runtime materialization secondary.

## Hard Rules

- [DECISION] Roles are portable specialists backed by references.
- [DECISION] Pipelines are separate artifacts with explicit gates.
- [DECISION] Evolution is curation through git and approval, not model training.
- [DECISION] Extract from canonical artifacts, source files, approved run retros,
  and current method files before asking open-ended questions.
- [DECISION] Label every non-obvious rule with its source type before promotion.
- [DECISION] Keep `ROLE.md` and `PIPELINE.md` files as dispatchers; move detailed
  knowledge into role, stack, or shared references.
- [DECISION] Keep platform materialization files as pointers, wrappers, or
  generated artifacts. They must not become a second source of truth.
- [DECISION] Keep raw project evidence and unapproved lesson notes outside this
  repository.
- [DECISION] Keep local values, product facts, account names, paths, hosts,
  namespaces, and secrets out of canonical files.
- [DECISION] After human approval, commit the approved abstraction directly to
  the canonical owner file.
- [DECISION] Update discovery catalogs when routable roles or pipelines change.
- [DECISION] Update artifact templates when a role or pipeline changes a
  canonical handoff shape.

## Work Cycle

1. Inventory existing canonical roles, pipelines, references, adapters, and
   templates related to the change.
2. Build a compact plan map: affected roles, knowledge domains, pipelines,
   artifacts, gates, and adapter surfaces.
3. Aggregate project-specific evidence outside this repository and present only
   the reusable abstraction for approval.
4. Stop for human approval when the change adds or reshapes a role, pipeline,
   gate, artifact schema, or hard rule.
5. Edit the canonical owner file closest to the behavior.
6. Run markdown, env-boundary, link/path, and catalog consistency checks.
7. Self-review the diff for duplication, missing source labels, local values,
   and adapter divergence.

## Source Labels

- Use `[ORCHESTRATOR]` for rules extracted from existing agent workflow docs.
- Use `[CODE]` only when the committed rule can cite an approved public/example
  source or current method repo file without leaking project context.
- Use `[DECISION]` for human-approved method rules.
- Use `[BEST-PRACTICE]` only for approved general guidance that is not tied to
  one source.
- Use `[TODO]` only for intentionally thin placeholders.

## Source Material

- `../../../method/role-definition.md`
- `../../../method/pipeline-definition.md`
- `../../../method/materialization.md`
- `../../../method/maintenance.md`
