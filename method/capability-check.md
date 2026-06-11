# Capability Check

Capability check verifies that the selected route can actually run with the
available method definitions.

## Inputs

- intake output;
- selected pipeline;
- required role ids;
- alternative role groups;
- role and pipeline catalog rows;
- selected surfaces;
- selected stack catalogs;
- selected framework references;
- selected tooling references;
- selected practice references;
- adapter target: Codex, Claude Code, or revo.
- local execution profile when available.

## Checks

1. Pipeline id exists in `pipelines/INDEX.md`.
2. Pipeline file exists at `pipelines/<pipeline>/PIPELINE.md`.
3. Every required role id exists in `roles/INDEX.md`.
4. Every required role file exists at `roles/<role>/ROLE.md`.
5. Each alternative role group has at least one role present in
   `roles/INDEX.md`; groups with zero present roles are unresolved.
6. Surface-specific role exists when required, for example
   `developer-backend` or `developer-frontend`.
7. Each selected stack exists at `stacks/<stack>/STACK.md`.
8. Framework references exist when the pipeline requires them.
9. Tooling references exist when the pipeline requires them.
10. Practice references exist under `references/` when selected.
11. Adapter notes exist for the selected execution mode.
12. Local values are placeholders only and are listed for run-time resolution.
13. Required model profiles exist or are listed as missing.
14. Required consensus providers exist or are listed as missing.
15. Budget constraints are compatible with the recommended route or require
    human approval.

## Output

```yaml
capability_status: ready | missing | ambiguous
missing_capabilities:
  - kind: role
    id: ""
    impact: ""
recommendation: proceed | run-method-development-first | ask-human
```

Allowed `kind` values: `role`, `role-group`, `stack`, `framework`, `tooling`,
`practice`, `pipeline`, `adapter`, `local-value`, `model-profile`,
`consensus-provider`, `budget`.

## Rules

- Missing optional roles do not block the route; list them as reduced coverage.
- Missing required roles, unresolved alternative role groups, selected stacks,
  selected required tooling, or selected pipeline blocks execution. Unresolved
  means zero roles from the group are present in `roles/INDEX.md`.
- Missing conditional framework, tooling, or pattern references block execution
  only when the route selected them as required for this run.
- Missing model profiles or consensus providers require human approval before
  the orchestrator degrades models or narrows consensus.
- Budget constraints that would change model level, consensus mode, or iteration
  cap require route-plan regeneration and human approval.
- If a missing capability is itself method work, route to
  `method-development`.
- Do not substitute a generic role for a missing specialization without human
  route approval.
