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

    get id(){
        return this.id;
    }

    set id(new_id){
        this.id = new_id;   
    }
}
