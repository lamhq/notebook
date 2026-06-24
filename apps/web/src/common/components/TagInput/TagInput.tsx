import Autocomplete, {
  type AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { ReactNode } from 'react';

const filter = createFilterOptions<string>();

export type TagInputProps = Omit<
  AutocompleteProps<string, true, false, true>,
  'renderInput'
> & {
  // display input as a field
  label?: ReactNode;
  // focus input on errors
  inputRef?: TextFieldProps['inputRef'];
  // custom actions
  endAdornment?: ReactNode;
};

export default function TagInput(props: TagInputProps) {
  const { loading, freeSolo, onChange, label, inputRef, endAdornment, ...rest } =
    props;
  return (
    <Autocomplete
      {...rest}
      multiple
      clearOnBlur
      loading={loading}
      freeSolo={freeSolo}
      getOptionLabel={(option) => option}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        // add an option for adding new item
        if (
          freeSolo &&
          params.inputValue !== '' &&
          !opts.includes(params.inputValue)
        ) {
          filtered.unshift(`Add "${params.inputValue}"`);
        }
        return filtered;
      }}
      onChange={(event, newValue, reason, details) => {
        if (onChange) {
          // convert the fake option `Add {text}` to the real item
          const modifiedValue = newValue.map((val) =>
            val.replace(/^Add "/, '').replace(/"$/, ''),
          );
          onChange(event, modifiedValue, reason, details);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            input: {
              ...params.InputProps,
              inputRef: inputRef, // allow setting focus on error
              endAdornment: (
                // render a spinner when fetching options
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {endAdornment}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
