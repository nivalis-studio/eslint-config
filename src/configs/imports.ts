import {pluginAntfu, pluginImport} from '../plugins';
import {
	GLOB_JS,
	GLOB_JSX,
	GLOB_MARKDOWN,
	GLOB_SRC,
	GLOB_SRC_EXT,
	GLOB_TS,
	GLOB_TSX,
} from '../globs';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const imports: FlatESLintConfigItem[] = [
	{
		plugins: {
			antfu: pluginAntfu,
			import: pluginImport,
		},
	},
	{
		files: [GLOB_SRC],
		rules: {
			'antfu/import-dedupe': 'error',
			'antfu/no-import-node-modules-by-path': 'error',

			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/default': ['error'],
			'import/export': ['error'],
			'import/first': 'error',
			'import/named': ['error'],
			'import/newline-after-import': [
				'error',
				{considerComments: true, count: 1},
			],
			'import/no-absolute-path': [
				'error',
				{amd: false, commonjs: true, esmodule: true},
			],
			'import/no-amd': ['error'],
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
			'import/no-cycle': ['error'],
			'import/no-default-export': 'error',
			'import/no-deprecated': 'warn',
			'import/no-duplicates': 'error',
			'import/no-import-module-exports': ['error', {exceptions: []}],
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default': ['error'],
			'import/no-named-as-default-member': ['error'],
			'import/no-named-default': 'error',
			'import/no-relative-packages': ['error'],
			'import/no-self-import': 'error',
			'import/no-unassigned-import': [
				'error',
				{
					allow: [
						'server-only',
						'**/register',
						'**/register.*',
						'**/register /**',
						'**/register /**.*',
						'**/*.css',
						'** /*.scss',
						'**/*.sass',
						'** /*.less',
					],
				},
			],
			'import/no-useless-path-segments': ['error', {commonjs: true}],
			'import/no-webpack-loader-syntax': 'error',
			'import/order': [
				'error',
				{
					'groups': [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					'newlines-between': 'never',
					'pathGroups': [{group: 'internal', pattern: '{{@,~}/,#}**'}],
					'pathGroupsExcludedImportTypes': ['type'],
				},
			],
		},
	},
	{
		files: [
			`**/*config*.${GLOB_SRC_EXT}`,
			`**/views/${GLOB_SRC}`,
			`**/pages/${GLOB_SRC}`,
			`**/{index,vite,esbuild,rollup,webpack,rspack}.ts`,
			'**/*.d.ts',
			`${GLOB_MARKDOWN}/**`,
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},
	{
		files: [GLOB_SRC],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
	},
	{
		files: [GLOB_JS, GLOB_JSX],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {jsx: true},
			},
		},
		settings: {
			'import/extensions': ['.js', '.mjs', '.cjs', '.jsx'],
			'import/resolver': {
				node: {
					extensions: ['.js', '.mjs', '.cjs', '.jsx', '.json'],
				},
			},
		},
	},
	{
		files: [GLOB_TS, GLOB_TSX],
		rules: {
			// TypeScript compilation already ensures that named imports exist in the referenced module
			'import/named': 'off',
			// Prevent possible conflicts when importing types
			'no-duplicate-imports': 'off',
		},
		settings: {
			'import/extensions': ['.js', '.jsx', '.ts', '.cts', '.mts', '.tsx'],
			'import/external-module-folders': ['node_modules', 'node_modules/@types'],
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx'],
			},
			'import/resolver': {
				node: {
					extensions: [
						'.js',
						'.mjs',
						'.cjs',
						'.jsx',
						'.ts',
						'.cts',
						'.mts',
						'.tsx',
						'.json',
					],
				},
			},
		},
	},
	{
		files: [GLOB_SRC],
		// Temporary workaround for rules not supporting eslint flat config
		rules: {
			'import/default': 'off',
			'import/no-deprecated': 'off',
			'import/no-named-as-default': 'off',
			'import/no-named-as-default-member': 'off',
		},
	},
];
