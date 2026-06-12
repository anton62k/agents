# Verification Plan Template

Canonical schema owner: `../../references/quality/verification.md`.

The orchestrator prepares this artifact before developer execution. It maps
generic route capabilities to concrete repo-local commands only when the
consuming repo or run overlay provides them.

```yaml
verification_plan:
  source_inputs:
    route_plan_ref: ""
    repo_verification_contract:
      path: "VERIFICATION.md"
      status: present | missing | stale | equivalent
      equivalent_path: ""
      fallback_used: false
    repo_quality_docs: []
    stack_references: []
    tooling_references: []
    risk_notes: []
  required:
    - id: primary-local-gate
      capability: primary_local_gate
      command: "{{LOCAL_VERIFY_COMMAND}}"
      source: repo-overlay
      evidence_required: command_output_summary
  conditional:
    - id: changed-surface-gate
      capability: architecture_or_structure
      applies_when: []
      command: "{{CHANGED_SURFACE_CHECK_COMMAND}}"
      source: repo-overlay
      evidence_required: command_output_summary
  optional_configured:
    - id: static-analysis
      provider: "{{STATIC_ANALYSIS_PROVIDER}}"
      capability: static_analysis
      provider_state: >
        not_configured | configured_local | configured_hosted |
        configured_unavailable | unknown
      mode: local | hosted | ci | pr-decoration | unknown
      scope: changed-code | new-code | full-project | unknown
      blocking: false
      command: "{{STATIC_ANALYSIS_COMMAND}}"
      hosted_check: "{{STATIC_ANALYSIS_HOSTED_CHECK}}"
      issue_level_access: required | best-effort | unavailable | unknown
      categories:
        - security
        - reliability
        - maintainability
        - duplication
        - coverage
        - dependency_risk
        - quality_gate
      skip_if_missing:
        - credential
        - project_access
        - provider_config
      evidence_required: issue_summary_with_gate_status
      false_positive_policy: reviewer_or_human_required
  remote_after_push:
    - id: remote-ci
      provider: "{{CI_PROVIDER}}"
      evidence_required: status_checks
    - id: hosted-static-analysis
      provider: "{{STATIC_ANALYSIS_PROVIDER}}"
      applies_when: static_analysis.provider_state == configured_hosted
      evidence_required: issue_summary_with_gate_status
    - id: review-threads
      provider: "{{REVIEW_THREAD_PROVIDER}}"
      evidence_required: unresolved_thread_count
  documentation_followups: []
  stop_and_escalate_if: []
```

## Fill Rules

- Look for `VERIFICATION.md` or a repo-declared equivalent before selecting
  commands.
- Use commands from repo-local verification docs, scripts, CI config, or ignored
  run overlays.
- If the repo-local contract is missing, set `fallback_used: true` and add a
  documentation follow-up.
- Use placeholders when a local value, provider, account, token, or project key
  is required.
- Mark provider-specific gates as `optional_configured` unless the consuming repo
  explicitly makes them required.
- When static analysis is selected, record provider state, mode, scope,
  categories, issue-level access, and false-positive policy.
- Do not assume JavaScript, TypeScript, npm, Sonar, FSD, CodeQL, Semgrep, or any
  other stack/tool in the canonical template.
