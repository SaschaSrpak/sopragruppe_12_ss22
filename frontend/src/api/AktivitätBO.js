import BO from './BO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/
export default class AktivitaetBO extends BO{

    constructor(aName, aCapacity) {
        super()
            this.activity_name = aName;
            this.persons_responsible = ([]);
            this.man_day_capacity = aCapacity;
    }


    setActivity_name(activity_name){
        this.activity_name = activity_name;
    }
    getActivity_name(){
        return this.activity_name;
    }

/* Wie persons_responsible Dict Get und Setten? */

    getPersons_Responsible(){
        return this.persons_responsible;
    }

    setPersons_Responsible(){
        this.persons_responsible;
    }

    setMan_day_capacity(man_day_capacity){
        this.man_day_capacity = man_day_capacity;
    }

    getMan_day_capacity(){
        return this.man_day_capacity;
    }

    static fromJSON(activity){
        let result = []
        if(Array.isArray(activity)){
            activity.forEach((a) => {
                Object.setPrototypeOf(a, AktivitaetBO.prototype);
                result.push(a)
            })
        } else{
            let a = activity;
            Object.setPrototypeOf(a, AktivitaetBO.prototype);
            result.push(a);
        }

        return result;
    }
    

}

