import { ensurePackages, interopDefault } from '../utils';
import type { FlatConfigItem, OptionsUnoCSS } from '../types';

export const unocss = async (
  options: OptionsUnoCSS = {},
): Promise<FlatConfigItem[]> => {
  const { attributify = true, strict = false } = options;

  ensurePackages(['@unocss/eslint-plugin']);

  const [pluginUnoCSS] = await Promise.all([
    interopDefault(import('@unocss/eslint-plugin')),
  ] as const);

  return [
    {
      name: 'nivalis:unocss',
      plugins: {
        unocss: pluginUnoCSS,
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
