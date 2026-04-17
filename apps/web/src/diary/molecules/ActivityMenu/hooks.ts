import { useCallback } from 'react';
import { formatDate } from '../../../common/utils';
import { useDialogs } from '../../../dialog';
import { useErrorHandler } from '../../../error';
import { useEvent } from '../../../event';
import { ACTIVITY_CHANGED_EVENT } from '../../constants';
import { useDeleteActivityMutation } from '../../hooks';
import type { Activity } from '../../types';

export function useDeleteActivityItemProps(activity: Activity) {
  const { executeMutation: deleteActivity, isLoading: isDeleting } =
    useDeleteActivityMutation();
  const eventEmitter = useEvent();
  const { confirm } = useDialogs();
  const handleError = useErrorHandler();
  const handleDelete = useCallback(async () => {
    try {
      const isOk = await confirm(
        `Are you sure to delete the activity on ${formatDate(activity.time)}?`,
      );
      if (!isOk) return;

      await deleteActivity(activity.id);
      eventEmitter.emit(ACTIVITY_CHANGED_EVENT, activity);
    } catch (error) {
      handleError(error);
    }
  }, [confirm, deleteActivity, activity, handleError]);

  return {
    handleDelete,
    isDeleting,
  };
}
