import AssessmentIcon from '@mui/icons-material/Assessment';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { CREATE_REPORT_ROUTE } from '../../../routes';

export default function CreateReportButton() {
  return (
    <IconButton
      color="default"
      size="small"
      to={CREATE_REPORT_ROUTE}
      component={RouterLink}
      title="Create Spending Report"
    >
      <AssessmentIcon />
    </IconButton>
  );
}
