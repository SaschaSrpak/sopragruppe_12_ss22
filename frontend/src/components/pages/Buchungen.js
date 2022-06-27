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
      activitydescription: null,
      pausedescription: null
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

    bookPauseClicked = event =>{
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{

            SystemAPI.getAPI().commitPauseTransaction(result.id, this.state.pausedescription, this.state.beginnP, this.state.endeP)
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
             console.log(activities)
    })})

  }

  handleChange = event => {
    this.setState({
        selectedActivities: event.target.value
    })
  }

    bookBuchung = event => {
    console.log(this.state.selectedActivities)
        console.log(this.state.beginnA)
        console.log(this.state.activitydescription)
        console.log(this.state.endeA)

      SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
          SystemAPI.getAPI().commitProjectWorktimeTransaction(result.id, this.state.activitydescription ,this.state.selectedActivities, this.state.beginnA, this.state.endeA )
      })
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
                      onChange={this.handleChange}
                      >
                        {activities.map((activities) => {
                        return (
                        <MenuItem key={activities.id} value={activities.id}>
                            {activities.activity_name}
                        </MenuItem>)
                        })}
                      </Select>
                    <TextField required id="outlined-required" label="Required" defaultValue="Aktivität Beschreibung" onChange={(event) => this.setState({activitydescription: event.target.value})}/>
                    <TextField id="outlined-basic"  variant="outlined" type="datetime-local" label="Beginn"  onChange={(event) => this.setState({beginnA: event.target.value})} InputLabelProps={{shrink: true,}}/>
                    <TextField id="outlined-basic"  variant="outlined" type="datetime-local" label="Ende" onChange={(event) => this.setState({endeA: event.target.value})} InputLabelProps={{shrink: true,}}/>
                    <Button variant="contained" onClick={() => this.bookBuchung()}>  Aktivität Buchen </Button>
                    </FormControl>
                    </Stack>
              
                  <Divider sx={{margin:"20px"}}/>
  
                  <Stack 
                  direction={{ sm: 'row' }}
                  >
                    <FormControl fullWidth>
                    <h2>Pause</h2>
                    <TextField required id="outlined-required" label="Required" defaultValue="Pause Beschreibung" onChange={(event) => this.setState({pausedescription: event.target.value})}/>
                    <TextField id="outlined-basic" label="Beginn" variant="outlined" type="datetime-local" onChange={(event) => this.setState({beginnP: event.target.value})} InputLabelProps={{shrink: true,}}/>
                    <TextField id="outlined-basic" label="Ende" variant="outlined" type="datetime-local" onChange={(event) => this.setState({endeP: event.target.value})} InputLabelProps={{shrink: true,}}/>
                    <Button variant="contained" onClick={() => this.bookPauseClicked()}> Pause Buchen </Button>
                    </FormControl>
                  </Stack>
          </div>
      )
    }
    
}

export default Buchungen;
