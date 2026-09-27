# Maintaining the shared agent configuration

This repository may be the live checkout at `$HOME/.agents`. Treat its default
branch as deployed configuration.

## Development workflow

- Never edit a live default-branch checkout directly. Create a task branch in a
  separate Git worktree, validate it, and deliver it through a pull request.
- Base every task worktree on the freshly fetched remote default branch. Keep the
  live checkout stable until the pull request is merged.
- After merge, update the live checkout only by fast-forwarding its default branch,
  then run `bin/agents install` and `bin/agents doctor`.
- Keep all repository content, user-facing output, comments, commit messages, and
  pull request text in English.

## Installation safety

- Never delete, replace, reset, or initialize an existing `$HOME/.agents` directory
  merely to install this repository.
- Use `bin/agents plan-adopt PATH` to inspect an existing installation. Prepare a
  concrete migration and backup before any cutover.
- The installer may create a missing managed symlink or accept an already-correct
  one. It must stop before making changes when a target is a regular file, directory,
  or different symlink. Do not add a force-overwrite option.
- Preserve provider authentication, sessions, trust state, caches, and unrelated
  configuration. Manage only paths declared in `install/links.toml` and documented
  MCP entries.
- Do not run installation through `sudo`. Install for the current account under its
  actual home directory.

## Repository boundaries

- Keep portable behavior, rules, guidelines, skills, project profiles, and tools in
  Git. Keep credentials, prompts, sessions, indexes, registries, backups, and machine
  state outside the repository.
- Put unaccepted generalizations under `guidelines/proposals/`. Promote them only
  after user acceptance and keep project-specific decisions in the project repo.
- Keep `behavior.md` small and route to detailed files only when their topic applies.
- Use `$HOME` in prose and code for user-specific paths. Do not commit a concrete
  home directory.

## Validation

- Run `bin/agents check` before commit.
- Run `python3 -m unittest discover -s tests -v` after changing installation tools.
- Inspect the final diff for secrets, generated state, broken links, and accidental
  non-English content.
