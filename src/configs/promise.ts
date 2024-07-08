import pluginPromise from 'eslint-plugin-promise';
import type { TypedFlatConfigItem } from '../types';

export const promise = (): TypedFlatConfigItem[] => {
  return [
    {
      ...(pluginPromise.configs['flat/recommended'] as TypedFlatConfigItem),
      name: 'nivalis/promise/setup',
    },
  ];
};
