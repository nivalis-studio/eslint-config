import { isPackageExists } from 'local-pkg';

export const HAS_TYPESCRIPT = isPackageExists('typescript');
export const HAS_REACT = isPackageExists('react');
export const HAS_NEXTJS = isPackageExists('next');
export const HAS_TAILWINDCSS = isPackageExists('tailwindcss');
