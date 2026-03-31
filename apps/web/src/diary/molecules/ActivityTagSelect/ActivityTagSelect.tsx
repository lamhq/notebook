import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { Suspense } from 'react';
import type { ErrorBoundaryPropsWithRender } from 'react-error-boundary';
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
  const renderErrorFallback: ErrorBoundaryPropsWithRender['fallbackRender'] = ({
    resetErrorBoundary,
  }) => {
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
    <ErrorBoundary fallbackRender={renderErrorFallback}>
      <Suspense fallback={loadingFallback}>
        <FetchActivitySelect {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
