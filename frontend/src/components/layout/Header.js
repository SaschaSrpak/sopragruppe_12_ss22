import React from 'react';
import Appbar from '@mui/material/AppBar';
import { Toolbar, Typography, Box, Drawer, List } from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';
import DrawerComponent from './DrawerComponent';
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
            <Box sx={{ display: 'space-between' }}>
                <Container align="center">
                    <Appbar position="fixed" sx={{ width: '100%' }}>
                        <Toolbar postion="fixed" variant="dense" align="center">
                            <DrawerComponent />

                            <div style={{ margin: '0 auto' }}>
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

