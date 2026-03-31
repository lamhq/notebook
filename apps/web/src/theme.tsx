import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
  palette: {
    success: {
      main: 'rgb(76, 175, 80)',
    },
    primary: {
      main: '#296BE3',
    },
    secondary: {
      main: '#e0e0e0',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: [
      '"Nunito Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.4375rem',
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&::before': {
            borderColor: '#BFBFBF',
          },
          '&::after': {
            borderColor: '#BFBFBF',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard',
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '4px 0 5px',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          height: '25px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 24px',
        },
      },
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        ampmLabel: {
          color: 'lightgray',
          '&.Mui-selected': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
  },
});
