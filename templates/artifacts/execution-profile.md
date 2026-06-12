# Execution Profile Template

Canonical policy owner: `../../method/execution-policy.md`.

Use this template for ignored local overlays or future runtime config. It tells
the orchestrator which roles, runners, model profiles, and consensus providers
are actually available in the current workspace.

Do not commit a filled profile with personal accounts, concrete local paths,
private hostnames, tokens, secrets, or provider credentials.

Recommended ignored filled profile path: `.agents/local.execution-profile.md`.

```yaml
execution_profile:
  execution_modes:
    codex:
      available: true | false | unknown
      agents_available: true | false | unknown
      skills_available: true | false | unknown
    claude-code:
      available: true | false | unknown
      subagents_available: true | false | unknown
      skills_available: true | false | unknown
    revo-future:
      available: true | false | unknown

  available_roles: []

  model_profiles:
    cheap:
      preferred_runner: codex | claude-code | revo-future | other | unknown
      concrete_model: "{{LOCAL_MODEL_NAME}}"
      availability: available | missing | unknown
    standard:
      preferred_runner: codex | claude-code | revo-future | other | unknown
      concrete_model: "{{LOCAL_MODEL_NAME}}"
      availability: available | missing | unknown
    deep:
      preferred_runner: codex | claude-code | revo-future | other | unknown
      concrete_model: "{{LOCAL_MODEL_NAME}}"
      availability: available | missing | unknown

  consensus_providers:
    reviewer:
      - runner: codex | claude-code | revo-future | other
        model_profile: cheap | standard | deep
        concrete_model: "{{LOCAL_MODEL_NAME}}"
        availability: available | missing | unknown

  budget_defaults:
    iteration_cap: null
    token_budget: null
    reported_cost_budget: null
    reported_currency: null
    budget_exhaustion_action: needs_human | stop | degrade_models
    approved_model_downgrades: []
```
