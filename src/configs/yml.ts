import {GLOB_YAML} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfig, Rules} from 'eslint-define-config';

export const yml = async (): Promise<FlatESLintConfig[]> => {
	const [_pluginYml, _parserYml] = await Promise.all([
		import('eslint-plugin-yml'),
		import('yaml-eslint-parser'),
	]);

	const pluginYml = interopDefault(_pluginYml);
	const parserYml = interopDefault(_parserYml);

	return [
		{
			files: [GLOB_YAML],
			languageOptions: {
				parser: parserYml,
			},
			plugins: {
				yml: pluginYml,
			},
			rules: {
				...(pluginYml.configs.standard.rules as Rules),
				...(pluginYml.configs.prettier.rules as Rules),
				'yml/no-empty-mapping-value': 'off',
			},
		},
	];
};
