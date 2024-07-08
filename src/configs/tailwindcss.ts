import tailwind from 'eslint-plugin-tailwindcss';
import { GLOB_REACT } from '../globs';
import type { OptionsTailwindCSS, TypedFlatConfigItem } from '../types';
import type { ESLint } from 'eslint';

export const tailwindcss = (
  options: OptionsTailwindCSS,
): TypedFlatConfigItem[] => {
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
          config: options.configPath || 'tailwind.config.ts',
          /**
           * Performance issue with the plugin, somewhat mitigated setting cssFiles to an empty array.
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/276
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/174
           */
          cssFiles: [],
          removeDuplicates: true,
        },
      },
      rules: {
        ...tailwind.configs.recommended.rules,
      },
    },
  ];
};
