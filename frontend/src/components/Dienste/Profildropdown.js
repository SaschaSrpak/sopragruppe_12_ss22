import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, Typography, Paper, Button, Grid, Divider} from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
/**
 * @author
 */


class ProfileDropDown extends Component {

    #avatarButtonRef = createRef();

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            open: false,
        }
    }

    /** Handles click events on the avatar button and toggels visibility */
    handleAvatarButtonClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    /** 
     * Handles click events from the ClickAwayListener.
     * 
     * @see See Material-UIs [ClickAwayListener](https://mui.com/material-ui/react-click-away-listener/)
     */
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    /** 
     * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
     * 
     * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
     * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
     */
    handleSignOutButtonClicked = () => {
        const auth = getAuth();
        signOut(auth);
    }

    handleProfilButtonClicked = () => {
        const navigate = useNavigate('/Profil');

    }

    render() {
        const { user } = this.props;
        const { open } = this.state;

        return (
            user ?
                <div>
                    <IconButton sx={{ align: 'right' }} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
                        <Avatar src={user.photoURL} />
                    </IconButton>

                    <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Paper sx={{ padding: 1, bgcolor: 'background.default' }}>
                                <Typography align='center'>Hallo {user.displayName}</Typography>
                                <Divider sx={{ margin: 1 }} />
                                <Button  onClick={this.handleProfilButtonClicked}>Profil</Button>
                                <Divider sx={{ margin: 1 }} />
                                <Grid container justifyContent='center'>
                                    <Grid item>
                                        <LogoutIcon/>
                                        <Button color='primary' style={{position:"relative",bottom:7}} onClick={this.handleSignOutButtonClicked}>Logout</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ClickAwayListener>
                    </Popover>
                </div>
                : null
        )
    }
}

/** PropTypes */
ProfileDropDown.propTypes = {
    /** The logged in firesbase user */
    user: PropTypes.object,
}

export default ProfileDropDown;