import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { REPORTS_ROUTE } from '../../../routes';
import { activityFilterAtom } from '../../atoms';
import CreateReportForm from '../../containers/CreateReportForm';
import { useAllActivities, useCreateReport } from '../../hooks';
import type { CreateReportFormData } from '../../types';

function CreateReportPageContent() {
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const filter = useAtomValue(activityFilterAtom);
  const activities = useAllActivities(filter);
  const createReport = useCreateReport();

  const defaultValues: CreateReportFormData = {
    name: '',
    paymentQR: '',
    filters: filter,
  };

  const handleSubmit = async (data: CreateReportFormData) => {
    try {
      const report = await createReport({
        name: data.name,
        paymentQR: data.paymentQR,
        filters: data.filters,
        transactions: activities,
      });
      void navigate(`/reports/${report.id}`);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    void navigate(REPORTS_ROUTE);
  };

  return (
    <>
      <Title>Create Report</Title>
      <CreateReportForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}

export default function CreateReportPage() {
  return <CreateReportPageContent />;
}
