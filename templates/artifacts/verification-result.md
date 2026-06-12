# Verification Result Template

Fillable copy of the schema owned by `../../references/quality/verification.md`.
Escalation vocabulary owner: `../../method/escalation.md`.

Developer, integrator, and watcher fill this artifact after running or
inspecting gates from `verification_plan`. Deploy watcher and QA roles use their
role-owned result contracts instead.

```yaml
verification_result:
  plan_ref: ""
  role: developer | integrator | watcher
  status: passed | failed | partial | blocked | skipped
  source:
    repo_verification_contract_status: present | missing | stale | equivalent
    fallback_used: false
  executed:
    - id: ""
      command: ""
      status: passed | failed
      evidence: ""
  skipped:
    - id: ""
      reason: >
        not-applicable | missing-credential | missing-config |
        missing-tooling | human-required
      evidence: ""
  static_analysis:
    - id: ""
      provider: ""
      mode: local | hosted | ci | pr-decoration | unknown
      status: passed | failed | partial | skipped | unavailable | pending
      provider_state: >
        not_configured | configured_local | configured_hosted |
        configured_unavailable | unknown
      issue_level_access: available | unavailable | not-supported | unknown
      quality_gate: passed | failed | not-reported | unknown
      categories:
        security: passed | failed | not-reported | unknown
        reliability: passed | failed | not-reported | unknown
        maintainability: passed | failed | not-reported | unknown
        duplication: passed | failed | not-reported | unknown
        coverage: passed | failed | not-reported | unknown
        dependency_risk: passed | failed | not-reported | unknown
      findings:
        - rule: ""
          severity: ""
          category: ""
          location: ""
          state: new | existing | fixed | false-positive | accepted-risk | unclear
          next_owner: developer | reviewer | human | waiting
          evidence: ""
  remote:
    - id: ""
      provider: ""
      status: passed | failed | pending | unavailable
      evidence: ""
  pr_feedback:
    target:
      pr_ref: ""
      base_ref: ""
      head_ref: ""
      head_sha: ""
    verdict: ready | needs-work | needs-reviewer | needs-human | waiting | unknown
    review_decision: >
      approved | changes-requested | review-required | blocked | unknown
    required_checks: passed | failed | pending | unavailable | unknown
    unresolved_threads: 0
    provider_waiting:
      - provider: ""
        reason: rate-limit | quota-limit | processing | provider-maintenance | unknown
        resume_after: ""
        evidence: ""
    queue:
      - id: ""
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
  blockers: []
  residual_risks: []
  next_action: continue | needs_developer | needs_reviewer | needs_human | waiting
```

## Fill Rules

- Summarize evidence; do not paste full logs unless the consuming repo asks for
  them.
- Preserve whether the plan came from `VERIFICATION.md`, an equivalent repo
  contract, or fallback discovery.
- Failed required gates block completion.
- Skipped optional configured gates are acceptable only with a concrete reason.
- For configured static analysis, record issue-level findings when available and
  preserve any access limitation as `partial`, `unavailable`, `skipped`, or
  `needs_human`.
- For PR feedback, preserve unresolved threads separately from top-level
  provider status comments. Provider rate limits, quota limits, or wait
  instructions are `waiting` states with `resume_after` when available.
- Tie `pr_feedback` to the exact PR reference, base ref, head ref, and head SHA
  observed during the watcher cycle. A later head change makes the verdict
  stale.
- A missing credential, project access, or external permission is `needs_human`
  when the approved pipeline requires that gate.
- Use `continue`, `needs_developer`, `needs_reviewer`, `needs_human`, and
  `waiting` according to `../../method/escalation.md`.
