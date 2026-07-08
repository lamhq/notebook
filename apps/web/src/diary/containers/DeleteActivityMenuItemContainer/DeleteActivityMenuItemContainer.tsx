import { useNavigate } from 'react-router';
import { formatDateTime } from '../../../common/utils';
import { useDialogs } from '../../../dialog';
import { useErrorHandler } from '../../../error';
import { ACTIVITIES_ROUTE } from '../../../routes';
import { useToast } from '../../../toast';
import DeleteActivityMenuItem from '../../components/DeleteActivityMenuItem';
import { useDeleteActivity } from '../../hooks';
import type { Activity } from '../../types';

export interface DeleteActivityMenuItemContainerProps {
  activity: Activity;
  onClick?: () => void;
}

export default function DeleteActivityMenuItemContainer({
  activity,
  onClick,
}: DeleteActivityMenuItemContainerProps) {
  const handleError = useErrorHandler();
  const [deleteActivity, isDeleting] = useDeleteActivity();
  const { confirm } = useDialogs();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    onClick?.();
    try {
      const activityTime = formatDateTime(new Date(activity.time));
      const confirmed = await confirm(
        `Are you sure you want to delete the activity at "${activityTime}"?`,
        {
          severity: 'error',
        },
      );
      if (!confirmed) return;
      await deleteActivity(activity.id);
      showSuccess(`Activity at "${activityTime}" deleted.`);
      void navigate(ACTIVITIES_ROUTE);
    } catch (error) {
      handleError(error);
    }
  };

  return <DeleteActivityMenuItem onClick={handleDelete} isDeleting={isDeleting} />;
}
