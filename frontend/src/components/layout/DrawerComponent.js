// import React, { useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemIcon,
//   IconButton,
//   ListItemText,
//   makeStyles,
//   Drawer,
// } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

// const DrawerComponent = () => {
//   const useStyles = makeStyles(theme => ({
//     drawerContainer: {},
//     iconButtonContainer: {
//       marginLeft: 'auto',
//       color: 'white',
//     },

//   }));

//   const [openDrawer, setOpenDrawer] = useState(false);

//   //Css
//   const classes = useStyles();
//   return (
//     <>
//       <Drawer
//         anchor='left'
//         classes={{ paper: classes.drawerContainer }}
//         onClose={() => setOpenDrawer(false)}
//         open={openDrawer}
//         onOpen={() => setOpenDrawer(true)}>
//         <List>
//           <ListItem divider button onClick={() => setOpenDrawer(false)} disablePadding>
//             <HomeIcon />
//             <ListItemIcon>
//               <ListItemText>Startsteite</ListItemText>
//             </ListItemIcon>
//           </ListItem>

//           <ListItem divider button onClick={() => setOpenDrawer(false)}>
//             <AccountCircleIcon />
//             <ListItemIcon>
//               <ListItemText>Profil</ListItemText>
//             </ListItemIcon>
//           </ListItem>

//           <ListItem divider button onClick={() => setOpenDrawer(false)}>
//             <AccessTimeIcon />
//             <ListItemIcon>
//               <ListItemText>Buchung</ListItemText>
//             </ListItemIcon>
//           </ListItem>
//         </List>
//       </Drawer>
//       {/* Since this is inside our toolbar we can push it to the end of the toolbar */}
//       <IconButton
//         className={classes.iconButtonContainer}
//         onClick={() => setOpenDrawer(!openDrawer)}
//         disableRipple>
//         <MenuIcon className={classes.menuIconToggle} />
//       </IconButton>
//     </>
//   );
// };

// export default DrawerComponent;

import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuIcon from '@mui/icons-material/Menu';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from "react-router-dom"

export default function TemporaryDrawer() {

  const useStyles = makeStyles({
    drawer: {
      width: "200px"
    }
  });

  // const Drawer = props => {
  //   const { history } = props;
  //   const classes = useStyles();
  //   const itemsList = [
  //     {
  //       text: "Home",
  //       icon: <HomeIcon />,
  //       onClick: () => history.push("Home")
  //     },
  //     {
  //       text: "Profil",
  //       icon: <AccountCircleIcon />,
  //       onClick: () => history.push("/")
  //     },
  //     {
  //       text: "Buchung",
  //       icon: <AccessTimeIcon />,
  //       onClick: () => history.push("/Buchungen")
  //     }
  //      {
  //       text: "Projektanzeige",
  //       icon: <AccountCircleIcon />,
  //       onClick: () => history.push("/Projektanzeigen")
  //     },
  //     {
  //       text: "Projektauswahl",
  //       icon: <AccountCircleIcon />,
  //       onClick: () => history.push("/ProjekteWahl")
  //     },
  //   ];

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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
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
        <ListItem disablePadding onClick={() => navigate('/Profil')}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Profil"} />
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
        <MenuIcon  onClick={toggleDrawer(anchor,true)}/>


          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

