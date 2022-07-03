import BO from '../BO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class BuchungBO extends BO{

    constructor(account_id) {
        //Konstruiert ein Buchung mit id
        super()
        this.target_user_account = account_id;
    }   
    
    //setter
    setTarget_user_account(target_user_account){
        this.target_user_account = target_user_account;
    }
        
    //getter
    getTarget_user_account(){
        return this.target_user_account;
    }
    
}