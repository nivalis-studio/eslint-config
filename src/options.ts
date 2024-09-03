import type { VendoredPrettierOptions } from './prettier-types';

export type TSConfigOptions =
  | false
  | null
  | undefined
  | {
      disableTypeChecking?: boolean;
    };

export type PrettierOptions =
  | false
  | null
  | undefined
  | VendoredPrettierOptions;

export type TailwindOptions =
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
      react?: boolean | undefined | null;
      typescript?: TSConfigOptions;
      tailwindcss?: TailwindOptions;
      ignores?: string[];
      prettier?: PrettierOptions;
    }
  | undefined;
