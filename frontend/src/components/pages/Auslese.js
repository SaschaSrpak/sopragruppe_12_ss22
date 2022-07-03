import React, {Component} from "react";
import ReactDOM from "react-dom";

import KommenTable from "../Zwischenelemente/KommenTable";
import GehenTable from "../Zwischenelemente/GehenTable";
import PauseTable from "../Zwischenelemente/PauseTable";
import WorkTimeTable from "../Zwischenelemente/WorkTimeTable";
import Profil from "./ProfilRegristrierung";
import SystemAPI from "../../api/SystemAPI";
import KommenBO from '../../api/Ereignisse/KommenBO';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateDialog from '../Zwischenelemente/UpdateDialog';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

/** 
 *@fileOverview Seite zum Auslesen von den Zeiten zu Kommen, Gehen, Abwesenheit und Abwesenheit, zudem das Editieren und Löschen entsprechender Buchungen
 *@author Liam Wilke, Kim Kausler
*/

export class Auslese extends Component {
      constructor(props) {
          super(props);

          //setzt alle Standartstates für die Variablen
          this.state = {

         data: [],

      selectedActivities: null,
      activity: props.activity,
      startFilter: '1999-01-01',
      endeFilter: '2100-01-01',
      userid: null,
      kommenname: [],
      worktime: null,

              loading: 0,
              kommenlist: []
    }
      }

