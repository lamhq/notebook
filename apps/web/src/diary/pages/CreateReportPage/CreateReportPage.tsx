import { useNavigate } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import { useErrorHandler } from '../../../error';
import { REPORTS_ROUTE } from '../../../routes';
import CreateReportForm, {
  type ReportFormData,
} from '../../containers/CreateReportForm';
import { useActivityQuery, useCreateReport } from '../../hooks';
import { getTimeRange } from '../../utils';

export default function CreateReportPage() {
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const { query } = useActivityQuery();
  const createReport = useCreateReport();

  const defaultValues: ReportFormData = {
    name: '',
    text: query.text,
    tags: query.tags,
    timeRange: query.timeRange,
    from: query.from,
    to: query.to,
  };

  const handleSubmit = async (data: ReportFormData) => {
    const [from, to] = getTimeRange(data);
    try {
      const report = await createReport({
        name: data.name,
        paymentQR: data.paymentQR,
        text: data.text,
        tags: data.tags,
        from,
        to,
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
