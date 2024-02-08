/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import globals from 'globals';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import {isInEditor} from '../env';
import {paddingLines} from '../lib/padding-lines';
import {GLOB_SRC} from '../globs';
import type {FlatESLintConfig} from 'eslint-define-config';

const MAX_COMPLEXITY = 20;
const DEFAULT_IDENTATION = 2;
const MAX_CLASSES_PER_FILE = 1;
const MAX_DEPTH = 4;
const MAX_LENGTH = 80;
const MAX_NESTED_CALLBACKS = 3;
const MAX_PARAMS = 5;
const MAX_STATEMENTS = 30;

const NO_ACCESS_MODIFIER =
	'Avoid access modifiers. In Javascript modules there is no need to limit developer access to properties.';

export const javascript = (): FlatESLintConfig[] => {
	return [
		{
			files: [GLOB_SRC],
			languageOptions: {
				ecmaVersion: 'latest',
				globals: {
					...globals.browser,
					...globals.es2021,
					...globals.node,
					document: 'readonly',
					navigator: 'readonly',
					window: 'readonly',
				},
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
			},
			linterOptions: {
				reportUnusedDisableDirectives: true,
			},
			plugins: {
				'unused-imports': pluginUnusedImports,
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
				// deprecated -> moved to stylistic
				'array-bracket-newline': ['off', 'consistent'],
				// deprecated -> moved to stylistic
				'array-bracket-spacing': ['off', 'never'],
				'array-callback-return': [
					'error',
					{allowImplicit: true, checkForEach: false},
				],
				// deprecated -> moved to stylistic
				'array-element-newline': ['off', {minItems: 3, multiline: true}],
				'arrow-body-style': ['error', 'as-needed'],
				// deprecated -> moved to stylistic
				'arrow-parens': ['off', 'always'],
				// deprecated -> moved to stylistic
				'arrow-spacing': ['off', {after: true, before: true}],
				'block-scoped-var': ['error'],
				// deprecated -> moved to stylistic
				'block-spacing': ['off', 'always'],
				// deprecated -> moved to stylistic
				'brace-style': ['off', '1tbs', {allowSingleLine: true}],
				'callback-return': ['error', ['callback']],
				camelcase: [
					'error',
					{
						ignoreDestructuring: false,
						ignoreGlobals: true,
						ignoreImports: false,
						properties: 'never',
					},
				],
				'capitalized-comments': [
					'off',
					'never',
					{
						block: {
							ignoreConsecutiveComments: true,
							ignoreInlineComments: true,
							ignorePattern: '.*',
						},
						line: {
							ignoreConsecutiveComments: true,
							ignoreInlineComments: true,
							ignorePattern: '.*',
						},
					},
				],
				'class-methods-use-this': [
					'error',
					{enforceForClassFields: true, exceptMethods: []},
				],
				// deprecated -> moved to stylistic
				'comma-dangle': [
					'off',
					{
						arrays: 'always-multiline',
						exports: 'always-multiline',
						functions: 'always-multiline',
						imports: 'always-multiline',
						objects: 'always-multiline',
					},
				],
				// deprecated -> moved to stylistic
				'comma-spacing': ['off', {after: true, before: false}],
				// deprecated -> moved to stylistic
				'comma-style': ['off', 'last'],
				complexity: ['error', MAX_COMPLEXITY],
				// deprecated -> moved to stylistic
				'computed-property-spacing': ['off', 'never'],
				'consistent-return': ['off'],
				'consistent-this': ['off', 'that'],
				'constructor-super': ['error'],
				curly: ['off', 'all'],
				'default-case': ['error', {commentPattern: '(?:)'}],
				'default-case-last': ['error'],
				'default-param-last': ['off'],
				// deprecated -> moved to stylistic
				'dot-location': ['off', 'property'],
				'dot-notation': ['warn', {allowKeywords: true, allowPattern: ''}],
				// deprecated -> moved to stylistic
				'eol-last': ['off', 'always'],
				eqeqeq: ['error', 'smart'],
				'for-direction': ['error'],
				// deprecated -> moved to stylistic
				'func-call-spacing': ['off', 'never'],
				'func-name-matching': [
					'error',
					'never',
					{
						considerPropertyDescriptor: true,
						includeCommonJSModuleExports: false,
					},
				],
				'func-names': ['warn'],
				'func-style': ['error', 'expression', {allowArrowFunctions: true}],
				// deprecated -> moved to stylistic
				'function-call-argument-newline': ['off', 'consistent'],
				// deprecated -> moved to stylistic
				'function-paren-newline': ['off', 'consistent'],
				'generator-star': ['off'],
				// deprecated -> moved to stylistic
				'generator-star-spacing': ['off', 'after'],
				'getter-return': ['error', {allowImplicit: true}],
				'global-require': ['off'],
				'grouped-accessor-pairs': ['error', 'getBeforeSet'],
				'guard-for-in': ['off'],
				'handle-callback-err': ['off'],
				'id-blacklist': ['off'],
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
				'id-match': ['off'],
				// deprecated -> moved to stylistic
				'implicit-arrow-linebreak': ['off', 'beside'],
				// deprecated -> moved to stylistic
				indent: [
					'off',
					DEFAULT_IDENTATION,
					{
						ArrayExpression: 1,
						CallExpression: {
							arguments: 1,
						},
						FunctionDeclaration: {
							body: 1,
							parameters: 1,
						},
						FunctionExpression: {
							body: 1,
							parameters: 1,
						},
						ImportDeclaration: 1,
						ObjectExpression: 1,
						SwitchCase: 1,
						VariableDeclarator: 1,
						flatTernaryExpressions: false,
						ignoreComments: false,
						ignoredNodes: [
							'JSXElement',
							'JSXElement > *',
							'JSXAttribute',
							'JSXIdentifier',
							'JSXNamespacedName',
							'JSXMemberExpression',
							'JSXSpreadAttribute',
							'JSXExpressionContainer',
							'JSXOpeningElement',
							'JSXClosingElement',
							'JSXFragment',
							'JSXOpeningFragment',
							'JSXClosingFragment',
							'JSXText',
							'JSXEmptyExpression',
							'JSXSpreadChild',
						],
						offsetTernaryExpressions: false,
						outerIIFEBody: 1,
					},
				],
				'indent-legacy': [
					'off',
					DEFAULT_IDENTATION,
					{MemberExpression: 1, SwitchCase: 1},
				],
				'init-declarations': ['off', 'always'],
				// deprecated -> moved to stylistic
				'key-spacing': ['off', {afterColon: true, beforeColon: false}],
				// deprecated -> moved to stylistic
				'keyword-spacing': ['off', {after: true, before: true, overrides: {}}],
				'line-comment-position': ['off', {position: 'above'}],
				// deprecated -> moved to stylistic
				'linebreak-style': ['off', 'unix'],
				// deprecated -> moved to stylistic
				'lines-around-comment': [
					'off',
					{
						afterBlockComment: false,
						afterLineComment: false,
						allowBlockEnd: false,
						allowBlockStart: false,
						beforeBlockComment: true,
						beforeLineComment: false,
					},
				],
				'lines-around-directive': [
					'error',
					{after: 'always', before: 'always'},
				],
				// deprecated -> moved to stylistic
				'lines-between-class-members': [
					'off',
					'always',
					{exceptAfterSingleLine: true},
				],
				'max-classes-per-file': ['off', MAX_CLASSES_PER_FILE],
				'max-depth': ['error', MAX_DEPTH],
				// deprecated -> moved to stylistic
				'max-len': [
					'error',
					MAX_LENGTH,
					DEFAULT_IDENTATION,
					{
						ignoreComments: true,
						ignoreRegExpLiterals: true,
						ignoreStrings: true,
						ignoreTemplateLiterals: true,
						ignoreUrls: true,
					},
				],
				'max-lines': [
					'warn',
					{
						max: 400,
						skipBlankLines: true,
						skipComments: true,
					},
				],
				'max-lines-per-function': [
					'warn',
					{
						IIFEs: true,
						max: 200,
						skipBlankLines: true,
						skipComments: true,
					},
				],
				'max-nested-callbacks': ['error', MAX_NESTED_CALLBACKS],
				'max-params': ['error', MAX_PARAMS],
				'max-statements': ['error', MAX_STATEMENTS],
				// deprecated -> moved to stylistic
				'max-statements-per-line': ['error', {max: 1}],
				'multiline-comment-style': ['warn', 'bare-block'],
				// deprecated -> moved to stylistic
				'multiline-ternary': ['off', 'always-multiline'],
				'new-cap': [
					'warn',
					{
						capIsNew: false,
						newIsCap: true,
						properties: true,
					},
				],
				// deprecated -> moved to stylistic
				'new-parens': ['error'],
				'newline-after-var': ['off'],
				'newline-before-return': ['off'],
				// deprecated -> moved to stylistic
				'newline-per-chained-call': ['off', {ignoreChainWithDepth: 3}],
				'no-alert': 'warn',
				'no-array-constructor': ['error'],
				'no-arrow-condition': ['off'],
				'no-async-promise-executor': ['error'],
				'no-await-in-loop': ['error'],
				'no-bitwise': ['off'],
				'no-buffer-constructor': ['error'],
				'no-caller': ['error'],
				'no-case-declarations': ['error'],
				'no-catch-shadow': ['error'],
				'no-class-assign': ['error'],
				'no-comma-dangle': ['off'],
				'no-compare-neg-zero': ['error'],
				'no-cond-assign': ['error', 'always'],
				// deprecated -> moved to stylistic
				'no-confusing-arrow': [
					'off',
					{allowParens: true, onlyOneSimpleParam: false},
				],
				'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
				'no-const-assign': ['error'],
				'no-constant-condition': ['error', {checkLoops: false}],
				'no-constructor-return': ['error'],
				'no-continue': ['off'],
				'no-control-regex': ['error'],
				'no-debugger': 'warn',
				'no-delete-var': ['error'],
				'no-div-regex': ['error'],
				'no-dupe-args': ['error'],
				'no-dupe-class-members': ['error'],
				'no-dupe-else-if': ['error'],
				'no-dupe-keys': ['error'],
				'no-duplicate-case': ['error'],
				'no-duplicate-imports': ['error'],
				'no-else-return': ['error', {allowElseIf: false}],
				'no-empty': ['error', {allowEmptyCatch: true}],
				'no-empty-character-class': ['error'],
				'no-empty-function': [
					'error',
					{allow: ['arrowFunctions', 'functions']},
				],
				'no-empty-pattern': ['error'],
				'no-empty-static-block': ['error'],
				'no-eq-null': ['off'],
				'no-eval': ['error'],
				'no-ex-assign': ['error'],
				'no-extend-native': ['error'],
				'no-extra-bind': ['error'],
				'no-extra-boolean-cast': ['error'],
				'no-extra-label': ['error'],
				// deprecated -> moved to stylistic
				'no-extra-parens': [
					'off',
					'all',
					{
						conditionalAssign: true,
						enforceForArrowConditionals: false,
						ignoreJSX: 'all',
						nestedBinaryExpressions: false,
						returnAssign: false,
					},
				],
				// deprecated -> moved to stylistic
				'no-extra-semi': ['off'],
				'no-fallthrough': ['warn', {commentPattern: 'break[\\s\\w]*omitted'}],
				// deprecated -> moved to stylistic
				'no-floating-decimal': ['off'],
				'no-func-assign': ['error'],
				'no-global-assign': ['error', {exceptions: []}],
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
				'no-inline-comments': ['off'],
				'no-inner-declarations': ['error', 'functions'],
				'no-invalid-regexp': ['error', {allowConstructorFlags: ['u', 'y']}],
				'no-invalid-this': ['error'],
				'no-irregular-whitespace': ['error'],
				'no-iterator': ['error'],
				'no-label-var': ['error'],
				'no-labels': [
					'error',
					{
						allowLoop: false,
						allowSwitch: false,
					},
				],
				'no-lone-blocks': ['error'],
				'no-lonely-if': ['error'],
				'no-loop-func': ['error'],
				'no-loss-of-precision': ['error'],
				'no-magic-numbers': [
					'warn',
					{
						detectObjects: false,
						enforceConst: true,
						ignore: [],
						ignoreArrayIndexes: true,
					},
				],
				'no-misleading-character-class': ['error'],
				// deprecated -> moved to stylistic
				'no-mixed-operators': [
					'off',
					{
						allowSamePrecedence: true,
						groups: [
							['%', '**'],
							['%', '+'],
							['%', '-'],
							['%', '*'],
							['%', '/'],
							['/', '*'],
							['&', '|', '<<', '>>', '>>>'],
							['==', '!=', '===', '!=='],
							['&&', '||'],
						],
					},
				],
				'no-mixed-requires': ['off', false],
				// deprecated -> moved to stylistic
				'no-mixed-spaces-and-tabs': ['off'],
				'no-multi-assign': ['error', {ignoreNonDeclaration: false}],
				// deprecated -> moved to stylistic
				'no-multi-spaces': ['off', {ignoreEOLComments: false}],
				'no-multi-str': ['error'],
				// deprecated -> moved to stylistic
				'no-multiple-empty-lines': ['off', {max: 1, maxEOF: 1}],
				'no-native-reassign': ['off'],
				'no-negated-condition': ['error'],
				'no-negated-in-lhs': ['off'],
				'no-nested-ternary': ['off'],
				'no-new': ['error'],
				'no-new-func': ['error'],
				'no-new-native-nonconstructor': ['error'],
				'no-new-object': ['error'],
				'no-new-require': ['off'],
				'no-new-symbol': ['error'],
				'no-new-wrappers': ['error'],
				'no-nonoctal-decimal-escape': ['error'],
				'no-obj-calls': ['error'],
				'no-octal': ['error'],
				'no-octal-escape': ['error'],
				'no-param-reassign': [
					'error',
					{
						ignorePropertyModificationsFor: [],
						ignorePropertyModificationsForRegex: [],
						props: true,
					},
				],
				'no-path-concat': ['error'],
				'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
				'no-process-env': ['error'],
				'no-process-exit': ['error'],
				'no-promise-executor-return': ['error'],
				'no-proto': ['error'],
				'no-prototype-builtins': ['error'],
				'no-redeclare': ['error'],
				'no-regex-spaces': ['error'],
				'no-reserved-keys': ['off'],
				'no-restricted-exports': ['error', {restrictedNamedExports: ['then']}],
				'no-restricted-globals': [
					'off',
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
					'addEventListener',
					'blur',
					'close',
					'closed',
					'confirm',
					'defaultStatus',
					'defaultstatus',
					'event',
					'external',
					'find',
					'focus',
					'frameElement',
					'frames',
					'history',
					'innerHeight',
					'innerWidth',
					'length',
					'location',
					'locationbar',
					'menubar',
					'moveBy',
					'moveTo',
					'name',
					'onblur',
					'onerror',
					'onfocus',
					'onload',
					'onresize',
					'onunload',
					'open',
					'opener',
					'opera',
					'outerHeight',
					'outerWidth',
					'pageXOffset',
					'pageYOffset',
					'parent',
					'print',
					'removeEventListener',
					'resizeBy',
					'resizeTo',
					'screen',
					'screenLeft',
					'screenTop',
					'screenX',
					'screenY',
					'scroll',
					'scrollbars',
					'scrollBy',
					'scrollTo',
					'scrollX',
					'scrollY',
					'self',
					'status',
					'statusbar',
					'stop',
					'toolbar',
					'top',
				],
				'no-restricted-imports': ['off', {paths: [], patterns: []}],
				'no-restricted-modules': ['off'],
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
						message: 'Please use Object.defineProperty instead.',
						property: '__defineGetter__',
					},
					{
						message: 'Please use Object.defineProperty instead.',
						property: '__defineSetter__',
					},
				],
				'no-restricted-syntax': [
					'error',
					'DebuggerStatement',
					{
						message:
							'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
						selector: 'ForInStatement',
					},
					{
						message:
							'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
						selector: 'LabeledStatement',
					},
					{
						message:
							'`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
						selector: 'WithStatement',
					},
					{
						message: 'Import/export only modules you need',
						selector: ':matches(ImportNamespaceSpecifier)',
					},
					{
						selector: "Identifier[name='Reflect']",
						message:
							'Avoid the Reflect API. It is a very low-level feature that has only rare and specific use-cases if building complex and hacky libraries. There is no need to use this feature for any kind of normal development.',
					},
					{
						selector: "BinaryExpression[operator='in']",
						message:
							"Avoid the 'in' operator. In real-world scenarios there is rarely a need for this operator. For most usecases, basic property access is all you need. For every other case, use the Object.hasOwn() or the Object.prototype.hasOwnProperty() method. In the really niche cases where you actually need to check for the existence of a property both in the object itself AND in it's prototype chain, feel free to disable this rule with the inline eslint-disable syntax.",
					},
					{
						selector: "PropertyDefinition[accessibility='public']",
						message: NO_ACCESS_MODIFIER,
					},
					{
						selector: "PropertyDefinition[accessibility='protected']",
						message: NO_ACCESS_MODIFIER,
					},
					{
						selector: "PropertyDefinition[accessibility='private']",
						message: NO_ACCESS_MODIFIER,
					},
					{
						selector: "Identifier[name='PropTypes']",
						message: 'Avoid PropTypes. Use Typescript instead.',
					},
					{
						selector: "Identifier[name='propTypes']",
						message: 'Avoid PropTypes. Use Typescript instead.',
					},
					{
						selector: 'TSEnumDeclaration',
						message: 'Avoid enums.',
					},
				],
				'no-return-assign': ['error', 'always'],
				'no-return-await': 'warn',
				'no-script-url': ['error'],
				'no-self-assign': ['error', {props: true}],
				'no-self-compare': ['off'],
				'no-sequences': ['error', {allowInParentheses: false}],
				'no-setter-return': ['error'],
				'no-shadow': ['off'],
				'no-shadow-restricted-names': ['error'],
				'no-space-before-semi': ['off'],
				'no-spaced-func': ['off'],
				'no-sparse-arrays': ['error'],
				'no-sync': ['off'],
				// deprecated -> moved to stylistic
				'no-tabs': ['off'],
				'no-template-curly-in-string': ['error'],
				'no-ternary': ['off'],
				'no-this-before-super': ['error'],
				'no-throw-literal': ['error'],
				// deprecated -> moved to stylistic
				'no-trailing-spaces': [
					'error',
					{
						ignoreComments: false,
						skipBlankLines: false,
					},
				],
				'no-undef': ['error'],
				'no-undef-init': ['error'],
				'no-undefined': ['off'],
				'no-underscore-dangle': [
					'off',
					{
						allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
						allowAfterSuper: false,
						allowAfterThis: false,
						allowAfterThisConstructor: false,
						allowFunctionParams: true,
						enforceInClassFields: false,
						enforceInMethodNames: true,
					},
				],
				'no-unexpected-multiline': ['error'],
				'no-unmodified-loop-condition': ['error'],
				'no-unneeded-ternary': ['error', {defaultAssignment: false}],
				'no-unreachable': ['error'],
				'no-unreachable-loop': ['error', {ignore: []}],
				'no-unsafe-finally': ['error'],
				'no-unsafe-negation': ['error', {enforceForOrderingRelations: true}],
				'no-unsafe-optional-chaining': [
					'error',
					{disallowArithmeticOperators: true},
				],
				'no-unused-expressions': [
					'error',
					{
						allowShortCircuit: true,
						allowTaggedTemplates: true,
						allowTernary: true,
					},
				],
				'no-unused-labels': ['error'],
				'no-unused-private-class-members': ['error'],
				'no-unused-vars': 'off',
				'no-use-before-define': ['error', 'nofunc'],
				'no-useless-backreference': ['error'],
				'no-useless-call': ['error'],
				'no-useless-catch': ['error'],
				'no-useless-computed-key': ['error', {enforceForClassMembers: true}],
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
				'no-warning-comments': ['warn', {terms: ['fixme', 'todo']}],
				// deprecated -> moved to stylistic
				'no-whitespace-before-property': ['off'],
				'no-with': ['error'],
				// deprecated -> moved to stylistic
				'nonblock-statement-body-position': ['off', 'beside', {overrides: {}}],
				// deprecated -> moved to stylistic
				'object-curly-newline': [
					'off',
					{
						ExportDeclaration: {
							consistent: true,
							minProperties: 4,
							multiline: true,
						},
						ImportDeclaration: {
							consistent: true,
							minProperties: 4,
							multiline: true,
						},
						ObjectExpression: {
							consistent: true,
							minProperties: 4,
							multiline: true,
						},
						ObjectPattern: {
							consistent: true,
							minProperties: 4,
							multiline: true,
						},
					},
				],
				// deprecated -> moved to stylistic
				'object-curly-spacing': ['off', 'never'],
				// deprecated -> moved to stylistic
				'object-property-newline': [
					'off',
					{
						allowAllPropertiesOnSameLine: true,
						allowMultiplePropertiesPerLine: false,
					},
				],
				'object-shorthand': [
					'error',
					'always',
					{avoidQuotes: true, ignoreConstructors: false},
				],
				'one-var': ['off', 'never'],
				// deprecated -> moved to stylistic
				'one-var-declaration-per-line': ['error', 'initializations'],
				'operator-assignment': ['off', 'always'],
				// deprecated -> moved to stylistic
				'operator-linebreak': [
					'off',
					'after',
					{
						overrides: {
							':': 'before',
							'?': 'before',
						},
					},
				],
				// deprecated -> moved to stylistic
				'padded-blocks': [
					'off',
					{
						blocks: 'never',
						classes: 'never',
						switches: 'never',
					},
					{
						allowSingleLineBlocks: true,
					},
				],
				// deprecated -> moved to stylistic
				'padding-line-between-statements': ['off', ...paddingLines],
				'prefer-arrow-callback': [
					'error',
					{allowNamedFunctions: false, allowUnboundThis: true},
				],
				'prefer-const': [
					'warn',
					{destructuring: 'all', ignoreReadBeforeAssign: true},
				],
				'prefer-destructuring': [
					'off',
					{
						AssignmentExpression: {
							array: true,
							object: true,
						},
						VariableDeclarator: {
							array: false,
							object: true,
						},
					},
					{
						enforceForRenamedProperties: false,
					},
				],
				'prefer-exponentiation-operator': ['error'],
				'prefer-named-capture-group': ['off'],
				'prefer-numeric-literals': ['off'],
				'prefer-object-has-own': ['off'],
				'prefer-object-spread': ['off'],
				'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
				'prefer-reflect': ['off'],
				'prefer-regex-literals': ['error', {disallowRedundantWrapping: true}],
				'prefer-rest-params': ['error'],
				'prefer-spread': ['error'],
				'prefer-template': ['error'],
				// deprecated -> moved to stylistic
				'quote-props': ['off', 'as-needed', {keywords: true}],
				// deprecated -> moved to stylistic
				quotes: ['off', 'single', 'avoid-escape'],
				radix: ['error'],
				'require-atomic-updates': ['error', {allowProperties: true}],
				'require-await': ['error'],
				'require-jsdoc': ['off'],
				'require-unicode-regexp': ['off'],
				'require-yield': ['error'],
				// deprecated -> moved to stylistic
				'rest-spread-spacing': ['off', 'never'],
				// deprecated -> moved to stylistic
				semi: ['off', 'always'],
				// deprecated -> moved to stylistic
				'semi-spacing': [
					'off',
					{
						after: true,
						before: false,
					},
				],
				// deprecated -> moved to stylistic
				'semi-style': ['off', 'last'],
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
				'sort-keys': [
					'off',
					'asc',
					{
						caseSensitive: false,
						natural: true,
					},
				],
				'sort-vars': ['off'],
				'space-after-function-name': ['off'],
				'space-after-keywords': ['off'],
				// deprecated -> moved to stylistic
				'space-before-blocks': ['off', 'always'],
				// deprecated -> moved to stylistic
				'space-before-function-paren': [
					'off',
					{
						anonymous: 'never',
						asyncArrow: 'always',
						named: 'never',
					},
				],
				// deprecated -> moved to stylistic
				'space-in-parens': ['off', 'never'],
				// deprecated -> moved to stylistic
				'space-infix-ops': ['off'],
				'space-return-throw-case': ['off'],
				// deprecated -> moved to stylistic
				'space-unary-ops': [
					'off',
					{
						nonwords: false,
						words: true,
					},
				],
				'space-unary-word-ops': ['off'],
				// deprecated -> moved to stylistic
				'spaced-comment': [
					'off',
					'always',
					{
						markers: ['='],
					},
				],
				strict: ['error', 'global'],
				// deprecated -> moved to stylistic
				'switch-colon-spacing': [
					'off',
					{
						after: true,
						before: false,
					},
				],
				'symbol-description': ['error'],
				// deprecated -> moved to stylistic
				'template-curly-spacing': ['off', 'never'],
				// deprecated -> moved to stylistic
				'template-tag-spacing': ['off', 'never'],
				'unicode-bom': ['error', 'never'],
				'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',
				'unused-imports/no-unused-vars': [
					'error',
					{
						args: 'after-used',
						argsIgnorePattern: '^_',
						ignoreRestSiblings: true,
						varsIgnorePattern: '^_',
					},
				],
				'use-isnan': [
					'error',
					{enforceForIndexOf: true, enforceForSwitchCase: true},
				],
				'valid-jsdoc': ['off'],
				'valid-typeof': ['error', {requireStringLiterals: true}],
				'vars-on-top': ['error'],
				// deprecated -> moved to stylistic
				'wrap-iife': ['off', 'outside', {functionPrototypeMethods: true}],
				// deprecated -> moved to stylistic
				'wrap-regex': ['off'],
				// deprecated -> moved to stylistic
				'yield-star-spacing': [
					'off',
					{
						after: true,
						before: false,
					},
				],
				yoda: [
					'error',
					'never',
					{
						exceptRange: true,
						onlyEquality: false,
					},
				],
			},
		},
		{
			files: ['**/scripts/*', '**/cli.*'],
			rules: {
				'no-console': 'off',
			},
		},
		{
			files: ['**/*.{test,spec}.js?(x)'],
			rules: {
				'no-unused-expressions': 'off',
			},
		},
	];
};
