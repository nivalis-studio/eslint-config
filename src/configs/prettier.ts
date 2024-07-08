import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { DEFAULT_INDENT } from '../constants';
import type { OptionsPrettier, TypedFlatConfigItem } from '../types';

export const prettier = (options: OptionsPrettier): TypedFlatConfigItem[] => {
  const bracketSpacing = options.bracketSpacing ?? true;
  const semi = options.semi ?? true;
  const quotes =
    options.singleQuote === undefined
      ? 'single'
      : options.singleQuote
        ? 'single'
        : 'double';
  const indent = options.tabWidth ?? DEFAULT_INDENT;

  return [
    {
      ...eslintPluginPrettier,
      name: 'nivalis/prettier/plugin',
    },
    {
      name: 'nivalis/prettier/config',
      rules: {
        'prettier/prettier': [
          'error',
          {
            arrowParens: 'avoid',
            bracketSameLine: false,
            bracketSpacing,
            embeddedLanguageFormatting: 'auto',
            endOfLine: 'lf',
            htmlWhitespaceSensitivity: 'css',
            insertPragma: false,
            jsxSingleQuote: true,
            overrides: [
              {
                files: ['**/*.json'],
                options: { trailingComma: 'none', useTabs: false },
              },
              {
                files: ['**/*.yml', '**/*.yaml'],
                options: { singleQuote: false, useTabs: false },
              },
            ],
            printWidth: 80,
            proseWrap: 'always',
            quoteProps: 'preserve',
            requirePragma: false,
            semi,
            singleAttributePerLine: false,

            singleQuote: quotes === 'single',
            tabWidth: typeof indent === 'number' ? indent : DEFAULT_INDENT,
            trailingComma: 'all',
            useTabs: !(typeof indent === 'number'),
          },
        ],
      },
    },
  ];
};
