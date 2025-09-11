import { atomWithStorage } from 'jotai/utils';
import type { Locale } from '../types';

export const localeAtom = atomWithStorage<Locale>('lang', 'en', undefined, {
  getOnInit: true,
});
