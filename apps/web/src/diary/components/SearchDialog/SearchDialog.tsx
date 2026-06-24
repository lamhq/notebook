import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { SubmitHandler } from 'react-hook-form';
import type { ActivityFilter } from '../../types';
import SearchForm from '../SearchForm/SearchForm';

export type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
  defaultFormValues: ActivityFilter;
  onFormSubmit: SubmitHandler<ActivityFilter>;
};

export default function SearchDialog({
  open,
  defaultFormValues,
  onClose,
  onFormSubmit,
}: SearchDialogProps) {
  const submitHandler: SubmitHandler<ActivityFilter> = (data) => {
    onFormSubmit(data);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} keepMounted={false}>
      <DialogTitle>Search activities</DialogTitle>
      <DialogContent>
        <SearchForm defaultValues={defaultFormValues} onSubmit={submitHandler} />
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
