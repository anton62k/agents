# Capability Check

Capability check verifies that the selected route can actually run with the
available method definitions.

## Inputs

- intake output;
- selected pipeline;
- required role ids;
- alternative role groups;
- role and pipeline catalog rows;
- selected surface;
- selected stack;
- selected framework references;
- selected practice references;
- adapter target: Codex, Claude Code, or revo.

## Checks

1. Pipeline id exists in `pipelines/INDEX.md`.
2. Pipeline file exists at `pipelines/<pipeline>/PIPELINE.md`.
3. Every required role id exists in `roles/INDEX.md`.
4. Every required role file exists at `roles/<role>/ROLE.md`.
5. Each alternative role group has at least one role present in
   `roles/INDEX.md`; groups with zero present roles are unresolved.
6. Surface-specific role exists when required, for example
   `developer-backend` or `developer-frontend`.
7. Stack exists at `stacks/<stack>/STACK.md` when a stack is selected.
8. Framework references exist when the pipeline requires them.
9. Practice references exist under `references/` when selected.
10. Adapter notes exist for the selected execution mode.
11. Local values are placeholders only and are listed for run-time resolution.

## Output

```yaml
capability_status: ready | missing | ambiguous
missing_capabilities:
  - kind: role
    allowed_kinds:
      - role
      - role-group
      - stack
      - framework
      - practice
      - pipeline
      - adapter
      - local-value
    id: ""
    impact: ""
recommendation: proceed | run-method-development-first | ask-human
```

## Rules

- Missing optional roles do not block the route; list them as reduced coverage.
- Missing required roles, unresolved alternative role groups, selected stack, or
  selected pipeline blocks execution. Unresolved means zero roles from the group
  are present in `roles/INDEX.md`.
- If a missing capability is itself method work, route to
  `method-development`.
- Do not substitute a generic role for a missing specialization without human
  route approval.
