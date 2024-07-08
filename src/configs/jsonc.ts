import eslintPluginJsonc from 'eslint-plugin-jsonc';
import type { TypedFlatConfigItem } from '../types';

export const jsonc = (): TypedFlatConfigItem[] => {
  return [
    ...eslintPluginJsonc.configs['flat/recommended-with-json'],
    ...eslintPluginJsonc.configs['flat/prettier'],
  ];
};
