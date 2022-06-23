import BO from './BO';
import ZeitkontoBO from './ZeitkontoBO';
import PersonBO from './PersonBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ZeitkontoBO extends BO{

    constructor(owner) {
        super()
        this.owner = owner;
    }

    getOwner(){
        return this.owner; 
    }
    
    setOwner(new_person){
        this.owner = new_person;
    }

    static fromJSON(account) {
        let result = []
        if (Array.isArray(account)) {
            account.forEach((a) => {
                Object.setPrototypeOf(a, ZeitkontoBO.prototype);
                result.push(a)
            })
        } else {
            let a = account;
            Object.setPrototypeOf(a, Account.prototype);
            result.push(a);
        }

        return result;
    }
}



