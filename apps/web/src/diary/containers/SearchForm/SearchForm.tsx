import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { DesktopDatePicker } from '../../../common/atoms/DatePicker';
import TimeRangeSelect from '../../atoms/TimeRangeSelect';
import ActivityTagSelect from '../../molecules/ActivityTagSelect';
import type { ActivityFilter } from '../../types';
import { TimeRange } from '../../types';

export type SearchFormProps = {
  defaultValues: ActivityFilter;
  onSubmit: SubmitHandler<ActivityFilter>;
};

export default function SearchForm({ defaultValues, onSubmit }: SearchFormProps) {
  const { control, handleSubmit } = useForm<ActivityFilter>({
    defaultValues,
  });
  const timeRange = useWatch({ control, name: 'timeRange' });

  return (
    <form
      id="activitySearchForm"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => <TextField label="Text" {...field} autoFocus />}
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
            render={({ field }) => <TimeRangeSelect label="Time range" {...field} />}
          />
        </Grid>
        {timeRange === TimeRange.Custom && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="from"
                control={control}
                render={({ field }) => <DesktopDatePicker label="From" {...field} />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="to"
                control={control}
                render={({ field }) => <DesktopDatePicker label="To" {...field} />}
              />
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}
