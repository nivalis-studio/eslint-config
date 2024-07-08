import tseslint from 'typescript-eslint';
import { toArray } from '../utils';
import { GLOB_JS, GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs';
import type { OptionsTypescript, TypedFlatConfigItem } from '../types';

export const typescript = (
  options: OptionsTypescript,
): TypedFlatConfigItem[] => {
  const tsconfigPath = options.configPath
    ? toArray(options.configPath)
    : undefined;

  return [
    {
      name: 'nivalis/typescript/plugin',
      files: [GLOB_SRC],
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      languageOptions: {
        parser: tseslint.parser,
      },
    },

    ...(tsconfigPath
      ? [
          ...tseslint.configs.strictTypeChecked.map(config => ({
            ...config,
            files: [GLOB_TS, GLOB_TSX],
          })),
          ...tseslint.configs.stylisticTypeChecked.map(config => ({
            ...config,
            files: [GLOB_TS, GLOB_TSX],
          })),
          {
            files: [GLOB_SRC],
            name: 'nivalis/typescript/languageOptions',
            languageOptions: {
              parserOptions: {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              },
            },
          },
          {
            files: [GLOB_TS, GLOB_TSX],
            name: 'nivalis/typescript/typed-rules',
            rules: {
              'dot-notation': 'off',
              'no-implied-eval': 'off',
              'no-throw-literal': 'off',
              'prefer-promise-reject-errors': 'off',
              'require-await': 'off',
              'return-await': 'off',

              '@typescript-eslint/return-await': ['error', 'always'],
              '@typescript-eslint/no-unnecessary-condition': 'off',
              '@typescript-eslint/use-unknown-in-catch-callback-variable':
                'warn',
              '@typescript-eslint/await-thenable': 'error',
              '@typescript-eslint/consistent-type-exports': [
                'error',
                { fixMixedExportsWithInlineTypeSpecifier: true },
              ],
              '@typescript-eslint/dot-notation': [
                'error',
                { allowKeywords: true },
              ],
              '@typescript-eslint/naming-convention': [
                'warn',
                { format: ['PascalCase', 'camelCase'], selector: 'function' },
              ],
              '@typescript-eslint/no-array-delete': 'error',
              '@typescript-eslint/no-base-to-string': 'error',
              '@typescript-eslint/no-confusing-void-expression': 'error',
              '@typescript-eslint/no-duplicate-type-constituents': 'error',
              '@typescript-eslint/no-explicit-any': 'warn',
              '@typescript-eslint/no-floating-promises': [
                'error',
                { ignoreIIFE: true, ignoreVoid: true },
              ],
              '@typescript-eslint/no-for-in-array': 'error',
              '@typescript-eslint/no-implied-eval': 'error',
              '@typescript-eslint/no-meaningless-void-operator': 'error',
              '@typescript-eslint/no-misused-promises': [
                'error',
                {
                  checksVoidReturn: {
                    arguments: false,
                    attributes: false,
                  },
                },
              ],
              '@typescript-eslint/no-mixed-enums': 'error',
              '@typescript-eslint/no-non-null-assertion': 'error',
              '@typescript-eslint/no-redundant-type-constituents': ['error'],
              '@typescript-eslint/no-unnecessary-boolean-literal-compare':
                'error',
              '@typescript-eslint/no-unnecessary-template-expression': 'error',
              '@typescript-eslint/no-unnecessary-type-arguments': 'error',
              '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
              '@typescript-eslint/no-unsafe-argument': ['error'],
              '@typescript-eslint/no-unsafe-assignment': ['warn'],
              '@typescript-eslint/no-unsafe-call': ['warn'],
              '@typescript-eslint/no-unsafe-enum-comparison': 'error',
              '@typescript-eslint/no-unsafe-member-access': ['warn'],
              '@typescript-eslint/no-unsafe-return': ['warn'],
              '@typescript-eslint/non-nullable-type-assertion-style': 'error',
              '@typescript-eslint/only-throw-error': 'error',
              '@typescript-eslint/prefer-includes': 'error',
              '@typescript-eslint/prefer-nullish-coalescing': [
                'error',
                {
                  ignoreConditionalTests: true,
                  ignoreMixedLogicalExpressions: true,
                  ignorePrimitives: { number: true, string: true },
                },
              ],
              '@typescript-eslint/prefer-optional-chain': ['error'],
              '@typescript-eslint/prefer-promise-reject-errors': 'error',
              '@typescript-eslint/prefer-reduce-type-parameter': 'error',
              '@typescript-eslint/prefer-return-this-type': 'error',
              '@typescript-eslint/prefer-string-starts-ends-with': 'error',
              '@typescript-eslint/promise-function-async': 'error',
              '@typescript-eslint/require-await': ['error'],
              '@typescript-eslint/restrict-plus-operands': 'error',
              '@typescript-eslint/restrict-template-expressions': [
                'warn',
                { allowNumber: true },
              ],
              '@typescript-eslint/switch-exhaustiveness-check': 'error',
              '@typescript-eslint/unbound-method': 'error',
              '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                  assertionStyle: 'as',
                  objectLiteralTypeAssertions: 'allow-as-parameter',
                },
              ],
            },
          },
          {
            files: [GLOB_JS],
            ...tseslint.configs.disableTypeChecked,
          },
        ]
      : [
          ...tseslint.configs.strict.map(config => ({
            ...config,
            files: [GLOB_SRC],
          })),

          ...tseslint.configs.stylistic.map(config => ({
            ...config,
            files: [GLOB_SRC],
          })),
        ]),

    {
      files: [GLOB_SRC],
      name: 'nivalis/typescript/rules',
      rules: {
        'default-param-last': 'off',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',
        'no-empty-function': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-magic-numbers': 'off',
        'no-redeclare': 'off',
        'no-restricted-imports': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 4,
            'ts-expect-error': 'allow-with-description',
          },
        ],
        '@typescript-eslint/ban-tslint-comment': ['error'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
        '@typescript-eslint/consistent-generic-constructors': [
          'error',
          'constructor',
        ],
        '@typescript-eslint/consistent-indexed-object-style': [
          'error',
          'index-signature',
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
      },
    },

    {
      files: ['**/*.d.ts'],
      name: 'nivalis/typescript/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'nivalis/typescript/disables/test',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'nivalis/typescript/disables/cjs',
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ] as TypedFlatConfigItem[];
};
