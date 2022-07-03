import BuchungBO from './BuchungBO';

/** 
 *@fileOverview Representiert eine Ereignisbuchun von allen Buchungen
 *@author Luca Trautmann
*/

export default class EreignisbuchungBO extends BuchungBO{

    constructor(event_id) {
        super()
         //Konstruiert ein Ereignisbuchung mit id
        this.event_id = event_id;
    }

    //setter
    setEvent_id(event_id){
        this.event_id = event_id;
    }
    
    //getter
    getEvent_id(){
        return this.event_id;
    }


}