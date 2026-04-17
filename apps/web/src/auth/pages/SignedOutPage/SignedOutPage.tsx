import Button from '@mui/material/Button';
import { useAuth } from 'react-oidc-context';
import { Link, Navigate } from 'react-router';
import GuestLayout from '../../../common/templates/GuestLayout';
import { HOME_ROUTE } from '../../../routes';

export default function SignedOutPage() {
  const auth = useAuth();
  const signIn = () => void auth.signinRedirect();
  if (auth.isAuthenticated) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return (
    <GuestLayout title="You've been signed out">
      <p>
        To sign in again, choose the <strong>Sign In</strong> button below.
      </p>
      <p>
        Or return to &nbsp;
        <Link to={HOME_ROUTE}>home page</Link>.
      </p>
      <p>
        <Button onClick={signIn} variant="contained">
          sign in
        </Button>
      </p>
    </GuestLayout>
  );
}
