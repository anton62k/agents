#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
test_root="$(mktemp -d)"
trap 'rm -rf "$test_root"' EXIT

copy_candidate() {
  local destination="$1"
  mkdir -p "$destination"
  tar -C "$repo_root" --exclude=.git -cf - . | tar -C "$destination" -xf -
}

expect_failure() {
  if "$@" >"$test_root/expected-failure.out" 2>"$test_root/expected-failure.err"; then
    printf 'Expected command to fail: %q ' "$@" >&2
    printf '\n' >&2
    return 1
  fi
}

printf 'CASE repository validation\n'
"$repo_root/bin/agents" --root "$repo_root" check
python3 -m unittest discover -s "$repo_root/tests" -v

printf 'CASE fresh installation and idempotency\n'
fresh_home="$test_root/fresh-home"
copy_candidate "$fresh_home/.agents"
"$fresh_home/.agents/bin/agents" --root "$fresh_home/.agents" --home "$fresh_home" plan-install --skip-mcp
"$fresh_home/.agents/bin/agents" --root "$fresh_home/.agents" --home "$fresh_home" install --skip-mcp
"$fresh_home/.agents/bin/agents" --root "$fresh_home/.agents" --home "$fresh_home" install --skip-mcp
"$fresh_home/.agents/bin/agents" --root "$fresh_home/.agents" --home "$fresh_home" doctor
test -L "$fresh_home/.codex/AGENTS.md"
test "$(readlink -f "$fresh_home/.codex/AGENTS.md")" = "$fresh_home/.agents/behavior.md"

printf 'CASE provider conflict is atomic\n'
conflict_home="$test_root/conflict-home"
copy_candidate "$conflict_home/.agents"
mkdir -p "$conflict_home/.claude"
printf 'user-owned instructions\n' >"$conflict_home/.claude/CLAUDE.md"
expect_failure "$conflict_home/.agents/bin/agents" \
  --root "$conflict_home/.agents" --home "$conflict_home" install --skip-mcp
test "$(cat "$conflict_home/.claude/CLAUDE.md")" = "user-owned instructions"
test ! -e "$conflict_home/.codex/AGENTS.md"

printf 'CASE existing installation inventory is read-only\n'
adopt_home="$test_root/adopt-home"
mkdir -p "$adopt_home/.agents"
printf 'local rule\n' >"$adopt_home/.agents/local-rule.md"
before_hash="$(sha256sum "$adopt_home/.agents/local-rule.md")"
"$repo_root/bin/agents" --root "$repo_root" --home "$adopt_home" \
  plan-adopt "$adopt_home/.agents" >"$test_root/adopt.out"
after_hash="$(sha256sum "$adopt_home/.agents/local-rule.md")"
test "$before_hash" = "$after_hash"
grep -q 'EXISTING_ONLY.*local-rule.md' "$test_root/adopt.out"

printf 'CASE installation without CodeGraph\n'
no_mcp_home="$test_root/no-mcp-home"
copy_candidate "$no_mcp_home/.agents"
PATH="/usr/local/bin:/usr/bin:/bin" \
  "$no_mcp_home/.agents/bin/agents" \
  --root "$no_mcp_home/.agents" --home "$no_mcp_home" install --skip-skills \
  >"$test_root/no-mcp.out"
grep -q 'CodeGraph MCP bootstrap: codegraph is not installed' "$test_root/no-mcp.out"

printf 'CASE CodeGraph bootstrap invocation\n'
fake_mcp_home="$test_root/fake-mcp-home"
copy_candidate "$fake_mcp_home/.agents"
mkdir -p "$fake_mcp_home/bin"
cat >"$fake_mcp_home/bin/codegraph" <<'EOF'
#!/bin/sh
case "${1:-}" in
  --version) printf 'CodeGraph test-double\n' ;;
  telemetry) printf 'Telemetry disabled\n' ;;
  *) printf 'Unsupported CodeGraph test-double invocation: %s\n' "$*" >&2; exit 1 ;;
esac
EOF
chmod +x "$fake_mcp_home/bin/codegraph"
HOME="$fake_mcp_home" PATH="$fake_mcp_home/bin:/usr/local/bin:/usr/bin:/bin" \
  "$fake_mcp_home/.agents/bin/agents" \
  --root "$fake_mcp_home/.agents" --home "$fake_mcp_home" install --skip-skills \
  >"$test_root/fake-mcp.out"
grep -q 'CodeGraph test-double' "$test_root/fake-mcp.out"
grep -q 'Codex MCP: missing' "$test_root/fake-mcp.out"

printf 'CASE fast-forward update\n'
seed="$test_root/seed"
copy_candidate "$seed"
git -C "$seed" init -b master >/dev/null
git -C "$seed" config user.name 'Sandbox Test'
git -C "$seed" config user.email 'sandbox@example.invalid'
git -C "$seed" add .
git -C "$seed" commit -m 'Initial candidate' >/dev/null
remote="$test_root/agents.git"
git clone --bare "$seed" "$remote" >/dev/null
update_home="$test_root/update-home"
git clone "$remote" "$update_home/.agents" >/dev/null
"$update_home/.agents/bin/agents" \
  --root "$update_home/.agents" --home "$update_home" install --skip-mcp
writer="$test_root/writer"
git clone "$remote" "$writer" >/dev/null
git -C "$writer" config user.name 'Sandbox Test'
git -C "$writer" config user.email 'sandbox@example.invalid'
printf 'updated\n' >"$writer/UPDATE_MARKER"
git -C "$writer" add UPDATE_MARKER
git -C "$writer" commit -m 'Add update marker' >/dev/null
git -C "$writer" push origin master >/dev/null
"$update_home/.agents/bin/agents" \
  --root "$update_home/.agents" --home "$update_home" update --skip-mcp
test "$(cat "$update_home/.agents/UPDATE_MARKER")" = "updated"

printf 'CASE dirty checkout blocks update\n'
printf 'dirty\n' >>"$update_home/.agents/README.md"
expect_failure "$update_home/.agents/bin/agents" \
  --root "$update_home/.agents" --home "$update_home" update --skip-mcp
git -C "$update_home/.agents" checkout -- README.md

printf 'CASE non-default branch blocks update\n'
git -C "$update_home/.agents" switch -c local-test >/dev/null
expect_failure "$update_home/.agents/bin/agents" \
  --root "$update_home/.agents" --home "$update_home" update --skip-mcp

printf 'All sandbox integration cases passed.\n'
