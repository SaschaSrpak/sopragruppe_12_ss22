
import EreignisbuchungBO from './EreignisbuchungBO';

/** 
 *@fileOverview Representiert eine Kommenbuchung von Ereignisbuchungen
 *@author Luca Trautmann
*/

export default class KommenBuchungBO extends EreignisbuchungBO{

    constructor() {
        super()       
    }
    static fromJSON(kommen_transaction) {
        let result = []
        if (Array.isArray(kommen_transaction)) {
            kommen_transaction.forEach((kt) => {
                Object.setPrototypeOf(kt, KommenBuchungBO.prototype);
                result.push(kt)
            })
        } else {
            let kt = kommen_transaction;
            // Konvertieren des JSON-Inhalts in ein KommenBuchungBO Objekt
            Object.setPrototypeOf(kt, KommenBuchungBO.prototype);
            result.push(kt);
        }

        return result;
    }

    
}