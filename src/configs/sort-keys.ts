import {GLOB_SRC} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const sortKeys = async (): Promise<FlatESLintConfig[]> => {
	return [
		{
			files: [GLOB_SRC],
			plugins: {
				'sort-keys': interopDefault(await import('eslint-plugin-sort-keys')),
			},
			rules: {
				'sort-keys': 'off', // disable default eslint sort-keys
				'sort-keys/sort-keys-fix': 'warn',
			},
		},
	];
};
