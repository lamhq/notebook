import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import * as yup from 'yup';

import Actions from '../../../common/components/Actions';
import DateTimePicker from '../../../common/components/DateTimePicker';
import TagsSelectContainer from '../../containers/TagsSelectContainer';
import { getTotalAmounts as calcAmounts } from '../../utils';

const activityFormSchema = yup.object().shape({
  time: yup.date().required(),
  content: yup.string().required('This field is required'),
  tags: yup.array(yup.string().required()).required(),
  income: yup.string(),
  outcome: yup.string(),
});

export interface UpdateActivityFormData {
  content: string;
  time: Date;
  tags: string[];
  income?: string;
  outcome?: string;
}

export interface UpdateActivityFormProps {
  defaultValues: UpdateActivityFormData;
  onSubmit: (data: UpdateActivityFormData) => void | Promise<void>;
}

export default function UpdateActivityForm({
  defaultValues,
  onSubmit,
}: UpdateActivityFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<UpdateActivityFormData>({
    defaultValues,
    resolver: yupResolver(activityFormSchema),
  });
  const noteContent = useWatch({ control, name: 'content' });

  // auto set income and outcome value base on activity's note
  useEffect(() => {
    const [income, outcome] = calcAmounts(noteContent);
    if (income) setValue('income', income.toString());
    if (outcome) setValue('outcome', outcome.toString());
  }, [noteContent, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                label="Content"
                required
                error={!!errors.content}
                helperText={errors.content?.message}
                autoFocus
                slotProps={{
                  input: {
                    inputComponent: TextareaAutosize,
                  },
                }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <TextField
                label="Income"
                type="number"
                error={!!errors.income}
                helperText={errors.income?.message}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="outcome"
            control={control}
            render={({ field }) => (
              <TextField
                label="Outcome"
                type="number"
                error={!!errors.outcome}
                helperText={errors.outcome?.message}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Time"
                error={!!errors.time}
                helperText={errors.time?.message}
                {...field}
              />
            )}
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
                freeSolo
                {...rest}
              />
            )}
          />
        </Grid>
      </Grid>
      <Actions>
        <Button variant="contained" color="secondary" component={RouterLink} to="/">
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Actions>
    </form>
  );
}
