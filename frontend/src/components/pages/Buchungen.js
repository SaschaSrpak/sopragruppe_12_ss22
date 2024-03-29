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
 *@fileOverview Auf dieser Seite wird Komme, Gehen, Abwesenheit die Arbeitszeit für Aktivitäten gebucht
 *@author Kim Kausler, Liam Wilke
*/

export class Buchungen extends Component {

  constructor(props) {
    super(props);

    //setzt alle Standartstates für die Variablen
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

  }



  kommenButtonClicked = event => {
    //Hier wird die Kommen Buchung gebucht
    let newKommen = new KommenBO();
    newKommen.event_name = "kommen";
    newKommen.time_of_event = this.getLocalTime();
    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
      console.log(result.id)
      SystemAPI.getAPI().commitKommenTransaction(result.id, newKommen).then((result) => {
        alert("Kommen wurde gebucht")
      })
    })


  }

  gehenButtonClicked = event => {
    //Hier wird die Gehen Buchung gebucht
    let newGehen = new GehenBO();
    newGehen.event_name = "gehen";
    newGehen.time_of_event = this.getLocalTime();

    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
      console.log(result.id)
      SystemAPI.getAPI().commitGehenTransaction(result.id, newGehen).then((result) => {
        alert("Gehen wurde gebucht")
      })
    })
  }

  bookPauseClicked = event => {
    //Hier wird die Abwesenheit gebucht, dafür werden die nötigen Daten aus den Textfeldern ausgelesen 
    if ([this.state.pausedescription, this.state.beginnP, this.state.endeP].includes('') || [this.state.pausedescription, this.state.beginnP, this.state.endeP].includes(null)) {
      alert("Füllen Sie bitte alle Werte aus")
    } else {
      SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {

        SystemAPI.getAPI().commitPauseTransaction(result.id, this.state.pausedescription, this.state.beginnP, this.state.endeP).then((result) => {
          alert("Abwesenheit wurde gebucht")
        })
      })
    }
  }


  // Hier wird die Zeit ausgelesen und in die richtige Form gewandelt
  getLocalTime = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    console.log(localISOTime)
    return localISOTime
  }

  // Beim Rendern der Seite wird die FireBaseID des Users ausgelesen und die AKtivitäten zur Person
  componentDidMount() {
    SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
      console.log(result.id)
      SystemAPI.getAPI().getActivitiesForPerson(result.id).then((activities) => {
        this.setState({
          activities: activities
        })
      })
    })
  }

  // erlaubt das ändern der ausgewählten Aktivität
  handleChange = event => {
    this.setState({
      selectedActivities: event.target.value
    })
  }

  bookBuchung = event => {
    //Hier wird die Zeit  für eine Aktivität gebucht, dafür werdden die nötigen Daten aus den Textfeldern ausgelesen 
    console.log(this.state.activitydescription, this.state.selectedActivities, this.state.beginnA, this.state.ende)
    if ([this.state.activitydescription, this.state.selectedActivities, this.state.beginnA, this.state.endeA].includes('') || [this.state.activitydescription, this.state.selectedActivities, this.state.beginnA, this.state.endeA].includes(null)) {
      alert("Füllen Sie bitte alle Werte aus")
    } else {
      SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
        SystemAPI.getAPI().commitProjectWorktimeTransaction(result.id, this.state.activitydescription, this.state.selectedActivities, this.state.beginnA, this.state.endeA).then((result) => {
          alert("Aktivität wurde gebucht")
        })
      })
    }
  }

  render() {
    //Rendert die Komponente
    const { activities, selectedActivities } = this.state;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Buchungen</h1>
          <Button variant="contained" onClick={() => this.kommenButtonClicked()} > Kommen </Button>
          <p></p>
          <Button variant="contained" onClick={() => this.gehenButtonClicked()} > Gehen </Button>
        </div>
        <Divider sx={{ margin: "20px" }} />
        <Stack
          direction={{ sm: 'row' }}
        >
          <FormControl fullWidth>
            <h2>Abwesenheit</h2>
            <TextField required id="outlined-required" label="Required" defaultValue="Abwesenheitsbeschreibung" onChange={(event) => this.setState({ pausedescription: event.target.value })} />
            <div><br></br></div>
            <TextField id="outlined-basic" label="Beginn" variant="outlined" type="datetime-local" onChange={(event) => this.setState({ beginnP: event.target.value })} InputLabelProps={{ shrink: true, }} />
            <div><br></br></div>
            <TextField id="outlined-basic" label="Ende" variant="outlined" type="datetime-local" onChange={(event) => this.setState({ endeP: event.target.value })} InputLabelProps={{ shrink: true, }} />
            <div><br></br></div>
            <Button variant="contained" onClick={() => this.bookPauseClicked()} >Abwesenheit buchen </Button>
          </FormControl>
        </Stack>
        <Divider sx={{ margin: "20px" }} />
        <h2>Aktivität</h2>
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
            <div><br></br></div>
            <TextField required id="outlined-required" label="Aktivitätsbeschreibung" onChange={(event) => this.setState({ activitydescription: event.target.value })} />
            <div><br></br></div>
            <TextField id="outlined-basic" variant="outlined" type="datetime-local" label="Beginn" onChange={(event) => this.setState({ beginnA: event.target.value })} InputLabelProps={{ shrink: true, }} />
            <div><br></br></div>
            <TextField id="outlined-basic" variant="outlined" type="datetime-local" label="Ende" onChange={(event) => this.setState({ endeA: event.target.value })} InputLabelProps={{ shrink: true, }} />
            <div><br></br></div>
            <Button variant="contained" onClick={() => this.bookBuchung()}>  Aktivität Buchen </Button>
            <div><br></br></div>
          </FormControl>
        </Stack>
        <div><br></br></div>
        <div><br></br></div>
      </div>
    )
  }
}

export default Buchungen;
