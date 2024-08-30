const commitLintConfig = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': ['feat', 'fix', 'style', 'refactor', 'test', 'revert', 'build'],
};

export default commitLintConfig;
