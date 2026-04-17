import Button from '@mui/material/Button';
import { useAuth } from 'react-oidc-context';
import { Link, Navigate } from 'react-router';
import LoadingFallback from '../../common/organism/LoadingFallback';
import GuestLayout from '../../common/templates/GuestLayout';
import { HOME_ROUTE } from '../../routes';
import { REDIRECT_ROUTE } from '../constants';

export default function AuthCallbackPage() {
  const auth = useAuth();

  if (auth.error) {
    return (
      <GuestLayout title="Authentication Error">
        <p>{auth.error.message}</p>
        <Button component={Link} to={HOME_ROUTE} variant="contained">
          Return
        </Button>
      </GuestLayout>
    );
  }

  if (auth.isAuthenticated) {
    const route = window.localStorage.getItem(REDIRECT_ROUTE);
    return <Navigate to={route ?? HOME_ROUTE} />;
  }

  return (
    <GuestLayout title="Signing you in...">
      <LoadingFallback />
    </GuestLayout>
  );
}
