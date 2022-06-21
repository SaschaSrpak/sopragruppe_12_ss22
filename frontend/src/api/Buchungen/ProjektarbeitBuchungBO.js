import ProjektarbeitBuchungBO from './Buchungen/ProjektarbeitBuchungBO';
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektarbeitBuchungBO extends ZeitintervallbuchungBO{

    constructor() {
        super()
        this.target_activity = null;    
    }

    setTarget_activity(target_activity){
        this.target_activity = target_activity;
    }

    getTarget_activity(){
        return this.target_activity;
    }
}