# Frontend QA Core Reference

Frontend QA verifies browser-visible behavior and interaction quality.

## Hard Rules

- [ORCHESTRATOR] Browser QA is a separate signal from build/lint/typecheck.
- [ORCHESTRATOR] Authentication values are local overlay values.
- [DECISION] Cover critical user workflows, responsive breakpoints, forms,
  validation, empty/loading/error states, and visual asset loading when relevant
  to the change.
- [DECISION] Check keyboard navigation, visible focus, semantic controls, input
  labels, icon-only button labels, contrast, and text fit at common viewport
  sizes.
- [DECISION] Use Storybook or component-state fixtures when isolated UI states
  need visual review or regression coverage.
- [DECISION] Use browser or e2e checks for behavior that depends on routing,
  hydration, generated API contracts, browser APIs, layout, or real assets.
- [DECISION] Report viewport, route, scenario, observed result, expected result,
  and evidence source. Keep authentication values and cookies out of output.
- [DECISION] Route to `developer-frontend` for reproducible frontend behavior
  failures.
- [DECISION] Route to `reviewer` when a visual, accessibility, generated
  contract, or compatibility finding needs risk classification before code
  should change.
- [DECISION] Return `needs_human` when authentication, browser access, visual
  approval, or product copy approval blocks QA.
- [DECISION] Treat missing browser automation, missing login state, unavailable
  backend target, and provider wait states as blockers, not passed QA.

## Scenario Design

Frontend QA scenarios should be derived from the accepted task behavior, bug
reproduction, verification plan, and deployment evidence.

Cover only what is relevant to the run:

- critical workflow path and changed route;
- loading, empty, error, success, permission, and validation states touched by
  the change;
- responsive viewport states required by the repo or task;
- keyboard navigation, focus, labels, and semantic controls for changed
  interactions;
- generated API contract or backend integration behavior visible in the browser;
- asset loading, hydration, browser APIs, or layout behavior when relevant.

Use approved login and target placeholders from run state or local overlay. Do
not place credentials, cookies, tokens, or secret values in screenshots or
markdown.

## Result Contract

Return a compact QA result:

```yaml
qa_frontend_result:
  source_refs:
    deploy_watcher_result_ref: ""
    verification_plan_ref: ""
    task_or_finding_ref: ""
  target_env: "{{TARGET_ENV}}"
  scenarios:
    - name: ""
      status: pass | fail | blocked | skipped
      route: ""
      viewport: ""
      observed: ""
      expected: ""
      evidence: []
      next_owner: developer-frontend | reviewer | human | waiting | none
  artifacts: []
  blockers: []
  residual_risk: []
  next_route_action: continue
```

Use `next_route_action` from `../../../method/escalation.md`. Reproducible
frontend behavior failures route to developer-frontend. Risk classification,
accepted-risk, visual approval, accessibility judgment, and compatibility
questions route to reviewer or human according to the run gate.

## Runtime Evidence Boundary

Frontend QA consumes deploy-watcher evidence and approved scenario sources. Do
not run browser scenarios when deployment evidence is missing, stale, or points
to a different target environment or revision than the run expects.

Use `source_refs` to keep the QA result tied to the deploy result, verification
plan, and accepted task, bug, or finding. Keep screenshots, traces, cookies,
tokens, and personally sensitive data out of the result unless the repo-local
policy explicitly requires a redacted artifact reference.

## Stop Conditions

- Return `needs_developer` for reproducible frontend behavior failures with
  route, viewport, observed behavior, expected behavior, and evidence.
- Return `needs_reviewer` when the observed behavior needs accessibility,
  compatibility, visual-risk, generated-contract, or accepted-risk judgment.
- Return `needs_human` when authentication, browser access, target access, visual
  approval, product copy approval, or destructive setup permission is missing.
- Return `waiting` when a remote provider, deployment, or dependency is still
  progressing and no local owner can act yet.
- Return `continue` only when required scenarios passed or were explicitly
  skipped with accepted residual risk.

## Source Material

- `../../../references/quality/verification.md`
- `../../../method/escalation.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
