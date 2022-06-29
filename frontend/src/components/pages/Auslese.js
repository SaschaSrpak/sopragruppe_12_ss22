import React, {Component} from "react";
import ReactDOM from "react-dom";

import KommenTable from "../Zwischenelemente/KommenTable";
import GehenTable from "../Zwischenelemente/GehenTable";
import PauseTable from "../Zwischenelemente/PauseTable";
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

export class Auslese extends Component {
      constructor(props) {
          super(props);

          this.state = {

         data: [],
      selectedActivities: null,
      activity: props.activity,
      startFilter: '1999-01-01',
      endeFilter: '2100-01-01',
      userid: null,
      kommenname: [],
      worktime: null,

              loading: false,
              kommenlist: []
    }
      }

     async componentDidMount() {


         SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
             this.setState({
                 userid: result.id
             })
             SystemAPI.getAPI().getGehenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 this.GehenDaten(result)
             })

             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 this.PauseDaten(result)
             })

             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 this.KommenDaten(result)
             })


         })
     }

    async Datenfilter() {



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
                     console.log("Juhu")
                     this.GehenDaten("")
                 }
             })

             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, this.state.startFilter, this.state.endeFilter).then((result) => {
                // this.TestTwo(result)
                 console.log(result.length )
                 if (result.length > 0){
                 this.KommenDaten(result)
                 }else{
                     console.log("Juhu")
                     this.KommenDaten("")
                 }
             })
         })
     }

     KommenDaten =  (daten) => {
            console.log(daten)
            if (daten === ""){
                 daten = []
                this.setState({kommenname: daten})
            }else{
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

            }
            this.setState({loading: true})
     }

    GehenDaten = (daten) => {
             if (daten === ""){
                 daten = []
                this.setState({gehennamen: daten})
            }else {

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
    }

    PauseDaten = (daten) => {
             if (daten === ""){
                 daten = []
                this.setState({pausennamen: daten})
            }else {

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


                 this.setState({pausennamen: daten})
             }
    }
    render() {


        if(this.state.loading === false) {
            return(
                <h1>Page is loading...</h1>
            )
        }
        else {
        return (
            <div>
                <div>
                <br/>
                <TextField id="outlined-basic"  variant="outlined" type="date" label="Beginn"  onChange={(event) => this.setState({startFilter: event.target.value})}  InputLabelProps={{shrink: true,}}/>
                <TextField id="outlined-basic"  variant="outlined" type="date" label="Ende" onChange={(event) => this.setState({endeFilter: event.target.value})}  InputLabelProps={{shrink: true,}}/>
                <Button variant="contained" onClick={() => this.Datenfilter()}> Daten Filtern</Button>
                </div>
                <br/>
                <Divider sx={{margin:"20px"}}/>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Kommen</Typography>
                        </AccordionSummary>
                          <KommenTable title="Kommen" data={this.state.kommenname}/>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Gehen</Typography>
                        </AccordionSummary>
                          <GehenTable title="Gehen" data={this.state.gehennamen}/>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                             <Typography>Pause</Typography>
                        </AccordionSummary>
                          <PauseTable title="Pausen" data={this.state.pausennamen}/>
                      </Accordion>



            </div>
        );
    }
}
}
export default Auslese;
