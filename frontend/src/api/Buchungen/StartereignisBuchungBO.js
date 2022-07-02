
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview Representiert eine Startereignisbuchung von Ereignisbuchungen
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
            // Konvertieren des JSON-Inhalts in ein StarteignisBuchungBO Objekt
            Object.setPrototypeOf(st, StartereignisBuchungBO.prototype);
            result.push(st);
        }

        return result;

    }
}