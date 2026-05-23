# Frontend Forms

Forms should have a clear owner:

- UI components own layout and interactions.
- Form/state layer owns validation, dirty/touched state, submit, reset, and
  server errors.
- API layer owns transport errors and mapping.

Avoid duplicating validation rules across UI and state layers without a shared
contract.
