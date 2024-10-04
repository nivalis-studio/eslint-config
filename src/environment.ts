/* eslint-disable no-constant-binary-expression */
import { isPackageExists } from 'local-pkg';

export const HAS_TYPESCRIPT = isPackageExists('typescript');
export const HAS_REACT = isPackageExists('react');
export const HAS_NEXTJS = isPackageExists('next');
export const HAS_TAILWINDCSS = isPackageExists('tailwindcss');

export const isInGitHooksOrLintStaged = (): boolean => {
  return !!(
    false ||
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  );
};

export const isInEditorEnv = (): boolean => {
  if (process.env.CI) {
    return false;
  }

  if (isInGitHooksOrLintStaged()) {
    return false;
  }

  return !!(
    false ||
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM
  );
};
