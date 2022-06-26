import PersonBO from './PersonBO'
import ProjektBO from './ProjektBO'
import AktivitaetBO from './AktivitätBO'
import ZeitkontoBO from './ZeitkontoBO'
import StartereignisBO from './Ereignisse/StartereignisBO'
import EndereignisBO from './Ereignisse/EndereignisBO'
import KommenBO from './Ereignisse/KommenBO'
import GehenBO from './Ereignisse/GehenBO'
import ProjektDeadlineBO from './Ereignisse/ProjektDeadlineBO'
import PauseBO from './Zeitintervall/PauseBO'
import ProjektlaufzeitBO from './Zeitintervall/ProjektlaufzeitBO'
import ProjektarbeitBO from './Zeitintervall/ProjektarbeitBO'
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

    #SystemServerBaseURL = '/timesystem'



    //Person related
    #getPersonsURL = () => `${this.#SystemServerBaseURL}/persons`;
    #getPersonFirebaseURL = (firebase_id) => `${this.#SystemServerBaseURL}/persons/firebase/${firebase_id}`;
    #getPersonURL = (id) => `${this.#SystemServerBaseURL}/persons/${id}`;
    #addPersonURL = () => `${this.#SystemServerBaseURL}/persons`;
    #getActivitiesForPersonURL = (id) => `${this.#SystemServerBaseURL}/persons/${id}/activity`;
    #deletePersonURL = (id) => `${this.#SystemServerBaseURL}/persons/${id}`;
    #updatePersonURL = (id) => `${this.#SystemServerBaseURL}/persons/${id}`;

    //Project related

    #getProjectsURL = () => `${this.#SystemServerBaseURL}/projects`;
    #addProjectURL = () => `${this.#SystemServerBaseURL}/projects`;
    #getProjectURL = (id) => `${this.#SystemServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#SystemServerBaseURL}/projects/${id}`;
    #updateProjectURL = (id) => `${this.#SystemServerBaseURL}/projects/${id}`;
    #getActivitiesOnProjectURL = (id) => `${this.#SystemServerBaseURL}/projects/${id}/activity`;
    #getPersonsOnProjectURL = (id) => `${this.#SystemServerBaseURL}/projects/${id}/persons`;
    #addActivityToProjectURL = (id, activity_id) => `${this.#SystemServerBaseURL}/projects/${id}/activity/${activity_id}`;
    #deleteActivityFromProjectURL = (id, activity_id) => `${this.#SystemServerBaseURL}/projects/${id}/activity/${activity_id}`;
    #addPersonResponsibleToProjectURL = (id, person_id) => `${this.#SystemServerBaseURL}/projects/${id}/persons/${person_id}`;
    #deletePersonResponsibleFromProjectURL = (id, person_id) => `${this.#SystemServerBaseURL}/projects/${id}/persons/${person_id}`;

    //Activity related

    #getActivitiesURL = () => `${this.#SystemServerBaseURL}/activities`;
    #addActivityURL = () => `${this.#SystemServerBaseURL}/activities`;
    #getActivityURL = (id) => `${this.#SystemServerBaseURL}/activities/${id}`;
    #deleteActivityURL = (id) => `${this.#SystemServerBaseURL}/activities/${id}`;
    #updateActivityURL = (id) => `${this.#SystemServerBaseURL}/activities/${id}`;
    #getPersonsResponsibleOnActivityURL = (id) => `${this.#SystemServerBaseURL}/activities/${id}/person`;
    #addPersonsResponsibleOnActivityURL = (id, person_id) => `${this.#SystemServerBaseURL}/activities/
                                                               ${id}/person/${person_id}`;
    #deletePersonsResponsibleOnActivityURL = (id, person_id) => `${this.#SystemServerBaseURL}/activities/
                                                                ${id}/person/${person_id}`;

    //Account related

    #getAccountsURL = () => `${this.#SystemServerBaseURL}/activities`;
    #getAccountURL = (id) => `${this.#SystemServerBaseURL}/accounts/${id}`;
    #getAccountForPersonURL = (id) => `${this.#SystemServerBaseURL}/accounts/person/${id}`;
    #updateAccountURL = (id) => `${this.#SystemServerBaseURL}/accounts/${id}`;
    #getKommenTransactionsOfAccountURL = (id) =>`${this.#SystemServerBaseURL}/accounts/kommen/transactions/${id}`;
    #getGehenTransactionsOfAccountURL = (id) =>`${this.#SystemServerBaseURL}/accounts/gehen/transactions/${id}`;
    #getPauseTransactionsOfAccountURL = (id) =>`${this.#SystemServerBaseURL}/accounts/pause/${id}`;
    #getPauseTimeOfAccountURL = (id) =>`${this.#SystemServerBaseURL}/accounts/pause/${id}/Time`;
    #getWorktimeTransactionsOfAccountOnActivityURL = (id, activity_id) =>`${this.#SystemServerBaseURL}/accounts/
                                                                         transactions/${id}/activities/${activity_id}`;
    #getWorktimeOfAccountOnActivityURL = (id, activity_id) =>`${this.#SystemServerBaseURL}/accounts/
                                                            worktime/${id}/activities/${activity_id}`;

    #getWorktimeTransactionsOfAccountURL = (id) =>`${this.#SystemServerBaseURL}/accounts/worktime-transactions/${id}`;

    //Commit-Transaction related

    #commitKommenTransactionURL = (account_id) =>`${this.#SystemServerBaseURL}/commit-kommen-transaction/${account_id}/`;
    #commitGehenTransactionURL = (account_id) =>`${this.#SystemServerBaseURL}/commit-gehen-transaction/${account_id}`;
    #commitPauseTransactionURL = (account_id, name, start_time, end_time) =>`${this.#SystemServerBaseURL}
                                                                             /commit-pause-transaction/${account_id}/
                                                                             ${name}/${start_time}/${end_time}`;

    #commitProjectWorktimeTransactionURL = (account_id, name, activity_id, start_time, end_time) =>
                                                                            `${this.#SystemServerBaseURL}
                                                                            /commit-pause-transaction/${account_id}/
                                                                            ${name}/${activity_id}/${start_time}/
                                                                            ${end_time}`


    // End-Event related

    #getEndEventURL = (id) => `${this.#SystemServerBaseURL}/end-event/${id}`;
    #deleteEndEventURL = (id) => `${this.#SystemServerBaseURL}/end-event/${id}`;S
    #updateEndEventURL = (id) => `${this.#SystemServerBaseURL}/end-event/${id}`;

    // End-Event Transaction related

    #getEndEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/end-event-transaction/${id}`;
    #deleteEndEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/end-event-transaction/${id}`;
    #updateEndEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/end-event-transaction/${id}`;

    //Gehen related

    #getGehenURL = (id) => `${this.#SystemServerBaseURL}/gehen/${id}`;
    #deleteGehenURL = (id) => `${this.#SystemServerBaseURL}/gehen/${id}`;
    #updateGehenURL = (id) => `${this.#SystemServerBaseURL}/gehen/${id}`;

    //Gehen Transaction related

    #getGehenTransactionURL = (id) => `${this.#SystemServerBaseURL}/gehen-transaction/${id}`;
    #deleteGehenTransactionURL = (id) => `${this.#SystemServerBaseURL}/gehen-transaction/${id}`;
    #updateGehenTransactionURL = (id) => `${this.#SystemServerBaseURL}/gehen-transaction/${id}`;

    //Kommen related

    #getKommenURL = (id) => `${this.#SystemServerBaseURL}/kommen/${id}`;
    #deleteKommenURL = (id) => `${this.#SystemServerBaseURL}/kommen/${id}`;
    #updateKommenURL = (id) => `${this.#SystemServerBaseURL}/kommen/${id}`;

    //Kommen Transaction relate

    #getKommenTransactionURL = (id) => `${this.#SystemServerBaseURL}/kommen-transaction/${id}`;
    #deleteKommenTransactionURL = (id) => `${this.#SystemServerBaseURL}/kommen-transaction/${id}`;
    #updateKommenTransactionURL = (id) => `${this.#SystemServerBaseURL}/kommen-transaction/${id}`;

    //Pause related

    #getPauseURL = (id) => `${this.#SystemServerBaseURL}/pause/${id}`;
    #deletePauseURL = (id) => `${this.#SystemServerBaseURL}/pause/${id}`;
    #updatePauseURL = (id) => `${this.#SystemServerBaseURL}/pause/${id}`;

    //Pause Transaction relate

    #getPauseTransactionURL = (id) => `${this.#SystemServerBaseURL}/pause-transaction/${id}`;
    #deletePauseTransactionURL = (id) => `${this.#SystemServerBaseURL}/pause-transaction/${id}`;
    #updatePauseTransactionURL = (id) => `${this.#SystemServerBaseURL}/pause-transaction/${id}`;

    //Start-event related

    #getStartEventURL = (id) => `${this.#SystemServerBaseURL}/start-event/${id}`;
    #deleteStartEventURL = (id) => `${this.#SystemServerBaseURL}/start-event/${id}`;
    #updateStartEventURL = (id) => `${this.#SystemServerBaseURL}/start-event/${id}`;

    //Start-event Transaction relate

    #getStartEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/start-event-transaction/${id}`;
    #deleteStartEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/start-event-transaction/${id}`;
    #updateStartEventTransactionURL = (id) => `${this.#SystemServerBaseURL}/start-event-transaction/${id}`;

    //Worktime related

    #getWorktimeURL = (id) => `${this.#SystemServerBaseURL}/worktime/${id}`;
    #deleteWorktimeURL = (id) => `${this.#SystemServerBaseURL}/worktime/${id}`;
    #updateWorktimeURL = (id) => `${this.#SystemServerBaseURL}/worktime/${id}`;

    //Worktime Transaction relate

    #getWorktimeTransactionURL = (id) => `${this.#SystemServerBaseURL}/worktime-transaction/${id}`;
    #deleteWorktimeTransactionURL = (id) => `${this.#SystemServerBaseURL}/worktime-transaction/${id}`;
    #updateWorktimeTransactionURL = (id) => `${this.#SystemServerBaseURL}/worktime-transaction/${id}`;

    //Project-deadline related

    #getProjectDeadlineURL = (id) => `${this.#SystemServerBaseURL}/project_deadline/${id}`;
    #deleteProjectDeadlineURL = (id) => `${this.#SystemServerBaseURL}/project_deadline/${id}`;
    #updateProjectDeadlineURL = (id) => `${this.#SystemServerBaseURL}/project_deadline/${id}`;
    #addProjectDeadlineURL = () => `${this.#SystemServerBaseURL}/project_deadline`;

    //Project-duration related

    #getProjectDurationURL = (id) => `${this.#SystemServerBaseURL}/project_duration/${id}`;
    #deleteProjectDurationURL = (id) => `${this.#SystemServerBaseURL}/project_duration/${id}`;
    #updateProjectDurationURL = (id) => `${this.#SystemServerBaseURL}/project_duration/${id}`;
    #addProjectDurationURL = () => `${this.#SystemServerBaseURL}/project_duration`;



    static getAPI() {
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
        return this.#fetchAdvanced(this.#getPersonURL(person_id)).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePersonBO)
            })
        })
    }

    getPersonByFirebaseID(firebase_id){
        return this.#fetchAdvanced(this.#getPersonFirebaseURL(firebase_id)).then((responseJSON) => {
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

  getActivitiesForPerson(person_id) {
        return this.#fetchAdvanced(this.#getActivitiesForPersonURL(person_id)).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  //Project related Functions


  getProjects() {
        return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjektBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(projectBOs);
            })
        })
  }

  getProject(project_id){
        return this.#fetchAdvanced(this.#getProjectURL(project_id)).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjectBO)
            })
        })
  }

  addProject(projectBO) {
        return this.#fetchAdvanced(this.#addProjectURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectBO)
        }).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            // console.info(projectBO);
            return new Promise(function (resolve) {
                resolve(responseProjectBO);
            })
        })
  }

  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {

      let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
      // console.info(projectBO);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }

  deleteProject(project_id) {
        return this.#fetchAdvanced(this.#deleteProjectURL(project_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjectBO);
            })
        })
  }

  getActivitiesOnProject(project_id) {
        return this.#fetchAdvanced(this.#getActivitiesOnProjectURL(project_id)).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  getPersonsOnProject(project_id) {
        return this.#fetchAdvanced(this.#getPersonsOnProjectURL(project_id)).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
  }

  addActivityToProject(project_id, activity_id) {
        return this.#fetchAdvanced(this.#addActivityToProjectURL(project_id, activity_id), {
            method: 'POST'
        })
  }

  deleteActivityToProject(project_id, activity_id) {
        return this.#fetchAdvanced(this.#deleteActivityFromProjectURL(project_id, activity_id), {
            method: 'DELETE'
        })
  }

  addPersonResponsibleToProject(project_id, person_id) {
        return this.#fetchAdvanced(this.#addPersonResponsibleToProjectURL(project_id, person_id), {
            method: 'POST'
        })
  }

  deletePersonResponsibleToProject(project_id, person_id) {
        return this.#fetchAdvanced(this.#deletePersonResponsibleFromProjectURL(project_id, person_id), {
            method: 'DELETE'
        })
  }


  //Activity related Functions

  getActivities() {
        return this.#fetchAdvanced(this.#getActivitiesURL()).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  getActivity(activity_id){
        return this.#fetchAdvanced(this.#getActivityURL(activity_id)).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseActivityBO)
            })
        })
  }

  addActivity(activityBO) {
        return this.#fetchAdvanced(this.#addActivityURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(activityBO)
        }).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            // console.info(activityBO);
            return new Promise(function (resolve) {
                resolve(responseActivityBO);
            })
        })
  }

  updateActivity(activityBO) {
    return this.#fetchAdvanced(this.#updateActivityURL(activityBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(activityBO)
    }).then((responseJSON) => {

      let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
      // console.info(activityBO);
      return new Promise(function (resolve) {
        resolve(responseActivityBO);
      })
    })
  }

  deleteActivity(activity_id) {
        return this.#fetchAdvanced(this.#deleteActivityURL(activity_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseActivityBO);
            })
        })
  }

  getPersonsResponsibleOnActivity(activity_id) {
        return this.#fetchAdvanced(this.#getPersonsResponsibleOnActivityURL(activity_id)).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
  }

  addPersonResponsibleOnActivity(activity_id, person_id) {
        return this.#fetchAdvanced(this.#addPersonsResponsibleOnActivityURL(activity_id, person_id), {
            method: 'POST'
        })
  }

  deletePersonResponsibleOnActivity(activity_id, person_id) {
        return this.#fetchAdvanced(this.#deletePersonsResponsibleOnActivityURL(activity_id, person_id), {
            method: 'DELETE'
        })
  }


  // Account related Functions

  getAccounts() {
        return this.#fetchAdvanced(this.#getAccountsURL()).then((responseJSON) => {
            let accountBOs = ZeitkontoBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(accountBOs);
            })
        })
  }

  getAccount(account_id){
        return this.#fetchAdvanced(this.#getAccountURL(account_id)).then((responseJSON) => {
            let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseAccountBO)
            })
        })
  }

  getAccountForPerson(person_id){
        return this.#fetchAdvanced(this.#getAccountForPersonURL(person_id)).then((responseJSON) => {
            let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseAccountBO)
            })
        })
  }


  updateAccount(accountBO) {
    return this.#fetchAdvanced(this.#updateAccountURL(accountBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(accountBO)
    }).then((responseJSON) => {

      let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
      // console.info(activityBO);
      return new Promise(function (resolve) {
        resolve(responseAccountBO);
      })
    })
  }

  getKommenTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getKommenTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = KommenBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getGehenTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getGehenTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = GehenBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getPauseTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getPauseTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = PauseBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getPauseTimeOfAccount(account_id){
        return this.#fetchAdvanced(this.#getPauseTimeOfAccountURL(account_id)).then((responseJSON) => {
            let pause_time = responseJSON;
            return new Promise(function (resolve){
                resolve(pause_time)
            })
        })
  }

  getWorktimeTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = ProjektarbeitBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getWorktimeTransactionsOfAccountOnActivity(account_id, activity_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionsOfAccountOnActivityURL(account_id, activity_id)).then((responseJSON) => {
            let transactionBOs = ProjektarbeitBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getWorktimeOfAccountOnActivity(account_id, activity_id){
        return this.#fetchAdvanced(this.#getWorktimeOfAccountOnActivityURL(account_id, activity_id)).then((responseJSON) => {
            let worktime = responseJSON;
            return new Promise(function (resolve){
                resolve(worktime)
            })
        })
  }

  //Commit-Transaction related Functions

  commitKommenTransaction(account_id, kommenBO) {
        console.log(account_id, kommenBO)
        return this.#fetchAdvanced(this.#commitKommenTransactionURL(account_id), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(kommenBO)
        }).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseKommenBO);
            })
        })
  }

  commitGehenTransaction(account_id, gehenBO) {
        return this.#fetchAdvanced(this.#commitGehenTransactionURL(account_id), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(gehenBO)
        }).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseGehenBO);
            })
        })
  }

  commitPauseTransaction(account_id, name, start_time, end_time) {
        return this.#fetchAdvanced(this.#commitPauseTransactionURL(account_id, name, start_time, end_time), {
            method: 'POST',
        }).then((responseJSON) => {
            let transaction_response = responseJSON
            return new Promise(function (resolve){
                resolve(transaction_response);
            })
        })
  }

  commitProjectWorktimeTransaction(account_id, name, activity_id, start_time, end_time) {
        return this.#fetchAdvanced(this.#commitProjectWorktimeTransactionURL(account_id, name, activity_id,
            start_time, end_time), {
            method: 'POST',
        }).then((responseJSON) => {
            let transaction_response = responseJSON
            return new Promise(function (resolve) {
                resolve(transaction_response);
            })
        })
  }



  //Start-Event related Functions

  /**
   * Returns a Promise, which resolves to a StartereignisBO.
   *
   * @param {Number} start_event_id to be retrieved
   * @public
   */

    getStartEvent(start_event_id){
        return this.#fetchAdvanced(this.#getStartEventURL(start_event_id)).then((responseJSON) => {
            let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBO.
   *
   * @param {Number} start_event_id to be deleted
   * @public
   */

    deleteStartEvent(start_event_id) {
        return this.#fetchAdvanced(this.#deleteStartEventURL(start_event_id), {
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
   * @param {StartereignisBO} start_eventBO to be updated
   * @public
   */
  updateStartEvent(start_eventBO) {
    return this.#fetchAdvanced(this.#updateStartEventURL(start_eventBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(start_eventBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBO.fromJSON
      let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBO);
      })
    })
  }


  //Start-Event-Transaction related Functions

   /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} start_eventTransaction_id to be retrieved
   * @public
   */

    getStartEventTransaction(start_eventTransaction_id){
        return this.#fetchAdvanced(this.#getStartEventTransactionURL(start_eventTransaction_id)).then((responseJSON) => {
            let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBuchungBO.
   *
   * @param {Number} start_event_transaction_id to be deleted
   * @public
   */

    deleteStartEventTransaction(start_event_transaction_id) {
        return this.#fetchAdvanced(this.#deleteStartEventTransactionURL(start_event_transaction_id), {
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
   * @param {StartereignisBuchungBO} start_event_transactionBO to be updated
   * @public
   */
  updateStartEventTransaction(start_event_transactionBO) {
    return this.#fetchAdvanced(this.#updateStartEventTransactionURL(start_event_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(start_event_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBuchungBO.fromJSON
      let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBuchungBO);
      })
    })
  }



  //End-Event related Functions

  /**
   * Returns a Promise, which resolves to a EndereignisBO.
   *
   * @param {Number} end_event_id to be retrieved
   * @public
   */

    getEndEvent(end_event_id){
        return this.#fetchAdvanced(this.#getEndEventURL(end_event_id)).then((responseJSON) => {
            let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBO)
            })
        })
    }




  /**
   * Returns a Promise, which resolves to an Array of EndereignisBO.
   *
   * @param {Number} end_event_id to be deleted
   * @public
   */

    deleteEndEvent(end_event_id) {
        return this.#fetchAdvanced(this.#deleteEndEventURL(end_event_id), {
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
   * @param {EndereignisBO} end_eventBO to be updated
   * @public
   */
  updateEndEvent(end_eventBO) {
    return this.#fetchAdvanced(this.#updateEndEventURL(end_eventBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(end_eventBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBO.fromJSON
      let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
      // console.info(end_eventBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBO);
      })
    })
  }

  //End-Event-Transaction related Functions

  /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} end_event_transaction_id to be retrieved
   * @public
   */

    getEndEventTransaction(end_event_transaction_id){
        return this.#fetchAdvanced(this.#getEndEventTransactionURL(end_event_transaction_id)).then((responseJSON) => {
            let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of EndereignisBuchungBO.
   *
   * @param {Number} end_event_transaction_id to be deleted
   * @public
   */

    deleteEndEventTransaction(end_event_transaction_id) {
        return this.#fetchAdvanced(this.#deleteEndEventTransactionURL(end_event_transaction_id), {
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
   * @param {EndereignisBuchungBO} end_event_transactionBO to be updated
   * @public
   */
  updateEndEventTransaction(end_event_transactionBO) {
    return this.#fetchAdvanced(this.#updateEndEventTransactionURL(end_event_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(end_event_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBuchung.fromJSON
      let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(end_event_transactionBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBuchungBO);
      })
    })
  }


  //Gehen-Event related Functions

    /**
   * Returns a Promise, which resolves to a GehenBO.
   *
   * @param {Number} gehen_id to be retrieved
   * @public
   */

    getGehen(gehen_id){
        return this.#fetchAdvanced(this.#getGehenURL(gehen_id)).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBO.
   *
   * @param {Number} gehen_id to be deleted
   * @public
   */

    deleteGehen(gehen_id) {
        return this.#fetchAdvanced(this.#deleteGehenURL(gehen_id), {
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
   * @param {GehenBO} gehenBO to be updated
   * @public
   */
  updateGehen(gehenBO) {
    return this.#fetchAdvanced(this.#updateGehenURL(gehenBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(gehenBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // console.info(GehenBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      })
    })
  }

  //Gehen-Event-Transaction related Functions

      /**
   * Returns a Promise, which resolves to a GehenBuchungBO.
   *
   * @param {Number} gehen_transaction_id to be retrieved
   * @public
   */

    getGehenTransaction(gehen_transaction_id){
        return this.#fetchAdvanced(this.#getGehenTransactionURL(gehen_transaction_id)).then((responseJSON) => {
            let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBuchungBO.
   *
   * @param {Number} gehen_transaction_id to be deleted
   * @public
   */

    deleteGehenTransaction(gehen_transaction_id) {
        return this.#fetchAdvanced(this.#deleteGehenTransactionURL(gehen_transaction_id), {
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
   * @param {GehenBuchungBO} gehen_transactionBO to be updated
   * @public
   */
  updateGehenTransaction(gehen_transactionBO) {
    return this.#fetchAdvanced(this.#updateGehenTransactionURL(gehen_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(gehen_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(gehen_transactionBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBuchungBO);
      })
    })
  }

  //Gehen-Event related Functions

      /**
   * Returns a Promise, which resolves to a KommenBO.
   *
   * @param {Number} kommen_id to be retrieved
   * @public
   */

    getKommen(kommen_id){
        return this.#fetchAdvanced(this.#getKommenURL(kommen_id)).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of KommenBO.
   *
   * @param {Number} kommen_id to be deleted
   * @public
   */

    deleteKommen(kommen_id) {
        return this.#fetchAdvanced(this.#deleteKommenURL(kommen_id), {
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
   * @param {KommenBO} kommenBO to be updated
   * @public
   */
  updateKommen(kommenBO) {
    return this.#fetchAdvanced(this.#updateKommenURL(kommenBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(kommenBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBO.fromJSON
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      // console.info(kommenBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} kommen_transaction_id to be retrieved
   * @public
   */

  getKommenTransaction(kommen_transaction_id){
        return this.#fetchAdvanced(this.#getKommenTransactionURL(kommen_transaction_id)).then((responseJSON) => {
            let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBuchungBO)
            })
        })
  }

  /**
   * Returns a Promise, which resolves to an Array of KommenBuchungBO.
   *
   * @param {Number} kommen_transaction_id to be deleted
   * @public
   */

    deleteKommenTransaction(kommen_transaction_id) {
        return this.#fetchAdvanced(this.#deleteKommenTransactionURL(kommen_transaction_id), {
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
   * @param {KommenBuchungBO} kommen_transactionBO to be updated
   * @public
   */
  updateKommenTransaction(kommen_transactionBO) {
    return this.#fetchAdvanced(this.#updateKommenTransactionURL(kommen_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(kommen_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBuchungBO.fromJSON
      let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(kommen_transactionBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBuchungBO);
      })
    })
  }

  //Pause related Functions

  /**
   * Returns a Promise, which resolves to a PauseBO.
   *
   * @param {Number} pause_id to be retrieved
   * @public
   */

    getPause(pause_id){
        return this.#fetchAdvanced(this.#getPauseURL(pause_id)).then((responseJSON) => {
            let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBO.
   *
   * @param {Number} pause_id to be deleted
   * @public
   */

    deletePause(pause_id) {
        return this.#fetchAdvanced(this.#deletePauseURL(pause_id), {
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
   * @param {PauseBO} pauseBO to be updated
   * @public
   */
  updatePause(pauseBO) {
    return this.#fetchAdvanced(this.#updatePauseURL(pauseBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pauseBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      // console.info(pauseBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      })
    })
  }

  //Pause-Transaction related Functions

   /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} pause_transaction_id to be retrieved
   * @public
   */

    getPauseTransaction(pause_transaction_id){
        return this.#fetchAdvanced(this.#getPauseTransactionURL(pause_transaction_id)).then((responseJSON) => {
            let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBuchungBO.
   *
   * @param {Number} pause_transaction_id to be deleted
   * @public
   */

    deletePauseTransaction(pause_transaction_id) {
        return this.#fetchAdvanced(this.#deletePauseTransactionURL(pause_transaction_id), {
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
   * @param {PauseBuchungBO} pause_transactionBO to be updated
   * @public
   */
  updatePauseTransaction(pause_transactionBO) {
    return this.#fetchAdvanced(this.#updatePauseTransactionURL(pause_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pause_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
      // console.info(pause_transactionBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBuchungBO);
      })
    })
  }


  //Project-Worktime related Functions

  /**
   * Returns a Promise, which resolves to a ProjektarbeitBO.
   *
   * @param {Number} project_worktime_id to be retrieved
   * @public
   */

    getProjectWorktime(project_worktime_id){
        return this.#fetchAdvanced(this.#getWorktimeURL(project_worktime_id)).then((responseJSON) => {
            let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBO.
   *
   * @param {Number} project_worktime_id to be deleted
   * @public
   */

    deleteProjectWorktime(project_worktime_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeURL(project_worktime_id), {
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
   * @param {ProjektarbeitBO} project_worktimeBO to be updated
   * @public
   */
  updateProjectWorktime(project_worktimeBO) {
    return this.#fetchAdvanced(this.#updateWorktimeURL(project_worktimeBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project_worktimeBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBO.fromJSON
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // console.info(project_worktimeBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      })
    })
  }

  //Project-Worktime-Transaction related Functions

  /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} project_worktime_transaction_id to be retrieved
   * @public
   */

    getProjectWorktimeTransaction(project_worktime_transaction_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionURL(project_worktime_transaction_id)).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBuchungBO)
            })
        })
    }


  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBuchungBO.
   *
   * @param {Number} project_worktime_transaction_id to be deleted
   * @public
   */

    deleteProjectWorktimeTransaction(project_worktime_transaction_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeTransactionURL(project_worktime_transaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektarbeitBuchungBO);
            })
        })
    }
  /**
   * Updates a Project-Worktime-Transaction and returns a Promise, which resolves to a ProjektarbeitBuchungBO.
   *
   * @param {ProjektarbeitBuchungBO} project_worktime_transactionBO to be updated
   * @public
   */
  updateProjectWorktimeTransaction(project_worktime_transactionBO) {
    return this.#fetchAdvanced(this.#updateWorktimeTransactionURL(project_worktime_transactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project_worktime_transactionBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBuchungBO.fromJSON
      let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
      // console.info(project_worktime_transactionBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBuchungBO);
      })
    })
  }


  //Project-Deadline related Functions

  /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} project_deadline_id to be retrieved
   * @public
   */

    getProjectDeadline(project_deadline_id){
        return this.#fetchAdvanced(this.#getProjectDeadlineURL(project_deadline_id)).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektDeadlineBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektDeadlineBO.
   *
   * @param {Number} project_deadline_id to be deleted
   * @public
   */

    deleteProjectDeadline(project_deadline_id) {
        return this.#fetchAdvanced(this.#deleteProjectDeadlineURL(project_deadline_id), {
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
   * @param {ProjektDeadlineBO} project_deadlineBO to be updated
   * @public
   */
  updateProjectDeadline(project_deadlineBO) {
    return this.#fetchAdvanced(this.#updateProjectDeadlineURL(project_deadlineBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project_deadlineBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektDeadlineBO.fromJSON
      let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
      // console.info(project_deadlineBO);
      return new Promise(function (resolve) {
        resolve(responseProjektDeadlineBO);
      })
    })
  }

  /**
   * Adds a ProjektDeadline and returns a Promise
   *
   * @param project_deadlineBO to be added
   * @public
   */

      addProjectDeadline(project_deadlineBO) {
        return this.#fetchAdvanced(this.#addProjectDeadlineURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project_deadlineBO)
        }).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            // console.info(project_deadlineBO);
            return new Promise(function (resolve) {
                resolve(responseProjektDeadlineBO);
            })
        })
    }


   //Project-Duration related Functions

    /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} project_duration_id to be retrieved
   * @public
   */

    getProjectDuration(project_duration_id){
        return this.#fetchAdvanced(this.#getProjectDurationURL(project_duration_id)).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektlaufzeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektlaufzeitBO.
   *
   * @param {Number} project_duration_id to be deleted
   * @public
   */

    deleteProjectDuration(project_duration_id) {
        return this.#fetchAdvanced(this.#deleteProjectDurationURL(project_duration_id), {
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
   * @param {ProjektlaufzeitBO} project_durationBO to be updated
   * @public
   */
  updateProjectDuration(project_durationBO) {
    return this.#fetchAdvanced(this.#updateProjectDurationURL(project_durationBO.getId), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project_durationBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektlaufzeitBO.fromJSON
      let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
      // console.info(project_durationBO);
      return new Promise(function (resolve) {
        resolve(responseProjektlaufzeitBO);
      })
    })
  }
    /**
   * Adds a ProjektDuration and returns a Promise
   *
   * @param project_durationBO to be added
   * @public
   */

      addProjectDuration(project_durationBO) {
        return this.#fetchAdvanced(this.#addProjectDurationURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project_durationBO)
        }).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            // console.info(project_durationBO);
            return new Promise(function (resolve) {
                resolve(responseProjektlaufzeitBO);
            })
        })
    }
}