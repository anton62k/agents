# Verification Result Template

Canonical schema owner: `../../references/quality/verification.md`.

The developer, integrator, watcher, or QA role fills this artifact after running
or inspecting gates from `verification_plan`.

```yaml
verification_result:
  plan_ref: ""
  role: developer | integrator | watcher | qa-backend | qa-frontend
  status: passed | failed | partial | blocked | skipped
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
- Failed required gates block completion.
- Skipped optional configured gates are acceptable only with a concrete reason.
- A missing credential, project access, or external permission is `needs_human`
  when the approved pipeline requires that gate.
