import { ensurePackages, interopDefault } from '../utils';
import { GLOB_TESTS } from '../globs';
import type {
  OptionsFiles,
  OptionsIsInEditor,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '../types';
import type { ESLint } from 'eslint';

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any;

export const test = async (
  options: OptionsFiles & OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> => {
  const { files = GLOB_TESTS, isInEditor = false, overrides = {} } = options;

  ensurePackages(['eslint-plugin-vitest', 'eslint-plugin-no-only-tests']);

  const [pluginVitest, pluginNoOnlyTests] = await Promise.all([
    interopDefault(import('eslint-plugin-vitest')),
    interopDefault<ESLint.Plugin>(import('eslint-plugin-no-only-tests')),
  ] as const);

  _pluginTest = _pluginTest || {
    ...pluginVitest,
    rules: {
      ...pluginVitest.rules,
      // extend `test/no-only-tests` rule
      ...pluginNoOnlyTests.rules,
    },
  };

  return [
    {
      name: 'nivalis/test/setup',
      plugins: {
        test: _pluginTest,
      },
    },
    {
      files,
      name: 'nivalis/test/rules',
      rules: {
        'node/prefer-global/process': 'off',

        'test/consistent-test-it': [
          'error',
          { fn: 'it', withinDescribe: 'it' },
        ],
        'test/no-identical-title': 'error',
        'test/no-import-node-test': 'error',
        'test/no-only-tests': isInEditor ? 'off' : 'error',
        'test/prefer-hooks-in-order': 'error',
        'test/prefer-lowercase-title': 'error',

        ...overrides,
      },
    },
  ];
};
