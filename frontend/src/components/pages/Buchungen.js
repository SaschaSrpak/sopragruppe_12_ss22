import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import SystemAPI from '../../api/SystemAPI';
import PropTypes from 'prop-types';
import Error from '../Zwischenelemente/Error';
import Loader from '../Zwischenelemente/Loader'

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


  // kommenButtonClicked = event =>{
  //   let newKommen = new KommenBO("kommen", this.state.currentDateTime);
  //   SystemAPI.getAPI().commitKommenTransaction(this.props.person.getID(), newKommen).then(personBO =>
  //     this.setState({

  //     })
  //     )
  // }

 // aktivitätBuchen = () => {
  //  SystemAPI.getAPI().getActivitiesForPersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}/activity`

  //}

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
