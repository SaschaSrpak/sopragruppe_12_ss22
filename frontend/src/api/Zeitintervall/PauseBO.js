import ZeitintervallBO from './ZeitintervallBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class PauseBO extends ZeitintervallBO{

    constructor() {
        super()

    }



    static fromJSON(pause) {
        let result = []
        if (Array.isArray(pause)) {
            pause.forEach((p) => {
                Object.setPrototypeOf(p, PauseBO.prototype);
                result.push(p)
            })
        } else {
            let p = pause;
            Object.setPrototypeOf(p, PauseBO.prototype);
            result.push(p);
        }

        return result;
    }

    
}