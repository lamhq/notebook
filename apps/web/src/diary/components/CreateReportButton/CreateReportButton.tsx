import AssessmentIcon from '@mui/icons-material/Assessment';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';
import { CREATE_REPORT_ROUTE } from '../../../routes';

export default function CreateReportButton() {
  return (
    <Button
      component={RouterLink}
      to={CREATE_REPORT_ROUTE}
      startIcon={<AssessmentIcon />}
      size="small"
      variant="outlined"
    >
      Create Report
    </Button>
  );
}
