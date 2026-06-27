import { useAtom } from 'jotai';
import { useState } from 'react';
import { useToast } from '../../../toast';
import { activityToDeleteAtom } from '../../atoms';
import DeleteActivityDialog from '../../components/DeleteActivityDialog';
import { useDeleteActivity } from '../../hooks';

export default function DeleteActivityDialogContainer() {
  const [activity, setActivity] = useAtom(activityToDeleteAtom);
  const [error, setError] = useState<string | null>(null);
  const [deleteActivity, isDeleting] = useDeleteActivity();
  const { showSuccess } = useToast();
  const handleDelete = async () => {
    try {
      setError(null);
      if (activity) {
        await deleteActivity(activity.id);
        showSuccess('Activity deleted successfully');
        setActivity(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete activity';
      setError(message);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      setActivity(null);
    }
  };

  return (
    <DeleteActivityDialog
      open={!!activity}
      activity={activity}
      error={error}
      isDeleting={isDeleting}
      onDelete={handleDelete}
      onCancel={handleCancel}
    />
  );
}
