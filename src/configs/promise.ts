import pluginPromise from 'eslint-plugin-promise';
import type { TypedFlatConfigItem } from '../types';

export const promise = (): TypedFlatConfigItem[] => {
  return [
    {
      ...(pluginPromise.configs['flat/recommended'] as TypedFlatConfigItem),
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
  ];
};
