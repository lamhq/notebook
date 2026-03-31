import { atom } from 'jotai';
import type { AlertItem } from './types';

const initialState: AlertItem[] = [];

export const alertAtom = atom(initialState);
