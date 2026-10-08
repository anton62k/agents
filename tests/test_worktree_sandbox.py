import importlib.machinery
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


TOOL = Path(__file__).resolve().parents[1] / 'tools/worktree-sandbox/worktree-sandbox'
loader = importlib.machinery.SourceFileLoader('sandbox_under_test', str(TOOL))
spec = importlib.util.spec_from_loader(loader.name, loader)
sandbox = importlib.util.module_from_spec(spec)
loader.exec_module(sandbox)


class SandboxPlanTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name) / 'application'
        self.root.mkdir()
        (self.root / '.nvmrc').write_text('14\n')
        (self.root / 'package.json').write_text(json.dumps({
            'scripts': {'build': 'nest build', 'start': 'nest start'},
            'dependencies': {'@prisma/client': '^3.15.2'},
        }))
        self.profile = Path(self.directory.name) / 'sandbox.toml'

    def plan(self, profile):
        with patch.object(sandbox, 'load_profile', return_value=(self.profile, profile)):
            return sandbox.infer_plan(self.root)

    def test_npm_lock_keeps_locked_install_and_npm_commands(self):
        (self.root / 'package-lock.json').write_text('{}')
        plan = self.plan({})
        self.assertEqual(plan['commands']['setup'], ['npm ci'])
        self.assertEqual(plan['commands']['build'], ['npm run build'])
        self.assertEqual(plan['commands']['start'], 'npm run start')
        self.assertEqual(plan['runtime']['packageManager'], 'npm')

    def test_explicit_pnpm_declaration_takes_precedence_over_legacy_lock(self):
        (self.root / 'package-lock.json').write_text('{}')
        (self.root / 'package.json').write_text(json.dumps({'packageManager': 'pnpm@10.17.1'}))
        plan = self.plan({})
        self.assertEqual(plan['commands']['setup'], ['pnpm install --frozen-lockfile'])
        self.assertEqual(plan['runtime']['packageManagerVersion'], '10.17.1')

    def test_legacy_runtime_is_pinned_by_external_profile(self):
        (self.root / 'package-lock.json').write_text('{}')
        plan = self.plan({'runtime': {'node': '14.20.1', 'npm': '6.14.17'},
                          'application': {'port': 4000, 'readiness': '/graphql', 'readinessTimeout': 180}})
        self.assertEqual(plan['runtime']['node'], '14.20.1')
        self.assertEqual(plan['runtime']['packageManagerVersion'], '6.14.17')
        self.assertIn('node14.20.1-npm6.14.17', plan['template'])
        self.assertEqual(plan['application']['readinessTimeout'], 180)

    def test_postgres_image_is_external_and_state_is_private(self):
        (self.root / 'package-lock.json').write_text('{}')
        plan = self.plan({'services': {'postgres': {'image': 'postgres:12.11-alpine'}}})
        plan['state_dir'] = str(Path(self.directory.name) / 'state')
        with patch.object(sandbox, 'observed_status', return_value='unknown'):
            sandbox.write_generated_files(plan)
        compose = (Path(plan['state_dir']) / 'compose.yml').read_text()
        self.assertIn('image: postgres:12.11-alpine', compose)
        self.assertEqual((Path(plan['state_dir']) / 'sandbox.env').stat().st_mode & 0o777, 0o600)

    def test_stop_preserves_generated_connection_settings(self):
        plan = self.plan({})
        plan['state_dir'] = str(Path(self.directory.name) / 'state')
        plan['env']['GRAPHQL_ENDPOINT'] = 'http://host.docker.internal:32949/graphql'
        with patch.object(sandbox, 'observed_status', return_value='running'):
            sandbox.write_generated_files(plan)
        env_path = Path(plan['state_dir']) / 'sandbox.env'
        before = env_path.read_bytes()
        plan['env'].pop('GRAPHQL_ENDPOINT')

        with patch.object(sandbox, 'sandbox_exists', return_value=False), \
                patch.object(sandbox, 'sync_registry'), \
                patch.object(sandbox, 'stop_process_group'), \
                patch.object(sandbox, 'observed_status', return_value='stopped'):
            sandbox.stop(plan)

        self.assertEqual(env_path.read_bytes(), before)
        state = json.loads((Path(plan['state_dir']) / 'state.json').read_text())
        self.assertEqual(state['status'], 'stopped')
        self.assertEqual(state['env']['GRAPHQL_ENDPOINT'], 'http://host.docker.internal:32949/graphql')

if __name__ == '__main__':
    unittest.main()
