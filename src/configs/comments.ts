import {pluginComments} from '../plugins';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const comments: FlatESLintConfigItem[] = [
	{
		plugins: {
			'eslint-comments': pluginComments,
		},
	},
	{
		rules: {
			...pluginComments.configs.recommended.rules,
			'eslint-comments/disable-enable-pair': ['error', {allowWholeFile: true}],
			'eslint-comments/no-aggregating-enable': ['error'],
			'eslint-comments/no-duplicate-disable': ['error'],
			'eslint-comments/no-restricted-disable': ['off'],
			'eslint-comments/no-unlimited-disable': ['error'],
			'eslint-comments/no-unused-disable': ['error'],
			'eslint-comments/no-unused-enable': ['error'],
			'eslint-comments/no-use': ['off'],
		},
	},
];
