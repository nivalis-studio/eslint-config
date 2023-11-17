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
export {all as default} from '@nivalis/eslint-config';
```

### Custom Config

```js
import {nivalis} from '@nivalis/eslint-config';

export default nivalis(
  [
    /* your custom configs */
  ],
  {
    nextjs: true,  // true if nextjs is installed
    prettier: true,  // true
    react: true,  // true if react is installed
    sortKeys: true,  // true
    tailwindcss: true,  // true if tailwindcss is installed
    typescript: true,  // true if typescript is installed
    typescriptTypecheck: true  // true
  },
);
```

### CommonJS

```js
const {nivalis} = require('@nivalis/eslint-config');

module.exports = nivalis(
  [
    /* your custom configs */
  ],
  {
    nextjs: true,  // true if nextjs is installed
    prettier: true,  // true
    react: true,  // true if react is installed
    sortKeys: true,  // true
    tailwindcss: true,  // true if tailwindcss is installed
    typescript: true,  // true if typescript is installed
    typescriptTypecheck: true  // true
  },
);
```

### VSCode

```jsonc
{
  "eslint.experimental.useFlatConfig": true
}
```
