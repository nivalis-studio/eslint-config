import pluginImport from 'eslint-plugin-import-x';
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import type { ESLint } from 'eslint';
import type { TypedFlatConfigItem } from '../types';

export const imports = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/import',
      files: [GLOB_SRC],
      plugins: {
        import: pluginImport as unknown as ESLint.Plugin,
      },
      rules: {
        // https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
        'import/named': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'off',

        // Rules not supporting eslint flat config
        'import/no-deprecated': 'off',
        'import/no-named-as-default': 'off',

        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/export': 'error',
        'import/first': 'error',
        'import/no-anonymous-default-export': [
          'error',
          {
            allowAnonymousClass: false,
            allowAnonymousFunction: false,
            allowArray: false,
            allowArrowFunction: false,
            allowLiteral: false,
            allowObject: false,
          },
        ],
        'import/no-default-export': 'error',
        'import/no-duplicates': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-import-module-exports': ['error', { exceptions: [] }],
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [{ group: 'internal', pattern: '{{@,~}/,#}**' }],
            pathGroupsExcludedImportTypes: ['type'],
            warnOnUnassignedImports: true,
          },
        ],
      },
    },
    {
      name: 'nivalis/import/disabled',
      files: [
        `**/*config*.${GLOB_SRC_EXT}`,
        `**/views/${GLOB_SRC}`,
        `**/pages/${GLOB_SRC}`,
        `**/app/${GLOB_SRC}`,
        '**/{index,vite,esbuild,rollup,webpack,rspack}.ts',
        '**/*.d.ts',
        `${GLOB_MARKDOWN}/**`,
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ];
};
