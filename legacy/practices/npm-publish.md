# npm Publish

Recommended release checks for npm packages:

- package version matches lockfile version;
- tag format matches package version;
- package has explicit exports/types/files;
- `npm pack` contents are inspected before first publish;
- prereleases publish to a prerelease dist-tag such as `alpha`;
- stable releases publish to `latest` only intentionally.
