import { configs } from 'eslint-plugin-regexp';
import type { TypedFlatConfigItem } from '../types';

export const regexp = (): TypedFlatConfigItem[] => {
  return [
    {
      ...configs['flat/recommended'],
      name: 'nivalis/regexp/setup',
    },
    {
      name: 'nivalis/regexp/rules',
      rules: {
        'regexp/letter-case': [
          'error',
          {
            caseInsensitive: 'lowercase',
            unicodeEscape: 'uppercase',
          },
        ],
      },
    },
  ];
};
