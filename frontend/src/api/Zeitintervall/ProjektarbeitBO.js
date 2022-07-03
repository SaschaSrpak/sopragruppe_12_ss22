import ZeitintervallBO from './ZeitintervallBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektarbeitBO extends ZeitintervallBO{

    constructor() {
        super();
    }

    static fromJSON(project_worktime) {
        let result = []
        if (Array.isArray(project_worktime)) {
            project_worktime.forEach((p) => {
                Object.setPrototypeOf(p, ProjektarbeitBO.prototype);
                result.push(p)
            })
        } else {
            let p = project_worktime;
            Object.setPrototypeOf(p, ProjektarbeitBO.prototype);
            result.push(p);
        }

        return result;
    }
    
}