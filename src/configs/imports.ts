import eslintPluginImportX from 'eslint-plugin-import-x';
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs';

export const imports = async (withTypescript = true) => {
  const importsConfig = [
    {
      name: 'import/flat/recommended',
      plugins: { import: eslintPluginImportX },
      rules: {
        // Analysis/correctness
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',

        // Red flags (thus, warnings)
        'import/no-named-as-default': 'warn',
        'import/no-named-as-default-member': 'warn',
        'import/no-duplicates': 'warn',
      },
      // Need all these for parsing dependencies (even if _your_ code doesn't need
      // All of them)
      languageOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    } as any,
  ];

  if (withTypescript) {
    const tsParser = await import('@typescript-eslint/parser');

    /**
     * This config:
     * 1) adds `.jsx`, `.ts`, `.cts`, `.mts`, and `.tsx` as an extension
     * 2) enables JSX/TSX parsing
     */

    // Omit `.d.ts` because 1) TypeScript compilation already confirms that
    // Types are resolved, and 2) it would mask an unresolved
    // `.ts`/`.tsx`/`.js`/`.jsx` implementation.
    const typeScriptExtensions = ['.ts', '.tsx', '.cts', '.mts'] as const;

    const allExtensions = [
      ...typeScriptExtensions,
      '.js',
      '.jsx',
      '.cjs',
      '.mjs',
    ] as const;

    importsConfig.push(
      {
        name: 'import/flat/settings',
        settings: {
          'import/extensions': allExtensions,
          'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
          ],
          'import/parsers': {
            '@typescript-eslint/parser': [...typeScriptExtensions],
          },
          'import/resolver': {
            typescript: true,
          },
        },
        rules: {
          // Analysis/correctness

          // TypeScript compilation already ensures that named imports exist in the referenced module
          'import/named': 'off',
        },
      },
      {
        name: 'import/flat/options',
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        ignores: ['eslint.config.js'],
        languageOptions: {
          parser: tsParser,
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        rules: {
          'no-unused-vars': 'off',
          'import/no-dynamic-require': 'warn',
        },
      },
    );
  }

  importsConfig.push(
    {
      name: 'import/nivalis-rules',

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
      name: 'import/nivalis-disabled-rules',
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
  );

  return importsConfig;
};
