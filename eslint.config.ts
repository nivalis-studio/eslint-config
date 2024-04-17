// @ts-expect-error - This module has no types
import styleMigrate from '@stylistic/eslint-plugin-migrate';
import nivalis from './src';

export default nivalis(
  {
    react: true,
    svelte: true,
    astro: true,
    solid: true,
    typescript: true,
    formatters: true,
  },
  { ignores: ['fixtures', '_fixtures'] },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      // eslint-disable-next-line ts/no-unsafe-assignment
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
);
