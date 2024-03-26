import { GLOB_ASTRO } from '../globs';
import { interopDefault } from '../utils';
import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  OptionsStylistic,
} from '../types';

export const astro = async (
  options: OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<FlatConfigItem[]> => {
  const { files = [GLOB_ASTRO], overrides = {}, stylistic = true } = options;

  const [pluginAstro, parserAstro, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-astro')),
    interopDefault(import('astro-eslint-parser')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  return [
    {
      name: 'nivalis:astro:setup',
      plugins: {
        astro: pluginAstro,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserAstro,
        parserOptions: {
          extraFileExtensions: ['.astro'],
          parser: parserTs as any,
        },
      },
      name: 'nivalis:astro:rules',
      rules: {
        'astro/no-set-html-directive': 'off',
        'astro/semi': 'off',

        ...(stylistic
          ? {
              'style/indent': 'off',
              'style/jsx-closing-tag-location': 'off',
              'style/jsx-indent': 'off',
              'style/jsx-one-expression-per-line': 'off',
              'style/no-multiple-empty-lines': 'off',
            }
          : {}),

        ...overrides,
      },
    },
  ];
};
