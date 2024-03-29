import { GLOB_SRC } from '../globs';
import { pluginPromise } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

export const promise = (): TypedFlatConfigItem[] => {
  return [
    {
      files: [GLOB_SRC],
      name: 'nivalis:promise',
      plugins: {
        promise: pluginPromise,
      },
      rules: {
        'promise/always-return': ['error', { ignoreLastCallback: true }],
        'promise/catch-or-return': ['error'],
        'promise/no-callback-in-promise': ['warn'],
        'promise/no-nesting': ['warn'],
        'promise/no-new-statics': ['error'],
        'promise/no-promise-in-callback': ['warn'],
        'promise/no-return-in-finally': ['warn'],
        'promise/no-return-wrap': ['error'],
        'promise/param-names': ['error'],
        'promise/valid-params': ['warn'],
      },
    },
  ];
};
