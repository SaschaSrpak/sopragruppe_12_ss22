
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class EndereignisBuchungBO extends EreignisbuchungBO{

    constructor() {
        super()
    }
    static fromJSON(end_transaction) {
        let result = []
        if (Array.isArray(end_transaction)) {
            end_transaction.forEach((et) => {
                Object.setPrototypeOf(et, EndereignisBuchungBO.prototype);
                result.push(et)
            })
        } else {
            let et = end_transaction;
            Object.setPrototypeOf(et, EndereignisBuchungBO.prototype);
            result.push(et);
        }

        return result;
    }

    
}