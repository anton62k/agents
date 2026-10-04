from __future__ import annotations

import contextlib
from importlib.machinery import SourceFileLoader
from importlib.util import module_from_spec, spec_from_loader
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
LOADER = SourceFileLoader("codegraph_manager", str(ROOT / "tools/codegraph-manager/codegraph-manager"))
MANAGER = module_from_spec(spec_from_loader(LOADER.name, LOADER))
LOADER.exec_module(MANAGER)


class AgyCodeGraphTest(unittest.TestCase):
    def test_recognizes_enabled_codegraph_configuration(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            config = Path(directory) / "mcp_config.json"
            config.write_text(json.dumps({"mcpServers": {
                "codegraph": {"command": "codegraph", "args": ["serve", "--mcp"]},
            }}))

            with patch.object(MANAGER, "AGY_CONFIG", config):
                self.assertTrue(MANAGER.agy_configured())

    def test_disabled_or_different_server_needs_configuration(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            config = Path(directory) / "mcp_config.json"
            for server in (
                {"command": "codegraph", "args": ["serve", "--mcp"], "disabled": True},
                {"command": "other", "args": ["serve", "--mcp"]},
                {"command": "codegraph", "args": ["serve"]},
            ):
                with self.subTest(server=server):
                    config.write_text(json.dumps({"mcpServers": {"codegraph": server}}))
                    with patch.object(MANAGER, "AGY_CONFIG", config):
                        self.assertFalse(MANAGER.agy_configured())

    def test_bootstrap_configures_agy_only_when_needed(self) -> None:
        for configured in (False, True):
            with self.subTest(configured=configured), contextlib.ExitStack() as stack:
                stack.enter_context(patch.object(MANAGER, "ensure_global_ignore"))
                stack.enter_context(patch.object(MANAGER, "codegraph_version", return_value="test"))
                stack.enter_context(patch.object(MANAGER, "agent_configured", return_value=False))
                stack.enter_context(patch.object(MANAGER, "opencode_configured", return_value=False))
                stack.enter_context(patch.object(MANAGER, "grok_configured", return_value=False))
                stack.enter_context(patch.object(MANAGER.shutil, "which", side_effect=lambda name: name if name == "agy" else None))
                stack.enter_context(patch.object(MANAGER, "agy_configured", side_effect=[configured, True]))
                run = stack.enter_context(patch.object(MANAGER, "run"))
                stack.enter_context(contextlib.redirect_stdout(io.StringIO()))

                MANAGER.bootstrap()

                additions = [call.args[0] for call in run.call_args_list if call.args[0][0] == "agy"]
                expected = [] if configured else [["agy", "mcp", "add", "codegraph", "codegraph", "serve", "--mcp"]]
                self.assertEqual(additions, expected)
