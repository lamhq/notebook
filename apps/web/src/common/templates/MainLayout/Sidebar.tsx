import BookIcon from '@mui/icons-material/Book';
import ExpandLess from '@mui/icons-material/ExpandLess';
import TimelineIcon from '@mui/icons-material/Timeline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router';
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
        </List>
      </List>
      <Divider />
      <List>
        <SignOutMenuItem />
      </List>
    </>
  );
}
