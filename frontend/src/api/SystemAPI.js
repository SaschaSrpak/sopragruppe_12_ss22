import PersonBO from './PersonBO'
import ProjektBO from './ProjektBO'
import AktivitaetBO from './AktivitätBO'
import ZeitkontoBO from './ZeitkontoBO'
import EreignisBO from './Ereignisse/EreignisBO'
import StartereignisBO from './Ereignisse/StartereignisBO'
import EndereignisBO from './Ereignisse/EndereignisBO'
import KommenBO from './Ereignisse/KommenBO'
import GehenTransactionBO from './Ereignisse/GehenBO'
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

    #getPauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #deletePauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #updatePauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;

    //Pause Transaction relate

    #getPauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #deletePauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #updatePauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;

    //Start-event related

    #getStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #deleteStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #updateStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;

    //Start-event Transaction relate

    #getStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #deleteStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #updateStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;

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

    #fetchAdvanced = (url, init) => fetch(url, init)
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
        return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
    }

    getPerson(person_id){
        return this.#fetchAdvanced(this.#getCustomerURL(person_id)).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePersonBO)
            })
        })
    }


    addPerson(personBO) {
        return this.#fetchAdvanced(this.#addPersonURL(), {
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
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getId()), {
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
        return this.#fetchAdvanced(this.#deletePersonURL(person_id), {
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
        return this.#fetchAdvanced(this.#getEndEventURL(EndEvent_id)).then((responseJSON) => {
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
        return this.#fetchAdvanced(this.#deleteEndEventURL(EndEvent_id), {
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
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getEndEventTransaction(EndEventTransaction_id){
        return this.#fetchAdvanced(this.#getEndEventTransactionURL(EndEventTransaction_id)).then((responseJSON) => {
            let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be deleted
   * @public
   */

    deleteEndEventTransaction(EndEventTransaction_id) {
        return this.#fetchAdvanced(this.#deleteEndEventTransactionURL(EndEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEndereignisBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a EndereignisBuchungBO.
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
      body: JSON.stringify(EndereignisBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBuchungBO.fromJSON
      let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(EndereignisBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBuchungBO);
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
        return this.#fetchAdvanced(this.#getGehenURL(Gehen_id)).then((responseJSON) => {
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
        return this.#fetchAdvanced(this.#deleteGehenURL(Gehen_id), {
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
      /**
   * Returns a Promise, which resolves to a GehenBuchungBO.
   *
   * @param {Number} GehenTransaction_id to be retrieved
   * @public
   */

    getGehenTransaction(GehenTransaction_id){
        return this.#fetchAdvanced(this.#getGehenTransactionURL(GehenTransaction_id)).then((responseJSON) => {
            let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBuchungBO.
   *
   * @param {Number} GehenTransaction_id to be deleted
   * @public
   */

    deleteGehenTransaction(GehenTransaction_id) {
        return this.#fetchAdvanced(this.#deleteGehenTransactionURL(GehenTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGehenBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a GehenBuchungBO.
   *
   * @param {Number} GehenTransaction_id to be updated
   * @public
   */
  updateGehenTransaction(GehenTransaction_id) {
    return this.#fetchAdvanced(this.updateGehenTransactionURL(GehenTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(GehenBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(GehenBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBuchungBO);
      })
    })
  }

      /**
   * Returns a Promise, which resolves to a KommenBO.
   *
   * @param {Number} Kommen_id to be retrieved
   * @public
   */

    getKommen(Kommen_id){
        return this.#fetchAdvanced(this.#getKommenURL(Kommen_id)).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of KommenBO.
   *
   * @param {Number} Kommen_id to be deleted
   * @public
   */

    deleteKommen(Kommen_id) {
        return this.#fetchAdvanced(this.#deleteKommenURL(Kommen_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKommenBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a KommenBO.
   *
   * @param {Number} Kommen_id to be updated
   * @public
   */
  updateKommen(Kommen_id) {
    return this.#fetchAdvanced(this.updateKommenURL(Kommen_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(KommenBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBO.fromJSON
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      // console.info(KommenBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be retrieved
   * @public
   */

    getKommenTransaction(KommenTransaction_id){
        return this.#fetchAdvanced(this.#getKommenTransactionURL(KommenTransaction_id)).then((responseJSON) => {
            let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be deleted
   * @public
   */

    deleteKommenTransaction(KommenTransaction_id) {
        return this.#fetchAdvanced(this.#deleteKommenTransactionURL(KommenTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKommenBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be updated
   * @public
   */
  updateKommenTransaction(KommenTransaction_id) {
    return this.#fetchAdvanced(this.updateKommenTransactionURL(KommenTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(KommenBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBO.fromJSON
      let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(KommenBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBuchungBO);
      })
    })
  }


      /**
   * Returns a Promise, which resolves to a PauseBO.
   *
   * @param {Number} Pause_id to be retrieved
   * @public
   */

    getPause(Pause_id){
        return this.#fetchAdvanced(this.#getPauseURL(Pause_id)).then((responseJSON) => {
            let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBO.
   *
   * @param {Number} Pause_id to be deleted
   * @public
   */

    deletePause(Pause_id) {
        return this.#fetchAdvanced(this.#deletePauseURL(Pause_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePauseBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a PauseBO.
   *
   * @param {Number} Pause_id to be updated
   * @public
   */
  updatePause(Pause_id) {
    return this.#fetchAdvanced(this.updatePauseURL(Pause_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(PauseBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      // console.info(PauseBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      })
    })
  }
   /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be retrieved
   * @public
   */

    getPauseTransaction(PauseTransaction_id){
        return this.#fetchAdvanced(this.#getPauseTransactionURL(PauseTransaction_id)).then((responseJSON) => {
            let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBuchungBO.
   *
   * @param {Number} PauseTransaction_id to be deleted
   * @public
   */

    deletePauseTransaction(PauseTransaction_id) {
        return this.#fetchAdvanced(this.#deletePauseTransactionURL(PauseTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePauseBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a PauseBuchungBO.
   *
   * @param {Number} PauseTransaction_id to be updated
   * @public
   */
  updatePauseTransaction(PauseTransaction_id) {
    return this.#fetchAdvanced(this.updatePauseTransactionURL(PauseTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(PauseBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
      // console.info(PauseBuchungBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBuchungBO);
      })
    })
  }

      /**
   * Returns a Promise, which resolves to a StartereignisBO.
   *
   * @param {Number} StartEvent_id to be retrieved
   * @public
   */

    getStartEvent(StartEvent_id){
        return this.#fetchAdvanced(this.#getStartEventURL(StartEvent_id)).then((responseJSON) => {
            let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBO.
   *
   * @param {Number} StartEvent_id to be deleted
   * @public
   */

    deleteStartEvent(StartEvent_id) {
        return this.#fetchAdvanced(this.#deleteStartEventURL(StartEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseStartereignisBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a StartereignisBO.
   *
   * @param {Number} StartEvent_id to be updated
   * @public
   */
  updateStartEvent(StartEvent_id) {
    return this.#fetchAdvanced(this.updateStartEventURL(StartEvent_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(StartereignisBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBO.fromJSON
      let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBO);
      })
    })
  }

   /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getStartEventTransaction(StartEventTransaction_id){
        return this.#fetchAdvanced(this.#getStartEventTransactionURL(StartEventTransaction_id)).then((responseJSON) => {
            let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBuchungBO.
   *
   * @param {Number} StartEventTransaction_id to be deleted
   * @public
   */

    deleteStartEventTransaction(StartEventTransaction_id) {
        return this.#fetchAdvanced(this.#deleteStartEventTransactionURL(StartEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseStartereignisBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a StartereignisBuchungBO.
   *
   * @param {Number} StartEventTransaction_id to be updated
   * @public
   */
  updateStartEventTransaction(StartEventTransaction_id) {
    return this.#fetchAdvanced(this.updateStartEventTransactionURL(StartEventTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(StartereignisBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBuchungBO.fromJSON
      let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBuchungBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a ProjektarbeitBO.
   *
   * @param {Number} Worktime_id to be retrieved
   * @public
   */

    getWorktime(Worktime_id){
        return this.#fetchAdvanced(this.#getWorktimeURL(Worktime_id)).then((responseJSON) => {
            let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBO.
   *
   * @param {Number} Worktime_id to be deleted
   * @public
   */

    deleteWorktime(Worktime_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeURL(Worktime_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektarbeitBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektarbeitBO.
   *
   * @param {Number} StartEvent_id to be updated
   * @public
   */
  updateWorktime(Worktime_id) {
    return this.#fetchAdvanced(this.updateWorktimeURL(Worktime_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektarbeitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBO.fromJSON
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // console.info(ProjektarbeitBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getWorktimeTransaction(WorktimeTransaction_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionURL(WorktimeTransaction_id)).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBuchungBO.
   *
   * @param {Number} WorktimeTransaction_id to be deleted
   * @public
   */

    deleteWorktimeTransaction(WorktimeTransaction_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeTransactionURL(Worktime_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektarbeitBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektarbeitBuchungBO.
   *
   * @param {Number} WorktimeTransaction_id to be updated
   * @public
   */
  updateWorktimeTransaction(WorktimeTransaction_id) {
    return this.#fetchAdvanced(this.updateWorktimeTransactionURL(WorktimeTransaction_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektarbeitBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBuchungBO.fromJSON
      let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
      // console.info(ProjektarbeitBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBuchungBO);
      })
    })
  }

      /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} ProjectDeadline_id to be retrieved
   * @public
   */

    getProjectDeadline(ProjectDeadline_id){
        return this.#fetchAdvanced(this.#getProjectDeadlineURL(ProjectDeadline_id)).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektDeadlineBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektDeadlineBO.
   *
   * @param {Number} ProjectDeadline_id to be deleted
   * @public
   */

    deleteProjectDeadline(ProjectDeadline_id) {
        return this.#fetchAdvanced(this.#deleteProjectDeadlineURL(ProjectDeadline_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektDeadlineBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} StartEvent_id to be updated
   * @public
   */
  updateProjectDeadline(ProjectDeadline_id) {
    return this.#fetchAdvanced(this.updateProjectDeadlineURL(ProjectDeadline_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektDeadlineBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektDeadlineBO.fromJSON
      let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
      // console.info(ProjektDeadlineBO);
      return new Promise(function (resolve) {
        resolve(responseProjektDeadlineBO);
      })
    })
  }
    /**
   * Adds a ProjektDeadline and returns a Promise
   *
   * @param ProjektDeadlineBO to be added
   * @public
   */

      addProjectDeadline(ProjektDeadlineBO) {
        return this.#fetchAdvanced(this.#addProjectDeadlineURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(ProjektDeadlineBO)
        }).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            // console.info(ProjektDeadlineBO);
            return new Promise(function (resolve) {
                resolve(responseProjektDeadlineBO);
            })
        })
    }

     /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} ProjectDeadline_id to be retrieved
   * @public
   */

    getProjectDuration(ProjectDuration_id){
        return this.#fetchAdvanced(this.#getProjectDurationURL(ProjectDuration_id)).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektlaufzeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektlaufzeitBO.
   *
   * @param {Number} ProjectDuration_id to be deleted
   * @public
   */

    deleteProjectDuration(ProjectDuration_id) {
        return this.#fetchAdvanced(this.#deleteProjectDurationURL(ProjectDuration_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektlaufzeitBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektlaufzeitBO.
   *
   * @param {Number} StartEvent_id to be updated
   * @public
   */
  updateProjectDuration(ProjectDuration_id) {
    return this.#fetchAdvanced(this.updateProjectDurationURL(ProjectDuration_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektlaufzeitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektlaufzeitBO.fromJSON
      let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
      // console.info(ProjektlaufzeitBO);
      return new Promise(function (resolve) {
        resolve(responseProjektlaufzeitBO);
      })
    })
  }
    /**
   * Adds a ProjektDuration and returns a Promise
   *
   * @param ProjektlaufzeitBO to be added
   * @public
   */

      addProjectDuration(ProjektlaufzeitBO) {
        return this.#fetchAdvanced(this.#addProjectDurationURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(ProjektlaufzeitBO)
        }).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            // console.info(ProjektlaufzeitBO);
            return new Promise(function (resolve) {
                resolve(responseProjektlaufzeitBO);
            })
        })
    }
}