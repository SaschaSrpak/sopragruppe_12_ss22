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
            sn = props.person.getSurname();
            ma = props.person.getMail_address();
            un = props.person.getUser_name();
            ms = props.person.getManager_status();

        }

        this.state = {
            person: null,
            name: n,
            surname: sn,
            mail_address: ma,
            user_name: un,
            manager_status: ms,
            
            updatingInProgress: false,
            updatingError: null,

        }

        this.baseState = this.state;

        console.log("hallo neuer Dude")
    }

    handleClickOpen = () => {

        this.setState({
            open: !this.state.open
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
        this.getPerson();
    }

    updatePerson = () => {
        let updatedPerson = Object.assign(new PersonBO(), this.state.person)
        updatedPerson.setName(this.state.name);
        updatedPerson.setSurname(this.state.surname);
        updatedPerson.setManager_status(this.state.manager_status)
        SystemAPI.getAPI().updatePerson(updatedPerson).then(person => {
            this.setState({

            })
        });
        this.baseState.name = this.state.name;

        this.props.handleClose();
    }


    render() {

        
        const { open } = this.props;
        const { name, surname, mail_address, user_name, manager_status } = this.state;

        return (

            <React.Fragment>
               
                <Dialog open={open} onClose={this.props.handleClose}>
                    <DialogTitle>Profil</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Bitte Vervollständige dein Profil noch!
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

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Managerstatus</InputLabel>
                            <Select
                                label="Managerstatus"
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={manager_status}
                                
                                onChange={this.handleChangeDrop}
                            >

                                <MenuItem value={"1"}>Projektmanager</MenuItem>
                                <MenuItem value={"0"}>Projektmitarbeiter</MenuItem>
                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose}>Cancel</Button>
                        <Button onClick={this.updatePerson}>Save</Button>
                    </DialogActions>
                </Dialog >
            </React.Fragment >
        );
    }


}
export default Profil;