import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from 'react-oidc-context';
import { AUTH_SIGNOUT_ROUTE } from '../../../routes';
import { getAbsoluteURL } from '../../utils';
import ListItemIcon from './ListItemIcon';

export default function SignOutMenuItem() {
  const auth = useAuth();
  const signOut = () =>
    // call the end session endpoint and redirect to sign out page
    void auth.signoutRedirect({
      extraQueryParams: {
        client_id: auth.settings.client_id,

        // for Amazon Cognito, specifying logout_uri to redirect back to the app after signing out
        logout_uri: getAbsoluteURL(AUTH_SIGNOUT_ROUTE),

        // for Keycloak, specifying post_logout_redirect_uri to redirect back to the app after signing out
        post_logout_redirect_uri: getAbsoluteURL(AUTH_SIGNOUT_ROUTE),
      },
    });
  return (
    <ListItemButton onClick={signOut}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
}
