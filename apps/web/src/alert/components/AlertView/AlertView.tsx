import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import type { AlertViewProps } from '../../types';

export default function AlertView({ items }: AlertViewProps) {
  return (
    <Stack spacing={1}>
      {items.map(({ type, message, remove, timestamp }) => (
        <MuiAlert severity={type} onClose={remove} key={timestamp}>
          {message}
        </MuiAlert>
      ))}
    </Stack>
  );
}
