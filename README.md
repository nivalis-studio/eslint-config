# @nivalis/eslint-config

> ESLint
> [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html)
> flat config for nodejs, typescript, react, nextjs, tailwindcss, prettier...

## Installation

```bash
npm i -D @nivalis/eslint-config
```

## Setup

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
    /* your custom config */
  ],
  {
    nextjs: true,  // default is true if nextjs is installed
    prettier: true,  // default is true
    react: true,  // default is true if react is installed
    sortKeys: true,  // default is true
    tailwindcss: true,  // default is true if tailwindcss is installed
    typescript: true,  // default is true if typescript is installed
    typescriptTypecheck: true  // default is true
  },
);
```

### VSCode

```jsonc
{
  "eslint.experimental.useFlatConfig": true
}
```
