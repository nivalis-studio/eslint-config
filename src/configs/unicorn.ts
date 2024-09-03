import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import type { Linter } from 'eslint';

export const unicorn = (): Linter.Config[] => {
  return [
    eslintPluginUnicorn.configs['flat/recommended'],
    {
      name: 'nivalis/unicorn/rules',
      rules: {
        'unicorn/filename-case': [
          'warn',
          {
            cases: { kebabCase: true, pascalCase: true },
            ignore: [/^[A-Z]+\..*$/],
          },
        ],
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-array-callback-reference': 'warn',
        'unicorn/no-null': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/prefer-ternary': 'off',
        'unicorn/string-content': [
          'error',
          {
            patterns: {
              '(?!(?=.*(0.0.0.0|127.0.0.1|localhost|www.w3.org)))^http:': {
                message: 'Please use `https` for better security.`.',
                suggest: 'https:',
              },
            },
          },
        ],
      },
    },
  ] satisfies Linter.Config[];
};
