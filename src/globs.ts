export const GLOB_MARKDOWN = '**/*.md';
export const GLOB_ASTRO = '**/*.astro';
export const GLOB_ASTRO_TS = '**/*.astro/*.ts';

export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';
export const GLOB_JS = '**/*.?([cm])js';
export const GLOB_TS = '**/*.?([cm])ts';

export const GLOB_REACT = '**/*.?([cm])?(j|t)sx';
export const GLOB_JSX = '**/*.?([cm])jsx';
export const GLOB_TSX = '**/*.?([cm])tsx';

export const GLOB_YAML = '**/*.y?(a)ml';
export const GLOB_TOML = '**/*.toml';

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/build',
  '**/.history',
  '**/.vitepress/cache',
  '**/.cache',
  '**/.git',
  '**/.npm',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/next-env.d.ts',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
];
