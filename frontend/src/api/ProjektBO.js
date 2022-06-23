import BO from './BO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class ProjektBO extends BO{

    constructor(pName, pCreator, pClient, pDescription, pSet_Deadline, pProject_Duration) {
        super()
        this.name = pName;
        this.creator = pCreator;
        this.client = pClient;
        this.description = pDescription;
        this.set_deadline = pSet_Deadline;
        this.project_duration = pProject_Duration;
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

    getProject_Duration(){
        return this.project_duration
    }

    setProject_Duration(){
        return this.project_duration
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

    static fromJSON(projekt){
        let result = []
        if(Array.isArray(projekt)){
            projekt.forEach((j) => {
                Object.setPrototypeOf(j, ProjektBO.prototype);
                result.push(j)
            })
        } else{
            let j = projekt;
            Object.setPrototypeOf(j, ProjektBO.prototype);
            result.push(j);
        }

        return result;
    }


    
}