import BO from './BO';

/** 
 *@fileOverview 
 *@author Jeffrey He
*/

export default class PersonBO extends BO{

    constructor(aName, aSurname, aMail_Address, aUser_Name, aFirebase_ID, aManager_Status) {
        super()
        this.name = aName;
        this.surname = aSurname;
        this.mail_address = aMail_Address;
        this.user_name = aUser_Name;
        this.firebase_id = aFirebase_ID;
        this.manager_status = aManager_Status;
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

    getMail_address(){
        return this.mail_address;
    }

    setMail_address(new_mailaddress){
        this.mail_address = new_mailaddress;
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