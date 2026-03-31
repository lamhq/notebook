import {
  MobileDateTimePicker,
  type MobileDateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/MobileDateTimePicker';

type InputFieldProps = {
  error?: boolean;
  helperText?: string;
};

export type DateTimePickerProps = Omit<MuiDateTimePickerProps<Date>, 'renderInput'> &
  InputFieldProps;

export default function DateTimePicker({
  error,
  helperText,
  ...rest
}: DateTimePickerProps) {
  return (
    <MobileDateTimePicker
      format="EEE, d LLL, yyyy h:mm aaa"
      slotProps={{ textField: { error, helperText } }}
      {...rest}
    />
  );
}
