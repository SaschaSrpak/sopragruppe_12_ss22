import ZeitintervallBO from './Zeitintervall/ZeitintervallBO';
import BO from '../BO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitintervallBO extends BO {

    constructor() {
        super()
        this.name = name;
        this.start = start;
        this.end = end;
        this.duration = duration;
    }
/**
 * Sets a new name
 * @param {*} name
 */

    get_name() {
        return this.name;
    }

    set_name(name) {
        this.name = name;
    }

    get_start() {
        return this.start;
    }

    set_start(start) {
        this.start = start;
    }

    get_end() {
        return this.end;
    }

    set_end(end) {
        this.end = end;
    }

    get_duration() {
        return this.duration;
    }

    set_duration(duration) {
        this.duration = duration;
    }
    
}