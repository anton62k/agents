# Idiomatic JavaScript And TypeScript Reference

This reference applies to plain JavaScript and TypeScript code even when no
framework reference is selected. It covers functions, classes, modules, async
flow, types, and error/result shape.

## Source Priority

1. Repo-local JS/TS style, module, type, and test patterns.
2. Existing nearby functions, classes, error models, and package exports.
3. Repo formatter, lint, and TypeScript config.
4. Shared `../../../references/quality/idiomatic-code.md`.
5. Official and established JS/TS guidance when repo policy selects it or local
   evidence is silent:
   - `https://www.typescriptlang.org/docs/handbook/2/functions.html`
   - `https://www.typescriptlang.org/docs/handbook/2/classes.html`
   - `https://www.typescriptlang.org/docs/handbook/2/narrowing.html`
   - `https://google.github.io/styleguide/tsguide.html`

For TypeScript type-safety rules, `typescript.md` remains the canonical stack
reference. This file only describes how type choices affect code form and
call-site clarity.

## Functions

- [DECISION] Prefer functions that read as one operation at one abstraction
  level. Extract a named helper when inline detail hides the main flow.
- [DECISION] Use named predicates, mappers, parsers, serializers, and policies
  when a boolean expression or transformation has domain or protocol meaning.
- [DECISION] Keep parameter lists narrow. Use an options object when arguments
  are optional, same-typed, or easy to confuse; keep positional parameters for
  short, obvious calls.
- [DECISION] Do not use dense callback chains, nested ternaries, or point-free
  composition when a small named function is easier to review.
- [DECISION] Keep side effects visible in function names and call sites. A
  function named like a calculation should not mutate, persist, publish, or
  navigate.

## Classes And Objects

- [DECISION] Use classes when the repo uses them for identity, lifecycle,
  dependency ownership, polymorphism, or stateful models. Do not introduce a
  class only to group unrelated helpers.
- [DECISION] Prefer plain objects, functions, or modules for stateless behavior
  when local style supports them.
- [DECISION] Constructors should establish invariants and dependencies, not run
  remote IO, subscribe to external systems, or start background work unless the
  repo pattern explicitly makes constructors lifecycle owners.
- [DECISION] A class that creates resources must expose lifecycle ownership in
  the repo's idiom, for example `dispose`, `close`, `stop`, or an explicit
  owner scope.
- [DECISION] Public methods should use symmetrical names and stable call-site
  vocabulary. Avoid catch-all methods such as `handle`, `process`, or `execute`
  when a narrower name communicates the operation and no framework contract
  requires that method name.

## Modules And Exports

- [DECISION] Keep modules cohesive around one reason to change: domain concept,
  integration boundary, UI model, data-access unit, or system capability.
- [DECISION] Prefer explicit exports for package or module boundaries. Avoid
  exporting implementation helpers by accident.
- [DECISION] Keep barrel files, default exports, and wildcard exports aligned
  with repo style. Do not introduce a second export style casually.
- [DECISION] Keep generated, transport, persistence, domain, and presentation
  types in their intended modules. Do not leak low-level shapes through public
  APIs unless the repo contract allows it. See `typescript.md` for canonical
  generated-type and public TypeScript API rules.

## Types And Narrowing

- [DECISION] Model expected states with discriminated unions, typed results,
  enums, or repo-approved value objects when that makes control flow safer and
  clearer.
- [DECISION] Avoid broad casts, `any`, non-null assertions, and unchecked
  indexing as style shortcuts. Use a narrow boundary parser, guard, schema, or
  invariant check when runtime data needs validation. See `typescript.md` for
  canonical TypeScript type-safety rules.
- [DECISION] Keep inferred types when they improve local readability; add
  explicit types at public boundaries, complex derivations, generated boundaries,
  and places where inference would hide intent.
- [DECISION] Use `readonly`, immutable inputs, or copy-on-write when local style
  uses them to make mutation boundaries visible.

## Async Flow And Errors

- [DECISION] Use `async`/`await` when it makes sequencing, error handling, and
  cleanup visible. Promise combinators are appropriate for deliberate
  concurrency and should make failure semantics clear.
- [DECISION] Keep expected failures in typed results or repo-approved error
  models. Do not throw raw infrastructure errors through unrelated layers.
- [DECISION] Use `try/finally` or repo-approved cleanup helpers when resources,
  locks, transactions, subscriptions, timers, or temporary files must be
  released.
- [DECISION] Do not hide concurrency, retries, cancellation, or partial failure
  behind generic helpers without naming the behavior.

## Review Questions

- Would this code look natural in this repo without any framework context?
- Is a function, class, module, or type doing one coherent job?
- Are names meaningful at the call site?
- Are lifecycle and side effects visible?
- Are TypeScript types strengthening the contract or only silencing the
  compiler?
- Is the code using JS/TS idioms, or imitating another language's shape?
