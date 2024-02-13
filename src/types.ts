/* eslint-disable ts/consistent-type-definitions */
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import type {
	EslintCommentsRules,
	EslintRules,
	FlatESLintConfigItem,
	ImportRules,
	JsoncRules,
	MergeIntersection,
	NRules,
	Prefix,
	ReactHooksRules,
	ReactRules,
	RenamePrefix,
	RuleConfig,
	VitestRules,
	YmlRules,
} from '@antfu/eslint-define-config';
import type { RuleOptions as JSDocRules } from '@eslint-types/jsdoc/types';
import type { RuleOptions as TypeScriptRules } from '@eslint-types/typescript-eslint/types';
import type { RuleOptions as UnicornRules } from '@eslint-types/unicorn/types';
import type { Rules as AntfuRules } from 'eslint-plugin-antfu';
import type { StylisticCustomizeOptions, UnprefixedRuleOptions as StylisticRules } from '@stylistic/eslint-plugin';
import type { VendoredPrettierOptions } from './vender/prettier-types';

export type WrapRuleConfig<T extends { [key: string]: any }> = {
	[K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>
};

export type Awaitable<T> = T | Promise<T>;

export type Rules = WrapRuleConfig<
	MergeIntersection<
		RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'> &
		RenamePrefix<VitestRules, 'vitest/', 'test/'> &
		RenamePrefix<YmlRules, 'yml/', 'yaml/'> &
		RenamePrefix<NRules, 'n/', 'node/'> &
		Prefix<StylisticRules, 'style/'> &
		Prefix<AntfuRules, 'antfu/'> &
		ReactHooksRules &
		ReactRules &
		JSDocRules &
		ImportRules &
		EslintRules &
		JsoncRules &
		UnicornRules &
		EslintCommentsRules &
		{ 'test/no-only-tests': RuleConfig<never[]> }
	>
>;

export type FlatConfigItem = Omit<FlatESLintConfigItem<Rules>, 'plugins'> & {
	/**
	 * Custom name of each config item
	 */
	name?: string;

	// Relax plugins type limitation, as most of the plugins did not have correct type info yet.
	/**
	 * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
	 *
	 * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
	 */

	plugins?: { [key: string]: any };
};

export type UserConfigItem = FlatConfigItem | Linter.FlatConfig;

export interface OptionsFiles {
	/**
	 * Override the `files` option to provide custom globs.
	 */
	files?: string[];
}

export type OptionsTypescript =
	(OptionsTypeScriptWithTypes & OptionsOverrides)
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

export type StylisticConfig = Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'>;

export interface OptionsOverrides {
	overrides?: FlatConfigItem['rules'];
}

export interface OptionsIsInEditor {
	isInEditor?: boolean;
}

export interface OptionsUnoCSS extends OptionsOverrides {
	/**
	 * Enable attributify support.
	 * @default true
	 */
	attributify?: boolean;
	/**
	 * Enable strict mode by throwing errors about blocklisted classes.
	 * @default false
	 */
	strict?: boolean;
}

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
	 * @default false
	 */
	stylistic?: boolean | (StylisticConfig & OptionsOverrides);

	/**
	 * Enable react rules.
	 *
	 * @default auto-detect
	 */
	react?: boolean | OptionsOverrides;

	/**
	 * Enable tailwindcss rules.
	 *
	 * @default false
	 */
	tailwindcss?: boolean | OptionsUnoCSS;

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
}
