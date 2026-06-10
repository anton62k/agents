# Role Composition

Roles are composed, not exploded into one role per technology.

## Axes

- `role`: what the agent owns, for example `developer`, `reviewer`, `analyst`,
  or `architect`.
- `surface`: where the work happens, for example `backend`, `frontend`, `infra`,
  `docs`, `library`.
- `stack`: language and ecosystem, for example `js-ts`.
- `frameworks`: concrete tools, for example `nestjs`, `prisma`, `react`,
  `graphql-codegen`.
- `practice_references`: reusable practices, for example `requirements`,
  `adr`, `c4`, `ddd`, `bpmn`, or `test-strategy`.
- `repo_overlay`: local commands, paths, env values, and deployment facts.

## Example

```yaml
role: developer
surface: backend
stack: js-ts
frameworks:
  - nestjs
  - prisma
practice_references:
  - cqrs
  - test-strategy
```

The adapter builds context in this order:

1. `roles/developer/ROLE.md`
2. `roles/developer-backend/ROLE.md`
3. `stacks/js-ts/STACK.md`
4. framework references
5. shared practice references
6. repo-local overlay
7. pipeline step input

## Rule

Do not create names like `developer-backend-js-ts-nestjs-prisma` as the canonical
unit. Use composition. A pipeline may still cache a resolved route for runtime
convenience, but the method source stays composed.

Do not treat practices as stacks. SOLID, DDD, CQRS, C4, BPMN, ADRs, event
storming, requirements engineering, and test strategy are practice references.
They may be used by several roles.

## Developer Surface Specialization

Use:

- `developer` for the universal implementation contract;
- `developer-backend` for backend responsibilities;
- `developer-frontend` for frontend responsibilities;
- `stacks/js-ts` for TypeScript/Node/package-manager/test/lint knowledge.

Future languages add stacks, not new base developer roles.

## Analyst, Architect, Developer Split

Use:

- `analyst` for `what` and `why`: requirements, flows, constraints, acceptance
  criteria, ambiguity, and task decomposition.
- `architect` for technical shape: boundaries, contracts, tradeoffs, quality
  attributes, migration path, and ADR candidates.
- `developer` for local implementation details inside the approved task and
  architecture constraints.

If a developer cannot proceed without requirements clarity, return
`needs_analyst`. If a developer would need to decide architecture, return
`needs_architect`.
