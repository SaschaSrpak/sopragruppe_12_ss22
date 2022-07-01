import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


/** 
 *@fileOverview 
 *@author Kim Kausler
*/

class UpdateDialog extends Component {

    constructor(props) {
      super(props);

      this.state = {
       open: true
      };

    }

    handleClickOpen = () => { 
        this.setState({
          open: !this.state.open
        })
      };
    
    handleClose = () => {
        this.setState({
          open: false
      });
    };
   
    render(){

        const { open } = this.state;
        return(

                <Dialog open={false} onClose={this.handleClose}>
                    <DialogTitle>Aktualisiere deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite deine Buchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="User"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={this.props.id}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField 
                            autoFocus
                            margin="dense"
                            label="Startzeitpunkt"
                            type="datetime-local"
                            defaultValue="2022-07-04T12:00"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField 
                            autoFocus
                            margin="dense"
                            label="Endzeitpunkt"
                            type="datetime-local"
                            defaultValue="2022-07-04T12:00"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                    
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleClose}>Update</Button>
                        </DialogActions>
                </Dialog>

        )
    }


}

export default UpdateDialog;