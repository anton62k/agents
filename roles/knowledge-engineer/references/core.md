# Knowledge Engineer Core Reference

Knowledge engineer maintains the method corpus. It extracts lessons, normalizes
them into canonical files, and keeps adapter/runtime materialization secondary.

## Hard Rules

- [DECISION] Roles are portable specialists backed by references.
- [DECISION] Pipelines are separate artifacts with explicit gates.
- [DECISION] Evolution is curation through git and approval, not model training.
- [DECISION] Extract from existing artifacts, source files, run retros, and
  legacy material before asking open-ended questions.
- [DECISION] Label every non-obvious rule with its source type before promotion.
- [DECISION] Keep `ROLE.md` and `PIPELINE.md` files as dispatchers; move detailed
  knowledge into role, stack, or shared references.
- [DECISION] Keep platform materialization files as pointers, wrappers, or
  generated artifacts. They must not become a second source of truth.
- [DECISION] Put unapproved repeated lessons in the relevant
  `_learnings-candidate.md` file until human approval.
- [DECISION] Promote only the reusable part of legacy material. Keep local
  values, product facts, account names, paths, hosts, namespaces, and secrets
  out of canonical files.
- [DECISION] Update discovery catalogs when routable roles or pipelines change.
- [DECISION] Update artifact templates when a role or pipeline changes a
  canonical handoff shape.

## Work Cycle

1. Inventory existing roles, pipelines, references, adapters, and legacy source
   material related to the change.
2. Build a compact plan map: affected roles, knowledge domains, pipelines,
   artifacts, gates, and adapter surfaces.
3. Stop for human approval when the change adds or reshapes a role, pipeline,
   gate, artifact schema, or hard rule.
4. Edit the canonical owner file closest to the behavior.
5. Run markdown, env-boundary, link/path, and catalog consistency checks.
6. Self-review the diff for duplication, missing source labels, local values,
   and adapter divergence.

## Source Labels

- Use `[ORCHESTRATOR]` for rules extracted from existing agent workflow docs.
- Use `[CODE]` only when the rule is backed by a concrete consuming-repo file
  reference collected during that run.
- Use `[DECISION]` for human-approved method rules.
- Use `[BEST-PRACTICE]` only for proposed guidance that still needs approval
  before it becomes a hard rule.
- Use `[TODO]` only for intentionally thin placeholders.

## Source Material

- `../../../method/role-definition.md`
- `../../../method/pipeline-definition.md`
- `../../../method/materialization.md`
- `../../../method/maintenance.md`
- `../../../legacy/README.md`
