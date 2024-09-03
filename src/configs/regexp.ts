import { configs } from 'eslint-plugin-regexp';
import type { Linter } from 'eslint';

export const regexp = (): Linter.Config[] => {
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
