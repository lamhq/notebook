import type { ReactNode } from 'react';
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <BaseErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </BaseErrorBoundary>
  );
}
