import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns/format';
import { Link as RouterLink } from 'react-router';
import { Title } from '../../../common/templates/MainLayout';
import DeleteReportButton from '../../containers/DeleteReportButton';
import { useReports } from '../../hooks';
import type { Report } from '../../types';

function ReportListContent() {
  const reports = useReports();

  if (reports.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="textSecondary">No reports yet.</Typography>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {reports.map((report: Report, index: number) => (
        <Box key={report.id}>
          {index > 0 && <Divider />}
          <ListItem secondaryAction={<DeleteReportButton report={report} />}>
            <ListItemText
              primary={
                <Button
                  component={RouterLink}
                  to={`/reports/${report.id}`}
                  sx={{ p: 0, textTransform: 'none' }}
                >
                  {report.name}
                </Button>
              }
              secondary={format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm')}
            />
          </ListItem>
        </Box>
      ))}
    </List>
  );
}

export default function ListReportsPage() {
  return (
    <>
      <Title>Reports</Title>
      <ReportListContent />
    </>
  );
}
