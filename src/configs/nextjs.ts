import { interopDefault } from '../utils';
import { GLOB_REACT } from '../globs';
import type { OptionsIsQuiet, TypedFlatConfigItem } from '../types';
import type { ESLint } from 'eslint';

export const nextjs = async (
  options: OptionsIsQuiet = {},
): Promise<TypedFlatConfigItem[]> => {
  const { isInQuietMode = false } = options;
  const pluginNextjs = await interopDefault<ESLint.Plugin>(
    import('@next/eslint-plugin-next'),
  );

  return [
    {
      files: [GLOB_REACT],
      name: 'nivalis/nextjs',
      plugins: {
        nextjs: pluginNextjs,
      },
      rules: {
        'nextjs/google-font-display': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/google-font-preconnect': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/inline-script-id': ['error'],
        'nextjs/next-script-for-ga': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-assign-module-variable': ['error'],
        'nextjs/no-async-client-component': 'warn',
        'nextjs/no-before-interactive-script-outside-document': [
          isInQuietMode ? 'off' : 'warn',
        ],
        'nextjs/no-css-tags': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-document-import-in-page': ['error'],
        'nextjs/no-duplicate-head': ['error'],
        'nextjs/no-head-element': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-head-import-in-document': ['error'],
        'nextjs/no-html-link-for-pages': ['off'],
        'nextjs/no-img-element': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-page-custom-font': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-script-component-in-head': ['error'],
        'nextjs/no-styled-jsx-in-document': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-sync-scripts': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-title-in-document-head': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-typos': [isInQuietMode ? 'off' : 'warn'],
        'nextjs/no-unwanted-polyfillio': [isInQuietMode ? 'off' : 'warn'],
      },
    },
  ];
};
