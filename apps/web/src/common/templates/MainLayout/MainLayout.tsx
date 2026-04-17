import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useAtomValue, useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Alert } from '../../../alert';
import { ErrorBoundary } from '../../../error';
import HideOnScroll from '../../atoms/HideOnScroll/HideOnScroll';
import ScrollOnClick from '../../atoms/ScrollOnClick/ScrollOnClick';
import Typography from '../../atoms/Typography';
import LoadingFallback from '../../organism/LoadingFallback';
import { pageTitleAtom } from './atoms';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const title = useAtomValue(pageTitleAtom);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar variant="dense" sx={{ position: 'relative' }}>
            <IconButton
              edge="start"
              color="inherit"
              size="small"
              onClick={handleDrawerToggle}
              sx={{ position: 'absolute', left: 16, lineHeight: 48 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h1"
              align="center"
              component="h1"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar variant="dense" id="back-to-top-anchor" />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiPaper-root': { width: 200 },
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <Container sx={{ py: 2 }}>
        <Alert />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Container>
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab color="inherit" size="small" sx={{ backgroundColor: 'transparent' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
}

export function Title({ children }: { children: ReactNode }) {
  const setTitle = useSetAtom(pageTitleAtom);
  useEffect(() => {
    setTitle(children);
    return () => {
      setTitle('');
    };
  }, [children, setTitle]);
  return null;
}
