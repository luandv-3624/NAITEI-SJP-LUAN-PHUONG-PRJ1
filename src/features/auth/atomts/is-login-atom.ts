import { atomWithStorage } from 'jotai/utils';

export const isLoginAtom = atomWithStorage<boolean>(
  'isLogin',
  false,
  undefined,
  { getOnInit: true },
);
