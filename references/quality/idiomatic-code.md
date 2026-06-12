# Idiomatic Code Reference

Idiomatic code uses the natural shape of the selected language, framework, and
local codebase. It should feel native to the stack without turning style into a
personal preference fight.

This reference is stack-neutral. Stack and framework references define concrete
idioms for JavaScript, TypeScript, React, MobX, NestJS, Prisma, and other
ecosystems.

## Relationship To Other Quality Rules

- `readable-code.md` asks whether the code is easy to understand.
- `minimal-sufficient-code.md` asks whether the code surface is justified.
- Architecture references ask whether responsibilities and contracts are placed
  correctly.
- This reference asks whether the expression of the code fits the stack and the
  repo.

Clarity beats beauty. Local consistency beats external purity. Formatter output
beats manual alignment. Evidence beats taste.

## Hard Rules

- [DECISION] Prefer repo-local idioms over generic examples from another
  language, framework, or tutorial.
- [DECISION] Use native language and framework abstractions when they express
  the behavior directly and do not violate repo boundaries.
- [DECISION] Keep naming, ordering, grouping, and file shape consistent with
  nearby code unless the approved task changes the pattern.
- [DECISION] Do not import idioms from another stack when the selected stack has
  a clearer native form.
- [DECISION] Do not fight the formatter. Formatting is a gate owned by tooling;
  review should focus on code shape, names, boundaries, and flow.
- [DECISION] Avoid clever expressions, over-composed pipelines, and compressed
  control flow when boring code communicates intent better.
- [DECISION] Keep symmetry in paired APIs and names: create/delete,
  start/stop, load/save, parse/serialize, command/query, input/output.
- [DECISION] Treat aesthetic review comments as valid only when backed by local
  pattern evidence, selected stack references, framework docs, or a concrete
  maintainability impact.

## Idiomatic Fit Signals

Good idiomatic fit usually has these signals:

- a reader familiar with the stack can predict where behavior lives;
- functions, classes, modules, components, stores, providers, and data-access
  units use the stack's natural responsibility boundaries;
- names follow local vocabulary and expose intent at the call site;
- branching, async flow, error handling, and resource lifecycle use existing
  repo patterns;
- repeated concepts have symmetrical names and shapes;
- framework integration code stays near framework boundaries;
- generated, transport, persistence, domain, and presenter types stay at their
  intended abstraction levels.

## Non-Goals

- Do not rewrite working code only to match an external style guide.
- Do not block on personal taste when code is readable, tested, scoped, and
  locally consistent.
- Do not hand-format around formatter output.
- Do not replace an established local pattern with a preferred generic pattern
  unless the route approved that architecture change.
- Do not hide behavior behind ornamental abstractions just because the result
  looks cleaner.

## Review Blockers

Raise a finding when new or modified code:

- uses a style that is foreign to the selected stack and makes maintenance
  harder;
- bypasses native framework or language abstractions with custom code that adds
  no current value;
- creates inconsistent names or shapes for the same concept inside one repo;
- moves behavior into a place where readers of the stack would not expect it;
- uses clever syntax or composition that hides side effects, errors, or
  lifecycle ownership;
- creates code that passes tests but looks unlike adjacent code without an
  approved reason.

## Review Questions

- What stack or framework idiom should own this behavior?
- Is this shape already used nearby?
- Would a maintainer familiar with this repo predict this file, name, and flow?
- Are paired operations and types named symmetrically?
- Is the formatter doing its job, or is the review arguing about whitespace?
- Is the objection backed by evidence, or only taste?

## Stop Conditions

- Return `needs_architect` when idiomatic fit depends on choosing a new boundary,
  module shape, data-access pattern, state owner, or framework integration
  model.
- Return `needs_human` when local style conflicts with external stack guidance
  and choosing one would set a repo precedent.
