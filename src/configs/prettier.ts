import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const prettier = async (): Promise<FlatESLintConfig[]> => {
	const [_configPrettier, _pluginPrettier] = await Promise.all([
		import('eslint-config-prettier'),
		import('eslint-plugin-prettier'),
	]);

	const configPrettier = interopDefault(_configPrettier);
	const pluginPrettier = interopDefault(_pluginPrettier);

	return [
		{
			plugins: {
				prettier: pluginPrettier,
			},
			rules: {
				...configPrettier.rules,
				...pluginPrettier.configs.recommended.rules,
				'prettier/prettier': 'warn',
			},
		},
	];
};
