import PersonBO from './PersonBO';

/** 
 *@fileOverview 
 *@author Luca Trautmann
*/

export default class PersonBO{

    constructor() {
        super()
        this.name = null;
        this.surname = null;
        this.mail_adress = null;
        this.user_name = null;
        this.firebase_id = null;
        this.manager_status = null;
    }

    getName(){
        return this.name;
    }

    setName(new_name){
        this.name = new_name;
    }

    getSurname(){
        return this.surname;
    }

    setSurname(new_surname){
        this.surname = new_surname;
    }

    getMail_adress(){
        return this.mail_adress;
    }

    setMail_adress(new_mailadress){
        this.mail_adress = new_mailadress;
    }

    getUser_name(){
        return this.user_name;
    }

    setUser_name(new_user_name){
        this.user_name = new_user_name;
    }

    getFirebase_id(){
        return this.firebase_id;
    }

    setFirebase_id(new_firebase_id){
        this.firebase_id = new_firebase_id;
    }

    getManager_status(){
        return this.manager_status;
    }
/* 
    Wie manager_status vetrteilen 0 oder 1 automatisch? */

    setManager_status(new_manager_status){
        this.manager_status = new_manager_status;
    }


    static fromJSON(person){
        let result = []
        if(Array.isArray(person)){
            person.forEach((p) => {
                Object.setPrototypeOf(p, PersonBO.prototype);
                result.push(p)
            })
        } else{
            let p = person;
            Object.setPrototypeOf(p, PersonBO.prototype);
            result.push(p);
        }

        return result;
    }

}