import type { MouseEvent } from 'react';
import { useState } from 'react';
import ActivityMenu from '../../components/ActivityMenu/ActivityMenu';
import type { Activity } from '../../types';

export interface ActivityMenuContainerProps {
  activity: Activity;
}

export default function ActivityMenuContainer({
  activity,
}: ActivityMenuContainerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ActivityMenu
      activity={activity}
      anchor={anchorEl}
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={closeMenu}
    />
  );
}
