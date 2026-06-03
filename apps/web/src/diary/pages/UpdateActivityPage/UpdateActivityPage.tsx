import CircularProgress from '@mui/material/CircularProgress';
import { Suspense, useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { useGetActivityQuery, useUpdateActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

function UpdateActivityForm({ activityId }: { activityId: string }) {
  const { data: activity } = useGetActivityQuery(activityId);
  const { mutateAsync: updateActivity } = useUpdateActivityMutation();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const defaultFormValues: ActivityFormData = {
    content: activity.content,
    tags: activity.tags,
    time: activity.time,
    income: activity.income?.toString(),
    outcome: activity.outcome?.toString(),
  };
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      try {
        await updateActivity({ id: activityId, data });
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [activityId, updateActivity, navigate, handleError],
  );

  return <ActivityForm defaultValues={defaultFormValues} onSubmit={handleSubmit} />;
}

export default function UpdateActivityPage() {
  const { id: activityId } = useParams<{ id: string }>();
  if (!activityId) {
    throw new Error('Missing activity ID');
  }

  return (
    <>
      <Title>Update Activity</Title>
      <Suspense fallback={<CircularProgress />}>
        <UpdateActivityForm activityId={activityId} />
      </Suspense>
    </>
  );
}
