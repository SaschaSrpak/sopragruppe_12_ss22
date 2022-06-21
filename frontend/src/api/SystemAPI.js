import PersonBO from './PersonBO'
import ProjektBO from './ProjektBO'
import AktivitaetBO from './AktivitätBO'
import ZeitkontoBO from './ZeitkontoBO'
import EreignisBO from './Ereignisse/EreignisBO'
import StartereignisBO from './Ereignisse/StartereignisBO'
import EndereignisBO from './Ereignisse/EndereignisBO'
import KommenBO from './Ereignisse/KommenBO'
import GehenBO from './Ereignisse/GehenBO'
import ProjektDeadlineBO from './Ereignisse/ProjektDeadlineBO'
import ZeitintervallBO from './Zeitintervall/ZeitintervallBO'
import PauseBO from './Zeitintervall/PauseBO'
import ProjektlaufzeitBO from './Zeitintervall/ProjektlaufzeitBO'
import ProjektarbeitBO from './Zeitintervall/ProjektarbeitBO'
import Buchung from './Buchungen/BuchungBO'
import EreignisbuchungBO from './Buchungen/EreignisbuchungBO'
import ZeitintervallbuchungBO from './Buchungen/ZeitintervallbuchungBO'
import StartereignisBuchungBO from './Buchungen/StartereignisBuchungBO'
import EndereignisBuchungBO from './Buchungen/EndereignisBuchungBO'
import KommenBuchungBO from './Buchungen/KommenBuchungBO'
import GehenBuchungBO from './Buchungen/GehenBuchungBO'
import PauseBuchungBO from './Buchungen/PauseBuchungBO'
import ProjektarbeitBuchungBO from './Buchungen/ProjektarbeitBuchungBO'


/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author Leonard Justus)
 */

export default class SystemAPI {

    static #api = null;

    #bankServerBaseURL = '/bank'

    //Person related
    #getPersonsURL = () => `${this.#bankServerBaseURL}/persons`

    static getApi() {
        if (this.#api == null) {
            this.#api = new SystemAPI();
        }
        return this.#api;
    }

    #fetchAdvancend = (url, init) => fetch(url, init)
        .then(res=> {
            if (!res.ok){
                throw Error(`${res.status} ${res.statusText}`)
            }
            return res.json();
        }
        )

    getPersons() {
        return this.#fetchAdvancend(this.#getPersonsURL()).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
    }


}


