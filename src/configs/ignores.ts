import { GLOB_EXCLUDE } from '../globs';
import type { Linter } from 'eslint';

export const ignores = (userIgnores: string[] = []): Linter.Config[] => {
  return [
    {
      name: 'nivalis/ignores',
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
    },
  ];
};
