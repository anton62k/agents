# anton62k/agents

Canonical agent method for building and maintaining software projects.

This repository contains reusable role definitions, pipelines, references,
templates, adapters, and method rules used to run AI coding agents consistently
across Codex, Claude Code, and future orchestrator runtimes.

Product repositories should keep project-specific context. This repository keeps
the reusable method.

## Principle

Project repos contain context. `anton62k/agents` contains method.

Prefer a workspace-first setup when several repositories are developed together.
The workspace root contains the agent entrypoints and platform symlinks; child
repositories contain only repo-specific overlays when they need them.

Use this repository to standardize how agents route work, choose roles, produce
handoff artifacts, apply gates, and keep platform-specific files reproducible.

## Structure

- `method/` - canonical rules for role, pipeline, and environment definitions.
- `roles/` - portable role definitions and role knowledge references.
- `references/` - shared practices reused by multiple roles.
- `stacks/` - language and ecosystem knowledge used by roles.
- `pipelines/` - portable multi-role workflows with gates and handoff contracts.
- `adapters/` - notes for running the same method in Codex, Claude Code, and revo.
- `templates/common/` - consuming-repo entrypoint templates.
- `templates/workspace/` - workspace-root entrypoints for multi-repo setups.
- `templates/artifacts/` - fillable route, run-state, and handoff artifacts.
- `checklists/requirements.md` - canonical requirements readiness gate.
- `checklists/method-consistency.md` - self-review gate for method PRs.
- `checklists/role-development.md` - preparation gate for role-focused PRs.
- `legacy/` - archived older material. It is not runtime agent knowledge and
  should not be loaded by roles, stacks, pipelines, or adapters.

## Validation

Run the repository validator before publishing method changes:

```sh
node tools/validate.mjs
```

The validator checks adapter wrapper frontmatter, catalog coverage, wrapper
coverage, and basic portable model-level vocabulary. CI runs the same command.

## How To Use

For a multi-repo workspace, start with `templates/workspace/`. Clone this
repository under the workspace root, materialize platform wrappers once, and use
symlinks from the workspace root:

- `.agents/skills` for Codex skills;
- `.codex/agents` for Codex custom agents;
- `.claude/agents` for Claude Code subagents;
- `.claude/skills` for Claude Code skills.

For a standalone project, use `templates/common/` as a thinner repo-local
overlay. In either mode, product repositories record only local facts: stack,
build runner or package manager, branch policy, CI commands, release branch,
deployment target, verification requirements, and domain-specific constraints.
Existing repo docs can serve as the overlay.

For multi-agent work, start with `method/README.md`. Keep role behavior in
`roles/`, workflow order in `pipelines/`, and local values in ignored env/local
overlays rather than committed markdown.

For a new device, start with `method/bootstrap.md`, then run the manual startup
flow in `method/manual-run.md`.

To update the method itself, follow `method/maintenance.md`.

## After Clone

If this repository was cloned into a workspace as `agents/`, launch Codex or
Claude Code from the workspace root and give it this request:

```md
Set up this workspace to use the canonical agents method from ./agents.

Read agents/method/bootstrap.md and agents/method/materialization.md. Prefer
workspace symlink mode for Codex and Claude Code. Create or update only the
workspace entrypoints and adapter links needed for discovery: AGENTS.md,
CLAUDE.md, .agents/README.md, .agents/skills, .codex/agents, .claude/agents,
and .claude/skills.

If model, runner, consensus, or budget defaults are needed, use
agents/templates/artifacts/execution-profile.md as an ignored local template.

Preserve existing repo-local overlays. Keep concrete local paths, accounts,
tokens, hosts, and secrets in ignored local files such as .agents/local.*.
Report what was created, linked, skipped, or needs human input before making
ambiguous changes.
```

If the repository has a different checkout name or location, replace `./agents`
with the local checkout path or record it in `.agents/local.context.md`.

`AGENTS.md` is intentional. Codex reads it as persistent guidance, and
`CLAUDE.md` can import it for Claude Code. README is for human onboarding;
`AGENTS.md` is the runtime policy agents should follow.

Do not link runtime behavior to `legacy/`. When an archived idea is still useful,
rebuild it as new canonical behavior in `method/`, `roles/`, `pipelines/`,
`references/`, `stacks/`, `adapters/`, `templates/artifacts/`, or
`checklists/requirements.md` after approval.
