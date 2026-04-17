import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { useGetActivityQuery, useUpdateActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

export default function UpdateActivityPage() {
  const { id: activityId } = useParams<{ id: string }>();
  if (!activityId) {
    throw new Error('Missing activity ID');
  }
  const { data: activity } = useGetActivityQuery(activityId);
  const { executeMutation: updateActivity } = useUpdateActivityMutation();
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
        await updateActivity(activityId, data);
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [activityId, updateActivity, navigate, handleError],
  );

  return (
    <>
      <Title>Update Activity</Title>
      <ActivityForm defaultValues={defaultFormValues} onSubmit={handleSubmit} />
    </>
  );
}