     async componentDidMount() {
        // Auslesen der entsprechenden Daten aus der Datenbank 


         SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
             this.setState({
                 userid: result.id
             })
             SystemAPI.getAPI().getGehenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 if (result.length > 0){
                    //Abfragen der Gehen Daten, wenn dafür welche vorhanden sind werden die ausgegeben
                 this.GehenDaten(result)
                 }else{
                    //Wenn nicht wird ein leerer String zurückgegeben
                     this.GehenDaten("")
                 }
             })

             SystemAPI.getAPI().getPauseTransactionsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 console.log(result)
                 if (result.length > 0){
                    //Abfragen der Abwesenheit Daten, wenn dafür welche vorhanden sind werden die ausgegeben
                 this.PauseDaten(result)
                 }else{
                    //Wenn nicht wird ein leerer String zurückgegeben
                     this.PauseDaten("")
                 }
             })

             SystemAPI.getAPI().getWorktimeTransactionsValueBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 console.log(result)
                 if (result.length > 0){
                    //Abfragen der Arbeitszeiten Daten, wenn dafür welche vorhanden sind werden die ausgegeben
                 this.WorkTimeDaten(result)
                 }else{
                    //Wenn nicht wird ein leerer String zurückgegeben
                     this.WorkTimeDaten("")
                 }
             })

             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 console.log(result)
                 if (result.length > 0){
                    //Abfragen der Kommen Daten, wenn dafür welche vorhanden sind werden die ausgegeben
                 this.KommenDaten(result)
                 }else{
                    //Wenn nicht wird ein leerer String zurückgegeben
                     this.KommenDaten("")
                 }
             })


         })
     }

    async Datenfilter() {
    // Mit dieser Funktion können die ausgegebenen Daten für einen bestimmten Zeitraum gefiltert werden



         SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
             this.setState({
                 userid: result.id
             })
             SystemAPI.getAPI().getGehenEventsOfAccountBetweenDates(this.state.userid, this.state.startFilter, this.state.endeFilter).then((result) => {
                // this.TestTwo(result)
                 console.log(result)
                 if (result.length > 0){
                 this.GehenDaten(result)
                 }else{
                     this.GehenDaten("")
                 }
             })

             SystemAPI.getAPI().getPauseTransactionsOfAccountBetweenDates(this.state.userid, this.state.startFilter, this.state.endeFilter).then((result) => {
                // this.TestTwo(result)
                 console.log(result.length )
                 if (result.length > 0){
                 this.PauseDaten(result)
                 }else{
                     this.PauseDaten("")
                 }
             })

             SystemAPI.getAPI().getWorktimeTransactionsValueBetweenDates(this.state.userid, this.state.startFilter, this.state.endeFilter).then((result) => {
                // this.TestTwo(result)
                 console.log(result.length )
                 if (result.length > 0){
                 this.WorkTimeDaten(result)
                 }else{
                     this.WorkTimeDaten("")
                 }
             })

             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, this.state.startFilter, this.state.endeFilter).then((result) => {
                // this.TestTwo(result)
                 console.log(result.length )
                 if (result.length > 0){
                 this.KommenDaten(result)
                 }else{
                     this.KommenDaten("")
                 }
             })



         })
     }

     KommenDaten =  (daten) => {
        //Aufbereitung der Daten
            console.log(daten)
            if (daten === ""){
                //Abfragen ob die Liste leer ist
                 daten = []
                this.setState({kommenname: daten})
            }else{
                //Wenn sie nicht leer ist, dann geht man durch alle Daten und "verschönert" die Ausgabe
                            (daten.map(Zeitpunkt=>{
                //Change
                 var ZeitpunktString = Zeitpunkt.time_of_event;
                ZeitpunktString = ZeitpunktString.replace('T',' ');
                Zeitpunkt.time_of_event = ZeitpunktString

                var LastChangeString = Zeitpunkt.last_modified_date;
                LastChangeString = LastChangeString.replace('T',' ');
                Zeitpunkt.last_modified_date = LastChangeString

                }))


            console.log(daten)
            this.setState({kommenname: daten})

            console.log(this.state.loading)
            }
        this.setState({loading: this.state.loading + 1})
     }

    GehenDaten = (daten) => {
        //Aufbereitung der Daten
             if (daten === ""){
                //Abfragen ob die Liste leer ist
                 daten = []
                this.setState({gehennamen: daten})
            }else {
                //Wenn sie nicht leer ist, dann geht man durch alle Daten und "verschönert" die Ausgabe

                 (daten.map(Zeitpunkt => {
                     //Change
                     var ZeitpunktString = Zeitpunkt.time_of_event;
                     ZeitpunktString = ZeitpunktString.replace('T', ' ');
                     Zeitpunkt.time_of_event = ZeitpunktString

                     var LastChangeString = Zeitpunkt.last_modified_date;
                     LastChangeString = LastChangeString.replace('T', ' ');
                     Zeitpunkt.last_modified_date = LastChangeString

                 }))
                 console.log(daten)

                 this.setState({gehennamen: daten})


             }
             this.setState({loading: this.state.loading + 1})
    }

    PauseDaten = (daten) => {
        //Aufbereitung der Daten
             if (daten === ""){
                //Abfragen ob die Liste leer ist
                 daten = []
                this.setState({pausennamen: daten})
            }else {
                //Wenn sie nicht leer ist, dann geht man durch alle Daten und "verschönert" die Ausgabe
                    console.log(daten)
                 //(daten.map(Zeitpunkt => {
                     //Change
                 //    var ZeitpunktString = Zeitpunkt.end_time;
                 //    ZeitpunktString = ZeitpunktString.replace('T', ' ');
                 //    Zeitpunkt.end_time = ZeitpunktString

                 //    var LastChangeString = Zeitpunkt.start_time;
                 //    LastChangeString = LastChangeString.replace('T', ' ');
                  //   Zeitpunkt.start_time = LastChangeString

                // }))
                 console.log(daten)


                 this.setState({pausennamen: daten})


             }
             this.setState({loading: this.state.loading + 1})

    }
    WorkTimeDaten = (daten) => {
        //Aufbereitung der Daten
             if (daten === ""){
                //Abfragen ob die Liste leer ist
                 daten = []
                this.setState({worktimenamen: daten})
            }else {
                //Wenn sie nicht leer ist, dann geht man durch alle Daten und "verschönert" die Ausgabe

                 (daten.map(Duration => {

                 var DuartionRunden = Duration.duration;
                 DuartionRunden = Math.round(DuartionRunden * 100) /100
                 Duration.duration = DuartionRunden

                 //    var LastChangeString = Zeitpunkt.start_time;
                 //    LastChangeString = LastChangeString.replace('T', ' ');
                  //   Zeitpunkt.start_time = LastChangeString

                 }))



                 this.setState({worktimenamen: daten})


             }
            this.setState({loading: this.state.loading + 1})

    }

    editButtonClicked = (event) => {
        // Wenn dieser Button geklickt wird öffnet sich der Dialog zum aktualisieren einer Buchung
      event.stopPropagation();
      this.setState({
        showUpdateDialog: true
      });
  }

  handleClickOpen = () => { 
    this.setState({
      open: !this.state.open
    })
  };

  handleClose = () => {
    this.setState({
      open: false
  });
  };


    render() {
    //Rendert die Komponente
      const { showUpdateDialog ,open } = this.state;

        if(this.state.loading < 4) {
            return(
                <Box sx={{ width: '50%'}} style={{
                position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
    }}>
                <LinearProgress />
            </Box>
            )
        }
        else {
        return (

            <div style={{textAlign: "center"}}>
                <div>
                <br/>
                <TextField id="outlined-basic"  variant="outlined" type="date" label="Beginn"  onChange={(event) => this.setState({startFilter: event.target.value})}  InputLabelProps={{shrink: true,}}/>
                <TextField id="outlined-basic"  variant="outlined" type="date" label="Ende" onChange={(event) => this.setState({endeFilter: event.target.value})}  InputLabelProps={{shrink: true,}}/>
                <p></p>
                <Button variant="contained" onClick={() => this.Datenfilter()}> Daten Filtern</Button>
                </div>
                <br/>
                <Divider sx={{margin:"40px"}}/>
                      <Accordion sx={{minWidth: "1200px"}} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Kommen</Typography>
                        </AccordionSummary>
                          <KommenTable title=" " data={this.state.kommenname}/>
                      </Accordion>
                      <Accordion sx={{minWidth: "1200px"}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Gehen</Typography>
                        </AccordionSummary>
                          <GehenTable title=" " data={this.state.gehennamen}/>
                      </Accordion>

                      <Accordion sx={{minWidth: "1200px"}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Abwesenheit</Typography>
                        </AccordionSummary>
                          <PauseTable title=" " data={this.state.pausennamen}/>
                      </Accordion>
                      <Accordion sx={{minWidth: "1200px"}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Arbeitszeit</Typography>
                        </AccordionSummary>
                          <WorkTimeTable title=" " data={this.state.worktimenamen}/>
                      </Accordion>

                      <div>

            


            
            
        </div>
            </div>




        );
    }
}
}
export default Auslese;
