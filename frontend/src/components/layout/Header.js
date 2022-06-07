import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Typography } from '@mui/material';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/





class Header extends Component {


    render() {
        const{classes} = this.props;
        const { user } = this.props;

        return (
            <Appbar>

                <Typography variant='h3' component='h1' align='center'>
                    {user ? <>Jemand ist eingeloggt</> : <>Niemand ist eingeloggt</>}
                    <br />Willkommen in der Zeitmanagement App

                </Typography>

            </Appbar>
        )
    }
}

export default Header;