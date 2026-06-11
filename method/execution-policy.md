# Execution Policy

Execution policy defines how the orchestrator chooses runners, model levels,
review consensus, iteration caps, budgets, and human approval before a pipeline
starts.

Canonical method files use portable policy. Concrete model names, account names,
runner credentials, local paths, and provider-specific limits belong in ignored
local overlays or future runtime config.

## Policy Sources

The orchestrator builds execution policy from these sources, in order:

1. canonical role and pipeline requirements;
2. consuming repo overlays and run request constraints;
3. local execution profile, for example `.agents/local.context.md` or a future
   runtime config;
4. user overrides during route approval.

The canonical method may recommend `cheap`, `standard`, or `deep`. It must not
hardcode current provider model names as required behavior.

## Model Levels

- `cheap` - low-cost monitoring, status classification, simple summarization,
  and low-risk follow-up routing.
- `standard` - ordinary implementation, integration, and non-ambiguous analysis.
- `deep` - requirements analysis, architecture, adversarial review, security,
  data migration, cross-repo work, and high-risk decisions.

Role `default_model_level` is a starting point. The orchestrator may recommend a
different level based on risk, repo overlay, user budget, or missing capability.

## Consensus Modes

- `none` - no reviewer consensus; suitable for tiny local tasks or direct human
  instructions.
- `single-reviewer` - one independent review voice.
- `dual-model` - two independent review voices using different model profiles or
  runners when available.
- `adversarial-consensus` - independent reviewers plus explicit adjudication of
  disagreements before progression.

Consensus is a pipeline or route policy, not hidden behavior inside the
`reviewer` role. A reviewer is one review voice. The orchestrator decides how
many voices are required for the current route.

## Default Recommendations

- `analysis-only`: analyst `deep`; architect `deep` when selected; reviewer
  `standard` or `deep` only when factual risk is high.
- `bugfix`: developer `standard`; reviewer `single-reviewer`; use `deep` when
  root cause, data, security, or architecture risk is unclear.
- `feature-development`: analyst `deep`; architect `deep` when selected;
  developer `standard`; task-spec and code review use `dual-model` by default.
- `method-development`: knowledge-engineer `deep`; reviewer `single-reviewer`
  or `dual-model` when role/pipeline boundaries change.
- `post-merge-qa`: deploy-watcher and watcher `cheap`; QA `standard`; escalate
  to `deep` only for unexplained runtime or data-risk findings.

Repo overlays and human route approval may override these defaults.

## Route Approval Choices

Before execution, the orchestrator must show:

- selected pipeline;
- selected roles and omitted optional roles;
- recommended model level per role;
- consensus mode per review gate;
- iteration cap;
- token or reported-cost budget when supplied;
- missing models, runners, or capabilities;
- human gates.

The human may answer:

- `approve`;
- `change pipeline`;
- `change roles`;
- `change models`;
- `change consensus`;
- `set budget`;
- `analysis only`;
- `method first`;
- `stop`.

If the human changes models, consensus, or budget, regenerate the route plan and
rerun capability check before execution.

## Budget Policy

Budget policy is advisory for manual Codex and Claude Code runs and enforceable
for future runtimes that own scheduling.

Use these fields:

- `iteration_cap` - maximum developer/reviewer or developer/watcher loops before
  escalation.
- `token_budget` - optional run budget in provider-reported tokens.
- `reported_cost_budget` - optional run budget in provider-reported currency.
- `budget_exhaustion_action` - `needs_human`, `stop`, or `degrade_models`.

Do not compute cost from a committed price table. Use `usage-accounting.md`.

## Capability Rules

- If a required role is unavailable, recommend `method first`, `change roles`,
  or `analysis only`.
- If a recommended model level is unavailable, propose the closest available
  fallback and make reduced coverage visible.
- If `dual-model` or `adversarial-consensus` cannot be satisfied, ask the human
  to approve `single-reviewer`, change providers, or stop.
- Do not silently increase model level, consensus width, live access, write
  rights, or budget after route approval.
- Concrete model and runner names may appear in run state only when they come
  from local overlays or runtime config.
