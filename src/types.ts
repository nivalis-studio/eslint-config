import type { ESLint, Linter } from 'eslint';
import type { VendoredPrettierOptions } from './vender/prettier-types';

export type Awaitable<T> = T | Promise<T>;

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

// Relax plugins type limitation, as most of the plugins did not have correct type info yet.
export type TypedFlatConfigItem = Omit<Linter.FlatConfig, 'plugins'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */

  plugins?: { [key: string]: ESLint.Plugin };
};

export type OptionsTypescript = {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  configPath?: string | string[];
};

export type OptionsTailwindCSS = {
  // defaults to 'tailwind.config.ts'
  configPath?: string;
};

export type OptionsPrettier = VendoredPrettierOptions;

export type OptionsConfig = {
  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;
  /**
   * Enable tailwindcss rules.
   * @default false
   */
  tailwindcss?: boolean | OptionsTailwindCSS;
  /**
   * Enable Prettier support.
   * @default true
   */
  prettier?: boolean | OptionsPrettier;
};
