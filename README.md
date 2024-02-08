# @nivalis/eslint-config

> ESLint
> [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html)
> flat config for nodejs, typescript, react, nextjs, tailwindcss, prettier...

## Installation

```bash
npm i -D @nivalis/eslint-config
```

## Usage

```js
// eslint.config.js
import {nivalis} from '@nivalis/eslint-config';

export default nivalis();
```

```jsonc
// package.json
{
  // ...
  "type": "module"
}
```

### Custom Config

```js
import {nivalis} from '@nivalis/eslint-config';
import anotherConfig from 'another-config';
import anotherPlugin from 'another-plugin';

export default nivalis(
  [
    /* ignore some files */
    {
      ignores: ['tsup.config.ts'],
    },

    /* disable some rules */
    {
      rules: {
        'no-console': 'off',
      },
    },

    /* add another config */
    anotherConfig,

    /* add another plugin */
    {
      plugins: [anotherPlugin],
      rules: {
        // custom rules...
      },
    }
  ],
  {
    gitignore: true,
    graphql: false, // true if graphql is installed
    nextjs: false,  // true if nextjs is installed
    prettier: true,
    react: true,  // true if react is installed
    sortKeys: false, // disabled by default
    stylistic: false, // disabled by default
    tailwindcss: true,  // true if tailwindcss is installed
    typescript: true,  // true if typescript is installed
    typescriptTypecheck: true  // true if typescript is installed
  },
);
```

### CommonJS

```js
// eslint-disable-next-line unicorn/prefer-module
const {nivalis} = require('@nivalis/eslint-config');

// eslint-disable-next-line unicorn/prefer-module
module.exports = nivalis(
  [
    /* your custom configs */
  ],
  {
    gitignore: true,
    graphql: false, // true if graphql is installed
    nextjs: false,  // true if nextjs is installed
    prettier: true,
    react: true,  // true if react is installed
    sortKeys: false, // disabled by default
    stylistic: false, // disabled by default
    tailwindcss: true,  // true if tailwindcss is installed
    typescript: true,  // true if typescript is installed
    typescriptTypecheck: true  // true if typescript is installed
  },
);
```

### VSCode

```jsonc
{
  "eslint.experimental.useFlatConfig": true
}
```
