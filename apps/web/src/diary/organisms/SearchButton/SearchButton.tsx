import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import Actions from '../../../common/atoms/Actions';
import { DesktopDatePicker } from '../../../common/atoms/DatePicker';
import { activityFilterAtom } from '../../atoms';
import TimeRangeSelect from '../../atoms/TimeRangeSelect';
import ActivityTagSelect from '../../molecules/ActivityTagSelect';
import type { ActivityFilter } from '../../types';
import { TimeRange } from '../../types';

export type SearchButtonViewProps = {
  values: ActivityFilter;
  onSubmit: SubmitHandler<ActivityFilter>;
};

export function SearchButtonView({ values, onSubmit }: SearchButtonViewProps) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm<ActivityFilter>({
    defaultValues: values,
  });
  const timeRange = watch('timeRange');
  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);
  const handleFormSubmit = useCallback<SubmitHandler<ActivityFilter>>(
    (data) => {
      onSubmit(data);
      setOpen(false);
    },
    [onSubmit],
  );
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <IconButton color="default" size="small" onClick={handleOpenDialog}>
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} keepMounted={false}>
        <DialogTitle>Search activities</DialogTitle>
        <DialogContent>
          <form
            id="activitySearchForm"
            onSubmit={(e) => {
              void handleSubmit(handleFormSubmit)(e);
            }}
          >
            <Grid container spacing={1}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Text" {...field} autoFocus />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <ActivityTagSelect
                      label="Tags"
                      onChange={(_, v) => {
                        onChange(v);
                      }}
                      {...rest}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="timeRange"
                  control={control}
                  render={({ field }) => (
                    <TimeRangeSelect label="Time range" {...field} />
                  )}
                />
              </Grid>
              {timeRange === TimeRange.Custom && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="from"
                      control={control}
                      render={({ field }) => (
                        <DesktopDatePicker label="From" {...field} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                      name="to"
                      control={control}
                      render={({ field }) => (
                        <DesktopDatePicker label="To" {...field} />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Actions>
            <Button
              onClick={handleReset}
              size="small"
              variant="contained"
              color="secondary"
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="activitySearchForm"
              size="small"
              variant="contained"
              onClick={handleCloseDialog}
              color="primary"
            >
              Search
            </Button>
          </Actions>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function SearchButton() {
  const [filter, setFilter] = useAtom(activityFilterAtom);
  const handleSearch = useCallback<SubmitHandler<ActivityFilter>>(
    (data) => {
      setFilter({ ...data, page: 1 });
    },
    [setFilter],
  );
  return <SearchButtonView values={filter} onSubmit={handleSearch} />;
}
