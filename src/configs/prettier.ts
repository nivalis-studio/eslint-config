import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const prettier = async (): Promise<FlatESLintConfig[]> => {
	const _configPrettier = await import('eslint-config-prettier');
	const configPrettier = interopDefault(_configPrettier);

	const _pluginPrettier = await import('eslint-plugin-prettier');
	const pluginPrettier = interopDefault(_pluginPrettier);

	return [
		{
			plugins: {
				prettier: pluginPrettier,
			},
		},
		{
			rules: {
				...configPrettier.rules,
				...pluginPrettier.configs.recommended.rules,
				'prettier/prettier': 'warn',
			},
		},
	];
};
