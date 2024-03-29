import EreignisBO from "./EreignisBO";
/** 
 *@fileOverview Representiert ein Gehenereignis von Ereignis
 *@author Luca Trautmann, Kim Kaussler
*/

export default class GehenBO extends EreignisBO{

    constructor() {
        super()
    }

    static fromJSON(gehen) {
        let result = []
        if (Array.isArray(gehen)) {
            gehen.forEach((g) => {
                Object.setPrototypeOf(g, GehenBO.prototype);
                result.push(g)
            })
        } else {
            let g = gehen;
            Object.setPrototypeOf(g, GehenBO.prototype);
            result.push(g);
        }

        return result;
    }

    
}