import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuIcon from '@mui/icons-material/Menu';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom"
import { IconButton } from '@mui/material';

export default function TemporaryDrawer() {

  const useStyles = makeStyles({
    drawer: {
      width: "200px"
    }
  });

  const navigate = useNavigate();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 225 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding onClick={() => navigate('/Home')}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate('/Buchungen')}>
          <ListItemButton>
            <ListItemIcon>
              <AccessTimeFilledIcon />
            </ListItemIcon>
            <ListItemText primary={"Buchungen"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate('/Projektanzeige')}>
          <ListItemButton>
            <ListItemIcon>
              <FactCheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Projektanzeige"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate('/About')}>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"Über uns"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <MenuIcon onClick={toggleDrawer(anchor, true)} />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </IconButton>

        </React.Fragment>
      ))}
    </div>
  );
}

