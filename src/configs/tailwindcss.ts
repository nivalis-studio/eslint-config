import path from 'node:path';
import { existsSync } from 'node:fs';
import tailwind from 'eslint-plugin-better-tailwindcss';
import { GLOB_REACT } from '../globs';
import type { ESLint, Linter } from 'eslint';
import type { TailwindOptions } from '../options';

export const tailwindcss = (options: TailwindOptions): Linter.Config[] => {
  if (options === false) {
    return [];
  }

  const configPath = path.join(
    process.cwd(),
    options?.configPath ?? './tailwind.config.ts',
  );

  if (!existsSync(configPath)) {
    throw new Error(
      `Tailwind config not found. The file ${configPath} does not exist. Please check your configuration.`,
    );
  }

  const cssGlobalPath = path.join(
    process.cwd(),
    options?.cssGlobalPath ?? './src/styles/globals.css',
  );

  if (!existsSync(cssGlobalPath)) {
    throw new Error(
      `Tailwind css globals files not found. The file ${cssGlobalPath} does not exist. Please check your configuration.`,
    );
  }

  return [
    {
      name: 'nivalis/tailwindcss',
      files: [GLOB_REACT],
      plugins: {
        'better-tailwindcss': tailwind as unknown as ESLint.Plugin,
      },
      settings: {
        'better-tailwindcss': {
          callees: ['cn', 'classnames', 'clsx', 'cva'],
          entryPoint: cssGlobalPath,
          tailwindConfig: configPath,
        },
      },
      rules: {
        'better-tailwindcss/enforce-consistent-class-order': 'off',
        'better-tailwindcss/enforce-consistent-important-position': 'off',
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
        'better-tailwindcss/enforce-shorthand-classes': 'warn',
        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-deprecated-classes': 'error',
        'better-tailwindcss/no-duplicate-classes': 'error',
        'better-tailwindcss/no-restricted-classes': 'error',
        'better-tailwindcss/no-unnecessary-whitespace': 'warn',
        'better-tailwindcss/no-unregistered-classes': 'off',
      },
    },
  ];
};
