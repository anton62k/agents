# System analysis

Apply this workflow when preparing an ADR or SPEC, performing system analysis, or
designing implementation for accepted requirements. Load the relevant REQs first.
If business rules are not agreed, discuss them rather than filling the gaps with
architectural assumptions.

## ADR and optional SPEC

Start with an ADR that describes the proposed system or module. Keep the decision
and the details needed to implement its scope together. Use a separate SPEC when
those details make the ADR too large; link the SPEC to its parent ADR and the
relevant requirements.

An architecture ADR describes modules, responsibilities, interactions, and the
chosen technologies. Explain the role, reason for selection, and relevant limits
of each technology. Avoid generic justification sections that mix unrelated choices.

A module ADR is organized around its API methods:

- Use English names for modules, methods, fields, and error codes. Explain their
  behavior in concise, natural language.
- Give each method its purpose, input, result, algorithm, errors, execution and
  retry rules, and acceptance scenarios. Omit sections that do not apply.
- Link operations and acceptance scenarios to stable requirement IDs.
- Put complete input and output structures immediately under their respective
  labels, on separate lines. Keep types, defaults, explanations, and scenarios
  with the method that owns them rather than in detached common sections.
- Explain fields as lists. State where non-obvious inputs come from and why the
  operation needs them. Describe initial values inside the creating operation.
- Name each table read or changed and link to its data document. For each write,
  state the row lookup or creation condition, fields, and assigned values. Describe
  separately the records created together and their transaction boundary.
- Keep field definitions, relationships, keys, constraints, and stored JSON formats
  in data documents. The method describes how it uses those fields.
- Describe branches, state transitions, atomicity, concurrency, retries, and freshness
  when relevant. Explain a conflict as a concrete sequence of concurrent actions
  and state how the method continues.
- Describe integrations through their actual mechanisms. For DBOS, identify the
  workflow or step, arguments, durable IDs, queue, commit/enqueue order, retries,
  and checkpoints where they affect the operation.
- Document the provider's behavior here. A consuming module documents how it calls
  this API and uses the result in its own operations.
- Link requirements and data inline using relative paths. Omit boilerplate lists
  of related ADRs and repeated data inventories.
- Add diagrams when they clarify interactions. Do not repeat a straightforward
  method algorithm as a sequence diagram. Start an end-to-end scenario with the
  user's action and explain the origin of incoming events.
- Describe actual behavior rather than listing absent features. Avoid classes,
  decorators, ORM syntax, and mandatory code trees.

Write a complete proposal for the stated scope, with a status that distinguishes
review from acceptance. Resolve technical questions before presenting the decision;
discuss missing business rules separately rather than inventing them or burying
an implementation gap in a confident statement. Keep future-work lists in the plan.

Prefer the simplest design that meets accepted requirements. Do not introduce
extra behavior just to justify additional mechanisms.

For a change to an existing database or schema, explain the current state, proposed
change, reason, and effects on existing data. An implementer should not have to
invent the storage model, API, algorithm, or product guarantees independently.

## Options for discussion

When changing an existing implementation, explain its idea, verify whether it meets
the requirements, and identify necessary changes. Existing code is evidence rather
than an automatically accepted decision. When the user requests a design from
scratch, base it on the accepted requirements and stated constraints.

Each question includes context, options and consequences, and a recommendation.
For storage changes, show the current and proposed schema. A question must be
understandable without code knowledge; investigate facts available from source code
instead of asking the user to discover them. Put a detailed comparison in a
temporary document when needed and review it with the questions. After decisions
are accepted, move the required conclusions into permanent REQ, ADR, or SPEC files
and delete the temporary comparison and its links. Git preserves discussion history;
do not leave temporary analysis as a second requirements source. This applies to
temporary option comparisons, not every project research document.
