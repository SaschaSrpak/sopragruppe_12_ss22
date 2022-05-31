import AktivitätBO from './AktivitätBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/
export default class AktivitätBO{

    constructor() {
        super()
            this.activity_name = null;
            this.persons_responsible = ([]);
            this.man_day_capacity = null;
    }


    setActivity_name(activity_name){
        this.activity_name = activity_name;
    }
    getActivity_name(){
        return this.activity_name;
    }

/* Wie persons_responsible Dict Get und Setten? */


    setMan_day_capacity(man_day_capacity){
        this.man_day_capacity = man_day_capacity;
    }

    getMan_day_capacity(){
        return this.man_day_capacity;
    }

    

}

