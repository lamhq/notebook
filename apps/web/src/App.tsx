import { Route, Routes } from 'react-router';
import AuthCallbackPage from './auth/pages/AuthCallbackPage';
import SignedOutPage from './auth/pages/SignedOutPage';
import NotFoundPage from './common/pages/NotFoundPage';
import MainLayout from './common/templates/MainLayout';
import AddActivityPage from './diary/pages/AddActivityPage';
import ListActivityPage from './diary/pages/ListActivityPage';
import UpdateActivityPage from './diary/pages/UpdateActivityPage';
import { ErrorBoundary } from './error';
import { AUTH_CALLBACK_ROUTE, AUTH_SIGNOUT_ROUTE, HOME_ROUTE } from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={AUTH_CALLBACK_ROUTE} element={<AuthCallbackPage />} />
        <Route path={AUTH_SIGNOUT_ROUTE} element={<SignedOutPage />} />
        <Route element={<MainLayout />}>
          <Route path={HOME_ROUTE} element={<ListActivityPage />} />
          <Route path="/activities/new" element={<AddActivityPage />} />
          <Route path="/activities/:id" element={<UpdateActivityPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
