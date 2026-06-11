# Adapter Materialization

Materialization converts canonical method files into the small set of files a
tool expects inside a consuming workspace or standalone repository.

Canonical behavior stays in this repository. Materialized files are pointers,
wrappers, generated adapter files, symlink targets, or pinned copies used by
Codex, Claude Code, or a future runtime.

## Canonical Sources

- `method/` defines execution rules, gates, and environment boundaries.
- `roles/INDEX.md` and `roles/<role>/ROLE.md` define routable roles.
- `roles/<role>/references/` defines role knowledge loaded on demand.
- `pipelines/INDEX.md` and `pipelines/<pipeline>/PIPELINE.md` define workflows.
- `stacks/` defines language, ecosystem, and framework guidance.
- `adapters/` defines platform mechanics only.

Generated adapter files must point back to these sources. They must not become a
second source of truth.

Workspace and repo overlays win for concrete repo facts: exact commands, paths,
domain constraints, release policy, review policy, verification requirements,
and environment boundaries.

## Platform Discovery Facts

Use only documented platform surfaces:

- Codex persistent guidance: `AGENTS.md`.
- Codex repo skills: `.agents/skills/<skill>/SKILL.md`; symlinked skill folders
  are supported by Codex.
- Codex project custom agents: `.codex/agents/*.toml`.
- Claude Code guidance: `CLAUDE.md`; it may import `AGENTS.md` with `@AGENTS.md`.
- Claude Code project subagents: `.claude/agents/*.md`.
- Claude Code project skills: `.claude/skills/<skill>/SKILL.md`.

Reference docs:

- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Codex subagents](https://developers.openai.com/codex/subagents)
- [Claude Code memory](https://code.claude.com/docs/en/memory)
- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code skills](https://code.claude.com/docs/en/skills)

If a platform changes discovery behavior, update adapter docs before changing
role or pipeline definitions.

## Preferred Workspace Mode

For multi-repo workspaces, materialize once at the workspace root and run Codex
or Claude Code from that root when shared agents should be visible to all child
repositories.

```text
workspace/
  AGENTS.md
  CLAUDE.md
  .agents/
    skills -> ../agents/adapters/codex/materialized/skills
  .codex/
    agents -> ../agents/adapters/codex/materialized/agents
  .claude/
    agents -> ../agents/adapters/claude-code/materialized/agents
    skills -> ../agents/adapters/claude-code/materialized/skills
  agents/
  repo-a/
  repo-b/
```

Child repositories should contain only repo-specific overlays when needed:
`VERIFICATION.md`, `REVIEW.md`, `REPOSITORY.md`, or a thin `AGENTS.md` /
`CLAUDE.md` when agents are commonly launched from inside that child repo.

## Adapter Output Targets

### Codex

Workspace-level committed files:

- `AGENTS.md`;
- `.agents/README.md`;
- `.agents/skills` symlink to adapter skill wrappers;
- `.codex/agents` symlink to adapter custom-agent wrappers.

Optional repo-local overlays:

- `REVIEW.md`;
- `VERIFICATION.md`;
- `REPOSITORY.md`;
- child `AGENTS.md` only when Codex is launched from that child repository.

Codex can also read canonical files directly from `{{AGENTS_REPO_PATH}}`, so
repo-local skills should wrap workflows rather than redefine role behavior.

### Claude Code

Workspace-level committed files:

- `CLAUDE.md`;
- `.claude/agents` symlink to adapter subagent wrappers;
- `.claude/skills` symlink to adapter skill wrappers.

Optional repo-local overlays:

- `REVIEW.md`;
- `VERIFICATION.md`;
- `REPOSITORY.md`;
- child `CLAUDE.md` only when Claude Code is launched from that child
  repository.

Claude Code generated agents should include enough source pointers for the main
session to reload canonical roles, references, and pipeline rules.

### Future revo Runtime

The future orchestrator should import canonical roles, references, pipelines,
and catalogs directly. It should not import generated Codex or Claude Code files
as source data.

## Materialization Modes

### Pointer Mode

The consuming root commits entrypoints that point to `{{AGENTS_REPO_PATH}}`.
Agents read canonical files directly at runtime.

Use this as the conceptual base for local Codex and Claude Code runs.

### Symlink Mode

The consuming root uses symlinks for platform discovery folders. Symlinks must
target adapter materialized output, not canonical role or pipeline files
directly.

Use this by default for a local multi-repo workspace when the same filesystem is
available.

Validate symlink mode after setup:

- Codex sees workspace `AGENTS.md`.
- Codex lists expected skills from `.agents/skills`.
- Codex can spawn custom agents from `.codex/agents` when requested.
- Claude Code sees expected project subagents from `.claude/agents`.
- Claude Code sees expected skills from `.claude/skills`.

If the platform does not follow a symlinked discovery folder in the current
environment, switch only that target to generated mode.

### Generated Mode

The consuming root stores generated adapter files. Generated files must have a
header that identifies their source and update rule.

Use this when a platform requires files to exist physically inside the consuming
root or when symlink mode is unreliable.

### Vendor Mode

The consuming root stores a pinned copy of canonical method files.

Use this only when pointer, symlink, or generated mode is not practical. The
pinned revision must be visible in repo-local docs or run state.

## Generated File Header

Generated files should start with a short portable header:

```md
<!--
Generated from: {{AGENTS_REPO_PATH}}/<canonical-source-path>
Source revision: {{AGENTS_SOURCE_REVISION}}
Update rule: regenerate from canonical agents method; do not edit manually.
-->
```

The header must not contain a concrete local path, account, token, host, or
secret. Use placeholders from `env-boundary.md`.

## Adapter Wrapper Rules

- Do not symlink `roles/<role>/ROLE.md` directly into `.claude/agents` or
  `.codex/agents`; platform agent formats are different from canonical role
  files.
- Do not symlink `pipelines/<pipeline>/PIPELINE.md` directly into
  `.agents/skills` or `.claude/skills`; platform skill formats require
  `SKILL.md` wrappers.
- Adapter wrappers may summarize trigger conditions and then instruct the agent
  to read canonical role, pipeline, and reference files.
- Adapter wrappers must fail with `needs_method_materialization` when their
  canonical source cannot be resolved.
- Generated wrappers must preserve role rights and human gates.

## Coverage Rules

- A routable role in `roles/INDEX.md` must have matching platform wrappers in
  `adapters/codex/materialized/agents/` and
  `adapters/claude-code/materialized/agents/`, unless the omission is
  explicitly documented.
- A pipeline marked `platform_invocation: skill-wrapper` in
  `pipelines/INDEX.md` must have matching skill wrappers in
  `adapters/codex/materialized/skills/` and
  `adapters/claude-code/materialized/skills/`, unless the omission is explicitly
  documented.
- A `platform_invocation: canonical-only` pipeline is reached through the
  canonical method flow, such as the `agent-method` skill, and does not require
  a per-pipeline wrapper.
- Renaming or removing a routable role or `platform_invocation: skill-wrapper`
  pipeline must also rename or remove obsolete platform wrappers.
- Wrapper coverage is adapter output coverage only. Canonical behavior still
  belongs in `roles/`, `pipelines/`, `references/`, and `stacks/`.

## Update Flow

1. Update or clone the canonical agents repository.
2. Resolve `{{WORKSPACE_ROOT}}`, `{{AGENTS_REPO_PATH}}`, and any child repo paths
   from ignored local overlays or human input.
3. Read `bootstrap.md`, this file, and the selected adapter README.
4. Rebuild, relink, or refresh only files owned by the selected materialization
   mode.
5. Review the consuming-root diff before committing.
6. Keep local values in ignored overlays, never in generated committed files.
7. If a generated file needs a behavior change, update the canonical role,
   pipeline, stack, or adapter first.

## Validation

Before using materialized files, verify:

- every generated file points to a canonical source;
- source paths exist in `{{AGENTS_REPO_PATH}}`;
- workspace and repo overlays are used for concrete commands and policies;
- the selected role ids exist in `roles/INDEX.md`;
- the selected pipeline id exists in `pipelines/INDEX.md`;
- routable role and `platform_invocation: skill-wrapper` pipeline wrapper
  coverage follows the coverage rules above;
- no generated file contains concrete local paths, accounts, tokens, hosts, or
  deployment coordinates;
- generated files do not weaken human gates or role rights.

## Rules

- Prefer workspace symlink mode for local multi-repo workspaces.
- Do not copy the whole method tree into a product repository.
- Do not edit generated files directly except for emergency local debugging.
- Do not let adapter files override canonical role or pipeline behavior.
- Do not let generated templates override current repo-local overlays.
- Do not store resolved env values in committed materialized files.
- Record materialization problems in the selected adapter README or method
  maintenance flow, not inside a role definition.
