import type { Awaitable } from './types';

export const interopDefault = async <T>(
  module_: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> => {
  const resolved = await module_;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return (resolved as any).default || resolved;
};
