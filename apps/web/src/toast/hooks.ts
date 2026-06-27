import { useSnackbar } from 'notistack';
import type { ToastApi } from './types';

export function useToast(): ToastApi {
  const { enqueueSnackbar } = useSnackbar();

  return {
    showSuccess: (message: string) =>
      enqueueSnackbar(message, { variant: 'success' }),
    showError: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
    showInfo: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
  };
}
