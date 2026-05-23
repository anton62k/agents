# Local CI

Local CI is the command set an agent runs before pushing.

## Rules

- Prefer repo scripts over ad hoc commands.
- Run narrower checks first while fixing, then full verification before commit.
- If local and remote CI differ, update docs or scripts so future agents know why.
- Do not report success when only a subset of required gates ran.
