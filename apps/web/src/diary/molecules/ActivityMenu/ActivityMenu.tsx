import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { MouseEvent } from 'react';
import { useState } from 'react';
import { Link, type LinkProps } from 'react-router';
import {
  ItemIcon,
  ItemText,
  Menu,
  MenuItem,
} from '../../../common/atoms/ContextMenu';
import type { Activity } from '../../types';
import { useDeleteActivityItemProps } from './hooks';

const UnstyledLink = styled(Link)<LinkProps>(() => ({
  display: 'flex',
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
}));

export type ActivityMenuProps = {
  activity: Activity;
};

export default function ActivityMenu({ activity }: ActivityMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleDelete, isDeleting } = useDeleteActivityItemProps(activity);
  const showMenu = (anchor: HTMLButtonElement) => {
    setAnchorEl(anchor);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    showMenu(event.currentTarget);
  };
  const handleDeleteMenuItemClick = async () => {
    await handleDelete();
    closeMenu();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleMenuButtonClick}
        aria-haspopup="true"
        aria-label="Activity Menu"
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
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
        <MenuItem
          aria-label="Delete Activity"
          onClick={() => {
            void handleDeleteMenuItemClick();
          }}
          disabled={isDeleting}
        >
          <ItemIcon>
            {isDeleting ? (
              <CircularProgress size="15px" color="primary" />
            ) : (
              <DeleteIcon fontSize="small" />
            )}
          </ItemIcon>
          <ItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
}
