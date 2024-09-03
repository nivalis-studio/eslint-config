import nodePlugin from 'eslint-plugin-n';
import { GLOB_SRC } from '../globs';
import type { Linter } from 'eslint';

export const node = (): Linter.Config[] => [
  {
    name: 'nivalis/node/config',
    plugins: {
      node: nodePlugin,
    },
  },
  {
    files: [GLOB_SRC],
    name: 'nivalis/node/rules',
    rules: {
      'node/no-deprecated-api': 'error',
      'node/no-extraneous-import': 'error',
      'node/no-extraneous-require': 'error',
      'node/no-exports-assign': 'error',
      'node/no-missing-require': 'error',
      'node/no-process-exit': 'error',
      'node/no-unpublished-bin': 'error',
      'node/no-unpublished-import': 'error',
      'node/no-unpublished-require': 'error',
      'node/no-unsupported-features/es-builtins': 'error',
      'node/no-unsupported-features/node-builtins': [
        'error',
        {
          ignores: ['fetch', 'navigator'],
        },
      ],
      'node/process-exit-as-throw': 'error',
      'node/hashbang': 'error',
      'node/no-unsupported-features/es-syntax': [
        'error',
        { ignores: ['modules'] },
      ],

      'node/no-missing-import': 'off',
    },
  },
];
