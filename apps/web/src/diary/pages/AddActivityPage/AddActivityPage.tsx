import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { useAddActivityMutation } from '../../hooks';
import ActivityForm from '../../organisms/ActivityForm';
import type { ActivityFormData } from '../../types';

const defaultValues: ActivityFormData = {
  content: '',
  tags: [],
  time: new Date(),
};

export default function AddActivityPage() {
  const { mutateAsync: addActivity } = useAddActivityMutation();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<ActivityFormData> = useCallback(
    async (data) => {
      try {
        await addActivity(data);
        void navigate('/');
      } catch (error) {
        handleError(error);
      }
    },
    [addActivity, navigate, handleError],
  );

  return (
    <>
      <Title>Add Activity</Title>
      <ActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}
