# Adapter Materialization

Materialization is the conversion from canonical method files into the small set
of files a tool expects inside a consuming repository.

Canonical behavior stays in this repository. Materialized files are pointers,
wrappers, generated adapter files, or pinned copies used by Codex, Claude Code,
or a future runtime.

## Canonical Sources

- `method/` defines execution rules, gates, and environment boundaries.
- `roles/INDEX.md` and `roles/<role>/ROLE.md` define routable roles.
- `roles/<role>/references/` defines role knowledge loaded on demand.
- `pipelines/INDEX.md` and `pipelines/<pipeline>/PIPELINE.md` define workflows.
- `stacks/` defines language, ecosystem, and framework guidance.
- `adapters/` defines platform mechanics only.

Generated adapter files must point back to these sources. They must not become a
second source of truth.

Consuming-repo overlays win for concrete repo facts: exact commands, paths,
domain constraints, release policy, review policy, verification requirements,
and environment boundaries.

## Targets

### Codex

Minimum committed files in the consuming repository:

- `AGENTS.md`
- `.agents/README.md`

Recommended shared repo docs:

- `REVIEW.md`
- `VERIFICATION.md`
- optional `REPOSITORY.md`

Optional generated or linked files:

- `.agents/skills/<skill>/SKILL.md`
- `.agents/prompts/<prompt>.md`

Codex can also read canonical files directly from `{{AGENTS_REPO_PATH}}`, so
repo-local skills should wrap workflows rather than redefine role behavior.

### Claude Code

Minimum committed files in the consuming repository:

- `CLAUDE.md`
- optional `.claude/agents/<role>.md` when subagents must be discoverable

Recommended shared repo docs:

- `REVIEW.md`
- `VERIFICATION.md`
- optional `REPOSITORY.md`

Optional generated or linked files:

- `.claude/skills/<skill>/SKILL.md`
- `.claude/commands/<command>.md`

Claude Code generated agents should include enough source pointers for the main
session to reload canonical roles, references, and pipeline rules.

### Future revo Runtime

The future orchestrator should import canonical roles, references, pipelines,
and catalogs directly. It should not import generated Codex or Claude Code files
as source data.

## Materialization Modes

### Pointer Mode

The consuming repo commits entrypoints that point to `{{AGENTS_REPO_PATH}}`.
Agents read canonical files directly at runtime.

Use this by default for local Codex and Claude Code runs.

### Link Mode

The consuming repo uses symlinks or equivalent links for generated adapter
files. Links must target canonical files or generated output that can be rebuilt
from canonical files.

Use this when the platform accepts linked files and the same filesystem is
available.

### Generated Mode

The consuming repo stores generated adapter files. Generated files must have a
header that identifies their source and update rule.

Use this when the platform requires files to exist inside the consuming repo.

### Vendor Mode

The consuming repo stores a pinned copy of canonical method files.

Use this only when pointer, link, or generated mode is not practical. The pinned
revision must be visible in repo-local docs or run state.

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

## Update Flow

1. Update or clone the canonical agents repository.
2. Resolve `{{AGENTS_REPO_PATH}}` and `{{TARGET_REPO_PATH}}` from ignored local
   overlays or human input.
3. Read `bootstrap.md`, this file, and the selected adapter README.
4. Rebuild, relink, or refresh only files owned by the selected materialization
   mode.
5. Review the consuming repo diff before committing.
6. Keep local values in ignored overlays, never in generated committed files.
7. If a generated file needs a behavior change, update the canonical role,
   pipeline, stack, or adapter first.

## Validation

Before using materialized files, verify:

- every generated file points to a canonical source;
- source paths exist in `{{AGENTS_REPO_PATH}}`;
- repo-local overlays are used for concrete commands and policies;
- the selected role ids exist in `roles/INDEX.md`;
- the selected pipeline id exists in `pipelines/INDEX.md`;
- no generated file contains concrete local paths, accounts, tokens, hosts, or
  deployment coordinates;
- generated files do not weaken human gates or role rights.

## Rules

- Prefer pointer mode unless the tool requires local generated files.
- Do not copy the whole method tree into a consuming repo.
- Do not edit generated files directly except for emergency local debugging.
- Do not let adapter files override canonical role or pipeline behavior.
- Do not let generated templates override current repo-local overlays.
- Do not store resolved env values in committed materialized files.
- Record materialization problems in the selected adapter README or method
  maintenance flow, not inside a role definition.
