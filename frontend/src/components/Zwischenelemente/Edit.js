import React, { Component } from 'react';
import { SystemAPI } from '../../api';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

class Edit extends Component {

    constructor(props) {
      super(props);

    
      this.state={
        
    }
      
      this.baseState = this.state;

    }


    render(){
       
        return(
            show ?
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                    <DialogTitle id='form-dialog-title'>{'Aktulaisieren Ihrer Buchung'}
                        <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {'Gebe die neuen Daten hier ein:'}
                        </DialogContentText>
                        <form sx={{width: '100%'}} noValidate autoComplete='off'>
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='firstName' label='First name:' value={firstName}
                                onChange={this.textFieldValueChange} error={firstNameValidationFailed}
                                helperText={firstNameValidationFailed ? 'The first name must contain at least one character' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='lastName' label='Last name:' value={lastName}
                                onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                                helperText={lastNameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='lastName' label='Last name:' value={lastName}
                                onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                                helperText={lastNameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='lastName' label='Last name:' value={lastName}
                                onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                                helperText={lastNameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                        </form>
                    <LoadingProgress show={addingInProgress || updatingInProgress} />
                    {
                        <ContextErrorMessage error={updatingError} contextErrorMsg={`Die Buchung ${customer.getID()} konnte nicht aktualisiert weden.`} onReload={this.updateCustomer} />
                    }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Cancel
                        </Button>
                        {
                        <Button disabled={firstNameValidationFailed || lastNameValidationFailed} variant='contained' onClick={this.updateCustomer} color='primary'>
                        Update
                        </Button>
                        }
                    </DialogActions>
                </Dialog>
                : null
            );
    }

}

export default Edit;