from __future__ import annotations

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "bin/agents"


def run_cli(home: Path, *args: str, root: Path = ROOT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [str(CLI), "--root", str(root), "--home", str(home), *args],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


class AgentsCliTest(unittest.TestCase):
    def test_repository_check(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            result = run_cli(Path(directory), "check")

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("OK       Repository content", result.stdout)

    def test_check_rejects_project_profiles(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "agents"
            shutil.copytree(ROOT, root, ignore=shutil.ignore_patterns(".git", "__pycache__"))
            profile = root / "projects/demo/app/sandbox.toml"
            profile.parent.mkdir(parents=True)
            profile.write_text("[commands]\n")

            result = run_cli(Path(directory), "check", root=root)

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("ERROR    projects/:", result.stdout)

    def test_plan_install_does_not_write(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            result = run_cli(home, "plan-install", "--skip-mcp")

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("MISSING", result.stdout)
            self.assertFalse((home / ".codex/AGENTS.md").exists())

    def test_install_is_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            first = run_cli(home, "install", "--skip-mcp")
            second = run_cli(home, "install", "--skip-mcp")

            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual(second.returncode, 0, second.stderr)
            entry = home / ".codex/AGENTS.md"
            self.assertTrue(entry.is_symlink())
            self.assertEqual(entry.resolve(), ROOT / "behavior.md")
            self.assertIn("OK", second.stdout)
            self.assertTrue((home / ".claude/skills/crit").is_symlink())
            agy_entry = home / ".gemini/AGENTS.md"
            self.assertTrue(agy_entry.is_symlink())
            self.assertEqual(agy_entry.resolve(), ROOT / "behavior.md")
            agy_skill = home / ".gemini/antigravity-cli/skills/crit"
            self.assertTrue(agy_skill.is_symlink())
            self.assertEqual(agy_skill.resolve(), ROOT / "skills/crit")

    def test_agy_conflict_stops_before_any_write(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            conflict = home / ".gemini/AGENTS.md"
            conflict.parent.mkdir(parents=True)
            conflict.write_text("user-owned instructions\n")

            result = run_cli(home, "install", "--skip-mcp")

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(conflict.read_text(), "user-owned instructions\n")
            self.assertFalse(os.path.lexists(home / ".codex/AGENTS.md"))
            self.assertIn("CONFLICT", result.stdout)

    def test_conflict_stops_before_any_write(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            conflict = home / ".claude/CLAUDE.md"
            conflict.parent.mkdir(parents=True)
            conflict.write_text("user-owned instructions\n")

            result = run_cli(home, "install", "--skip-mcp")

            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(conflict.read_text(), "user-owned instructions\n")
            self.assertFalse(os.path.lexists(home / ".codex/AGENTS.md"))
            self.assertIn("CONFLICT", result.stdout)

    def test_plan_adopt_is_read_only(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory)
            existing = home / ".agents"
            existing.mkdir()
            local = existing / "local-rule.md"
            local.write_text("local\n")

            result = run_cli(home, "plan-adopt", str(existing))

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertIn("EXISTING_ONLY   local-rule.md", result.stdout)
            self.assertEqual(local.read_text(), "local\n")


if __name__ == "__main__":
    unittest.main()
