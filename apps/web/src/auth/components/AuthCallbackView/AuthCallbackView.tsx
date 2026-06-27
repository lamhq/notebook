import Button from '@mui/material/Button';
import { Link } from 'react-router';
import GuestLayout from '../../../common/templates/GuestLayout';

export type AuthCallbackViewProps = {
  state: 'error' | 'loading';
  errorMessage?: string;
  homeRoute: string;
};

export default function AuthCallbackView({
  state,
  errorMessage,
  homeRoute,
}: AuthCallbackViewProps) {
  if (state === 'error') {
    return (
      <GuestLayout title="Authentication Error">
        <p>{errorMessage}</p>
        <Button component={Link} to={homeRoute} variant="contained">
          Return
        </Button>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout title="Signing you in...">
      <p>Please wait while we sign you in...</p>
    </GuestLayout>
  );
}
