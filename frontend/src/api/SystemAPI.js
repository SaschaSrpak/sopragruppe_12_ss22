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

    #getEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #deleteEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #updateEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;

    // End-Event Transaction related

    #getEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #deleteEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #updateEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;

    //Gehen related

    #getGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #deleteGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #updateGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;

    //Gehen Transaction related

    #getGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #deleteGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #updateGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;

    //Kommen related

    #getKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #deleteKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #updateKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;

    //Kommen Transaction relate

    #getKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #deleteKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #updateKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;

    //Pause related

    #getpauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #deletepauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #updatepauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;

    //Pause Transaction relate

    #getpauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #deletepauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #updatepauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;

    //Start-event related

    #getstartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #deletestartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #updatestartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;

    //Start-event Transaction relate

    #getstartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #deletestartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #updatestartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    
    //Worktime related

    #getWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #deleteWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #updateWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;

    //Worktime Transaction relate

    #getWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #deleteWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #updateWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;

    //Project-deadline related

    #getProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #deleteProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #updateProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #addProjectDeadlineURL = () => `${this.#bankServerBaseURL}/project_deadline`;

    //Project-duration related

    #getProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #deleteProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #updateProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #addProjectDurationURL = () => `${this.#bankServerBaseURL}/project_duration`;


    
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

  /**
   * Returns a Promise, which resolves to a EndereignisBO.
   *
   * @param {Number} EndEvent_id to be retrieved
   * @public
   */

    getEndEvent(EndEvent_id){
        return this.#fetchAdvancend(this.#getEndEventURL(EndEvent_id)).then((responseJSON) => {
            let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of EndereignisBO.
   *
   * @param {Number} EndEvent_id to be deleted
   * @public
   */

    deleteEndEvent(EndEvent_id) {
        return this.#fetchAdvancend(this.#deleteEndEventURL(EndEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEndereignisBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a EndereignisBO.
   *
   * @param {Number} EndEvent_id to be updated
   * @public
   */
  updateEndEvent(EndEvent_id) {
    return this.#fetchAdvanced(this.updateEndEventURL(EndEvent_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(EndereignisBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBO.fromJSON
      let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
      // console.info(EndereignisBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to a EreignisbuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getEndEventTransaction(EndEventTransaction_id){
        return this.#fetchAdvancend(this.#getEndEventTransactionURL(EndEventTransaction_id)).then((responseJSON) => {
            let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEreignisbuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of EreignisbuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be deleted
   * @public
   */

    deleteEndEventTransaction(EndEventTransaction_id) {
        return this.#fetchAdvancend(this.#deleteEndEventTransactionURL(EndEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEreignisbuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a EreignisbuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be updated
   * @public
   */
  updateEndEventTransaction(EndEventTransaction_id) {
    return this.#fetchAdvanced(this.updateEndEventTransactionURL(EndEventTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(EreignisbuchungBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisbuchungBO.fromJSON
      let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
      // console.info(EreignisbuchungBO);
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      })
    })
  }

    /**
   * Returns a Promise, which resolves to a GehenBO.
   *
   * @param {Number} Gehen_id to be retrieved
   * @public
   */

    getGehen(Gehen_id){
        return this.#fetchAdvancend(this.#getGehenURL(Gehen_id)).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBO.
   *
   * @param {Number} Gehen_id to be deleted
   * @public
   */

    deleteGehen(Gehen_id) {
        return this.#fetchAdvancend(this.#deleteGehenURL(Gehen_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGehenBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a GehenBO.
   *
   * @param {Number} Gehen_id to be updated
   * @public
   */
  updateGehen(Gehen_id) {
    return this.#fetchAdvanced(this.updateGehenURL(Gehen_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(GehenBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // console.info(GehenBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      })
    })
  }
}