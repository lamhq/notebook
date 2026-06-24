import { formatDate } from '../../../common/utils';
import { useDialogs } from '../../../dialog';
import { useErrorHandler } from '../../../error';
import DeleteActivityMenuItem from '../../components/DeleteActivityMenuItem';
import { useDeleteActivity } from '../../hooks';
import type { Activity } from '../../types';

export type DeleteActivityMenuItemContainerProps = {
  activity: Activity;
  onClick?: () => void;
};

export default function DeleteActivityMenuItemContainer({
  activity,
  onClick,
}: DeleteActivityMenuItemContainerProps) {
  const deleteActivity = useDeleteActivity();
  const { confirm } = useDialogs();
  const handleError = useErrorHandler();

  const handleDelete = async () => {
    try {
      if (onClick) onClick();
      const isOk = await confirm(
        `Are you sure to delete the activity on ${formatDate(activity.time)}?`,
      );
      if (!isOk) return;

      await deleteActivity(activity.id);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <DeleteActivityMenuItem
      onClick={() => {
        void handleDelete();
      }}
    />
  );
}
