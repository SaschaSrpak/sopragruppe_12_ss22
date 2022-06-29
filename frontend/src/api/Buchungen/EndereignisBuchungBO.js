
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview Representiert eine Endereignisbuchung von Ereignisbuchungen
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
            // Konvertieren des JSON-Inhalts in ein EndereignisBuchungBO Objekt
            Object.setPrototypeOf(et, EndereignisBuchungBO.prototype);
            result.push(et);
        }

        return result;
    }

    
}