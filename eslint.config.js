// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate';
import JITI from 'jiti';

const jiti = JITI(import.meta.url);
/**
 * @type {import('./src').default}
 */
const nivalis = jiti('./src').default;

export default nivalis(
  {
    ignores: ['fixtures', '_fixtures'],
    formatters: true,
  },
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
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
);
