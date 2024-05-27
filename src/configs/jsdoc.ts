import { interopDefault } from '../utils';
import { GLOB_SRC } from '../globs';
import type {
  OptionsIsQuiet,
  OptionsStylistic,
  TypedFlatConfigItem,
} from '../types';

export const jsdoc = async (
  options: OptionsIsQuiet & OptionsStylistic = {},
): Promise<TypedFlatConfigItem[]> => {
  const { isInQuietMode = false, stylistic = true } = options;

  return [
    {
      files: [GLOB_SRC],
      name: 'nivalis/jsdoc/rules',
      plugins: {
        jsdoc: await interopDefault(import('eslint-plugin-jsdoc')),
      },
      rules: {
        'jsdoc/check-access': isInQuietMode ? 'off' : 'warn',
        'jsdoc/check-param-names': isInQuietMode ? 'off' : 'warn',
        'jsdoc/check-property-names': isInQuietMode ? 'off' : 'warn',
        'jsdoc/check-types': isInQuietMode ? 'off' : 'warn',
        'jsdoc/empty-tags': isInQuietMode ? 'off' : 'warn',
        'jsdoc/implements-on-classes': isInQuietMode ? 'off' : 'warn',
        'jsdoc/no-defaults': isInQuietMode ? 'off' : 'warn',
        'jsdoc/no-multi-asterisks': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-param-name': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-property': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-property-description': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-property-name': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-returns-check': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-returns-description': isInQuietMode ? 'off' : 'warn',
        'jsdoc/require-yields-check': isInQuietMode ? 'off' : 'warn',

        ...(stylistic
          ? {
              'jsdoc/check-alignment': isInQuietMode ? 'off' : 'warn',
              'jsdoc/multiline-blocks': isInQuietMode ? 'off' : 'warn',
            }
          : {}),
      },
    },
  ];
};
