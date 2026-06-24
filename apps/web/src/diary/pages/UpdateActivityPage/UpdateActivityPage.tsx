import CircularProgress from '@mui/material/CircularProgress';
import { Suspense, useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import UpdateActivityForm from '../../containers/UpdateActivityForm';
import { useGetActivityQuery, useUpdateActivity } from '../../hooks';
import type { UpdateActivityFormData } from '../../types';

function UpdateActivityFormView({ activityId }: { activityId: string }) {
  const { data: activity } = useGetActivityQuery(activityId);
  const updateActivity = useUpdateActivity();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const defaultFormValues: UpdateActivityFormData = {
    content: activity.content,
    tags: activity.tags,
    time: activity.time,
    income: activity.income?.toString(),
    outcome: activity.outcome?.toString(),
  };
  const handleSubmit: SubmitHandler<UpdateActivityFormData> = useCallback(
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

  return (
    <UpdateActivityForm defaultValues={defaultFormValues} onSubmit={handleSubmit} />
  );
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
        <UpdateActivityFormView activityId={activityId} />
      </Suspense>
    </>
  );
}
