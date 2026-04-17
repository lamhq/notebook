import MenuItem from '@mui/material/MenuItem';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { TimeRange } from '../../types';

export default function TimeRangeSelect(props: TextFieldProps) {
  const sx = {
    '& .MuiSelect-select': {
      padding: '6px 24px 7px 0',
    },
  };
  return (
    <TextField select sx={sx} {...props}>
      <MenuItem value={TimeRange.All}>All</MenuItem>
      <MenuItem value={TimeRange.ThisMonth}>This month</MenuItem>
      <MenuItem value={TimeRange.LastMonth}>Last month</MenuItem>
      <MenuItem value={TimeRange.ThisYear}>This year</MenuItem>
      <MenuItem value={TimeRange.ThisWeek}>This week</MenuItem>
      <MenuItem value={TimeRange.Custom}>Custom</MenuItem>
    </TextField>
  );
}
