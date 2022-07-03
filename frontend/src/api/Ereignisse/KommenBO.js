import EreignisBO from "./EreignisBO";
/** 
 *@fileOverview Representiert ein Kommenereignis von Ereignis
 *@author Luca Trautmann, Kim Kausler
*/

export default class KommenBO extends EreignisBO{

    constructor() {
        super()
    }

    static fromJSON(kommen) {
        let result = []
        if (Array.isArray(kommen)) {
            kommen.forEach((k) => {
                Object.setPrototypeOf(k, KommenBO.prototype);
                result.push(k)
            })
        } else {
            let k = kommen;
            Object.setPrototypeOf(k, KommenBO.prototype);
            result.push(k);
        }

        return result;
    }


    
}