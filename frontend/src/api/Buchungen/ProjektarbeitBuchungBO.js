
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektarbeitBuchungBO extends ZeitintervallbuchungBO{

    constructor(activity_id) {
        super()
        this.target_activity = activity_id;
    }

    setTarget_activity(target_activity){
        this.target_activity = target_activity;
    }

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
            Object.setPrototypeOf(pwt, ProjektarbeitBuchungBO.prototype);
            result.push(pwt);
        }

        return result;
    }
}