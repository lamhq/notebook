import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingFallback() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={200}>
      <CircularProgress />
    </Box>
  );
}
