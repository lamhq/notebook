import { useAtomValue } from 'jotai';
import { dialogAtom } from '../../atoms';
import type { AtomState, BaseDialogProps } from '../../types';

export default function Dialog() {
  const dialog = useAtomValue<AtomState<BaseDialogProps> | undefined>(dialogAtom);
  if (!dialog) {
    return null;
  }
  const { Component, props } = dialog;
  return <Component {...props} />;
}
