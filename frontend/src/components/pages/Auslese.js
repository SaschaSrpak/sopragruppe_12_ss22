import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SystemAPI from '../../api/SystemAPI';
import Listen from '../pages/Listen'

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Auslese extends Component {
  constructor(props){
    super(props);

    let KommenID = null;

    if (this.state) {
      KommenID = this.state.expandedKommenID;
    }

    this.state ={
      Error: false,
      Loader: false,
      expandedKommenID: KommenID,
    }

  }

  /*onExpandedStateChange = kommen => {
    
    let newID = null;

    if (kommen.getKommen() !== this.state.expandedKommenID) {
      
      newID = kommen.getKommen();
    }
    this.setState({
      expandedKommenID: newID,
    });
    */

    render() {
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
            
        </div>
                
        )
    }
}

export default Auslese;