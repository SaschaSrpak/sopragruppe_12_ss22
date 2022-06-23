import BuchungBO from './BuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitintervallbuchungBO extends BuchungBO{

    constructor(intervall_id) {
        super()
        this.time_intervall_id = intervall_id;
    }

    setTime_intervall_id(time_intervall_id){
        this.time_intervall_id = time_intervall_id;
    }

    getTime_intervall_id(){
        return this.time_intervall_id;
    }

    
}