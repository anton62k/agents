# Grok CLI

Use this guide only when the user explicitly requests Grok and the current
session is running under a different provider. In a Grok session, use native
Grok subagents instead.

## Headless invocation

Check availability with `command -v grok`. A bounded, no-tools consultation
is:

```sh
grok -p 'Review this question: [specific question]. Return concise findings.' \
  --tools '' --output-format plain
```

When code context is needed, set `--cwd "$PWD"` or run from the project
directory, and grant only the tools required. Avoid automatic approval flags
unless explicitly needed and authorized.

## Native delegation

When Grok is the active session, delegate through `spawn_subagent` and collect
the result with the corresponding subagent output tool. Do not claim delegation
unless the child was actually spawned and completed.
