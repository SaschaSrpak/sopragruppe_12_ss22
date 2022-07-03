import EreignisBO from "./EreignisBO";
/** 
 *@fileOverview Representiert eine Startereignis von Ereignis
 *@author Luca Trautmann, Kim Kausler
*/

export default class StartereignisBO extends EreignisBO {

    constructor() {
        super()
    }

    static fromJSON(start) {
        let result = []
        if (Array.isArray(start)) {
            start.forEach((s) => {
                Object.setPrototypeOf(s, StartereignisBO.prototype);
                result.push(s)
            })
        } else {
            let s = start;
            Object.setPrototypeOf(s, StartereignisBO.prototype);
            result.push(s);
        }

        return result;
    }
}
