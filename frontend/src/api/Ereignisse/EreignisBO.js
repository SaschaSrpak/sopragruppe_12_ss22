import EreignisBO from "/Ereignisse/EreignisBO";
/** 
 *@fileOverview 
 *@author Luca Trautmann, Kim Kausler
*/

export default class EreignisBO extends EreignisBO{

    constructor() {
        super()
        this.event_name = null;
        this.time_of_event = null;
           }

    getEventName() {
        // Auslesen des Eventnamens des Ereignis
        return this.event_name;

    }

    setEventName(name){
        // Setzen des Eventnamens des Ereignis
        this.event_name = name;
    }

    getTimeOfEvent() {
        // Auslesen des Zeitpunkts des Erignisses
        return this.time_of_event;
    }

    setTimeOfEvent(TimeOfEvent){
        // Setzen des Zeitpunkts des Ereignisses
        this.time_of_event = TimeOfEvent;
    }
    
}