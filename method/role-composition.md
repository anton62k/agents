# Role Composition

Roles are composed, not exploded into one role per technology.

## Axes

- `role`: what the agent owns, for example `developer`, `reviewer`, `analyst`.
- `surface`: where the work happens, for example `backend`, `frontend`, `infra`,
  `docs`, `library`.
- `stack`: language and ecosystem, for example `js-ts`.
- `frameworks`: concrete tools, for example `nestjs`, `prisma`, `react`,
  `graphql-codegen`.
- `repo_overlay`: local commands, paths, env values, and deployment facts.

## Example

```yaml
role: developer
surface: backend
stack: js-ts
frameworks:
  - nestjs
  - prisma
  - cqrs
```

The adapter builds context in this order:

1. `roles/developer/ROLE.md`
2. `roles/developer-backend/ROLE.md`
3. `stacks/js-ts/STACK.md`
4. framework references
5. repo-local overlay
6. pipeline step input

## Rule

Do not create names like `developer-backend-js-ts-nestjs-prisma` as the canonical
unit. Use composition. A pipeline may still cache a resolved route for runtime
convenience, but the method source stays composed.

## Developer Split

Use:

- `developer` for the universal implementation contract;
- `developer-backend` for backend responsibilities;
- `developer-frontend` for frontend responsibilities;
- `stacks/js-ts` for TypeScript/Node/package-manager/test/lint knowledge.

Future languages add stacks, not new base developer roles.
