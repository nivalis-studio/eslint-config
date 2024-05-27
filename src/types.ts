/* eslint-disable ts/consistent-type-definitions */
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { ParserOptions } from '@typescript-eslint/parser';
import type { ESLint, Linter } from 'eslint';
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { VendoredPrettierOptions } from './vender/prettier-types';
import type { ConfigNames, RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedFlatConfigItem = Omit<
  Linter.FlatConfig<Linter.RulesRecord & Rules>,
  'plugins'
> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */

  plugins?: { [key: string]: ESLint.Plugin };
};

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[];
}

export type OptionsTypescript =
  | (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides);

export interface OptionsFormatters {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   *
   * Currently only support Prettier.
   */
  css?: 'prettier' | boolean;

  /**
   * Enable formatting support for HTML.
   *
   * Currently only support Prettier.
   */
  html?: 'prettier' | boolean;

  /**
   * Enable formatting support for Markdown.
   *
   * Support both Prettier and dprint.
   *
   * When set to `true`, it will use Prettier.
   */
  markdown?: 'prettier' | 'dprint' | boolean;

  /**
   * Enable formatting support for GraphQL.
   */
  graphql?: 'prettier' | boolean;

  /**
   * Custom options for Prettier.
   *
   * By default it's controlled by our own config.
   */
  prettierOptions?: VendoredPrettierOptions;

  /**
   * Custom options for dprint.
   *
   * By default it's controlled by our own config.
   */
  dprintOptions?: boolean;
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];

  /**
   * Enable 'typeware' rules.
   *
   * @default true
   */
  typeaware?: boolean;
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[];
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig;
}

export type StylisticConfig = Pick<
  StylisticCustomizeOptions,
  'indent' | 'quotes' | 'jsx' | 'semi' | 'blockSpacing'
>;

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsIsInEditor {
  isInEditor?: boolean;
}

export interface OptionsIsQuiet {
  isInQuietMode?: boolean;
}

export type OptionsTailwindCSS = OptionsOverrides;

export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions;

  /**
   * Enable graphql.
   *
   * Requires installing:
   * - `@graphql-eslint/eslint-plugin`
   *
   * @default false
   */
  graphQL?: OptionsOverrides;

  /**
   * Core rules. Can't be disabled.
   */
  javascript?: OptionsOverrides;

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Enable JSX related rules.
   *
   * Currently only stylistic rules are included.
   *
   * @default true
   */
  jsx?: boolean;

  /**
   * Enable test support.
   *
   * Requires installing:
   * - `eslint-plugin-vitest`
   * - `eslint-plugin-no-only-tests`
   *
   * @default false
   */
  test?: boolean | OptionsOverrides;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OptionsOverrides;

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsOverrides;

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: boolean | OptionsOverrides;

  /**
   * Enable stylistic rules instead of Prettier.
   *
   * @default true
   */
  stylistic?: boolean | (StylisticConfig & OptionsOverrides);

  /**
   * Enable stylistic rules instead of Prettier.
   *
   * @default true
   */
  prettier?: boolean | OptionsOverrides;

  /**
   * Enable react rules.
   *
   * @default auto-detect
   */
  react?: boolean | OptionsOverrides;

  /**
   * Enable solid rules.
   *
   * Requires installing:
   * - `eslint-plugin-solid`
   *
   * @default false
   */
  solid?: boolean | OptionsOverrides;

  /**
   * Enable svelte rules.
   *
   * Requires installing:
   * - `eslint-plugin-svelte`
   *
   * @default false
   */
  svelte?: boolean;

  /**
   * Enable tailwindcss rules.
   *
   * @default false
   */
  tailwindcss?: boolean | OptionsTailwindCSS;

  /**
   * Disable 'warn' rules.
   *
   * @default false
   */
  quiet?: boolean;

  /**
   * Enable neverthrow rules.
   *
   * @default false
   */
  neverthrow?: boolean;

  /**
   * Use external formatters to format files.
   *
   * Requires installing:
   * - `eslint-plugin-format`
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default false
   */
  formatters?: boolean | OptionsFormatters;

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;

  /**
   * Automatically rename plugins in the config.
   *
   * @default true
   */
  autoRenamePlugins?: boolean;

  /**
   * Provide overrides for rules for each integration.
   *
   * @deprecated use `overrides` option in each integration key instead
   */
  overrides?: {
    stylistic?: TypedFlatConfigItem['rules'];
    javascript?: TypedFlatConfigItem['rules'];
    typescript?: TypedFlatConfigItem['rules'];
    test?: TypedFlatConfigItem['rules'];
    vue?: TypedFlatConfigItem['rules'];
    jsonc?: TypedFlatConfigItem['rules'];
    markdown?: TypedFlatConfigItem['rules'];
    yaml?: TypedFlatConfigItem['rules'];
    toml?: TypedFlatConfigItem['rules'];
    react?: TypedFlatConfigItem['rules'];
    solid: TypedFlatConfigItem['rules'];
    svelte?: TypedFlatConfigItem['rules'];
  };
}
