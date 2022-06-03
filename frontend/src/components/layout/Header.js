import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Typography } from '@mui/material';


export class Header extends Component {
    render() {
        const{classes} = this.props;
        const { currentUser } = this.props;
        return (
            <Appbar>
                <Typography>
                    Willkommen zur Zeitmanagement App lets gooo
                </Typography>
            </Appbar>
        )
    }
}

export default Header;