import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Toolbar, Typography, Box, Drawer, List} from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DrawerComponent from './DrawerComponent';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

class Header extends React.Component {
    
    constructor(props) {
        super(props)
        
        // this.state = {
        //     anchorEl: false, open: false, setOpen: false
        // }
        
        // this.useState = {
        //     auth: true, setOpen: false, open: false
        // }
        
        // this.handleMenu = (event) => {
        //     this.state = {setAnchorEl: event.currentTarget};
        // };
        
        this.handleClose = () => {
            this.state = {setAnchorEl: true};
        };

        this.handleDrawer = () => {
            this.setOpen = {setOpen: true}
        }

    } 

    render() {
        
        const { user } = this.props;

        return (
            <Box sx={{display: 'flex'}}>
                <Appbar postion="static" sx={{width:'100%'}} color= 'black'>
                    <Toolbar variant="dense" align="center">
                        <div>
                        <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={this.handleClose}
                                >
                                <MenuIcon />
                                <List>
                                    <MenuItem onClick={this.handleDrawer}>Home</MenuItem>
                                    <MenuItem onClick={this.handleDrawer}>Profil</MenuItem>
                                    <MenuItem onClick={this.handleDrawer}>Buchung</MenuItem>
                                </List>
                                </IconButton>
                                
                                
                        </div>
                        <div>
                            <Typography variant='h5' align='center'>
                                {user ? <>Willkommen im Zeiterfassungssystem</> : <>Niemand ist eingeloggt</>}
                            </Typography>
                        </div>
                        <div align='flex'>
                            <ProfileDropDown user={user}/>
                        </div>
                    </Toolbar>
                    
                <DrawerComponent/>
                </Appbar>
                </Box>
        )
    }
}

export default Header;

