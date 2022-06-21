
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class StartereignisBuchungBO extends EreignisbuchungBO{

    constructor() {
        super()       
    }

    static fromJSON(start_transaction) {
        let result = []
        if (Array.isArray(start_transaction)) {
            start_transaction.forEach((st) => {
                Object.setPrototypeOf(st, StartereignisBuchungBO.prototype);
                result.push(st)
            })
        } else {
            let st = start_transaction;
            Object.setPrototypeOf(st, StartereignisBuchungBO.prototype);
            result.push(st);
        }

        return result;

    }
}