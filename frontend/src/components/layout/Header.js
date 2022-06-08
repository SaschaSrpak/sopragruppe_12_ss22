import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Typography, Paper } from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/





class Header extends Component {



    render() {
        const { user } = this.props;

        return (
            <Paper>
                <Appbar>
                    <ProfileDropDown user={user} />
                    <Typography variant='h3' component='h1' align='center'>
                        {user ? <>Jemand ist eingeloggt</> : <>Niemand ist eingeloggt</>}<br />
                        Willkommen in der Zeitmanagement App
                    </Typography>
                </Appbar>
            </Paper>
        )
    }
}

export default Header;