# Provider routing

These instructions apply when the user explicitly asks for another model or
agent (for example, “ask Grok to review this”). Do not launch another provider
for ordinary work unless requested.

## Same provider as this session

Delegate through the session's native subagent mechanism so the child inherits
the correct provider context and its result returns to the current session:

- Codex session: use Codex subagents.
- Claude Code session: use the `Task` tool / Claude subagents.
- Grok session: use `spawn_subagent` / Grok subagents.

Do not start a second CLI process for the same provider just to delegate.

## Different provider

Read that provider's guide, then use its headless command. Give it a bounded
task and the relevant paths or context. Ask for findings or a proposed patch;
avoid having multiple providers edit the same files at once. Keep CLI tool
access and permissions no broader than the task needs. Summarize the provider's
result and distinguish its findings from changes made in the current session.

## Before relying on a CLI

Check that its executable is available and run a small, non-mutating prompt.
If the CLI is missing, unauthenticated, or fails, report that and do not imply
that the other model answered. Verify the actual output, not just a zero exit
code. For subagent claims, use a native agent tool and verify that a child was
spawned and completed when the CLI exposes that metadata.
