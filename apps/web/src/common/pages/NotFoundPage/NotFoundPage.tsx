import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router';
import Actions from '../../atoms/Actions';
import Typography from '../../atoms/Typography';

export default function NotFoundPage() {
  return (
    <Container sx={{ py: 2, textAlign: 'center' }}>
      <Typography component="h1" variant="h2">
        Page Not Found
      </Typography>
      <Typography align="center">
        <SearchIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center">This page does not exist.</Typography>
      <Actions>
        <Button color="primary" variant="contained" component={Link} to="/">
          Return
        </Button>
      </Actions>
    </Container>
  );
}
