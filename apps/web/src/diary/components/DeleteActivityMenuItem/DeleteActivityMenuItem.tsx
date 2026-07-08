import DeleteIcon from '@mui/icons-material/Delete';
import {
  ItemIcon,
  ItemText,
  MenuItem,
} from '../../../common/components/ContextMenu';

interface DeleteActivityMenuItemProps {
  onClick: () => void;
  isDeleting: boolean;
}

export default function DeleteActivityMenuItem({
  onClick,
  isDeleting,
}: DeleteActivityMenuItemProps) {
  return (
    <MenuItem aria-label="Delete Activity" onClick={onClick} disabled={isDeleting}>
      <ItemIcon>
        <DeleteIcon fontSize="small" />
      </ItemIcon>
      <ItemText primary="Delete" />
    </MenuItem>
  );
}
