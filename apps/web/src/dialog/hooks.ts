import { useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { dialogAtom } from './atoms';
import AlertDialog from './molecules/AlertDialog/AlertDialog';
import ConfirmDialog from './molecules/ConfirmDialog/ConfirmDialog';
import PromptDialog from './molecules/PromptDialog/PromptDialog';
import type {
  AlertDialogProps,
  AtomState,
  ConfirmDialogProps,
  DialogHook,
  OpenAlertDialogFn,
  OpenConfirmDialogFn,
  OpenPromptDialogFn,
  PromptDialogProps,
} from './types';

export function useDialogs(): DialogHook {
  const setDialog = useSetAtom(dialogAtom);

  const alert = useCallback<OpenAlertDialogFn>(
    async (message, options = {}) => {
      return new Promise((rs) => {
        const state: AtomState<AlertDialogProps> = {
          Component: AlertDialog,
          props: {
            ...options,
            message,
            isOpen: true,
            onClose: async () => {
              await options.onClose?.();
              setDialog({
                Component: AlertDialog,
                props: {
                  ...options,
                  isOpen: false,
                },
              });
              rs();
            },
          },
        };
        setDialog(state);
      });
    },
    [setDialog],
  );

  const confirm = useCallback<OpenConfirmDialogFn>(
    async (message, options = {}) => {
      return new Promise((rs) => {
        const state: AtomState<ConfirmDialogProps> = {
          Component: ConfirmDialog,
          props: {
            ...options,
            message,
            isOpen: true,
            onClose: async (result) => {
              await options.onClose?.(result);
              setDialog({
                Component: ConfirmDialog,
                props: {
                  ...options,
                  isOpen: false,
                },
              });
              rs(result);
            },
          },
        };
        setDialog(state);
      });
    },
    [setDialog],
  );

  const prompt = useCallback<OpenPromptDialogFn>(
    async (message, options = {}) => {
      return new Promise((rs) => {
        const state: AtomState<PromptDialogProps> = {
          Component: PromptDialog,
          props: {
            ...options,
            message,
            isOpen: true,
            onClose: async (result) => {
              await options.onClose?.(result);
              setDialog({
                Component: PromptDialog,
                props: {
                  ...options,
                  isOpen: false,
                },
              });
              rs(result);
            },
          },
        };
        setDialog(state);
      });
    },
    [setDialog],
  );

  return useMemo(
    () => ({
      alert,
      confirm,
      prompt,
    }),
    [alert, confirm, prompt],
  );
}
