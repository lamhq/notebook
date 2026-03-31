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
        logout_uri: getAbsoluteURL(AUTH_SIGNOUT_ROUTE),
        client_id: auth.settings.client_id,
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
