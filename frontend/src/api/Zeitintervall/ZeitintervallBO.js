import ZeitintervallBO from './Zeitintervall/ZeitintervallBO';
import BO from '../BO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitintervallBO extends BO {

    constructor() {
        super()
        this.name = Name;
        this.start = start;
        this.end = end;
        this.duration = duration;
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
    
}