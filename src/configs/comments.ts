import pluginComments from '@eslint-community/eslint-plugin-eslint-comments';
import { defineConfig } from 'eslint/config';
import type { Linter } from 'eslint';

export const comments = (): Linter.Config[] => {
  return defineConfig([
    {
      name: 'nivalis/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        'eslint-comments/disable-enable-pair': [
          'error',
          { allowWholeFile: true },
        ],
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ]);
};
