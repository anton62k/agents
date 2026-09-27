# Dependency compatibility

Apply these rules when a library, framework, protocol, or build tool is
incompatible with our code or configuration.

Resolve incompatibilities so that a later dependency fix does not require
application-code changes.

- Reproduce the problem first and identify its owner: our code, the dependency,
  or their configuration. Distinguish a type incompatibility from a demonstrated
  runtime defect.
- Check supported solutions and upstream fixes before adding a workaround.
- Localize a workaround at the dependency boundary and retain checks for our code.
- Preserve a stable consumer interface so a dependency upgrade does not spread
  through the project.
- For a temporary workaround, record its reason, the upstream issue or status,
  and a concrete removal condition.
- On dependency upgrades, verify whether the workaround is still necessary. Do
  not automatically disable checks after a failure.

Review criterion: it is clear why the workaround is necessary now and how to
remove it after the dependency is fixed without changing business modules.

Example: compile an incompatible generated SDK separately with a local exclusion.
Application modules use a stable import and keep their strict checks. After the
upstream fix, upgrading the SDK and removing the exclusion does not change them.
