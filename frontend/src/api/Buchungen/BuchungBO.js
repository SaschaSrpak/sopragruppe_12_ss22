import BO from '../BO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class BuchungBO extends BO{

    constructor(account_id) {
        super()
        this.target_user_account = account_id;
    }

    setTarget_user_account(target_user_account){
        this.target_user_account = target_user_account;
    }
    
    getTarget_user_account(){
        return this.target_user_account;
    }
    
}