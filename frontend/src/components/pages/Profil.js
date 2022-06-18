import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Toolbar, Typography, Box, Drawer, List } from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';
import DrawerComponent from '../layout/DrawerComponent';
import Container from '@mui/material/Container';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

class Header extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {

        const { user } = this.props;

        return (
            <p>
                Hallo
            </p>
        )
    }
}

export default Header;

