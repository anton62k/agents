# PR Feedback Loop

The PR feedback loop is the remote quality loop after a branch or pull request
is published. It combines CI, static analysis, review bots, human review,
review threads, top-level provider status comments, and merge readiness into one
route decision.

This reference is provider-neutral. CodeRabbit, Sonar, CodeQL, GitHub Actions,
Gitar, and other tools are examples, not defaults.

## Responsibilities

- Integrator publishes commits and PRs, then routes to watcher.
- Watcher reads remote state and produces a terminal verdict for the current
  poll cycle.
- Developer fixes actionable implementation findings.
- Reviewer judges ambiguous, false-positive, accepted-risk, and review-quality
  questions.
- Merger merges only after explicit authorization and watcher `ready`.

## Feedback Sources

Inspect feedback from most specific to least specific:

1. Required CI/status checks and failing job logs.
2. Static-analysis issue lists, annotations, hotspots, and PR decoration.
3. Non-outdated review threads.
4. Human review decision and latest submitted reviews.
5. Top-level PR comments from providers or humans.
6. Aggregate check state.

Top-level comments are not the canonical queue for code review findings, but
they can contain provider state such as rate limits, quota exhaustion, processing
status, or instructions to wait before retrying.

## Verdicts

- `ready`: required checks passed, no unresolved blocking review threads, no
  unresolved required provider findings, review decision does not block, and no
  waiting provider state is active.
- `needs-work`: at least one valid actionable finding needs code, tests, docs,
  generated-artifact source, config, or verification changes.
- `needs-reviewer`: a finding needs adversarial judgment before coding, for
  example false-positive, accepted-risk, or unclear provider semantics.
- `needs-human`: a decision, permission, account, approval, security judgment, or
  product clarification cannot be resolved by the agent.
- `waiting`: remote systems are still running, rate-limited, quota-limited, or
  explicitly instruct the agent to wait until a stated time.

Do not return "monitoring started" as a terminal result.

## Queue Item Schema

Represent each remote finding or state as a queue item:

```yaml
pr_feedback_item:
  id: ""
  source: >
    ci | static-analysis | review-thread | human-review |
    bot-comment | provider-status
  provider: ""
  category: >
    code | test | docs | config | security | coverage |
    duplication | process | access | wait
  severity: blocker | high | medium | low | info
  state: >
    valid | partial | already-fixed | false-positive |
    accepted-risk | unclear | waiting
  location: ""
  summary: ""
  evidence: ""
  next_owner: developer | reviewer | human | watcher | waiting
  reply_target: thread | none
  resolve_after: fix-pushed | explanation-posted | wait-complete | human-decision
  resume_after: ""
```

`resume_after` is used only for waiting states. It may be an absolute timestamp,
a provider-provided duration, or a human-readable time copied from the provider
comment.

## Provider Waiting And Limits

Some providers publish top-level comments or check summaries saying that review
is still in progress, a quota was exceeded, a rate limit was hit, or the next
review can run only after a stated time. Watcher must treat those messages as
remote provider state, not as review findings.

For example, a review bot may update its main PR comment to say that review
limits were exceeded and that the next attempt is allowed after a stated time.
That is a `waiting` state with `resume_after` when the wait time is present.

Rules:

- Parse the provider name, limit type, current state, and wait time when the
  message provides them.
- Record the state as `waiting` with `category: wait` and `next_owner: waiting`.
- Preserve the provider's stated `resume_after` or wait duration in the result.
- Do not route provider waiting states to Developer.
- Do not post a top-level "waiting" comment back to the PR.
- Recheck after `resume_after` when the run policy allows waiting.
- Return `needs_human` when the provider requires account, billing, plan,
  permission, or manual re-run action that the agent cannot perform.
- Return `needs_human` when the wait exceeds the run's approved time budget or
  blocks a required merge/deploy decision.

If a provider has both waiting state and actionable threads or failed checks,
preserve both. The next route is the most blocking actionable state unless the
provider explicitly says the review output is incomplete.

## Review Threads

Review threads are the canonical queue for line-specific review findings.

- Fetch non-outdated unresolved threads.
- Classify each thread as valid, partially valid, already fixed, false positive,
  accepted risk, unclear, or waiting.
- Reply in the review thread only when a fix or explanation is ready.
- Resolve a thread only after the fix is pushed and validated, or after a narrow
  explanation is posted in-thread and the policy allows no code change.
- Do not reply to review-thread findings as top-level PR comments.
- Verify that no pending draft review was accidentally created.

## Top-Level Comments

Top-level comments are useful for provider status, summary, and human process
messages. They are not a substitute for review threads.

Use them to detect:

- provider still processing;
- rate limit, quota limit, or plan limit;
- provider-requested wait or retry time;
- missing provider permissions;
- summary links to issue-level findings;
- human process comments that do not map to a review thread.

If a top-level human comment requests a code change, route to reviewer first
when the request is ambiguous or lacks a file/thread target.

## Route Decisions

- Route to `developer` for valid code, test, docs, config, generated-artifact
  source, lint, CI, and static-analysis findings inside the approved scope.
- Route to `reviewer` for unclear findings, false positives, accepted risks, and
  provider-rule interpretation.
- Route to `human` for missing permissions, required approvals, billing or plan
  limits, account selection, security acceptance, or ambiguous product decisions.
- Route to `watcher` after each fix commit, provider rerun, or wait interval.
- Route to `merger` only after watcher returns `ready` and merge authorization
  is explicit for the current run.

## Completion Rules

The loop is complete only when watcher returns `ready`, or when a blocker is
recorded with the next owner and required action. A PR URL, open PR, or pending
review bot is not completion unless the approved pipeline defines that as the
terminal state.
