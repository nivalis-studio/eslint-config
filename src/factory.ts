import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { prettier } from './configs/prettier';
import { ignores } from './configs/ignores';
import { javascript } from './configs/javascript';
import { comments } from './configs/comments';
import { node } from './configs/node';
import { promise } from './configs/promise';
import { sortPackageJson, sortTsconfig } from './configs/sort-json';
import { jsdoc } from './configs/jsdoc';
import { jsx } from './configs/jsx';
import { prettierStylistic, stylistic } from './configs/stylistic';
import { jsonc } from './configs/jsonc';
import { nextjs } from './configs/nextjs';
import { regexp } from './configs/regexp';
import { tailwindcss } from './configs/tailwindcss';
import { typescript } from './configs/typescript';
import { unicorn } from './configs/unicorn';
import { resolveSubOptions } from './utils';
import {
  HAS_NEXTJS,
  HAS_PRETTIER,
  HAS_REACT,
  HAS_TAILWINDCSS,
  HAS_TYPESCRIPT,
} from './environment';
import { react } from './configs/react';
import { imports } from './configs/imports';
import type { Awaitable } from 'eslint-flat-config-utils';
import type { OptionsConfig, TypedFlatConfigItem } from './types';
import type { Linter } from 'eslint';

const flatConfigProperties: Array<keyof TypedFlatConfigItem> = [
  'name',
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
];

export const nivalis = async (
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Array<
    Awaitable<
      | TypedFlatConfigItem
      | TypedFlatConfigItem[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | FlatConfigComposer<any, any>
      | Linter.Config[]
    >
  >
) => {
  const configs: Array<Awaitable<TypedFlatConfigItem[]>> = [];

  const enableReact = HAS_REACT;
  const enableNextJs = HAS_NEXTJS && options.nextjs !== false;
  const enablePrettier = HAS_PRETTIER && options.prettier !== false;
  const enableTypescript = HAS_TYPESCRIPT && options.typescript !== false;
  const enableTailwindCss = HAS_TAILWINDCSS && options.tailwindcss !== false;

  configs.push(
    ignores(),
    imports(),
    javascript(),
    jsx(),
    stylistic(),
    jsdoc(),
    jsonc(),
    regexp(),
    sortPackageJson(),
    sortTsconfig(),
    node(),
    promise(),
    comments(),
    unicorn(),
  );

  if (enableReact) {
    configs.push(react());
  }

  if (enableNextJs) {
    configs.push(nextjs());
  }

  if (enableTailwindCss) {
    configs.push(tailwindcss(resolveSubOptions(options, 'tailwindcss')));
  }

  if (enableTypescript) {
    configs.push(typescript(resolveSubOptions(options, 'typescript')));
  }

  if (enablePrettier) {
    configs.push(
      prettierStylistic(),
      prettier(resolveSubOptions(options, 'prettier')),
    );
  }

  /* User can optionally pass a flat config item to the first argument
     We pick the known keys as ESLint would do schema validation */
  const fusedConfig: TypedFlatConfigItem = {};

  for (const property of flatConfigProperties) {
    for (const key of Object.keys(options)) {
      if (key !== property) continue;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      fusedConfig[property] = options[property] as any;
    }
  }

  if (Object.keys(fusedConfig).length > 0) configs.push([fusedConfig]);

  let composer = new FlatConfigComposer<TypedFlatConfigItem>();

  composer = composer.append(
    ...configs,
    ...(userConfigs as TypedFlatConfigItem[]),
  );

  return await composer;
};
