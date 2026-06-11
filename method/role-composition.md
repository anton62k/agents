# Role Composition

Roles are composed, not exploded into one role per technology.

## Axes

- `role`: what the agent owns, for example `developer`, `reviewer`, `analyst`,
  or `architect`.
- `surfaces`: where the work happens, for example `backend`, `frontend`,
  `infra`, `docs`, `library`.
- `stack.primary` and `stack.secondary`: language and ecosystem catalogs, for
  example `js-ts`, `dotnet`, `python`, or `unknown`.
- `frameworks`: concrete tools, for example `nestjs`, `prisma`, `react`,
  `graphql-codegen`.
- `tooling`: optional tool/provider categories such as static analysis,
  structure checks, browser automation, or CI providers.
- `verification_capabilities`: generic availability signals used to build a
  run-specific verification plan.
- `practice_references`: reusable practices, for example `requirements`,
  `adr`, `c4`, `ddd`, `bpmn`, or `test-strategy`.
- `repo_overlay`: local commands, paths, env values, and deployment facts.

## Example

```yaml
role: developer
surfaces:
  - backend
stack:
  primary: js-ts
  secondary: []
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
3. selected `stacks/<stack>/STACK.md`
4. framework references
5. tooling references
6. shared practice references
7. repo-local overlay
8. pipeline step input

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
- `stacks/<stack>` for language, ecosystem, package-manager, test, lint, build,
  and stack-specific verification knowledge.

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
