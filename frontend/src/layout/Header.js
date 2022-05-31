import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Typography } from '@mui/material';


class Header extends Component {
    render() {
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