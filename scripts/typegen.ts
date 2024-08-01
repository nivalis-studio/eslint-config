import fs from 'node:fs/promises';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { prettier } from '../src/configs/prettier';
import { ignores } from '../src/configs/ignores';
import { javascript } from '../src/configs/javascript';
import { imports } from '../src/configs/imports';
import { comments } from '../src/configs/comments';
import { node } from '../src/configs/node';
import { promise } from '../src/configs/promise';
import { sortPackageJson, sortTsconfig } from '../src/configs/sort-json';
import { jsdoc } from '../src/configs/jsdoc';
import { jsonc } from '../src/configs/jsonc';
import { nextjs } from '../src/configs/nextjs';
import { tailwindcss } from '../src/configs/tailwindcss';
import { typescript } from '../src/configs/typescript';
import { unicorn } from '../src/configs/unicorn';
import { combine } from '../src/utils';
import { react } from '../src/configs/react';
import { jsx } from '../src/configs/jsx';
import { regexp } from '../src/configs/regexp';
import { prettierStylistic, stylistic } from '../src/configs/stylistic';
import type { Linter } from 'eslint';

const configs = await combine(
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
  typescript({}),
  react(),
  nextjs(),
  tailwindcss({}),
  prettierStylistic(),
  prettier({}),
);

const configNames = (configs as Linter.Config[])
  .map(index => index.name)
  .filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs as Linter.Config[], {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(index => `'${index}'`).join(' | ')}
`;

await fs.writeFile('src/typegen.d.ts', dts);
