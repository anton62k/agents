# Backend QA Core Reference

Backend QA verifies runtime behavior that static checks and unit tests can miss.

## Hard Rules

- [ORCHESTRATOR] Live QA catches runtime bugs that CI can miss.
- [ORCHESTRATOR] Secret values must not be echoed.
- [ORCHESTRATOR] Cluster access must be explicitly scoped.
- [DECISION] Verify API contracts through request shape, response shape, auth
  behavior, error model, and retry or idempotency expectations.
- [DECISION] Use integration evidence for behavior crossing persistence, auth,
  queue/event, HTTP, transaction, rollback, or migration boundaries.
- [DECISION] Treat database-specific semantics as QA targets when the change
  depends on query, JSON, transaction, or migration behavior.
- [DECISION] Report exact endpoint, scenario, observed result, expected result,
  and evidence source. Keep credentials and secret values out of output.
- [DECISION] Route to `developer` for reproducible backend behavior failures.
- [DECISION] Route to `reviewer` when observed behavior may be acceptable risk,
  false positive, compatibility tradeoff, or security-sensitive interpretation.
- [DECISION] Return `needs_human` when required runtime access, credentials,
  deployment target, or approval is unavailable.
- [DECISION] Do not mutate databases, queues, secrets, or infrastructure unless
  the pipeline explicitly grants that operation. Prefer API setup and teardown.
- [DECISION] Treat missing test data, missing credentials, unavailable target,
  and provider wait states as blockers, not passed QA.

## Scenario Design

Backend QA scenarios should be derived from the accepted task behavior, bug
reproduction, verification plan, and deployment evidence.

Cover only what is relevant to the run:

- happy path and changed contract shape;
- auth and permission behavior;
- expected error behavior;
- idempotency, retry, or duplicate submission behavior;
- persistence, transaction, rollback, queue, or integration effects;
- migration or data-compatibility behavior when the change touched it.

Use existing test accounts, fixtures, or setup APIs from run state or local
overlay. Do not invent credentials or write them into method docs.

## Result Contract

Return a compact QA result:

```yaml
qa_backend_result:
  target_env: "{{TARGET_ENV}}"
  scenarios:
    - name: ""
      status: pass | fail | blocked | skipped
      endpoint: ""
      observed: ""
      expected: ""
      evidence: []
      next_owner: developer | reviewer | human | waiting | none
  blockers: []
  residual_risk: []
  next_route_action: continue
```

Use `next_route_action` from `../../../method/escalation.md`. Reproducible
application failures route to developer. Risk classification and accepted-risk
questions route to reviewer. Access, credentials, target, and approval blockers
route to human.

## Stop Conditions

- Return `needs_developer` for reproducible backend behavior failures with clear
  request, response, expected behavior, and evidence.
- Return `needs_reviewer` when the observed behavior needs risk classification,
  compatibility judgment, accepted-risk judgment, or security interpretation.
- Return `needs_human` when target access, credentials, approved test data,
  destructive setup, or live-system permission is missing.
- Return `waiting` when a remote provider, deployment, or dependency is still
  progressing and no local owner can act yet.
- Return `continue` only when required scenarios passed or were explicitly
  skipped with accepted residual risk.

## Source Material

- `../../../references/quality/verification.md`
- `../../../method/escalation.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
