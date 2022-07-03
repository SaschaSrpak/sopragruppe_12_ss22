import BO from './BO';
import PersonBO from './PersonBO';
/** 
 *@fileOverview 
 *@author Luca Trautmann, Jeffrey He
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
            Object.setPrototypeOf(a, account.prototype);
            result.push(a);
        }

        return result;
    }
}



