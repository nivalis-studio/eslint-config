import { pluginComments } from '../plugins';
import type { ESLint } from 'eslint';
import type { TypedFlatConfigItem } from '../types';

export const comments = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments as unknown as ESLint.Plugin,
      },
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ];
};
