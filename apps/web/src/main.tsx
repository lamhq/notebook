import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import type { User } from 'oidc-client-ts';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import type { AuthProviderProps } from 'react-oidc-context';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router';
import { apiClient } from './api-client';
import App from './App';
import { IndexedDBStorage } from './auth';
import { getAbsoluteURL } from './common/utils';
import { Dialog } from './dialog';
import { AUTH_CALLBACK_ROUTE } from './routes';
import './styles.css';
import { theme } from './theme';
import { ToastProvider } from './toast';

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
  apiClient.defaults.headers.common.Authorization = `Bearer ${user.id_token}`;
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

// #region TanStack Query
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: false } },
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
          {/* Toast Notifications */}
          <ToastProvider>
            {/* React Router */}
            <BrowserRouter>
              {/* react-oidc-context */}
              <AuthProvider {...oidcConfig}>
                {/* TanStack Query */}
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </AuthProvider>
              <Dialog />
            </BrowserRouter>
          </ToastProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
