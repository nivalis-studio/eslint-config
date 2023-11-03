import {configPrettier, pluginPrettier} from '../plugins';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const prettier: FlatESLintConfigItem[] = [
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
