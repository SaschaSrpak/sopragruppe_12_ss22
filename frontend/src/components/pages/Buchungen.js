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
import SystemAPI from '../../api/SystemAPI';
import KommenBO from '../../api/Ereignisse/KommenBO';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Buchungen extends Component{
  
  constructor(props){
    super(props);
    this.kommen = null;
    this.gehen = null;

    this.state = {btnText: "Kommen",};
  }


  kommenButtonClicked = event =>{
    let newKommen = new KommenBO();
    newKommen.event_name = "";
    newKommen.time_of_event = new Date().toISOString().slice(0, -5);
    SystemAPI.getAPI().commitKommenTransaction(this.props.person.getID(), newKommen).then(personBO =>
      this.setState({

      })
      )
  }

  aktivitätBuchen = () => {

  }
/* 
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
                  <Button variant="contained" onClick={() => this.kommenButtonClicked()} > Kommen </Button>
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
                    <TextField required id="outlined-required" label="Required" defaultValue="Aktivität Beschreibung"/>
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Beginn" InputLabelProps={{shrink: true,}}/>
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Ende" InputLabelProps={{shrink: true,}}/>
                    <Button variant="contained" > Buchen </Button>
                    </FormControl>
                    </Stack>
              
                  <Divider sx={{margin:"20px"}}/>
  
                  <Stack 
                  direction={{ sm: 'row' }}
                  >
                    <FormControl fullWidth>
                    <h2>Pause</h2>
                    <TextField required id="outlined-required" label="Required" defaultValue="Pause Beschreibung"/>
                    <TextField id="outlined-basic" label="Beginn" variant="outlined" type="time" InputLabelProps={{shrink: true,}}/>
                    <TextField id="outlined-basic" label="Ende" variant="outlined" type="time" InputLabelProps={{shrink: true,}}/>
                    <Button variant="contained"> Buchen </Button>
                    </FormControl>
                  </Stack>
          </div>
      )
    }
    
}

export default Buchungen;
