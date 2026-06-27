import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Actions from '../../../common/components/Actions';
import type { CreateReportFormData } from '../../types';

const schema = yup.object({
  name: yup.string().required('Report name is required'),
  paymentQR: yup
    .string()
    .url('Must be a valid URL')
    .required('QR code URL is required'),
});

interface CreateReportFormProps {
  defaultValues: CreateReportFormData;
  onSubmit: (data: CreateReportFormData) => Promise<void>;
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
  } = useForm<CreateReportFormData>({
    defaultValues,
    resolver: yupResolver(schema) as ReturnType<
      typeof yupResolver<CreateReportFormData>
    >,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
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
        <Grid size={{ xs: 12 }}>
          <Controller
            name="paymentQR"
            control={control}
            render={({ field }) => (
              <TextField
                label="Bank Transfer QR Code URL"
                required
                error={!!errors.paymentQR}
                helperText={errors.paymentQR?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Actions>
            <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create Report'}
            </Button>
          </Actions>
        </Grid>
      </Grid>
    </form>
  );
}
