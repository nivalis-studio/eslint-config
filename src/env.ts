/* eslint-disable no-process-env */
import process from 'node:process';
import {isPackageExists} from 'local-pkg';

export const isInEditor =
	(process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI;
export const hasTypeScript = isPackageExists('typescript');
export const hasReact = isPackageExists('react');
export const hasNextjs = isPackageExists('next');
export const hasTailwindcss = isPackageExists('tailwindcss');
export const hasGraphql = isPackageExists('graphql');
