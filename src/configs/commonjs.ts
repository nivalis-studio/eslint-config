import globals from 'globals';
import type { TypedFlatConfigItem } from '../types';

export const commonjs = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/commonjs/config',
      files: ['**/*.cjs'],
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          ...globals.commonjs,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'script',
        },
        sourceType: 'script',
      },
    },
  ];
};
