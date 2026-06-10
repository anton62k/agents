# Capability Check

Capability check verifies that the selected route can actually run with the
available method definitions.

## Inputs

- intake output;
- selected pipeline;
- required role ids;
- selected surface;
- selected stack;
- selected framework references;
- adapter target: Codex, Claude Code, or revo.

## Checks

1. Pipeline exists at `pipelines/<pipeline>/PIPELINE.md`.
2. Every required role exists at `roles/<role>/ROLE.md`.
3. Surface-specific role exists when required, for example
   `developer-backend` or `developer-frontend`.
4. Stack exists at `stacks/<stack>/STACK.md` when a stack is selected.
5. Framework references exist when the pipeline requires them.
6. Adapter notes exist for the selected execution mode.
7. Local values are placeholders only and are listed for run-time resolution.

## Output

```yaml
capability_status: ready | missing | ambiguous
missing_capabilities:
  - kind: role | stack | framework | pipeline | adapter | local-value
    id: ""
    impact: ""
recommendation: proceed | run-method-development-first | ask-human
```

## Rules

- Missing optional roles do not block the route; list them as reduced coverage.
- Missing required roles, selected stack, or selected pipeline blocks execution.
- If a missing capability is itself method work, route to
  `method-development`.
- Do not substitute a generic role for a missing specialization without human
  route approval.
