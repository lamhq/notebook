import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Controller, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import Actions from '../../../common/components/Actions';
import { DesktopDatePicker } from '../../../common/components/DatePicker';
import TimeRangeSelect from '../../components/TimeRangeSelect';
import { TimeRange } from '../../types';
import TagsSelectContainer from '../TagsSelectContainer';

const createReportSchema = yup.object({
  name: yup.string().required('Name is required'),
  paymentQR: yup.string().optional(),
  text: yup.string().optional(),
  tags: yup.array().of(yup.string().required()).optional(),
  from: yup.date().optional(),
  to: yup.date().optional(),
  timeRange: yup
    .mixed<TimeRange>()
    .oneOf(Object.values(TimeRange) as TimeRange[])
    .optional(),
});

export interface ReportFormData {
  name: string;
  paymentQR?: string;
  text?: string;
  tags?: string[];
  timeRange?: TimeRange;
  from?: Date;
  to?: Date;
}

interface CreateReportFormProps {
  defaultValues: ReportFormData;
  onSubmit: (data: ReportFormData) => Promise<void>;
  onCancel: () => void;
}

export default function CreateReportForm({
  defaultValues,
  onSubmit,
  onCancel,
}: CreateReportFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ReportFormData>({
    defaultValues,
    resolver: yupResolver(createReportSchema),
  });
  const timeRange = useWatch({ control, name: 'timeRange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Report Name"
                required
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="paymentQR"
            control={control}
            render={({ field }) => (
              <TextField
                label="Bank Transfer QR Code URL"
                error={!!errors.paymentQR}
                helperText={errors.paymentQR?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
        <Grid size={{ xs: 12 }}>
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
        <Grid size={{ xs: 12 }}>
          <Actions>
            <Button
              onClick={onCancel}
              disabled={isSubmitting}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              {isSubmitting ? 'Creating…' : 'Create Report'}
            </Button>
          </Actions>
        </Grid>
      </Grid>
    </form>
  );
}
