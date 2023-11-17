import {GLOB_MARKDOWN, GLOB_SRC, GLOB_VUE} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const markdown = async (): Promise<FlatESLintConfigItem[]> => {
	const _pluginMarkdown = await import('eslint-plugin-markdown');
	const pluginMarkdown = interopDefault(_pluginMarkdown);

	return [
		{
			plugins: {
				markdown: pluginMarkdown,
			},
		},
		{
			files: [GLOB_MARKDOWN],
			processor: 'markdown/markdown',
		},
		{
			files: [`${GLOB_MARKDOWN}/${GLOB_SRC}`, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						impliedStrict: true,
					},
				},
			},
			rules: {
				...pluginMarkdown.configs.recommended.overrides[1].rules,

				'@typescript-eslint/await-thenable': 'off',
				'@typescript-eslint/comma-dangle': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
				'@typescript-eslint/dot-notation': 'off',
				'@typescript-eslint/no-extraneous-class': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-for-in-array': 'off',
				'@typescript-eslint/no-implied-eval': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/no-namespace': 'off',
				'@typescript-eslint/no-redeclare': 'off',
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-throw-literal': 'off',
				'@typescript-eslint/no-unnecessary-type-assertion': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/restrict-plus-operands': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/unbound-method': 'off',

				'antfu/no-cjs-exports': 'off',
				'antfu/no-ts-export-equal': 'off',
				'no-alert': 'off',
				'no-console': 'off',
				'no-restricted-imports': 'off',
				'no-undef': 'off',
				'no-unused-expressions': 'off',

				'no-unused-vars': 'off',
				'node/prefer-global/process': 'off',
				'unicode-bom': 'off',
				'unused-imports/no-unused-imports': 'off',
				'unused-imports/no-unused-vars': 'off',
			},
		},
	];
};
