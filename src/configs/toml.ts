import { GLOB_TOML } from '../globs';
import { interopDefault } from '../utils';
import { DEFAULT_INDENT } from '../constants';
import type {
  OptionsFiles,
  OptionsOverrides,
  OptionsStylistic,
  TypedFlatConfigItem,
} from '../types';
import type { ESLint } from 'eslint';

export const toml = async (
  options: OptionsOverrides & OptionsStylistic & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> => {
  const { files = [GLOB_TOML], overrides = {}, stylistic = true } = options;

  const { indent = DEFAULT_INDENT } =
    typeof stylistic === 'boolean' ? {} : stylistic;

  const [pluginToml, parserToml] = await Promise.all([
    interopDefault(import('eslint-plugin-toml')),
    interopDefault(import('toml-eslint-parser')),
  ] as const);

  return [
    {
      name: 'nivalis:toml:setup',
      plugins: {
        toml: pluginToml as unknown as ESLint.Plugin,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserToml,
      },
      name: 'nivalis:toml:rules',
      rules: {
        'style/spaced-comment': 'off',

        'toml/comma-style': 'error',
        'toml/keys-order': 'error',
        'toml/no-space-dots': 'error',
        'toml/no-unreadable-number-separator': 'error',
        'toml/precision-of-fractional-seconds': 'error',
        'toml/precision-of-integer': 'error',
        'toml/tables-order': 'error',
        'toml/vue-custom-block/no-parsing-error': 'error',

        'unicorn/filename-case': 'off',

        ...(stylistic
          ? {
              'toml/array-bracket-newline': 'error',
              'toml/array-bracket-spacing': 'error',
              'toml/array-element-newline': 'error',
              'toml/indent': [
                'error',
                indent === 'tab' ? DEFAULT_INDENT : indent,
              ],
              'toml/inline-table-curly-spacing': 'error',
              'toml/key-spacing': 'error',
              'toml/padding-line-between-pairs': 'error',
              'toml/padding-line-between-tables': 'error',
              'toml/quoted-keys': 'error',
              'toml/spaced-comment': 'error',
              'toml/table-bracket-spacing': 'error',
            }
          : {}),

        ...overrides,
      },
    },
  ];
};
