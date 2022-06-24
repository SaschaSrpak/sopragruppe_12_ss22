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


class Profil extends Component {

    constructor(props) {
        super(props);


        let n = '', sn = '', ma = '', un = '', ms = '';
        if (props.person) {
            n = props.person.getName();
            sn = props.person.getSurename();
            ma = props.person.getMail_adress();
            un = props.person.getUser_name();
            ms = props.person.getManager_status();

        }

        this.state = {
            name: n,
            surename: sn,
            mail_adress: ma,
            user_name: un,
            manager_status: ms,
            open: false,
            updatingInProgress: false,
            updatingError: null,

        }

        this.baseState = this.state;
    }

    handleClickOpen = () => {

        this.setState({
            open: !this.state.open
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        })

    }

    handleChangeDrop = (event) => {
        console.log(event.target)
        this.setState({
            manager_status: event.target.value,
        })
    }
    
    getPerson = () => {
        SystemAPI.getApi().getPersonbyfirebaseID()
        .then(PersonBO =>
            this.setState({
                person: PersonBO,
            }))
    }

    updatePerson = () => {
        let updatedPerson = Object.assign(new PersonBO(), this.props.person)
        updatedPerson.setName(this.state.name);
        updatedPerson.setSurname(this.state.surename);
        SystemAPI.getApi().updatePerson(updatedPerson).then(person => {
            this.setState({

            })
        });
        this.baseState.name = this.state.name;
        this.props.onClose(updatedPerson);
    }


    render() {

        const { open } = this.state;
        const { name, surname, mail_adress, user_name, manager_status } = this.state;

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

                            margin="dense"
                            id="mail_adress"
                            label="Email Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={mail_adress}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                            onChange={this.handleChange}
                        />
                        
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

                                <MenuItem value={1}>Projektmanager</MenuItem>
                                <MenuItem value={0}>Projektmitarbeiter</MenuItem>
                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSave}>Save</Button>
                    </DialogActions>
                </Dialog >
            </React.Fragment >
        );
    }


}
export default Profil;