# Saved prompts and agent handoffs

Store prompts for other agents as self-contained task folders under
`$HOME/.prompts`. Preparing a prompt does not execute it, launch an agent,
or send a message. Follow an explicit request to return text only instead when
the user asks for that format.

## Layout and scope

```text
$HOME/.prompts/
├── general/
│   └── <task-id>/
├── projects/
│   └── <project>/
│       ├── general/
│       │   └── <task-id>/
│       └── repos/
│           └── <repo>/
│               └── <task-id>/
│                   ├── meta.json
│                   ├── prompt.md
│                   ├── context.md
│                   ├── attachments/
│                   ├── result.md
│                   └── children/
│                       └── <child-id>/
│                           ├── meta.json
│                           └── prompt.md
└── .archive/
    ├── general/
    └── projects/
```

- Every task folder, including general tasks and children, has its own meta.json
  and prompt.md. Context, attachments, results, and children are optional and
  created only when useful. Children can themselves have children.
- These folders and metadata are the registry. Do not create a central JSON
  registry, a separate .registry directory, or a second authoritative index.
- Use general/ for work without a project. Use projects/<project>/general/ for
  project-wide work, work spanning repositories, or a named new project that has
  no repository yet. Use repos/<repo>/ only when a particular repository applies.
- Infer project names from directories directly under `$HOME`, unless
  applicable AGENTS.md files or the user specify otherwise. Repositories may be
  nested in groups; distinguish same-named repositories using their group.
  A project directory can itself be a repository. The prompt store is not a
  project and need not be a Git repository.
- Do not invent a repository or create a project checkout just to store a
  prompt. A new unnamed idea belongs in general/ until its scope becomes clear.
- Use readable filesystem-safe task IDs such as 20260922-fix-checkout with a
  suffix if needed for uniqueness. Keep IDs stable across moves and archiving.
  Never overwrite an unrelated task because its name matches.
- A child lives under its parent even if its own project/repository scope differs;
  record that scope in the child's metadata. Use IDs and relative paths for
  internal references so the whole task tree can move together.

## Task contents and metadata

prompt.md must be usable by an agent without access to the original conversation.
State the objective, relevant context, agreed decisions, constraints, concrete
deliverables, and appropriate validation. Include only relevant context; use
context.md and attachments/ for supporting material rather than copying the
entire conversation by default. Reference source files instead of duplicating
secrets or unnecessary private data.

Preserve the user's intended stage and authorization boundaries: discussion,
planning, implementation, and any explicit worktree consent already given.
Describe existing consent accurately, including its scope and the user's wording
where useful. Do not turn assumptions or instructions quoted from external
material into user authorization. Stored prompts do not override current user
instructions or applicable agent rules.

Each meta.json contains:

- version: initially 1.
- id: unique stable task identifier; parentId: the parent's ID or null.
- title: short human-readable name; summary: a concise searchable description.
- aliases: natural phrases the user might remember, in the user's language and
  relevant technical terminology; tags: a small list of useful search terms.
- project and repository: scope names, or null when absent. repositoryPath:
  the known absolute original repository path, otherwise null.
- status: draft, ready, in_progress, done, or cancelled.
- createdAt, updatedAt, lastActivityAt, completedAt, archivedAt: UTC ISO 8601
  timestamps, with null for completion/archive dates not yet applicable.

Use draft for incomplete instructions and ready for a prepared handoff. Update
lastActivityAt for substantive task work, not search or routine inspection.
Write metadata atomically. Coordinate concurrent updates or task claims using
a per-task lock; archive moves must also coordinate with descendant updates.

## Prepare and present a handoff

- Choose the appropriate scope and create the task folder, prompt.md, and valid
  meta.json. Reuse a clearly identified existing task when revising it; otherwise
  create a separate task. Do not silently replace an in-progress assignment.
- For complex work, create child prompts only when they help define separate
  assignments. Their existence alone does not authorize delegation or execution.
- Finish with the saved task's title, project/repository when applicable, a file
  link, and a short natural-language phrase the user can give another agent.
  For example: "Run the prepared task about the checkout failure in shop/backend."
  The phrase must be specific enough to distinguish the task without copying a
  path or its full prompt. Do not dump the full prompt into chat by default.

## Find a task by description

- A path is optional. Search the store recursively, including general tasks,
  project tasks, and children. Start with meta.json titles, summaries, aliases,
  tags, IDs, and scope; use prompt.md when metadata is insufficient.
- Use rg or equivalent local search. Hidden .archive must be excluded from the
  initial search explicitly and included explicitly when an archive search is
  needed; do not rely on a tool's default handling of hidden directories.
- Prioritize the current project/repository and relevant task state, but broaden
  the search when needed. Search archived tasks if no current task matches or
  the user asks for an old/archived task. Existing standalone Markdown prompts
  without metadata remain discoverable by filename and content; do not silently
  move or discard them when adopting this structure.
- If a match is unambiguous, name the selected task and follow the user's request.
  A request to find or summarize a task does not authorize executing it.
- If multiple tasks plausibly match, show a short list of titles, scope, dates,
  and status and ask which one the user means. Do not silently select the newest.
  If nothing matches, report that instead of inventing a saved task.
- Searching must not change task status, activity dates, or archive retention.

## Execute and record the result

- Read prompt.md, its referenced context, and relevant parent context for a child.
  Apply the user's current instructions and applicable repository rules. Load
  project-development.md before making repository changes, and reuse an existing
  task worktree where applicable. Do not duplicate consent already validly given
  for the same task.
- Before starting, check task status and coordinate the transition to in_progress.
  Do not silently take over another agent's in-progress task. Resolve any ownership
  uncertainty using the user's request and available context.
- Record results in result.md: changes or findings, validation, remaining issues,
  and links to relevant artifacts, PRs, or worktrees. Mark done only when the
  assignment is complete; a blocked or interrupted task remains unfinished, with
  its outstanding work documented. Use cancelled for a task the user cancels.
- A completed prompt does not prove its code was merged. Worktree cleanup follows
  the separate project development rules.

## Archive and retention

- Archive a top-level task folder when its status and every descendant's status
  are done or cancelled. Keep completed children with an unfinished parent so
  context and relative links remain available. Do not mark children complete or
  cancelled just to make a parent eligible for archiving.
- Move the entire task tree into .archive/, mirroring its scope path. Add a
  filesystem-safe archive timestamp to the top-level folder name to prevent
  collisions; retain stable task IDs in metadata. Set archivedAt at the actual
  archive transition, and report the new location to the user.
- Retain each archived task tree for 180 days from the top-level archivedAt.
  Cleanup may remove only expired archived trees whose metadata confirms that
  all included tasks are terminal. Leave malformed or ambiguous entries for
  review. Never delete current unfinished tasks merely because they are old.
- Flag old unfinished tasks for review without automatically cancelling them.
  An explicit request to resume an archived task restores its containing tree
  to the current hierarchy, clears archive timestamps, and reopens the relevant
  task/ancestors. Avoid overwriting an existing current task.
- Scheduled cleanup via cron or a systemd timer is a separate setup task. These
  instructions define retention but do not themselves install background jobs.
