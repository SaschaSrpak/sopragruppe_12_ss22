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

    #getWorktimeTransactionsOfAccount = (id) =>`${this.#bankServerBaseURL}/accounts/worktime-transactions/${id}`;

    //Commit-Transaction related

    #commitKommenTransaction = (account_id) =>`${this.#bankServerBaseURL}/commit-kommen-transaction/${account_id}`
    #commitGehenTransaction = (account_id) =>`${this.#bankServerBaseURL}/commit-gehen-transaction/${account_id}`
    #commitPauseTransaction = (account_id, name, start_time, end_time) =>`${this.#bankServerBaseURL}/commit-pause-transaction/${account_id}/${name}/${start_time}/${end_time}`
    #commitProjectWorktimeTransaction = (account_id, name, activity_id, start_time, end_time) =>`${this.#bankServerBaseURL}/commit-pause-transaction/${account_id}/${name}/${activity_id}/${start_time}/${end_time}`


    // End-Event related

    #getEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #deleteEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #updateEndEvent = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;

    // End-Event Transaction related

    #getEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #deleteEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #updateEndEventTransaction = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;

    //Gehen related

    #getGehen = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #deleteGehen = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #updateGehen = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;

    //Gehen Transaction related

    #getGehenTransaction = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #deleteGehenTransaction = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #updateGehenTransaction = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;

    //Kommen related

    #getKommen = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #deleteKommen = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #updateKommen = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;

    //Kommen Transaction relate

    #getKommenTransaction = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #deleteKommenTransaction = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #updateKommenTransaction = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;

    //Pause related

    #getpause = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #deletepause = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #updatepause = (id) => `${this.#bankServerBaseURL}/pause/${id}`;

    //Pause Transaction relate

    #getpauseTransaction = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #deletepauseTransaction = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #updatepauseTransaction = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;

    //Start-event related

    #getstartEvent = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #deletestartEvent = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #updatestartEvent= (id) => `${this.#bankServerBaseURL}/start-event/${id}`;

    //Start-event Transaction relate

    #getstartEventTransaction = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #deletestartEventTransaction = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #updatestartEventTransaction = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    
    //Worktime related

    #getWorktime = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #deleteWorktime = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #updateWorktime= (id) => `${this.#bankServerBaseURL}/worktime/${id}`;

    //Worktime Transaction relate

    #getWorktimeTransaction = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #deleteWorktimeTransaction = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #updateWorktimeTransaction = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;

    //Project-deadline related

    #getProjectDeadline = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #deleteProjectDeadline = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #updateProjectDeadline= (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #addProjectDeadline = () => `${this.#bankServerBaseURL}/project_deadline`;

    //Project-duration related

    #getProjectDuration = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #deleteProjectDuration = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #updateProjectDuration= (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #addProjectDuration = () => `${this.#bankServerBaseURL}/project_duration`;


    
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
        return this.#fetchAdvancend(this.#getCustomerURL(person_id)).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePersonBO)
            })
        })
    }


    addPerson(personBO) {
        return this.#fetchAdvancend(this.#addPersonURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(personBO)
        }).then((responseJSON) => {
            let responseCustomerBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseCustomerBO);
            })
        })
    }

    updatePerson(personBO) {
    return this.#fetchAdvancend(this.#updatePersonURL(personBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
        
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(personBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  deletePerson(person_id) {
        return this.#fetchAdvancend(this.#deletePersonURL(person_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePersonBO);
            })
        })
  }


}


