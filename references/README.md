# Shared References

Shared references hold reusable practices that can be loaded by multiple roles.

They are not roles, stacks, pipelines, or local overlays.

## What Belongs Here

- requirements and analysis methods;
- architecture and decision methods;
- modeling notations and collaboration methods;
- quality, risk, and review practices.

## What Belongs Elsewhere

- role duties stay in `roles/<role>/ROLE.md`;
- role-specific behavior stays in `roles/<role>/references/`;
- language and runtime knowledge stays in `stacks/`;
- framework and tool mechanics stay in stack or framework references;
- workflow order stays in `pipelines/`;
- local commands, paths, accounts, and secrets stay in ignored overlays.

## Reference Families

- `analysis/` - requirements, task specs, decomposition, acceptance criteria.
- `architecture/` - architecture plans, boundaries, ADRs, quality attributes.
- `modeling/` - diagrams, domain/process modeling, shared understanding tools.
- `quality/` - risk review, test strategy, verification confidence.

## Reuse Rules

- A role may list shared references under `practice_references`.
- Shared references explain a practice; they do not grant rights.
- A role decides when the practice is relevant for its current step.
- If a shared reference changes role behavior, update the role reference too.
- Do not duplicate the same practice across many role-local references.
