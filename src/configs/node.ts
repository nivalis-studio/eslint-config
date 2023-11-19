import {GLOB_SRC} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const node = async (): Promise<FlatESLintConfig[]> => {
	const _pluginNode = await import('eslint-plugin-n');
	const pluginNode = interopDefault(_pluginNode);

	return [
		{
			plugins: {
				n: pluginNode,
			},
		},
		pluginNode.configs['flat/recommended'],
		{
			files: [GLOB_SRC],
			rules: {
				'n/file-extension-in-import': ['off'],
				'n/handle-callback-err': ['error', '^(err|error)$'],
				'n/no-deprecated-api': ['error'],
				'n/no-exports-assign': 'error',
				'n/no-missing-import': ['off'],
				'n/no-mixed-requires': ['error', {allowCall: true, grouping: true}],
				'n/no-new-require': ['error'],
				'n/no-path-concat': ['error'],
				'n/no-process-exit': ['off'],
				'n/no-unpublished-bin': ['error'],
				'n/prefer-global/buffer': ['off'],
				'n/prefer-global/console': ['error', 'always'],
				'n/prefer-global/process': ['off'],
				'n/prefer-global/text-decoder': ['error', 'always'],
				'n/prefer-global/text-encoder': ['error', 'always'],
				'n/prefer-global/url': ['error', 'always'],
				'n/prefer-global/url-search-params': ['error', 'always'],
				'n/prefer-promises/dns': ['error'],
				'n/prefer-promises/fs': ['error'],
				'n/process-exit-as-throw': ['error'],
			},
		},
	] as FlatESLintConfig[];
};
