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
				'prettier/prettier': 'warn',

				'unicorn/empty-brace-spaces': 'off',
				'unicorn/no-nested-ternary': 'off',
				'unicorn/number-literal-case': 'off',
				'unicorn/template-indent': 'off',
			},
		},
	];
};
