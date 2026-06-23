import Box from '@mui/material/Box/Box';
import type { ReactNode } from 'react';
import Actions from '../../../common/atoms/Actions';

export type ToolbarProps = {
  children?: ReactNode;
};

export type LeftAreaProps = {
  children?: ReactNode;
};

export type RightAreaProps = {
  children?: ReactNode;
};

export function LeftArea({ children }: LeftAreaProps) {
  return <Actions>{children}</Actions>;
}

export function RightArea({ children }: RightAreaProps) {
  return children;
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
      {children}
    </Box>
  );
}
