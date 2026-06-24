import DeleteIcon from '@mui/icons-material/Delete';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';

export type DeleteActivityMenuItemProps = {
  onClick: () => void;
};

export default function DeleteActivityMenuItem({
  onClick,
}: DeleteActivityMenuItemProps) {
  return (
    <MenuItem aria-label="Delete Activity" onClick={onClick}>
      <ItemIcon>
        <DeleteIcon fontSize="small" />
      </ItemIcon>
      <ItemText primary="Delete" />
    </MenuItem>
  );
}
