/* eslint-disable max-lines */
import {GLOB_TS, GLOB_TSX} from '../globs';
import {paddingLines} from '../lib/padding-lines';
import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

// eslint-disable-next-line max-lines-per-function
export const typescript = async (): Promise<FlatESLintConfig[]> => {
	const [_pluginTypeScript, _parserTypeScript] = await Promise.all([
		import('@typescript-eslint/eslint-plugin'),
		import('@typescript-eslint/parser'),
	]);

	const pluginTypeScript = interopDefault(_pluginTypeScript);
	const parserTypeScript = interopDefault(_parserTypeScript);

	return [
		{
			files: [GLOB_TS, GLOB_TSX],
			languageOptions: {
				parser: parserTypeScript,
				parserOptions: {
					ecmaVersion: 'latest',
					project: ['./**/tsconfig.json'],
					sourceType: 'module',
					tsconfigRootDir: process.cwd(),
				},
			},
			plugins: {
				'@typescript-eslint': pluginTypeScript,
			},
			rules: {
				'default-param-last': 'off',
				'no-array-constructor': 'off',
				'no-dupe-class-members': 'off',
				'no-empty-function': 'off',
				'no-invalid-this': 'off',
				'no-loop-func': 'off',
				'no-loss-of-precision': 'off',
				'no-redeclare': 'off',
				'no-restricted-imports': 'off',
				'no-return-await': 'off',
				'no-shadow': 'off',
				'no-undef': 'off',
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',

				'unused-imports/no-unused-vars': [
					'off',
					{
						args: 'after-used',
						argsIgnorePattern: '^_',
						ignoreRestSiblings: true,
						varsIgnorePattern: '^_',
					},
				],

				'@typescript-eslint/no-unsafe-declaration-merging': 'error',

				// Disable rules that need type information.
				'@typescript-eslint/await-thenable': 'off',
				'@typescript-eslint/consistent-type-exports': 'off',
				'@typescript-eslint/dot-notation': 'off',
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-array-delete': 'off',
				'@typescript-eslint/no-base-to-string': 'off',
				'@typescript-eslint/no-confusing-void-expression': 'off',
				'@typescript-eslint/no-duplicate-type-constituents': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-for-in-array': 'off',
				'@typescript-eslint/no-implied-eval': 'off',
				'@typescript-eslint/no-meaningless-void-operator': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/no-mixed-enums': 'off',
				'@typescript-eslint/no-redundant-type-constituents': 'off',
				'@typescript-eslint/no-throw-literal': 'off',
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'off',
				'@typescript-eslint/no-unnecessary-qualifier': 'off',
				'@typescript-eslint/no-unnecessary-type-arguments': 'off',
				'@typescript-eslint/no-unnecessary-type-assertion': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-enum-comparison': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unsafe-unary-minus': 'off',
				'@typescript-eslint/no-useless-template-literals': 'off',
				'@typescript-eslint/non-nullable-type-assertion-style': 'off',
				'@typescript-eslint/prefer-destructuring': 'off',
				'@typescript-eslint/prefer-find': 'off',
				'@typescript-eslint/prefer-includes': 'off',
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'@typescript-eslint/prefer-optional-chain': 'off',
				'@typescript-eslint/prefer-promise-reject-errors': 'off',
				'@typescript-eslint/prefer-readonly': 'off',
				'@typescript-eslint/prefer-readonly-parameter-types': 'off',
				'@typescript-eslint/prefer-reduce-type-parameter': 'off',
				'@typescript-eslint/prefer-regexp-exec': 'off',
				'@typescript-eslint/prefer-return-this-type': 'off',
				'@typescript-eslint/prefer-string-starts-ends-with': 'off',
				'@typescript-eslint/promise-function-async': 'off',
				'@typescript-eslint/require-array-sort-compare': 'off',
				'@typescript-eslint/require-await': 'off',
				'@typescript-eslint/restrict-plus-operands': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/return-await': 'off',
				'@typescript-eslint/strict-boolean-expressions': 'off',
				'@typescript-eslint/switch-exhaustiveness-check': 'off',
				'@typescript-eslint/unbound-method': 'off',

				'@typescript-eslint/no-confusing-non-null-assertion': 'error',

				'@typescript-eslint/adjacent-overload-signatures': ['error'],
				'@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
				'@typescript-eslint/ban-ts-comment': [
					'error',
					{
						minimumDescriptionLength: 4,
						'ts-expect-error': 'allow-with-description',
					},
				],
				'@typescript-eslint/ban-tslint-comment': ['error'],
				'@typescript-eslint/ban-types': [
					'error',
					{
						extendDefaults: false,
						types: {
							BigInt: {
								fixWith: 'bigint',
								message: 'Use `bigint` instead.',
							},
							Boolean: {
								fixWith: 'boolean',
								message: 'Use `boolean` instead.',
							},
							Function:
								'Use a specific function type instead, like `() => void`.',
							Number: {
								fixWith: 'number',
								message: 'Use `number` instead.',
							},
							Object: {
								fixWith: 'Record<string, unknown>',
								message:
									'The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848',
							},
							String: {
								fixWith: 'string',
								message: 'Use `string` instead.',
							},
							Symbol: {
								fixWith: 'symbol',
								message: 'Use `symbol` instead.',
							},
							'[[[[[]]]]]': '🦄💥',
							'[[[[]]]]': 'ur drunk 🤡',
							'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
							'[[]]':
								"Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
							'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
							object: {
								fixWith: 'Record<string, unknown>',
								message:
									'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
							},
							'{}': {
								fixWith: 'Record<string, unknown>',
								message:
									'The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.',
							},
						},
					},
				],
				'@typescript-eslint/brace-style': [
					'off',
					'1tbs',
					{allowSingleLine: false},
				],
				'@typescript-eslint/class-literal-property-style': ['error', 'getters'],
				'@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
				'@typescript-eslint/comma-spacing': [
					'error',
					{after: true, before: false},
				],
				'@typescript-eslint/consistent-generic-constructors': [
					'error',
					'constructor',
				],
				'@typescript-eslint/consistent-indexed-object-style': [
					'error',
					'index-signature',
				],
				'@typescript-eslint/consistent-type-assertions': [
					'error',
					{
						assertionStyle: 'as',
						objectLiteralTypeAssertions: 'allow-as-parameter',
					},
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
				'@typescript-eslint/method-signature-style': ['error', 'property'],
				'@typescript-eslint/default-param-last': ['error'],
				'@typescript-eslint/explicit-function-return-type': ['off'],
				'@typescript-eslint/explicit-member-accessibility': ['off'],
				'@typescript-eslint/func-call-spacing': ['off', 'never'],
				'@typescript-eslint/indent': [
					'off',
					'tab',
					{
						SwitchCase: 1,
						flatTernaryExpressions: false,
						ignoreComments: false,
						offsetTernaryExpressions: false,
					},
				],
				'@typescript-eslint/keyword-spacing': [
					'off',
					{after: true, before: true, overrides: {}},
				],
				'@typescript-eslint/lines-between-class-members': [
					'error',
					'always',
					{exceptAfterSingleLine: true},
				],
				'@typescript-eslint/member-delimiter-style': [
					'off',
					{
						multiline: {
							delimiter: 'semi',
							requireLast: true,
						},
						singleline: {
							delimiter: 'semi',
							requireLast: false,
						},
					},
				],
				'@typescript-eslint/member-ordering': ['error'],
				'@typescript-eslint/no-array-constructor': ['error'],
				'@typescript-eslint/no-dupe-class-members': ['error'],
				'@typescript-eslint/no-duplicate-enum-values': ['error'],
				'@typescript-eslint/no-dynamic-delete': ['error'],
				'@typescript-eslint/no-empty-function': [
					'error',
					{allow: ['arrowFunctions', 'functions', 'methods']},
				],
				'@typescript-eslint/no-empty-interface': [
					'error',
					{allowSingleExtends: true},
				],
				'@typescript-eslint/no-explicit-any': ['off'],
				'@typescript-eslint/no-extra-non-null-assertion': ['error'],
				'@typescript-eslint/no-extra-parens': [
					'off',
					'all',
					{
						conditionalAssign: true,
						enforceForArrowConditionals: false,
						ignoreJSX: 'all',
						nestedBinaryExpressions: false,
						returnAssign: false,
					},
				],
				'@typescript-eslint/no-extra-semi': ['off'],
				'@typescript-eslint/no-extraneous-class': [
					'warn',
					{
						allowConstructorOnly: false,
						allowEmpty: false,
						allowStaticOnly: false,
						allowWithDecorator: true,
					},
				],

				'@typescript-eslint/no-inferrable-types': [
					'error',
					{ignoreParameters: false, ignoreProperties: false},
				],
				'@typescript-eslint/no-invalid-void-type': ['error'],
				'@typescript-eslint/no-loop-func': ['error'],
				'@typescript-eslint/no-loss-of-precision': ['error'],
				'@typescript-eslint/no-magic-numbers': [
					'off',
					{
						detectObjects: false,
						enforceConst: true,
						ignore: [],
						ignoreArrayIndexes: true,
					},
				],
				'@typescript-eslint/no-misused-new': ['error'],
				'@typescript-eslint/no-namespace': [
					'error',
					{allowDeclarations: false, allowDefinitionFiles: false},
				],
				'@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
				'@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
				'@typescript-eslint/no-non-null-assertion': ['off'],
				'@typescript-eslint/no-redeclare': ['error'],
				'@typescript-eslint/no-require-imports': ['error'],
				'@typescript-eslint/no-shadow': ['warn'],
				'@typescript-eslint/no-this-alias': [
					'error',
					{allowDestructuring: true},
				],
				'@typescript-eslint/no-unnecessary-type-constraint': ['error'],
				'@typescript-eslint/no-unused-expressions': [
					'error',
					{
						allowShortCircuit: false,
						allowTaggedTemplates: false,
						allowTernary: false,
						enforceForJSX: true,
					},
				],
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						args: 'after-used',
						argsIgnorePattern: '^_',
						ignoreRestSiblings: true,
						vars: 'all',
						varsIgnorePattern: '^_',
					},
				],
				'@typescript-eslint/no-use-before-define': [
					'error',
					{classes: true, functions: true, variables: true},
				],
				'@typescript-eslint/no-useless-constructor': ['error'],
				'@typescript-eslint/no-useless-empty-export': ['error'],
				'@typescript-eslint/no-var-requires': ['error'],
				'@typescript-eslint/object-curly-spacing': ['off', 'never'],
				'@typescript-eslint/padding-line-between-statements': [
					'error',
					...paddingLines,
				],
				'@typescript-eslint/parameter-properties': [
					'error',
					{prefer: 'parameter-property'},
				],
				'@typescript-eslint/prefer-as-const': ['error'],
				'@typescript-eslint/prefer-for-of': ['error'],
				'@typescript-eslint/prefer-function-type': ['error'],
				'@typescript-eslint/prefer-literal-enum-member': ['error'],
				'@typescript-eslint/prefer-namespace-keyword': ['error'],

				'@typescript-eslint/prefer-ts-expect-error': ['error'],
				'@typescript-eslint/quotes': ['off', 'single'],
				'@typescript-eslint/semi': ['off', 'always'],
				'@typescript-eslint/space-before-blocks': ['off', 'always'],
				'@typescript-eslint/space-before-function-paren': [
					'off',
					{anonymous: 'always', asyncArrow: 'always', named: 'never'},
				],
				'@typescript-eslint/space-infix-ops': ['off'],
				'@typescript-eslint/triple-slash-reference': [
					'warn',
					{lib: 'never', path: 'never', types: 'never'},
				],
				'@typescript-eslint/type-annotation-spacing': ['off'],
				'@typescript-eslint/typedef': ['off'],
				'@typescript-eslint/unified-signatures': [
					'error',
					{ignoreDifferentlyNamedParameters: true},
				],
				'no-magic-numbers': ['off'],
			},
		},
		{
			files: ['**/*.d.ts'],
			rules: {
				'eslint-comments/no-unlimited-disable': 'off',
				'import/no-duplicates': 'off',
				'unused-imports/no-unused-vars': 'off',
			},
		},
		{
			files: ['**/*.js', '**/*.cjs'],
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	];
};

