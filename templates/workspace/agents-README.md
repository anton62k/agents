# .agents

This directory is the workspace-local overlay for the canonical agents method.

## Source

- canonical method: `{{AGENTS_REPO_PATH}}`
- manual run protocol: `{{AGENTS_REPO_PATH}}/method/manual-run.md`
- bootstrap protocol: `{{AGENTS_REPO_PATH}}/method/bootstrap.md`
- materialization protocol: `{{AGENTS_REPO_PATH}}/method/materialization.md`
- artifact templates: `{{AGENTS_REPO_PATH}}/templates/artifacts/`

## Expected Symlinks

- `.agents/skills -> ../agents/adapters/codex/materialized/skills`
- `.codex/agents -> ../agents/adapters/codex/materialized/agents`
- `.claude/agents -> ../agents/adapters/claude-code/materialized/agents`
- `.claude/skills -> ../agents/adapters/claude-code/materialized/skills`

## Local Files

Use ignored files for concrete local values:

- `.agents/local.env`
- `.agents/local.context.md`
- `.agents/runs/`

If this workspace root is versioned, merge
`{{AGENTS_REPO_PATH}}/templates/workspace/gitignore` into its ignore rules.

Example `.agents/local.context.md`:

```md
agents_repo_path: <local checkout of the canonical agents repository>
workspace_root: <local checkout of this workspace>
```

## Rules

- Do not copy the full canonical method into this directory.
- Keep generated skills or adapter files reproducible from
  `{{AGENTS_REPO_PATH}}`.
- Keep run artifacts out of reusable method changes unless the workspace
  explicitly commits them.
