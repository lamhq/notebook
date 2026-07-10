// #region Dialog APIs
export interface DialogAPI {
  alert: OpenAlertDialogFn;
  confirm: OpenConfirmDialogFn;
  prompt: OpenPromptDialogFn;
}

/**
 * Open an alert dialog.
 * Returns a promise that resolves when user closes the dialog.
 */
export type OpenAlertDialogFn = (
  message: string,
  options?: Partial<Omit<AlertDialogProps, 'isOpen' | 'message'>>,
) => Promise<void>;

/**
 * Open a confirmation dialog.
 * Returns a boolean promise (true if confirmed, false if canceled).
 */
export type OpenConfirmDialogFn = (
  message: string,
  options?: Partial<Omit<ConfirmDialogProps, 'isOpen' | 'message'>>,
) => Promise<boolean>;

/**
 * Open a prompt dialog to request user input.
 * Returns a promise that resolves to string (user input) or undefined (if user cancels).
 */
export type OpenPromptDialogFn = (
  message: string,
  options?: Partial<Omit<PromptDialogProps, 'isOpen' | 'message'>>,
) => Promise<string | undefined>;
// #endregion

// #region Dialog Props
export type Severity = 'warning' | 'error' | 'info' | 'success';

export interface BaseDialogProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Content for the dialog.
   */
  message: string;

  /**
   * Title for the dialog. Defaults to `'Alert'`.
   */
  title?: string;

  /**
   * The text to show in the "Ok" button. Defaults to `'Ok'`.
   */
  okText?: string;
}

export type AlertDialogProps = BaseDialogProps & {
  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  severity?: Severity;

  /**
   * A function that is called when dialog is closed
   */
  onClose?: () => void;
};

export type ConfirmDialogProps = BaseDialogProps & {
  /**
   * The text to show in the "Cancel" button. Defaults to `'Cancel'`.
   */
  cancelText?: string;

  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  severity?: Severity;

  /**
   * A function that is called when dialog is closed
   */
  onClose?: (result: boolean) => void;
};

export type PromptDialogProps = BaseDialogProps & {
  /**
   * The text to show in the "Cancel" button. Defaults to `'Cancel'`.
   */
  cancelText?: string;

  /**
   * A function that is called when dialog is closed
   */
  onClose?: (result?: string) => void;
};
// #endregion

// #region Atoms
export type DialogState =
  | { type: 'alert'; props: AlertDialogProps }
  | { type: 'confirm'; props: ConfirmDialogProps }
  | { type: 'prompt'; props: PromptDialogProps };
// #endregion
