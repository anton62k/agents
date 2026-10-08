# Snowfamily sandbox runtime

This launcher runs four Snowfamily worktrees through the central `worktree-sandbox`
lifecycle. It keeps runtime profiles, synthetic fixtures and service state outside
the application repositories. Git and CodeGraph remain on the host.

## Worktrees and runtime

Create and register the approved worktrees under
`$HOME/.worktree/snowfamily/{crm-server,crm-client,instructor,lesson-request}/sandbox-baseline`
using the project development workflow. The launcher expects those paths; pass
`--task TASK` to use another registered task. Select one application with `--repo`.
Put options before the command.

All applications use Node 14.20.1 and npm 6.14.17 with their existing lockfiles.
Each worktree has its own VM, dependency directory, state directory and ephemeral
host port. The backend has PostgreSQL 12.11 in its VM's private Docker daemon.
The two Next applications both use internal port 3000 in different VMs.

Prisma 3 cannot select a binary for the sandbox base image's OpenSSL version.
`in-node` runs backend commands in the application's original
`node:14.20.1-alpine` image inside the VM. Remove this adapter after a supported
Node/Prisma upgrade passes generation, migrations, tests and browser checks
directly in the VM. Its Docker daemon and PostgreSQL data are separate from the host daemon and production DB.

## Commands

```sh
$HOME/.agents/projects/snowfamily/sandbox plan
$HOME/.agents/projects/snowfamily/sandbox up
$HOME/.agents/projects/snowfamily/sandbox status
$HOME/.agents/projects/snowfamily/sandbox --repo crm-server verify
$HOME/.agents/projects/snowfamily/sandbox --repo instructor verify
$HOME/.agents/projects/snowfamily/sandbox --repo lesson-request verify
$HOME/.agents/projects/snowfamily/sandbox --repo crm-server exec -- node --version
$HOME/.agents/projects/snowfamily/sandbox stop
$HOME/.agents/projects/snowfamily/sandbox restart
$HOME/.agents/projects/snowfamily/sandbox remove
```

`up` installs locked dependencies, generates clients, applies migrations and
synthetic fixtures, builds and starts the applications in dependency order.
`stop` preserves configuration, dependency output and PostgreSQL data.
`restart` restores a warmed environment without reinstalling dependencies or
rebuilding; run `up` after dependency changes or backend source changes.
The frontend proxy, GraphQL endpoints and scoped backend access rule are refreshed
when the backend receives a new ephemeral host port.

`verify` stops the application before checks and restarts it afterward, including
on check failure. This keeps Next's development server from serving stale build
manifests after a production build. Next builds explicitly use
`NODE_ENV=production`; HTTP development uses `NODE_ENV=development` so session
cookies work without TLS. Jest receives `--modulePaths .` to resolve the existing
TypeScript absolute imports without changing application source.

Use the `http://127.0.0.1:PORT` URLs printed by `status`. Angular uses a fixed
localhost API port when visited with the hostname `localhost`, so the numeric
loopback URL is required for the external GraphQL proxy.

## Fixtures and checks

The database contains repository seed data plus synthetic users, one client,
eight schedule days and a test price. It does not load production dumps.

- CRM user: `sandbox-admin` / `sandbox-only-password`.
- Instructor user: `sandbox-instructor` / `sandbox-only-password`.
- Existing booking client phone: `79990000001`.

Backend verification runs Jest, TypeScript and the Nest build. Next verification
runs Jest, TypeScript and production builds. CRM verification runs the production
build. Its existing Karma test compilation currently fails at `dayjs.utc` with
TS2339; browser login works, but CRM unit tests are not certified green. Repair
and expand that test setup during the planned E2E/test baseline work.

Capture local runtime timings, browser screenshots, smoke results and lifecycle
experiments under `$HOME/.worktree/.experiments`. A successful runtime smoke check
does not establish complete business scenario coverage.

Validated on 2026-10-08 with sbx 0.42.1: all four builds and readiness checks
passed. Backend Jest passed 200 tests with one skipped; instructor and booking
each passed 12 tests, TypeScript and production builds. Host Playwright checked
CRM login, the clients list and server version; instructor login and schedule;
booking discipline/instructor selection and client authentication.
Cold migration, cached template reuse, configuration preservation on stop,
data persistence after restart, refreshed frontend backend access and concurrent
database isolation were exercised. Removing the second backend sandbox left its
Git worktree intact. The central tooling's 14 Python tests passed.

`remove` deletes only the task's sandbox and runtime state. Stop and remove the
sandbox before removing a worktree. Retain a running sandbox only while it is
actively needed for the next development or browser review step.
