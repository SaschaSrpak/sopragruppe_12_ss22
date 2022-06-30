/** 
 *@fileOverview 
 *@author Luca Trautmann
*/


export default class BO{
    constructor(){
        this.id = 0
        this.last_modified_date = null
    }

    getId(){
        return this.id;
    }

    setId(new_id){
        this.id = new_id;   
    }

    setLastModifiedDate(new_lastmodefieddate){
        this.last_modified_date = new_lastmodefieddate;
    }

    getLastModifiedDate(){
        return this.last_modified_date;
    }

    toString() {
        let result = '';
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result
    }
}
