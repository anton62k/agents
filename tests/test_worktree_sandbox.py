from __future__ import annotations

import os
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]
TOOL = ROOT / "tools/worktree-sandbox/worktree-sandbox"


def run_plan(home: Path, worktree: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [str(TOOL), "plan", str(worktree)],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env={**os.environ, "HOME": str(home)},
    )


class WorktreeSandboxPlanTest(unittest.TestCase):
    def test_plan_reads_local_profile(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            home = Path(directory).resolve()
            worktree = home / ".worktree/demo/app/task"
            worktree.mkdir(parents=True)
            subprocess.run(["git", "init", "-q", str(worktree)], check=True)
            profile = home / ".worktree/.profiles/demo/app/sandbox.toml"
            profile.parent.mkdir(parents=True)
            profile.write_text('[commands]\nverify = "make verify"\n')

            result = run_plan(home, worktree)

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn(f"Profile: {profile}", result.stdout)
        self.assertIn("Verify: make verify", result.stdout)


if __name__ == "__main__":
    unittest.main()
