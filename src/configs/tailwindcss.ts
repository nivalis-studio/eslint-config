import { interopDefault } from '../utils';
import type { ESLint } from 'eslint';
import type { OptionsTailwindCSS } from '../options';

export const tailwindcss = async (options: OptionsTailwindCSS) => {
  if (options === false) {
    return [];
  }

  const tailwind = await interopDefault<ESLint.Plugin>(
    import('eslint-plugin-tailwindcss') as unknown as ESLint.Plugin,
  );

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
          config: options?.configPath || 'tailwind.config.ts',
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
