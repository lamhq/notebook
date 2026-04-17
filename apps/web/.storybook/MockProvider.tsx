import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import EventEmitter from 'eventemitter3';
import type { ReactNode } from 'react';
import type { AuthContextProps } from 'react-oidc-context';
import { AuthContext } from 'react-oidc-context';
import { MemoryRouter } from 'react-router';
import { Dialog } from '../src/dialog';
import { EventProvider } from '../src/event';
import { theme } from '../src/theme';

// #region Locale
const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};
// #endregion

// #region Event
const eventEmitter = new EventEmitter();
// #endregion

// #region MockProvider
export type MockProviderProps = {
  children: ReactNode;
};

export default function MockProvider({ children }: MockProviderProps) {
  const authContextValue = { isAuthenticated: true } as AuthContextProps;
  return (
    // Material UI
    <ThemeProvider theme={theme}>
      {/* DatePicker */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={customEnLocale}
      >
        {/* React Router */}
        <MemoryRouter>
          {/* react-oidc-context */}
          <AuthContext.Provider value={authContextValue}>
            <EventProvider emitter={eventEmitter}>{children}</EventProvider>
          </AuthContext.Provider>
          <Dialog />
        </MemoryRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
// #endregion
