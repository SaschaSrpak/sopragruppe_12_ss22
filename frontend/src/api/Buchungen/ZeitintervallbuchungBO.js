import BuchungBO from './BuchungBO';
import ZeitintervallbuchungBO from './Buchungen/ZeitintervallbuchungBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitintervallbuchungBO extends BuchungBO{

    constructor() {
        super()
        this.time_intervall_id = null;    
    }

    setTime_intervall_id(time_intervall_id){
        this.time_intervall_id = time_intervall_id;
    }

    getTime_intervall_id(){
        return this.time_intervall_id;
    }

    
}