import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import EventEmitter from 'eventemitter3';
import type { User } from 'oidc-client-ts';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router';
import { axiosRequest } from './api/request';
import App from './App';
import { IndexedDBStorage } from './auth';
import { getAbsoluteURL } from './common/utils';
import { Dialog } from './dialog';
import { EventProvider } from './event';
import { AUTH_CALLBACK_ROUTE } from './routes';
import './styles.css';
import { theme } from './theme';

const oidcAuthority = import.meta.env.VITE_OIDC_AUTHORITY;
const oidcClientId = import.meta.env.VITE_OIDC_CLIENT_ID;

if (!oidcAuthority)
  throw new Error('Missing required environment variable: VITE_OIDC_AUTHORITY');
if (!oidcClientId)
  throw new Error('Missing required environment variable: VITE_OIDC_CLIENT_ID');

// #region Locale
const customEnLocale: Locale = {
  ...enUS,
  options: {
    ...enUS.options,
    weekStartsOn: 1, // Sunday = 0, Monday = 1.
  },
};
// #endregion

// #region Auth
function attachTokenToAPIRequest(user: User | undefined | null) {
  if (!user?.id_token) return;
  axiosRequest.defaults.headers.common.Authorization = `Bearer ${user.id_token}`;
}

const userManager = new UserManager({
  authority: oidcAuthority,
  client_id: oidcClientId,
  redirect_uri: getAbsoluteURL(AUTH_CALLBACK_ROUTE),
  response_type: 'code',
  scope: 'email openid profile',
  userStore: new WebStorageStateStore({ store: new IndexedDBStorage() }),
});

const oidcConfig: AuthProviderProps = {
  userManager,
  // skip exchanging authorization token for non-auth callback routes
  skipSigninCallback: window.location.pathname !== AUTH_CALLBACK_ROUTE,
  onSigninCallback: attachTokenToAPIRequest,
};

// attach token to API request on load
userManager.getUser().then(attachTokenToAPIRequest, console.error);
// #endregion

// #region Event
const eventEmitter = new EventEmitter();
// #endregion

// #region TanStack Query
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});
// #endregion

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <StrictMode>
      {/* Material UI */}
      <ThemeProvider theme={theme}>
        {/* DatePicker */}
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={customEnLocale}
        >
          {/* React Router */}
          <BrowserRouter>
            {/* react-oidc-context */}
            <AuthProvider {...oidcConfig}>
              {/* Event emitter */}
              <EventProvider emitter={eventEmitter}>
                {/* TanStack Query */}
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </EventProvider>
            </AuthProvider>
            <Dialog />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
