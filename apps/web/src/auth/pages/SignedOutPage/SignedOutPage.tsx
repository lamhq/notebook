import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import { HOME_ROUTE } from '../../../routes';
import SignedOutView from '../../components/SignedOutView/SignedOutView';

export default function SignedOutPage() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to={HOME_ROUTE} />;
  }

  const signIn = () => void auth.signinRedirect();

  return <SignedOutView onSignIn={signIn} homeRoute={HOME_ROUTE} />;
}
