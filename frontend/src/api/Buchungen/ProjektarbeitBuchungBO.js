
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';

/** 
 *@fileOverview Representiert eine Projektarbeitszeitbuchung von Zeitintervallbuchung
 *@author Luca Trautmann
*/

export default class ProjektarbeitBuchungBO extends ZeitintervallbuchungBO{

    constructor(activity_id) {
         //Konstruiert eine Aktivität mit id
        super()
        this.target_activity = activity_id;
    }

    //setter   
    setTarget_activity(target_activity){
        this.target_activity = target_activity;
    }
    
    //getter
    getTarget_activity(){
        return this.target_activity;
    }

    static fromJSON(project_worktime_transaction) {
        let result = []
        if (Array.isArray(project_worktime_transaction)) {
            project_worktime_transaction.forEach((pwt) => {
                Object.setPrototypeOf(pwt, ProjektarbeitBuchungBO.prototype);
                result.push(pwt)
            })
        } else {
            let pwt = project_worktime_transaction;
            // Konvertieren des JSON-Inhalts in ein ProjektarbeitBuchungBO Objekt
            Object.setPrototypeOf(pwt, ProjektarbeitBuchungBO.prototype);
            result.push(pwt);
        }

        return result;
    }
}