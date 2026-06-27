import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { type MouseEventHandler, type ReactNode, useCallback } from 'react';

export type ScrollToProps = {
  anchorSelector: string;
  children: ReactNode;
};

export default function ScrollOnClick({ children, anchorSelector }: ScrollToProps) {
  const trigger = useScrollTrigger();
  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const anchor = event.currentTarget.ownerDocument.querySelector(anchorSelector);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [anchorSelector],
  );

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 2,
          right: 2,
        }}
      >
        {children}
      </Box>
    </Zoom>
  );
}
