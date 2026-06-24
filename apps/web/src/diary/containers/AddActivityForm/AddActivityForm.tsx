import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import * as yup from 'yup';

import Actions from '../../../common/atoms/Actions';
import DateTimePicker from '../../../common/atoms/DateTimePicker';
import type { AddActivityFormData } from '../../types';
import { getTotalAmounts as calcAmounts } from '../../utils';
import TagsSelectContainer from '../TagsSelectContainer';

const activityFormSchema = yup.object().shape({
  time: yup.date().required(),
  content: yup.string().required('This field is required'),
  tags: yup.array(yup.string().required()).required(),
  income: yup.string(),
  outcome: yup.string(),
  splitByTag: yup.boolean().optional(),
});

export type AddActivityFormProps = {
  defaultValues: AddActivityFormData;
  onSubmit: (data: AddActivityFormData) => Promise<void>;
};

export default function AddActivityForm({
  defaultValues,
  onSubmit,
}: AddActivityFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<AddActivityFormData>({
    defaultValues,
    resolver: yupResolver(activityFormSchema),
  });
  const noteContent = useWatch({ control, name: 'content' });
  const tags = useWatch({ control, name: 'tags' });

  // auto set income and outcome value base on activity's note
  useEffect(() => {
    const [income, outcome] = calcAmounts(noteContent);
    if (income) setValue('income', income.toString());
    if (outcome) setValue('outcome', outcome.toString());
  }, [noteContent, setValue]);

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
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
        {tags.length > 1 && (
          <Grid size={{ xs: 12 }}>
            <Controller
              name="splitByTag"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value ?? false}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                  label="Create a separate post for each tag"
                />
              )}
            />
          </Grid>
        )}
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
