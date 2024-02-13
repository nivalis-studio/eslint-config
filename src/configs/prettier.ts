import {interopDefault} from '../utils';
import {DEFAULT_INDENT} from '../constants';
import {GLOB_SRC} from '../globs';
import {StylisticConfigDefaults} from '.';
import type {
	FlatConfigItem,
	OptionsFormatters,
	StylisticConfig,
} from '../types';
import type {VendoredPrettierOptions} from '../vender/prettier-types';

export const prettier = async (
	options: OptionsFormatters | true = {},
	stylistic: StylisticConfig = {},
): Promise<FlatConfigItem[]> => {
	const [_configPrettier, pluginPrettier] = await Promise.all([
		interopDefault(import('eslint-config-prettier')),
		interopDefault(import('eslint-plugin-prettier')),
	]);

	if (options === true) {
		// eslint-disable-next-line no-param-reassign
		options = {
			css: true,
			graphql: true,
			html: true,
			markdown: true,
		};
	}

	const {indent, quotes, semi} = {
		...StylisticConfigDefaults,
		...stylistic,
	};

	const _prettierOptions: VendoredPrettierOptions = Object.assign(
		{
			endOfLine: 'auto',
			semi,
			singleQuote: quotes === 'single',
			tabWidth: typeof indent === 'number' ? indent : DEFAULT_INDENT,
			trailingComma: 'all',
			useTabs: indent === 'tab',
		} satisfies VendoredPrettierOptions,
		options.prettierOptions ?? {},
	);

	return [
		{
			files: [GLOB_SRC],
			plugins: {
				prettier: pluginPrettier,
			},
			rules: {
				'arrow-body-style': 'off',
				curly: 'off',
				'no-unexpected-multiline': 'off',
				'prefer-arrow-callback': 'off',
				// Prettier
				'prettier/prettier': 'warn',
				'style/jsx-child-element-spacing': 'off',
				'style/jsx-closing-bracket-location': 'off',
				'style/jsx-closing-tag-location': 'off',
				'style/jsx-curly-newline': 'off',
				'style/jsx-curly-spacing': 'off',
				'style/jsx-equals-spacing': 'off',
				'style/jsx-first-prop-new-line': 'off',
				'style/jsx-indent': 'off',
				'style/jsx-indent-props': 'off',
				'style/jsx-max-props-per-line': 'off',
				'style/jsx-newline': 'off',
				'style/jsx-one-expression-per-line': 'off',
				'style/jsx-props-no-multi-spaces': 'off',
				'style/jsx-tag-spacing': 'off',
				'style/jsx-wrap-multilines': 'off',
				'ts/block-spacing': 'off',
				'ts/brace-style': 'off',
				'ts/comma-dangle': 'off',
				'ts/comma-spacing': 'off',
				'ts/func-call-spacing': 'off',
				'ts/indent': 'off',
				'ts/key-spacing': 'off',
				'ts/keyword-spacing': 'off',
				'ts/lines-around-comment': 'off',
				'ts/member-delimiter-style': 'off',
				'ts/no-extra-parens': 'off',
				'ts/no-extra-semi': 'off',
				'ts/object-curly-spacing': 'off',
				'ts/quotes': 'off',
				'ts/semi': 'off',
				'ts/space-before-blocks': 'off',
				'ts/space-before-function-paren': 'off',
				'ts/space-infix-ops': 'off',
				'ts/type-annotation-spacing': 'off',
				'unicorn/empty-brace-spaces': 'off',
				'unicorn/no-nested-ternary': 'off',
				'unicorn/number-literal-case': 'off',
				'unicorn/template-indent': 'off',
			},
		},
	];
};
