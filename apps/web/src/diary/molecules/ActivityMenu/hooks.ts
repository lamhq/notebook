import { useCallback } from 'react';
import { formatDate } from '../../../common/utils';
import { useDialogs } from '../../../dialog';
import { useErrorHandler } from '../../../error';
import { useDeleteActivityMutation } from '../../hooks';
import type { Activity } from '../../types';

export function useDeleteActivityItemProps(activity: Activity) {
  const { mutateAsync: deleteActivity, isPending: isDeleting } =
    useDeleteActivityMutation();
  const { confirm } = useDialogs();
  const handleError = useErrorHandler();
  const handleDelete = useCallback(async () => {
    try {
      const isOk = await confirm(
        `Are you sure to delete the activity on ${formatDate(activity.time)}?`,
      );
      if (!isOk) return;

      await deleteActivity(activity.id);
    } catch (error) {
      handleError(error);
    }
  }, [confirm, deleteActivity, activity, handleError]);

  return {
    handleDelete,
    isDeleting,
  };
}
