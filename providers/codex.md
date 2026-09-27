# Codex CLI

Use this guide only when the user explicitly requests Codex and the current
session is running under a different provider. In a Codex session, delegate
with native Codex subagents instead.

## Headless invocation

Check availability with `command -v codex`. A bounded, read-only invocation is:

```sh
codex exec --ephemeral -C "$PWD" --skip-git-repo-check --sandbox read-only \
  'Review the requested files for [specific question]. Return concise findings with file paths.'
```

Use `--ephemeral` for one-off consultations. Keep read-only sandbox unless the
user specifically requested a change from Codex; for edits, choose an
appropriately scoped writable workspace and inspect the resulting diff.

## Native delegation

When this is the active Codex session, use its built-in subagent tools. Delegate
independent bounded work such as a review or focused investigation; collect
the child result before reporting it.
