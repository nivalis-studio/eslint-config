/* eslint-disable max-lines */
import globals from 'globals';
import { pluginAntfu, pluginUnusedImports } from '../plugins';
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import {
  MAX_COMPLEXITY,
  MAX_LINES,
  MAX_LINES_PER_FUNCTION,
  MAX_NESTED_CALLBACKS,
  MAX_PARAMS,
  MAX_STATEMENTS,
} from '../constants';
import type {
  OptionsIsInEditor,
  OptionsIsQuiet,
  OptionsOverrides,
  TypedFlatConfigItem,
} from '../types';
import type { ESLint } from 'eslint';

// eslint-disable-next-line max-lines-per-function
export const javascript = (
  options: OptionsIsInEditor & OptionsIsQuiet & OptionsOverrides = {},
): TypedFlatConfigItem[] => {
  const { isInEditor = false, isInQuietMode = false, overrides = {} } = options;

  return [
    {
      files: [GLOB_SRC],
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: !isInQuietMode,
      },
      name: 'nivalis/javascript/rules',
      plugins: {
        antfu: pluginAntfu,
        'unused-imports': pluginUnusedImports as unknown as ESLint.Plugin,
      },
      rules: {
        'accessor-pairs': [
          'error',
          {
            enforceForClassMembers: true,
            getWithoutSet: false,
            setWithoutGet: true,
          },
        ],
        'array-callback-return': [
          'error',
          { allowImplicit: true, checkForEach: false },
        ],
        'block-scoped-var': 'error',
        camelcase: [
          'error',
          {
            ignoreDestructuring: false,
            ignoreGlobals: true,
            ignoreImports: false,
            properties: 'never',
          },
        ],
        'class-methods-use-this': [
          'error',
          { enforceForClassFields: true, exceptMethods: [] },
        ],
        complexity: ['error', MAX_COMPLEXITY],
        'constructor-super': 'error',
        'default-case': ['error', { commentPattern: '(?:)' }],
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        eqeqeq: ['error', 'smart'],
        'for-direction': ['error'],
        'func-name-matching': [
          'error',
          'never',
          {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: false,
          },
        ],
        'func-names': [isInQuietMode ? 'off' : 'warn'],
        'func-style': ['error', 'expression', { allowArrowFunctions: true }],
        'getter-return': ['error', { allowImplicit: true }],
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],
        'id-denylist': ['error', 'native'],
        'id-length': [
          'error',
          {
            exceptions: ['_', 'i', 'j', 'k', 'x', 'y', 'z'],
            max: 30,
            min: 2,
            properties: 'never',
          },
        ],
        'max-lines': [
          isInQuietMode ? 'off' : 'warn',
          {
            max: MAX_LINES,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-lines-per-function': [
          isInQuietMode ? 'off' : 'warn',
          {
            IIFEs: true,
            max: MAX_LINES_PER_FUNCTION,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-nested-callbacks': ['error', MAX_NESTED_CALLBACKS],
        'max-params': ['error', MAX_PARAMS],
        'max-statements': ['error', MAX_STATEMENTS],
        'new-cap': [
          isInQuietMode ? 'off' : 'warn',
          {
            capIsNew: false,
            newIsCap: true,
            properties: true,
          },
        ],
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': ['error'],
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': ['error'],
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': [
          isInQuietMode ? 'off' : 'warn',
          { allow: ['warn', 'error'] },
        ],
        'no-const-assign': 'error',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-constructor-return': ['error'],
        'no-control-regex': 'error',
        'no-debugger': [isInQuietMode ? 'off' : 'warn'],
        'no-delete-var': 'error',
        'no-div-regex': ['error'],
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': ['error'],
        'no-dupe-keys': 'error',
        'no-duplicate-case': ['error'],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-function': [
          'error',
          { allow: ['arrowFunctions', 'functions'] },
        ],
        'no-empty-pattern': 'error',
        'no-empty-static-block': ['error'],
        'no-eval': ['error'],
        'no-ex-assign': ['error'],
        'no-extend-native': ['error'],
        'no-extra-bind': ['error'],
        'no-extra-boolean-cast': ['error'],
        'no-extra-label': ['error'],
        'no-fallthrough': [
          isInQuietMode ? 'off' : 'warn',
          { commentPattern: 'break[\\s\\w]*omitted' },
        ],
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': [
          'error',
          {
            allow: [],
            boolean: false,
            disallowTemplateShorthand: false,
            number: true,
            string: true,
          },
        ],
        'no-implicit-globals': ['error'],
        'no-implied-eval': ['error'],
        'no-import-assign': ['error'],
        'no-inner-declarations': ['error', 'functions'],
        'no-invalid-regexp': ['error', { allowConstructorFlags: ['u', 'y'] }],
        'no-invalid-this': ['error'],
        'no-irregular-whitespace': 'error',
        'no-iterator': ['error'],
        'no-label-var': ['error'],
        'no-labels': [
          'error',
          {
            allowLoop: false,
            allowSwitch: false,
          },
        ],
        'no-lone-blocks': 'error',
        'no-lonely-if': ['error'],
        'no-loop-func': ['error'],
        'no-loss-of-precision': ['error'],
        'no-magic-numbers': [
          isInQuietMode ? 'off' : 'warn',
          {
            detectObjects: false,
            enforceConst: true,
            ignore: [0, 1, -1],
            ignoreArrayIndexes: true,
          },
        ],
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-negated-condition': ['error'],
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': ['error'],
        'no-new-symbol': 'error',
        'no-new-wrappers': ['error'],
        'no-nonoctal-decimal-escape': ['error'],
        'no-obj-calls': ['error'],
        'no-octal': ['error'],
        'no-octal-escape': ['error'],
        'no-param-reassign': [
          'error',
          {
            ignorePropertyModificationsFor: [
              'accumulator',
              'ctx',
              'context',
              'req',
              'request',
              'res',
              'response',
              '$scope',
              'staticContext',
            ],
            ignorePropertyModificationsForRegex: [],
            props: true,
          },
        ],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-promise-executor-return': ['error'],
        'no-proto': ['error'],
        'no-prototype-builtins': ['error'],
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-regex-spaces': ['error'],
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
          {
            message:
              'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
            name: 'isFinite',
          },
          {
            message:
              'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
            name: 'isNaN',
          },
        ],
        'no-restricted-properties': [
          'error',
          {
            message: 'Symbol.for is unshimmable',
            object: 'Symbol',
            property: 'for',
          },
          {
            message: 'arguments.callee is deprecated',
            object: 'arguments',
            property: 'callee',
          },
          {
            message:
              'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__',
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineGetter__',
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineSetter__',
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupGetter__',
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupSetter__',
          },
          {
            message: 'Use Number.isFinite instead',
            object: 'global',
            property: 'isFinite',
          },
          {
            message: 'Use Number.isFinite instead',
            object: 'self',
            property: 'isFinite',
          },
          {
            message: 'Use Number.isFinite instead',
            object: 'window',
            property: 'isFinite',
          },
          {
            message: 'Use Number.isNaN instead',
            object: 'global',
            property: 'isNaN',
          },
          {
            message: 'Use Number.isNaN instead',
            object: 'self',
            property: 'isNaN',
          },
          {
            message: 'Use Number.isNaN instead',
            object: 'window',
            property: 'isNaN',
          },
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'ForInStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
          {
            message: 'Import/export only modules you need',
            selector: ':matches(ImportNamespaceSpecifier)',
          },
          {
            message: 'Avoid PropTypes. Use Typescript instead.',
            selector: "Identifier[name='PropTypes']",
          },
          {
            message: 'Avoid PropTypes. Use Typescript instead.',
            selector: "Identifier[name='propTypes']",
          },
        ],
        'no-return-assign': ['error', 'always'],
        'no-script-url': ['error'],
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': ['error', { allowInParentheses: false }],
        'no-setter-return': ['error'],
        'no-shadow': [
          isInQuietMode ? 'off' : 'warn',
          {
            allow: ['resolve', 'reject', 'done', 'next', 'err', 'error', 'cb'],
            builtinGlobals: false,
            hoist: 'functions',
          },
        ],
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unexpected-multiline': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],
        'no-unsafe-optional-chaining': [
          'error',
          { disallowArithmeticOperators: true },
        ],
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
            enforceForJSX: true,
          },
        ],
        'no-unused-labels': ['error'],
        'no-unused-private-class-members': ['error'],
        'no-unused-vars': [
          'error',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],
        'no-use-before-define': [
          'error',
          {
            allowNamedExports: false,
            classes: false,
            functions: false,
            variables: true,
          },
        ],
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
        'no-useless-concat': ['error'],
        'no-useless-constructor': ['error'],
        'no-useless-escape': ['error'],
        'no-useless-rename': [
          'error',
          {
            ignoreDestructuring: false,
            ignoreExport: false,

            ignoreImport: false,
          },
        ],
        'no-useless-return': ['error'],
        'no-var': ['error'],
        'no-void': ['error'],
        'no-warning-comments': [
          isInQuietMode ? 'off' : 'warn',
          { terms: ['fixme', 'todo'] },
        ],
        'no-with': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'one-var': ['error', { initialized: 'never' }],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          isInQuietMode ? 'off' : 'warn',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        radix: ['error'],
        'require-atomic-updates': ['error', { allowProperties: true }],
        'require-await': ['error'],
        'require-yield': ['error'],
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        strict: ['error', 'safe'],
        'symbol-description': ['error'],
        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        'use-isnan': [
          'error',
          { enforceForIndexOf: true, enforceForSwitchCase: true },
        ],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        yoda: [
          'error',
          'never',
          {
            exceptRange: true,
            onlyEquality: false,
          },
        ],

        ...overrides,
      },
    },
    {
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      name: 'nivalis/javascript/disables/cli',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [`**/*.{test,spec}.${GLOB_SRC_EXT}`],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: [`**/.prettierrc.${GLOB_SRC_EXT}`],
      rules: {
        strict: 'off',
      },
    },
  ];
};
