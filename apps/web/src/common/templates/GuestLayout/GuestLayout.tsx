import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import Typography from '../../atoms/Typography';

export type GuestLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function GuestLayout({ title, children }: GuestLayoutProps) {
  return (
    <Container sx={{ py: 2 }}>
      <Typography component="h1" variant="h2">
        {title}
      </Typography>
      <Typography component="div">{children}</Typography>
    </Container>
  );
}
