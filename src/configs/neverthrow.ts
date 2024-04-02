import { pluginNeverthrow } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

export const neverthrow = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis:neverthrow',
      plugins: {
        neverthrow: pluginNeverthrow,
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        'neverthrow/must-use-result': 'error',
      },
    },
  ];
};
