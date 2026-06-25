import { useSetAtom } from 'jotai';
import { dialogAtom } from './atoms';
import type {
  DialogAPI,
  OpenAlertDialogFn,
  OpenConfirmDialogFn,
  OpenPromptDialogFn,
} from './types';

export function useDialogs(): DialogAPI {
  const setDialog = useSetAtom(dialogAtom);

  const alert: OpenAlertDialogFn = async (message, options) => {
    const props = {
      ...options,
      message,
      isOpen: true,
    };
    return new Promise<void>((rs) => {
      setDialog({
        type: 'alert',
        props: {
          ...props,
          onClose: () => {
            props.onClose?.();
            setDialog({ type: 'alert', props: { ...props, isOpen: false } });
            rs();
          },
        },
      });
    });
  };

  const confirm: OpenConfirmDialogFn = async (message, options = {}) => {
    const props = {
      ...options,
      message,
      isOpen: true,
    };
    return new Promise((rs) => {
      setDialog({
        type: 'confirm',
        props: {
          ...props,
          onClose: (result) => {
            props.onClose?.(result);
            setDialog({ type: 'confirm', props: { ...props, isOpen: false } });
            rs(result);
          },
        },
      });
    });
  };

  const prompt: OpenPromptDialogFn = async (message, options = {}) => {
    const props = {
      ...options,
      message,
      isOpen: true,
    };
    return new Promise((rs) => {
      setDialog({
        type: 'prompt',
        props: {
          ...props,
          onClose: (result) => {
            props.onClose?.(result);
            setDialog({ type: 'prompt', props: { ...props, isOpen: false } });
            rs(result);
          },
        },
      });
    });
  };

  return {
    alert,
    confirm,
    prompt,
  };
}
