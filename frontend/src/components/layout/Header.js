import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Toolbar, Typography, Box, Drawer, List } from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DrawerComponent from './DrawerComponent';
import Container from '@mui/material/Container';

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

        // this.handleClose = () => {
        //     this.state = {setAnchorEl: true};
        // };

        // this.handleDrawer = () => {
        //     this.setOpen = {setOpen: true}
        // }

    }

    render() {

        const { user } = this.props;

        return (
            <Box sx={{ display: 'space-between' }}>
                <Container align="center">
                    <Appbar postion="static" sx={{ width: '100%' }}>
                        <Toolbar variant="dense" align="center">
                            <DrawerComponent />
                            
                            <div style={{margin: '0 auto'}}>
                                <Typography variant='h5' align='center'>
                                    {user ? <>Willkommen im Zeiterfassungssystem</> : <>Niemand ist eingeloggt</>}
                                </Typography>
                            </div>
                            <div >
                                <ProfileDropDown user={user} />
                            </div>
                        </Toolbar>
                    </Appbar>
                </Container>

            </Box>
        )
    }
}

export default Header;

