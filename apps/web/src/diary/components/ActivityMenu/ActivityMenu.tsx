import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { MouseEvent } from 'react';
import { Link, type LinkProps } from 'react-router';
import {
  ItemIcon,
  ItemText,
  Menu,
  MenuItem,
} from '../../../common/components/ContextMenu';
import DeleteActivityMenuItemContainer from '../../containers/DeleteActivityMenuItemContainer';
import type { Activity } from '../../types';

const UnstyledLink = styled(Link)<LinkProps>(() => ({
  display: 'flex',
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
}));

export interface ActivityMenuProps {
  activity: Activity;
  anchor: Element | null;
  isOpen: boolean;
  onOpen: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
}

export default function ActivityMenu({
  activity,
  anchor: anchorEl,
  isOpen,
  onOpen,
  onClose,
}: ActivityMenuProps) {
  return (
    <>
      <IconButton
        size="small"
        onClick={onOpen}
        aria-haspopup="true"
        aria-label="Activity Menu"
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose}>
        {/* update activity */}
        <MenuItem aria-label="Update Activity">
          <UnstyledLink to={`/activities/${activity.id}`}>
            <ItemIcon>
              <BorderColorIcon fontSize="small" />
            </ItemIcon>
            <ItemText primary="Update" />
          </UnstyledLink>
        </MenuItem>

        {/* delete activity */}
        <DeleteActivityMenuItemContainer activity={activity} onClick={onClose} />
      </Menu>
    </>
  );
}
