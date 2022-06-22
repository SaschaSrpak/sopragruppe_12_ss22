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


class Profil extends Component {

    constructor(props) {
        super(props);

        let fn = '', ln = '';
        if (props.customer) {
            fn = props.customer.getFirstName();
            ln = props.customer.getLastName();
        }

        this.state = {
            firstname: fn,
            lastname: ln,
            open: false
        }
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
    
    handleSave = () => {
        
        }
    

    render() {

        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    Profil
                </Button>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Profil</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Profil anschauen und bearbeiten
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="Username"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Vorname"
                            type="Vorname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nachname"
                            type="Nachname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Personenstatus</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                /* value={age} */
                                onChange={this.handleClickOpen}
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
            </div >
        );
    }


}
export default Profil;