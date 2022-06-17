import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Error from '../Zwischenelemente/Error';
import Loader from '../Zwischenelemente/Loader'
import { touchRippleClasses } from '@mui/material';
import { applyActionCode } from 'firebase/auth';
import { breakpoints } from '@mui/system';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Buchungen extends Component{

    constructor(props){
        super(props);
        this.kommen = null;
        this.gehen = null;

        this.state = {loading: false, buttonText: "Kommen", currentUser: this.props.currentUser};

    }
    render(){
        return(
        <div>
            <h1>Buchungen</h1>
            <Button variant="contained" onClick={() => this.handleClick()} > Kommen </Button>
            <p>Letzte Kommen Buchung um </p>
            <Button variant="contained" > Gehen </Button>
            <p>Letzte Gehen Buchung um </p>
            <Divider sx={{margin:"20px"}}/>

            <Stack display="flex" flex-direction="row">
            <Box sx={{ maxWidth: 120}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Aktivität</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                >
                  <MenuItem value={10}>Eins</MenuItem>
                  <MenuItem value={20}>Zwei</MenuItem>
                  <MenuItem value={30}>Drei</MenuItem>
                </Select>
              </FormControl>
              <TextField id="outlined-basic" label="Beginn" variant="outlined" type="time"/>
              <TextField id="outlined-basic" label="Ende" variant="outlined" type="time"/>
              <Button variant="contained" > Buchen </Button>
            </Box>
            </Stack>

            <Divider sx={{margin:"20px"}}/>

            <Box sx={{ maxWidth: 120}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pause</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                >
                  <MenuItem value={10}>Eins</MenuItem>
                  <MenuItem value={20}>Zwei</MenuItem>
                  <MenuItem value={30}>Drei</MenuItem>
                </Select>
                <TextField id="outlined-basic" label="Beginn" variant="outlined" type="time"/>
              <TextField id="outlined-basic" label="Ende" variant="outlined" type="time"/>
              <Button variant="contained" > Buchen </Button>
              </FormControl>
            </Box>
        </div>
    )
  }
    
}

export default Buchungen;
