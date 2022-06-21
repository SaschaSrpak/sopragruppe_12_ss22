import BO from "../BO";
/** 
 *@fileOverview
*@author Luca Trautmann, Kim Kausler
*/

export default class EreignisBO extends BO{

    constructor(event_name, time_of_event) {
        super()
        this.event_name = event_name;
        this.time_of_event = time_of_event;
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