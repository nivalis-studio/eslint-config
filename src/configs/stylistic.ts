import { interopDefault } from '../utils';
import { pluginAntfu } from '../plugins';
import { DEFAULT_INDENT, PADDING_LINES } from '../constants';
import type { FlatConfigItem, OptionsOverrides, StylisticConfig } from '../types';

export const StylisticConfigDefaults: StylisticConfig = {
	indent: DEFAULT_INDENT,
	jsx: true,
	quotes: 'single',
	semi: true,
};

export const stylistic = async (
	options: StylisticConfig & OptionsOverrides = {},
): Promise<FlatConfigItem[]> => {
	const {
		indent,
		jsx,
		overrides = {},
		quotes,
		semi,
	} = {
		...StylisticConfigDefaults,
		...options,
	};

	const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'));

	const config = pluginStylistic.configs.customize({
		arrowParens: false,
		blockSpacing: true,
		braceStyle: '1tbs',
		flat: true,
		indent,
		jsx,
		pluginName: 'style',
		quoteProps: 'as-needed',
		quotes,
		semi,
	});

	return [
		{
			name: 'nivalis:stylistic',
			plugins: {
				antfu: pluginAntfu,
				style: pluginStylistic,
			},
			rules: {
				...config.rules,

				'antfu/consistent-list-newline': 'error',
				'antfu/if-newline': 'error',
				'antfu/top-level-function': 'off',

				curly: ['error', 'multi-line', 'consistent'],
				'style/jsx-sort-props': [
					'error',
					{
						callbacksLast: true,
						ignoreCase: true,
						locale: 'auto',
						multiline: 'last',
						noSortAlphabetically: true,
						reservedFirst: true,
						shorthandFirst: true,
						shorthandLast: false,
					},
				],

				'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
				'style/padding-line-between-statements': ['error', ...PADDING_LINES],

				...overrides,
			},
		},
	];
};
