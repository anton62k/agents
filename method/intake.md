# Intake

Intake is the first step of every multi-agent run. It turns a user request into a
candidate route before any pipeline executes.

## Goals

- Classify the work type.
- Select a candidate pipeline.
- Read catalog metadata for pipeline and role discovery.
- Infer required roles, surface, stack, and frameworks.
- Identify local values that must be resolved from overlays.
- Run a capability check.
- Produce a proposed run plan for human review.

## Work Types

Use these initial categories:

- `feature-development` - feature, multi-repo change, or planned implementation.
- `bugfix` - known defect, failing behavior, or concrete regression.
- `analysis-only` - research, review, plan, explanation, or source-backed answer.
- `post-merge-qa` - deployment or live behavior verification after merge.
- `method-development` - creating or improving roles, stacks, pipelines, adapters,
  or references.

## Intake Output

```yaml
request_summary: ""
work_type: feature-development
selected_pipeline: feature-development
why: ""
surface: backend | frontend | infra | docs | library | unknown
stack: js-ts | unknown
frameworks: []
required_roles: []
alternative_roles: []
optional_roles: []
local_values_needed: []
missing_capabilities: []
recommended_next_step: route-approval | method-development | ask-human
```

## Rules

- If the request is about roles, pipelines, references, or this repository's
  method, choose `method-development`.
- If the request says "only research", "review only", or equivalent, prefer
  `analysis-only`.
- Use `discovery.md`, `../pipelines/INDEX.md`, and `../roles/INDEX.md` when
  selecting candidate routes.
- If the target stack or framework is unknown, do not guess silently; mark it
  `unknown` and ask for route approval with the ambiguity visible.
- Do not resolve local values during intake. Only list what will be needed.
