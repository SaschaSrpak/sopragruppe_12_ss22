import React, {Component} from "react";
import ReactDOM from "react-dom";

import DataTable from "./DataTable";
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
             SystemAPI.getAPI().getKommenEventsOfAccountBetweenDates(this.state.userid, "1999-01-01", "2100-01-01").then((result) => {
                // this.TestTwo(result)
                 this.Test(result)
             })
         })
     }


     TestTwo =  (daten) => {

         //for (var i = 0; daten.length ; i++) {
           // console.log(daten[i].getEvent_id())
            // SystemAPI.getAPI().getKommen(daten[i].getEvent_id()).then((result) => {
            //     return result.getEventName;}).then((EvenName) => {

            // })

                 //this.setState({kommeneventname: result.getEventName()})
                 //kommenvents.push(result.getEventName())

         //}
         //return(kommenvents)
     }

    Test = (daten) => {


            console.log(daten.map(Zeitpunkt=>{
                //Change
                 var ZeitpunktString = Zeitpunkt.time_of_event;
                ZeitpunktString = ZeitpunktString.replace('T',' ');
                console.log(ZeitpunktString)
                Zeitpunkt.time_of_event = ZeitpunktString

                var LastChangeString = Zeitpunkt.last_modified_date;
                LastChangeString = LastChangeString.replace('T',' ');
                console.log(LastChangeString)
                Zeitpunkt.last_modified_date = LastChangeString

                }))

            this.setState({kommenname: daten})
            this.setState({loading: true})


    }


    render() {


        if(this.state.loading === false) {
            return(
                <h1>xx</h1>
            )
        }
        else {
        return (
            <div>
                <DataTable  title="x" data={this.state.kommenname}/>
                <br/>
                <br/>

            </div>
        );
    }
}
}
export default Auslese;
