import BookIcon from '@mui/icons-material/Book';
import ExpandLess from '@mui/icons-material/ExpandLess';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TimelineIcon from '@mui/icons-material/Timeline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';
import { REPORTS_ROUTE } from '../../../routes';
import ListItemIcon from './ListItemIcon';
import SignOutMenuItem from './SignOutMenuItem';

export default function Sidebar() {
  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Diary" />
          <ExpandLess />
        </ListItem>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/" sx={{ paddingLeft: 4 }}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to={REPORTS_ROUTE}
            sx={{ paddingLeft: 4 }}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </List>
      </List>
      <Divider />
      <List>
        <SignOutMenuItem />
      </List>
    </>
  );
}
