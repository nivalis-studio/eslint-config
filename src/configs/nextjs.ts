import globals from 'globals';
import { interopDefault } from '../utils';
import { GLOB_REACT } from '../globs';
import type { ESLint } from 'eslint';
import type { TypedFlatConfigItem } from '../types';

export const nextjs = async (): Promise<TypedFlatConfigItem[]> => {
  const pluginNextjs = await interopDefault<ESLint.Plugin>(
    import('@next/eslint-plugin-next') as unknown as ESLint.Plugin,
  );

  return [
    {
      files: [GLOB_REACT],
      name: 'nivalis/nextjs',
      languageOptions: {
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
          ...globals.node,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: { 'nextjs': pluginNextjs },
      rules: {
        'nextjs/google-font-display': 'warn',
        'nextjs/google-font-preconnect': 'warn',
        'nextjs/next-script-for-ga': 'warn',
        'nextjs/no-async-client-component': 'warn',
        'nextjs/no-before-interactive-script-outside-document': 'warn',
        'nextjs/no-css-tags': 'warn',
        'nextjs/no-head-element': 'warn',
        'nextjs/no-html-link-for-pages': 'warn',
        'nextjs/no-img-element': 'warn',
        'nextjs/no-page-custom-font': 'warn',
        'nextjs/no-styled-jsx-in-document': 'warn',
        'nextjs/no-sync-scripts': 'warn',
        'nextjs/no-title-in-document-head': 'warn',
        'nextjs/no-typos': 'warn',
        'nextjs/no-unwanted-polyfillio': 'warn',
        'nextjs/inline-script-id': 'error',
        'nextjs/no-assign-module-variable': 'error',
        'nextjs/no-document-import-in-page': 'error',
        'nextjs/no-duplicate-head': 'error',
        'nextjs/no-head-import-in-document': 'error',
        'nextjs/no-script-component-in-head': 'error',
      },
    },
  ];
};
