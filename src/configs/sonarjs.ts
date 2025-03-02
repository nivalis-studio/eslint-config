import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import type { Linter } from 'eslint';
import type { TSConfigOptions } from '../options';

export const sonarjs = (options?: TSConfigOptions): Linter.Config[] => {
  const config = [
    {
      ...eslintPluginSonarjs.configs.recommended,
      name: 'nivalis/sonarjs/recommended',
    },
    {
      name: 'nivalis/sonarjs/rules',
      rules: {
        'sonarjs/todo-tag': 'off',
        'sonarjs/fixme-tag': 'off',
        'sonarjs/no-unused-vars': 'off',
        'sonarjs/no-commented-code': 'off',
        'sonarjs/max-lines': 'off',
        'sonarjs/different-types-comparison': 'off',
        // This rule is really slow (slower than prettier)
        'sonarjs/sonarjs/deprecation': 'off',
      },
    },
  ] satisfies Linter.Config[];

  if (options && options.disableTypeChecking === true) {
    config.push({
      name: 'nivalis/sonarjs/disables/type-checking',
      rules: {
        'sonarjs/anchor-precedence': 'off',
        'sonarjs/argument-type': 'off',
        'sonarjs/arguments-order': 'off',
        'sonarjs/class-prototype': 'off',
        'sonarjs/concise-regex': 'off',
        'sonarjs/deprecation': 'off',
        'sonarjs/different-types-comparison': 'off',
        'sonarjs/disabled-auto-escaping': 'off',
        'sonarjs/disabled-resource-integrity': 'off',
        'sonarjs/duplicates-in-character-class': 'off',
        'sonarjs/empty-string-repetition': 'off',
        'sonarjs/existing-groups': 'off',
        'sonarjs/function-return-type': 'off',
        'sonarjs/in-operator-type-error': 'off',
        'sonarjs/index-of-compare-to-positive-number': 'off',
        'sonarjs/jsx-no-leaked-render': 'off',
        'sonarjs/new-operator-misuse': 'off',
        'sonarjs/no-alphabetical-sort': 'off',
        'sonarjs/no-array-delete': 'off',
        'sonarjs/no-associative-arrays': 'off',
        'sonarjs/no-collection-size-mischeck': 'off',
        'sonarjs/no-control-regex': 'off',
        'sonarjs/no-empty-after-reluctant': 'off',
        'sonarjs/no-empty-alternatives': 'off',
        'sonarjs/no-empty-character-class': 'off',
        'sonarjs/no-empty-group': 'off',
        'sonarjs/no-for-in-iterable': 'off',
        'sonarjs/no-ignored-return': 'off',
        'sonarjs/no-in-misuse': 'off',
        'sonarjs/no-incorrect-string-concat': 'off',
        'sonarjs/no-invalid-await': 'off',
        'sonarjs/no-invalid-regexp': 'off',
        'sonarjs/no-misleading-array-reverse': 'off',
        'sonarjs/no-misleading-character-class': 'off',
        'sonarjs/no-redundant-optional': 'off',
        'sonarjs/no-regex-spaces': 'off',
        'sonarjs/no-require-or-define': 'off',
        'sonarjs/no-return-type-any': 'off',
        'sonarjs/no-selector-parameter': 'off',
        'sonarjs/no-try-promise': 'off',
        'sonarjs/no-undefined-argument': 'off',
        'sonarjs/no-useless-intersection': 'off',
        'sonarjs/non-number-in-arithmetic-expression': 'off',
        'sonarjs/operation-returning-nan': 'off',
        'sonarjs/post-message': 'off',
        'sonarjs/prefer-read-only-props': 'off',
        'sonarjs/prefer-regexp-exec': 'off',
        'sonarjs/reduce-initial-value': 'off',
        'sonarjs/regex-complexity': 'off',
        'sonarjs/single-char-in-character-classes': 'off',
        'sonarjs/single-character-alternation': 'off',
        'sonarjs/slow-regex': 'off',
        'sonarjs/strings-comparison': 'off',
        'sonarjs/unicode-aware-regex': 'off',
        'sonarjs/unused-import': 'off',
        'sonarjs/unused-named-groups': 'off',
        'sonarjs/useless-string-operation': 'off',
        'sonarjs/values-not-convertible-to-numbers': 'off',
        'sonarjs/void-use': 'off',
        'sonarjs/web-sql-database': 'off',
      },
    });
  }

  return config;
};
