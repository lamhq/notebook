import type { ButtonProps } from '@mui/material/Button';
import { useState } from 'react';

export function useDialogButtonProps(
  onClose: () => Promise<void>,
): Partial<ButtonProps> {
  const [loading, setLoading] = useState(false);
  const result: Partial<ButtonProps> = {
    loading,
    onClick: () => {
      setLoading(true);
      void onClose().finally(() => {
        setLoading(false);
      });
    },
  };
  return result;
}
