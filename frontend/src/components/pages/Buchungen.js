import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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

/*     constructor(props){
        super(props);
        this.kommen = null;
        this.gehen = null;

        this.state = {btnText: "Kommen",};

    }

    getZeitkonto(){

    }

    getZeitintervall(){

    }

    handleClick = () => {
      let btnText = this.state.btnText == "Kommen" ? "Gehen" : "Kommen"
      this.setState({btnText: btnText})
      this.changeState();
      let zeitstempel = new Date();
      
      switch(this.state.changeState){
        case false:
          this.Kommen = new KommenBuchungBO(zeitstempel);
          break;
        case true:
          this.Gehen = new GehenBuchungBO(zeitstempel);
          break;
          default: 
          break;
        }

    } */
    render(){
      return(
          <div>
                  <div style={{textAlign: "center"}}>
                  <h1>Buchungen</h1>
                  <Button variant="contained" onClick={() => this.handleClick()} > Kommen </Button>
                  <p></p>
                  <Button variant="contained" onClick={() => this.handleClick()} > Gehen </Button>
                  </div>
  
                  <Divider sx={{margin:"20px"}}/>
              
              
                  <Stack 
                  direction={{ sm: 'row' }}
                  >
                    <FormControl fullWidth>
                      <InputLabel >Aktivität</InputLabel>
                      <Select 
                      id="Aktivität"
                      label="Aktivität"
                      >
                        <MenuItem value={10}>Eins</MenuItem>
                        <MenuItem value={20}>Zwei</MenuItem>
                        <MenuItem value={30}>Drei</MenuItem>
                      </Select>  
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Beginn"/>
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Ende"/>
                    <Button variant="contained" > Buchen </Button>
                    </FormControl>
                    </Stack>
              
                  <Divider sx={{margin:"20px"}}/>
  
                  <Stack 
                  direction={{ sm: 'row' }}
                  >
                    <FormControl fullWidth>
                    <Typography style={{position:"relative", left: 10}} id="outlined-basic"> Pause</Typography>
                    <p></p>
                    <TextField id="outlined-basic" label="Beginn" variant="outlined" type="time"/>
                    <TextField id="outlined-basic" label="Ende" variant="outlined" type="time"/>
                    <Button variant="contained"> Buchen </Button>
                    </FormControl>
                  </Stack>
          </div>
      )
    }
    
}

export default Buchungen;
