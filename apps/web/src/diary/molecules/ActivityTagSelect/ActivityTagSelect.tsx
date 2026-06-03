import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import type { TagInputProps } from '../../../common/atoms/TagInput/TagInput';
import TagInput from '../../../common/atoms/TagInput/TagInput';
import { useGetTagsQuery } from '../../hooks';

export type ActivityTagSelectProps = Omit<TagInputProps, 'options'>;

function LoadingSelect(props: ActivityTagSelectProps) {
  return <TagInput {...props} options={[]} loading />;
}

function FetchActivitySelect(props: ActivityTagSelectProps) {
  const { data: tags } = useGetTagsQuery();
  return <TagInput {...props} options={tags} />;
}

export default function ActivityTagSelect(props: ActivityTagSelectProps) {
  const loadingFallback = LoadingSelect(props);
  const renderErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
    return (
      <TagInput
        {...props}
        options={[]}
        endAdornment={
          <IconButton aria-label="delete" size="small" onClick={resetErrorBoundary}>
            <RefreshIcon color="inherit" />
          </IconButton>
        }
      />
    );
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={renderErrorFallback}>
          <Suspense fallback={loadingFallback}>
            <FetchActivitySelect {...props} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
