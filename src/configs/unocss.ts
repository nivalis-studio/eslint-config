import { ensurePackages, interopDefault } from '../utils';
import type { OptionsUnoCSS, TypedFlatConfigItem } from '../types';
import type { ESLint } from 'eslint';

export const unocss = async (
  options: OptionsUnoCSS = {},
): Promise<TypedFlatConfigItem[]> => {
  const { attributify = true, strict = false } = options;

  ensurePackages(['@unocss/eslint-plugin']);

  const [pluginUnoCSS] = await Promise.all([
    interopDefault(import('@unocss/eslint-plugin')),
  ] as const);

  return [
    {
      name: 'nivalis:unocss',
      plugins: {
        unocss: pluginUnoCSS as unknown as ESLint.Plugin,
      },
      rules: {
        'unocss/order': 'warn',
        ...(attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {}),
        ...(strict
          ? {
              'unocss/blocklist': 'error',
            }
          : {}),
      },
    },
  ];
};
