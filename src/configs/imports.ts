import { pluginAntfu, pluginImport } from '../plugins';
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import type { OptionsStylistic, TypedFlatConfigItem } from '../types';
import type { ESLint } from 'eslint';

export const imports = (
  options: OptionsStylistic = {},
): TypedFlatConfigItem[] => {
  const { stylistic = true } = options;

  return [
    {
      files: [GLOB_SRC],
      name: 'nivalis:imports',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport as unknown as ESLint.Plugin,
      },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        // Rules not supporting eslint flat config
        'import/default': 'off',
        'import/export': 'error',
        'import/first': 'error',
        'import/named': 'error',
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
        // Rules not supporting eslint flat config
        'import/no-deprecated': 'off',
        'import/no-duplicates': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-import-module-exports': ['error', { exceptions: [] }],
        'import/no-mutable-exports': 'error',
        // Rules not supporting eslint flat config
        'import/no-named-as-default': 'off',
        // Rules not supporting eslint flat config
        'import/no-named-as-default-member': 'off',
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

        ...(stylistic
          ? {
              'import/newline-after-import': [
                'error',
                { considerComments: true, count: 1 },
              ],
            }
          : {}),
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'nivalis:disables:imports-bin',
      rules: {
        'antfu/no-import-dist': 'off',
        'antfu/no-import-node-modules-by-path': 'off',
      },
    },
    {
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
