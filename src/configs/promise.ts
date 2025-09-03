import pluginPromise from 'eslint-plugin-promise';
import { defineConfig } from 'eslint/config';
import type { Linter } from 'eslint';

export const promise = (): Linter.Config[] => {
  return defineConfig([
    {
      ...(pluginPromise.configs['flat/recommended'] as Linter.Config),
      name: 'nivalis/promise/setup',
    },
    {
      name: 'nivalis/promise/rules',
      rules: {
        'promise/always-return': [
          'error',
          {
            ignoreLastCallback: true,
          },
        ],
        'promise/no-multiple-resolved': 'warn',
      },
    },
  ]);
};
