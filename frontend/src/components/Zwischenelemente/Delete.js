import React, { Component } from 'react';
import SystemAPI from '../../api/SystemAPI';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KommenBuchungBO from '../../api/Buchungen/KommenBuchungBO';
import PropTypes from 'prop-types';
import Loader from './Loader';
import Error from './Error';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

class Delete extends Component {

    constructor(props) {
      super(props);

      this.state = {
        deletingInProgress: false,
        deletingError: null
      };

    }

    deleteKommen = () => {
        SystemAPI.getAPI().getKommenTransactionsOfAccount(this.props.kommen.getID()).then(kommen=>{
            this.setState({
                deletingInProgress: false,                
                deletingError: null                     
              });
            this.props.onClose(this.props.kommen);
        }).catch(e =>
            this.setState({
              deletingInProgress: false,              
              deletingError: e                        
            })
        );

        this.setState({
            deletingInProgress: true,                 
            deletingError: null                       
          });
    }

    handleClose = () => {
        // console.log(event);
        this.props.onClose(null);
      }

    render(){
        const { kommen, show } = this.props;
        const { deletingInProgress, deletingError } = this.state;

        return(
            show?
            <Dialog open={show} onClose={this.handleClose}>
            <DialogTitle id='delete-dialog-title'>Delete Kommen
              <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Really delete KommenBuchung'{kommen.getKommen()}?
              </DialogContentText>
              <Loader show={deletingInProgress} />
              <Error error={deletingError} contextErrorMsg={`Die Buchung '${kommen.getKommen()}  could not be deleted.`}
                onReload={this.deleteKommen} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='secondary'>
                Cancel
              </Button>
              <Button variant='contained' onClick={this.deleteCustomer} color='primary'>
                Delete
              </Button>
            </DialogActions>
            </Dialog>
          : null
      );
    
    }

}

export default Delete;