import pluginNextjs from '@next/eslint-plugin-next';
import { GLOB_REACT } from '../globs';
import type { Linter } from 'eslint';

export const nextjs = (): Linter.Config[] => {
  return [
    {
      files: [GLOB_REACT],
      name: 'nivalis/nextjs',
      settings: {
        react: {
          version: 'detect',
        },
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: { nextjs: pluginNextjs },
      rules: {
        'nextjs/no-html-link-for-pages': 'off',
        'nextjs/google-font-display': 'warn',
        'nextjs/google-font-preconnect': 'warn',
        'nextjs/next-script-for-ga': 'warn',
        'nextjs/no-async-client-component': 'warn',
        'nextjs/no-before-interactive-script-outside-document': 'warn',
        'nextjs/no-css-tags': 'warn',
        'nextjs/no-head-element': 'warn',
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
