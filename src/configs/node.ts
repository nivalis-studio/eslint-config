import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import { GLOB_SRC } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export const node = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/node/config',
      plugins: {
        node: nodePlugin,
      },
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.es2021,
          __dirname: 'off',
          __filename: 'off',
          exports: 'off',
          module: 'off',
          require: 'off',
        },
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
        'node/no-unsupported-features/node-builtins': 'error',
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
};
