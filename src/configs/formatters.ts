import { GLOB_CSS, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs';
import { ensurePackages, interopDefault, parserPlain } from '../utils';
import { DEFAULT_INDENT } from '../constants';
import { StylisticConfigDefaults } from './stylistic';
import type { VendoredPrettierOptions } from '../vender/prettier-types';
import type { FlatConfigItem, OptionsFormatters, StylisticConfig } from '../types';

export const formatters = async (
	options: OptionsFormatters | true = {},
	stylistic: StylisticConfig = {},
): Promise<FlatConfigItem[]> => {
	ensurePackages([
		'eslint-plugin-format',
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

	const {
		indent,
		quotes,
		semi,
	} = {
		...StylisticConfigDefaults,
		...stylistic,
	};

	const prettierOptions: VendoredPrettierOptions = Object.assign({
		endOfLine: 'auto',
		semi,
		singleQuote: quotes === 'single',
		tabWidth: typeof indent === 'number' ? indent : DEFAULT_INDENT,
		trailingComma: 'all',
		useTabs: indent === 'tab',
	} satisfies VendoredPrettierOptions,	options.prettierOptions ?? {});

	const dprintOptions = Object.assign(
		{
			indentWidth: typeof indent === 'number' ? indent : DEFAULT_INDENT,
			quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
			useTabs: indent === 'tab',
		},
		options.dprintOptions ?? {},
	);

	const pluginFormat = await interopDefault(import('eslint-plugin-format'));

	const configs: FlatConfigItem[] = [
		{
			name: 'nivalis:formatters:setup',
			plugins: {
				format: pluginFormat,
			},
		},
	];

	if (options.css) {
		configs.push(
			{
				files: [GLOB_CSS, GLOB_POSTCSS],
				languageOptions: {
					parser: parserPlain,
				},
				name: 'antfu:formatter:css',
				rules: {
					'format/prettier': [
						'error',
						{
							...prettierOptions,
							parser: 'css',
						},
					],
				},
			},
			{
				files: [GLOB_SCSS],
				languageOptions: {
					parser: parserPlain,
				},
				name: 'antfu:formatter:scss',
				rules: {
					'format/prettier': [
						'error',
						{
							...prettierOptions,
							parser: 'scss',
						},
					],
				},
			},
			{
				files: [GLOB_LESS],
				languageOptions: {
					parser: parserPlain,
				},
				name: 'antfu:formatter:less',
				rules: {
					'format/prettier': [
						'error',
						{
							...prettierOptions,
							parser: 'less',
						},
					],
				},
			},
		);
	}

	if (options.html) {
		configs.push({
			files: ['**/*.html'],
			languageOptions: {
				parser: parserPlain,
			},
			name: 'antfu:formatter:html',
			rules: {
				'format/prettier': [
					'error',
					{
						...prettierOptions,
						parser: 'html',
					},
				],
			},
		});
	}

	if (options.markdown) {
		const formater = options.markdown === true
			? 'prettier'
			: options.markdown;

		configs.push({
			files: [GLOB_MARKDOWN],
			languageOptions: {
				parser: parserPlain,
			},
			name: 'antfu:formatter:markdown',
			rules: {
				[`format/${formater}`]: [
					'error',
					formater === 'prettier'
						? {
								printWidth: 120,
								...prettierOptions,
								embeddedLanguageFormatting: 'off',
								parser: 'markdown',
							}
						: {
								...dprintOptions,
								language: 'markdown',
							},
				],
			},
		});
	}

	if (options.graphql) {
		configs.push({
			files: ['**/*.graphql'],
			languageOptions: {
				parser: parserPlain,
			},
			name: 'nivalis:formatter:graphql',
			rules: {
				'format/prettier': [
					'error',
					{
						...prettierOptions,
						parser: 'graphql',
					},
				],
			},
		});
	}

	return configs;
};
