import {GLOB_SRC} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const sortKeys = async (): Promise<FlatESLintConfig[]> => {
	const _pluginSortKeys = await import('eslint-plugin-sort-keys');
	const pluginSortKeys = interopDefault(_pluginSortKeys);

	return [
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
};
