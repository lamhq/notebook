import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink } from 'react-router';

export default function AddActivityButton() {
  return (
    <IconButton
      color="primary"
      size="small"
      component={RouterLink}
      to="/activities/new"
      title="Add Activity"
    >
      <AddCircleIcon />
    </IconButton>
  );
}
