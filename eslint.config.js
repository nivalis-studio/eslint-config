// @ts-check
import { bundleRequire } from 'bundle-require';

export default bundleRequire({
  filepath: './eslint.config.ts',
  // eslint-disable-next-line unicorn/prefer-top-level-await
}).then(result => result.mod.default);
