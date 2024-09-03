declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint } from 'eslint';
  const plugin: Omit<ESLint.Plugin, 'configs'> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: { [key: string]: ESLint.ConfigData };
  };

  export default plugin;
}

declare module '@next/eslint-plugin-next' {
  const plugin: Omit<ESLint.Plugin, 'configs'> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: { [key: string]: ESLint.ConfigData };
  };

  export default plugin;
}

declare module 'eslint-plugin-tailwindcss' {
  const plugin: Omit<ESLint.Plugin, 'configs'> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: { [key: string]: ESLint.ConfigData };
  };

  export default plugin;
}
