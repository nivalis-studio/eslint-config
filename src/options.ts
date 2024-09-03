import type { VendoredPrettierOptions } from './prettier-types';

export type TSConfigOptions =
  | false
  | null
  | undefined
  | {
      disableTypeChecking?: boolean;
    };

export type FormatConfigOptions =
  | false
  | null
  | undefined
  | {
      formatter?: 'dprint' | 'prettier';
      options?: VendoredPrettierOptions;
    };

export type OptionsTailwindCSS =
  | false
  | null
  | undefined
  | {
      // Defaults to 'tailwind.config.ts'
      configPath?: string;
    };

export type ConfigOptions =
  | {
      nextjs?: boolean | undefined | null;
      typescript?: TSConfigOptions;
      tailwindcss?: OptionsTailwindCSS;
      ignores?: string[];
      format?: FormatConfigOptions;
    }
  | undefined;
