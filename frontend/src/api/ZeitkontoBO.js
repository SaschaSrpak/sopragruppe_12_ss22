import BO from './BO';
import ZeitkontoBO from './ZeitkontoBO';
import PersonBO from './PersonBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitkontoBO{

    constructor() {
        super()
        this.owner = Person;
    }

    get owner(){
        return this.owner; 
    }
    
    set owner(new_person){
        this.owner = new_person;
    }
}