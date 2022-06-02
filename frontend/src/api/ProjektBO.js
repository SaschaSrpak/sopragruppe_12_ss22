import ProjektBO from './ProjektBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektBO{

    constructor() {
        super()
        this.name = null;
        this.creator = null;
        this.client = null;
        this.description = null;
        this.set_deadline = null;
        this.project_duration = null;
        this.activities = ([]);
        this.persons_responsible = ([]);
    }

    get name(){
        return this.name;
    }

    set name(name){
        this.name = name;
    }
    
    get creator(){
        return this.creator;
    }

    set creator(name){
        this.name = name;
    }

    get client(){
        return this.creator;
    }

    set client(name){
        this.client = name;
    }

    get description(){
        return this.description;
    }

    set description(new_description){
        this.description = new_description;
    }

    get set_deadline(){
        return this.set_deadline;
    }

    
}