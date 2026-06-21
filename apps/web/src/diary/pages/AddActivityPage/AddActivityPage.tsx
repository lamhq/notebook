import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { useAddActivityMutation } from '../../hooks';
import AddActivityForm from '../../organisms/AddActivityForm';
import type { AddActivityFormData } from '../../types';

const defaultValues: AddActivityFormData = {
  content: '',
  tags: [],
  time: new Date(),
  splitByTag: false,
};

export default function AddActivityPage() {
  const { mutateAsync: addActivity } = useAddActivityMutation();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<AddActivityFormData> = useCallback(
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
      <AddActivityForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </>
  );
}
