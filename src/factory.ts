/* eslint-disable ts/no-unsafe-return */
import fs from 'node:fs';
import {
  comments,
  graphql,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  prettier,
  react,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  tailwindcss,
  test,
  toml,
  typescript,
  unicorn,
  yaml,
} from './configs';
import { combine, interopDefault } from './utils';
import { formatters } from './configs/formatters';
import {
  HAS_REACT,
  HAS_TAILWINDCSS,
  HAS_TYPESCRIPT,
  IN_IS_EDITOR,
} from './environment';
import type {
  Awaitable,
  FlatConfigItem,
  OptionsConfig,
  UserConfigItem,
} from './types';

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export const resolveSubOptions = <K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> => {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
};

export const getOverrides = <K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): undefined | { [x: string]: any } => {
  const sub = resolveSubOptions(options, key);

  return {
    ...('overrides' in sub ? sub.overrides : {}),
  };
};

const flatConfigProps: Array<keyof FlatConfigItem> = [
  'name',
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
];

/**
 * Construct an array of ESLint flat config items.
 */
// eslint-disable-next-line max-statements, complexity
export const nivalis = async (
  options: OptionsConfig & FlatConfigItem = {},
  ...userConfigs: Array<Awaitable<UserConfigItem | UserConfigItem[]>>
): Promise<UserConfigItem[]> => {
  const {
    componentExts = [],
    gitignore: enableGitignore = true,
    graphQL: enableGraphQL = false,
    isInEditor = IN_IS_EDITOR,
    prettier: enablePrettier = true,
    react: enableReact = HAS_REACT,
    stylistic: enableStylistic = true,
    tailwindcss: enableTailwindCSS = HAS_TAILWINDCSS,
    typescript: enableTypeScript = HAS_TYPESCRIPT,
  } = options;

  const stylisticOptions =
    typeof enableStylistic === 'object' ? enableStylistic : {};

  if (stylisticOptions && !('jsx' in stylisticOptions)) {
    stylisticOptions.jsx = options.jsx ?? true;
  }

  const configs: Array<Awaitable<FlatConfigItem[]>> = [];

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then(mod => [
          mod(enableGitignore),
        ]),
      );
    } else if (fs.existsSync('.gitignore')) {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then(mod => [
          mod(),
        ]),
      );
    }
  }

  // Base configs
  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: getOverrides(options, 'javascript'),
    }),
    comments(),
    node(),
    jsdoc({
      stylistic: stylisticOptions,
    }),
    imports({
      stylistic: stylisticOptions,
    }),
    unicorn(),

    // Optional plugins (installed but not enabled by default)
    perfectionist(),
  );

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...resolveSubOptions(options, 'typescript'),
        componentExts,
        overrides: getOverrides(options, 'typescript'),
      }),
    );
  }

  if (options.test) {
    configs.push(
      test({
        isInEditor,
        overrides: getOverrides(options, 'test'),
      }),
    );
  }

  if (enableGraphQL) {
    configs.push(
      graphql({
        overrides: getOverrides(options, 'graphQL'),
      }),
    );
  }

  if (enableReact) {
    configs.push(
      react({
        overrides: getOverrides(options, 'react'),
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableTailwindCSS) {
    configs.push(
      tailwindcss({
        ...resolveSubOptions(options, 'tailwindcss'),
        overrides: getOverrides(options, 'tailwindcss'),
      }),
    );
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (options.yaml ?? true) {
    configs.push(
      yaml({
        overrides: getOverrides(options, 'yaml'),
        stylistic: stylisticOptions,
      }),
    );
  }

  if (options.toml ?? true) {
    configs.push(
      toml({
        overrides: getOverrides(options, 'toml'),
        stylistic: stylisticOptions,
      }),
    );
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        componentExts,
        overrides: getOverrides(options, 'markdown'),
      }),
    );
  }

  if (options.formatters) {
    configs.push(
      formatters(
        options.formatters,
        typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
      ),
    );
  }

  if (enableStylistic) {
    configs.push(
      stylistic({
        ...stylisticOptions,
        overrides: getOverrides(options, 'stylistic'),
      }),
    );
  }

  if (enablePrettier) {
    configs.push(prettier());
  }

  /* User can optionally pass a flat config item to the first argument
     We pick the known keys as ESLint would do schema validation */
  const fusedConfig = flatConfigProps.reduce<FlatConfigItem>((acc, key) => {
    if (key in options) {
      // eslint-disable-next-line no-param-reassign
      acc[key] = options[key] as any;
    }

    return acc;
  }, {});

  if (Object.keys(fusedConfig).length > 0) {
    configs.push([fusedConfig]);
  }

  const merged = combine(...configs, ...userConfigs);

  return merged;
};