export const typescriptTypecheck = async (): Promise<FlatESLintConfig[]> => {
	const pluginTypeScript = interopDefault(
		await import('@typescript-eslint/eslint-plugin'),
	);

	return [
		{
			files: [GLOB_TS, GLOB_TSX],
			plugins: {
				'@typescript-eslint': pluginTypeScript,
			},
			rules: {
				'@typescript-eslint/no-base-to-string': 'error',
				'@typescript-eslint/no-duplicate-type-constituents': 'error',
				'@typescript-eslint/no-unsafe-enum-comparison': 'error',

				'@typescript-eslint/no-array-delete': 'error',
				'@typescript-eslint/no-confusing-void-expression': 'error',
				'@typescript-eslint/no-meaningless-void-operator': 'error',
				'@typescript-eslint/no-mixed-enums': 'error',
				'@typescript-eslint/no-non-null-assertion': 'error',
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
				'@typescript-eslint/no-unnecessary-type-arguments': 'error',
				'@typescript-eslint/no-useless-template-literals': 'error',
				'@typescript-eslint/prefer-includes': 'error',
				'prefer-promise-reject-errors': 'off',
				'@typescript-eslint/prefer-promise-reject-errors': 'error',
				'@typescript-eslint/prefer-reduce-type-parameter': 'error',
				'@typescript-eslint/prefer-return-this-type': 'error',

				'@typescript-eslint/non-nullable-type-assertion-style': 'error',
				'@typescript-eslint/prefer-string-starts-ends-with': 'error',

				'@typescript-eslint/prefer-optional-chain': ['error'],
				'@typescript-eslint/no-redundant-type-constituents': ['error'],
				// This rule is too strict, should be added per projet.
				'@typescript-eslint/strict-boolean-expressions': ['off'],
				'@typescript-eslint/naming-convention': [
					'warn',
					{format: ['PascalCase', 'camelCase'], selector: 'function'},
				],
				'@typescript-eslint/await-thenable': ['error'],
				'@typescript-eslint/dot-notation': ['error', {allowKeywords: true}],
				'@typescript-eslint/no-explicit-any': 'warn',
				'@typescript-eslint/no-floating-promises': [
					'error',
					{ignoreIIFE: true, ignoreVoid: true},
				],
				'@typescript-eslint/no-for-in-array': 'error',
				'@typescript-eslint/no-implied-eval': 'error',
				'@typescript-eslint/promise-function-async': 'error',
				'@typescript-eslint/no-misused-promises': [
					'error',
					{
						checksVoidReturn: {
							arguments: false,
							attributes: false,
						},
					},
				],
				'@typescript-eslint/no-throw-literal': 'error',
				'@typescript-eslint/consistent-type-exports': [
					'error',
					{fixMixedExportsWithInlineTypeSpecifier: true},
				],
				'@typescript-eslint/switch-exhaustiveness-check': 'error',
				// This rule is too strict, should be added per projet.
				'@typescript-eslint/no-unnecessary-condition': 'off',
				'@typescript-eslint/no-unnecessary-type-assertion': ['error'],
				'@typescript-eslint/no-unsafe-argument': ['error'],
				'@typescript-eslint/no-unsafe-assignment': ['warn'],
				'@typescript-eslint/no-unsafe-call': ['warn'],
				'@typescript-eslint/no-unsafe-member-access': ['warn'],
				'@typescript-eslint/no-unsafe-return': ['warn'],
				'@typescript-eslint/prefer-nullish-coalescing': [
					'error',
					{
						ignorePrimitives: {string: true, number: true},
						ignoreConditionalTests: true,
						ignoreMixedLogicalExpressions: true,
					},
				],
				'@typescript-eslint/require-await': ['error'],
				'@typescript-eslint/restrict-plus-operands': ['error'],
				'@typescript-eslint/restrict-template-expressions': [
					'warn',
					{allowNumber: true},
				],
				'@typescript-eslint/unbound-method': ['error'],
				'dot-notation': 'off',
				'no-implied-eval': 'off',
				'no-throw-literal': 'off',
				'require-await': ['off'],

				// Adds support for triple-slash directives.
				'spaced-comment': [
					'error',
					'always',
					{
						markers: ['/'],
					},
				],
			},
		},
	];
};
