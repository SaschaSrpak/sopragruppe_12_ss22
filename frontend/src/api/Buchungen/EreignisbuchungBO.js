import BuchungBO from './BuchungBO';
import EreignisbuchungBO from './Buchungen/EreignisbuchungBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class EreignisbuchungBO extends BuchungBO{

    constructor() {
        super()
        this.event_id = Ereignis;
    }

    setEvent_id(event_id){
        this.event_id = event_id;
    }
    
    getEvent_id(){
        return this.event_id;
    }

}