import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Typography } from '@mui/material';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/



export class Header extends Component {
    

    render() {
        const{classes} = this.props;
        const { currentUser } = this.props;
        
        return (
            <Appbar>
                
                <Typography variant='h3' component='h1' align='center'>
                {currentUser?<>Jemand ist eingeloggt</>:<>Niemand ist eingeloggt</>}
                <br></br>Willkommen in der Zeitmanagement APP
                
                </Typography>               
            {
               
        }
            </Appbar>
        )
    }
}

export default Header;