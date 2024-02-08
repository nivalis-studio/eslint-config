import pluginComments from 'eslint-plugin-eslint-comments';
import type {FlatESLintConfig} from 'eslint-define-config';

export const comments = (): FlatESLintConfig[] => {
	return [
		{
			plugins: {
				'eslint-comments': pluginComments,
			},
			rules: {
				'eslint-comments/disable-enable-pair': [
					'error',
					{allowWholeFile: true},
				],
				'eslint-comments/no-aggregating-enable': ['error'],
				'eslint-comments/no-duplicate-disable': ['error'],
				'eslint-comments/no-restricted-disable': ['off'],
				// covered by unicorn/no-abusive-eslint-disable
				'eslint-comments/no-unlimited-disable': ['off'],
				'eslint-comments/no-unused-disable': ['error'],
				'eslint-comments/no-unused-enable': ['error'],
				'eslint-comments/no-use': ['off'],
			},
		},
	];
};
