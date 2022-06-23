import EreignisBO from "./EreignisBO";
/** 
 *@fileOverview 
 *@author Luca Trautmann, Kim Kausler
*/

export default class EndereignisBO extends EreignisBO{

    constructor() {
        super()
    }

    static fromJSON(end) {
        let result = []
        if (Array.isArray(end)) {
            end.forEach((e) => {
                Object.setPrototypeOf(e, EndereignisBO.prototype);
                result.push(e)
            })
        } else {
            let e = end;
            Object.setPrototypeOf(e, EndereignisBO.prototype);
            result.push(e);
        }

        return result;

    }
    
}