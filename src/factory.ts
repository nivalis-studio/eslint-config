import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { jsdoc } from './configs/jsdoc';
import { jsonc } from './configs/jsonc';
import { nivalisCustom } from './configs/nivalis';
import { node } from './configs/node';
import { regexp } from './configs/regexp';
import { stylistic } from './configs/stylistic';
import { unicorn } from './configs/unicorn';
import { format } from './configs/format';
import { HAS_NEXTJS, HAS_TAILWINDCSS, HAS_TYPESCRIPT } from './environment';
import type { ConfigOptions } from './options';

export const nivalis = async (options?: ConfigOptions) => {
  const enableNextJs = HAS_NEXTJS && options?.nextjs !== false;
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
    comments(),
    unicorn(),
  );

  if (enableNextJs) {
    const nextjs = await import('./configs/nextjs');

    composer = composer.append(...(await nextjs.nextjs()));
  }

  if (enableTailwindCss) {
    const tailwind = await import('./configs/tailwindcss');

    composer = composer.append(
      ...(await tailwind.tailwindcss(options?.tailwindcss)),
    );
  }

  if (enableTypescript) {
    const ts = await import('./configs/typescript');

    composer = composer.append(...ts.typescript(options?.typescript));
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  composer = composer.append(...format(options?.format));

  if (options?.format !== false && options?.format?.formatter === 'dprint') {
    composer = composer.append(nivalisCustom());
  }

  return await composer;
};
