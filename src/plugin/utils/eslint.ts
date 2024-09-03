import { ESLintUtils } from '@typescript-eslint/utils';

const { getParserServices } = ESLintUtils;

const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/nivalis-studio/eslint-config/blob/main/src/plugin/rules/${name}.ts`,
);

export { createRule, getParserServices };
