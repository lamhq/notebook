import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchActivityForm, {
  type SearchActivityFormData,
} from '../../containers/SearchActivityForm/SearchActivityForm';

export interface SearchDialogProps {
  open: boolean;
  defaultFormValues: SearchActivityFormData;
  onCancel: () => void;
  onSubmit: (data: SearchActivityFormData) => void;
}

export default function SearchDialog({
  open,
  defaultFormValues,
  onCancel,
  onSubmit,
}: SearchDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} keepMounted={false}>
      <DialogTitle>Search activities</DialogTitle>
      <DialogContent>
        <SearchActivityForm defaultValues={defaultFormValues} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="activitySearchForm"
          size="small"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}
