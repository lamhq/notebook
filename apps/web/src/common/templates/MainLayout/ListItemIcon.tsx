import MuiListItemIcon, { type ListItemIconProps } from '@mui/material/ListItemIcon';

export default function ListItemIcon(props: ListItemIconProps) {
  return <MuiListItemIcon sx={{ minWidth: 40 }} {...props} />;
}
