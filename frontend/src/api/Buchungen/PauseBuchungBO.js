
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class PauseBuchungBO extends ZeitintervallbuchungBO{

    constructor() {
        super()       
    }
    static fromJSON(pause_transaction) {
        let result = []
        if (Array.isArray(pause_transaction)) {
            pause_transaction.forEach((pt) => {
                Object.setPrototypeOf(pt, PauseBuchungBO.prototype);
                result.push(pt)
            })
        } else {
            let pt = pause_transaction;
            Object.setPrototypeOf(pt, PauseBuchungBO.prototype);
            result.push(pt);
        }

        return result;
    }

    
}