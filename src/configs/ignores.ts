import { GLOB_EXCLUDE } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export const ignores = (): TypedFlatConfigItem[] => {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ];
};
