/*
Basis Klasse für alle BusinessObjects, die standardmäßig ein ID Feld hat
*/

export default class BusinessObject {

    // Konstruktor
    constructor() {
        this.id = 0;
    }

    // Setzen einer ID für das jeweilige BusinessObject
    setID(aID){
        this.id = aID;
    }

    // Gibt die ID des BusinessObjects zurück
    getID(){
        return this.id;
    }
}

