import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <BaseErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          {children}
        </BaseErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
