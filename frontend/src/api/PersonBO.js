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

    get name(){
        return this.name;
    }

    set name(new_name){
        this.name = new_name;
    }

    get surname(){
        return this.surname;
    }

    set surname(new_surname){
        this.surname = new_surname;
    }

    get mail_adress(){
        return this.mail_adress;
    }

    set mail_adress(new_mailadress){
        this.mail_adress = new_mailadress;
    }

    get user_name(){
        return this.user_name;
    }

    set user_name(new_user_name){
        this.user_name = new_user_name;
    }

    get firebase_id(){
        return this.firebase_id;
    }

    set firebase_id(new_firebase_id){
        this.firebase_id = new_firebase_id;
    }

    get manager_status(){
        return this.manager_status;
    }

    set manager_status(new_manager_status){
        this.manager_status = new_manager_status;
    }

}