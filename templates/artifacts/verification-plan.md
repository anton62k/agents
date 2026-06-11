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
      command: "{{STATIC_ANALYSIS_COMMAND}}"
      skip_if_missing:
        - credential
        - project_access
        - provider_config
      evidence_required: issue_or_gate_summary
  remote_after_push:
    - id: remote-ci
      provider: "{{CI_PROVIDER}}"
      evidence_required: status_checks
    - id: review-threads
      provider: github
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
- Do not assume JavaScript, TypeScript, npm, Sonar, FSD, CodeQL, Semgrep, or any
  other stack/tool in the canonical template.
