# Verification Result Template

Canonical schema owner: `../../references/quality/verification.md`.

The developer, integrator, watcher, or QA role fills this artifact after running
or inspecting gates from `verification_plan`.

```yaml
verification_result:
  plan_ref: ""
  role: developer | integrator | watcher | qa-backend | qa-frontend
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
- A missing credential, project access, or external permission is `needs_human`
  when the approved pipeline requires that gate.
