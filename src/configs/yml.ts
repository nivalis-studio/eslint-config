import {GLOB_YAML} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfigItem, Rules} from 'eslint-define-config';

export const yml = async (): Promise<FlatESLintConfigItem[]> => {
	const _pluginYml = await import('eslint-plugin-yml');
	const _parserYml = await import('yaml-eslint-parser');

	const pluginYml = interopDefault(_pluginYml);
	const parserYml = interopDefault(_parserYml);

	return [
		{
			plugins: {
				yml: pluginYml,
			},
		},
		{
			files: [GLOB_YAML],
			languageOptions: {
				parser: parserYml,
			},
			rules: {
				...(pluginYml.configs.standard.rules as Rules),
				...(pluginYml.configs.prettier.rules as Rules),
				'yml/no-empty-mapping-value': 'off',
			},
		},
	];
};
