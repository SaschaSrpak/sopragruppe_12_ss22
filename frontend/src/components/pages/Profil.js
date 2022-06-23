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
import Box from '@mui/material/Box';
import PersonBO from '../../api/PersonBO';


class Profil extends Component {

    constructor(props) {
        super(props);


        let n = '', sn = '', ma = '',un = '',ms = '';
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
            updatingError: null
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

    handleChange = () => {
        this.setState({
            open: !this.state.open
        });
    }

   /*  updatePerson = () => {
       let updatedPerson = Object.assign(new PersonBO(), this.props.person)
        updatedPerson.setUser_name(this.state.user_name);
        SystemAPI.updatePerson(updatedPerson).then(person =>{
            this.setState({
                    
            })
        });
        this.baseState.user_name = this.state.user_name;
        this.props.onClose(updatedPerson);
    } */


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
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user_name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Vorname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nachname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={surname}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={mail_adress}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Personenstatus</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={manager_status}
                            /* onChange={this.handleChange} */
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