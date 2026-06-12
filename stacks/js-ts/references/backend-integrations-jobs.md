# Backend Integrations And Jobs Reference

This reference applies when backend work touches queues, workers, scheduled
jobs, webhooks, external APIs, cache, notifications, or other asynchronous
integration boundaries.

## Source Priority

1. Repo-local worker, queue, webhook, retry, outbox, idempotency, and
   observability docs.
2. Existing job handlers, integration adapters, and tests.
3. Selected framework references.
4. This reference.

## Route Evidence

Select this reference when repo evidence shows workers, queues, scheduled jobs,
webhooks, external API clients, outbox or inbox tables, cache invalidation,
notifications, retries, or integration-specific observability.

## Responsibilities

Integration boundary should own:

- protocol or client mapping;
- retries, timeouts, cancellation, and backoff according to repo policy;
- idempotency keys or deduplication when repeated execution is possible;
- durable failure handling and observability.

Application layer should own:

- business decision to enqueue, call, compensate, or ignore;
- transaction coordination with persistence;
- mapping integration results into domain/application outcomes.

## Hard Rules

- [DECISION] External calls, queues, workers, and webhooks require explicit
  idempotency, retry, timeout, and error classification rules when they can be
  repeated or partially fail.
- [DECISION] Do not hide integration failure behavior behind generic helpers.
  A caller should know whether failure is retried, ignored, compensated, or
  surfaced.
- [DECISION] Jobs that mutate data need real persistence tests for success,
  duplicate delivery, retry, and partial failure when those risks exist.
- [DECISION] Queue and worker handlers should call application API services,
  commands, or use cases. They should not duplicate transport, persistence, or
  domain policy from API handlers.
- [DECISION] When a database write and async delivery must be coordinated,
  choose an approved durable handoff pattern such as outbox, inbox, or
  repo-specific job scheduling. Do not rely on implicit ordering without naming
  the failure mode.
- [DECISION] Integration adapters should separate client/protocol mapping from
  application decisions. Business code should not know low-level retry or
  serialization mechanics unless they are part of the product rule.
- [DECISION] Observability is part of the contract for long-running or async
  work: log enough context to debug without leaking secrets.

## Verification Signals

Integration and job changes commonly require `tests` for idempotency, retry,
partial failure, persistence coordination, and serialization. Boundary checks
map to `architecture_or_structure` through `verification.md`.

## Stop Conditions

- Return `needs_architect` when retry, idempotency, transaction, or outbox
  strategy is unclear.
- Return `needs_analyst` when business behavior for partial failure is unclear.
- Return `needs_human` when adding new external calls, queues, or scheduled jobs
  requires operational approval.
