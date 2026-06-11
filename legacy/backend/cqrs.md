# CQRS Practice

Use CQRS when command/query separation improves clarity.

Rules:

- Commands mutate state and should expose business intent.
- Queries read state and should avoid side effects.
- Handlers should be testable without HTTP transport.
- Avoid CQRS ceremony for trivial CRUD unless the repo already uses it.
