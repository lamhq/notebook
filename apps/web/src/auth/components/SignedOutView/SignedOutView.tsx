import Button from '@mui/material/Button';
import { Link } from 'react-router';
import GuestLayout from '../../../common/templates/GuestLayout';

export type SignedOutViewProps = {
  onSignIn: () => void;
  homeRoute: string;
};

export default function SignedOutView({ onSignIn, homeRoute }: SignedOutViewProps) {
  return (
    <GuestLayout title="You've been signed out">
      <p>
        To sign in again, choose the <strong>Sign In</strong> button below.
      </p>
      <p>
        Or return to &nbsp;
        <Link to={homeRoute}>home page</Link>.
      </p>
      <p>
        <Button onClick={onSignIn} variant="contained">
          sign in
        </Button>
      </p>
    </GuestLayout>
  );
}
