import type { Linter } from 'eslint';
import type { FlatConfigItem } from '../src';

// Make sure they are compatible
// eslint-disable-next-line ts/consistent-type-assertions
((): Linter.FlatConfig => ({}) as FlatConfigItem)();

// eslint-disable-next-line ts/consistent-type-assertions
((): FlatConfigItem => ({}) as Linter.FlatConfig)();
