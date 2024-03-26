import { GLOB_EXCLUDE } from '../globs';
import type { FlatConfigItem } from '../types';

export const ignores = (): FlatConfigItem[] => {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ];
};
