/** 
 *@fileOverview 
 *@author Luca Trautmann
*/


export default class BO{
    constructor(){
        super()
        this.id = null
        this.last_modified_date = null
    }

    getId(){
        return this.id;
    }

    setId(new_id){
        this.id = new_id;   
    }
}
