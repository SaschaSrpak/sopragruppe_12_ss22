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

    toString() {
        let result = '';
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result
    }
}
