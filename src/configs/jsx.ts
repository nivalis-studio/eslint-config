import { GLOB_REACT } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export const jsx = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/jsx/setup',
      files: [GLOB_REACT],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ];
};
