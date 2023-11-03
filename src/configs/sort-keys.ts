import {GLOB_SRC} from '../globs';
import {pluginSortKeys} from '../plugins';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const sortKeys: FlatESLintConfigItem[] = [
	{
		plugins: {
			'sort-keys': pluginSortKeys,
		},
	},
	{
		files: [GLOB_SRC],
		rules: {
			'sort-keys': 'off', // disable default eslint sort-keys
			'sort-keys/sort-keys-fix': 'warn',
		},
	},
];
