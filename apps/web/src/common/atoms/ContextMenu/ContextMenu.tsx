import MuiListItemIcon, { type ListItemIconProps } from '@mui/material/ListItemIcon';
import MuiListItemText, { type ListItemTextProps } from '@mui/material/ListItemText';
import MuiMenu, { type MenuProps } from '@mui/material/Menu';
import MuiMenuItem, { type MenuItemProps } from '@mui/material/MenuItem';

export function Menu(props: MenuProps) {
  return (
    <MuiMenu
      anchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      keepMounted
      elevation={0}
      sx={{
        border: '1px solid #d3d4d5',
        '& .MuiList-root': {
          padding: '4px',
        },
      }}
      {...props}
    />
  );
}

export function MenuItem(props: MenuItemProps) {
  return (
    <MuiMenuItem
      sx={{
        minHeight: 0,
        lineHeight: 'normal',
        padding: '8px',
        margin: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 0,
        },
      }}
      {...props}
    />
  );
}

export function ItemIcon(props: ListItemIconProps) {
  return (
    <MuiListItemIcon
      sx={{
        width: '1.25rem',
        marginRight: '0.75rem',
      }}
      {...props}
    />
  );
}

export function ItemText(props: ListItemTextProps) {
  return (
    <MuiListItemText
      sx={{
        margin: 0,
        '& .MuiListItemText-primary': {
          fontSize: '0.9375rem',
          lineHeight: 'normal',
        },
      }}
      {...props}
    />
  );
}
