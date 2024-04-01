import type { Linter } from 'eslint';
import type { TypedFlatConfigItem } from '../src';

// Make sure they are compatible
// eslint-disable-next-line ts/consistent-type-assertions
((): Linter.FlatConfig => ({}) as TypedFlatConfigItem)();

// eslint-disable-next-line ts/consistent-type-assertions
((): TypedFlatConfigItem => ({}) as Linter.FlatConfig)();
