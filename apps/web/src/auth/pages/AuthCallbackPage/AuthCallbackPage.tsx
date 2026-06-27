import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import LoadingFallback from '../../../common/components/LoadingFallback';
import { HOME_ROUTE } from '../../../routes';
import AuthCallbackView from '../../components/AuthCallbackView/AuthCallbackView';
import { REDIRECT_ROUTE } from '../../constants';

export default function AuthCallbackPage() {
  const auth = useAuth();

  if (auth.error) {
    return (
      <AuthCallbackView
        state="error"
        errorMessage={auth.error.message}
        homeRoute={HOME_ROUTE}
      />
    );
  }

  if (auth.isAuthenticated) {
    const route = window.localStorage.getItem(REDIRECT_ROUTE);
    return <Navigate to={route ?? HOME_ROUTE} />;
  }

  return <LoadingFallback />;
}
