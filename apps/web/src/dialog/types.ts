import type { ComponentType } from 'react';

// #region DialogHooks
export type DialogHook = {
  alert: OpenAlertDialogFn;
  confirm: OpenConfirmDialogFn;
  prompt: OpenPromptDialogFn;
};

/**
 * Open an alert dialog. Returns a promise that resolves when the user
 * closes the dialog.
 *
 * @param message The message to show in the dialog.
 * @param options Additional options for the dialog.
 * @returns A promise that resolves when the dialog is closed.
 */
export type OpenAlertDialogFn = (
  message: AlertDialogProps['message'],
  options?: Partial<Omit<AlertDialogProps, 'isOpen' | 'message'>>,
) => Promise<void>;

/**
 * Open a confirmation dialog. Returns a promise that resolves to true if
 * the user confirms, false if the user cancels.
 *
 * @param message The message to show in the dialog.
 * @param options Additional options for the dialog.
 * @returns A promise that resolves to true if the user confirms, false if the user cancels.
 */
export type OpenConfirmDialogFn = (
  message: ConfirmDialogProps['message'],
  options?: Partial<Omit<ConfirmDialogProps, 'isOpen' | 'message'>>,
) => Promise<boolean>;

/**
 * Open a prompt dialog to request user input. Returns a promise that resolves to the input
 * if the user confirms, undefined if the user cancels.
 *
 * @param message The message to show in the dialog.
 * @param options Additional options for the dialog.
 * @returns A promise that resolves to the user input if the user confirms, undefined if the user cancels.
 */
export type OpenPromptDialogFn = (
  message: PromptDialogProps['message'],
  options?: Partial<Omit<PromptDialogProps, 'isOpen' | 'message'>>,
) => Promise<string | undefined>;
// #endregion

// #region DialogProps
type TextType = string;

export type BaseDialogProps = {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Content for the dialog.
   */
  message: TextType;

  /**
   * Title for the dialog. Defaults to `'Alert'`.
   */
  title?: TextType;

  /**
   * The text to show in the "Ok" button. Defaults to `'Ok'`.
   */
  okText?: TextType;
};

export type AlertDialogProps = BaseDialogProps & {
  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  severity?: 'error' | 'info' | 'success' | 'warning';

  /**
   * A function that is called before closing the dialog closes.
   */
  onClose: () => Promise<void>;
};

export type ConfirmDialogProps = BaseDialogProps & {
  /**
   * The text to show in the "Cancel" button. Defaults to `'Cancel'`.
   */
  cancelText?: TextType;

  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  severity?: 'error' | 'info' | 'success' | 'warning';

  /**
   * A function that is called before closing the dialog closes.
   */
  onClose: (result: boolean) => Promise<void>;
};

export type PromptDialogProps = BaseDialogProps & {
  /**
   * The text to show in the "Cancel" button. Defaults to `'Cancel'`.
   */
  cancelText?: TextType;

  /**
   * A function that is called before closing the dialog closes.
   */
  onClose: (result?: string) => Promise<void>;
};

/**
 * The props that are passed to a dialog component.
 */
export type DialogProps<P = undefined, R = void> = {
  /**
   * The payload that was passed when the dialog was opened.
   */
  payload: P;
  /**
   * Whether the dialog is open.
   */
  isOpen: boolean;
  /**
   * A function to call when the dialog should be closed. If the dialog has a return
   * value, it should be passed as an argument to this function. You should use the promise
   * that is returned to show a loading state while the dialog is performing async actions
   * on close.
   * @param result The result to return from the dialog.
   * @returns A promise that resolves when the dialog can be fully closed.
   */
  onClose: (result: R) => Promise<void>;
};
// #endregion

// #region Atoms
export type AtomState<P> = {
  Component: ComponentType<P>;
  props: P;
};
// #endregion
