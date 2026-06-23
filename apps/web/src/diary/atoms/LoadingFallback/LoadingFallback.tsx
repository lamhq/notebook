import CircularProgress from '@mui/material/CircularProgress';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

export type LoadingFallbackProps = {
  children?: ReactNode;
  style?: 'empty' | 'circular';
};

export default function LoadingFallback({
  children,
  style = 'circular',
}: LoadingFallbackProps) {
  const fallback = style === 'empty' ? null : <CircularProgress />;
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
