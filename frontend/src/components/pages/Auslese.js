import React, {Component} from "react";
import ReactDOM from "react-dom";

import KommenTable from "../Zwischenelemente/KommenTable";
import GehenTable from "../Zwischenelemente/GehenTable";
import Profil from "./ProfilRegristrierung";
import SystemAPI from "../../api/SystemAPI";
import KommenBO from '../../api/Ereignisse/KommenBO';


export class Auslese extends Component {
      constructor(props) {
          super(props);

          this.state = {

         data: [],
      selectedActivities: null,
      activity: props.activity,
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
                 this.KommenDaten(result)
             })
         })
     }


     KommenDaten =  (daten) => {


            (daten.map(Zeitpunkt=>{
                //Change
                 var ZeitpunktString = Zeitpunkt.time_of_event;
                ZeitpunktString = ZeitpunktString.replace('T',' ');
                Zeitpunkt.time_of_event = ZeitpunktString

                var LastChangeString = Zeitpunkt.last_modified_date;
                LastChangeString = LastChangeString.replace('T',' ');
                Zeitpunkt.last_modified_date = LastChangeString

                }))

            this.setState({kommenname: daten})
            this.setState({loading: true})
     }

    GehenDaten = (daten) => {


            (daten.map(Zeitpunkt=>{
                //Change
                 var ZeitpunktString = Zeitpunkt.time_of_event;
                ZeitpunktString = ZeitpunktString.replace('T',' ');
                Zeitpunkt.time_of_event = ZeitpunktString

                var LastChangeString = Zeitpunkt.last_modified_date;
                LastChangeString = LastChangeString.replace('T',' ');
                Zeitpunkt.last_modified_date = LastChangeString

                }))

            this.setState({gehennamen: daten})



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
                <KommenTable title="Kommen" data={this.state.kommenname}/>
                <br/>
                <GehenTable title="Gehen" data={this.state.gehennamen}/>
                <br/>

            </div>
        );
    }
}
}
export default Auslese;
