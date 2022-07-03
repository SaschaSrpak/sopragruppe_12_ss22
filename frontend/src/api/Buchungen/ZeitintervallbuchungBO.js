import BuchungBO from './BuchungBO';

/** 
 *@fileOverview Representiert eine Zeitintervallbuchung von Buchungen
 *@author Luca Trautmann
*/

export default class ZeitintervallbuchungBO extends BuchungBO{

    constructor(intervall_id) {
        //Konstruiert ein Zeitintervall mit id
        super()
        this.time_intervall_id = intervall_id;
    }

    //setter
    setTime_intervall_id(time_intervall_id){
        this.time_intervall_id = time_intervall_id;
    }

    //getter
    getTime_intervall_id(){
        return this.time_intervall_id;
    }

    
}