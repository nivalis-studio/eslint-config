import path from 'node:path';
import { existsSync } from 'node:fs';
import tailwind from 'eslint-plugin-tailwindcss';
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

  return [
    {
      name: 'nivalis/tailwindcss',
      files: [GLOB_REACT],
      plugins: {
        tailwindcss: tailwind as unknown as ESLint.Plugin,
      },
      settings: {
        tailwindcss: {
          callees: ['cn', 'classnames', 'clsx', 'cva'],
          config: configPath,
          /**
           * Performance issue with the plugin, somewhat mitigated setting cssFiles to an empty array.
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/276
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/174
           */
          cssFiles: [],
          removeDuplicates: true,
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rules: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        ...(tailwind.configs?.recommended as any)?.rules,
      },
    },
  ];
};
