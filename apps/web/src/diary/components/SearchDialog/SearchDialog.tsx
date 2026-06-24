import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchForm from '../../containers/SearchForm/SearchForm';
import type { ActivityFilter } from '../../types';

export type SearchDialogProps = {
  open: boolean;
  defaultFormValues: ActivityFilter;
  onCancel: () => void;
  onSubmit: (data: ActivityFilter) => void;
};

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
        <SearchForm defaultValues={defaultFormValues} onSubmit={onSubmit} />
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
