import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import type { TagInputProps } from '../../../common/components/TagInput/TagInput';
import TagInput from '../../../common/components/TagInput/TagInput';
import { useTags } from '../../hooks';

export type TagsSelectContainerProps = Omit<TagInputProps, 'options'>;

function EmptySelect(props: TagsSelectContainerProps) {
  return <TagInput {...props} options={[]} loading />;
}

function FetchTagsSelect(props: TagsSelectContainerProps) {
  const tags = useTags();
  return <TagInput {...props} options={tags} />;
}

export default function TagsSelectContainer(props: TagsSelectContainerProps) {
  const fallbackElement = EmptySelect(props);
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
          <Suspense fallback={fallbackElement}>
            <FetchTagsSelect {...props} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
