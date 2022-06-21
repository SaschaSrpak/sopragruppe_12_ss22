
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class GehenBuchungBO extends EreignisbuchungBO{

    constructor() {
        super()    
    }

    static fromJSON(gehen_transaction) {
        let result = []
        if (Array.isArray(gehen_transaction)) {
            gehen_transaction.forEach((gt) => {
                Object.setPrototypeOf(gt, GehenBuchungBO.prototype);
                result.push(gt)
            })
        } else {
            let gt = gehen_transaction;
            Object.setPrototypeOf(gt, GehenBuchungBO.prototype);
            result.push(gt);
        }

        return result;
    }

    
}