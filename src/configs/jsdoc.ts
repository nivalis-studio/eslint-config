import pluginJsdoc from 'eslint-plugin-jsdoc';
import type { Linter } from 'eslint';

export const jsdoc = (): Linter.Config[] => {
  return [
    {
      ...pluginJsdoc.configs['flat/recommended'],
      name: 'nivalis/jsdoc/recommended',
    },
    {
      name: 'nivalis/jsdoc/rules',
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',

        'jsdoc/multiline-blocks': 'off',
        'jsdoc/check-alignment': 'off',
        'jsdoc/require-jsdoc': 'off',
      },
    },
  ];
};
