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
          const response = await SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid);
          this.setState({userid: response.id});

          const kommentransactionofaccount = await SystemAPI.getAPI().getKommenTransactionsOfAccount(this.state.userid);
          for (var i = 0; kommentransactionofaccount.length; i++) {
          const eventid = kommentransactionofaccount[i].getEvent_id
          const kommenevents = await SystemAPI.getAPI().getKommen(eventid);
          this.setState({kommenlist: this.state.kommenlist.concat(kommenevents)});
          }
          console.log(this.state.kommenlist)
          //this.Test(kommentransactionofaccount)

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


    //Test = (daten) => {

        //for (var i = 0; daten.length; i++) {
        //    console.log(daten)


         //   let eventid = daten[i].getEvent_id()
        //    let  accid = daten[i].getId()
         //   let kommenobj = {Event_id: eventid, ID: accid, Name: name.getEventName}


            }
        //    console.log(name)
         //   this.state.kommenlist.push(name)





         //   this.setState({loading: true})
        //}




    render() {


        if(this.state.loading === false) {
            return(
                <h1>xx</h1>
            )
        }
        else {
        return (
            <div>
                <DataTable  title="x" data={this.state.kommenlist}/>
                <br/>
                <br/>

            </div>
        );
    }
}
}
export default Auslese;
