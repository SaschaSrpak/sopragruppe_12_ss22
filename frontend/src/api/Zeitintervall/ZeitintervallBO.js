
import BO from '../BO';

/** 
 *@fileOverview 
 *@author Luca Trautmann, Sascha Srpak
*/

export default class ZeitintervallBO extends BO {

    constructor(Name, start_id, end_id) {
        super()
        this.name = Name;
        this.start = start_id;
        this.end = end_id;
        this.duration = null;
    }
/**
 * Sets a new name
 * @param {*} name
 */

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getStart() {
        return this.start;
    }

    setStart(start) {
        this.start = start;
    }

    getEnd() {
        return this.end;
    }

    setEnd(end) {
        this.end = end;
    }

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
    }
    

    /**
     * 
     * @param {*} zeit
     * @returns an array of ZeitintervallBO from a given JSON structure 
     */

    static fromJSON(zeit) {
        let result = [];
        if (Array.isArray(zeit)) {
            zeit.forEach((z) => {
                Object.setPrototypeOf(z, ZeitintervallBO.prototype);
                result.push(z);
            })
        }  else{
            // es handelt sich um ein einzelnes Objekt
                let z = zeit;
                Object.setPrototypeOf(z, ZeitintervallBO.prototype);
        return result;
    }

}
}
