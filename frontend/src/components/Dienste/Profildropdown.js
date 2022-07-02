import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import Profil from '../pages/Profil';
import SystemAPI from '../../api/SystemAPI';
import PersonBO from '../../api/PersonBO';

/** Represemtiert die Profil-Dropdown Komponente unter welcher man sein Profil ansehen kann, sich Ausloggen kann und seinen Accoutn löschen kann.
 * @author Luca Trautmann
 */


class ProfileDropDown extends Component {


    #avatarButtonRef = createRef();

    constructor(props) {
        super(props);

        // setzt start States
        this.state = {
            open: false,
            show: false,
            person: null,
        }

        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        let path = '/Profil';
        this.props.history.push(path);
    }

    //Öffnet auf klick das Dropdown Menü
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

    //Funktion um Person aus dem Backend zu löschen
    deletePerson = () => {
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid)
            .then(PersonBO => {
                console.log(PersonBO.id);
                SystemAPI.getAPI().deletePerson(PersonBO.id)
             }

            )
    }
  
    //Funktion welche zum löschen des Accounts führt
    handledelete = () => {
        console.log("löschen wurde angefordert")
        //Kontrollfenster zur Bestätigung ob wirklich gelöscht werden soll
        if (window.confirm('Bist du dir sicher, dass du deinen Account löschen möchtest?')) {
            //Ja - User wird ausgeloggt, gelöscht und erhält ein Bestätigungspopup.
            console.log('Löschung findet statt.');
            this.handleSignOutButtonClicked()
            this.deletePerson();
            console.log("löschung ist durch.");
            alert("Account wurde gelöscht.")
            
        } else {
            // Abbrechen - Keine Löschung
            console.log('Keine Löschung.');
        }


    }

    render() {
        const { user } = this.props;
        const { open } = this.state;

        console.log(this.props.user)

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

                        <Paper sx={{ padding: 1, bgcolor: 'background.default' }}>

                            <Grid container justifyContent='center'>

                                <Grid item align='center'>
                                   {/*  Begrüßung mit eingelesenem Username  und Button mit deren oben Beschriebenen Funktionen*/}
                                    <Typography align='center'>Hallo {user.displayName}</Typography>
                                    <Divider sx={{ margin: 1 }} />
                                    <Typography align='center' variant='body2'>{user.email}</Typography>
                                    <Divider sx={{ margin: 1 }} />
                                    <Profil user={user} />
                                    <Divider sx={{ margin: 1 }} />
                                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button> <br />
                                    <Divider sx={{ margin: 1 }} />
                                    <Button onClick={this.handledelete}>Account löschen</Button>

                                </Grid>
                            </Grid>
                        </Paper>

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