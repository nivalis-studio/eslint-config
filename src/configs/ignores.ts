import { GLOB_EXCLUDE } from '../globs';

export const ignores = (userIgnores: string[] = []) => [
  {
    name: 'nivalis/ignores',
    ignores: [...GLOB_EXCLUDE, ...userIgnores],
  },
];
