import {GLOB_SRC} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const promise = async (): Promise<FlatESLintConfigItem[]> => {
	const _pluginPromise = await import('eslint-plugin-promise');
	const pluginPromise = interopDefault(_pluginPromise);

	return [
		{
			plugins: {
				promise: pluginPromise,
			},
		},
		{
			files: [GLOB_SRC],
			rules: {
				...pluginPromise.configs.recommended.rules,
				'promise/always-return': ['error', {ignoreLastCallback: true}],
				'promise/avoid-new': ['off'],
				'promise/catch-or-return': ['error'],
				'promise/no-callback-in-promise': ['warn'],
				'promise/no-native': ['off'],
				'promise/no-nesting': ['warn'],
				'promise/no-new-statics': ['error'],
				'promise/no-promise-in-callback': ['warn'],
				'promise/no-return-in-finally': ['warn'],
				'promise/no-return-wrap': ['error'],
				'promise/param-names': ['error'],
				'promise/prefer-await-to-callbacks': ['off'],
				'promise/prefer-await-to-then': ['off'],
				'promise/valid-params': ['warn'],
			},
		},
	];
};
