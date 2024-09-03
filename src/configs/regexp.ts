import { configs } from 'eslint-plugin-regexp';

export const regexp = () => [
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
