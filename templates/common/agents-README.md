# .agents

This directory is a consuming-repo overlay for the canonical agents method.

## Source

- canonical method: `{{AGENTS_REPO_PATH}}`
- manual run protocol: `{{AGENTS_REPO_PATH}}/method/manual-run.md`
- bootstrap protocol: `{{AGENTS_REPO_PATH}}/method/bootstrap.md`

## Local Files

Use ignored files for concrete local values:

- `.agents/local.env`
- `.agents/local.context.md`
- `.agents/runs/`

Example `.agents/local.context.md`:

```md
agents_repo_path: <local checkout of the canonical agents repository>
target_repo_path: <local checkout of this repository>
```

## Rules

- Do not copy the full canonical method into this directory.
- Keep generated skills or adapter files reproducible from
  `{{AGENTS_REPO_PATH}}`.
- Keep run artifacts out of reusable method changes unless the repo explicitly
  commits them.
