import Box from '@mui/material/Box/Box';
import type { ReactNode } from 'react';
import Actions from '../Actions';

export interface ToolbarProps {
  children?: ReactNode;
}

export interface LeftAreaProps {
  children?: ReactNode;
}

export interface RightAreaProps {
  children?: ReactNode;
}

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
