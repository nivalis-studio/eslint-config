import {interopDefault} from '../utils';
import {GLOB_REACT} from '../globs';
import type {FlatConfigItem} from '../types';

export const promise = async (): Promise<FlatConfigItem[]> => {
	const pluginNextjs = await interopDefault(import('@next/eslint-plugin-next'));

	return [
		{
			files: [GLOB_REACT],
			name: 'nivalis:nextjs',
			plugins: {
				nextjs: pluginNextjs,
			},
			rules: {
				'nextjs/google-font-display': ['warn'],
				'nextjs/google-font-preconnect': ['warn'],
				'nextjs/inline-script-id': ['error'],
				'nextjs/next-script-for-ga': ['warn'],
				'nextjs/no-assign-module-variable': ['error'],
				'nextjs/no-async-client-component': 'warn',
				'nextjs/no-before-interactive-script-outside-document': ['warn'],
				'nextjs/no-css-tags': ['warn'],
				'nextjs/no-document-import-in-page': ['error'],
				'nextjs/no-duplicate-head': ['error'],
				'nextjs/no-head-element': ['warn'],
				'nextjs/no-head-import-in-document': ['error'],
				'nextjs/no-html-link-for-pages': ['off'],
				'nextjs/no-img-element': ['warn'],
				'nextjs/no-page-custom-font': ['warn'],
				'nextjs/no-script-component-in-head': ['error'],
				'nextjs/no-styled-jsx-in-document': ['warn'],
				'nextjs/no-sync-scripts': ['warn'],
				'nextjs/no-title-in-document-head': ['warn'],
				'nextjs/no-typos': ['warn'],
				'nextjs/no-unwanted-polyfillio': ['warn'],
			},
		},
	];
};
