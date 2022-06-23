import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, ButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

/** 
 *@fileOverview 
 *@author
*/

export class Auslese extends Component {



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
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              >
                <Typography>Pause</Typography>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Kommen</Typography>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              >
               <Typography>Gehen</Typography>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>
            
        </div>
                
        )
    }
}

export default Auslese;