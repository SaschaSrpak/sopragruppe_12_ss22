import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PersonBO from '../../api/PersonBO';
import SystemAPI from '../../api/SystemAPI';

/**
 *@fileOverview Repersentiert ein Popup welche als Profilübersicht mit den Aktuellen Daten des Nutzers anzeigen. 
 Änderungen können ebenso gemacht werden.
 *@author Luca Trautmann, Jeffrey He
*/

class Profil extends Component {

    constructor(props) {
        super(props);

        //Konstruiert alle Variablen für die Profilübersicht
        let n = '', sn = '', ma = '', un = '', ms = '';
        if (props.person) {
            n = props.person.getName();
            sn = props.person.getSurname();
            ma = props.person.getMail_address();
            un = props.person.getUser_name();
            ms = props.person.getManager_status();
        }
        //setzt alle Standartstates für die Variablen
        this.state = {
            person: null,
            name: n,
            surname: sn,
            mail_address: ma,
            user_name: un,
            manager_status: ms,
            open: false,
            updatingInProgress: false,
            updatingError: null,

        }

        this.baseState = this.state;

        console.log("hallo")
    }
    // Bei Klick auf Profil-Button öffnet sich das Profil-Popup
    handleClickOpen = () => {
        this.getPerson();
        this.setState({
            open: !this.state.open
        });
    }

    //Schließt das Popup Feld wieder
    handleClose = () => {
        this.setState({
            open: false
        });
    }

        //Verarbeitet veränderte Werte der Eingabefelder
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        })

    }

     //Verarbeitet veränderten Wert des Dropdowns
    handleChangeDrop = (event) => {
        console.log(event.target)
        this.setState({
            manager_status: event.target.value,
        })
    }

    //Funktion um alle Daten einer Person aus dem Backend zu ziehen
    getPerson = () => {
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid)
            .then(PersonBO =>
                this.setState({
                    person: PersonBO,
                    name: PersonBO.getName(),
                    surname: PersonBO.getSurname(),
                    mail_address: PersonBO.getMail_address(),
                    user_name: PersonBO.getUser_name(),
                    manager_status: PersonBO.getManager_status(),
                }))
    }

    componentDidMount() {
    }

    //übergibt alle geupdateten Werte an das Backend
    updatePerson = () => {
        let updatedPerson = Object.assign(new PersonBO(), this.state.person)
        updatedPerson.setName(this.state.name);
        updatedPerson.setSurname(this.state.surname);
        SystemAPI.getAPI().updatePerson(updatedPerson).then(person => {
            this.setState({
            })
        });
        this.baseState.name = this.state.name;
        //Auf klick wird das Fenster wieder geschlossen
        this.handleClose();
    }



    render() {

        const { open } = this.state;
        const { user } = this.props;
        const { name, surname, mail_address, user_name, manager_status } = this.state;

        return (

            <React.Fragment>
                <Button onClick={this.handleClickOpen}>
                    Profil
                </Button>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Profil</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Profil anschauen und deinen Username bearbeiten.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Vorname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={this.handleChange}
                        />
                        <TextField

                            margin="dense"
                            id="surname"
                            label="Nachname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={surname}
                            onChange={this.handleChange}
                        />
                        <TextField
                            disabled
                            margin="dense"
                            id="user_name"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user_name}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange}

                        />
                        <TextField
                            disabled
                            margin="dense"
                            id="mail_address"
                            label="Email Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={mail_address}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                            onChange={this.handleChange}
                        />
                        <div><br></br></div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Managerstatus</InputLabel>
                            <Select
                                label="Managerstatus"
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={manager_status}
                                disabled
                                onChange={this.handleChangeDrop}
                            >

                                <MenuItem value={"1"}>Projektmanager</MenuItem>
                                <MenuItem value={"0"}>Projektmitarbeiter</MenuItem>
                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.updatePerson}>Save</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>


                    </DialogActions>
                </Dialog >
            </React.Fragment >
        );
    }


}
export default Profil;