import pluginFormat from 'eslint-plugin-format';
import { GLOB_SRC, GLOB_SRC_JS, GLOB_SRC_TS } from '../globs';
import type { FormatConfigOptions } from '../options';

export const format = (options?: FormatConfigOptions) => {
  if (options === false) {
    return [];
  }

  let config = {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    jsxSingleQuote: true,
    overrides: [
      {
        files: ['**/*.json'],
        options: { trailingComma: 'none', useTabs: false },
      },
      {
        files: ['**/*.yml', '**/*.yaml'],
        options: { singleQuote: false, useTabs: false },
      },
    ],
    printWidth: 80,
    proseWrap: 'always',
    quoteProps: 'preserve',
    requirePragma: false,
    semi: true,
    singleAttributePerLine: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    ...options?.prettierOptions,
  };

  const dprint = options?.dprint ?? false;
  const formatter: 'dprint' | 'prettier' = dprint ? 'dprint' : 'prettier';

  if (options?.dprint) {
    config = {
      indentWidth: 2,
      quoteStyle: 'preferSingle',
      useTabs: false,
      ...options.dprintOptions,
    };
  }

  const eslintConfigs: any = [
    {
      name: 'nivalis/formatter/setup',
      plugins: {
        format: pluginFormat,
      },
    },
    {
      name: 'nivalis/formatter/disable',
      rules: {
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        curly: 'off',
        'no-unexpected-multiline': 'off',

        'space-unary-word-ops': 'off',

        // Removed in version 1.0.0.
        // https://github.com/eslint/eslint/issues/1898
        'generator-star': 'off',
        'no-comma-dangle': 'off',
        'no-reserved-keys': 'off',
        'no-space-before-semi': 'off',
        'no-wrap-func': 'off',
        'space-after-function-name': 'off',
        'space-before-function-parentheses': 'off',
        'space-in-brackets': 'off',

        // Removed in version 2.0.0.
        // https://github.com/eslint/eslint/issues/5032
        'no-arrow-condition': 'off',
        'space-after-keywords': 'off',
        'space-before-keywords': 'off',
        'space-return-throw-case': 'off',

        // Deprecated since version 3.3.0.
        // https://eslint.org/docs/rules/no-spaced-func
        'no-spaced-func': 'off',

        // Deprecated since version 4.0.0.
        // https://github.com/eslint/eslint/pull/8286
        'indent-legacy': 'off',

        // Deprecated since version 8.53.0.
        // https://eslint.org/blog/2023/10/deprecating-formatting-rules/
        'array-bracket-newline': 'off',
        'array-bracket-spacing': 'off',
        'array-element-newline': 'off',
        'arrow-parens': 'off',
        'arrow-spacing': 'off',
        'block-spacing': 'off',
        'brace-style': 'off',
        'comma-dangle': 'off',
        'comma-spacing': 'off',
        'comma-style': 'off',
        'computed-property-spacing': 'off',
        'dot-location': 'off',
        'eol-last': 'off',
        'func-call-spacing': 'off',
        'function-call-argument-newline': 'off',
        'function-paren-newline': 'off',
        'generator-star-spacing': 'off',
        'implicit-arrow-linebreak': 'off',
        indent: 'off',
        'jsx-quotes': 'off',
        'key-spacing': 'off',
        'keyword-spacing': 'off',
        'linebreak-style': 'off',
        'lines-around-comment': 'off',
        'max-len': 'off',
        'max-statements-per-line': 'off',
        'multiline-ternary': 'off',
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-confusing-arrow': 'off',
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-floating-decimal': 'off',
        'no-mixed-operators': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-multi-spaces': 'off',
        'no-multiple-empty-lines': 'off',
        'no-tabs': 'off',
        'no-trailing-spaces': 'off',
        'no-whitespace-before-property': 'off',
        'nonblock-statement-body-position': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'object-property-newline': 'off',
        'one-var-declaration-per-line': 'off',
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'quote-props': 'off',
        quotes: 'off',
        'rest-spread-spacing': 'off',
        semi: 'off',
        'semi-spacing': 'off',
        'semi-style': 'off',
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': 'off',
        'space-infix-ops': 'off',
        'space-unary-ops': 'off',
        'switch-colon-spacing': 'off',
        'template-curly-spacing': 'off',
        'template-tag-spacing': 'off',
        'wrap-iife': 'off',
        'wrap-regex': 'off',
        'yield-star-spacing': 'off',

        // Deprecated since version 7.0.0.
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/CHANGELOG.md#700---2017-05-06
        'react/jsx-space-before-closing': 'off',

        '@typescript-eslint/lines-around-comment': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/block-spacing': 'off',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/comma-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/key-spacing': 'off',
        '@typescript-eslint/keyword-spacing': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/space-before-blocks': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/space-infix-ops': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',

        'unicorn/template-indent': 'off',
        'unicorn/empty-brace-spaces': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/number-literal-case': 'off',

        'react/jsx-child-element-spacing': 'off',
        'react/jsx-closing-bracket-location': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-curly-newline': 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-first-prop-new-line': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-max-props-per-line': 'off',
        'react/jsx-newline': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-multi-spaces': 'off',
        'react/jsx-tag-spacing': 'off',
        'react/jsx-wrap-multilines': 'off',
      },
    },
  ];

  if (formatter === 'dprint') {
    eslintConfigs.push(
      {
        files: [GLOB_SRC_JS],
        name: 'nivalis/formatter/drpint/js',
        rules: {
          'format/dprint': ['error', { ...config, language: 'javascript' }],
        },
      },
      {
        files: [GLOB_SRC_TS],
        name: 'nivalis/formatter/dprint/ts',
        rules: {
          'format/dprint': ['error', { ...config, language: 'typescript' }],
        },
      },
    );
  } else {
    eslintConfigs.push({
      files: [GLOB_SRC],
      name: 'nivalis/formatter/prettier',
      rules: {
        'format/prettier': ['error', config],
      },
    });
  }

  return eslintConfigs;
};
