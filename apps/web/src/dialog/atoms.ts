import { atom } from 'jotai';
import type { DialogState } from './types';

export const dialogAtom = atom<DialogState | undefined>();
