import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateDialog from '../Zwischenelemente/UpdateDialog';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Auslese extends Component {
  constructor(props){
    super(props);

    this.state ={
      Error: false,
      Loader: false,
      showUpdateDialog: false,
    }

  }

  
  editButtonClicked = (event) => {
      event.stopPropagation();
      this.setState({
        showUpdateDialog: true
      });
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

    render() {
      const { showUpdateDialog ,open } = this.state;
        return (
            <div>
            <h1 style={{textAlign: "center"}}>Buchungen Auslesen</h1>
            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              >
                <Typography> Arbeitszeiten</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <ButtonGroup variant='text' size='small' style={{textAlign: "right"}}>
                  <Button color='primary' onClick={""}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteKommenButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              >
                <Typography>Pause</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <ButtonGroup variant='text' size='small' style={{textAlign: "right"}}>
                  <Button color='primary' onClick={""}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={""}>
                    delete
                  </Button>
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Kommen</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <ButtonGroup variant='text' size='small' style={{alignItems: "right"}}>
                  <Button color='primary' onClick={""}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteKommenButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>
            

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              >
               <Typography>Gehen</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <ButtonGroup variant='text' size='small' style={{textAlign: "right"}}>
                  <Button color='primary' onClick={""}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={""}>
                    delete
                  </Button>
                </ButtonGroup>
              </AccordionDetails>
            </Accordion>

            <Button onClick={this.editButtonClicked}>
                    Edit
            </Button>

            <Button variant="outlined" onClick={this.handleClickOpen}>
              Open form dialog
            </Button>
            
            <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle> Lösche deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Möchtest du die Buchung wirklich löschen?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleClose}>Löschen</Button>
                        </DialogActions>
                </Dialog>
            
            
        </div>
                
        )
    }
}

export default Auslese;