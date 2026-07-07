import type { ReactNode } from 'react';
import { Suspense } from 'react';
import LoadingFallback from '../LoadingFallback';

export interface SuspenseWrapperProps {
  children?: ReactNode;
  style?: 'empty' | 'circular';
}

export default function SuspenseWrapper({
  children,
  style = 'circular',
}: SuspenseWrapperProps) {
  const fallback = style === 'empty' ? null : <LoadingFallback />;
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
