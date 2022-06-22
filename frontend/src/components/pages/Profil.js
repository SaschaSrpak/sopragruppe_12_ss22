// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button onClick={handleClickOpen}>
//         Profil
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Ihr Profil</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Änderungen in Ihrem Profil können hier vorgenommen werden.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


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
import { Divider } from '@mui/material';

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
            open: false,
            menuIsOpen: false
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

    handleRoleChange = event => {
        event.stopPropagation();
        this.state({
            open: true
        });
    }

    openMenu = () => {
        this.refs.focus();
        this.setState({ menuIsOpen: true });
      };

    onInputChange = (options, { action }) => {
    if (action === "menu-close") {
        this.setState({ menuIsOpen: false });
    }
    };

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
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth>
                            <InputLabel>Projektrolle</InputLabel>
                            <Select
                                label="Projektrolle"
                                onClick={this.handleRoleChange}
                            >
                                <MenuItem value={1}>Projektmanager</MenuItem>
                                <Divider sx={{ margin: 1 }} />
                                <MenuItem value={0}>Projektmitarbeiter</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


}
export default Profil;