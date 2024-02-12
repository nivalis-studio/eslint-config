import { ensurePackages, interopDefault } from '../utils';
import { GLOB_TESTS } from '../globs';
import type { FlatConfigItem, OptionsFiles, OptionsIsInEditor, OptionsOverrides } from '../types';

export const test = async (
	options: OptionsFiles & OptionsIsInEditor & OptionsOverrides = {},
): Promise<FlatConfigItem[]> => {
	const {
		files = GLOB_TESTS,
		isInEditor = false,
		overrides = {},
	} = options;

	ensurePackages(['eslint-plugin-vitest', 'eslint-plugin-no-only-tests']);

	const [
		pluginVitest,
		pluginNoOnlyTests,
	] = await Promise.all([
		interopDefault(import('eslint-plugin-vitest')),
		interopDefault(import('eslint-plugin-no-only-tests')),
	] as const);

	return [
		{
			name: 'nivalis:test:setup',
			plugins: {
				test: {
					...pluginVitest,
					rules: {
						...pluginVitest.rules,
						// extend `test/no-only-tests` rule
						// eslint-disable-next-line ts/no-unsafe-member-access
						...pluginNoOnlyTests.rules,
					},
				},
			},
		},
		{
			files,
			name: 'nivalis:test:rules',
			rules: {
				'node/prefer-global/process': 'off',

				'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
				'test/no-identical-title': 'error',
				'test/no-import-node-test': 'error',
				'test/no-only-tests': isInEditor ? 'off' : 'error',
				'test/prefer-hooks-in-order': 'error',
				'test/prefer-lowercase-title': 'error',

				...overrides,
			},
		},
	];
};
