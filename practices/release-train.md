# Release Train Practice

A release train separates development on master/main from release branch
stabilization.

## Branches

- master/main: integration branch.
- release/x.y.x: release stabilization branch.

## Flow

1. Merge work to master/main through PRs.
2. Cherry-pick intended commits into release branch.
3. Bump prerelease or stable version on the release branch.
4. Tag the release commit.
5. Push branch and tag.
6. Let CI/publish workflows release the artifact.
7. Verify registry/deployment state.
