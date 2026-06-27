import { useNavigate, useParams } from 'react-router';
import SuspenseWrapper from '../../../common/components/SuspenseWrapper';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import UpdateActivityForm from '../../containers/UpdateActivityForm';
import { useActivity, useUpdateActivity } from '../../hooks';
import type { UpdateActivityFormData } from '../../types';

function FetchActivityForm({ activityId }: { activityId: string }) {
  const activity = useActivity(activityId);
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
  const handleSubmit = async (data: UpdateActivityFormData) => {
    try {
      await updateActivity({ id: activityId, data });
      void navigate('/');
    } catch (error) {
      handleError(error);
    }
  };

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
      <SuspenseWrapper style="circular">
        <FetchActivityForm activityId={activityId} />
      </SuspenseWrapper>
    </>
  );
}
