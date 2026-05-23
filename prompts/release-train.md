# Release Train

Use this prompt to operate a release branch and publish prerelease/stable builds.

## Agent Task

1. Identify the release branch and latest stable/prerelease tags.
2. Compare master/main against the release branch.
3. Cherry-pick only intended commits.
4. Bump version according to channel policy.
5. Run local verification.
6. Commit release bump and create tag.
7. Push branch and tag.
8. Watch CI and publish workflows.
9. Verify npm package/version/dist-tag or deployment artifact.

## Acceptance

- Release branch contains intended commits.
- Tag points at the release commit.
- CI passes.
- Published package/artifact is visible in the registry.
