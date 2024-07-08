import { GLOB_EXCLUDE } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export const ignores = (): TypedFlatConfigItem[] => {
  return [
    {
      name: 'nivalis/ignores',
      ignores: GLOB_EXCLUDE,
    },
  ];
};
