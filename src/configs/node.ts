import { GLOB_SRC } from '../globs';
import { pluginNode } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

export const node = (): TypedFlatConfigItem[] => {
  return [
    {
      files: [GLOB_SRC],
      name: 'nivalis/node/rules',
      plugins: {
        node: pluginNode,
      },
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-mixed-requires': [
          'error',
          { allowCall: true, grouping: true },
        ],
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-unsupported-features/es-syntax': 'error',
        'node/no-unsupported-features/node-builtins': 'error',
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/text-decoder': ['error', 'always'],
        'node/prefer-global/text-encoder': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-promises/dns': ['error'],
        'node/prefer-promises/fs': ['error'],
        'node/process-exit-as-throw': ['error'],
      },
    },
  ];
};
