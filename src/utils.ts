import { isPackageExists } from 'local-pkg';
import type {
  Awaitable,
  OptionsConfig,
  ResolvedOptions,
  TypedFlatConfigItem,
} from './types';

export const resolveSubOptions = <K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
};

export const toArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 * @param {Record<string, any>} rules The rules to rename.
 * @param {Record<string, string>} map The map of prefixes to rename.
 * @returns {Record<string, any>} The renamed rules.
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * Combine array and non-array configs into a single array.
 * @param {...any} configs The configs to combine.
 * @returns {Promise<TypedFlatConfigItem[]>} The combined configs.
 */
export const combine = async (
  ...configs: Array<Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>>
): Promise<TypedFlatConfigItem[]> => {
  const resolved = await Promise.all(configs);

  return resolved.flat();
};

export const interopDefault = async <T>(
  module_: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> => {
  const resolved = await module_;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return (resolved as any).default || resolved;
};

export const ensurePackages = (packages: string[]) => {
  if (process.env.CI || !process.stdout.isTTY) {
    return;
  }

  const nonExistingPackages = packages.filter(index => !isPackageExists(index));

  if (nonExistingPackages.length === 0) {
    return;
  }

  throw new Error(
    `This package(s) are required for this config: ${nonExistingPackages.join(', ')}. Please install them.`,
  );
};
