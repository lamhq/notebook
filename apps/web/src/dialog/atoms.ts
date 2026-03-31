import { atom } from 'jotai';
import type { AtomState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dialogAtom = atom<AtomState<any> | undefined>();
