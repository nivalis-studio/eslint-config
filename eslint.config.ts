import { nivalis } from './src';

export default nivalis(
  { typescript: { configPath: './tsconfig.json' } },
  { ignores: ['src/typegen.d.ts'] },
);
