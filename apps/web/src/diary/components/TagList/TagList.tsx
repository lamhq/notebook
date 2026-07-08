import Box from '@mui/material/Box';
import Typography from '../../../common/components/Typography';

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <Box sx={{ display: 'flex', columnGap: 1 }}>
      {tags.map((tag) => (
        <Typography key={tag} variant="body2" sx={{ color: 'primary.main' }}>
          {`#${tag}`}
        </Typography>
      ))}
    </Box>
  );
}
