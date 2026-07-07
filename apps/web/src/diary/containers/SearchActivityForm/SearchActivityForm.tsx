import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { DesktopDatePicker } from '../../../common/components/DatePicker';
import TimeRangeSelect from '../../components/TimeRangeSelect';
import { TimeRange, type ActivityQuery } from '../../types';
import TagsSelectContainer from '../TagsSelectContainer';

export type SearchActivityFormData = Omit<ActivityQuery, 'page' | 'pageSize'>;

export interface SearchActivityFormProps {
  defaultValues: SearchActivityFormData;
  onSubmit: (data: SearchActivityFormData) => void;
}

export default function SearchActivityForm({
  defaultValues,
  onSubmit,
}: SearchActivityFormProps) {
  const { control, handleSubmit } = useForm<SearchActivityFormData>({
    defaultValues,
  });
  const timeRange = useWatch({ control, name: 'timeRange' });

  return (
    <form id="activitySearchForm" onSubmit={handleSubmit(onSubmit)}>
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
              <TagsSelectContainer
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
