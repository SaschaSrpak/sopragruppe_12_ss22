import BuchungBO from './BuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class EreignisbuchungBO extends BuchungBO{

    constructor(event_id) {
        super()
        this.event_id = event_id;
    }

    setEvent_id(event_id){
        this.event_id = event_id;
    }
    
    getEvent_id(){
        return this.event_id;
    }


}