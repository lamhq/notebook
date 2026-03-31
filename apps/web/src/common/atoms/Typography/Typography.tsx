import MuiTypography, { type TypographyProps } from '@mui/material/Typography';

export default function Typography({ sx, variant, ...rest }: TypographyProps) {
  variant = variant ?? 'body1';

  let variantSx = {};

  switch (variant) {
    case 'h1':
      variantSx = { fontSize: '1.3125rem', fontWeight: 'bold' };
      break;

    case 'h2':
      variantSx = {
        fontSize: '1.375rem',
        marginBottom: '1.5625rem',
        fontWeight: 'bold',
      };
      break;

    case 'h3':
      variantSx = { fontSize: '1.25rem' };
      break;

    case 'h4':
      variantSx = { fontSize: '1.0625rem', fontWeight: 'bold' };
      break;

    case 'body2':
      variantSx = { fontSize: '0.75rem' };
      break;

    case 'body1':
      variantSx = { fontSize: '1rem', marginBottom: '1rem' };
      break;

    default:
      break;
  }

  return (
    <MuiTypography
      variant={variant}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sx={[variantSx, ...(Array.isArray(sx) ? sx : [sx])]}
      {...rest}
    />
  );
}
