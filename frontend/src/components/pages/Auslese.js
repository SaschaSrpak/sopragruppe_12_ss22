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
             SystemAPI.getAPI().getKommenTransactionsOfAccount(this.state.userid).then((result) => {
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

        for (var i = 0; daten.length; i++) {
            console.log(daten)



            //console.log(this.state.kommenname)
            let eventid = daten[i].getEvent_id()
            let  accid = daten[i].getId()
            let name = SystemAPI.getAPI().getKommen(eventid).then((result =>{
                let kommenobj;
                kommenobj = {Event_id: eventid, ID: accid, Name: name.getEventName}
                return kommenobj

            }))
            console.log(name)
            this.state.kommenlist.push(name)





            this.setState({loading: true})
        }

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
                <DataTable  title="x" data={this.state.kommenlist}/>
                <br/>
                <br/>

            </div>
        );
    }
}
}
export default Auslese;
