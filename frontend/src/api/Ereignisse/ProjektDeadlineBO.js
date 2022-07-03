import EreignisBO from "./EreignisBO";
/** 
 *@fileOverview Representiert ein Projektdeadline-Ereignis von Ereignis
 *@author Luca Trautmann, Kim Kausler
*/

export default class ProjektDeadlineBO extends EreignisBO{


    constructor() {
        super()

    }

    static fromJSON(project_deadline) {
        let result = []
        if (Array.isArray(project_deadline)) {
            project_deadline.forEach((pd) => {
                Object.setPrototypeOf(pd, ProjektDeadlineBO.prototype);
                result.push(pd)
            })
        } else {
            let pd = project_deadline;
            Object.setPrototypeOf(pd, ProjektDeadlineBO.prototype);
            result.push(pd);
        }

        return result;
    }

    
}