import pluginComments from '@eslint-community/eslint-plugin-eslint-comments';
import type { TypedFlatConfigItem } from '../types';
import type { ESLint } from 'eslint';

export const comments = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments as unknown as ESLint.Plugin,
      },
      rules: {
        'eslint-comments/disable-enable-pair': [
          'error',
          { 'allowWholeFile': true },
        ],
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ];
};
