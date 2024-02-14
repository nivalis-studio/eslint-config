import { interopDefault } from '../utils';
import { pluginAntfu } from '../plugins';
import { DEFAULT_INDENT, PADDING_LINES } from '../constants';
import { GLOB_SRC } from '../globs';
import type {
  FlatConfigItem,
  OptionsOverrides,
  StylisticConfig,
} from '../types';

export const StylisticConfigDefaults: StylisticConfig = {
  blockSpacing: true,
  indent: DEFAULT_INDENT,
  jsx: true,
  quotes: 'single',
  semi: true,
};

export const stylistic = async (
  options: StylisticConfig & OptionsOverrides = {},
): Promise<FlatConfigItem[]> => {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const pluginStylistic = await interopDefault(
    import('@stylistic/eslint-plugin'),
  );

  const config = pluginStylistic.configs.customize({
    arrowParens: false,
    blockSpacing: true,
    braceStyle: '1tbs',
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quoteProps: 'as-needed',
    quotes,
    semi,
  });

  return [
    {
      name: 'nivalis:stylistic',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'antfu/consistent-list-newline': 'error',
        'antfu/top-level-function': 'off',

        curly: ['error', 'multi-line', 'consistent'],
        'style/jsx-curly-brace-presence': [
          'error',
          {
            children: 'ignore',
            propElementValues: 'always',
            props: 'never',
          },
        ],
        'style/jsx-pascal-case': [
          'error',
          {
            allowAllCaps: true,
            ignore: [],
          },
        ],
        'style/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            ignoreCase: true,
            locale: 'auto',
            multiline: 'last',
            noSortAlphabetically: true,
            reservedFirst: true,
            shorthandFirst: true,
            shorthandLast: false,
          },
        ],
        'style/no-multiple-empty-lines': [
          'error',
          { max: 1, maxBOF: 0, maxEOF: 0 },
        ],
        'style/padding-line-between-statements': ['error', ...PADDING_LINES],

        ...overrides,
      },
    },
  ];
};

export const prettierStylistic = (): FlatConfigItem[] => [
  {
    files: [GLOB_SRC],
    // Rules disabled by Prettier normally
    rules: {
      'style/array-bracket-newline': 'off',
      'style/array-bracket-spacing': 'off',
      'style/array-element-newline': 'off',
      'style/arrow-parens': 'off',
      'style/arrow-spacing': 'off',
      'style/babel/object-curly-spacing': 'off',
      'style/babel/quotes': 'off',
      'style/babel/semi': 'off',
      'style/block-spacing': 'off',
      'style/brace-style': 'off',
      'style/comma-dangle': 'off',
      'style/comma-spacing': 'off',
      'style/comma-style': 'off',
      'style/computed-property-spacing': 'off',
      'style/curly': 'off',
      'style/dot-location': 'off',
      'style/eol-last': 'off',
      'style/func-call-spacing': 'off',
      'style/function-call-argument-newline': 'off',
      'style/function-paren-newline': 'off',
      'style/generator-star-spacing': 'off',
      'style/implicit-arrow-linebreak': 'off',
      'style/indent': 'off',
      'style/jsx-child-element-spacing': 'off',
      'style/jsx-closing-bracket-location': 'off',
      'style/jsx-closing-tag-location': 'off',
      'style/jsx-curly-newline': 'off',
      'style/jsx-curly-spacing': 'off',
      'style/jsx-equals-spacing': 'off',
      'style/jsx-first-prop-new-line': 'off',
      'style/jsx-indent': 'off',
      'style/jsx-indent-props': 'off',
      'style/jsx-max-props-per-line': 'off',
      'style/jsx-newline': 'off',
      'style/jsx-one-expression-per-line': 'off',
      'style/jsx-props-no-multi-spaces': 'off',
      'style/jsx-quotes': 'off',
      'style/jsx-tag-spacing': 'off',
      'style/jsx-wrap-multilines': 'off',
      'style/key-spacing': 'off',
      'style/keyword-spacing': 'off',
      'style/linebreak-style': 'off',
      'style/lines-around-comment': 'off',
      'style/max-len': 'off',
      'style/max-statements-per-line': 'off',
      'style/member-delimiter-style': 'off',
      'style/multiline-ternary': 'off',
      'style/new-parens': 'off',
      'style/newline-per-chained-call': 'off',
      'style/no-confusing-arrow': 'off',
      'style/no-extra-parens': 'off',
      'style/no-extra-semi': 'off',
      'style/no-floating-decimal': 'off',
      'style/no-mixed-operators': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
      'style/no-multi-spaces': 'off',
      'style/no-multiple-empty-lines': 'off',
      'style/no-tabs': 'off',
      'style/no-trailing-spaces': 'off',
      'style/no-unexpected-multiline': 'off',
      'style/no-whitespace-before-property': 'off',
      'style/nonblock-statement-body-position': 'off',
      'style/object-curly-newline': 'off',
      'style/object-curly-spacing': 'off',
      'style/object-property-newline': 'off',
      'style/one-var-declaration-per-line': 'off',
      'style/operator-linebreak': 'off',
      'style/padded-blocks': 'off',
      'style/quote-props': 'off',
      'style/quotes': 'off',
      'style/rest-spread-spacing': 'off',
      'style/semi': 'off',
      'style/semi-spacing': 'off',
      'style/semi-style': 'off',
      'style/space-before-blocks': 'off',
      'style/space-before-function-paren': 'off',
      'style/space-in-parens': 'off',
      'style/space-infix-ops': 'off',
      'style/space-unary-ops': 'off',
      'style/standard/array-bracket-even-spacing': 'off',
      'style/standard/computed-property-even-spacing': 'off',
      'style/standard/object-curly-even-spacing': 'off',
      'style/switch-colon-spacing': 'off',
      'style/template-curly-spacing': 'off',
      'style/template-tag-spacing': 'off',
      'style/type-annotation-spacing': 'off',
      'style/wrap-iife': 'off',
      'style/wrap-regex': 'off',
      'style/yield-star-spacing': 'off',
    },
  },
];
