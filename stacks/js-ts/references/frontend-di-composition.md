# Frontend DI And Composition Reference

This reference applies when a frontend repo composes dependencies through DI,
explicit factories, providers, context, module constructors, or composition
roots. It does not require a DI framework.

## Source Priority

1. Repo-local composition, provider, module, factory, and test setup patterns.
2. Existing dependency direction and initialization lifecycle.
3. General references:
   - `https://martinfowler.com/articles/injection.html`
   - `https://blog.ploeh.dk/2011/07/28/CompositionRoot/`
4. This reference.

## Route Evidence

Select this reference when repo evidence shows explicit factories, providers,
constructors, composition roots, dependency identifiers, interface-driven
adapters, or docs that describe dependency injection or composition ownership.

## Responsibilities

Composition should own:

- wiring concrete implementations to interfaces or ports;
- selecting environment-specific adapters through repo-approved config;
- creating long-lived services, stores, view models, data sources, and clients;
- passing dependencies into units that should remain independently testable;
- selecting lifetimes and sharing boundaries for long-lived objects;
- teardown ownership for long-lived graphs when the repo pattern requires it.

Business, UI, and transport units should not own:

- global object creation as hidden side effects;
- direct reads of secrets or local machine configuration;
- implicit service discovery through broad singleton bags;
- framework-specific provider assumptions when plain injection would suffice.

## Hard Rules

- [DECISION] Keep composition at the boundary. Do not create concrete data
  sources, clients, stores, or services deep inside render or business logic when
  the repo already uses injection.
- [DECISION] Prefer explicit constructor, factory, or provider arguments over
  ambient singletons for units that need testing or replacement.
- [DECISION] Keep React context, providers, and hooks as framework adapters.
  They may expose composed units, but the units themselves should remain
  testable without React.
- [DECISION] Do not introduce broad service-locator objects as a shortcut for
  dependency passing. If a registry exists, follow its repo-approved scope and
  lifetime rules.
- [DECISION] Environment-specific values must come from repo-approved config or
  overlay contracts. Do not encode local accounts, hostnames, tokens, or machine
  paths in reusable references.
- [DECISION] Do not introduce a DI framework unless the repo already uses one or
  the architect approves it. DI is a design boundary, not a mandatory library.
- [DECISION] The composition root may know concrete implementations. Inner
  business, view-model, and data-source code should depend on narrower contracts
  whenever that reduces coupling.
- [DECISION] Tests may replace dependencies only at declared composition or
  adapter boundaries. Do not mock through private internals to hide an ownership
  problem.

## Verification Signals

When DI or composition is selected, verification may need `tests` that prove
replaceability at declared boundaries and `architecture_or_structure` checks for
dependency direction. Exact gates are still owned by `verification.md`.

## Stop Conditions

- Return `needs_architect` when dependency direction, lifetime, scope, or
  composition root location is unclear.
- Return `needs_analyst` when dependency selection changes user-visible
  behavior.
- Return `needs_human` when a new DI framework, provider pattern, or config
  precedent is required.
