# Claude Code

Use this guide only when the user explicitly requests Claude and the current
session is running under a different provider. In a Claude Code session, use
the native `Task` tool / Claude subagents instead.

## Headless invocation

Check availability with `command -v claude`. A bounded, no-tools consultation
is:

```sh
claude -p 'Review this question: [specific question]. Return concise findings.' \
  --output-format text --tools ''
```

When code context is needed, run from the relevant project directory and grant
only the tools required for the task. Avoid permission-bypass flags. For a
read-only review, prefer read/search tools and do not grant Edit or Write.

## Native delegation

When Claude Code is the active session, use the `Task` tool (the built-in
subagent tool) for bounded independent work. Wait for completion and pass the
child's result back accurately.
