import { useCallback } from 'react';
import { useDialogs } from '../dialog';

export default function useErrorHandler() {
  const { alert } = useDialogs();
  return useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, { title: 'Error', severity: 'error' }).catch(
          console.error,
        );
      } else {
        console.error('Unexpected error', error);
      }
    },
    [alert],
  );
}
