import ZeitintervallBO from './ZeitintervallBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektlaufzeitBO extends ZeitintervallBO{

    constructor() {
        super();
    }

    static fromJSON(project_duration) {
        let result = []
        if (Array.isArray(project_duration)) {
            project_duration.forEach((p) => {
                Object.setPrototypeOf(p, ProjektlaufzeitBO.prototype);
                result.push(p)
            })
        } else {
            let p = project_duration;
            Object.setPrototypeOf(p, ProjektlaufzeitBO.prototype);
            result.push(p);
        }

        return result;
    }
}