import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { jsdoc } from './configs/jsdoc';
import { jsonc } from './configs/jsonc';
import { node } from './configs/node';
import { regexp } from './configs/regexp';
import { stylistic } from './configs/stylistic';
import { unicorn } from './configs/unicorn';
import {
  HAS_NEXTJS,
  HAS_REACT,
  HAS_TAILWINDCSS,
  HAS_TYPESCRIPT,
} from './environment';
import { promise } from './configs/promise';
import type { ConfigOptions } from './options';
import type { Linter } from 'eslint';

export const nivalis = async (
  options?: ConfigOptions,
  ...userConfigs: Linter.Config[]
) => {
  const enableNextJs =
    (HAS_NEXTJS && options?.nextjs !== false) || options?.nextjs === true;
  const enableReact =
    (HAS_REACT && options?.react !== false) || options?.react === true;
  const enableTailwindCss = HAS_TAILWINDCSS && options?.tailwindcss !== false;
  const enableTypescript = HAS_TYPESCRIPT && options?.typescript !== false;

  let composer = new FlatConfigComposer(
    ignores(options?.ignores),
    await imports(!enableTypescript),
    javascript(),
    stylistic(),
    jsdoc(),
    jsonc(),
    regexp(),
    node(),
    promise(),
    comments(),
    unicorn(),
  );

  if (enableReact) {
    const mod = await import('./configs/react');

    composer = composer.append(...mod.react());
  }

  if (enableNextJs) {
    const mod = await import('./configs/nextjs');

    composer = composer.append(...mod.nextjs());
  }

  if (enableTailwindCss) {
    const mod = await import('./configs/tailwindcss');

    composer = composer.append(...mod.tailwindcss(options?.tailwindcss));
  }

  if (enableTypescript) {
    const mod = await import('./configs/typescript');

    composer = composer.append(...mod.typescript(options?.typescript));
  }

  if (options?.prettier !== false) {
    const mod = await import('./configs/prettier');

    composer = composer.append(...mod.prettier(options?.prettier));
  }

  composer = composer.append(...userConfigs);

  return await composer;
};
