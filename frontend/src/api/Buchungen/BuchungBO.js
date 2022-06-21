import BO from '../BO';
import BuchungBO from './Buchungen/BuchungBO';
import Zeitkonto from './Buchungen/Zeitkonto';
/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class BuchungBO extends BO{

    constructor() {
        super()
        this.target_user_account = Zeitkonto;
    }

    setTarget_user_account(target_user_account){
        this.target_user_account = target_user_account;
    }
    
    getTarget_user_account(){
        return this.target_user_account;
    }
    
}