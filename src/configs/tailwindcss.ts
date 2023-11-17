import {GLOB_HTML, GLOB_SRC} from '../globs';
import {interopDefault} from '../interop';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const tailwindcss = async (): Promise<FlatESLintConfigItem[]> => {
	const _pluginTailwindcss = await import('eslint-plugin-tailwindcss');

	const pluginTailwindcss = interopDefault(_pluginTailwindcss);

	return [
		{
			plugins: {
				tailwindcss: pluginTailwindcss,
			},
		},
		{
			files: [GLOB_SRC, GLOB_HTML],
			rules: {
				'tailwindcss/classnames-order': ['warn'],
				'tailwindcss/enforces-negative-arbitrary-values': ['warn'],
				'tailwindcss/enforces-shorthand': ['warn'],
				'tailwindcss/migration-from-tailwind-2': ['warn'],
				'tailwindcss/no-arbitrary-value': ['off'],
				'tailwindcss/no-contradicting-classname': ['error'],
				'tailwindcss/no-custom-classname': ['warn'],
			},
			settings: {
				tailwindcss: {
					callees: ['cn', 'classnames', 'clsx'],
					config: 'tailwind.config.ts',
					removeDuplicates: true,
				},
			},
		},
		{
			files: ['**/tailwind.config.?([cm])[jt]s'],
			rules: {
				'sort-keys': 'off',
				'sort-keys/sort-keys-fix': 'off',
			},
		},
	];
};
