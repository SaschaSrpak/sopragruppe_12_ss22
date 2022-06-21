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
              aria-controls="panel1a-content"
              id="panel1a-header" 
              >
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                  <Grid item>
                    <Typography variant='body1' sx={{typography: 'heading'}}>
                    </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup variant='text' size='small'>
                    <Button color='primary' >
                      edit
                    </Button>
                    <Button color='secondary' >
                      delete
                      </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography>Projektarbeitszeiten</Typography>
                </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header" 
              >
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                  <Grid item>
                    <Typography variant='body1' sx={{typography: 'heading'}}>
                    </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup variant='text' size='small'>
                    <Button color='primary' >
                      edit
                    </Button>
                    <Button color='secondary' >
                      delete
                      </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography>Pausen</Typography>
                </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header" 
              >
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                  <Grid item>
                    <Typography variant='body1' sx={{typography: 'heading'}}>
                    </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup variant='text' size='small'>
                    <Button color='primary' >
                      edit
                    </Button>
                    <Button color='secondary' >
                      delete
                      </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography>Kommen</Typography>
                </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header" 
              >
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                  <Grid item>
                    <Typography variant='body1' sx={{typography: 'heading'}}>
                    </Typography>
                </Grid>
                <Grid item>
                  <ButtonGroup variant='text' size='small'>
                    <Button color='primary' >
                      edit
                    </Button>
                    <Button color='secondary' >
                      delete
                      </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography>Gehen</Typography>
                </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>
            
        </div>
                
        )
    }
}

export default Auslese;