import Box, { type BoxProps } from '@mui/material/Box';

/**
 * Center children horizontally, with a gap between them
 */
export default function Actions(props: BoxProps) {
  return <Box display="flex" justifyContent="center" columnGap={2} {...props} />;
}
