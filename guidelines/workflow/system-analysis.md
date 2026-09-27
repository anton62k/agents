# System analysis

Apply this workflow when preparing an ADR or SPEC, performing system analysis, or
designing implementation for accepted requirements. Load the relevant REQs first.
If business rules are not agreed, discuss them rather than filling the gaps with
architectural assumptions.

## ADR

In this process, an ADR is a concise high-level decision above the SPEC: what will
be built, its boundaries, major modules and interactions, key decisions, and links
to requirements and detailed SPECs. Do not reduce an ADR to a comparison log.

## SPEC

- Give operations domain-specific names and identify their owning module and caller.
- Define inputs and outputs: fields, types, required status, meaning, and results or
  errors.
- Describe storage concretely: system, entities or tables, fields, relationships,
  and constraints.
- For a database or schema change, show "current state -> proposed change -> reason",
  including effects on existing data. Short schema examples can clarify models;
  this does not require query implementation in an ADR or SPEC.
- Describe the algorithm as named actions, branch conditions, and state transitions.
- Address atomicity, transactions, concurrency, retries, idempotency, and freshness
  when applicable.
- Describe integrations using their real mechanism. For DBOS, specify workflow or
  step, arguments, IDs, queue, enqueue timing relative to commit, retries, and
  checkpoints. "Send for processing" is not a contract or guarantee.
- Link operations and acceptance scenarios to stable requirement IDs.
- Omit classes, decorators, ORM syntax, and a mandatory code tree.
- Stay concise and omit irrelevant sections. Return new business behavior to REQ
  discussion rather than introducing it inside a SPEC.

The document should let an implementer deliver the decision without inventing the
storage model, API, algorithm, or product guarantees independently.

## Options for discussion

Study the existing implementation first: explain its idea, verify whether it meets
the requirements, and identify necessary changes. Existing code is the starting
point for analysis, not an automatically accepted decision.

Each question includes context, options and consequences, and a recommendation.
For storage changes, show the current and proposed schema. A question must be
understandable without code knowledge; investigate facts available from source code
instead of asking the user to discover them. Put a detailed comparison in a
temporary document when needed and review it with the questions. After decisions
are accepted, move the required conclusions into permanent REQ, ADR, or SPEC files
and delete the temporary comparison and its links. Git preserves discussion history;
do not leave temporary analysis as a second requirements source. This applies to
temporary option comparisons, not every project research document.
