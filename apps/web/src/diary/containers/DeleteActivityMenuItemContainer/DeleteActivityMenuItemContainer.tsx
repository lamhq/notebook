import { useSetAtom } from 'jotai';
import { activityToDeleteAtom } from '../../atoms';
import DeleteActivityMenuItem from '../../components/DeleteActivityMenuItem';
import type { Activity } from '../../types';

export type DeleteActivityMenuItemContainerProps = {
  activity: Activity;
  onClick?: () => void;
};

export default function DeleteActivityMenuItemContainer({
  activity,
  onClick,
}: DeleteActivityMenuItemContainerProps) {
  const setActivityToDelete = useSetAtom(activityToDeleteAtom);
  const handleClick = () => {
    setActivityToDelete(activity);
    onClick?.();
  };

  return <DeleteActivityMenuItem onClick={handleClick} />;
}
