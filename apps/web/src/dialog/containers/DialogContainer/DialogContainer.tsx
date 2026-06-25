import { useAtomValue } from 'jotai';
import { dialogAtom } from '../../atoms';
import AlertDialog from '../../components/AlertDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import PromptDialog from '../../components/PromptDialog';
import type { DialogState } from '../../types';

export default function DialogContainer() {
  const dialog = useAtomValue<DialogState | undefined>(dialogAtom);
  if (!dialog) return null;

  const { type, props } = dialog;
  switch (type) {
    case 'alert':
      return <AlertDialog {...props} />;

    case 'confirm':
      return <ConfirmDialog {...props} />;

    case 'prompt':
      return <PromptDialog {...props} />;

    default:
      return null;
  }
}
