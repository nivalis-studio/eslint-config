import { isPackageExists } from 'local-pkg';
import type { Awaitable, FlatConfigItem } from './types';

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
};

/**
 * Combine array and non-array configs into a single array.
 */
export const combine = async (
  ...configs: Array<Awaitable<FlatConfigItem | FlatConfigItem[]>>
): Promise<FlatConfigItem[]> => {
  const resolved = await Promise.all(configs);

  return resolved.flat();
};

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 * import { renameRules } from '@antfu/eslint-config'
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export const renameRules = (
  rules: { [key: string]: any },
  map: { [key: string]: string },
) => {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`))
          return [to + key.slice(from.length), value];
      }

      return [key, value];
    }),
  );
};

/**
 * Rename plugin names a flat configs array
 *
 * @example
 * ```ts
 * import { renamePluginInConfigs } from '@antfu/eslint-config'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 *   'import-x': 'import',
 * })
 * ```
 */
export const renamePluginInConfigs = (
  configs: FlatConfigItem[],
  map: { [key: string]: string },
): FlatConfigItem[] => {
  return configs.map(i => {
    const clone = { ...i };

    if (clone.rules) clone.rules = renameRules(clone.rules, map);

    if (clone.plugins) {
      clone.plugins = Object.fromEntries(
        Object.entries(clone.plugins).map(([key, value]) => {
          if (key in map) return [map[key], value];

          return [key, value];
        }),
      );
    }

    return clone;
  });
};

export const toArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

export const interopDefault = async <T>(
  mod: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> => {
  const resolved = await mod;

  // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-member-access
  return (resolved as any).default || resolved;
};

export const ensurePackages = (packages: string[]) => {
  if (process.env.CI || !process.stdout.isTTY) {
    return;
  }

  const nonExistingPackages = packages.filter(i => !isPackageExists(i));

  if (nonExistingPackages.length === 0) {
    return;
  }

  throw new Error(
    `This package(s) are required for this config: ${nonExistingPackages.join(', ')}. Please install them.`,
  );
};
