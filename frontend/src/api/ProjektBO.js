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

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }
    
    getCreator(){
        return this.creator;
    }

    setCreator(name){
        this.name = name;
    }

    getClient(){
        return this.creator;
    }

    setClient(name){
        this.client = name;
    }

    getDescription(){
        return this.description;
    }

    setDescription(new_description){
        this.description = new_description;
    }

    getSet_deadline(){
        return this.set_deadline;
    }

    getActivites(){
        return this.activities;
    }
    
    setActivities(){
        this.activities;
    }

    getPersons_Responsible(){
        return this.persons_responsible;
    }

    setPersons_Responsible(){
        this.persons_responsible;
    }
    
}