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
    #getPersonsURL = () => `${this.#bankServerBaseURL}/persons`;
    #getPersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;
    #addPersonURL = () => `${this.#bankServerBaseURL}/persons`;
    #getActivityforPerson = (id) => `${this.#bankServerBaseURL}/persons/${id}/activity`;
    #deletePersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;
    #updatePersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;

    //Project related

    #getProjectsURL = () => `${this.#bankServerBaseURL}/projects`;
    #addProjectURL = () => `${this.#bankServerBaseURL}/projects`;
    #getProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #updateProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #getActivitiesOnProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}/activity`;
    #getPersonsOnProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}/persons`;

    //Activity related

    #getActivities = () => `${this.#bankServerBaseURL}/activities`;
    #addActivity = () => `${this.#bankServerBaseURL}/activities`;
    #getActivity = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #deleteActivity = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #updateActivity = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #getPersonsResponsibleOnActivity = (id) => `${this.#bankServerBaseURL}/activities/${id}/person`;
    #addPersonsResponsibleOnActivity = (id, person_id) => `${this.#bankServerBaseURL}/activities/
                                                               ${id}/person/${person_id}`;
    #deletePersonsResponsibleOnActivity = (id, person_id) => `${this.#bankServerBaseURL}/activities/
                                                                ${id}/person/${person_id}`;

    //Account related

    #getAccounts = () => `${this.#bankServerBaseURL}/activities`;
    #getAccount = (id) => `${this.#bankServerBaseURL}/accounts/${id}`;
    #updateAccount = (id) => `${this.#bankServerBaseURL}/accounts/${id}`;
    #getKommenTransactionsOfAccount = (id) =>`${this.#bankServerBaseURL}/accounts/kommen/transactions/${id}`;
    #getGehenTransactionsOfAccount = (id) =>`${this.#bankServerBaseURL}/accounts/gehen/transactions/${id}`;
    #getPauseTransactionsOfAccount = (id) =>`${this.#bankServerBaseURL}/accounts/pause/${id}`;
    #getPauseTimeOfAccount = (id) =>`${this.#bankServerBaseURL}/accounts/pause/${id}/Time`;
    #getWorktimeTransactionsOfAccountOnActivity = (id, activity_id) =>`${this.#bankServerBaseURL}/accounts/
                                                                         transactions/${id}/activities/${activity_id}`;
    #getWorktimeOfAccountOnActivity = (id, activity_id) =>`${this.#bankServerBaseURL}/accounts/
                                                            worktime/${id}/activities/${activity_id}`;

    #getWorktimeTransactionsOfAccount= (id) =>`${this.#bankServerBaseURL}/accounts/worktime-transactions/${id}`;

    //Commit-Transaction related

    #

    // End-Event related

    #getEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #deleteEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #updateEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;

    // End-Event Transaction related

    #getEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #deleteEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #updateEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;





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

    /**
     * Gibt alle Personen im System aus
     *
     * @public
     */

    getPersons() {
        return this.#fetchAdvancend(this.#getPersonsURL()).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
    }

    getPerson(person_id){
        return this.#fetchAdvancend(this.#getCustomerURL(person_id)).then((responseJSON))
    }


}


