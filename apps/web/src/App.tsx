import { Route, Routes } from 'react-router';
import { AuthCallbackPage, requireAuth, SignedOutPage } from './auth';
import NotFoundPage from './common/pages/NotFoundPage';
import MainLayout from './common/templates/MainLayout';
import AddActivityPage from './diary/pages/AddActivityPage';
import CreateReportPage from './diary/pages/CreateReportPage';
import ListActivityPage from './diary/pages/ListActivityPage';
import ListReportsPage from './diary/pages/ListReportsPage';
import ReportDetailPage from './diary/pages/ReportDetailPage';
import UpdateActivityPage from './diary/pages/UpdateActivityPage';
import { ErrorBoundary } from './error';
import {
  AUTH_CALLBACK_ROUTE,
  AUTH_SIGNOUT_ROUTE,
  CREATE_REPORT_ROUTE,
  HOME_ROUTE,
  REPORT_DETAIL_ROUTE,
  REPORTS_ROUTE,
} from './routes';

const ProtectedListActivityPage = requireAuth(ListActivityPage);
const ProtectedAddActivityPage = requireAuth(AddActivityPage);
const ProtectedUpdateActivityPage = requireAuth(UpdateActivityPage);
const ProtectedCreateReportPage = requireAuth(CreateReportPage);
const ProtectedListReportsPage = requireAuth(ListReportsPage);
const ProtectedReportDetailPage = requireAuth(ReportDetailPage);

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={AUTH_CALLBACK_ROUTE} element={<AuthCallbackPage />} />
        <Route path={AUTH_SIGNOUT_ROUTE} element={<SignedOutPage />} />
        <Route element={<MainLayout />}>
          <Route path={HOME_ROUTE} element={<ProtectedListActivityPage />} />
          <Route path="/activities/new" element={<ProtectedAddActivityPage />} />
          <Route path="/activities/:id" element={<ProtectedUpdateActivityPage />} />
          <Route path={REPORTS_ROUTE} element={<ProtectedListReportsPage />} />
          <Route
            path={CREATE_REPORT_ROUTE}
            element={<ProtectedCreateReportPage />}
          />
          <Route
            path={REPORT_DETAIL_ROUTE}
            element={<ProtectedReportDetailPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
