import { GLOB_SRC } from '../globs';
import { pluginPromise } from '../plugins';
import type { OptionsIsQuiet, TypedFlatConfigItem } from '../types';

export const promise = (options: OptionsIsQuiet): TypedFlatConfigItem[] => {
  const { isInQuietMode = false } = options;

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
        'promise/no-callback-in-promise': [isInQuietMode ? 'off' : 'warn'],
        'promise/no-nesting': [isInQuietMode ? 'off' : 'warn'],
        'promise/no-new-statics': ['error'],
        'promise/no-promise-in-callback': [isInQuietMode ? 'off' : 'warn'],
        'promise/no-return-in-finally': [isInQuietMode ? 'off' : 'warn'],
        'promise/no-return-wrap': ['error'],
        'promise/param-names': ['error'],
        'promise/valid-params': [isInQuietMode ? 'off' : 'warn'],
      },
    },
  ];
};
