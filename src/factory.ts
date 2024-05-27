/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable ts/no-unsafe-return */
import fs from 'node:fs';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import {
  comments,
  graphql,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  neverthrow,
  nextjs,
  node,
  perfectionist,
  prettier,
  react,
  solid,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  svelte,
  tailwindcss,
  test,
  toml,
  typescript,
  unicorn,
  yaml,
} from './configs';
import { interopDefault } from './utils';
import { formatters } from './configs/formatters';
import {
  HAS_NEXTJS,
  HAS_REACT,
  HAS_TAILWINDCSS,
  HAS_TYPESCRIPT,
  IN_IS_EDITOR,
} from './environment';
import type { Linter } from 'eslint';
import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from './types';

const flatConfigProps: Array<keyof TypedFlatConfigItem> = [
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

export const defaultPluginRenaming = {
  '@stylistic': 'style',
  '@typescript-eslint': 'ts',
  'import-x': 'import',
  n: 'node',
  vitest: 'test',
  yml: 'yaml',
};

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

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export const nivalis = async (
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Array<
    Awaitable<
      | TypedFlatConfigItem
      | TypedFlatConfigItem[]
      | FlatConfigComposer<any, any>
      | Linter.FlatConfig[]
    >
  >
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> => {
  const {
    autoRenamePlugins = true,
    componentExts = [],
    gitignore: enableGitignore = true,
    graphQL: enableGraphQL = false,
    isInEditor = IN_IS_EDITOR,
    neverthrow: enableNeverthrow = false,
    prettier: enablePrettier = true,
    quiet: isInQuietMode = false,
    react: enableReact = HAS_REACT,
    solid: enableSolid = false,
    stylistic: enableStylistic = true,
    svelte: enableSvelte = false,
    tailwindcss: enableTailwindCSS = HAS_TAILWINDCSS,
    typescript: enableTypeScript = HAS_TYPESCRIPT,
  } = options;

  const stylisticOptions =
    typeof enableStylistic === 'object' ? enableStylistic : {};

  if (stylisticOptions && !('jsx' in stylisticOptions)) {
    stylisticOptions.jsx = options.jsx ?? true;
  }

  const configs: Array<Awaitable<TypedFlatConfigItem[]>> = [];

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
      isInQuietMode,
      overrides: getOverrides(options, 'javascript'),
    }),
    comments({ isInQuietMode }),
    node(),
    jsdoc({
      isInQuietMode,
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
        isInQuietMode,
        overrides: getOverrides(options, 'typescript'),
      }),
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
        isInQuietMode,
        overrides: getOverrides(options, 'react'),
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (HAS_NEXTJS) {
    configs.push(
      nextjs({
        isInQuietMode,
      }),
    );
  }

  if (enableSolid) {
    configs.push(
      solid({
        overrides: getOverrides(options, 'solid'),
        tsconfigPath: getOverrides(options, 'typescript')?.tsconfigPath,
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableSvelte) {
    configs.push(
      svelte({
        overrides: getOverrides(options, 'svelte'),
        stylistic: stylisticOptions,
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableNeverthrow) {
    configs.push(neverthrow());
  }

  if (enableTailwindCSS) {
    configs.push(
      tailwindcss({
        ...resolveSubOptions(options, 'tailwindcss'),
        isInQuietMode,
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

  if (enablePrettier) {
    configs.push(prettier());
  }

  /* User can optionally pass a flat config item to the first argument
     We pick the known keys as ESLint would do schema validation */
  const fusedConfig = flatConfigProps.reduce<TypedFlatConfigItem>(
    (acc, key) => {
      if (key in options) {
        // eslint-disable-next-line no-param-reassign
        acc[key] = options[key] as any;
      }

      return acc;
    },
    {},
  );

  if (Object.keys(fusedConfig).length > 0) {
    configs.push([fusedConfig]);
  }

  let pipeline = new FlatConfigComposer<TypedFlatConfigItem>();

  pipeline = pipeline.append(
    ...configs,
    ...(userConfigs as TypedFlatConfigItem[]),
  );

  if (autoRenamePlugins) {
    pipeline = pipeline.renamePlugins(defaultPluginRenaming);
  }

  return pipeline;
};
