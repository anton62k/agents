# anton62k/agents

Personal agent playbook for building and maintaining software projects.

This repository contains reusable prompts, skills, templates, and engineering
practices used to bootstrap, review, validate, release, and maintain projects
with AI coding agents.

Product repositories should keep project-specific context. This repository keeps
the reusable method.

## Principle

Project repos contain context. `anton62k/agents` contains method.

Use this repository to standardize how agents work across new and existing
projects: frontend apps, backend services, TypeScript libraries, release trains,
quality gates, Sonar checks, PR review, and CI repair.

## Structure

- `prompts/` - copy-paste task prompts for agents.
- `practices/` - engineering rules and recommendations.
- `frontend/` - frontend-specific architecture and quality practices.
- `backend/` - backend-specific architecture and quality practices.
- `libraries/` - library/package-specific practices.
- `templates/` - starter files copied into product repositories.
- `skills/` - agent skill definitions and operational workflows.
- `checklists/` - short acceptance checklists.
- `method/` - canonical rules for role, pipeline, and environment definitions.
- `roles/` - portable role definitions and role knowledge references.
- `stacks/` - language and ecosystem knowledge used by roles.
- `pipelines/` - portable multi-role workflows with gates and handoff contracts.
- `adapters/` - notes for running the same method in Codex, Claude Code, and revo.

## How To Use

For a new project, start with one bootstrap prompt:

```md
Use anton62k/agents/prompts/bootstrap-new-library.md.

Create a new npm TypeScript library:
- name: @scope/package
- public API: ...
- release channel: alpha
- quality: local verify, Sonar zero new issues, type tests
```

For an existing project, add a small repo-local `AGENTS.md` that points here and
records only local facts: package manager, branch policy, CI commands, release
branch, deployment target, and domain-specific constraints.

For multi-agent work, start with `method/README.md`. Keep role behavior in
`roles/`, workflow order in `pipelines/`, and local values in ignored env/local
overlays rather than committed markdown.

For a new device or a new consuming repo, start with `method/bootstrap.md`, then
run the manual startup flow in `method/manual-run.md`.

To update the method itself, follow `method/maintenance.md`.
