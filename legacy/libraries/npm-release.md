# npm Release

Recommended alpha flow:

1. Merge feature PRs to master/main.
2. Cherry-pick intended commits into release branch.
3. Bump `x.y.z-alpha.n`.
4. Commit release bump.
5. Tag `vx.y.z-alpha.n`.
6. Push branch and tag.
7. Publish workflow publishes with `alpha` dist-tag.
8. Verify `npm view package version dist-tags`.
