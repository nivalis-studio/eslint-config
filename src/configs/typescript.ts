import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import { GLOB_SRC_TS } from '../globs';
import type { TSConfigOptions } from '../options';
import type { Linter } from 'eslint';

// eslint-disable-next-line max-lines-per-function
export const typescript = (options?: TSConfigOptions): Linter.Config[] => {
  if (options === false) {
    return [];
  }

  const configs: Linter.Config[] = [
    {
      files: [GLOB_SRC_TS],
      ...(tseslint.configs.base as unknown as Linter.Config),
      name: 'nivalis/typescript/base',
    },
    {
      files: [GLOB_SRC_TS],
      name: 'nivalis/typescript/rules',
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-const-assign': 'off',
        'no-dupe-args': 'off',
        'no-duplicate-imports': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-symbol': 'off',
        'no-new-native-nonconstructor': 'off',
        'no-obj-calls': 'off',
        'no-redeclare': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-undefined': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-object-type': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'error',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
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
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        'default-param-last': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-magic-numbers': 'off',
        'no-restricted-imports': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',

        // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 10,
            'ts-expect-error': 'allow-with-description',
          },
        ],
        '@typescript-eslint/no-shadow': [
          'warn',
          {
            allow: ['resolve', 'reject', 'done', 'next', 'err', 'error', 'cb'],
            builtinGlobals: false,
            hoist: 'functions',
            ignoreFunctionTypeParameterNameValueShadow: true,
            ignoreTypeValueShadow: true,
          },
        ],
        '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
        '@typescript-eslint/consistent-generic-constructors': [
          'error',
          'constructor',
        ],
        '@typescript-eslint/consistent-indexed-object-style': [
          'error',
          'index-signature',
        ],
        '@typescript-eslint/no-wrapper-object-types': ['error'],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/default-param-last': ['error'],
        '@typescript-eslint/member-ordering': ['error'],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-duplicate-enum-values': ['error'],
        '@typescript-eslint/no-empty-function': [
          'error',
          { allow: ['arrowFunctions', 'functions', 'methods'] },
        ],
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],
        '@typescript-eslint/no-extraneous-class': [
          'warn',
          {
            allowConstructorOnly: false,
            allowEmpty: false,
            allowStaticOnly: false,
            allowWithDecorator: true,
          },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          { ignoreParameters: true, ignoreProperties: false },
        ],
        '@typescript-eslint/no-invalid-void-type': ['error'],
        '@typescript-eslint/no-loop-func': ['error'],
        '@typescript-eslint/no-magic-numbers': [
          'warn',
          {
            detectObjects: false,
            enforceConst: true,
            ignore: [0, 1, -1],
            ignoreArrayIndexes: true,
          },
        ],
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-namespace': [
          'error',
          { allowDeclarations: false, allowDefinitionFiles: false },
        ],
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-this-alias': [
          'error',
          { allowDestructuring: true },
        ],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: false,
            enforceForJSX: true,
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            allowNamedExports: false,
            classes: false,
            functions: false,
            variables: true,
          },
        ],
        '@typescript-eslint/no-useless-empty-export': ['error'],
        '@typescript-eslint/parameter-properties': [
          'error',
          { prefer: 'parameter-property' },
        ],
        '@typescript-eslint/triple-slash-reference': [
          'warn',
          { lib: 'never', path: 'never', types: 'never' },
        ],
        '@typescript-eslint/unified-signatures': [
          'error',
          { ignoreDifferentlyNamedParameters: true },
        ],
      },
    },
  ];

  configs.push({
    files: ['**/*.d.ts'],
    name: 'nivalis/typescript/disables/dts',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'init-declarations': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  });

  if (options?.disableTypeChecking !== true) {
    configs.push(
      {
        files: [GLOB_SRC_TS],
        name: 'nivalis/typescript/type-checked',
        rules: {
          '@typescript-eslint/no-deprecated': 'error',
          '@typescript-eslint/no-dynamic-delete': 'error',
          '@typescript-eslint/no-empty-object-type': 'error',
          '@typescript-eslint/no-for-in-array': 'error',
          'no-implied-eval': 'off',
          '@typescript-eslint/no-implied-eval': 'error',
          '@typescript-eslint/no-unnecessary-type-arguments': 'error',
          '@typescript-eslint/no-unnecessary-type-assertion': 'error',
          '@typescript-eslint/no-unnecessary-type-parameters': 'error',
          '@typescript-eslint/no-unsafe-argument': 'error',
          '@typescript-eslint/no-unsafe-assignment': 'warn',
          '@typescript-eslint/no-unsafe-call': 'warn',
          '@typescript-eslint/no-unsafe-declaration-merging': 'error',
          '@typescript-eslint/no-unsafe-enum-comparison': 'error',
          '@typescript-eslint/no-unsafe-function-type': 'error',
          '@typescript-eslint/no-unsafe-member-access': 'warn',
          '@typescript-eslint/no-unsafe-return': 'warn',
          '@typescript-eslint/no-unsafe-unary-minus': 'error',
          'no-throw-literal': 'off',
          '@typescript-eslint/only-throw-error': 'error',
          'prefer-promise-reject-errors': 'off',
          '@typescript-eslint/prefer-promise-reject-errors': 'error',
          '@typescript-eslint/prefer-reduce-type-parameter': 'error',
          '@typescript-eslint/prefer-return-this-type': 'error',
          'require-await': 'off',
          '@typescript-eslint/require-await': 'error',
          '@typescript-eslint/restrict-plus-operands': ['error'],
          'no-return-await': 'off',
          '@typescript-eslint/ban-tslint-comment': 'error',
          '@typescript-eslint/non-nullable-type-assertion-style': 'error',
          '@typescript-eslint/prefer-find': 'error',
          '@typescript-eslint/prefer-includes': 'error',
          '@typescript-eslint/prefer-regexp-exec': 'error',
          '@typescript-eslint/prefer-string-starts-ends-with': 'error',
          'dot-notation': 'off',
          'return-await': 'off',

          '@typescript-eslint/return-await': ['error', 'always'],
          '@typescript-eslint/strict-boolean-expressions': [
            'off',
            { allowNullableBoolean: true, allowNullableObject: true },
          ],
          '@typescript-eslint/no-unnecessary-condition': 'off',
          '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn',
          '@typescript-eslint/await-thenable': 'error',
          '@typescript-eslint/consistent-type-exports': [
            'error',
            { fixMixedExportsWithInlineTypeSpecifier: true },
          ],
          '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
          '@typescript-eslint/naming-convention': [
            'warn',
            { format: ['PascalCase', 'camelCase'], selector: 'function' },
          ],
          '@typescript-eslint/no-array-delete': 'error',
          '@typescript-eslint/no-base-to-string': 'error',
          '@typescript-eslint/no-confusing-void-expression': 'error',
          '@typescript-eslint/no-duplicate-type-constituents': 'error',
          '@typescript-eslint/no-floating-promises': [
            'error',
            { ignoreIIFE: true, ignoreVoid: true },
          ],
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
          '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
          '@typescript-eslint/no-unnecessary-template-expression': 'error',
          '@typescript-eslint/prefer-nullish-coalescing': [
            'error',
            {
              ignoreConditionalTests: true,
              ignoreMixedLogicalExpressions: true,
              ignorePrimitives: { number: true, string: true },
            },
          ],
          '@typescript-eslint/prefer-optional-chain': ['error'],
          '@typescript-eslint/promise-function-async': 'error',
          '@typescript-eslint/restrict-template-expressions': [
            'warn',
            {
              allowAny: false,
              allowBoolean: false,
              allowNullish: false,
              allowNumber: true,
              allowRegExp: false,
              allowNever: false,
            },
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
        name: 'nivalis/typescript/languageOptions',
        languageOptions: {
          parserOptions: {
            projectService: {
              allowDefaultProject: ['*.js', '*.mjs'],
            },
            tsconfigRootDir: process.cwd(),
          },
        },
      },
    );
  }

  return defineConfig(...configs);
};
