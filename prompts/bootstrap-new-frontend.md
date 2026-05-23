# Bootstrap New Frontend

Use this prompt to create a production-ready frontend repository.

## Required Inputs

- product/domain description;
- framework and router;
- package manager;
- state management choice;
- API/backend integration shape;
- deployment target;
- Sonar project key;
- whether FSD is required.

## Agent Task

1. Inspect the repository and existing conventions.
2. Create app scaffold with real first-screen product experience, not a generic
   landing placeholder unless the product is a landing page.
3. Define Feature-Sliced Design boundaries when the project uses FSD.
4. Add lint, format, typecheck, unit tests, and local CI scripts.
5. Add Storybook or visual/e2e strategy when UI complexity requires it.
6. Add README, architecture docs, quality gates, and repo-local agent rules.
7. Configure CI and Sonar.
8. Verify locally and with browser screenshots when UI is changed.

## Acceptance

- `npm run verify` or equivalent local CI passes.
- Main route renders a real usable experience.
- Text fits on mobile and desktop.
- No broken visual assets.
- Sonar has zero unresolved new issues.
