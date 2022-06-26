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
import KommenBO from '../../api/Ereignisse/KommenBO';
import GehenBO from '../../api/Ereignisse/GehenBO';
import PersonBO from '../../api/PersonBO';
import { PauseBO } from '../../api';


/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Buchungen extends Component{
  
  constructor(props){
    super(props);
    this.kommen = null;
    this.gehen = null;
    

    this.state = {
      activities: [], 
      selectedActivities: null,
      activity: props.activity,
      buchung: null,
      beginnA: null, 
      endeA: null,
      pause: null,
      beginnP: null, 
      endeP: null, 
    }

    this.baseState = this.state;
  }



  kommenButtonClicked = event =>{
    let newKommen = new KommenBO();
    newKommen.event_name = "kommen";
    newKommen.time_of_event = this.getLocalTime();
    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
        console.log(result.id)
        SystemAPI.getAPI().commitKommenTransaction(result.id , newKommen)
    })


  }

    gehenButtonClicked = event =>{
    let newGehen = new GehenBO();
    newGehen.event_name = "gehen";
    newGehen.time_of_event = this.getLocalTime();

    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
        console.log(result.id)
        SystemAPI.getAPI().commitGehenTransaction(result.id , newGehen)
    })


  }
    getLocalTime = () => {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
      console.log(localISOTime)
    return localISOTime
    }
  

  componentDidMount() {
    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=> {
        console.log(result.id)
         SystemAPI.getAPI().getActivitiesForPerson(result.id).then((activities) => {
            this.setState({
            activities: activities
        })
    })})
  }

  handleChange = event => {
    this.setState({
        selectedActivities: event.target.value
    })
  }

  bookBuchung = () => {
     
  }

  bookPauseBuchen = event => {
    

  }
  
    render(){
      const {activities, selectedActivities} = this.state;
      return(
          <div>
                  <div style={{textAlign: "center"}}>
                  <h1>Buchungen</h1>
                  <Button variant="contained" onClick={() => this.kommenButtonClicked()} > Kommen </Button>
                  <p></p>
                  <Button variant="contained" onClick={() => this.gehenButtonClicked()} > Gehen </Button>
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
                        {activities.map((activity) => {
                        return (
                        <MenuItem key={activity.id} value={activity.id}>
                            {activity.name}
                        </MenuItem>)
                        })}
                      </Select>
                    <TextField required id="outlined-required" label="Required" defaultValue="Aktivität Beschreibung"/>
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Beginn" InputLabelProps={{shrink: true,}}/>
                    <TextField id="outlined-basic"  variant="outlined" type="time" label="Ende" InputLabelProps={{shrink: true,}}/>
                    <Button variant="contained" >  Aktivität Buchen </Button>
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
                    <Button variant="contained"> Pause Buchen </Button>
                    </FormControl>
                  </Stack>
          </div>
      )
    }
    
}

export default Buchungen;
