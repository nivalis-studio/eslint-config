import { interopDefault } from '../utils';
import { DEFAULT_INDENT } from '../constants';
import { GLOB_SRC } from '../globs';
import { StylisticConfigDefaults } from '.';
import type {
  FlatConfigItem,
  OptionsFormatters,
  StylisticConfig,
} from '../types';

export const prettier = async (
  options: OptionsFormatters | true = {},
  stylistic: StylisticConfig = {},
): Promise<FlatConfigItem[]> => {
  const [_configPrettier, pluginPrettier, pluginStylistic] = await Promise.all([
    interopDefault(import('eslint-config-prettier')),
    interopDefault(import('eslint-plugin-prettier')),
    interopDefault(import('@stylistic/eslint-plugin')),
  ]);

  if (options === true) {
    // eslint-disable-next-line no-param-reassign
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
    };
  }

  const { blockSpacing, indent, quotes, semi } = {
    ...StylisticConfigDefaults,
    ...stylistic,
  };

  return [
    {
      files: [GLOB_SRC],
      plugins: {
        prettier: pluginPrettier,
        style: pluginStylistic,
      },
      rules: {
        'arrow-body-style': 'off',
        curly: 'off',
        'no-unexpected-multiline': 'off',
        'prefer-arrow-callback': 'off',

        'prettier/prettier': [
          'warn',
          {
            arrowParens: 'avoid',
            bracketSameLine: false,
            bracketSpacing: blockSpacing,
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

        'style/jsx-curly-brace-presence': [
          'error',
          {
            children: 'never',
            propElementValues: 'always',
            props: 'never',
          },
        ],
        'style/quote-props': ['warn', 'as-needed'],

        'unicorn/empty-brace-spaces': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/number-literal-case': 'off',
        'unicorn/template-indent': 'off',
      },
    },
  ];
};
